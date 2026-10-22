"use client";

import { useT } from "@/components/lang-provider";
import { openCookieSettings } from "@/lib/consent";

export default function CookieSettingsButton({ className }: { className?: string }) {
  const t = useT();
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {t("Configurar cookies", "Configurar cookies", "Cookie settings")}
    </button>
  );
}
