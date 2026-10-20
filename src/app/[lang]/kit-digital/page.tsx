import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import ProgramStatus from "@/components/program-status";
import { kitDigitalCategories, programStatus } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kit Digital",
  description:
    "Soluciones del programa Kit Digital para pymes y autónomos: web, tienda online, CRM, factura electrónica, ciberseguridad y más, con EPSIG como Agente Digitalizador Adherido.",
};

export default function KitDigitalPage() {
  return (
    <>
      <PageHero
        eyebrow="Agente Digitalizador Adherido"
        title="Kit Digital: soluciones digitales para tu pyme"
        lead="Un programa del Gobierno de España, financiado por la Unión Europea – NextGenerationEU, para impulsar la digitalización de pymes y autónomos. Como Agente Digitalizador Adherido, implantamos todas sus soluciones."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <ProgramStatus program="Kit Digital" open={programStatus.kitDigital} />
          </div>

          <SectionHeading
            eyebrow="Categorías"
            title="Nuestras soluciones del catálogo Kit Digital"
            body="Cada categoría resuelve una necesidad concreta de tu negocio. Te ayudamos a elegir la combinación adecuada y la implantamos de principio a fin."
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kitDigitalCategories.map((cat, index) => (
              <Reveal key={cat.slug} className="h-full" delay={(index % 3) * 0.08}>
                <TiltCard
                  href={`/kit-digital/${cat.slug}`}
                  className="group flex h-full flex-col rounded-brand border border-line bg-surface p-6 transition-colors hover:border-primary-light"
                >
                  <h3 className="mb-2 text-[16px]">{cat.title}</h3>
                  <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
                    {cat.summary}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[12.5px] font-semibold text-accent-strong">
                      {cat.priceFrom}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                      Ver más →
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-ink-soft">
            Precios orientativos, IVA no incluido. El importe final depende del tamaño de la
            empresa y de los puestos de trabajo a digitalizar.
          </p>
        </div>
      </section>

      <CtaBand
        title="¿Qué solución necesita tu negocio?"
        body="Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas."
        ctaLabel="Solicitar información"
      />
    </>
  );
}
