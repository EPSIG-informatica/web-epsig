import type { MetadataRoute } from "next";
import { kitConsultingServices, kitDigitalCategories, site } from "@/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}/`,
  }));
}
