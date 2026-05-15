import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'

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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'es' ? 'Inicio' : 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'es' ? 'Materiales Premium' : 'Premium Materials',
        item: `${baseUrl}/${locale}/materiales-premium`,
      },
    ],
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-white pt-20">
      <section className="pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">
              {locale === 'es' ? 'Inicio' : 'Home'}
            </Link>
            {' / '}
            <span className="text-black font-medium">
              {locale === 'es' ? 'Materiales Premium' : 'Premium Materials'}
            </span>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                {t('h1')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('intro')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/#contacto" className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 text-center">
                  {tCta('requestQuote')}
                </Link>
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
              <Image src={images.services.materiales} alt={t('h1')} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
            {t('categorias.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((item, index) => (
              <div key={index} className="space-y-4 p-6 hover:bg-gray-bg transition-all duration-300 rounded-lg">
                <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-4xl mx-auto text-center space-y-6">
      {/* Related Services */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8 text-center">
            {locale === 'es' ? 'Servicios relacionados' : 'Related services'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/cocinas-a-medida" className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-black mb-2">
                {locale === 'es' ? 'Cocinas a Medida' : 'Custom Kitchens'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'es' 
                  ? 'Diseños exclusivos con materiales de calidad'
                  : 'Exclusive designs with quality materials'
                }
              </p>
            </Link>
            <Link href="/banos-completos" className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-black mb-2">
                {locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'es' 
                  ? 'Reforma integral de tu baño con acabados premium'
                  : 'Complete bathroom renovation with premium finishes'
                }
              </p>
            </Link>
            <Link href="/reformas-integrales" className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-black mb-2">
                {locale === 'es' ? 'Reformas Integrales' : 'Full Renovations'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'es' 
                  ? 'Reforma completa de tu vivienda o local'
                  : 'Complete renovation of your home or premises'
                }
              </p>
            </Link>
          </div>
        </div>
      </section>

          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            {t('visita')}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('visitaDesc')}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold">{tCta('projectInMind')}</h2>
          <p className="text-xl text-gray-300">{tCta('requestVisitNoCommitment')}</p>
          <Link href="/#contacto" className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            {tCta('requestFreeVisit')}
          </Link>
        </div>
      </section>
    </div>
    </>
  )
}
