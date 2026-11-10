import type { Metadata } from "next";
import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import Icon from "@/components/icons";
import CtaBand from "@/components/sections/cta-band";
import { connectors, software } from "@/lib/site";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/software", {
    title: t("Software de gestión a medida para empresas", "Programari de gestió a mida per a empreses", "Custom Business Management Software"),
    description: t(
      "Software propio de EPSIG: gestión y control eléctrico para campings, gestión de viviendas tuteladas y conectores que integran Forvenues, Ágora, Sage y FACe.",
      "Programari propi d'EPSIG: gestió i control elèctric per a càmpings, gestió d'habitatges tutelats i connectors que integren Forvenues, Ágora, Sage i FACe.",
      "Our own software: electricity management for campsites, supported housing management and connectors for Forvenues, Ágora, Sage and FACe.",
    ),
  });
}

export default async function SoftwarePage() {
  const t = await getT();
  const viviendasFolders = [
    t("1. Vivienda", "1. Habitatge", "1. Home"),
    t("2. Residentes", "2. Residents", "2. Residents"),
    t("7. Protocolo VT", "7. Protocol VT", "7. VT Protocol"),
  ];

  const products = [
    {
      href: software.camping.href,
      icon: "bolt",
      label: t("Campings", "Càmpings", "Campsites"),
      title: t(software.camping.title),
      body: t(
        "Un CRM para la recepción de tu camping: check-in, clientes, electricidad por parcela, tickets de luz, horarios, gráficos e informes de caja en un solo panel.",
        "Un CRM per a la recepció del teu càmping: check-in, clients, electricitat per parcel·la, tiquets de llum, horaris, gràfics i informes de caixa en un sol panell.",
        "A CRM for your campsite reception: check-in, guests, electricity per pitch, electricity tickets, schedules, charts and cash reports in a single dashboard.",
      ),
      cta: t("Descubrir el software →", "Descobrir el programari →", "Discover the software →"),
      art: (
        <CampingArt
          caption={t("12 parcelas · 9 conectadas · caja al día", "12 parcel·les · 9 connectades · caixa al dia", "12 pitches · 9 connected · cash up to date")}
        />
      ),
    },
    {
      href: software.viviendas.href,
      icon: "home",
      label: t("Viviendas tuteladas", "Habitatges tutelats", "Supported housing"),
      title: t(software.viviendas.title),
      body: t(
        "Entidades, empresas, viviendas, residentes, planning de tareas y documentación ordenada en un solo panel, con el certificado de ingreso y coste de plaza en PDF.",
        "Entitats, empreses, habitatges, residents, planificació de tasques i documentació ordenada en un sol panell, amb el certificat d'ingrés i cost de plaça en PDF.",
        "Organisations, companies, homes, residents, task planning and well-organised documentation in a single dashboard, with the admission and place cost certificate as a PDF.",
      ),
      cta: t("Ver el software →", "Veure el programari →", "See the software →"),
      art: (
        <HousingArt
          folders={viviendasFolders}
          caption={t("Certificado listo · PDF generado", "Certificat preparat · PDF generat", "Certificate ready · PDF generated")}
        />
      ),
    },
    {
      href: software.conectores.href,
      icon: "link",
      label: t("Integraciones", "Integracions", "Integrations"),
      title: t(software.conectores.title),
      body: t(
        `${connectors.length} conectores que llevan tus ventas de Forvenues a Ágora, de Ágora a Sage cada día y de Sage a la factura electrónica FACe. Por separado o encadenados.`,
        `${connectors.length} connectors que porten les teues vendes de Forvenues a Ágora, d'Ágora a Sage cada dia i de Sage a la factura electrònica FACe. Per separat o encadenats.`,
        `${connectors.length} connectors that take your sales from Forvenues to Ágora, from Ágora to Sage every day, and from Sage to FACe e-invoicing. Individually or chained together.`,
      ),
      cta: t("Ver los conectores →", "Veure els connectors →", "See the connectors →"),
      art: <ConnectorArt />,
    },
  ];

  return (
    <>
      <PageHero
        path="/software"
        eyebrow={t("Software propio", "Programari propi", "Our own software")}
        title={t("Software que resuelve problemas reales", "Programari que resol problemes reals", "Software that solves real problems")}
        lead={t(
          "Desarrollamos herramientas para los problemas que vemos cada día en nuestros clientes: la luz que no se cobra en un camping, los certificados de una vivienda tutelada hechos a mano o las ventas que se teclean tres veces.",
          "Desenvolupem eines per als problemes que veiem cada dia en els nostres clients: la llum que no es cobra en un càmping, els certificats d'un habitatge tutelat fets a mà o les vendes que es teclegen tres vegades.",
          "We build tools for the problems we see every day at our clients: unbilled electricity at a campsite, supported-home certificates filled in by hand, or sales keyed in three times over.",
        )}
      />

      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(42,107,165,.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 70% 40% at 50% 0%, black, transparent 75%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:gap-8 sm:px-6">
          {products.map((product, index) => (
            <Reveal key={product.href} direction="scale" delay={0.05}>
              <Link
                href={product.href}
                className="card-light card-spotlight group grid overflow-hidden rounded-panel p-2 lg:grid-cols-2 lg:p-2.5"
              >
                {/* Ilustración animada del producto (decorativa) */}
                <div
                  data-observe
                  className={`relative aspect-[16/11] overflow-hidden rounded-[22px] bg-surface-dark sm:aspect-[16/9] lg:aspect-auto lg:min-h-[360px] ${
                    index % 2 ? "lg:order-2" : ""
                  }`}
                  aria-hidden
                >
                  <div className="hero-grid absolute inset-0" />
                  <div className="stars absolute inset-0" />
                  <div
                    className="blob-drift absolute -top-24 -right-20 h-72 w-72 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(42,107,165,.6), transparent 68%)" }}
                  />
                  <div
                    className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(90,169,230,.2), transparent 70%)" }}
                  />
                  {product.art}
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                  <div className="flex items-center gap-3">
                    <span className="icon-tile h-11 w-11 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden>
                      <Icon name={product.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-[11.5px] font-bold tracking-[0.12em] text-primary uppercase">{product.label}</span>
                    <span className="ml-auto font-mono text-[12px] text-ink-faint" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-6 text-[26px] leading-[1.1] text-ink sm:text-[34px]">{product.title}</h2>
                  <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft sm:text-[16px]">{product.body}</p>
                  <span className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-line bg-surface-alt px-4 py-2.5 text-sm font-semibold text-primary transition-colors duration-300 group-hover:border-accent-strong group-hover:bg-accent-strong group-hover:text-white">
                    {product.cta}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title={t("¿Tienes un problema que ningún programa resuelve?", "Tens un problema que cap programa resol?", "Got a problem no software can solve?")}
        body={t(
          "Cuéntanoslo: si podemos automatizarlo o conectarlo, te proponemos cómo.",
          "Conta-nos-ho: si podem automatitzar-lo o connectar-lo, et proposem com.",
          "Tell us about it: if we can automate it or connect it, we'll suggest how.",
        )}
        ctaLabel={t("Hablar con nosotros", "Parlar amb nosaltres", "Talk to us")}
      />
    </>
  );
}

// Plano de parcelas que se encienden por turnos y medidor de consumo.
function CampingArt({ caption }: { caption: string }) {
  const states = ["on", "on", "free", "low", "on", "on", "free", "on", "on", "low", "on", "free"];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6">
      <div className="grid w-full max-w-[340px] grid-cols-6 gap-2">
        {states.map((state, i) => (
          <span
            key={i}
            className={`aspect-square rounded-lg border ${
              state === "on"
                ? "animate-pulse border-accent/50 bg-accent/30 shadow-[0_0_16px_-4px_rgba(90,169,230,.9)]"
                : state === "low"
                  ? "border-[#f5b14c]/50 bg-[#f5b14c]/20"
                  : "border-white/10 bg-white/[0.04]"
            }`}
            style={{ animationDelay: `${(i % 6) * 0.3}s`, animationDuration: "2.8s" }}
          />
        ))}
      </div>
      <span className="glass flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] text-mist-soft backdrop-blur">
        <Icon name="bolt" className="h-3.5 w-3.5 text-[#f5c542]" />
        {caption}
      </span>
      <span className="glass float absolute top-5 right-5 hidden rounded-full px-3 py-1.5 font-mono text-[11px] text-white sm:block">
        12,4 kWh
      </span>
    </div>
  );
}

// Carpetas de la vivienda que se completan una a una.
function HousingArt({ folders, caption }: { folders: string[]; caption: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-6 sm:px-10">
      {folders.map((folder, i) => (
        <div
          key={folder}
          data-reveal="left"
          style={{ "--d": `${200 + i * 160}ms` } as React.CSSProperties}
          className="glass flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-mono text-[11.5px] text-mist backdrop-blur"
        >
          <span className={`h-3 w-3 shrink-0 rounded-[4px] ${i === 2 ? "bg-accent shadow-[0_0_10px_#5aa9e6]" : "bg-[#d6a514]"}`} />
          <span className="min-w-0 flex-1 truncate">{folder}</span>
          <span className="check grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-white" style={{ "--i": i } as React.CSSProperties}>
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.2l2.2 2.2 4.8-4.8" />
            </svg>
          </span>
        </div>
      ))}
      <span className="mt-2 flex items-center gap-2 font-mono text-[11px] text-mist-soft">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_#5aa9e6]" />
        {caption}
      </span>
    </div>
  );
}

// Datos que recorren los cuatro programas en circuito.
function ConnectorArt() {
  const apps = [
    { name: "Forvenues", x: "22%", y: "26%" },
    { name: "Ágora", x: "78%", y: "26%" },
    { name: "Sage", x: "78%", y: "74%" },
    { name: "FACe", x: "22%", y: "74%" },
  ];
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
        {["M22 26 H78", "M78 26 V74", "M78 74 H22"].map((d, i) => (
          <g key={d}>
            <path d={d} stroke="rgba(140,195,239,.25)" strokeWidth="1.5" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              pathLength={100}
              stroke="#b5dcfb"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="trace-pulse"
              style={{ "--td": `${i * 1.1}s`, strokeDasharray: "22 78", filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
            />
          </g>
        ))}
      </svg>
      <span className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-accent/40 bg-gradient-to-b from-surface-dark-2 to-surface-dark text-ice shadow-[0_0_40px_-4px_rgba(61,143,224,.7)]">
        <Icon name="link" className="h-6 w-6" />
      </span>
      {apps.map((app, i) => (
        <span
          key={app.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: app.x, top: app.y }}
        >
          <span
            className="glass float block rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold whitespace-nowrap text-white backdrop-blur sm:px-3.5 sm:text-[12px]"
            style={{ "--fd": `${i * 0.6}s` } as React.CSSProperties}
          >
            {app.name}
          </span>
        </span>
      ))}
    </div>
  );
}
