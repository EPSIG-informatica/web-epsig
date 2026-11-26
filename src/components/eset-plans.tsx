import Link from "@/components/link";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import Icon from "@/components/icons";
import type { Localized } from "@/lib/i18n";
import { getT } from "@/lib/i18n-server";

// Planes de ESET PROTECT y diferencias entre ellos, según el comparativo oficial de ESET
// (https://support.eset.com/en/kb3104, consultado en noviembre de 2026). Sin precios: cada plan
// lleva a /contacto con el plan preseleccionado. "addon" = se puede añadir como complemento.
type Value = "yes" | "no" | "addon";

const plans: { id: string; name: string; tagline: Localized; featured?: boolean }[] = [
  {
    id: "eset-entry",
    name: "ESET PROTECT Entry",
    tagline: {
      es: "Protección multicapa esencial para equipos y servidores, con gestión en la nube o en local.",
      ca: "Protecció multicapa essencial per a equips i servidors, amb gestió al núvol o en local.",
      en: "Essential multilayered protection for computers and servers, with cloud or on-prem management.",
    },
  },
  {
    id: "eset-advanced",
    name: "ESET PROTECT Advanced",
    featured: true,
    tagline: {
      es: "Suma cifrado de discos, análisis en la nube de amenazas desconocidas y reparación frente a ransomware.",
      ca: "Suma xifratge de discos, anàlisi al núvol d'amenaces desconegudes i reparació davant del ransomware.",
      en: "Adds disk encryption, cloud analysis of unknown threats and ransomware remediation.",
    },
  },
  {
    id: "eset-complete",
    name: "ESET PROTECT Complete",
    tagline: {
      es: "Incluye además gestión de vulnerabilidades y parches, seguridad del correo y de las aplicaciones en la nube.",
      ca: "Inclou a més gestió de vulnerabilitats i pedaços, seguretat del correu i de les aplicacions al núvol.",
      en: "Also includes vulnerability and patch management, mail security and cloud app protection.",
    },
  },
  {
    id: "eset-elite",
    name: "ESET PROTECT Elite",
    tagline: {
      es: "Todo lo anterior más detección y respuesta ampliadas (XDR) y autenticación multifactor.",
      ca: "Tot l'anterior més detecció i resposta ampliades (XDR) i autenticació multifactor.",
      en: "Everything above plus extended detection and response (XDR) and multi-factor authentication.",
    },
  },
];

