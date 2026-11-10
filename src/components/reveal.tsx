type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

/**
 * Aparición al entrar en pantalla (desenfoque + desplazamiento). La clase `.is-in` la añade
 * `Motion`; sin JavaScript el contenido se ve directamente.
 * `delay` en segundos (como antes). `duration` y `once` se mantienen por compatibilidad.
 */
export default function Reveal({
  children,
  className = "",
  style,
  direction = "up",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={className}
      data-reveal={direction}
      style={{ ...style, "--d": `${Math.round(delay * 1000)}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
