// Teléfonos de contacto: el primero es el principal.
const phoneContacts = [
  { number: "690 64 29 17", label: "Principal" },
  { number: "628 70 92 57", label: "Secundario" },
] as const;

export const site = {
  name: "EPSIG Consultores",
  legalName: "EPSIG CONSULTORES SLU",
  legalForm: "Sociedad de Responsabilidad Limitada (unipersonal)",
  nif: "B98839400",
  registeredAddress: "Calle Doctor Moratal 1, 4.º dcha., 03740 Gata de Gorgos (Alicante)",
  // Fuente: BORME-A-2016-137-03 (19/07/2016), anuncio 299224.
  registry: "Registro Mercantil de Alicante, Tomo 3962, Folio 29, Sección 8, Hoja A-150952, Inscripción 1.ª",
  foundedYear: 2017,
  tagline: "El sistema que ayuda a tu empresa a funcionar mejor.",
  description:
    "Partner oficial de Odoo, Agente Digitalizador Adherido y Asesor Digital. Implantamos Odoo ERP y acompañamos a pymes de la Marina Alta, Valencia y la Safor a gestionar, digitalizar y proteger su negocio.",
  url: "https://epsigconsultores.com",
  email: "info@epsigconsultores.com",
  phones: phoneContacts.map((phone) => phone.number),
  phoneContacts,
  footerTagline: "EPSIG Consultores, te ayudamos a empoderar tu empresa.",
  clientPortalUrl: "https://epsig.matrixconnect.eu/apps/login/",
  offices: [
    {
      name: "Gata de Gorgos",
      address: "Calle Doctor Moratal 1, 4.º dcha.",
      locality: "03740 Gata de Gorgos (Alicante)",
      // Datos para Google (JSON-LD), tomados de la ficha de Google Business Profile.
      streetAddress: "Calle Doctor Moratal 1, 4.º dcha.",
      postalCode: "03740",
      city: "Gata de Gorgos",
      region: "Alicante",
      geo: { lat: 38.7761043, lng: 0.0841059 },
      mapsUrl: "https://maps.google.com/?cid=3687205675597459311",
      // Horario igual que en la ficha de Google Business Profile. `hours` (texto) y
      // `openingHours` (para Google) deben coincidir.
      hours: ["Lunes a viernes: de 10:00 a 15:00 h."],
      openingHours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "15:00" }],
    },
    {
      name: "Valencia",
      address: "Avenida Blasco Ibáñez 153, 8.º, pta. 40",
      locality: "46022 Valencia",
      streetAddress: "Avenida Blasco Ibáñez 153, 8.º, pta. 40",
      postalCode: "46022",
      city: "València",
      region: "Valencia",
      geo: { lat: 39.4718688, lng: -0.3389152 },
      mapsUrl: "https://maps.google.com/?cid=10532530235635405959",
      hours: ["Lunes a jueves: de 9:30 a 15:00 h.", "Viernes: de 9:30 a 14:00 h."],
      openingHours: [
        { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:30", closes: "15:00" },
        { days: ["Friday"], opens: "09:30", closes: "14:00" },
      ],
    },
  ],
  zones: ["Marina Alta", "Valencia", "La Safor"],
  social: {
    facebook: "https://www.facebook.com/consultoriajosepperezbarber/",
    instagram: "https://www.instagram.com/epsig_consultores/",
  },
  badges: [
    "Partner oficial de Odoo",
    "Partner de ESET",
    "Agente Digitalizador Adherido (Kit Digital)",
    "Asesor Digital (Kit Consulting)",
  ],
} as const;

// Estado de las convocatorias. Cuando se abra una nueva, cambia el valor a true
// y desaparece el aviso de "convocatoria cerrada" en todas las páginas.
export const programStatus = {
  kitDigital: false, // Última convocatoria cerrada el 31/10/2025
  kitConsulting: false, // Convocatoria cerrada el 31/03/2025
} as const;

