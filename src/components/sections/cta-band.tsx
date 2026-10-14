import Link from "next/link";
import Reveal from "@/components/reveal";

export default function CtaBand({
  title = "¿Empezamos con un diagnóstico gratuito?",
  body = "Una conversación de 30 minutos para ver qué necesita tu empresa primero.",
  ctaLabel = "Solicitar diagnóstico",
  ctaHref = "/contacto#diagnostico",
}: {
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="cta-band px-6 pb-20 sm:pb-24">
      <Reveal
        className="gradient-pan relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-8 py-14 text-center text-white sm:px-10 sm:py-[70px]"
        style={{
          background:
            "linear-gradient(120deg, var(--color-primary), var(--color-secondary), var(--color-primary))",
        }}
      >
        <h2 className="mb-4.5 text-[28px] text-white">{title}</h2>
        <p className="mb-7 text-white/90">{body}</p>
        <Link
          href={ctaHref}
          className="inline-block rounded-full bg-accent-strong px-6.5 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(90,169,230,.6)] transition-transform hover:scale-[1.05] active:scale-[0.96]"
        >
          {ctaLabel}
        </Link>
      </Reveal>
    </div>
  );
}
