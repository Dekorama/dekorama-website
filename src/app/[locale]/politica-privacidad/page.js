import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'

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
  const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">{tp('title')}</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {t('lastUpdated')}: {dateStr}
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tp('s1Title')}</h2>
            <p>{tp('s1Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tp('s2Title')}</h2>
            <p>{tp('s2Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tp('s3Title')}</h2>
            <p>{tp('s3Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tp('s4Title')}</h2>
            <p>{tp('s4Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tp('s5Title')}</h2>
            <p>{tp('s5Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tp('s6Title')}</h2>
            <p>{tp('s6Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tp('s7Title')}</h2>
            <p>{tp('s7Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tp('s8Title')}</h2>
            <p>{tp('s8Body')}</p>
          </section>
        </div>
      </article>
    </div>
  )
}
