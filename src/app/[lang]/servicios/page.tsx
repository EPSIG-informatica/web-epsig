import type { Metadata } from "next";
import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import IndexMark from "@/components/index-mark";
import { pillars } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/servicios", {
    title: t("Servicios", "Serveis", "Business Consulting, ERP and Cybersecurity"),
    description: t(
      "Consultoría empresarial, transformación digital e implantación de Odoo ERP, y protección del negocio con ciberseguridad gestionada.",
      "Consultoria empresarial, transformació digital i implantació d'Odoo ERP, i protecció del negoci amb ciberseguretat gestionada.",
      "Business consulting, digital transformation and Odoo ERP implementation, plus business protection with managed cybersecurity.",
    ),
  });
}

export default async function ServiciosPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        eyebrow={t("Servicios", "Serveis", "Services")}
        title={t("Tres formas de ayudarte a funcionar mejor", "Tres maneres d'ajudar-te a funcionar millor", "Three ways to help your business run better")}
        lead={t(
          "Consultoría, digitalización y protección — nunca por separado. Cada proyecto se diseña a partir de dónde está tu empresa hoy.",
          "Consultoria, digitalització i protecció — mai per separat. Cada projecte es dissenya a partir d'on està hui la teua empresa.",
          "Consulting, digitalisation and protection — never in isolation. Every project is designed around where your business is today.",
        )}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.slug} delay={index * 0.08}>
                <TiltCard
                  href={`/servicios/${pillar.slug}`}
                  className="group block h-full rounded-brand border border-line bg-surface p-8 transition-colors hover:border-primary-light"
                >
                  <IndexMark n={index + 1} />
                  <h2 className="mb-2.5 text-xl">{t(pillar.title)}</h2>
                  <p className="text-[14.5px] leading-relaxed text-ink-soft">
                    {t(pillar.summary)}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                    {t("Ver servicio →", "Veure el servei →", "View service →")}
                  </span>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6 rounded-brand border border-line bg-surface-alt p-8 sm:p-10">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {t("Servicio estrella", "Servei estrella", "Flagship service")}
                </span>
                <h2 className="mt-3 text-xl">
                  {t("Odoo ERP, implantado de principio a fin", "Odoo ERP, implantat de principi a fi", "Odoo ERP, implemented from start to finish")}
                </h2>
                <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
                  {t(
                    "Diagnóstico, configuración, migración de datos, formación del equipo y soporte continuo — el hilo conductor que conecta las otras tres áreas.",
                    "Diagnòstic, configuració, migració de dades, formació de l'equip i suport continu — el fil conductor que connecta les altres tres àrees.",
                    "Assessment, configuration, data migration, team training and ongoing support — the common thread that connects the other three areas.",
                  )}
                </p>
              </div>
              <Link
                href="/servicios/odoo"
                className="shrink-0 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary"
              >
                {t("Descubrir Odoo ERP", "Descobrir Odoo ERP", "Discover Odoo ERP")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {t("Programas públicos", "Programes públics", "Public programmes")}
            </div>
            <h2 className="mt-3 text-[28px]">
              {t(
                "Agente Digitalizador Adherido y Asesor Digital",
                "Agent Digitalitzador Adherit i Assessor Digital",
                "Accredited Digitalisation Agent and Accredited Digital Advisor",
              )}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              {t(
                "Implantamos las soluciones de los catálogos Kit Digital y Kit Consulting. Las convocatorias están cerradas ahora mismo, pero puedes contratar estos servicios directamente y te avisamos cuando se abran de nuevo.",
                "Implantem les solucions dels catàlegs Kit Digital i Kit Consulting. Les convocatòries estan tancades ara mateix, però pots contractar estos serveis directament i t'avisem quan es tornen a obrir.",
                "We implement the solutions in the Kit Digital and Kit Consulting catalogues. Applications are currently closed, but you can hire these services directly and we'll let you know as soon as they reopen.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Reveal>
              <TiltCard
                href="/kit-digital"
                className="group block h-full rounded-brand border border-line bg-surface p-7 transition-colors hover:border-primary-light"
              >
                <h3 className="mb-2 text-lg">Kit Digital</h3>
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  {t(
                    "Web, comercio electrónico, CRM, ciberseguridad y más soluciones digitales para tu pyme.",
                    "Web, comerç electrònic, CRM, ciberseguretat i més solucions digitals per a la teua pime.",
                    "Websites, e-commerce, CRM, cybersecurity and more digital solutions for your SME.",
                  )}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                  {t("Ver categorías →", "Veure les categories →", "View categories →")}
                </span>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.08}>
              <TiltCard
                href="/kit-consulting"
                className="group block h-full rounded-brand border border-line bg-surface p-7 transition-colors hover:border-primary-light"
              >
                <h3 className="mb-2 text-lg">Kit Consulting</h3>
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  {t(
                    "Asesoramiento en inteligencia artificial, datos, procesos, estrategia y ciberseguridad para empresas de 10 a 249 empleados.",
                    "Assessorament en intel·ligència artificial, dades, processos, estratègia i ciberseguretat per a empreses de 10 a 249 empleats.",
                    "Advisory on artificial intelligence, data, processes, strategy and cybersecurity for companies with 10 to 249 employees.",
                  )}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
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
