import type { Metadata } from "next";
import Link from "@/components/link";
import Breadcrumbs from "@/components/breadcrumbs";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import IndexMark from "@/components/index-mark";
import ViviendasAppDemo from "@/components/software/viviendas-app-demo";
import { getT, pageMetadata } from "@/lib/i18n-server";
import type { Localized } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/software/viviendas-tuteladas", {
    title: t("Software de gestión de viviendas tuteladas", "Programari de gestió d'habitatges tutelats", "Supported Housing Management Software"),
    description: t(
      "Software para entidades con viviendas tuteladas: entidades y empresas, viviendas, residentes, planning de tareas, documentación ordenada y certificados de ingreso y coste de plaza en PDF.",
      "Programari per a entitats amb habitatges tutelats: entitats i empreses, habitatges, residents, planificació de tasques, documentació ordenada i certificats d'ingrés i cost de plaça en PDF.",
      "Software for supported housing providers: homes, residents, task planning, organised documentation and admission certificates as PDFs.",
    ),
  });
}

type Item = { title: Localized; body: Localized };

const features: Item[] = [
  {
    title: { es: "Entidades y empresas", ca: "Entitats i empreses", en: "Organisations and companies" },
    body: {
      es: "Gestiona varias entidades titulares y sus empresas, cada una con su CIF, su contacto y sus viviendas.",
      ca: "Gestiona diverses entitats titulars i les seues empreses, cadascuna amb el seu CIF, el seu contacte i els seus habitatges.",
      en: "Manage several parent organisations and their companies, each with its own CIF, contact details and homes.",
    },
  },
  {
    title: { es: "Viviendas y residentes", ca: "Habitatges i residents", en: "Homes and residents" },
    body: {
      es: "Cada vivienda tutelada con sus residentes, usuarios y contactos, a un clic desde el inicio.",
      ca: "Cada habitatge tutelat amb els seus residents, usuaris i contactes, a un clic des de l'inici.",
      en: "Every supported home with its residents, users and contacts, one click from the home screen.",
    },
  },
  {
    title: { es: "Planning y tareas", ca: "Planificació i tasques", en: "Planning and tasks" },
    body: {
      es: "Planning diario y tareas de cada trabajador. Al entrar ves qué queda pendiente y en qué vivienda.",
      ca: "Planificació diària i tasques de cada treballador. En entrar veus què queda pendent i en quin habitatge.",
      en: "Daily planning and tasks for each member of staff. As soon as you log in, you see what's outstanding and in which home.",
    },
  },
  {
    title: { es: "Documentación ordenada", ca: "Documentació ordenada", en: "Well-organised documentation" },
    body: {
      es: "Carpetas de vivienda, residentes, trabajadores, normativa vigente, inspecciones, protocolo de funcionamiento y protección de datos.",
      ca: "Carpetes d'habitatge, residents, treballadors, normativa vigent, inspeccions, protocol de funcionament i protecció de dades.",
      en: "Folders for the home, residents, staff, current regulations, inspections, operating protocol and data protection.",
    },
  },
  {
    title: { es: "Certificados en PDF", ca: "Certificats en PDF", en: "PDF certificates" },
    body: {
      es: "Rellenas el formulario y el certificado de ingreso y coste de plaza se completa en la vista previa. Un clic y está en PDF.",
      ca: "Emplenes el formulari i el certificat d'ingrés i cost de plaça es completa en la vista prèvia. Un clic i ja el tens en PDF.",
      en: "Fill in the form and the admission and place cost certificate completes itself in the preview. One click and it's a PDF.",
    },
  },
  {
    title: { es: "PIR, informes y presupuestos", ca: "PIR, informes i pressupostos", en: "PIR, reports and budgets" },
    body: {
      es: "El resto del día a día de la vivienda, en el mismo panel y con los mismos datos.",
      ca: "La resta del dia a dia de l'habitatge, en el mateix panell i amb les mateixes dades.",
      en: "The rest of the home's day-to-day, on the same dashboard and with the same data.",
    },
  },
];

