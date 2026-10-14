import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad de ${site.legalName}.`,
};

export default function PoliticaDePrivacidadPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Política de privacidad" />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-[15px] leading-relaxed text-ink-soft">
          <h2 className="mb-3 text-xl text-ink">1. Responsable del tratamiento</h2>
          <p>
            {site.legalName} (NIF {site.nif}), con domicilio en {site.registeredAddress},
            es responsable del tratamiento de los datos
            personales que nos facilites a través de este sitio web. Puedes contactar con
            nosotros en {site.email}.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">2. Finalidad del tratamiento</h2>
          <p>
            Tratamos los datos que nos facilitas a través del formulario de contacto
            (nombre, correo electrónico, teléfono, empresa y mensaje) exclusivamente para
            responder a tu solicitud de información o diagnóstico gratuito. Al enviarlo,
            también te mandamos un correo automático confirmando que lo hemos recibido.
          </p>
          <p className="mt-3">
            Los campos marcados con asterisco son obligatorios; sin ellos no podemos
            atender tu solicitud. No usaremos tus datos para enviarte publicidad ni
            tomaremos decisiones automatizadas con ellos.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">3. Legitimación</h2>
          <p>
            La base legal para el tratamiento es el consentimiento que otorgas al marcar la
            casilla de aceptación y enviar el formulario de contacto. Puedes retirarlo en
            cualquier momento escribiendo a {site.email}, sin que ello afecte a la licitud
            del tratamiento realizado antes de retirarlo.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">4. Conservación de los datos</h2>
          <p>
            Conservaremos tus datos durante <strong className="text-ink">un año</strong> desde
            tu última comunicación con nosotros, salvo que antes nos pidas su supresión. Si
            llegas a ser cliente, los datos pasarán a tratarse conforme a la relación
            contractual y se conservarán durante los plazos que exija la normativa
            aplicable (fiscal, mercantil, etc.).
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">5. Destinatarios</h2>
          <p>
            No se ceden datos a terceros salvo obligación legal. Para prestar el servicio
            contamos con proveedores tecnológicos que actúan como encargados del
            tratamiento, con los que tenemos firmados los contratos exigidos por el RGPD:
          </p>
          <ul className="mt-3 list-disc pl-5">
            <li>Microsoft (Microsoft 365), para el correo electrónico.</li>
            <li>
              Odoo S.A., para la gestión de clientes (CRM), donde registramos tu solicitud y,
              si aceptaste las cookies de marketing, el canal por el que llegaste a la web.
            </li>
            <li>IONOS, para el alojamiento del sitio web.</li>
            <li>Cloudflare, para la seguridad y la distribución del sitio web.</li>
          </ul>
          <p className="mt-3">
            Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico
            Europeo. En ese caso, las transferencias se amparan en el Marco de Privacidad de
            Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión
            Europea.
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">6. Derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
            limitación y portabilidad escribiendo a {site.email}, indicando el derecho
            que deseas ejercer y adjuntando copia de un documento que acredite tu
            identidad.
          </p>
          <p className="mt-3">
            Si consideras que no hemos atendido correctamente tus derechos, puedes presentar
            una reclamación ante la Agencia Española de Protección de Datos (
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              www.aepd.es
            </a>
            ).
          </p>

          <h2 className="mt-8 mb-3 text-xl text-ink">7. Seguridad</h2>
          <p>
            Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos
            frente a su pérdida, uso indebido o acceso no autorizado, como el cifrado de
            las comunicaciones (HTTPS) y el acceso restringido a la información.
          </p>
        </div>
      </section>
    </>
  );
}
