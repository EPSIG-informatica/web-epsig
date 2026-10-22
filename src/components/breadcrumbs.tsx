import Link from "@/components/link";
import { JsonLd } from "@/components/structured-data";
import {
  asesoriaAreas,
  kitConsultingServices,
  kitDigitalCategories,
  pillars,
  software,
} from "@/lib/site";
import { absoluteUrl, getT } from "@/lib/i18n-server";
import type { Localized } from "@/lib/i18n";

// Nombre de cada página en la ruta de navegación y, si no cuelga de la ruta de su URL, su página
// padre (p. ej. /laboral está dentro de Consultoría Empresarial). Sin `parent`, el padre es la
// URL sin su último tramo, y si no está aquí, la portada.
const pages: Record<string, { label: Localized; parent?: string }> = {
  "/servicios": { label: { es: "Servicios", ca: "Serveis", en: "Services" } },
  "/servicios/odoo": { label: { es: "Odoo ERP", ca: "Odoo ERP", en: "Odoo ERP" } },
  ...Object.fromEntries(pillars.map((pillar) => [`/servicios/${pillar.slug}`, { label: pillar.title }])),
  ...Object.fromEntries(
    asesoriaAreas
      .filter((area): area is Extract<typeof area, { slug: string }> => "slug" in area)
      .map((area) => [`/${area.slug}`, { label: area.pageTitle, parent: "/servicios/consultoria-empresarial" }]),
  ),
  "/software": { label: { es: "Software", ca: "Software", en: "Software" } },
  ...Object.fromEntries(Object.values(software).map((item) => [item.href, { label: item.title }])),
  "/kit-digital": { label: { es: "Kit Digital", ca: "Kit Digital", en: "Kit Digital" } },
  ...Object.fromEntries(kitDigitalCategories.map((cat) => [`/kit-digital/${cat.slug}`, { label: cat.title }])),
  "/kit-consulting": { label: { es: "Kit Consulting", ca: "Kit Consulting", en: "Kit Consulting" } },
  ...Object.fromEntries(
    kitConsultingServices.map((service) => [`/kit-consulting/${service.slug}`, { label: service.title }]),
  ),
  "/nosotros": { label: { es: "Nosotros", ca: "Nosaltres", en: "About us" } },
  "/contacto": { label: { es: "Contacto", ca: "Contacte", en: "Contact" } },
};

function parentOf(path: string) {
  if (pages[path]?.parent) return pages[path].parent;
  const parent = path.slice(0, path.lastIndexOf("/"));
  return parent && pages[parent] ? parent : "/";
}

/** Páginas desde la portada hasta `path` (incluida). */
function trail(path: string) {
  const paths: string[] = [];
  for (let current = path; current !== "/" && pages[current]; current = parentOf(current)) {
    paths.unshift(current);
  }
  return paths;
}

/**
 * Ruta de navegación visible ("Inicio › Servicios › Odoo ERP") y su versión para Google
 * (JSON-LD `BreadcrumbList`). Pensada para las cabeceras oscuras de las páginas.
 */
export default async function Breadcrumbs({
  path,
  align = "center",
  className = "",
}: {
  path: string;
  align?: "center" | "left";
  className?: string;
}) {
  const t = await getT();
  const items = [
    { path: "/", name: t("Inicio", "Inici", "Home") },
    ...trail(path).map((page) => ({ path: page, name: t(pages[page].label) })),
  ];

  return (
    <>
      <nav aria-label={t("Ruta de navegación", "Ruta de navegació", "Breadcrumb")} className={className}>
        <ol
          className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12.5px] text-mist-faint ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {items.map((item, index) => (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden>›</span>}
              {index === items.length - 1 ? (
                <span aria-current="page" className="text-mist-soft">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-white">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path, t.lang),
          })),
        }}
      />
    </>
  );
}
