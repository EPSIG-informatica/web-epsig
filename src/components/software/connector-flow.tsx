import Icon from "@/components/icons";
import { getT } from "@/lib/i18n-server";

// Diagrama del recorrido de los datos entre programas: nodos de cristal unidos por trazas
// de circuito con pulsos de luz (.trace-pulse). Solo CSS, componente de servidor.
const nodes = [
  { name: "Forvenues", icon: "sales", role: { es: "Venta de entradas", ca: "Venda d'entrades", en: "Ticket sales" } },
  { name: "Ágora", icon: "pos", role: { es: "TPV y ventas", ca: "TPV i vendes", en: "POS and sales" } },
  { name: "Sage", icon: "accounting", role: { es: "Contabilidad", ca: "Comptabilitat", en: "Accounting" } },
  { name: "FACe", icon: "shield", role: { es: "Factura electrónica", ca: "Factura electrònica", en: "E-invoicing" } },
] as const;

const links = [
  { es: "Automático", ca: "Automàtic", en: "Automatic" },
  { es: "Cada día", ca: "Cada dia", en: "Every day" },
  { es: "Automático", ca: "Automàtic", en: "Automatic" },
] as const;

export default async function ConnectorFlow() {
  const t = await getT();
  return (
    <div
      role="img"
      aria-label={t(
        "Recorrido de los datos: Forvenues envía las ventas de entradas a Ágora, Ágora envía las ventas a Sage cada día y Sage envía las facturas a FACe.",
        "Recorregut de les dades: Forvenues envia les vendes d'entrades a Ágora, Ágora envia les vendes a Sage cada dia i Sage envia les factures a FACe.",
        "Data journey: Forvenues sends ticket sales to Ágora, Ágora sends sales to Sage every day, and Sage sends invoices to FACe.",
      )}
      className="relative"
    >
      {/* Resplandor bajo el recorrido */}
      <div
        className="pointer-events-none absolute inset-x-[10%] top-1/2 h-40 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(61,143,224,.35), transparent 70%)" }}
        aria-hidden
      />
      <ol className="relative flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
        {nodes.map((node, index) => (
          <li
            key={node.name}
            className="hero-in flex flex-col items-center lg:min-w-0 lg:flex-1 lg:flex-row"
            style={{ "--d": `${560 + index * 140}ms` } as React.CSSProperties}
          >
            <div
              className="glass card-spotlight flex w-full items-center gap-4 rounded-brand p-4 backdrop-blur-sm sm:p-5 lg:flex-col lg:gap-3 lg:text-center"
            >
              <span className="relative shrink-0" aria-hidden>
                <span className="icon-tile-dark h-11 w-11 shadow-[0_0_30px_-6px_rgba(61,143,224,.7)]">
                  <Icon name={node.icon} className="h-5 w-5" />
                </span>
                <span className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full border border-accent/40 bg-surface-dark px-1 font-mono text-[9.5px] font-medium text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[17px] font-semibold text-white">{node.name}</span>
                <span className="block text-[12.5px] text-mist-soft">{t(node.role)}</span>
              </span>
            </div>

            {index < links.length && (
              <div className="relative flex h-16 w-full items-center justify-center lg:h-auto lg:w-24 lg:shrink-0" aria-hidden>
                {/* Traza vertical (móvil y tableta) */}
                <svg
                  className="absolute inset-y-0 left-1/2 h-full w-3 -translate-x-1/2 overflow-visible lg:hidden"
                  viewBox="0 0 2 64"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M1,0 L1,64" stroke="rgba(140,195,239,.22)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  <path
                    d="M1,0 L1,64"
                    pathLength={100}
                    stroke="#b5dcfb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="trace-pulse"
                    style={{ "--td": `${index * 0.9}s`, strokeDasharray: "28 72", filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                  />
                </svg>
                {/* Traza horizontal (escritorio) */}
                <svg
                  className="absolute inset-x-0 top-1/2 hidden h-3 w-full -translate-y-1/2 overflow-visible lg:block"
                  viewBox="0 0 96 2"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M0,1 L96,1" stroke="rgba(140,195,239,.22)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  <path
                    d="M0,1 L96,1"
                    pathLength={100}
                    stroke="#b5dcfb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="trace-pulse"
                    style={{ "--td": `${index * 0.9}s`, strokeDasharray: "28 72", filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                  />
                </svg>
                <span className="relative rounded-full border border-accent/40 bg-surface-dark/90 px-2.5 py-1 font-mono text-[10.5px] whitespace-nowrap text-ice shadow-[0_0_20px_-6px_rgba(90,169,230,.8)] backdrop-blur">
                  {t(links[index])}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
