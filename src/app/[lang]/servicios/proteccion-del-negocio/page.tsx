import type { Metadata } from "next";
import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import IndexMark from "@/components/index-mark";
import CtaBand from "@/components/sections/cta-band";
import type { Localized } from "@/lib/i18n";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/servicios/proteccion-del-negocio", {
    title: t("Ciberseguridad gestionada para empresas en Valencia y Alicante", "Ciberseguretat gestionada per a empreses a València i Alacant"),
    description: t(
      "Ciberseguridad gestionada a medida para servidores Windows, Ubuntu, Plesk/web y equipos de trabajo: paquetes orientativos o servicios por separado, con presupuesto personalizado. Partner oficial de ESET.",
      "Ciberseguretat gestionada a mida per a servidors Windows, Ubuntu, Plesk/web i equips de treball: paquets orientatius o serveis per separat, amb pressupost personalitzat. Partner oficial d'ESET.",
    ),
  });
}

const certifications: Localized[] = [
  { es: "Cisco CyberOps Associate", ca: "Cisco CyberOps Associate" },
  { es: "Cisco Hacking Ético", ca: "Cisco Hacking Ètic" },
  { es: "Esquema Nacional de Seguridad (CCN)", ca: "Esquema Nacional de Seguretat (CCN)" },
  { es: "Partner oficial de ESET", ca: "Partner oficial d'ESET" },
];

// Etiquetas de las filas de cada paquete
const specLabels = {
  patches: { es: "Actualizaciones y parches", ca: "Actualitzacions i pegats" },
  monitoring: { es: "Monitorización", ca: "Monitoratge" },
  backups: { es: "Copias de seguridad", ca: "Còpies de seguretat" },
  scans: { es: "Escaneo de vulnerabilidades", ca: "Escaneig de vulnerabilitats" },
  report: { es: "Informe al cliente", ca: "Informe al client" },
  response: { es: "Respuesta ante incidentes", ca: "Resposta davant d'incidents" },
} satisfies Record<string, Localized>;

const tierNames: readonly Localized[] = [
  { es: "Básico", ca: "Bàsic" },
  { es: "Profesional", ca: "Professional" },
  { es: "Avanzado", ca: "Avançat" },
];

const monthly: Localized = { es: "Mensual", ca: "Mensual" };
const quarterly: Localized = { es: "Trimestral", ca: "Trimestral" };
const yearly: Localized = { es: "Anual", ca: "Anual" };

const plans: {
  name: Localized;
  tagline: Localized;
  featured?: boolean;
  specs: { label: Localized; value: Localized }[];
}[] = [
  {
    name: tierNames[0],
    tagline: { es: "Lo esencial, bien mantenido.", ca: "L'essencial, ben mantingut." },
    specs: [
      { label: specLabels.patches, value: monthly },
      {
        label: specLabels.monitoring,
        value: { es: "Revisión mensual de logs", ca: "Revisió mensual de registres" },
      },
      { label: specLabels.backups, value: { es: "Revisión de que se realizan", ca: "Comprovació que es fan" } },
      { label: specLabels.scans, value: yearly },
      { label: specLabels.report, value: yearly },
      { label: specLabels.response, value: { es: "48 h laborables", ca: "48 h laborables" } },
    ],
  },
  {
    name: tierNames[1],
    tagline: {
      es: "Vigilancia activa y backups probados.",
      ca: "Vigilància activa i còpies de seguretat provades.",
    },
    featured: true,
    specs: [
      { label: specLabels.patches, value: { es: "Semanal", ca: "Setmanal" } },
      {
        label: specLabels.monitoring,
        value: { es: "Alertas automáticas en horario laboral", ca: "Alertes automàtiques en horari laboral" },
      },
      {
        label: specLabels.backups,
        value: {
          es: "Gestión + prueba de restauración trimestral",
          ca: "Gestió + prova de restauració trimestral",
        },
      },
      { label: specLabels.scans, value: quarterly },
      { label: specLabels.report, value: quarterly },
      { label: specLabels.response, value: { es: "8 h laborables", ca: "8 h laborables" } },
    ],
  },
  {
    name: tierNames[2],
    tagline: { es: "Protección 24/7 para lo crítico.", ca: "Protecció 24/7 per a allò crític." },
    specs: [
      {
        label: specLabels.patches,
        value: { es: "Semanal + urgentes en 24 h", ca: "Setmanal + urgents en 24 h" },
      },
      { label: specLabels.monitoring, value: { es: "SIEM con alertas 24/7", ca: "SIEM amb alertes 24/7" } },
      {
        label: specLabels.backups,
        value: { es: "3-2-1 inmutable + prueba mensual", ca: "3-2-1 immutable + prova mensual" },
      },
      { label: specLabels.scans, value: monthly },
      { label: specLabels.report, value: { es: "Mensual con reunión", ca: "Mensual amb reunió" } },
      { label: specLabels.response, value: { es: "2 h, 24/7", ca: "2 h, 24/7" } },
    ],
  },
];

