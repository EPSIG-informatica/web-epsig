import type { Metadata } from "next";
import Link from "@/components/link";
import Breadcrumbs from "@/components/breadcrumbs";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import SplitText, { type Segment } from "@/components/split-text";
import Icon from "@/components/icons";
import CtaBand from "@/components/sections/cta-band";
import ConnectorFlow from "@/components/software/connector-flow";
import { connectors } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";
import HeroBackdrop from "@/components/hero-backdrop";
import type { Localized } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/software/conectores", {
    title: t("Conectores Forvenues, Ágora, Sage y FACe", "Connectors Forvenues, Ágora, Sage i FACe", "Forvenues, Ágora, Sage and FACe Connectors"),
    description: t(
      "Conectores de software que integran Forvenues con Ágora, Ágora con Sage cada día y Sage con FACe: de la venta de una entrada a la contabilidad y la factura electrónica, sin teclear dos veces.",
      "Connectors de programari que integren Forvenues amb Ágora, Ágora amb Sage cada dia i Sage amb FACe: de la venda d'una entrada a la comptabilitat i la factura electrònica, sense teclejar dues vegades.",
      "Connectors linking Forvenues to Ágora, Ágora to Sage daily and Sage to FACe: from ticket sale to accounting and e-invoice, with no double entry.",
    ),
  });
}

const wins: { title: Localized; body: Localized }[] = [
  {
    title: { es: "Cero doble tecleo", ca: "Zero doble teclejat", en: "Zero double entry" },
    body: {
      es: "Cada venta se registra una sola vez y viaja sola al siguiente programa.",
      ca: "Cada venda es registra una sola vegada i viatja sola al programa següent.",
      en: "Every sale is recorded just once and travels on its own to the next system.",
    },
  },
  {
    title: { es: "Menos errores", ca: "Menys errors", en: "Fewer errors" },
    body: {
      es: "Sin copiar y pegar, desaparecen los descuadres y las cifras mal transcritas.",
      ca: "Sense copiar i apegar, desapareixen els desquadraments i les xifres mal transcrites.",
      en: "With no copying and pasting, mismatches and mistyped figures disappear.",
    },
  },
  {
    title: { es: "Datos siempre al día", ca: "Dades sempre al dia", en: "Data always up to date" },
    body: {
      es: "Contabilidad y ventas actualizadas para decidir con información real.",
      ca: "Comptabilitat i vendes actualitzades per a decidir amb informació real.",
      en: "Up-to-date accounting and sales so you can decide with real information.",
    },
  },
  {
    title: { es: "Horas libres para tu equipo", ca: "Hores lliures per al teu equip", en: "Time freed up for your team" },
    body: {
      es: "El tiempo que se iba en exportar y cuadrar, dedicado a tu negocio.",
      ca: "El temps que se n'anava a exportar i quadrar, dedicat al teu negoci.",
      en: "The time once spent exporting and reconciling, now devoted to your business.",
    },
  },
];

