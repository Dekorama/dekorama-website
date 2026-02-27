import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.reformas' })
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/reformas-integrales`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/reformas-integrales`,
      languages: {
        'es': `${baseUrl}/es/reformas-integrales`,
        'en': `${baseUrl}/en/reformas-integrales`,
      }
    },
  }
}

export default function ReformasIntegralesPage() {
  const t = useTranslations('pages.reformas')
  const tCta = useTranslations('cta')
  
  const caracteristicas = [
    {
      title: t('caracteristicas.item1Title'),
      description: t('caracteristicas.item1Desc'),
    },
    {
      title: t('caracteristicas.item2Title'),
      description: t('caracteristicas.item2Desc'),
    },
    {
      title: t('caracteristicas.item3Title'),
      description: t('caracteristicas.item3Desc'),
    },
    {
      title: t('caracteristicas.item4Title'),
      description: t('caracteristicas.item4Desc'),
    },
  ]

  const fases = [
    { numero: '01', titulo: t('fases.fase1Title'), descripcion: t('fases.fase1Desc') },
    { numero: '02', titulo: t('fases.fase2Title'), descripcion: t('fases.fase2Desc') },
    { numero: '03', titulo: t('fases.fase3Title'), descripcion: t('fases.fase3Desc') },
    { numero: '04', titulo: t('fases.fase4Title'), descripcion: t('fases.fase4Desc') },
    { numero: '05', titulo: t('fases.fase5Title'), descripcion: t('fases.fase5Desc') },
    { numero: '06', titulo: t('fases.fase6Title'), descripcion: t('fases.fase6Desc') },
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
              <Image src={images.services.reformas} alt={t('h1')} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
            {t('caracteristicas.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caracteristicas.map((item, index) => (
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
            {t('fases.title')}
          </h2>
          <div className="space-y-12 md:space-y-16">
            {fases.map((fase, index) => (
              <div key={index} className="relative flex items-start gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 md:w-24 h-16 md:h-24 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold">
                  {fase.numero}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">{fase.titulo}</h3>
                  <p className="text-gray-600 leading-relaxed">{fase.descripcion}</p>
                </div>
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
