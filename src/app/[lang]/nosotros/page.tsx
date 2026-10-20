import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import Zone from "@/components/sections/zone";
import CtaBand from "@/components/sections/cta-band";
import IndexMark from "@/components/index-mark";
import { pillars, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "EPSIG Consultores: consultoría empresarial, transformación digital e implantación de Odoo ERP para pymes de la Marina Alta, Valencia y la Safor.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Ayudamos a las empresas a funcionar mejor"
        lead="Mejorar su gestión, digitalizar sus procesos y proteger su negocio — ese es el porqué detrás de cada servicio de EPSIG."
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
                EPSIG Consultores inició su actividad en {site.foundedYear} con la intención de
                prestar un servicio integral de consultoría a empresas, especialmente en
                digitalización. Nos implicamos en su desarrollo hasta cumplir el objetivo.
              </p>
            </Reveal>
          </div>

          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Consultoría, digitalización y protección, en un solo equipo"
            body="La mayoría de pymes acaban con un gestor para la contabilidad, un informático para el ERP y una empresa distinta para la ciberseguridad — y ninguno habla con los demás. Nosotros unimos las tres cosas."
          />
          <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.slug} delay={index * 0.08}>
                <TiltCard className="rounded-brand border border-line bg-surface p-7">
                  <IndexMark n={index + 1} className="mb-4" />
                  <h3 className="mb-2 text-[17px]">{pillar.title}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{pillar.summary}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Confianza" title="Partners con los que trabajamos" />
          <Reveal className="flex flex-wrap justify-center gap-3">
            {site.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-semibold text-ink-soft"
              >
                {badge}
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
