// Comprueba el envío del formulario de contacto con la configuración de .env.local.
// Uso (en local o en Plesk → Node.js → Ejecutar script): npm run test-correo
//  - Con GRAPH_*: pide un token y envía un correo de prueba solo a CONTACT_TO.
//  - Con SMTP_*: comprueba conexión y autenticación sin enviar nada.
import { createHash, createPrivateKey, createSign, randomUUID, X509Certificate } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

const env = process.env;
const fail = (msg) => {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
};

// Misma lógica que src/lib/mailer.ts: certificado (GRAPH_CERT_FILE) o secreto (GRAPH_CLIENT_SECRET).
function credentials(tokenUrl) {
  if (!env.GRAPH_CERT_FILE) {
    if (!env.GRAPH_CLIENT_SECRET) fail("falta GRAPH_CERT_FILE (o GRAPH_CLIENT_SECRET) en .env.local");
    return { client_secret: env.GRAPH_CLIENT_SECRET };
  }
  let pem;
  try {
    pem = readFileSync(path.resolve(process.cwd(), env.GRAPH_CERT_FILE), "utf8");
  } catch {
    fail(`no se encuentra el certificado ${env.GRAPH_CERT_FILE} (debe estar junto a package.json)`);
  }
  const certPem = pem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/)?.[0];
  if (!certPem) fail(`${env.GRAPH_CERT_FILE} no contiene el certificado`);
  const b64u = (data) => Buffer.from(data).toString("base64url");
  const thumbprint = createHash("sha1").update(new X509Certificate(certPem).raw).digest();
  const now = Math.floor(Date.now() / 1000);
  const header = b64u(JSON.stringify({ alg: "RS256", typ: "JWT", x5t: b64u(thumbprint) }));
  const payload = b64u(JSON.stringify({ aud: tokenUrl, iss: env.GRAPH_CLIENT_ID, sub: env.GRAPH_CLIENT_ID, jti: randomUUID(), nbf: now, exp: now + 600 }));
  const signature = createSign("RSA-SHA256").update(`${header}.${payload}`).sign(createPrivateKey(pem));
  console.log(`Usando certificado ${env.GRAPH_CERT_FILE} (huella ${thumbprint.toString("hex").toUpperCase()}).`);
  return {
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_assertion: `${header}.${payload}.${b64u(signature)}`,
  };
}

if (env.GRAPH_TENANT_ID) {
  for (const name of ["GRAPH_CLIENT_ID", "CONTACT_FROM", "CONTACT_TO"]) {
    if (!env[name]) fail(`falta ${name} en .env.local`);
  }
  console.log(`Microsoft Graph: enviando prueba desde ${env.CONTACT_FROM} a ${env.CONTACT_TO}...`);

  const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(env.GRAPH_TENANT_ID)}/oauth2/v2.0/token`;
  const tokenRes = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GRAPH_CLIENT_ID,
      ...credentials(tokenUrl),
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });
  const token = await tokenRes.json().catch(() => ({}));
  if (!tokenRes.ok) fail(`token rechazado (${tokenRes.status}): ${token.error_description ?? token.error ?? ""}`);
  console.log("OK: token obtenido (ID de directorio, ID de aplicación y credencial correctos).");

  const sendRes = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.CONTACT_FROM)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject: "Prueba de envío de la web",
        body: { contentType: "Text", content: "Correo de prueba de la web epsigconsultores.com (npm run test-correo)." },
        toRecipients: [{ emailAddress: { address: env.CONTACT_TO } }],
      },
      saveToSentItems: false,
    }),
  });
  if (!sendRes.ok) {
    const json = await sendRes.json().catch(() => ({}));
    fail(`envío rechazado (${sendRes.status}): ${json.error?.code ?? ""} ${json.error?.message ?? ""}`);
  }
  console.log(`OK: correo de prueba enviado. Revisa la bandeja de ${env.CONTACT_TO}.`);
} else {
  if (!env.SMTP_HOST) fail("no hay GRAPH_TENANT_ID ni SMTP_HOST. ¿Existe .env.local junto a package.json?");
  const port = Number(env.SMTP_PORT ?? 587);
  console.log(
    `SMTP: probando ${env.SMTP_HOST}:${port} con usuario ${env.SMTP_USER || "(sin usuario)"} y contraseña ${env.SMTP_PASS ? "presente" : "AUSENTE"}...`,
  );
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: true,
    connectionTimeout: 15000,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });
  try {
    await transporter.verify();
    console.log("OK: conexión y autenticación SMTP correctas.");
  } catch (error) {
    fail(`${error.code ?? ""} ${error.response ?? error.message}`);
  }
}
