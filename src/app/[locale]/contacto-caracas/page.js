import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import CTAFinal from '@/components/CTAFinal'
import PageHeader from '@/components/PageHeader'
import SetVenezuelaMarket from '@/components/SetVenezuelaMarket'
import ContactChannels from '@/components/ContactChannels'

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('contactPageVe')
  const canonical = `${baseUrl}/${locale}/contacto-caracas`
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        es: `${baseUrl}/es/contacto-caracas`,
        en: `${baseUrl}/en/contacto-caracas`,
      },
    },
  }
}

export default async function ContactoCaracasPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPageVe' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })

  const breadcrumbItems = [
    { label: tCommon('home'), href: `/${locale}` },
    { label: t('title'), href: null },
  ]

  return (
    <div className="min-h-screen bg-white">
      <SetVenezuelaMarket />
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={t('title')}
        subtitle={t('subtitle')}
        centered
        baseUrl={baseUrl}
      />

      <section className="border-b border-gray-100 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-8 text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
            {t('channelsTitle')}
          </p>
          <ContactChannels marketId="venezuela" showWhatsApp={false} />
          <p className="mt-6 text-sm text-gray-500">{t('noLocation')}</p>
        </div>
      </section>

      <CTAFinal marketId="venezuela" />
    </div>
  )
}
