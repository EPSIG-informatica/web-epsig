import type { Metadata } from "next";
import Link from "@/components/link";
import Breadcrumbs from "@/components/breadcrumbs";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import SplitText, { type Segment } from "@/components/split-text";
import Icon from "@/components/icons";
import CampingAppVideo from "@/components/software/camping-app-video";
import { getT, pageMetadata } from "@/lib/i18n-server";
import HeroBackdrop from "@/components/hero-backdrop";
import type { Localized } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/software/control-electrico-camping", {
    title: t("Software de control eléctrico para campings", "Programari de control elèctric per a càmpings", "Campsite Electricity Management Software"),
    description: t(
      "Software para campings: check-in, ficha de clientes, control de electricidad por parcela, tickets de luz, horarios, gráficos de consumo e informes de caja en un solo panel.",
      "Programari per a càmpings: check-in, fitxa de clients, control d'electricitat per parcel·la, tiquets de llum, horaris, gràfics de consum i informes de caixa en un sol panell.",
      "Campsite software: check-in, guest records, electricity per pitch, electricity tickets, consumption charts and cash reports in one dashboard.",
    ),
  });
}

type Item = { title: Localized; body: Localized };

const features: (Item & { code: string })[] = [
  {
    code: "IN",
    title: { es: "Check-in en segundos", ca: "Check-in en segons", en: "Check-in in seconds" },
    body: {
      es: "Registra la llegada, asigna la parcela y deja la estancia lista en un par de clics, aunque haya cola en recepción.",
      ca: "Registra l'arribada, assigna la parcel·la i deixa l'estada preparada en un parell de clics, encara que hi haja cua en recepció.",
      en: "Record the arrival, assign the pitch and have the stay ready in a couple of clicks, even with a queue at reception.",
    },
  },
  {
    code: "CL",
    title: { es: "Ficha de clientes", ca: "Fitxa de clients", en: "Guest records" },
    body: {
      es: "Datos de contacto, estancias anteriores y consumos de cada cliente, siempre a mano cuando vuelve.",
      ca: "Dades de contacte, estades anteriors i consums de cada client, sempre a mà quan torna.",
      en: "Contact details, previous stays and consumption for every guest, always to hand when they come back.",
    },
  },
  {
    code: "kW",
    title: { es: "Electricidad por parcela", ca: "Electricitat per parcel·la", en: "Electricity per pitch" },
    body: {
      es: "Sabes qué parcela está conectada, cuánto consume y desde cuándo. Todo el camping, de un vistazo.",
      ca: "Saps quina parcel·la està connectada, quant consumix i des de quan. Tot el càmping, d'un colp d'ull.",
      en: "See which pitch is connected, how much it is using and since when. The whole campsite at a glance.",
    },
  },
  {
    code: "TK",
    title: { es: "Tickets de electricidad", ca: "Tiquets d'electricitat", en: "Electricity tickets" },
    body: {
      es: "Emite y controla los tickets de consumo eléctrico. Cada kWh queda registrado y cobrado, sin discusiones a la salida.",
      ca: "Emet i controla els tiquets de consum elèctric. Cada kWh queda registrat i cobrat, sense discussions a l'eixida.",
      en: "Issue and track electricity consumption tickets. Every kWh is recorded and billed, with no arguments at check-out.",
    },
  },
  {
    code: "HR",
    title: { es: "Horarios", ca: "Horaris", en: "Schedules" },
    body: {
      es: "Organiza los horarios del camping y de sus servicios desde el mismo panel en el que gestionas todo lo demás.",
      ca: "Organitza els horaris del càmping i dels seus serveis des del mateix panell en què gestiones tota la resta.",
      en: "Organise campsite and service schedules from the same dashboard you use to manage everything else.",
    },
  },
  {
    code: "GR",
    title: { es: "Gráficos orientativos", ca: "Gràfics orientatius", en: "At-a-glance charts" },
    body: {
      es: "Consumo por parcela, por día o por temporada, en gráficos claros que te ayudan a anticiparte.",
      ca: "Consum per parcel·la, per dia o per temporada, en gràfics clars que t'ajuden a anticipar-te.",
      en: "Consumption by pitch, by day or by season, in clear charts that help you plan ahead.",
    },
  },
  {
    code: "€",
    title: { es: "Informes de caja", ca: "Informes de caixa", en: "Cash reports" },
    body: {
      es: "Estancias y electricidad cuadradas en cada cierre. Informes de caja listos para revisar o pasar a tu asesoría.",
      ca: "Estades i electricitat quadrades en cada tancament. Informes de caixa preparats per a revisar o passar a la teua assessoria.",
      en: "Stays and electricity reconciled at every cash-up. Cash reports ready to review or send to your accountant.",
    },
  },
];

