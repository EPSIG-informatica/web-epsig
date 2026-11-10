import type { Metadata } from "next";
import Link from "@/components/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import Icon from "@/components/icons";
import CtaBand from "@/components/sections/cta-band";
import type { Localized } from "@/lib/i18n";
import { getT, pageMetadata } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/servicios/proteccion-del-negocio", {
    title: t("Ciberseguridad gestionada para empresas en Valencia y Alicante", "Ciberseguretat gestionada per a empreses a València i Alacant", "Managed Cybersecurity in Valencia and Alicante"),
    description: t(
      "Ciberseguridad gestionada a medida para servidores Windows, Ubuntu, Plesk/web y equipos de trabajo: paquetes orientativos o servicios por separado, con presupuesto personalizado. Partner oficial de ESET.",
      "Ciberseguretat gestionada a mida per a servidors Windows, Ubuntu, Plesk/web i equips de treball: paquets orientatius o serveis per separat, amb pressupost personalitzat. Partner oficial d'ESET.",
      "Managed cybersecurity for Windows, Ubuntu and Plesk servers and workstations: monthly packages or standalone services. Official ESET Partner.",
    ),
  });
}

const certifications: Localized[] = [
  { es: "Cisco CyberOps Associate", ca: "Cisco CyberOps Associate", en: "Cisco CyberOps Associate" },
  { es: "Cisco Hacking Ético", ca: "Cisco Hacking Ètic", en: "Cisco Ethical Hacker" },
  { es: "Esquema Nacional de Seguridad (CCN)", ca: "Esquema Nacional de Seguretat (CCN)", en: "Spanish National Security Framework (ENS, CCN)" },
  { es: "Partner oficial de ESET", ca: "Partner oficial d'ESET", en: "Official ESET Partner" },
];

// Etiquetas de las filas de cada paquete
const specLabels = {
  patches: { es: "Actualizaciones y parches", ca: "Actualitzacions i pegats", en: "Updates and patches" },
  monitoring: { es: "Monitorización", ca: "Monitoratge", en: "Monitoring" },
  backups: { es: "Copias de seguridad", ca: "Còpies de seguretat", en: "Backups" },
  scans: { es: "Escaneo de vulnerabilidades", ca: "Escaneig de vulnerabilitats", en: "Vulnerability scanning" },
  report: { es: "Informe al cliente", ca: "Informe al client", en: "Client report" },
  response: { es: "Respuesta ante incidentes", ca: "Resposta davant d'incidents", en: "Incident response" },
} satisfies Record<string, Localized>;

const tierNames: readonly Localized[] = [
  { es: "Básico", ca: "Bàsic", en: "Basic" },
  { es: "Profesional", ca: "Professional", en: "Professional" },
  { es: "Avanzado", ca: "Avançat", en: "Advanced" },
];

const monthly: Localized = { es: "Mensual", ca: "Mensual", en: "Monthly" };
const quarterly: Localized = { es: "Trimestral", ca: "Trimestral", en: "Quarterly" };
const yearly: Localized = { es: "Anual", ca: "Anual", en: "Annual" };

const plans: {
  name: Localized;
  tagline: Localized;
  featured?: boolean;
  specs: { label: Localized; value: Localized }[];
}[] = [
  {
    name: tierNames[0],
    tagline: { es: "Lo esencial, bien mantenido.", ca: "L'essencial, ben mantingut.", en: "The essentials, well maintained." },
    specs: [
      { label: specLabels.patches, value: monthly },
      {
        label: specLabels.monitoring,
        value: { es: "Revisión mensual de logs", ca: "Revisió mensual de registres", en: "Monthly log review" },
      },
      { label: specLabels.backups, value: { es: "Revisión de que se realizan", ca: "Comprovació que es fan", en: "Check that they are running" } },
      { label: specLabels.scans, value: yearly },
      { label: specLabels.report, value: yearly },
      { label: specLabels.response, value: { es: "48 h laborables", ca: "48 h laborables", en: "48 business hours" } },
    ],
  },
  {
    name: tierNames[1],
    tagline: {
      es: "Vigilancia activa y backups probados.",
      ca: "Vigilància activa i còpies de seguretat provades.",
      en: "Active monitoring and tested backups.",
    },
    featured: true,
    specs: [
      { label: specLabels.patches, value: { es: "Semanal", ca: "Setmanal", en: "Weekly" } },
      {
        label: specLabels.monitoring,
        value: { es: "Alertas automáticas en horario laboral", ca: "Alertes automàtiques en horari laboral", en: "Automatic alerts during business hours" },
      },
      {
        label: specLabels.backups,
        value: {
          es: "Gestión + prueba de restauración trimestral",
          ca: "Gestió + prova de restauració trimestral",
          en: "Management + quarterly restore test",
        },
      },
      { label: specLabels.scans, value: quarterly },
      { label: specLabels.report, value: quarterly },
      { label: specLabels.response, value: { es: "8 h laborables", ca: "8 h laborables", en: "8 business hours" } },
    ],
  },
  {
    name: tierNames[2],
    tagline: { es: "Protección 24/7 para lo crítico.", ca: "Protecció 24/7 per a allò crític.", en: "24/7 protection for what matters most." },
    specs: [
      {
        label: specLabels.patches,
        value: { es: "Semanal + urgentes en 24 h", ca: "Setmanal + urgents en 24 h", en: "Weekly + urgent within 24 h" },
      },
      { label: specLabels.monitoring, value: { es: "SIEM con alertas 24/7", ca: "SIEM amb alertes 24/7", en: "SIEM with 24/7 alerts" } },
      {
        label: specLabels.backups,
        value: { es: "3-2-1 inmutable + prueba mensual", ca: "3-2-1 immutable + prova mensual", en: "Immutable 3-2-1 + monthly test" },
      },
      { label: specLabels.scans, value: monthly },
      { label: specLabels.report, value: { es: "Mensual con reunión", ca: "Mensual amb reunió", en: "Monthly, with a meeting" } },
      { label: specLabels.response, value: { es: "2 h, 24/7", ca: "2 h, 24/7", en: "2 h, 24/7" } },
    ],
  },
];

