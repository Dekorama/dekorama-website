import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { markets, buildLocalBusinessJsonLd } from '@/lib/markets'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/Hero'
import FeaturedSpaces from '@/components/home/FeaturedSpaces'
import QuoteStrip from '@/components/home/QuoteStrip'
import TwoColShowroom from '@/components/home/TwoColShowroom'
import FeaturedMaterial from '@/components/home/FeaturedMaterial'
import DualLandscape from '@/components/home/DualLandscape'
import CaracasZones from '@/components/home/CaracasZones'
import Proceso from '@/components/Proceso'
import CTAFinal from '@/components/CTAFinal'
import PageFaq from '@/components/PageFaq'
import SetVenezuelaMarket from '@/components/SetVenezuelaMarket'
import { getPageFaqsFromTranslations } from '@/lib/pageFaqs'

const ve = markets.venezuela

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.caracas' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/reformas-caracas`,
      images: [{ url: images.markets.caracas }],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/reformas-caracas`,
      languages: {
        es: `${baseUrl}/es/reformas-caracas`,
        en: `${baseUrl}/en/reformas-caracas`,
      },
    },
  }
}

export default async function ReformasCaracasPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.caracas' })

  const localBusinessJsonLd = buildLocalBusinessJsonLd(ve, {
    description:
      locale === 'es'
        ? 'Reformas integrales, cocinas y baños a medida en Caracas. Más de 20 años en el mercado venezolano.'
        : 'Full renovations, custom kitchens and bathrooms in Caracas. Over 15 years in the Venezuelan market.',
  })

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: locale === 'es' ? 'Reformas Integrales' : 'Full Renovations',
    provider: {
      '@type': 'LocalBusiness',
      name: ve.name,
      '@id': ve.businessId,
    },
    areaServed: {
      '@type': 'City',
      name: 'Caracas',
      '@id': 'https://www.wikidata.org/wiki/Q1533',
      containedInPlace: {
        '@type': 'Country',
        name: 'Venezuela',
        addressCountry: 'VE',
      },
    },
    image: `${baseUrl}${images.markets.caracas}`,
  }

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  return (
    <>
      <SetVenezuelaMarket />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <Hero variant="caracas" />
        <FeaturedSpaces />
        <QuoteStrip variant="caracas" />
        <TwoColShowroom variant="caracas" />
        <FeaturedMaterial />
        <DualLandscape variant="caracas" />
        <CaracasZones />
        <Proceso />
        <PageFaq title={t('faq.title')} faqs={faqs} />
        <CTAFinal marketId="venezuela" />
      </div>
    </>
  )
}
