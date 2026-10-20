import type { Metadata } from "next";
import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import { site, telHref } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/contacto/enviado", {
    title: t("Mensaje enviado", "Missatge enviat"),
    robots: { index: false },
  });
}

export default async function ContactoEnviadoPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        eyebrow={t("Contacto", "Contacte")}
        title={t("¡Gracias! Hemos recibido tu mensaje", "Gràcies! Hem rebut el teu missatge")}
        lead={t(
          "Te hemos enviado un correo de confirmación y te responderemos lo antes posible.",
          "T'hem enviat un correu de confirmació i et respondrem com més prompte millor.",
        )}
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center text-[15px] leading-relaxed text-ink-soft">
          <p>
            {t("Si tu consulta es urgente, escríbenos a", "Si la teua consulta és urgent, escriu-nos a")}{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {site.email}
            </a>{" "}
            {t("o llámanos al", "o telefona'ns al")}{" "}
            <a href={telHref(site.phones[0])} className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {site.phones[0]}
            </a>
            .
          </p>
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-primary"
          >
            {t("Volver al inicio", "Torna a l'inici")}
          </Link>
        </div>
      </section>
    </>
  );
}
