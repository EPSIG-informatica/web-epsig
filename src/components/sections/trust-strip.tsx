import { site } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

// Marquesina infinita con las acreditaciones y la zona de trabajo.
export default async function TrustStrip() {
  const t = await getT();
  const items = [...site.badges.map((badge) => t(badge)), ...site.zones.map((zone) => t(zone))];
  return (
    <div className="relative border-y border-white/[0.06] bg-surface-dark py-6">
      <ul className="sr-only">
        {site.badges.map((badge) => (
          <li key={badge.es}>{t(badge)}</li>
        ))}
      </ul>
      <div className="marquee overflow-hidden" aria-hidden>
        <div className="marquee-track gap-3 pr-3">
          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-2.5 text-[13px] font-medium text-mist transition-colors hover:border-accent/50 hover:text-white"
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent" aria-hidden>
                <path d="M6 0l1.6 4.4L12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6z" fill="currentColor" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