const steps: (Item & { n: string })[] = [
  {
    n: "01",
    title: { es: "Llega el cliente", ca: "Arriba el client", en: "The guest arrives" },
    body: {
      es: "Check-in rápido, con su ficha creada o recuperada de visitas anteriores.",
      ca: "Check-in ràpid, amb la seua fitxa creada o recuperada de visites anteriors.",
      en: "Quick check-in, with their record created or retrieved from previous visits.",
    },
  },
  {
    n: "02",
    title: { es: "Parcela y suministro", ca: "Parcel·la i subministrament", en: "Pitch and supply" },
    body: {
      es: "Asignas la parcela y el suministro eléctrico queda vinculado a su estancia.",
      ca: "Assignes la parcel·la i el subministrament elèctric queda vinculat a la seua estada.",
      en: "You assign the pitch and the electricity supply is linked to their stay.",
    },
  },
  {
    n: "03",
    title: { es: "Consumo bajo control", ca: "Consum sota control", en: "Consumption under control" },
    body: {
      es: "Tickets de electricidad y consumo por parcela, visibles en tiempo real en el panel.",
      ca: "Tiquets d'electricitat i consum per parcel·la, visibles en temps real en el panell.",
      en: "Electricity tickets and consumption per pitch, visible in real time on the dashboard.",
    },
  },
  {
    n: "04",
    title: { es: "Salida y caja", ca: "Eixida i caixa", en: "Check-out and cash-up" },
    body: {
      es: "Cobro sin sorpresas y cierre de caja con estancias y electricidad cuadradas.",
      ca: "Cobrament sense sorpreses i tancament de caixa amb estades i electricitat quadrades.",
      en: "Payment with no surprises and a cash-up with stays and electricity reconciled.",
    },
  },
];

const wins: Item[] = [
  {
    title: { es: "Adiós a libretas y hojas de cálculo", ca: "Adeu a llibretes i fulls de càlcul", en: "Goodbye notebooks and spreadsheets" },
    body: {
      es: "Toda la operativa de recepción en un único programa.",
      ca: "Tota l'operativa de recepció en un únic programa.",
      en: "All your reception operations in a single programme.",
    },
  },
  {
    title: { es: "Cobras toda la luz que se consume", ca: "Cobres tota la llum que es consumix", en: "You bill every kWh that's used" },
    body: {
      es: "Cada kWh queda asociado a una parcela y a un cliente.",
      ca: "Cada kWh queda associat a una parcel·la i a un client.",
      en: "Every kWh is linked to a pitch and a guest.",
    },
  },
  {
    title: { es: "Menos discusiones en recepción", ca: "Menys discussions en recepció", en: "Fewer arguments at reception" },
    body: {
      es: "Consumos y tickets claros, que el cliente también entiende.",
      ca: "Consums i tiquets clars, que el client també entén.",
      en: "Clear consumption figures and tickets that guests understand too.",
    },
  },
  {
    title: { es: "Decisiones con datos", ca: "Decisions amb dades", en: "Data-driven decisions" },
    body: {
      es: "Consumos y caja a la vista para planificar cada temporada.",
      ca: "Consums i caixa a la vista per a planificar cada temporada.",
      en: "Consumption and cash in plain sight to plan every season.",
    },
  },
];
// Icono de cada función (por su código). "clock" se dibuja aquí: no existe en el juego común.
const featureIcons: Record<string, string> = { IN: "pin", CL: "crm", kW: "bolt", TK: "pos", HR: "clock", GR: "chart", "€": "accounting" };
const winIcons = ["spark", "bolt", "crm", "chart"] as const;

