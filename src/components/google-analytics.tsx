"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { trackEvent } from "@/lib/analytics";
import { advancedConsentMode, consentState, ensureGtag, gaId } from "@/lib/google-tag";

let configured = false;

// Prepara `gtag` y configura la medición de la propiedad de GA4 una sola vez.
function initGtag(id: string) {
  const gtag = ensureGtag();
  if (!configured) {
    configured = true;
    gtag("js", new Date());
    gtag("config", id);
  }
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

// Google Analytics 4 (NEXT_PUBLIC_GA_ID) con Consent Mode v2 y eventos de contacto.
// Puede convivir con Tag Manager (NEXT_PUBLIC_GTM_ID); si ambos miden la misma propiedad de GA4,
// cada visita se contaría dos veces: en ese caso deja solo uno de los dos.
export default function GoogleAnalytics() {
  const consent = useConsent();
  // `consent` es `undefined` hasta leer la elección guardada en el navegador.
  const enabled = Boolean(gaId) && consent !== undefined && (advancedConsentMode || Boolean(consent?.analytics));

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
