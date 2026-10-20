import type { Metadata } from "next";
import AsesoriaArea, { asesoriaAreaMetadata } from "@/components/asesoria-area";

export async function generateMetadata(): Promise<Metadata> {
  return asesoriaAreaMetadata("economico-financiero");
}

export default function EconomicoFinancieroPage() {
  return <AsesoriaArea slug="economico-financiero" />;
}
