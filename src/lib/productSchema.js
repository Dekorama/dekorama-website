import { baseUrl } from '@/lib/site'
import { productOffers } from '@/data/productOffers'

/**
 * @typedef {object} BuildProductJsonLdInput
 * @property {string | string[]} type
 * @property {string} name
 * @property {string} description
 * @property {string} imagePath - Site-relative path, e.g. `/images/...`
 * @property {Record<string, unknown> | Record<string, unknown>[]} brand
 * @property {keyof typeof productOffers} offerKey
 */

/**
 * @param {BuildProductJsonLdInput} input
 * @returns {Record<string, unknown>}
 */
export function buildProductJsonLd({ type, name, description, imagePath, brand, offerKey }) {
  const range = productOffers[offerKey]
  if (!range) {
    throw new Error(`Unknown product offer key: ${String(offerKey)}`)
  }

  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    brand,
    image: `${baseUrl}${imagePath}`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: range.lowPrice,
      highPrice: range.highPrice,
      offerCount: range.offerCount,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Dekorama',
        '@id': `${baseUrl}/#business`,
      },
    },
  }
}
