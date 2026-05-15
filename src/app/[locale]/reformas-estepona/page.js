import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import CTAFinal from '@/components/CTAFinal'

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
  
  const serviciosJsonLd = {
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
        name: locale === 'es' ? 'Reformas Estepona' : 'Renovations Estepona',
        item: `${baseUrl}/${locale}/reformas-estepona`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviciosJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      <div className="min-h-screen bg-white pt-20">
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-black transition-colors">
                {locale === 'es' ? 'Inicio' : 'Home'}
              </Link>
              {' / '}
              <span className="text-black font-medium">
                {locale === 'es' ? 'Reformas Estepona' : 'Renovations Estepona'}
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
                  src={images.services.banos}
                  alt="Reformas integrales Estepona - Dekorama"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">
              {t('whyUs')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('whyUsDesc')}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-12">
              {t('servicesTitle')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="bg-white p-8 rounded-lg">
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {tCommon(`commonServices.service${num}`)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6 text-center">
              {t('zonesTitle')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              {t('zonesDesc')}
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8 text-center">
              {locale === 'es' ? 'Servicios relacionados' : 'Related services'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/reformas-integrales" className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {locale === 'es' ? 'Reformas Integrales' : 'Full Renovations'}
                </h3>
              </Link>
              <Link href="/cocinas-a-medida" className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {locale === 'es' ? 'Cocinas a Medida' : 'Custom Kitchens'}
                </h3>
              </Link>
              <Link href="/banos-completos" className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-black mb-2">
                  {locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms'}
                </h3>
              </Link>
            </div>
          </div>
        </section>

        <CTAFinal />
      </div>
    </>
  )
}
