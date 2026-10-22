import type { Localized } from "@/lib/i18n";

// Los textos visibles van en los dos idiomas de la web: { es: castellano, ca: valenciano }.
// Se eligen con `t(...)` (ver `src/lib/i18n.ts`).

// Teléfonos de contacto: el primero es el principal.
const phoneContacts = [
  { number: "690 64 29 17", label: { es: "Principal", ca: "Principal", en: "Main" } },
  { number: "628 70 92 57", label: { es: "Secundario", ca: "Secundari", en: "Secondary" } },
] as const;

export const site = {
  name: "EPSIG Consultores",
  legalName: "EPSIG CONSULTORES SLU",
  legalForm: {
    es: "Sociedad de Responsabilidad Limitada (unipersonal)",
    ca: "Societat de Responsabilitat Limitada (unipersonal)",
    en: "Limited liability company (single-member)",
  },
  nif: "B98839400",
  registeredAddress: "Calle Doctor Moratal 1, 4.º dcha., 03740 Gata de Gorgos (Alicante)",
  // Fuente: BORME-A-2016-137-03 (19/07/2016), anuncio 299224.
  registry: {
    es: "Registro Mercantil de Alicante, Tomo 3962, Folio 29, Sección 8, Hoja A-150952, Inscripción 1.ª",
    ca: "Registre Mercantil d'Alacant, Tom 3962, Foli 29, Secció 8, Full A-150952, Inscripció 1a",
    en: "Alicante Mercantile Registry, Volume 3962, Folio 29, Section 8, Sheet A-150952, 1st Entry",
  },
  foundedYear: 2017,
  tagline: {
    es: "El sistema que ayuda a tu empresa a funcionar mejor.",
    ca: "El sistema que ajuda la teua empresa a funcionar millor.",
    en: "The system that helps your business run better.",
  },
  description: {
    es: "Partner oficial de Odoo, Agente Digitalizador Adherido y Asesor Digital. Implantamos Odoo ERP y acompañamos a pymes de la Marina Alta, Valencia y la Safor a gestionar, digitalizar y proteger su negocio.",
    ca: "Partner oficial d'Odoo, Agent Digitalitzador Adherit i Assessor Digital. Implantem Odoo ERP i acompanyem pimes de la Marina Alta, València i la Safor a gestionar, digitalitzar i protegir el seu negoci.",
    en: "Official Odoo Partner and business consultancy in Valencia and Alicante: Odoo ERP, tax and accounting advisory, digitalisation and cybersecurity for SMEs.",
  },
  url: "https://epsigconsultores.com",
  email: "info@epsigconsultores.com",
  phones: phoneContacts.map((phone) => phone.number),
  phoneContacts,
  footerTagline: {
    es: "EPSIG Consultores, te ayudamos a empoderar tu empresa.",
    ca: "EPSIG Consultores, t'ajudem a apoderar la teua empresa.",
    en: "EPSIG Consultores, helping you empower your business.",
  },
  clientPortalUrl: "https://epsig.matrixconnect.eu/apps/login/",
  offices: [
    {
      name: { es: "Gata de Gorgos", ca: "Gata de Gorgos", en: "Gata de Gorgos" },
      address: "Calle Doctor Moratal 1, 4.º dcha.",
      locality: { es: "03740 Gata de Gorgos (Alicante)", ca: "03740 Gata de Gorgos (Alacant)", en: "03740 Gata de Gorgos (Alicante)" },
      // Datos para Google (JSON-LD), tomados de la ficha de Google Business Profile.
      streetAddress: "Calle Doctor Moratal 1, 4.º dcha.",
      postalCode: "03740",
      city: "Gata de Gorgos",
      region: "Alicante",
      geo: { lat: 38.7761043, lng: 0.0841059 },
      mapsUrl: "https://maps.google.com/?cid=3687205675597459311",
      // Horario igual que en la ficha de Google Business Profile. `hours` (texto) y
      // `openingHours` (para Google) deben coincidir.
      hours: [{ es: "Lunes a viernes: de 10:00 a 15:00 h.", ca: "De dilluns a divendres: de 10.00 a 15.00 h.", en: "Monday to Friday: 10:00–15:00" }],
      openingHours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "15:00" }],
    },
    {
      name: { es: "Valencia", ca: "València", en: "Valencia" },
      address: "Avenida Blasco Ibáñez 153, 8.º, pta. 40",
      locality: { es: "46022 Valencia", ca: "46022 València", en: "46022 Valencia" },
      streetAddress: "Avenida Blasco Ibáñez 153, 8.º, pta. 40",
      postalCode: "46022",
      city: "València",
      region: "Valencia",
      geo: { lat: 39.4718688, lng: -0.3389152 },
      mapsUrl: "https://maps.google.com/?cid=10532530235635405959",
      hours: [
        { es: "Lunes a jueves: de 9:30 a 15:00 h.", ca: "De dilluns a dijous: de 9.30 a 15.00 h.", en: "Monday to Thursday: 9:30–15:00" },
        { es: "Viernes: de 9:30 a 14:00 h.", ca: "Divendres: de 9.30 a 14.00 h.", en: "Friday: 9:30–14:00" },
      ],
      openingHours: [
        { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:30", closes: "15:00" },
        { days: ["Friday"], opens: "09:30", closes: "14:00" },
      ],
    },
  ],
  zones: [
    { es: "Marina Alta", ca: "Marina Alta", en: "Marina Alta" },
    { es: "Valencia", ca: "València", en: "Valencia" },
    { es: "La Safor", ca: "La Safor", en: "La Safor" },
  ],
  social: {
    facebook: "https://www.facebook.com/consultoriajosepperezbarber/",
    instagram: "https://www.instagram.com/epsig_consultores/",
  },
  badges: [
    { es: "Partner oficial de Odoo", ca: "Partner oficial d'Odoo", en: "Official Odoo Partner" },
    { es: "Partner de ESET", ca: "Partner d'ESET", en: "ESET Partner" },
    { es: "Agente Digitalizador Adherido (Kit Digital)", ca: "Agent Digitalitzador Adherit (Kit Digital)", en: "Accredited Digitalisation Agent (Kit Digital)" },
    { es: "Asesor Digital (Kit Consulting)", ca: "Assessor Digital (Kit Consulting)", en: "Accredited Digital Advisor (Kit Consulting)" },
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
    title: { es: "Consultoría Empresarial", ca: "Consultoria Empresarial", en: "Business Consulting" },
    summary: {
      es: "Asesoría económico-financiera, laboral y fiscal-contable, más empresa familiar y protección de datos.",
      ca: "Assessoria economicofinancera, laboral i fiscal-comptable, a més d'empresa familiar i protecció de dades.",
      en: "Financial, payroll, tax and accounting advisory, plus family business and data protection.",
    },
  },
  {
    slug: "transformacion-digital",
    code: "TD",
    color: "var(--color-secondary)",
    title: { es: "Transformación Digital", ca: "Transformació Digital", en: "Digital Transformation" },
    summary: {
      es: "Automatización, IA y digitalización de procesos, con los servicios de los catálogos Kit Digital y Kit Consulting.",
      ca: "Automatització, IA i digitalització de processos, amb els serveis dels catàlegs Kit Digital i Kit Consulting.",
      en: "Automation, AI and process digitalisation, with services from the Kit Digital and Kit Consulting catalogues.",
    },
  },
  {
    slug: "proteccion-del-negocio",
    code: "PN",
    color: "var(--color-accent-strong)",
    title: { es: "Protección del Negocio", ca: "Protecció del Negoci", en: "Business Protection" },
    summary: {
      es: "Ciberseguridad gestionada a medida para servidores, webs y equipos de trabajo, con ESET: por paquetes o servicio a servicio.",
      ca: "Ciberseguretat gestionada a mida per a servidors, webs i equips de treball, amb ESET: per paquets o servei a servei.",
      en: "Tailored managed cybersecurity for servers, websites and workstations, with ESET: in bundles or service by service.",
    },
  },
] as const;

