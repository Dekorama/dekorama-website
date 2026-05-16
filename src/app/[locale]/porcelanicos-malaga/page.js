import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import FeatureList from '@/components/FeatureList'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.porcelanicos' })
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/porcelanicos-malaga`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/porcelanicos-malaga`,
      languages: {
        'es': `${baseUrl}/es/porcelanicos-malaga`,
        'en': `${baseUrl}/en/porcelanicos-malaga`,
      }
    },
  }
}

export default async function PorcelanicosMalagaPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.porcelanicos' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: locale === 'es' ? 'Porcelánicos Premium' : 'Premium Porcelain Tiles',
    description: t('intro'),
    brand: {
      '@type': 'Brand',
      name: 'Dekorama',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Dekorama',
        '@id': `${baseUrl}/#business`,
      },
    },
    image: images.materials.porcelanicos,
  }

  const categories = [
    { title: t('cat1'), description: t('cat1Desc') },
    { title: t('cat2'), description: t('cat2Desc') },
    { title: t('cat3'), description: t('cat3Desc') },
    { title: t('cat4'), description: t('cat4Desc') },
  ]

  const advantages = [
    { title: t('ventaja1'), description: t('ventaja1Desc') },
    { title: t('ventaja2'), description: t('ventaja2Desc') },
    { title: t('ventaja3'), description: t('ventaja3Desc') },
  ]

  const relatedServices = [
    {
      title: locale === 'es' ? 'Materiales Premium' : 'Premium Materials',
      description: locale === 'es' ? 'Grifería, sanitarios, iluminación y más' : 'Taps, sanitaryware, lighting and more',
      href: '/materiales-premium',
    },
    {
      title: locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms',
      description: locale === 'es' ? 'Reformas completas con porcelánicos premium' : 'Complete renovations with premium tiles',
      href: '/banos-completos',
    },
    {
      title: locale === 'es' ? 'Cocinas a Medida' : 'Custom Kitchens',
      description: locale === 'es' ? 'Diseños exclusivos con materiales de calidad' : 'Exclusive designs with quality materials',
      href: '/cocinas-a-medida',
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      
      <div className="min-h-screen bg-white">
        <PageHeader
          breadcrumbs={[
            { label: tCommon('home'), href: '/' },
            { label: locale === 'es' ? 'Porcelánicos Málaga' : 'Porcelain Tiles Málaga' },
          ]}
          title={t('h1')}
          subtitle={t('intro')}
          heroImage={images.materials.porcelanicos}
          cta={{
            primary: { text: locale === 'es' ? 'Solicitar presupuesto' : 'Request quote', href: '/#contacto' },
          }}
        />

        {/* Brands Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              {t('marcasTitle')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('marcasDesc')}
            </p>
          </div>
        </section>

        <FeatureList
          title={t('categoriasTitle')}
          features={categories}
          layout="grid"
          background="gray"
        />

        <FeatureList
          title={t('ventajasTitle')}
          features={advantages}
          columns={3}
        />

        {/* Showroom Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              {t('showroomTitle')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t('showroomDesc')}
            </p>
            <Link
              href="/catalogo"
              className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 mr-4"
            >
              {locale === 'es' ? 'Ver catálogo completo' : 'View full catalogue'}
            </Link>
            <Link
              href="/#contacto"
              className="inline-block px-8 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              {locale === 'es' ? 'Visitar showroom' : 'Visit showroom'}
            </Link>
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
