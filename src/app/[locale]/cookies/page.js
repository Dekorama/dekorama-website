import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal.cookies')
  const canonical = locale === 'en' ? `${baseUrl}/en/cookies` : `${baseUrl}/es/cookies`
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: { es: `${baseUrl}/es/cookies`, en: `${baseUrl}/en/cookies` },
    },
  }
}

export default async function CookiesPage({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal')
  const tc = await getTranslations('legal.cookies')
  const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">{tc('title')}</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {t('lastUpdated')}: {dateStr}
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tc('s1Title')}</h2>
            <p>{tc('s1Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tc('s2Title')}</h2>
            <p>{tc('s2Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tc('s3Title')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{tc('s3Item1')}</li>
              <li>{tc('s3Item2')}</li>
              <li>{tc('s3Item3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tc('s4Title')}</h2>
            <p>{tc('s4Body')}</p>
            <p className="mt-4">{tc('s4Body2')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tc('s5Title')}</h2>
            <p>{tc('s5Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tc('s6Title')}</h2>
            <p>{tc('s6Body')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">{tc('s7Title')}</h2>
            <p>{tc('s7Body')}</p>
          </section>
        </div>
      </article>
    </div>
  )
}
