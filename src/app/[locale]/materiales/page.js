import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import CTAFinal from '@/components/CTAFinal'
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

  const collections = [
    {
      title: t('grifos.title'),
      description: t('grifos.description'),
      href: '/venta-grifos-benalmadena',
      image: images.materials.grifos,
    },
    {
      title: t('mamparas.title'),
      description: t('mamparas.description'),
      href: '/mamparas-ducha-benalmadena',
      image: images.materials.mamparas,
    },
    {
      title: t('sanitarios.title'),
      description: t('sanitarios.description'),
      href: '/inodoros-suspendidos-benalmadena',
      image: images.materials.sanitarios,
    },
    {
      title: t('baneras.title'),
      description: t('baneras.description'),
      href: '/baneras-platos-ducha-benalmadena',
      image: images.materials.baneras,
    },
    {
      title: t('porcelanicos.title'),
      description: t('porcelanicos.description'),
      href: '/porcelanicos-malaga',
      image: images.materials.porcelanicos,
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
        <section className="bg-gray-50 px-4 pb-16 pt-8 sm:px-6 lg:px-8 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-8 text-sm text-gray-500">
              <Link href="/" className="transition-colors hover:text-black">
                {locale === 'es' ? 'Inicio' : 'Home'}
              </Link>
              {' / '}
              <span className="font-medium text-black">{locale === 'es' ? 'Materiales' : 'Materials'}</span>
            </nav>

            <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                  {t('eyebrow')}
                </p>
                <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl lg:text-6xl tracking-tight">
                  {t('h1')}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                  {t('intro')}
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                  <span className="rounded-full border border-gray-300 px-4 py-2">{t('tag1')}</span>
                  <span className="rounded-full border border-gray-300 px-4 py-2">{t('tag2')}</span>
                  <span className="rounded-full border border-gray-300 px-4 py-2">{t('tag3')}</span>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/materiales-premium" className="btn-primary text-center">
                    {t('primaryCta')}
                  </Link>
                  <Link href="/#contacto" className="btn-secondary text-center">
                    {t('secondaryCta')}
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={images.materials.showroom}
                    alt={t('heroAlt')}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-black md:text-4xl">{t('gridTitle')}</h2>
                <p className="mt-3 max-w-2xl text-gray-600">{t('gridIntro')}</p>
              </div>
              <Link href="/catalogo" className="text-sm font-semibold uppercase tracking-[0.18em] text-black transition-opacity hover:opacity-70">
                {t('catalogCta')}
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {collections.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 flex items-center justify-center border-b border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="text-gray-400 group-hover:text-black transition-colors duration-300"
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <h3 className="text-2xl font-semibold text-black">{item.title}</h3>
                    <p className="leading-relaxed text-gray-600">{item.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-black">
                      {t('viewCategory')}
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">{t('supportTitle')}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">{t('supportDescription')}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">{t('supportCard1Label')}</p>
                <p className="mt-3 text-lg font-medium">{t('supportCard1Text')}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">{t('supportCard2Label')}</p>
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
