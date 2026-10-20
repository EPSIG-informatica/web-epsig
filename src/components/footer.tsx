import Image from "next/image";
import Link from "@/components/link";
import CookieSettingsButton from "@/components/cookie-settings-button";
import logoWhite from "@/assets/logo-epsig-white.png";
import { footerNav, site, telHref } from "@/lib/site";
import { getT } from "@/lib/i18n-server";
import type { Localized, Translate } from "@/lib/i18n";

const NEW_TAB: Localized = { es: " (se abre en una pestaña nueva)", ca: " (s'obri en una pestanya nova)" };

export default async function Footer() {
  const t = await getT();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark-2 py-16 text-mist-soft">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.9fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label={`${site.name} — ${t("Inicio", "Inici")}`}>
              <Image src={logoWhite} alt={site.name} sizes="160px" className="h-11 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-faint">
              {t(site.footerTagline)}
            </p>
            <ul className="mt-5 flex gap-4 text-sm">
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-white">
                  Facebook
                  <span className="sr-only">{t(NEW_TAB)}</span>
                </a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-white">
                  Instagram
                  <span className="sr-only">{t(NEW_TAB)}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <FooterCol t={t} title={t("Servicios", "Serveis")} items={footerNav.servicios} />
            <FooterCol t={t} title="Software" items={footerNav.software} />
          </div>
          <div className="flex flex-col gap-8">
            <FooterCol t={t} title={t("Asesoría", "Assessoria")} items={footerNav.asesoria} />
            <FooterCol t={t} title={t("Programas públicos", "Programes públics")} items={footerNav.financiacion} />
          </div>
          <FooterCol t={t} title="Empresa" items={footerNav.empresa} />
        </div>

        <div className="mt-12 mb-11 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.9fr]">
          <div>
            <FooterHeading>{t("Contacto", "Contacte")}</FooterHeading>
            <ul className="flex flex-col gap-2 text-sm">
              {site.phoneContacts.map((phone) => (
                <li key={phone.number}>
                  <a href={telHref(phone.number)} className="text-mist transition-colors hover:text-white">
                    {phone.number}
                  </a>
                  <span className="ml-2 text-xs text-mist-faint">{t(phone.label)}</span>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="text-mist transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {site.offices.map((office) => (
            <div key={office.postalCode}>
              <FooterHeading>Oficina de {t(office.name)}</FooterHeading>
              <address className="text-sm leading-relaxed not-italic">
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist transition-colors hover:text-white"
                >
                  <span className="block">{office.address}</span>
                  <span className="block text-mist-faint">{t(office.locality)}</span>
                  <span className="sr-only">
                    {t(" (ver en Google Maps, se abre en una pestaña nueva)", " (veure en Google Maps, s'obri en una pestanya nova)")}
                  </span>
                </a>
                {office.hours.map((line) => (
                  <span key={line.es} className="mt-1 block text-[12.5px] text-mist-soft">
                    {t(line)}
                  </span>
                ))}
              </address>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mist-faint md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {site.legalName}
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/aviso-legal" className="hover:text-white">
              {t("Aviso legal", "Avís legal")}
            </Link>
            <Link href="/politica-de-cookies" className="hover:text-white">
              Política de cookies
            </Link>
            <Link href="/politica-de-privacidad" className="hover:text-white">
              {t("Política de privacidad", "Política de privacitat")}
            </Link>
            <CookieSettingsButton className="hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  t,
  title,
  items,
}: {
  t: Translate;
  title: string;
  items: readonly { label: Localized; href: string }[];
}) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>
      <ul className="flex flex-col gap-2.5 text-sm">
        {items.map((item) =>
          item.href.startsWith("http") ? (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mist transition-colors hover:text-white"
              >
                {t(item.label)} <span aria-hidden>↗</span>
                <span className="sr-only">{t(NEW_TAB)}</span>
              </a>
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href} className="text-mist transition-colors hover:text-white">
                {t(item.label)}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

function FooterHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-mist-faint ${className}`}>
      {children}
    </h2>
  );
}
