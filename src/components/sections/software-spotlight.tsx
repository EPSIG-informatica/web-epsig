import Link from "@/components/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import Icon from "@/components/icons";
import { software } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

// Bloque de la portada con el software propio: cada tarjeta lleva una mini animación del producto.
export default async function SoftwareSpotlight() {
  const t = await getT();
  const cards = [
    { item: software.camping, cta: t("Descubrir", "Descobrir", "Discover"), art: <CampingArt /> },
    { item: software.viviendas, cta: t("Ver el software", "Veure el software", "See the software"), art: <HousingArt /> },
    { item: software.conectores, cta: t("Ver conectores", "Veure connectors", "See connectors"), art: <ConnectorArt /> },
  ];

  return (
    <section className="bg-surface py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t("Software propio", "Software propi", "Our own software")}
          title={t(
            "Herramientas que hemos creado para problemas reales",
            "Eines que hem creat per a problemes reals",
            "Tools we have built to solve real problems",
          )}
          body={t(
            "Además de implantar software, desarrollamos el nuestro cuando ningún programa resuelve bien el problema.",
            "A més d'implantar programari, desenvolupem el nostre quan cap programa no resol bé el problema.",
            "As well as implementing software, we build our own when no existing program solves the problem properly.",
          )}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ item, cta, art }, index) => (
            <Reveal key={item.href} className="h-full" delay={index * 0.1}>
              <Link
                href={item.href}
                className="card-spotlight group flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface p-2"
              >
                <div
                  data-observe
                  className="relative h-52 overflow-hidden rounded-[22px] border border-line bg-surface-alt"
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage: "radial-gradient(rgba(42,107,165,.14) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  {art}
                </div>
                <div className="flex flex-1 flex-col p-5 pt-6">
                  <span className="text-[20px] font-semibold tracking-tight text-ink">{t(item.title)}</span>
                  <span className="mt-2 block flex-1 text-[14.5px] leading-relaxed text-ink-soft">{t(item.summary)}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Parcelas que se van encendiendo + contador de kWh.
function CampingArt() {
  const on = [0, 1, 4, 6, 7, 9, 10, 13];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className={`pitch h-7 w-7 rounded-lg border ${on.includes(i) ? "pitch-on border-accent/40" : "border-line bg-white"}`}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
      <span className="glass-light absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-ink">
        <Icon name="bolt" className="h-3.5 w-3.5 text-[#d6a514]" />
        12,4 kWh
      </span>
    </div>
  );
}

// Viviendas con tareas que se completan.
function HousingArt() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-6">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          data-reveal="left"
          style={{ "--d": `${200 + i * 160}ms` } as React.CSSProperties}
          className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 shadow-[0_10px_24px_-20px_rgba(11,18,32,.5)]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-pale text-primary">
            <Icon name="home" className="h-4.5 w-4.5" />
          </span>
          <span className="flex-1">
            <span className="block h-1.5 w-[70%] rounded-full bg-ink/15" />
            <span className="mt-1.5 block h-1.5 w-[40%] rounded-full bg-ink/10" />
          </span>
          <span className="check grid h-5 w-5 place-items-center rounded-full bg-accent text-white" style={{ "--i": i } as React.CSSProperties}>
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2.5 6.2l2.2 2.2 4.8-4.8" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}

// Datos que viajan entre programas.
function ConnectorArt() {
  const apps = ["Forvenues", "Ágora", "Sage", "FACe"];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" fill="none">
        {["M70 55 C150 55 150 100 150 100", "M230 55 C150 55 150 100 150 100", "M70 150 C150 150 150 100 150 100", "M230 150 C150 150 150 100 150 100"].map(
          (d, i) => (
            <g key={d}>
              <path d={d} stroke="rgba(42,107,165,.25)" strokeWidth="1.5" strokeDasharray="3 4" />
              <path
                d={d}
                pathLength={100}
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="trace-pulse"
                style={{ "--td": `${i * 0.8}s` } as React.CSSProperties}
              />
            </g>
          ),
        )}
      </svg>
      <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white shadow-[0_14px_30px_-12px_rgba(11,18,32,.7)]">
        <Icon name="link" className="h-5 w-5" />
      </span>
      {apps.map((app, i) => (
        <span
          key={app}
          className="float absolute rounded-full border border-line bg-white px-3 py-1.5 font-mono text-[11px] font-medium text-ink shadow-[0_8px_20px_-14px_rgba(11,18,32,.5)]"
          style={{
            left: i % 2 ? "auto" : "6%",
            right: i % 2 ? "6%" : "auto",
            top: i < 2 ? "18%" : "auto",
            bottom: i < 2 ? "auto" : "18%",
            "--fd": `${i * 0.6}s`,
          } as React.CSSProperties}
        >
          {app}
        </span>
      ))}
    </div>
  );
}