export const odooModules = [
  { label: { es: "CRM", ca: "CRM", en: "CRM" }, body: { es: "Oportunidades y clientes", ca: "Oportunitats i clients", en: "Opportunities and customers" } },
  { label: { es: "Ventas", ca: "Vendes", en: "Sales" }, body: { es: "Presupuestos y pedidos", ca: "Pressupostos i comandes", en: "Quotations and orders" } },
  { label: { es: "Compras", ca: "Compres", en: "Purchasing" }, body: { es: "Proveedores y pedidos", ca: "Proveïdors i comandes", en: "Suppliers and orders" } },
  { label: { es: "Contabilidad", ca: "Comptabilitat", en: "Accounting" }, body: { es: "Facturas y asientos", ca: "Factures i assentaments", en: "Invoices and journal entries" } },
  { label: { es: "Inventario", ca: "Inventari", en: "Inventory" }, body: { es: "Stock y almacenes", ca: "Estoc i magatzems", en: "Stock and warehouses" } },
  { label: { es: "Fabricación", ca: "Fabricació", en: "Manufacturing" }, body: { es: "Órdenes de producción", ca: "Ordres de producció", en: "Production orders" } },
  { label: { es: "RRHH", ca: "RH", en: "HR" }, body: { es: "Empleados y ausencias", ca: "Empleats i absències", en: "Employees and time off" } },
  { label: { es: "TPV", ca: "TPV", en: "POS" }, body: { es: "Punto de venta", ca: "Punt de venda", en: "Point of sale" } },
] as const;

export const sectors = [
  {
    id: "industria",
    title: { es: "Industria", ca: "Indústria", en: "Industry" },
    body: { es: "Fabricación, control de inventario y trazabilidad.", ca: "Fabricació, control d'inventari i traçabilitat.", en: "Manufacturing, inventory control and traceability." },
    highlight: false,
  },
  {
    id: "comercio",
    title: { es: "Comercio", ca: "Comerç", en: "Retail" },
    body: { es: "Ventas, punto de venta y gestión de stock.", ca: "Vendes, punt de venda i gestió d'estoc.", en: "Sales, point of sale and stock management." },
    highlight: false,
  },
  {
    id: "servicios",
    title: { es: "Servicios", ca: "Serveis", en: "Services" },
    body: { es: "Proyectos, facturación y gestión de equipos.", ca: "Projectes, facturació i gestió d'equips.", en: "Projects, invoicing and team management." },
    highlight: false,
  },
  {
    id: "hosteleria",
    title: { es: "Hostelería", ca: "Hostaleria", en: "Hospitality" },
    body: {
      es: "TPV, cartas digitales y comanderos, conectable a Odoo.",
      ca: "TPV, cartes digitals i comanders, connectable a Odoo.",
      en: "POS, digital menus and handheld ordering devices, connectable to Odoo.",
    },
    highlight: false,
  },
] as const;

// Asesoría tradicional (gestoría): económico-financiero, laboral, fiscal-contable.
export const asesoriaAreas = [
  {
    slug: "economico-financiero",
    title: { es: "Económico-financiero", ca: "Economicofinancer", en: "Financial" },
    pageTitle: { es: "Asesoría económico-financiera", ca: "Assessoria economicofinancera", en: "Financial advisory" },
    description: {
      es: "Asesoría económico-financiera imparcial para empresas, autónomos y particulares: financiación, tesorería, planificación y alta de autónomos o sociedades.",
      ca: "Assessoria economicofinancera imparcial per a empreses, autònoms i particulars: finançament, tresoreria, planificació i alta d'autònoms o societats.",
      en: "Impartial financial advice for businesses, the self-employed and individuals: financing, cash flow, planning and setting up your company.",
    },
    body: {
      es: "Analizamos la situación económica de tu empresa de forma imparcial, para asesorarte en tu beneficio y no en el de terceros: financiación, tesorería, cobros y pagos. Somos Punto de Atención al Emprendedor (PAE) y podemos darte de alta como autónomo o constituir tu sociedad en 48 horas.",
      ca: "Analitzem la situació econòmica de la teua empresa de manera imparcial, per a assessorar-te en el teu benefici i no en el de tercers: finançament, tresoreria, cobraments i pagaments. Som Punt d'Atenció a l'Emprenedor (PAE) i podem donar-te d'alta com a autònom o constituir la teua societat en 48 hores.",
      en: "We analyse your company's financial position impartially, so that our advice serves your interests and nobody else's: financing, cash flow, collections and payments. As an Entrepreneur Support Point (PAE), we can register you as self-employed or set up your company in 48 hours.",
    },
  },
  {
    slug: "laboral",
    title: { es: "Laboral", ca: "Laboral", en: "Employment and payroll" },
    pageTitle: { es: "Asesoría laboral", ca: "Assessoria laboral", en: "Employment and payroll advisory" },
    description: {
      es: "Asesoría laboral y de Recursos Humanos para empresas y autónomos: nóminas, contratos, Seguridad Social y externalización de la administración de personal.",
      ca: "Assessoria laboral i de Recursos Humans per a empreses i autònoms: nòmines, contractes, Seguretat Social i externalització de l'administració de personal.",
      en: "Employment and HR advisory for businesses and self-employed professionals: payroll, contracts, Social Security and outsourced personnel administration.",
    },
    body: {
      es: "Asesoramiento laboral y de Recursos Humanos para empresas y autónomos — desde consultas puntuales hasta la externalización completa de la administración de personal: nóminas, contratos, altas y bajas en la Seguridad Social.",
      ca: "Assessorament laboral i de Recursos Humans per a empreses i autònoms — des de consultes puntuals fins a l'externalització completa de l'administració de personal: nòmines, contractes, altes i baixes en la Seguretat Social.",
      en: "Employment and HR advice for businesses and self-employed professionals — from one-off queries to fully outsourced personnel administration: payroll, contracts, and Social Security registrations and terminations.",
    },
  },
  {
    slug: "fiscal-contable",
    title: { es: "Fiscal-contable", ca: "Fiscal-comptable", en: "Tax and accounting" },
    pageTitle: { es: "Asesoría fiscal-contable", ca: "Assessoria fiscal-comptable", en: "Tax and accounting advisory" },
    description: {
      es: "Asesoría fiscal y contable para empresas y particulares, con gestión contable rigurosa y acceso permanente al estado de tu empresa.",
      ca: "Assessoria fiscal i comptable per a empreses i particulars, amb una gestió comptable rigorosa i accés permanent a l'estat de la teua empresa.",
      en: "Tax and accounting advisory for businesses and individuals, with rigorous bookkeeping and ongoing access to your company's figures.",
    },
    body: {
      es: "Asesoramiento y gestión fiscal de empresas y particulares, apoyada en una gestión contable rigurosa. Trabajamos con el software adecuado para cada caso y te damos acceso permanente al estado de tu empresa.",
      ca: "Assessorament i gestió fiscal d'empreses i particulars, recolzada en una gestió comptable rigorosa. Treballem amb el programari adequat per a cada cas i et donem accés permanent a l'estat de la teua empresa.",
      en: "Tax advice and management for businesses and individuals, backed by rigorous bookkeeping. We use the right software for each case and give you ongoing access to your company's figures.",
    },
  },
  {
    title: { es: "Protección de datos (RGPD)", ca: "Protecció de dades (RGPD)", en: "Data protection (GDPR)" },
    body: {
      es: "Adecuación de tu empresa al Reglamento General de Protección de Datos, integrada en el resto de la asesoría para que el cumplimiento no sea un trámite aparte.",
      ca: "Adequació de la teua empresa al Reglament General de Protecció de Dades, integrada en la resta de l'assessoria perquè el compliment no siga un tràmit a banda.",
      en: "Bringing your business into line with the General Data Protection Regulation, built into the rest of our advisory service so that compliance isn't a separate chore.",
    },
  },
] as const;

