"use client";

import { createContext, useContext, useMemo } from "react";
import { defaultLocale, translator, type Locale, type Translate } from "@/lib/i18n";

const LangContext = createContext<Locale>(defaultLocale);

/** Da a los componentes de cliente el idioma de la página (lo fija el layout raíz). */
export default function LangProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Locale {
  return useContext(LangContext);
}

/** Traductor para componentes de cliente: `const t = useT(); t("Hola", "Hola")`. */
export function useT(): Translate {
  const lang = useLang();
  return useMemo(() => translator(lang), [lang]);
}
