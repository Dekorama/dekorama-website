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
  const t = await getTranslations({ locale, namespace: 'ciudades.benalmadena' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/reformas-benalmadena`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/reformas-benalmadena`,
      languages: {
        es: `${baseUrl}/es/reformas-benalmadena`,
        en: `${baseUrl}/en/reformas-benalmadena`,
      },
    },
  }
}

export default async function ReformasBenalmadenaPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.benalmadena' })
  const tCommon = await getTranslations({ locale, namespace: 'ciudades' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const isEs = locale === 'es'

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
      name: 'Benalmádena',
      '@id': 'https://www.wikidata.org/wiki/Q492532',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEs
        ? 'Servicios de Reforma en Benalmádena'
        : 'Renovation services in Benalmádena',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Reformas integrales completas' : 'Complete full renovations',
            description: isEs
              ? 'Reforma completa de viviendas y locales en Benalmádena con showroom local'
              : 'Complete renovation of homes and premises in Benalmádena with a local showroom',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Cocinas a medida de diseño' : 'Custom design kitchens',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs
              ? 'Baños completos con porcelánicos premium'
              : 'Complete bathrooms with premium tiles',
          },
        },
      ],
    },
  }

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  const caracteristicas = [
    { title: tCommon('commonServices.service1'), description: '' },
    { title: tCommon('commonServices.service2'), description: '' },
    { title: tCommon('commonServices.service3'), description: '' },
    { title: tCommon('commonServices.service4'), description: '' },
  ]

  const relatedServices = [
    {
      title: isEs ? 'Reformas Integrales' : 'Full Renovations',
      description: isEs ? 'Reforma completa de tu hogar' : 'Complete renovation of your home',
      href: `/${locale}/reformas-integrales`,
      image: images.services.reformas,
    },
    {
      title: isEs ? 'Porcelánicos Málaga' : 'Porcelain Tiles Málaga',
      description: isEs
        ? 'Primera marcas en nuestro showroom'
        : 'Top brands in our showroom',
      href: `/${locale}/porcelanicos-malaga`,
      image: images.services.materiales,
    },
    {
      title: isEs ? 'Reformas Marbella' : 'Renovations Marbella',
      description: isEs
        ? 'Proyectos en Marbella y Puerto Banús'
        : 'Projects in Marbella and Puerto Banús',
      href: `/${locale}/reformas-marbella`,
      image: images.services.banos,
    },
    {
      title: isEs ? 'Baños Completos' : 'Complete Bathrooms',
      description: isEs
        ? 'Reforma integral de baño con acabados premium'
        : 'Complete bathroom renovation with premium finishes',
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
        <PageHeader
          breadcrumbItems={[
            { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
            {
              label: isEs ? 'Reformas Benalmádena' : 'Renovations Benalmádena',
              href: null,
            },
          ]}
          title={t('h1')}
          subtitle={t('intro')}
          heroImage={images.hero}
          heroImageAlt={t('h1')}
          ctaPrimary={{
            text: tCta('requestQuote'),
            href: `/${locale}#contacto`,
          }}
          ctaSecondary={{
            text: tCta('viewProjects'),
            href: `/${locale}/proyectos`,
          }}
          baseUrl={baseUrl}
        />

        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-black md:mb-16 md:text-4xl">
              {t('servicesTitle')}
            </h2>
            <ServiceGrid items={caracteristicas} columns={4} />
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">{t('whyUs')}</h2>
            <p className="text-lg leading-relaxed text-gray-600">{t('whyUsDesc')}</p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-semibold text-black md:text-3xl">
              {t('showroomTitle')}
            </h2>
            <p className="mb-4 text-center text-lg leading-relaxed text-gray-600">
              {t('showroomDesc')}
            </p>
            <p className="text-center text-base leading-relaxed text-gray-600">{t('priceGuide')}</p>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-semibold text-black md:text-3xl">
              {t('projectsTitle')}
            </h2>
            <p className="text-center text-lg leading-relaxed text-gray-600">{t('projectsDesc')}</p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-semibold text-black md:text-3xl">
              {t('zonesTitle')}
            </h2>
            <p className="text-center text-lg leading-relaxed text-gray-600">{t('zonesDesc')}</p>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-black md:mb-12 md:text-3xl">
              {isEs ? 'Servicios y zonas relacionadas' : 'Related services and areas'}
            </h2>
            <RelatedLinks links={relatedServices} />
          </div>
        </section>

        <PageFaq title={t('faq.title')} faqs={faqs} />

        <CTASection
          title={tCta('readyToTransform')}
          description={tCta('freeVisitAndQuote')}
          buttons={[
            {
              text: tCta('requestFreeVisit'),
              href: `/${locale}#contacto`,
              variant: 'primary',
            },
          ]}
        />
      </div>
    </>
  )
}
