import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import Mission from "@/components/sections/mission";
import Pillars from "@/components/sections/pillars";
import OdooSpotlight from "@/components/sections/odoo-spotlight";
import SoftwareSpotlight from "@/components/sections/software-spotlight";
import Sectors from "@/components/sections/sectors";
import Zone from "@/components/sections/zone";
import CtaBand from "@/components/sections/cta-band";
import { site } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/", {
    title: t(
      `${site.name} — Partner Odoo y consultoría para pymes en Gata de Gorgos y Valencia`,
      `${site.name} — Partner Odoo i consultoria per a pimes a Gata de Gorgos i València`,
    ),
    description: t(site.description),
    absoluteTitle: true,
  });
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Mission />
      <Pillars />
      <OdooSpotlight />
      <SoftwareSpotlight />
      <Sectors />
      <Zone />
      <CtaBand />
    </>
  );
}
