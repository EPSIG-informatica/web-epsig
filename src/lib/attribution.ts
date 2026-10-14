// Origen de la visita (primer contacto) guardado en el navegador, solo con consentimiento de
// marketing. Se envía con el formulario para que la oportunidad de Odoo sepa de dónde vino.

const STORAGE_KEY = "epsig-origen";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 90; // 90 días

export type StoredOrigin = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  referrer?: string;
  landing?: string;
  firstVisit?: string;
};

function read(): StoredOrigin | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredOrigin;
    if (!parsed.firstVisit || Date.now() - new Date(parsed.firstVisit).getTime() > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Guarda el origen de la visita si aún no hay uno vigente, o si llega con una campaña nueva. */
export function saveFirstOrigin() {
  const params = new URLSearchParams(window.location.search);
  const utm = (name: string) => params.get(`utm_${name}`)?.slice(0, 120) || undefined;
  const fromCampaign = Boolean(utm("source") || utm("medium") || utm("campaign") || params.get("gclid"));

  if (read() && !fromCampaign) return;

  let referrer: string | undefined;
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.hostname !== window.location.hostname) referrer = ref.origin + ref.pathname;
  } catch {
    // Referrer no válido: se ignora.
  }

  const origin: StoredOrigin = {
    source: utm("source"),
    medium: utm("medium"),
    campaign: utm("campaign"),
    term: utm("term"),
    content: utm("content"),
    gclid: params.get("gclid")?.slice(0, 200) || undefined,
    referrer: referrer?.slice(0, 300),
    landing: window.location.pathname.slice(0, 300),
    firstVisit: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(origin));
  } catch {
    // Almacenamiento no disponible.
  }
}

export function clearOrigin() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Almacenamiento no disponible.
  }
}

/** Origen guardado + página desde la que se envía el formulario (para adjuntar al envío). */
export function originForSubmit() {
  return { ...(read() ?? {}), formPage: window.location.pathname };
}
