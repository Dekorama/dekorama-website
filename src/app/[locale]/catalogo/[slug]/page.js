import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { pageAlternates } from '@/lib/seo'
import CatalogPdfViewer from '@/components/catalog/CatalogPdfViewer'
import { CATALOGS, getCatalogBySlug } from '@/data/catalogs'

/**
 * @param {{ params: Promise<{ locale: string, slug: string }> }} props
 */
export async function generateMetadata({ params }) {
  const { locale, slug } = await params
  const catalog = getCatalogBySlug(slug)
  if (!catalog) return {}

  const t = await getTranslations({ locale, namespace: 'pages.catalogo' })
  const countryLabel =
    catalog.country === 'spain' ? t('countries.spain') : t('countries.venezuela')
  const title = `${catalog.title} — ${t('viewer.metaTitle')}`
  const description =
    catalog.country === 'venezuela'
      ? t('viewer.metaDescriptionVe', {
          brand: catalog.brand,
          title: catalog.title,
        })
      : t('viewer.metaDescription', {
          brand: catalog.brand,
          country: countryLabel,
        })

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/catalogo/${catalog.slug}`,
    },
    alternates: pageAlternates(locale, `/catalogo/${catalog.slug}`),
  }
}

/**
 * @param {{ params: Promise<{ locale: string, slug: string }> }} props
 */
export default async function CatalogoViewerPage({ params }) {
  const { locale, slug } = await params
  const catalog = getCatalogBySlug(slug)
  if (!catalog) notFound()

  const t = await getTranslations({ locale, namespace: 'pages.catalogo' })
  const countryLabel =
    catalog.country === 'spain' ? t('countries.spain') : t('countries.venezuela')
  const intro =
    catalog.country === 'venezuela'
      ? t('viewer.introVe', { brand: catalog.brand })
      : t('viewer.introEs', { brand: catalog.brand, country: countryLabel })

  return (
    <CatalogPdfViewer
      catalog={catalog}
      backLabel={t('viewer.back')}
      downloadLabel={t('actions.download')}
      openLabel={t('actions.open')}
      fallbackLabel={t('viewer.fallback')}
      countryLabel={countryLabel}
      intro={intro}
    />
  )
}

export function generateStaticParams() {
  const locales = ['es', 'en']
  return locales.flatMap((locale) =>
    CATALOGS.map((catalog) => ({ locale, slug: catalog.slug })),
  )
}
