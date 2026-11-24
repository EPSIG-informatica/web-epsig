// Configuración compartida de Google Analytics 4 y Google Tag Manager (Consent Mode v2).
import type { Consent } from "@/lib/consent";

// Solo se acepta un ID de medición válido (G-XXXXXXX), ya que se inserta en la URL del script.
const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
export const gaId = rawGaId && /^G-[A-Z0-9]+$/.test(rawGaId) ? rawGaId : undefined;

// ID del contenedor de Tag Manager (GTM-XXXXXXX). Solo se acepta un ID válido, ya que se inserta
// en la URL del script. Vacío = sin Tag Manager.
const rawGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
export const gtmId = rawGtmId && /^GTM-[A-Z0-9]+$/.test(rawGtmId) ? rawGtmId : undefined;

// Consent Mode v2 de Google, en uno de sus dos modos:
// - Básico (por defecto): Google no se carga hasta que se aceptan las cookies analíticas
//   (o, con Tag Manager, las analíticas o las de marketing).
// - Avanzado (NEXT_PUBLIC_GA_CONSENT_MODE=advanced): Google se carga siempre, pero sin cookies ni
//   identificadores hasta que se aceptan; mientras tanto envía avisos sin cookies que Google usa
//   para estimar las visitas y conversiones de quien no acepta. Antes de activarlo, revisa la
//   política de cookies: Google recibe datos técnicos de la visita (IP, navegador) sin consentimiento.
export const advancedConsentMode = process.env.NEXT_PUBLIC_GA_CONSENT_MODE === "advanced";

// Permisos de Consent Mode v2 según las categorías aceptadas en el banner de cookies.
export function consentState(consent: Consent | null) {
  const state = (granted: boolean | undefined) => (granted ? "granted" : "denied");
  return {
    analytics_storage: state(consent?.analytics),
    ad_storage: state(consent?.marketing),
    ad_user_data: state(consent?.marketing),
    ad_personalization: state(consent?.marketing),
  };
}

// Prepara `dataLayer` y `gtag` una sola vez, con todo denegado por defecto antes de cualquier
// medición. Lo comparten Analytics (gtag.js) y Tag Manager, que pueden convivir en la misma página.
export function ensureGtag() {
  if (window.gtag) return window.gtag;
  const dataLayer = (window.dataLayer ??= []);
  const gtag: NonNullable<Window["gtag"]> = function () {
    // gtag.js y Tag Manager esperan el objeto `arguments` tal cual, no un array.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  window.gtag = gtag;
  gtag("consent", "default", { ...consentState(null), wait_for_update: 500 });
  gtag("set", "ads_data_redaction", true);
  return gtag;
}
