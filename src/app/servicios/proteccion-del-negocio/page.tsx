import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import IndexMark from "@/components/index-mark";
import CtaBand from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Protección del Negocio",
  description:
    "Ciberseguridad gestionada en tres paquetes mensuales (Básico, Profesional y Avanzado) para servidores Windows, Ubuntu, Plesk/web y equipos de trabajo. Partner oficial de ESET.",
};

const certifications = [
  "Cisco CyberOps Associate",
  "Cisco Hacking Ético",
  "Esquema Nacional de Seguridad (CCN)",
  "Partner oficial de ESET",
];

const plans = [
  {
    name: "Básico",
    tagline: "Lo esencial, bien mantenido.",
    prices: [
      { label: "Servidor Windows/Ubuntu", value: "60–90 €" },
      { label: "Servidor Plesk/web", value: "50–80 €" },
      { label: "Equipo con ESET", value: "5–8 €" },
    ],
    specs: [
      { label: "Actualizaciones y parches", value: "Mensual" },
      { label: "Monitorización", value: "Revisión mensual de logs" },
      { label: "Copias de seguridad", value: "Revisión de que se realizan" },
      { label: "Escaneo de vulnerabilidades", value: "Anual" },
      { label: "Informe al cliente", value: "Anual" },
      { label: "Respuesta ante incidentes", value: "48 h laborables" },
    ],
  },
  {
    name: "Profesional",
    tagline: "Vigilancia activa y backups probados.",
    featured: true,
    prices: [
      { label: "Servidor Windows/Ubuntu", value: "120–180 €" },
      { label: "Servidor Plesk/web", value: "100–160 €" },
      { label: "Equipo con ESET", value: "10–15 €" },
    ],
    specs: [
      { label: "Actualizaciones y parches", value: "Semanal" },
      { label: "Monitorización", value: "Alertas automáticas en horario laboral" },
      { label: "Copias de seguridad", value: "Gestión + prueba de restauración trimestral" },
      { label: "Escaneo de vulnerabilidades", value: "Trimestral" },
      { label: "Informe al cliente", value: "Trimestral" },
      { label: "Respuesta ante incidentes", value: "8 h laborables" },
    ],
  },
  {
    name: "Avanzado",
    tagline: "Protección 24/7 para lo crítico.",
    prices: [
      { label: "Servidor Windows/Ubuntu", value: "220–350 €" },
      { label: "Servidor Plesk/web", value: "200–300 €" },
      { label: "Equipo con ESET", value: "18–25 €" },
    ],
    specs: [
      { label: "Actualizaciones y parches", value: "Semanal + urgentes en 24 h" },
      { label: "Monitorización", value: "SIEM con alertas 24/7" },
      { label: "Copias de seguridad", value: "3-2-1 inmutable + prueba mensual" },
      { label: "Escaneo de vulnerabilidades", value: "Mensual" },
      { label: "Informe al cliente", value: "Mensual con reunión" },
      { label: "Respuesta ante incidentes", value: "2 h, 24/7" },
    ],
  },
];

const tierNames = ["Básico", "Profesional", "Avanzado"] as const;

