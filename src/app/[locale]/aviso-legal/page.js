import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import LegalDocument, { LegalSection } from '@/components/LegalDocument'

const AVISO_SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal.aviso')
  const canonical = locale === 'en' ? `${baseUrl}/en/aviso-legal` : `${baseUrl}/es/aviso-legal`
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: { es: `${baseUrl}/es/aviso-legal`, en: `${baseUrl}/en/aviso-legal` },
    },
  }
}

export default async function AvisoLegalPage({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal')
  const ta = await getTranslations('legal.aviso')
  const tFooter = await getTranslations('footer')
  const tCommon = await getTranslations('breadcrumb')
  const dateStr = new Date().toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <LegalDocument
      breadcrumbItems={[
        { label: tCommon('home'), href: `/${locale}` },
        { label: ta('title'), href: null },
      ]}
      title={ta('title')}
      lastUpdatedLabel={t('lastUpdated')}
      dateStr={dateStr}
      relatedTitle={t('relatedTitle')}
      relatedLinks={[
        { href: '/politica-privacidad', label: tFooter('privacy') },
        { href: '/cookies', label: tFooter('cookies') },
        { href: '/contacto', label: tFooter('contact') },
      ]}
    >
      {AVISO_SECTIONS.map((n) => (
        <LegalSection key={n} title={ta(`s${n}Title`)}>
          <p>{ta(`s${n}Body`)}</p>
        </LegalSection>
      ))}
    </LegalDocument>
  )
}
