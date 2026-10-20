import AsesoriaArea, { asesoriaAreaMetadata } from "@/components/asesoria-area";

export const metadata = asesoriaAreaMetadata("economico-financiero");

export default function EconomicoFinancieroPage() {
  return <AsesoriaArea slug="economico-financiero" />;
}
