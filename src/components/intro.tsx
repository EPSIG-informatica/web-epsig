import Image from "next/image";
import logoWhite from "@/assets/logo-epsig-white.png";

/**
 * Script que corre antes de pintar la página: marca `.js` (activa las animaciones de entrada)
 * y decide si se muestra la intro (solo la primera visita de la sesión y sin "reducir movimiento").
 */
export const introScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(!sessionStorage.getItem('epsig-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro');sessionStorage.setItem('epsig-intro','1');setTimeout(function(){d.classList.remove('intro')},2300)}}catch(e){}})();`;

/**
 * Intro de marca: se dibuja el anillo del logotipo, aparece la "e" y se despliega el
 * logotipo completo; después la pantalla se recoge hacia arriba. Solo CSS (globals.css).
 */
export default function Intro() {
  return (
    <div className="intro-screen" aria-hidden>
      <div
        className="intro-glow absolute h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(61,143,224,.35), transparent 65%)" }}
      />
      <div className="relative grid place-items-center">
        <svg viewBox="0 0 100 100" className="intro-mark col-start-1 row-start-1 h-24 w-24" fill="none">
          <path
            className="intro-ring"
            pathLength={1}
            d="M90 50 A40 40 0 1 0 60.4 88.6"
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <g className="intro-e">
            <path d="M58 82 L76 89 L60 98 Z" fill="white" />
            <path
              d="M29 51 H71 A21 21 0 1 0 64 66"
              stroke="white"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <Image
          src={logoWhite}
          alt=""
          priority={false}
          sizes="260px"
          className="intro-logo col-start-1 row-start-1 h-auto w-[230px] sm:w-[260px]"
        />
      </div>
    </div>
  );
}
