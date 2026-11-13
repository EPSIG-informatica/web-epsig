import type { Locale } from "@/lib/i18n";

// Pantallas de ejemplo de cada módulo de Odoo para el explorador de la portada.
// Datos inventados y genéricos (sin nombres de empresas, personas ni lugares), solo ilustrativos.

type L = { es: string; ca: string; en: string };
const tr = (lang: Locale, l: L) => l[lang];

function eur(lang: Locale, value: number, decimals = 0) {
  return new Intl.NumberFormat(lang === "en" ? "en-GB" : "es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: true,
  }).format(value);
}

const item = (i: number) => ({ "--i": i }) as React.CSSProperties;

// Avatar genérico (silueta), sin nombres ni iniciales.
function Avatar({ tone = 0 }: { tone?: number }) {
  const tones = ["bg-primary/15 text-primary", "bg-accent/20 text-accent-strong", "bg-[#f5b14c]/20 text-chip-amber", "bg-ink/10 text-ink"];
  return (
    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${tones[tone % tones.length]}`}>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
        <circle cx="8" cy="5.5" r="2.8" />
        <path d="M2.8 13.5c.7-2.6 2.7-4 5.2-4s4.5 1.4 5.2 4z" />
      </svg>
    </span>
  );
}

function Pill({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "amber" | "grey" }) {
  const map = {
    blue: "bg-primary-pale text-primary",
    green: "bg-[#e3f5ea] text-[#1f7a45]",
    amber: "bg-[#fdf1dc] text-chip-amber",
    grey: "bg-surface-alt text-ink-soft",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${map[tone]}`}>{children}</span>;
}