export const pillars = [
  {
    slug: "consultoria-empresarial",
    code: "CE",
    color: "var(--color-primary)",
    title: "Consultoría Empresarial",
    summary:
      "Asesoría económico-financiera, laboral y fiscal-contable, más empresa familiar y protección de datos.",
  },
  {
    slug: "transformacion-digital",
    code: "TD",
    color: "var(--color-secondary)",
    title: "Transformación Digital",
    summary:
      "Automatización, IA y digitalización de procesos, con los servicios de los catálogos Kit Digital y Kit Consulting.",
  },
  {
    slug: "proteccion-del-negocio",
    code: "PN",
    color: "var(--color-accent-strong)",
    title: "Protección del Negocio",
    summary:
      "Ciberseguridad gestionada a medida para servidores, webs y equipos de trabajo, con ESET: por paquetes o servicio a servicio.",
  },
] as const;

export const odooModules = [
  { label: "CRM", body: "Oportunidades y clientes" },
  { label: "Ventas", body: "Presupuestos y pedidos" },
  { label: "Compras", body: "Proveedores y pedidos" },
  { label: "Contabilidad", body: "Facturas y asientos" },
  { label: "Inventario", body: "Stock y almacenes" },
  { label: "Fabricación", body: "Órdenes de producción" },
  { label: "RRHH", body: "Empleados y ausencias" },
  { label: "TPV", body: "Punto de venta" },
] as const;

export const sectors = [
  {
    id: "industria",
    title: "Industria",
    body: "Fabricación, control de inventario y trazabilidad.",
    highlight: false,
  },
  {
    id: "comercio",
    title: "Comercio",
    body: "Ventas, punto de venta y gestión de stock.",
    highlight: false,
  },
  {
    id: "servicios",
    title: "Servicios",
    body: "Proyectos, facturación y gestión de equipos.",
    highlight: false,
  },
  {
    id: "hosteleria",
    title: "Hostelería",
    body: "TPV, cartas digitales y comanderos — conectables a tu Odoo.",
    highlight: true,
  },
] as const;

// Asesoría tradicional (gestoría): económico-financiero, laboral, fiscal-contable.
export const asesoriaAreas = [
  {
    slug: "economico-financiero",
    title: "Económico-financiero",
    pageTitle: "Asesoría económico-financiera",
    description:
      "Asesoría económico-financiera imparcial para empresas, autónomos y particulares: financiación, tesorería, planificación y alta de autónomos o sociedades.",
    body: "Analizamos la situación económica de tu empresa de forma imparcial, para asesorarte en tu beneficio y no en el de terceros: financiación, tesorería, cobros y pagos. Somos Punto de Atención al Emprendedor (PAE) y podemos darte de alta como autónomo o constituir tu sociedad en 48 horas.",
  },
  {
    slug: "laboral",
    title: "Laboral",
    pageTitle: "Asesoría laboral",
    description:
      "Asesoría laboral y de Recursos Humanos para empresas y autónomos: nóminas, contratos, Seguridad Social y externalización de la administración de personal.",
    body: "Asesoramiento laboral y de Recursos Humanos para empresas y autónomos — desde consultas puntuales hasta la externalización completa de la administración de personal: nóminas, contratos, altas y bajas en la Seguridad Social.",
  },
  {
    slug: "fiscal-contable",
    title: "Fiscal-contable",
    pageTitle: "Asesoría fiscal-contable",
    description:
      "Asesoría fiscal y contable para empresas y particulares, con gestión contable rigurosa y acceso permanente al estado de tu empresa.",
    body: "Asesoramiento y gestión fiscal de empresas y particulares, apoyada en una gestión contable rigurosa. Trabajamos con el software adecuado para cada caso y te damos acceso permanente al estado de tu empresa.",
  },
  {
    title: "Protección de datos (RGPD)",
    body: "Adecuación de tu empresa al Reglamento General de Protección de Datos, integrada en el resto de la asesoría para que el cumplimiento no sea un trámite aparte.",
  },
] as const;

export const kitConsultingTiers = [
  { range: "Entre 10 y 49 empleados", amount: "12.000 €" },
  { range: "Entre 50 y 99 empleados", amount: "18.000 €" },
  { range: "Entre 100 y 249 empleados", amount: "24.000 €" },
] as const;

