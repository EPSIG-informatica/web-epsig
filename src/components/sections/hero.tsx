import Link from "@/components/link";
import HeroBackdrop from "@/components/hero-backdrop";
import SplitText from "@/components/split-text";
import CircuitBoard from "@/components/circuit-board";
import { getT } from "@/lib/i18n-server";

export default async function Hero() {
  const t = await getT();
  return (
    // En pantallas grandes la cabecera ocupa exactamente la pantalla: texto arriba y el circuito
    // de Odoo debajo, que se escala para caber entero en el espacio que queda (ver `.hero-home`).
    <header className="hero-home relative overflow-hidden bg-surface-dark pb-10 text-white sm:pb-16 lg:flex lg:h-svh lg:min-h-[640px] lg:flex-col lg:pb-6">
      <HeroBackdrop />

      <div className="relative mx-auto max-w-5xl shrink-0 px-6 text-center">
        <div className="hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>
          <span className="eyebrow eyebrow-dark">
            <span className="dot" aria-hidden />
            {t("Partner oficial de Odoo · Agente Digitalizador", "Partner oficial d'Odoo · Agent Digitalitzador", "Official Odoo Partner · Digitalisation Agent")}
          </span>
        </div>

        <SplitText
          as="h1"
          trigger="load"
          delay={120}
          className="mx-auto mt-7 max-w-[17ch] text-[40px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[64px] lg:mt-5 lg:max-w-[20ch] lg:text-[clamp(42px,6.6vh,68px)]"
          text={t(
            ["El sistema que ayuda a tu empresa a", { text: "funcionar mejor.", className: "text-shine" }],
            ["El sistema que ajuda la teua empresa a", { text: "funcionar millor.", className: "text-shine" }],
            ["The system that helps your business", { text: "run better.", className: "text-shine" }],
          )}
        />

        <p
          className="hero-in mx-auto mt-7 max-w-[58ch] text-[16px] leading-relaxed text-mist-soft sm:text-[18px] lg:mt-4 lg:max-w-[70ch] lg:text-[17px]"
          style={{ "--d": "650ms" } as React.CSSProperties}
        >
          {t(
            "Implantamos Odoo ERP y acompañamos a pymes de la Marina Alta, Valencia y la Safor a gestionar, digitalizar y proteger su negocio — en un solo sitio, no en tres proveedores distintos.",
            "Implantem Odoo ERP i acompanyem pimes de la Marina Alta, València i la Safor a gestionar, digitalitzar i protegir el seu negoci — en un sol lloc, no en tres proveïdors diferents.",
            "We implement Odoo ERP and help SMEs across the Marina Alta, Valencia and La Safor manage, digitalise and protect their business — all in one place, not spread across three different providers.",
          )}
        </p>

        <div
          className="hero-in mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:mt-6"
          style={{ "--d": "800ms" } as React.CSSProperties}
        >
          <Link href="/contacto#diagnostico" data-magnetic className="btn btn-primary">
            {t("Solicita un diagnóstico gratuito", "Sol·licita un diagnòstic gratuït", "Request a free assessment")}
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
          <Link href="/servicios/odoo" data-magnetic className="btn btn-ghost">
            {t("Cómo implantamos Odoo", "Com implantem Odoo", "How we implement Odoo")}
          </Link>
        </div>
      </div>

      <div className="hero-circuit relative mt-12 px-3 sm:mt-16 sm:px-6 lg:mt-4 lg:flex lg:min-h-0 lg:flex-1 lg:items-center">
        <div className="hero-circuit-fit mx-auto">
          <CircuitBoard />
        </div>
      </div>
    </header>
  );
}
