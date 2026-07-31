import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import PageHeader from '@/components/PageHeader'

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
          { label: tc('title'), href: null },
        ]}
        title={tc('title')}
        subtitle={`${t('lastUpdated')}: ${dateStr}`}
        baseUrl={baseUrl}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
              {tc('s1Title')}
            </h2>
            <p>{tc('s1Body')}</p>
          </section>

          <section>
            <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
              {tc('s2Title')}
            </h2>
            <p>{tc('s2Body')}</p>
          </section>

          <section>
            <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
              {tc('s3Title')}
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>{tc('s3Item1')}</li>
              <li>{tc('s3Item2')}</li>
              <li>{tc('s3Item3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
              {tc('s4Title')}
            </h2>
            <p>{tc('s4Body')}</p>
            <p className="mt-4">{tc('s4Body2')}</p>
          </section>

          <section>
            <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
              {tc('s5Title')}
            </h2>
            <p>{tc('s5Body')}</p>
          </section>

          <section>
            <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
              {tc('s6Title')}
            </h2>
            <p>{tc('s6Body')}</p>
          </section>

          <section>
            <h2 className="mt-10 mb-4 font-heading text-2xl font-normal tracking-tight text-black">
              {tc('s7Title')}
            </h2>
            <p>{tc('s7Body')}</p>
          </section>
        </div>
      </article>
    </div>
  )
}