export const kitConsultingServices = [
  {
    slug: "asesoramiento_ia",
    title: "Asesoramiento en Inteligencia Artificial",
    summary: "Diagnóstico inicial y estrategia de IA para tu empresa.",
    body: "Como Asesores Digitales, desarrollamos un plan completo de inteligencia artificial: diagnóstico inicial, diseño de estrategia, capacitación de tu equipo y análisis predictivo, para impulsar la transformación digital de tu empresa.",
  },
  {
    slug: "asesoramiento_analisisdedatos_ia",
    title: "Asesoramiento en Análisis de Datos (Básico)",
    summary: "Diagnóstico y herramientas de IA para tus datos.",
    body: "Te acompañamos en el desarrollo del plan de análisis de datos, con un diagnóstico inicial, políticas de calidad de datos y selección de herramientas de IA para optimizar tu análisis y visualización. Capacitamos a tu equipo en el uso estratégico de estas tecnologías y documentamos todo el proceso.",
  },
  {
    slug: "asesoramiento_analisisdedatos_ia_avanzado",
    title: "Asesoramiento en Análisis de Datos (Avanzado)",
    summary: "Casos de uso avanzados combinando fuentes de datos con IA.",
    body: "Te apoyamos en identificar y valorar tus datos, combinándolos estratégicamente con otras fuentes para generar información relevante mediante IA. Te asesoramos en la gestión de estos datos y el uso de herramientas especializadas, desarrollando un caso de uso avanzado que detecte oportunidades y maximice el valor de la información para decisiones más precisas.",
  },
  {
    slug: "asesoramiento_procesosnegocio",
    title: "Asesoramiento en Procesos de Negocio o Producción",
    summary: "Automatización de procesos con digitalización e IA.",
    body: "Te ayudamos a optimizar tus procesos mediante digitalización e inteligencia artificial. Realizamos un diagnóstico inicial, identificamos mejoras clave y te asesoramos en herramientas de automatización para aumentar la eficiencia y la calidad. Desarrollamos un caso de uso adaptado a tu empresa, con impacto real en tus operaciones y una cultura de mejora continua.",
  },
  {
    slug: "asesoramiento_rendimientonegocio",
    title: "Asesoramiento en Estrategia y Rendimiento de Negocio",
    summary: "Plan estratégico de digitalización e inteligencia de negocio.",
    body: "Impulsamos la competitividad de tu empresa con un plan estratégico de digitalización e inteligencia de negocio. Realizamos un diagnóstico inicial, analizamos capacidades y oportunidades, y proponemos mejoras en inteligencia artificial y herramientas de análisis de datos, con un caso de uso personalizado para optimizar la toma de decisiones y el posicionamiento competitivo.",
  },
  {
    slug: "ciberseguridad",
    title: "Asesoramiento en Ciberseguridad (Básico)",
    summary: "Plan básico de ciberseguridad adaptado a tu pyme.",
    body: "El objetivo es implementar un plan básico de ciberseguridad adaptado a las necesidades de tu pyme. Evaluamos riesgos, protegemos activos clave y te damos un plan de respuesta ante incidentes y una estrategia a corto y medio plazo, desarrollando además un caso de uso específico sobre el valor de la IA en ciberseguridad.",
  },
  {
    slug: "ciberseguridad_avanzado",
    title: "Asesoramiento en Ciberseguridad (Avanzado)",
    summary: "Sistemas avanzados de protección y cultura de seguridad.",
    body: "Con este servicio puedes elevar la seguridad de tu pyme más allá de lo básico, explorando sistemas avanzados de protección. Realizamos análisis de vulnerabilidades, implementamos herramientas de ciberseguridad y creamos un entorno de protección proactiva, promoviendo una cultura de seguridad entre tus empleados.",
  },
  {
    slug: "360_transformaciondigital",
    title: 'Asesoramiento «360» en Transformación Digital',
    summary: "Plan estratégico integral de transformación digital.",
    body: "Este asesoramiento ofrece soluciones personalizadas para tu pyme: identificamos oportunidades de digitalización, optimizamos las herramientas existentes y diseñamos un plan estratégico claro, fomentando la adaptación digital de tu equipo e integrando aplicaciones de IA para impulsar la innovación de tu negocio.",
  },
] as const;

