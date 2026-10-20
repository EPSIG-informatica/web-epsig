import { lang } from "next/root-params";
import type { Metadata } from "next";
import {
  defaultLocale,
  isLocale,
  localizePath,
  locales,
  ogLocales,
  translator,
  type Locale,
} from "@/lib/i18n";
import { site } from "@/lib/site";

/** Idioma de la página actual (segmento `[lang]` de la URL interna). Solo en el servidor. */
export async function getLang(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}

/** Traductor del idioma de la página actual: `const t = await getT(); t("Hola", "Hola")`. */
export async function getT() {
  return translator(await getLang());
}

/** URL absoluta (con barra final) de una ruta interna en un idioma. */
export function absoluteUrl(path: string, locale: Locale) {
  const localized = localizePath(path, locale);
  return `${site.url}${localized.endsWith("/") ? localized : `${localized}/`}`;
}

/**
 * Metadatos de una página: título, descripción, canónica de su idioma y alternativas hreflang
 * (es, ca y x-default → castellano), también para redes sociales.
 */
export async function pageMetadata(
  path: string,
  {
    title,
    description,
    absoluteTitle = false,
    ...rest
  }: Omit<Metadata, "title" | "description"> & {
    title: string;
    description?: string;
    /** El título se usa tal cual, sin añadir " — EPSIG Consultores" (p. ej. en la portada). */
    absoluteTitle?: boolean;
  },
): Promise<Metadata> {
  const current = await getLang();
  const url = absoluteUrl(path, current);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(path, locale)])),
        "x-default": absoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      title: absoluteTitle ? title : `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: ogLocales[current],
      alternateLocale: locales.filter((locale) => locale !== current).map((locale) => ogLocales[locale]),
      type: "website",
      // `app/opengraph-image.png` queda por encima del layout raíz (`app/[lang]`), así que Next no
      // la añade sola: se enlaza aquí.
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: site.name }],
    },
    ...rest,
  };
}
