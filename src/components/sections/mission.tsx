import Reveal from "@/components/reveal";
import CountUp from "@/components/count-up";
import { odooModules, site } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

type Part = { text: string; strong?: boolean };

// La frase se "ilumina" palabra a palabra según se avanza con el scroll (--scroll-p lo pone `Motion`).
export default async function Mission() {
  const t = await getT();
  const parts: Part[] = t<Part[]>(
    [
      { text: "Ayudamos a las empresas a" },
      { text: "mejorar su gestión,", strong: true },
      { text: "digitalizar sus procesos", strong: true },
      { text: "y" },
      { text: "proteger su negocio.", strong: true },
    ],
    [
      { text: "Ajudem les empreses a" },
      { text: "millorar la seua gestió,", strong: true },
      { text: "digitalitzar els seus processos", strong: true },
      { text: "i" },
      { text: "protegir el seu negoci.", strong: true },
    ],
    [
      { text: "We help businesses" },
      { text: "improve their management,", strong: true },
      { text: "digitalise their processes", strong: true },
      { text: "and" },
      { text: "protect their operations.", strong: true },
    ],
  );

  const words = parts.flatMap((part) => part.text.split(" ").map((word) => ({ word, strong: !!part.strong })));
  const total = words.length;

  const stats = [
    {
      value: <CountUp value={site.foundedYear} from={2000} />,
      label: t("Año en que empezamos a acompañar empresas", "Any en què vam començar a acompanyar empreses", "The year we started supporting businesses"),
    },
    {
      value: <CountUp value={site.offices.length} />,
      label: t("Oficinas: Gata de Gorgos y Valencia", "Oficines: Gata de Gorgos i València", "Offices: Gata de Gorgos and Valencia"),
    },
    {
      value: <CountUp value={odooModules.length} suffix="+" />,
      label: t("Módulos de Odoo que implantamos", "Mòduls d'Odoo que implantem", "Odoo apps we implement"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-surface py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary-pale/70 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <p
          data-scroll-progress
          className="text-center font-display text-[30px] leading-[1.18] font-semibold tracking-[-0.025em] sm:text-[46px] lg:text-[54px]"
        >
          {words.map(({ word, strong }, i) => (
            <span key={i}>
              <span
                className={`transition-colors duration-300 ${strong ? "text-primary" : "text-ink"}`}
                style={{
                  opacity: `clamp(0.14, calc(((var(--scroll-p, 1) - 0.18) / 0.34 - ${(i / total).toFixed(3)}) * 9 + 0.14), 1)`,
                }}
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>
        <Reveal className="mt-6 text-center">
          <small className="font-mono text-[12.5px] tracking-[0.16em] text-ink-faint">
            {t("ESTE ES EL PORQUÉ DETRÁS DE CADA SERVICIO DE EPSIG", "ESTE ÉS EL PERQUÈ DE CADA SERVEI D'EPSIG", "THIS IS THE WHY BEHIND EVERY EPSIG SERVICE")}
          </small>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1}>
              <div className="card-spotlight h-full rounded-brand border border-line bg-surface p-7 text-center">
                <div className="font-display text-[52px] leading-none font-bold tracking-[-0.04em] text-ink">
                  {stat.value}
                </div>
                <p className="mx-auto mt-3 max-w-[24ch] text-[14px] leading-snug text-ink-soft">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
