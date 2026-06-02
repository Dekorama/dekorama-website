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
  const t = await getTranslations({ locale, namespace: 'ciudades.estepona' })
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/reformas-estepona`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/reformas-estepona`,
      languages: {
        'es': `${baseUrl}/es/reformas-estepona`,
        'en': `${baseUrl}/en/reformas-estepona`,
      }
    },
  }
}

export default async function ReformasEsteponaPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.estepona' })
  const tCommon = await getTranslations({ locale, namespace: 'ciudades' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Reformas Integrales',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Estepona',
      '@id': 'https://www.wikidata.org/wiki/Q15088',
    },
  }

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  const caracteristicas = [
    {
      title: tCommon('commonServices.service1'),
      description: '',
    },
    {
      title: tCommon('commonServices.service2'),
      description: '',
    },
    {
      title: tCommon('commonServices.service3'),
      description: '',
    },
    {
      title: tCommon('commonServices.service4'),
      description: '',
    },
  ]

  const relatedServices = [
    {
      title: locale === 'es' ? 'Reformas Integrales' : 'Full Renovations',
      description: locale === 'es' ? 'Reforma completa de tu hogar' : 'Complete renovation of your home',
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
      title: locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms',
      description: locale === 'es' ? 'Reforma integral de tu baño con acabados premium' : 'Complete bathroom renovation with premium finishes',
      href: `/${locale}/banos-completos`,
      image: images.services.banos,
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
          { label: locale === 'es' ? 'Inicio' : 'Home', href: `/${locale}` },
          { label: locale === 'es' ? 'Reformas Estepona' : 'Renovations Estepona', href: null }
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

      {/* ── SERVICIOS ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 md:mb-16">
            {t('servicesTitle')}
          </h2>
          <ServiceGrid items={caracteristicas} columns={4} />
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            {t('whyUs')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('whyUsDesc')}
          </p>
        </div>
      </section>

      {/* ── ZONAS ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6 text-center">
            {t('zonesTitle')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            {t('zonesDesc')}
          </p>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
