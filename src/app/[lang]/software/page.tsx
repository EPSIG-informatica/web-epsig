import type { Metadata } from "next";
import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import CtaBand from "@/components/sections/cta-band";
import { connectors, software } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/software", {
    title: "Software",
    description: t(
      "Software propio de EPSIG: gestión y control eléctrico para campings, gestión de viviendas tuteladas y conectores que integran Forvenues, Ágora, Sage y FACe.",
      "Programari propi d'EPSIG: gestió i control elèctric per a càmpings, gestió d'habitatges tutelats i connectors que integren Forvenues, Ágora, Sage i FACe.",
    ),
  });
}

export default async function SoftwarePage() {
  const t = await getT();
  const viviendasFolders = [
    t("1. Vivienda", "1. Habitatge"),
    t("2. Residentes", "2. Residents"),
    t("7. Protocolo VT", "7. Protocol VT"),
  ];
  return (
    <>
      <PageHero
        eyebrow={t("Software propio", "Programari propi")}
        title={t("Software que resuelve problemas reales", "Programari que resol problemes reals")}
        lead={t(
          "Desarrollamos herramientas para los problemas que vemos cada día en nuestros clientes: la luz que no se cobra en un camping, los certificados de una vivienda tutelada hechos a mano o las ventas que se teclean tres veces.",
          "Desenvolupem eines per als problemes que veiem cada dia en els nostres clients: la llum que no es cobra en un càmping, els certificats d'un habitatge tutelat fets a mà o les vendes que es teclegen tres vegades.",
        )}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="h-full">
            <Link
              href={software.camping.href}
              className="card-spotlight group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface transition-colors hover:border-primary-light"
            >
              <div className="relative bg-surface-dark p-7" aria-hidden>
                <div className="grid grid-cols-6 gap-1.5">
                  {["on", "on", "free", "low", "on", "on", "free", "on", "on", "low", "on", "free"].map((state, index) => (
                    <span
                      key={index}
                      className={`h-7 rounded-md border ${
                        state === "on"
                          ? "border-accent/40 bg-accent/20"
                          : state === "low"
                            ? "border-[#f5b14c]/50 bg-[#f5b14c]/20"
                            : "border-white/10 bg-white/[0.04]"
                      }`}
                    />
                  ))}
                </div>
                <span className="mt-4 block font-mono text-[11px] text-mist-soft">
                  {t("12 parcelas · 9 conectadas · caja al día", "12 parcel·les · 9 connectades · caixa al dia")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
                  {t("Campings", "Càmpings")}
                </span>
                <h2 className="mt-2 text-[24px] text-ink">{t(software.camping.title)}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {t(
                    "Un CRM para la recepción de tu camping: check-in, clientes, electricidad por parcela, tickets de luz, horarios, gráficos e informes de caja en un solo panel.",
                    "Un CRM per a la recepció del teu càmping: check-in, clients, electricitat per parcel·la, tiquets de llum, horaris, gràfics i informes de caixa en un sol panell.",
                  )}
                </p>
                <span className="mt-5 text-sm font-semibold text-primary">
                  {t("Descubrir el software →", "Descobrir el programari →")}
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal className="h-full">
            <Link
              href={software.viviendas.href}
              className="card-spotlight group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface transition-colors hover:border-primary-light"
            >
              <div className="relative bg-surface-dark p-7" aria-hidden>
                <div className="flex flex-col gap-1.5">
                  {viviendasFolders.map((folder, index) => (
                    <span
                      key={index}
                      className="flex h-7 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 font-mono text-[10.5px] text-mist"
                    >
                      <span className={`h-2.5 w-2.5 rounded-[3px] ${index === 2 ? "bg-accent" : "bg-[#d6a514]"}`} />
                      {folder}
                    </span>
                  ))}
                </div>
                <span className="mt-4 block font-mono text-[11px] text-mist-soft">
                  {t("Certificado listo · PDF generado", "Certificat preparat · PDF generat")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
                  {t("Viviendas tuteladas", "Habitatges tutelats")}
                </span>
                <h2 className="mt-2 text-[24px] text-ink">{t(software.viviendas.title)}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {t(
                    "Entidades, empresas, viviendas, residentes, planning de tareas y documentación ordenada en un solo panel, con el certificado de ingreso y coste de plaza en PDF.",
                    "Entitats, empreses, habitatges, residents, planificació de tasques i documentació ordenada en un sol panell, amb el certificat d'ingrés i cost de plaça en PDF.",
                  )}
                </p>
                <span className="mt-5 text-sm font-semibold text-primary">
                  {t("Ver el software →", "Veure el programari →")}
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal className="h-full">
            <Link
              href={software.conectores.href}
              className="card-spotlight group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface transition-colors hover:border-primary-light"
            >
              <div className="relative flex flex-wrap items-center gap-x-2 gap-y-2.5 bg-surface-dark p-7" aria-hidden>
                {["Forvenues", "Ágora", "Sage", "FACe"].map((name, index) => (
                  <span key={name} className="flex items-center gap-2">
                    <span className="rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-2 font-mono text-[11px] font-semibold text-white">
                      {name}
                    </span>
                    {index < 3 && <span className="text-accent">⟶</span>}
                  </span>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
                  {t("Integraciones", "Integracions")}
                </span>
                <h2 className="mt-2 text-[24px] text-ink">{t(software.conectores.title)}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {t(
                    `${connectors.length} conectores que llevan tus ventas de Forvenues a Ágora, de Ágora a Sage cada día y de Sage a la factura electrónica FACe. Por separado o encadenados.`,
                    `${connectors.length} connectors que porten les teues vendes de Forvenues a Ágora, d'Ágora a Sage cada dia i de Sage a la factura electrònica FACe. Per separat o encadenats.`,
                  )}
                </p>
                <span className="mt-5 text-sm font-semibold text-primary">
                  {t("Ver los conectores →", "Veure els connectors →")}
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={t("¿Tienes un problema que ningún programa resuelve?", "Tens un problema que cap programa resol?")}
        body={t(
          "Cuéntanoslo: si podemos automatizarlo o conectarlo, te proponemos cómo.",
          "Conta-nos-ho: si podem automatitzar-lo o connectar-lo, et proposem com.",
        )}
        ctaLabel={t("Hablar con nosotros", "Parlar amb nosaltres")}
      />
    </>
  );
}
