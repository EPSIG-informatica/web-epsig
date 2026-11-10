// Iconos de línea (24×24) usados en las ilustraciones animadas.
const paths: Record<string, React.ReactNode> = {
  crm: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16.5 14c2.3.2 3.9 1.7 4.5 4" />
    </>
  ),
  sales: (
    <>
      <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.4-1.1L20.5 8H6.2" />
      <circle cx="9.5" cy="19.5" r="1.3" />
      <circle cx="17" cy="19.5" r="1.3" />
    </>
  ),
  purchase: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5h4l3 3.2v2.8h-7" />
      <circle cx="6.5" cy="17.5" r="1.7" />
      <circle cx="17" cy="17.5" r="1.7" />
    </>
  ),
  accounting: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8.5 7h7M8.5 11h1.5M12 11h1.5M15.5 11h0M8.5 14.5h1.5M12 14.5h1.5M8.5 18h1.5M12 18h3.5M15.5 11v7" />
    </>
  ),
  inventory: (
    <>
      <path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" />
      <path d="M4 7.2l8 4.3 8-4.3M12 11.5V21" />
    </>
  ),
  manufacturing: (
    <>
      <path d="M3 20V10l5 3V10l5 3V6h4l1 14z" />
      <path d="M7 17h2M12 17h2" />
    </>
  ),
  hr: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="12" cy="10.5" r="2.6" />
      <path d="M7.5 17c.8-1.9 2.4-2.9 4.5-2.9s3.7 1 4.5 2.9" />
    </>
  ),
  pos: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M7 8h5M7 11h3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M7.5 15l3.5-4 3 2.5L19 7" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.6c0 4.6-3.2 8.2-7.5 9.4-4.3-1.2-7.5-4.8-7.5-9.4V6z" />
      <path d="M8.8 12.2l2.2 2.2 4.4-4.6" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20V9l5 3V9l5 3V5h5v15z" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5L5.5 4h13L20 9.5M4 9.5h16M4 9.5c0 1.5 1.2 2.5 2.7 2.5s2.6-1 2.6-2.5c0 1.5 1.2 2.5 2.7 2.5s2.7-1 2.7-2.5c0 1.5 1.1 2.5 2.6 2.5S20 11 20 9.5M5.5 12v8h13v-8" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
    </>
  ),
  cup: (
    <>
      <path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3.5v2M12 3v2.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  bolt: <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z" />,
  home: (
    <>
      <path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}

// Icono de cada módulo de Odoo, en el mismo orden que `odooModules` (src/lib/site.ts).
export const moduleIcons = ["crm", "sales", "purchase", "accounting", "inventory", "manufacturing", "hr", "pos"] as const;
