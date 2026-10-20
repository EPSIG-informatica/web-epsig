import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/catalog-detail";
import ProgramStatus from "@/components/program-status";
import { kitConsultingServices, programStatus, site } from "@/lib/site";

export function generateStaticParams() {
  return kitConsultingServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/kit-consulting/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = kitConsultingServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `Kit Consulting: ${service.title}`,
    description: `${service.summary} Servicio de asesoramiento del catálogo Kit Consulting prestado por ${site.name}.`,
  };
}

export default async function KitConsultingServicePage({
  params,
}: PageProps<"/kit-consulting/[slug]">) {
  const { slug } = await params;
  const service = kitConsultingServices.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <CatalogDetail
      eyebrow="Kit Consulting"
      title={service.title}
      lead={service.summary}
      body={service.body}
      backHref="/kit-consulting"
      backLabel="Ver todos los servicios de Kit Consulting"
      notice={<ProgramStatus program="Kit Consulting" open={programStatus.kitConsulting} compact />}
      ctaTitle="¿Te interesa este servicio?"
      ctaBody="Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas."
      ctaLabel="Solicitar información"
    />
  );
}
