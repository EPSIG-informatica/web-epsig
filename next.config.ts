import type { NextConfig } from "next";

const clientPortalUrl = "https://epsig.matrixconnect.eu/apps/login/";

// URLs heredadas de la web WordPress que no tienen página propia en la nueva web.
const legacyRedirects: [source: string, destination: string][] = [
  ["/home", "/"],
  ["/inicio", "/"],
  ["/introduccion", "/"],
  ["/imagen", "/"],
  ["/acerca-de", "/nosotros/"],
  ["/acerca-de/acceso-a-clientes-epsig-consultores-sl", clientPortalUrl],
  ["/clients", clientPortalUrl],
  ["/formulario-correo", "/contacto/"],
  ["/fiscal-contable-2", "/fiscal-contable/"],
  ["/confirmacion-de-donacion", "/"],
  ["/donacion-fallida", "/"],
  ["/escritorio-del-donante", "/"],
  ["/blog", "/"],
  ["/precios", "/kit-digital/"],
  // Páginas residuales de WordPress indexadas en Google.
  ["/espresso", "/"],
  ["/feed", "/"],
  ["/comments/feed", "/"],
  ["/category/:slug*", "/"],
  ["/en-construccion", "/"],
  ["/give/:slug*", "/"],
  ["/donations/:slug*", "/"],
  ["/legal", "/aviso-legal/"],
  // Antigua estructura de servicios (Josep Pérez Barber). Las reglas concretas van antes que
  // la genérica del final: gana la primera que coincide.
  ["/consultoria-asesoria-josep-perez-barber-valencia/donde-encontrarnos", "/contacto/"],
  ["/consultoria-asesoria-josep-perez-barber-valencia/fiscal/:cookies(politica-de-cookies|mas-informacion-sobre-las-cookies)", "/politica-de-cookies/"],
  ["/consultoria-asesoria-josep-perez-barber-valencia/fiscal", "/fiscal-contable/"],
  ["/consultoria-asesoria-josep-perez-barber-valencia/servicios-de-consultoria/:area(fiscal|contable)", "/fiscal-contable/"],
  ["/consultoria-asesoria-josep-perez-barber-valencia/servicios-de-consultoria/:area(laboral|prevencion-laboral)", "/laboral/"],
  ["/consultoria-asesoria-josep-perez-barber-valencia/servicios-de-consultoria/software", "/servicios/odoo/"],
  ["/consultoria-asesoria-josep-perez-barber-valencia/servicios-de-consultoria/redes-sociales-y-seo", "/servicios/transformacion-digital/"],
  ["/consultoria-asesoria-josep-perez-barber-valencia/servicios-de-consultoria/coaching-empresarial/:slug*", "/servicios/consultoria-empresarial/"],
  ["/consultoria-asesoria-josep-perez-barber-valencia/:slug*", "/servicios/"],
  // Kit Digital / Kit Consulting con URLs antiguas o mal escritas.
  ["/kit%20digital/:slug", "/kit-digital/:slug/"],
  ["/kitdigital", "/kit-digital/"],
  ["/kit-consult", "/kit-consulting/"],
  ["/ministerio-trans-digital", "/kit-digital/"],
  ["/planr_acelerapyme_nuevo", "/kit-digital/"],
  ["/power-bi", "/kit-digital/bi/"],
  // Artículos antiguos con un servicio equivalente.
  ["/suministro-inmediato-de-informacion-del-iva-sii", "/fiscal-contable/"],
  ["/las-nuevas-retenciones-del-irpf-para-el-2015-y-2016", "/fiscal-contable/"],
  ["/cumple-con-la-ley-de-prevencion-laboral-y-hazlo-tu-mismo", "/laboral/"],
  ["/plan-de-marketing-se-realista-define-lo-que-quieres-hacer-y-si-no-sabes-innovar-copia", "/servicios/consultoria-empresarial/"],
];

const isDev = process.env.NODE_ENV === "development";

// Dominios de Google Analytics 4 (solo se cargan si el usuario acepta las cookies analíticas).
const googleAnalytics = {
  script: "https://www.googletagmanager.com",
  connect:
    "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  img: "https://*.google-analytics.com https://*.googletagmanager.com",
};

// Plausible, alojado en un subdominio propio: script y envío de visitas a la misma dirección.
const plausible = "https://analitica.epsigconsultores.com";

// CSP sin nonces para mantener las páginas estáticas: Next.js necesita 'unsafe-inline'
// para sus scripts inline. En desarrollo React requiere además 'unsafe-eval'.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${googleAnalytics.script} ${plausible}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${googleAnalytics.img}`,
  "font-src 'self'",
  `connect-src 'self' ${googleAnalytics.connect} ${plausible}`,
  // Solo iframes propios: las animaciones de producto de /animaciones/.
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // HSTS: solo HTTPS durante 1 año, únicamente en este dominio (sin subdominios).
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// Las animaciones de /animaciones/ se incrustan en las páginas de la propia web:
// pueden mostrarse dentro de un iframe del mismo dominio, pero de ningún otro.
const embeddableHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy.replace("frame-ancestors 'none'", "frame-ancestors 'self'"),
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Son piezas para incrustar, no páginas: que Google no las indexe como URLs sueltas.
  { key: "X-Robots-Tag", value: "noindex" },
];

const nextConfig: NextConfig = {
  // Igual que WordPress: todas las URLs terminan en "/".
  trailingSlash: true,
  // No anunciar "X-Powered-By: Next.js".
  poweredByHeader: false,
  headers() {
    // Si dos reglas fijan la misma cabecera, gana la última: la de /animaciones/ va después.
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/animaciones/:path*", headers: embeddableHeaders },
    ];
  },
  redirects() {
    return [
      // Una sola versión del dominio para Google: www → sin www.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.epsigconsultores.com" }],
        destination: "https://epsigconsultores.com/:path*",
        permanent: true,
      },
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
