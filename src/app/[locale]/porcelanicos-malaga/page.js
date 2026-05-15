import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import CTAFinal from '@/components/CTAFinal'

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
  const tCommon = await getTranslations({ locale, namespace: 'ciudades' })
  
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
        name: locale === 'es' ? 'Porcelánicos Málaga' : 'Porcelain Tiles Málaga',
        item: `${baseUrl}/${locale}/porcelanicos-malaga`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-black transition-colors">
                {locale === 'es' ? 'Inicio' : 'Home'}
              </Link>
              {' / '}
              <span className="text-black font-medium">
                {locale === 'es' ? 'Porcelánicos Málaga' : 'Porcelain Tiles Málaga'}
              </span>
            </nav>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                  {t('h1')}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t('intro')}
                </p>
                <Link
                  href="/#contacto"
                  className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300"
                >
                  {tCommon('commonCTA')}
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={images.materials.porcelanicos}
                  alt="Porcelánicos Málaga - Dekorama"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

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

        {/* Categories Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-12">
              {t('categoriasTitle')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="bg-white p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {t(`cat${num}`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`cat${num}Desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-12">
              {t('ventajasTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="text-center">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {t(`ventaja${num}`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`ventaja${num}Desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* Related Services */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8 text-center">
              {locale === 'es' ? 'Servicios relacionados' : 'Related services'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/materiales-premium" className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {locale === 'es' ? 'Materiales Premium' : 'Premium Materials'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'es' 
                    ? 'Grifería, sanitarios, iluminación y más'
                    : 'Taps, sanitaryware, lighting and more'
                  }
                </p>
              </Link>
              <Link href="/banos-completos" className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {locale === 'es' 
                    ? 'Reformas completas con porcelánicos premium'
                    : 'Complete renovations with premium tiles'
                  }
                </p>
              </Link>
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
            </div>
          </div>
        </section>

        <CTAFinal />
      </div>
    </>
  )
}
