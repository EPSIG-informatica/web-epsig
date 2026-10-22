"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, useT } from "@/components/lang-provider";
import type { Localized } from "@/lib/i18n";

// Demostración animada del software de viviendas tuteladas (public/animaciones/), presentada
// igual que el vídeo de campings: marco, pausa, etapa actual y barra de etapas.
// La animación se controla por postMessage (mismo origen): {target: "vt-demo", cmd: "pause" |
// "play" | "goto", stage} y responde con {source: "vt-demo", type: "state", stage, progress, paused}.
// En valenciano se carga con ?lang=ca (la animación lleva su propio diccionario).
const SRC = "/animaciones/viviendas-tuteladas.html";

// Deben coincidir con NAMES y DUR del script de la animación.
const etapas: { titulo: Localized; ms: number }[] = [
  { titulo: { es: "Inicio", ca: "Inici", en: "Home" }, ms: 7300 },
  { titulo: { es: "Entidades", ca: "Entitats", en: "Organisations" }, ms: 4850 },
  { titulo: { es: "Empresas", ca: "Empreses", en: "Companies" }, ms: 6100 },
  { titulo: { es: "Documentos", ca: "Documents", en: "Documents" }, ms: 2600 },
  { titulo: { es: "Certificado en PDF", ca: "Certificat en PDF", en: "PDF certificate" }, ms: 25900 },
];

type Estado = { stage: number; progress: number; paused: boolean };

