import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { software } from "@/lib/site";

// Bloque de la portada con el software propio.
export default function SoftwareSpotlight() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Software propio"
          title="Herramientas que hemos creado para problemas reales"
          body="Además de implantar software, desarrollamos el nuestro cuando ningún programa resuelve bien el problema."
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Reveal className="h-full">
            <Link
              href={software.camping.href}
              className="card-spotlight flex h-full items-start gap-5 rounded-panel border border-line bg-surface p-7 transition-colors hover:border-primary-light"
            >
              <span className="grid shrink-0 grid-cols-3 gap-1" aria-hidden>
                {["bg-accent", "bg-accent", "bg-line", "bg-[#f5b14c]", "bg-accent", "bg-line"].map((color, index) => (
                  <span key={index} className={`h-4 w-4 rounded-[5px] ${color}`} />
                ))}
              </span>
              <span>
                <span className="block text-[19px] font-semibold text-ink">{software.camping.title}</span>
                <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ink-soft">{software.camping.summary}</span>
                <span className="mt-4 block text-sm font-semibold text-primary">Descubrir →</span>
              </span>
            </Link>
          </Reveal>
          <Reveal className="h-full">
            <Link
              href={software.viviendas.href}
              className="card-spotlight flex h-full items-start gap-5 rounded-panel border border-line bg-surface p-7 transition-colors hover:border-primary-light"
            >
              <span className="flex shrink-0 flex-col gap-1" aria-hidden>
                {["bg-[#d6a514]", "bg-[#d6a514]", "bg-accent"].map((color, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <span className={`h-3 w-3 rounded-[3px] ${color}`} />
                    <span className="h-1.5 w-6 rounded-full bg-line" />
                  </span>
                ))}
              </span>
              <span>
                <span className="block text-[19px] font-semibold text-ink">{software.viviendas.title}</span>
                <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ink-soft">{software.viviendas.summary}</span>
                <span className="mt-4 block text-sm font-semibold text-primary">Ver el software →</span>
              </span>
            </Link>
          </Reveal>
          <Reveal className="h-full">
            <Link
              href={software.conectores.href}
              className="card-spotlight flex h-full items-start gap-5 rounded-panel border border-line bg-surface p-7 transition-colors hover:border-primary-light"
            >
              <span className="flex shrink-0 flex-col items-center py-1" aria-hidden>
                {[0, 1, 2].map((index) => (
                  <span key={index} className="flex flex-col items-center">
                    {index > 0 && <span className="h-3.5 w-px bg-primary-light" />}
                    <span className={`h-3 w-3 rounded-full border-2 ${index === 2 ? "border-primary bg-primary" : "border-primary bg-surface"}`} />
                  </span>
                ))}
              </span>
              <span>
                <span className="block text-[19px] font-semibold text-ink">{software.conectores.title}</span>
                <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ink-soft">{software.conectores.summary}</span>
                <span className="mt-4 block text-sm font-semibold text-primary">Ver conectores →</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
