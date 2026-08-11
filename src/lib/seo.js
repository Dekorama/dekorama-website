import { baseUrl } from '@/lib/site'

/**
 * Normalize a path to `/segment` form (empty string for home).
 * @param {string} [path]
 * @returns {string}
 */
function normalizePath(path = '') {
  if (!path || path === '/') return ''
  const withSlash = path.startsWith('/') ? path : `/${path}`
  return withSlash.replace(/\/$/, '')
}

/**
 * Language alternate map with x-default → Spanish (primary market).
 * @param {string} [path] — path without locale prefix, e.g. `/servicios`
 * @returns {{ es: string, en: string, 'x-default': string }}
 */
export function buildLanguageAlternates(path = '') {
  const clean = normalizePath(path)
  return {
    es: `${baseUrl}/es${clean}`,
    en: `${baseUrl}/en${clean}`,
    'x-default': `${baseUrl}/es${clean}`,
  }
}

/**
 * Canonical + hreflang alternates for a locale page.
 * @param {string} locale — `es` | `en`
 * @param {string} [path] — path without locale prefix
 * @returns {{ canonical: string, languages: { es: string, en: string, 'x-default': string } }}
 */
export function pageAlternates(locale, path = '') {
  const clean = normalizePath(path)
  const resolvedLocale = locale === 'en' ? 'en' : 'es'
  return {
    canonical: `${baseUrl}/${resolvedLocale}${clean}`,
    languages: buildLanguageAlternates(clean),
  }
}

/**
 * Alternates when ES/EN paths differ (e.g. blog slug maps).
 * @param {string} locale
 * @param {{ es: string, en: string }} paths — paths without locale (`/blog/slug`)
 */
export function pageAlternatesForLocales(locale, paths) {
  const esPath = normalizePath(paths.es)
  const enPath = normalizePath(paths.en)
  const resolvedLocale = locale === 'en' ? 'en' : 'es'
  const canonicalPath = resolvedLocale === 'en' ? enPath : esPath
  return {
    canonical: `${baseUrl}/${resolvedLocale}${canonicalPath}`,
    languages: {
      es: `${baseUrl}/es${esPath}`,
      en: `${baseUrl}/en${enPath}`,
      'x-default': `${baseUrl}/es${esPath}`,
    },
  }
}
