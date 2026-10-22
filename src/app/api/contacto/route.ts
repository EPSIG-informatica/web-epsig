import { NextResponse } from "next/server";
import { sendContactConfirmation, sendContactEmail, type ContactRequest } from "@/lib/mailer";
import { createLead, odooConfigured, type LeadOrigin } from "@/lib/odoo";
import { clientIp, hit } from "@/lib/rate-limit";
import { contactInterests, site } from "@/lib/site";
import { defaultLocale, isLocale, localizePath, splitLocale, translator, type Locale, type Translate } from "@/lib/i18n";

const limits = { name: 120, email: 200, phone: 40, company: 160, message: 5000 };
// Solo direcciones simples (sin nombres visibles, listas ni comentarios).
const emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

const MAX_BODY_BYTES = 20_000;
// Una persona tarda más que esto en rellenar el formulario; un bot, no.
const MIN_FILL_MS = 3_000;
const PER_IP = { limit: 5, windowMs: 10 * 60_000 };
// Los topes globales y por destinatario solo afectan al acuse de recibo: la solicitud
// siempre llega a info@, para que un atacante no pueda bloquear los contactos reales.
const CONFIRMATIONS_GLOBAL = { limit: 30, windowMs: 60 * 60_000 };
const CONFIRMATIONS_PER_RECIPIENT = { limit: 1, windowMs: 24 * 60 * 60_000 };
// Límite de seguridad para no saturar el buzón si se sortea el límite por IP.
const NOTIFICATIONS_GLOBAL = { limit: 120, windowMs: 60 * 60_000 };

const tooMany = (t: Translate) =>
  t(
    "Has enviado demasiadas solicitudes. Inténtalo de nuevo en unos minutos o llámanos.",
    "Has enviat massa sol·licituds. Torna-ho a provar d'ací a uns minuts o telefona'ns.",
  );
const sendFailed = (t: Translate) =>
  t(
    `No hemos podido enviar tu mensaje. Escríbenos a ${site.email} o llámanos.`,
    `No hem pogut enviar el teu missatge. Escriu-nos a ${site.email} o telefona'ns.`,
  );

// Lee el cuerpo por partes y corta en cuanto supera el límite (no se carga entero en memoria).
async function readBody(request: Request): Promise<string | null> {
  const declared = Number(request.headers.get("content-length"));
  if (declared > MAX_BODY_BYTES) return null;
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

const siteHost = new URL(site.url).host;
const isDev = process.env.NODE_ENV === "development";

// Solo se aceptan envíos hechos desde la propia web (o sus subdominios, p. ej. para pruebas).
function allowedOrigin(request: Request): URL | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  try {
    const url = new URL(origin);
    const ok =
      url.host === siteHost ||
      url.host.endsWith(`.${siteHost}`) ||
      (isDev && (url.hostname === "localhost" || url.hostname === "127.0.0.1"));
    return ok ? url : null;
  } catch {
    return null;
  }
}

// Campo trampa relleno o envío instantáneo: es un bot.
// Sin JavaScript no hay cronómetro, así que en ese caso solo cuenta el campo trampa.
function looksLikeBot(data: Record<string, unknown>, fromScript: boolean) {
  if (typeof data.website === "string" && data.website.trim() !== "") return true;
  if (!fromScript) return false;
  const elapsed = Number(data.elapsed);
  return !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS;
}

function optionalField(value: unknown, max: number) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

const ORIGIN_FIELDS = ["source", "medium", "campaign", "term", "content", "gclid", "referrer", "landing", "firstVisit", "formPage"] as const;

// Origen de la visita enviado por el formulario: solo cadenas cortas de los campos conocidos.
function parseOrigin(value: unknown): LeadOrigin {
  if (!value || typeof value !== "object") return {};
  const data = value as Record<string, unknown>;
  const origin: LeadOrigin = {};
  for (const field of ORIGIN_FIELDS) {
    const v = data[field];
    if (typeof v === "string" && v.trim()) origin[field] = v.trim().replace(/[\r\n]+/g, " ").slice(0, 300);
  }
  return origin;
}

function parseRequest(body: unknown, t: Translate): ContactRequest | string {
  const missing = t("Faltan campos obligatorios.", "Falten camps obligatoris.");
  if (!body || typeof body !== "object") return missing;
  const data = body as Record<string, unknown>;

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || !email || !message) return missing;
  if (data.privacy !== "on" && data.privacy !== true) {
    return t(
      "Debes aceptar la política de privacidad para enviar el formulario.",
      "Has d'acceptar la política de privacitat per a enviar el formulari.",
    );
  }
  if (name.length > limits.name || email.length > limits.email || message.length > limits.message) {
    return t("Alguno de los campos es demasiado largo.", "Algun dels camps és massa llarg.");
  }
  if (!emailPattern.test(email)) return t("El correo electrónico no es válido.", "El correu electrònic no és vàlid.");

  return {
    name,
    email,
    message,
    phone: optionalField(data.phone, limits.phone),
    company: optionalField(data.company, limits.company),
    // Solo una de las opciones del desplegable; cualquier otro valor se ignora.
    interest: contactInterests.find((interest) => interest.id === data.interest)?.label.es,
    privacyAcceptedAt: new Date(),
  };
}

