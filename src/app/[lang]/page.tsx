import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import Mission from "@/components/sections/mission";
import Pillars from "@/components/sections/pillars";
import OdooSpotlight from "@/components/sections/odoo-spotlight";
import SoftwareSpotlight from "@/components/sections/software-spotlight";
import Sectors from "@/components/sections/sectors";
import Zone from "@/components/sections/zone";
import CtaBand from "@/components/sections/cta-band";

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
