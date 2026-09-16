/**
 * GA4 / GTM helpers via dataLayer. Works with Consent Mode v2
 * (cookieless pings when analytics_storage is denied).
 */

export const COOKIE_CONSENT_KEY = 'dekorama-cookie-consent'
export const COOKIE_CONSENT_EVENT = 'dekorama-cookie-consent'

/** @typedef {'accepted' | 'rejected'} CookieConsentValue */

/**
 * @returns {((...args: unknown[]) => void) | undefined}
 */
function getGtag() {
  if (typeof window === 'undefined') return undefined
  return typeof window.gtag === 'function' ? window.gtag : undefined
}

/**
 * Ensure dataLayer + gtag stub exist (Consent Mode scripts may set them first).
 */
export function ensureDataLayer() {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    // Match Google's stub: push the Arguments object, not a plain array.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
  }
}

/**
 * @param {CookieConsentValue} value
 */
export function persistCookieConsent(value) {
  if (typeof window === 'undefined') return
  localStorage.setItem(COOKIE_CONSENT_KEY, value)
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
}

/**
 * @returns {CookieConsentValue | null}
 */
export function readCookieConsent() {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (value === 'accepted' || value === 'rejected') return value
  return null
}

/**
 * @param {'granted' | 'denied'} analyticsState
 */
export function updateAnalyticsConsent(analyticsState) {
  ensureDataLayer()
  const gtag = getGtag()
  if (!gtag) return

  const adsState = analyticsState === 'granted' ? 'granted' : 'denied'
  gtag('consent', 'update', {
    ad_storage: adsState,
    ad_user_data: adsState,
    ad_personalization: adsState,
    analytics_storage: analyticsState,
  })
}

/**
 * Push a GA4-compatible event for GTM (single channel — no gtag double-fire).
 * @param {string} eventName
 * @param {Record<string, string | number | boolean | undefined>} [params]
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return
  ensureDataLayer()
  window.dataLayer.push({ event: eventName, ...params })
  const gtag = getGtag()
  if (gtag) gtag('event', eventName, params)
}
