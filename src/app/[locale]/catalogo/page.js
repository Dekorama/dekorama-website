const CATALOG_LINK = 'https://docsend.com/view/vbk8cc9avqdkmjnw'
import { baseUrl } from '@/lib/site'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'

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
        'es': `${baseUrl}/es/catalogo`,
        'en': `${baseUrl}/en/catalogo`,
      }
    },
  }
}

const MATERIAL_CATEGORIES = [
  {
    key: 'tiles',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80',
  },
  {
    key: 'taps',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80',
  },
  {
    key: 'sanitaryware',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
  },
  {
    key: 'lighting',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&q=80',
  },
  {
    key: 'bathroom',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
  },
  {
    key: 'exterior',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
]

export default async function CatalogoPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.catalogo' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  
  return (
    <div className="min-h-screen bg-white">

      {/* ── UNIFIED PAGE HEADER ── */}
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: t('eyebrow'), href: null }
        ]}
        title={t('h1')}
        subtitle={t('heroSubtitle')}
        heroImage="https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&q=80"
        heroImageAlt={t('categories.tiles')}
        ctaPrimary={{
          text: t('cta'),
          href: CATALOG_LINK
        }}
        baseUrl={baseUrl}
      />

      {/* ── MATERIALS GRID ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {t('materialsTitle')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('materialsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {MATERIAL_CATEGORIES.map(({ key, image }) => (
              <div 
                key={key} 
                className="relative group overflow-hidden aspect-square rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={image}
                  alt={t(`categories.${key}`)}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="text-white font-bold text-lg md:text-xl leading-tight">
                    {t(`categories.${key}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-black py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: t('stats.refs'), label: t('stats.refsLabel') },
            { value: t('stats.years'), label: t('stats.yearsLabel') },
            { value: t('stats.brands'), label: t('stats.brandsLabel') },
            { value: t('stats.advice'), label: t('stats.adviceLabel') },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="text-4xl md:text-5xl font-bold text-white">{value}</span>
              <span className="text-sm text-white/70 tracking-wide leading-relaxed">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <CTASection
        title={t('cta')}
        description={t('ctaSubtitle')}
        buttons={[
          {
            text: t('cta'),
            href: CATALOG_LINK,
            variant: 'primary'
          }
        ]}
      />

    </div>
  )
}