// Columnas en el orden de `plans`: Entry, Advanced, Complete, Elite.
const features: { label: Localized; hint?: Localized; values: [Value, Value, Value, Value] }[] = [
  {
    label: { es: "Protección de equipos y servidores", ca: "Protecció d'equips i servidors", en: "Endpoint and server protection" },
    hint: {
      es: "Windows, macOS, Linux y servidores Windows/Linux, con control de dispositivos y antiphishing",
      ca: "Windows, macOS, Linux i servidors Windows/Linux, amb control de dispositius i antiphishing",
      en: "Windows, macOS, Linux and Windows/Linux servers, with device control and anti-phishing",
    },
    values: ["yes", "yes", "yes", "yes"],
  },
  {
    label: { es: "Reparación frente a ransomware", ca: "Reparació davant del ransomware", en: "Ransomware remediation" },
    values: ["no", "yes", "yes", "yes"],
  },
  {
    label: { es: "Cifrado completo de discos", ca: "Xifratge complet de discos", en: "Full disk encryption" },
    values: ["no", "yes", "yes", "yes"],
  },
  {
    label: { es: "Análisis de amenazas desconocidas en la nube", ca: "Anàlisi d'amenaces desconegudes al núvol", en: "Cloud analysis of unknown threats" },
    hint: { es: "ESET LiveGuard Advanced", ca: "ESET LiveGuard Advanced", en: "ESET LiveGuard Advanced" },
    values: ["no", "yes", "yes", "yes"],
  },
  {
    label: { es: "Protección de cargas en la nube", ca: "Protecció de càrregues al núvol", en: "Cloud workload protection" },
    values: ["no", "yes", "yes", "yes"],
  },
  {
    label: { es: "Protección de móviles", ca: "Protecció de mòbils", en: "Mobile threat defense" },
    values: ["addon", "yes", "yes", "yes"],
  },
  {
    label: { es: "Gestión de vulnerabilidades y parches", ca: "Gestió de vulnerabilitats i pedaços", en: "Vulnerability and patch management" },
    values: ["addon", "addon", "yes", "yes"],
  },
  {
    label: { es: "Seguridad del servidor de correo", ca: "Seguretat del servidor de correu", en: "Mail server security" },
    hint: { es: "ESET Mail Security", ca: "ESET Mail Security", en: "ESET Mail Security" },
    values: ["addon", "addon", "yes", "yes"],
  },
  {
    label: { es: "Protección de aplicaciones en la nube", ca: "Protecció d'aplicacions al núvol", en: "Cloud app protection" },
    hint: { es: "Microsoft 365 y Google Workspace", ca: "Microsoft 365 i Google Workspace", en: "Microsoft 365 and Google Workspace" },
    values: ["addon", "addon", "yes", "yes"],
  },
  {
    label: { es: "Detección y respuesta ampliadas (XDR)", ca: "Detecció i resposta ampliades (XDR)", en: "Extended detection and response (XDR)" },
    hint: { es: "ESET Inspect", ca: "ESET Inspect", en: "ESET Inspect" },
    values: ["no", "no", "no", "yes"],
  },
  {
    label: { es: "Autenticación multifactor", ca: "Autenticació multifactor", en: "Multi-factor authentication" },
    values: ["addon", "addon", "addon", "yes"],
  },
];

function Mark({ value, label }: { value: Value; label: string }) {
  if (value === "yes") {
    return (
      <span
        className="grid h-6 w-6 place-items-center rounded-full border border-primary/25 bg-primary-pale text-primary"
        role="img"
        aria-label={label}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
    );
  }
  if (value === "addon") {
    return (
      <span className="rounded-full border border-line bg-surface-alt px-2.5 py-0.5 text-[11.5px] font-semibold text-ink-soft">{label}</span>
    );
  }
  return (
    <span className="text-ink-faint" role="img" aria-label={label}>
      —
    </span>
  );
}

