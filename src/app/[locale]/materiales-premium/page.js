import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import ServiceGrid from '@/components/ServiceGrid'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.materiales' })
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/materiales-premium`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/materiales-premium`,
      languages: {
        'es': `${baseUrl}/es/materiales-premium`,
        'en': `${baseUrl}/en/materiales-premium`,
      }
    },
  }
}

export default async function MaterialesPremiumPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.materiales' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'es' ? 'Materiales Premium' : 'Premium Materials',
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
    image: images.services.materiales,
  }
  
  const categorias = [
    {
      title: t('categorias.porcelanicos'),
      description: t('categorias.porcelanicosDesc'),
    },
    {
      title: t('categorias.griferia'),
      description: t('categorias.griferiaDesc'),
    },
    {
      title: t('categorias.ducha'),
      description: t('categorias.duchaDesc'),
    },
    {
      title: t('categorias.iluminacion'),
      description: t('categorias.iluminacionDesc'),
    },
    {
      title: t('categorias.mamparas'),
      description: t('categorias.mamparasDesc'),
    },
    {
      title: t('categorias.exterior'),
      description: t('categorias.exteriorDesc'),
    },
  ]

  const relatedServices = [
    {
      title: locale === 'es' ? 'Cocinas a Medida' : 'Custom Kitchens',
      description: locale === 'es' ? 'Diseños exclusivos con materiales de calidad' : 'Exclusive designs with quality materials',
      href: '/cocinas-a-medida',
    },
    {
      title: locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms',
      description: locale === 'es' ? 'Reforma integral de tu baño con acabados premium' : 'Complete bathroom renovation with premium finishes',
      href: '/banos-completos',
    },
    {
      title: locale === 'es' ? 'Catálogo' : 'Catalogue',
      description: locale === 'es' ? 'Explora nuestra amplia gama de materiales' : 'Explore our wide range of materials',
      href: '/catalogo',
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
          breadcrumbs={[
            { label: tCommon('home'), href: '/' },
            { label: locale === 'es' ? 'Materiales Premium' : 'Premium Materials' },
          ]}
          title={t('h1')}
          subtitle={t('intro')}
          heroImage={images.services.materiales}
          cta={{
            primary: { text: tCta('requestQuote'), href: '/#contacto' },
          }}
        />

        <ServiceGrid
          title={t('categorias.title')}
          services={categorias}
        />

        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              {t('visita')}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('visitaDesc')}
            </p>
          </div>
        </section>

        <RelatedLinks
          title={locale === 'es' ? 'Servicios relacionados' : 'Related services'}
          links={relatedServices}
        />

        <CTASection
          title={tCta('projectInMind')}
          description={tCta('requestVisitNoCommitment')}
          primaryCTA={{ text: tCta('requestFreeVisit'), href: '/#contacto' }}
        />
      </div>
    </>
  )
}
