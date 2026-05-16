import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { getPosts } from '@/lib/blog'
import { baseUrl } from '@/lib/site'
import Breadcrumb, { generateBreadcrumbSchema } from '@/components/Breadcrumb'
import CTASection from '@/components/CTASection'

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
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  }

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
          <div className="grid gap-10 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                locale={locale}
                className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <time
                    dateTime={post.date}
                    className="text-sm text-gray-500 font-medium"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-2 text-xl md:text-2xl font-semibold text-black group-hover:text-gray-700 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-black group-hover:underline">
                    {t('readMore')}
                    <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
