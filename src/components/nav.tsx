"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { primaryNav, site } from "@/lib/site";
import { logicalPath } from "@/lib/i18n";
import { useT } from "@/components/lang-provider";
import LanguageSwitcher from "@/components/language-switcher";
import logo from "@/assets/logo-epsig.png";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useT();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cerrar el menú móvil al cambiar de página (también con el botón Atrás).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

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
    <nav className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} — ${t("Inicio", "Inici")}`}>
          <Image src={logo} alt={site.name} preload sizes="144px" className="h-9 w-auto shrink-0 sm:h-10" />
        </Link>

        <ul className="hidden items-center text-[13.5px] lg:flex xl:gap-0.5 xl:text-sm">
          {primaryNav.map((item, index) => (
            <li key={item.href} className="group relative">
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap rounded-full px-2.5 py-2 font-medium text-ink-soft transition-colors hover:bg-surface-alt hover:text-ink xl:px-3.5"
                >
                  {t(item.label)} <span aria-hidden>↗</span>
                  <span className="sr-only">{t(" (se abre en una pestaña nueva)", " (s'obri en una pestanya nova)")}</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative whitespace-nowrap rounded-full px-2.5 py-2 font-medium transition-colors hover:bg-surface-alt hover:text-ink xl:px-3.5 ${
                    item.highlight || isActive(item.href) ? "font-semibold text-primary" : "text-ink-soft"
                  }`}
                >
                  {t(item.label)}
                  {isActive(item.href) && (
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}
                </Link>
              )}

              {item.children && (
                <div
                  className={`invisible absolute top-full z-50 ${index >= 3 ? "right-0" : "left-0"} max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-surface p-2 opacity-0 shadow-[0_22px_40px_-20px_rgba(11,18,32,.25)] transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${
                    item.children.length > 5 ? "grid w-[560px] grid-cols-2 gap-1" : "w-72"
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-xl px-3.5 py-2.5 hover:bg-surface-alt"
                    >
                      <span className="block text-sm font-semibold text-ink">{t(child.label)}</span>
                      {child.description && (
                        <span className="block text-xs text-ink-soft">{t(child.description)}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/contacto"
            className="hidden whitespace-nowrap rounded-full border-[1.5px] border-line px-5 py-2.5 text-[13.5px] font-semibold transition-colors hover:border-ink xl:inline-block"
          >
            {t("Contacto", "Contacte")}
          </Link>
          <Link
            href="/contacto#diagnostico"
            className="inline-block whitespace-nowrap rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(42,107,165,.6)] transition hover:scale-[1.04] hover:bg-primary active:scale-[0.97]"
          >
            {t("Diagnóstico gratuito", "Diagnòstic gratuït")}
          </Link>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <LanguageSwitcher />
          <button
            ref={toggleRef}
            type="button"
            aria-controls="menu-movil"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
            aria-label={open ? t("Cerrar menú", "Tanca el menú") : t("Abrir menú", "Obri el menú")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[1.5px] w-4 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-3 h-[1.5px] w-4 bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
          <div
            id="menu-movil"
            className="pop-in overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <div className="max-h-[calc(100vh-64px)] overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-1 text-[15px]">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 font-medium text-ink-soft"
                      >
                        {t(item.label)} <span aria-hidden>↗</span>
                        <span className="sr-only">{t(" (se abre en una pestaña nueva)", " (s'obri en una pestanya nova)")}</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`block rounded-lg px-3 py-2.5 font-medium ${
                          item.highlight || isActive(item.href) ? "text-primary" : "text-ink-soft"
                        }`}
                      >
                        {t(item.label)}
                      </Link>
                    )}
                    {item.children && (
                      <ul className="mb-1 ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-2 py-2 text-sm text-ink-soft"
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
              <div className="mt-4 flex flex-col gap-2.5">
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="rounded-full border-[1.5px] border-line px-5 py-2.5 text-center text-[13.5px] font-semibold"
                >
                  {t("Contacto", "Contacte")}
                </Link>
                <Link
                  href="/contacto#diagnostico"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-ink px-5 py-3 text-center text-[13.5px] font-semibold text-white"
                >
                  {t("Diagnóstico gratuito", "Diagnòstic gratuït")}
                </Link>
              </div>
            </div>
          </div>
        )}
    </nav>
  );
}
