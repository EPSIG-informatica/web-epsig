import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import { ServiceSchema } from "@/components/structured-data";
import Reveal from "@/components/reveal";
import Icon from "@/components/icons";
import CtaBand from "@/components/sections/cta-band";
import { getT } from "@/lib/i18n-server";

export default async function CatalogDetail({
  path,
  eyebrow,
  title,
  lead,
  body,
  features,
  price,
  backHref,
  backLabel,
  ctaTitle,
  ctaBody,
  ctaLabel,
  notice,
}: {
  /** Ruta interna de la página. */
  path: string;
  eyebrow: string;
  title: string;
  lead?: string;
  body: string;
  features?: readonly string[];
  price?: string;
  backHref: string;
  backLabel: string;
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
  notice?: React.ReactNode;
}) {
  const t = await getT();
  const hasAside = Boolean(price);
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} path={path} />
      <ServiceSchema path={path} name={title} description={lead ?? body} />

      <section className="section-tint relative overflow-hidden py-20 sm:py-28">
        <div className={`mx-auto px-6 ${hasAside ? "max-w-6xl" : "max-w-3xl"}`}>
          <Reveal>
            <Link
              href={backHref}
              className="group mb-10 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[0_8px_20px_-16px_rgba(11,18,32,.5)] transition-colors hover:border-primary-light"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
                ←
              </span>
              {backLabel}
            </Link>
          </Reveal>

          {notice && (
            <Reveal className="mb-10">
              {notice}
            </Reveal>
          )}

          <div className={hasAside ? "grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start lg:gap-12" : ""}>
            <div>
              <Reveal>
                <p className="text-[16.5px] leading-relaxed text-ink-soft sm:text-[17.5px]">{body}</p>
              </Reveal>

              {features && features.length > 0 && (
                <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {features.map((feature, index) => (
                    <Reveal key={feature} delay={(index % 6) * 0.06} className="h-full">
                      <li className="card-light card-spotlight flex h-full items-start gap-3 p-4 text-[14.5px] leading-relaxed text-ink">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#3478b6] to-accent-strong text-white shadow-[0_6px_14px_-6px_rgba(42,107,165,.8)]" aria-hidden>
                          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2.5 6.2l2.2 2.2 4.8-4.8" />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>

            {price && (
              <Reveal direction="scale" delay={0.15} className="lg:sticky lg:top-28">
                <aside className="relative overflow-hidden rounded-panel border border-white/10 bg-surface-dark p-7 text-white shadow-[0_40px_80px_-40px_rgba(7,16,31,.8)] sm:p-8">
                  <div
                    className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-[50%]"
                    style={{ background: "radial-gradient(ellipse, rgba(90,169,230,.45), transparent 65%)" }}
                    aria-hidden
                  />
                  <div className="relative">
                    <span className="icon-tile-dark">
                      <Icon name="spark" className="h-6 w-6" />
                    </span>
                    <p className="mt-6 font-mono text-[11.5px] tracking-[0.16em] text-mist-faint uppercase">
                      {t("Precio orientativo", "Preu orientatiu", "Guide price")}
                    </p>
                    <p className="mt-2 font-display text-[30px] leading-tight font-bold text-white sm:text-[34px]">{price}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-mist-soft">
                      {t(
                        "Precio orientativo, IVA no incluido. Consulta tu caso concreto.",
                        "Preu orientatiu, IVA no inclòs. Consulta el teu cas concret.",
                        "Guide price, excluding VAT. Ask us about your specific case.",
                      )}
                    </p>
                    <Link href="/contacto#diagnostico" data-magnetic className="btn btn-light mt-7 w-full">
                      {ctaLabel ?? t("Solicitar diagnóstico", "Sol·licitar diagnòstic", "Request an assessment")}
                      <span className="btn-arrow" aria-hidden>
                        →
                      </span>
                    </Link>
                  </div>
                </aside>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <CtaBand title={ctaTitle} body={ctaBody} ctaLabel={ctaLabel} />
    </>
  );
}