const faqs: { q: Localized; a: Localized }[] = [
  {
    q: { es: "¿Tengo que cambiar los programas que ya uso?", ca: "He de canviar els programes que ja utilitze?", en: "Do I have to change the software I already use?" },
    a: {
      es: "No. Los conectores trabajan con tu Forvenues, tu Ágora y tu Sage tal como los tienes: simplemente hacen que se hablen entre ellos.",
      ca: "No. Els connectors treballen amb el teu Forvenues, el teu Ágora i el teu Sage tal com els tens: simplement fan que es parlen entre ells.",
      en: "No. The connectors work with your Forvenues, Ágora and Sage exactly as they are: they simply get them talking to each other.",
    },
  },
  {
    q: { es: "¿Puedo contratar solo uno de los conectores?", ca: "Puc contractar només un dels connectors?", en: "Can I sign up for just one of the connectors?" },
    a: {
      es: "Sí. Cada conector funciona por separado y, si lo necesitas, se combinan para cubrir el recorrido completo, desde la venta de la entrada hasta la contabilidad y la factura electrónica.",
      ca: "Sí. Cada connector funciona per separat i, si ho necessites, es combinen per a cobrir el recorregut complet, des de la venda de l'entrada fins a la comptabilitat i la factura electrònica.",
      en: "Yes. Each connector works on its own and, if you need it, they combine to cover the full journey, from the ticket sale through to accounting and the e-invoice.",
    },
  },
  {
    q: { es: "¿Cada cuánto se sincronizan los datos?", ca: "Cada quant de temps se sincronitzen les dades?", en: "How often is the data synchronised?" },
    a: {
      es: "El conector Ágora → Sage envía las ventas a contabilidad cada día. En el resto te proponemos la frecuencia que mejor encaje con tu forma de trabajar.",
      ca: "El connector Ágora → Sage envia les vendes a comptabilitat cada dia. En la resta et proposem la freqüència que millor encaixe amb la teua manera de treballar.",
      en: "The Ágora → Sage connector sends sales to accounting every day. For the others, we'll suggest the frequency that best fits the way you work.",
    },
  },
  {
    q: { es: "¿Quién se encarga de ponerlo en marcha?", ca: "Qui s'encarrega de posar-ho en marxa?", en: "Who takes care of setting it up?" },
    a: {
      es: "Nosotros. Analizamos cómo trabajas, configuramos los conectores y te acompañamos hasta que todo funciona solo.",
      ca: "Nosaltres. Analitzem com treballes, configurem els connectors i t'acompanyem fins que tot funciona sol.",
      en: "We do. We analyse how you work, configure the connectors and support you until everything runs on its own.",
    },
  },
];

const winIcons = ["link", "shield", "chart", "spark"] as const;

