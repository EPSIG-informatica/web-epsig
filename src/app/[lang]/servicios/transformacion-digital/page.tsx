import type { Metadata } from "next";
import ServiceDetail from "@/components/service-detail";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/servicios/transformacion-digital", {
    title: t("Transformación Digital", "Transformació Digital"),
    description: t(
      "Automatización, IA y digitalización de procesos para pymes. Agentes Digitalizadores Adheridos y Asesores Digitales de Kit Digital y Kit Consulting.",
      "Automatització, IA i digitalització de processos per a pimes. Agents Digitalitzadors Adherits i Assessors Digitals de Kit Digital i Kit Consulting.",
    ),
  });
}

export default async function TransformacionDigitalPage() {
  const t = await getT();
  return (
    <ServiceDetail
      eyebrow={t("Transformación Digital", "Transformació Digital")}
      title={t(
        "Automatización e IA aplicadas a tu día a día, no a la teoría",
        "Automatització i IA aplicades al teu dia a dia, no a la teoria",
      )}
      lead={t(
        "Digitalizamos los procesos que realmente te quitan tiempo — y, cuando aplica, te ayudamos a financiarlo.",
        "Digitalitzem els processos que de veritat et lleven temps — i, quan és possible, t'ajudem a finançar-ho.",
      )}
      intro={t(
        "Diseñamos e implantamos proyectos de digitalización a medida, desde la automatización de tareas repetitivas hasta la implantación de Odoo ERP como núcleo del negocio. Como Agente Digitalizador Adherido y Asesor Digital, trabajamos también con los catálogos de Kit Digital y Kit Consulting.",
        "Dissenyem i implantem projectes de digitalització a mida, des de l'automatització de tasques repetitives fins a la implantació d'Odoo ERP com a nucli del negoci. Com a Agent Digitalitzador Adherit i Assessor Digital, treballem també amb els catàlegs de Kit Digital i Kit Consulting.",
      )}
      features={[
        {
          title: t("Automatización de procesos", "Automatització de processos"),
          body: t(
            "Eliminamos tareas manuales y repetitivas: facturación, comunicaciones, seguimiento de clientes.",
            "Eliminem tasques manuals i repetitives: facturació, comunicacions, seguiment de clients.",
          ),
        },
        {
          title: t("Inteligencia artificial aplicada", "Intel·ligència artificial aplicada"),
          body: t(
            "Herramientas de IA integradas en procesos reales de la empresa, no experimentos aislados.",
            "Eines d'IA integrades en processos reals de l'empresa, no experiments aïllats.",
          ),
        },
        {
          title: t("Kit Digital y Kit Consulting", "Kit Digital i Kit Consulting"),
          body: t(
            "Somos Agente Digitalizador Adherido y Asesor Digital: implantamos sus soluciones y te avisamos cuando se abran nuevas convocatorias de ayudas.",
            "Som Agent Digitalitzador Adherit i Assessor Digital: implantem les seues solucions i t'avisem quan s'obriguen noves convocatòries d'ajudes.",
          ),
        },
        {
          title: "Odoo ERP",
          body: t(
            "El eje central de la transformación digital: un solo sistema para gestión, ventas e inventario.",
            "L'eix central de la transformació digital: un sol sistema per a gestió, vendes i inventari.",
          ),
        },
      ]}
      ctaTitle={t(
        "¿Quieres saber qué se puede digitalizar en tu empresa?",
        "Vols saber què es pot digitalitzar en la teua empresa?",
      )}
      ctaBody={t(
        "Revisamos tu situación actual y te proponemos por dónde empezar.",
        "Revisem la teua situació actual i et proposem per on començar.",
      )}
      ctaLabel={t("Solicitar diagnóstico", "Sol·licitar diagnòstic")}
    />
  );
}
