"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { advancedConsentMode, gtmId } from "@/lib/google-tag";
import { consentState, trackContactClick } from "@/components/google-analytics";

// Prepara `dataLayer` y `gtag` una sola vez, con todo denegado por defecto antes de que Tag Manager
// cargue ninguna etiqueta. Define `window.gtag` para que `trackEvent` siga enviando los eventos de
// contacto (generate_lead, phone_click, email_click) al contenedor.
function initDataLayer() {
  if (window.gtag) return window.gtag;
  const dataLayer = (window.dataLayer ??= []);
  const gtag: NonNullable<Window["gtag"]> = function () {
    // Tag Manager espera el objeto `arguments` tal cual, no un array.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  window.gtag = gtag;
  gtag("consent", "default", { ...consentState(null), wait_for_update: 500 });
  gtag("set", "ads_data_redaction", true);
  dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
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

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("click", trackContactClick, { capture: true });
    return () => document.removeEventListener("click", trackContactClick, { capture: true });
  }, [enabled]);

  if (!enabled) return null;
  return <Script id="google-tag-manager" src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} strategy="afterInteractive" />;
}
