// Comprueba la conexión con Odoo y crea una oportunidad de prueba en el CRM.
// Uso (en local o en Plesk → Node.js → Ejecutar script): npm run test-odoo
const env = process.env;
const fail = (msg) => {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
};

if (!env.ODOO_URL) fail("falta ODOO_URL en .env.local (p. ej. https://epsig-consultores.odoo.com)");
if (!env.ODOO_API_KEY) fail("falta ODOO_API_KEY en .env.local");
const base = env.ODOO_URL.replace(/\/+$/, "").replace(/\/odoo$/, "");

const post = async (url, body, headers = {}) => {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
  return { res, json: await res.json().catch(() => null) };
};

const { json: info } = await post(`${base}/web/webclient/version_info`, { jsonrpc: "2.0", method: "call", params: {} });
const version = info?.result?.server_version;
if (!version) fail(`no responde ${base} (¿ODOO_URL correcta?)`);
const major = Number(String(info.result.server_version_info[0]).replace(/^saas~/, ""));
console.log(`Odoo ${version} en ${base} → API ${major >= 19 ? "JSON-2" : "JSON-RPC"}`);

let uid;
async function call(model, method, kwargs) {
  if (major >= 19) {
    const { res, json } = await post(`${base}/json/2/${model}/${method}`, kwargs, {
      Authorization: `bearer ${env.ODOO_API_KEY}`,
      ...(env.ODOO_DB ? { "X-Odoo-Database": env.ODOO_DB } : {}),
    });
    if (!res.ok) fail(`${model}.${method} rechazado (${res.status}): ${json?.message ?? ""}`);
    return json;
  }
  const rpc = async (service, m, args) => {
    const { json } = await post(`${base}/jsonrpc`, { jsonrpc: "2.0", method: "call", params: { service, method: m, args } });
    if (json?.error) fail(json.error.data?.message ?? json.error.message);
    return json.result;
  };
  uid ??= await rpc("common", "authenticate", [env.ODOO_DB, env.ODOO_USER, env.ODOO_API_KEY, {}]);
  if (!uid) fail("usuario (ODOO_USER), base de datos (ODOO_DB) o clave de API incorrectos");
  return rpc("object", "execute_kw", [env.ODOO_DB, uid, env.ODOO_API_KEY, model, method, [], kwargs]);
}

const count = await call("crm.lead", "search_count", { domain: [] });
console.log(`OK: clave de API válida. El CRM tiene ${count} oportunidades/leads.`);

const [leadId] = await call("crm.lead", "create", {
  vals_list: [
    {
      name: "Prueba de conexión de la web (se puede borrar)",
      contact_name: "Prueba web",
      email_from: "prueba@example.com",
      description: "<p>Oportunidad creada por <code>npm run test-odoo</code> para comprobar la conexión de la web con el CRM.</p>",
    },
  ],
});
console.log(`OK: oportunidad de prueba creada (id ${leadId}): ${base}/odoo/crm/${leadId}`);
console.log("Puedes borrarla desde el CRM.");
