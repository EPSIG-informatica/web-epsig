import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import IndexMark from "@/components/index-mark";

export const metadata: Metadata = {
  title: "Software de gestión de viviendas tuteladas",
  description:
    "Software para entidades con viviendas tuteladas: entidades y empresas, viviendas, residentes, planning de tareas, documentación ordenada y certificados de ingreso y coste de plaza en PDF.",
};

const features = [
  {
    title: "Entidades y empresas",
    body: "Gestiona varias entidades titulares y sus empresas, cada una con su CIF, su contacto y sus viviendas.",
  },
  {
    title: "Viviendas y residentes",
    body: "Cada vivienda tutelada con sus residentes, usuarios y contactos, a un clic desde el inicio.",
  },
  {
    title: "Planning y tareas",
    body: "Planning diario y tareas de cada trabajador. Al entrar ves qué queda pendiente y en qué vivienda.",
  },
  {
    title: "Documentación ordenada",
    body: "Carpetas de vivienda, residentes, trabajadores, normativa vigente, inspecciones, protocolo de funcionamiento y protección de datos.",
  },
  {
    title: "Certificados en PDF",
    body: "Rellenas el formulario y el certificado de ingreso y coste de plaza se completa en la vista previa. Un clic y está en PDF.",
  },
  {
    title: "PIR, informes y presupuestos",
    body: "El resto del día a día de la vivienda, en el mismo panel y con los mismos datos.",
  },
];

const steps = [
  { n: "01", title: "Eliges la entidad", body: "Cambias de entidad y de empresa desde la barra superior, sin cerrar sesión." },
  { n: "02", title: "Entras en la vivienda", body: "Residentes, tareas pendientes y documentación de esa vivienda, juntos." },
  { n: "03", title: "Abres la documentación", body: "Todo archivado en las mismas carpetas, en todas las viviendas." },
  { n: "04", title: "Generas el certificado", body: "Los datos de la entidad y la vivienda ya están: solo completas los del residente." },
];

const wins = [
  { title: "Adiós a las carpetas dispersas", body: "La documentación de cada vivienda, siempre en el mismo sitio." },
  { title: "Certificados en minutos", body: "Sin plantillas de Word ni datos copiados a mano." },
  { title: "Nada se queda pendiente", body: "Las tareas de cada trabajador y cada vivienda, a la vista." },
  { title: "Preparado para inspecciones", body: "Normativa, protocolos e inspecciones archivados y localizables." },
];

export default function ViviendasTuteladasPage() {
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
          className="blob-drift pointer-events-none absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full blur-[10px]"
          style={{ background: "radial-gradient(circle, rgba(42,107,165,.45), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
          <div className="hero-in mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Software propio · Viviendas tuteladas
            </div>
            <h1 className="mt-5 mb-5.5 text-[36px] leading-[1.12] text-white sm:text-[46px]">
              Cada vivienda, cada residente, <em className="text-accent not-italic">en orden.</em>
            </h1>
            <p className="mx-auto mb-8 max-w-[56ch] text-base leading-relaxed text-mist-soft sm:text-[17px]">
              El software para entidades que gestionan viviendas tuteladas: empresas, viviendas,
              residentes, tareas y documentación en un solo panel, con los certificados listos
              en PDF.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
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

          {/* Animación completa del programa (16:9, se escala sola al ancho disponible). */}
          <div className="hero-in mt-14" style={{ animationDelay: "120ms" }}>
            <div className="overflow-hidden rounded-panel border border-white/10 bg-[#05070b] shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]">
              <iframe
                src="/animaciones/viviendas-tuteladas.html"
                title="Demostración animada del software de gestión de viviendas tuteladas: inicio, entidades, empresas, documentación y generación de un certificado en PDF"
                className="block aspect-video w-full border-0"
              />
            </div>
            <p className="mt-5 text-center text-[13.5px] text-mist-soft">
              <strong className="font-semibold text-white">Del inicio al certificado en PDF:</strong>{" "}
              así se recorre el programa, con datos de prueba.
            </p>
          </div>
        </div>
      </header>

      <section id="funciones" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Funciones"
            title="Todo lo que pasa en tus viviendas, en un solo panel"
            body="Pensado para el día a día de una entidad con viviendas tuteladas, no un programa genérico adaptado a la fuerza."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal key={feature.title} className="h-full">
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
            title="De la entidad al certificado, sin salir del programa"
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
        title="¿Lo vemos funcionando con tus viviendas?"
        body="Te enseñamos el programa con una demo adaptada a tu entidad y a tu forma de trabajar."
        ctaLabel="Solicitar una demo"
      />
    </>
  );
}