export const kitConsultingTiers = [
  { range: { es: "Entre 10 y 49 empleados", ca: "Entre 10 i 49 empleats", en: "Between 10 and 49 employees" }, amount: { es: "12.000 €", ca: "12.000 €", en: "€12,000" } },
  { range: { es: "Entre 50 y 99 empleados", ca: "Entre 50 i 99 empleats", en: "Between 50 and 99 employees" }, amount: { es: "18.000 €", ca: "18.000 €", en: "€18,000" } },
  { range: { es: "Entre 100 y 249 empleados", ca: "Entre 100 i 249 empleats", en: "Between 100 and 249 employees" }, amount: { es: "24.000 €", ca: "24.000 €", en: "€24,000" } },
] as const;

export const kitConsultingServices = [
  {
    slug: "asesoramiento_ia",
    title: { es: "Asesoramiento en Inteligencia Artificial", ca: "Assessorament en Intel·ligència Artificial", en: "Artificial Intelligence Advisory" },
    summary: {
      es: "Diagnóstico inicial y estrategia de IA para tu empresa.",
      ca: "Diagnòstic inicial i estratègia d'IA per a la teua empresa.",
      en: "Initial assessment and AI strategy for your business.",
    },
    body: {
      es: "Como Asesores Digitales, desarrollamos un plan completo de inteligencia artificial: diagnóstico inicial, diseño de estrategia, capacitación de tu equipo y análisis predictivo, para impulsar la transformación digital de tu empresa.",
      ca: "Com a Assessors Digitals, desenvolupem un pla complet d'intel·ligència artificial: diagnòstic inicial, disseny d'estratègia, capacitació del teu equip i anàlisi predictiva, per a impulsar la transformació digital de la teua empresa.",
      en: "As Accredited Digital Advisors, we develop a complete artificial intelligence plan: initial assessment, strategy design, team training and predictive analytics, to drive your company's digital transformation.",
    },
  },
  {
    slug: "asesoramiento_analisisdedatos_ia",
    title: { es: "Asesoramiento en Análisis de Datos (Básico)", ca: "Assessorament en Anàlisi de Dades (Bàsic)", en: "Data Analytics Advisory (Basic)" },
    summary: {
      es: "Diagnóstico y herramientas de IA para tus datos.",
      ca: "Diagnòstic i eines d'IA per a les teues dades.",
      en: "Assessment and AI tools for your data.",
    },
    body: {
      es: "Te acompañamos en el desarrollo del plan de análisis de datos, con un diagnóstico inicial, políticas de calidad de datos y selección de herramientas de IA para optimizar tu análisis y visualización. Capacitamos a tu equipo en el uso estratégico de estas tecnologías y documentamos todo el proceso.",
      ca: "T'acompanyem en el desenvolupament del pla d'anàlisi de dades, amb un diagnòstic inicial, polítiques de qualitat de dades i selecció d'eines d'IA per a optimitzar la teua anàlisi i visualització. Capacitem el teu equip en l'ús estratègic d'estes tecnologies i documentem tot el procés.",
      en: "We support you in developing your data analytics plan, with an initial assessment, data quality policies and a selection of AI tools to optimise your analysis and visualisation. We train your team in the strategic use of these technologies and document the entire process.",
    },
  },
  {
    slug: "asesoramiento_analisisdedatos_ia_avanzado",
    title: { es: "Asesoramiento en Análisis de Datos (Avanzado)", ca: "Assessorament en Anàlisi de Dades (Avançat)", en: "Data Analytics Advisory (Advanced)" },
    summary: {
      es: "Casos de uso avanzados combinando fuentes de datos con IA.",
      ca: "Casos d'ús avançats que combinen fonts de dades amb IA.",
      en: "Advanced use cases combining data sources with AI.",
    },
    body: {
      es: "Te apoyamos en identificar y valorar tus datos, combinándolos estratégicamente con otras fuentes para generar información relevante mediante IA. Te asesoramos en la gestión de estos datos y el uso de herramientas especializadas, desarrollando un caso de uso avanzado que detecte oportunidades y maximice el valor de la información para decisiones más precisas.",
      ca: "T'ajudem a identificar i valorar les teues dades, combinant-les estratègicament amb altres fonts per a generar informació rellevant per mitjà d'IA. T'assessorem en la gestió d'estes dades i en l'ús d'eines especialitzades, i desenvolupem un cas d'ús avançat que detecte oportunitats i maximitze el valor de la informació per a prendre decisions més precises.",
      en: "We help you identify and assess the value of your data, strategically combining it with other sources to generate meaningful insights through AI. We advise you on managing this data and using specialist tools, developing an advanced use case that uncovers opportunities and maximises the value of your information for more accurate decisions.",
    },
  },
  {
    slug: "asesoramiento_procesosnegocio",
    title: {
      es: "Asesoramiento en Procesos de Negocio o Producción",
      ca: "Assessorament en Processos de Negoci o Producció",
      en: "Business or Production Process Advisory",
    },
    summary: {
      es: "Automatización de procesos con digitalización e IA.",
      ca: "Automatització de processos amb digitalització i IA.",
      en: "Process automation through digitalisation and AI.",
    },
    body: {
      es: "Te ayudamos a optimizar tus procesos mediante digitalización e inteligencia artificial. Realizamos un diagnóstico inicial, identificamos mejoras clave y te asesoramos en herramientas de automatización para aumentar la eficiencia y la calidad. Desarrollamos un caso de uso adaptado a tu empresa, con impacto real en tus operaciones y una cultura de mejora continua.",
      ca: "T'ajudem a optimitzar els teus processos per mitjà de la digitalització i la intel·ligència artificial. Fem un diagnòstic inicial, identifiquem millores clau i t'assessorem en eines d'automatització per a augmentar l'eficiència i la qualitat. Desenvolupem un cas d'ús adaptat a la teua empresa, amb un impacte real en les teues operacions i una cultura de millora contínua.",
      en: "We help you optimise your processes through digitalisation and artificial intelligence. We carry out an initial assessment, identify key improvements and advise you on automation tools to boost efficiency and quality. We develop a use case tailored to your business, with a real impact on your operations and a culture of continuous improvement.",
    },
  },
  {
    slug: "asesoramiento_rendimientonegocio",
    title: {
      es: "Asesoramiento en Estrategia y Rendimiento de Negocio",
      ca: "Assessorament en Estratègia i Rendiment de Negoci",
      en: "Business Strategy and Performance Advisory",
    },
    summary: {
      es: "Plan estratégico de digitalización e inteligencia de negocio.",
      ca: "Pla estratègic de digitalització i intel·ligència de negoci.",
      en: "A strategic plan for digitalisation and business intelligence.",
    },
    body: {
      es: "Impulsamos la competitividad de tu empresa con un plan estratégico de digitalización e inteligencia de negocio. Realizamos un diagnóstico inicial, analizamos capacidades y oportunidades, y proponemos mejoras en inteligencia artificial y herramientas de análisis de datos, con un caso de uso personalizado para optimizar la toma de decisiones y el posicionamiento competitivo.",
      ca: "Impulsem la competitivitat de la teua empresa amb un pla estratègic de digitalització i intel·ligència de negoci. Fem un diagnòstic inicial, analitzem capacitats i oportunitats, i proposem millores en intel·ligència artificial i eines d'anàlisi de dades, amb un cas d'ús personalitzat per a optimitzar la presa de decisions i el posicionament competitiu.",
      en: "We boost your company's competitiveness with a strategic plan for digitalisation and business intelligence. We carry out an initial assessment, analyse capabilities and opportunities, and propose improvements in artificial intelligence and data analytics tools, with a tailored use case to optimise decision-making and competitive positioning.",
    },
  },
  {
    slug: "ciberseguridad",
    title: { es: "Asesoramiento en Ciberseguridad (Básico)", ca: "Assessorament en Ciberseguretat (Bàsic)", en: "Cybersecurity Advisory (Basic)" },
    summary: {
      es: "Plan básico de ciberseguridad adaptado a tu pyme.",
      ca: "Pla bàsic de ciberseguretat adaptat a la teua pime.",
      en: "A basic cybersecurity plan tailored to your SME.",
    },
    body: {
      es: "El objetivo es implementar un plan básico de ciberseguridad adaptado a las necesidades de tu pyme. Evaluamos riesgos, protegemos activos clave y te damos un plan de respuesta ante incidentes y una estrategia a corto y medio plazo, desarrollando además un caso de uso específico sobre el valor de la IA en ciberseguridad.",
      ca: "L'objectiu és implementar un pla bàsic de ciberseguretat adaptat a les necessitats de la teua pime. Avaluem riscos, protegim actius clau i et donem un pla de resposta davant d'incidents i una estratègia a curt i mitjà termini, i a més desenvolupem un cas d'ús específic sobre el valor de la IA en ciberseguretat.",
      en: "The aim is to implement a basic cybersecurity plan tailored to your SME's needs. We assess risks, protect key assets and give you an incident response plan and a short- and medium-term strategy, as well as developing a specific use case on the value of AI in cybersecurity.",
    },
  },
  {
    slug: "ciberseguridad_avanzado",
    title: { es: "Asesoramiento en Ciberseguridad (Avanzado)", ca: "Assessorament en Ciberseguretat (Avançat)", en: "Cybersecurity Advisory (Advanced)" },
    summary: {
      es: "Sistemas avanzados de protección y cultura de seguridad.",
      ca: "Sistemes avançats de protecció i cultura de seguretat.",
      en: "Advanced protection systems and a security culture.",
    },
    body: {
      es: "Con este servicio puedes elevar la seguridad de tu pyme más allá de lo básico, explorando sistemas avanzados de protección. Realizamos análisis de vulnerabilidades, implementamos herramientas de ciberseguridad y creamos un entorno de protección proactiva, promoviendo una cultura de seguridad entre tus empleados.",
      ca: "Amb este servei pots elevar la seguretat de la teua pime més enllà del que és bàsic, explorant sistemes avançats de protecció. Fem anàlisis de vulnerabilitats, implementem eines de ciberseguretat i creem un entorn de protecció proactiva, promovent una cultura de seguretat entre els teus empleats.",
      en: "This service takes your SME's security beyond the basics, exploring advanced protection systems. We carry out vulnerability assessments, deploy cybersecurity tools and create a proactive protection environment, fostering a security culture among your employees.",
    },
  },
  {
    slug: "360_transformaciondigital",
    title: {
      es: "Asesoramiento «360» en Transformación Digital",
      ca: "Assessorament «360» en Transformació Digital",
      en: "360° Digital Transformation Advisory",
    },
    summary: {
      es: "Plan estratégico integral de transformación digital.",
      ca: "Pla estratègic integral de transformació digital.",
      en: "A comprehensive strategic plan for digital transformation.",
    },
    body: {
      es: "Este asesoramiento ofrece soluciones personalizadas para tu pyme: identificamos oportunidades de digitalización, optimizamos las herramientas existentes y diseñamos un plan estratégico claro, fomentando la adaptación digital de tu equipo e integrando aplicaciones de IA para impulsar la innovación de tu negocio.",
      ca: "Este assessorament oferix solucions personalitzades per a la teua pime: identifiquem oportunitats de digitalització, optimitzem les eines existents i dissenyem un pla estratègic clar, fomentant l'adaptació digital del teu equip i integrant aplicacions d'IA per a impulsar la innovació del teu negoci.",
      en: "This advisory service offers tailored solutions for your SME: we identify digitalisation opportunities, optimise your existing tools and design a clear strategic plan, helping your team adapt to digital ways of working and integrating AI applications to drive innovation in your business.",
    },
  },
] as const;

