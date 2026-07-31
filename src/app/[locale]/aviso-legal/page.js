import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import PageHeader from '@/components/PageHeader'

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

  return (
    <div className="min-h-screen bg-white pb-20">
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: ta('title'), href: null },
        ]}
        title={ta('title')}
        subtitle={`${t('lastUpdated')}: ${dateStr}`}
        baseUrl={baseUrl}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {AVISO_SECTIONS.map((n) => (
            <section key={n}>
              <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
                {ta(`s${n}Title`)}
              </h2>
              <p>{ta(`s${n}Body`)}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}
