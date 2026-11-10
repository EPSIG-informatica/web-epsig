import type { Metadata } from "next";
import Link from "@/components/link";
import Breadcrumbs from "@/components/breadcrumbs";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import SplitText, { type Segment } from "@/components/split-text";
import Icon from "@/components/icons";
import ViviendasAppDemo from "@/components/software/viviendas-app-demo";
import { getT, pageMetadata } from "@/lib/i18n-server";
import HeroBackdrop from "@/components/hero-backdrop";
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

// Icono de cada función, en el mismo orden que `features` ("calendar", "folder" y "doc" se dibujan aquí).
const featureIcons = ["briefcase", "home", "calendar", "folder", "doc", "chart"] as const;
const winIcons = ["folder", "doc", "calendar", "shield"] as const;

export default async function ViviendasTuteladasPage() {
  const t = await getT();
  return (
    <>
      <header className="relative overflow-hidden bg-surface-dark pt-20 text-white sm:pt-24">
        <HeroBackdrop />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-6 sm:pb-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <div className="hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>
              <Breadcrumbs path="/software/viviendas-tuteladas" align="left" className="mb-6" />
            </div>
            <div className="hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
              <div className="eyebrow eyebrow-dark">
                <span className="dot" aria-hidden />
                {t("Software propio · Viviendas tuteladas", "Programari propi · Habitatges tutelats", "Our own software · Supported housing")}
              </div>
            </div>
            <SplitText
              as="h1"
              trigger="load"
              delay={160}
              text={t<Segment[]>(
                ["Cada vivienda, cada residente,", { text: "en orden.", className: "text-shine" }],
                ["Cada habitatge, cada resident,", { text: "en ordre.", className: "text-shine" }],
                ["Every home, every resident,", { text: "in order.", className: "text-shine" }],
              )}
              className="mt-6 mb-6 text-[36px] leading-[1.05] text-white sm:text-[50px] lg:text-[54px]"
            />
            <p
              className="hero-in mb-9 max-w-[48ch] text-[16px] leading-relaxed text-mist-soft sm:text-[17.5px]"
              style={{ "--d": "480ms" } as React.CSSProperties}
            >
              {t(
                "El software para entidades que gestionan viviendas tuteladas: empresas, viviendas, residentes, tareas y documentación en un solo panel, con los certificados listos en PDF.",
                "El programari per a entitats que gestionen habitatges tutelats: empreses, habitatges, residents, tasques i documentació en un sol panell, amb els certificats preparats en PDF.",
                "The software for organisations that run supported housing: companies, homes, residents, tasks and documentation in a single dashboard, with certificates ready as PDFs.",
              )}
            </p>
            <div className="hero-in flex flex-wrap gap-3" style={{ "--d": "600ms" } as React.CSSProperties}>
              <Link href="/contacto#diagnostico" data-magnetic className="btn btn-primary">
                {t("Solicita una demo", "Sol·licita una demo", "Request a demo")}
              </Link>
              <a href="#funciones" data-magnetic className="btn btn-ghost">
                {t("Ver funciones ↓", "Veure funcions ↓", "See features ↓")}
              </a>
            </div>
          </div>

          {/* Animación completa del programa (16:9, se escala sola al ancho disponible), con halo de luz. */}
          <div className="hero-in relative min-w-0" style={{ "--d": "320ms" } as React.CSSProperties}>
            <div
              className="pointer-events-none absolute -inset-6 rounded-[40px] opacity-80 blur-3xl sm:-inset-10"
              style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(61,143,224,.45), rgba(42,107,165,.12) 55%, transparent 75%)" }}
              aria-hidden
            />
            <div className="relative">
              <ViviendasAppDemo />
            </div>
            <span
              className="glass float pointer-events-none absolute -top-4 right-4 hidden items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur-md sm:flex"
              style={{ "--fd": "0.4s" } as React.CSSProperties}
              aria-hidden
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-accent text-white">
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 6.2l2.2 2.2 4.8-4.8" />
                </svg>
              </span>
              PDF
            </span>
          </div>
        </div>
      </header>

      <section id="funciones" className="relative scroll-mt-20 overflow-hidden bg-surface py-28 sm:py-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(42,107,165,.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, black, transparent 75%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHeading
            eyebrow={t("Funciones", "Funcions", "Features")}
            title={t("Todo lo que pasa en tus viviendas, en un solo panel", "Tot el que passa en els teus habitatges, en un sol panell", "Everything happening in your homes, in a single dashboard")}
            body={t(
              "Pensado para el día a día de una entidad con viviendas tuteladas, no un programa genérico adaptado a la fuerza.",
              "Pensat per al dia a dia d'una entitat amb habitatges tutelats, no un programa genèric adaptat a la força.",
              "Designed for the day-to-day of an organisation running supported housing, not generic software forced to fit.",
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Reveal key={feature.title.es} className="h-full" delay={(index % 3) * 0.1}>
                <TiltCard className="card-light group h-full p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="icon-tile transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                      <Glyph name={featureIcons[index % featureIcons.length]} />
                    </span>
                    <span className="font-mono text-[12px] text-ink-faint" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-[17.5px] text-ink">{t(feature.title)}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{t(feature.body)}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] max-w-[160%] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(42,107,165,.28), transparent 65%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHeading
            eyebrow={t("Cómo funciona", "Com funciona", "How it works")}
            title={t("De la entidad al certificado, sin salir del programa", "De l'entitat al certificat, sense eixir del programa", "From organisation to certificate, without leaving the software")}
            dark
          />
          <Steps steps={steps.map((step) => ({ n: step.n, title: t(step.title), body: t(step.body) }))} />
        </div>
      </section>

      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              className="mb-10"
              eyebrow={t("Resultado", "Resultat", "The result")}
              title={t("Lo que cambia en tu día a día", "El que canvia en el teu dia a dia", "What changes in your day-to-day")}
            />
            {/* Tareas de cada vivienda que se completan al entrar (decorativo) */}
            <Reveal direction="scale" delay={0.15}>
              <div className="card-light relative flex flex-col gap-2.5 overflow-hidden p-4 sm:p-5" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    data-reveal="left"
                    style={{ "--d": `${250 + i * 160}ms` } as React.CSSProperties}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface-alt/60 px-3 py-2.5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-pale text-primary">
                      <Icon name="home" className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block h-1.5 rounded-full bg-ink/15" style={{ width: `${70 - i * 12}%` }} />
                      <span className="mt-1.5 block h-1.5 rounded-full bg-ink/10" style={{ width: `${40 + i * 8}%` }} />
                    </span>
                    <span
                      className="check grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white shadow-[0_0_14px_-3px_rgba(90,169,230,.9)]"
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 6.2l2.2 2.2 4.8-4.8" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wins.map((win, index) => (
              <Reveal key={win.title.es} className="h-full" delay={0.1 + index * 0.1}>
                <TiltCard className="card-light h-full p-6">
                  <span className="icon-tile mb-5 h-11 w-11" aria-hidden>
                    <Glyph name={winIcons[index % winIcons.length]} />
                  </span>
                  <span className="block text-[16.5px] font-semibold text-ink">{t(win.title)}</span>
                  <span className="mt-1.5 block text-[14px] leading-relaxed text-ink-soft">{t(win.body)}</span>
                </TiltCard>
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

// Iconos propios de esta página (el resto viene del juego común de `Icon`).
const localGlyphs: Record<string, React.ReactNode> = {
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 9.5h16M8.5 3v4M15.5 3v4M8 13h2M12 13h2M8 16.5h2" />
    </>
  ),
  folder: <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h4l2 2.2h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />,
  doc: (
    <>
      <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" />
      <path d="M14 3.5V8h4M8.5 12.5h7M8.5 16h4.5" />
    </>
  ),
};

function Glyph({ name }: { name: string }) {
  const local = localGlyphs[name];
  if (!local) return <Icon name={name} className="h-5 w-5" />;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      {local}
    </svg>
  );
}

// Pasos en línea de tiempo: la línea se dibuja al entrar y un pulso de luz la recorre.
function Steps({ steps }: { steps: { n: string; title: string; body: string }[] }) {
  return (
    <div data-observe className="relative">
      <div className="pointer-events-none absolute top-[22px] right-[12.5%] left-[12.5%] hidden h-px lg:block" aria-hidden>
        <span className="draw-line absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/60 to-accent/10" />
        <svg className="absolute inset-x-0 -top-1 h-2 w-full overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none" fill="none">
          <path
            d="M0,1 L100,1"
            pathLength={100}
            stroke="#b5dcfb"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="trace-pulse"
            style={{ strokeDasharray: "14 86", animationDuration: "4.5s", filter: "drop-shadow(0 0 5px #5aa9e6)" } as React.CSSProperties}
          />
        </svg>
      </div>
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.map((step, index) => (
          <li key={step.n} className="h-full">
            <Reveal className="flex h-full flex-col" delay={0.15 + index * 0.12}>
              <span className="relative z-10 mb-5 grid h-11 w-11 place-items-center rounded-full border border-accent/50 bg-surface-dark font-mono text-[13px] font-medium text-ice shadow-[0_0_30px_-4px_rgba(61,143,224,.8)] lg:mx-auto">
                {step.n}
              </span>
              <div className="glass card-spotlight flex-1 rounded-panel p-6">
                <h3 className="mb-2 text-[17px] text-white">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-mist-soft">{step.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
