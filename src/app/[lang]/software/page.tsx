import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import CtaBand from "@/components/sections/cta-band";
import { connectors, software } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software",
  description:
    "Software propio de EPSIG: gestión y control eléctrico para campings, gestión de viviendas tuteladas y conectores que integran Forvenues, Ágora, Sage y FACe.",
};

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Software propio"
        title="Software que resuelve problemas reales"
        lead="Desarrollamos herramientas para los problemas que vemos cada día en nuestros clientes: la luz que no se cobra en un camping, los certificados de una vivienda tutelada hechos a mano o las ventas que se teclean tres veces."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="h-full">
            <Link
              href={software.camping.href}
              className="card-spotlight group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface transition-colors hover:border-primary-light"
            >
              <div className="relative bg-surface-dark p-7" aria-hidden>
                <div className="grid grid-cols-6 gap-1.5">
                  {["on", "on", "free", "low", "on", "on", "free", "on", "on", "low", "on", "free"].map((state, index) => (
                    <span
                      key={index}
                      className={`h-7 rounded-md border ${
                        state === "on"
                          ? "border-accent/40 bg-accent/20"
                          : state === "low"
                            ? "border-[#f5b14c]/50 bg-[#f5b14c]/20"
                            : "border-white/10 bg-white/[0.04]"
                      }`}
                    />
                  ))}
                </div>
                <span className="mt-4 block font-mono text-[11px] text-mist-soft">12 parcelas · 9 conectadas · caja al día</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">Campings</span>
                <h2 className="mt-2 text-[24px] text-ink">{software.camping.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  Un CRM para la recepción de tu camping: check-in, clientes, electricidad por
                  parcela, tickets de luz, horarios, gráficos e informes de caja en un solo panel.
                </p>
                <span className="mt-5 text-sm font-semibold text-primary">Descubrir el software →</span>
              </div>
            </Link>
          </Reveal>

          <Reveal className="h-full">
            <Link
              href={software.viviendas.href}
              className="card-spotlight group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface transition-colors hover:border-primary-light"
            >
              <div className="relative bg-surface-dark p-7" aria-hidden>
                <div className="flex flex-col gap-1.5">
                  {["1. Vivienda", "2. Residentes", "7. Protocolo VT"].map((folder, index) => (
                    <span
                      key={folder}
                      className="flex h-7 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 font-mono text-[10.5px] text-mist"
                    >
                      <span className={`h-2.5 w-2.5 rounded-[3px] ${index === 2 ? "bg-accent" : "bg-[#d6a514]"}`} />
                      {folder}
                    </span>
                  ))}
                </div>
                <span className="mt-4 block font-mono text-[11px] text-mist-soft">Certificado listo · PDF generado</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">Viviendas tuteladas</span>
                <h2 className="mt-2 text-[24px] text-ink">{software.viviendas.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  Entidades, empresas, viviendas, residentes, planning de tareas y documentación
                  ordenada en un solo panel, con el certificado de ingreso y coste de plaza en PDF.
                </p>
                <span className="mt-5 text-sm font-semibold text-primary">Ver el software →</span>
              </div>
            </Link>
          </Reveal>

          <Reveal className="h-full">
            <Link
              href={software.conectores.href}
              className="card-spotlight group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface transition-colors hover:border-primary-light"
            >
              <div className="relative flex flex-wrap items-center gap-x-2 gap-y-2.5 bg-surface-dark p-7" aria-hidden>
                {["Forvenues", "Ágora", "Sage", "FACe"].map((name, index) => (
                  <span key={name} className="flex items-center gap-2">
                    <span className="rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-2 font-mono text-[11px] font-semibold text-white">
                      {name}
                    </span>
                    {index < 3 && <span className="text-accent">⟶</span>}
                  </span>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">Integraciones</span>
                <h2 className="mt-2 text-[24px] text-ink">{software.conectores.title}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {connectors.length} conectores que llevan tus ventas de Forvenues a Ágora, de
                  Ágora a Sage cada día y de Sage a la factura electrónica FACe. Por separado o
                  encadenados.
                </p>
                <span className="mt-5 text-sm font-semibold text-primary">Ver los conectores →</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="¿Tienes un problema que ningún programa resuelve?"
        body="Cuéntanoslo: si podemos automatizarlo o conectarlo, te proponemos cómo."
        ctaLabel="Hablar con nosotros"
      />
    </>
  );
}
