import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import { odooModules } from "@/lib/site";

export const metadata: Metadata = {
  title: "Odoo ERP",
  description:
    "Implantación de Odoo ERP para pymes: diagnóstico, configuración, migración de datos, formación del equipo y soporte continuo.",
};

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    body: "Analizamos cómo gestiona tu empresa hoy — hojas de cálculo, papel, otros programas — y qué módulos de Odoo lo resuelven.",
  },
  {
    n: "02",
    title: "Configuración",
    body: "Adaptamos Odoo a tu forma de trabajar: CRM, ventas, compras, inventario y contabilidad conectados entre sí.",
  },
  {
    n: "03",
    title: "Migración de datos",
    body: "Traspasamos clientes, productos, histórico de ventas y contabilidad sin que tu día a día se detenga.",
  },
  {
    n: "04",
    title: "Formación",
    body: "Tu equipo aprende a usar el sistema con casos reales de tu negocio, no con manuales genéricos.",
  },
  {
    n: "05",
    title: "Soporte continuo",
    body: "Acompañamos la implantación después del arranque: ajustes, dudas y nuevos módulos según creces.",
  },
];

export default function OdooPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicio · Partner oficial Odoo"
        title="Odoo ERP, implantado por quien entiende de empresa"
        lead="No nos limitamos a venderte licencias: acompañamos la implantación de principio a fin, desde el diagnóstico hasta el soporte del día a día."
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Cómo lo hacemos"
            title="Un proceso pensado para pymes"
            body=""
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.07}>
                <TiltCard className="rounded-brand border border-line bg-surface p-6">
                  <span className="font-mono text-sm font-medium text-accent-strong">{step.n}</span>
                  <h3 className="mt-3 mb-2 text-[17px]">{step.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-ink-soft">{step.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Módulos"
            title="Un núcleo, todos tus procesos conectados"
            body="Empezamos por lo esencial y añadimos módulos a medida que tu empresa lo necesita."
            dark
          />
          <Reveal className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {odooModules.map((mod) => (
              <div
                key={mod.code}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-5.5 text-center transition-colors hover:border-accent hover:bg-white/[0.07]"
              >
                <div
                  className="mx-auto mb-2.5 flex h-9.5 w-9.5 items-center justify-center rounded-[10px] font-mono text-[12.5px] font-semibold text-white"
                  style={{ background: mod.color }}
                >
                  {mod.code}
                </div>
                <span className="text-[12.5px] font-semibold text-mist">{mod.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="¿Empezamos con un diagnóstico gratuito de tu empresa?"
        body="En 30 minutos vemos qué módulos de Odoo necesitas y cómo implantarlos en tu empresa."
        ctaLabel="Habla con un consultor Odoo"
        spaced
      />
    </>
  );
}
