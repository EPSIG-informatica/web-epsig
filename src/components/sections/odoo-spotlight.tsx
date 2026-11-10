import Link from "@/components/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import OdooExplorer from "@/components/odoo-explorer";
import { odooModules } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

export default async function OdooSpotlight() {
  const t = await getT();
  return (
    <section
      id="odoo"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ background: "linear-gradient(180deg, #eef5fd 0%, #f7fafe 45%, #ffffff 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-light/60 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t("Servicio estrella", "Servei estrela", "Flagship service")}
          title={t(
            "Odoo ERP, implantado por quien entiende de empresa",
            "Odoo ERP, implantat per qui entén d'empresa",
            "Odoo ERP, implemented by people who understand business",
          )}
          body={t(
            "Diagnóstico, configuración, migración de datos, formación del equipo y soporte continuo. No nos limitamos a venderte licencias: acompañamos la implantación de principio a fin.",
            "Diagnòstic, configuració, migració de dades, formació de l'equip i suport continu. No ens limitem a vendre't llicències: acompanyem la implantació de principi a fi.",
            "Assessment, configuration, data migration, team training and ongoing support. We don't just sell you licences: we see the implementation through from start to finish.",
          )}
        />

        <Reveal direction="scale">
          <OdooExplorer
            modules={odooModules.map((mod) => ({ label: t(mod.label), body: t(mod.body) }))}
            hint={t(
              "Todos los módulos comparten los mismos datos: un cliente, un pedido o una factura se escriben una sola vez.",
              "Tots els mòduls compartixen les mateixes dades: un client, una comanda o una factura s'escriuen una sola vegada.",
              "Every app shares the same data: a customer, an order or an invoice is entered only once.",
            )}
          />
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row" delay={0.1}>
          <Link href="/contacto#diagnostico" data-magnetic className="btn btn-dark">
            {t("Habla con un consultor Odoo", "Parla amb un consultor d'Odoo", "Talk to an Odoo consultant")}
            <span className="btn-arrow" aria-hidden>
              →
            </span>
          </Link>
          <Link href="/servicios/odoo" data-magnetic className="btn btn-outline">
            {t("Cómo implantamos Odoo", "Com implantem Odoo", "How we implement Odoo")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
