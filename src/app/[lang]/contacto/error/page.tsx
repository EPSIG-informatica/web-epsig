import type { Metadata } from "next";
import Link from "@/components/link";
import HeroBackdrop from "@/components/hero-backdrop";
import SplitText from "@/components/split-text";
import { site, telHref } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/contacto/error", {
    title: t("No se ha podido enviar el mensaje", "No s'ha pogut enviar el missatge", "Your message could not be sent"),
    robots: { index: false },
  });
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function ContactoErrorPage() {
  const t = await getT();
  return (
    <section className="relative overflow-hidden bg-surface-dark pb-24 text-white sm:pb-32">
      <HeroBackdrop glow="center" beam={false} />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        {/* Icono de aviso (ámbar: significa advertencia) que se dibuja con luz */}
        <div className="hero-in relative grid h-28 w-28 place-items-center sm:h-32 sm:w-32" style={delay(0)} aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full border border-chip-amber/50 [animation-duration:2.6s]" />
          <span
            className="absolute inset-2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(148,96,15,.4), rgba(42,107,165,.12) 60%, transparent 72%)" }}
          />
          <svg viewBox="0 0 100 100" className="relative h-full w-full" fill="none" style={{ filter: "drop-shadow(0 0 10px rgba(148,96,15,.9))" }}>
            <circle cx="50" cy="50" r="38" stroke="rgba(181,220,251,.18)" strokeWidth="2" />
            <circle
              cx="50"
              cy="50"
              r="38"
              pathLength={100}
              stroke="#b5dcfb"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="trace-draw"
              style={{ "--td": "0.15s" } as React.CSSProperties}
            />
            <path
              d="M50 31v24"
              pathLength={100}
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              className="trace-draw"
              style={{ "--td": "0.7s" } as React.CSSProperties}
            />
            <circle cx="50" cy="67" r="3.4" fill="#ffffff" className="hero-in" style={delay(1100)} />
          </svg>
        </div>

        <div className="hero-in mt-8" style={delay(120)}>
          <span className="eyebrow eyebrow-dark">
            <span className="dot" aria-hidden />
            {t("Contacto", "Contacte", "Contact")}
          </span>
        </div>
        <SplitText
          as="h1"
          trigger="load"
          delay={200}
          text={t("No hemos podido enviar tu mensaje", "No hem pogut enviar el teu missatge", "We couldn't send your message")}
          className="mt-6 text-[34px] leading-[1.08] text-white sm:text-[52px]"
        />
        <p className="hero-in mx-auto mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-mist-soft sm:text-[17.5px]" style={delay(480)}>
          {t(
            "Puede que falte algún dato obligatorio o que se hayan enviado demasiadas solicitudes seguidas.",
            "Pot ser que falte alguna dada obligatòria o que s'hagen enviat massa sol·licituds seguides.",
            "A required field may be missing, or too many requests may have been sent in a short time.",
          )}
        </p>

        <div className="hero-in glass mt-10 w-full rounded-panel p-5 text-[15px] leading-relaxed text-mist-soft backdrop-blur-md sm:p-7" style={delay(620)}>
          <p>
            {t(
              "Vuelve a intentarlo en unos minutos o, si lo prefieres, escríbenos directamente a",
              "Torna-ho a provar d'ací a uns minuts o, si ho prefereixes, escriu-nos directament a",
              "Please try again in a few minutes or, if you prefer, email us directly at",
            )}{" "}
            <a href={`mailto:${site.email}`} className="font-semibold break-all text-ice underline decoration-accent/50 underline-offset-4 hover:decoration-ice">
              {site.email}
            </a>{" "}
            {t("o llámanos al", "o telefona'ns al", "or call us on")}{" "}
            <a href={telHref(site.phones[0])} className="font-semibold whitespace-nowrap text-ice underline decoration-accent/50 underline-offset-4 hover:decoration-ice">
              {site.phones[0]}
            </a>
            .
          </p>
        </div>

        <div className="hero-in mt-8" style={delay(760)}>
          <Link href="/contacto" data-magnetic className="group btn btn-light">
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
              ←
            </span>
            {t("Volver al formulario", "Torna al formulari", "Back to the form")}
          </Link>
        </div>
      </div>
    </section>
  );
}
