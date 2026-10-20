import { notFound } from "next/navigation";

// Cualquier URL que no corresponde a una página muestra el 404 de la web, en su idioma
// (`app/[lang]/not-found.tsx`, con menú y pie).
export default function CatchAll() {
  notFound();
}
