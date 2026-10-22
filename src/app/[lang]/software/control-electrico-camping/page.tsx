import type { Metadata } from "next";
import Link from "@/components/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import IndexMark from "@/components/index-mark";
import CampingAppVideo from "@/components/software/camping-app-video";
import { getT, pageMetadata } from "@/lib/i18n-server";
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

export default async function CampingSoftwarePage() {
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
          style={{ background: "radial-gradient(circle, rgba(90,169,230,.35), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 sm:pb-24 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hero-in">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {t("Software propio · Campings", "Programari propi · Càmpings", "Our own software · Campsites")}
            </div>
            <h1 className="mt-5 mb-5.5 text-[36px] leading-[1.12] text-white sm:text-[46px]">
              {t(
                <>
                  Cada parcela, cada kWh, <em className="text-accent not-italic">bajo control.</em>
                </>,
                <>
                  Cada parcel·la, cada kWh, <em className="text-accent not-italic">sota control.</em>
                </>,
                <>
                  Every pitch, every kWh, <em className="text-accent not-italic">under control.</em>
                </>,
              )}
            </h1>
            <p className="mb-8 max-w-[48ch] text-base leading-relaxed text-mist-soft sm:text-[17px]">
              {t(
                "El software de gestión para campings que une recepción, clientes, electricidad y caja en un solo panel. Sin libretas, sin hojas de cálculo y sin luz sin cobrar.",
                "El programari de gestió per a càmpings que unix recepció, clients, electricitat i caixa en un sol panell. Sense llibretes, sense fulls de càlcul i sense llum per cobrar.",
                "The campsite management software that brings reception, guests, electricity and cash together in a single dashboard. No notebooks, no spreadsheets and no unbilled electricity.",
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
          <div className="hero-in" style={{ animationDelay: "120ms" }}>
            <CampingAppVideo />
          </div>
        </div>
      </header>

      <section id="funciones" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Funciones", "Funcions", "Features")}
            title={t("Todo lo que pasa en tu camping, en un solo panel", "Tot el que passa en el teu càmping, en un sol panell", "Everything happening at your campsite, in a single dashboard")}
            body={t(
              "Un CRM pensado para la recepción de un camping, no un programa genérico adaptado a la fuerza.",
              "Un CRM pensat per a la recepció d'un càmping, no un programa genèric adaptat a la força.",
              "A CRM designed for campsite reception, not generic software forced to fit.",
            )}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal
                key={feature.code}
                className={`h-full ${index === features.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
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
            title={t("De la llegada al cierre de caja, sin perder un kWh", "De l'arribada al tancament de caixa, sense perdre ni un kWh", "From arrival to cash-up, without losing a single kWh")}
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
