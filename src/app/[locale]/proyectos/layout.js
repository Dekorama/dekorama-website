import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.proyectos' })
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/proyectos`,
    },
    alternates: pageAlternates(locale, '/proyectos'),
  }
}

export default function ProyectosLayout({ children }) {
  return children
}
