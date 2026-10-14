import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import IndexMark from "@/components/index-mark";
import CampingDashboard from "@/components/software/camping-dashboard";

export const metadata: Metadata = {
  title: "Software de control eléctrico para campings",
  description:
    "Software para campings: check-in, ficha de clientes, control de electricidad por parcela, tickets de luz, horarios, gráficos de consumo e informes de caja en un solo panel.",
};

const features = [
  {
    code: "IN",
    title: "Check-in en segundos",
    body: "Registra la llegada, asigna la parcela y deja la estancia lista en un par de clics, aunque haya cola en recepción.",
  },
  {
    code: "CL",
    title: "Ficha de clientes",
    body: "Datos de contacto, estancias anteriores y consumos de cada cliente, siempre a mano cuando vuelve.",
  },
  {
    code: "kW",
    title: "Electricidad por parcela",
    body: "Sabes qué parcela está conectada, cuánto consume y desde cuándo. Todo el camping, de un vistazo.",
  },
  {
    code: "TK",
    title: "Tickets de electricidad",
    body: "Emite y controla los tickets de consumo eléctrico. Cada kWh queda registrado y cobrado, sin discusiones a la salida.",
  },
  {
    code: "HR",
    title: "Horarios",
    body: "Organiza los horarios del camping y de sus servicios desde el mismo panel en el que gestionas todo lo demás.",
  },
  {
    code: "GR",
    title: "Gráficos orientativos",
    body: "Consumo por parcela, por día o por temporada, en gráficos claros que te ayudan a anticiparte.",
  },
  {
    code: "€",
    title: "Informes de caja",
    body: "Estancias y electricidad cuadradas en cada cierre. Informes de caja listos para revisar o pasar a tu asesoría.",
  },
];

const steps = [
  { n: "01", title: "Llega el cliente", body: "Check-in rápido, con su ficha creada o recuperada de visitas anteriores." },
  { n: "02", title: "Parcela y suministro", body: "Asignas la parcela y el suministro eléctrico queda vinculado a su estancia." },
  { n: "03", title: "Consumo bajo control", body: "Tickets de electricidad y consumo por parcela, visibles en tiempo real en el panel." },
  { n: "04", title: "Salida y caja", body: "Cobro sin sorpresas y cierre de caja con estancias y electricidad cuadradas." },
];

const wins = [
  { title: "Adiós a libretas y hojas de cálculo", body: "Toda la operativa de recepción en un único programa." },
  { title: "Cobras toda la luz que se consume", body: "Cada kWh queda asociado a una parcela y a un cliente." },
  { title: "Menos discusiones en recepción", body: "Consumos y tickets claros, que el cliente también entiende." },
  { title: "Decisiones con datos", body: "Consumos y caja a la vista para planificar cada temporada." },
];

export default function CampingSoftwarePage() {
  return (
    <>
      <header className="relative overflow-hidden bg-surface-dark pt-20 text-white sm:pt-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 80%)",
          }}
          aria-hidden
        />
        <div
          className="blob-drift pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full blur-[10px]"
          style={{ background: "radial-gradient(circle, rgba(90,169,230,.35), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 sm:pb-24 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hero-in">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Software propio · Campings
            </div>
            <h1 className="mt-5 mb-5.5 text-[36px] leading-[1.12] text-white sm:text-[46px]">
              Cada parcela, cada kWh, <em className="text-accent not-italic">bajo control.</em>
            </h1>
            <p className="mb-8 max-w-[48ch] text-base leading-relaxed text-mist-soft sm:text-[17px]">
              El software de gestión para campings que une recepción, clientes, electricidad y
              caja en un solo panel. Sin libretas, sin hojas de cálculo y sin luz sin cobrar.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/contacto#diagnostico"
                className="inline-block rounded-full bg-accent-strong px-6.5 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(90,169,230,.6)] transition-transform hover:scale-[1.04] active:scale-[0.96]"
              >
                Solicita una demo
              </Link>
              <a
                href="#funciones"
                className="inline-block rounded-full border-[1.5px] border-white/25 px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:border-white/50"
              >
                Ver funciones ↓
              </a>
            </div>
          </div>
          <div className="hero-in" style={{ animationDelay: "120ms" }}>
            <CampingDashboard />
          </div>
        </div>
      </header>

      <section id="funciones" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Funciones"
            title="Todo lo que pasa en tu camping, en un solo panel"
            body="Un CRM pensado para la recepción de un camping, no un programa genérico adaptado a la fuerza."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal
                key={feature.title}
                className={`h-full ${index === features.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <TiltCard className="h-full rounded-brand border border-line bg-surface p-6">
                  <IndexMark n={index + 1} className="mb-4" />
                  <h3 className="mb-2 text-[17px]">{feature.title}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{feature.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Cómo funciona"
            title="De la llegada al cierre de caja, sin perder un kWh"
            dark
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Reveal key={step.n} className="h-full">
                <div className="relative h-full rounded-brand border border-white/10 bg-white/[0.04] p-6">
                  <span className="font-mono text-sm font-medium text-accent">{step.n}</span>
                  <h3 className="mt-3 mb-2 text-[17px] text-white">{step.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-mist-soft">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Resultado" title="Lo que cambia en tu día a día" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wins.map((win) => (
              <Reveal key={win.title}>
                <div className="flex h-full items-start gap-4 rounded-brand border border-line bg-surface-alt p-5">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-strong text-sm font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-ink">{win.title}</span>
                    <span className="mt-0.5 block text-[14px] leading-relaxed text-ink-soft">{win.body}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Lo vemos funcionando en tu camping?"
        body="Te enseñamos el software con una demo adaptada a tus parcelas y a tu forma de trabajar."
        ctaLabel="Solicitar una demo"
      />
    </>
  );
}
