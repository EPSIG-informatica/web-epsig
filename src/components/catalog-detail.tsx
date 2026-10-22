import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import CtaBand from "@/components/sections/cta-band";
import { getT } from "@/lib/i18n-server";

export default async function CatalogDetail({
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
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <Link
              href={backHref}
              className="mb-8 inline-block text-sm font-semibold text-primary hover:underline"
            >
              ← {backLabel}
            </Link>

            {notice && <div className="mb-8">{notice}</div>}

            <p className="text-[15px] leading-relaxed text-ink-soft">{body}</p>

            {features && features.length > 0 && (
              <ul className="mt-8 flex flex-col gap-3">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-brand border border-line bg-surface-alt p-4 text-[14.5px] leading-relaxed text-ink"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {price && (
              <div className="mt-8 rounded-brand border border-line bg-primary-pale p-5 text-center">
                <span className="font-mono text-lg font-semibold text-primary">{price}</span>
                <p className="mt-1 text-xs text-ink-soft">
                  {t(
                    "Precio orientativo, IVA no incluido. Consulta tu caso concreto.",
                    "Preu orientatiu, IVA no inclòs. Consulta el teu cas concret.",
                    "Guide price, excluding VAT. Ask us about your specific case.",
                  )}
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <CtaBand title={ctaTitle} body={ctaBody} ctaLabel={ctaLabel} />
    </>
  );
}
