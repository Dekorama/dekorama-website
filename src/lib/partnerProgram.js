import { baseUrl } from '@/lib/site'
import { COSTA_DEL_SOL_PLACE, PARTNER_AUDIENCE } from '@/lib/costaDelSol'
import { buildFaqPageJsonLd } from '@/lib/faqSchema'

/**
 * JSON-LD for the Spain B2B partner programme — material support + commissions
 * for professionals across the Costa del Sol.
 * @param {{
 *   locale: string
 *   name: string
 *   description: string
 *   faqs: { question: string, answer: string }[]
 * }} opts
 */
export function buildPartnerProgramJsonLd({ locale, name, description, faqs }) {
  const url = `${baseUrl}/${locale === 'en' ? 'en' : 'es'}/partners`

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#partner-programme`,
    name,
    serviceType: locale === 'en' ? 'Trade partner programme' : 'Programa de colaboradores B2B',
    description,
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    areaServed: COSTA_DEL_SOL_PLACE,
    audience: PARTNER_AUDIENCE,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceLocation: {
        '@type': 'Place',
        name: 'Showroom Dekorama Benalmádena',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Las Ventas, Avenida Tivoli, 17, Centro Comercial, Local 5',
          addressLocality: 'Benalmádena',
          postalCode: '29631',
          addressRegion: 'Málaga',
          addressCountry: 'ES',
        },
      },
    },
  }

  return [service, buildFaqPageJsonLd(faqs)].filter(Boolean)
}
