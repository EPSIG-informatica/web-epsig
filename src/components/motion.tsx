"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-split], [data-observe]";

/**
 * Motor de animaciones de toda la web (un único componente en el layout):
 * - Añade `.is-in` a los elementos `[data-reveal]`, `[data-split]` y `[data-observe]`
 *   cuando entran en pantalla (los estilos de entrada están en globals.css).
 * - Vigila el DOM para animar también lo que aparece al navegar entre páginas.
 * - Botones magnéticos `[data-magnetic]`: siguen ligeramente al cursor.
 * - `--scroll-p` en los elementos `[data-scroll-progress]`: avance del elemento por la pantalla (0 → 1).
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Entradas al hacer scroll
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const progressEls = new Set<HTMLElement>();
    function scan() {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (reduced) el.classList.add("is-in");
        else io.observe(el);
      });
      document.querySelectorAll<HTMLElement>("[data-scroll-progress]").forEach((el) => progressEls.add(el));
    }
    scan();

    let scanQueued = false;
    const mo = new MutationObserver(() => {
      if (scanQueued) return;
      scanQueued = true;
      requestAnimationFrame(() => {
        scanQueued = false;
        for (const el of progressEls) if (!el.isConnected) progressEls.delete(el);
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // ---- Progreso de scroll por elemento
    let ticking = false;
    function updateProgress() {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of progressEls) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) continue;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        el.style.setProperty("--scroll-p", p.toFixed(4));
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    }
    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      updateProgress();
    }

    // ---- Botones magnéticos (solo ratón)
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let magnet: HTMLElement | null = null;
    function onPointerMove(event: PointerEvent) {
      const target = (event.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet && magnet !== target) {
        magnet.style.removeProperty("--mx");
        magnet.style.removeProperty("--my");
      }
      magnet = target;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      target.style.setProperty("--mx", `${(x * 0.22).toFixed(1)}px`);
      target.style.setProperty("--my", `${(y * 0.3).toFixed(1)}px`);
    }
    if (fine && !reduced) document.addEventListener("pointermove", onPointerMove, { passive: true });

    root.classList.add("motion-ready");

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return null;
}
