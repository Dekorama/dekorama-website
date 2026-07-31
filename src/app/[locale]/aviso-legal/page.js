import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import Breadcrumb, { generateBreadcrumbSchema } from '@/components/Breadcrumb'

const AVISO_SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal.aviso')
  const canonical = locale === 'en' ? `${baseUrl}/en/aviso-legal` : `${baseUrl}/es/aviso-legal`
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: { es: `${baseUrl}/es/aviso-legal`, en: `${baseUrl}/en/aviso-legal` },
    },
  }
}

export default async function AvisoLegalPage({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal')
  const ta = await getTranslations('legal.aviso')
  const tCommon = await getTranslations('breadcrumb')
  const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const breadcrumbItems = [
    { label: tCommon('home'), href: `/${locale}` },
    { label: ta('title'), href: null }
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems, baseUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-white pb-20">
        <section className="section-header">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 tracking-tight">{ta('title')}</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('lastUpdated')}: {dateStr}
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            {AVISO_SECTIONS.map((n) => (
              <section key={n}>
                <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta(`s${n}Title`)}</h2>
                <p>{ta(`s${n}Body`)}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </>
  )
}
