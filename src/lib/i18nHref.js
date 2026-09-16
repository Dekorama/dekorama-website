/**
 * Strip a leading locale segment so hrefs can be passed to the locale-aware
 * `Link`, which adds the prefix itself (`localePrefix: 'always'`).
 * Without this, `/es/reformas-marbella` renders as `/es/es/reformas-marbella`.
 * @param {string} href
 * @returns {string}
 */
export function toI18nHref(href) {
  if (!href || href.startsWith('http') || href.startsWith('#')) return href
  const stripped = href.replace(/^\/(es|en)(?=\/|$|#|\?)/, '')
  return stripped || '/'
}
