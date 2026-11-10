import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import ProgramStatus from "@/components/program-status";
import IndexMark from "@/components/index-mark";
import Icon from "@/components/icons";
import { kitConsultingServices, kitConsultingTiers, programStatus } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

// Icono decorativo por servicio del catálogo.
const serviceIcons: Record<string, string> = {
  asesoramiento_ia: "spark",
  asesoramiento_analisisdedatos_ia: "chart",
  asesoramiento_analisisdedatos_ia_avanzado: "chart",
  asesoramiento_procesosnegocio: "manufacturing",
  asesoramiento_rendimientonegocio: "briefcase",
  ciberseguridad: "shield",
  ciberseguridad_avanzado: "shield",
  "360_transformaciondigital": "bolt",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/kit-consulting", {
    title: t("Kit Consulting: Asesor Digital en Valencia y Alicante", "Kit Consulting: Assessor Digital a València i Alacant", "Kit Consulting Advisor in Valencia and Alicante"),
    description: t(
      "Servicios de asesoramiento del programa Kit Consulting: inteligencia artificial, análisis de datos, procesos, estrategia, ciberseguridad y transformación digital, con EPSIG como Asesor Digital.",
      "Serveis d'assessorament del programa Kit Consulting: intel·ligència artificial, anàlisi de dades, processos, estratègia, ciberseguretat i transformació digital, amb EPSIG com a Assessor Digital.",
      "Kit Consulting advisory in AI, data analytics, processes, strategy, cybersecurity and digital transformation, from an accredited advisor.",
    ),
  });
}

