import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import Icon from "@/components/icons";
import { site } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

// Zona de trabajo: las dos oficinas unidas por una pista de luz que pasa por las tres comarcas.
export default async function Zone() {
  const t = await getT();
  const [gata, valencia] = site.offices;

  return (
    <section className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
      <div className="stars pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[520px] w-[1100px] max-w-[160%] -translate-x-1/2 rounded-[50%]"
        style={{ background: "radial-gradient(ellipse, rgba(42,107,165,.32), transparent 65%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          dark
          eyebrow={t("Zona de actuación", "Zona d'actuació", "Where we work")}
          title={t("Trabajamos cerca de ti", "Treballem a prop teu", "We work close to you")}
          body={t(
            "Oficinas en Gata de Gorgos y Valencia para estar en tu empresa cuando hace falta.",
            "Oficines a Gata de Gorgos i València per a estar a la teua empresa quan cal.",
            "Offices in Gata de Gorgos and Valencia, so we can be at your business when needed.",
          )}
        />

        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          <OfficeCard office={valencia} t={t} delay={0} />

          {/* Pista de luz entre oficinas con las comarcas como nodos */}
          <Reveal direction="none" delay={0.2} className="relative flex justify-center sm:order-last sm:col-span-2 lg:order-none lg:col-span-1 lg:w-[300px] xl:w-[340px]">
            <svg viewBox="0 0 320 60" className="hidden h-[60px] w-full lg:block" fill="none" aria-hidden>
              <path d="M0 30 H320" stroke="rgba(140,195,239,.25)" strokeWidth="1.5" strokeDasharray="4 6" />
              <path
                d="M0 30 H320"
                pathLength={100}
                stroke="#b5dcfb"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="trace-pulse"
                style={{ filter: "drop-shadow(0 0 6px #5aa9e6)" }}
              />
              <path
                d="M320 30 H0"
                pathLength={100}
                stroke="#5aa9e6"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="trace-pulse"
                style={{ "--td": "1.7s", filter: "drop-shadow(0 0 6px #5aa9e6)" } as React.CSSProperties}
              />
            </svg>
            <ul className="flex flex-wrap justify-center gap-2 lg:absolute lg:inset-x-0 lg:top-1/2 lg:-translate-y-1/2 lg:justify-between lg:px-2">
              {site.zones.map((zone, i) => (
                <li
                  key={zone.es}
                  className="float inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-surface-dark px-3 py-1.5 text-[12px] font-semibold text-mist shadow-[0_0_24px_-6px_rgba(61,143,224,.7)]"
                  style={{ "--fd": `${i * 0.7}s` } as React.CSSProperties}
                >
                  <Icon name="pin" className="h-3.5 w-3.5 text-accent" />
                  {t(zone)}
                </li>
              ))}
            </ul>
          </Reveal>

          <OfficeCard office={gata} t={t} delay={0.15} />
        </div>
      </div>
    </section>
  );
}

function OfficeCard({
  office,
  t,
  delay,
}: {
  office: (typeof site.offices)[number];
  t: Awaited<ReturnType<typeof getT>>;
  delay: number;
}) {
  return (
    <Reveal delay={delay} direction="scale" className="h-full">
      <a
        href={office.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="card-spotlight glass group flex h-full flex-col rounded-panel p-7 sm:p-8"
      >
        <div className="flex items-center justify-between">
          <span className="icon-tile-dark">
            <Icon name="pin" className="h-6 w-6" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.16em] text-mist-faint uppercase">
            {t("Oficina", "Oficina", "Office")}
          </span>
        </div>
        <h3 className="mt-6 text-[24px] text-white">{t(office.name)}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-mist-soft">
          {office.address}
          <br />
          {t(office.locality)}
        </p>
        <ul className="mt-4 flex flex-col gap-1 text-[13px] text-mist-faint">
          {office.hours.map((line) => (
            <li key={line.es}>{t(line)}</li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ice">
          {t("Cómo llegar", "Com arribar", "Get directions")}
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            ↗
          </span>
          <span className="sr-only">
            {t(" (Google Maps, se abre en una pestaña nueva)", " (Google Maps, s'obri en una pestanya nova)", " (Google Maps, opens in a new tab)")}
          </span>
        </span>
      </a>
    </Reveal>
  );
}
