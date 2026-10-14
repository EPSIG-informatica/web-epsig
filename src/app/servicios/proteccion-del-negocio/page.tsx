import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import TiltCard from "@/components/tilt-card";
import IndexMark from "@/components/index-mark";
import CtaBand from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Protección del Negocio",
  description:
    "Ciberseguridad gestionada a medida para servidores Windows, Ubuntu, Plesk/web y equipos de trabajo: paquetes orientativos o servicios por separado, con presupuesto personalizado. Partner oficial de ESET.",
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

const extras: { title: string; included?: string }[] = [
  { title: "Auditoría de seguridad inicial con informe de riesgos" },
  { title: "Escaneo de vulnerabilidades periódico (Nessus, OpenVAS)", included: "todos los paquetes" },
  { title: "Test de intrusión (pentesting) interno y externo" },
  { title: "Monitorización 24/7 y alertas (SOC básico con Wazuh o similar)", included: "Avanzado" },
  { title: "Plan de copias de seguridad 3-2-1 con copia inmutable u offline", included: "Avanzado" },
  { title: "Plan de respuesta ante incidentes y recuperación ante desastres" },
  { title: "Formación y concienciación a empleados, con simulaciones de phishing" },
  { title: "Segmentación de red, VPN y revisión del firewall perimetral" },
  { title: "Gestor de contraseñas corporativo" },
  { title: "Adecuación normativa: RGPD, ENS y NIS2" },
  { title: "Informes periódicos mensuales para el cliente", included: "Avanzado" },
];

const conditions = [
  "No tenemos tarifas cerradas: cada presupuesto es personalizado según el número de servidores y equipos, su estado y el nivel de protección que necesites.",
  "Los paquetes son orientativos. Los ajustamos a tu caso y cualquier servicio de esta página se puede contratar por separado.",
  "Lo habitual es empezar con una auditoría inicial para conocer tu situación; si después contratas un paquete, se descuenta del primer año.",
  "Las horas fuera de lo contratado se facturan según la tarifa horaria acordada.",
];

export default function ProteccionDelNegocioPage() {
  return (
    <>
      <PageHero
        eyebrow="Ciberseguridad · Partner oficial ESET"
        title="Protección del Negocio"
        lead="La seguridad no es una instalación puntual: los ataques, las vulnerabilidades y las normativas cambian cada mes. Por eso la mantenemos, la revisamos y te la reportamos de forma continua."
      />

      {/* Propuesta + certificaciones */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-ink-soft">
              Protegemos servidores Windows, Ubuntu, Plesk/web y equipos de trabajo. Para orientarte
              tenemos tres paquetes — Básico, Profesional y Avanzado —, pero no son cerrados: puedes
              contratar cualquier servicio por separado y sumar servicios puntuales (auditorías,
              pentesting, formación o adecuación normativa) cuando los necesites. Cada empresa es
              distinta, así que el precio lo fijamos en un presupuesto personalizado.
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
            eyebrow="Paquetes orientativos"
            title="Elige el nivel de protección que necesita tu empresa"
            body="Son una referencia para orientarte, no una tarifa cerrada: ajustamos cada paquete a tus equipos y necesidades, y te damos el precio en un presupuesto personalizado."
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
                  <p className="mt-1 mb-6 text-[14px] text-ink-soft">{plan.tagline}</p>

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

          <Reveal className="mt-8">
            <div className="flex flex-col items-start gap-5 rounded-brand border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <h3 className="text-[18px]">¿Solo necesitas una parte?</h3>
                <p className="mt-1.5 max-w-[64ch] text-[14.5px] leading-relaxed text-ink-soft">
                  Cualquier servicio se contrata también por separado: solo las copias de seguridad,
                  solo el antivirus de los equipos o una auditoría puntual. Te hacemos el presupuesto
                  con lo que de verdad necesitas.
                </p>
              </div>
              <Link
                href="/contacto#diagnostico"
                className="inline-block shrink-0 rounded-full bg-accent-strong px-6 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(16,185,129,.6)] transition-transform hover:scale-[1.04] active:scale-[0.96]"
              >
                Pedir presupuesto
              </Link>
            </div>
          </Reveal>
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
            body="Se contratan por separado o vienen incluidos en algunos paquetes. Cada uno se presupuesta según tu caso."
            dark
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((extra, index) => (
              <Reveal key={extra.title} delay={(index % 3) * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5.5 transition-colors hover:border-accent hover:bg-white/[0.07]">
                  <h3 className="text-[15.5px] leading-snug text-white">{extra.title}</h3>
                  {extra.included && (
                    <div className="mt-auto pt-3">
                      <span className="inline-block rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent">
                        Incluido en {extra.included}
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
          <SectionHeading eyebrow="Precios" title="Un presupuesto a medida para cada empresa" />
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
              Las licencias de antivirus/EDR, SIEM o Imunify360 pueden ir incluidas en el
              presupuesto o facturarse aparte, según el caso.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="¿Sabes qué pasaría si hoy fallara tu sistema?"
        body="Vemos los puntos débiles de tu empresa y te preparamos un presupuesto a medida: con un paquete o solo con los servicios que necesites."
        ctaLabel="Pedir presupuesto"
      />
    </>
  );
}
