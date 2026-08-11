import { getTranslations } from 'next-intl/server'
import { getPosts } from '@/lib/blog'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { images } from '@/data/images'
import PageHeader from '@/components/PageHeader'
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
      title: 'Blog | Dekorama',
      description: isEn ? 'Trends in porcelain, wood-look tile and renovations.' : 'Tendencias en porcelánico, tarima y reformas. Consejos de nuestros expertos.',
      url: `${baseUrl}/${locale}/blog`,
    },
    alternates: pageAlternates(locale, '/blog'),
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
    { label: tCommon('blog'), href: null },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={t('title')}
        subtitle={t('subtitle')}
        heroImage={images.hero}
        heroImageAlt={t('heroAlt')}
        ctaPrimary={{ text: t('primaryCta'), href: '/#contacto' }}
        ctaSecondary={{ text: t('secondaryCta'), href: '/proyectos' }}
        baseUrl={baseUrl}
      />

      <section className="section-editorial">
        <div className="mx-auto max-w-7xl">
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
            variant: 'primary',
          },
        ]}
      />
    </div>
  )
}
