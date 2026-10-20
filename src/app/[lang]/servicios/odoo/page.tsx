import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import IndexMark from "@/components/index-mark";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import { odooModules } from "@/lib/site";
import type { Localized } from "@/lib/i18n";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/servicios/odoo", {
    title: "Odoo ERP",
    description: t(
      "Implantación de Odoo ERP para pymes: diagnóstico, configuración, migración de datos, formación del equipo y soporte continuo.",
      "Implantació d'Odoo ERP per a pimes: diagnòstic, configuració, migració de dades, formació de l'equip i suport continu.",
    ),
  });
}

const steps: { n: string; title: Localized; body: Localized }[] = [
  {
    n: "01",
    title: { es: "Diagnóstico", ca: "Diagnòstic" },
    body: {
      es: "Analizamos cómo gestiona tu empresa hoy — hojas de cálculo, papel, otros programas — y qué módulos de Odoo lo resuelven.",
      ca: "Analitzem com gestiona hui la teua empresa — fulls de càlcul, paper, altres programes — i quins mòduls d'Odoo ho resolen.",
    },
  },
  {
    n: "02",
    title: { es: "Configuración", ca: "Configuració" },
    body: {
      es: "Adaptamos Odoo a tu forma de trabajar: CRM, ventas, compras, inventario y contabilidad conectados entre sí.",
      ca: "Adaptem Odoo a la teua manera de treballar: CRM, vendes, compres, inventari i comptabilitat connectats entre si.",
    },
  },
  {
    n: "03",
    title: { es: "Migración de datos", ca: "Migració de dades" },
    body: {
      es: "Traspasamos clientes, productos, histórico de ventas y contabilidad sin que tu día a día se detenga.",
      ca: "Traspassem clients, productes, històric de vendes i comptabilitat sense que el teu dia a dia s'ature.",
    },
  },
  {
    n: "04",
    title: { es: "Formación", ca: "Formació" },
    body: {
      es: "Tu equipo aprende a usar el sistema con casos reales de tu negocio, no con manuales genéricos.",
      ca: "El teu equip aprén a utilitzar el sistema amb casos reals del teu negoci, no amb manuals genèrics.",
    },
  },
  {
    n: "05",
    title: { es: "Soporte continuo", ca: "Suport continu" },
    body: {
      es: "Acompañamos la implantación después del arranque: ajustes, dudas y nuevos módulos según creces.",
      ca: "Acompanyem la implantació després de l'arrancada: ajustos, dubtes i nous mòduls a mesura que creixes.",
    },
  },
];

export default async function OdooPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        eyebrow={t("Servicio · Partner oficial Odoo", "Servei · Partner oficial d'Odoo")}
        title={t(
          "Odoo ERP, implantado por quien entiende de empresa",
          "Odoo ERP, implantat per qui entén d'empresa",
        )}
        lead={t(
          "No nos limitamos a venderte licencias: acompañamos la implantación de principio a fin, desde el diagnóstico hasta el soporte del día a día.",
          "No ens limitem a vendre't llicències: acompanyem la implantació de principi a fi, des del diagnòstic fins al suport del dia a dia.",
        )}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Cómo lo hacemos", "Com ho fem")}
            title={t("Un proceso pensado para pymes", "Un procés pensat per a pimes")}
            body=""
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.07}>
                <TiltCard className="rounded-brand border border-line bg-surface p-6">
                  <span className="font-mono text-sm font-medium text-accent-strong">{step.n}</span>
                  <h3 className="mt-3 mb-2 text-[17px]">{t(step.title)}</h3>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">{t(step.body)}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Módulos", "Mòduls")}
            title={t("Un núcleo, todos tus procesos conectados", "Un nucli, tots els teus processos connectats")}
            body={t(
              "Empezamos por lo esencial y añadimos módulos a medida que tu empresa lo necesita.",
              "Comencem per l'essencial i afegim mòduls a mesura que la teua empresa ho necessita.",
            )}
            dark
          />
          <Reveal className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {odooModules.map((mod, index) => (
              <div
                key={mod.label.es}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-accent/60 hover:bg-white/[0.07]"
              >
                <IndexMark n={index + 1} dark className="mb-4" />
                <span className="block text-[15px] font-semibold text-white">{t(mod.label)}</span>
                <span className="mt-1 block text-[12.5px] text-mist-soft">{t(mod.body)}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={t(
          "¿Empezamos con un diagnóstico gratuito de tu empresa?",
          "Comencem amb un diagnòstic gratuït de la teua empresa?",
        )}
        body={t(
          "En 30 minutos vemos qué módulos de Odoo necesitas y cómo implantarlos en tu empresa.",
          "En 30 minuts veiem quins mòduls d'Odoo necessites i com implantar-los en la teua empresa.",
        )}
        ctaLabel={t("Habla con un consultor Odoo", "Parla amb un consultor d'Odoo")}
        spaced
      />
    </>
  );
}
