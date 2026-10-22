import type { Metadata } from "next";
import ServiceDetail from "@/components/service-detail";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/servicios/transformacion-digital", {
    title: t("Transformación digital e IA para pymes en Valencia", "Transformació digital i IA per a pimes a València", "Digital Transformation and AI for SMEs"),
    description: t(
      "Automatización, IA y digitalización de procesos para pymes. Agentes Digitalizadores Adheridos y Asesores Digitales de Kit Digital y Kit Consulting.",
      "Automatització, IA i digitalització de processos per a pimes. Agents Digitalitzadors Adherits i Assessors Digitals de Kit Digital i Kit Consulting.",
      "Automation, AI and process digitalisation for SMEs. Accredited Digitalisation Agents and Accredited Digital Advisors for Kit Digital and Kit Consulting.",
    ),
  });
}

export default async function TransformacionDigitalPage() {
  const t = await getT();
  return (
    <ServiceDetail
      path="/servicios/transformacion-digital"
      eyebrow={t("Transformación Digital", "Transformació Digital", "Digital Transformation")}
      title={t(
        "Automatización e IA aplicadas a tu día a día, no a la teoría",
        "Automatització i IA aplicades al teu dia a dia, no a la teoria",
        "Automation and AI applied to your day-to-day, not to theory",
      )}
      lead={t(
        "Digitalizamos los procesos que realmente te quitan tiempo — y, cuando aplica, te ayudamos a financiarlo.",
        "Digitalitzem els processos que de veritat et lleven temps — i, quan és possible, t'ajudem a finançar-ho.",
        "We digitalise the processes that really eat into your time — and, where possible, we help you fund it.",
      )}
      intro={t(
        "Diseñamos e implantamos proyectos de digitalización a medida, desde la automatización de tareas repetitivas hasta la implantación de Odoo ERP como núcleo del negocio. Como Agente Digitalizador Adherido y Asesor Digital, trabajamos también con los catálogos de Kit Digital y Kit Consulting.",
        "Dissenyem i implantem projectes de digitalització a mida, des de l'automatització de tasques repetitives fins a la implantació d'Odoo ERP com a nucli del negoci. Com a Agent Digitalitzador Adherit i Assessor Digital, treballem també amb els catàlegs de Kit Digital i Kit Consulting.",
        "We design and implement bespoke digitalisation projects, from automating repetitive tasks to implementing Odoo ERP as the core of your business. As an Accredited Digitalisation Agent and Accredited Digital Advisor, we also work with the Kit Digital and Kit Consulting catalogues.",
      )}
      features={[
        {
          title: t("Automatización de procesos", "Automatització de processos", "Process automation"),
          body: t(
            "Eliminamos tareas manuales y repetitivas: facturación, comunicaciones, seguimiento de clientes.",
            "Eliminem tasques manuals i repetitives: facturació, comunicacions, seguiment de clients.",
            "We eliminate manual, repetitive tasks: invoicing, communications, customer follow-up.",
          ),
        },
        {
          title: t("Inteligencia artificial aplicada", "Intel·ligència artificial aplicada", "Applied artificial intelligence"),
          body: t(
            "Herramientas de IA integradas en procesos reales de la empresa, no experimentos aislados.",
            "Eines d'IA integrades en processos reals de l'empresa, no experiments aïllats.",
            "AI tools built into the company's real processes, not isolated experiments.",
          ),
        },
        {
          title: t("Kit Digital y Kit Consulting", "Kit Digital i Kit Consulting", "Kit Digital and Kit Consulting"),
          body: t(
            "Somos Agente Digitalizador Adherido y Asesor Digital: implantamos sus soluciones y te avisamos cuando se abran nuevas convocatorias de ayudas.",
            "Som Agent Digitalitzador Adherit i Assessor Digital: implantem les seues solucions i t'avisem quan s'obriguen noves convocatòries d'ajudes.",
            "We are an Accredited Digitalisation Agent and Accredited Digital Advisor: we implement their solutions and let you know when new funding calls open.",
          ),
        },
        {
          title: "Odoo ERP",
          body: t(
            "El eje central de la transformación digital: un solo sistema para gestión, ventas e inventario.",
            "L'eix central de la transformació digital: un sol sistema per a gestió, vendes i inventari.",
            "The backbone of digital transformation: a single system for management, sales and inventory.",
          ),
        },
      ]}
      ctaTitle={t(
        "¿Quieres saber qué se puede digitalizar en tu empresa?",
        "Vols saber què es pot digitalitzar en la teua empresa?",
        "Want to know what could be digitalised in your business?",
      )}
      ctaBody={t(
        "Revisamos tu situación actual y te proponemos por dónde empezar.",
        "Revisem la teua situació actual i et proposem per on començar.",
        "We review your current situation and suggest where to start.",
      )}
      ctaLabel={t("Solicitar diagnóstico", "Sol·licitar diagnòstic", "Request an assessment")}
    />
  );
}
