import "server-only";
import type { Locale } from "@/lib/i18n";

// Crea oportunidades en el CRM de Odoo desde el formulario de contacto.
// Usa la API externa de Odoo con una clave de API (Ajustes de usuario → Seguridad de la cuenta):
//  - Odoo 19 o superior: API JSON-2 (/json/2/<modelo>/<método>).
//  - Versiones anteriores: JSON-RPC clásico (/jsonrpc, execute_kw).
// Requiere el plan Custom de Odoo (o Odoo.sh / instalación propia): el plan Standard no incluye API.

export type LeadOrigin = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  referrer?: string;
  landing?: string;
  firstVisit?: string;
  formPage?: string;
};

export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  /** Lo que le interesa, del desplegable del formulario: se añade como etiqueta. */
  interest?: string;
  message: string;
  origin: LeadOrigin;
  /** Idioma de la web desde la que se envió el formulario. */
  lang?: Locale;
};

type Kwargs = Record<string, unknown>;

export const odooConfigured = () => Boolean(process.env.ODOO_URL && process.env.ODOO_API_KEY);

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

// Acepta la URL con o sin el "/odoo" final que muestra el navegador.
const baseUrl = () => env("ODOO_URL").replace(/\/+$/, "").replace(/\/odoo$/, "");

async function post(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });
  const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  return { res, json };
}

// ── Detección de versión y llamada genérica ──

let majorVersion: Promise<number> | undefined;
let rpcUid: number | undefined;

// Se consulta una sola vez (las llamadas en paralelo comparten la misma petición).
function serverMajorVersion() {
  majorVersion ??= (async () => {
    const { json } = await post(`${baseUrl()}/web/webclient/version_info`, { jsonrpc: "2.0", method: "call", params: {} });
    const info = (json?.result as { server_version_info?: unknown[] } | undefined)?.server_version_info;
    const major = Number(String(info?.[0] ?? "").replace(/^saas~/, ""));
    if (!Number.isFinite(major) || major <= 0) throw new Error("Odoo: no se pudo leer la versión del servidor (¿ODOO_URL correcta?)");
    return major;
  })().catch((error) => {
    majorVersion = undefined; // Si falla, se reintenta en el siguiente envío.
    throw error;
  });
  return majorVersion;
}

async function rpc(service: string, method: string, args: unknown[]) {
  const { json } = await post(`${baseUrl()}/jsonrpc`, { jsonrpc: "2.0", method: "call", params: { service, method, args } });
  const error = json?.error as { data?: { message?: string }; message?: string } | undefined;
  if (error) throw new Error(`Odoo: ${error.data?.message ?? error.message ?? "error en la llamada"}`);
  return json?.result;
}

async function call(model: string, method: string, kwargs: Kwargs): Promise<unknown> {
  const db = process.env.ODOO_DB;
  const key = env("ODOO_API_KEY");

  if ((await serverMajorVersion()) >= 19) {
    const { res, json } = await post(`${baseUrl()}/json/2/${model}/${method}`, kwargs, {
      Authorization: `bearer ${key}`,
      ...(db ? { "X-Odoo-Database": db } : {}),
    });
    if (!res.ok) {
      const message = (json as { message?: string } | null)?.message;
      throw new Error(`Odoo: ${model}.${method} rechazado (${res.status}) ${message ?? ""}`.trim());
    }
    return json;
  }

  rpcUid ??= (await rpc("common", "authenticate", [env("ODOO_DB"), env("ODOO_USER"), key, {}])) as number;
  if (!rpcUid) throw new Error("Odoo: usuario o clave de API incorrectos");
  return rpc("object", "execute_kw", [env("ODOO_DB"), rpcUid, key, model, method, [], kwargs]);
}

// ── Helpers de datos ──

const ids = new Map<string, number>();

