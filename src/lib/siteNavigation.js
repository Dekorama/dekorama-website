import { baseUrl } from '@/lib/site'

/**
 * Primary brand hub pages Google may promote as sitelinks.
 * Keep to category destinations (not city SEO pages).
 * @param {'es' | 'en'} locale
 */
export function getSiteNavigation(locale) {
  const prefix = locale === 'en' ? `${baseUrl}/en` : `${baseUrl}/es`

  if (locale === 'en') {
    return [
      {
        name: 'Porcelain tiles',
        url: `${prefix}/porcelanicos`,
        description:
          'Premium porcelain tiles for floors and walls at the Benalmádena showroom.',
      },
      {
        name: 'Kitchens',
        url: `${prefix}/cocinas-a-medida`,
        description:
          'Custom kitchen design, manufacture and installation on the Costa del Sol.',
      },
      {
        name: 'Bathrooms',
        url: `${prefix}/banos-completos`,
        description:
          'Complete bathroom renovations with premium tiles, taps and finishes.',
      },
      {
        name: 'Materials',
        url: `${prefix}/materiales`,
        description:
          'Porcelain tiles, taps, sanitaryware and premium finishes at the Benalmádena showroom.',
      },
      {
        name: 'Renovations',
        url: `${prefix}/reformas-integrales`,
        description:
          'Full home renovations with custom design and professional execution.',
      },
      {
        name: 'Projects',
        url: `${prefix}/proyectos`,
        description:
          'Completed full renovations, kitchens and bathrooms by Dekorama.',
      },
      {
        name: 'Contact',
        url: `${prefix}/contacto`,
        description:
          'Request a free consultation or visit the Benalmádena showroom.',
      },
    ]
  }

  return [
    {
      name: 'Porcelánicos',
      url: `${prefix}/porcelanicos`,
      description:
        'Porcelánicos premium para suelos y paredes en el showroom de Benalmádena.',
    },
    {
      name: 'Cocinas',
      url: `${prefix}/cocinas-a-medida`,
      description:
        'Diseño, fabricación e instalación de cocinas a medida en la Costa del Sol.',
    },
    {
      name: 'Baños',
      url: `${prefix}/banos-completos`,
      description:
        'Reformas de baños completos con porcelánicos, grifería y acabados premium.',
    },
    {
      name: 'Materiales',
      url: `${prefix}/materiales`,
      description:
        'Porcelánicos, grifería, sanitarios y acabados premium en el showroom de Benalmádena.',
    },
    {
      name: 'Reformas',
      url: `${prefix}/reformas-integrales`,
      description:
        'Reformas integrales con diseño a medida y ejecución profesional.',
    },
    {
      name: 'Proyectos',
      url: `${prefix}/proyectos`,
      description:
        'Galería de reformas integrales, cocinas y baños realizados por Dekorama.',
    },
    {
      name: 'Contacto',
      url: `${prefix}/contacto`,
      description:
        'Solicita consulta sin costo o visita el showroom en Benalmádena.',
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
