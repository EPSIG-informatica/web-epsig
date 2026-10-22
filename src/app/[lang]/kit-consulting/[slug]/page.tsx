import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogDetail from "@/components/catalog-detail";
import ProgramStatus from "@/components/program-status";
import { kitConsultingServices, programStatus, site } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export function generateStaticParams() {
  return kitConsultingServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kit-consulting/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = kitConsultingServices.find((s) => s.slug === slug);
  if (!service) return {};
  const t = await getT();
  return pageMetadata(`/kit-consulting/${slug}`, {
    title: `Kit Consulting: ${t(service.title)}`,
    description: t(
      `${service.summary.es} Servicio de asesoramiento del catálogo Kit Consulting prestado por ${site.name}.`,
      `${service.summary.ca} Servei d'assessorament del catàleg Kit Consulting prestat per ${site.name}.`,
    ),
  });
}

export default async function KitConsultingServicePage({
  params,
}: PageProps<"/[lang]/kit-consulting/[slug]">) {
  const { slug } = await params;
  const service = kitConsultingServices.find((s) => s.slug === slug);
  if (!service) notFound();
  const t = await getT();

  return (
    <CatalogDetail
      path={`/kit-consulting/${slug}`}
      eyebrow="Kit Consulting"
      title={t(service.title)}
      lead={t(service.summary)}
      body={t(service.body)}
      backHref="/kit-consulting"
      backLabel={t("Ver todos los servicios de Kit Consulting", "Veure tots els serveis de Kit Consulting")}
      notice={<ProgramStatus program="Kit Consulting" open={programStatus.kitConsulting} compact />}
      ctaTitle={t("¿Te interesa este servicio?", "T'interessa este servei?")}
      ctaBody={t(
        "Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas.",
        "T'assessorem sense compromís i t'avisem tan prompte com hi haja una nova convocatòria d'ajudes.",
      )}
      ctaLabel={t("Solicitar información", "Sol·licitar informació")}
    />
  );
}