const steps: (Item & { n: string })[] = [
  {
    n: "01",
    title: { es: "Eliges la entidad", ca: "Tries l'entitat", en: "Choose the organisation" },
    body: {
      es: "Cambias de entidad y de empresa desde la barra superior, sin cerrar sesión.",
      ca: "Canvies d'entitat i d'empresa des de la barra superior, sense tancar la sessió.",
      en: "Switch organisation and company from the top bar, without logging out.",
    },
  },
  {
    n: "02",
    title: { es: "Entras en la vivienda", ca: "Entres en l'habitatge", en: "Open the home" },
    body: {
      es: "Residentes, tareas pendientes y documentación de esa vivienda, juntos.",
      ca: "Residents, tasques pendents i documentació d'eixe habitatge, junts.",
      en: "Residents, pending tasks and documentation for that home, all together.",
    },
  },
  {
    n: "03",
    title: { es: "Abres la documentación", ca: "Obris la documentació", en: "Open the documentation" },
    body: {
      es: "Todo archivado en las mismas carpetas, en todas las viviendas.",
      ca: "Tot arxivat en les mateixes carpetes, en tots els habitatges.",
      en: "Everything filed in the same folders, across every home.",
    },
  },
  {
    n: "04",
    title: { es: "Generas el certificado", ca: "Generes el certificat", en: "Generate the certificate" },
    body: {
      es: "Los datos de la entidad y la vivienda ya están: solo completas los del residente.",
      ca: "Les dades de l'entitat i de l'habitatge ja hi són: només completes les del resident.",
      en: "The organisation and home details are already there: you only add the resident's.",
    },
  },
];

const wins: Item[] = [
  {
    title: { es: "Adiós a las carpetas dispersas", ca: "Adeu a les carpetes disperses", en: "Goodbye scattered folders" },
    body: {
      es: "La documentación de cada vivienda, siempre en el mismo sitio.",
      ca: "La documentació de cada habitatge, sempre en el mateix lloc.",
      en: "Each home's documentation, always in the same place.",
    },
  },
  {
    title: { es: "Certificados en minutos", ca: "Certificats en minuts", en: "Certificates in minutes" },
    body: {
      es: "Sin plantillas de Word ni datos copiados a mano.",
      ca: "Sense plantilles de Word ni dades copiades a mà.",
      en: "No Word templates and no data copied by hand.",
    },
  },
  {
    title: { es: "Nada se queda pendiente", ca: "Res no es queda pendent", en: "Nothing slips through the cracks" },
    body: {
      es: "Las tareas de cada trabajador y cada vivienda, a la vista.",
      ca: "Les tasques de cada treballador i de cada habitatge, a la vista.",
      en: "Every staff member's and every home's tasks, in plain sight.",
    },
  },
  {
    title: { es: "Preparado para inspecciones", ca: "Preparat per a inspeccions", en: "Inspection-ready" },
    body: {
      es: "Normativa, protocolos e inspecciones archivados y localizables.",
      ca: "Normativa, protocols i inspeccions arxivats i localitzables.",
      en: "Regulations, protocols and inspections filed and easy to find.",
    },
  },
];

