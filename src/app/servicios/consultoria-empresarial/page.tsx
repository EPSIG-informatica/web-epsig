import type { Metadata } from "next";
import ServiceDetail from "@/components/service-detail";
import { asesoriaAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consultoría Empresarial",
  description:
    "Asesoría económico-financiera, laboral y fiscal-contable, empresa familiar y protección de datos para pymes y particulares.",
};

export default function ConsultoriaEmpresarialPage() {
  return (
    <ServiceDetail
      eyebrow="Consultoría Empresarial"
      title="La asesoría de toda la vida, con la organización que necesita una empresa que crece"
      lead="Antes de digitalizar o proteger nada, hay que tener claro cómo está tu empresa hoy: sus cuentas, su personal y su cumplimiento normativo."
      features={asesoriaAreas.map((area) => ({
        title: area.title,
        body: area.body,
        href: "slug" in area ? `/${area.slug}` : undefined,
      }))}
      ctaTitle="¿Hablamos de la organización de tu empresa?"
      ctaBody="Una primera conversación gratuita para entender dónde estás y qué necesitas."
      ctaLabel="Solicitar diagnóstico"
    />
  );
}
