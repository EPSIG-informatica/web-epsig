import type { Metadata } from "next";
import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import { site, telHref } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/contacto/error", {
    title: t("No se ha podido enviar el mensaje", "No s'ha pogut enviar el missatge", "Your message could not be sent"),
    robots: { index: false },
  });
}

export default async function ContactoErrorPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        eyebrow={t("Contacto", "Contacte", "Contact")}
        title={t("No hemos podido enviar tu mensaje", "No hem pogut enviar el teu missatge", "We couldn't send your message")}
        lead={t(
          "Puede que falte algún dato obligatorio o que se hayan enviado demasiadas solicitudes seguidas.",
          "Pot ser que falte alguna dada obligatòria o que s'hagen enviat massa sol·licituds seguides.",
          "A required field may be missing, or too many requests may have been sent in a short time.",
        )}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center text-[15px] leading-relaxed text-ink-soft">
          <p>
            {t(
              "Vuelve a intentarlo en unos minutos o, si lo prefieres, escríbenos directamente a",
              "Torna-ho a provar d'ací a uns minuts o, si ho prefereixes, escriu-nos directament a",
              "Please try again in a few minutes or, if you prefer, email us directly at",
            )}{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {site.email}
            </a>{" "}
            {t("o llámanos al", "o telefona'ns al", "or call us on")}{" "}
            <a href={telHref(site.phones[0])} className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {site.phones[0]}
            </a>
            .
          </p>
          <Link
            href="/contacto"
            className="rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-primary"
          >
            {t("Volver al formulario", "Torna al formulari", "Back to the form")}
          </Link>
        </div>
      </section>
    </>
  );
}
