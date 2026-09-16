import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { markets } from '@/lib/markets'
import CTAFinal from '@/components/CTAFinal'
import PageFaq from '@/components/PageFaq'
import PageHeader from '@/components/PageHeader'
import SetVenezuelaMarket from '@/components/SetVenezuelaMarket'
import TrackedOutboundLink from '@/components/TrackedOutboundLink'
import { getPageFaqsFromTranslations } from '@/lib/pageFaqs'

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('contactPageVe')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: true, follow: true },
    alternates: pageAlternates(locale, '/contacto-caracas'),
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

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  return (
    <div className="min-h-screen bg-white">
      <SetVenezuelaMarket />
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={t('title')}
        subtitle={t('subtitle')}
        heroImage="/images/hero/caracas-showroom.jpg"
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
              {t('infoWhatsApp')}
            </h2>
            {ve.whatsappUrl ? (
              <TrackedOutboundLink
                href={ve.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm font-medium text-black hover:underline"
                eventName="contact_whatsapp"
                eventParams={{ market: 'venezuela', method: 'whatsapp' }}
              >
                {ve.phoneDisplay}
              </TrackedOutboundLink>
            ) : null}
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              {t('infoEmail')}
            </h2>
            <TrackedOutboundLink
              href={`mailto:${ve.email}`}
              className="mt-3 block text-sm font-medium text-black hover:underline"
              eventName="contact_email"
              eventParams={{ market: 'venezuela', method: 'email' }}
            >
              {ve.email}
            </TrackedOutboundLink>
          </div>
        </div>
      </section>

      <PageFaq title={t('faq.title')} faqs={faqs} />

      <CTAFinal marketId="venezuela" />
    </div>
  )
}
