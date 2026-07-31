import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import { Link } from '@/i18n/navigation'

const HERO = '/images/porcelanicos/materiales.png'

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
      images: [{ url: HERO }],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/materiales-premium`,
      languages: {
        es: `${baseUrl}/es/materiales-premium`,
        en: `${baseUrl}/en/materiales-premium`,
      },
    },
  }
}

export default async function MaterialesPremiumPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.materiales' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const isEs = locale === 'es'

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEs ? 'Materiales Premium' : 'Premium Materials',
    description: t('description'),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    areaServed: { '@type': 'Place', name: 'Costa del Sol' },
    image: `${baseUrl}${HERO}`,
  }

  const categorias = [
    {
      title: t('categorias.porcelanicos'),
      description: t('categorias.porcelanicosDesc'),
      href: '/porcelanicos-malaga',
    },
    {
      title: t('categorias.griferia'),
      description: t('categorias.griferiaDesc'),
      href: '/venta-grifos-benalmadena',
    },
    {
      title: t('categorias.ducha'),
      description: t('categorias.duchaDesc'),
      href: '/baneras-platos-ducha-benalmadena',
    },
    {
      title: t('categorias.iluminacion'),
      description: t('categorias.iluminacionDesc'),
      href: '/materiales',
    },
    {
      title: t('categorias.mamparas'),
      description: t('categorias.mamparasDesc'),
      href: '/mamparas-ducha-benalmadena',
    },
    {
      title: t('categorias.exterior'),
      description: t('categorias.exteriorDesc'),
      href: '/materiales',
    },
  ]

  const relatedServices = [
    {
      title: isEs ? 'Cocinas a Medida' : 'Custom Kitchens',
      description: isEs
        ? 'Diseños exclusivos con materiales de calidad'
        : 'Exclusive designs with quality materials',
      href: '/cocinas-a-medida',
      image: '/images/porcelanicos/cocinas.png',
      imageAlt: isEs ? 'Cocina a medida' : 'Custom kitchen',
    },
    {
      title: isEs ? 'Baños Completos' : 'Complete Bathrooms',
      description: isEs
        ? 'Reforma integral de tu baño con acabados premium'
        : 'Complete bathroom renovation with premium finishes',
      href: '/banos-completos',
      image: '/images/porcelanicos/banos.png',
      imageAlt: isEs ? 'Baño completo' : 'Complete bathroom',
    },
    {
      title: isEs ? 'Porcelánicos' : 'Porcelain tiles',
      description: isEs
        ? 'Explora nuestra selección de porcelánicos'
        : 'Explore our porcelain tile selection',
      href: '/porcelanicos-malaga',
      image: '/images/porcelanicos/hero.png',
      imageAlt: isEs ? 'Porcelánicos' : 'Porcelain tiles',
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
            { label: tCommon('home'), href: `/${locale}` },
            { label: isEs ? 'Materiales Premium' : 'Premium Materials', href: null },
          ]}
          title={t('h1')}
          subtitle={t('intro')}
          heroImage={HERO}
          heroImageAlt={t('h1')}
          ctaPrimary={{ text: tCta('requestQuote'), href: `/${locale}/contacto` }}
          ctaSecondary={{ text: isEs ? 'Ver catálogo' : 'View catalogue', href: '/catalogo' }}
          baseUrl={baseUrl}
        />

        <section className="section-editorial">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {t('categorias.title')}
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {categorias.map((cat) => (
                <Link key={cat.href + cat.title} href={cat.href} className="group block border-t border-gray-200 pt-8">
                  <h3 className="mb-3 text-lg font-semibold tracking-tight text-black transition-opacity group-hover:opacity-70">
                    {cat.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">{cat.description}</p>
                  <span className="btn-discover text-[10px]">{isEs ? 'Ver más' : 'Learn more'}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-editorial border-y border-gray-200 bg-gray-bg">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {t('visita')}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">{t('visitaDesc')}</p>
            <Link href={`/${locale}/contacto`} className="btn-primary">
              {tCta('requestFreeVisit')}
            </Link>
          </div>
        </section>

        <RelatedLinks
          title={isEs ? 'Servicios relacionados' : 'Related services'}
          links={relatedServices}
        />

        <CTASection
          title={tCta('projectInMind')}
          description={tCta('requestVisitNoCommitment')}
          buttons={[
            {
              text: tCta('requestFreeVisit'),
              href: `/${locale}/contacto`,
              variant: 'primary',
            },
          ]}
        />
      </div>
    </>
  )
}
