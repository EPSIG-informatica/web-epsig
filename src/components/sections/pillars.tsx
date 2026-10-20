import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import IndexMark from "@/components/index-mark";
import { pillars } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

export default async function Pillars() {
  const t = await getT();
  return (
    <section id="pilares" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("Cómo trabajamos", "Com treballem")}
            title={t("Tres formas de ayudarte a funcionar mejor", "Tres maneres d'ajudar-te a funcionar millor")}
            body={t(
              "Ninguna vive aislada: cada proyecto de Odoo puede apoyarse en las tres.",
              "Cap no viu aïllada: cada projecte d'Odoo pot recolzar-se en les tres.",
            )}
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.slug} delay={index * 0.08}>
              <TiltCard
                href={`/servicios/${pillar.slug}`}
                className="group block h-full rounded-brand border border-line bg-surface p-8 transition-colors hover:border-primary-light"
              >
                <IndexMark n={index + 1} />
                <h3 className="mb-2.5 text-xl">{t(pillar.title)}</h3>
                <p className="text-[14.5px] leading-relaxed text-ink-soft">{t(pillar.summary)}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                  {t("Saber más →", "Saber-ne més →")}
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
