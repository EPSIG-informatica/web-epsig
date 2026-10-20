import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mensaje enviado",
  robots: { index: false },
};

export default function ContactoEnviadoPage() {
  return (
    <>
      <PageHero eyebrow="Contacto" title="¡Gracias! Hemos recibido tu mensaje" lead="Te hemos enviado un correo de confirmación y te responderemos lo antes posible." />
      <section className="py-16 sm:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 text-center text-[15px] leading-relaxed text-ink-soft">
          <p>
            Si tu consulta es urgente, escríbenos a{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {site.email}
            </a>{" "}
            o llámanos al{" "}
            <a href={telHref(site.phones[0])} className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {site.phones[0]}
            </a>
            .
          </p>
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-primary"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}
