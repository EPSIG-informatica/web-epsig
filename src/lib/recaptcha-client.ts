// Google reCAPTCHA v3 en el navegador. El script de Google no se carga con la página: solo cuando
// alguien empieza a usar el formulario de contacto (así no llega a Google cada visita).
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();

// Debe coincidir con RECAPTCHA_ACTION (src/lib/recaptcha.ts), que el servidor comprueba.
const ACTION = "contacto";
const TIMEOUT_MS = 8_000;

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (key: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let loading: Promise<Grecaptcha> | null = null;

export function recaptchaEnabled() {
  return Boolean(siteKey);
}

/** Carga el script de reCAPTCHA una sola vez (en el idioma de la página). */
export function loadRecaptcha(lang: string): Promise<Grecaptcha> | null {
  if (!siteKey) return null;
  loading ??= new Promise<Grecaptcha>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}&hl=${encodeURIComponent(lang)}`;
    script.async = true;
    script.onload = () => {
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) return reject(new Error("reCAPTCHA no disponible"));
      grecaptcha.ready(() => resolve(grecaptcha));
    };
    script.onerror = () => {
      loading = null; // Se reintentará en el siguiente envío.
      script.remove();
      reject(new Error("No se pudo cargar reCAPTCHA"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

/**
 * Token para enviar con el formulario. Devuelve undefined si reCAPTCHA no está configurado o no
 * ha podido cargarse (bloqueadores, red): en ese caso el servidor decide, con un mensaje claro.
 */
export async function recaptchaToken(lang: string): Promise<string | undefined> {
  const pending = loadRecaptcha(lang);
  if (!pending || !siteKey) return undefined;
  try {
    const grecaptcha = await Promise.race([
      pending,
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)),
    ]);
    return await grecaptcha.execute(siteKey, { action: ACTION });
  } catch {
    return undefined;
  }
}
