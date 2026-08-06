import { images } from '@/data/images'
import { matchesSearch, normalizeSearch } from '@/lib/siteSearch'

/**
 * @typedef {'spain' | 'venezuela'} CatalogCountry
 * @typedef {'tiles' | 'taps' | 'sanitaryware' | 'lighting' | 'bathroom' | 'exterior'} CatalogCategory
 *
 * @typedef {object} CatalogItem
 * @property {string} slug
 * @property {string} brand
 * @property {string} brandKey
 * @property {string} title
 * @property {CatalogCountry} country
 * @property {string} file
 * @property {CatalogCategory} category
 * @property {string} cover
 * @property {string[]} keywords
 */

/** @type {CatalogItem[]} */
export const CATALOGS = [
  {
    slug: 'harmony',
    brand: 'Harmony',
    brandKey: 'harmony',
    title: 'Harmony',
    country: 'spain',
    file: '/catalogs/spain/harmony.pdf',
    category: 'tiles',
    cover: images.featured.swatches[0].src,
    keywords: ['harmony', 'porcelanico', 'porcelánico', 'tile', 'tiles', 'spain', 'españa'],
  },
  {
    slug: 'museum',
    brand: 'Museum',
    brandKey: 'museum',
    title: 'Museum',
    country: 'spain',
    file: '/catalogs/spain/museum.pdf',
    category: 'tiles',
    cover: images.services.reformas,
    keywords: ['museum', 'porcelanico', 'porcelánico', 'tile', 'tiles', 'spain', 'españa'],
  },
  {
    slug: 'nadis',
    brand: 'Nadis',
    brandKey: 'nadis',
    title: 'Nadis',
    country: 'spain',
    file: '/catalogs/spain/nadis.pdf',
    category: 'tiles',
    cover: images.featured.main,
    keywords: ['nadis', 'porcelanico', 'porcelánico', 'tile', 'tiles', 'spain', 'españa'],
  },
  {
    slug: 'neve',
    brand: 'Neve',
    brandKey: 'neve',
    title: 'Neve',
    country: 'spain',
    file: '/catalogs/spain/neve.pdf',
    category: 'taps',
    cover: images.featured.swatches[1].src,
    keywords: ['neve', 'griferia', 'grifería', 'tap', 'taps', 'faucet', 'spain', 'españa'],
  },
  {
    slug: 'porcelanite-dos',
    brand: 'Porcelanite',
    brandKey: 'porcelanite',
    title: 'Porcelanite Dos',
    country: 'spain',
    file: '/catalogs/spain/porcelanite-dos.pdf',
    category: 'tiles',
    cover: images.dual.projects,
    keywords: [
      'porcelanite',
      'porcelanite dos',
      'porcelanico',
      'porcelánico',
      'tile',
      'tiles',
      'spain',
      'españa',
    ],
  },
  {
    slug: 'europa-griferias-1',
    brand: 'Europa Griferías',
    brandKey: 'europa-griferias',
    title: 'Europa Griferías — Vol. 1',
    country: 'venezuela',
    file: '/catalogs/venezuela/europa-griferias-1.pdf',
    category: 'taps',
    cover: images.featured.swatches[1].src,
    keywords: [
      'europa',
      'europa griferias',
      'europa griferías',
      'griferia',
      'grifería',
      'tap',
      'taps',
      'venezuela',
      'caracas',
    ],
  },
  {
    slug: 'europa-griferias-2',
    brand: 'Europa Griferías',
    brandKey: 'europa-griferias',
    title: 'Europa Griferías — Vol. 2',
    country: 'venezuela',
    file: '/catalogs/venezuela/europa-griferias-2.pdf',
    category: 'taps',
    cover: images.services.banos,
    keywords: [
      'europa',
      'europa griferias',
      'europa griferías',
      'griferia',
      'grifería',
      'tap',
      'taps',
      'venezuela',
      'caracas',
    ],
  },
  {
    slug: 'kubo',
    brand: 'Kubo',
    brandKey: 'kubo',
    title: 'Kubo',
    country: 'venezuela',
    file: '/catalogs/venezuela/kubo.pdf',
    category: 'bathroom',
    cover: images.services.cocinas,
    keywords: ['kubo', 'baño', 'bano', 'bathroom', 'mobiliario', 'venezuela', 'caracas'],
  },
]

/**
 * @param {string} slug
 * @returns {CatalogItem | undefined}
 */
export function getCatalogBySlug(slug) {
  return CATALOGS.find((item) => item.slug === slug)
}

/**
 * @param {CatalogCountry} country
 * @returns {{ brandKey: string, brand: string }[]}
 */
export function getBrandsForCountry(country) {
  /** @type {Map<string, string>} */
  const map = new Map()
  for (const item of CATALOGS) {
    if (item.country !== country) continue
    if (!map.has(item.brandKey)) map.set(item.brandKey, item.brand)
  }
  return [...map.entries()].map(([brandKey, brand]) => ({ brandKey, brand }))
}

/**
 * @param {{
 *   country?: CatalogCountry | null
 *   brandKey?: string | null
 *   query?: string
 * }} [opts]
 * @returns {CatalogItem[]}
 */
export function filterCatalogs(opts = {}) {
  const { country = null, brandKey = null, query = '' } = opts

  return CATALOGS.filter((item) => {
    if (country && item.country !== country) return false
    if (brandKey && item.brandKey !== brandKey) return false
    return matchesSearch(query, `${item.brand} ${item.title}`, item.keywords)
  })
}

/**
 * @param {string} value
 * @returns {value is CatalogCountry}
 */
export function isCatalogCountry(value) {
  return value === 'spain' || value === 'venezuela'
}

/**
 * Filename for download attribute.
 * @param {CatalogItem} item
 * @returns {string}
 */
export function getCatalogDownloadName(item) {
  const parts = item.file.split('/')
  return parts[parts.length - 1] || `${item.slug}.pdf`
}

/**
 * Normalize brand filter from URL.
 * @param {string | null | undefined} value
 * @param {CatalogCountry} country
 * @returns {string | null}
 */
export function resolveBrandKey(value, country) {
  if (!value) return null
  const key = normalizeSearch(value).replace(/\s+/g, '-')
  const brands = getBrandsForCountry(country)
  return brands.some((b) => b.brandKey === key) ? key : null
}
