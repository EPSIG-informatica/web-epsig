import type { Metadata } from "next";
import Link from "@/components/link";
import Reveal from "@/components/reveal";
import SplitText from "@/components/split-text";
import HeroBackdrop from "@/components/hero-backdrop";
import Icon from "@/components/icons";
import { site, telHref } from "@/lib/site";
import { getT } from "@/lib/i18n-server";
import type { Localized } from "@/lib/i18n";

// Next.js ya añade "noindex" a las respuestas 404. Sin canónica ni hreflang: no tiene ruta propia.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Página no encontrada", "Pàgina no trobada", "Page not found") };
}

const shortcuts: { href: string; icon: string; title: Localized; body: Localized }[] = [
  {
    href: "/servicios",
    icon: "briefcase",
    title: { es: "Servicios", ca: "Serveis", en: "Services" },
    body: { es: "Consultoría, digitalización y ciberseguridad", ca: "Consultoria, digitalització i ciberseguretat", en: "Consulting, digitalisation and cybersecurity" },
  },
  {
    href: "/servicios/odoo",
    icon: "inventory",
    title: { es: "Odoo ERP", ca: "Odoo ERP", en: "Odoo ERP" },
    body: { es: "Implantación completa de tu sistema de gestión", ca: "Implantació completa del teu sistema de gestió", en: "Full implementation of your management system" },
  },
  {
    href: "/kit-digital",
    icon: "bolt",
    title: { es: "Kit Digital", ca: "Kit Digital", en: "Kit Digital" },
    body: { es: "Web, tienda online, CRM y ciberseguridad", ca: "Web, botiga en línia, CRM i ciberseguretat", en: "Website, online shop, CRM and cybersecurity" },
  },
  {
    href: "/kit-consulting",
    icon: "spark",
    title: { es: "Kit Consulting", ca: "Kit Consulting", en: "Kit Consulting" },
    body: { es: "Asesoramiento en IA, datos y procesos", ca: "Assessorament en IA, dades i processos", en: "Advice on AI, data and processes" },
  },
  {
    href: "/servicios/consultoria-empresarial",
    icon: "chart",
    title: { es: "Consultoría Empresarial", ca: "Consultoria Empresarial", en: "Business Consulting" },
    body: {
      es: "Asesoría económico-financiera, laboral y fiscal",
      ca: "Assessoria economicofinancera, laboral i fiscal",
      en: "Financial, employment and tax advisory",
    },
  },
  {
    href: "/nosotros",
    icon: "crm",
    title: { es: "Nosotros", ca: "Nosaltres", en: "About us" },
    body: { es: "Quiénes somos y cómo trabajamos", ca: "Qui som i com treballem", en: "Who we are and how we work" },
  },
];

// Trazas de circuito que convergen hacia el "404".
const traces = ["M0 40 H160 L200 80 H300", "M0 200 H140 L190 150 H300", "M600 60 H450 L410 100 H300", "M600 180 H470 L430 140 H300"];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function NotFound() {
  const t = await getT();
  return (
    <>
      <section className="relative overflow-hidden bg-surface-dark pb-24 text-white sm:pb-32">
        <HeroBackdrop glow="center" />

        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="hero-in" style={delay(0)}>
            <div className="eyebrow eyebrow-dark">
              <span className="dot" aria-hidden />
              Error 404
            </div>
          </div>

          <div className="relative mt-4 [filter:drop-shadow(0_0_30px_rgba(90,169,230,.35))]" aria-hidden>
            <svg
              viewBox="0 0 600 240"
              className="pointer-events-none absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
            >
              {traces.map((d, i) => (
                <g key={d}>
                  <path d={d} stroke="rgba(140,195,239,.14)" strokeWidth="1.2" />
                  <path
                    d={d}
                    pathLength={100}
                    stroke="#8cc3ef"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="trace-pulse"
                    style={{ "--td": `${i * 0.7}s`, filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                  />
                </g>
              ))}
            </svg>
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{ background: "radial-gradient(ellipse, rgba(61,143,224,.45), transparent 70%)" }}
            />
            <p
              className="hero-in text-shine relative font-display text-[104px] leading-none font-bold tracking-[-0.05em] select-none sm:text-[160px]"
              style={delay(120)}
            >
              404
            </p>
          </div>

          <SplitText
            as="h1"
            trigger="load"
            delay={300}
            text={t("Esta página no existe o ha cambiado de sitio", "Esta pàgina no existix o ha canviat de lloc", "This page doesn't exist or has moved")}
            className="mt-6 text-[28px] leading-[1.12] text-white sm:text-[40px]"
          />
          <p className="hero-in mx-auto mt-5 max-w-[48ch] text-base leading-relaxed text-mist-soft sm:text-[17px]" style={delay(560)}>
            {t(
              "Puede que el enlace esté mal escrito o que hayamos reorganizado la web. Desde aquí puedes volver al inicio o ir directamente a lo que buscabas.",
              "Pot ser que l'enllaç estiga mal escrit o que hàgem reorganitzat la web. Des d'ací pots tornar a l'inici o anar directament al que buscaves.",
              "The link may be mistyped, or we may have reorganised the website. From here you can go back to the home page or straight to what you were looking for.",
            )}
          </p>

          <div className="hero-in mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center" style={delay(700)}>
            <Link href="/" data-magnetic className="btn btn-light">
              {t("Volver al inicio", "Torna a l'inici", "Back to home")}
              <span className="btn-arrow" aria-hidden>
                →
              </span>
            </Link>
            <Link href="/contacto" data-magnetic className="btn btn-ghost">
              {t("Contactar", "Contacta", "Contact us")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tint relative overflow-hidden py-20 sm:py-28">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <SplitText
            text={t("Quizá te interese", "Potser t'interessa", "You might be interested in")}
            className="mb-3 text-center text-[28px] leading-[1.1] text-ink sm:text-[36px]"
          />
          <Reveal delay={0.2}>
            <p className="mb-12 text-center text-[15.5px] text-ink-soft">
              {t(`Las secciones más visitadas de ${site.name}.`, `Les seccions més visitades d'${site.name}.`, `The most visited sections of ${site.name}.`)}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map((item, index) => (
              <Reveal key={item.href} delay={(index % 3) * 0.08} className="h-full">
                <Link href={item.href} className="card-light card-spotlight group flex h-full items-start gap-4 p-5 sm:p-6">
                  <span className="icon-tile shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[15.5px] font-semibold text-ink">
                      {t(item.title)}
                      <span className="text-primary transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-snug text-ink-soft">{t(item.body)}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-12 text-center text-sm text-ink-soft">
              {t("¿No encuentras lo que buscas? Escríbenos a", "No trobes el que busques? Escriu-nos a", "Can't find what you're looking for? Email us at")}{" "}
              <a href={`mailto:${site.email}`} className="font-medium break-all text-primary underline underline-offset-2 hover:no-underline">
                {site.email}
              </a>{" "}
              {t("o llámanos al", "o telefona'ns al", "or call us on")}{" "}
              <a href={telHref(site.phones[0])} className="font-medium whitespace-nowrap text-primary underline underline-offset-2 hover:no-underline">
                {site.phones[0]}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
