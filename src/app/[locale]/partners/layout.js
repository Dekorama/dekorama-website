import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'partners.meta' })

  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/partners`,
    },
  }
}

export default function PartnersLayout({ children }) {
  return children
}
