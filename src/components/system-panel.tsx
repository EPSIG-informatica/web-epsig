import { getT } from "@/lib/i18n-server";

// Nodos del diagrama: posición en % del lienzo (coinciden con los extremos de las líneas del SVG).
const nodes = [
  { key: "hub", label: { es: "Odoo ERP", ca: "Odoo ERP", en: "Odoo ERP" }, sub: { es: "Núcleo", ca: "Nucli", en: "Core" }, x: "50%", y: "22%" },
  { key: "n2", label: { es: "CRM", ca: "CRM", en: "CRM" }, sub: { es: "Leads", ca: "Leads", en: "Leads" }, x: "19%", y: "51%" },
  { key: "n3", label: { es: "Ventas", ca: "Vendes", en: "Sales" }, sub: { es: "Pedidos", ca: "Comandes", en: "Orders" }, x: "81%", y: "51%" },
  { key: "n4", label: { es: "Inventario", ca: "Inventari", en: "Inventory" }, sub: { es: "Stock", ca: "Estoc", en: "Stock" }, x: "24%", y: "85%" },
  { key: "n5", label: { es: "Contabilidad", ca: "Comptabilitat", en: "Accounting" }, sub: { es: "Asientos", ca: "Assentaments", en: "Entries" }, x: "76%", y: "85%" },
] as const;

export default async function SystemPanel() {
  const t = await getT();
  return (
    <div className="rounded-panel border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
      <div className="mb-4.5 flex items-center justify-between">
        <span className="font-mono text-xs text-mist-soft">{t("tu-empresa.odoo", "la-teua-empresa.odoo", "your-business.odoo")}</span>
        <div className="flex gap-1.5">
          <i className="block h-2 w-2 rounded-full bg-white/20" />
          <i className="block h-2 w-2 rounded-full bg-white/20" />
          <i className="block h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>

      <div className="relative h-[270px]">
        <svg viewBox="0 0 320 260" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M160,58 L60,132" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" fill="none" />
          <path d="M160,58 L260,132" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" fill="none" />
          <path
            d="M60,132 L260,132"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            className="flow-line-live"
          />
          <path d="M60,132 L78,220" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" fill="none" />
          <path d="M260,132 L242,220" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" fill="none" />
        </svg>

        {nodes.map((node) => (
          <Node key={node.key} label={t(node.label)} sub={t(node.sub)} x={node.x} y={node.y} hub={node.key === "hub"} />
        ))}
      </div>

      <div className="mt-4 flex justify-between font-mono text-[11.5px] text-mist-faint">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
          {t("Estado: conectado", "Estat: connectat", "Status: connected")}
        </span>
        <span>{t("5 módulos activos", "5 mòduls actius", "5 active modules")}</span>
      </div>
    </div>
  );
}

function Node({ label, sub, x, y, hub }: { label: string; sub: string; x: string; y: string; hub?: boolean }) {
  return (
    <div
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 shadow-[0_10px_24px_-12px_rgba(0,0,0,.7)] ${
        hub
          ? "border-primary-light/50 bg-primary text-white"
          : "border-white/15 bg-surface-dark-2/90 text-white backdrop-blur-sm"
      }`}
      style={{ left: x, top: y }}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${hub ? "bg-white" : "bg-accent"}`}
        aria-hidden
      />
      <span className={`font-semibold ${hub ? "text-[13px]" : "text-[12px]"}`}>{label}</span>
      <span className={`hidden font-mono text-[10px] sm:inline ${hub ? "text-white/75" : "text-mist-soft"}`}>{sub}</span>
    </div>
  );
}
