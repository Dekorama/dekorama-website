import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { getMarket } from '@/lib/markets'
import {
  getMaterialHubCategories,
  marketCatalogHref,
  marketContactHref,
  marketHomeHref,
  marketMaterialsHref,
  marketMaterialsPremiumHref,
} from '@/lib/materialRoutes'
import CTAFinal from '@/components/CTAFinal'
import PageHeader from '@/components/PageHeader'
import SetVenezuelaMarket from '@/components/SetVenezuelaMarket'
import { images } from '@/data/images'

/** @typedef {import('@/lib/marketPreference').MarketId} MarketId */

/**
 * @param {MarketId} marketId
 * @returns {string}
 */
function materialsPath(marketId) {
  return marketMaterialsHref(marketId)
}

/**
 * @param {{ locale: string, marketId: MarketId }} opts
 */
export async function generateMaterialesHubMetadata({ locale, marketId }) {
  const market = getMarket(marketId)
  const t = await getTranslations({ locale, namespace: 'pages.materialesHub' })
  const path = materialsPath(marketId)
  const vars = { locality: market.locality, region: market.region }

  return {
    title: t('title', vars),
    description: t('description', vars),
    openGraph: {
      title: t('title', vars),
      description: t('description', vars),
      url: `/${locale}${path}`,
    },
    alternates: pageAlternates(locale, path),
  }
}

/**
 * Shared materials hub — same page for both markets; locality via {locality}/{region}.
 * @param {{ locale: string, marketId: MarketId }} props
 */
export default async function MaterialesHubView({ locale, marketId }) {
  const market = getMarket(marketId)
  const vars = { locality: market.locality, region: market.region }
  const t = await getTranslations({ locale, namespace: 'pages.materialesHub' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const path = materialsPath(marketId)
  const premiumHref = marketMaterialsPremiumHref(marketId)
  const catalogHref = marketCatalogHref(marketId)
  const contactHref = marketContactHref(marketId)
  const homeHref = marketHomeHref(marketId)
  const categoryDefs = getMaterialHubCategories(marketId)

  const collections = categoryDefs.map((item) => ({
    title: t(`${item.key}.title`),
    description: t(`${item.key}.description`),
    href: item.href,
    image:
      item.key === 'porcelanicos'
        ? images.services.reformas
        : item.key === 'sanitarios'
          ? images.featured.swatches[0].src
          : item.key === 'baneras'
            ? images.featured.swatches[3].src
            : images.services.banos,
  }))

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('h1', vars),
    description: t('description', vars),
    url: `${baseUrl}/${locale}${path}`,
    hasPart: collections.map((item, index) => ({
      '@type': 'WebPage',
      position: index + 1,
      name: item.title,
      url: item.href.startsWith('http')
        ? item.href
        : `${baseUrl}/${locale}${item.href.split('?')[0]}`,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'es' ? 'Inicio' : 'Home',
        item: `${baseUrl}/${locale}${homeHref === '/' ? '' : homeHref}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('h1', vars),
        item: `${baseUrl}/${locale}${path}`,
      },
    ],
  }

  return (
    <>
      {marketId === 'venezuela' ? <SetVenezuelaMarket /> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-white">
        <PageHeader
          breadcrumbItems={[
            { label: tCommon('home'), href: homeHref },
            { label: t('h1', vars), href: null },
          ]}
          title={t('h1', vars)}
          subtitle={t('intro', vars)}
          heroImage={images.showroom}
          heroImageAlt={t('heroAlt', vars)}
          ctaPrimary={{ text: t('primaryCta'), href: premiumHref }}
          ctaSecondary={{ text: t('secondaryCta'), href: contactHref }}
          baseUrl={baseUrl}
        />

        <section className="section-editorial">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
                  {t('gridTitle')}
                </h2>
                <p className="mt-3 max-w-2xl text-gray-600">{t('gridIntro')}</p>
              </div>
              <Link href={catalogHref} className="btn-discover">
                {t('catalogCta')}
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {collections.map((item) => (
                <Link key={`${item.href}-${item.title}`} href={item.href} className="group block">
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="mb-2 font-heading text-2xl font-normal tracking-tight text-black">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  <span className="btn-discover text-[10px]">{t('viewCategory')}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-charcoal px-4 py-16 text-white sm:px-6 lg:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-heading text-3xl font-normal md:text-4xl">{t('supportTitle')}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
                {t('supportDescription', vars)}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-white/15 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {t('supportCard1Label')}
                </p>
                <p className="mt-3 text-lg font-medium">{t('supportCard1Text')}</p>
              </div>
              <div className="border border-white/15 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {t('supportCard2Label')}
                </p>
                <p className="mt-3 text-lg font-medium">{t('supportCard2Text')}</p>
              </div>
            </div>
          </div>
        </section>

        <CTAFinal marketId={marketId} />
      </div>
    </>
  )
}
