import type { Metadata } from "next";
import Link from "@/components/link";
import HeroBackdrop from "@/components/hero-backdrop";
import SplitText from "@/components/split-text";
import { site, telHref } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/contacto/enviado", {
    title: t("Mensaje enviado", "Missatge enviat", "Message sent"),
    robots: { index: false },
  });
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function ContactoEnviadoPage() {
  const t = await getT();
  return (
    <section className="relative overflow-hidden bg-surface-dark pb-24 text-white sm:pb-32">
      <HeroBackdrop glow="center" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        {/* Icono de confirmación que se dibuja con luz */}
        <div className="hero-in relative grid h-28 w-28 place-items-center sm:h-32 sm:w-32" style={delay(0)} aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full border border-accent/30 [animation-duration:2.6s]" />
          <span
            className="absolute inset-2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(90,169,230,.45), rgba(42,107,165,.12) 60%, transparent 72%)" }}
          />
          <svg viewBox="0 0 100 100" className="relative h-full w-full" fill="none" style={{ filter: "drop-shadow(0 0 10px #5aa9e6)" }}>
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
              d="M34 51l11 11 21-24"
              pathLength={100}
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="trace-draw"
              style={{ "--td": "0.75s" } as React.CSSProperties}
            />
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
          text={t("¡Gracias! Hemos recibido tu mensaje", "Gràcies! Hem rebut el teu missatge", "Thank you! We have received your message")}
          className="mt-6 text-[34px] leading-[1.08] text-white sm:text-[52px]"
        />
        <p className="hero-in mx-auto mt-6 max-w-[52ch] text-[16.5px] leading-relaxed text-mist-soft sm:text-[17.5px]" style={delay(480)}>
          {t(
            "Te hemos enviado un correo de confirmación y te responderemos lo antes posible.",
            "T'hem enviat un correu de confirmació i et respondrem com més prompte millor.",
            "We have sent you a confirmation email and will get back to you as soon as possible.",
          )}
        </p>

        <div className="hero-in glass mt-10 w-full rounded-panel p-5 text-[15px] leading-relaxed text-mist-soft backdrop-blur-md sm:p-7" style={delay(620)}>
          <p>
            {t("Si tu consulta es urgente, escríbenos a", "Si la teua consulta és urgent, escriu-nos a", "If your enquiry is urgent, email us at")}{" "}
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
          <Link href="/" data-magnetic className="btn btn-light">
            {t("Volver al inicio", "Torna a l'inici", "Back to home")}
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