export const kitDigitalCategories = [
  {
    slug: "software",
    title: { es: "Gestión de procesos", ca: "Gestió de processos", en: "Process management" },
    summary: {
      es: "Software administrativo, CRM y conexión con tu web.",
      ca: "Programari administratiu, CRM i connexió amb la teua web.",
      en: "Administrative software, CRM and integration with your website.",
    },
    body: {
      es: "La implementación de un software de gestión administrativa en tu empresa reduce el tiempo que dedicas a la facturación y te permite mejorar tu negocio: a partir de ahí puedes sumar un CRM para la captación y el crecimiento de clientes, conectar tu página web para vender por ese canal y añadir análisis de datos (Business Intelligence).",
      ca: "La implementació d'un programari de gestió administrativa en la teua empresa reduïx el temps que dediques a la facturació i et permet millorar el teu negoci: a partir d'ací pots sumar-hi un CRM per a la captació i el creixement de clients, connectar la teua pàgina web per a vendre per eixe canal i afegir anàlisi de dades (Business Intelligence).",
      en: "Implementing business management software in your company cuts the time you spend on invoicing and helps you improve your business: from there you can add a CRM to attract and grow your customer base, connect your website to sell through that channel and add data analytics (Business Intelligence).",
    },
    features: [
      {
        es: "Implementación de software administrativo (Odoo u otras herramientas homologadas) en tu empresa.",
        ca: "Implementació de programari administratiu (Odoo o altres eines homologades) en la teua empresa.",
        en: "Implementation of administrative software (Odoo or other approved tools) in your company.",
      },
      {
        es: "Conexión con tu página web y con herramientas de análisis de datos.",
        ca: "Connexió amb la teua pàgina web i amb eines d'anàlisi de dades.",
        en: "Integration with your website and with data analytics tools.",
      },
    ],
    priceFrom: { es: "Desde 25 €/mes por usuario", ca: "Des de 25 €/mes per usuari", en: "From €25/month per user" },
  },
  {
    slug: "tools",
    title: { es: "Servicios y herramientas de oficina virtual", ca: "Serveis i eines d'oficina virtual", en: "Virtual office services and tools" },
    summary: { es: "Google Workspace, Microsoft 365 o freeware.", ca: "Google Workspace, Microsoft 365 o freeware.", en: "Google Workspace, Microsoft 365 or freeware." },
    body: {
      es: "Te ayudamos a elegir entre las distintas herramientas del mercado para gestionar la comunicación y la eficiencia de tu empresa: Google Workspace (Gmail, Meet, Drive, Docs...), Microsoft 365 (seguridad, fiabilidad y productividad en la nube) o una solución freeware con dominio y correo personalizados sobre plataformas en la nube.",
      ca: "T'ajudem a triar entre les diferents eines del mercat per a gestionar la comunicació i l'eficiència de la teua empresa: Google Workspace (Gmail, Meet, Drive, Docs...), Microsoft 365 (seguretat, fiabilitat i productivitat en el núvol) o una solució freeware amb domini i correu personalitzats sobre plataformes en el núvol.",
      en: "We help you choose from the tools on the market to manage communication and efficiency in your business: Google Workspace (Gmail, Meet, Drive, Docs...), Microsoft 365 (security, reliability and productivity in the cloud) or a freeware solution with a custom domain and email on cloud platforms.",
    },
    features: [
      {
        es: "Google Workspace: aplicaciones web con dominio personalizado.",
        ca: "Google Workspace: aplicacions web amb domini personalitzat.",
        en: "Google Workspace: web apps with a custom domain.",
      },
      {
        es: "Microsoft 365: seguridad y productividad basadas en la nube.",
        ca: "Microsoft 365: seguretat i productivitat basades en el núvol.",
        en: "Microsoft 365: cloud-based security and productivity.",
      },
      {
        es: "Freeware: correo y dominio personalizados a medida.",
        ca: "Freeware: correu i domini personalitzats a mida.",
        en: "Freeware: tailor-made custom email and domain.",
      },
    ],
    priceFrom: { es: "Desde 10 €/usuario al mes", ca: "Des de 10 €/usuari al mes", en: "From €10/user per month" },
  },
  {
    slug: "sitioweb",
    title: { es: "Sitio web y presencia básica en Internet", ca: "Lloc web i presència bàsica en Internet", en: "Website and basic online presence" },
    summary: { es: "Web adaptada a ordenador, móvil y tablet.", ca: "Web adaptada a ordinador, mòbil i tauleta.", en: "A website that works on desktop, mobile and tablet." },
    body: {
      es: "Creamos una página web a medida de las necesidades de tu empresa utilizando plataformas como WordPress o PrestaShop. Las páginas se adaptan a ordenador, móvil y tablet.",
      ca: "Creem una pàgina web a mida de les necessitats de la teua empresa utilitzant plataformes com WordPress o PrestaShop. Les pàgines s'adapten a ordinador, mòbil i tauleta.",
      en: "We build a website tailored to your business needs using platforms such as WordPress or PrestaShop. Pages adapt to desktop, mobile and tablet.",
    },
    features: [
      { es: "Creación de sitio web para tu empresa.", ca: "Creació de lloc web per a la teua empresa.", en: "Website creation for your business." },
      { es: "Integración de e-commerce si lo necesitas.", ca: "Integració de comerç electrònic si el necessites.", en: "E-commerce integration if you need it." },
    ],
    priceFrom: { es: "Desde 500 €", ca: "Des de 500 €", en: "From €500" },
  },
  {
    slug: "tienda-online",
    title: { es: "Comercio electrónico", ca: "Comerç electrònic", en: "E-commerce" },
    summary: { es: "Tienda online conectada a tu gestión.", ca: "Botiga en línia connectada a la teua gestió.", en: "An online shop connected to your management system." },
    body: {
      es: "Ampliamos tu negocio mediante la implementación de una tienda online: alcanza a más clientes a través de plataformas como PrestaShop, WooCommerce o Shopify, conectadas a tu software de gestión.",
      ca: "Ampliem el teu negoci per mitjà de la implementació d'una botiga en línia: arriba a més clients a través de plataformes com PrestaShop, WooCommerce o Shopify, connectades al teu programari de gestió.",
      en: "We grow your business by setting up an online shop: reach more customers through platforms such as PrestaShop, WooCommerce or Shopify, connected to your management software.",
    },
    features: [
      { es: "Implementación de e-commerce en tu página web.", ca: "Implementació de comerç electrònic en la teua pàgina web.", en: "E-commerce implementation on your website." },
      {
        es: "Conexión de la tienda online a tu software empresarial.",
        ca: "Connexió de la botiga en línia al teu programari empresarial.",
        en: "Connecting your online shop to your business software.",
      },
    ],
    priceFrom: { es: "Desde 500 €", ca: "Des de 500 €", en: "From €500" },
  },
  {
    slug: "face",
    title: { es: "Factura electrónica", ca: "Factura electrònica", en: "E-invoicing" },
    summary: { es: "E-factura y subida automática a FACe.", ca: "Factura electrònica i pujada automàtica a FACe.", en: "E-invoices and automatic upload to FACe." },
    body: {
      es: "Generación de e-facturas válidas para la plataforma FACe, con automatización de las tareas de subida a la plataforma para que no tengas que hacerlo a mano.",
      ca: "Generació de factures electròniques vàlides per a la plataforma FACe, amb automatització de les tasques de pujada a la plataforma perquè no hages de fer-ho a mà.",
      en: "Generation of e-invoices valid for the FACe platform, with automated uploads to the platform so you don't have to do it by hand.",
    },
    features: [
      { es: "Generación de e-facturas válidas para FACe.", ca: "Generació de factures electròniques vàlides per a FACe.", en: "Generation of e-invoices valid for FACe." },
      { es: "Automatización de la subida a la plataforma.", ca: "Automatització de la pujada a la plataforma.", en: "Automated upload to the platform." },
    ],
    priceFrom: { es: "Desde 250 € al año", ca: "Des de 250 € a l'any", en: "From €250 per year" },
  },
  {
    slug: "bi",
    title: { es: "Business Intelligence y analítica", ca: "Business Intelligence i analítica", en: "Business Intelligence and analytics" },
    summary: {
      es: "Analiza y comparte datos de toda tu organización.",
      ca: "Analitza i compartix dades de tota la teua organització.",
      en: "Analyse and share data across your organisation.",
    },
    body: {
      es: "Saca el máximo provecho de tus datos conectando todas tus fuentes de información, para analizar, compartir y promover el conocimiento en toda la organización manteniendo precisión y seguridad. Trabaja de forma conjunta con herramientas como Microsoft Teams y Excel para tomar decisiones basadas en datos.",
      ca: "Trau el màxim profit de les teues dades connectant totes les teues fonts d'informació, per a analitzar, compartir i promoure el coneixement en tota l'organització mantenint la precisió i la seguretat. Treballa de manera conjunta amb eines com Microsoft Teams i Excel per a prendre decisions basades en dades.",
      en: "Get the most out of your data by connecting all your information sources, so you can analyse, share and spread knowledge across the organisation while maintaining accuracy and security. Work hand in hand with tools such as Microsoft Teams and Excel to make data-driven decisions.",
    },
    features: [
      {
        es: "Estrategias e implementación para mejorar el rendimiento de tu empresa.",
        ca: "Estratègies i implementació per a millorar el rendiment de la teua empresa.",
        en: "Strategies and implementation to improve your company's performance.",
      },
      {
        es: "Herramientas de análisis para detectar información útil.",
        ca: "Eines d'anàlisi per a detectar informació útil.",
        en: "Analytics tools to uncover useful insights.",
      },
    ],
    priceFrom: { es: "Desde 750 € el análisis básico", ca: "Des de 750 € l'anàlisi bàsica", en: "From €750 for a basic analysis" },
  },
  {
    slug: "crm",
    title: { es: "Gestión de clientes (CRM)", ca: "Gestió de clients (CRM)", en: "Customer management (CRM)" },
    summary: {
      es: "CRM para tu equipo de ventas y marketing.",
      ca: "CRM per al teu equip de vendes i màrqueting.",
      en: "CRM for your sales and marketing team.",
    },
    body: {
      es: "Ayudamos a tu equipo de ventas y marketing a mejorar la comunicación con los clientes mediante la implementación de un software CRM, haciendo más eficiente el seguimiento comercial y creando métricas y estrategias de rendimiento.",
      ca: "Ajudem el teu equip de vendes i màrqueting a millorar la comunicació amb els clients per mitjà de la implementació d'un programari CRM, fent més eficient el seguiment comercial i creant mètriques i estratègies de rendiment.",
      en: "We help your sales and marketing team improve communication with customers by implementing CRM software, making sales follow-up more efficient and creating performance metrics and strategies.",
    },
    features: [
      { es: "Software CRM adaptado a tu empresa.", ca: "Programari CRM adaptat a la teua empresa.", en: "CRM software tailored to your business." },
      {
        es: "Mejora de la comunicación y gestión de tus clientes.",
        ca: "Millora de la comunicació i la gestió dels teus clients.",
        en: "Better communication with, and management of, your customers.",
      },
    ],
    priceFrom: { es: "Desde 180 € al año", ca: "Des de 180 € a l'any", en: "From €180 per year" },
  },
  {
    slug: "ciber",
    title: { es: "Ciberseguridad", ca: "Ciberseguretat", en: "Cybersecurity" },
    summary: {
      es: "Antivirus, correo seguro y navegación segura, 12 meses de soporte.",
      ca: "Antivirus, correu segur i navegació segura, 12 mesos de suport.",
      en: "Antivirus, secure email and safe browsing, with 12 months of support.",
    },
    body: {
      es: "Proporciona seguridad básica y avanzada para los dispositivos de tu equipo, con 12 meses de mantenimiento y soporte incluidos: formación y tutorización, y soporte técnico experto vía chat, teléfono, vídeo y hasta dos visitas presenciales al año.",
      ca: "Proporciona seguretat bàsica i avançada per als dispositius del teu equip, amb 12 mesos de manteniment i suport inclosos: formació i tutorització, i suport tècnic expert per xat, telèfon, vídeo i fins a dues visites presencials a l'any.",
      en: "Provides basic and advanced security for your team's devices, with 12 months of maintenance and support included: training and mentoring, plus expert technical support by chat, phone and video and up to two on-site visits a year.",
    },
    features: [
      {
        es: "Antimalware y antispyware en dispositivos y almacenamiento externo.",
        ca: "Antimalware i antispyware en dispositius i emmagatzematge extern.",
        en: "Anti-malware and anti-spyware on devices and external storage.",
      },
      { es: "Correo seguro: antispam y antiphishing.", ca: "Correu segur: antispam i antiphishing.", en: "Secure email: anti-spam and anti-phishing." },
      {
        es: "Navegación segura: control de contenidos y antiadware.",
        ca: "Navegació segura: control de continguts i antiadware.",
        en: "Safe browsing: content filtering and anti-adware.",
      },
      {
        es: "Análisis de amenazas y monitorización de red, con formación y kit de concienciación.",
        ca: "Anàlisi d'amenaces i monitoratge de xarxa, amb formació i kit de conscienciació.",
        en: "Threat analysis and network monitoring, with training and an awareness kit.",
      },
    ],
    priceFrom: { es: "Desde 120 €/año por puesto de trabajo", ca: "Des de 120 €/any per lloc de treball", en: "From €120/year per workstation" },
  },
  {
    slug: "hardware",
    title: { es: "Puesto de trabajo seguro", ca: "Lloc de treball segur", en: "Secure workstation" },
    summary: {
      es: "Equipo nuevo con licencia y cifrado en reposo.",
      ca: "Equip nou amb llicència i xifratge en repòs.",
      en: "A new computer with licence and encryption at rest.",
    },
    body: {
      es: "Recibes un ordenador portátil o de sobremesa nuevo con el producto integrado, licencia y cifrado en reposo para proteger tus datos, cumpliendo los requisitos mínimos de hardware exigidos por el programa (procesador, RAM, SSD, pantalla, certificaciones de eficiencia energética, etc.).",
      ca: "Reps un ordinador portàtil o de sobretaula nou amb el producte integrat, llicència i xifratge en repòs per a protegir les teues dades, que complix els requisits mínims de maquinari exigits pel programa (processador, RAM, SSD, pantalla, certificacions d'eficiència energètica, etc.).",
      en: "You receive a new laptop or desktop computer with the product built in, licensed and with encryption at rest to protect your data, meeting the minimum hardware requirements set by the programme (processor, RAM, SSD, screen, energy efficiency certifications, etc.).",
    },
    features: [
      {
        es: "Procesador de al menos 4 núcleos y 16 GB de RAM DDR4.",
        ca: "Processador d'almenys 4 nuclis i 16 GB de RAM DDR4.",
        en: "Processor with at least 4 cores and 16 GB of DDR4 RAM.",
      },
      { es: "SSD mínimo de 512 GB con cifrado de datos.", ca: "SSD mínim de 512 GB amb xifratge de dades.", en: "Minimum 512 GB SSD with data encryption." },
      {
        es: "Sistema operativo preinstalado y licenciado de fábrica.",
        ca: "Sistema operatiu preinstal·lat i llicenciat de fàbrica.",
        en: "Operating system pre-installed and licensed from the factory.",
      },
      {
        es: "Certificación de eficiencia energética (ENERGY STAR, EPEAT Silver o TCO).",
        ca: "Certificació d'eficiència energètica (ENERGY STAR, EPEAT Silver o TCO).",
        en: "Energy efficiency certification (ENERGY STAR, EPEAT Silver or TCO).",
      },
    ],
    priceFrom: {
      es: "Hasta 1.000 € (con cuota residual para quedarte el equipo)",
      ca: "Fins a 1.000 € (amb quota residual per a quedar-te l'equip)",
      en: "Up to €1,000 (with a residual payment to keep the equipment)",
    },
  },
  {
    slug: "ciberges",
    title: { es: "Servicio de ciberseguridad gestionada", ca: "Servei de ciberseguretat gestionada", en: "Managed cybersecurity service" },
    summary: { es: "Detección y respuesta 24/7 (EDR/MDR).", ca: "Detecció i resposta 24/7 (EDR/MDR).", en: "24/7 detection and response (EDR/MDR)." },
    body: {
      es: "Combina técnicas de EDR (Endpoint Detection and Response) y MDR (Managed Detection and Response) para detectar incidentes de ciberseguridad en tiempo real y responder de la forma más rápida y eficaz posible — la misma tecnología que usamos para nuestros propios servidores.",
      ca: "Combina tècniques d'EDR (Endpoint Detection and Response) i MDR (Managed Detection and Response) per a detectar incidents de ciberseguretat en temps real i respondre de la manera més ràpida i eficaç possible — la mateixa tecnologia que fem servir per als nostres propis servidors.",
      en: "Combines EDR (Endpoint Detection and Response) and MDR (Managed Detection and Response) techniques to detect cybersecurity incidents in real time and respond as quickly and effectively as possible — the same technology we use for our own servers.",
    },
    features: [
      {
        es: "Detección y respuesta en endpoints, servidores y entornos cloud.",
        ca: "Detecció i resposta en endpoints, servidors i entorns en el núvol.",
        en: "Detection and response across endpoints, servers and cloud environments.",
      },
      {
        es: "Monitorización 24 horas al día, 7 días a la semana, 365 días al año.",
        ca: "Monitoratge 24 hores al dia, 7 dies a la setmana, 365 dies a l'any.",
        en: "Monitoring 24 hours a day, 7 days a week, 365 days a year.",
      },
      {
        es: "Alertas inmediatas y búsqueda activa de amenazas.",
        ca: "Alertes immediates i cerca activa d'amenaces.",
        en: "Instant alerts and proactive threat hunting.",
      },
      {
        es: "Informes mensuales de seguimiento y asistencia directa ante incidentes.",
        ca: "Informes mensuals de seguiment i assistència directa davant d'incidents.",
        en: "Monthly monitoring reports and direct support with incidents.",
      },
    ],
    priceFrom: { es: "Desde 150 €/usuario al año", ca: "Des de 150 €/usuari a l'any", en: "From €150/user per year" },
  },
] as const;

