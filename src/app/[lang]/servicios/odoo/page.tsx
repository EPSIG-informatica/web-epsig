import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import IndexMark from "@/components/index-mark";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import Icon, { moduleIcons } from "@/components/icons";
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

// Icono de cada paso del proceso, en el mismo orden que `steps`.
const stepIcons = ["chart", "link", "purchase", "crm", "shield"] as const;

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

      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div
          className="pointer-events-none absolute top-0 -right-40 h-[480px] w-[480px] rounded-full blob-drift-slow"
          style={{ background: "radial-gradient(circle, rgba(90,169,230,.18), transparent 65%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Cómo lo hacemos", "Com ho fem", "How we do it")}
            title={t("Un proceso pensado para pymes", "Un procés pensat per a pimes", "A process designed for SMEs")}
            body=""
            align="left"
          />

          {/* Línea de tiempo: la traza se dibuja al entrar en pantalla y une los cinco pasos */}
          <div data-observe className="relative">
            <div className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-line lg:block" aria-hidden>
              <div className="draw-line h-full w-full bg-gradient-to-r from-primary via-accent to-ice shadow-[0_0_12px_#5aa9e6]" />
            </div>
            <div
              className="absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-primary via-accent to-ice/40 sm:hidden"
              aria-hidden
            />
            <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {steps.map((step, index) => (
                <li key={step.n} className={index === 4 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                  <Reveal delay={index * 0.1} className="flex h-full gap-4 sm:flex-col lg:items-center">
                    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-primary/20 bg-white font-mono text-[14px] font-semibold text-primary shadow-[0_14px_30px_-16px_rgba(42,107,165,.7)]">
                      <span
                        className="absolute inset-0 rounded-2xl border border-accent/50 animate-ping [animation-duration:2.6s]"
                        style={{ animationDelay: `${index * 0.5}s` }}
                        aria-hidden
                      />
                      {step.n}
                    </span>
                    <TiltCard className="card-light flex-1 p-6 lg:w-full">
                      <span className="icon-tile mb-5 h-10 w-10 rounded-xl" aria-hidden>
                        <Icon name={stepIcons[index]} className="h-[18px] w-[18px]" />
                      </span>
                      <h3 className="mb-2 text-[18px] text-ink">{t(step.title)}</h3>
                      <p className="text-[13.5px] leading-relaxed text-ink-soft">{t(step.body)}</p>
                    </TiltCard>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-dark py-28 text-white sm:py-36">
        <div className="stars pointer-events-none absolute inset-0" aria-hidden />
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[900px] max-w-[160%] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(42,107,165,.3), transparent 65%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Módulos", "Mòduls", "Modules")}
            title={t("Un núcleo, todos tus procesos conectados", "Un nucli, tots els teus processos connectats", "One core, all your processes connected")}
            body={t(
              "Empezamos por lo esencial y añadimos módulos a medida que tu empresa lo necesita.",
              "Comencem per l'essencial i afegim mòduls a mesura que la teua empresa ho necessita.",
              "We start with the essentials and add modules as your business needs them.",
            )}
            dark
            className="mb-10 lg:mb-4"
          />

          {/* Núcleo: una traza por columna lleva los datos del núcleo a cada módulo */}
          <div className="relative hidden h-36 lg:block" aria-hidden>
            <svg viewBox="0 0 1000 144" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
              {["M500 40 V80 H125 V144", "M500 40 V80 H375 V144", "M500 40 V80 H625 V144", "M500 40 V80 H875 V144"].map((d, i) => (
                <g key={d}>
                  <path d={d} stroke="rgba(140,195,239,.18)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                  <path
                    d={d}
                    pathLength={100}
                    stroke="#8cc3ef"
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="trace-pulse"
                    style={{ "--td": `${i * 0.5}s`, filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                  />
                </g>
              ))}
            </svg>
            <span className="absolute top-0 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-2xl border border-accent/40 bg-gradient-to-b from-[#123058] to-[#0a1830] text-ice shadow-[0_0_40px_-4px_rgba(61,143,224,.7)]">
              <Icon name="spark" className="h-6 w-6 animate-[spin_12s_linear_infinite]" />
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {odooModules.map((mod, index) => (
              <li key={mod.label.es}>
                <Reveal delay={(index % 4) * 0.07 + Math.floor(index / 4) * 0.12} className="h-full">
                  <div className="glass card-spotlight group flex h-full items-center gap-4 rounded-panel p-5 sm:flex-col sm:items-stretch sm:p-6">
                    <div className="flex shrink-0 items-center gap-4 sm:w-full">
                      <span className="icon-tile-dark transition-colors duration-300 group-hover:border-accent/60 group-hover:text-white" aria-hidden>
                        <Icon name={moduleIcons[index]} className="h-5 w-5" />
                      </span>
                      <IndexMark n={index + 1} dark className="hidden flex-1 sm:flex" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[16px] font-semibold text-white">{t(mod.label)}</span>
                      <span className="mt-1 block text-[13px] text-mist-soft">{t(mod.body)}</span>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
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