const environments: { code: Localized; title: Localized; tiers: Localized[][] }[] = [
  {
    code: { es: "Servidor", ca: "Servidor", en: "Server" },
    title: { es: "Windows Server", ca: "Windows Server", en: "Windows Server" },
    tiers: [
      [
        { es: "Gestión de parches y actualizaciones (WSUS)", ca: "Gestió de pegats i actualitzacions (WSUS)", en: "Patch and update management (WSUS)" },
        {
          es: "Configuración y auditoría del Firewall de Windows",
          ca: "Configuració i auditoria del tallafocs de Windows",
          en: "Windows Firewall configuration and auditing",
        },
        {
          es: "Gestión de permisos NTFS y recursos compartidos",
          ca: "Gestió de permisos NTFS i recursos compartits",
          en: "NTFS permissions and file share management",
        },
        {
          es: "Copias de seguridad y pruebas de restauración",
          ca: "Còpies de seguretat i proves de restauració",
          en: "Backups and restore testing",
        },
      ],
      [
        {
          es: "Revisión y endurecimiento de Active Directory (cuentas privilegiadas, delegaciones, contraseñas antiguas, cuentas inactivas)",
          ca: "Revisió i enduriment d'Active Directory (comptes privilegiats, delegacions, contrasenyes antigues, comptes inactius)",
          en: "Active Directory review and hardening (privileged accounts, delegations, old passwords, inactive accounts)",
        },
        {
          es: "Securización de RDP (restricción por IP, NLA, puerta de enlace RD, cambio de puerto)",
          ca: "Securització de RDP (restricció per IP, NLA, passarel·la RD, canvi de port)",
          en: "RDP hardening (IP restriction, NLA, RD Gateway, port change)",
        },
        {
          es: "Deshabilitar protocolos inseguros (SMBv1, NTLMv1, TLS antiguos)",
          ca: "Deshabilitació de protocols insegurs (SMBv1, NTLMv1, TLS antics)",
          en: "Disabling insecure protocols (SMBv1, NTLMv1, legacy TLS)",
        },
      ],
      [
        { es: "Cifrado de discos con BitLocker", ca: "Xifratge de discos amb BitLocker", en: "Disk encryption with BitLocker" },
        {
          es: "Auditoría avanzada y reenvío de eventos a un SIEM",
          ca: "Auditoria avançada i reenviament d'esdeveniments a un SIEM",
          en: "Advanced auditing and event forwarding to a SIEM",
        },
      ],
    ],
  },
  {
    code: { es: "Servidor", ca: "Servidor", en: "Server" },
    title: { es: "Ubuntu Server", ca: "Ubuntu Server", en: "Ubuntu Server" },
    tiers: [
      [
        {
          es: "Securización de SSH (solo claves, sin root, puerto, Fail2ban)",
          ca: "Securització de SSH (només claus, sense root, port, Fail2ban)",
          en: "SSH hardening (key-only access, no root, port, Fail2ban)",
        },
        {
          es: "Configuración de firewall (UFW / iptables / nftables)",
          ca: "Configuració del tallafocs (UFW / iptables / nftables)",
          en: "Firewall configuration (UFW / iptables / nftables)",
        },
        {
          es: "Actualizaciones de seguridad (unattended-upgrades)",
          ca: "Actualitzacions de seguretat (unattended-upgrades)",
          en: "Security updates (unattended-upgrades)",
        },
        { es: "Gestión de usuarios, grupos y sudo", ca: "Gestió d'usuaris, grups i sudo", en: "User, group and sudo management" },
        { es: "Copias de seguridad", ca: "Còpies de seguretat", en: "Backups" },
      ],
      [
        { es: "Revisión de puertos y servicios expuestos", ca: "Revisió de ports i serveis exposats", en: "Review of exposed ports and services" },
        { es: "Detección de rootkits (rkhunter, chkrootkit)", ca: "Detecció de rootkits (rkhunter, chkrootkit)", en: "Rootkit detection (rkhunter, chkrootkit)" },
      ],
      [
        {
          es: "Detección de intrusiones y control de integridad (Wazuh, AIDE, OSSEC)",
          ca: "Detecció d'intrusions i control d'integritat (Wazuh, AIDE, OSSEC)",
          en: "Intrusion detection and integrity monitoring (Wazuh, AIDE, OSSEC)",
        },
      ],
    ],
  },
  {
    code: { es: "Web", ca: "Web", en: "Web" },
    title: { es: "Plesk y servidores web", ca: "Plesk i servidors web", en: "Plesk and web servers" },
    tiers: [
      [
        {
          es: "Actualización de Plesk, PHP y CMS (WordPress, Joomla, PrestaShop…)",
          ca: "Actualització de Plesk, PHP i CMS (WordPress, Joomla, PrestaShop…)",
          en: "Updating Plesk, PHP and CMS (WordPress, Joomla, PrestaShop…)",
        },
        {
          es: "Instalación y renovación de certificados SSL/TLS y configuración de HTTPS/HSTS",
          ca: "Instal·lació i renovació de certificats SSL/TLS i configuració d'HTTPS/HSTS",
          en: "SSL/TLS certificate installation and renewal, and HTTPS/HSTS configuration",
        },
        {
          es: "Protección contra fuerza bruta en paneles de acceso",
          ca: "Protecció contra atacs de força bruta en panells d'accés",
          en: "Brute-force protection for login panels",
        },
        {
          es: "Backups externos de webs y bases de datos",
          ca: "Còpies de seguretat externes de webs i bases de dades",
          en: "Off-site backups of websites and databases",
        },
      ],
      [
        {
          es: "Firewall de aplicaciones web (ModSecurity, Imunify360)",
          ca: "Tallafocs d'aplicacions web (ModSecurity, Imunify360)",
          en: "Web application firewall (ModSecurity, Imunify360)",
        },
        { es: "Análisis y limpieza de malware en webs", ca: "Anàlisi i neteja de programari maliciós en webs", en: "Website malware scanning and clean-up" },
        {
          es: "Cabeceras de seguridad HTTP (CSP, X-Frame-Options, etc.)",
          ca: "Capçaleres de seguretat HTTP (CSP, X-Frame-Options, etc.)",
          en: "HTTP security headers (CSP, X-Frame-Options, etc.)",
        },
        {
          es: "Securización del correo: SPF, DKIM, DMARC y antispam",
          ca: "Securització del correu: SPF, DKIM, DMARC i antispam",
          en: "Email security: SPF, DKIM, DMARC and anti-spam",
        },
        {
          es: "Aislamiento entre suscripciones y permisos de ficheros",
          ca: "Aïllament entre subscripcions i permisos de fitxers",
          en: "Isolation between subscriptions and file permissions",
        },
      ],
      [
        { es: "Protección DDoS y CDN (Cloudflare)", ca: "Protecció DDoS i CDN (Cloudflare)", en: "DDoS protection and CDN (Cloudflare)" },
        {
          es: "Monitorización de disponibilidad y de listas negras (blacklists)",
          ca: "Monitoratge de disponibilitat i de llistes negres (blacklists)",
          en: "Uptime and blacklist monitoring",
        },
        {
          es: "Escaneo de vulnerabilidades web (OWASP Top 10)",
          ca: "Escaneig de vulnerabilitats web (OWASP Top 10)",
          en: "Web vulnerability scanning (OWASP Top 10)",
        },
      ],
    ],
  },
  {
    code: { es: "Puestos", ca: "Llocs", en: "Endpoints" },
    title: { es: "Equipos de trabajo", ca: "Equips de treball", en: "Workstations" },
    tiers: [
      [
        {
          es: "Instalación y gestión centralizada de antivirus ESET",
          ca: "Instal·lació i gestió centralitzada de l'antivirus ESET",
          en: "Centralised installation and management of ESET antivirus",
        },
        { es: "Inventario de hardware y software", ca: "Inventari de maquinari i programari", en: "Hardware and software inventory" },
        { es: "Configuración de backup de equipos", ca: "Configuració de còpies de seguretat dels equips", en: "Workstation backup configuration" },
      ],
      [
        {
          es: "Gestión de parches de sistema operativo y aplicaciones",
          ca: "Gestió de pegats del sistema operatiu i de les aplicacions",
          en: "Operating system and application patch management",
        },
        {
          es: "Eliminación de privilegios de administrador a usuarios",
          ca: "Retirada dels privilegis d'administrador als usuaris",
          en: "Removal of administrator privileges from users",
        },
      ],
      [
        { es: "Cifrado de discos en portátiles", ca: "Xifratge de discos en portàtils", en: "Laptop disk encryption" },
        { es: "Control de dispositivos USB", ca: "Control de dispositius USB", en: "USB device control" },
      ],
    ],
  },
];

