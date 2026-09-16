import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { buildCaracasServiceJsonLd } from '@/lib/caracas'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Hero from '@/components/Hero'
import FeaturedSpaces from '@/components/home/FeaturedSpaces'
import QuoteStrip from '@/components/home/QuoteStrip'
import TwoColShowroom from '@/components/home/TwoColShowroom'
import FeaturedMaterial from '@/components/home/FeaturedMaterial'
import DualLandscape from '@/components/home/DualLandscape'
import CaracasZones from '@/components/home/CaracasZones'
import Proceso from '@/components/Proceso'
import CTAFinal from '@/components/CTAFinal'
import PageFaq from '@/components/PageFaq'
import SetVenezuelaMarket from '@/components/SetVenezuelaMarket'
import { getPageFaqsFromTranslations } from '@/lib/pageFaqs'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.caracas' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/reformas-caracas`,
      images: [{ url: images.markets.caracas }],
    },
    alternates: pageAlternates(locale, '/reformas-caracas'),
  }
}

export default async function ReformasCaracasPage({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ciudades.caracas' })

  const serviceJsonLd = {
    ...buildCaracasServiceJsonLd(locale, t('description')),
    image: `${baseUrl}${images.markets.caracas}`,
  }

  const faqs = getPageFaqsFromTranslations((key) => t(key), { has: (key) => t.has(key) })

  return (
    <>
      <SetVenezuelaMarket />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <Hero variant="caracas" />
        <section className="section-editorial border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              {t('answerEyebrow')}
            </p>
            <h2 className="mb-4 font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl">
              {t('answerTitle')}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-600 md:text-lg">{t('answerBody')}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/materiales-caracas" className="btn-primary text-center">
                {t('answerMaterialsCta')}
              </Link>
              <Link href="/contacto-caracas" className="btn-discover text-center">
                {t('answerContactCta')}
              </Link>
            </div>
          </div>
        </section>
        <FeaturedSpaces />
        <QuoteStrip variant="caracas" />
        <TwoColShowroom variant="caracas" />
        <FeaturedMaterial />
        <DualLandscape variant="caracas" />
        <CaracasZones />
        <Proceso />
        <PageFaq title={t('faq.title')} faqs={faqs} />
        <CTAFinal marketId="venezuela" />
      </div>
    </>
  )
}
