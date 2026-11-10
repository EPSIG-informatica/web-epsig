import type { ElementType } from "react";

export type Segment = string | { text: string; className?: string };

// Desplazamientos verticales distintos por palabra (las palabras "suben" desde alturas diferentes).
const OFFSETS = [0, 1.4, 0.4, 2, 0.8, 1.6, 0.2, 1.1];

/**
 * Titular que aparece palabra a palabra, con desenfoque y desplazamiento.
 * - `trigger="view"` (por defecto): se anima al entrar en pantalla (`Motion` añade `.is-in`).
 * - `trigger="load"`: se anima al cargar (cabeceras).
 * El texto sigue siendo texto normal para buscadores y lectores de pantalla.
 */
export default function SplitText({
  as: Tag = "h2",
  text,
  className = "",
  delay = 0,
  trigger = "view",
  id,
}: {
  as?: ElementType;
  text: Segment | Segment[];
  className?: string;
  /** Retraso inicial en milisegundos. */
  delay?: number;
  trigger?: "view" | "load";
  id?: string;
}) {
  const segments = Array.isArray(text) ? text : [text];
  let index = 0;
  const words: React.ReactNode[] = [];

  segments.forEach((segment, s) => {
    const value = typeof segment === "string" ? segment : segment.text;
    const segClass = typeof segment === "string" ? undefined : segment.className;
    value.split(/\s+/).filter(Boolean).forEach((word, w) => {
      const i = index++;
      if (words.length) words.push(" ");
      words.push(
        <span
          key={`${s}-${w}`}
          className="w"
          style={{ "--i": i, "--o": OFFSETS[i % OFFSETS.length] } as React.CSSProperties}
        >
          {segClass ? <span className={segClass}>{word}</span> : word}
        </span>,
      );
    });
  });

  const style = { "--d": `${delay}ms` } as React.CSSProperties;

  if (trigger === "load") {
    return (
      <Tag id={id} className={`hero-split ${className}`} style={style}>
        {words}
      </Tag>
    );
  }
  return (
    <Tag id={id} className={`split ${className}`} data-split="" style={style}>
      {words}
    </Tag>
  );
}
