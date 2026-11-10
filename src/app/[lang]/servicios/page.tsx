import type { Metadata } from "next";
import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import TiltCard from "@/components/tilt-card";
import SplitText from "@/components/split-text";
import Icon, { moduleIcons } from "@/components/icons";
import CtaBand from "@/components/sections/cta-band";
import IndexMark from "@/components/index-mark";
import { pillars } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/servicios", {
    title: t("Servicios para pymes: Odoo, asesoría y ciberseguridad", "Serveis per a pimes: Odoo, assessoria i ciberseguretat", "Business Consulting, ERP and Cybersecurity"),
    description: t(
      "Consultoría empresarial, transformación digital e implantación de Odoo ERP, y protección del negocio con ciberseguridad gestionada.",
      "Consultoria empresarial, transformació digital i implantació d'Odoo ERP, i protecció del negoci amb ciberseguretat gestionada.",
      "Business consulting, digital transformation and Odoo ERP implementation, plus business protection with managed cybersecurity.",
    ),
  });
}

// Icono de cada pilar, en el mismo orden que `pillars`.
const pillarIcons = ["briefcase", "spark", "shield"] as const;

export default async function ServiciosPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/servicios"
        eyebrow={t("Servicios", "Serveis", "Services")}
        title={t("Tres formas de ayudarte a funcionar mejor", "Tres maneres d'ajudar-te a funcionar millor", "Three ways to help your business run better")}
        lead={t(
          "Consultoría, digitalización y protección — nunca por separado. Cada proyecto se diseña a partir de dónde está tu empresa hoy.",
          "Consultoria, digitalització i protecció — mai per separat. Cada projecte es dissenya a partir d'on està hui la teua empresa.",
          "Consulting, digitalisation and protection — never in isolation. Every project is designed around where your business is today.",
        )}
      />

      <section className="relative overflow-hidden bg-surface py-28 sm:py-36">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-pale/70 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal
                key={pillar.slug}
                delay={index * 0.08}
                className={index === 2 ? "md:col-span-2 lg:col-span-1" : undefined}
              >
                <TiltCard
                  href={`/servicios/${pillar.slug}`}
                  className="card-light group flex h-full flex-col overflow-hidden"
                >
                  <PillarArt index={index} />
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="icon-tile shrink-0" aria-hidden>
                        <Icon name={pillarIcons[index]} className="h-5 w-5" />
                      </span>
                      <IndexMark n={index + 1} className="flex-1" />
                    </div>
                    <h2 className="mb-2.5 text-[22px] leading-tight text-ink sm:text-[24px]">{t(pillar.title)}</h2>
                    <p className="text-[14.5px] leading-relaxed text-ink-soft">{t(pillar.summary)}</p>
                    <span className="mt-auto inline-flex pt-5 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                      {t("Ver servicio →", "Veure el servei →", "View service →")}
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* Servicio estrella: panel oscuro con los módulos de Odoo conectados */}
          <Reveal direction="scale" className="mt-6">
            <div className="relative overflow-hidden rounded-panel border border-white/10 bg-surface-dark p-7 text-white sm:p-10 lg:p-12">
              <div className="stars pointer-events-none absolute inset-0" aria-hidden />
              <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
              <div
                className="blob-drift pointer-events-none absolute -right-24 -bottom-32 h-[420px] w-[420px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(61,143,224,.45), transparent 65%)" }}
                aria-hidden
              />
              <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
                <div>
                  <span className="eyebrow eyebrow-dark">
                    <span className="dot" aria-hidden />
                    {t("Servicio estrella", "Servei estrella", "Flagship service")}
                  </span>
                  <SplitText
                    text={t("Odoo ERP, implantado de principio a fin", "Odoo ERP, implantat de principi a fi", "Odoo ERP, implemented from start to finish")}
                    className="mt-5 text-[28px] leading-[1.08] text-white sm:text-[38px]"
                  />
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist-soft">
                    {t(
                      "Diagnóstico, configuración, migración de datos, formación del equipo y soporte continuo — el hilo conductor que conecta las otras tres áreas.",
                      "Diagnòstic, configuració, migració de dades, formació de l'equip i suport continu — el fil conductor que connecta les altres tres àrees.",
                      "Assessment, configuration, data migration, team training and ongoing support — the common thread that connects the other three areas.",
                    )}
                  </p>
                  <Link href="/servicios/odoo" data-magnetic className="btn btn-light mt-8">
                    {t("Descubrir Odoo ERP", "Descobrir Odoo ERP", "Discover Odoo ERP")}
                    <span className="btn-arrow" aria-hidden>
                      →
                    </span>
                  </Link>
                </div>

                {/* Módulos conectados por trazas con pulsos de luz */}
                <div className="relative mx-auto w-full max-w-md" aria-hidden>
                  <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none">
                    {["M50 50 H350", "M50 150 H350", "M200 50 V150"].map((d, i) => (
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
                          style={{ "--td": `${i * 0.9}s`, filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                        />
                      </g>
                    ))}
                  </svg>
                  <div className="relative grid grid-cols-4 gap-3 sm:gap-4">
                    {moduleIcons.map((icon, i) => (
                      <span
                        key={icon}
                        className="glass float grid aspect-square place-items-center rounded-2xl text-mist-accent backdrop-blur-sm"
                        style={{ "--fd": `${(i % 4) * 0.5 + Math.floor(i / 4) * 0.3}s` } as React.CSSProperties}
                      >
                        <Icon name={icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-light/60 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <Reveal direction="none">
              <div className="eyebrow eyebrow-light">
                <span className="dot" aria-hidden />
                {t("Programas públicos", "Programes públics", "Public programmes")}
              </div>
            </Reveal>
            <SplitText
              text={t(
                "Agente Digitalizador Adherido y Asesor Digital",
                "Agent Digitalitzador Adherit i Assessor Digital",
                "Accredited Digitalisation Agent and Accredited Digital Advisor",
              )}
              delay={120}
              className="mt-5 text-[30px] leading-[1.08] text-ink sm:text-[44px]"
            />
            <Reveal delay={0.3}>
              <p className="mx-auto mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft sm:text-[16.5px]">
                {t(
                  "Implantamos las soluciones de los catálogos Kit Digital y Kit Consulting. Las convocatorias están cerradas ahora mismo, pero puedes contratar estos servicios directamente y te avisamos cuando se abran de nuevo.",
                  "Implantem les solucions dels catàlegs Kit Digital i Kit Consulting. Les convocatòries estan tancades ara mateix, però pots contractar estos serveis directament i t'avisem quan es tornen a obrir.",
                  "We implement the solutions in the Kit Digital and Kit Consulting catalogues. Applications are currently closed, but you can hire these services directly and we'll let you know as soon as they reopen.",
                )}
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <TiltCard href="/kit-digital" className="card-light group relative block h-full overflow-hidden p-7 sm:p-9">
                <ProgramRings />
                <span className="icon-tile relative" aria-hidden>
                  <Icon name="bolt" className="h-5 w-5" />
                </span>
                <h3 className="relative mt-6 mb-2 text-[22px] text-ink">Kit Digital</h3>
                <p className="relative max-w-[46ch] text-[14.5px] leading-relaxed text-ink-soft">
                  {t(
                    "Web, comercio electrónico, CRM, ciberseguridad y más soluciones digitales para tu pyme.",
                    "Web, comerç electrònic, CRM, ciberseguretat i més solucions digitals per a la teua pime.",
                    "Websites, e-commerce, CRM, cybersecurity and more digital solutions for your SME.",
                  )}
                </p>
                <span className="relative mt-5 inline-block text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                  {t("Ver categorías →", "Veure les categories →", "View categories →")}
                </span>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.08}>
              <TiltCard href="/kit-consulting" className="card-light group relative block h-full overflow-hidden p-7 sm:p-9">
                <ProgramRings />
                <span className="icon-tile relative" aria-hidden>
                  <Icon name="chart" className="h-5 w-5" />
                </span>
                <h3 className="relative mt-6 mb-2 text-[22px] text-ink">Kit Consulting</h3>
                <p className="relative max-w-[46ch] text-[14.5px] leading-relaxed text-ink-soft">
                  {t(
                    "Asesoramiento en inteligencia artificial, datos, procesos, estrategia y ciberseguridad para empresas de 10 a 249 empleados.",
                    "Assessorament en intel·ligència artificial, dades, processos, estratègia i ciberseguretat per a empreses de 10 a 249 empleats.",
                    "Advisory on artificial intelligence, data, processes, strategy and cybersecurity for companies with 10 to 249 employees.",
                  )}
                </p>
                <span className="relative mt-5 inline-block text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                  {t("Ver servicios →", "Veure els serveis →", "View services →")}
                </span>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand spaced />
    </>
  );
}

/** Ilustración animada (decorativa) en la cabecera de cada tarjeta de pilar. */
function PillarArt({ index }: { index: number }) {
  return (
    <div
      className={`relative aspect-[16/7] overflow-hidden border-b border-line bg-gradient-to-b from-primary-pale to-white ${
        index === 2 ? "md:aspect-[16/4] lg:aspect-[16/7]" : ""
      }`}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(42,107,165,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(42,107,165,.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {index === 0 && (
        <div data-observe className="absolute inset-x-6 top-6 bottom-0 flex items-end gap-[4%]">
          {[34, 48, 42, 60, 55, 72, 90].map((h, i) => (
            <span
              key={i}
              className="grow-bar flex-1 rounded-t-md bg-gradient-to-t from-primary/25 to-accent"
              style={{ height: `${h}%`, "--bd": `${0.1 + i * 0.08}s` } as React.CSSProperties}
            />
          ))}
        </div>
      )}
      {index === 1 && (
        <>
          <svg viewBox="0 0 320 140" className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none">
            {["M60 35 H130 L160 70", "M60 105 H130 L160 70", "M260 35 H190 L160 70", "M260 105 H190 L160 70"].map((d, i) => (
              <g key={d}>
                <path d={d} stroke="rgba(42,107,165,.2)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path
                  d={d}
                  pathLength={100}
                  stroke="#3d8fe0"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="trace-pulse"
                  style={{ "--td": `${i * 0.6}s` } as React.CSSProperties}
                />
              </g>
            ))}
          </svg>
          <span className="icon-tile absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon name="spark" className="h-5 w-5 animate-[spin_12s_linear_infinite]" />
          </span>
          {[
            { icon: "accounting", x: "18.75%", y: "25%" },
            { icon: "crm", x: "18.75%", y: "75%" },
            { icon: "sales", x: "81.25%", y: "25%" },
            { icon: "inventory", x: "81.25%", y: "75%" },
          ].map((node, i) => (
            <span
              key={node.icon}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <span
                className="float grid h-9 w-9 place-items-center rounded-xl border border-line bg-white text-primary shadow-[0_10px_24px_-14px_rgba(42,107,165,.6)]"
                style={{ "--fd": `${i * 0.7}s` } as React.CSSProperties}
              >
                <Icon name={node.icon} className="h-4 w-4" />
              </span>
            </span>
          ))}
        </>
      )}
      {index === 2 && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="absolute h-28 w-28 rounded-full border border-primary/15" />
          <span className="absolute h-44 w-44 rounded-full border border-primary/10" />
          <span className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-[22px] border border-accent/30 bg-gradient-to-b from-[#10284a] to-[#081426] text-ice shadow-[0_0_40px_-8px_rgba(61,143,224,.7)]">
            <Icon name="shield" className="h-9 w-9" />
            <span className="scan-line absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
          </span>
        </div>
      )}
    </div>
  );
}

/** Anillos concéntricos decorativos en la esquina de las tarjetas de programas. */
function ProgramRings() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 text-primary opacity-70 transition-transform duration-700 group-hover:rotate-45"
      fill="none"
      aria-hidden
    >
      {[30, 55, 80].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeOpacity={0.14} strokeDasharray="3 6" />
      ))}
      <circle cx="100" cy="100" r="80" stroke="#5aa9e6" strokeWidth="1.5" pathLength={100} className="trace-pulse" />
    </svg>
  );
}
