import type { Metadata } from "next";
import Link from "@/components/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import ConnectorFlow from "@/components/software/connector-flow";
import { connectors } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";
import type { Localized } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/software/conectores", {
    title: t("Conectores Forvenues, Ágora, Sage y FACe", "Connectors Forvenues, Ágora, Sage i FACe"),
    description: t(
      "Conectores de software que integran Forvenues con Ágora, Ágora con Sage cada día y Sage con FACe: de la venta de una entrada a la contabilidad y la factura electrónica, sin teclear dos veces.",
      "Connectors de programari que integren Forvenues amb Ágora, Ágora amb Sage cada dia i Sage amb FACe: de la venda d'una entrada a la comptabilitat i la factura electrònica, sense teclejar dues vegades.",
    ),
  });
}

const wins: { title: Localized; body: Localized }[] = [
  {
    title: { es: "Cero doble tecleo", ca: "Zero doble teclejat" },
    body: {
      es: "Cada venta se registra una sola vez y viaja sola al siguiente programa.",
      ca: "Cada venda es registra una sola vegada i viatja sola al programa següent.",
    },
  },
  {
    title: { es: "Menos errores", ca: "Menys errors" },
    body: {
      es: "Sin copiar y pegar, desaparecen los descuadres y las cifras mal transcritas.",
      ca: "Sense copiar i apegar, desapareixen els desquadraments i les xifres mal transcrites.",
    },
  },
  {
    title: { es: "Datos siempre al día", ca: "Dades sempre al dia" },
    body: {
      es: "Contabilidad y ventas actualizadas para decidir con información real.",
      ca: "Comptabilitat i vendes actualitzades per a decidir amb informació real.",
    },
  },
  {
    title: { es: "Horas libres para tu equipo", ca: "Hores lliures per al teu equip" },
    body: {
      es: "El tiempo que se iba en exportar y cuadrar, dedicado a tu negocio.",
      ca: "El temps que se n'anava a exportar i quadrar, dedicat al teu negoci.",
    },
  },
];

const faqs: { q: Localized; a: Localized }[] = [
  {
    q: { es: "¿Tengo que cambiar los programas que ya uso?", ca: "He de canviar els programes que ja utilitze?" },
    a: {
      es: "No. Los conectores trabajan con tu Forvenues, tu Ágora y tu Sage tal como los tienes: simplemente hacen que se hablen entre ellos.",
      ca: "No. Els connectors treballen amb el teu Forvenues, el teu Ágora i el teu Sage tal com els tens: simplement fan que es parlen entre ells.",
    },
  },
  {
    q: { es: "¿Puedo contratar solo uno de los conectores?", ca: "Puc contractar només un dels connectors?" },
    a: {
      es: "Sí. Cada conector funciona por separado y, si lo necesitas, se combinan para cubrir el recorrido completo, desde la venta de la entrada hasta la contabilidad y la factura electrónica.",
      ca: "Sí. Cada connector funciona per separat i, si ho necessites, es combinen per a cobrir el recorregut complet, des de la venda de l'entrada fins a la comptabilitat i la factura electrònica.",
    },
  },
  {
    q: { es: "¿Cada cuánto se sincronizan los datos?", ca: "Cada quant de temps se sincronitzen les dades?" },
    a: {
      es: "El conector Ágora → Sage envía las ventas a contabilidad cada día. En el resto te proponemos la frecuencia que mejor encaje con tu forma de trabajar.",
      ca: "El connector Ágora → Sage envia les vendes a comptabilitat cada dia. En la resta et proposem la freqüència que millor encaixe amb la teua manera de treballar.",
    },
  },
  {
    q: { es: "¿Quién se encarga de ponerlo en marcha?", ca: "Qui s'encarrega de posar-ho en marxa?" },
    a: {
      es: "Nosotros. Analizamos cómo trabajas, configuramos los conectores y te acompañamos hasta que todo funciona solo.",
      ca: "Nosaltres. Analitzem com treballes, configurem els connectors i t'acompanyem fins que tot funciona sol.",
    },
  },
];

