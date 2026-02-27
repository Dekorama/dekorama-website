const CATALOG_LINK = 'https://tr.ee/19OHI9P1VN'
import { baseUrl } from '@/lib/site'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
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

export default function CatalogoPage() {
  const t = useTranslations('pages.catalogo')
  
  return (
    <div className="min-h-screen bg-gray-bg pt-20">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
            {t('h1')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            {t('intro')}
          </p>
          <a
            href={CATALOG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            {t('cta')}
          </a>
          <p className="text-gray-600 mt-8">
            {t('visitShowroom')}
          </p>
        </div>
      </section>
    </div>
  )
}
