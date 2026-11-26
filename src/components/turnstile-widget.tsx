"use client";

import { useEffect, useRef } from "react";

// Widget de Cloudflare Turnstile. Al resolverse, Cloudflare añade al formulario el campo
// `cf-turnstile-response`, que el servidor verifica (src/lib/turnstile.ts).
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; theme?: "light" | "dark" | "auto"; language?: string; size?: "normal" | "flexible" | "compact" },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;

// El script se carga una sola vez.
function loadTurnstile(): Promise<TurnstileApi> {
  loading ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile no disponible"));
    };
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("No se pudo cargar Turnstile"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export function turnstileEnabled() {
  return Boolean(siteKey);
}

/** `resetKey`: al cambiar, se reinicia (cada token solo vale para un envío). */
export default function TurnstileWidget({ lang, resetKey = 0 }: { lang: string; resetKey?: number }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !container.current || widgetId.current !== null) return;
        widgetId.current = turnstile.render(container.current, {
          sitekey: siteKey,
          theme: "light",
          language: lang,
          size: "flexible",
        });
      })
      .catch(() => {
        // Sin widget (bloqueador o red): el servidor pedirá completarlo con un mensaje claro.
      });
    return () => {
      cancelled = true;
      if (widgetId.current !== null) {
        window.turnstile?.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [lang]);

  useEffect(() => {
    if (resetKey && widgetId.current !== null) window.turnstile?.reset(widgetId.current);
  }, [resetKey]);

  if (!siteKey) return null;
  return <div ref={container} className="min-h-[65px] max-w-[400px]" />;
}
