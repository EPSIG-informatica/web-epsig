import Reveal from "@/components/reveal";
import { getT } from "@/lib/i18n-server";

export default async function Mission() {
  const t = await getT();
  return (
    <section className="bg-surface-alt py-20 text-center sm:py-24">
      <Reveal className="mx-auto max-w-3xl px-6">
        <p className="font-display text-[26px] font-semibold leading-[1.35] text-ink sm:text-[32px]">
          {t(
            <>
              Ayudamos a las empresas a{" "}
              <span className="text-primary">mejorar su gestión</span>,{" "}
              <span className="text-primary">digitalizar sus procesos</span> y{" "}
              <span className="text-accent-strong">proteger su negocio</span>.
            </>,
            <>
              Ajudem les empreses a{" "}
              <span className="text-primary">millorar la seua gestió</span>,{" "}
              <span className="text-primary">digitalitzar els seus processos</span> i{" "}
              <span className="text-accent-strong">protegir el seu negoci</span>.
            </>,
            <>
              We help businesses{" "}
              <span className="text-primary">improve their management</span>,{" "}
              <span className="text-primary">digitalise their processes</span> and{" "}
              <span className="text-accent-strong">protect their operations</span>.
            </>,
          )}
        </p>
        <small className="mt-5.5 block font-mono text-[13px] tracking-wide text-ink-soft">
          {t("ESTE ES EL PORQUÉ DETRÁS DE CADA SERVICIO DE EPSIG", "ESTE ÉS EL PERQUÈ DE CADA SERVEI D'EPSIG", "THIS IS THE WHY BEHIND EVERY EPSIG SERVICE")}
        </small>
      </Reveal>
    </section>
  );
}
