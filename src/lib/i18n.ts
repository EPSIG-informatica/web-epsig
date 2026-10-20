// Idiomas de la web. El castellano va sin prefijo (/servicios/) y el valenciano bajo /ca/
// (/ca/servicios/). Internamente, `src/proxy.ts` reescribe las URLs sin prefijo a /es/... para que
// todas las páginas cuelguen de `app/[lang]`.
export const locales = ["es", "ca"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

// Cookie con el idioma que el usuario ha elegido en el selector (cookie técnica de personalización:
// solo se crea al pulsar el selector, nunca de forma automática).
export const LOCALE_COOKIE = "idioma";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const localeNames: Record<Locale, string> = { es: "Castellano", ca: "Valencià" };
export const localeShortNames: Record<Locale, string> = { es: "ES", ca: "VA" };
export const ogLocales: Record<Locale, string> = { es: "es_ES", ca: "ca_ES" };
export const schemaLanguages: Record<Locale, string> = { es: "es-ES", ca: "ca-ES" };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Texto (o cualquier valor) en los dos idiomas. */
export type Localized<T = string> = { readonly es: T; readonly ca: T };

/**
 * URL pública de una ruta interna en un idioma: "/servicios" → "/ca/servicios".
 * Deja igual los enlaces externos, mailto:, tel:, anclas y ficheros estáticos de /public.
 */
export function localizePath(href: string, lang: Locale): string {
  if (lang === defaultLocale || !href.startsWith("/") || href.startsWith("//")) return href;
  const pathOnly = href.split(/[?#]/)[0];
  if (/^\/api(\/|$)/.test(pathOnly) || /\.[a-z0-9]+$/i.test(pathOnly)) return href;
  const { path } = splitLocale(href);
  return path === "/" ? `/${lang}/` : `/${lang}${path}`;
}

/** Separa el prefijo de idioma de una ruta: "/ca/servicios/" → { lang: "ca", path: "/servicios/" }. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const match = pathname.match(/^\/(es|ca)(?=\/|$|[?#])/);
  if (!match) return { lang: defaultLocale, path: pathname || "/" };
  const rest = pathname.slice(match[0].length);
  return { lang: match[1] as Locale, path: rest.startsWith("/") ? rest : `/${rest}` };
}

/** Ruta sin idioma ni barra final, para comparar enlaces: "/ca/servicios/" → "/servicios". */
export function logicalPath(pathname: string): string {
  const { path } = splitLocale(pathname);
  return path.length > 1 ? path.replace(/\/+$/, "") : "/";
}

export type Translate = {
  /** Elige el texto del idioma actual: `t("Contacto", "Contacte")` o `t(site.tagline)`. */
  <T>(es: T, ca: T): T;
  <T>(text: Localized<T>): T;
  lang: Locale;
  /** Ruta interna en el idioma actual: `t.path("/contacto")`. */
  path: (href: string) => string;
};

export function translator(lang: Locale): Translate {
  const t = ((...args: unknown[]) => {
    if (args.length === 1) return (args[0] as Localized<unknown>)[lang];
    return lang === "ca" ? args[1] : args[0];
  }) as Translate;
  t.lang = lang;
  t.path = (href) => localizePath(href, lang);
  return t;
}

/**
 * Idioma preferido según la cabecera Accept-Language: el primero de la lista (por peso) que sea
 * castellano o catalán/valenciano (ca, ca-ES, ca-ES-valencia...). Si no hay ninguno, castellano.
 */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number(q.slice(2)) : 1;
      return { base: tag.split("-")[0], weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter((entry) => entry.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  for (const { base } of ranked) {
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}
