import Link from "@/components/link";
import Reveal from "@/components/reveal";
import { getT } from "@/lib/i18n-server";

export default async function CtaBand({
  title,
  body,
  ctaLabel,
  ctaHref = "/contacto#diagnostico",
  spaced = false,
}: {
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Espacio también arriba: para cuando la sección anterior tiene fondo de color y la banda quedaría pegada. */
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
    <div className={`px-6 pb-20 sm:pb-24 ${spaced ? "pt-20 sm:pt-24" : ""}`}>
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
          className="inline-block rounded-full bg-white px-6.5 py-3.5 text-[14.5px] font-semibold text-secondary shadow-[0_14px_30px_-12px_rgba(6,20,40,.55)] transition-transform hover:scale-[1.05] active:scale-[0.96]"
        >
          {ctaLabel}
        </Link>
      </Reveal>
    </div>
  );
}
