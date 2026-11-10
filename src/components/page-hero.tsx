import Breadcrumbs from "@/components/breadcrumbs";
import HeroBackdrop from "@/components/hero-backdrop";
import SplitText from "@/components/split-text";
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
    <header className="relative overflow-hidden bg-surface-dark pb-20 text-white sm:pb-28">
      <HeroBackdrop />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {path && (
          <div className="hero-in" style={{ "--d": "0ms" } as React.CSSProperties}>
            <Breadcrumbs path={path} className="mb-7" />
          </div>
        )}
        {path && service && <ServiceSchema path={path} name={service} description={lead} />}
        <div className="hero-in" style={{ "--d": "80ms" } as React.CSSProperties}>
          <span className="eyebrow eyebrow-dark">
            <span className="dot" aria-hidden />
            {eyebrow}
          </span>
        </div>
        <SplitText
          as="h1"
          trigger="load"
          delay={160}
          text={title}
          className="mt-6 text-[36px] leading-[1.06] text-white sm:text-[54px]"
        />
        {lead && (
          <p
            className="hero-in mx-auto mt-6 max-w-[58ch] text-[16.5px] leading-relaxed text-mist-soft sm:text-[17.5px]"
            style={{ "--d": "480ms" } as React.CSSProperties}
          >
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
