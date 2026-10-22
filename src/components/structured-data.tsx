import { site } from "@/lib/site";
import { absoluteUrl, getLang } from "@/lib/i18n-server";
import { locales, localizePath, schemaLanguages, type Locale } from "@/lib/i18n";

// Datos estructurados (JSON-LD) para Google: la empresa, sus dos oficinas y la web.
// Se generan desde `site.ts` para que coincidan siempre con lo que se ve en la página.
const orgId = `${site.url}/#organization`;

const telephone = `+34 ${site.phones[0]}`;

const offices = site.offices.map((office) => ({
  "@type": "ProfessionalService",
  "@id": `${site.url}/#oficina-${office.postalCode}`,
  name: `${site.name} — ${office.name.es}`,
  url: site.url,
  image: `${site.url}/logo-epsig-cuadrado.png`,
  telephone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: office.streetAddress,
    postalCode: office.postalCode,
    addressLocality: office.city,
    addressRegion: office.region,
    addressCountry: "ES",
  },
  geo: { "@type": "GeoCoordinates", latitude: office.geo.lat, longitude: office.geo.lng },
  hasMap: office.mapsUrl,
  openingHoursSpecification: office.openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.days,
    opens: slot.opens,
    closes: slot.closes,
  })),
  areaServed: site.zones.map((zone) => ({ "@type": "AdministrativeArea", name: zone.es })),
  parentOrganization: { "@id": orgId },
}));

const dataFor = (lang: Locale) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      legalName: site.legalName,
      taxID: site.nif,
      foundingDate: String(site.foundedYear),
      url: site.url,
      logo: `${site.url}/logo-epsig-cuadrado.png`,
      description: site.description[lang],
      email: site.email,
      telephone,
      address: offices[0].address,
      contactPoint: site.phones.map((phone) => ({
        "@type": "ContactPoint",
        telephone: `+34 ${phone}`,
        contactType: "customer service",
        areaServed: "ES",
        availableLanguage: ["es", "ca", "en"],
      })),
      sameAs: [site.social.facebook, site.social.instagram, ...site.offices.map((o) => o.mapsUrl)],
      department: offices.map((office) => ({ "@id": office["@id"] })),
    },
    ...offices,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}${localizePath("/", lang)}`,
      name: site.name,
      inLanguage: locales.map((locale) => schemaLanguages[locale]),
      publisher: { "@id": orgId },
    },
  ],
});

/** Bloque JSON-LD. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Se escapa "<" para que ningún valor pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function StructuredData() {
  return <JsonLd data={dataFor(await getLang())} />;
}

/** Servicio que presta la empresa, descrito en la página `path` (JSON-LD `Service`). */
export async function ServiceSchema({ path, name, description }: { path: string; name: string; description?: string }) {
  const lang = await getLang();
  const url = absoluteUrl(path, lang);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#servicio`,
        name,
        description,
        url,
        inLanguage: schemaLanguages[lang],
        provider: { "@id": orgId },
        areaServed: site.zones.map((zone) => ({ "@type": "AdministrativeArea", name: zone[lang] })),
      }}
    />
  );
}
