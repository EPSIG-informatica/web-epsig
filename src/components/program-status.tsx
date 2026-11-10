import Link from "@/components/link";
import { getT } from "@/lib/i18n-server";

/**
 * Aviso de convocatoria cerrada para Kit Digital / Kit Consulting.
 * Cuando se abra una nueva convocatoria, basta con cambiar `open` a true en `programStatus` (site.ts).
 */
export default async function ProgramStatus({
  program,
  open,
  compact = false,
}: {
  program: string;
  open: boolean;
  compact?: boolean;
}) {
  if (open) return null;
  const t = await getT();
  return (
    <div
      className={`relative flex flex-col gap-4 overflow-hidden rounded-brand border border-chip-amber/30 bg-gradient-to-br from-[#fdf6e9] to-white text-left shadow-[0_18px_40px_-30px_rgba(148,96,15,.5)] sm:flex-row sm:items-center sm:justify-between ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
    >
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-chip-amber/60" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-chip-amber" />
          </span>
          {t(`Convocatoria de ${program} cerrada`, `Convocatòria de ${program} tancada`, `${program}: call for applications closed`)}
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
          {t(
            "Ahora mismo no se admiten nuevas solicitudes. Puedes contratar estos servicios directamente con nosotros y te avisamos en cuanto se abra una nueva convocatoria.",
            "Ara mateix no s'admeten noves sol·licituds. Pots contractar estos serveis directament amb nosaltres i t'avisem tan prompte com s'obriga una nova convocatòria.",
            "New applications are not being accepted right now. You can hire these services directly from us, and we'll let you know as soon as a new call opens.",
          )}
        </p>
      </div>
      <Link
        href="/contacto#diagnostico"
        className="btn btn-dark shrink-0 self-start !px-5 !py-2.5 !text-[13px] sm:self-center"
      >
        {t("Avisadme", "Aviseu-me", "Notify me")}
      </Link>
    </div>
  );
}
