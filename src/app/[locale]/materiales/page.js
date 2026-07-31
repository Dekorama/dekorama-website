import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import CTAFinal from '@/components/CTAFinal'
import PageHeader from '@/components/PageHeader'
import { images } from '@/data/images'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.materialesHub' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/materiales`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/materiales`,
      languages: {
        es: `${baseUrl}/es/materiales`,
        en: `${baseUrl}/en/materiales`,
      },
    },
  }
}

export default async function MaterialesPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.materialesHub' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })

  const collections = [
    {
      title: t('grifos.title'),
      description: t('grifos.description'),
      href: '/venta-grifos-benalmadena',
      image: images.services.banos,
    },
    {
      title: t('mamparas.title'),
      description: t('mamparas.description'),
      href: '/mamparas-ducha-benalmadena',
      image: images.services.banos,
    },
    {
      title: t('sanitarios.title'),
      description: t('sanitarios.description'),
      href: '/inodoros-suspendidos-benalmadena',
      image: images.featured.swatches[0].src,
    },
    {
      title: t('baneras.title'),
      description: t('baneras.description'),
      href: '/baneras-platos-ducha-benalmadena',
      image: images.featured.swatches[3].src,
    },
    {
      title: t('porcelanicos.title'),
      description: t('porcelanicos.description'),
      href: '/porcelanicos-malaga',
      image: images.services.reformas,
    },
  ]

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('h1'),
    description: t('description'),
    url: `${baseUrl}/${locale}/materiales`,
    hasPart: collections.map((item, index) => ({
      '@type': 'WebPage',
      position: index + 1,
      name: item.title,
      url: `${baseUrl}/${locale}${item.href}`,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'es' ? 'Inicio' : 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'es' ? 'Materiales' : 'Materials',
        item: `${baseUrl}/${locale}/materiales`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-white">
        <PageHeader
          breadcrumbItems={[
            { label: tCommon('home'), href: `/${locale}` },
            { label: locale === 'es' ? 'Materiales' : 'Materials', href: null },
          ]}
          title={t('h1')}
          subtitle={t('intro')}
          heroImage={images.showroom}
          heroImageAlt={t('heroAlt')}
          ctaPrimary={{ text: t('primaryCta'), href: '/materiales-premium' }}
          ctaSecondary={{ text: t('secondaryCta'), href: '/#contacto' }}
          baseUrl={baseUrl}
        />

        <section className="section-editorial">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
                  {t('gridTitle')}
                </h2>
                <p className="mt-3 max-w-2xl text-gray-600">{t('gridIntro')}</p>
              </div>
              <Link href="/catalogo" className="btn-discover">
                {t('catalogCta')}
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {collections.map((item) => (
                <Link key={item.href} href={item.href} className="group block">
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="mb-2 font-heading text-2xl font-normal tracking-tight text-black">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">{item.description}</p>
                  <span className="btn-discover text-[10px]">{t('viewCategory')}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-charcoal px-4 py-16 text-white sm:px-6 lg:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-heading text-3xl font-normal md:text-4xl">{t('supportTitle')}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">{t('supportDescription')}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-white/15 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {t('supportCard1Label')}
                </p>
                <p className="mt-3 text-lg font-medium">{t('supportCard1Text')}</p>
              </div>
              <div className="border border-white/15 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {t('supportCard2Label')}
                </p>
                <p className="mt-3 text-lg font-medium">{t('supportCard2Text')}</p>
              </div>
            </div>
          </div>
        </section>

        <CTAFinal />
      </div>
    </>
  )
}
