import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import PageHeader from '@/components/PageHeader'

const PRIVACY_SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal.privacy')
  const canonical = locale === 'en' ? `${baseUrl}/en/politica-privacidad` : `${baseUrl}/es/politica-privacidad`
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: { es: `${baseUrl}/es/politica-privacidad`, en: `${baseUrl}/en/politica-privacidad` },
    },
  }
}

export default async function PoliticaPrivacidadPage({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal')
  const tp = await getTranslations('legal.privacy')
  const tCommon = await getTranslations('breadcrumb')
  const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: tp('title'), href: null },
        ]}
        title={tp('title')}
        subtitle={`${t('lastUpdated')}: ${dateStr}`}
        baseUrl={baseUrl}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {PRIVACY_SECTIONS.map((n) => (
            <section key={n}>
              <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
                {tp(`s${n}Title`)}
              </h2>
              <p>{tp(`s${n}Body`)}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}
