import { getT } from "@/lib/i18n-server";

// Diagrama del recorrido de los datos entre programas. Solo CSS (línea animada con .flow-line-live).
const nodes = [
  { name: "Forvenues", role: { es: "Venta de entradas", ca: "Venda d'entrades" } },
  { name: "Ágora", role: { es: "TPV y ventas", ca: "TPV i vendes" } },
  { name: "Sage", role: { es: "Contabilidad", ca: "Comptabilitat" } },
  { name: "FACe", role: { es: "Factura electrónica", ca: "Factura electrònica" } },
] as const;

const links = [
  { es: "Automático", ca: "Automàtic" },
  { es: "Cada día", ca: "Cada dia" },
  { es: "Automático", ca: "Automàtic" },
] as const;

export default async function ConnectorFlow() {
  const t = await getT();
  return (
    <div
      role="img"
      aria-label={t(
        "Recorrido de los datos: Forvenues envía las ventas de entradas a Ágora, Ágora envía las ventas a Sage cada día y Sage envía las facturas a FACe.",
        "Recorregut de les dades: Forvenues envia les vendes d'entrades a Ágora, Ágora envia les vendes a Sage cada dia i Sage envia les factures a FACe.",
      )}
      className="relative"
    >
      <ol className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
        {nodes.map((node, index) => (
          <li key={node.name} className="flex flex-col items-center lg:flex-1 lg:flex-row">
            <div className="flex w-full items-center gap-4 rounded-brand border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm lg:flex-col lg:gap-3 lg:p-5 lg:text-center">
              <span className="font-mono text-[12px] font-medium text-accent" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-display text-[17px] font-semibold text-white">{node.name}</span>
                <span className="block text-[12.5px] text-mist-soft">{t(node.role)}</span>
              </span>
            </div>

            {index < links.length && (
              <div className="relative flex h-14 w-full items-center justify-center lg:h-auto lg:w-24 lg:shrink-0" aria-hidden>
                {/* Línea vertical (móvil) */}
                <svg className="absolute inset-y-0 left-1/2 h-full w-2 -translate-x-1/2 lg:hidden" viewBox="0 0 2 56" preserveAspectRatio="none">
                  <path d="M1,0 L1,56" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 6" className="flow-line-live" fill="none" />
                </svg>
                {/* Línea horizontal (escritorio) */}
                <svg className="absolute inset-x-0 top-1/2 hidden h-2 w-full -translate-y-1/2 lg:block" viewBox="0 0 96 2" preserveAspectRatio="none">
                  <path d="M0,1 L96,1" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 6" className="flow-line-live" fill="none" />
                </svg>
                <span className="relative rounded-full border border-accent/40 bg-surface-dark px-2.5 py-1 font-mono text-[10.5px] text-accent">
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
