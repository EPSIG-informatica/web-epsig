import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/catalog-detail";
import ProgramStatus from "@/components/program-status";
import { kitDigitalCategories, programStatus, site } from "@/lib/site";

export function generateStaticParams() {
  return kitDigitalCategories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/kit-digital/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = kitDigitalCategories.find((cat) => cat.slug === slug);
  if (!category) return {};
  return {
    title: `Kit Digital: ${category.title}`,
    description: `${category.summary} ${category.priceFrom}. Solución del catálogo Kit Digital implantada por ${site.name}.`,
  };
}

export default async function KitDigitalCategoryPage({
  params,
}: PageProps<"/kit-digital/[slug]">) {
  const { slug } = await params;
  const category = kitDigitalCategories.find((cat) => cat.slug === slug);
  if (!category) notFound();

  return (
    <CatalogDetail
      eyebrow="Kit Digital"
      title={category.title}
      lead={category.summary}
      body={category.body}
      features={category.features}
      price={category.priceFrom}
      backHref="/kit-digital"
      backLabel="Ver todas las categorías de Kit Digital"
      notice={<ProgramStatus program="Kit Digital" open={programStatus.kitDigital} compact />}
      ctaTitle="¿Te interesa esta solución?"
      ctaBody="Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas."
      ctaLabel="Solicitar información"
    />
  );
}
