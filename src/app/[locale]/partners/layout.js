import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { getPageFaqsFromTranslations } from '@/lib/pageFaqs'
import { buildPartnerProgramJsonLd } from '@/lib/partnerProgram'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'partners.meta' })

  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/partners`,
    },
    alternates: pageAlternates(locale, '/partners'),
  }
}

export default async function PartnersLayout({ children, params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'partners' })
  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })
  const jsonLdBlocks = buildPartnerProgramJsonLd({
    locale,
    name: t('meta.title'),
    description: t('meta.description'),
    faqs,
  })

  return (
    <>
      {jsonLdBlocks.map((block) => (
        <script
          key={String(block['@type'])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      {children}
    </>
  )
}