export default async function ViviendasTuteladasPage() {
  const t = await getT();
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
          style={{ background: "radial-gradient(circle, rgba(42,107,165,.45), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 sm:pb-24 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hero-in">
            <Breadcrumbs path="/software/viviendas-tuteladas" align="left" className="mb-6" />
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {t("Software propio · Viviendas tuteladas", "Programari propi · Habitatges tutelats", "Our own software · Supported housing")}
            </div>
            <h1 className="mt-5 mb-5.5 text-[36px] leading-[1.12] text-white sm:text-[46px]">
              {t(
                <>
                  Cada vivienda, cada residente, <em className="text-accent not-italic">en orden.</em>
                </>,
                <>
                  Cada habitatge, cada resident, <em className="text-accent not-italic">en ordre.</em>
                </>,
                <>
                  Every home, every resident, <em className="text-accent not-italic">in order.</em>
                </>,
              )}
            </h1>
            <p className="mb-8 max-w-[48ch] text-base leading-relaxed text-mist-soft sm:text-[17px]">
              {t(
                "El software para entidades que gestionan viviendas tuteladas: empresas, viviendas, residentes, tareas y documentación en un solo panel, con los certificados listos en PDF.",
                "El programari per a entitats que gestionen habitatges tutelats: empreses, habitatges, residents, tasques i documentació en un sol panell, amb els certificats preparats en PDF.",
                "The software for organisations that run supported housing: companies, homes, residents, tasks and documentation in a single dashboard, with certificates ready as PDFs.",
              )}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/contacto#diagnostico"
                className="inline-block rounded-full bg-accent-strong px-6.5 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(90,169,230,.6)] transition-transform hover:scale-[1.04] active:scale-[0.96]"
              >
                {t("Solicita una demo", "Sol·licita una demo", "Request a demo")}
              </Link>
              <a
                href="#funciones"
                className="inline-block rounded-full border-[1.5px] border-white/25 px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:border-white/50"
              >
                {t("Ver funciones ↓", "Veure funcions ↓", "See features ↓")}
              </a>
            </div>
          </div>

          {/* Animación completa del programa (16:9, se escala sola al ancho disponible). */}
          <div className="hero-in" style={{ animationDelay: "120ms" }}>
            <ViviendasAppDemo />
          </div>
        </div>
      </header>

      <section id="funciones" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Funciones", "Funcions", "Features")}
            title={t("Todo lo que pasa en tus viviendas, en un solo panel", "Tot el que passa en els teus habitatges, en un sol panell", "Everything happening in your homes, in a single dashboard")}
            body={t(
              "Pensado para el día a día de una entidad con viviendas tuteladas, no un programa genérico adaptado a la fuerza.",
              "Pensat per al dia a dia d'una entitat amb habitatges tutelats, no un programa genèric adaptat a la força.",
              "Designed for the day-to-day of an organisation running supported housing, not generic software forced to fit.",
            )}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal key={feature.title.es} className="h-full">
                <TiltCard className="h-full rounded-brand border border-line bg-surface p-6">
                  <IndexMark n={index + 1} className="mb-4" />
                  <h3 className="mb-2 text-[17px]">{t(feature.title)}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{t(feature.body)}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Cómo funciona", "Com funciona", "How it works")}
            title={t("De la entidad al certificado, sin salir del programa", "De l'entitat al certificat, sense eixir del programa", "From organisation to certificate, without leaving the software")}
            dark
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Reveal key={step.n} className="h-full">
                <div className="relative h-full rounded-brand border border-white/10 bg-white/[0.04] p-6">
                  <span className="font-mono text-sm font-medium text-accent">{step.n}</span>
                  <h3 className="mt-3 mb-2 text-[17px] text-white">{t(step.title)}</h3>
                  <p className="text-[13.5px] leading-relaxed text-mist-soft">{t(step.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Resultado", "Resultat", "The result")}
            title={t("Lo que cambia en tu día a día", "El que canvia en el teu dia a dia", "What changes in your day-to-day")}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wins.map((win) => (
              <Reveal key={win.title.es}>
                <div className="flex h-full items-start gap-4 rounded-brand border border-line bg-surface-alt p-5">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-strong text-sm font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold text-ink">{t(win.title)}</span>
                    <span className="mt-0.5 block text-[14px] leading-relaxed text-ink-soft">{t(win.body)}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t("¿Lo vemos funcionando con tus viviendas?", "El veiem funcionant amb els teus habitatges?", "Shall we see it working with your homes?")}
        body={t(
          "Te enseñamos el programa con una demo adaptada a tu entidad y a tu forma de trabajar.",
          "T'ensenyem el programa amb una demo adaptada a la teua entitat i a la teua manera de treballar.",
          "We'll show you the software with a demo tailored to your organisation and the way you work.",
        )}
        ctaLabel={t("Solicitar una demo", "Sol·licitar una demo", "Request a demo")}
      />
    </>
  );
}
