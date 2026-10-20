import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import CookieSettingsButton from "@/components/cookie-settings-button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: `Política de cookies de ${site.legalName}.`,
};

type CookieRow = { name: string; provider: string; purpose: string; duration: string };

const technicalCookies: CookieRow[] = [
  {
    name: "epsig-cookie-consent",
    provider: site.name,
    purpose: "Guarda tus preferencias de cookies (almacenamiento local del navegador).",
    duration: "12 meses",
  },
  {
    name: "__cf_bm",
    provider: "Cloudflare",
    purpose: "Seguridad: distingue el tráfico legítimo de bots y ataques.",
    duration: "30 minutos",
  },
];

const analyticsCookies: CookieRow[] = [
  {
    name: "_ga",
    provider: "Google (Analytics)",
    purpose: "Distingue usuarios de forma anónima para obtener estadísticas de uso.",
    duration: "2 años",
  },
  {
    name: "_ga_<ID>",
    provider: "Google (Analytics)",
    purpose: "Mantiene el estado de la sesión para las estadísticas de uso.",
    duration: "2 años",
  },
];

const marketingCookies: CookieRow[] = [
  {
    name: "epsig-origen",
    provider: site.name,
    purpose:
      "Recuerda cómo llegaste a la web la primera vez (buscador, campaña o web de procedencia y primera página visitada), para asociarlo a tu solicitud si usas el formulario de contacto (almacenamiento local del navegador).",
    duration: "90 días",
  },
];

// La tabla de analítica solo aparece cuando Google Analytics está configurado.
const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);

export default function PoliticaDeCookiesPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Política de cookies" />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          <h2 className="mb-3 text-xl text-ink">¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos que se almacenan en tu navegador al visitar
            un sitio web. Se usan para recordar información sobre tu visita, garantizar la
            seguridad o, si lo aceptas, obtener estadísticas de uso.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">Tipos de cookies y consentimiento</h2>
          <p>
            Las cookies <strong className="text-ink">técnicas</strong> son necesarias para que
            la web funcione y no requieren tu consentimiento. El resto de categorías
            (funcionales, analíticas y de marketing) solo se activan si las aceptas en el
            aviso de cookies, y puedes cambiar tu elección en cualquier momento.
          </p>

          <h3 className="mt-6 mb-2 text-base font-semibold text-ink">Cookies técnicas</h3>
          <CookieTable rows={technicalCookies} />

          {analyticsEnabled && (
            <>
              <h3 className="mt-6 mb-2 text-base font-semibold text-ink">
                Cookies analíticas (solo con tu consentimiento)
              </h3>
              <CookieTable rows={analyticsCookies} />
              <p className="mt-3">
                Google Analytics puede implicar transferencias internacionales de datos a
                Estados Unidos, amparadas en el Marco de Privacidad de Datos UE-EE. UU. Más
                información en la{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                >
                  política de privacidad de Google
                </a>
                .
              </p>
            </>
          )}

          <h3 className="mt-6 mb-2 text-base font-semibold text-ink">
            Marketing (solo con tu consentimiento)
          </h3>
          <CookieTable rows={marketingCookies} />
          <p className="mt-3">
            Este dato no se comparte con terceros ni sirve para mostrarte publicidad: solo se
            utiliza si nos escribes por el formulario de contacto, para saber por qué canal nos
            has conocido. Si retiras el consentimiento de marketing, se borra.
          </p>

          {!analyticsEnabled && (
            <p className="mt-4">Actualmente no utilizamos cookies funcionales ni analíticas.</p>
          )}

          <h2 className="mt-8 mb-3 text-xl text-ink">Cómo cambiar o retirar tu consentimiento</h2>
          <p>
            Puedes modificar tus preferencias en cualquier momento desde el enlace
            «Configurar cookies» del pie de página o con este botón:
          </p>
          <CookieSettingsButton className="mt-4 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary" />
          <p className="mt-4">
            También puedes bloquear o eliminar las cookies desde la configuración de tu
            navegador, aunque bloquear las técnicas puede impedir que algunas partes de la
            web funcionen correctamente.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">Más información</h2>
          <p>
            Si tienes dudas sobre esta política de cookies, puedes contactarnos en{" "}
            <a href={`mailto:${site.email}`} className="text-primary underline underline-offset-2 hover:no-underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto rounded-brand border border-line">
      <table className="w-full min-w-[520px] text-left text-[13.5px]">
        <thead className="bg-surface-alt text-ink">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Cookie</th>
            <th className="px-4 py-2.5 font-semibold">Proveedor</th>
            <th className="px-4 py-2.5 font-semibold">Finalidad</th>
            <th className="px-4 py-2.5 font-semibold">Duración</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-line align-top">
              <td className="px-4 py-2.5 font-mono text-[12.5px] text-ink">{row.name}</td>
              <td className="px-4 py-2.5">{row.provider}</td>
              <td className="px-4 py-2.5">{row.purpose}</td>
              <td className="px-4 py-2.5 whitespace-nowrap">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
