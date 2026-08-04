import { getTranslations } from 'next-intl/server'
import { baseUrl } from '@/lib/site'
import LegalDocument, { LegalSection } from '@/components/LegalDocument'

const PRIVACY_SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal.privacy')
  const canonical =
    locale === 'en' ? `${baseUrl}/en/politica-privacidad` : `${baseUrl}/es/politica-privacidad`
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        es: `${baseUrl}/es/politica-privacidad`,
        en: `${baseUrl}/en/politica-privacidad`,
      },
    },
  }
}

export default async function PoliticaPrivacidadPage({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations('legal')
  const tp = await getTranslations('legal.privacy')
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
        { label: tp('title'), href: null },
      ]}
      title={tp('title')}
      lastUpdatedLabel={t('lastUpdated')}
      dateStr={dateStr}
      relatedTitle={t('relatedTitle')}
      relatedLinks={[
        { href: '/aviso-legal', label: tFooter('legal') },
        { href: '/cookies', label: tFooter('cookies') },
        { href: '/contacto', label: tFooter('contact') },
      ]}
    >
      {PRIVACY_SECTIONS.map((n) => (
        <LegalSection key={n} title={tp(`s${n}Title`)}>
          <p>{tp(`s${n}Body`)}</p>
        </LegalSection>
      ))}
    </LegalDocument>
  )
}