export const kitDigitalCategories = [
  {
    slug: "software",
    title: "Gestión de procesos",
    summary: "Software administrativo, CRM y conexión con tu web.",
    body: "La implementación de un software de gestión administrativa en tu empresa reduce el tiempo que dedicas a la facturación y te permite mejorar tu negocio: a partir de ahí puedes sumar un CRM para la captación y el crecimiento de clientes, conectar tu página web para vender por ese canal y añadir análisis de datos (Business Intelligence).",
    features: [
      "Implementación de software administrativo (Odoo u otras herramientas homologadas) en tu empresa.",
      "Conexión con tu página web y con herramientas de análisis de datos.",
    ],
    priceFrom: "Desde 25 €/mes por usuario",
  },
  {
    slug: "tools",
    title: "Servicios y herramientas de oficina virtual",
    summary: "Google Workspace, Microsoft 365 o freeware.",
    body: "Te ayudamos a elegir entre las distintas herramientas del mercado para gestionar la comunicación y la eficiencia de tu empresa: Google Workspace (Gmail, Meet, Drive, Docs...), Microsoft 365 (seguridad, fiabilidad y productividad en la nube) o una solución freeware con dominio y correo personalizados sobre plataformas en la nube.",
    features: [
      "Google Workspace: aplicaciones web con dominio personalizado.",
      "Microsoft 365: seguridad y productividad basadas en la nube.",
      "Freeware: correo y dominio personalizados a medida.",
    ],
    priceFrom: "Desde 10 €/usuario al mes",
  },
  {
    slug: "sitioweb",
    title: "Sitio web y presencia básica en Internet",
    summary: "Web adaptada a ordenador, móvil y tablet.",
    body: "Creamos una página web a medida de las necesidades de tu empresa utilizando plataformas como WordPress o PrestaShop. Las páginas se adaptan a ordenador, móvil y tablet.",
    features: [
      "Creación de sitio web para tu empresa.",
      "Integración de e-commerce si lo necesitas.",
    ],
    priceFrom: "Desde 500 €",
  },
  {
    slug: "tienda-online",
    title: "Comercio electrónico",
    summary: "Tienda online conectada a tu gestión.",
    body: "Ampliamos tu negocio mediante la implementación de una tienda online: alcanza a más clientes a través de plataformas como PrestaShop, WooCommerce o Shopify, conectadas a tu software de gestión.",
    features: [
      "Implementación de e-commerce en tu página web.",
      "Conexión de la tienda online a tu software empresarial.",
    ],
    priceFrom: "Desde 500 €",
  },
  {
    slug: "face",
    title: "Factura electrónica",
    summary: "E-factura y subida automática a FACe.",
    body: "Generación de e-facturas válidas para la plataforma FACe, con automatización de las tareas de subida a la plataforma para que no tengas que hacerlo a mano.",
    features: [
      "Generación de e-facturas válidas para FACe.",
      "Automatización de la subida a la plataforma.",
    ],
    priceFrom: "Desde 250 € al año",
  },
  {
    slug: "bi",
    title: "Business Intelligence y analítica",
    summary: "Analiza y comparte datos de toda tu organización.",
    body: "Saca el máximo provecho de tus datos conectando todas tus fuentes de información, para analizar, compartir y promover el conocimiento en toda la organización manteniendo precisión y seguridad. Trabaja de forma conjunta con herramientas como Microsoft Teams y Excel para tomar decisiones basadas en datos.",
    features: [
      "Estrategias e implementación para mejorar el rendimiento de tu empresa.",
      "Herramientas de análisis para detectar información útil.",
    ],
    priceFrom: "Desde 750 € el análisis básico",
  },
  {
    slug: "crm",
    title: "Gestión de clientes (CRM)",
    summary: "CRM para tu equipo de ventas y marketing.",
    body: "Ayudamos a tu equipo de ventas y marketing a mejorar la comunicación con los clientes mediante la implementación de un software CRM, haciendo más eficiente el seguimiento comercial y creando métricas y estrategias de rendimiento.",
    features: [
      "Software CRM adaptado a tu empresa.",
      "Mejora de la comunicación y gestión de tus clientes.",
    ],
    priceFrom: "Desde 180 € al año",
  },
  {
    slug: "ciber",
    title: "Ciberseguridad",
    summary: "Antivirus, correo seguro y navegación segura, 12 meses de soporte.",
    body: "Proporciona seguridad básica y avanzada para los dispositivos de tu equipo, con 12 meses de mantenimiento y soporte incluidos: formación y tutorización, y soporte técnico experto vía chat, teléfono, vídeo y hasta dos visitas presenciales al año.",
    features: [
      "Antimalware y antispyware en dispositivos y almacenamiento externo.",
      "Correo seguro: antispam y antiphishing.",
      "Navegación segura: control de contenidos y antiadware.",
      "Análisis de amenazas y monitorización de red, con formación y kit de concienciación.",
    ],
    priceFrom: "Desde 120 €/año por puesto de trabajo",
  },
  {
    slug: "hardware",
    title: "Puesto de trabajo seguro",
    summary: "Equipo nuevo con licencia y cifrado en reposo.",
    body: "Recibes un ordenador portátil o de sobremesa nuevo con el producto integrado, licencia y cifrado en reposo para proteger tus datos, cumpliendo los requisitos mínimos de hardware exigidos por el programa (procesador, RAM, SSD, pantalla, certificaciones de eficiencia energética, etc.).",
    features: [
      "Procesador de al menos 4 núcleos y 16 GB de RAM DDR4.",
      "SSD mínimo de 512 GB con cifrado de datos.",
      "Sistema operativo preinstalado y licenciado de fábrica.",
      "Certificación de eficiencia energética (ENERGY STAR, EPEAT Silver o TCO).",
    ],
    priceFrom: "Hasta 1.000 € (con cuota residual para quedarte el equipo)",
  },
  {
    slug: "ciberges",
    title: "Servicio de ciberseguridad gestionada",
    summary: "Detección y respuesta 24/7 (EDR/MDR).",
    body: "Combina técnicas de EDR (Endpoint Detection and Response) y MDR (Managed Detection and Response) para detectar incidentes de ciberseguridad en tiempo real y responder de la forma más rápida y eficaz posible — la misma tecnología que usamos para nuestros propios servidores.",
    features: [
      "Detección y respuesta en endpoints, servidores y entornos cloud.",
      "Monitorización 24 horas al día, 7 días a la semana, 365 días al año.",
      "Alertas inmediatas y búsqueda activa de amenazas.",
      "Informes mensuales de seguimiento y asistencia directa ante incidentes.",
    ],
    priceFrom: "Desde 150 €/usuario al año",
  },
] as const;

