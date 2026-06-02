import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { getPostBySlug, getPostSlugs } from '@/lib/blog'
import { getSlugForLocale } from '@/lib/blogSlugMap'
import { baseUrl } from '@/lib/site'
import { buildFaqPageJsonLd } from '@/lib/faqSchema'
import BlogAnswerBox from '@/components/BlogAnswerBox'
import BlogFaqSection from '@/components/BlogFaqSection'

export async function generateStaticParams() {
  const locales = ['es', 'en']
  const params = []

  for (const locale of locales) {
    const slugs = getPostSlugs(locale)
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await Promise.resolve(params)
  const post = await getPostBySlug(slug, locale)
  const t = await getTranslations('blog')
  if (!post) return { title: t('postNotFound') }

  const esSlug = getSlugForLocale(slug, 'es', locale)
  const enSlug = getSlugForLocale(slug, 'en', locale)

  const canonicalUrl = locale === 'en' ? `${baseUrl}/en/blog/${slug}` : `${baseUrl}/es/blog/${slug}`

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Blog Dekorama`,
      description: post.excerpt,
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${baseUrl}/es/blog/${esSlug}`,
        en: `${baseUrl}/en/blog/${enSlug}`,
      },
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await Promise.resolve(params)
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    const correctSlug = getSlugForLocale(slug, locale, locale === 'es' ? 'en' : 'es')
    if (correctSlug && correctSlug !== slug) {
      redirect(`/${locale}/blog/${correctSlug}`)
    }
    notFound()
  }

  const t = await getTranslations('blog')
  const tCta = await getTranslations('cta')
  const tBreadcrumb = await getTranslations('breadcrumb')
  const postUrl = locale === 'en' ? `${baseUrl}/en/blog/${post.slug}` : `${baseUrl}/es/blog/${post.slug}`

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const speakableParts = [post.keyAnswer, post.faqs[0]?.answer].filter(Boolean)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.lastReviewed || post.date,
    inLanguage: locale === 'en' ? 'en-GB' : 'es-ES',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    author: { '@type': 'Organization', '@id': `${baseUrl}/#organization`, name: 'Dekorama' },
    publisher: { '@type': 'Organization', '@id': `${baseUrl}/#organization`, name: 'Dekorama' },
    url: postUrl,
    ...(post.coverImage && { image: `${baseUrl}${post.coverImage}` }),
    ...(speakableParts.length > 0 && {
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.blog-key-answer', '.blog-faq-answer'],
      },
    }),
  }

  const faqJsonLd = buildFaqPageJsonLd(post.faqs)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: tBreadcrumb('home'),
        item: locale === 'en' ? `${baseUrl}/en` : `${baseUrl}/es`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tBreadcrumb('blog'),
        item: locale === 'en' ? `${baseUrl}/en/blog` : `${baseUrl}/es/blog`,
      },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article>
        <header className="relative bg-gray-bg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-16 md:pb-12">
            <Link
              href="/blog"
              locale={locale}
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors mb-8"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('backToBlog')}
            </Link>
            <time
              dateTime={post.date}
              className="block text-sm text-gray-500 font-medium mb-2"
            >
              {formatDate(post.date)}
            </time>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl">{post.excerpt}</p>
          </div>
        </header>

        {post.coverImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 md:-mt-6">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-sm">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {post.keyAnswer && (
            <div className="blog-key-answer">
              <BlogAnswerBox label={t('quickAnswer')} answer={post.keyAnswer} />
            </div>
          )}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
          {post.faqs.length > 0 && (
            <div className="blog-faq-answer">
              <BlogFaqSection
                title={locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
                faqs={post.faqs}
              />
            </div>
          )}
        </div>
      </article>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">{tCta('wouldYouLikeAdvice')}</h2>
          <p className="text-gray-300">{tCta('freeVisitAndQuote')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contacto" locale={locale} className="btn-primary inline-block">
              {tCta('requestFreeVisit')}
            </Link>
            <Link
              href="/blog"
              locale={locale}
              className="inline-block px-8 py-4 border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
            >
              {tCta('viewMoreArticles')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
