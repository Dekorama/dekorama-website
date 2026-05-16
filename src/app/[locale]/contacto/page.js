import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import CTAFinal from '@/components/CTAFinal'
import PageHeader from '@/components/PageHeader'

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('contactPage')
  const canonical =
    locale === 'en'
      ? `${baseUrl}/en/contacto`
      : `${baseUrl}/es/contacto`
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        es: `${baseUrl}/es/contacto`,
        en: `${baseUrl}/en/contacto`,
      },
    },
  }
}

export default async function ContactoPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const tFooter = await getTranslations({ locale, namespace: 'footer' })

  const breadcrumbItems = [
    { label: tCommon('home'), href: `/${locale}` },
    { label: t('title'), href: null }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Page header with showroom image */}
      <PageHeader 
        breadcrumbItems={breadcrumbItems}
        title={t('title')}
        subtitle={t('subtitle')}
        heroImage="/dekorama-showroom.jpeg"
        heroImageAlt={locale === 'es' ? 'Showroom Dekorama en Benalmádena' : 'Dekorama Showroom in Benalmádena'}
        baseUrl={baseUrl}
      />

      {/* Contact form (reuses existing CTAFinal component) */}
      <CTAFinal />
    </div>
  )
}
