import type { Metadata } from "next";
import AsesoriaArea, { asesoriaAreaMetadata } from "@/components/asesoria-area";

export async function generateMetadata(): Promise<Metadata> {
  return asesoriaAreaMetadata("laboral");
}

export default function LaboralPage() {
  return <AsesoriaArea slug="laboral" />;
}