export default async function KitConsultingPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/kit-consulting"
        eyebrow={t("Asesor Digital", "Assessor Digital", "Accredited Digital Advisor")}
        title={t(
          "Kit Consulting: asesoramiento experto para digitalizar tu empresa",
          "Kit Consulting: assessorament expert per a digitalitzar la teua empresa",
          "Kit Consulting: expert advice to digitalise your business",
        )}
        lead={t(
          "Un programa del Gobierno de España, financiado por la Unión Europea – NextGenerationEU, que subvenciona servicios de asesoramiento digital para empresas de entre 10 y 249 empleados.",
          "Un programa del Govern d'Espanya, finançat per la Unió Europea – NextGenerationEU, que subvenciona serveis d'assessorament digital per a empreses d'entre 10 i 249 empleats.",
          "A Spanish Government programme, funded by the European Union – NextGenerationEU, that subsidises digital advisory services for businesses with between 10 and 249 employees.",
        )}
      />

      {/* Programa e importes del bono: tarjetas de cristal sobre fondo nocturno */}
      <section className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="stars pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute bottom-[-220px] left-1/2 h-[520px] w-[140%] max-w-[1000px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(42,107,165,.35), transparent 65%)" }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-16 sm:mb-20">
            <ProgramStatus program="Kit Consulting" open={programStatus.kitConsulting} />
          </Reveal>

          <Reveal className="mx-auto mb-14 max-w-3xl text-center text-[16.5px] leading-relaxed text-mist-soft sm:mb-16 sm:text-[18px]">
            <p>
              {t(
                "El programa Kit Consulting, dentro del Plan de Recuperación, Transformación y Resiliencia, subvenciona servicios de asesoramiento en inteligencia artificial, análisis de datos, procesos de negocio, estrategia, ciberseguridad y transformación digital. Como Asesor Digital, prestamos todos estos servicios.",
                "El programa Kit Consulting, dins del Pla de Recuperació, Transformació i Resiliència, subvenciona serveis d'assessorament en intel·ligència artificial, anàlisi de dades, processos de negoci, estratègia, ciberseguretat i transformació digital. Com a Assessor Digital, prestem tots estos serveis.",
                "The Kit Consulting programme, part of the Recovery, Transformation and Resilience Plan, subsidises advisory services in artificial intelligence, data analytics, business processes, strategy, cybersecurity and digital transformation. As an Accredited Digital Advisor, we provide all of these services.",
              )}
            </p>
          </Reveal>

          <Reveal direction="none" className="mb-8 text-center">
            <p className="eyebrow eyebrow-dark">
              <span className="dot" aria-hidden />
              {t("Importe del bono según el tamaño de la empresa", "Import del bo segons la grandària de l'empresa", "Voucher amount by company size")}
            </p>
          </Reveal>

          <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {/* Traza de circuito que une los tres importes */}
            <svg
              className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-6 w-full -translate-y-1/2 md:block"
              viewBox="0 0 1000 24"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <path d="M0 12 H1000" stroke="rgba(140,195,239,.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path
                d="M0 12 H1000"
                pathLength={100}
                stroke="#8cc3ef"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="trace-pulse"
                style={{ filter: "drop-shadow(0 0 4px #5aa9e6)" }}
              />
            </svg>
            {kitConsultingTiers.map((tier, index) => {
              const featured = index === kitConsultingTiers.length - 1;
              return (
                <Reveal key={tier.range.es} direction="scale" delay={index * 0.1} className="h-full">
                  <TiltCard className="glass group h-full rounded-panel p-7 backdrop-blur-md sm:p-8">
                    <span
                      className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${featured ? "via-ice" : "via-accent/60"} to-transparent`}
                      aria-hidden
                    />
                    {featured && (
                      <div
                        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-56 -translate-x-1/2 rounded-full"
                        style={{ background: "radial-gradient(ellipse, rgba(90,169,230,.3), transparent 70%)" }}
                        aria-hidden
                      />
                    )}
                    <IndexMark n={index + 1} dark className="mb-6" />
                    <div data-observe className="mb-7 flex h-14 items-end gap-1.5" aria-hidden>
                      {kitConsultingTiers.map((_, bar) => (
                        <span
                          key={bar}
                          className={`grow-bar w-3 rounded-t-[4px] ${
                            bar <= index
                              ? "bg-gradient-to-t from-primary to-accent shadow-[0_0_14px_-2px_var(--color-accent)]"
                              : "bg-white/10"
                          }`}
                          style={{ height: `${(bar + 1) * 33}%`, "--bd": `${0.15 + bar * 0.12}s` } as React.CSSProperties}
                        />
                      ))}
                    </div>
                    <span className="relative block font-mono text-[32px] leading-none font-semibold tracking-tight text-white [text-shadow:0_0_28px_rgba(90,169,230,.55)] sm:text-[38px]">
                      {t(tier.amount)}
                    </span>
                    <span className="relative mt-3 block text-[14px] leading-snug text-mist-soft">{t(tier.range)}</span>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(90,169,230,.16), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t("Servicios de asesoramiento", "Serveis d'assessorament", "Advisory services")}
            title={t("Servicios del catálogo Kit Consulting", "Serveis del catàleg Kit Consulting", "Kit Consulting catalogue services")}
            body={t(
              "Puedes contratarlos directamente con nosotros, con o sin ayuda pública.",
              "Pots contractar-los directament amb nosaltres, amb ajuda pública o sense.",
              "You can hire them directly from us, with or without public funding.",
            )}
            align="left"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {kitConsultingServices.map((service, index) => (
              <Reveal key={service.slug} className="h-full" delay={(index % 4) * 0.07}>
                <TiltCard href={`/kit-consulting/${service.slug}`} className="card-light group flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="icon-tile transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                      <Icon name={serviceIcons[service.slug] ?? "spark"} className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-[12px] text-ink-faint" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-[17px] leading-snug text-ink">{t(service.title)}</h3>
                  <p className="flex-1 text-[14px] leading-relaxed text-ink-soft">{t(service.summary)}</p>
                  <span
                    className="mt-6 block h-px w-full bg-gradient-to-r from-accent/50 to-transparent transition-colors duration-700 group-hover:from-accent"
                    aria-hidden
                  />
                  <span className="mt-4 inline-block text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                    {t("Ver más →", "Veure'n més →", "Learn more →")}
                  </span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t("¿Quieres digitalizar tu empresa con un plan claro?", "Vols digitalitzar la teua empresa amb un pla clar?", "Want to digitalise your business with a clear plan?")}
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