const allPlans: Localized = { es: "todos los paquetes", ca: "tots els paquets", en: "all packages" };

const extras: { title: Localized; included?: Localized }[] = [
  {
    title: {
      es: "Auditoría de seguridad inicial con informe de riesgos",
      ca: "Auditoria de seguretat inicial amb informe de riscos",
      en: "Initial security audit with risk report",
    },
  },
  {
    title: {
      es: "Escaneo de vulnerabilidades periódico (Nessus, OpenVAS)",
      ca: "Escaneig de vulnerabilitats periòdic (Nessus, OpenVAS)",
      en: "Regular vulnerability scanning (Nessus, OpenVAS)",
    },
    included: allPlans,
  },
  {
    title: {
      es: "Test de intrusión (pentesting) interno y externo",
      ca: "Test d'intrusió (pentesting) intern i extern",
      en: "Internal and external penetration testing (pentesting)",
    },
  },
  {
    title: {
      es: "Monitorización 24/7 y alertas (SOC básico con Wazuh o similar)",
      ca: "Monitoratge 24/7 i alertes (SOC bàsic amb Wazuh o similar)",
      en: "24/7 monitoring and alerts (basic SOC with Wazuh or similar)",
    },
    included: tierNames[2],
  },
  {
    title: {
      es: "Plan de copias de seguridad 3-2-1 con copia inmutable u offline",
      ca: "Pla de còpies de seguretat 3-2-1 amb còpia immutable o fora de línia",
      en: "3-2-1 backup plan with an immutable or offline copy",
    },
    included: tierNames[2],
  },
  {
    title: {
      es: "Plan de respuesta ante incidentes y recuperación ante desastres",
      ca: "Pla de resposta davant d'incidents i de recuperació davant de desastres",
      en: "Incident response and disaster recovery plan",
    },
  },
  {
    title: {
      es: "Formación y concienciación a empleados, con simulaciones de phishing",
      ca: "Formació i conscienciació dels empleats, amb simulacions de phishing",
      en: "Staff training and awareness, with phishing simulations",
    },
  },
  {
    title: {
      es: "Segmentación de red, VPN y revisión del firewall perimetral",
      ca: "Segmentació de xarxa, VPN i revisió del tallafocs perimetral",
      en: "Network segmentation, VPN and perimeter firewall review",
    },
  },
  { title: { es: "Gestor de contraseñas corporativo", ca: "Gestor de contrasenyes corporatiu", en: "Corporate password manager" } },
  { title: { es: "Adecuación normativa: RGPD, ENS y NIS2", ca: "Adequació normativa: RGPD, ENS i NIS2", en: "Regulatory compliance: GDPR, ENS and NIS2" } },
  {
    title: {
      es: "Informes periódicos mensuales para el cliente",
      ca: "Informes periòdics mensuals per al client",
      en: "Regular monthly client reports",
    },
    included: tierNames[2],
  },
];

