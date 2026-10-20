import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/catalog-detail";
import ProgramStatus from "@/components/program-status";
import { kitDigitalCategories, programStatus, site } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export function generateStaticParams() {
  return kitDigitalCategories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kit-digital/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = kitDigitalCategories.find((cat) => cat.slug === slug);
  if (!category) return {};
  const t = await getT();
  return pageMetadata(`/kit-digital/${slug}`, {
    title: `Kit Digital: ${t(category.title)}`,
    description: t(
      `${category.summary.es} ${category.priceFrom.es}. Solución del catálogo Kit Digital implantada por ${site.name}.`,
      `${category.summary.ca} ${category.priceFrom.ca}. Solució del catàleg Kit Digital implantada per ${site.name}.`,
    ),
  });
}

export default async function KitDigitalCategoryPage({
  params,
}: PageProps<"/[lang]/kit-digital/[slug]">) {
  const { slug } = await params;
  const category = kitDigitalCategories.find((cat) => cat.slug === slug);
  if (!category) notFound();
  const t = await getT();

  return (
    <CatalogDetail
      eyebrow="Kit Digital"
      title={t(category.title)}
      lead={t(category.summary)}
      body={t(category.body)}
      features={category.features.map((f) => t(f))}
      price={t(category.priceFrom)}
      backHref="/kit-digital"
      backLabel={t("Ver todas las categorías de Kit Digital", "Veure totes les categories de Kit Digital")}
      notice={<ProgramStatus program="Kit Digital" open={programStatus.kitDigital} compact />}
      ctaTitle={t("¿Te interesa esta solución?", "T'interessa esta solució?")}
      ctaBody={t(
        "Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas.",
        "T'assessorem sense compromís i t'avisem tan prompte com hi haja una nova convocatòria d'ajudes.",
      )}
      ctaLabel={t("Solicitar información", "Sol·licitar informació")}
    />
  );
}
