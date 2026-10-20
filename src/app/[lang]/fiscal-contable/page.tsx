import type { Metadata } from "next";
import AsesoriaArea, { asesoriaAreaMetadata } from "@/components/asesoria-area";

export async function generateMetadata(): Promise<Metadata> {
  return asesoriaAreaMetadata("fiscal-contable");
}

export default function FiscalContablePage() {
  return <AsesoriaArea slug="fiscal-contable" />;
}
