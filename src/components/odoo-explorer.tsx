"use client";

import { useEffect, useRef, useState } from "react";
import Icon, { moduleIcons } from "@/components/icons";
import OdooScreen from "@/components/odoo-screens";
import { useLang } from "@/components/lang-provider";

type Module = { label: string; body: string };

const AUTO_MS = 4200;

/**
 * Explorador interactivo de módulos de Odoo: pestañas que avanzan solas (hasta que el usuario
 * elige una) y una "pantalla" con una vista distinta de cada módulo.
 */
export default function OdooExplorer({ modules, hint }: { modules: Module[]; hint: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // Con "reducir movimiento" no avanza solo: `visible` se queda en false.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || paused || !visible) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % modules.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, auto, paused, visible, modules.length]);

  function choose(index: number) {
    setAuto(false);
    setActive(index);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : modules.length - 1)) % modules.length;
    choose(next);
    document.getElementById(`odoo-tab-${next}`)?.focus();
  }

  const current = modules[active];
  const running = auto && !paused && visible;

  return (
    <div ref={rootRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div role="tablist" aria-label="Odoo" className="flex flex-wrap justify-center gap-2" onKeyDown={onKeyDown}>
        {modules.map((mod, index) => {
          const selected = index === active;
          return (
            <button
              key={mod.label}
              id={`odoo-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="odoo-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => choose(index)}
              className={`relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-all duration-300 ${
                selected
                  ? "border-ink bg-ink text-white shadow-[0_12px_28px_-14px_rgba(11,18,32,.7)]"
                  : "border-line bg-white text-ink-soft hover:-translate-y-0.5 hover:border-primary-light hover:text-ink"
              }`}
            >
              <Icon name={moduleIcons[index]} className="h-4 w-4" />
              {mod.label}
              {selected && running && (
                <span
                  key={`p-${active}`}
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
                  style={{ animation: `odoo-progress ${AUTO_MS}ms linear forwards` }}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="odoo-panel"
        role="tabpanel"
        aria-labelledby={`odoo-tab-${active}`}
        className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-[32px] border border-line bg-white shadow-[0_40px_90px_-50px_rgba(11,18,32,.45)]"
      >
        {/* Cúpula de luz */}
        <div
          className="pointer-events-none absolute left-1/2 top-[-55%] aspect-square w-[85%] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle at 50% 70%, #d6e9fa 0%, #eaf3fc 40%, transparent 70%)" }}
          aria-hidden
        />
        <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div key={`t-${active}`} className="pop-in text-center lg:text-left">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-b from-[#3478b6] to-accent-strong text-white shadow-[0_14px_30px_-12px_rgba(42,107,165,.8)] lg:mx-0">
              <Icon name={moduleIcons[active]} className="h-7 w-7" />
            </span>
            <p className="mt-5 font-mono text-[12px] tracking-[0.16em] text-primary uppercase">
              Odoo · {String(active + 1).padStart(2, "0")}/{String(modules.length).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-[30px] text-ink sm:text-[38px]">{current.label}</h3>
            <p className="mt-2 text-[16px] text-ink-soft">{current.body}</p>
            <p className="mt-6 text-[13px] text-ink-faint">{hint}</p>
          </div>

          <Screen key={`s-${active}`} index={active} label={current.label} />
        </div>
      </div>
    </div>
  );
}

// Pantalla de ejemplo del módulo, con datos inventados (ver odoo-screens.tsx).
function Screen({ index, label }: { index: number; label: string }) {
  const lang = useLang();
  return (
    <div className="pop-in rounded-[22px] border border-line bg-surface-alt p-3 shadow-[0_20px_50px_-36px_rgba(11,18,32,.5)] sm:p-4" aria-hidden>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff8a80]/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#f5b14c]/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#3fb27f]/70" />
        </div>
        <span className="font-mono text-[10.5px] text-ink-faint">odoo / {label.toLowerCase()}</span>
      </div>
      <OdooScreen index={index} lang={lang} />
    </div>
  );
}
