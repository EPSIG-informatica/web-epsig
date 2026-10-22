import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import CookieSettingsButton from "@/components/cookie-settings-button";
import { site } from "@/lib/site";
import type { Localized, Translate } from "@/lib/i18n";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/politica-de-cookies", {
    title: t("Política de cookies", "Política de cookies", "Cookie policy"),
    description: t(`Política de cookies de ${site.legalName}.`, `Política de cookies de ${site.legalName}.`, `Cookie policy of ${site.legalName}.`),
  });
}

type CookieRow = { name: string; provider: string; purpose: Localized; duration: Localized };

const technicalCookies: CookieRow[] = [
  {
    name: "epsig-cookie-consent",
    provider: site.name,
    purpose: {
      es: "Guarda tus preferencias de cookies (almacenamiento local del navegador).",
      ca: "Guarda les teues preferències de cookies (emmagatzematge local del navegador).",
      en: "Stores your cookie preferences (browser local storage).",
    },
    duration: { es: "12 meses", ca: "12 mesos", en: "12 months" },
  },
  {
    name: "idioma",
    provider: site.name,
    purpose: {
      es: "Personalización de la interfaz: recuerda el idioma que has elegido («es», «ca» o «en»). Solo se crea cuando pulsas el selector de idioma ES/VA/EN del menú.",
      ca: "Personalització de la interfície: recorda l'idioma que has triat («es», «ca» o «en»). Només es crea quan polses el selector d'idioma ES/VA/EN del menú.",
      en: "Interface customisation: remembers the language you have chosen (“es”, “ca” or “en”). It is only created when you click the ES/VA/EN language selector in the menu.",
    },
    duration: { es: "1 año", ca: "1 any", en: "1 year" },
  },
  {
    name: "__cf_bm",
    provider: "Cloudflare",
    purpose: {
      es: "Seguridad: distingue el tráfico legítimo de bots y ataques.",
      ca: "Seguretat: distingix el trànsit legítim dels bots i atacs.",
      en: "Security: distinguishes legitimate traffic from bots and attacks.",
    },
    duration: { es: "30 minutos", ca: "30 minuts", en: "30 minutes" },
  },
];

const analyticsCookies: CookieRow[] = [
  {
    name: "_ga",
    provider: "Google (Analytics)",
    purpose: {
      es: "Distingue usuarios de forma anónima para obtener estadísticas de uso.",
      ca: "Distingix usuaris de manera anònima per a obtindre estadístiques d'ús.",
      en: "Distinguishes users anonymously in order to obtain usage statistics.",
    },
    duration: { es: "2 años", ca: "2 anys", en: "2 years" },
  },
  {
    name: "_ga_<ID>",
    provider: "Google (Analytics)",
    purpose: {
      es: "Mantiene el estado de la sesión para las estadísticas de uso.",
      ca: "Manté l'estat de la sessió per a les estadístiques d'ús.",
      en: "Maintains session state for usage statistics.",
    },
    duration: { es: "2 años", ca: "2 anys", en: "2 years" },
  },
];

const marketingCookies: CookieRow[] = [
  {
    name: "epsig-origen",
    provider: site.name,
    purpose: {
      es: "Recuerda cómo llegaste a la web la primera vez (buscador, campaña o web de procedencia y primera página visitada), para asociarlo a tu solicitud si usas el formulario de contacto (almacenamiento local del navegador).",
      ca: "Recorda com vas arribar a la web la primera vegada (cercador, campanya o web de procedència i primera pàgina visitada), per a associar-ho a la teua sol·licitud si uses el formulari de contacte (emmagatzematge local del navegador).",
      en: "Remembers how you first reached the website (search engine, campaign or referring website, and first page visited), so that it can be linked to your request if you use the contact form (browser local storage).",
    },
    duration: { es: "90 días", ca: "90 dies", en: "90 days" },
  },
];

// La tabla de analítica solo aparece cuando Google Analytics está configurado.
const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);

