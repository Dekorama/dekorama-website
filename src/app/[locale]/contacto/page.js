import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { markets } from '@/lib/markets'
import CTAFinal from '@/components/CTAFinal'
import PageHeader from '@/components/PageHeader'

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('contactPage')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: true, follow: true },
    alternates: pageAlternates(locale, '/contacto'),
  }
}

export default async function ContactoPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const tFooter = await getTranslations({ locale, namespace: 'footer' })
  const es = markets.spain

  const breadcrumbItems = [
    { label: tCommon('home'), href: `/${locale}` },
    { label: t('title'), href: null },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={t('title')}
        subtitle={t('subtitle')}
        heroImage="/dekorama-showroom.jpeg"
        heroImageAlt={
          locale === 'es'
            ? 'Showroom Dekorama en Benalmádena'
            : 'Dekorama Showroom in Benalmádena'
        }
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
              {t('infoAddress')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {tFooter('address').split('\n').map((line) => (
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
              href={`tel:${es.telephone}`}
              className="mt-3 block text-sm font-medium text-black hover:underline"
            >
              {es.phoneDisplay}
            </a>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              {t('infoEmail')}
            </h2>
            <a
              href={`mailto:${es.email}`}
              className="mt-3 block text-sm font-medium text-black hover:underline"
            >
              {es.email}
            </a>
          </div>
        </div>
      </section>

      <CTAFinal marketId="spain" />
    </div>
  )
}
