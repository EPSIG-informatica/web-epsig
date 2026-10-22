import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import ProgramStatus from "@/components/program-status";
import { kitConsultingServices, kitConsultingTiers, programStatus } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/kit-consulting", {
    title: t("Kit Consulting: Asesor Digital en Valencia y Alicante", "Kit Consulting: Assessor Digital a València i Alacant"),
    description: t(
      "Servicios de asesoramiento del programa Kit Consulting: inteligencia artificial, análisis de datos, procesos, estrategia, ciberseguridad y transformación digital, con EPSIG como Asesor Digital.",
      "Serveis d'assessorament del programa Kit Consulting: intel·ligència artificial, anàlisi de dades, processos, estratègia, ciberseguretat i transformació digital, amb EPSIG com a Assessor Digital.",
    ),
  });
}

export default async function KitConsultingPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/kit-consulting"
        eyebrow={t("Asesor Digital", "Assessor Digital")}
        title={t(
          "Kit Consulting: asesoramiento experto para digitalizar tu empresa",
          "Kit Consulting: assessorament expert per a digitalitzar la teua empresa",
        )}
        lead={t(
          "Un programa del Gobierno de España, financiado por la Unión Europea – NextGenerationEU, que subvenciona servicios de asesoramiento digital para empresas de entre 10 y 249 empleados.",
          "Un programa del Govern d'Espanya, finançat per la Unió Europea – NextGenerationEU, que subvenciona serveis d'assessorament digital per a empreses d'entre 10 i 249 empleats.",
        )}
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <ProgramStatus program="Kit Consulting" open={programStatus.kitConsulting} />
          </div>

          <Reveal className="mx-auto mb-12 max-w-2xl text-center text-[15px] leading-relaxed text-ink-soft">
            <p>
              {t(
                "El programa Kit Consulting, dentro del Plan de Recuperación, Transformación y Resiliencia, subvenciona servicios de asesoramiento en inteligencia artificial, análisis de datos, procesos de negocio, estrategia, ciberseguridad y transformación digital. Como Asesor Digital, prestamos todos estos servicios.",
                "El programa Kit Consulting, dins del Pla de Recuperació, Transformació i Resiliència, subvenciona serveis d'assessorament en intel·ligència artificial, anàlisi de dades, processos de negoci, estratègia, ciberseguretat i transformació digital. Com a Assessor Digital, prestem tots estos serveis.",
              )}
            </p>
          </Reveal>

          <p className="mb-5 text-center text-sm font-semibold text-ink">
            {t("Importe del bono según el tamaño de la empresa", "Import del bo segons la grandària de l'empresa")}
          </p>
          <div className="mx-auto mb-20 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {kitConsultingTiers.map((tier, index) => (
              <Reveal key={tier.range.es} delay={index * 0.08}>
                <TiltCard className="rounded-brand border border-line bg-surface-alt p-6 text-center">
                  <span className="block font-mono text-2xl font-semibold text-primary">
                    {tier.amount}
                  </span>
                  <span className="mt-2 block text-[13.5px] text-ink-soft">{t(tier.range)}</span>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <SectionHeading
            eyebrow={t("Servicios de asesoramiento", "Serveis d'assessorament")}
            title={t("Servicios del catálogo Kit Consulting", "Serveis del catàleg Kit Consulting")}
            body={t(
              "Puedes contratarlos directamente con nosotros, con o sin ayuda pública.",
              "Pots contractar-los directament amb nosaltres, amb ajuda pública o sense.",
            )}
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {kitConsultingServices.map((service, index) => (
              <Reveal key={service.slug} className="h-full" delay={(index % 4) * 0.07}>
                <TiltCard
                  href={`/kit-consulting/${service.slug}`}
                  className="group flex h-full flex-col rounded-brand border border-line bg-surface p-6.5 transition-colors hover:border-primary-light"
                >
                  <h3 className="mb-2 text-[16.5px]">{t(service.title)}</h3>
                  <p className="flex-1 text-[14px] leading-relaxed text-ink-soft">
                    {t(service.summary)}
                  </p>
                  <span className="mt-3 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                    {t("Ver más →", "Veure'n més →")}
                  </span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t("¿Quieres digitalizar tu empresa con un plan claro?", "Vols digitalitzar la teua empresa amb un pla clar?")}
        body={t(
          "Te asesoramos sin compromiso y te avisamos en cuanto haya una nueva convocatoria de ayudas.",
          "T'assessorem sense compromís i t'avisem tan prompte com hi haja una nova convocatòria d'ajudes.",
        )}
        ctaLabel={t("Solicitar información", "Sol·licitar informació")}
      />
    </>
  );
}
