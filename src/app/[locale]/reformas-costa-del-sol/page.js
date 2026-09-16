import { Link } from '@/i18n/navigation'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import ServiceGrid from '@/components/ServiceGrid'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import PageFaq from '@/components/PageFaq'
import { getPageFaqsFromTranslations } from '@/lib/pageFaqs'
import { COSTA_DEL_SOL_PLACE, COSTA_DEL_SOL_TOWNS } from '@/lib/costaDelSol'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.costaDelSol' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/reformas-costa-del-sol`,
      images: [{ url: images.services.reformas }],
    },
    alternates: pageAlternates(locale, '/reformas-costa-del-sol'),
  }
}

export default async function ReformasCostaDelSolPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.costaDelSol' })
  const tCommon = await getTranslations({ locale, namespace: 'ciudades' })
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const isEs = locale === 'es'

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: isEs
      ? 'Reformas integrales y venta de materiales de reforma'
      : 'Full renovations and renovation materials supply',
    name: t('h1'),
    description: t('description'),
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    areaServed: [
      COSTA_DEL_SOL_PLACE,
      ...COSTA_DEL_SOL_TOWNS.map((town) => ({
        '@type': 'City',
        name: town.name,
        sameAs: town.wikidata,
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Costa del Sol' },
      })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEs
        ? 'Servicios y materiales en la Costa del Sol'
        : 'Services and materials on the Costa del Sol',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Reformas integrales' : 'Full renovations',
            description: t('whyUsDesc'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs
              ? 'Venta de materiales de reforma en showroom'
              : 'Renovation materials sold at the showroom',
            description: t('materialsDesc'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Cocinas a medida' : 'Custom kitchens',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs ? 'Baños completos' : 'Complete bathrooms',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isEs
              ? 'Programa de partners y apoyo en materiales para profesionales'
              : 'Partner programme and material support for professionals',
            url: `${baseUrl}/${locale}/partners`,
          },
        },
      ],
    },
  }

  const townsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('citiesTitle'),
    itemListElement: COSTA_DEL_SOL_TOWNS.filter((town) => town.href).map((town, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: town.name,
      url: `${baseUrl}/${locale}${town.href}`,
    })),
  }

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  const servicios = [
    { title: tCommon('commonServices.service1'), description: '' },
    { title: tCommon('commonServices.service2'), description: '' },
    { title: tCommon('commonServices.service3'), description: '' },
    { title: tCommon('commonServices.service4'), description: '' },
  ]

  const townLinks = COSTA_DEL_SOL_TOWNS.filter((town) => town.href)

  const materialLinks = [
    {
      title: isEs ? 'Materiales de reforma' : 'Renovation materials',
      description: isEs
        ? 'Porcelánicos, grifería, sanitarios, mamparas y platos de ducha en showroom'
        : 'Porcelain tiles, taps, sanitaryware, screens and shower trays in the showroom',
      href: '/materiales',
      image: images.showroom,
    },
    {
      title: isEs ? 'Porcelánicos' : 'Porcelain tiles',
      description: isEs
        ? 'Gran formato, imitación madera y mármol de marcas europeas'
        : 'Large format, wood and marble effect from European brands',
      href: '/porcelanicos',
      image: images.services.materiales,
    },
    {
      title: isEs ? 'Materiales premium' : 'Premium materials',
      description: isEs
        ? 'Selección de acabados de alta gama para villas y proyectos de diseño'
        : 'High-end finishes for villas and design projects',
      href: '/materiales-premium',
      image: images.dual.materials,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(townsJsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <PageHeader
          breadcrumbItems={[
            { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
            {
              label: isEs ? 'Reformas Costa del Sol' : 'Renovations Costa del Sol',
              href: null,
            },
          ]}
          title={t('h1')}
          subtitle={t('intro')}
          heroImage={images.services.reformas}
          heroImageAlt={t('h1')}
          size="tall"
          ctaPrimary={{
            text: tCta('requestQuote'),
            href: '/contacto',
          }}
          ctaSecondary={{
            text: tCta('viewProjects'),
            href: '/proyectos',
          }}
          baseUrl={baseUrl}
        />

        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-black md:mb-16 md:text-4xl">
              {t('servicesTitle')}
            </h2>
            <ServiceGrid items={servicios} columns={4} />
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">{t('whyUs')}</h2>
            <p className="text-lg leading-relaxed text-gray-600">{t('whyUsDesc')}</p>
          </div>
        </section>

        <section id="materiales" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-semibold text-black md:text-3xl">
              {t('materialsTitle')}
            </h2>
            <p className="text-center text-lg leading-relaxed text-gray-600">
              {t('materialsDesc')}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-7xl">
            <RelatedLinks links={materialLinks} className="py-0" />
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-semibold text-black md:text-3xl">
              {t('showroomTitle')}
            </h2>
            <p className="mb-4 text-center text-lg leading-relaxed text-gray-600">
              {t('showroomDesc')}
            </p>
            <p className="text-center text-base leading-relaxed text-gray-600">{t('priceGuide')}</p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-2xl font-semibold text-black md:text-3xl">
              {t('citiesTitle')}
            </h2>
            <p className="mb-10 text-center text-lg leading-relaxed text-gray-600">
              {t('citiesDesc')}
            </p>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {townLinks.map((town) => (
                <li key={town.href}>
                  <Link
                    href={town.href}
                    className="flex min-h-[64px] items-center justify-between border border-gray-300 px-5 py-4 text-sm font-semibold tracking-tight text-black transition-colors hover:border-black hover:bg-gray-50"
                  >
                    <span>
                      {isEs ? 'Reformas en ' : 'Renovations in '}
                      {town.name}
                    </span>
                    <span aria-hidden className="text-gray-400">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-semibold text-black md:text-3xl">
              {t('projectsTitle')}
            </h2>
            <p className="text-center text-lg leading-relaxed text-gray-600">{t('projectsDesc')}</p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-semibold text-black md:text-3xl">
              {t('zonesTitle')}
            </h2>
            <p className="text-center text-lg leading-relaxed text-gray-600">{t('zonesDesc')}</p>
          </div>
        </section>

        <section className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-2xl font-semibold text-black md:text-3xl">
              {t('professionalsTitle')}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">{t('professionalsDesc')}</p>
            <Link
              href="/partners"
              className="inline-flex min-h-[48px] items-center justify-center border border-black bg-black px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
            >
              {t('professionalsCta')}
            </Link>
          </div>
        </section>

        <PageFaq title={t('faq.title')} faqs={faqs} />

        <CTASection
          title={tCta('readyToTransform')}
          description={tCta('freeVisitAndQuote')}
          buttons={[
            {
              text: tCta('requestFreeVisit'),
              href: '/contacto',
              variant: 'primary',
            },
          ]}
        />
      </div>
    </>
  )
}
