"use client";

import { useEffect, useRef, useState } from "react";
import Icon, { moduleIcons } from "@/components/icons";

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

// Vista simulada de cada módulo: kanban, líneas de pedido, gráfico o fichas.
function Screen({ index, label }: { index: number; label: string }) {
  const kind = index % 4;
  return (
    <div className="pop-in rounded-[22px] border border-line bg-surface-alt p-4 shadow-[0_20px_50px_-36px_rgba(11,18,32,.5)]" aria-hidden>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#e4e9f2]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#e4e9f2]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#e4e9f2]" />
        </div>
        <span className="font-mono text-[10.5px] text-ink-faint">odoo / {label.toLowerCase()}</span>
      </div>

      {kind === 0 && (
        <div className="grid grid-cols-3 gap-2.5">
          {[3, 2, 2].map((count, col) => (
            <div key={col} className="rounded-xl bg-white p-2.5">
              <div className="mb-2 h-1.5 w-12 rounded-full bg-primary/30" />
              <div className="flex flex-col gap-2">
                {Array.from({ length: count }).map((_, i) => (
                  <div
                    key={i}
                    className="explorer-item rounded-lg border border-line bg-white p-2"
                    style={{ "--i": col * 3 + i } as React.CSSProperties}
                  >
                    <div className="h-1.5 w-[80%] rounded-full bg-ink/15" />
                    <div className="mt-1.5 h-1.5 w-[50%] rounded-full bg-ink/10" />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="h-3.5 w-3.5 rounded-full bg-primary-light/60" />
                      <span className="h-1.5 w-8 rounded-full bg-accent/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {kind === 1 && (
        <div className="rounded-xl bg-white p-3">
          {[72, 54, 88, 40, 66].map((w, i) => (
            <div
              key={i}
              className="explorer-item flex items-center gap-3 border-b border-line py-2.5 last:border-0"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="h-6 w-6 shrink-0 rounded-md bg-primary-pale" />
              <span className="h-1.5 rounded-full bg-ink/15" style={{ width: `${w * 0.5}%` }} />
              <span className="ml-auto h-1.5 w-10 rounded-full bg-ink/10" />
              <span className="h-5 w-14 rounded-full bg-accent/20" />
            </div>
          ))}
          <div className="mt-3 flex justify-end">
            <span className="rounded-lg bg-ink px-3 py-1.5 font-mono text-[10.5px] text-white">Σ 12.480,00 €</span>
          </div>
        </div>
      )}

      {kind === 2 && (
        <div className="rounded-xl bg-white p-4">
          <div className="flex h-40 items-end gap-2">
            {[30, 46, 38, 60, 52, 74, 66, 90, 80].map((h, i) => (
              <span
                key={i}
                className="explorer-bar flex-1 rounded-t-md bg-gradient-to-t from-primary to-accent"
                style={{ height: `${h}%`, "--i": i } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["+18%", "1.204", "98%"].map((v, i) => (
              <div key={v} className="explorer-item rounded-lg bg-surface-alt p-2 text-center" style={{ "--i": 9 + i } as React.CSSProperties}>
                <span className="font-mono text-[12px] font-semibold text-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {kind === 3 && (
        <div className="grid grid-cols-2 gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="explorer-item flex items-center gap-2.5 rounded-xl bg-white p-3"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={`h-9 w-9 shrink-0 rounded-full ${i % 3 === 0 ? "bg-primary/25" : i % 3 === 1 ? "bg-accent/30" : "bg-primary-pale"}`} />
              <span className="flex-1">
                <span className="block h-1.5 w-[80%] rounded-full bg-ink/15" />
                <span className="mt-1.5 block h-1.5 w-[50%] rounded-full bg-ink/10" />
              </span>
              <span className={`h-2 w-2 rounded-full ${i === 2 ? "bg-[#f5b14c]" : "bg-accent"}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
