/**
 * Costa del Sol geo entities shared by page schema and the regional hub.
 * Wikidata IDs are verified entities — answer engines use them to resolve the
 * region and its towns, so never swap one without checking the label first.
 */

/** @typedef {{ name: string, wikidata: string, href: string | null }} CostaDelSolTown */

/** AdministrativeArea node for the region (Q215254), inside Málaga province (Q95028). */
export const COSTA_DEL_SOL_PLACE = {
  '@type': 'AdministrativeArea',
  name: 'Costa del Sol',
  alternateName: ['Costa del Sol (Málaga)', 'Costa del Sol occidental'],
  sameAs: 'https://www.wikidata.org/wiki/Q215254',
  containedInPlace: {
    '@type': 'AdministrativeArea',
    name: 'Provincia de Málaga',
    sameAs: 'https://www.wikidata.org/wiki/Q95028',
    containedInPlace: {
      '@type': 'Country',
      name: 'España',
      addressCountry: 'ES',
    },
  },
}

/** @type {CostaDelSolTown[]} */
export const COSTA_DEL_SOL_TOWNS = [
  {
    name: 'Benalmádena',
    wikidata: 'https://www.wikidata.org/wiki/Q488869',
    href: '/reformas-benalmadena',
  },
  {
    name: 'Torremolinos',
    wikidata: 'https://www.wikidata.org/wiki/Q492737',
    href: '/reformas-torremolinos',
  },
  {
    name: 'Fuengirola',
    wikidata: 'https://www.wikidata.org/wiki/Q492735',
    href: '/reformas-fuengirola',
  },
  {
    name: 'Marbella',
    wikidata: 'https://www.wikidata.org/wiki/Q484799',
    href: '/reformas-marbella',
  },
  {
    name: 'Estepona',
    wikidata: 'https://www.wikidata.org/wiki/Q492748',
    href: '/reformas-estepona',
  },
  {
    name: 'Mijas',
    wikidata: 'https://www.wikidata.org/wiki/Q492744',
    href: null,
  },
  {
    name: 'Málaga',
    wikidata: 'https://www.wikidata.org/wiki/Q8851',
    href: null,
  },
]

/** Wikidata URL per town name, for city page schema. */
export const TOWN_WIKIDATA = Object.fromEntries(
  COSTA_DEL_SOL_TOWNS.map((town) => [town.name, town.wikidata]),
)

/** Audience types for the Spain B2B partner programme (architects, studios, contractors). */
export const PARTNER_AUDIENCE = [
  { '@type': 'Audience', audienceType: 'Architect' },
  { '@type': 'Audience', audienceType: 'Interior designer' },
  { '@type': 'Audience', audienceType: 'Building contractor' },
  { '@type': 'Audience', audienceType: 'Kitchen and bathroom fitter' },
]

/**
 * `areaServed` City node for a town page, nested inside the Costa del Sol region
 * so city pages also answer regional ("Costa del Sol") queries.
 * @param {string} name — town name as written in COSTA_DEL_SOL_TOWNS
 */
export function buildTownAreaServed(name) {
  /** @type {Record<string, unknown>} */
  const city = {
    '@type': 'City',
    name,
    containedInPlace: COSTA_DEL_SOL_PLACE,
  }
  const wikidata = TOWN_WIKIDATA[name]
  if (wikidata) {
    city.sameAs = wikidata
  }
  return city
}
