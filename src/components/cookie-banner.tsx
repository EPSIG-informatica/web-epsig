"use client";

import Link from "@/components/link";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/lang-provider";
import {
  allChoices,
  consentCategories,
  onOpenCookieSettings,
  saveConsent,
  useConsent,
  type ConsentChoices,
} from "@/lib/consent";

export default function CookieBanner() {
  const t = useT();
  const consent = useConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentChoices>(() => allChoices(false));
  const titleRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(
    () =>
      onOpenCookieSettings(() => {
        openerRef.current = document.activeElement as HTMLElement | null;
        setDraft(consent ? pickChoices(consent) : allChoices(false));
        setSettingsOpen(true);
      }),
    [consent],
  );

  // Al abrir la configuración, el foco pasa al panel para que teclado y lectores de pantalla lo encuentren.
  useEffect(() => {
    if (settingsOpen) titleRef.current?.focus();
  }, [settingsOpen]);

  // En servidor (undefined) no se pinta nada, para no provocar desajustes de hidratación.
  const visible = consent === null || settingsOpen;

  function closeSettings() {
    setSettingsOpen(false);
    openerRef.current?.focus();
    openerRef.current = null;
  }

  function decide(choices: ConsentChoices) {
    saveConsent(choices);
    closeSettings();
  }

  return (
    visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          onKeyDown={(event) => {
            // Escape cierra la configuración si ya había una elección guardada.
            if (event.key === "Escape" && settingsOpen && consent) closeSettings();
          }}
          className="pop-in fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-panel border border-line bg-surface p-5 shadow-[0_24px_60px_-20px_rgba(11,18,32,.35)] sm:p-6"
        >
          <h2
            id="cookie-banner-title"
            ref={titleRef}
            tabIndex={-1}
            className="mb-2 font-display text-base font-semibold text-ink outline-none"
          >
            {settingsOpen ? t("Configurar cookies", "Configurar cookies") : t("Usamos cookies", "Usem cookies")}
          </h2>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            {t(
              "Utilizamos cookies técnicas necesarias para que la web funcione y, solo si lo aceptas, cookies opcionales para las finalidades que elijas. Puedes cambiar tu decisión en cualquier momento desde «Configurar cookies», en el pie de página. Más información en nuestra ",
              "Utilitzem cookies tècniques necessàries perquè la web funcione i, només si ho acceptes, cookies opcionals per a les finalitats que tries. Pots canviar la teua decisió en qualsevol moment des de «Configurar cookies», en el peu de pàgina. Més informació en la nostra ",
            )}
            <Link href="/politica-de-cookies" className="font-medium text-primary underline underline-offset-2 hover:no-underline">
              {t("política de cookies", "política de cookies")}
            </Link>
            .
          </p>

          {settingsOpen && (
            <ul className="mt-4 flex max-h-[45vh] flex-col gap-2 overflow-y-auto">
              <CategoryRow
                title={t("Técnicas", "Tècniques")}
                body={t(
                  "Necesarias para el funcionamiento y la seguridad de la web. No se pueden desactivar.",
                  "Necessàries per al funcionament i la seguretat de la web. No es poden desactivar.",
                )}
                checked
                disabled
              />
              {consentCategories.map((category) => (
                <CategoryRow
                  key={category.id}
                  title={t(category.title)}
                  body={t(category.body)}
                  checked={draft[category.id]}
                  onChange={(checked) => setDraft((d) => ({ ...d, [category.id]: checked }))}
                />
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
            {settingsOpen ? (
              <BannerButton onClick={() => decide(draft)}>{t("Guardar selección", "Guardar la selecció")}</BannerButton>
            ) : (
              <BannerButton onClick={() => setSettingsOpen(true)}>{t("Configurar", "Configurar")}</BannerButton>
            )}
            <BannerButton onClick={() => decide(allChoices(false))}>{t("Rechazar todas", "Rebutjar-les totes")}</BannerButton>
            <BannerButton onClick={() => decide(allChoices(true))}>{t("Aceptar todas", "Acceptar-les totes")}</BannerButton>
          </div>
        </div>
    )
  );
}

function pickChoices(consent: ConsentChoices): ConsentChoices {
  return Object.fromEntries(consentCategories.map((c) => [c.id, consent[c.id]])) as ConsentChoices;
}

// Los tres botones tienen el mismo peso visual: la AEPD exige que rechazar sea tan fácil como aceptar.
function BannerButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary"
    >
      {children}
    </button>
  );
}

function CategoryRow({
  title,
  body,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <li>
      <label
        className={`flex items-start justify-between gap-4 rounded-brand border border-line bg-surface-alt p-3.5 ${
          disabled ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <span>
          <span className="block text-sm font-semibold text-ink">{title}</span>
          <span className="block text-[12.5px] leading-snug text-ink-soft">{body}</span>
        </span>
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="relative mt-0.5 h-6 w-10 shrink-0 rounded-full bg-chip-muted transition-colors peer-checked:bg-accent-strong peer-disabled:opacity-60 peer-focus-visible:ring-2 peer-focus-visible:ring-primary after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4"
        />
      </label>
    </li>
  );
}
