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
  // Títulos de las secciones: se usan en los encabezados y en el índice lateral.
  const sections = [
    { id: "datos-identificativos", label: t("1. Datos identificativos", "1. Dades identificatives", "1. Identification details") },
    { id: "objeto", label: t("2. Objeto", "2. Objecte", "2. Purpose") },
    { id: "condiciones-de-uso", label: t("3. Condiciones de uso", "3. Condicions d'ús", "3. Terms of use") },
    {
      id: "propiedad-intelectual",
      label: t("4. Propiedad intelectual e industrial", "4. Propietat intel·lectual i industrial", "4. Intellectual and industrial property"),
    },
    { id: "responsabilidad", label: t("5. Responsabilidad", "5. Responsabilitat", "5. Liability") },
    { id: "legislacion-aplicable", label: t("6. Legislación aplicable", "6. Legislació aplicable", "6. Governing law") },
  ];
  return (
    <>
      <PageHero eyebrow="Legal" title={t("Aviso legal", "Avís legal", "Legal notice")} />
      <section className="section-tint relative overflow-clip py-16 sm:py-24">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[140%] max-w-[900px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(90,169,230,.16), transparent 65%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-12">
          {/* Índice lateral fijo, generado con los mismos títulos de la página */}
          <aside className="hidden lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:block">
            <span className="mb-5 block h-px w-12 bg-gradient-to-r from-accent to-transparent shadow-[0_0_10px_var(--color-accent)]" aria-hidden />
            <ol className="flex flex-col border-l border-line">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13.5px] leading-snug text-ink-soft transition-colors hover:border-accent hover:text-primary"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <article className="card-light prose-epsig mx-auto max-w-3xl px-5 py-8 sm:px-10 sm:py-12 lg:mx-0">
            {t.lang === "en" && (
              <p className="mb-6 rounded-xl border border-line bg-surface-alt px-4 py-3 text-[13.5px] italic">
                This English version is provided for information only. In the event of any discrepancy, the Spanish
                version shall prevail.
              </p>
            )}
            <h2 id={sections[0].id} style={{ marginTop: 0 }}>
              {sections[0].label}
            </h2>
            <p>
              {t(
                "En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:",
                "En compliment del deure d'informació recollit en l'article 10 de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i del Comerç Electrònic (LSSI-CE), s'informa de les dades del titular d'este lloc web:",
                "In compliance with the duty to provide information laid down in Article 10 of Law 34/2002, of 11 July, on Information Society Services and Electronic Commerce (LSSI-CE, the Spanish Information Society Services Act), the details of the owner of this website are set out below:",
              )}
            </p>
            <ul>
              <li>
                <strong>{t("Titular:", "Titular:", "Owner:")}</strong> {site.legalName}
              </li>
              <li>
                <strong>{t("Forma jurídica:", "Forma jurídica:", "Legal form:")}</strong> {t(site.legalForm)}
              </li>
              <li>
                <strong>NIF:</strong> {site.nif}
              </li>
              <li>
                <strong>{t("Domicilio social:", "Domicili social:", "Registered office:")}</strong> {site.registeredAddress}
              </li>
              {site.registry && (
                <li>
                  <strong>{t("Datos registrales:", "Dades registrals:", "Registration details:")}</strong> {t(site.registry)}
                </li>
              )}
              <li>
                <strong>{t("Teléfono:", "Telèfon:", "Telephone:")}</strong> {site.phones[0]}
              </li>
              <li>
                <strong>{t("Correo electrónico:", "Correu electrònic:", "Email:")}</strong>{" "}
                <a href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
            </ul>

            <h2 id={sections[1].id}>{sections[1].label}</h2>
            <p>
              {t(
                `El presente sitio web tiene por objeto informar sobre los servicios de consultoría empresarial, transformación digital, implantación de Odoo ERP y protección de negocio que presta ${site.legalName}.`,
                `Este lloc web té per objecte informar sobre els serveis de consultoria empresarial, transformació digital, implantació d'Odoo ERP i protecció del negoci que presta ${site.legalName}.`,
                `The purpose of this website is to provide information about the business consultancy, digital transformation, Odoo ERP implementation and business protection services provided by ${site.legalName}.`,
              )}
            </p>

            <h2 id={sections[2].id}>{sections[2].label}</h2>
            <p>
              {t(
                `El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación, desde dicho acceso, de las condiciones de uso aquí reflejadas. Los contenidos se proporcionan a título informativo, sin que su uso genere ninguna relación comercial u obligación entre el usuario y ${site.legalName}.`,
                `L'accés i l'ús d'este lloc web atribuïx la condició d'usuari i implica l'acceptació, des d'eixe accés, de les condicions d'ús ací reflectides. Els continguts es proporcionen a títol informatiu, sense que el seu ús genere cap relació comercial ni obligació entre l'usuari i ${site.legalName}.`,
                `Accessing and using this website confers the status of user and implies acceptance, from the moment of such access, of the terms of use set out herein. The content is provided for information purposes only, and its use does not give rise to any commercial relationship or obligation between the user and ${site.legalName}.`,
              )}
            </p>

            <h2 id={sections[3].id}>
              {sections[3].label}
            </h2>
            <p>
              {t(
                `Todos los contenidos del sitio web (textos, imágenes, marcas, logotipos) son titularidad de ${site.legalName} o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial.`,
                `Tots els continguts del lloc web (textos, imatges, marques, logotips) són titularitat de ${site.legalName} o de tercers que n'han autoritzat l'ús, i estan protegits per la normativa de propietat intel·lectual i industrial.`,
                `All content on this website (texts, images, trademarks, logos) is owned by ${site.legalName} or by third parties who have authorised its use, and is protected by intellectual and industrial property legislation.`,
              )}
            </p>

            <h2 id={sections[4].id}>{sections[4].label}</h2>
            <p>
              {t(
                `${site.legalName} no garantiza la inexistencia de errores en el acceso al sitio web ni en su contenido, aunque pondrá todos los medios a su alcance para evitarlos o subsanarlos. ${site.legalName} no se responsabiliza de los daños que pudieran derivarse del uso de la información del sitio web ni de los contenidos de sitios de terceros enlazados desde él.`,
                `${site.legalName} no garantix la inexistència d'errors en l'accés al lloc web ni en el seu contingut, encara que posarà tots els mitjans al seu abast per a evitar-los o esmenar-los. ${site.legalName} no es responsabilitza dels danys que puguen derivar-se de l'ús de la informació del lloc web ni dels continguts de llocs de tercers enllaçats des d'este.`,
                `${site.legalName} does not guarantee that access to the website or its content will be free from errors, although it will use all means at its disposal to prevent or correct them. ${site.legalName} accepts no liability for any damage that may arise from the use of the information on the website or from the content of third-party websites linked from it.`,
              )}
            </p>

            <h2 id={sections[5].id}>{sections[5].label}</h2>
            <p>
              {t(
                "Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales que correspondan conforme a derecho.",
                "Estes condicions es regixen per la legislació espanyola. Per a qualsevol controvèrsia derivada de l'accés o l'ús d'este lloc web, les parts se sotmeten als jutjats i tribunals que corresponguen conforme a dret.",
                "These terms are governed by Spanish law. For any dispute arising from access to or use of this website, the parties submit to the courts and tribunals having jurisdiction in accordance with the law.",
              )}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