function refererLocale(request: Request): Locale {
  try {
    return splitLocale(new URL(request.headers.get("referer") ?? "").pathname).lang;
  } catch {
    return defaultLocale;
  }
}

export async function POST(request: Request) {
  // Idioma de la página desde la que se envía: el campo `lang` del formulario o, hasta leer el
  // cuerpo, el de la página de procedencia (Referer).
  let lang: Locale = refererLocale(request);
  let t = translator(lang);

  const origin = allowedOrigin(request);
  if (!origin) {
    return NextResponse.json(
      { error: t("Solicitud no permitida.", "Sol·licitud no permesa.") },
      { status: 403 },
    );
  }

  // Con JavaScript el formulario envía JSON; sin él, un POST de formulario clásico
  // al que se responde redirigiendo a una página de confirmación o de error.
  const fromScript = (request.headers.get("content-type") ?? "").includes("application/json");
  const reply = (status: number, error?: string) => {
    if (fromScript) return NextResponse.json(error ? { error } : { ok: true }, { status });
    const page = localizePath(error ? "/contacto/error/" : "/contacto/enviado/", lang);
    return NextResponse.redirect(new URL(page, origin), 303);
  };

  if (!hit(`ip:${clientIp(request)}`, PER_IP.limit, PER_IP.windowMs)) return reply(429, tooMany(t));

  const raw = await readBody(request);
  if (raw === null) return reply(413, t("La solicitud es demasiado grande.", "La sol·licitud és massa gran."));

  let body: unknown = null;
  if (fromScript) {
    try {
      body = JSON.parse(raw);
    } catch {
      // Se trata como cuerpo vacío.
    }
  } else {
    body = Object.fromEntries(new URLSearchParams(raw));
  }
  if (body && typeof body === "object") {
    const requested = (body as Record<string, unknown>).lang;
    if (isLocale(requested)) {
      lang = requested;
      t = translator(lang);
    }
  }

  // A los bots se les responde como si todo hubiera ido bien, para no darles pistas.
  if (body && typeof body === "object" && looksLikeBot(body as Record<string, unknown>, fromScript)) {
    return reply(200);
  }

  const parsed = parseRequest(body, t);
  if (typeof parsed === "string") return reply(400, parsed);

  if (!hit("notifications", NOTIFICATIONS_GLOBAL.limit, NOTIFICATIONS_GLOBAL.windowMs)) {
    return reply(429, tooMany(t));
  }

  // Aviso por correo y oportunidad en el CRM de Odoo, a la vez. Basta con que llegue por una vía.
  const visitOrigin = parseOrigin((body as Record<string, unknown>).origin);
  const [mail, lead] = await Promise.allSettled([
    sendContactEmail(parsed, lang),
    odooConfigured() ? createLead({ ...parsed, origin: visitOrigin, lang }) : Promise.reject(new Error("Odoo no configurado")),
  ]);
  // No se registran los datos del formulario (RGPD), solo el fallo técnico.
  if (mail.status === "rejected") {
    console.error("[contacto] Error enviando el correo:", mail.reason instanceof Error ? mail.reason.message : mail.reason);
  }
  if (lead.status === "rejected" && odooConfigured()) {
    console.error("[contacto] Error creando la oportunidad en Odoo:", lead.reason instanceof Error ? lead.reason.message : lead.reason);
  }
  if (mail.status === "rejected" && lead.status === "rejected") return reply(500, sendFailed(t));

  // El acuse de recibo es secundario: si falla o se supera su tope, la solicitud ya ha llegado a info@.
  const recipient = parsed.email.toLowerCase();
  const canConfirm =
    hit(`confirm:${recipient}`, CONFIRMATIONS_PER_RECIPIENT.limit, CONFIRMATIONS_PER_RECIPIENT.windowMs) &&
    hit("confirmations", CONFIRMATIONS_GLOBAL.limit, CONFIRMATIONS_GLOBAL.windowMs);
  try {
    if (canConfirm) await sendContactConfirmation(parsed, lang);
  } catch (err) {
    console.error("[contacto] Error enviando el acuse de recibo:", err instanceof Error ? err.message : err);
  }

  return reply(200);
}
