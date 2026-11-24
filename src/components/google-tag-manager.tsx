"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { advancedConsentMode, consentState, ensureGtag, gaId, gtmId } from "@/lib/google-tag";
import { trackContactClick } from "@/components/google-analytics";

let started = false;

// Prepara `dataLayer` y `gtag` (con todo denegado por defecto) y marca el arranque del contenedor
// antes de que Tag Manager cargue ninguna etiqueta. `window.gtag` hace que `trackEvent` siga
// enviando los eventos de contacto (generate_lead, phone_click, email_click) al contenedor.
function initDataLayer() {
  const gtag = ensureGtag();
  if (!started) {
    started = true;
    window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
  }
  return gtag;
}

// Google Tag Manager con Consent Mode v2. En el modo básico no se carga hasta que el usuario acepta
// las cookies analíticas o las de marketing; en el avanzado se carga siempre, con todo denegado.
// No se incluye el <noscript> del snippet oficial: cargaría Google sin consentimiento.
export default function GoogleTagManager() {
  const consent = useConsent();
  // `consent` es `undefined` hasta leer la elección guardada en el navegador.
  const enabled =
    Boolean(gtmId) &&
    consent !== undefined &&
    (advancedConsentMode || Boolean(consent?.analytics) || Boolean(consent?.marketing));

  useEffect(() => {
    if (enabled) initDataLayer()("consent", "update", consentState(consent ?? null));
  }, [enabled, consent]);

  // Los clics de contacto los registra el componente de Analytics si hay un ID de GA4 propio;
  // aquí solo cuando no lo hay, para no enviar cada evento dos veces.
  useEffect(() => {
    if (!enabled || gaId) return;
    document.addEventListener("click", trackContactClick, { capture: true });
    return () => document.removeEventListener("click", trackContactClick, { capture: true });
  }, [enabled]);

  if (!enabled) return null;
  return <Script id="google-tag-manager" src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} strategy="afterInteractive" />;
}
