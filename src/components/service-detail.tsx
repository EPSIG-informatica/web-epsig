import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import IndexMark from "@/components/index-mark";
import CtaBand from "@/components/sections/cta-band";

export default function ServiceDetail({
  eyebrow,
  title,
  lead,
  intro,
  features,
  ctaTitle,
  ctaBody,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  intro?: string;
  features: { title: string; body: string; href?: string }[];
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            {intro && <p className="text-base leading-relaxed text-ink-soft">{intro}</p>}
          </div>

          <SectionHeading eyebrow="Qué incluye" title="Servicios dentro de esta área" align="left" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={(index % 4) * 0.06}>
                <TiltCard
                  href={feature.href}
                  className={`block h-full rounded-brand border border-line bg-surface p-6.5 ${
                    feature.href ? "group transition-colors hover:border-primary-light" : ""
                  }`}
                >
                  <IndexMark n={index + 1} className="mb-4" />
                  <h3 className="mb-2 text-[17px]">{feature.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-ink-soft">{feature.body}</p>
                  {feature.href && (
                    <span className="mt-3 inline-block text-sm font-semibold text-primary">Ver más →</span>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={ctaTitle}
        body={ctaBody}
        ctaLabel={ctaLabel}
      />
    </>
  );
}
