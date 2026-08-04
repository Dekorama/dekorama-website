/**
 * Showroom AggregateOffer price ranges (EUR) for Product JSON-LD.
 * Keys match product page slugs / categories.
 */

/** @typedef {{ lowPrice: string, highPrice: string, offerCount: number }} ProductOfferRange */

/** @type {Record<string, ProductOfferRange>} */
export const productOffers = {
  porcelanicos: { lowPrice: '25', highPrice: '120', offerCount: 80 },
  grifos: { lowPrice: '80', highPrice: '800', offerCount: 120 },
  mamparas: { lowPrice: '300', highPrice: '1500', offerCount: 40 },
  inodoros: { lowPrice: '250', highPrice: '1200', offerCount: 50 },
  baneras: { lowPrice: '200', highPrice: '2000', offerCount: 60 },
}
