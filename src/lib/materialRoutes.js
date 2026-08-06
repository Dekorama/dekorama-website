/** @typedef {import('@/lib/marketPreference').MarketId} MarketId */

/**
 * Home path for a market.
 * @param {MarketId} market
 * @returns {string}
 */
export function marketHomeHref(market) {
  return market === 'venezuela' ? '/reformas-caracas' : '/'
}

/**
 * Contact path for a market.
 * @param {MarketId} market
 * @returns {string}
 */
export function marketContactHref(market) {
  return market === 'venezuela' ? '/contacto-caracas' : '/contacto'
}

/**
 * Materials hub path for a market (locality URL, not country name).
 * @param {MarketId} market
 * @returns {string}
 */
export function marketMaterialsHref(market) {
  return market === 'venezuela' ? '/materiales-caracas' : '/materiales'
}

/**
 * Premium materials path for a market.
 * @param {MarketId} market
 * @returns {string}
 */
export function marketMaterialsPremiumHref(market) {
  return market === 'venezuela'
    ? '/materiales-premium-caracas'
    : '/materiales-premium'
}

/**
 * Catalog path scoped to market filter.
 * @param {MarketId} market
 * @returns {string}
 */
export function marketCatalogHref(market) {
  return market === 'venezuela' ? '/catalogo?pais=venezuela' : '/catalogo?pais=spain'
}

/** Spain SEO category paths → Caracas catalog (shared product range, locality URL). */
const SPAIN_CATEGORY_TO_CATALOG = {
  '/porcelanicos-malaga': '/catalogo?pais=venezuela',
  '/venta-grifos-benalmadena': '/catalogo?pais=venezuela',
  '/mamparas-ducha-benalmadena': '/catalogo?pais=venezuela',
  '/inodoros-suspendidos-benalmadena': '/catalogo?pais=venezuela',
  '/baneras-platos-ducha-benalmadena': '/catalogo?pais=venezuela',
}

/**
 * Remap a materials-related href for the active market.
 * Spain keeps city SEO; Caracas uses locality materials + catalog.
 * @param {string} href
 * @param {MarketId} market
 * @returns {string}
 */
export function resolveMaterialHref(href, market) {
  if (market !== 'venezuela') return href

  if (href === '/materiales' || href.endsWith('/materiales')) {
    return '/materiales-caracas'
  }
  if (href === '/materiales-premium' || href.endsWith('/materiales-premium')) {
    return '/materiales-premium-caracas'
  }
  if (href === '/catalogo' || href.startsWith('/catalogo?')) {
    return marketCatalogHref('venezuela')
  }
  if (SPAIN_CATEGORY_TO_CATALOG[href]) {
    return SPAIN_CATEGORY_TO_CATALOG[href]
  }
  return href
}

/**
 * Category cards for materials hub.
 * @param {MarketId} market
 * @returns {{ key: string, href: string }[]}
 */
export function getMaterialHubCategories(market) {
  if (market === 'venezuela') {
    return [
      { key: 'grifos', href: '/catalogo?pais=venezuela' },
      { key: 'mamparas', href: '/catalogo?pais=venezuela' },
      { key: 'sanitarios', href: '/catalogo?pais=venezuela' },
      { key: 'baneras', href: '/catalogo?pais=venezuela' },
      { key: 'porcelanicos', href: '/catalogo?pais=venezuela' },
    ]
  }

  return [
    { key: 'grifos', href: '/venta-grifos-benalmadena' },
    { key: 'mamparas', href: '/mamparas-ducha-benalmadena' },
    { key: 'sanitarios', href: '/inodoros-suspendidos-benalmadena' },
    { key: 'baneras', href: '/baneras-platos-ducha-benalmadena' },
    { key: 'porcelanicos', href: '/porcelanicos-malaga' },
  ]
}

/**
 * Premium category cards.
 * @param {MarketId} market
 * @returns {{ key: string, href: string }[]}
 */
export function getMaterialPremiumCategories(market) {
  const hub = marketMaterialsHref(market)
  const catalog = marketCatalogHref(market)

  if (market === 'venezuela') {
    return [
      { key: 'porcelanicos', href: catalog },
      { key: 'griferia', href: catalog },
      { key: 'ducha', href: catalog },
      { key: 'iluminacion', href: hub },
      { key: 'mamparas', href: catalog },
      { key: 'exterior', href: hub },
    ]
  }

  return [
    { key: 'porcelanicos', href: '/porcelanicos-malaga' },
    { key: 'griferia', href: '/venta-grifos-benalmadena' },
    { key: 'ducha', href: '/baneras-platos-ducha-benalmadena' },
    { key: 'iluminacion', href: hub },
    { key: 'mamparas', href: '/mamparas-ducha-benalmadena' },
    { key: 'exterior', href: hub },
  ]
}

/**
 * Swap materials paths when switching market (same pattern as home/contact).
 * @param {string} pathname — locale-stripped pathname from next-intl
 * @param {MarketId} nextMarket
 * @returns {string | null} new path, or null if no remap
 */
export function remapMaterialsPathForMarket(pathname, nextMarket) {
  const map = {
    spain: {
      '/materiales-caracas': '/materiales',
      '/materiales-premium-caracas': '/materiales-premium',
    },
    venezuela: {
      '/materiales': '/materiales-caracas',
      '/materiales-premium': '/materiales-premium-caracas',
    },
  }
  return map[nextMarket][pathname] ?? null
}
