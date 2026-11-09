"use client";

import { useEffect, useRef } from "react";

// Casilla "No soy un robot" de Google reCAPTCHA v2. Al resolverla, Google añade al formulario el
// campo `g-recaptcha-response`, que el servidor verifica (src/lib/recaptcha.ts).
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();

type Grecaptcha = {
  ready: (callback: () => void) => void;
  render: (container: HTMLElement, options: { sitekey: string; theme?: "light" | "dark" }) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let loading: Promise<Grecaptcha> | null = null;

// El script de Google se carga una sola vez, en el idioma de la página.
function loadRecaptcha(lang: string): Promise<Grecaptcha> {
  loading ??= new Promise<Grecaptcha>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${encodeURIComponent(lang)}`;
    script.async = true;
    script.onload = () => {
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) return reject(new Error("reCAPTCHA no disponible"));
      grecaptcha.ready(() => resolve(grecaptcha));
    };
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("No se pudo cargar reCAPTCHA"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export function recaptchaEnabled() {
  return Boolean(siteKey);
}

/**
 * Muestra la casilla. `resetKey`: al cambiar, se vacía (tras un envío fallido, porque cada
 * respuesta de Google solo vale una vez).
 */
export default function RecaptchaCheckbox({ lang, resetKey = 0 }: { lang: string; resetKey?: number }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    loadRecaptcha(lang)
      .then((grecaptcha) => {
        if (cancelled || !container.current || widgetId.current !== null) return;
        widgetId.current = grecaptcha.render(container.current, { sitekey: siteKey, theme: "light" });
      })
      .catch(() => {
        // Sin casilla (bloqueador o red): el servidor pedirá marcarla con un mensaje claro.
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    if (resetKey && widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
  }, [resetKey]);

  if (!siteKey) return null;
  // La casilla mide 304 px: en pantallas muy estrechas se reduce un poco para que quepa.
  return <div ref={container} className="min-h-[78px] origin-left max-[400px]:scale-[0.85]" />;
}
