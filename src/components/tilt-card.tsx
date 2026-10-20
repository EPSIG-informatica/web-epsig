import Link from "@/components/link";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
  id?: string;
};

/**
 * Tarjeta con elevación, inclinación y foco de luz al pasar el ratón.
 * El efecto lo gestiona `CardEffects` (un único listener global), así que
 * esta tarjeta es un componente de servidor sin JavaScript propio.
 */
export default function TiltCard({ children, className = "", href, style, id }: TiltCardProps) {
  const props = { id, style, className: `card-spotlight ${className}` };

  if (href) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return <div {...props}>{children}</div>;
}