export default async function ConectoresPage() {
  const t = await getT();
  return (
    <>
      <header className="relative overflow-hidden bg-surface-dark pt-20 pb-20 text-white sm:pt-24 sm:pb-28">
        <HeroBackdrop glow="center" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>
              <Breadcrumbs path="/software/conectores" className="mb-6" />
            </div>
            <div className="hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
              <div className="eyebrow eyebrow-dark">
                <span className="dot" aria-hidden />
                {t("Software propio · Conectores", "Programari propi · Connectors", "Our own software · Connectors")}
              </div>
            </div>
            <SplitText
              as="h1"
              trigger="load"
              delay={160}
              text={t<Segment[]>(
                ["Tus programas, trabajando juntos.", { text: "Tú, a lo tuyo.", className: "text-shine" }],
                ["Els teus programes, treballant junts.", { text: "Tu, a la teua.", className: "text-shine" }],
                ["Your software, working together.", { text: "You, getting on with business.", className: "text-shine" }],
              )}
              className="mt-6 text-[34px] leading-[1.06] text-white sm:text-[50px] lg:text-[56px]"
            />
            <p
              className="hero-in mx-auto mt-6 max-w-[56ch] text-[16px] leading-relaxed text-mist-soft sm:text-[17.5px]"
              style={{ "--d": "480ms" } as React.CSSProperties}
            >
              {t(
                "Conectamos Forvenues, Ágora, Sage y FACe para que cada venta viaje sola hasta tu contabilidad y tu factura electrónica. Sin exportar, sin copiar y sin errores.",
                "Connectem Forvenues, Ágora, Sage i FACe perquè cada venda viatge sola fins a la teua comptabilitat i la teua factura electrònica. Sense exportar, sense copiar i sense errors.",
                "We connect Forvenues, Ágora, Sage and FACe so every sale flows on its own into your accounting and your e-invoices. No exporting, no copying and no errors.",
              )}
            </p>
          </div>

          <div className="mt-14 sm:mt-16">
            <ConnectorFlow />
            <p
              className="hero-in mx-auto mt-8 max-w-[70ch] text-center text-[13.5px] leading-relaxed text-mist-soft"
              style={{ "--d": "1100ms" } as React.CSSProperties}
            >
              {t(
                <>
                  <strong className="font-semibold text-white">Del ticket vendido al asiento contable:</strong>{" "}
                  alguien compra una entrada en Forvenues y acaba reflejada en Sage a través de Ágora.
                </>,
                <>
                  <strong className="font-semibold text-white">Del tiquet venut a l&apos;assentament comptable:</strong>{" "}
                  algú compra una entrada en Forvenues i acaba reflectida en Sage a través d&apos;Ágora.
                </>,
                <>
                  <strong className="font-semibold text-white">From ticket sold to accounting entry:</strong>{" "}
                  someone buys a ticket on Forvenues and it ends up recorded in Sage via Ágora.
                </>,
              )}
            </p>
          </div>
        </div>
      </header>

      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
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
            eyebrow={t("Los conectores", "Els connectors", "The connectors")}
            title={t("Tres conectores, un recorrido completo", "Tres connectors, un recorregut complet", "Three connectors, one complete journey")}
            body={t(
              "Úsalos por separado o encadénalos: tú decides hasta dónde llega la automatización.",
              "Utilitza'ls per separat o encadena'ls: tu decidixes fins on arriba l'automatització.",
              "Use them individually or chain them together: you decide how far the automation goes.",
            )}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {connectors.map((connector, index) => (
              <Reveal
                key={connector.id}
                className={`h-full ${index === connectors.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}`}
                delay={index * 0.12}
              >
                <TiltCard className="card-light flex h-full flex-col overflow-hidden p-2">
                  {/* Cabecera con la conexión animada */}
                  <div className="relative overflow-hidden rounded-[16px] bg-surface-dark px-4 py-6 sm:px-5">
                    <div className="stars pointer-events-none absolute inset-0" aria-hidden />
                    <div
                      className="pointer-events-none absolute -top-16 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(61,143,224,.45), transparent 70%)" }}
                      aria-hidden
                    />
                    <div
                      id={connector.id}
                      className="relative flex scroll-mt-24 items-center gap-2 font-mono text-[12px] font-semibold sm:text-[12.5px]"
                    >
                      <span className="shrink-0 rounded-lg border border-white/15 bg-white/[0.07] px-2.5 py-1.5 text-white">
                        {connector.from}
                      </span>
                      <span className="relative h-3 min-w-6 flex-1" aria-hidden>
                        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none" fill="none">
                          <path d="M0,1 L100,1" stroke="rgba(140,195,239,.25)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                          <path
                            d="M0,1 L100,1"
                            pathLength={100}
                            stroke="#b5dcfb"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            className="trace-pulse"
                            style={{ "--td": `${index * 0.7}s`, strokeDasharray: "26 74", filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                          />
                        </svg>
                        <span className="absolute top-1/2 right-0 h-2 w-2 -translate-y-1/2 rotate-45 border-t-[1.5px] border-r-[1.5px] border-ice" />
                      </span>
                      <span className="sr-only">{t("conectado con", "connectat amb", "connected to")}</span>
                      <span className="shrink-0 rounded-lg border border-accent/40 bg-accent/15 px-2.5 py-1.5 text-ice shadow-[0_0_20px_-6px_rgba(90,169,230,.8)]">
                        {connector.to}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-6 sm:p-6">
                    <span className="font-mono text-[12px] text-primary" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 text-[19px] text-ink sm:text-[20px]">{t(connector.title)}</h3>
                    <p className="mt-1 text-[14px] font-semibold text-primary">{t(connector.tagline)}</p>
                    <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-soft">{t(connector.body)}</p>
                    <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
                      {connector.points.map((point) => (
                        <li key={point.es} className="flex items-start gap-2.5 text-[14px] text-ink">
                          <CheckDot />
                          {t(point)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div
          className="blob-drift pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(42,107,165,.35), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal direction="none">
              <div className="eyebrow eyebrow-dark">
                <span className="dot" aria-hidden />
                {t("Conexión completa", "Connexió completa", "End-to-end connection")}
              </div>
            </Reveal>
            <SplitText
              delay={120}
              text={t(
                "Vende una entrada. Aparece en tu contabilidad. Nadie ha tocado un teclado.",
                "Ven una entrada. Apareix en la teua comptabilitat. Ningú no ha tocat un teclat.",
                "Sell a ticket. It appears in your accounts. Nobody has touched a keyboard.",
              )}
              className="mt-5 text-[30px] leading-[1.08] text-white sm:text-[40px]"
            />
            <Reveal delay={0.25}>
              <p className="mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-mist-soft sm:text-[16.5px]">
                {t(
                  "Encadenando los conectores, la venta de una entrada en Forvenues pasa a Ágora como venta de tu TPV y, de ahí, llega a Sage cada día. Si además facturas a la Administración, la factura sale de Sage hacia FACe. Un solo registro, de principio a fin.",
                  "Encadenant els connectors, la venda d'una entrada en Forvenues passa a Ágora com a venda del teu TPV i, d'allí, arriba a Sage cada dia. Si a més factures a l'Administració, la factura ix de Sage cap a FACe. Un sol registre, de principi a fi.",
                  "With the connectors chained together, a ticket sale in Forvenues passes to Ágora as a sale on your POS and, from there, reaches Sage every day. And if you invoice public authorities, the invoice goes from Sage to FACe. A single record, from start to finish.",
                )}
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <Link href="/contacto#diagnostico" data-magnetic className="btn btn-primary mt-8">
                {t("Quiero automatizarlo", "Vull automatitzar-ho", "I want to automate it")}
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wins.map((win, index) => (
              <Reveal key={win.title.es} className="h-full" delay={0.1 + index * 0.1} direction="scale">
                <div className="glass card-spotlight h-full rounded-panel p-6">
                  <span className="icon-tile-dark mb-5 h-11 w-11" aria-hidden>
                    <Icon name={winIcons[index % winIcons.length]} className="h-5 w-5" />
                  </span>
                  <h3 className="text-[16.5px] text-white">{t(win.title)}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-mist-soft">{t(win.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tint py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <SectionHeading
            eyebrow={t("Preguntas frecuentes", "Preguntes freqüents", "Frequently asked questions")}
            title={t("Lo que suelen preguntarnos", "El que solen preguntar-nos", "What people usually ask us")}
          />
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q.es} delay={index * 0.08}>
                <details className="group rounded-brand border border-line bg-white shadow-[0_18px_40px_-34px_rgba(11,18,32,.35)] transition-[border-color,box-shadow] duration-300 open:border-accent/40 open:shadow-[0_24px_50px_-30px_rgba(42,107,165,.45)] hover:border-primary-light/60">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[15.5px] font-semibold text-ink sm:p-6 sm:text-[16.5px] [&::-webkit-details-marker]:hidden">
                    {t(faq.q)}
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-surface-alt text-primary transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-180 group-open:border-transparent group-open:bg-accent-strong group-open:text-white"
                      aria-hidden
                    >
                      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-ink-soft sm:px-6 sm:pb-6 sm:text-[15px]">{t(faq.a)}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t("¿Qué programas usas hoy?", "Quins programes utilitzes hui?", "Which software do you use today?")}
        body={t(
          "Cuéntanoslo y te decimos cómo conectarlos para que dejes de teclear las cosas dos veces.",
          "Conta-nos-ho i et diem com connectar-los perquè deixes de teclejar les coses dues vegades.",
          "Tell us and we'll show you how to connect them so you stop keying things in twice.",
        )}
        ctaLabel={t("Hablar con nosotros", "Parlar amb nosaltres", "Talk to us")}
      />
    </>
  );
}

function CheckDot() {
  return (
    <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-accent-strong text-white shadow-[0_4px_10px_-4px_rgba(42,107,165,.8)]" aria-hidden>
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.2l2.2 2.2 4.8-4.8" />
      </svg>
    </span>
  );
}
