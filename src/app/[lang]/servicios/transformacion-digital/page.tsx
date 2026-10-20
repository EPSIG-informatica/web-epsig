import type { Metadata } from "next";
import ServiceDetail from "@/components/service-detail";

export const metadata: Metadata = {
  title: "Transformación Digital",
  description:
    "Automatización, IA y digitalización de procesos para pymes. Agentes Digitalizadores Adheridos y Asesores Digitales de Kit Digital y Kit Consulting.",
};

export default function TransformacionDigitalPage() {
  return (
    <ServiceDetail
      eyebrow="Transformación Digital"
      title="Automatización e IA aplicadas a tu día a día, no a la teoría"
      lead="Digitalizamos los procesos que realmente te quitan tiempo — y, cuando aplica, te ayudamos a financiarlo."
      intro="Diseñamos e implantamos proyectos de digitalización a medida, desde la automatización de tareas repetitivas hasta la implantación de Odoo ERP como núcleo del negocio. Como Agente Digitalizador Adherido y Asesor Digital, trabajamos también con los catálogos de Kit Digital y Kit Consulting."
      features={[
        {
          title: "Automatización de procesos",
          body: "Eliminamos tareas manuales y repetitivas: facturación, comunicaciones, seguimiento de clientes.",
        },
        {
          title: "Inteligencia artificial aplicada",
          body: "Herramientas de IA integradas en procesos reales de la empresa, no experimentos aislados.",
        },
        {
          title: "Kit Digital y Kit Consulting",
          body: "Somos Agente Digitalizador Adherido y Asesor Digital: implantamos sus soluciones y te avisamos cuando se abran nuevas convocatorias de ayudas.",
        },
        {
          title: "Odoo ERP",
          body: "El eje central de la transformación digital: un solo sistema para gestión, ventas e inventario.",
        },
      ]}
      ctaTitle="¿Quieres saber qué se puede digitalizar en tu empresa?"
      ctaBody="Revisamos tu situación actual y te proponemos por dónde empezar."
      ctaLabel="Solicitar diagnóstico"
    />
  );
}
