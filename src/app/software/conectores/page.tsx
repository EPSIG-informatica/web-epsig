import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import ConnectorFlow from "@/components/software/connector-flow";
import { connectors } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conectores Forvenues, Ágora, Sage y FACe",
  description:
    "Conectores de software que integran Forvenues con Ágora, Ágora con Sage cada día y Sage con FACe: de la venta de una entrada a la contabilidad y la factura electrónica, sin teclear dos veces.",
};

const wins = [
  { title: "Cero doble tecleo", body: "Cada venta se registra una sola vez y viaja sola al siguiente programa." },
  { title: "Menos errores", body: "Sin copiar y pegar, desaparecen los descuadres y las cifras mal transcritas." },
  { title: "Datos siempre al día", body: "Contabilidad y ventas actualizadas para decidir con información real." },
  { title: "Horas libres para tu equipo", body: "El tiempo que se iba en exportar y cuadrar, dedicado a tu negocio." },
];

const faqs = [
  {
    q: "¿Tengo que cambiar los programas que ya uso?",
    a: "No. Los conectores trabajan con tu Forvenues, tu Ágora y tu Sage tal como los tienes: simplemente hacen que se hablen entre ellos.",
  },
  {
    q: "¿Puedo contratar solo uno de los conectores?",
    a: "Sí. Cada conector funciona por separado y, si lo necesitas, se combinan para cubrir el recorrido completo, desde la venta de la entrada hasta la contabilidad y la factura electrónica.",
  },
  {
    q: "¿Cada cuánto se sincronizan los datos?",
    a: "El conector Ágora → Sage envía las ventas a contabilidad cada día. En el resto te proponemos la frecuencia que mejor encaje con tu forma de trabajar.",
  },
  {
    q: "¿Quién se encarga de ponerlo en marcha?",
    a: "Nosotros. Analizamos cómo trabajas, configuramos los conectores y te acompañamos hasta que todo funciona solo.",
  },
];

export default function ConectoresPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-surface-dark pt-20 pb-16 text-white sm:pt-24 sm:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)",
          }}
          aria-hidden
        />
        <div
          className="blob-drift pointer-events-none absolute -left-32 -top-40 h-[480px] w-[480px] rounded-full blur-[10px]"
          style={{ background: "radial-gradient(circle, rgba(42,107,165,.5), transparent 70%)" }}
          aria-hidden
        />
        <div
          className="blob-drift-slow pointer-events-none absolute -right-40 bottom-[-160px] h-[420px] w-[420px] rounded-full blur-[10px]"
          style={{ background: "radial-gradient(circle, rgba(90,169,230,.25), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="hero-in mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Software propio · Conectores
            </div>
            <h1 className="mt-5 text-[36px] leading-[1.12] text-white sm:text-[46px]">
              Tus programas, trabajando juntos.{" "}
              <em className="text-accent not-italic">Tú, a lo tuyo.</em>
            </h1>
            <p className="mx-auto mt-5 max-w-[56ch] text-base leading-relaxed text-mist-soft sm:text-[17px]">
              Conectamos Forvenues, Ágora, Sage y FACe para que cada venta viaje sola hasta tu
              contabilidad y tu factura electrónica. Sin exportar, sin copiar y sin errores.
            </p>
          </div>

          <div className="hero-in mt-14" style={{ animationDelay: "120ms" }}>
            <ConnectorFlow />
            <p className="mt-6 text-center text-[13.5px] text-mist-soft">
              <strong className="font-semibold text-white">Del ticket vendido al asiento contable:</strong>{" "}
              alguien compra una entrada en Forvenues y acaba reflejada en Sage a través de Ágora.
            </p>
          </div>
        </div>
      </header>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Los conectores"
            title="Tres conectores, un recorrido completo"
            body="Úsalos por separado o encadénalos: tú decides hasta dónde llega la automatización."
          />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {connectors.map((connector) => (
              <Reveal key={connector.id} className="h-full">
                <TiltCard className="flex h-full flex-col rounded-brand border border-line bg-surface p-7">
                  <div id={connector.id} className="mb-5 flex scroll-mt-24 items-center gap-2 font-mono text-[12.5px] font-semibold">
                    <span className="rounded-md bg-surface-alt px-2 py-1 text-ink">{connector.from}</span>
                    <span className="text-accent-strong" aria-hidden>
                      ⟶
                    </span>
                    <span className="sr-only">conectado con</span>
                    <span className="rounded-md bg-surface-alt px-2 py-1 text-ink">{connector.to}</span>
                  </div>
                  <h3 className="text-[19px]">{connector.title}</h3>
                  <p className="mt-1 text-[14px] font-semibold text-primary">{connector.tagline}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{connector.body}</p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                    {connector.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[14px] text-ink">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Conexión completa
            </div>
            <h2 className="mt-3 text-[30px] leading-tight text-ink">
              Vende una entrada. Aparece en tu contabilidad. Nadie ha tocado un teclado.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              Encadenando los conectores, la venta de una entrada en Forvenues pasa a Ágora como
              venta de tu TPV y, de ahí, llega a Sage cada día. Si además facturas a la
              Administración, la factura sale de Sage hacia FACe. Un solo registro, de principio
              a fin.
            </p>
            <Link
              href="/contacto#diagnostico"
              className="mt-7 inline-block rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition hover:scale-[1.03] hover:bg-primary active:scale-[0.97]"
            >
              Quiero automatizarlo
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wins.map((win) => (
              <Reveal key={win.title} className="h-full">
                <div className="h-full rounded-brand border border-line bg-surface p-5">
                  <span
                    className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent-strong text-sm font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <h3 className="text-[16px] text-ink">{win.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">{win.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que suelen preguntarnos" />
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-brand border border-line bg-surface p-5 open:bg-surface-alt"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="text-xl leading-none text-primary transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Qué programas usas hoy?"
        body="Cuéntanoslo y te decimos cómo conectarlos para que dejes de teclear las cosas dos veces."
        ctaLabel="Hablar con nosotros"
      />
    </>
  );
}
