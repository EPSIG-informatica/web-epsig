import Link from "@/components/link";
import Reveal from "@/components/reveal";
import SplitText from "@/components/split-text";
import { getT } from "@/lib/i18n-server";

export default async function CtaBand({
  title,
  body,
  ctaLabel,
  ctaHref = "/contacto#diagnostico",
}: {
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Se mantiene por compatibilidad: la banda ya es una sección completa con su propio espacio. */
  spaced?: boolean;
}) {
  const t = await getT();
  // Textos por defecto en el idioma de la página (si llega el prop, se usa tal cual).
  title ??= t("¿Empezamos con un diagnóstico gratuito?", "Comencem amb un diagnòstic gratuït?", "Shall we start with a free assessment?");
  body ??= t(
    "Una conversación de 30 minutos para ver qué necesita tu empresa primero.",
    "Una conversa de 30 minuts per a veure què necessita primer la teua empresa.",
    "A 30-minute conversation to see what your business needs first.",
  );
  ctaLabel ??= t("Solicitar diagnóstico", "Sol·licitar diagnòstic", "Request an assessment");

  return (
    <section className="cta-band relative bg-night px-3 py-20 sm:px-6 sm:py-28">
      <div
        data-observe
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-surface-dark px-6 pt-20 pb-36 text-center text-white sm:px-10 sm:pt-24 sm:pb-44"
      >
        <div className="stars pointer-events-none absolute inset-0" aria-hidden />
        {/* Resplandor que sube desde abajo al entrar en pantalla */}
        <div
          className="cta-glow pointer-events-none absolute bottom-[-340px] left-1/2 h-[620px] w-[140%] max-w-[1400px] rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, #ffffff 0%, var(--color-ice) 14%, var(--color-accent) 30%, var(--color-glow) 44%, rgba(42,107,165,.35) 62%, transparent 74%)",
            filter: "blur(6px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent"
          aria-hidden
        />
        <div className="relative">
          <SplitText text={title} className="mx-auto max-w-[22ch] text-[32px] leading-[1.08] text-white sm:text-[48px]" />
          <Reveal delay={0.25}>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-mist-soft">{body}</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href={ctaHref} data-magnetic className="btn btn-light">
              {ctaLabel}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
