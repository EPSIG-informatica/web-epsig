import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Aviso legal de ${site.legalName}.`,
};

export default function AvisoLegalPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Aviso legal" />
      <section className="py-16 sm:py-20">
        <div className="prose-legal mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          <h2 className="mb-3 text-xl text-ink">1. Datos identificativos</h2>
          <p>
            En cumplimiento del deber de información recogido en el artículo 10 de la Ley
            34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del
            Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este
            sitio web:
          </p>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <strong className="text-ink">Titular:</strong> {site.legalName}
            </li>
            <li>
              <strong className="text-ink">Forma jurídica:</strong> {site.legalForm}
            </li>
            <li>
              <strong className="text-ink">NIF:</strong> {site.nif}
            </li>
            <li>
              <strong className="text-ink">Domicilio social:</strong> {site.registeredAddress}
            </li>
            {site.registry && (
              <li>
                <strong className="text-ink">Datos registrales:</strong> {site.registry}
              </li>
            )}
            <li>
              <strong className="text-ink">Teléfono:</strong> {site.phones[0]}
            </li>
            <li>
              <strong className="text-ink">Correo electrónico:</strong>{" "}
              <a href={`mailto:${site.email}`} className="text-primary underline underline-offset-2 hover:no-underline">
                {site.email}
              </a>
            </li>
          </ul>

          <h2 className="mt-8 mb-3 text-xl text-ink">2. Objeto</h2>
          <p>
            El presente sitio web tiene por objeto informar sobre los servicios de
            consultoría empresarial, transformación digital, implantación de Odoo ERP y
            protección de negocio que presta {site.legalName}.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">3. Condiciones de uso</h2>
          <p>
            El acceso y uso de este sitio web atribuye la condición de usuario e implica la
            aceptación, desde dicho acceso, de las condiciones de uso aquí reflejadas. Los contenidos se
            proporcionan a título informativo, sin que su uso genere ninguna relación
            comercial u obligación entre el usuario y {site.legalName}.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">4. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del sitio web (textos, imágenes, marcas, logotipos) son
            titularidad de {site.legalName} o de terceros que han autorizado su uso, y
            están protegidos por la normativa de propiedad intelectual e industrial.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">5. Responsabilidad</h2>
          <p>
            {site.legalName} no garantiza la inexistencia de errores en el acceso al sitio
            web ni en su contenido, aunque pondrá todos los medios a su alcance para
            evitarlos o subsanarlos. {site.legalName} no se responsabiliza de los daños que
            pudieran derivarse del uso de la información del sitio web ni de los contenidos
            de sitios de terceros enlazados desde él.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">6. Legislación aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para cualquier
            controversia derivada del acceso o uso de este sitio web, las partes se
            someten a los juzgados y tribunales que correspondan conforme a derecho.
          </p>
        </div>
      </section>
    </>
  );
}
