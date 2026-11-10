"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal], [data-split], [data-observe]";

// Contenido que se anima solo al entrar en pantalla (dentro de las secciones de cada página).
const AUTO_SELECTOR = [
  "h2", "h3", "h4", "p", "li", "dt", "dd", "blockquote", "table", "details", "form", "aside",
  "img", "video", "figure", "picture", "iframe",
  ".card-light", ".glass", ".card-spotlight", ".btn", ".eyebrow", ".icon-tile", ".icon-tile-dark",
].map((s) => `#contenido section ${s}, #contenido article ${s}`).join(", ");

// Zonas que no se tocan: la cabecera de cada página (ya tiene su entrada), decoraciones,
// marquesinas, demos de producto y el banner de cookies.
const AUTO_SKIP = "#contenido > :first-child, [aria-hidden='true'], .marquee, svg, [role='img'], .pointer-events-none";

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
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          io.unobserve(el);
          // Las entradas automáticas se limpian al acabar: el elemento recupera sus propios
          // estilos (inclinación de tarjetas, hover...) sin que la animación los pise.
          if (el.classList.contains("auto-reveal")) {
            const delay = parseFloat(el.style.getPropertyValue("--d")) || 0;
            window.setTimeout(() => {
              el.classList.remove("auto-reveal", "is-in");
              el.style.removeProperty("--d");
            }, 1300 + delay);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    // ---- Entradas automáticas: todo el contenido de las páginas que no tiene ya su propia
    // animación aparece al hacer scroll, escalonado entre hermanos. Solo lo que aún está por
    // debajo de la pantalla (lo visible al cargar no parpadea).
    const autoSeen = new WeakSet<Element>();
    function autoTag() {
      if (reduced) return;
      const limit = window.innerHeight;
      const perParent = new Map<Element, number>();
      document.querySelectorAll<HTMLElement>(AUTO_SELECTOR).forEach((el) => {
        if (autoSeen.has(el)) return;
        autoSeen.add(el);
        if (el.closest(AUTO_SKIP)) return;
        // Dentro de otra entrada automática o de un titular por palabras: ya se anima con él.
        if (el.parentElement?.closest("[data-split], .auto-reveal, .split, .hero-split")) return;
        if (el.matches("[data-reveal], [data-split], .split, .hero-split")) return;
        // Único hijo de un bloque `Reveal`: el bloque ya lo anima. Si el bloque tiene varios
        // elementos (rejillas, listas, textos), estos entran en cascada uno tras otro.
        const parent0 = el.parentElement;
        if (parent0?.matches("[data-reveal]") && parent0.children.length === 1) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < limit || rect.height === 0) return;
        const parent = el.parentElement ?? document.body;
        const i = perParent.get(parent) ?? 0;
        perParent.set(parent, i + 1);
        el.style.setProperty("--d", `${Math.min(i, 6) * 80}ms`);
        el.classList.add("auto-reveal");
        if (el.matches("img, video, figure, picture, canvas, iframe")) el.classList.add("auto-media");
        io.observe(el);
      });
    }

    const progressEls = new Set<HTMLElement>();
    function scan() {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (reduced) el.classList.add("is-in");
        else io.observe(el);
      });
      autoTag();
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