export default async function PoliticaDeCookiesPage() {
  const t = await getT();
  return (
    <>
      <PageHero eyebrow="Legal" title={t("Política de cookies", "Política de cookies", "Cookie policy")} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          {t.lang === "en" && (
            <p className="mb-6 text-[13.5px] italic text-ink-soft">
              This English version is provided for information only. In the event of any discrepancy, the Spanish
              version shall prevail.
            </p>
          )}
          <h2 className="mb-3 text-xl text-ink">{t("¿Qué son las cookies?", "Què són les cookies?", "What are cookies?")}</h2>
          <p>
            {t(
              "Las cookies son pequeños archivos que se almacenan en tu navegador al visitar un sitio web. Se usan para recordar información sobre tu visita, garantizar la seguridad o, si lo aceptas, obtener estadísticas de uso.",
              "Les cookies són xicotets fitxers que s'emmagatzemen en el teu navegador quan visites un lloc web. S'usen per a recordar informació sobre la teua visita, garantir la seguretat o, si ho acceptes, obtindre estadístiques d'ús.",
              "Cookies are small files that are stored in your browser when you visit a website. They are used to remember information about your visit, to ensure security or, if you accept them, to obtain usage statistics.",
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">
            {t("Tipos de cookies y consentimiento", "Tipus de cookies i consentiment", "Types of cookies and consent")}
          </h2>
          <p>
            {t(
              <>
                Las cookies <strong className="text-ink">técnicas</strong> son necesarias para que la web funcione
                y no requieren tu consentimiento. El resto de categorías (funcionales, analíticas y de marketing)
                solo se activan si las aceptas en el aviso de cookies, y puedes cambiar tu elección en cualquier
                momento.
              </>,
              <>
                Les cookies <strong className="text-ink">tècniques</strong> són necessàries perquè la web funcione
                i no requerixen el teu consentiment. La resta de categories (funcionals, analítiques i de
                màrqueting) només s&apos;activen si les acceptes en l&apos;avís de cookies, i pots canviar la teua
                elecció en qualsevol moment.
              </>,
              <>
                <strong className="text-ink">Technical</strong> cookies are necessary for the website to work and do
                not require your consent. The other categories (functional, analytics and marketing) are only
                activated if you accept them in the cookie notice, and you can change your choice at any time.
              </>,
            )}
          </p>

          <h3 className="mt-6 mb-2 text-base font-semibold text-ink">{t("Cookies técnicas", "Cookies tècniques", "Technical cookies")}</h3>
          <CookieTable rows={technicalCookies} t={t} />
          <p className="mt-3">
            {t(
              "La cookie «idioma» es una cookie técnica de personalización de la interfaz y está exenta de consentimiento. Si no has elegido idioma y tu navegador está configurado en catalán/valenciano o en inglés, te mostramos directamente la versión en ese idioma, sin guardar nada en tu dispositivo.",
              "La cookie «idioma» és una cookie tècnica de personalització de la interfície i està exempta de consentiment. Si no has triat idioma i el teu navegador està configurat en català/valencià o en anglés, et mostrem directament la versió en eixe idioma, sense guardar res en el teu dispositiu.",
              "The “idioma” cookie is a technical interface customisation cookie and is exempt from consent. If you have not chosen a language and your browser is set to Catalan/Valencian or English, we show you the corresponding language version directly, without storing anything on your device.",
            )}
          </p>

          {analyticsEnabled && (
            <>
              <h3 className="mt-6 mb-2 text-base font-semibold text-ink">
                {t(
                  "Cookies analíticas (solo con tu consentimiento)",
                  "Cookies analítiques (només amb el teu consentiment)",
                  "Analytics cookies (only with your consent)",
                )}
              </h3>
              <CookieTable rows={analyticsCookies} t={t} />
              <p className="mt-3">
                {t(
                  "Google Analytics puede implicar transferencias internacionales de datos a Estados Unidos, amparadas en el Marco de Privacidad de Datos UE-EE. UU. Más información en la ",
                  "Google Analytics pot implicar transferències internacionals de dades als Estats Units, emparades en el Marc de Privacitat de Dades UE-EUA. Més informació en la ",
                  "Google Analytics may involve international transfers of data to the United States, covered by the EU-US Data Privacy Framework. More information is available in ",
                )}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                >
                  {t("política de privacidad de Google", "política de privacitat de Google", "Google’s privacy policy")}
                </a>
                .
              </p>
            </>
          )}

          <h3 className="mt-6 mb-2 text-base font-semibold text-ink">
            {t("Marketing (solo con tu consentimiento)", "Màrqueting (només amb el teu consentiment)", "Marketing (only with your consent)")}
          </h3>
          <CookieTable rows={marketingCookies} t={t} />
          <p className="mt-3">
            {t(
              "Este dato no se comparte con terceros ni sirve para mostrarte publicidad: solo se utiliza si nos escribes por el formulario de contacto, para saber por qué canal nos has conocido. Si retiras el consentimiento de marketing, se borra.",
              "Esta dada no es compartix amb tercers ni servix per a mostrar-te publicitat: només s'utilitza si ens escrius pel formulari de contacte, per a saber per quin canal ens has conegut. Si retires el consentiment de màrqueting, s'esborra.",
              "This information is not shared with third parties and is not used to show you advertising: it is only used if you write to us through the contact form, so that we know through which channel you found us. If you withdraw your marketing consent, it is deleted.",
            )}
          </p>

          {!analyticsEnabled && (
            <p className="mt-4">
              {t(
                "Actualmente no utilizamos cookies funcionales ni analíticas.",
                "Actualment no utilitzem cookies funcionals ni analítiques.",
                "We do not currently use functional or analytics cookies.",
              )}
            </p>
          )}

          <h2 className="mt-8 mb-3 text-xl text-ink">
            {t("Cómo cambiar o retirar tu consentimiento", "Com canviar o retirar el teu consentiment", "How to change or withdraw your consent")}
          </h2>
          <p>
            {t(
              "Puedes modificar tus preferencias en cualquier momento desde el enlace «Configurar cookies» del pie de página o con este botón:",
              "Pots modificar les teues preferències en qualsevol moment des de l'enllaç «Configurar cookies» del peu de pàgina o amb este botó:",
              "You can change your preferences at any time via the “Cookie settings” link in the footer or with this button:",
            )}
          </p>
          <CookieSettingsButton className="mt-4 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-primary" />
          <p className="mt-4">
            {t(
              "También puedes bloquear o eliminar las cookies desde la configuración de tu navegador, aunque bloquear las técnicas puede impedir que algunas partes de la web funcionen correctamente.",
              "També pots bloquejar o eliminar les cookies des de la configuració del teu navegador, encara que bloquejar les tècniques pot impedir que algunes parts de la web funcionen correctament.",
              "You can also block or delete cookies in your browser settings, although blocking technical cookies may prevent some parts of the website from working properly.",
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("Más información", "Més informació", "Further information")}</h2>
          <p>
            {t(
              "Si tienes dudas sobre esta política de cookies, puedes contactarnos en ",
              "Si tens dubtes sobre esta política de cookies, pots contactar-nos a ",
              "If you have any questions about this cookie policy, you can contact us at ",
            )}
            <a href={`mailto:${site.email}`} className="text-primary underline underline-offset-2 hover:no-underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function CookieTable({ rows, t }: { rows: CookieRow[]; t: Translate }) {
  return (
    <div className="overflow-x-auto rounded-brand border border-line">
      <table className="w-full min-w-[520px] text-left text-[13.5px]">
        <thead className="bg-surface-alt text-ink">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Cookie</th>
            <th className="px-4 py-2.5 font-semibold">{t("Proveedor", "Proveïdor", "Provider")}</th>
            <th className="px-4 py-2.5 font-semibold">{t("Finalidad", "Finalitat", "Purpose")}</th>
            <th className="px-4 py-2.5 font-semibold">{t("Duración", "Durada", "Duration")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-line align-top">
              <td className="px-4 py-2.5 font-mono text-[12.5px] text-ink">{row.name}</td>
              <td className="px-4 py-2.5">{row.provider}</td>
              <td className="px-4 py-2.5">{t(row.purpose)}</td>
              <td className="px-4 py-2.5 whitespace-nowrap">{t(row.duration)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
