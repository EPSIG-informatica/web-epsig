/**
 * Fondo de las cabeceras oscuras: rejilla tenue, estrellas, haces de luz diagonales
 * y resplandor azul. Va dentro de un contenedor `relative overflow-hidden`.
 */
export default function HeroBackdrop({ beam = true, glow = "right" }: { beam?: boolean; glow?: "right" | "left" | "center" }) {
  const glowPos =
    glow === "left" ? "-left-40 -top-48" : glow === "center" ? "left-1/2 -top-72 -translate-x-1/2" : "-right-40 -top-56";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="hero-grid absolute inset-0" />
      <div className="stars absolute inset-0" />
      <div
        className={`blob-drift absolute ${glowPos} h-[640px] w-[640px] rounded-full`}
        style={{ background: "radial-gradient(circle, rgba(42,107,165,.5), transparent 68%)" }}
      />
      <div
        className="blob-drift-slow absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(90,169,230,.16), transparent 70%)" }}
      />
      {beam && (
        <>
          <div className="beam" />
          <div className="beam beam--thin" />
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-surface-dark/80" />
    </div>
  );
}
