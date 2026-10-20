import Link from "@/components/link";
import Reveal from "@/components/reveal";
import IndexMark from "@/components/index-mark";
import SectionHeading from "@/components/section-heading";
import { odooModules } from "@/lib/site";
import { getT } from "@/lib/i18n-server";

export default async function OdooSpotlight() {
  const t = await getT();
  return (
    <section id="odoo" className="bg-surface-dark py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow={t("Servicio estrella", "Servei estrela")}
            title={t(
              "Odoo ERP, implantado por quien entiende de empresa",
              "Odoo ERP, implantat per qui entén d'empresa",
            )}
            body={t(
              "Diagnóstico, configuración, migración de datos, formación del equipo y soporte continuo. No nos limitamos a venderte licencias: acompañamos la implantación de principio a fin.",
              "Diagnòstic, configuració, migració de dades, formació de l'equip i suport continu. No ens limitem a vendre't llicències: acompanyem la implantació de principi a fi.",
            )}
            dark
          />
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          {odooModules.map((mod, index) => (
              <div
                key={mod.label.es}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-accent/60 hover:bg-white/[0.07]"
              >
                <IndexMark n={index + 1} dark className="mb-4" />
                <span className="block text-[15px] font-semibold text-white">{t(mod.label)}</span>
                <span className="mt-1 block text-[12.5px] text-mist-soft">{t(mod.body)}</span>
              </div>
            ))}
        </Reveal>

        <div className="mt-9.5 text-center">
          <Link
            href="/contacto#diagnostico"
            className="inline-block rounded-full bg-accent-strong px-6.5 py-3.5 text-[14.5px] font-semibold text-white transition-transform hover:scale-[1.04] active:scale-[0.96]"
          >
            {t("Habla con un consultor Odoo", "Parla amb un consultor d'Odoo")}
          </Link>
        </div>
      </div>
    </section>
  );
}
