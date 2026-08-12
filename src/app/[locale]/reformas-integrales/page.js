import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import RelatedLinks from '@/components/RelatedLinks'
import CTAFinal from '@/components/CTAFinal'
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
      images: [{ url: images.services.reformas }],
    },
    alternates: pageAlternates(locale, '/reformas-integrales'),
  }
}

export default async function ReformasIntegralesPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.reformas' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const isEs = locale === 'es'

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEs ? 'Reformas Integrales' : 'Full Renovations',
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

  const dual = [
    {
      image: images.services.cocinas,
      title: isEs ? 'Cocinas a medida' : 'Custom kitchens',
      sub: isEs ? 'Diseño y fabricación' : 'Design and build',
      href: '/cocinas-a-medida',
    },
    {
      image: images.services.banos,
      title: isEs ? 'Baños completos' : 'Complete bathrooms',
      sub: isEs ? 'Acabados premium' : 'Premium finishes',
      href: '/banos-completos',
    },
  ]

  const relatedServices = [
    {
      title: isEs ? 'Reformas Benalmádena' : 'Renovations Benalmádena',
      description: isEs ? 'Showroom y sede en Benalmádena' : 'Showroom and HQ in Benalmádena',
      href: '/reformas-benalmadena',
      image: images.services.reformas,
    },
    {
      title: isEs ? 'Reformas Marbella' : 'Renovations Marbella',
      description: isEs ? 'Villas y apartamentos en Marbella' : 'Villas and apartments in Marbella',
      href: '/reformas-marbella',
      image: images.dual.projects,
    },
    {
      title: isEs ? 'Materiales' : 'Materials',
      description: isEs ? 'Primeras marcas en showroom' : 'Top brands in our showroom',
      href: '/materiales',
      image: images.showroom,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <PageHeader
          breadcrumbItems={[
            { label: tCommon('home'), href: `/${locale}` },
            { label: isEs ? 'Reformas' : 'Renovations', href: null },
          ]}
          title={t('h1')}
          subtitle={t('intro')}
          heroImage={images.services.reformas}
          heroImageAlt={t('h1')}
          size="tall"
          ctaPrimary={{
            text: tCta('requestQuote'),
            href: '#contacto',
          }}
          ctaSecondary={{
            text: tCta('viewProjects'),
            href: '/proyectos',
          }}
          baseUrl={baseUrl}
        />

        <section className="section-editorial border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center md:mb-14">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                {isEs ? 'Servicio' : 'Service'}
              </p>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl md:text-4xl">
                {t('caracteristicas.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {caracteristicas.map((item) => (
                <div key={item.title} className="border-t border-gray-300 pt-8">
                  <h3 className="mb-3 text-lg font-semibold tracking-tight text-black">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2">
          {dual.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative block aspect-[16/10] overflow-hidden md:aspect-[3/2]"
            >
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 92vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white sm:px-6">
                <h2 className="font-heading text-2xl tracking-tight sm:text-3xl md:text-4xl">{item.title}</h2>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/85 sm:text-xs">{item.sub}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="section-editorial border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center md:mb-14">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                {isEs ? 'Proceso' : 'Process'}
              </p>
              <h2 className="font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl md:text-4xl">
                {t('fases.title')}
              </h2>
            </div>
            <div className="relative">
              <div
                className="absolute bottom-0 left-6 top-0 hidden w-px bg-gray-200 md:left-8 md:block"
                aria-hidden
              />
              <div className="space-y-10 md:space-y-14">
                {fases.map((fase) => (
                  <div key={fase.numero} className="relative flex items-start gap-4 sm:gap-6 md:gap-10">
                    <div className="z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center border border-black bg-white text-[11px] font-semibold tracking-[0.1em] text-black sm:h-12 sm:w-12 sm:text-xs md:h-16 md:w-16 md:text-sm">
                      {fase.numero}
                    </div>
                    <div className="min-w-0 flex-1 pt-1 md:pt-3">
                      <h3 className="mb-2 text-base font-semibold tracking-tight text-black sm:text-lg md:text-xl">
                        {fase.titulo.replace(/^\d+\.\s*/, '')}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600 md:text-base">{fase.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <RelatedLinks
          title={isEs ? 'Servicios relacionados' : 'Related services'}
          links={relatedServices}
        />

        <PageFaq title={t('faq.title')} faqs={faqs} />

        <CTAFinal />
      </div>
    </>
  )
}