const environments: { code: Localized; title: Localized; tiers: Localized[][] }[] = [
  {
    code: { es: "Servidor", ca: "Servidor" },
    title: { es: "Windows Server", ca: "Windows Server" },
    tiers: [
      [
        { es: "Gestión de parches y actualizaciones (WSUS)", ca: "Gestió de pegats i actualitzacions (WSUS)" },
        {
          es: "Configuración y auditoría del Firewall de Windows",
          ca: "Configuració i auditoria del tallafocs de Windows",
        },
        {
          es: "Gestión de permisos NTFS y recursos compartidos",
          ca: "Gestió de permisos NTFS i recursos compartits",
        },
        {
          es: "Copias de seguridad y pruebas de restauración",
          ca: "Còpies de seguretat i proves de restauració",
        },
      ],
      [
        {
          es: "Revisión y endurecimiento de Active Directory (cuentas privilegiadas, delegaciones, contraseñas antiguas, cuentas inactivas)",
          ca: "Revisió i enduriment d'Active Directory (comptes privilegiats, delegacions, contrasenyes antigues, comptes inactius)",
        },
        {
          es: "Securización de RDP (restricción por IP, NLA, puerta de enlace RD, cambio de puerto)",
          ca: "Securització de RDP (restricció per IP, NLA, passarel·la RD, canvi de port)",
        },
        {
          es: "Deshabilitar protocolos inseguros (SMBv1, NTLMv1, TLS antiguos)",
          ca: "Deshabilitació de protocols insegurs (SMBv1, NTLMv1, TLS antics)",
        },
      ],
      [
        { es: "Cifrado de discos con BitLocker", ca: "Xifratge de discos amb BitLocker" },
        {
          es: "Auditoría avanzada y reenvío de eventos a un SIEM",
          ca: "Auditoria avançada i reenviament d'esdeveniments a un SIEM",
        },
      ],
    ],
  },
  {
    code: { es: "Servidor", ca: "Servidor" },
    title: { es: "Ubuntu Server", ca: "Ubuntu Server" },
    tiers: [
      [
        {
          es: "Securización de SSH (solo claves, sin root, puerto, Fail2ban)",
          ca: "Securització de SSH (només claus, sense root, port, Fail2ban)",
        },
        {
          es: "Configuración de firewall (UFW / iptables / nftables)",
          ca: "Configuració del tallafocs (UFW / iptables / nftables)",
        },
        {
          es: "Actualizaciones de seguridad (unattended-upgrades)",
          ca: "Actualitzacions de seguretat (unattended-upgrades)",
        },
        { es: "Gestión de usuarios, grupos y sudo", ca: "Gestió d'usuaris, grups i sudo" },
        { es: "Copias de seguridad", ca: "Còpies de seguretat" },
      ],
      [
        { es: "Revisión de puertos y servicios expuestos", ca: "Revisió de ports i serveis exposats" },
        { es: "Detección de rootkits (rkhunter, chkrootkit)", ca: "Detecció de rootkits (rkhunter, chkrootkit)" },
      ],
      [
        {
          es: "Detección de intrusiones y control de integridad (Wazuh, AIDE, OSSEC)",
          ca: "Detecció d'intrusions i control d'integritat (Wazuh, AIDE, OSSEC)",
        },
      ],
    ],
  },
  {
    code: { es: "Web", ca: "Web" },
    title: { es: "Plesk y servidores web", ca: "Plesk i servidors web" },
    tiers: [
      [
        {
          es: "Actualización de Plesk, PHP y CMS (WordPress, Joomla, PrestaShop…)",
          ca: "Actualització de Plesk, PHP i CMS (WordPress, Joomla, PrestaShop…)",
        },
        {
          es: "Instalación y renovación de certificados SSL/TLS y configuración de HTTPS/HSTS",
          ca: "Instal·lació i renovació de certificats SSL/TLS i configuració d'HTTPS/HSTS",
        },
        {
          es: "Protección contra fuerza bruta en paneles de acceso",
          ca: "Protecció contra atacs de força bruta en panells d'accés",
        },
        {
          es: "Backups externos de webs y bases de datos",
          ca: "Còpies de seguretat externes de webs i bases de dades",
        },
      ],
      [
        {
          es: "Firewall de aplicaciones web (ModSecurity, Imunify360)",
          ca: "Tallafocs d'aplicacions web (ModSecurity, Imunify360)",
        },
        { es: "Análisis y limpieza de malware en webs", ca: "Anàlisi i neteja de programari maliciós en webs" },
        {
          es: "Cabeceras de seguridad HTTP (CSP, X-Frame-Options, etc.)",
          ca: "Capçaleres de seguretat HTTP (CSP, X-Frame-Options, etc.)",
        },
        {
          es: "Securización del correo: SPF, DKIM, DMARC y antispam",
          ca: "Securització del correu: SPF, DKIM, DMARC i antispam",
        },
        {
          es: "Aislamiento entre suscripciones y permisos de ficheros",
          ca: "Aïllament entre subscripcions i permisos de fitxers",
        },
      ],
      [
        { es: "Protección DDoS y CDN (Cloudflare)", ca: "Protecció DDoS i CDN (Cloudflare)" },
        {
          es: "Monitorización de disponibilidad y de listas negras (blacklists)",
          ca: "Monitoratge de disponibilitat i de llistes negres (blacklists)",
        },
        {
          es: "Escaneo de vulnerabilidades web (OWASP Top 10)",
          ca: "Escaneig de vulnerabilitats web (OWASP Top 10)",
        },
      ],
    ],
  },
  {
    code: { es: "Puestos", ca: "Llocs" },
    title: { es: "Equipos de trabajo", ca: "Equips de treball" },
    tiers: [
      [
        {
          es: "Instalación y gestión centralizada de antivirus ESET",
          ca: "Instal·lació i gestió centralitzada de l'antivirus ESET",
        },
        { es: "Inventario de hardware y software", ca: "Inventari de maquinari i programari" },
        { es: "Configuración de backup de equipos", ca: "Configuració de còpies de seguretat dels equips" },
      ],
      [
        {
          es: "Gestión de parches de sistema operativo y aplicaciones",
          ca: "Gestió de pegats del sistema operatiu i de les aplicacions",
        },
        {
          es: "Eliminación de privilegios de administrador a usuarios",
          ca: "Retirada dels privilegis d'administrador als usuaris",
        },
      ],
      [
        { es: "Cifrado de discos en portátiles", ca: "Xifratge de discos en portàtils" },
        { es: "Control de dispositivos USB", ca: "Control de dispositius USB" },
      ],
    ],
  },
];

