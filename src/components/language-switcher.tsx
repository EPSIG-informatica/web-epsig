"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, localeNames, localeShortNames, locales, localizePath, logicalPath } from "@/lib/i18n";
import { useLang, useT } from "@/components/lang-provider";

/**
 * Selector Castellano / Valencià. Lleva a la misma página en el otro idioma y guarda la elección
 * en una cookie para que la detección automática del navegador no vuelva a cambiarla.
 */
export default function LanguageSwitcher({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const lang = useLang();
  const t = useT();
  // Sin prefijo ni barra final: igual en el servidor ("/es/servicios") y en el navegador ("/servicios/").
  const path = logicalPath(usePathname());

  return (
    <div
      role="group"
      aria-label={t("Idioma", "Idioma")}
      className={`inline-flex items-center rounded-full border border-line p-0.5 text-[12px] font-semibold ${className}`}
    >
      {locales.map((locale) => {
        const label = localeShortNames[locale];
        if (locale === lang) {
          return (
            <span key={locale} aria-current="true" title={localeNames[locale]} className="rounded-full bg-ink px-2.5 py-1 text-white">
              <span aria-hidden>{label}</span>
              <span className="sr-only">{localeNames[locale]}</span>
            </span>
          );
        }
        const target = localizePath(path, locale);
        return (
          <a
            key={locale}
            href={target.endsWith("/") ? target : `${target}/`}
            hrefLang={locale}
            lang={locale}
            title={localeNames[locale]}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
              onNavigate?.();
            }}
            className="rounded-full px-2.5 py-1 text-ink-soft transition-colors hover:text-ink"
          >
            <span aria-hidden>{label}</span>
            <span className="sr-only">{localeNames[locale]}</span>
          </a>
        );
      })}
    </div>
  );
}