/** Enlace tel: con prefijo internacional y sin espacios. */
export function telHref(phone: string) {
  return `tel:+34${phone.replace(/\s/g, "")}`;
}

// Software propio
export const software = {
  camping: {
    href: "/software/control-electrico-camping",
    title: "Control eléctrico para campings",
    summary: "Check-in, clientes, electricidad por parcela, tickets y caja en un solo panel.",
  },
  viviendas: {
    href: "/software/viviendas-tuteladas",
    title: "Gestión de viviendas tuteladas",
    summary: "Entidades, viviendas, residentes, tareas y documentación en un solo sitio, con certificados listos en PDF.",
  },
  conectores: {
    href: "/software/conectores",
    title: "Conectores de software",
    summary: "Forvenues, Ágora, Sage y FACe trabajando juntos, sin teclear dos veces.",
  },
} as const;

export const connectors = [
  {
    id: "forvenues-agora",
    from: "Forvenues",
    to: "Ágora",
    title: "Conector Forvenues → Ágora",
    tagline: "Cada entrada vendida, registrada en tu TPV.",
    body: "Las entradas que vendes en Forvenues se registran automáticamente como ventas en Ágora. Taquilla online y TPV cuentan la misma historia, sin tickets duplicados ni cuadres a mano.",
    points: [
      "Ventas de entradas integradas en tu TPV",
      "Caja e informes con todas las ventas en un único sitio",
      "Sin volver a teclear ni una entrada",
    ],
  },
  {
    id: "agora-sage",
    from: "Ágora",
    to: "Sage",
    title: "Conector Ágora → Sage",
    tagline: "Tus ventas, en contabilidad cada día.",
    body: "Todos los días, las ventas de Ágora llegan a tu software de contabilidad Sage. Tu asesoría trabaja con datos al día y los cierres dejan de ser una maratón de transcribir tickets.",
    points: [
      "Sincronización diaria y automática",
      "Contabilidad siempre al día",
      "Adiós a exportar, copiar y pegar",
    ],
  },
  {
    id: "sage-face",
    from: "Sage",
    to: "FACe",
    title: "Conector Sage → FACe",
    tagline: "Factura electrónica directa desde Sage.",
    body: "Conecta Sage con el servicio de factura electrónica FACe: las facturas salen de tu contabilidad y llegan a la Administración sin descargar archivos ni subirlos a mano a ningún portal.",
    points: [
      "Facturas electrónicas desde tu propio Sage",
      "Sin subir archivos a mano al portal",
      "Menos errores y rechazos",
    ],
  },
] as const;

