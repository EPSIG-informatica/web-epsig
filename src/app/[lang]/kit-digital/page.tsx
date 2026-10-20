import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import ProgramStatus from "@/components/program-status";
import { kitDigitalCategories, programStatus } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/kit-digital", {
    title: "Kit Digital",
    description: t(
      "Soluciones del programa Kit Digital para pymes y autónomos: web, tienda online, CRM, factura electrónica, ciberseguridad y más, con EPSIG como Agente Digitalizador Adherido.",
      "Solucions del programa Kit Digital per a pimes i autònoms: web, botiga en línia, CRM, factura electrònica, ciberseguretat i més, amb EPSIG com a Agent Digitalitzador Adherit.",
    ),
  });
}

export default async function KitDigitalPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        eyebrow={t("Agente Digitalizador Adherido", "Agent Digitalitzador Adherit")}
        title={t("Kit Digital: soluciones digitales para tu pyme", "Kit Digital: solucions digitals per a la teua pime")}
        lead={t(
          "Un programa del Gobierno de España, financiado por la Unión Europea – NextGenerationEU, para impulsar la digitalización de pymes y autónomos. Como Agente Digitalizador Adherido, implantamos todas sus soluciones.",
          "Un programa del Govern d'Espanya, finançat per la Unió Europea – NextGenerationEU, per a impulsar la digitalització de pimes i autònoms. Com a Agent Digitalitzador Adherit, implantem totes les seues solucions.",
        )}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <ProgramStatus program="Kit Digital" open={programStatus.kitDigital} />
          </div>

          <SectionHeading
            eyebrow={t("Categorías", "Categories")}
            title={t("Nuestras soluciones del catálogo Kit Digital", "Les nostres solucions del catàleg Kit Digital")}
            body={t(
              "Cada categoría resuelve una necesidad concreta de tu negocio. Te ayudamos a elegir la combinación adecuada y la implantamos de principio a fin.",
              "Cada categoria resol una necessitat concreta del teu negoci. T'ajudem a triar la combinació adequada i la implantem de principi a fi.",
            )}
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {kitDigitalCategories.map((cat, index) => (
              <Reveal key={cat.slug} className="h-full" delay={(index % 3) * 0.08}>
                <TiltCard
                  href={`/kit-digital/${cat.slug}`}
                  className="group flex h-full flex-col rounded-brand border border-line bg-surface p-6 transition-colors hover:border-primary-light"
                >
                  <h3 className="mb-2 text-[16px]">{t(cat.title)}</h3>
                  <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
                    {t(cat.summary)}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[12.5px] font-semibold text-accent-strong">
                      {t(cat.priceFrom)}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                      {t("Ver más →", "Veure'n més →")}
                    </span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-ink-soft">
            {t(
              "Precios orientativos, IVA no incluido. El importe final depende del tamaño de la empresa y de los puestos de trabajo a digitalizar.",
              "Preus orientatius, IVA no inclòs. L'import final depén de la grandària de l'empresa i dels llocs de treball que cal digitalitzar.",
            )}
          </p>
        </div>
      </section>

      <CtaBand
        title={t("¿Qué solución necesita tu negocio?", "Quina solució necessita el teu negoci?")}
        body={t(
          "Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas.",
          "T'assessorem sense compromís i t'avisem tan prompte com hi haja una nova convocatòria d'ajudes.",
        )}
        ctaLabel={t("Solicitar información", "Sol·licitar informació")}
      />
    </>
  );
}