const environments = [
  {
    code: "Servidor",
    title: "Windows Server",
    tiers: [
      [
        "Gestión de parches y actualizaciones (WSUS)",
        "Configuración y auditoría del Firewall de Windows",
        "Gestión de permisos NTFS y recursos compartidos",
        "Copias de seguridad y pruebas de restauración",
      ],
      [
        "Revisión y endurecimiento de Active Directory (cuentas privilegiadas, delegaciones, contraseñas antiguas, cuentas inactivas)",
        "Securización de RDP (restricción por IP, NLA, puerta de enlace RD, cambio de puerto)",
        "Deshabilitar protocolos inseguros (SMBv1, NTLMv1, TLS antiguos)",
      ],
      [
        "Cifrado de discos con BitLocker",
        "Auditoría avanzada y reenvío de eventos a un SIEM",
      ],
    ],
  },
  {
    code: "Servidor",
    title: "Ubuntu Server",
    tiers: [
      [
        "Securización de SSH (solo claves, sin root, puerto, Fail2ban)",
        "Configuración de firewall (UFW / iptables / nftables)",
        "Actualizaciones de seguridad (unattended-upgrades)",
        "Gestión de usuarios, grupos y sudo",
        "Copias de seguridad",
      ],
      [
        "Revisión de puertos y servicios expuestos",
        "Detección de rootkits (rkhunter, chkrootkit)",
      ],
      ["Detección de intrusiones y control de integridad (Wazuh, AIDE, OSSEC)"],
    ],
  },
  {
    code: "Web",
    title: "Plesk y servidores web",
    tiers: [
      [
        "Actualización de Plesk, PHP y CMS (WordPress, Joomla, PrestaShop…)",
        "Instalación y renovación de certificados SSL/TLS y configuración de HTTPS/HSTS",
        "Protección contra fuerza bruta en paneles de acceso",
        "Backups externos de webs y bases de datos",
      ],
      [
        "Firewall de aplicaciones web (ModSecurity, Imunify360)",
        "Análisis y limpieza de malware en webs",
        "Cabeceras de seguridad HTTP (CSP, X-Frame-Options, etc.)",
        "Securización del correo: SPF, DKIM, DMARC y antispam",
        "Aislamiento entre suscripciones y permisos de ficheros",
      ],
      [
        "Protección DDoS y CDN (Cloudflare)",
        "Monitorización de disponibilidad y de listas negras (blacklists)",
        "Escaneo de vulnerabilidades web (OWASP Top 10)",
      ],
    ],
  },
  {
    code: "Puestos",
    title: "Equipos de trabajo",
    tiers: [
      [
        "Instalación y gestión centralizada de antivirus ESET",
        "Inventario de hardware y software",
        "Configuración de backup de equipos",
      ],
      [
        "Gestión de parches de sistema operativo y aplicaciones",
        "Eliminación de privilegios de administrador a usuarios",
      ],
      ["Cifrado de discos en portátiles", "Control de dispositivos USB"],
    ],
  },
];

const extras = [
  { title: "Auditoría de seguridad inicial con informe de riesgos", price: "600–2.000 €" },
  {
    title: "Escaneo de vulnerabilidades periódico (Nessus, OpenVAS)",
    price: "300–900 € por escaneo",
    included: "todos los paquetes",
  },
  { title: "Test de intrusión (pentesting) interno y externo", price: "2.500–8.000 €" },
  {
    title: "Monitorización 24/7 y alertas (SOC básico con Wazuh o similar)",
    price: "150–400 €/mes por servidor",
    included: "Avanzado",
  },
  {
    title: "Plan de copias de seguridad 3-2-1 con copia inmutable u offline",
    price: "400–1.200 € diseño + almacenamiento",
    included: "Avanzado",
  },
  { title: "Plan de respuesta ante incidentes y recuperación ante desastres", price: "800–2.500 €" },
  {
    title: "Formación y concienciación a empleados, con simulaciones de phishing",
    price: "400–1.200 € por sesión",
  },
  { title: "Segmentación de red, VPN y revisión del firewall perimetral", price: "400–1.500 €" },
  { title: "Gestor de contraseñas corporativo", price: "3–6 €/mes por usuario" },
  { title: "Adecuación normativa: RGPD, ENS y NIS2", price: "1.500–10.000 €" },
  {
    title: "Informes periódicos mensuales para el cliente",
    price: "50–100 €/mes",
    included: "Avanzado",
  },
];

const conditions = [
  "Todo cliente nuevo empieza con una auditoría inicial, que se descuenta del primer año si contrata un paquete.",
  "10 % de descuento a partir de 5 servidores o 25 equipos, y 15 % con permanencia de 12 meses.",
  "Las horas fuera del alcance del paquete se facturan según la tarifa horaria acordada.",
];

