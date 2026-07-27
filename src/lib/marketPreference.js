/** @typedef {'spain' | 'venezuela'} MarketId */

export const MARKET_STORAGE_KEY = 'dekorama-market'

/** @type {MarketId[]} */
export const MARKET_IDS = ['spain', 'venezuela']

/**
 * @param {unknown} value
 * @returns {value is MarketId}
 */
export function isMarketId(value) {
  return value === 'spain' || value === 'venezuela'
}

/**
 * @returns {MarketId | null}
 */
export function getStoredMarket() {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(MARKET_STORAGE_KEY)
  return isMarketId(value) ? value : null
}

/**
 * @param {MarketId} marketId
 */
export function setStoredMarket(marketId) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(MARKET_STORAGE_KEY, marketId)
  window.dispatchEvent(new CustomEvent('dekorama-market-change', { detail: marketId }))
}
