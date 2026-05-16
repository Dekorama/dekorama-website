import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import CTAFinal from '@/components/CTAFinal'
import Breadcrumb, { generateBreadcrumbSchema } from '@/components/Breadcrumb'

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

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems, baseUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="section-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-semibold text-black">{t('infoAddress')}</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              {tFooter('address').split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="font-semibold text-black">{t('infoPhone')}</p>
            <a href="tel:+34628571537" className="text-gray-500 text-sm hover:text-black transition-colors">
              +34 628 571 537
            </a>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-semibold text-black">{t('infoEmail')}</p>
            <a href="mailto:info@dekoramagroup.com" className="text-gray-500 text-sm hover:text-black transition-colors">
              info@dekoramagroup.com
            </a>
          </div>
        </div>
      </div>

      {/* Contact form (reuses existing CTAFinal component) */}
      <CTAFinal />
    </div>
    </>
  )
}
