import { baseUrl } from '@/lib/site'
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
    alternates: { 
      canonical: `${baseUrl}/${locale}/proyectos`,
      languages: {
        'es': `${baseUrl}/es/proyectos`,
        'en': `${baseUrl}/en/proyectos`,
      }
    },
  }
}

export default function ProyectosLayout({ children }) {
  return children
}