const conditions: Localized[] = [
  {
    es: "No tenemos tarifas cerradas: cada presupuesto es personalizado según el número de servidores y equipos, su estado y el nivel de protección que necesites.",
    ca: "No tenim tarifes tancades: cada pressupost és personalitzat segons el nombre de servidors i equips, el seu estat i el nivell de protecció que necessites.",
    en: "We don't have fixed rates: every quote is tailored to the number of servers and workstations, their condition and the level of protection you need.",
  },
  {
    es: "Los paquetes son orientativos. Los ajustamos a tu caso y cualquier servicio de esta página se puede contratar por separado.",
    ca: "Els paquets són orientatius. Els ajustem al teu cas i qualsevol servei d'esta pàgina es pot contractar per separat.",
    en: "The packages are indicative. We adapt them to your situation, and any service on this page can be contracted on its own.",
  },
  {
    es: "Lo habitual es empezar con una auditoría inicial para conocer tu situación; si después contratas un paquete, se descuenta del primer año.",
    ca: "El més habitual és començar amb una auditoria inicial per a conéixer la teua situació; si després contractes un paquet, es descompta del primer any.",
    en: "We usually start with an initial audit to understand your situation; if you then sign up for a package, its cost is deducted from the first year.",
  },
  {
    es: "Las horas fuera de lo contratado se facturan según la tarifa horaria acordada.",
    ca: "Les hores fora del que s'ha contractat es facturen segons la tarifa horària acordada.",
    en: "Any hours beyond those contracted are billed at the agreed hourly rate.",
  },
];

