"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, localeNames, localeShortNames, locales, localizePath, logicalPath } from "@/lib/i18n";
import { useLang, useT } from "@/components/lang-provider";

/**
 * Selector Castellano / Valencià / English. Lleva a la misma página en otro idioma y guarda la elección
 * en una cookie para que la detección automática del navegador no vuelva a cambiarla.
 */
export default function LanguageSwitcher({
  className = "",
  onNavigate,
  dark = false,
}: {
  className?: string;
  onNavigate?: () => void;
  /** Versión para fondo oscuro (navegación). */
  dark?: boolean;
}) {
  const lang = useLang();
  const t = useT();
  // Sin prefijo ni barra final: igual en el servidor ("/es/servicios") y en el navegador ("/servicios/").
  const path = logicalPath(usePathname());

  return (
    <div
      role="group"
      aria-label={t("Idioma", "Idioma", "Language")}
      className={`inline-flex items-center rounded-full border p-0.5 ${dark ? "border-white/15 bg-white/[0.04]" : "border-line"} text-[12px] font-semibold ${className}`}
    >
      {locales.map((locale) => {
        const label = localeShortNames[locale];
        if (locale === lang) {
          return (
            <span key={locale} aria-current="true" title={localeNames[locale]} className={`rounded-full px-2.5 py-1 ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}>
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
            className={`rounded-full px-2.5 py-1 transition-colors ${dark ? "text-mist-soft hover:text-white" : "text-ink-soft hover:text-ink"}`}
          >
            <span aria-hidden>{label}</span>
            <span className="sr-only">{localeNames[locale]}</span>
          </a>
        );
      })}
    </div>
  );
}
