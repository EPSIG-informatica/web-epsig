import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { site } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/politica-de-privacidad", {
    title: t("Política de privacidad", "Política de privacitat", "Privacy policy"),
    description: t(
      `Política de privacidad de ${site.legalName}.`,
      `Política de privacitat de ${site.legalName}.`,
      `Privacy policy of ${site.legalName}.`,
    ),
  });
}

export default async function PoliticaDePrivacidadPage() {
  const t = await getT();
  const aepdLink = (
    <a
      href="https://www.aepd.es"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:no-underline"
    >
      www.aepd.es
    </a>
  );
  return (
    <>
      <PageHero eyebrow="Legal" title={t("Política de privacidad", "Política de privacitat", "Privacy policy")} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          {t.lang === "en" && (
            <p className="mb-6 text-[13.5px] italic text-ink-soft">
              This English version is provided for information only. In the event of any discrepancy, the Spanish
              version shall prevail.
            </p>
          )}
          <h2 className="mb-3 text-xl text-ink">
            {t("1. Responsable del tratamiento", "1. Responsable del tractament", "1. Data controller")}
          </h2>
          <p>
            {t(
              `${site.legalName} (NIF ${site.nif}), con domicilio en ${site.registeredAddress}, es responsable del tratamiento de los datos personales que nos facilites a través de este sitio web. Puedes contactar con nosotros en ${site.email}.`,
              `${site.legalName} (NIF ${site.nif}), amb domicili a ${site.registeredAddress}, és responsable del tractament de les dades personals que ens facilites a través d'este lloc web. Pots contactar amb nosaltres a ${site.email}.`,
              `${site.legalName} (NIF ${site.nif}), with registered office at ${site.registeredAddress}, is the controller of the personal data you provide to us through this website. You can contact us at ${site.email}.`,
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">
            {t("2. Finalidad del tratamiento", "2. Finalitat del tractament", "2. Purpose of processing")}
          </h2>
          <p>
            {t(
              "Tratamos los datos que nos facilitas a través del formulario de contacto (nombre, correo electrónico, teléfono, empresa y mensaje) exclusivamente para responder a tu solicitud de información o diagnóstico gratuito. Al enviarlo, también te mandamos un correo automático confirmando que lo hemos recibido.",
              "Tractem les dades que ens facilites a través del formulari de contacte (nom, correu electrònic, telèfon, empresa i missatge) exclusivament per a respondre a la teua sol·licitud d'informació o de diagnòstic gratuït. En enviar-lo, també t'enviem un correu automàtic que confirma que l'hem rebut.",
              "We process the data you provide to us through the contact form (name, email address, telephone number, company and message) solely in order to respond to your request for information or for a free assessment. When you submit the form, we also send you an automatic email confirming that we have received it.",
            )}
          </p>
          <p className="mt-3">
            {t(
              "Los campos marcados con asterisco son obligatorios; sin ellos no podemos atender tu solicitud. No usaremos tus datos para enviarte publicidad ni tomaremos decisiones automatizadas con ellos.",
              "Els camps marcats amb asterisc són obligatoris; sense ells no podem atendre la teua sol·licitud. No usarem les teues dades per a enviar-te publicitat ni prendrem decisions automatitzades amb elles.",
              "Fields marked with an asterisk are mandatory; without them we cannot deal with your request. We will not use your data to send you advertising, nor will we use it for automated decision-making.",
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("3. Legitimación", "3. Legitimació", "3. Legal basis")}</h2>
          <p>
            {t(
              `La base legal para el tratamiento es el consentimiento que otorgas al marcar la casilla de aceptación y enviar el formulario de contacto. Puedes retirarlo en cualquier momento escribiendo a ${site.email}, sin que ello afecte a la licitud del tratamiento realizado antes de retirarlo.`,
              `La base legal per al tractament és el consentiment que atorgues en marcar la casella d'acceptació i enviar el formulari de contacte. Pots retirar-lo en qualsevol moment escrivint a ${site.email}, sense que això afecte la licitud del tractament fet abans de retirar-lo.`,
              `The legal basis for the processing is the consent you give by ticking the acceptance box and submitting the contact form. You may withdraw your consent at any time by writing to ${site.email}, without affecting the lawfulness of processing carried out before its withdrawal.`,
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">
            {t("4. Conservación de los datos", "4. Conservació de les dades", "4. Data retention")}
          </h2>
          <p>
            {t(
              <>
                Conservaremos tus datos durante <strong className="text-ink">un año</strong> desde tu última
                comunicación con nosotros, salvo que antes nos pidas su supresión. Si llegas a ser cliente, los
                datos pasarán a tratarse conforme a la relación contractual y se conservarán durante los plazos
                que exija la normativa aplicable (fiscal, mercantil, etc.).
              </>,
              <>
                Conservarem les teues dades durant <strong className="text-ink">un any</strong> des de la teua
                última comunicació amb nosaltres, llevat que abans ens en demanes la supressió. Si arribes a ser
                client, les dades passaran a tractar-se d&apos;acord amb la relació contractual i es conservaran
                durant els terminis que exigisca la normativa aplicable (fiscal, mercantil, etc.).
              </>,
              <>
                We will retain your data for <strong className="text-ink">one year</strong> from your last
                communication with us, unless you ask us to erase it before then. If you become a client, your data
                will be processed within the framework of the contractual relationship and retained for the periods
                required by applicable legislation (tax, commercial, etc.).
              </>,
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("5. Destinatarios", "5. Destinataris", "5. Recipients")}</h2>
          <p>
            {t(
              "No se ceden datos a terceros salvo obligación legal. Para prestar el servicio contamos con proveedores tecnológicos que actúan como encargados del tratamiento, con los que tenemos firmados los contratos exigidos por el RGPD:",
              "No se cedixen dades a tercers excepte per obligació legal. Per a prestar el servei comptem amb proveïdors tecnològics que actuen com a encarregats del tractament, amb els quals tenim signats els contractes exigits pel RGPD:",
              "No data is disclosed to third parties unless required by law. To provide the service we rely on technology providers acting as data processors, with whom we have signed the contracts required by the GDPR (Regulation (EU) 2016/679):",
            )}
          </p>
          <ul className="mt-3 list-disc pl-5">
            <li>
              {t(
                "Microsoft (Microsoft 365), para el correo electrónico.",
                "Microsoft (Microsoft 365), per al correu electrònic.",
                "Microsoft (Microsoft 365), for email.",
              )}
            </li>
            <li>
              {t(
                "Odoo S.A., para la gestión de clientes (CRM), donde registramos tu solicitud y, si aceptaste las cookies de marketing, el canal por el que llegaste a la web.",
                "Odoo S.A., per a la gestió de clients (CRM), on registrem la teua sol·licitud i, si vas acceptar les cookies de màrqueting, el canal pel qual vas arribar a la web.",
                "Odoo S.A., for customer relationship management (CRM), where we record your request and, if you accepted marketing cookies, the channel through which you reached the website.",
              )}
            </li>
            <li>{t("IONOS, para el alojamiento del sitio web.", "IONOS, per a l'allotjament del lloc web.", "IONOS, for website hosting.")}</li>
            <li>
              {t(
                "Cloudflare, para la seguridad y la distribución del sitio web.",
                "Cloudflare, per a la seguretat i la distribució del lloc web.",
                "Cloudflare, for website security and content delivery.",
              )}
            </li>
          </ul>
          <p className="mt-3">
            {t(
              "Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En ese caso, las transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión Europea.",
              "Alguns d'estos proveïdors poden tractar dades fora de l'Espai Econòmic Europeu. En eixe cas, les transferències s'emparen en el Marc de Privacitat de Dades UE-EUA o en les clàusules contractuals tipus aprovades per la Comissió Europea.",
              "Some of these providers may process data outside the European Economic Area. In that case, transfers are covered by the EU-US Data Privacy Framework or by the standard contractual clauses approved by the European Commission.",
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("6. Derechos", "6. Drets", "6. Your rights")}</h2>
          <p>
            {t(
              `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${site.email}, indicando el derecho que deseas ejercer y adjuntando copia de un documento que acredite tu identidad.`,
              `Pots exercir els teus drets d'accés, rectificació, supressió, oposició, limitació i portabilitat escrivint a ${site.email}, indicant el dret que vols exercir i adjuntant còpia d'un document que acredite la teua identitat.`,
              `You may exercise your rights of access, rectification, erasure, objection, restriction of processing and data portability by writing to ${site.email}, stating the right you wish to exercise and enclosing a copy of a document proving your identity.`,
            )}
          </p>
          <p className="mt-3">
            {t(
              <>
                Si consideras que no hemos atendido correctamente tus derechos, puedes presentar una reclamación
                ante la Agencia Española de Protección de Datos ({aepdLink}).
              </>,
              <>
                Si consideres que no hem atés correctament els teus drets, pots presentar una reclamació davant
                de l&apos;Agència Espanyola de Protecció de Dades ({aepdLink}).
              </>,
              <>
                If you consider that we have not properly dealt with your rights, you may lodge a complaint with the
                Agencia Española de Protección de Datos (AEPD, the Spanish Data Protection Agency) ({aepdLink}).
              </>,
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("7. Seguridad", "7. Seguretat", "7. Security")}</h2>
          <p>
            {t(
              "Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a su pérdida, uso indebido o acceso no autorizado, como el cifrado de las comunicaciones (HTTPS) y el acceso restringido a la información.",
              "Apliquem mesures tècniques i organitzatives adequades per a protegir les teues dades davant de la pèrdua, l'ús indegut o l'accés no autoritzat, com ara el xifratge de les comunicacions (HTTPS) i l'accés restringit a la informació.",
              "We apply appropriate technical and organisational measures to protect your data against loss, misuse or unauthorised access, such as encryption of communications (HTTPS) and restricted access to information.",
            )}
          </p>
        </div>
      </section>
    </>
  );
}