export default function ViviendasAppDemo() {
  const t = useT();
  const lang = useLang();
  const marcoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pausadoPorUsuario = useRef(false);
  const [estado, setEstado] = useState<Estado>({ stage: 0, progress: 0, paused: false });
  const [completa, setCompleta] = useState(false);

  const enviar = (cmd: "pause" | "play" | "goto", stage?: number) =>
    iframeRef.current?.contentWindow?.postMessage({ target: "vt-demo", cmd, stage }, window.location.origin);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let enPantalla = true;

    const alRecibir = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.source !== iframe.contentWindow) return;
      const d = e.data as { source?: string; type?: string } & Partial<Estado>;
      if (d?.source !== "vt-demo") return;
      if (d.type === "ready") {
        // No arranca sola si el usuario ha pedido reducir el movimiento o la ha pausado.
        if (pausadoPorUsuario.current || !enPantalla) enviar("pause");
      }
      if (d.type === "state" && typeof d.stage === "number") {
        setEstado({ stage: d.stage, progress: d.progress ?? 0, paused: Boolean(d.paused) });
      }
    };
    window.addEventListener("message", alRecibir);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) pausadoPorUsuario.current = true;

    // Solo se reproduce mientras está en pantalla (como el vídeo de campings).
    const observer = new IntersectionObserver(
      ([entrada]) => {
        enPantalla = entrada.isIntersecting;
        if (!enPantalla) enviar("pause");
        else if (!pausadoPorUsuario.current) enviar("play");
      },
      { threshold: 0.35 }
    );
    observer.observe(iframe);

    const alCambiarPantalla = () => setCompleta(document.fullscreenElement === marcoRef.current);
    document.addEventListener("fullscreenchange", alCambiarPantalla);

    return () => {
      window.removeEventListener("message", alRecibir);
      observer.disconnect();
      document.removeEventListener("fullscreenchange", alCambiarPantalla);
    };
  }, []);

  const alternar = () => {
    if (estado.paused) {
      pausadoPorUsuario.current = false;
      enviar("play");
    } else {
      pausadoPorUsuario.current = true;
      enviar("pause");
    }
  };

  const irA = (index: number) => {
    pausadoPorUsuario.current = false;
    enviar("goto", index);
  };

  const pantallaCompleta = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else marcoRef.current?.requestFullscreen?.().catch(() => {});
  };

  const reproduciendo = !estado.paused;
  const pantallaLabel = completa
    ? t("Salir de pantalla completa", "Eixir de la pantalla completa", "Exit full screen")
    : t("Ver en pantalla completa", "Veure en pantalla completa", "View full screen");

  return (
    <figure className="m-0">
      <div
        ref={marcoRef}
        className="rounded-panel border border-white/10 bg-white/[0.04] p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] backdrop-blur-md sm:p-2.5 [&:fullscreen]:flex [&:fullscreen]:flex-col [&:fullscreen]:justify-center [&:fullscreen]:rounded-none [&:fullscreen]:border-0 [&:fullscreen]:bg-surface-dark [&:fullscreen]:p-6"
      >
        {/* Barra de ventana */}
        <div className="flex items-center gap-3 px-2 pt-1 pb-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </span>
          <span className="truncate font-mono text-[11.5px] text-mist-soft">{t("viviendas tuteladas · gestión", "habitatges tutelats · gestió", "supported housing · management")}</span>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {t("app real", "app real", "live app")}
          </span>
        </div>

        <div className="overflow-hidden rounded-[14px] bg-[#05070b] [:fullscreen_&]:mx-auto [:fullscreen_&]:aspect-video [:fullscreen_&]:w-full [:fullscreen_&]:max-w-[calc((100vh-8rem)*16/9)]">
          <iframe
            ref={iframeRef}
            src={lang === "es" ? SRC : `${SRC}?lang=${lang}`}
            title={t(
              "Demostración animada del software de gestión de viviendas tuteladas: inicio, entidades, empresas, documentación y generación de un certificado en PDF",
              "Demostració animada del programari de gestió d'habitatges tutelats: inici, entitats, empreses, documentació i generació d'un certificat en PDF",
              "Animated demo of the supported housing management software: home screen, organisations, companies, documentation and generating a PDF certificate",
            )}
            className="block aspect-video w-full border-0"
          />
        </div>

        {/* Controles y etapas */}
        <div className="px-1.5 pt-3 pb-1">
          <div className="mb-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={alternar}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label={reproduciendo ? t("Pausar demostración", "Pausar la demostració", "Pause demo") : t("Reproducir demostración", "Reproduir la demostració", "Play demo")}
            >
              {reproduciendo ? (
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <rect x="3" y="2" width="3.5" height="12" rx="1" />
                  <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" />
                </svg>
              )}
            </button>
            <span className="min-w-0 truncate text-[13.5px] text-white" aria-live="polite">
              <span className="mr-2 font-mono text-[11.5px] text-mist-faint">
                {String(estado.stage + 1).padStart(2, "0")}/{String(etapas.length).padStart(2, "0")}
              </span>
              {etapas[estado.stage] && t(etapas[estado.stage].titulo)}
            </span>
            <button
              type="button"
              onClick={pantallaCompleta}
              className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-mist-soft transition hover:bg-white/10 hover:text-white"
              aria-label={pantallaLabel}
              title={pantallaLabel}
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                {completa ? (
                  <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" />
                ) : (
                  <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
                )}
              </svg>
            </button>
          </div>

          <div className="flex gap-1">
            {etapas.map((etapa, i) => {
              const avance = i < estado.stage ? 1 : i === estado.stage ? estado.progress : 0;
              return (
                <button
                  key={etapa.titulo.es}
                  type="button"
                  onClick={() => irA(i)}
                  className="group py-1.5"
                  style={{ flexGrow: etapa.ms, flexBasis: 0 }}
                  aria-label={`${t("Ir a", "Anar a", "Go to")}: ${t(etapa.titulo)}`}
                  title={t(etapa.titulo)}
                >
                  <span className="block h-1 overflow-hidden rounded-full bg-white/15 transition-colors group-hover:bg-white/30">
                    <span
                      className="block h-full origin-left rounded-full bg-accent transition-transform duration-100 ease-linear"
                      style={{ transform: `scaleX(${avance})` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[12.5px] text-mist-faint">
        {t("Recorrido real por el programa con datos de prueba.", "Recorregut real pel programa amb dades de prova.", "Real walkthrough of the software with test data.")}
      </figcaption>
    </figure>
  );
}
