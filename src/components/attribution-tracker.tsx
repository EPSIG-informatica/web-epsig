"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent";
import { clearOrigin, saveFirstOrigin } from "@/lib/attribution";

/**
 * Anota de dónde llega el visitante (UTM, gclid, web de procedencia y primera página) para
 * adjuntarlo a la oportunidad de Odoo si rellena el formulario. Solo con consentimiento de
 * marketing; si lo retira, se borra.
 */
export default function AttributionTracker() {
  const consent = useConsent();
  const pathname = usePathname();

  useEffect(() => {
    if (consent === undefined) return;
    if (consent?.marketing) saveFirstOrigin();
    else clearOrigin();
  }, [consent, pathname]);

  return null;
}
