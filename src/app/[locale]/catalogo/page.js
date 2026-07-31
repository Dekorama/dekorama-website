const CATALOG_LINK = 'https://docsend.com/view/vbk8cc9avqdkmjnw'
import { baseUrl } from '@/lib/site'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import { images } from '@/data/images'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.catalogo' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/catalogo`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/catalogo`,
      languages: {
        es: `${baseUrl}/es/catalogo`,
        en: `${baseUrl}/en/catalogo`,
      },
    },
  }
}

const MATERIAL_CATEGORIES = [
  { key: 'tiles', image: images.services.reformas, href: '/porcelanicos-malaga' },
  { key: 'taps', image: images.featured.swatches[1].src, href: '/venta-grifos-benalmadena' },
  { key: 'sanitaryware', image: images.featured.swatches[0].src, href: '/inodoros-suspendidos-benalmadena' },
  { key: 'lighting', image: images.services.cocinas, href: '/materiales' },
  { key: 'bathroom', image: images.services.banos, href: '/banos-completos' },
  { key: 'exterior', image: images.dual.projects, href: '/materiales-premium' },
]

export default async function CatalogoPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.catalogo' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: t('eyebrow'), href: null },
        ]}
        title={t('h1')}
        subtitle={t('heroSubtitle')}
        heroImage={images.showroom}
        heroImageAlt={t('categories.tiles')}
        ctaPrimary={{
          text: t('cta'),
          href: CATALOG_LINK,
        }}
        baseUrl={baseUrl}
      />

      <section className="section-editorial bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-xl">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {t('materialsTitle')}
            </h2>
            <p className="leading-relaxed text-gray-600">{t('materialsSubtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {MATERIAL_CATEGORIES.map(({ key, image, href }) => (
              <Link
                key={key}
                href={href}
                className="group relative aspect-square overflow-hidden bg-gray-100"
              >
                <Image
                  src={image}
                  alt={t(`categories.${key}`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
                <div className="absolute inset-0 flex items-end p-5 md:p-6">
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white md:text-base">
                    {t(`categories.${key}`)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
          {[
            { value: t('stats.refs'), label: t('stats.refsLabel') },
            { value: t('stats.years'), label: t('stats.yearsLabel') },
            { value: t('stats.brands'), label: t('stats.brandsLabel') },
            { value: t('stats.advice'), label: t('stats.adviceLabel') },
          ].map(({ value, label }) => (
            <div key={label} className="border border-white/15 p-10 text-center md:p-12">
              <span className="font-heading text-3xl text-white md:text-4xl lg:text-5xl">{value}</span>
              <span className="mt-4 block text-sm leading-relaxed text-white/80 md:text-base">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title={t('cta')}
        description={t('ctaSubtitle')}
        buttons={[
          {
            text: t('cta'),
            href: CATALOG_LINK,
            variant: 'primary',
          },
        ]}
      />
    </div>
  )
}