/** Busca un registro por nombre y, si no existe, lo crea. Devuelve su id (o undefined si falla). */
async function findOrCreate(model: string, name: string) {
  const cacheKey = `${model}|${name.toLowerCase()}`;
  if (ids.has(cacheKey)) return ids.get(cacheKey);
  try {
    const found = (await call(model, "search_read", {
      domain: [["name", "=ilike", name]],
      fields: ["id"],
      limit: 1,
    })) as { id: number }[];
    const id = found[0]?.id ?? ((await call(model, "create", { vals_list: [{ name }] })) as number[])[0];
    if (id) ids.set(cacheKey, id);
    return id;
  } catch (error) {
    // Un fallo aquí no debe impedir crear la oportunidad.
    console.error(`[odoo] No se pudo usar ${model} "${name}":`, error instanceof Error ? error.message : error);
    return undefined;
  }
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Canal deducido cuando no hay UTM: buscadores, redes, enlace de otra web o acceso directo. */
function inferChannel(origin: LeadOrigin): { source?: string; medium?: string } {
  if (origin.source || origin.medium) return { source: origin.source, medium: origin.medium };
  if (origin.gclid) return { source: "google", medium: "cpc" };
  if (!origin.referrer) return origin.firstVisit ? { source: "directo", medium: "directo" } : {};
  let host = "";
  try {
    host = new URL(origin.referrer).hostname.replace(/^www\./, "");
  } catch {
    return {};
  }
  const engines = ["google", "bing", "duckduckgo", "yahoo", "ecosia", "qwant"];
  const social = ["linkedin", "facebook", "instagram", "t.co", "x.com", "twitter", "youtube", "tiktok"];
  const name = host.split(".").find((part) => engines.includes(part) || social.includes(part)) ?? host;
  if (engines.some((e) => host.includes(e))) return { source: name, medium: "organico" };
  if (social.some((s) => host.includes(s))) return { source: name, medium: "social" };
  return { source: host, medium: "referido" };
}

export async function createLead(lead: LeadInput) {
  const { origin } = lead;
  const channel = inferChannel(origin);

  const [tagId, interestTagId, sourceId, mediumId, campaignId] = await Promise.all([
    findOrCreate("crm.tag", process.env.ODOO_LEAD_TAG || "Web"),
    lead.interest ? findOrCreate("crm.tag", lead.interest) : undefined,
    channel.source ? findOrCreate("utm.source", channel.source) : undefined,
    channel.medium ? findOrCreate("utm.medium", channel.medium) : undefined,
    origin.campaign ? findOrCreate("utm.campaign", origin.campaign) : undefined,
  ]);

  const originRows: [string, string | undefined][] = [
    ["Idioma de la web", lead.lang ? (lead.lang === "ca" ? "valenciano" : "castellano") : undefined],
    ["Página del formulario", origin.formPage],
    ["Primera página visitada", origin.landing],
    ["Primera visita", origin.firstVisit],
    ["Procedencia", origin.referrer],
    ["Fuente / medio", channel.source || channel.medium ? `${channel.source ?? "-"} / ${channel.medium ?? "-"}` : undefined],
    ["Campaña", origin.campaign],
    ["Término", origin.term],
    ["Contenido", origin.content],
    ["Google Ads (gclid)", origin.gclid],
  ];

  const description = [
    `<p>${escapeHtml(lead.message).replace(/\n/g, "<br>")}</p>`,
    "<p><strong>Origen de la visita</strong></p>",
    "<ul>",
    ...originRows.filter(([, v]) => v).map(([k, v]) => `<li>${k}: ${escapeHtml(v!)}</li>`),
    "</ul>",
    origin.landing || origin.referrer ? "" : "<p><em>Sin datos de origen (el visitante no aceptó las cookies de marketing).</em></p>",
  ].join("");

  const vals: Record<string, unknown> = {
    name: `Web: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    contact_name: lead.name,
    partner_name: lead.company || false,
    email_from: lead.email,
    phone: lead.phone || false,
    description,
    tag_ids: [tagId, interestTagId].filter(Boolean).map((id) => [4, id]),
    ...(sourceId ? { source_id: sourceId } : {}),
    ...(mediumId ? { medium_id: mediumId } : {}),
    ...(campaignId ? { campaign_id: campaignId } : {}),
    ...(process.env.ODOO_TEAM_ID ? { team_id: Number(process.env.ODOO_TEAM_ID) } : {}),
  };

  const created = (await call("crm.lead", "create", { vals_list: [vals] })) as number[];
  return created[0];
}
