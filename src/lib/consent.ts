"use client";

import { useSyncExternalStore } from "react";
import type { Localized } from "@/lib/i18n";

// Categorías opcionales. Las cookies técnicas no necesitan consentimiento y siempre están activas.
export const consentCategories = [
  {
    id: "functional",
    title: { es: "Funcionales", ca: "Funcionals" },
    body: {
      es: "Permiten servicios integrados de terceros, como mapas, vídeos o chat de atención.",
      ca: "Permeten serveis integrats de tercers, com ara mapes, vídeos o xat d'atenció.",
    },
    cookiePrefixes: [],
  },
  {
    id: "analytics",
    title: { es: "Analíticas", ca: "Analítiques" },
    body: {
      es: "Nos ayudan a entender, de forma agregada, cómo se usa la web para mejorarla (Google Analytics).",
      ca: "Ens ajuden a entendre, de manera agregada, com s'usa la web per a millorar-la (Google Analytics).",
    },
    cookiePrefixes: ["_ga", "_gid", "_gat"],
  },
  {
    id: "marketing",
    title: { es: "Marketing", ca: "Màrqueting" },
    body: {
      es: "Permiten medir campañas y saber por qué canal nos conociste si nos escribes por el formulario.",
      ca: "Permeten mesurar campanyes i saber per quin canal ens vas conéixer si ens escrius pel formulari.",
    },
    cookiePrefixes: ["_gcl", "_fbp", "_fbc"],
  },
] as const satisfies readonly {
  id: string;
  title: Localized;
  body: Localized;
  cookiePrefixes: readonly string[];
}[];

export type ConsentCategory = (typeof consentCategories)[number]["id"];
export type ConsentChoices = Record<ConsentCategory, boolean>;
export type Consent = ConsentChoices & { version: number; date: string };

// Subir la versión obliga a volver a pedir el consentimiento (p. ej. al añadir un proveedor nuevo).
// v2: la categoría de marketing también guarda el origen de la visita para el CRM.
const CONSENT_VERSION = 2;
// La AEPD recomienda renovar el consentimiento como máximo cada 24 meses.
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 365;
const STORAGE_KEY = "epsig-cookie-consent";
const OPEN_EVENT = "epsig:open-cookie-settings";

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedConsent: Consent | null = null;

function readConsent(): Consent | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw === cachedRaw) return cachedConsent;
  cachedRaw = raw;
  cachedConsent = null;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Consent;
    const expired = Date.now() - new Date(parsed.date).getTime() > MAX_AGE_MS;
    if (parsed.version === CONSENT_VERSION && !expired) cachedConsent = parsed;
  } catch {
    // Valor corrupto: se trata como si no hubiera consentimiento.
  }
  return cachedConsent;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

// Borra las cookies de las categorías rechazadas (en el dominio actual y en el dominio padre).
function clearCookies(prefixes: readonly string[]) {
  if (prefixes.length === 0) return;
  const host = window.location.hostname;
  const domains = ["", host, `.${host.split(".").slice(-2).join(".")}`];
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (!prefixes.some((prefix) => name.startsWith(prefix))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function saveConsent(choices: ConsentChoices) {
  const previous = readConsent();
  const consent: Consent = { ...choices, version: CONSENT_VERSION, date: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Sin almacenamiento (modo privado estricto): la elección vale solo para esta visita.
    cachedRaw = JSON.stringify(consent);
    cachedConsent = consent;
  }
  listeners.forEach((listener) => listener());

  const revoked = consentCategories.filter((c) => !choices[c.id]);
  revoked.forEach((c) => clearCookies(c.cookiePrefixes));
  // Si se retira un permiso ya concedido, se recarga para descargar los scripts de terceros.
  if (revoked.some((c) => previous?.[c.id])) window.location.reload();
}

export function allChoices(value: boolean): ConsentChoices {
  return Object.fromEntries(consentCategories.map((c) => [c.id, value])) as ConsentChoices;
}

/**
 * Consentimiento actual. `undefined` durante el renderizado en servidor,
 * `null` si el usuario aún no ha elegido.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, readConsent, () => undefined);
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