// Opciones del desplegable "¿Qué te interesa?" del formulario de contacto. Se envía el `id`; la
// etiqueta en castellano llega al correo y a Odoo (como etiqueta de la oportunidad).
export const contactInterests = [
  { id: "odoo", label: { es: "Implantación de Odoo ERP", ca: "Implantació d'Odoo ERP", en: "Odoo ERP implementation" } },
  { id: "asesoria", label: { es: "Asesoría fiscal, contable o laboral", ca: "Assessoria fiscal, comptable o laboral", en: "Tax, accounting or payroll advisory" } },
  { id: "financiero", label: { es: "Asesoría económico-financiera", ca: "Assessoria economicofinancera", en: "Financial advisory" } },
  { id: "digitalizacion", label: { es: "Digitalización, automatización e IA", ca: "Digitalització, automatització i IA", en: "Digitalisation, automation and AI" } },
  { id: "ciberseguridad", label: { es: "Ciberseguridad", ca: "Ciberseguretat", en: "Cybersecurity" } },
  { id: "software", label: { es: "Software a medida o conectores", ca: "Programari a mida o connectors", en: "Custom software or connectors" } },
  { id: "ayudas", label: { es: "Kit Digital o Kit Consulting", ca: "Kit Digital o Kit Consulting", en: "Kit Digital or Kit Consulting" } },
  { id: "otro", label: { es: "Otro", ca: "Altre", en: "Other" } },
] as const;

