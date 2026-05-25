/**
 * Bidirectional mapping between Spanish and English blog post slugs
 * Used for locale switching and generating alternate language links
 */
export const blogSlugMap = {
  'tarima-vs-porcelanico-madera': {
    es: 'tarima-vs-porcelanico-madera',
    en: 'hardwood-vs-wood-look-tile',
  },
  'tendencias-porcelanico-2026': {
    es: 'tendencias-porcelanico-2026',
    en: 'porcelain-trends-2026',
  },
  // Reverse mappings for easy lookup from English slugs
  'hardwood-vs-wood-look-tile': {
    es: 'tarima-vs-porcelanico-madera',
    en: 'hardwood-vs-wood-look-tile',
  },
  'porcelain-trends-2026': {
    es: 'tendencias-porcelanico-2026',
    en: 'porcelain-trends-2026',
  },
  'cuanto-cuesta-reformar-piso-villa-costa-del-sol': {
    es: 'cuanto-cuesta-reformar-piso-villa-costa-del-sol',
    en: 'home-renovation-guide-expats-costa-del-sol',
  },
  'home-renovation-guide-expats-costa-del-sol': {
    es: 'cuanto-cuesta-reformar-piso-villa-costa-del-sol',
    en: 'home-renovation-guide-expats-costa-del-sol',
  },
  'reformar-apartamento-alquiler-vacacional-costa-del-sol': {
    es: 'reformar-apartamento-alquiler-vacacional-costa-del-sol',
    en: 'renovate-holiday-rental-apartment-costa-del-sol',
  },
  'renovate-holiday-rental-apartment-costa-del-sol': {
    es: 'reformar-apartamento-alquiler-vacacional-costa-del-sol',
    en: 'renovate-holiday-rental-apartment-costa-del-sol',
  },
  'banos-pequenos-ideas-ganar-espacio': {
    es: 'banos-pequenos-ideas-ganar-espacio',
    en: 'small-bathrooms-ideas-maximize-space',
  },
  'small-bathrooms-ideas-maximize-space': {
    es: 'banos-pequenos-ideas-ganar-espacio',
    en: 'small-bathrooms-ideas-maximize-space',
  },
  'cocina-abierta-salon-guia-completa': {
    es: 'cocina-abierta-salon-guia-completa',
    en: 'open-plan-kitchen-complete-guide',
  },
  'open-plan-kitchen-complete-guide': {
    es: 'cocina-abierta-salon-guia-completa',
    en: 'open-plan-kitchen-complete-guide',
  },
  'piscinas-azulejos-verano-2026': {
    es: 'piscinas-azulejos-verano-2026',
    en: 'pool-tiles-summer-2026',
  },
  'pool-tiles-summer-2026': {
    es: 'piscinas-azulejos-verano-2026',
    en: 'pool-tiles-summer-2026',
  },
  'reformas-cocina-isla-marbella': {
    es: 'reformas-cocina-isla-marbella',
    en: 'kitchen-renovations-island-marbella',
  },
  'kitchen-renovations-island-marbella': {
    es: 'reformas-cocina-isla-marbella',
    en: 'kitchen-renovations-island-marbella',
  },

  'porcelanico-exterior-terraza-costa-sol': {
    es: 'porcelanico-exterior-terraza-costa-sol',
    en: 'porcelain-tiles-outdoor-terrace-costa-del-sol',
  },
  'porcelain-tiles-outdoor-terrace-costa-del-sol': {
    es: 'porcelanico-exterior-terraza-costa-sol',
    en: 'porcelain-tiles-outdoor-terrace-costa-del-sol',
  },
  'mamparas-ducha-sin-marco-benalmadena': {
    es: 'mamparas-ducha-sin-marco-benalmadena',
    en: 'frameless-shower-screens-benalmadena',
  },
  'frameless-shower-screens-benalmadena': {
    es: 'mamparas-ducha-sin-marco-benalmadena',
    en: 'frameless-shower-screens-benalmadena',
  },
  'cuanto-cuesta-reformar-bano-completo-costa-del-sol': {
    es: 'cuanto-cuesta-reformar-bano-completo-costa-del-sol',
    en: 'bathroom-renovation-cost-costa-del-sol',
  },
  'bathroom-renovation-cost-costa-del-sol': {
    es: 'cuanto-cuesta-reformar-bano-completo-costa-del-sol',
    en: 'bathroom-renovation-cost-costa-del-sol',
  },
  'como-planificar-reforma-integral-costa-del-sol': {
    es: 'como-planificar-reforma-integral-costa-del-sol',
    en: 'how-to-renovate-costa-del-sol-expat',
  },
  'how-to-renovate-costa-del-sol-expat': {
    es: 'como-planificar-reforma-integral-costa-del-sol',
    en: 'how-to-renovate-costa-del-sol-expat',
  },}

/**
 * Get the slug for a specific locale
 * @param {string} slug - The current slug (in any locale)
 * @param {string} targetLocale - The target locale ('es' or 'en')
 * @param {string} currentLocale - The current locale ('es' or 'en')
 * @returns {string} The slug in the target locale
 */
export function getSlugForLocale(slug, targetLocale, currentLocale = 'es') {
  const mapping = blogSlugMap[slug]
  if (!mapping) {
    console.warn(`No slug mapping found for: ${slug}`)
    return slug
  }
  return mapping[targetLocale] || slug
}

/**
 * Get all slugs for a specific locale
 * @param {string} locale - The locale ('es' or 'en')
 * @returns {string[]} Array of slugs for the given locale
 */
export function getSlugsByLocale(locale) {
  const slugs = new Set()
  Object.values(blogSlugMap).forEach((mapping) => {
    if (mapping[locale]) {
      slugs.add(mapping[locale])
    }
  })
  return Array.from(slugs)
}
