"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { primaryNav, site } from "@/lib/site";
import { logicalPath } from "@/lib/i18n";
import { useT } from "@/components/lang-provider";
import LanguageSwitcher from "@/components/language-switcher";
import logoWhite from "@/assets/logo-epsig-white.png";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useT();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cerrar el menú móvil al cambiar de página (también con el botón Atrás).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Barra completa arriba del todo; píldora flotante en cuanto se baja un poco.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menú móvil abierto: Escape lo cierra y la página de fondo no se desplaza.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Se compara sin prefijo de idioma ni barra final ("/ca/servicios/" → "/servicios").
  const current = logicalPath(pathname);
  function isActive(href: string) {
    if (href === "/") return current === "/";
    return current === href || current.startsWith(`${href}/`);
  }

  return (
    <nav
      className="site-nav fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
      data-scrolled={scrolled || open ? "true" : "false"}
      aria-label={t("Principal", "Principal", "Main")}
    >
      <div className="nav-shell mx-auto flex max-w-[90rem] items-center justify-between gap-4 rounded-[22px] border border-transparent py-2.5 pr-3 pl-4 sm:pr-3.5 sm:pl-5">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${site.name} — ${t("Inicio", "Inici", "Home")}`}
        >
          <Image src={logoWhite} alt={site.name} preload sizes="144px" className="h-8 w-auto shrink-0 sm:h-9" />
        </Link>

        <ul className="hidden items-center text-[13.5px] xl:flex">
          {primaryNav.map((item, index) => (
            <li key={item.href} className="group relative">
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block whitespace-nowrap rounded-full px-3.5 py-2 font-medium text-mist-soft transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {t(item.label)} <span aria-hidden>↗</span>
                  <span className="sr-only">{t(" (se abre en una pestaña nueva)", " (s'obri en una pestanya nova)", " (opens in a new tab)")}</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 font-medium transition-colors hover:bg-white/[0.06] hover:text-white ${
                    isActive(item.href) ? "bg-white/[0.08] text-white" : "text-mist-soft"
                  }`}
                >
                  {t(item.label)}
                  {item.children && (
                    <svg
                      viewBox="0 0 10 6"
                      className="h-1.5 w-2.5 opacity-60 transition-transform duration-300 group-hover:rotate-180"
                      aria-hidden
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  )}
                </Link>
              )}

              {item.children && (
                <div
                  className={`invisible absolute top-full z-50 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                    index >= 3 ? "right-0" : "left-0"
                  } translate-y-2`}
                >
                  <div
                    className={`max-h-[70vh] overflow-y-auto rounded-[22px] border border-white/10 bg-surface-dark/95 p-2 shadow-[0_30px_60px_-24px_rgba(0,0,0,.8)] backdrop-blur-xl ${
                      item.children.length > 5 ? "grid w-[580px] grid-cols-2 gap-1" : "w-80"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="group/item block rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.06]"
                      >
                        <span className="flex items-center justify-between gap-3 text-[13.5px] font-semibold text-white">
                          {t(child.label)}
                          <span
                            aria-hidden
                            className="text-accent opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                          >
                            →
                          </span>
                        </span>
                        {child.description && (
                          <span className="mt-0.5 block text-xs text-mist-faint">{t(child.description)}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-3 pl-3 xl:flex">
          <LanguageSwitcher dark />
          <Link
            href="/contacto"
            className="hidden whitespace-nowrap rounded-full px-4 py-2.5 text-[13.5px] font-semibold text-mist-soft transition-colors hover:text-white 2xl:inline-block"
          >
            {t("Contacto", "Contacte", "Contact")}
          </Link>
          <Link href="/contacto#diagnostico" data-magnetic className="btn btn-primary !px-5 !py-2.5 !text-[13.5px]">
            {t("Diagnóstico gratuito", "Diagnòstic gratuït", "Free assessment")}
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher dark />
          <button
            ref={toggleRef}
            type="button"
            aria-controls="menu-movil"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]"
            aria-label={open ? t("Cerrar menú", "Tanca el menú", "Close menu") : t("Abrir menú", "Obri el menú", "Open menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-white transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[1.5px] w-4 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-3 h-[1.5px] w-4 bg-white transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-movil"
          className="pop-in mx-auto mt-2 max-w-[90rem] overflow-hidden rounded-[22px] border border-white/10 bg-surface-dark/95 shadow-[0_30px_60px_-24px_rgba(0,0,0,.8)] backdrop-blur-xl xl:hidden"
        >
          <div className="max-h-[calc(100dvh-96px)] overflow-y-auto px-4 py-4">
            <ul className="flex flex-col gap-0.5 text-[16px]">
              {primaryNav.map((item, i) => (
                <li key={item.href} className="menu-item-in" style={{ "--i": i } as React.CSSProperties}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2.5 font-medium text-mist-soft"
                    >
                      {t(item.label)} <span aria-hidden>↗</span>
                      <span className="sr-only">{t(" (se abre en una pestaña nueva)", " (s'obri en una pestanya nova)", " (opens in a new tab)")}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`block rounded-xl px-3 py-2.5 font-display font-semibold ${
                        isActive(item.href) ? "bg-white/[0.07] text-white" : "text-mist"
                      }`}
                    >
                      {t(item.label)}
                    </Link>
                  )}
                  {item.children && (
                    <ul className="mb-1 ml-4 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-2 py-1.5 text-sm text-mist-faint transition-colors hover:text-white"
                          >
                            {t(child.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Link href="/contacto" onClick={() => setOpen(false)} className="btn btn-ghost !py-3 !text-[13.5px]">
                {t("Contacto", "Contacte", "Contact")}
              </Link>
              <Link href="/contacto#diagnostico" onClick={() => setOpen(false)} className="btn btn-primary !py-3 !text-[13.5px]">
                {t("Diagnóstico gratuito", "Diagnòstic gratuït", "Free assessment")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
