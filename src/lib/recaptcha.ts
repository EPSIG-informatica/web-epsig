import "server-only";
import { site } from "@/lib/site";

// Google reCAPTCHA v3 (invisible, por puntuación) en el formulario de contacto.
// Claves en https://www.google.com/recaptcha/admin (proyecto de Google Cloud "web-epsig").
// Sin RECAPTCHA_SECRET_KEY no se verifica nada (útil en local): el resto de defensas siguen activas.
const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();

/** Acción con la que el formulario pide el token; Google la devuelve y se comprueba. */
export const RECAPTCHA_ACTION = "contacto";

// Puntuación mínima (0 = bot seguro, 1 = persona segura). 0,5 es el valor que recomienda Google.
const MIN_SCORE = Number(process.env.RECAPTCHA_MIN_SCORE) || 0.5;
const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const TIMEOUT_MS = 5_000;
const siteHost = new URL(site.url).hostname;

export function recaptchaConfigured() {
  return Boolean(secret);
}

export type RecaptchaResult =
  | { ok: true }
  /** "missing": no llegó token (sin JavaScript o bloqueado); "rejected": Google lo considera un bot. */
  | { ok: false; reason: "missing" | "rejected" };

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptcha(token: unknown, ip?: string): Promise<RecaptchaResult> {
  if (!secret) return { ok: true };
  if (typeof token !== "string" || token.length < 20 || token.length > 4_000) {
    return { ok: false, reason: "missing" };
  }

  const params = new URLSearchParams({ secret, response: token });
  // Solo IPs completas: para IPv6 `clientIp()` devuelve un rango (…::/64), que Google no admite.
  if (ip && ip !== "unknown" && !ip.includes("/")) params.set("remoteip", ip);

  let data: SiteVerifyResponse;
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body: params,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = (await res.json()) as SiteVerifyResponse;
  } catch (err) {
    // Si Google no responde, no se pierde el contacto: siguen el campo trampa, el tiempo mínimo
    // de relleno y los límites por IP.
    console.error("[recaptcha] No se pudo verificar el token:", err instanceof Error ? err.message : err);
    return { ok: true };
  }

  const hostOk = !data.hostname || data.hostname === siteHost || data.hostname.endsWith(`.${siteHost}`);
  if (data.success && data.action === RECAPTCHA_ACTION && hostOk && (data.score ?? 0) >= MIN_SCORE) {
    return { ok: true };
  }
  // Solo datos técnicos en el registro (nunca los del formulario).
  console.warn("[recaptcha] Envío rechazado:", {
    success: data.success,
    score: data.score,
    action: data.action,
    hostname: data.hostname,
    errors: data["error-codes"],
  });
  return { ok: false, reason: "rejected" };
}
