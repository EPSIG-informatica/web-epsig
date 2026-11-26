"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export type SelectGroup = { id: string; label: string; items: { id: string; label: string }[] };

// Selector desplegable propio (patrón "select-only combobox" de WAI-ARIA) con opciones agrupadas.
// Envía su valor con el formulario mediante un input oculto.
export default function CustomSelect({
  name,
  labelledBy,
  placeholder,
  groups,
  value,
  onChange,
}: {
  name: string;
  labelledBy: string;
  placeholder: string;
  groups: SelectGroup[];
  value: string;
  onChange: (value: string) => void;
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups]);
  const selected = flat.find((item) => item.id === value);

  // Cierra al hacer clic fuera.
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  // Mantiene visible la opción activa al navegar con el teclado.
  useEffect(() => {
    if (!open) return;
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function openList() {
    const index = flat.findIndex((item) => item.id === value);
    setActive(index >= 0 ? index : 0);
    setOpen(true);
  }

  function choose(index: number) {
    onChange(flat[index].id);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.min(i + 1, flat.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openList();
        else setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActive(flat.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(active);
        else openList();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        // Búsqueda por la primera letra.
        if (event.key.length === 1 && /\S/.test(event.key)) {
          const letter = event.key.toLowerCase();
          const from = open ? active + 1 : 0;
          const index = [...flat.slice(from), ...flat.slice(0, from)].findIndex((item) => item.label.toLowerCase().startsWith(letter));
          if (index >= 0) {
            if (!open) setOpen(true);
            setActive((from + index) % flat.length);
          }
        }
    }
  }

  const indexOf = new Map(flat.map((item, i) => [item.id, i]));
  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelledBy}
        aria-activedescendant={open ? `${uid}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border bg-surface-alt/60 px-4 py-3.5 text-left text-[15px] outline-none transition-all duration-300 hover:border-primary-light focus-visible:border-primary focus-visible:bg-white focus-visible:shadow-[0_0_0_4px_rgba(90,169,230,.18)] ${
          open ? "border-primary bg-white shadow-[0_0_0_4px_rgba(90,169,230,.18)]" : "border-line"
        }`}
      >
        <span className={`truncate ${selected ? "text-ink" : "text-ink-faint"}`}>{selected ? selected.label : placeholder}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 shrink-0 text-primary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          tabIndex={-1}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 origin-top motion-reduce:animate-none animate-[select-pop_160ms_cubic-bezier(.23,1,.32,1)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-1.5 shadow-[0_24px_50px_-24px_rgba(11,18,32,.35)]"
        >
          {groups.map((group) => (
            <li key={group.id} role="presentation">
              <div
                role="presentation"
                className="px-3 pt-2.5 pb-1 text-[11px] font-bold tracking-[0.12em] text-ink-soft uppercase"
              >
                {group.label}
              </div>
              <ul role="group" aria-label={group.label}>
                {group.items.map((item) => {
                  const index = indexOf.get(item.id) ?? 0;
                  const isSelected = item.id === value;
                  return (
                    <li
                      key={item.id}
                      id={`${uid}-opt-${index}`}
                      data-index={index}
                      role="option"
                      aria-selected={isSelected}
                      onPointerEnter={() => setActive(index)}
                      onPointerDown={(event) => event.preventDefault()}
                      onClick={() => choose(index)}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[14.5px] ${
                        index === active ? "bg-primary-pale text-primary" : "text-ink"
                      } ${isSelected ? "font-semibold" : ""}`}
                    >
                      <span className="min-w-0">{item.label}</span>
                      {isSelected && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden>
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
