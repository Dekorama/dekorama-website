import { baseUrl } from '@/lib/site'

/**
 * Primary hub pages Google may promote as brand sitelinks.
 * @param {'es' | 'en'} locale
 */
export function getSiteNavigation(locale) {
  const prefix = locale === 'en' ? `${baseUrl}/en` : `${baseUrl}/es`

  if (locale === 'en') {
    return [
      {
        name: 'Materials',
        url: `${prefix}/materiales`,
        description:
          'Porcelain tiles, taps, sanitaryware and premium finishes at the Benalmádena showroom.',
      },
      {
        name: 'Services',
        url: `${prefix}/servicios`,
        description:
          'Full renovations, custom kitchens, bathrooms and premium materials on the Costa del Sol.',
      },
      {
        name: 'Projects',
        url: `${prefix}/proyectos`,
        description:
          'Completed full renovations, kitchens and bathrooms by Dekorama on the Costa del Sol.',
      },
      {
        name: 'Contact',
        url: `${prefix}/contacto`,
        description:
          'Request a free consultation or visit the Benalmádena showroom.',
      },
      {
        name: 'Catalogue',
        url: `${prefix}/catalogo`,
        description:
          'Browse Dekorama material categories for high-end renovations.',
      },
      {
        name: 'Renovations Benalmádena',
        url: `${prefix}/reformas-benalmadena`,
        description:
          'Full renovations in Benalmádena with local showroom and 12+ years of experience.',
      },
      {
        name: 'Renovations Caracas',
        url: `${prefix}/reformas-caracas`,
        description:
          'Full renovations in Caracas with over 15 years in the Venezuelan market.',
      },
    ]
  }

  return [
    {
      name: 'Materiales',
      url: `${prefix}/materiales`,
      description:
        'Porcelánicos, grifería, sanitarios y acabados premium en el showroom de Benalmádena.',
    },
    {
      name: 'Servicios',
      url: `${prefix}/servicios`,
      description:
        'Reformas integrales, cocinas a medida, baños y materiales premium en la Costa del Sol.',
    },
    {
      name: 'Proyectos',
      url: `${prefix}/proyectos`,
      description:
        'Galería de reformas integrales, cocinas y baños realizados por Dekorama.',
    },
    {
      name: 'Contáctanos',
      url: `${prefix}/contacto`,
      description:
        'Solicita consulta sin costo o visita el showroom en Benalmádena.',
    },
    {
      name: 'Catálogo',
      url: `${prefix}/catalogo`,
      description:
        'Explora las categorías de materiales Dekorama para reformas de alta gama.',
    },
    {
      name: 'Reformas Benalmádena',
      url: `${prefix}/reformas-benalmadena`,
      description:
        'Reformas integrales en Benalmádena con showroom propio y más de 12 años de experiencia.',
    },
    {
      name: 'Reformas Caracas',
      url: `${prefix}/reformas-caracas`,
      description:
        'Reformas integrales en Caracas. Más de 15 años en el mercado venezolano.',
    },
  ]
}

/**
 * SiteNavigationElement ItemList — helps crawlers map primary destinations.
 * @param {'es' | 'en'} locale
 */
export function buildSiteNavigationJsonLd(locale) {
  const items = getSiteNavigation(locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}/#sitenavigation`,
    name: locale === 'en' ? 'Dekorama main navigation' : 'Navegación principal Dekorama',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      description: item.description,
      url: item.url,
    })),
  }
}
