import Link from "@/components/link";
import SystemPanel from "@/components/system-panel";
import Reveal from "@/components/reveal";
import { getT } from "@/lib/i18n-server";

export default async function Hero() {
  const t = await getT();
  return (
    <header className="relative overflow-hidden bg-surface-dark pt-24 text-white sm:pt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 80%)",
        }}
        aria-hidden
      />
      <div
        className="blob-drift pointer-events-none absolute -right-30 -top-40 h-[520px] w-[520px] rounded-full blur-[10px]"
        style={{
          background: "radial-gradient(circle, rgba(42,107,165,.55), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="blob-drift-slow pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full blur-[10px]"
        style={{
          background: "radial-gradient(circle, rgba(90,169,230,.28), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="hero-in">
            <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {t("Partner oficial de Odoo · Agente Digitalizador", "Partner oficial d'Odoo · Agent Digitalitzador", "Official Odoo Partner · Digitalisation Agent")}
            </div>
          </div>
          <div className="hero-in" style={{ animationDelay: "80ms" }}>
            <h1 className="mt-5 mb-5.5 text-[38px] leading-[1.12] text-white sm:text-[48px]">
              {t(
                <>
                  El sistema que ayuda a tu empresa a{" "}
                  <em className="text-accent not-italic">funcionar mejor.</em>
                </>,
                <>
                  El sistema que ajuda la teua empresa a{" "}
                  <em className="text-accent not-italic">funcionar millor.</em>
                </>,
                <>
                  The system that helps your business{" "}
                  <em className="text-accent not-italic">run better.</em>
                </>,
              )}
            </h1>
          </div>
          <div className="hero-in" style={{ animationDelay: "160ms" }}>
            <p className="mb-8.5 max-w-[46ch] text-base leading-relaxed text-mist-soft sm:text-[17px]">
              {t(
                "Implantamos Odoo ERP y acompañamos a pymes de la Marina Alta, Valencia y la Safor a gestionar, digitalizar y proteger su negocio — en un solo sitio, no en tres proveedores distintos.",
                "Implantem Odoo ERP i acompanyem pimes de la Marina Alta, València i la Safor a gestionar, digitalitzar i protegir el seu negoci — en un sol lloc, no en tres proveïdors diferents.",
                "We implement Odoo ERP and help SMEs across the Marina Alta, Valencia and La Safor manage, digitalise and protect their business — all in one place, not spread across three different providers.",
              )}
            </p>
          </div>
          <div className="hero-in flex flex-wrap gap-3.5" style={{ animationDelay: "240ms" }}>
            <Link
              href="/contacto#diagnostico"
              className="inline-block rounded-full bg-accent-strong px-6.5 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(90,169,230,.6)] transition-transform hover:scale-[1.04] active:scale-[0.96]"
            >
              {t("Solicita un diagnóstico gratuito", "Sol·licita un diagnòstic gratuït", "Request a free assessment")}
            </Link>
            <Link
              href="/servicios/odoo"
              className="inline-block rounded-full border-[1.5px] border-white/25 px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:scale-[1.04] hover:border-white/50 active:scale-[0.96]"
            >
              {t("Cómo implantamos Odoo →", "Com implantem Odoo →", "How we implement Odoo →")}
            </Link>
          </div>
        </div>

        <Reveal direction="left" delay={0.15}>
          <SystemPanel />
        </Reveal>
      </div>
    </header>
  );
}
