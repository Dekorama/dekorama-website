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

/** Shared category pages (no city in path) — same for all markets. */
export const MATERIAL_CATEGORY_HREFS = {
  porcelanicos: '/porcelanicos',
  grifos: '/griferia',
  mamparas: '/mamparas',
  sanitarios: '/sanitarios',
  baneras: '/baneras-platos-ducha',
}

/**
 * Remap a materials-related href for the active market.
 * Category pages are shared; hubs differ by locality.
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
  return href
}

/**
 * Category cards for materials hub.
 * @param {MarketId} _market
 * @returns {{ key: string, href: string }[]}
 */
export function getMaterialHubCategories(_market) {
  return [
    { key: 'grifos', href: MATERIAL_CATEGORY_HREFS.grifos },
    { key: 'mamparas', href: MATERIAL_CATEGORY_HREFS.mamparas },
    { key: 'sanitarios', href: MATERIAL_CATEGORY_HREFS.sanitarios },
    { key: 'baneras', href: MATERIAL_CATEGORY_HREFS.baneras },
    { key: 'porcelanicos', href: MATERIAL_CATEGORY_HREFS.porcelanicos },
  ]
}

/**
 * Premium category cards.
 * @param {MarketId} market
 * @returns {{ key: string, href: string }[]}
 */
export function getMaterialPremiumCategories(market) {
  const hub = marketMaterialsHref(market)

  return [
    { key: 'porcelanicos', href: MATERIAL_CATEGORY_HREFS.porcelanicos },
    { key: 'griferia', href: MATERIAL_CATEGORY_HREFS.grifos },
    { key: 'ducha', href: MATERIAL_CATEGORY_HREFS.baneras },
    { key: 'iluminacion', href: hub },
    { key: 'mamparas', href: MATERIAL_CATEGORY_HREFS.mamparas },
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