// Icono de cada entorno (servidor, servidor, web, puesto de trabajo), dibujado aquí para no tocar `icons.tsx`.
const envIcons = ["server", "server", "web", "endpoint"] as const;

function DeviceIcon({ kind, className = "h-5 w-5" }: { kind: (typeof envIcons)[number]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {kind === "server" && (
        <>
          <rect x="4" y="4" width="16" height="6.5" rx="1.6" />
          <rect x="4" y="13.5" width="16" height="6.5" rx="1.6" />
          <path d="M7.5 7.25h.01M7.5 16.75h.01M11 7.25h5M11 16.75h5" />
        </>
      )}
      {kind === "web" && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z" />
        </>
      )}
      {kind === "endpoint" && (
        <>
          <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.6" />
          <path d="M9 20h6M12 16v4" />
        </>
      )}
    </svg>
  );
}

// Marca de verificación pequeña con brillo.
function GlowCheck({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
        dark
          ? "border border-accent/40 bg-accent/15 text-ice shadow-[0_0_12px_-2px_rgba(90,169,230,.8)]"
          : "border border-primary/25 bg-primary-pale text-primary"
      }`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

// Nodos del diagrama de equipos protegidos (posición en % de la caja 5:4) y su traza hasta el escudo.
const diagramNodes = [
  { x: "18%", y: "20%", path: "M168 160 H122 L72 110 V64" },
  { x: "82%", y: "20%", path: "M232 160 H278 L328 110 V64" },
  { x: "82%", y: "70%", path: "M232 160 H278 L328 210 V224" },
  { x: "18%", y: "70%", path: "M168 160 H122 L72 210 V224" },
];

export default async function ProteccionDelNegocioPage() {
  const t = await getT();
  const quoteLabel = t("Pedir presupuesto", "Demanar pressupost", "Request a quote");
  return (
    <>
      <PageHero
        path="/servicios/proteccion-del-negocio"
        service={t("Ciberseguridad gestionada", "Ciberseguretat gestionada", "Managed cybersecurity")}
        eyebrow={t("Ciberseguridad · Partner oficial ESET", "Ciberseguretat · Partner oficial d'ESET", "Cybersecurity · Official ESET Partner")}
        title={t("Protección del Negocio", "Protecció del Negoci", "Business Protection")}
        lead={t(
          "La seguridad no es una instalación puntual: los ataques, las vulnerabilidades y las normativas cambian cada mes. Por eso la mantenemos, la revisamos y te la reportamos de forma continua.",
          "La seguretat no és una instal·lació puntual: els atacs, les vulnerabilitats i les normatives canvien cada mes. Per això la mantenim, la revisem i te n'informem de manera contínua.",
          "Security isn't a one-off installation: attacks, vulnerabilities and regulations change every month. That's why we maintain it, review it and report back to you on an ongoing basis.",
        )}
      />

      {/* Propuesta + certificaciones + diagrama de equipos protegidos */}
      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[70%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(90,169,230,.18), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal direction="right">
              <p className="text-[16.5px] leading-relaxed text-ink-soft sm:text-[17.5px]">
                {t(
                  "Protegemos servidores Windows, Ubuntu, Plesk/web y equipos de trabajo. Para orientarte tenemos tres paquetes — Básico, Profesional y Avanzado —, pero no son cerrados: puedes contratar cualquier servicio por separado y sumar servicios puntuales (auditorías, pentesting, formación o adecuación normativa) cuando los necesites. Cada empresa es distinta, así que el precio lo fijamos en un presupuesto personalizado.",
                  "Protegim servidors Windows, Ubuntu, Plesk/web i equips de treball. Per a orientar-te tenim tres paquets — Bàsic, Professional i Avançat —, però no són tancats: pots contractar qualsevol servei per separat i afegir-hi serveis puntuals (auditories, pentesting, formació o adequació normativa) quan els necessites. Cada empresa és diferent, així que el preu el fixem en un pressupost personalitzat.",
                  "We protect Windows, Ubuntu and Plesk/web servers and workstations. To guide you, we offer three packages — Basic, Professional and Advanced — but they aren't set in stone: you can contract any service on its own and add one-off services (audits, pentesting, training or regulatory compliance) whenever you need them. Every business is different, so we set the price in a personalised quote.",
                )}
              </p>
            </Reveal>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {certifications.map((cert, index) => (
                <li
                  key={cert.es}
                  data-reveal="up"
                  style={{ "--d": `${150 + index * 80}ms` } as React.CSSProperties}
                  className="card-light card-spotlight flex h-full items-center gap-3 p-3.5 text-[13.5px] font-semibold text-ink"
                >
                  <span className="icon-tile !h-9 !w-9 shrink-0 !rounded-xl">
                    <Icon name="shield" className="h-4.5 w-4.5" />
                  </span>
                  {t(cert)}
                </li>
              ))}
            </ul>
          </div>

          {/* Diagrama: escudo central con pulsos hacia cada entorno protegido */}
          <Reveal direction="scale" delay={0.1}>
            <div className="relative overflow-hidden rounded-panel border border-white/10 bg-surface-dark p-3 shadow-[0_40px_80px_-40px_rgba(7,16,31,.7)] sm:p-5">
              <div className="stars pointer-events-none absolute inset-0" aria-hidden />
              <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(61,143,224,.35), transparent 65%)" }}
                aria-hidden
              />
              <div className="relative aspect-[5/4] w-full">
                <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
                  <circle cx="200" cy="160" r="70" stroke="rgba(140,195,239,.14)" strokeDasharray="2 6" />
                  <circle cx="200" cy="160" r="104" stroke="rgba(140,195,239,.08)" />
                  {diagramNodes.map((node, i) => (
                    <g key={node.path}>
                      <path d={node.path} stroke="rgba(140,195,239,.22)" strokeWidth="1.5" />
                      <path
                        d={node.path}
                        pathLength={100}
                        stroke="#b5dcfb"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        className="trace-pulse"
                        style={{ "--td": `${i * 0.85}s`, filter: "drop-shadow(0 0 4px #5aa9e6)" } as React.CSSProperties}
                      />
                    </g>
                  ))}
                </svg>
                <span
                  className="pointer-events-none absolute top-1/2 left-1/2 h-[46%] w-[37%] -translate-x-1/2 -translate-y-1/2 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-accent/25"
                  aria-hidden
                />
                <div
                  className="absolute top-1/2 left-1/2 grid h-[26%] w-[21%] -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-[22%] border border-accent/40 bg-gradient-to-b from-[#10284a] to-[#081426] shadow-[0_0_50px_-6px_rgba(61,143,224,.75)]"
                  aria-hidden
                >
                  <Icon name="shield" className="h-1/2 w-1/2 text-ice" />
                  <span className="scan-line absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
                </div>
                {environments.map((env, i) => (
                  <div
                    key={env.title.es}
                    className="absolute flex w-[34%] max-w-[9rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
                    style={{ left: diagramNodes[i].x, top: diagramNodes[i].y } as React.CSSProperties}
                  >
                    <span
                      className="glass float grid h-9 w-9 place-items-center rounded-xl text-mist-accent sm:h-12 sm:w-12"
                      style={{ "--fd": `${i * 0.7}s` } as React.CSSProperties}
                    >
                      <DeviceIcon kind={envIcons[i]} className="h-4.5 w-4.5 sm:h-5.5 sm:w-5.5" />
                    </span>
                    <span className="text-[10.5px] leading-tight font-semibold text-mist sm:text-[12px]">{t(env.title)}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#5aa9e6]" aria-hidden />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Paquetes */}
      <section className="relative overflow-hidden bg-night py-28 text-white sm:py-36">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[min(900px,140%)] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(42,107,165,.3), transparent 65%)" }}
          aria-hidden
        />
        <div className="stars pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            dark
            eyebrow={t("Paquetes orientativos", "Paquets orientatius", "Indicative packages")}
            title={t(
              "Elige el nivel de protección que necesita tu empresa",
              "Tria el nivell de protecció que necessita la teua empresa",
              "Choose the level of protection your business needs",
            )}
            body={t(
              "Son una referencia para orientarte, no una tarifa cerrada: ajustamos cada paquete a tus equipos y necesidades, y te damos el precio en un presupuesto personalizado.",
              "Són una referència per a orientar-te, no una tarifa tancada: ajustem cada paquet als teus equips i necessitats, i et donem el preu en un pressupost personalitzat.",
              "They're a guide to point you in the right direction, not a fixed rate: we adapt each package to your systems and needs, and give you the price in a personalised quote.",
            )}
          />
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan, index) => (
              <Reveal key={plan.name.es} delay={index * 0.08} direction="scale" className="h-full">
                <div
                  className={`glass card-spotlight relative flex h-full flex-col rounded-panel p-6 sm:p-8 ${
                    plan.featured
                      ? "!border-accent/60 !bg-surface-dark-2/60 !shadow-[0_0_60px_-20px_rgba(61,143,224,.8)] lg:-my-3 lg:py-11"
                      : ""
                  }`}
                >
                  {plan.featured && (
                    <>
                      <span
                        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-ice to-transparent"
                        aria-hidden
                      />
                      <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-gradient-to-b from-[#3478b6] to-accent-strong px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_24px_-4px_rgba(61,143,224,.9)] sm:left-8">
                        <Icon name="spark" className="h-3 w-3" />
                        {t("Más elegido", "El més triat", "Most popular")}
                      </span>
                    </>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[12px] text-accent">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="mt-1.5 text-[24px] text-white sm:text-[26px]">{t(plan.name)}</h3>
                    </div>
                    {/* Nivel de protección: barras que crecen */}
                    <div data-observe className="flex h-10 items-end gap-1" aria-hidden>
                      {[0, 1, 2].map((bar) => (
                        <span
                          key={bar}
                          className={`grow-bar w-2 rounded-full ${
                            bar <= index ? "bg-gradient-to-t from-primary to-ice shadow-[0_0_10px_-1px_#5aa9e6]" : "bg-white/10"
                          }`}
                          style={{ height: `${40 + bar * 30}%`, "--bd": `${0.3 + bar * 0.12}s` } as React.CSSProperties}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-[14.5px] text-mist-soft">{t(plan.tagline)}</p>

                  <div className="my-6 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" aria-hidden />

                  <dl className="flex flex-col gap-4">
                    {plan.specs.map((spec) => (
                      <div key={spec.label.es} className="flex items-start gap-3">
                        <GlowCheck dark />
                        <div className="min-w-0">
                          <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-mist-faint">{t(spec.label)}</dt>
                          <dd className="mt-0.5 text-[14.5px] text-mist">{t(spec.value)}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto pt-8">
                    <Link
                      href="/contacto#diagnostico"
                      data-magnetic
                      className={`btn w-full ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                    >
                      {quoteLabel}
                      <span className="btn-arrow" aria-hidden>
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 sm:mt-12">
            <div className="glass card-spotlight flex flex-col items-start gap-5 rounded-panel p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="icon-tile-dark !hidden shrink-0 sm:!grid">
                  <Icon name="link" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[18px] text-white sm:text-[20px]">
                    {t("¿Solo necesitas una parte?", "Només necessites una part?", "Only need part of it?")}
                  </h3>
                  <p className="mt-1.5 max-w-[64ch] text-[14.5px] leading-relaxed text-mist-soft">
                    {t(
                      "Cualquier servicio se contrata también por separado: solo las copias de seguridad, solo el antivirus de los equipos o una auditoría puntual. Te hacemos el presupuesto con lo que de verdad necesitas.",
                      "Qualsevol servei es contracta també per separat: només les còpies de seguretat, només l'antivirus dels equips o una auditoria puntual. Et fem el pressupost amb el que de veritat necessites.",
                      "Any service can also be contracted on its own: just the backups, just antivirus for your workstations, or a one-off audit. We'll quote you for what you actually need.",
                    )}
                  </p>
                </div>
              </div>
              <Link href="/contacto#diagnostico" data-magnetic className="btn btn-light w-full shrink-0 md:w-auto">
                {quoteLabel}
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qué incluye cada paquete */}
      <section className="relative overflow-hidden bg-surface py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t("Qué incluye", "Què inclou", "What's included")}
            title={t("Qué hacemos en cada entorno", "Què fem en cada entorn", "What we do in each environment")}
            body={t("Cada nivel incluye todo lo del nivel anterior.", "Cada nivell inclou tot el del nivell anterior.", "Each level includes everything in the previous one.")}
            align="left"
          />
          <div className="grid grid-cols-1 gap-6">
            {environments.map((env, envIndex) => (
              <Reveal key={env.title.es} delay={(envIndex % 2) * 0.08}>
                <div data-observe className="card-light card-spotlight overflow-hidden p-5 sm:p-8">
                  <div className="mb-6 flex items-center gap-4 sm:mb-8">
                    <span className="icon-tile shrink-0">
                      <DeviceIcon kind={envIcons[envIndex]} className="h-5.5 w-5.5" />
                    </span>
                    <div className="min-w-0">
                      <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-primary">
                        {String(envIndex + 1).padStart(2, "0")} · {t(env.code)}
                      </span>
                      <h3 className="text-[20px] text-ink sm:text-[24px]">{t(env.title)}</h3>
                    </div>
                  </div>

                  {/* Progresión de niveles: línea que se dibuja al entrar */}
                  <div className="relative mb-6 hidden md:block" aria-hidden>
                    <div className="h-px w-full bg-line" />
                    <div
                      className="draw-line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary via-accent to-ice shadow-[0_0_8px_#5aa9e6]"
                      style={{ "--d": "300ms" } as React.CSSProperties}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                    {env.tiers.map((items, tierIndex) => (
                      <div
                        key={tierNames[tierIndex].es}
                        className={`relative ${tierIndex > 0 ? "border-t border-line pt-6 md:border-t-0 md:pt-0" : ""}`}
                      >
                        <div className="mb-3.5 flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              tierIndex === 2 ? "bg-accent shadow-[0_0_10px_#5aa9e6]" : tierIndex === 1 ? "bg-primary" : "bg-primary-light"
                            }`}
                            aria-hidden
                          />
                          <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
                            {tierIndex === 0 ? t(tierNames[0]) : `+ ${t(tierNames[tierIndex])}`}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-3">
                          {items.map((item) => (
                            <li key={item.es} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                              <GlowCheck />
                              <span className="min-w-0">{t(item)}</span>
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
      <section className="relative overflow-hidden bg-surface-dark py-28 text-white sm:py-36">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute bottom-[-200px] left-1/2 h-[460px] w-[min(1000px,150%)] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(61,143,224,.22), transparent 65%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t("Servicios complementarios", "Serveis complementaris", "Additional services")}
            title={t("Servicios puntuales, cuando los necesites", "Serveis puntuals, quan els necessites", "One-off services, whenever you need them")}
            body={t(
              "Se contratan por separado o vienen incluidos en algunos paquetes. Cada uno se presupuesta según tu caso.",
              "Es contracten per separat o venen inclosos en alguns paquets. Cada un es pressuposta segons el teu cas.",
              "Contracted separately or included in some packages. Each one is quoted according to your situation.",
            )}
            dark
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((extra, index) => (
              <Reveal key={extra.title.es} delay={(index % 3) * 0.08}>
                <div className="glass card-spotlight group flex h-full flex-col rounded-panel p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="icon-tile-dark !h-10 !w-10 !rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_24px_-4px_rgba(90,169,230,.8)]">
                      <Icon name="shield" className="h-4.5 w-4.5" />
                    </span>
                    <span className="font-mono text-[11.5px] text-mist-faint">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-[15.5px] leading-snug text-white">{t(extra.title)}</h3>
                  {extra.included && (
                    <div className="mt-auto pt-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-ice">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#5aa9e6]" aria-hidden />
                        {t("Incluido en", "Inclòs en", "Included in")} {t(extra.included)}
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
      <section className="section-tint relative overflow-hidden py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={t("Precios", "Preus", "Pricing")}
            title={t("Un presupuesto a medida para cada empresa", "Un pressupost a mida per a cada empresa", "A tailored quote for every business")}
          />
          <ul className="flex flex-col gap-3">
            {conditions.map((condition, index) => (
              <li
                key={condition.es}
                data-reveal="up"
                style={{ "--d": `${index * 80}ms` } as React.CSSProperties}
                className="card-light card-spotlight flex items-start gap-4 p-4 text-[14.5px] leading-relaxed text-ink sm:p-5"
              >
                <span className="icon-tile !h-8 !w-8 shrink-0 !rounded-lg font-mono text-[12px]" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 pt-1">{t(condition)}</span>
              </li>
            ))}
          </ul>
          <Reveal delay={0.35}>
            <p className="mt-6 text-center text-xs text-ink-soft">
              {t(
                "Las licencias de antivirus/EDR, SIEM o Imunify360 pueden ir incluidas en el presupuesto o facturarse aparte, según el caso.",
                "Les llicències d'antivirus/EDR, SIEM o Imunify360 poden anar incloses en el pressupost o facturar-se a banda, segons el cas.",
                "Antivirus/EDR, SIEM or Imunify360 licences may be included in the quote or invoiced separately, depending on the case.",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={t(
          "¿Sabes qué pasaría si hoy fallara tu sistema?",
          "Saps què passaria si hui fallara el teu sistema?",
          "Do you know what would happen if your system went down today?",
        )}
        body={t(
          "Vemos los puntos débiles de tu empresa y te preparamos un presupuesto a medida: con un paquete o solo con los servicios que necesites.",
          "Veiem els punts febles de la teua empresa i et preparem un pressupost a mida: amb un paquet o només amb els serveis que necessites.",
          "We identify your business's weak points and prepare a tailored quote: with a package or just the services you need.",
        )}
        ctaLabel={quoteLabel}
      />
    </>
  );
}
