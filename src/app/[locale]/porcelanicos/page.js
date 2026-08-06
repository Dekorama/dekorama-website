import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { baseUrl } from '@/lib/site'
import { buildProductJsonLd } from '@/lib/productSchema'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import PageFaq from '@/components/PageFaq'
import { getPageFaqsFromTranslations } from '@/lib/pageFaqs'

const HERO = '/images/porcelanicos/hero.png'

const CATEGORIES = [
  { key: 'cat1', image: '/images/porcelanicos/wood.png' },
  { key: 'cat2', image: '/images/porcelanicos/marble.png' },
  { key: 'cat3', image: '/images/porcelanicos/large.png' },
  { key: 'cat4', image: '/images/porcelanicos/exterior.png' },
]

const BRANDS = [
  'NADIS',
  'MUSEUM',
  'TAU',
  'PORCELANITE DOS',
  'HARMONY',
  'APARICI',
  'ROCA',
  'VIVES',
]

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.porcelanicos' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/porcelanicos`,
      images: [{ url: HERO, width: 1920, height: 1080, alt: t('h1') }],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/porcelanicos`,
      languages: {
        es: `${baseUrl}/es/porcelanicos`,
        en: `${baseUrl}/en/porcelanicos`,
      },
    },
  }
}

export default async function PorcelanicosMalagaPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.porcelanicos' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const isEs = locale === 'es'

  const productJsonLd = buildProductJsonLd({
    type: 'Product',
    name: isEs ? 'Porcelánicos Premium' : 'Premium Porcelain Tiles',
    description: t('intro'),
    brand: { '@type': 'Brand', name: 'Dekorama' },
    imagePath: HERO,
    offerKey: 'porcelanicos',
  })

  const advantages = [
    { title: t('ventaja1'), description: t('ventaja1Desc') },
    { title: t('ventaja2'), description: t('ventaja2Desc') },
    { title: t('ventaja3'), description: t('ventaja3Desc') },
  ]

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  const relatedServices = [
    {
      title: isEs ? 'Reformas Integrales' : 'Full Renovations',
      description: isEs
        ? 'Empresa de reformas con showroom local'
        : 'Renovation company with local showroom',
      href: '/reformas-integrales',
      image: '/images/porcelanicos/materiales.png',
      imageAlt: isEs ? 'Reformas integrales' : 'Full renovations',
    },
    {
      title: isEs ? 'Baños Completos' : 'Complete Bathrooms',
      description: isEs
        ? 'Reformas completas con porcelánicos premium'
        : 'Complete renovations with premium tiles',
      href: '/banos-completos',
      image: '/images/porcelanicos/banos.png',
      imageAlt: isEs ? 'Baño con porcelánico' : 'Porcelain bathroom',
    },
    {
      title: isEs ? 'Cocinas a Medida' : 'Custom Kitchens',
      description: isEs
        ? 'Diseños exclusivos con materiales de calidad'
        : 'Exclusive designs with quality materials',
      href: '/cocinas-a-medida',
      image: '/images/porcelanicos/cocinas.png',
      imageAlt: isEs ? 'Cocina a medida' : 'Custom kitchen',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <PageHeader
          title={t('h1')}
          subtitle={t('intro')}
          heroImage={HERO}
          heroImageAlt={t('h1')}
          ctaPrimary={{
            text: tCta('requestFreeVisit'),
            href: `/${locale}/contacto`,
          }}
          ctaSecondary={{
            text: isEs ? 'Ver catálogo' : 'View catalogue',
            href: '/catalogo',
          }}
          baseUrl={baseUrl}
        />

        {/* Brands */}
        <section className="section-editorial border-b border-gray-200">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              {isEs ? 'Marcas' : 'Brands'}
            </p>
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {t('marcasTitle')}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-gray-600">{t('marcasDesc')}</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
              {BRANDS.map((brand) => (
                <li
                  key={brand}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-800"
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Categories grid */}
        <section className="section-editorial">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                {isEs ? 'Colecciones' : 'Collections'}
              </p>
              <h2 className="font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
                {t('categoriasTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {CATEGORIES.map(({ key, image }) => (
                <article key={key} className="group">
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={image}
                      alt={t(key)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-normal tracking-tight text-black md:text-2xl">
                    {t(key)}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {t(`${key}Desc`)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="section-editorial border-y border-gray-200 bg-gray-bg">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-heading text-3xl font-normal tracking-tight text-black md:mb-14 md:text-4xl">
              {t('ventajasTitle')}
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
              {advantages.map((item) => (
                <div key={item.title} className="border-t border-gray-300 pt-8">
                  <h3 className="mb-3 text-lg font-semibold tracking-tight text-black">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local SEO */}
        <section className="section-editorial">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {t('localTitle')}
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 md:text-base">{t('localDesc')}</p>
          </div>
        </section>

        {/* Showroom CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/dekorama-showroom.jpeg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/55" aria-hidden />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center text-white sm:px-6 md:py-32">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight md:text-4xl">
              {t('showroomTitle')}
            </h2>
            <p className="mb-10 text-sm leading-relaxed text-white/85 md:text-base">
              {t('showroomDesc')}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center border border-white bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white"
              >
                {isEs ? 'Ver catálogo completo' : 'View full catalogue'}
              </Link>
              <Link
                href={`/${locale}/contacto`}
                className="border-b border-white pb-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-70"
              >
                {isEs ? 'Visitar showroom' : 'Visit showroom'}
              </Link>
            </div>
          </div>
        </section>

        <RelatedLinks
          title={isEs ? 'Servicios relacionados' : 'Related services'}
          links={relatedServices}
        />

        <PageFaq title={t('faq.title')} faqs={faqs} />

        <CTASection
          title={tCta('projectInMind')}
          description={tCta('requestVisitNoCommitment')}
          buttons={[
            {
              text: tCta('requestFreeVisit'),
              href: `/${locale}/contacto`,
              variant: 'primary',
            },
          ]}
        />
      </div>
    </>
  )
}