/** Enlace tel: con prefijo internacional y sin espacios. */
export function telHref(phone: string) {
  return `tel:+34${phone.replace(/\s/g, "")}`;
}

// Software propio
export const software = {
  camping: {
    href: "/software/control-electrico-camping",
    title: { es: "Control eléctrico para campings", ca: "Control elèctric per a càmpings", en: "Electrical control for campsites" },
    summary: {
      es: "Check-in, clientes, electricidad por parcela, tickets y caja en un solo panel.",
      ca: "Check-in, clients, electricitat per parcel·la, tiquets i caixa en un sol panell.",
      en: "Check-in, guests, electricity per pitch, tickets and till in a single dashboard.",
    },
  },
  viviendas: {
    href: "/software/viviendas-tuteladas",
    title: { es: "Gestión de viviendas tuteladas", ca: "Gestió d'habitatges tutelats", en: "Supported housing management" },
    summary: {
      es: "Entidades, viviendas, residentes, tareas y documentación en un solo sitio, con certificados listos en PDF.",
      ca: "Entitats, habitatges, residents, tasques i documentació en un sol lloc, amb certificats preparats en PDF.",
      en: "Organisations, homes, residents, tasks and documents in one place, with certificates ready as PDFs.",
    },
  },
  conectores: {
    href: "/software/conectores",
    title: { es: "Conectores de software", ca: "Connectors de programari", en: "Software connectors" },
    summary: {
      es: "Forvenues, Ágora, Sage y FACe trabajando juntos, sin teclear dos veces.",
      ca: "Forvenues, Ágora, Sage i FACe treballant junts, sense teclejar dues vegades.",
      en: "Forvenues, Ágora, Sage and FACe working together, with no double data entry.",
    },
  },
} as const;

