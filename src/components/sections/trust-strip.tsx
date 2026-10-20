import { site } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

export default async function TrustStrip() {
  const t = await getT();
  return (
    <div className="bg-surface-dark-2 py-5.5">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 px-6">
        {site.badges.map((badge) => (
          <span
            key={badge.es}
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[12.5px] font-medium text-mist transition-colors hover:border-white/25 hover:bg-white/[0.1]"
          >
            {t(badge)}
          </span>
        ))}
      </div>
    </div>
  );
}
