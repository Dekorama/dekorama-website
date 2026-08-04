import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { markets } from '@/lib/markets'
import CTAFinal from '@/components/CTAFinal'
import PageHeader from '@/components/PageHeader'
import SetVenezuelaMarket from '@/components/SetVenezuelaMarket'

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
  const ve = markets.venezuela

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
        heroImage="/images/hero/caracas-showroom.png"
        heroImageAlt={t('heroImageAlt')}
        ctaSecondary={{
          text: t('scrollToForm'),
          href: '#contacto',
        }}
        baseUrl={baseUrl}
      />

      <section className="border-b border-gray-100 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              {t('infoShowroom')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {t('infoShowroomBody')
                .split('\n')
                .map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              {t('infoPhone')}
            </h2>
            <a
              href={`tel:${ve.telephone}`}
              className="mt-3 block text-sm font-medium text-black hover:underline"
            >
              {ve.phoneDisplay}
            </a>
            {ve.whatsappUrl ? (
              <a
                href={ve.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm font-medium text-black hover:underline"
              >
                {t('infoWhatsApp')}
              </a>
            ) : null}
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              {t('infoEmail')}
            </h2>
            <a
              href={`mailto:${ve.email}`}
              className="mt-3 block text-sm font-medium text-black hover:underline"
            >
              {ve.email}
            </a>
          </div>
        </div>
      </section>

      <CTAFinal marketId="venezuela" />
    </div>
  )
}