export default async function CampingSoftwarePage() {
  const t = await getT();
  return (
    <>
      <header className="relative overflow-hidden bg-surface-dark pt-20 text-white sm:pt-24">
        <HeroBackdrop />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-6 sm:pb-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <div className="hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>
              <Breadcrumbs path="/software/control-electrico-camping" align="left" className="mb-6" />
            </div>
            <div className="hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
              <div className="eyebrow eyebrow-dark">
                <span className="dot" aria-hidden />
                {t("Software propio · Campings", "Programari propi · Càmpings", "Our own software · Campsites")}
              </div>
            </div>
            <SplitText
              as="h1"
              trigger="load"
              delay={160}
              text={t<Segment[]>(
                ["Cada parcela, cada kWh,", { text: "bajo control.", className: "text-shine" }],
                ["Cada parcel·la, cada kWh,", { text: "sota control.", className: "text-shine" }],
                ["Every pitch, every kWh,", { text: "under control.", className: "text-shine" }],
              )}
              className="mt-6 mb-6 text-[36px] leading-[1.05] text-white sm:text-[50px] lg:text-[54px]"
            />
            <p
              className="hero-in mb-9 max-w-[48ch] text-[16px] leading-relaxed text-mist-soft sm:text-[17.5px]"
              style={{ "--d": "480ms" } as React.CSSProperties}
            >
              {t(
                "El software de gestión para campings que une recepción, clientes, electricidad y caja en un solo panel. Sin libretas, sin hojas de cálculo y sin luz sin cobrar.",
                "El programari de gestió per a càmpings que unix recepció, clients, electricitat i caixa en un sol panell. Sense llibretes, sense fulls de càlcul i sense llum per cobrar.",
                "The campsite management software that brings reception, guests, electricity and cash together in a single dashboard. No notebooks, no spreadsheets and no unbilled electricity.",
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

          {/* Vídeo del producto dentro de un marco con halo de luz */}
          <div className="hero-in relative min-w-0" style={{ "--d": "320ms" } as React.CSSProperties}>
            <div
              className="pointer-events-none absolute -inset-6 rounded-[40px] opacity-80 blur-3xl sm:-inset-10"
              style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(61,143,224,.45), rgba(42,107,165,.12) 55%, transparent 75%)" }}
              aria-hidden
            />
            <div className="relative">
              <CampingAppVideo />
            </div>
            <span
              className="glass float pointer-events-none absolute -top-4 right-4 hidden items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur-md sm:flex"
              style={{ "--fd": "0.4s" } as React.CSSProperties}
              aria-hidden
            >
              <Icon name="bolt" className="h-3.5 w-3.5 text-[#f5c542]" />
              12,4 kWh
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
            title={t("Todo lo que pasa en tu camping, en un solo panel", "Tot el que passa en el teu càmping, en un sol panell", "Everything happening at your campsite, in a single dashboard")}
            body={t(
              "Un CRM pensado para la recepción de un camping, no un programa genérico adaptado a la fuerza.",
              "Un CRM pensat per a la recepció d'un càmping, no un programa genèric adaptat a la força.",
              "A CRM designed for campsite reception, not generic software forced to fit.",
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal key={feature.code} className="h-full" delay={(index % 4) * 0.08}>
                <TiltCard className="card-light group h-full p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="icon-tile transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                      <FeatureIcon name={featureIcons[feature.code]} />
                    </span>
                    <span className="font-mono text-[12px] text-ink-faint" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-[17px] text-ink">{t(feature.title)}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{t(feature.body)}</p>
                </TiltCard>
              </Reveal>
            ))}
            {/* Octava casilla: mapa de parcelas que se encienden (decorativo) */}
            <Reveal className="h-full" delay={0.24} direction="scale">
              <div
                className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-brand bg-surface-dark p-6 shadow-[0_30px_60px_-34px_rgba(11,18,32,.6)]"
                aria-hidden
              >
                <div className="stars pointer-events-none absolute inset-0" />
                <div
                  className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(61,143,224,.5), transparent 70%)" }}
                />
                <div className="relative grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <span
                      key={i}
                      className={`aspect-square rounded-md border ${
                        [0, 2, 3, 6, 8, 11, 12, 14].includes(i)
                          ? "animate-pulse border-accent/50 bg-accent/30 shadow-[0_0_14px_-4px_rgba(90,169,230,.9)]"
                          : i === 9
                            ? "border-[#f5b14c]/50 bg-[#f5b14c]/25"
                            : "border-white/10 bg-white/[0.04]"
                      }`}
                      style={{ animationDelay: `${(i % 5) * 0.35}s`, animationDuration: "2.8s" }}
                    />
                  ))}
                </div>
                <div className="relative mt-5 flex items-end justify-between gap-3">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-mist-soft">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_#5aa9e6]" />
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-white">
                    <Icon name="bolt" className="h-3.5 w-3.5 text-[#f5c542]" />
                    12,4 kWh
                  </span>
                </div>
              </div>
            </Reveal>
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
            title={t("De la llegada al cierre de caja, sin perder un kWh", "De l'arribada al tancament de caixa, sense perdre ni un kWh", "From arrival to cash-up, without losing a single kWh")}
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
            {/* Gráfico de consumo que crece al entrar (decorativo) */}
            <Reveal direction="scale" delay={0.15}>
              <div data-observe className="card-light relative overflow-hidden p-5 sm:p-6" aria-hidden>
                <div className="mb-4 flex items-center justify-between font-mono text-[11px] text-ink-faint">
                  <span className="flex items-center gap-1.5">
                    <Icon name="bolt" className="h-3.5 w-3.5 text-[#d6a514]" />
                    kWh
                  </span>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_#5aa9e6]" />
                </div>
                <div className="flex h-32 items-end gap-[4%] sm:h-36">
                  {[42, 58, 50, 66, 61, 78, 72, 92].map((h, i) => (
                    <span
                      key={i}
                      className="grow-bar flex-1 rounded-t-md bg-gradient-to-t from-primary/25 to-accent"
                      style={{ height: `${h}%`, "--bd": `${0.1 + i * 0.07}s` } as React.CSSProperties}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wins.map((win, index) => (
              <Reveal key={win.title.es} className="h-full" delay={0.1 + index * 0.1}>
                <TiltCard className="card-light h-full p-6">
                  <span className="icon-tile mb-5 h-11 w-11" aria-hidden>
                    <Icon name={winIcons[index % winIcons.length]} className="h-5 w-5" />
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
        title={t("¿Lo vemos funcionando en tu camping?", "El veiem funcionant en el teu càmping?", "Shall we see it working at your campsite?")}
        body={t(
          "Te enseñamos el software con una demo adaptada a tus parcelas y a tu forma de trabajar.",
          "T'ensenyem el programari amb una demo adaptada a les teues parcel·les i a la teua manera de treballar.",
          "We'll show you the software with a demo tailored to your pitches and the way you work.",
        )}
        ctaLabel={t("Solicitar una demo", "Sol·licitar una demo", "Request a demo")}
      />
    </>
  );
}

function FeatureIcon({ name }: { name: string }) {
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    );
  }
  return <Icon name={name} className="h-5 w-5" />;
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
              <span
                className="relative z-10 mb-5 grid h-11 w-11 place-items-center rounded-full border border-accent/50 bg-surface-dark font-mono text-[13px] font-medium text-ice shadow-[0_0_30px_-4px_rgba(61,143,224,.8)] lg:mx-auto"
              >
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
