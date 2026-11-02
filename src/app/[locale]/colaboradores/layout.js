import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'collaboratorsPage.meta' })

  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/colaboradores`,
    },
    alternates: pageAlternates(locale, '/colaboradores'),
  }
}

export default function ColaboradoresLayout({ children }) {
  return children
}
