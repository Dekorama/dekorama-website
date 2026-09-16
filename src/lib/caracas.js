import { baseUrl } from '@/lib/site'

export const CARACAS_PLACE = {
  '@type': 'City',
  name: 'Caracas',
  sameAs: 'https://www.wikidata.org/wiki/Q1533',
  containedInPlace: {
    '@type': 'Country',
    name: 'Venezuela',
    addressCountry: 'VE',
  },
}

/** Districts and commercial hubs Dekorama Caracas actually serves. */
export const CARACAS_ZONES = [
  'Altamira',
  'Las Mercedes',
  'La Castellana',
  'Los Palos Grandes',
  'Chacao',
  'Baruta',
  'El Hatillo',
  'La Trinidad',
  'Los Naranjos',
  'Boleíta',
]

/**
 * @param {string} locale
 * @param {string} [description]
 */
export function buildCaracasServiceJsonLd(locale, description) {
  const isEs = locale !== 'en'

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEs
      ? 'Suministro de materiales de acabado y reformas integrales en Caracas'
      : 'Premium finishing materials and full renovations in Caracas',
    serviceType: isEs
      ? 'Suministro de materiales para reforma y ejecución de reformas integrales'
      : 'Renovation materials supply and full renovation execution',
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama Caracas',
      '@id': `${baseUrl}/#business-caracas`,
    },
    areaServed: [
      CARACAS_PLACE,
      ...CARACAS_ZONES.map((name) => ({
        '@type': 'Place',
        name,
        containedInPlace: { '@type': 'City', name: 'Caracas' },
      })),
    ],
    audience: [
      { '@type': 'Audience', audienceType: 'Homeowner' },
      { '@type': 'Audience', audienceType: 'Architect' },
      { '@type': 'Audience', audienceType: 'Interior designer' },
      { '@type': 'Audience', audienceType: 'Building contractor' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEs ? 'Materiales y obra en Caracas' : 'Materials and works in Caracas',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs
              ? 'Suministro de materiales de acabado (porcelánicos, grifería, sanitarios, mamparas)'
              : 'Supply of finishing materials (porcelain, taps, sanitaryware, screens)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Ejecución de reformas integrales' : 'Full renovation execution',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Cocinas a medida' : 'Custom kitchens',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Baños completos' : 'Complete bathrooms',
          },
        },
      ],
    },
  }
}
