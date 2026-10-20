import type { Metadata } from "next";
import Link from "@/components/link";
import Reveal from "@/components/reveal";
import { site, telHref } from "@/lib/site";
import { getT } from "@/lib/i18n-server";
import type { Localized } from "@/lib/i18n";

// Next.js ya añade "noindex" a las respuestas 404. Sin canónica ni hreflang: no tiene ruta propia.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Página no encontrada", "Pàgina no trobada") };
}

const shortcuts: { href: string; title: Localized; body: Localized }[] = [
  {
    href: "/servicios",
    title: { es: "Servicios", ca: "Serveis" },
    body: { es: "Consultoría, digitalización y ciberseguridad", ca: "Consultoria, digitalització i ciberseguretat" },
  },
  {
    href: "/servicios/odoo",
    title: { es: "Odoo ERP", ca: "Odoo ERP" },
    body: { es: "Implantación completa de tu sistema de gestión", ca: "Implantació completa del teu sistema de gestió" },
  },
  {
    href: "/kit-digital",
    title: { es: "Kit Digital", ca: "Kit Digital" },
    body: { es: "Web, tienda online, CRM y ciberseguridad", ca: "Web, botiga en línia, CRM i ciberseguretat" },
  },
  {
    href: "/kit-consulting",
    title: { es: "Kit Consulting", ca: "Kit Consulting" },
    body: { es: "Asesoramiento en IA, datos y procesos", ca: "Assessorament en IA, dades i processos" },
  },
  {
    href: "/servicios/consultoria-empresarial",
    title: { es: "Consultoría Empresarial", ca: "Consultoria Empresarial" },
    body: {
      es: "Asesoría económico-financiera, laboral y fiscal",
      ca: "Assessoria economicofinancera, laboral i fiscal",
    },
  },
  {
    href: "/nosotros",
    title: { es: "Nosotros", ca: "Nosaltres" },
    body: { es: "Quiénes somos y cómo trabajamos", ca: "Qui som i com treballem" },
  },
];

export default async function NotFound() {
  const t = await getT();
  return (
    <>
      <section className="relative overflow-hidden bg-surface-dark pt-20 pb-20 text-white sm:pt-28 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 80%)",
          }}
          aria-hidden
        />
        <div
          className="blob-drift pointer-events-none absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full blur-[10px]"
          style={{ background: "radial-gradient(circle, rgba(42,107,165,.5), transparent 70%)" }}
          aria-hidden
        />
        <div
          className="blob-drift-slow pointer-events-none absolute -left-40 bottom-[-120px] h-[380px] w-[380px] rounded-full blur-[10px]"
          style={{ background: "radial-gradient(circle, rgba(90,169,230,.25), transparent 70%)" }}
          aria-hidden
        />

        <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Error 404
          </div>

          <p
            className="mt-6 select-none bg-gradient-to-b from-white to-white/25 bg-clip-text font-display text-[96px] leading-none font-bold tracking-tight text-transparent sm:text-[140px]"
            aria-hidden
          >
            404
          </p>

          <h1 className="mt-4 text-[28px] leading-[1.2] text-white sm:text-[36px]">
            {t("Esta página no existe o ha cambiado de sitio", "Esta pàgina no existix o ha canviat de lloc")}
          </h1>
          <p className="mx-auto mt-4 max-w-[48ch] text-base leading-relaxed text-mist-soft">
            {t(
              "Puede que el enlace esté mal escrito o que hayamos reorganizado la web. Desde aquí puedes volver al inicio o ir directamente a lo que buscabas.",
              "Pot ser que l'enllaç estiga mal escrit o que hàgem reorganitzat la web. Des d'ací pots tornar a l'inici o anar directament al que buscaves.",
            )}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="w-full rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-mist sm:w-auto"
            >
              {t("Volver al inicio", "Torna a l'inici")}
            </Link>
            <Link
              href="/contacto"
              className="w-full rounded-full border-[1.5px] border-white/25 px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:border-white sm:w-auto"
            >
              {t("Contactar", "Contacta")}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="mb-2 text-center text-xl text-ink sm:text-2xl">{t("Quizá te interese", "Potser t'interessa")}</h2>
            <p className="mb-10 text-center text-[15px] text-ink-soft">
              {t(`Las secciones más visitadas de ${site.name}.`, `Les seccions més visitades d'${site.name}.`)}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shortcuts.map((item, index) => (
              <Reveal key={item.href} delay={(index % 3) * 0.06} className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full items-start gap-4 rounded-brand border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary-light hover:shadow-[0_18px_36px_-22px_rgba(11,18,32,.35)]"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-[12px] font-medium text-primary" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                      {t(item.title)}
                      <span className="text-primary transition-transform group-hover:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-soft">{t(item.body)}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-ink-soft">
            {t("¿No encuentras lo que buscas? Escríbenos a", "No trobes el que busques? Escriu-nos a")}{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {site.email}
            </a>{" "}
            {t("o llámanos al", "o telefona'ns al")}{" "}
            <a href={telHref(site.phones[0])} className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {site.phones[0]}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
