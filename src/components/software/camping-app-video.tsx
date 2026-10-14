"use client";

import { useEffect, useRef, useState } from "react";

// Recorrido en vídeo por la app real de camping, grabado con un camping de demostración
// (clientes y consumos inventados). Se reproduce en silencio y en bucle solo mientras está
// en pantalla, y no arranca solo si el usuario ha pedido reducir el movimiento.
const VIDEO = {
  webm: "/software/camper-shelly-demo.webm",
  mp4: "/software/camper-shelly-demo.mp4",
  poster: "/software/camper-shelly-poster.jpg",
};

const DURACION = 55.6;

const capitulos = [
  { t: 0, titulo: "Acceso" },
  { t: 7.18, titulo: "Parcelas en directo" },
  { t: 14, titulo: "Check-in en segundos" },
  { t: 25.07, titulo: "Consumo por parcela" },
  { t: 34.28, titulo: "Check-ins y cobros" },
  { t: 38.18, titulo: "Ficha de clientes" },
  { t: 42.09, titulo: "Informes de caja" },
  { t: 49.16, titulo: "Tarifas y ajustes" },
];

const finDe = (index: number, duracion: number) => capitulos[index + 1]?.t ?? duracion;
const capituloEn = (t: number) => {
  let index = 0;
  capitulos.forEach((c, i) => {
    if (t >= c.t) index = i;
  });
  return index;
};

export default function CampingAppVideo() {
  const marcoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rellenosRef = useRef<(HTMLSpanElement | null)[]>([]);
  const pausadoPorUsuario = useRef(false);
  const [actual, setActual] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [completa, setCompleta] = useState(false);

  // Arranque/parada según visibilidad y progreso de la barra de capítulos
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido) pausadoPorUsuario.current = true;

    let enPantalla = false;
    const reanudar = () => {
      if (enPantalla && !pausadoPorUsuario.current && document.visibilityState === "visible") video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entrada]) => {
        enPantalla = entrada.isIntersecting;
        if (enPantalla) reanudar();
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", reanudar);

    let frame = 0;
    const pintar = () => {
      const t = video.currentTime;
      const duracion = Number.isFinite(video.duration) ? video.duration : DURACION;
      rellenosRef.current.forEach((relleno, i) => {
        if (!relleno) return;
        const inicio = capitulos[i].t;
        const avance = Math.min(1, Math.max(0, (t - inicio) / (finDe(i, duracion) - inicio)));
        relleno.style.transform = `scaleX(${avance})`;
      });
      setActual(capituloEn(t));
    };
    // rAF para que la barra avance suave; timeupdate por si el navegador no está pintando
    const bucle = () => {
      pintar();
      if (!video.paused) frame = requestAnimationFrame(bucle);
    };
    const alReproducir = () => {
      setReproduciendo(true);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(bucle);
    };
    const alPausar = () => {
      setReproduciendo(false);
      cancelAnimationFrame(frame);
      pintar();
    };
    video.addEventListener("play", alReproducir);
    video.addEventListener("pause", alPausar);
    video.addEventListener("seeked", pintar);
    video.addEventListener("timeupdate", pintar);

    const alCambiarPantalla = () => setCompleta(document.fullscreenElement === marcoRef.current);
    document.addEventListener("fullscreenchange", alCambiarPantalla);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", reanudar);
      cancelAnimationFrame(frame);
      video.removeEventListener("play", alReproducir);
      video.removeEventListener("pause", alPausar);
      video.removeEventListener("seeked", pintar);
      video.removeEventListener("timeupdate", pintar);
      document.removeEventListener("fullscreenchange", alCambiarPantalla);
    };
  }, []);

  const alternar = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausadoPorUsuario.current = false;
      video.play().catch(() => {});
    } else {
      pausadoPorUsuario.current = true;
      video.pause();
    }
  };

  const irA = (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = capitulos[index].t + 0.05;
    pausadoPorUsuario.current = false;
    video.play().catch(() => {});
  };

  const pantallaCompleta = () => {
    const marco = marcoRef.current;
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (marco?.requestFullscreen) marco.requestFullscreen().catch(() => {});
    else video?.webkitEnterFullscreen?.(); // iPhone: solo el vídeo puede ir a pantalla completa
  };

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
          <span className="truncate font-mono text-[11.5px] text-mist-soft">camper shelly · recepción</span>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            app real
          </span>
        </div>

        <video
          ref={videoRef}
          className="block aspect-[16/10] w-full cursor-pointer rounded-[14px] bg-surface-dark object-contain [:fullscreen_&]:mx-auto [:fullscreen_&]:max-h-[calc(100vh-8rem)] [:fullscreen_&]:w-auto"
          poster={VIDEO.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onClick={alternar}
          aria-label="Recorrido en vídeo por el software: acceso, panel de parcelas, check-in, consumo eléctrico de una parcela, check-ins, clientes, informes de caja y tarifas."
        >
          <source src={VIDEO.webm} type="video/webm" />
          <source src={VIDEO.mp4} type="video/mp4" />
        </video>

        {/* Controles y capítulos */}
        <div className="px-1.5 pt-3 pb-1">
          <div className="mb-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={alternar}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label={reproduciendo ? "Pausar vídeo" : "Reproducir vídeo"}
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
                {String(actual + 1).padStart(2, "0")}/{String(capitulos.length).padStart(2, "0")}
              </span>
              {capitulos[actual].titulo}
            </span>
            <button
              type="button"
              onClick={pantallaCompleta}
              className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-mist-soft transition hover:bg-white/10 hover:text-white"
              aria-label={completa ? "Salir de pantalla completa" : "Ver en pantalla completa"}
              title={completa ? "Salir de pantalla completa" : "Ver en pantalla completa"}
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
            {capitulos.map((capitulo, i) => (
              <button
                key={capitulo.titulo}
                type="button"
                onClick={() => irA(i)}
                className="group py-1.5"
                style={{ flexGrow: finDe(i, DURACION) - capitulo.t, flexBasis: 0 }}
                aria-label={`Ir a: ${capitulo.titulo}`}
                title={capitulo.titulo}
              >
                <span className="block h-1 overflow-hidden rounded-full bg-white/15 transition-colors group-hover:bg-white/30">
                  <span
                    ref={(el) => {
                      rellenosRef.current[i] = el;
                    }}
                    className="block h-full origin-left rounded-full bg-accent"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[12.5px] text-mist-faint">
        Grabación real de la app con un camping de demostración.
      </figcaption>
    </figure>
  );
}
