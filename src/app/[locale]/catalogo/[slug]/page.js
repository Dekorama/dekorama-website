import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import CatalogPdfViewer from '@/components/catalog/CatalogPdfViewer'
import { getCatalogBySlug } from '@/data/catalogs'

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
  const description = t('viewer.metaDescription', {
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
    alternates: {
      canonical: `${baseUrl}/${locale}/catalogo/${catalog.slug}`,
      languages: {
        es: `${baseUrl}/es/catalogo/${catalog.slug}`,
        en: `${baseUrl}/en/catalogo/${catalog.slug}`,
      },
    },
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

  return (
    <CatalogPdfViewer
      catalog={catalog}
      backLabel={t('viewer.back')}
      downloadLabel={t('actions.download')}
      openLabel={t('actions.open')}
      fallbackLabel={t('viewer.fallback')}
      countryLabel={countryLabel}
    />
  )
}

export function generateStaticParams() {
  const locales = ['es', 'en']
  const slugs = [
    'harmony',
    'museum',
    'nadis',
    'neve',
    'porcelanite-dos',
    'europa-griferias-1',
    'europa-griferias-2',
    'kubo',
  ]

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}
