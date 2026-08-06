import { megaNavItems } from '@/data/megaNav'

/**
 * @typedef {{ href: string, labelKey: string, groupKey: string, keywords: string[] }} SearchEntry
 * @typedef {{ href: string, label: string, group: string, score: number }} SearchResult
 */

/** Extra aliases (ES/EN + brands) keyed by megaNav labelKey. */
const KEYWORDS = {
  porcelanicos: [
    'tile',
    'tiles',
    'porcelain',
    'suelo',
    'revestimiento',
    'piedra',
    'marmol',
    'mármol',
    'marble',
    'wood',
    'madera',
  ],
  griferia: ['grifo', 'grifos', 'tap', 'taps', 'faucet', 'cristina', 'gessi', 'neve', 'tres', 'roca'],
  mamparas: ['mampara', 'shower', 'screen', 'vidrio', 'profiltek', 'spazia', 'castel', 'ducha'],
  sanitarios: [
    'inodoro',
    'toilet',
    'wc',
    'sanitary',
    'geberit',
    'tece',
    'duravit',
    'villeroy',
    'suspendido',
  ],
  baneras: ['bañera', 'banera', 'bath', 'bathtub', 'plato', 'tray', 'hidrobox', 'hidronatur', 'ducha'],
  allMaterials: ['material', 'materiales', 'showroom', 'tienda'],
  catalog: [
    'catalogo',
    'catálogo',
    'catalogue',
    'catalog',
    'harmony',
    'museum',
    'nadis',
    'neve',
    'porcelanite',
    'kubo',
    'europa',
  ],
  premiumMaterials: ['premium', 'lujo', 'luxury'],
  bathroom: ['baño', 'bano', 'bath', 'bathroom'],
  kitchen: ['cocina', 'kitchen'],
  fullRenovation: ['reforma', 'renovation', 'integral'],
  showroom: ['tienda', 'store', 'benalmadena', 'benalmádena'],
  reformas: ['reforma', 'renovation', 'obra'],
  cocinas: ['cocina', 'kitchen', 'custom'],
  banos: ['baño', 'bano', 'bathroom'],
  allServices: ['servicio', 'service'],
  projects: ['proyecto', 'project', 'galeria', 'gallery'],
  blog: ['articulo', 'article', 'guia', 'guide'],
  partners: ['partner', 'colaborador'],
  benalmadena: ['benalmádena', 'malaga', 'málaga', 'costa del sol'],
  marbella: ['marbella'],
  fuengirola: ['fuengirola'],
  estepona: ['estepona'],
  torremolinos: ['torremolinos'],
  caracas: ['venezuela', 'caracas'],
  findLocation: ['ubicacion', 'ubicación', 'location', 'contacto', 'contact'],
}

/** Catalog grid keys → searchable aliases (pages.catalogo.categories.*). */
export const CATALOG_SEARCH_KEYWORDS = {
  tiles: [
    'porcelanico',
    'porcelánico',
    'tile',
    'tiles',
    'porcelain',
    'suelo',
    'revestimiento',
    'harmony',
    'museum',
    'nadis',
    'porcelanite',
  ],
  taps: [
    'griferia',
    'grifería',
    'grifo',
    'tap',
    'taps',
    'faucet',
    'neve',
    'europa',
    'europa griferias',
    'europa griferías',
  ],
  sanitaryware: ['sanitario', 'inodoro', 'toilet', 'wc'],
  lighting: ['iluminacion', 'iluminación', 'light', 'lighting', 'lamp'],
  bathroom: ['baño', 'bano', 'bathroom', 'mobiliario', 'kubo'],
  exterior: ['exterior', 'outdoor', 'jardin', 'jardín'],
}

/**
 * @param {string} value
 */
export function normalizeSearch(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Flat unique index from mega-nav links.
 * @returns {SearchEntry[]}
 */
export function getSearchEntries() {
  /** @type {SearchEntry[]} */
  const entries = []
  const seen = new Set()

  for (const item of megaNavItems) {
    for (const col of item.columns) {
      for (const link of col.links) {
        if (seen.has(link.href)) continue
        seen.add(link.href)
        entries.push({
          href: link.href,
          labelKey: link.labelKey,
          groupKey: item.labelKey,
          keywords: KEYWORDS[link.labelKey] ?? [],
        })
      }
    }
  }

  return entries
}

/**
 * @param {SearchEntry[]} entries
 * @param {(key: string) => string} resolveLabel
 * @param {string} query
 * @param {number} [limit]
 * @returns {SearchResult[]}
 */
export function searchSite(entries, resolveLabel, query, limit = 8) {
  const q = normalizeSearch(query)
  if (!q) return []

  /** @type {SearchResult[]} */
  const scored = []

  for (const entry of entries) {
    const label = resolveLabel(entry.labelKey)
    const group = resolveLabel(entry.groupKey)
    const labelNorm = normalizeSearch(label)
    const keywordsNorm = entry.keywords.map(normalizeSearch)
    const haystack = [labelNorm, ...keywordsNorm].join(' ')

    let score = 0
    if (labelNorm === q) score = 100
    else if (labelNorm.startsWith(q)) score = 80
    else if (labelNorm.includes(q)) score = 60
    else if (keywordsNorm.some((k) => k === q || k.startsWith(q))) score = 50
    else if (haystack.includes(q)) score = 30
    else continue

    scored.push({ href: entry.href, label, group, score })
  }

  return scored.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label)).slice(0, limit)
}

/**
 * @param {string} query
 * @param {string} label
 * @param {string[]} [keywords]
 */
export function matchesSearch(query, label, keywords = []) {
  const q = normalizeSearch(query)
  if (!q) return true
  const haystack = normalizeSearch([label, ...keywords].join(' '))
  return haystack.includes(q)
}
