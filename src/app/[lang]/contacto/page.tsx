import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SplitText from "@/components/split-text";
import ContactForm from "@/components/contact-form";
import Icon from "@/components/icons";
import { site, telHref } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/contacto", {
    title: t("Contacto y diagnóstico gratuito en Valencia y Gata de Gorgos", "Contacte i diagnòstic gratuït a València i Gata de Gorgos", "Contact Us: Free Assessment in Valencia"),
    description: t(
      "Solicita tu diagnóstico gratuito o contacta con EPSIG Consultores en Gata de Gorgos (Alicante) o Valencia.",
      "Sol·licita el teu diagnòstic gratuït o contacta amb EPSIG Consultores a Gata de Gorgos (Alacant) o València.",
      "Request your free assessment or get in touch with EPSIG Consultores in Gata de Gorgos (Alicante) or Valencia.",
    ),
  });
}

// Iconos de línea propios de esta página (correo y teléfono).
function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 0 0 7.2 7.2l1.4-2.1 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.1A1.5 1.5 0 0 1 5 3.5z" />
    </svg>
  );
}

const label = "mb-1 text-[11.5px] font-bold tracking-[0.12em] text-ink-soft uppercase";

export default async function ContactoPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/contacto"
        eyebrow={t("Contacto", "Contacte", "Contact")}
        title={t("Hablemos de tu empresa", "Parlem de la teua empresa", "Let's talk about your business")}
        lead={t(
          "Una conversación de 30 minutos, sin compromiso, para ver qué necesita tu negocio primero.",
          "Una conversa de 30 minuts, sense compromís, per a veure què necessita primer el teu negoci.",
          "A 30-minute, no-obligation conversation to see what your business needs first.",
        )}
      />

      <section id="diagnostico" className="section-tint relative scroll-mt-24 overflow-clip py-20 sm:py-28">
        <div
          className="pointer-events-none absolute -top-48 right-[-10%] h-[560px] w-[560px] max-w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(90,169,230,.18), transparent 68%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
          <div>
            <SplitText
              text={t("Información de contacto", "Informació de contacte", "Contact details")}
              className="mb-8 text-[28px] leading-[1.1] text-ink sm:text-[36px]"
            />

            <div className="flex flex-col gap-4">
              <Reveal delay={0.1}>
                <div className="card-light card-spotlight group flex items-start gap-4 p-5 sm:p-6">
                  <span className="icon-tile shrink-0 transition-transform duration-500 group-hover:-rotate-6" aria-hidden>
                    <MailIcon />
                  </span>
                  <div className="min-w-0">
                    <h3 className={label}>{t("Correo electrónico", "Correu electrònic", "Email")}</h3>
                    <a href={`mailto:${site.email}`} className="text-[15.5px] font-semibold break-all text-primary hover:text-accent-strong">
                      {site.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="card-light card-spotlight group flex items-start gap-4 p-5 sm:p-6">
                  <span className="icon-tile shrink-0 transition-transform duration-500 group-hover:-rotate-6" aria-hidden>
                    <PhoneIcon />
                  </span>
                  <div className="min-w-0">
                    <h3 className={label}>{t("Teléfonos", "Telèfons", "Phone numbers")}</h3>
                    <div className="flex flex-col gap-1">
                      {site.phoneContacts.map((phone) => (
                        <a
                          key={phone.number}
                          href={telHref(phone.number)}
                          className="flex flex-wrap items-baseline gap-x-2 text-[15.5px] font-semibold text-ink transition-colors hover:text-primary"
                        >
                          <span className="font-mono tracking-tight">{phone.number}</span>
                          <span className="text-xs font-normal text-ink-soft">{t(phone.label)}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <h3 className={`${label} mt-4 mb-3`}>{t("Oficinas y horario", "Oficines i horari", "Offices and opening hours")}</h3>
              </Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {site.offices.map((office, index) => (
                  <Reveal key={office.postalCode} delay={0.26 + index * 0.08} className="h-full">
                    <div className="card-light card-spotlight group flex h-full flex-col p-5 sm:p-6">
                      <span className="icon-tile mb-4 transition-transform duration-500 group-hover:-rotate-6" aria-hidden>
                        <Icon name="pin" className="h-5 w-5" />
                      </span>
                      <p className="text-[15px] font-semibold text-ink">{office.address}</p>
                      <p className="text-[14px] text-ink-soft">{t(office.locality)}</p>
                      <div className="mt-4 flex-1 border-t border-line pt-3 text-[13px] leading-relaxed text-ink-soft">
                        {office.hours.map((line) => (
                          <p key={line.es}>{t(line)}</p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <Reveal direction="scale" delay={0.1} className="relative lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[36px] opacity-70 blur-2xl"
              style={{ background: "linear-gradient(140deg, rgba(90,169,230,.35), rgba(42,107,165,.08) 50%, rgba(181,220,251,.3))" }}
              aria-hidden
            />
            <div className="card-light relative overflow-hidden p-5 shadow-[0_40px_80px_-40px_rgba(11,18,32,.45)] sm:p-9">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-ice" aria-hidden />
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
