import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import Zone from "@/components/sections/zone";
import CtaBand from "@/components/sections/cta-band";
import IndexMark from "@/components/index-mark";
import { pillars, site } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/nosotros", {
    title: t("Quiénes somos: consultores en Valencia y Gata de Gorgos", "Qui som: consultors a València i Gata de Gorgos"),
    description: t(
      "EPSIG Consultores: consultoría empresarial, transformación digital e implantación de Odoo ERP para pymes de la Marina Alta, Valencia y la Safor.",
      "EPSIG Consultores: consultoria empresarial, transformació digital i implantació d'Odoo ERP per a pimes de la Marina Alta, València i la Safor.",
    ),
  });
}

export default async function NosotrosPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/nosotros"
        eyebrow={t("Nosotros", "Nosaltres")}
        title={t("Ayudamos a las empresas a funcionar mejor", "Ajudem les empreses a funcionar millor")}
        lead={t(
          "Mejorar su gestión, digitalizar sus procesos y proteger su negocio — ese es el porqué detrás de cada servicio de EPSIG.",
          "Millorar la seua gestió, digitalitzar els seus processos i protegir el seu negoci: este és el perquè de cada servei d'EPSIG.",
        )}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-[auto_1fr] sm:items-center">
            <Reveal className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary-pale sm:mx-0">
              <span className="font-display text-3xl font-bold text-primary">
                {site.foundedYear}
              </span>
            </Reveal>
            <Reveal className="text-center text-[15px] leading-relaxed text-ink-soft sm:text-left">
              <p>
                {t(
                  `EPSIG Consultores inició su actividad en ${site.foundedYear} con la intención de prestar un servicio integral de consultoría a empresas, especialmente en digitalización. Nos implicamos en su desarrollo hasta cumplir el objetivo.`,
                  `EPSIG Consultores va iniciar la seua activitat en ${site.foundedYear} amb la intenció d'oferir un servei integral de consultoria a empreses, especialment en digitalització. Ens impliquem en el seu desenvolupament fins a complir l'objectiu.`,
                )}
              </p>
            </Reveal>
          </div>

          <SectionHeading
            eyebrow={t("Cómo trabajamos", "Com treballem")}
            title={t(
              "Consultoría, digitalización y protección, en un solo equipo",
              "Consultoria, digitalització i protecció, en un sol equip",
            )}
            body={t(
              "La mayoría de pymes acaban con un gestor para la contabilidad, un informático para el ERP y una empresa distinta para la ciberseguridad — y ninguno habla con los demás. Nosotros unimos las tres cosas.",
              "La majoria de pimes acaben amb un gestor per a la comptabilitat, un informàtic per a l'ERP i una empresa diferent per a la ciberseguretat, i cap no parla amb els altres. Nosaltres unim les tres coses.",
            )}
          />
          <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.slug} delay={index * 0.08}>
                <TiltCard className="rounded-brand border border-line bg-surface p-7">
                  <IndexMark n={index + 1} className="mb-4" />
                  <h3 className="mb-2 text-[17px]">{t(pillar.title)}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{t(pillar.summary)}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Confianza", "Confiança")}
            title={t("Partners con los que trabajamos", "Partners amb què treballem")}
          />
          <Reveal className="flex flex-wrap justify-center gap-3">
            {site.badges.map((badge) => (
              <span
                key={badge.es}
                className="rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-semibold text-ink-soft"
              >
                {t(badge)}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <Zone />

      <CtaBand />
    </>
  );
}