export default async function ConectoresPage() {
  const t = await getT();
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
              {t("Software propio · Conectores", "Programari propi · Connectors")}
            </div>
            <h1 className="mt-5 text-[36px] leading-[1.12] text-white sm:text-[46px]">
              {t(
                <>
                  Tus programas, trabajando juntos.{" "}
                  <em className="text-accent not-italic">Tú, a lo tuyo.</em>
                </>,
                <>
                  Els teus programes, treballant junts.{" "}
                  <em className="text-accent not-italic">Tu, a la teua.</em>
                </>,
              )}
            </h1>
            <p className="mx-auto mt-5 max-w-[56ch] text-base leading-relaxed text-mist-soft sm:text-[17px]">
              {t(
                "Conectamos Forvenues, Ágora, Sage y FACe para que cada venta viaje sola hasta tu contabilidad y tu factura electrónica. Sin exportar, sin copiar y sin errores.",
                "Connectem Forvenues, Ágora, Sage i FACe perquè cada venda viatge sola fins a la teua comptabilitat i la teua factura electrònica. Sense exportar, sense copiar i sense errors.",
              )}
            </p>
          </div>

          <div className="hero-in mt-14" style={{ animationDelay: "120ms" }}>
            <ConnectorFlow />
            <p className="mt-6 text-center text-[13.5px] text-mist-soft">
              {t(
                <>
                  <strong className="font-semibold text-white">Del ticket vendido al asiento contable:</strong>{" "}
                  alguien compra una entrada en Forvenues y acaba reflejada en Sage a través de Ágora.
                </>,
                <>
                  <strong className="font-semibold text-white">Del tiquet venut a l&apos;assentament comptable:</strong>{" "}
                  algú compra una entrada en Forvenues i acaba reflectida en Sage a través d&apos;Ágora.
                </>,
              )}
            </p>
          </div>
        </div>
      </header>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Los conectores", "Els connectors")}
            title={t("Tres conectores, un recorrido completo", "Tres connectors, un recorregut complet")}
            body={t(
              "Úsalos por separado o encadénalos: tú decides hasta dónde llega la automatización.",
              "Utilitza'ls per separat o encadena'ls: tu decidixes fins on arriba l'automatització.",
            )}
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
                    <span className="sr-only">{t("conectado con", "connectat amb")}</span>
                    <span className="rounded-md bg-surface-alt px-2 py-1 text-ink">{connector.to}</span>
                  </div>
                  <h3 className="text-[19px]">{t(connector.title)}</h3>
                  <p className="mt-1 text-[14px] font-semibold text-primary">{t(connector.tagline)}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{t(connector.body)}</p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                    {connector.points.map((point) => (
                      <li key={point.es} className="flex items-start gap-2.5 text-[14px] text-ink">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" aria-hidden />
                        {t(point)}
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
              {t("Conexión completa", "Connexió completa")}
            </div>
            <h2 className="mt-3 text-[30px] leading-tight text-ink">
              {t(
                "Vende una entrada. Aparece en tu contabilidad. Nadie ha tocado un teclado.",
                "Ven una entrada. Apareix en la teua comptabilitat. Ningú no ha tocat un teclat.",
              )}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              {t(
                "Encadenando los conectores, la venta de una entrada en Forvenues pasa a Ágora como venta de tu TPV y, de ahí, llega a Sage cada día. Si además facturas a la Administración, la factura sale de Sage hacia FACe. Un solo registro, de principio a fin.",
                "Encadenant els connectors, la venda d'una entrada en Forvenues passa a Ágora com a venda del teu TPV i, d'allí, arriba a Sage cada dia. Si a més factures a l'Administració, la factura ix de Sage cap a FACe. Un sol registre, de principi a fi.",
              )}
            </p>
            <Link
              href="/contacto#diagnostico"
              className="mt-7 inline-block rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition hover:scale-[1.03] hover:bg-primary active:scale-[0.97]"
            >
              {t("Quiero automatizarlo", "Vull automatitzar-ho")}
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {wins.map((win) => (
              <Reveal key={win.title.es} className="h-full">
                <div className="h-full rounded-brand border border-line bg-surface p-5">
                  <span
                    className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent-strong text-sm font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <h3 className="text-[16px] text-ink">{t(win.title)}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">{t(win.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow={t("Preguntas frecuentes", "Preguntes freqüents")}
            title={t("Lo que suelen preguntarnos", "El que solen preguntar-nos")}
          />
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q.es}
                className="group rounded-brand border border-line bg-surface p-5 open:bg-surface-alt"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {t(faq.q)}
                  <span className="text-xl leading-none text-primary transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{t(faq.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t("¿Qué programas usas hoy?", "Quins programes utilitzes hui?")}
        body={t(
          "Cuéntanoslo y te decimos cómo conectarlos para que dejes de teclear las cosas dos veces.",
          "Conta-nos-ho i et diem com connectar-los perquè deixes de teclejar les coses dues vegades.",
        )}
        ctaLabel={t("Hablar con nosotros", "Parlar amb nosaltres")}
      />
    </>
  );
}
