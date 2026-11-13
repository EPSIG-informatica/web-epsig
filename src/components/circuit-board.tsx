import Icon, { moduleIcons } from "@/components/icons";
import { odooModules } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

// Lienzo 1200×420. Los módulos de Odoo se conectan al núcleo con pistas de circuito por las que
// viajan pulsos de luz. Las posiciones de los nodos coinciden con el inicio de cada pista.
const W = 1200;
const H = 420;

const traces = [
  { d: "M150 120 H300 L375 195 H525", node: 0, x: 110, y: 120 },
  { d: "M100 262 H342 L374 230 H525", node: 1, x: 60, y: 262 },
  { d: "M210 370 H300 L405 265 H525", node: 3, x: 170, y: 370 },
  { d: "M1050 120 H900 L825 195 H675", node: 4, x: 1090, y: 120 },
  { d: "M1100 262 H858 L826 230 H675", node: 2, x: 1140, y: 262 },
  { d: "M990 370 H900 L795 265 H675", node: 6, x: 1030, y: 370 },
] as const;

// Pistas decorativas sin nodo (dan densidad al circuito).
const extra = [
  "M570 175 V130 L540 100 V40",
  "M600 175 V20",
  "M630 175 V130 L660 100 V40",
  "M570 285 V340 L530 380 V420",
  "M630 285 V340 L670 380 V420",
  "M0 190 H70 L100 160 H180",
  "M1200 190 H1130 L1100 160 H1020",
  "M300 120 V60 L330 30 H460",
  "M900 120 V60 L870 30 H740",
];

export default async function CircuitBoard() {
  const t = await getT();
  return (
    <div className="relative mx-auto aspect-[1200/420] w-full max-w-[1200px]" aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="chip-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5aa9e6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5aa9e6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="trace-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8cc3ef" stopOpacity="0" />
            <stop offset="0.3" stopColor="#8cc3ef" stopOpacity="0.18" />
            <stop offset="1" stopColor="#8cc3ef" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <ellipse cx="600" cy="230" rx="260" ry="170" fill="url(#chip-glow)" className="blob-drift" />

        {/* Pistas base */}
        <g stroke="rgba(140,195,239,.16)" strokeWidth="1.5">
          {extra.map((d, i) => (
            <path key={d} d={d} pathLength={100} className="trace-draw" style={{ "--td": `${0.6 + i * 0.05}s` } as React.CSSProperties} />
          ))}
        </g>
        <g stroke="rgba(140,195,239,.28)" strokeWidth="1.6">
          {traces.map((tr, i) => (
            <path key={tr.d} d={tr.d} pathLength={100} className="trace-draw" style={{ "--td": `${0.4 + i * 0.08}s` } as React.CSSProperties} />
          ))}
        </g>

        {/* Pulsos de luz */}
        <g strokeWidth="2.6" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px #5aa9e6) drop-shadow(0 0 2px #b5dcfb)" }}>
          {traces.map((tr, i) => (
            <path
              key={tr.d}
              d={tr.d}
              pathLength={100}
              stroke={i % 2 ? "#b5dcfb" : "#5aa9e6"}
              className="trace-pulse"
              style={{ "--td": `${(i * 0.55) % 3.4}s`, animationDuration: `${2.6 + (i % 3) * 0.5}s` } as React.CSSProperties}
            />
          ))}
          {extra.slice(0, 5).map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={100}
              stroke="#8cc3ef"
              strokeWidth="2"
              className="trace-pulse"
              style={{ "--td": `${1 + i * 0.7}s`, animationDuration: "3.8s" } as React.CSSProperties}
            />
          ))}
        </g>

        {/* Pines del núcleo */}
        <g fill="#8cc3ef">
          {[195, 230, 265].map((y) => (
            <g key={y}>
              <rect x="517" y={y - 2} width="8" height="4" rx="1" />
              <rect x="675" y={y - 2} width="8" height="4" rx="1" />
            </g>
          ))}
          {[570, 600, 630].map((x) => (
            <g key={x}>
              <rect x={x - 2} y="167" width="4" height="8" rx="1" />
              <rect x={x - 2} y="285" width="4" height="8" rx="1" />
            </g>
          ))}
        </g>
      </svg>

      {/* Núcleo: Odoo ERP */}
      <div
        className="hero-in absolute grid place-items-center"
        style={{
          left: `${(525 / W) * 100}%`,
          top: `${(175 / H) * 100}%`,
          width: `${(150 / W) * 100}%`,
          height: `${(110 / H) * 100}%`,
          "--d": "500ms",
        } as React.CSSProperties}
      >
        <div className="relative grid h-full w-full place-items-center rounded-[14%] border border-accent/40 bg-gradient-to-b from-[#123058] to-[#0a1830] shadow-[0_0_0_1px_rgba(181,220,251,.08)_inset,0_0_60px_-6px_rgba(61,143,224,.7)]">
          <div className="absolute inset-[7%] rounded-[12%] border border-white/[0.07]" />
          <span className="font-display text-[clamp(12px,2.3vw,28px)] leading-none font-bold tracking-tight text-white">Odoo</span>
        </div>
      </div>

      {/* Módulos conectados */}
      {traces.map((tr, i) => (
        <div
          key={tr.node}
          className="hero-in absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(tr.x / W) * 100}%`, top: `${(tr.y / H) * 100}%`, "--d": `${700 + i * 90}ms` } as React.CSSProperties}
        >
          <div className="float flex flex-col items-center gap-1.5" style={{ "--fd": `${i * 0.7}s` } as React.CSSProperties}>
            <span className="glass grid h-9 w-9 place-items-center rounded-xl text-mist-accent backdrop-blur-md sm:h-14 sm:w-14 sm:rounded-2xl">
              <Icon name={moduleIcons[tr.node]} className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            <span className="hidden whitespace-nowrap font-mono text-[10.5px] tracking-wider text-mist-faint uppercase sm:block">
              {t(odooModules[tr.node].label)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
