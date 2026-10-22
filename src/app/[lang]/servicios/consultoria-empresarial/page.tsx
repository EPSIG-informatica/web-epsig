import type { Metadata } from "next";
import ServiceDetail from "@/components/service-detail";
import { asesoriaAreas } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/servicios/consultoria-empresarial", {
    title: t("Consultoría empresarial para pymes en Valencia y la Marina Alta", "Consultoria empresarial per a pimes a València i la Marina Alta"),
    description: t(
      "Asesoría económico-financiera, laboral y fiscal-contable, empresa familiar y protección de datos para pymes y particulares.",
      "Assessoria economicofinancera, laboral i fiscal-comptable, empresa familiar i protecció de dades per a pimes i particulars.",
    ),
  });
}

export default async function ConsultoriaEmpresarialPage() {
  const t = await getT();
  return (
    <ServiceDetail
      path="/servicios/consultoria-empresarial"
      eyebrow={t("Consultoría Empresarial", "Consultoria Empresarial")}
      title={t(
        "La asesoría de toda la vida, con la organización que necesita una empresa que crece",
        "L'assessoria de tota la vida, amb l'organització que necessita una empresa que creix",
      )}
      lead={t(
        "Antes de digitalizar o proteger nada, hay que tener claro cómo está tu empresa hoy: sus cuentas, su personal y su cumplimiento normativo.",
        "Abans de digitalitzar o protegir res, cal tindre clar com està hui la teua empresa: els seus comptes, el seu personal i el seu compliment normatiu.",
      )}
      features={asesoriaAreas.map((area) => ({
        title: t(area.title),
        body: t(area.body),
        href: "slug" in area ? `/${area.slug}` : undefined,
      }))}
      ctaTitle={t("¿Hablamos de la organización de tu empresa?", "Parlem de l'organització de la teua empresa?")}
      ctaBody={t(
        "Una primera conversación gratuita para entender dónde estás y qué necesitas.",
        "Una primera conversa gratuïta per a entendre on estàs i què necessites.",
      )}
      ctaLabel={t("Solicitar diagnóstico", "Sol·licitar diagnòstic")}
    />
  );
}