// ---------------------------------------------------------------- CRM
function Crm({ lang }: { lang: Locale }) {
  const cols = [
    {
      title: tr(lang, { es: "Nuevo", ca: "Nou", en: "New" }),
      cards: [
        { name: tr(lang, { es: "Taller mecánico", ca: "Taller mecànic", en: "Car repair shop" }), v: 8400, stars: 1 },
        { name: tr(lang, { es: "Hotel rural", ca: "Hotel rural", en: "Country hotel" }), v: 3200, stars: 2 },
      ],
    },
    {
      title: tr(lang, { es: "Propuesta", ca: "Proposta", en: "Proposition" }),
      cards: [
        { name: tr(lang, { es: "Fábrica de cerámica", ca: "Fàbrica de ceràmica", en: "Ceramics factory" }), v: 15600, stars: 3 },
        { name: tr(lang, { es: "Distribuidora de fruta", ca: "Distribuïdora de fruita", en: "Fruit wholesaler" }), v: 6900, stars: 2 },
      ],
    },
    {
      title: tr(lang, { es: "Ganado", ca: "Guanyat", en: "Won" }),
      cards: [{ name: tr(lang, { es: "Tienda de muebles", ca: "Botiga de mobles", en: "Furniture shop" }), v: 22300, stars: 3 }],
    },
  ];
  let k = 0;
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {cols.map((col, c) => (
        <div key={col.title} className={`min-w-0 rounded-xl bg-white p-2 ${c === 2 ? "hidden sm:block" : ""}`}>
          <div className="mb-2 flex items-center justify-between px-0.5">
            <span className="truncate text-[11px] font-bold text-ink">{col.title}</span>
            <span className="hidden font-mono text-[9.5px] text-ink-faint sm:inline">{eur(lang, col.cards.reduce((s, x) => s + x.v, 0))}</span>
          </div>
          <div className={`mb-2 h-1 rounded-full ${c === 2 ? "bg-[#3fb27f]" : c === 1 ? "bg-accent" : "bg-primary-light/60"}`} />
          <div className="flex flex-col gap-1.5">
            {col.cards.map((card) => (
              <div key={card.name} className="explorer-item rounded-lg border border-line bg-white p-2 shadow-[0_4px_10px_-8px_rgba(11,18,32,.4)]" style={item(k++)}>
                <p className="truncate text-[11px] font-semibold text-ink">{card.name}</p>
                <p className="mt-0.5 font-mono text-[10px] text-primary">{eur(lang, card.v)}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[10px] tracking-tight text-[#f5b14c]">{"★".repeat(card.stars)}<span className="text-line">{"★".repeat(3 - card.stars)}</span></span>
                  <Avatar tone={k} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- Ventas
function Sales({ lang }: { lang: Locale }) {
  const lines = [
    { d: tr(lang, { es: "Implantación Odoo", ca: "Implantació Odoo", en: "Odoo implementation" }), q: 1, p: 3200 },
    { d: tr(lang, { es: "Migración de datos", ca: "Migració de dades", en: "Data migration" }), q: 1, p: 850 },
    { d: tr(lang, { es: "Formación (horas)", ca: "Formació (hores)", en: "Training (hours)" }), q: 12, p: 55 },
    { d: tr(lang, { es: "Soporte anual", ca: "Suport anual", en: "Annual support" }), q: 1, p: 960 },
  ];
  const base = lines.reduce((s, l) => s + l.q * l.p, 0);
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] text-ink-faint">S00042</p>
          <p className="text-[13px] font-bold text-ink">{tr(lang, { es: "Hotel rural", ca: "Hotel rural", en: "Country hotel" })}</p>
        </div>
        <Pill tone="green">{tr(lang, { es: "Pedido de venta", ca: "Comanda de venda", en: "Sales order" })}</Pill>
      </div>
      <div className="mt-2.5 grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-line pb-1 text-[9.5px] font-semibold tracking-wide text-ink-faint uppercase">
        <span>{tr(lang, { es: "Producto", ca: "Producte", en: "Product" })}</span>
        <span className="text-right">{tr(lang, { es: "Cant.", ca: "Quant.", en: "Qty" })}</span>
        <span className="w-16 text-right">{tr(lang, { es: "Importe", ca: "Import", en: "Amount" })}</span>
      </div>
      {lines.map((l, i) => (
        <div key={l.d} className="explorer-item grid grid-cols-[1fr_auto_auto] gap-x-3 border-b border-line/70 py-1.5 text-[11px]" style={item(i)}>
          <span className="truncate text-ink">{l.d}</span>
          <span className="text-right font-mono text-ink-soft">{l.q}</span>
          <span className="w-16 text-right font-mono text-ink">{eur(lang, l.q * l.p)}</span>
        </div>
      ))}
      <div className="explorer-item mt-2 flex flex-col items-end gap-0.5 font-mono text-[10.5px]" style={item(5)}>
        <span className="text-ink-soft">{tr(lang, { es: "Base", ca: "Base", en: "Subtotal" })} {eur(lang, base)} · IVA 21% {eur(lang, base * 0.21)}</span>
        <span className="rounded-md bg-ink px-2 py-1 text-[12px] font-semibold text-white">Total {eur(lang, base * 1.21, 2)}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Compras
function Purchase({ lang }: { lang: Locale }) {
  const rows = [
    { ref: "P00118", v: tr(lang, { es: "Suministros industriales", ca: "Subministraments industrials", en: "Industrial supplies" }), amt: 2480, st: "green" as const, s: { es: "Recibido", ca: "Rebut", en: "Received" } },
    { ref: "P00119", v: tr(lang, { es: "Almacén de maderas", ca: "Magatzem de fustes", en: "Timber merchant" }), amt: 5120, st: "amber" as const, s: { es: "En camino", ca: "En camí", en: "In transit" } },
    { ref: "P00120", v: tr(lang, { es: "Embalajes y cajas", ca: "Embalatges i caixes", en: "Packaging supplier" }), amt: 940, st: "blue" as const, s: { es: "Confirmado", ca: "Confirmat", en: "Confirmed" } },
    { ref: "P00121", v: tr(lang, { es: "Ferretería", ca: "Ferreteria", en: "Hardware store" }), amt: 315, st: "grey" as const, s: { es: "Borrador", ca: "Esborrany", en: "Draft" } },
  ];
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {[
          { k: { es: "Pendientes", ca: "Pendents", en: "To receive" }, v: "3" },
          { k: { es: "Este mes", ca: "Aquest mes", en: "This month" }, v: eur(lang, 8855) },
          { k: { es: "Proveedores", ca: "Proveïdors", en: "Vendors" }, v: "14" },
        ].map((x, i) => (
          <div key={i} className="explorer-item rounded-lg bg-surface-alt px-2 py-1.5" style={item(i)}>
            <p className="text-[9.5px] text-ink-faint">{tr(lang, x.k)}</p>
            <p className="font-mono text-[12px] font-semibold text-ink">{x.v}</p>
          </div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.ref} className="explorer-item flex items-center gap-2.5 border-b border-line/70 py-1.5 last:border-0" style={item(i + 3)}>
          <span className="hidden font-mono text-[10px] text-ink-faint sm:inline">{r.ref}</span>
          <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-ink">{r.v}</span>
          <span className="font-mono text-[11px] text-ink">{eur(lang, r.amt)}</span>
          <Pill tone={r.st}>{tr(lang, r.s)}</Pill>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- Contabilidad
function Accounting({ lang }: { lang: Locale }) {
  const months = lang === "en" ? ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"] : lang === "ca" ? ["jun", "jul", "ago", "set", "oct", "nov"] : ["jun", "jul", "ago", "sep", "oct", "nov"];
  const income = [62, 70, 48, 78, 84, 92];
  const costs = [40, 44, 36, 47, 50, 53];
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.3fr_1fr]">
      <div className="rounded-xl bg-white p-3">
        <p className="text-[10px] text-ink-faint">{tr(lang, { es: "Ingresos vs gastos", ca: "Ingressos vs despeses", en: "Income vs expenses" })}</p>
        <p className="font-mono text-[15px] font-bold text-ink">{eur(lang, 184320)}</p>
        <div className="mt-2 flex h-24 items-end gap-1.5">
          {months.map((m, i) => (
            <div key={m} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-20 w-full items-end gap-[2px]">
                <span className="explorer-bar flex-1 rounded-t-[3px] bg-gradient-to-t from-primary to-accent" style={{ height: `${income[i]}%`, ...item(i) }} />
                <span className="explorer-bar flex-1 rounded-t-[3px] bg-primary-light/40" style={{ height: `${costs[i]}%`, ...item(i) }} />
              </div>
              <span className="text-[8.5px] text-ink-faint">{m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col">
        <div className="explorer-item min-w-0 rounded-xl bg-white p-2.5" style={item(2)}>
          <p className="text-[10px] text-ink-faint">{tr(lang, { es: "Banco", ca: "Banc", en: "Bank" })}</p>
          <p className="font-mono text-[13px] font-bold text-ink">{eur(lang, 48215, 2)}</p>
          <p className="text-[9.5px] text-[#1f7a45]">▲ 12% {tr(lang, { es: "este mes", ca: "aquest mes", en: "this month" })}</p>
        </div>
        <div className="explorer-item min-w-0 rounded-xl bg-white p-2.5" style={item(3)}>
          <p className="text-[10px] text-ink-faint">{tr(lang, { es: "Por cobrar", ca: "Per cobrar", en: "Receivables" })}</p>
          {[
            { n: "INV/2026/0187", v: 1210, late: true },
            { n: "INV/2026/0191", v: 3480, late: false },
          ].map((f) => (
            <div key={f.n} className="mt-1 flex items-center justify-between gap-1">
              <span className="font-mono text-[9.5px] text-ink-soft">{f.n}</span>
              <span className={`font-mono text-[10px] font-semibold ${f.late ? "text-chip-amber" : "text-ink"}`}>{eur(lang, f.v)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Inventario
function Inventory({ lang }: { lang: Locale }) {
  const rows = [
    { p: tr(lang, { es: "Tablero roble 160", ca: "Tauler roure 160", en: "Oak board 160" }), q: 84, max: 120 },
    { p: tr(lang, { es: "Tornillo M8 (caja)", ca: "Caragol M8 (caixa)", en: "M8 screw (box)" }), q: 12, max: 100 },
    { p: tr(lang, { es: "Barniz mate 5 L", ca: "Vernís mat 5 L", en: "Matt varnish 5 L" }), q: 46, max: 60 },
    { p: tr(lang, { es: "Caja cartón 40×30", ca: "Caixa cartó 40×30", en: "Box 40×30" }), q: 310, max: 400 },
  ];
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-bold text-ink">WH/Stock</span>
        <Pill tone="amber">{tr(lang, { es: "1 bajo mínimos", ca: "1 sota mínims", en: "1 below minimum" })}</Pill>
      </div>
      {rows.map((r, i) => {
        const pct = Math.round((r.q / r.max) * 100);
        const low = pct < 20;
        return (
          <div key={r.p} className="explorer-item border-b border-line/70 py-2 last:border-0" style={item(i)}>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="truncate font-medium text-ink">{r.p}</span>
              <span className={`font-mono ${low ? "font-semibold text-chip-amber" : "text-ink-soft"}`}>
                {r.q} {tr(lang, { es: "uds", ca: "u.", en: "units" })}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-alt">
              <div className={`explorer-grow h-full rounded-full ${low ? "bg-[#f5b14c]" : "bg-gradient-to-r from-primary to-accent"}`} style={{ width: `${pct}%`, ...item(i) }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------- Fabricación
function Manufacturing({ lang }: { lang: Locale }) {
  const orders = [
    { ref: "MO/00042", p: tr(lang, { es: "Mesa roble 160", ca: "Taula roure 160", en: "Oak table 160" }), wc: tr(lang, { es: "Montaje", ca: "Muntatge", en: "Assembly" }), pct: 72 },
    { ref: "MO/00043", p: tr(lang, { es: "Silla nórdica", ca: "Cadira nòrdica", en: "Nordic chair" }), wc: tr(lang, { es: "Barnizado", ca: "Envernissat", en: "Varnishing" }), pct: 45 },
    { ref: "MO/00044", p: tr(lang, { es: "Estantería 5 baldas", ca: "Prestatgeria 5 lleixes", en: "5-shelf bookcase" }), wc: tr(lang, { es: "Corte", ca: "Tall", en: "Cutting" }), pct: 18 },
  ];
  return (
    <div className="flex flex-col gap-2">
      {orders.map((o, i) => (
        <div key={o.ref} className="explorer-item rounded-xl bg-white p-2.5" style={item(i)}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-mono text-[9.5px] text-ink-faint">{o.ref}</p>
              <p className="truncate text-[11.5px] font-semibold text-ink">{o.p}</p>
            </div>
            <Pill tone={o.pct > 60 ? "green" : o.pct > 30 ? "blue" : "grey"}>{o.wc}</Pill>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-alt">
              <div className="explorer-grow h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${o.pct}%`, ...item(i) }} />
            </div>
            <span className="w-8 text-right font-mono text-[10px] text-ink-soft">{o.pct}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- RRHH
function Hr({ lang }: { lang: Locale }) {
  const days = lang === "en" ? ["M", "T", "W", "T", "F"] : lang === "ca" ? ["Dl", "Dt", "Dc", "Dj", "Dv"] : ["L", "M", "X", "J", "V"];
  const people = [
    { r: tr(lang, { es: "Administración", ca: "Administració", en: "Admin" }), off: [] as number[] },
    { r: tr(lang, { es: "Comercial", ca: "Comercial", en: "Sales" }), off: [2, 3] },
    { r: tr(lang, { es: "Producción", ca: "Producció", en: "Production" }), off: [4] },
    { r: tr(lang, { es: "Almacén", ca: "Magatzem", en: "Warehouse" }), off: [] },
  ];
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="grid grid-cols-[1fr_repeat(5,16px)] items-center gap-1 border-b border-line pb-1.5 sm:grid-cols-[1fr_repeat(5,22px)] sm:gap-1.5">
        <span className="text-[10px] font-semibold text-ink-faint">{tr(lang, { es: "Ausencias · semana 46", ca: "Absències · setmana 46", en: "Time off · week 46" })}</span>
        {days.map((d, i) => (
          <span key={i} className="text-center text-[9.5px] font-semibold text-ink-faint">{d}</span>
        ))}
      </div>
      {people.map((p, i) => (
        <div key={p.r} className="explorer-item grid grid-cols-[1fr_repeat(5,16px)] items-center gap-1 border-b border-line/70 py-1.5 sm:grid-cols-[1fr_repeat(5,22px)] sm:gap-1.5 last:border-0" style={item(i)}>
          <span className="flex min-w-0 items-center gap-2">
            <Avatar tone={i} />
            <span className="min-w-0 truncate text-[11px] font-semibold text-ink">{p.r}</span>
          </span>
          {days.map((_, d) => (
            <span key={d} className={`h-4 rounded ${p.off.includes(d) ? "bg-accent/70" : "bg-surface-alt"}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- TPV
function Pos({ lang }: { lang: Locale }) {
  const products = [
    { n: tr(lang, { es: "Café", ca: "Cafè", en: "Coffee" }), p: 1.4 },
    { n: tr(lang, { es: "Croissant", ca: "Croissant", en: "Croissant" }), p: 1.8 },
    { n: tr(lang, { es: "Zumo", ca: "Suc", en: "Juice" }), p: 2.9 },
    { n: tr(lang, { es: "Tostada", ca: "Torrada", en: "Toast" }), p: 2.5 },
    { n: tr(lang, { es: "Agua", ca: "Aigua", en: "Water" }), p: 1.2 },
    { n: tr(lang, { es: "Bocadillo", ca: "Entrepà", en: "Sandwich" }), p: 4.5 },
  ];
  const ticket = [
    { n: products[0].n, q: 2, p: products[0].p },
    { n: products[1].n, q: 2, p: products[1].p },
    { n: products[2].n, q: 1, p: products[2].p },
  ];
  const total = ticket.reduce((s, t) => s + t.q * t.p, 0);
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1.25fr_1fr]">
      <div className="grid grid-cols-3 content-start gap-1.5">
        {products.map((p, i) => (
          <div key={p.n} className="explorer-item rounded-lg bg-white p-2 text-center" style={item(i)}>
            <span className="mx-auto mb-1 block h-6 w-6 rounded-full bg-gradient-to-br from-primary-pale to-accent/40" />
            <p className="truncate text-[10.5px] font-semibold text-ink">{p.n}</p>
            <p className="font-mono text-[9.5px] text-primary">{eur(lang, p.p, 2)}</p>
          </div>
        ))}
      </div>
      <div className="explorer-item flex flex-col rounded-xl bg-white p-2.5" style={item(6)}>
        <p className="text-[10px] font-semibold text-ink-faint">{tr(lang, { es: "Mesa 4", ca: "Taula 4", en: "Table 4" })}</p>
        <div className="mt-1 flex-1">
          {ticket.map((t) => (
            <div key={t.n} className="flex justify-between gap-1 py-0.5 text-[10.5px]">
              <span className="truncate text-ink">
                {t.q}× {t.n}
              </span>
              <span className="font-mono text-ink-soft">{eur(lang, t.q * t.p, 2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex justify-between border-t border-line pt-1.5 text-[11.5px] font-bold text-ink">
          <span>Total</span>
          <span className="font-mono">{eur(lang, total, 2)}</span>
        </div>
        <span className="mt-2 rounded-lg bg-gradient-to-b from-[#3478b6] to-accent-strong py-1.5 text-center text-[10.5px] font-semibold text-white">
          {tr(lang, { es: "Cobrar", ca: "Cobrar", en: "Pay" })}
        </span>
      </div>
    </div>
  );
}

// Mismo orden que `odooModules` (src/lib/site.ts).
const screens = [Crm, Sales, Purchase, Accounting, Inventory, Manufacturing, Hr, Pos];

export default function OdooScreen({ index, lang }: { index: number; lang: Locale }) {
  const Screen = screens[index] ?? Crm;
  return <Screen lang={lang} />;
}