export default function ProteccionDelNegocioPage() {
  return (
    <>
      <PageHero
        eyebrow="Protección del Negocio · Partner oficial ESET"
        title="Ciberseguridad gestionada, mes a mes"
        lead="La seguridad no es una instalación puntual: los ataques, las vulnerabilidades y las normativas cambian cada mes. Por eso la mantenemos, la revisamos y te la reportamos de forma continua."
      />

      {/* Propuesta + certificaciones */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-ink-soft">
              Tres paquetes mensuales — Básico, Profesional y Avanzado — para servidores Windows,
              Ubuntu, Plesk/web y equipos de trabajo. Cada paquete se contrata por servidor o por
              equipo, y se completa con servicios puntuales (auditorías, pentesting, formación o
              adecuación normativa) cuando los necesites.
            </p>
          </div>

          <Reveal className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-alt px-4 py-2 text-[13px] font-semibold text-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {cert}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Paquetes */}
      <section className="bg-surface-alt py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Paquetes"
            title="Elige el nivel de protección que necesita tu empresa"
            body="Precios orientativos mensuales, sin IVA, pensados para pymes."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 0.08}>
                <TiltCard
                  className={`relative flex h-full flex-col rounded-brand border bg-surface p-7 ${
                    plan.featured ? "border-primary shadow-[0_20px_45px_-25px_rgba(42,107,165,.55)]" : "border-line"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                      Más elegido
                    </span>
                  )}
                  <h3 className="text-[22px]">{plan.name}</h3>
                  <p className="mt-1 mb-5 text-[14px] text-ink-soft">{plan.tagline}</p>

                  <dl className="mb-6 flex flex-col gap-2 rounded-xl bg-primary-pale p-4">
                    {plan.prices.map((price) => (
                      <div key={price.label} className="flex items-baseline justify-between gap-3">
                        <dt className="text-[13px] text-ink-soft">{price.label}</dt>
                        <dd className="shrink-0 font-mono text-[14px] font-semibold text-primary">
                          {price.value}
                          <span className="text-[11px] font-normal text-ink-soft">/mes</span>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <dl className="flex flex-col gap-3.5">
                    {plan.specs.map((spec) => (
                      <div key={spec.label}>
                        <dt className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-faint">
                          {spec.label}
                        </dt>
                        <dd className="text-[14.5px] text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye cada paquete */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Qué incluye"
            title="Qué hacemos en cada entorno"
            body="Cada nivel incluye todo lo del nivel anterior."
            align="left"
          />
          <div className="flex flex-col gap-8">
            {environments.map((env, envIndex) => (
              <Reveal key={env.title}>
                <div className="rounded-brand border border-line bg-surface p-6 sm:p-8">
                  <IndexMark n={envIndex + 1} label={env.code} className="mb-3" />
                  <h3 className="mb-6 text-[20px]">{env.title}</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {env.tiers.map((items, tierIndex) => (
                      <div key={tierNames[tierIndex]}>
                        <div className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.12em] text-primary">
                          {tierIndex === 0 ? tierNames[0] : `+ ${tierNames[tierIndex]}`}
                        </div>
                        <ul className="flex flex-col gap-2.5">
                          {items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-soft"
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                                aria-hidden
                              />
                              {item}
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
            eyebrow="Servicios complementarios"
            title="Servicios puntuales, cuando los necesites"
            body="Se contratan aparte o vienen incluidos en algunos paquetes. Precios orientativos sin IVA."
            dark
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((extra, index) => (
              <Reveal key={extra.title} delay={(index % 3) * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5.5 transition-colors hover:border-accent hover:bg-white/[0.07]">
                  <h3 className="mb-3 text-[15.5px] leading-snug text-white">{extra.title}</h3>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[13px] font-semibold text-mist-accent">
                      {extra.price}
                    </span>
                    {extra.included && (
                      <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
                        Incluido en {extra.included}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Condiciones */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="Condiciones" title="Cómo trabajamos" />
          <Reveal>
            <ul className="flex flex-col gap-3">
              {conditions.map((condition) => (
                <li
                  key={condition}
                  className="flex items-start gap-3 rounded-brand border border-line bg-surface-alt p-4 text-[14.5px] leading-relaxed text-ink"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {condition}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-xs text-ink-soft">
              Precios orientativos, IVA no incluido. Las licencias de antivirus/EDR, SIEM o
              Imunify360 pueden ir incluidas o facturarse aparte según el caso. Consulta tu caso
              concreto.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="¿Sabes qué pasaría si hoy fallara tu sistema?"
        body="Empezamos con una auditoría inicial para ver los puntos débiles de tu empresa y qué paquete encaja contigo."
        ctaLabel="Solicitar auditoría"
      />
    </>
  );
}