const allPlans: Localized = { es: "todos los paquetes", ca: "tots els paquets" };

const extras: { title: Localized; included?: Localized }[] = [
  {
    title: {
      es: "Auditoría de seguridad inicial con informe de riesgos",
      ca: "Auditoria de seguretat inicial amb informe de riscos",
    },
  },
  {
    title: {
      es: "Escaneo de vulnerabilidades periódico (Nessus, OpenVAS)",
      ca: "Escaneig de vulnerabilitats periòdic (Nessus, OpenVAS)",
    },
    included: allPlans,
  },
  {
    title: {
      es: "Test de intrusión (pentesting) interno y externo",
      ca: "Test d'intrusió (pentesting) intern i extern",
    },
  },
  {
    title: {
      es: "Monitorización 24/7 y alertas (SOC básico con Wazuh o similar)",
      ca: "Monitoratge 24/7 i alertes (SOC bàsic amb Wazuh o similar)",
    },
    included: tierNames[2],
  },
  {
    title: {
      es: "Plan de copias de seguridad 3-2-1 con copia inmutable u offline",
      ca: "Pla de còpies de seguretat 3-2-1 amb còpia immutable o fora de línia",
    },
    included: tierNames[2],
  },
  {
    title: {
      es: "Plan de respuesta ante incidentes y recuperación ante desastres",
      ca: "Pla de resposta davant d'incidents i de recuperació davant de desastres",
    },
  },
  {
    title: {
      es: "Formación y concienciación a empleados, con simulaciones de phishing",
      ca: "Formació i conscienciació dels empleats, amb simulacions de phishing",
    },
  },
  {
    title: {
      es: "Segmentación de red, VPN y revisión del firewall perimetral",
      ca: "Segmentació de xarxa, VPN i revisió del tallafocs perimetral",
    },
  },
  { title: { es: "Gestor de contraseñas corporativo", ca: "Gestor de contrasenyes corporatiu" } },
  { title: { es: "Adecuación normativa: RGPD, ENS y NIS2", ca: "Adequació normativa: RGPD, ENS i NIS2" } },
  {
    title: {
      es: "Informes periódicos mensuales para el cliente",
      ca: "Informes periòdics mensuals per al client",
    },
    included: tierNames[2],
  },
];

