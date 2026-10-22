import "server-only";
import { createHash, createPrivateKey, createSign, randomUUID, X509Certificate } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/site";
import { defaultLocale, localizePath, translator, type Locale } from "@/lib/i18n";

export type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  privacyAcceptedAt: Date;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Evita inyección de cabeceras en asunto / reply-to.
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

type Outgoing = {
  fromName: string;
  from: string;
  to: string;
  replyTo: { name?: string; address: string };
  subject: string;
  text: string;
  html: string;
  /** Cabeceras extra. Con Graph solo se admiten las que empiezan por "X-". */
  headers?: Record<string, string>;
  inlineImage?: { cid: string; filename: string; path: string; contentType: string };
};

// ───────────── Envío por Microsoft Graph (si están las variables GRAPH_*) ─────────────
// Método recomendado por Microsoft 365: no usa contraseñas de buzón ni SMTP AUTH.
// Requiere una aplicación registrada en Entra ID con el permiso de aplicación Mail.Send.

const graphConfigured = () => Boolean(process.env.GRAPH_TENANT_ID);

let graphToken: { value: string; expiresAt: number } | undefined;

const base64url = (data: Buffer | string) => Buffer.from(data).toString("base64url");

// Credencial de la aplicación: certificado (GRAPH_CERT_FILE, un .pem con la clave privada y el
// certificado) o, si el inquilino lo permite, secreto de cliente (GRAPH_CLIENT_SECRET).
async function graphCredentials(tokenUrl: string, clientId: string): Promise<Record<string, string>> {
  const certFile = process.env.GRAPH_CERT_FILE;
  if (!certFile) return { client_secret: requiredEnv("GRAPH_CLIENT_SECRET") };

  // turbopackIgnore: ruta del servidor decidida en tiempo de ejecución (evita empaquetar todo el proyecto).
  const pem = await readFile(path.resolve(/*turbopackIgnore: true*/ process.cwd(), certFile), "utf8");
  const certPem = pem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/)?.[0];
  if (!certPem) throw new Error(`Graph: ${certFile} no contiene el certificado`);
  const thumbprint = createHash("sha1").update(new X509Certificate(certPem).raw).digest();

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT", x5t: base64url(thumbprint) }));
  const payload = base64url(
    JSON.stringify({ aud: tokenUrl, iss: clientId, sub: clientId, jti: randomUUID(), nbf: now, exp: now + 600 }),
  );
  const signature = createSign("RSA-SHA256").update(`${header}.${payload}`).sign(createPrivateKey(pem));
  return {
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_assertion: `${header}.${payload}.${base64url(signature)}`,
  };
}

