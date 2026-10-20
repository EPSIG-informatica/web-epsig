import type { Metadata } from "next";
import CatalogDetail from "@/components/catalog-detail";
import { asesoriaAreas } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

type AreaWithPage = Extract<(typeof asesoriaAreas)[number], { slug: string }>;
type AreaSlug = AreaWithPage["slug"];

function getArea(slug: AreaSlug) {
  return asesoriaAreas.find((area): area is AreaWithPage => "slug" in area && area.slug === slug)!;
}

export async function asesoriaAreaMetadata(slug: AreaSlug): Promise<Metadata> {
  const t = await getT();
  const area = getArea(slug);
  return pageMetadata(`/${slug}`, { title: t(area.pageTitle), description: t(area.description) });
}

export default async function AsesoriaArea({ slug }: { slug: AreaSlug }) {
  const t = await getT();
  const area = getArea(slug);
  return (
    <CatalogDetail
      eyebrow={t("Consultoría Empresarial", "Consultoria Empresarial")}
      title={t(area.pageTitle)}
      body={t(area.body)}
      backHref="/servicios/consultoria-empresarial"
      backLabel={t("Ver toda la Consultoría Empresarial", "Veure tota la Consultoria Empresarial")}
      ctaTitle={t("¿Hablamos de tu caso?", "Parlem del teu cas?")}
      ctaBody={t(
        "Una primera conversación gratuita para entender dónde estás y qué necesitas.",
        "Una primera conversa gratuïta per a entendre on estàs i què necessites.",
      )}
      ctaLabel={t("Solicitar diagnóstico", "Sol·licitar diagnòstic")}
    />
  );
}
