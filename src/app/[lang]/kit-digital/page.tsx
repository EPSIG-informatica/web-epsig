import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import ProgramStatus from "@/components/program-status";
import Icon from "@/components/icons";
import { kitDigitalCategories, programStatus } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

// Icono decorativo por categoría del catálogo.
const categoryIcons: Record<string, string> = {
  software: "manufacturing",
  tools: "briefcase",
  sitioweb: "link",
  "tienda-online": "sales",
  face: "accounting",
  bi: "chart",
  crm: "crm",
  ciber: "shield",
  hardware: "pos",
  ciberges: "bolt",
};

// Trazas de circuito decorativas del fondo (con pulsos de luz).
const traces = ["M0 60 H340 L380 100 H620", "M1200 40 H900 L860 80 H700", "M1200 200 H980 L940 160 H760"];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/kit-digital", {
    title: t("Kit Digital: Agente Digitalizador en Valencia y Alicante", "Kit Digital: Agent Digitalitzador a València i Alacant", "Kit Digital Agent in Valencia and Alicante"),
    description: t(
      "Soluciones del programa Kit Digital para pymes y autónomos: web, tienda online, CRM, factura electrónica, ciberseguridad y más, con EPSIG como Agente Digitalizador Adherido.",
      "Solucions del programa Kit Digital per a pimes i autònoms: web, botiga en línia, CRM, factura electrònica, ciberseguretat i més, amb EPSIG com a Agent Digitalitzador Adherit.",
      "Kit Digital solutions for SMEs and the self-employed: website, online shop, CRM, e-invoicing and cybersecurity, from an accredited agent.",
    ),
  });
}

export default async function KitDigitalPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/kit-digital"
        eyebrow={t("Agente Digitalizador Adherido", "Agent Digitalitzador Adherit", "Accredited Digitalisation Agent")}
        title={t("Kit Digital: soluciones digitales para tu pyme", "Kit Digital: solucions digitals per a la teua pime", "Kit Digital: digital solutions for your SME")}
        lead={t(
          "Un programa del Gobierno de España, financiado por la Unión Europea – NextGenerationEU, para impulsar la digitalización de pymes y autónomos. Como Agente Digitalizador Adherido, implantamos todas sus soluciones.",
          "Un programa del Govern d'Espanya, finançat per la Unió Europea – NextGenerationEU, per a impulsar la digitalització de pimes i autònoms. Com a Agent Digitalitzador Adherit, implantem totes les seues solucions.",
          "A Spanish Government programme, funded by the European Union – NextGenerationEU, to drive the digitalisation of SMEs and self-employed professionals. As an Accredited Digitalisation Agent, we implement all of its solutions.",
        )}
      />

      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[140%] max-w-[1100px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(90,169,230,.18), transparent 65%)" }}
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute inset-x-0 top-16 hidden h-[260px] w-full opacity-70 md:block"
          viewBox="0 0 1200 260"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          {traces.map((d, i) => (
            <g key={d}>
              <path d={d} stroke="rgba(42,107,165,.12)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <path
                d={d}
                pathLength={100}
                stroke="#5aa9e6"
                strokeWidth="1.8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="trace-pulse"
                style={{ "--td": `${i * 0.9}s` } as React.CSSProperties}
              />
            </g>
          ))}
        </svg>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-16 sm:mb-20">
            <ProgramStatus program="Kit Digital" open={programStatus.kitDigital} />
          </Reveal>

          <SectionHeading
            eyebrow={t("Categorías", "Categories", "Categories")}
            title={t("Nuestras soluciones del catálogo Kit Digital", "Les nostres solucions del catàleg Kit Digital", "Our Kit Digital catalogue solutions")}
            body={t(
              "Cada categoría resuelve una necesidad concreta de tu negocio. Te ayudamos a elegir la combinación adecuada y la implantamos de principio a fin.",
              "Cada categoria resol una necessitat concreta del teu negoci. T'ajudem a triar la combinació adequada i la implantem de principi a fi.",
              "Each category meets a specific need in your business. We help you choose the right combination and implement it from start to finish.",
            )}
            align="left"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {kitDigitalCategories.map((cat, index) => (
              <Reveal key={cat.slug} className="h-full" delay={(index % 3) * 0.08}>
                <TiltCard href={`/kit-digital/${cat.slug}`} className="card-light group flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="icon-tile transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                      <Icon name={categoryIcons[cat.slug] ?? "spark"} className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-[12px] text-ink-faint" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-[18px] leading-snug text-ink">{t(cat.title)}</h3>
                  <p className="mb-6 flex-1 text-[14px] leading-relaxed text-ink-soft">{t(cat.summary)}</p>
                  <span
                    className="mb-5 block h-px w-full bg-gradient-to-r from-accent/50 to-transparent transition-colors duration-700 group-hover:from-accent"
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary-pale px-3 py-1.5 font-mono text-[12.5px] font-semibold text-accent-strong">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" aria-hidden />
                      {t(cat.priceFrom)}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                      {t("Ver más →", "Veure'n més →", "Learn more →")}
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-[70ch] text-center text-xs leading-relaxed text-ink-soft">
              {t(
                "Precios orientativos, IVA no incluido. El importe final depende del tamaño de la empresa y de los puestos de trabajo a digitalizar.",
                "Preus orientatius, IVA no inclòs. L'import final depén de la grandària de l'empresa i dels llocs de treball que cal digitalitzar.",
                "Guide prices, excluding VAT. The final amount depends on the size of the business and the number of workstations to be digitalised.",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={t("¿Qué solución necesita tu negocio?", "Quina solució necessita el teu negoci?", "What solution does your business need?")}
        body={t(
          "Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas.",
          "T'assessorem sense compromís i t'avisem tan prompte com hi haja una nova convocatòria d'ajudes.",
          "We offer no-obligation advice and will let you know as soon as a new funding call opens.",
        )}
        ctaLabel={t("Solicitar información", "Sol·licitar informació", "Request information")}
      />
    </>
  );
}
