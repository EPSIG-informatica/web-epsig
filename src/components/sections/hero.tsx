import Link from "@/components/link";
import HeroBackdrop from "@/components/hero-backdrop";
import SplitText from "@/components/split-text";
import CircuitBoard from "@/components/circuit-board";
import { getT } from "@/lib/i18n-server";

export default async function Hero() {
  const t = await getT();
  return (
    <header className="relative overflow-hidden bg-surface-dark pb-10 text-white sm:pb-16">
      <HeroBackdrop />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
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
          className="mx-auto mt-7 max-w-[17ch] text-[40px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[76px]"
          text={t(
            ["El sistema que ayuda a tu empresa a", { text: "funcionar mejor.", className: "text-shine" }],
            ["El sistema que ajuda la teua empresa a", { text: "funcionar millor.", className: "text-shine" }],
            ["The system that helps your business", { text: "run better.", className: "text-shine" }],
          )}
        />

        <p
          className="hero-in mx-auto mt-7 max-w-[58ch] text-[16px] leading-relaxed text-mist-soft sm:text-[18px]"
          style={{ "--d": "650ms" } as React.CSSProperties}
        >
          {t(
            "Implantamos Odoo ERP y acompañamos a pymes de la Marina Alta, Valencia y la Safor a gestionar, digitalizar y proteger su negocio — en un solo sitio, no en tres proveedores distintos.",
            "Implantem Odoo ERP i acompanyem pimes de la Marina Alta, València i la Safor a gestionar, digitalitzar i protegir el seu negoci — en un sol lloc, no en tres proveïdors diferents.",
            "We implement Odoo ERP and help SMEs across the Marina Alta, Valencia and La Safor manage, digitalise and protect their business — all in one place, not spread across three different providers.",
          )}
        </p>

        <div
          className="hero-in mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
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

      <div className="relative mt-12 px-3 sm:mt-16 sm:px-6">
        <CircuitBoard />
      </div>
    </header>
  );
}
