import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import TrackedOutboundLink from '@/components/TrackedOutboundLink'
import { baseUrl } from '@/lib/site'

const COLLABORATORS = [
  {
    id: 'aireformas',
    nameKey: 'aireformas.name',
    descriptionKey: 'aireformas.description',
    website: 'https://www.aireformas.com/',
    logoSrc: '/images/collaborators/aireformas-logo.png',
    logoWidth: 200,
    logoHeight: 80,
  },
]

export default async function ColaboradoresPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'collaboratorsPage' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })

  const breadcrumbItems = [
    { label: tCommon('home'), href: `/${locale}` },
    { label: t('title'), href: null },
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={t('title')}
        subtitle={t('subtitle')}
        heroImage="/dekorama-showroom.jpeg"
        heroImageAlt={
          locale === 'es'
            ? 'Showroom Dekorama en Benalmádena'
            : 'Dekorama showroom in Benalmádena'
        }
        baseUrl={baseUrl}
      />

      <section className="border-b border-gray-100 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-gray-600">{t('intro')}</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8">
          {COLLABORATORS.map((collaborator) => (
            <article
              key={collaborator.id}
              className="flex flex-col gap-6 border border-gray-100 bg-white p-6 sm:flex-row sm:items-start sm:p-8"
            >
              <div className="flex shrink-0 items-center justify-center rounded-sm bg-[#f5f3ef] px-6 py-5 sm:w-52">
                <Image
                  src={collaborator.logoSrc}
                  alt={t(collaborator.nameKey)}
                  width={collaborator.logoWidth}
                  height={collaborator.logoHeight}
                  className="h-auto max-h-16 w-auto max-w-[180px] object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-heading text-2xl tracking-tight text-black">
                  {t(collaborator.nameKey)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {t(collaborator.descriptionKey)}
                </p>
                <TrackedOutboundLink
                  href={collaborator.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center text-sm font-semibold text-black underline-offset-4 hover:underline"
                  eventName="collaborator_website"
                  eventParams={{ collaborator: collaborator.id }}
                >
                  {t('visitWebsite')}
                </TrackedOutboundLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
