// Índice numerado en mono con línea de acento: sustituye a las fichas de colores con siglas.
export default function IndexMark({
  n,
  label,
  dark = false,
  className = "mb-5",
}: {
  n: number;
  label?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[12px] font-medium ${className}`} aria-hidden>
      <span className={dark ? "text-accent" : "text-primary"}>{String(n).padStart(2, "0")}</span>
      {label && (
        <span className={`uppercase tracking-[0.12em] ${dark ? "text-mist-soft" : "text-ink-faint"}`}>
          {label}
        </span>
      )}
      <span
        className={`h-px flex-1 bg-gradient-to-r ${dark ? "from-accent/50" : "from-primary/40"} to-transparent`}
      />
    </div>
  );
}