export const connectors = [
  {
    id: "forvenues-agora",
    from: "Forvenues",
    to: "Ágora",
    title: { es: "Conector Forvenues → Ágora", ca: "Connector Forvenues → Ágora", en: "Forvenues → Ágora connector" },
    tagline: {
      es: "Cada entrada vendida, registrada en tu TPV.",
      ca: "Cada entrada venuda, registrada en el teu TPV.",
      en: "Every ticket sold, recorded in your POS.",
    },
    body: {
      es: "Las entradas que vendes en Forvenues se registran automáticamente como ventas en Ágora. Taquilla online y TPV cuentan la misma historia, sin tickets duplicados ni cuadres a mano.",
      ca: "Les entrades que vens en Forvenues es registren automàticament com a vendes en Ágora. Taquilla en línia i TPV conten la mateixa història, sense tiquets duplicats ni quadraments a mà.",
      en: "The tickets you sell on Forvenues are automatically recorded as sales in Ágora. Your online box office and your POS tell the same story, with no duplicate receipts or manual reconciliation.",
    },
    points: [
      { es: "Ventas de entradas integradas en tu TPV", ca: "Vendes d'entrades integrades en el teu TPV", en: "Ticket sales integrated into your POS" },
      {
        es: "Caja e informes con todas las ventas en un único sitio",
        ca: "Caixa i informes amb totes les vendes en un únic lloc",
        en: "Till and reports with all your sales in one place",
      },
      { es: "Sin volver a teclear ni una entrada", ca: "Sense tornar a teclejar ni una entrada", en: "Never retype a single ticket again" },
    ],
  },
  {
    id: "agora-sage",
    from: "Ágora",
    to: "Sage",
    title: { es: "Conector Ágora → Sage", ca: "Connector Ágora → Sage", en: "Ágora → Sage connector" },
    tagline: { es: "Tus ventas, en contabilidad cada día.", ca: "Les teues vendes, en comptabilitat cada dia.", en: "Your sales, in your accounts every day." },
    body: {
      es: "Todos los días, las ventas de Ágora llegan a tu software de contabilidad Sage. Tu asesoría trabaja con datos al día y los cierres dejan de ser una maratón de transcribir tickets.",
      ca: "Tots els dies, les vendes d'Ágora arriben al teu programari de comptabilitat Sage. La teua assessoria treballa amb dades al dia i els tancaments deixen de ser una marató de transcriure tiquets.",
      en: "Every day, your Ágora sales flow into your Sage accounting software. Your accountant works with up-to-date figures, and closing the books is no longer a marathon of transcribing receipts.",
    },
    points: [
      { es: "Sincronización diaria y automática", ca: "Sincronització diària i automàtica", en: "Automatic daily sync" },
      { es: "Contabilidad siempre al día", ca: "Comptabilitat sempre al dia", en: "Accounts always up to date" },
      { es: "Adiós a exportar, copiar y pegar", ca: "Adeu a exportar, copiar i apegar", en: "Goodbye to exporting, copying and pasting" },
    ],
  },
  {
    id: "sage-face",
    from: "Sage",
    to: "FACe",
    title: { es: "Conector Sage → FACe", ca: "Connector Sage → FACe", en: "Sage → FACe connector" },
    tagline: {
      es: "Factura electrónica directa desde Sage.",
      ca: "Factura electrònica directa des de Sage.",
      en: "E-invoicing straight from Sage.",
    },
    body: {
      es: "Conecta Sage con el servicio de factura electrónica FACe: las facturas salen de tu contabilidad y llegan a la Administración sin descargar archivos ni subirlos a mano a ningún portal.",
      ca: "Connecta Sage amb el servei de factura electrònica FACe: les factures ixen de la teua comptabilitat i arriben a l'Administració sense baixar arxius ni pujar-los a mà a cap portal.",
      en: "Connect Sage to the FACe e-invoicing service: invoices go straight from your accounts to the public administration, without downloading files or uploading them by hand to any portal.",
    },
    points: [
      { es: "Facturas electrónicas desde tu propio Sage", ca: "Factures electròniques des del teu propi Sage", en: "E-invoices from your own Sage" },
      { es: "Sin subir archivos a mano al portal", ca: "Sense pujar arxius a mà al portal", en: "No manual uploads to the portal" },
      { es: "Menos errores y rechazos", ca: "Menys errors i rebuigs", en: "Fewer errors and rejections" },
    ],
  },
] as const;

