import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import Icon from "@/components/icons";
import { sectors } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

const sectorIcons: Record<string, string> = {
  industria: "factory",
  comercio: "store",
  servicios: "briefcase",
  hosteleria: "cup",
};

export default async function Sectors() {
  const t = await getT();
  return (
    <section id="sectores" className="relative overflow-hidden bg-surface-dark py-28 text-white sm:py-36">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          dark
          eyebrow={t("Sectores", "Sectors", "Sectors")}
          title={t("Adaptado al día a día de tu negocio", "Adaptat al dia a dia del teu negoci", "Tailored to the day-to-day running of your business")}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector, index) => (
            <Reveal key={sector.id} delay={index * 0.08} className="h-full">
              <TiltCard id={sector.id} className="glass group h-full scroll-mt-28 overflow-hidden rounded-panel p-7">
                <div
                  className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(90,169,230,.35), transparent 70%)" }}
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-ice transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <Icon name={sectorIcons[sector.id] ?? "spark"} className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-[12px] text-mist-faint">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-10 text-[22px] text-white">{t(sector.title)}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-mist-soft">{t(sector.body)}</p>
                <span className="mt-6 block h-px w-full bg-gradient-to-r from-accent/60 to-transparent transition-all duration-700 group-hover:from-ice" />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
