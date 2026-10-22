import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import ContactForm from "@/components/contact-form";
import { site, telHref } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/contacto", {
    title: t("Contacto y diagnóstico gratuito en Valencia y Gata de Gorgos", "Contacte i diagnòstic gratuït a València i Gata de Gorgos"),
    description: t(
      "Solicita tu diagnóstico gratuito o contacta con EPSIG Consultores en Gata de Gorgos (Alicante) o Valencia.",
      "Sol·licita el teu diagnòstic gratuït o contacta amb EPSIG Consultores a Gata de Gorgos (Alacant) o València.",
    ),
  });
}

export default async function ContactoPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/contacto"
        eyebrow={t("Contacto", "Contacte")}
        title={t("Hablemos de tu empresa", "Parlem de la teua empresa")}
        lead={t(
          "Una conversación de 30 minutos, sin compromiso, para ver qué necesita tu negocio primero.",
          "Una conversa de 30 minuts, sense compromís, per a veure què necessita primer el teu negoci.",
        )}
      />

      <section id="diagnostico" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="mb-6 text-2xl">{t("Información de contacto", "Informació de contacte")}</h2>
            <div className="flex flex-col gap-6 text-[15px] leading-relaxed">
              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  {t("Correo electrónico", "Correu electrònic")}
                </h3>
                <a href={`mailto:${site.email}`} className="font-medium text-primary">
                  {site.email}
                </a>
              </div>

              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  {t("Teléfonos", "Telèfons")}
                </h3>
                <div className="flex flex-col gap-0.5">
                  {site.phoneContacts.map((phone) => (
                    <a
                      key={phone.number}
                      href={telHref(phone.number)}
                      className="flex items-baseline gap-2 font-medium text-ink hover:text-primary"
                    >
                      {phone.number}
                      <span className="text-xs font-normal text-ink-soft">{t(phone.label)}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  {t("Oficinas y horario", "Oficines i horari")}
                </h3>
                <div className="flex flex-col gap-4">
                  {site.offices.map((office) => (
                    <div key={office.postalCode} className="rounded-brand border border-line bg-surface-alt p-4">
                      <p className="font-medium text-ink">{office.address}</p>
                      <p className="text-ink-soft">{t(office.locality)}</p>
                      <div className="mt-2 border-t border-line pt-2 text-[13px] text-ink-soft">
                        {office.hours.map((line) => (
                          <p key={line.es}>{t(line)}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="rounded-brand border border-line bg-surface p-7 sm:p-9">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
