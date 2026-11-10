import Link from "@/components/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import Icon from "@/components/icons";
import { pillars } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

// Bento oscuro con una ilustración animada por pilar.
export default async function Pillars() {
  const t = await getT();
  const [consulting, digital, protection] = pillars;
  const more = t("Saber más", "Saber-ne més", "Learn more");

  return (
    <section id="pilares" className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(42,107,165,.28), transparent 65%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          dark
          eyebrow={t("Cómo trabajamos", "Com treballem", "How we work")}
          title={t("Tres formas de ayudarte a funcionar mejor", "Tres maneres d'ajudar-te a funcionar millor", "Three ways to help your business run better")}
          body={t(
            "Ninguna vive aislada: cada proyecto de Odoo puede apoyarse en las tres.",
            "Cap no viu aïllada: cada projecte d'Odoo pot recolzar-se en les tres.",
            "None of them stands alone: every Odoo project can draw on all three.",
          )}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* 1 · Consultoría: gráfico que crece */}
          <Reveal className="lg:col-span-7" direction="scale">
            <BentoCard href={`/servicios/${consulting.slug}`} n={1} title={t(consulting.title)} body={t(consulting.summary)} more={more}>
              <div data-observe className="relative flex h-full items-end gap-[3%] px-6 pt-8 pb-0">
                {[38, 52, 44, 63, 58, 74, 69, 88].map((h, i) => (
                  <span
                    key={i}
                    className="grow-bar relative flex-1 rounded-t-lg bg-gradient-to-t from-primary/30 to-accent/80"
                    style={{ height: `${h}%`, "--bd": `${0.1 + i * 0.08}s` } as React.CSSProperties}
                  >
                    {i === 7 && (
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-accent/40 bg-surface-dark px-2.5 py-1 font-mono text-[10.5px] whitespace-nowrap text-ice">
                        +24%
                      </span>
                    )}
                  </span>
                ))}
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-6 top-8 bottom-0 h-[calc(100%-2rem)] w-[calc(100%-3rem)]">
                  <path
                    d="M0 30 L14 24 L28 27 L42 17 L57 19 L71 10 L85 12 L100 2"
                    fill="none"
                    stroke="#b5dcfb"
                    strokeWidth="0.6"
                    pathLength={100}
                    className="trace-draw"
                    vectorEffect="non-scaling-stroke"
                    style={{ "--td": "0.6s", filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                  />
                </svg>
              </div>
            </BentoCard>
          </Reveal>

          {/* 2 · Transformación digital: automatizaciones conectadas */}
          <Reveal className="lg:col-span-5" direction="scale" delay={0.1}>
            <BentoCard href={`/servicios/${digital.slug}`} n={2} title={t(digital.title)} body={t(digital.summary)} more={more}>
              <div className="relative h-full">
                <svg viewBox="0 0 300 180" className="absolute inset-0 h-full w-full" fill="none">
                  {["M40 40 H110 L130 90 H150", "M40 140 H110 L130 90 H150", "M260 40 H190 L170 90 H150", "M260 140 H190 L170 90 H150"].map((d, i) => (
                    <g key={d}>
                      <path d={d} stroke="rgba(140,195,239,.22)" strokeWidth="1.5" />
                      <path
                        d={d}
                        pathLength={100}
                        stroke="#8cc3ef"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        className="trace-pulse"
                        style={{ "--td": `${i * 0.6}s`, filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                      />
                    </g>
                  ))}
                </svg>
                <span className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-accent/40 bg-gradient-to-b from-[#123058] to-[#0a1830] text-ice shadow-[0_0_40px_-4px_rgba(61,143,224,.7)]">
                  <Icon name="spark" className="h-7 w-7 animate-[spin_12s_linear_infinite]" />
                </span>
                {[
                  { icon: "accounting", x: "13%", y: "22%" },
                  { icon: "crm", x: "13%", y: "78%" },
                  { icon: "sales", x: "87%", y: "22%" },
                  { icon: "inventory", x: "87%", y: "78%" },
                ].map((node, i) => (
                  <span
                    key={node.icon}
                    className="glass float absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl text-mist-accent"
                    style={{ left: node.x, top: node.y, "--fd": `${i * 0.8}s` } as React.CSSProperties}
                  >
                    <Icon name={node.icon} className="h-5 w-5" />
                  </span>
                ))}
              </div>
            </BentoCard>
          </Reveal>

          {/* 3 · Protección: escudo y registro de amenazas */}
          <Reveal className="lg:col-span-12" direction="scale" delay={0.15}>
            <BentoCard
              href={`/servicios/${protection.slug}`}
              n={3}
              title={t(protection.title)}
              body={t(protection.summary)}
              more={more}
              wide
            >
              <div className="relative grid h-full grid-cols-[auto_1fr] items-center gap-6 px-6 sm:px-10">
                <div className="relative grid h-32 w-32 place-items-center overflow-hidden rounded-[28px] border border-accent/30 bg-gradient-to-b from-[#10284a] to-[#081426] shadow-[0_0_60px_-10px_rgba(61,143,224,.6)]">
                  <Icon name="shield" className="h-14 w-14 text-ice" />
                  <span className="scan-line absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-accent/35 to-transparent" />
                </div>
                <ul className="flex flex-col gap-2 font-mono text-[11.5px] sm:text-[12.5px]">
                  {[
                    { label: t("Servidor protegido", "Servidor protegit", "Server protected"), ok: true },
                    { label: t("Amenaza bloqueada · web", "Amenaça bloquejada · web", "Threat blocked · website"), ok: false },
                    { label: t("Copias de seguridad al día", "Còpies de seguretat al dia", "Backups up to date"), ok: true },
                    { label: t("Equipos actualizados", "Equips actualitzats", "Workstations updated"), ok: true },
                  ].map((row, i) => (
                    <li
                      key={row.label}
                      data-reveal="left"
                      style={{ "--d": `${300 + i * 140}ms` } as React.CSSProperties}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5 text-mist"
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full ${row.ok ? "bg-accent shadow-[0_0_10px_#5aa9e6]" : "bg-[#f5b14c] shadow-[0_0_10px_#f5b14c]"}`} />
                      <span className="truncate">{row.label}</span>
                      <span className="ml-auto text-mist-faint">{row.ok ? "OK" : "ESET"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  href,
  n,
  title,
  body,
  more,
  wide = false,
  children,
}: {
  href: string;
  n: number;
  title: string;
  body: string;
  more: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`card-spotlight glass group flex h-full overflow-hidden rounded-panel ${
        wide ? "flex-col lg:flex-row-reverse lg:items-stretch" : "flex-col"
      }`}
    >
      <div className={`relative ${wide ? "h-56 lg:h-auto lg:w-[55%] lg:py-10" : "h-56 sm:h-64"}`}>{children}</div>
      <div className={`relative p-7 sm:p-8 ${wide ? "lg:w-[45%] lg:self-center" : ""}`}>
        <span className="font-mono text-[12px] text-accent">{String(n).padStart(2, "0")}</span>
        <h3 className="mt-2 text-[22px] text-white sm:text-[26px]">{title}</h3>
        <p className="mt-2.5 max-w-[48ch] text-[14.5px] leading-relaxed text-mist-soft">{body}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ice">
          {more}
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
