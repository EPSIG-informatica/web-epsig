"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent, type Consent } from "@/lib/consent";
import { trackEvent } from "@/lib/analytics";
import { advancedConsentMode, gtmId } from "@/lib/google-tag";

// Solo se acepta un ID de medición válido (G-XXXXXXX), ya que se inserta en la URL del script.
const rawGaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const gaId = rawGaId && /^G-[A-Z0-9]+$/.test(rawGaId) ? rawGaId : undefined;

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

// Prepara `gtag` una sola vez, con todo denegado por defecto antes de cualquier medición.
function initGtag(id: string) {
  if (window.gtag) return window.gtag;
  const dataLayer = (window.dataLayer ??= []);
  const gtag: NonNullable<Window["gtag"]> = function () {
    // gtag.js espera el objeto `arguments` tal cual, no un array.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  window.gtag = gtag;
  gtag("consent", "default", { ...consentState(null), wait_for_update: 500 });
  gtag("set", "ads_data_redaction", true);
  gtag("js", new Date());
  gtag("config", id);
  return gtag;
}

// Clics en los teléfonos y correos de cualquier página (enlaces tel: y mailto:).
export function trackContactClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest("a[href^='tel:'], a[href^='mailto:']");
  const href = link?.getAttribute("href");
  if (!href) return;
  trackEvent(href.startsWith("tel:") ? "phone_click" : "email_click", {
    link_url: href,
    page_path: window.location.pathname,
  });
}

// Google Analytics 4 con Consent Mode v2 y eventos de contacto.
// Si hay un contenedor de Tag Manager (NEXT_PUBLIC_GTM_ID), GA4 se configura dentro de Tag Manager
// y este componente no carga gtag.js, para no contar cada visita dos veces.
export default function GoogleAnalytics() {
  const consent = useConsent();
  // `consent` es `undefined` hasta leer la elección guardada en el navegador.
  const enabled =
    Boolean(gaId) && !gtmId && consent !== undefined && (advancedConsentMode || Boolean(consent?.analytics));

  useEffect(() => {
    if (enabled) initGtag(gaId!)("consent", "update", consentState(consent ?? null));
  }, [enabled, consent]);

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("click", trackContactClick, { capture: true });
    return () => document.removeEventListener("click", trackContactClick, { capture: true });
  }, [enabled]);

  if (!enabled) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />;
}
