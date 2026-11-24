// Configuración compartida de Google Tag Manager y de Google Analytics 4 (Consent Mode v2).

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
