import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { site } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/aviso-legal", {
    title: t("Aviso legal", "Avís legal", "Legal notice"),
    description: t(`Aviso legal de ${site.legalName}.`, `Avís legal de ${site.legalName}.`, `Legal notice of ${site.legalName}.`),
  });
}

export default async function AvisoLegalPage() {
  const t = await getT();
  return (
    <>
      <PageHero eyebrow="Legal" title={t("Aviso legal", "Avís legal", "Legal notice")} />
      <section className="py-16 sm:py-20">
        <div className="prose-legal mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          {t.lang === "en" && (
            <p className="mb-6 text-[13.5px] italic text-ink-soft">
              This English version is provided for information only. In the event of any discrepancy, the Spanish
              version shall prevail.
            </p>
          )}
          <h2 className="mb-3 text-xl text-ink">{t("1. Datos identificativos", "1. Dades identificatives", "1. Identification details")}</h2>
          <p>
            {t(
              "En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:",
              "En compliment del deure d'informació recollit en l'article 10 de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i del Comerç Electrònic (LSSI-CE), s'informa de les dades del titular d'este lloc web:",
              "In compliance with the duty to provide information laid down in Article 10 of Law 34/2002, of 11 July, on Information Society Services and Electronic Commerce (LSSI-CE, the Spanish Information Society Services Act), the details of the owner of this website are set out below:",
            )}
          </p>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <strong className="text-ink">{t("Titular:", "Titular:", "Owner:")}</strong> {site.legalName}
            </li>
            <li>
              <strong className="text-ink">{t("Forma jurídica:", "Forma jurídica:", "Legal form:")}</strong> {t(site.legalForm)}
            </li>
            <li>
              <strong className="text-ink">NIF:</strong> {site.nif}
            </li>
            <li>
              <strong className="text-ink">{t("Domicilio social:", "Domicili social:", "Registered office:")}</strong> {site.registeredAddress}
            </li>
            {site.registry && (
              <li>
                <strong className="text-ink">{t("Datos registrales:", "Dades registrals:", "Registration details:")}</strong> {t(site.registry)}
              </li>
            )}
            <li>
              <strong className="text-ink">{t("Teléfono:", "Telèfon:", "Telephone:")}</strong> {site.phones[0]}
            </li>
            <li>
              <strong className="text-ink">{t("Correo electrónico:", "Correu electrònic:", "Email:")}</strong>{" "}
              <a href={`mailto:${site.email}`} className="text-primary underline underline-offset-2 hover:no-underline">
                {site.email}
              </a>
            </li>
          </ul>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("2. Objeto", "2. Objecte", "2. Purpose")}</h2>
          <p>
            {t(
              `El presente sitio web tiene por objeto informar sobre los servicios de consultoría empresarial, transformación digital, implantación de Odoo ERP y protección de negocio que presta ${site.legalName}.`,
              `Este lloc web té per objecte informar sobre els serveis de consultoria empresarial, transformació digital, implantació d'Odoo ERP i protecció del negoci que presta ${site.legalName}.`,
              `The purpose of this website is to provide information about the business consultancy, digital transformation, Odoo ERP implementation and business protection services provided by ${site.legalName}.`,
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("3. Condiciones de uso", "3. Condicions d'ús", "3. Terms of use")}</h2>
          <p>
            {t(
              `El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación, desde dicho acceso, de las condiciones de uso aquí reflejadas. Los contenidos se proporcionan a título informativo, sin que su uso genere ninguna relación comercial u obligación entre el usuario y ${site.legalName}.`,
              `L'accés i l'ús d'este lloc web atribuïx la condició d'usuari i implica l'acceptació, des d'eixe accés, de les condicions d'ús ací reflectides. Els continguts es proporcionen a títol informatiu, sense que el seu ús genere cap relació comercial ni obligació entre l'usuari i ${site.legalName}.`,
              `Accessing and using this website confers the status of user and implies acceptance, from the moment of such access, of the terms of use set out herein. The content is provided for information purposes only, and its use does not give rise to any commercial relationship or obligation between the user and ${site.legalName}.`,
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">
            {t("4. Propiedad intelectual e industrial", "4. Propietat intel·lectual i industrial", "4. Intellectual and industrial property")}
          </h2>
          <p>
            {t(
              `Todos los contenidos del sitio web (textos, imágenes, marcas, logotipos) son titularidad de ${site.legalName} o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial.`,
              `Tots els continguts del lloc web (textos, imatges, marques, logotips) són titularitat de ${site.legalName} o de tercers que n'han autoritzat l'ús, i estan protegits per la normativa de propietat intel·lectual i industrial.`,
              `All content on this website (texts, images, trademarks, logos) is owned by ${site.legalName} or by third parties who have authorised its use, and is protected by intellectual and industrial property legislation.`,
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("5. Responsabilidad", "5. Responsabilitat", "5. Liability")}</h2>
          <p>
            {t(
              `${site.legalName} no garantiza la inexistencia de errores en el acceso al sitio web ni en su contenido, aunque pondrá todos los medios a su alcance para evitarlos o subsanarlos. ${site.legalName} no se responsabiliza de los daños que pudieran derivarse del uso de la información del sitio web ni de los contenidos de sitios de terceros enlazados desde él.`,
              `${site.legalName} no garantix la inexistència d'errors en l'accés al lloc web ni en el seu contingut, encara que posarà tots els mitjans al seu abast per a evitar-los o esmenar-los. ${site.legalName} no es responsabilitza dels danys que puguen derivar-se de l'ús de la informació del lloc web ni dels continguts de llocs de tercers enllaçats des d'este.`,
              `${site.legalName} does not guarantee that access to the website or its content will be free from errors, although it will use all means at its disposal to prevent or correct them. ${site.legalName} accepts no liability for any damage that may arise from the use of the information on the website or from the content of third-party websites linked from it.`,
            )}
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">{t("6. Legislación aplicable", "6. Legislació aplicable", "6. Governing law")}</h2>
          <p>
            {t(
              "Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales que correspondan conforme a derecho.",
              "Estes condicions es regixen per la legislació espanyola. Per a qualsevol controvèrsia derivada de l'accés o l'ús d'este lloc web, les parts se sotmeten als jutjats i tribunals que corresponguen conforme a dret.",
              "These terms are governed by Spanish law. For any dispute arising from access to or use of this website, the parties submit to the courts and tribunals having jurisdiction in accordance with the law.",
            )}
          </p>
        </div>
      </section>
    </>
  );
}
