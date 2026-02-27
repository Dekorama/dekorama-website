import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'

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
  const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">{ta('title')}</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {t('lastUpdated')}: {dateStr}
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta('s1Title')}</h2>
            <p>{ta('s1Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta('s2Title')}</h2>
            <p>{ta('s2Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta('s3Title')}</h2>
            <p>{ta('s3Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta('s4Title')}</h2>
            <p>{ta('s4Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta('s5Title')}</h2>
            <p>{ta('s5Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta('s6Title')}</h2>
            <p>{ta('s6Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta('s7Title')}</h2>
            <p>{ta('s7Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{ta('s8Title')}</h2>
            <p>{ta('s8Body')}</p>
          </section>
        </div>
      </article>
    </div>
  )
}
