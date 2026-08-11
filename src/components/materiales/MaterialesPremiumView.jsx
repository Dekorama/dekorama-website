import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { getMarket } from '@/lib/markets'
import {
  getMaterialPremiumCategories,
  marketCatalogHref,
  marketContactHref,
  marketHomeHref,
  marketMaterialsHref,
  marketMaterialsPremiumHref,
} from '@/lib/materialRoutes'
import PageHeader from '@/components/PageHeader'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import SetVenezuelaMarket from '@/components/SetVenezuelaMarket'

const HERO = '/images/porcelanicos/materiales.png'

/** @typedef {import('@/lib/marketPreference').MarketId} MarketId */

/**
 * @param {{ locale: string, marketId: MarketId }} opts
 */
export async function generateMaterialesPremiumMetadata({ locale, marketId }) {
  const market = getMarket(marketId)
  const t = await getTranslations({ locale, namespace: 'pages.materiales' })
  const path = marketMaterialsPremiumHref(marketId)
  const vars = { locality: market.locality, region: market.region }

  return {
    title: t('title', vars),
    description: t('description', vars),
    openGraph: {
      title: t('title', vars),
      description: t('description', vars),
      url: `/${locale}${path}`,
      images: [{ url: HERO }],
    },
    alternates: pageAlternates(locale, path),
  }
}

/**
 * Shared premium materials page — locality via {locality}/{region}, no country name.
 * @param {{ locale: string, marketId: MarketId }} props
 */
export default async function MaterialesPremiumView({ locale, marketId }) {
  const market = getMarket(marketId)
  const vars = { locality: market.locality, region: market.region }
  const t = await getTranslations({ locale, namespace: 'pages.materiales' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const isEs = locale === 'es'
  const path = marketMaterialsPremiumHref(marketId)
  const hubHref = marketMaterialsHref(marketId)
  const catalogHref = marketCatalogHref(marketId)
  const contactHref = marketContactHref(marketId)
  const homeHref = marketHomeHref(marketId)
  const categoryDefs = getMaterialPremiumCategories(marketId)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEs ? 'Materiales Premium' : 'Premium Materials',
    description: t('description', vars),
    provider: {
      '@type': 'LocalBusiness',
      name: market.name,
      '@id': market.businessId,
    },
    areaServed: { '@type': 'Place', name: market.region },
    image: `${baseUrl}${HERO}`,
    url: `${baseUrl}/${locale}${path}`,
  }

  const categorias = categoryDefs.map((cat) => ({
    title: t(`categorias.${cat.key}`),
    description: t(`categorias.${cat.key}Desc`),
    href: cat.href,
  }))

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
      href:
        marketId === 'venezuela'
          ? catalogHref
          : '/porcelanicos',
      image: '/images/porcelanicos/hero.png',
      imageAlt: isEs ? 'Porcelánicos' : 'Porcelain tiles',
    },
  ]

  return (
    <>
      {marketId === 'venezuela' ? <SetVenezuelaMarket /> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <PageHeader
          breadcrumbItems={[
            { label: tCommon('home'), href: homeHref },
            { label: isEs ? 'Materiales Premium' : 'Premium Materials', href: null },
          ]}
          title={t('h1', vars)}
          subtitle={t('intro', vars)}
          heroImage={HERO}
          heroImageAlt={t('h1', vars)}
          ctaPrimary={{ text: tCta('requestQuote'), href: contactHref }}
          ctaSecondary={{ text: isEs ? 'Ver catálogo' : 'View catalogue', href: catalogHref }}
          baseUrl={baseUrl}
        />

        <section className="section-editorial">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {t('categorias.title')}
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {categorias.map((cat) => (
                <Link key={`${cat.href}-${cat.title}`} href={cat.href} className="group block border-t border-gray-200 pt-8">
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
            <p className="mb-8 text-lg leading-relaxed text-gray-600">{t('visitaDesc', vars)}</p>
            <Link href={contactHref} className="btn-primary">
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
              href: contactHref,
              variant: 'primary',
            },
          ]}
        />
      </div>
    </>
  )
}
