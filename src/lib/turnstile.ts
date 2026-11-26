import "server-only";
import { site } from "@/lib/site";

// Cloudflare Turnstile en el formulario de contacto. Claves en el panel de Cloudflare
// (Turnstile → Add widget, dominio epsigconsultores.com).
// Sin TURNSTILE_SECRET_KEY no se verifica nada (útil en local): el resto de defensas siguen activas.
const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 5_000;
const siteHost = new URL(site.url).hostname;

export type TurnstileResult =
  | { ok: true }
  /** "missing": no hay token (el widget no se completó); "rejected": Cloudflare no da por buena la respuesta. */
  | { ok: false; reason: "missing" | "rejected" };

type SiteVerifyResponse = {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstile(token: unknown, ip?: string): Promise<TurnstileResult> {
  if (!secret) return { ok: true };
  if (typeof token !== "string" || token.length < 10 || token.length > 2_048) {
    return { ok: false, reason: "missing" };
  }

  const params = new URLSearchParams({ secret, response: token });
  // Solo IPs completas: para IPv6 `clientIp()` devuelve un rango (…::/64).
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
    // Si Cloudflare no responde, no se pierde el contacto: siguen el campo trampa, el tiempo
    // mínimo de relleno y los límites por IP.
    console.error("[turnstile] No se pudo verificar el token:", err instanceof Error ? err.message : err);
    return { ok: true };
  }

  const hostOk = !data.hostname || data.hostname === siteHost || data.hostname.endsWith(`.${siteHost}`);
  if (data.success && hostOk) return { ok: true };
  console.warn("[turnstile] Envío rechazado:", {
    success: data.success,
    hostname: data.hostname,
    errors: data["error-codes"],
  });
  return { ok: false, reason: "rejected" };
}
