import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import CookieBanner from "@/components/cookie-banner";
import GoogleAnalytics from "@/components/google-analytics";
import AttributionTracker from "@/components/attribution-tracker";
import StructuredData from "@/components/structured-data";
import CardEffects from "@/components/card-effects";
import { site } from "@/lib/site";

// Fuentes variables: un único archivo por familia en lugar de uno por grosor.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Solo para etiquetas y precios: no se precarga para no competir con lo principal.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Partner Odoo y consultoría para pymes en Gata de Gorgos y Valencia`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  // Search Console: código de la meta etiqueta "google-site-verification" (no instala cookies).
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  // "./" = la URL de cada página (con la barra final que añade trailingSlash).
  alternates: { canonical: "./" },
  // Sin title/description aquí: cada página usa los suyos también en redes sociales.
  openGraph: {
    url: "./",
    siteName: site.name,
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-surface text-ink">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        <ScrollProgress />
          <Nav />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
        <CookieBanner />
        <CardEffects />
        <GoogleAnalytics />
        <AttributionTracker />
        <StructuredData />
      </body>
    </html>
  );
}
