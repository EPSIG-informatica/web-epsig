// Idiomas de la web. El castellano va sin prefijo (/servicios/), el valenciano bajo /ca/
// (/ca/servicios/) y el inglés bajo /en/ (/en/servicios/). Internamente, `src/proxy.ts` reescribe las URLs sin prefijo a /es/... para que
// todas las páginas cuelguen de `app/[lang]`.
export const locales = ["es", "ca", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

// Cookie con el idioma que el usuario ha elegido en el selector (cookie técnica de personalización:
// solo se crea al pulsar el selector, nunca de forma automática).
export const LOCALE_COOKIE = "idioma";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const localeNames: Record<Locale, string> = { es: "Castellano", ca: "Valencià", en: "English" };
export const localeShortNames: Record<Locale, string> = { es: "ES", ca: "VA", en: "EN" };
export const ogLocales: Record<Locale, string> = { es: "es_ES", ca: "ca_ES", en: "en_GB" };
export const schemaLanguages: Record<Locale, string> = { es: "es-ES", ca: "ca-ES", en: "en-GB" };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Texto (o cualquier valor) en los tres idiomas. */
export type Localized<T = string> = { readonly es: T; readonly ca: T; readonly en: T };

/**
 * Segmentos de URL en inglés (SEO): la web en inglés usa direcciones en inglés
 * ("/en/services/business-protection/") aunque internamente las páginas sigan en castellano
 * ("app/[lang]/servicios/proteccion-del-negocio"). `src/proxy.ts` reescribe las URLs públicas a
 * las internas y redirige (301) las antiguas en castellano bajo /en/ a su versión en inglés.
 * Los segmentos que no aparecen aquí (odoo, software, kit-digital, slugs de catálogo...) se
 * quedan igual. Castellano y valenciano mantienen sus URLs de siempre.
 */
const enSegments: Record<string, string> = {
  servicios: "services",
  "consultoria-empresarial": "business-consulting",
  "transformacion-digital": "digital-transformation",
  "proteccion-del-negocio": "business-protection",
  "economico-financiero": "financial-advisory",
  laboral: "employment-advisory",
  "fiscal-contable": "tax-accounting-advisory",
  "control-electrico-camping": "campsite-electricity-management",
  "viviendas-tuteladas": "supported-housing",
  conectores: "connectors",
  nosotros: "about-us",
  contacto: "contact",
  enviado: "sent",
  "aviso-legal": "legal-notice",
  "politica-de-privacidad": "privacy-policy",
  "politica-de-cookies": "cookie-policy",
};
const enSegmentsReverse: Record<string, string> = Object.fromEntries(
  Object.entries(enSegments).map(([internal, english]) => [english, internal]),
);

/** Traduce cada segmento de la ruta (sin tocar ?query ni #ancla). */
function mapSegments(href: string, map: Record<string, string>): string {
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const suffix = cut === -1 ? "" : href.slice(cut);
  return path.split("/").map((segment) => map[segment] ?? segment).join("/") + suffix;
}

/** Ruta interna (castellano) → ruta pública en inglés: "/servicios/odoo" → "/services/odoo". */
export function toEnglishPath(path: string): string {
  return mapSegments(path, enSegments);
}

/** Ruta pública en inglés → ruta interna: "/services/odoo" → "/servicios/odoo". */
export function fromEnglishPath(path: string): string {
  return mapSegments(path, enSegmentsReverse);
}

/**
 * URL pública de una ruta interna en un idioma: "/servicios" → "/ca/servicios" o "/en/services".
 * Deja igual los enlaces externos, mailto:, tel:, anclas y ficheros estáticos de /public.
 */
export function localizePath(href: string, lang: Locale): string {
  if (lang === defaultLocale || !href.startsWith("/") || href.startsWith("//")) return href;
  const pathOnly = href.split(/[?#]/)[0];
  if (/^\/api(\/|$)/.test(pathOnly) || /\.[a-z0-9]+$/i.test(pathOnly)) return href;
  const { path } = splitLocale(href);
  const publicPath = lang === "en" ? toEnglishPath(path) : path;
  return publicPath === "/" ? `/${lang}/` : `/${lang}${publicPath}`;
}

/**
 * Separa el prefijo de idioma de una ruta y devuelve la ruta interna:
 * "/ca/servicios/" → { lang: "ca", path: "/servicios/" }; "/en/services/" → { lang: "en", path: "/servicios/" }.
 */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const match = pathname.match(/^\/(es|ca|en)(?=\/|$|[?#])/);
  if (!match) return { lang: defaultLocale, path: pathname || "/" };
  const rest = pathname.slice(match[0].length);
  const path = rest.startsWith("/") ? rest : `/${rest}`;
  const lang = match[1] as Locale;
  return { lang, path: lang === "en" ? fromEnglishPath(path) : path };
}

/** Ruta interna sin idioma ni barra final, para comparar enlaces: "/en/services/" → "/servicios". */
export function logicalPath(pathname: string): string {
  const { path } = splitLocale(pathname);
  return path.length > 1 ? path.replace(/\/+$/, "") : "/";
}

export type Translate = {
  /** Elige el texto del idioma actual: `t("Contacto", "Contacte", "Contact")` o `t(site.tagline)`. */
  <T>(es: T, ca: T, en: T): T;
  <T>(text: Localized<T>): T;
  lang: Locale;
  /** Ruta interna en el idioma actual: `t.path("/contacto")`. */
  path: (href: string) => string;
};

export function translator(lang: Locale): Translate {
  const t = ((...args: unknown[]) => {
    if (args.length === 1) return (args[0] as Localized<unknown>)[lang];
    return args[locales.indexOf(lang)];
  }) as Translate;
  t.lang = lang;
  t.path = (href) => localizePath(href, lang);
  return t;
}

/**
 * Idioma preferido según la cabecera Accept-Language: el primero de la lista (por peso) que sea
 * castellano, catalán/valenciano (ca, ca-ES, ca-ES-valencia...) o inglés (en, en-GB...).
 * Si no hay ninguno, castellano.
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
