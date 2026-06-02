import { getTranslations } from 'next-intl/server'
import { getPosts } from '@/lib/blog'
import { baseUrl } from '@/lib/site'
import Breadcrumb, { generateBreadcrumbSchema } from '@/components/Breadcrumb'
import CTASection from '@/components/CTASection'
import BlogListing from '@/components/blog/BlogListing'

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const isEn = locale === 'en'
  return {
    title: 'Blog',
    description: isEn
      ? 'Trends in porcelain tile, renovations and interior design. Tips and news from Dekorama on the Costa del Sol.'
      : 'Tendencias en porcelánico, reformas y diseño de interiores. Consejos y novedades de Dekorama en la Costa del Sol.',
    openGraph: {
      title: 'Blog | Dekorama Costa del Sol',
      description: isEn ? 'Trends in porcelain, wood-look tile and renovations.' : 'Tendencias en porcelánico, tarima y reformas. Consejos de nuestros expertos.',
      url: locale === 'en' ? `${baseUrl}/en/blog` : `${baseUrl}/blog`,
    },
    alternates: {
      canonical: locale === 'en' ? `${baseUrl}/en/blog` : `${baseUrl}/es/blog`,
      languages: { es: `${baseUrl}/es/blog`, en: `${baseUrl}/en/blog` },
    },
  }
}

export default async function BlogPage({ params }) {
  const { locale } = await params
  const posts = getPosts(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })

  const breadcrumbItems = [
    { label: tCommon('home'), href: `/${locale}` },
    { label: tCommon('blog'), href: null }
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems, baseUrl)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="min-h-screen bg-white">
      <section className="section-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BlogListing posts={posts} locale={locale} />
        </div>
      </section>

      <CTASection
        title={tCta('projectInMind')}
        description={tCta('requestVisitNoCommitment')}
        buttons={[
          {
            text: tCta('requestFreeVisit'),
            href: `/${locale}#contacto`,
            variant: 'primary'
          }
        ]}
      />
    </div>
    </>
  )
}