async function getGraphToken() {
  if (graphToken && Date.now() < graphToken.expiresAt) return graphToken.value;
  const tenant = requiredEnv("GRAPH_TENANT_ID");
  const clientId = requiredEnv("GRAPH_CLIENT_ID");
  const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(tenant)}/oauth2/v2.0/token`;
  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      ...(await graphCredentials(tokenUrl, clientId)),
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    signal: AbortSignal.timeout(15000),
  });
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error_description?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(`Graph: no se pudo obtener el token (${res.status}) ${json.error_description ?? ""}`.trim());
  }
  // Se renueva un minuto antes de que caduque.
  graphToken = { value: json.access_token, expiresAt: Date.now() + ((json.expires_in ?? 3600) - 60) * 1000 };
  return graphToken.value;
}

async function sendWithGraph(mail: Outgoing) {
  const attachments = mail.inlineImage
    ? [
        {
          "@odata.type": "#microsoft.graph.fileAttachment",
          name: mail.inlineImage.filename,
          contentType: mail.inlineImage.contentType,
          contentBytes: (await readFile(mail.inlineImage.path)).toString("base64"),
          contentId: mail.inlineImage.cid,
          isInline: true,
        },
      ]
    : undefined;

  const headers = Object.entries(mail.headers ?? {})
    .filter(([name]) => /^x-/i.test(name))
    .map(([name, value]) => ({ name, value }));

  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mail.from)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await getGraphToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject: mail.subject,
        body: { contentType: "HTML", content: mail.html },
        toRecipients: [{ emailAddress: { address: mail.to } }],
        replyTo: [{ emailAddress: mail.replyTo }],
        ...(headers.length ? { internetMessageHeaders: headers } : {}),
        ...(attachments ? { attachments } : {}),
      },
      saveToSentItems: false,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { error?: { code?: string; message?: string } };
    throw new Error(`Graph: envío rechazado (${res.status}) ${json.error?.code ?? ""} ${json.error?.message ?? ""}`.trim());
  }
}

// ───────────── Envío por SMTP (alternativa) ─────────────

let transporter: Transporter | undefined;

// Sin SMTP_USER se envía sin autenticar: sirve para "Direct Send" de Microsoft 365
// (entrega directa al MX del dominio, solo a buzones propios).
function getTransporter() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  transporter ??= nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    requireTLS: true,
    auth: user ? { user, pass: requiredEnv("SMTP_PASS") } : undefined,
  });
  return transporter;
}

async function deliver(mail: Outgoing) {
  if (graphConfigured()) return sendWithGraph(mail);
  await getTransporter().sendMail({
    from: { name: mail.fromName, address: mail.from },
    to: mail.to,
    replyTo: mail.replyTo.name ? { name: mail.replyTo.name, address: mail.replyTo.address } : mail.replyTo.address,
    subject: mail.subject,
    headers: mail.headers,
    text: mail.text,
    html: mail.html,
    attachments: mail.inlineImage
      ? [{ filename: mail.inlineImage.filename, path: mail.inlineImage.path, cid: mail.inlineImage.cid }]
      : undefined,
  });
}

const senderAddress = () => process.env.CONTACT_FROM ?? requiredEnv("SMTP_USER");

export async function sendContactEmail(request: ContactRequest, lang: Locale = defaultLocale) {
  const from = senderAddress();
  const to = requiredEnv("CONTACT_TO");
  const name = singleLine(request.name);

  const rows: [string, string | undefined][] = [
    ["Nombre", request.name],
    ["Correo", request.email],
    ["Teléfono", request.phone],
    ["Empresa", request.company],
    ["Idioma", { es: "castellano", ca: "valenciano", en: "inglés" }[lang]],
    [
      "Privacidad",
      `Aceptada el ${request.privacyAcceptedAt.toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`,
    ],
  ];

  const text = [
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Mensaje:",
    request.message,
  ].join("\n");

  const html = `
    <h2 style="font-family:sans-serif">Nueva solicitud desde la web</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .filter(([, v]) => v)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#555"><strong>${k}</strong></td><td style="padding:4px 0">${escapeHtml(v!)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;color:#555"><strong>Mensaje</strong></p>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(request.message)}</p>
  `;

  await deliver({
    fromName: "Web EPSIG",
    from,
    to,
    replyTo: { name, address: singleLine(request.email) },
    subject: `Nueva solicitud web: ${name}${request.company ? ` (${singleLine(request.company)})` : ""}`,
    text,
    html,
  });
}

// Solo el nombre de pila, recortado: nunca se reenvía contenido libre del formulario,
// para que el acuse de recibo no sirva para mandar spam a terceros.
function firstName(name: string) {
  const first = singleLine(name).split(/\s+/)[0] ?? "";
  const clean = first.replace(/[^\p{L}\p{M}'-]/gu, "").slice(0, 30);
  return clean || undefined;
}

export async function sendContactConfirmation(request: ContactRequest, lang: Locale = defaultLocale) {
  const from = senderAddress();
  const t = translator(lang);
  const first = firstName(request.name);
  const greeting = first ? `${t("Hola", "Hola", "Hello")}, ${first}:` : `${t("Hola", "Hola", "Hello")}:`;
  const phones = site.phones.join(" · ");
  const webUrl = `${site.url}${localizePath("/", lang)}`;
  const privacyUrl = `${site.url}${localizePath("/politica-de-privacidad/", lang)}`;

  const text = [
    greeting,
    "",
    t(
      `Gracias por contactar con ${site.name}. Hemos recibido tu mensaje y te responderemos lo antes posible, normalmente en un plazo de 24 a 48 horas laborables.`,
      `Gràcies per contactar amb ${site.name}. Hem rebut el teu missatge i et respondrem al més prompte possible, normalment en un termini de 24 a 48 hores laborables.`,
      `Thank you for contacting ${site.name}. We have received your message and will get back to you as soon as possible, usually within 24 to 48 working hours.`,
    ),
    "",
    t(
      `Si es urgente, puedes llamarnos a cualquiera de estos teléfonos: ${phones} (de lunes a viernes por la mañana).`,
      `Si és urgent, pots telefonar-nos a qualsevol d'estos telèfons: ${phones} (de dilluns a divendres pel matí).`,
      `If it's urgent, you can call us on either of these numbers: ${phones} (Monday to Friday, mornings).`,
    ),
    "",
    t("Un saludo,", "Una salutació,", "Kind regards,"),
    t(`El equipo de ${site.name}`, `L'equip d'${site.name}`, `The ${site.name} team`),
    webUrl,
    "",
    "---",
    t(
      `Recibes este correo porque se ha enviado el formulario de contacto de ${site.url} con esta dirección. Si no has sido tú, ignóralo: no volveremos a escribirte. Responsable del tratamiento: ${site.legalName}. Más información: ${privacyUrl}`,
      `Reps este correu perquè s'ha enviat el formulari de contacte de ${site.url} amb esta adreça. Si no has sigut tu, ignora'l: no et tornarem a escriure. Responsable del tractament: ${site.legalName}. Més informació: ${privacyUrl}`,
      `You are receiving this email because the contact form on ${site.url} was submitted with this address. If it wasn't you, please ignore it: we won't write to you again. Data controller: ${site.legalName}. More information: ${privacyUrl}`,
    ),
  ].join("\n");

  const html = `
  <div style="background:#f2f5fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
      <tr><td style="padding:28px 32px 8px"><img src="cid:logo-epsig" width="180" height="50" alt="${site.name}" style="display:block;border:0"></td></tr>
      <tr><td style="padding:16px 32px 8px;color:#0b1220;font-size:15px;line-height:1.6">
        <p style="margin:0 0 14px">${escapeHtml(greeting)}</p>
        <p style="margin:0 0 14px">${t(
          `Gracias por contactar con <strong>${site.name}</strong>. Hemos recibido tu mensaje y te responderemos lo antes posible, normalmente en un plazo de <strong>24 a 48 horas laborables</strong>.`,
          `Gràcies per contactar amb <strong>${site.name}</strong>. Hem rebut el teu missatge i et respondrem al més prompte possible, normalment en un termini de <strong>24 a 48 hores laborables</strong>.`,
          `Thank you for contacting <strong>${site.name}</strong>. We have received your message and will get back to you as soon as possible, usually within <strong>24 to 48 working hours</strong>.`,
        )}</p>
        <p style="margin:0 0 14px">${t(
          `Si es urgente, puedes llamarnos a cualquiera de estos teléfonos: <strong>${phones}</strong> (de lunes a viernes por la mañana).`,
          `Si és urgent, pots telefonar-nos a qualsevol d'estos telèfons: <strong>${phones}</strong> (de dilluns a divendres pel matí).`,
          `If it's urgent, you can call us on either of these numbers: <strong>${phones}</strong> (Monday to Friday, mornings).`,
        )}</p>
        <p style="margin:0 0 4px">${t("Un saludo,", "Una salutació,", "Kind regards,")}</p>
        <p style="margin:0">${t(`El equipo de ${site.name}`, `L'equip d'${site.name}`, `The ${site.name} team`)}</p>
      </td></tr>
      <tr><td style="padding:20px 32px 28px">
        <a href="${webUrl}" style="display:inline-block;background:#0b1220;color:#ffffff;text-decoration:none;font-size:13px;font-weight:bold;padding:11px 22px;border-radius:999px">${t("Visitar la web", "Visitar la web", "Visit our website")}</a>
      </td></tr>
      <tr><td style="padding:18px 32px;background:#f2f5fb;color:#8c98ad;font-size:11.5px;line-height:1.5">
        ${site.legalName} · ${escapeHtml(site.registeredAddress)} · ${site.email}<br><br>
        ${t(
          "Recibes este correo porque se ha enviado el formulario de contacto de nuestra web con esta dirección. Si no has sido tú, ignóralo: no volveremos a escribirte.",
          "Reps este correu perquè s'ha enviat el formulari de contacte de la nostra web amb esta adreça. Si no has sigut tu, ignora'l: no et tornarem a escriure.",
          "You are receiving this email because the contact form on our website was submitted with this address. If it wasn't you, please ignore it: we won't write to you again.",
        )}
        ${t("Responsable del tratamiento", "Responsable del tractament", "Data controller")}: ${site.legalName}. <a href="${privacyUrl}" style="color:#8c98ad">${t("Política de privacidad", "Política de privacitat", "Privacy policy")}</a>.
      </td></tr>
    </table>
  </div>`;

  await deliver({
    fromName: site.name,
    from,
    to: singleLine(request.email),
    replyTo: { address: site.email },
    subject: t(`Hemos recibido tu mensaje — ${site.name}`, `Hem rebut el teu missatge — ${site.name}`, `We've received your message — ${site.name}`),
    // Evita respuestas automáticas en bucle (fuera de oficina, etc.).
    headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All" },
    text,
    html,
    inlineImage: {
      cid: "logo-epsig",
      filename: "logo-epsig.png",
      path: path.join(process.cwd(), "public/email/logo-epsig.png"),
      contentType: "image/png",
    },
  });
}
