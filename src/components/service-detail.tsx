import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import CtaBand from "@/components/sections/cta-band";
import { getT } from "@/lib/i18n-server";

export default async function ServiceDetail({
  path,
  eyebrow,
  title,
  lead,
  intro,
  features,
  ctaTitle,
  ctaBody,
  ctaLabel,
}: {
  /** Ruta interna de la página. */
  path: string;
  /** Nombre del servicio (también para Google). */
  eyebrow: string;
  title: string;
  lead: string;
  intro?: string;
  features: { title: string; body: string; href?: string }[];
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
}) {
  const t = await getT();
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} path={path} service={eyebrow} />

      {intro && (
        <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary-pale/70 to-transparent"
            aria-hidden
          />
          <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
            <p className="font-display text-[22px] leading-[1.4] font-medium tracking-[-0.015em] text-ink sm:text-[30px]">
              {intro}
            </p>
          </Reveal>
        </section>
      )}

      <section className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] max-w-[160%] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(42,107,165,.3), transparent 65%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            dark
            eyebrow={t("Qué incluye", "Què inclou", "What's included")}
            title={t("Servicios dentro de esta área", "Serveis dins d'esta àrea", "Services in this area")}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={(index % 4) * 0.08} className="h-full" direction="scale">
                <TiltCard
                  href={feature.href}
                  className={`glass group flex h-full flex-col overflow-hidden rounded-panel p-7 sm:p-8`}
                >
                  <div className="flex items-center justify-between">
                    <span className="icon-tile-dark font-mono text-[13px] font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {feature.href && (
                      <span
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ice transition-all duration-300 group-hover:border-accent/60 group-hover:bg-accent/15"
                        aria-hidden
                      >
                        →
                      </span>
                    )}
                  </div>
                  <h3 className="mt-7 text-[21px] text-white sm:text-[23px]">{feature.title}</h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-mist-soft">{feature.body}</p>
                  {feature.href && (
                    <span className="mt-5 text-sm font-semibold text-ice">{t("Ver más →", "Veure'n més →", "Learn more →")}</span>
                  )}
                  <span
                    className="mt-6 block h-px w-full bg-gradient-to-r from-accent/60 to-transparent transition-all duration-700 group-hover:from-ice"
                    aria-hidden
                  />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={ctaTitle} body={ctaBody} ctaLabel={ctaLabel} />
    </>
  );
}