const conditions: Localized[] = [
  {
    es: "No tenemos tarifas cerradas: cada presupuesto es personalizado según el número de servidores y equipos, su estado y el nivel de protección que necesites.",
    ca: "No tenim tarifes tancades: cada pressupost és personalitzat segons el nombre de servidors i equips, el seu estat i el nivell de protecció que necessites.",
  },
  {
    es: "Los paquetes son orientativos. Los ajustamos a tu caso y cualquier servicio de esta página se puede contratar por separado.",
    ca: "Els paquets són orientatius. Els ajustem al teu cas i qualsevol servei d'esta pàgina es pot contractar per separat.",
  },
  {
    es: "Lo habitual es empezar con una auditoría inicial para conocer tu situación; si después contratas un paquete, se descuenta del primer año.",
    ca: "El més habitual és començar amb una auditoria inicial per a conéixer la teua situació; si després contractes un paquet, es descompta del primer any.",
  },
  {
    es: "Las horas fuera de lo contratado se facturan según la tarifa horaria acordada.",
    ca: "Les hores fora del que s'ha contractat es facturen segons la tarifa horària acordada.",
  },
];

export default async function ProteccionDelNegocioPage() {
  const t = await getT();
  return (
    <>
      <PageHero
        path="/servicios/proteccion-del-negocio"
        service={t("Ciberseguridad gestionada", "Ciberseguretat gestionada")}
        eyebrow={t("Ciberseguridad · Partner oficial ESET", "Ciberseguretat · Partner oficial d'ESET")}
        title={t("Protección del Negocio", "Protecció del Negoci")}
        lead={t(
          "La seguridad no es una instalación puntual: los ataques, las vulnerabilidades y las normativas cambian cada mes. Por eso la mantenemos, la revisamos y te la reportamos de forma continua.",
          "La seguretat no és una instal·lació puntual: els atacs, les vulnerabilitats i les normatives canvien cada mes. Per això la mantenim, la revisem i te n'informem de manera contínua.",
        )}
      />

      {/* Propuesta + certificaciones */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-ink-soft">
              {t(
                "Protegemos servidores Windows, Ubuntu, Plesk/web y equipos de trabajo. Para orientarte tenemos tres paquetes — Básico, Profesional y Avanzado —, pero no son cerrados: puedes contratar cualquier servicio por separado y sumar servicios puntuales (auditorías, pentesting, formación o adecuación normativa) cuando los necesites. Cada empresa es distinta, así que el precio lo fijamos en un presupuesto personalizado.",
                "Protegim servidors Windows, Ubuntu, Plesk/web i equips de treball. Per a orientar-te tenim tres paquets — Bàsic, Professional i Avançat —, però no són tancats: pots contractar qualsevol servei per separat i afegir-hi serveis puntuals (auditories, pentesting, formació o adequació normativa) quan els necessites. Cada empresa és diferent, així que el preu el fixem en un pressupost personalitzat.",
              )}
            </p>
          </div>

          <Reveal className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert.es}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-alt px-4 py-2 text-[13px] font-semibold text-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {t(cert)}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Paquetes */}
      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Paquetes orientativos", "Paquets orientatius")}
            title={t(
              "Elige el nivel de protección que necesita tu empresa",
              "Tria el nivell de protecció que necessita la teua empresa",
            )}
            body={t(
              "Son una referencia para orientarte, no una tarifa cerrada: ajustamos cada paquete a tus equipos y necesidades, y te damos el precio en un presupuesto personalizado.",
              "Són una referència per a orientar-te, no una tarifa tancada: ajustem cada paquet als teus equips i necessitats, i et donem el preu en un pressupost personalitzat.",
            )}
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal key={plan.name.es} delay={index * 0.08}>
                <TiltCard
                  className={`relative flex h-full flex-col rounded-brand border bg-surface p-7 ${
                    plan.featured ? "border-primary shadow-[0_20px_45px_-25px_rgba(42,107,165,.55)]" : "border-line"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                      {t("Más elegido", "El més triat")}
                    </span>
                  )}
                  <h3 className="text-[22px]">{t(plan.name)}</h3>
                  <p className="mt-1 mb-6 text-[14px] text-ink-soft">{t(plan.tagline)}</p>

                  <dl className="flex flex-col gap-3.5">
                    {plan.specs.map((spec) => (
                      <div key={spec.label.es}>
                        <dt className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-faint">
                          {t(spec.label)}
                        </dt>
                        <dd className="text-[14.5px] text-ink">{t(spec.value)}</dd>
                      </div>
                    ))}
                  </dl>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="flex flex-col items-start gap-5 rounded-brand border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <h3 className="text-[18px]">
                  {t("¿Solo necesitas una parte?", "Només necessites una part?")}
                </h3>
                <p className="mt-1.5 max-w-[64ch] text-[14.5px] leading-relaxed text-ink-soft">
                  {t(
                    "Cualquier servicio se contrata también por separado: solo las copias de seguridad, solo el antivirus de los equipos o una auditoría puntual. Te hacemos el presupuesto con lo que de verdad necesitas.",
                    "Qualsevol servei es contracta també per separat: només les còpies de seguretat, només l'antivirus dels equips o una auditoria puntual. Et fem el pressupost amb el que de veritat necessites.",
                  )}
                </p>
              </div>
              <Link
                href="/contacto#diagnostico"
                className="inline-block shrink-0 rounded-full bg-accent-strong px-6 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(16,185,129,.6)] transition-transform hover:scale-[1.04] active:scale-[0.96]"
              >
                {t("Pedir presupuesto", "Demanar pressupost")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qué incluye cada paquete */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Qué incluye", "Què inclou")}
            title={t("Qué hacemos en cada entorno", "Què fem en cada entorn")}
            body={t("Cada nivel incluye todo lo del nivel anterior.", "Cada nivell inclou tot el del nivell anterior.")}
            align="left"
          />
          <div className="flex flex-col gap-8">
            {environments.map((env, envIndex) => (
              <Reveal key={env.title.es}>
                <div className="rounded-brand border border-line bg-surface p-6 sm:p-8">
                  <IndexMark n={envIndex + 1} label={t(env.code)} className="mb-3" />
                  <h3 className="mb-6 text-[20px]">{t(env.title)}</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {env.tiers.map((items, tierIndex) => (
                      <div key={tierNames[tierIndex].es}>
                        <div className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
                          {tierIndex === 0 ? t(tierNames[0]) : `+ ${t(tierNames[tierIndex])}`}
                        </div>
                        <ul className="flex flex-col gap-2.5">
                          {items.map((item) => (
                            <li
                              key={item.es}
                              className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-soft"
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                                aria-hidden
                              />
                              {t(item)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios complementarios */}
      <section className="bg-surface-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("Servicios complementarios", "Serveis complementaris")}
            title={t("Servicios puntuales, cuando los necesites", "Serveis puntuals, quan els necessites")}
            body={t(
              "Se contratan por separado o vienen incluidos en algunos paquetes. Cada uno se presupuesta según tu caso.",
              "Es contracten per separat o venen inclosos en alguns paquets. Cada un es pressuposta segons el teu cas.",
            )}
            dark
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((extra, index) => (
              <Reveal key={extra.title.es} delay={(index % 3) * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5.5 transition-colors hover:border-accent hover:bg-white/[0.07]">
                  <h3 className="text-[15.5px] leading-snug text-white">{t(extra.title)}</h3>
                  {extra.included && (
                    <div className="mt-auto pt-3">
                      <span className="inline-block rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
                        {t("Incluido en", "Inclòs en")} {t(extra.included)}
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Condiciones */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow={t("Precios", "Preus")}
            title={t("Un presupuesto a medida para cada empresa", "Un pressupost a mida per a cada empresa")}
          />
          <Reveal>
            <ul className="flex flex-col gap-3">
              {conditions.map((condition) => (
                <li
                  key={condition.es}
                  className="flex items-start gap-3 rounded-brand border border-line bg-surface-alt p-4 text-[14.5px] leading-relaxed text-ink"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {t(condition)}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-xs text-ink-soft">
              {t(
                "Las licencias de antivirus/EDR, SIEM o Imunify360 pueden ir incluidas en el presupuesto o facturarse aparte, según el caso.",
                "Les llicències d'antivirus/EDR, SIEM o Imunify360 poden anar incloses en el pressupost o facturar-se a banda, segons el cas.",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={t(
          "¿Sabes qué pasaría si hoy fallara tu sistema?",
          "Saps què passaria si hui fallara el teu sistema?",
        )}
        body={t(
          "Vemos los puntos débiles de tu empresa y te preparamos un presupuesto a medida: con un paquete o solo con los servicios que necesites.",
          "Veiem els punts febles de la teua empresa i et preparem un pressupost a mida: amb un paquet o només amb els serveis que necessites.",
        )}
        ctaLabel={t("Pedir presupuesto", "Demanar pressupost")}
      />
    </>
  );
}
