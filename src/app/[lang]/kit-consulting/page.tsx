import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import ProgramStatus from "@/components/program-status";
import { kitConsultingServices, kitConsultingTiers, programStatus } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kit Consulting",
  description:
    "Servicios de asesoramiento del programa Kit Consulting: inteligencia artificial, análisis de datos, procesos, estrategia, ciberseguridad y transformación digital, con EPSIG como Asesor Digital.",
};

export default function KitConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Asesor Digital"
        title="Kit Consulting: asesoramiento experto para digitalizar tu empresa"
        lead="Un programa del Gobierno de España, financiado por la Unión Europea – NextGenerationEU, que subvenciona servicios de asesoramiento digital para empresas de entre 10 y 249 empleados."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <ProgramStatus program="Kit Consulting" open={programStatus.kitConsulting} />
          </div>

          <Reveal className="mx-auto mb-12 max-w-2xl text-center text-[15px] leading-relaxed text-ink-soft">
            <p>
              El programa Kit Consulting, dentro del Plan de Recuperación, Transformación y
              Resiliencia, subvenciona servicios de asesoramiento en inteligencia artificial,
              análisis de datos, procesos de negocio, estrategia, ciberseguridad y
              transformación digital. Como Asesor Digital, prestamos todos estos servicios.
            </p>
          </Reveal>

          <p className="mb-5 text-center text-sm font-semibold text-ink">
            Importe del bono según el tamaño de la empresa
          </p>
          <div className="mx-auto mb-20 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {kitConsultingTiers.map((tier, index) => (
              <Reveal key={tier.range} delay={index * 0.08}>
                <TiltCard className="rounded-brand border border-line bg-surface-alt p-6 text-center">
                  <span className="block font-mono text-2xl font-semibold text-primary">
                    {tier.amount}
                  </span>
                  <span className="mt-2 block text-[13.5px] text-ink-soft">{tier.range}</span>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <SectionHeading
            eyebrow="Servicios de asesoramiento"
            title="Servicios del catálogo Kit Consulting"
            body="Puedes contratarlos directamente con nosotros, con o sin ayuda pública."
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {kitConsultingServices.map((service, index) => (
              <Reveal key={service.slug} className="h-full" delay={(index % 4) * 0.07}>
                <TiltCard
                  href={`/kit-consulting/${service.slug}`}
                  className="group flex h-full flex-col rounded-brand border border-line bg-surface p-6.5 transition-colors hover:border-primary-light"
                >
                  <h3 className="mb-2 text-[16.5px]">{service.title}</h3>
                  <p className="flex-1 text-[14px] leading-relaxed text-ink-soft">
                    {service.summary}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                    Ver más →
                  </span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Quieres digitalizar tu empresa con un plan claro?"
        body="Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas."
        ctaLabel="Solicitar información"
      />
    </>
  );
}
