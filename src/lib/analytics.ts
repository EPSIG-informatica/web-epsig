// Eventos de Google Analytics 4. Si GA no está cargado (sin ID configurado o, en el modo de
// consentimiento básico, sin aceptar las cookies analíticas), no se envía nada.

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/**
 * Envía un evento a GA4. Los de conversión (`generate_lead`, `phone_click`, `email_click`) hay que
 * marcarlos como "eventos clave" en GA4 (Administrar → Eventos) para verlos como conversiones.
 */
export function trackEvent(name: string, params?: Record<string, string | number | undefined>) {
  window.gtag?.("event", name, params);
}
