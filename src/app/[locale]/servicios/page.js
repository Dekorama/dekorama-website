import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import PageHeader from '@/components/PageHeader'
import Servicios from '@/components/Servicios'
import CTASection from '@/components/CTASection'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'serviciosPage' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `/${locale}/servicios`,
    },
    alternates: pageAlternates(locale, '/servicios'),
  }
}

export default async function ServiciosPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'serviciosPage' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: t('title'), href: null },
        ]}
        title={t('title')}
        subtitle={t('subtitle')}
        heroImage="/projects/d186be42-96ed-478c-8d60-b47a9999e22c.JPG"
        heroImageAlt={t('title')}
        baseUrl={baseUrl}
      />

      <Servicios hideTitle />

      <CTASection
        title={tCta('readyToTransform')}
        description={tCta('freeVisitAndQuote')}
        buttons={[
          {
            text: tCta('requestFreeVisit'),
            href: `/${locale}/contacto`,
            variant: 'primary',
          },
        ]}
      />
    </div>
  )
}