export type NavLink = {
  label: string;
  href: string;
  highlight?: boolean;
  external?: boolean;
  children?: { label: string; href: string; description?: string }[];
};

export const primaryNav: NavLink[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "★ Odoo ERP", href: "/servicios/odoo", description: "Implantación completa" },
      {
        label: "Consultoría Empresarial",
        href: "/servicios/consultoria-empresarial",
        description: "Económico-financiero, laboral, fiscal-contable",
      },
      {
        label: "Transformación Digital",
        href: "/servicios/transformacion-digital",
        description: "Automatización e IA",
      },
      {
        label: "Protección del Negocio",
        href: "/servicios/proteccion-del-negocio",
        description: "Ciberseguridad gestionada",
      },
    ],
  },
  {
    label: "Software",
    href: "/software",
    children: [
      { label: "Ver todo el software", href: "/software", description: "Software propio y conectores" },
      { label: software.camping.title, href: software.camping.href, description: "CRM para campings: parcelas, luz y caja" },
      { label: software.viviendas.title, href: software.viviendas.href, description: "Entidades, residentes, tareas y certificados" },
      { label: software.conectores.title, href: software.conectores.href, description: "Forvenues · Ágora · Sage · FACe" },
    ],
  },
  {
    label: "Kit Digital",
    href: "/kit-digital",
    children: [
      { label: "Ver todas las categorías", href: "/kit-digital", description: "Resumen y precios orientativos" },
      ...kitDigitalCategories.map((cat) => ({
        label: cat.title,
        href: `/kit-digital/${cat.slug}`,
        description: cat.priceFrom,
      })),
    ],
  },
  {
    label: "Kit Consulting",
    href: "/kit-consulting",
    children: [
      { label: "Ver todos los servicios", href: "/kit-consulting", description: "Asesoramiento digital" },
      ...kitConsultingServices.map((service) => ({
        label: service.title,
        href: `/kit-consulting/${service.slug}`,
        description: service.summary,
      })),
    ],
  },
  {
    label: "Nosotros",
    href: "/nosotros",
  },
  {
    label: "Acceso a clientes",
    href: "https://epsig.matrixconnect.eu/apps/login/",
    external: true,
  },
];

export const footerNav = {
  servicios: [
    { label: "Implantación de Odoo ERP", href: "/servicios/odoo" },
    { label: "Consultoría Empresarial", href: "/servicios/consultoria-empresarial" },
    { label: "Transformación Digital", href: "/servicios/transformacion-digital" },
    { label: "Ciberseguridad y Protección del Negocio", href: "/servicios/proteccion-del-negocio" },
  ],
  software: [
    { label: "Control eléctrico para campings", href: "/software/control-electrico-camping" },
    { label: "Gestión de viviendas tuteladas", href: "/software/viviendas-tuteladas" },
    { label: "Conectores Forvenues · Ágora · Sage · FACe", href: "/software/conectores" },
  ],
  asesoria: [
    { label: "Asesoría económico-financiera", href: "/economico-financiero" },
    { label: "Asesoría laboral", href: "/laboral" },
    { label: "Asesoría fiscal-contable", href: "/fiscal-contable" },
  ],
  financiacion: [
    { label: "Kit Digital", href: "/kit-digital" },
    { label: "Kit Consulting", href: "/kit-consulting" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
    { label: "Acceso a clientes", href: "https://epsig.matrixconnect.eu/apps/login/" },
  ],
};
