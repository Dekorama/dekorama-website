import { baseUrl } from '@/lib/site'

/**
 * Format E.164 into a readable display string.
 * @param {string} e164
 * @returns {string}
 */
function formatPhoneDisplay(e164) {
  if (!e164 || /[Xx]/.test(e164)) {
    return e164 || ''
  }
  const digits = e164.replace(/\D/g, '')
  if (digits.startsWith('34') && digits.length === 11) {
    return `+34 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
  }
  if (digits.startsWith('58') && digits.length >= 9) {
    const rest = digits.slice(2)
    if (rest.length === 7) {
      return `+58 ${rest.slice(0, 3)} ${rest.slice(3)}`
    }
    return `+58 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`.trim()
  }
  return e164.startsWith('+') ? e164 : `+${digits}`
}

/**
 * WhatsApp wa.me path digits (country code + number, no +).
 * @param {string} e164
 * @returns {string}
 */
function toWhatsAppDigits(e164) {
  return e164.replace(/\D/g, '')
}

/** Spain HQ — site-wide NAP / LocalBusiness `#business` */
const spainTelephone =
  process.env.NEXT_PUBLIC_ES_PHONE?.replace(/\s/g, '') || '+34628571537'

/** Caracas — WhatsApp + call */
const venezuelaTelephone =
  process.env.NEXT_PUBLIC_VE_PHONE?.replace(/\s/g, '') || '+584144336524'

/**
 * @typedef {object} MarketAddress
 * @property {string} [streetAddress]
 * @property {string} addressLocality
 * @property {string} [postalCode]
 * @property {string} [addressRegion]
 * @property {string} addressCountry
 */

/**
 * @typedef {object} Market
 * @property {string} id
 * @property {string} businessId
 * @property {string} name
 * @property {string} telephone
 * @property {string} phoneDisplay
 * @property {string} whatsappUrl
 * @property {boolean} phoneReady
 * @property {string} email
 * @property {MarketAddress} address
 * @property {{ latitude: number, longitude: number }} geo
 * @property {string[]} areaServed
 * @property {string} locality — city/showroom label for shared copy ({locality})
 * @property {string} region — area label for shared copy ({region})
 */

/** @type {{ spain: Market, venezuela: Market }} */
export const markets = {
  spain: {
    id: 'spain',
    businessId: `${baseUrl}/#business`,
    name: 'Dekorama',
    telephone: spainTelephone,
    phoneDisplay: formatPhoneDisplay(spainTelephone),
    whatsappUrl: `https://wa.me/${toWhatsAppDigits(spainTelephone)}`,
    phoneReady: true,
    email: 'info@dekoramagroup.com',
    address: {
      streetAddress: 'Las Ventas, Avenida Tivoli, 17, Centro Comercial, Local 5',
      addressLocality: 'Benalmádena',
      postalCode: '29631',
      addressRegion: 'Málaga',
      addressCountry: 'ES',
    },
    geo: {
      latitude: 36.5971,
      longitude: -4.5164,
    },
    areaServed: ['ES', 'GB'],
    locality: 'Benalmádena',
    region: 'Costa del Sol',
  },
  /** Caracas — showroom by prior appointment; WhatsApp + call + email. */
  venezuela: {
    id: 'venezuela',
    businessId: `${baseUrl}/#business-caracas`,
    name: 'Dekorama Caracas',
    telephone: venezuelaTelephone,
    phoneDisplay: formatPhoneDisplay(venezuelaTelephone),
    whatsappUrl: `https://wa.me/${toWhatsAppDigits(venezuelaTelephone)}`,
    phoneReady: true,
    email: 'cravelo@dekoramagroup.com',
    address: {
      addressLocality: 'Caracas',
      addressCountry: 'VE',
    },
    geo: {
      latitude: 10.4806,
      longitude: -66.9036,
    },
    areaServed: ['VE'],
    locality: 'Caracas',
    region: 'Caracas',
  },
}

/**
 * @param {import('@/lib/marketPreference').MarketId} marketId
 * @returns {Market}
 */
export function getMarket(marketId) {
  return marketId === 'venezuela' ? markets.venezuela : markets.spain
}

/**
 * LocalBusiness JSON-LD for a market (Caracas page uses venezuela only).
 * Omits telephone when phoneReady is false. No street when not set.
 * @param {Market} market
 * @param {{ description?: string }} [opts]
 */
export function buildLocalBusinessJsonLd(market, opts = {}) {
  /** @type {Record<string, unknown>} */
  const address = {
    '@type': 'PostalAddress',
    addressLocality: market.address.addressLocality,
    addressCountry: market.address.addressCountry,
  }
  if (market.address.streetAddress) {
    address.streetAddress = market.address.streetAddress
  }
  if (market.address.postalCode) {
    address.postalCode = market.address.postalCode
  }
  if (market.address.addressRegion) {
    address.addressRegion = market.address.addressRegion
  }

  /** @type {Record<string, unknown>} */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': market.businessId,
    name: market.name,
    url:
      market.id === 'venezuela'
        ? `${baseUrl}/es/reformas-caracas`
        : baseUrl,
    email: market.email,
    address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: market.geo.latitude,
      longitude: market.geo.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: market.address.addressLocality,
      containedInPlace: {
        '@type': 'Country',
        name: market.address.addressCountry === 'VE' ? 'Venezuela' : market.address.addressCountry,
        addressCountry: market.address.addressCountry,
      },
    },
  }

  if (market.phoneReady && market.telephone) {
    jsonLd.telephone = market.telephone
  }

  if (opts.description) {
    jsonLd.description = opts.description
  }

  return jsonLd
}
