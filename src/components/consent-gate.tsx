"use client";

import { useT } from "@/components/lang-provider";
import { openCookieSettings, useConsent, type ConsentCategory } from "@/lib/consent";

/**
 * Renderiza `children` solo si el usuario ha aceptado la categoría indicada.
 * Envuelve aquí cualquier script, iframe o widget de terceros que instale cookies:
 *
 *   <ConsentGate category="analytics"><Script src="https://…" /></ConsentGate>
 *   <ConsentGate category="functional" fallback={<ConsentPlaceholder category="functional" />}>
 *     <iframe src="https://www.google.com/maps/embed?…" />
 *   </ConsentGate>
 */
export default function ConsentGate({
  category,
  children,
  fallback = null,
}: {
  category: ConsentCategory;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const consent = useConsent();
  return consent?.[category] ? children : fallback;
}

export function ConsentPlaceholder({ label }: { label?: string }) {
  const t = useT();
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-brand border border-dashed border-line bg-surface-alt p-6 text-center text-sm text-ink-soft">
      <p>
        {t(
          `${label ?? "Este contenido"} usa cookies de terceros que no has aceptado.`,
          `${label ?? "Este contingut"} usa cookies de tercers que no has acceptat.`,
        )}
      </p>
      <button
        type="button"
        onClick={openCookieSettings}
        className="rounded-full bg-ink px-5 py-2 text-[13px] font-semibold text-white hover:bg-primary"
      >
        {t("Configurar cookies", "Configurar cookies")}
      </button>
    </div>
  );
}
