/** @typedef {'spain' | 'venezuela'} MarketId */

/** ISO country codes → Dekorama market */
const COUNTRY_TO_MARKET = {
  ES: 'spain',
  IC: 'spain', // Canary Islands (some CDNs)
  VE: 'venezuela',
}

/** IANA timezones → market (offline fallback) */
const TIMEZONE_TO_MARKET = {
  'Europe/Madrid': 'spain',
  'Atlantic/Canary': 'spain',
  'Africa/Ceuta': 'spain',
  'America/Caracas': 'venezuela',
}

/**
 * @param {string | null | undefined} countryCode
 * @returns {MarketId | null}
 */
export function marketFromCountryCode(countryCode) {
  if (!countryCode) return null
  const code = countryCode.trim().toUpperCase()
  return COUNTRY_TO_MARKET[code] ?? null
}

/**
 * @returns {MarketId | null}
 */
export function marketFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (!tz) return null
    if (TIMEZONE_TO_MARKET[tz]) return TIMEZONE_TO_MARKET[tz]
    return null
  } catch {
    return null
  }
}

/**
 * Resolve market from IP geo API + timezone fallback.
 * Returns null when unknown → show country gate.
 * @returns {Promise<MarketId | null>}
 */
export async function detectMarket() {
  try {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 2500)
    const res = await fetch('/api/geo', {
      signal: controller.signal,
      cache: 'no-store',
    })
    window.clearTimeout(timeout)

    if (res.ok) {
      const data = /** @type {{ country?: string | null, market?: MarketId | null }} */ (
        await res.json()
      )
      if (data.market === 'spain' || data.market === 'venezuela') {
        return data.market
      }
      const fromCountry = marketFromCountryCode(data.country)
      if (fromCountry) return fromCountry
    }
  } catch {
    // fall through to timezone
  }

  return marketFromTimezone()
}
