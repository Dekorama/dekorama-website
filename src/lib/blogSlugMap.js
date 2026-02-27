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
}

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
