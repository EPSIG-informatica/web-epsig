import Link from "next/link";
import Reveal from "@/components/reveal";
import IndexMark from "@/components/index-mark";
import SectionHeading from "@/components/section-heading";
import { odooModules } from "@/lib/site";

export default function OdooSpotlight() {
  return (
    <section id="odoo" className="bg-surface-dark py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Servicio estrella"
            title="Odoo ERP, implantado por quien entiende de empresa"
            body="Diagnóstico, configuración, migración de datos, formación del equipo y soporte continuo. No nos limitamos a venderte licencias: acompañamos la implantación de principio a fin."
            dark
          />
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          {odooModules.map((mod, index) => (
              <div
                key={mod.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-accent/60 hover:bg-white/[0.07]"
              >
                <IndexMark n={index + 1} dark className="mb-4" />
                <span className="block text-[15px] font-semibold text-white">{mod.label}</span>
                <span className="mt-1 block text-[12.5px] text-mist-soft">{mod.body}</span>
              </div>
            ))}
        </Reveal>

        <div className="mt-9.5 text-center">
          <Link
            href="/contacto#diagnostico"
            className="inline-block rounded-full bg-accent-strong px-6.5 py-3.5 text-[14.5px] font-semibold text-white transition-transform hover:scale-[1.04] active:scale-[0.96]"
          >
            Habla con un consultor Odoo
          </Link>
        </div>
      </div>
    </section>
  );
}
