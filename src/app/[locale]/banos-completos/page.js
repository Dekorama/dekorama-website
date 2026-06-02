import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import ServiceGrid from '@/components/ServiceGrid'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import PageFaq from '@/components/PageFaq'
import { getPageFaqsFromTranslations } from '@/lib/pageFaqs'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.banos' })
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/banos-completos`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/banos-completos`,
      languages: {
        'es': `${baseUrl}/es/banos-completos`,
        'en': `${baseUrl}/en/banos-completos`,
      }
    },
  }
}

export default async function BanosCompletosPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.banos' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms',
    description: t('description'),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Costa del Sol',
    },
    image: images.services.banos,
  }

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  const porque = [
    {
      title: t('porque.item1Title'),
      description: t('porque.item1Desc'),
    },
    {
      title: t('porque.item2Title'),
      description: t('porque.item2Desc'),
    },
    {
      title: t('porque.item3Title'),
      description: t('porque.item3Desc'),
    },
    {
      title: t('porque.item4Title'),
      description: t('porque.item4Desc'),
    },
  ]

  const incluye = [
    t('incluye.item1'),
    t('incluye.item2'),
    t('incluye.item3'),
    t('incluye.item4'),
    t('incluye.item5'),
    t('incluye.item6'),
    t('incluye.item7'),
    t('incluye.item8'),
  ]

  const relatedServices = [
    {
      title: locale === 'es' ? 'Reformas Integrales' : 'Full Renovations',
      description: locale === 'es' ? 'Reforma completa de tu vivienda o local' : 'Complete renovation of your home or premises',
      href: `/${locale}/reformas-integrales`,
      image: images.services.reformas,
    },
    {
      title: locale === 'es' ? 'Cocinas a Medida' : 'Custom Kitchens',
      description: locale === 'es' ? 'Diseños exclusivos con materiales de calidad' : 'Exclusive designs with quality materials',
      href: `/${locale}/cocinas-a-medida`,
      image: images.services.cocinas,
    },
    {
      title: locale === 'es' ? 'Materiales Premium' : 'Premium Materials',
      description: locale === 'es' ? 'Grifería, sanitarios, iluminación y más' : 'Taps, sanitaryware, lighting and more',
      href: `/${locale}/materiales-premium`,
      image: images.services.materiales,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="min-h-screen bg-white">
      
      {/* ── PAGE HEADER ── */}
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms', href: null }
        ]}
        title={t('h1')}
        subtitle={t('intro')}
        heroImage={images.services.banos}
        heroImageAlt={t('h1')}
        ctaPrimary={{
          text: tCta('requestQuote'),
          href: `/${locale}#contacto`
        }}
        ctaSecondary={{
          text: tCta('viewProjects'),
          href: `/${locale}/proyectos`
        }}
        baseUrl={baseUrl}
      />

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 md:mb-16">
            {t('porque.title')}
          </h2>
          <ServiceGrid items={porque} columns={4} />
        </div>
      </section>

      {/* ── QUÉ INCLUYE ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 md:mb-16">
            {t('incluye.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {incluye.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 md:mb-12 text-center">
            {locale === 'es' ? 'Servicios relacionados' : 'Related services'}
          </h2>
          <RelatedLinks links={relatedServices} />
        </div>
      </section>

      <PageFaq title={t('faq.title')} faqs={faqs} />

      {/* ── CTA FINAL ── */}
      <CTASection
        title={tCta('readyToTransform')}
        description={tCta('freeVisitAndQuote')}
        buttons={[
          {
            text: tCta('requestFreeVisit'),
            href: `/${locale}#contacto`,
            variant: 'primary'
          }
        ]}
      />
    </div>
    </>
  )
}
