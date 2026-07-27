import { baseUrl } from '@/lib/site'

/**
 * Primary hub pages Google may promote as brand sitelinks.
 * Keep names short and unique — Google often reuses title + meta description.
 * @param {'es' | 'en'} locale
 */
export function getSiteNavigation(locale) {
  const prefix = locale === 'en' ? `${baseUrl}/en` : `${baseUrl}/es`

  if (locale === 'en') {
    return [
      {
        name: 'Services',
        url: `${prefix}/servicios`,
        description:
          'Full renovations, custom kitchens, bathrooms and premium materials on the Costa del Sol.',
      },
      {
        name: 'Catalogue',
        url: `${prefix}/catalogo`,
        description:
          'Premium porcelain tiles, taps, sanitaryware and lighting for high-end renovations.',
      },
      {
        name: 'Projects',
        url: `${prefix}/proyectos`,
        description:
          'Completed full renovations, kitchens and bathrooms by Dekorama on the Costa del Sol.',
      },
      {
        name: 'Blog',
        url: `${prefix}/blog`,
        description:
          'Tips and guides on renovations, kitchens, bathrooms and materials.',
      },
      {
        name: 'Contact',
        url: `${prefix}/contacto`,
        description:
          'Request a free consultation or visit the Benalmádena showroom.',
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
      name: 'Servicios',
      url: `${prefix}/servicios`,
      description:
        'Reformas integrales, cocinas a medida, baños y materiales premium en la Costa del Sol.',
    },
    {
      name: 'Catálogo',
      url: `${prefix}/catalogo`,
      description:
        'Porcelánicos, grifería, sanitarios e iluminación premium para reformas de alta gama.',
    },
    {
      name: 'Proyectos',
      url: `${prefix}/proyectos`,
      description:
        'Galería de reformas integrales, cocinas y baños realizados por Dekorama.',
    },
    {
      name: 'Blog',
      url: `${prefix}/blog`,
      description:
        'Guías y consejos sobre reformas, cocinas, baños y materiales.',
    },
    {
      name: 'Contacto',
      url: `${prefix}/contacto`,
      description:
        'Solicita consulta sin costo o visita el showroom en Benalmádena.',
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
 * Does not guarantee sitelinks (Google decides), but clarifies site hierarchy.
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