export default async function EsetPlans() {
  const t = await getT();
  const request = t("Solicitar", "Sol·licitar", "Request");
  const labels = {
    yes: t("Incluido", "Inclòs", "Included"),
    addon: t("Opcional", "Opcional", "Optional"),
    no: t("No incluido", "No inclòs", "Not included"),
  };
  const href = (id: string) => `/contacto?interes=${id}#diagnostico`;

  return (
    <section id="eset" className="section-tint relative scroll-mt-20 overflow-hidden py-28 sm:py-36">
      <div
        className="pointer-events-none absolute -top-40 left-[-10%] h-[420px] w-[70%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(90,169,230,.16), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("Antivirus ESET", "Antivirus ESET", "ESET antivirus")}
          title={t("Los planes de ESET PROTECT, y en qué se diferencian", "Els plans d'ESET PROTECT, i en què es diferencien", "ESET PROTECT plans, and how they differ")}
          body={t(
            "Como partner oficial de ESET te ayudamos a elegir, instalar y gestionar el plan que encaja con tu empresa. Cada plan incluye todo lo del anterior; solicita el que te interese y te preparamos una propuesta a medida.",
            "Com a partner oficial d'ESET t'ajudem a triar, instal·lar i gestionar el pla que encaixa amb la teua empresa. Cada pla inclou tot el de l'anterior; sol·licita el que t'interesse i et preparem una proposta a mida.",
            "As an official ESET partner we help you choose, install and manage the plan that fits your business. Each plan includes everything in the previous one; request the one you like and we'll prepare a tailored proposal.",
          )}
          align="left"
        />

        {/* Escritorio: tabla comparativa */}
        <Reveal className="hidden lg:block">
          <div className="card-light overflow-hidden">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                {t("Comparativa de los planes de ESET PROTECT", "Comparativa dels plans d'ESET PROTECT", "ESET PROTECT plan comparison")}
              </caption>
              <thead>
                <tr className="align-top">
                  <td className="w-[28%] p-6" />
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className={`relative p-6 font-normal ${plan.featured ? "bg-primary-pale/70" : ""}`}
                    >
                      {plan.featured && (
                        <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-accent to-ice" aria-hidden />
                      )}
                      <span className="block text-[17px] leading-tight font-semibold text-ink">{plan.name}</span>
                      <span className="mt-2 block text-[13px] leading-snug text-ink-soft">{t(plan.tagline)}</span>
                      <Link href={href(plan.id)} data-magnetic className={`btn mt-5 w-full ${plan.featured ? "btn-primary" : "btn-outline"}`}>
                        {request}
                        <span className="sr-only"> {plan.name}</span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr key={feature.label.es} className="border-t border-line">
                    <th scope="row" className="p-4 pl-6 align-middle font-normal">
                      <span className="block text-[14.5px] font-semibold text-ink">{t(feature.label)}</span>
                      {feature.hint && <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-soft">{t(feature.hint)}</span>}
                    </th>
                    {feature.values.map((value, i) => (
                      <td key={plans[i].id} className={`p-4 text-center align-middle ${plans[i].featured ? "bg-primary-pale/40" : ""}`}>
                        <span className="inline-flex justify-center">
                          <Mark value={value} label={labels[value]} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Móvil y tableta: una tarjeta por plan */}
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-6 sm:max-w-2xl sm:grid-cols-2 lg:hidden">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={(index % 2) * 0.08} className="h-full">
              <div
                className={`card-light flex h-full flex-col p-6 ${plan.featured ? "!border-primary/40 shadow-[0_24px_50px_-34px_rgba(42,107,165,.6)]" : ""}`}
              >
                {plan.featured && (
                  <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/25 bg-primary-pale px-2.5 py-1 text-[11px] font-bold tracking-[0.1em] text-primary uppercase">
                    <Icon name="spark" className="h-3 w-3" />
                    {t("Más elegido", "El més triat", "Most popular")}
                  </span>
                )}
                <h3 className="text-[19px] text-ink">{plan.name}</h3>
                <p className="mt-2 text-[14px] leading-snug text-ink-soft">{t(plan.tagline)}</p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
                  {features.map((feature) => {
                    const value = feature.values[index];
                    return (
                      <li key={feature.label.es} className="flex items-start justify-between gap-3 text-[14px]">
                        <span className={value === "no" ? "text-ink-faint" : "text-ink"}>{t(feature.label)}</span>
                        <span className="shrink-0 pt-px">
                          <Mark value={value} label={labels[value]} />
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-auto pt-6">
                  <Link href={href(plan.id)} data-magnetic className={`btn w-full ${plan.featured ? "btn-primary" : "btn-outline"}`}>
                    {request}
                    <span className="sr-only"> {plan.name}</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="max-w-3xl text-[13px] leading-relaxed text-ink-soft">
            {t(
              "«Opcional» significa que la función no viene en el plan, pero se puede añadir como complemento. Datos del comparativo oficial de ESET; las funciones pueden variar según el país. ESET ofrece además niveles superiores (Enterprise y servicios MDR): consúltanos si los necesitas. Sin precios publicados: cada propuesta se ajusta a tus equipos.",
              "«Opcional» vol dir que la funció no ve en el pla, però es pot afegir com a complement. Dades del comparatiu oficial d'ESET; les funcions poden variar segons el país. ESET ofereix a més nivells superiors (Enterprise i serveis MDR): consulta'ns si els necessites. Sense preus publicats: cada proposta s'ajusta als teus equips.",
              "“Optional” means the feature isn't in the plan but can be added as an add-on. Data from ESET's official comparison; features may vary by country. ESET also offers higher tiers (Enterprise and MDR services): ask us if you need them. No published prices: each proposal is tailored to your devices.",
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