export type NavLink = {
  label: Localized;
  href: string;
  highlight?: boolean;
  external?: boolean;
  children?: { label: Localized; href: string; description?: Localized }[];
};

export const primaryNav: NavLink[] = [
  { label: { es: "Inicio", ca: "Inici", en: "Home" }, href: "/" },
  {
    label: { es: "Servicios", ca: "Serveis", en: "Services" },
    href: "/servicios",
    children: [
      {
        label: { es: "★ Odoo ERP", ca: "★ Odoo ERP", en: "★ Odoo ERP" },
        href: "/servicios/odoo",
        description: { es: "Implantación completa", ca: "Implantació completa", en: "Full implementation" },
      },
      {
        label: pillars[0].title,
        href: "/servicios/consultoria-empresarial",
        description: {
          es: "Económico-financiero, laboral, fiscal-contable",
          ca: "Economicofinancer, laboral, fiscal-comptable",
          en: "Financial, employment, tax and accounting",
        },
      },
      {
        label: pillars[1].title,
        href: "/servicios/transformacion-digital",
        description: { es: "Automatización e IA", ca: "Automatització i IA", en: "Automation and AI" },
      },
      {
        label: { es: "Ciberseguridad gestionada", ca: "Ciberseguretat gestionada", en: "Managed cybersecurity" },
        href: "/servicios/proteccion-del-negocio",
        description: pillars[2].title,
      },
    ],
  },
  {
    label: { es: "Software", ca: "Software", en: "Software" },
    href: "/software",
    children: [
      {
        label: { es: "Ver todo el software", ca: "Veure tot el software", en: "View all software" },
        href: "/software",
        description: { es: "Software propio y conectores", ca: "Programari propi i connectors", en: "Our own software and connectors" },
      },
      {
        label: software.camping.title,
        href: software.camping.href,
        description: { es: "CRM para campings: parcelas, luz y caja", ca: "CRM per a càmpings: parcel·les, llum i caixa", en: "CRM for campsites: pitches, electricity and till" },
      },
      {
        label: software.viviendas.title,
        href: software.viviendas.href,
        description: {
          es: "Entidades, residentes, tareas y certificados",
          ca: "Entitats, residents, tasques i certificats",
          en: "Organisations, residents, tasks and certificates",
        },
      },
      {
        label: software.conectores.title,
        href: software.conectores.href,
        description: { es: "Forvenues · Ágora · Sage · FACe", ca: "Forvenues · Ágora · Sage · FACe", en: "Forvenues · Ágora · Sage · FACe" },
      },
    ],
  },
  {
    label: { es: "Kit Digital", ca: "Kit Digital", en: "Kit Digital" },
    href: "/kit-digital",
    children: [
      {
        label: { es: "Ver todas las categorías", ca: "Veure totes les categories", en: "View all categories" },
        href: "/kit-digital",
        description: { es: "Resumen y precios orientativos", ca: "Resum i preus orientatius", en: "Overview and guide prices" },
      },
      ...kitDigitalCategories.map((cat) => ({
        label: cat.title,
        href: `/kit-digital/${cat.slug}`,
        description: cat.priceFrom,
      })),
    ],
  },
  {
    label: { es: "Kit Consulting", ca: "Kit Consulting", en: "Kit Consulting" },
    href: "/kit-consulting",
    children: [
      {
        label: { es: "Ver todos los servicios", ca: "Veure tots els serveis", en: "View all services" },
        href: "/kit-consulting",
        description: { es: "Asesoramiento digital", ca: "Assessorament digital", en: "Digital advisory" },
      },
      ...kitConsultingServices.map((service) => ({
        label: service.title,
        href: `/kit-consulting/${service.slug}`,
        description: service.summary,
      })),
    ],
  },
  {
    label: { es: "Nosotros", ca: "Nosaltres", en: "About us" },
    href: "/nosotros",
  },
  {
    label: { es: "Acceso a clientes", ca: "Accés a clients", en: "Client access" },
    href: "https://epsig.matrixconnect.eu/apps/login/",
    external: true,
  },
];

type FooterLink = { label: Localized; href: string };

export const footerNav: Record<"servicios" | "software" | "asesoria" | "financiacion" | "empresa", FooterLink[]> = {
  servicios: [
    { label: { es: "Implantación de Odoo ERP", ca: "Implantació d'Odoo ERP", en: "Odoo ERP implementation" }, href: "/servicios/odoo" },
    { label: pillars[0].title, href: "/servicios/consultoria-empresarial" },
    { label: pillars[1].title, href: "/servicios/transformacion-digital" },
    {
      label: { es: "Ciberseguridad y Protección del Negocio", ca: "Ciberseguretat i Protecció del Negoci", en: "Cybersecurity and Business Protection" },
      href: "/servicios/proteccion-del-negocio",
    },
  ],
  software: [
    { label: software.camping.title, href: software.camping.href },
    { label: software.viviendas.title, href: software.viviendas.href },
    {
      label: { es: "Conectores Forvenues · Ágora · Sage · FACe", ca: "Connectors Forvenues · Ágora · Sage · FACe", en: "Forvenues · Ágora · Sage · FACe connectors" },
      href: software.conectores.href,
    },
  ],
  asesoria: asesoriaAreas
    .filter((area): area is Extract<typeof area, { slug: string }> => "slug" in area)
    .map((area) => ({ label: area.pageTitle, href: `/${area.slug}` })),
  financiacion: [
    { label: { es: "Kit Digital", ca: "Kit Digital", en: "Kit Digital" }, href: "/kit-digital" },
    { label: { es: "Kit Consulting", ca: "Kit Consulting", en: "Kit Consulting" }, href: "/kit-consulting" },
  ],
  empresa: [
    { label: { es: "Nosotros", ca: "Nosaltres", en: "About us" }, href: "/nosotros" },
    { label: { es: "Contacto", ca: "Contacte", en: "Contact" }, href: "/contacto" },
    { label: { es: "Acceso a clientes", ca: "Accés a clients", en: "Client access" }, href: "https://epsig.matrixconnect.eu/apps/login/" },
  ],
};
