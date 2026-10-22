import Breadcrumbs from "@/components/breadcrumbs";
import { ServiceSchema } from "@/components/structured-data";

export default function PageHero({
  eyebrow,
  title,
  lead,
  path,
  service,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Ruta interna de la página ("/servicios/odoo"): muestra la ruta de navegación. */
  path?: string;
  /** Nombre del servicio que presenta la página: se describe para Google con `lead`. */
  service?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-surface-dark pt-20 pb-16 text-white sm:pt-24 sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 80%)",
        }}
        aria-hidden
      />
      <div
        className="blob-drift pointer-events-none absolute -left-24 -top-32 h-[380px] w-[380px] rounded-full blur-[10px]"
        style={{ background: "radial-gradient(circle, rgba(42,107,165,.45), transparent 70%)" }}
        aria-hidden
      />
      <div className="hero-in relative mx-auto max-w-3xl px-6 text-center">
        {path && <Breadcrumbs path={path} className="mb-6" />}
        {path && service && <ServiceSchema path={path} name={service} description={lead} />}
        <div className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-mist-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {eyebrow}
        </div>
        <h1 className="mt-4 text-[34px] leading-[1.15] text-white sm:text-[42px]">{title}</h1>
        {lead && (
          <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-mist-soft">
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
