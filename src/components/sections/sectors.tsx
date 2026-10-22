import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import { sectors } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

export default async function Sectors() {
  const t = await getT();
  return (
    <section id="sectores" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("Sectores", "Sectors", "Sectors")}
            title={t("Adaptado al día a día de tu negocio", "Adaptat al dia a dia del teu negoci", "Tailored to the day-to-day running of your business")}
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector, index) => (
            <Reveal key={sector.id} delay={index * 0.06}>
              <TiltCard
                id={sector.id}
                className={`scroll-mt-24 rounded-brand border p-6.5 ${
                  sector.highlight
                    ? "border-primary-light bg-primary-pale"
                    : "border-line bg-surface"
                }`}
              >
                <h3 className="mb-2 text-[16.5px]">{t(sector.title)}</h3>
                <p className="text-[13px] leading-relaxed text-ink-soft">{t(sector.body)}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
