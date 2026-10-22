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
    title: t("Partner Odoo en Valencia y Alicante: implantación de Odoo ERP", "Partner Odoo a València i Alacant: implantació d'Odoo ERP", "Odoo Partner in Valencia and Alicante"),
    description: t(
      "Implantación de Odoo ERP para pymes: diagnóstico, configuración, migración de datos, formación del equipo y soporte continuo.",
      "Implantació d'Odoo ERP per a pimes: diagnòstic, configuració, migració de dades, formació de l'equip i suport continu.",
      "Odoo ERP implementation for SMEs: assessment, configuration, data migration, team training and ongoing support.",
    ),
  });
}

const steps: { n: string; title: Localized; body: Localized }[] = [
  {
    n: "01",
    title: { es: "Diagnóstico", ca: "Diagnòstic", en: "Assessment" },
    body: {
      es: "Analizamos cómo gestiona tu empresa hoy — hojas de cálculo, papel, otros programas — y qué módulos de Odoo lo resuelven.",
      ca: "Analitzem com gestiona hui la teua empresa — fulls de càlcul, paper, altres programes — i quins mòduls d'Odoo ho resolen.",
      en: "We analyse how your business is run today — spreadsheets, paper, other software — and which Odoo modules can solve it.",
    },
  },
  {
    n: "02",
    title: { es: "Configuración", ca: "Configuració", en: "Configuration" },
    body: {
      es: "Adaptamos Odoo a tu forma de trabajar: CRM, ventas, compras, inventario y contabilidad conectados entre sí.",
      ca: "Adaptem Odoo a la teua manera de treballar: CRM, vendes, compres, inventari i comptabilitat connectats entre si.",
      en: "We tailor Odoo to the way you work: CRM, sales, purchasing, inventory and accounting, all connected.",
    },
  },
  {
    n: "03",
    title: { es: "Migración de datos", ca: "Migració de dades", en: "Data migration" },
    body: {
      es: "Traspasamos clientes, productos, histórico de ventas y contabilidad sin que tu día a día se detenga.",
      ca: "Traspassem clients, productes, històric de vendes i comptabilitat sense que el teu dia a dia s'ature.",
      en: "We transfer customers, products, sales history and accounts without bringing your day-to-day to a halt.",
    },
  },
  {
    n: "04",
    title: { es: "Formación", ca: "Formació", en: "Training" },
    body: {
      es: "Tu equipo aprende a usar el sistema con casos reales de tu negocio, no con manuales genéricos.",
      ca: "El teu equip aprén a utilitzar el sistema amb casos reals del teu negoci, no amb manuals genèrics.",
      en: "Your team learns the system using real cases from your business, not generic manuals.",
    },
  },
  {
    n: "05",
    title: { es: "Soporte continuo", ca: "Suport continu", en: "Ongoing support" },
    body: {
      es: "Acompañamos la implantación después del arranque: ajustes, dudas y nuevos módulos según creces.",
      ca: "Acompanyem la implantació després de l'arrancada: ajustos, dubtes i nous mòduls a mesura que creixes.",
      en: "We stay by your side after go-live: adjustments, questions and new modules as you grow.",
    },
  },
];

export default async function OdooPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/servicios/odoo"
        service={t("Implantación de Odoo ERP", "Implantació d'Odoo ERP", "Odoo ERP implementation")}
        eyebrow={t("Servicio · Partner oficial Odoo", "Servei · Partner oficial d'Odoo", "Service · Official Odoo Partner")}
        title={t(
          "Odoo ERP, implantado por quien entiende de empresa",
          "Odoo ERP, implantat per qui entén d'empresa",
          "Odoo ERP, implemented by people who understand business",
        )}
        lead={t(
          "No nos limitamos a venderte licencias: acompañamos la implantación de principio a fin, desde el diagnóstico hasta el soporte del día a día.",
          "No ens limitem a vendre't llicències: acompanyem la implantació de principi a fi, des del diagnòstic fins al suport del dia a dia.",
          "We don't just sell you licences: we guide the implementation from start to finish, from the initial assessment to day-to-day support.",
        )}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Cómo lo hacemos", "Com ho fem", "How we do it")}
            title={t("Un proceso pensado para pymes", "Un procés pensat per a pimes", "A process designed for SMEs")}
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
            eyebrow={t("Módulos", "Mòduls", "Modules")}
            title={t("Un núcleo, todos tus procesos conectados", "Un nucli, tots els teus processos connectats", "One core, all your processes connected")}
            body={t(
              "Empezamos por lo esencial y añadimos módulos a medida que tu empresa lo necesita.",
              "Comencem per l'essencial i afegim mòduls a mesura que la teua empresa ho necessita.",
              "We start with the essentials and add modules as your business needs them.",
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
          "Shall we start with a free assessment of your business?",
        )}
        body={t(
          "En 30 minutos vemos qué módulos de Odoo necesitas y cómo implantarlos en tu empresa.",
          "En 30 minuts veiem quins mòduls d'Odoo necessites i com implantar-los en la teua empresa.",
          "In 30 minutes we'll work out which Odoo modules you need and how to implement them in your business.",
        )}
        ctaLabel={t("Habla con un consultor Odoo", "Parla amb un consultor d'Odoo", "Talk to an Odoo consultant")}
        spaced
      />
    </>
  );
}
