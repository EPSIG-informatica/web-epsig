import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import ContactForm from "@/components/contact-form";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Solicita tu diagnóstico gratuito o contacta con EPSIG Consultores en Gata de Gorgos (Alicante) o Valencia.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu empresa"
        lead="Una conversación de 30 minutos, sin compromiso, para ver qué necesita tu negocio primero."
      />

      <section id="diagnostico" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="mb-6 text-2xl">Información de contacto</h2>
            <div className="flex flex-col gap-6 text-[15px] leading-relaxed">
              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  Correo electrónico
                </h3>
                <a href={`mailto:${site.email}`} className="font-medium text-primary">
                  {site.email}
                </a>
              </div>

              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  Teléfonos
                </h3>
                <div className="flex flex-col gap-0.5">
                  {site.phoneContacts.map((phone) => (
                    <a
                      key={phone.number}
                      href={telHref(phone.number)}
                      className="flex items-baseline gap-2 font-medium text-ink hover:text-primary"
                    >
                      {phone.number}
                      <span className="text-xs font-normal text-ink-soft">{phone.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
                  Oficinas y horario
                </h3>
                <div className="flex flex-col gap-4">
                  {site.offices.map((office) => (
                    <div key={office.name} className="rounded-brand border border-line bg-surface-alt p-4">
                      <p className="font-medium text-ink">{office.address}</p>
                      <p className="text-ink-soft">{office.locality}</p>
                      <div className="mt-2 border-t border-line pt-2 text-[13px] text-ink-soft">
                        {office.hours.map((line) => (
                          <p key={line}>{line}</p>
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
