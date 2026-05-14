const CATALOG_LINK = 'https://docsend.com/view/vbk8cc9avqdkmjnw'
import { baseUrl } from '@/lib/site'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

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
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a35c4ce74?w=600&q=80',
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
  
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-black pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block mb-6 px-4 py-1 border border-[#c9a96e]/60 text-[#c9a96e] text-xs font-semibold tracking-[0.2em] uppercase">
            {t('eyebrow')}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {t('h1')}
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            {t('heroSubtitle')}
          </p>
          <a
            href={CATALOG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-gray-100 transition-colors duration-300"
          >
            {t('cta')}
          </a>
        </div>
      </section>

      {/* ── MATERIALS GRID ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              {t('materialsTitle')}
            </h2>
            <p className="text-gray-500 leading-relaxed">
              {t('materialsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-100">
            {MATERIAL_CATEGORIES.map(({ key, image }) => (
              <div key={key} className="relative group overflow-hidden aspect-square bg-gray-50">
                <Image
                  src={image}
                  alt={t(`categories.${key}`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-end p-5">
                  <span className="text-white font-bold text-lg leading-tight">
                    {t(`categories.${key}`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: t('stats.refs'), label: t('stats.refsLabel') },
            { value: t('stats.years'), label: t('stats.yearsLabel') },
            { value: t('stats.brands'), label: t('stats.brandsLabel') },
            { value: t('stats.advice'), label: t('stats.adviceLabel') },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-4xl md:text-5xl font-bold text-white">{value}</span>
              <span className="text-xs text-white/50 tracking-wide uppercase">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#f7f5f2]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-400 tracking-widest uppercase mb-4">{t('eyebrow')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {t('cta')}
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            {t('ctaSubtitle')}
          </p>
          <a
            href={CATALOG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-black text-white text-sm font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-300 mb-8"
          >
            {t('cta')}
          </a>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t('visitShowroom')}
          </p>
        </div>
      </section>

    </div>
  )
}
