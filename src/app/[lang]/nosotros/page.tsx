import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import Zone from "@/components/sections/zone";
import CtaBand from "@/components/sections/cta-band";
import CountUp from "@/components/count-up";
import Icon from "@/components/icons";
import { pillars, site } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

// Iconos decorativos: uno por pilar y uno por acreditación (mismo orden que en site.ts).
const pillarIcons = ["chart", "bolt", "shield"];
const badgeIcons = ["spark", "shield", "link", "briefcase"];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/nosotros", {
    title: t("Quiénes somos: consultores en Valencia y Gata de Gorgos", "Qui som: consultors a València i Gata de Gorgos", "About Us: Consultants in Valencia"),
    description: t(
      "EPSIG Consultores: consultoría empresarial, transformación digital e implantación de Odoo ERP para pymes de la Marina Alta, Valencia y la Safor.",
      "EPSIG Consultores: consultoria empresarial, transformació digital i implantació d'Odoo ERP per a pimes de la Marina Alta, València i la Safor.",
      "EPSIG Consultores: business consulting, digital transformation and Odoo ERP implementation for SMEs in the Marina Alta, Valencia and La Safor.",
    ),
  });
}

export default async function NosotrosPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/nosotros"
        eyebrow={t("Nosotros", "Nosaltres", "About us")}
        title={t("Ayudamos a las empresas a funcionar mejor", "Ajudem les empreses a funcionar millor", "We help businesses run better")}
        lead={t(
          "Mejorar su gestión, digitalizar sus procesos y proteger su negocio — ese es el porqué detrás de cada servicio de EPSIG.",
          "Millorar la seua gestió, digitalitzar els seus processos i protegir el seu negoci: este és el perquè de cada servei d'EPSIG.",
          "Better management, digitalised processes and a protected business — that is the why behind every EPSIG service.",
        )}
      />

      {/* Origen: año de fundación con anillo de luz */}
      <section className="relative overflow-hidden bg-surface py-28 sm:py-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary-pale/70 to-transparent" aria-hidden />
        <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-[auto_1fr] md:gap-16">
          <Reveal direction="scale" className="mx-auto md:mx-0">
            <div className="relative grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_28s_linear_infinite]" fill="none" aria-hidden>
                <circle cx="100" cy="100" r="96" stroke="rgba(42,107,165,.25)" strokeWidth="1" strokeDasharray="2 6" />
              </svg>
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" fill="none" aria-hidden>
                <circle cx="100" cy="100" r="84" stroke="var(--color-line)" strokeWidth="2" />
                <circle
                  cx="100"
                  cy="100"
                  r="84"
                  pathLength={100}
                  stroke="#5aa9e6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="trace-draw"
                  style={{ "--td": "0.4s", filter: "drop-shadow(0 0 6px #5aa9e6)" } as React.CSSProperties}
                />
              </svg>
              <div
                className="absolute inset-8 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(90,169,230,.22), transparent 70%)" }}
                aria-hidden
              />
              <span className="relative font-display text-[40px] font-bold tracking-[-0.04em] text-primary sm:text-[48px]">
                <CountUp value={site.foundedYear} from={2000} />
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="text-center md:text-left">
            <p className="text-[18px] leading-relaxed text-ink sm:text-[21px] sm:leading-[1.6]">
              {t(
                `EPSIG Consultores inició su actividad en ${site.foundedYear} con la intención de prestar un servicio integral de consultoría a empresas, especialmente en digitalización. Nos implicamos en su desarrollo hasta cumplir el objetivo.`,
                `EPSIG Consultores va iniciar la seua activitat en ${site.foundedYear} amb la intenció d'oferir un servei integral de consultoria a empreses, especialment en digitalització. Ens impliquem en el seu desenvolupament fins a complir l'objectiu.`,
                `EPSIG Consultores was founded in ${site.foundedYear} to provide businesses with a comprehensive consulting service, with a particular focus on digitalisation. We get involved in their development until the goal is achieved.`,
              )}
            </p>
            <div data-observe className="mt-8">
              <span className="draw-line block h-px w-full bg-gradient-to-r from-accent via-primary-light/40 to-transparent" aria-hidden />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cómo trabajamos: línea de tiempo con los tres pilares */}
      <section className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[140%] max-w-[900px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(42,107,165,.28), transparent 65%)" }}
          aria-hidden
        />
        <div className="stars pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            dark
            eyebrow={t("Cómo trabajamos", "Com treballem", "How we work")}
            title={t(
              "Consultoría, digitalización y protección, en un solo equipo",
              "Consultoria, digitalització i protecció, en un sol equip",
              "Consulting, digitalisation and protection, in a single team",
            )}
            body={t(
              "La mayoría de pymes acaban con un gestor para la contabilidad, un informático para el ERP y una empresa distinta para la ciberseguridad — y ninguno habla con los demás. Nosotros unimos las tres cosas.",
              "La majoria de pimes acaben amb un gestor per a la comptabilitat, un informàtic per a l'ERP i una empresa diferent per a la ciberseguretat, i cap no parla amb els altres. Nosaltres unim les tres coses.",
              "Most SMEs end up with one adviser for the accounts, an IT person for the ERP and a separate company for cybersecurity — and none of them talk to each other. We bring all three together.",
            )}
          />
          <div data-observe className="relative">
            {/* Línea que une los tres nodos (horizontal en escritorio, vertical en móvil) */}
            <span
              className="draw-line pointer-events-none absolute top-6 right-[16.67%] left-[16.67%] hidden h-px bg-gradient-to-r from-accent/20 via-accent to-accent/20 shadow-[0_0_12px_var(--color-accent)] md:block"
              style={{ "--d": "200ms" } as React.CSSProperties}
              aria-hidden
            />
            <span
              className="pointer-events-none absolute top-6 bottom-6 left-6 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:hidden"
              aria-hidden
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.slug} delay={0.15 + index * 0.12} className="relative h-full">
                  <div className="flex h-full gap-5 md:flex-col md:items-center md:gap-0">
                    <span
                      className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent/50 bg-surface-dark font-mono text-[13px] text-ice shadow-[0_0_24px_-4px_rgba(61,143,224,.8)]"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <TiltCard className="glass group h-full w-full rounded-panel p-6 sm:p-7 md:mt-8">
                      <span className="icon-tile-dark mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                        <Icon name={pillarIcons[index] ?? "spark"} className="h-6 w-6" />
                      </span>
                      <h3 className="mb-2 text-[20px] text-white">{t(pillar.title)}</h3>
                      <p className="text-[14.5px] leading-relaxed text-mist-soft">{t(pillar.summary)}</p>
                      <span
                        className="mt-6 block h-px w-full bg-gradient-to-r from-accent/60 to-transparent transition-colors duration-700 group-hover:from-ice"
                        aria-hidden
                      />
                    </TiltCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Acreditaciones y partners */}
      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t("Confianza", "Confiança", "Trust")}
            title={t("Partners con los que trabajamos", "Partners amb què treballem", "Partners we work with")}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {site.badges.map((badge, index) => (
              <Reveal key={badge.es} delay={index * 0.08} className="h-full">
                  <TiltCard className="card-light group flex h-full flex-col gap-6 p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="icon-tile transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                        <Icon name={badgeIcons[index] ?? "spark"} className="h-6 w-6" />
                      </span>
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-pale text-primary" aria-hidden>
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3.5 8.5l3 3 6-7" />
                        </svg>
                      </span>
                    </div>
                    <span className="text-[16px] leading-snug font-semibold text-ink">{t(badge)}</span>
                  </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Zone />

      <CtaBand />
    </>
  );
}
