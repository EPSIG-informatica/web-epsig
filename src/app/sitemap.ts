import type { MetadataRoute } from "next";
import { kitConsultingServices, kitDigitalCategories, site } from "@/lib/site";
import { defaultLocale, localizePath, locales } from "@/lib/i18n";

const routes = [
  "",
  "/servicios",
  "/servicios/odoo",
  "/servicios/consultoria-empresarial",
  "/servicios/transformacion-digital",
  "/servicios/proteccion-del-negocio",
  "/economico-financiero",
  "/laboral",
  "/fiscal-contable",
  "/software",
  "/software/control-electrico-camping",
  "/software/viviendas-tuteladas",
  "/software/conectores",
  "/kit-digital",
  ...kitDigitalCategories.map((cat) => `/kit-digital/${cat.slug}`),
  "/kit-consulting",
  ...kitConsultingServices.map((service) => `/kit-consulting/${service.slug}`),
  "/nosotros",
  "/contacto",
  "/aviso-legal",
  "/politica-de-privacidad",
  "/politica-de-cookies",
];

// URL absoluta con barra final de una ruta en un idioma ("" es la portada).
function url(route: string, lang: (typeof locales)[number]) {
  const path = localizePath(route || "/", lang);
  return `${site.url}${path.endsWith("/") ? path : `${path}/`}`;
}

// Cada página aparece en sus dos idiomas, y cada entrada enlaza a su versión en el otro (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((lang) => ({
      url: url(route, lang),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((locale) => [locale, url(route, locale)])),
          "x-default": url(route, defaultLocale),
        },
      },
    })),
  );
}
