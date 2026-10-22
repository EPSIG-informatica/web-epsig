import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import CookieBanner from "@/components/cookie-banner";
import GoogleAnalytics from "@/components/google-analytics";
import AttributionTracker from "@/components/attribution-tracker";
import StructuredData from "@/components/structured-data";
import CardEffects from "@/components/card-effects";
import LangProvider from "@/components/lang-provider";
import { site } from "@/lib/site";
import { isLocale, locales, translator } from "@/lib/i18n";

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

// Una versión de cada página por idioma, generadas en el build.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const t = translator(isLocale(lang) ? lang : "es");
  return {
    metadataBase: new URL(site.url),
    title: {
      default: t(
        `${site.name} — Partner Odoo y consultoría para pymes en Gata de Gorgos y Valencia`,
        `${site.name} — Partner Odoo i consultoria per a pimes a Gata de Gorgos i València`,
        `${site.name} — Odoo Partner and business consulting for SMEs in Gata de Gorgos and Valencia`,
      ),
      template: `%s — ${site.name}`,
    },
    description: t(site.description),
    // Search Console: código de la meta etiqueta "google-site-verification" (no instala cookies).
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    // La canónica, las alternativas por idioma (hreflang) y Open Graph las fija cada página
    // con `pageMetadata()` (src/lib/i18n-server.ts).
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = translator(lang);

  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-surface text-ink">
        <LangProvider lang={lang}>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
          >
            {t("Saltar al contenido", "Salta al contingut", "Skip to content")}
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
        </LangProvider>
      </body>
    </html>
  );
}
