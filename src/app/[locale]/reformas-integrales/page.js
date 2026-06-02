import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import ServiceGrid from '@/components/ServiceGrid'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import PageFaq from '@/components/PageFaq'
import { getPageFaqsFromTranslations } from '@/lib/pageFaqs'

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

export default async function ReformasIntegralesPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.reformas' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'es' ? 'Reformas Integrales' : 'Full Renovations',
    description: t('description'),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Costa del Sol',
    },
    image: images.services.reformas,
  }

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

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  const relatedServices = [
    {
      title: locale === 'es' ? 'Cocinas a Medida' : 'Custom Kitchens',
      description: locale === 'es' ? 'Diseños exclusivos con materiales de calidad' : 'Exclusive designs with quality materials',
      href: `/${locale}/cocinas-a-medida`,
      image: images.services.cocinas,
    },
    {
      title: locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms',
      description: locale === 'es' ? 'Reforma integral de tu baño con acabados premium' : 'Complete bathroom renovation with premium finishes',
      href: `/${locale}/banos-completos`,
      image: images.services.banos,
    },
    {
      title: locale === 'es' ? 'Materiales Premium' : 'Premium Materials',
      description: locale === 'es' ? 'Grifería, sanitarios, iluminación y más' : 'Taps, sanitaryware, lighting and more',
      href: `/${locale}/materiales-premium`,
      image: images.services.materiales,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="min-h-screen bg-white">
      
      {/* ── PAGE HEADER ── */}
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: locale === 'es' ? 'Reformas Integrales' : 'Full Renovations', href: null }
        ]}
        title={t('h1')}
        subtitle={t('intro')}
        heroImage={images.services.reformas}
        heroImageAlt={t('h1')}
        ctaPrimary={{
          text: tCta('requestQuote'),
          href: `/${locale}#contacto`
        }}
        ctaSecondary={{
          text: tCta('viewProjects'),
          href: `/${locale}/proyectos`
        }}
        baseUrl={baseUrl}
      />

      {/* ── CARACTERÍSTICAS ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 md:mb-16">
            {t('caracteristicas.title')}
          </h2>
          <ServiceGrid items={caracteristicas} columns={4} />
        </div>
      </section>

      {/* ── FASES DEL PROCESO ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 md:mb-16">
            {t('fases.title')}
          </h2>
          <div className="space-y-12 md:space-y-16">
            {fases.map((fase, index) => (
              <div key={index} className="relative flex items-start gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 md:w-24 h-16 md:h-24 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold">
                  {fase.numero}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-semibold text-black mb-3">{fase.titulo}</h3>
                  <p className="text-gray-600 leading-relaxed">{fase.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 md:mb-12 text-center">
            {locale === 'es' ? 'Servicios relacionados' : 'Related services'}
          </h2>
          <RelatedLinks links={relatedServices} />
        </div>
      </section>

      <PageFaq title={t('faq.title')} faqs={faqs} />

      {/* ── CTA FINAL ── */}
      <CTASection
        title={tCta('readyToTransform')}
        description={tCta('freeVisitAndQuote')}
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
