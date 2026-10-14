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
];

const isDev = process.env.NODE_ENV === "development";

// Dominios de Google Analytics 4 (solo se cargan si el usuario acepta las cookies analíticas).
const googleAnalytics = {
  script: "https://www.googletagmanager.com",
  connect:
    "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  img: "https://*.google-analytics.com https://*.googletagmanager.com",
};

// CSP sin nonces para mantener las páginas estáticas: Next.js necesita 'unsafe-inline'
// para sus scripts inline. En desarrollo React requiere además 'unsafe-eval'.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${googleAnalytics.script}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${googleAnalytics.img}`,
  "font-src 'self'",
  `connect-src 'self' ${googleAnalytics.connect}`,
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
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
