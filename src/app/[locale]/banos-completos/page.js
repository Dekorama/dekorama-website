import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.banos' })
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/banos-completos`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/banos-completos`,
      languages: {
        'es': `${baseUrl}/es/banos-completos`,
        'en': `${baseUrl}/en/banos-completos`,
      }
    },
  }
}

export default function BanosCompletosPage() {
  const t = useTranslations('pages.banos')
  const tCta = useTranslations('cta')
  
  const porque = [
    {
      title: t('porque.item1Title'),
      description: t('porque.item1Desc'),
    },
    {
      title: t('porque.item2Title'),
      description: t('porque.item2Desc'),
    },
    {
      title: t('porque.item3Title'),
      description: t('porque.item3Desc'),
    },
    {
      title: t('porque.item4Title'),
      description: t('porque.item4Desc'),
    },
  ]

  const incluye = [
    t('incluye.item1'),
    t('incluye.item2'),
    t('incluye.item3'),
    t('incluye.item4'),
    t('incluye.item5'),
    t('incluye.item6'),
    t('incluye.item7'),
    t('incluye.item8'),
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                {t('h1')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('intro')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/#contacto" className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 text-center">
                  {tCta('requestQuote')}
                </Link>
                <Link href="/proyectos" className="px-8 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 text-center">
                  {tCta('viewProjects')}
                </Link>
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
              <Image src={images.services.banos} alt={t('h1')} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
            {t('porque.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {porque.map((item, index) => (
              <div key={index} className="text-center space-y-4 p-6 hover:bg-gray-bg transition-all duration-300 rounded-lg">
                <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
            {t('incluye.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {incluye.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold">{tCta('readyToTransform')}</h2>
          <p className="text-xl text-gray-300">{tCta('freeVisitAndQuote')}</p>
          <Link href="/#contacto" className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            {tCta('requestFreeVisit')}
          </Link>
        </div>
      </section>
    </div>
  )
}
