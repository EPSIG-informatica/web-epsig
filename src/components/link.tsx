"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "@/lib/i18n";
import { useLang } from "@/components/lang-provider";

/**
 * `next/link` que añade el prefijo del idioma actual a las rutas internas:
 * en una página en valenciano, `href="/contacto"` lleva a "/ca/contacto".
 * Úsalo en lugar de `next/link` en toda la web.
 */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const lang = useLang();
  const localized =
    typeof href === "string"
      ? localizePath(href, lang)
      : { ...href, pathname: href.pathname ? localizePath(href.pathname, lang) : href.pathname };
  return <NextLink href={localized} {...props} />;
}
