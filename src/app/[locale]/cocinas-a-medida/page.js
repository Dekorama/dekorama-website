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
  const t = await getTranslations({ locale, namespace: 'pages.cocinas' })
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/cocinas-a-medida`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/cocinas-a-medida`,
      languages: {
        'es': `${baseUrl}/es/cocinas-a-medida`,
        'en': `${baseUrl}/en/cocinas-a-medida`,
      }
    },
  }
}

export default async function CocinasMedidaPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.cocinas' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'es' ? 'Cocinas a Medida' : 'Custom Kitchens',
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
    image: images.services.cocinas,
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

  const proceso = [
    t('proceso.paso1'),
    t('proceso.paso2'),
    t('proceso.paso3'),
    t('proceso.paso4'),
    t('proceso.paso5'),
    t('proceso.paso6'),
  ]

  const relatedServices = [
    {
      title: locale === 'es' ? 'Reformas Integrales' : 'Full Renovations',
      description: locale === 'es' ? 'Reforma completa de tu vivienda o local' : 'Complete renovation of your home or premises',
      href: `/${locale}/reformas-integrales`,
      image: images.services.reformas,
    },
    {
      title: locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms',
      description: locale === 'es' ? 'Reforma integral de tu baño con acabados premium' : 'Complete bathroom renovation with premium finishes',
      href: `/${locale}/banos-completos`,
      image: images.services.banos,
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
          { label: locale === 'es' ? 'Cocinas a Medida' : 'Custom Kitchens', href: null }
        ]}
        title={t('h1')}
        subtitle={t('intro')}
        heroImage={images.services.cocinas}
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

      {/* ── PROCESO ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 md:mb-16">
            {t('proceso.title')}
          </h2>
          <div className="space-y-6">
            {proceso.map((paso, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-600 leading-relaxed pt-1">{paso}</p>
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
