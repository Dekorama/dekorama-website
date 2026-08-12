import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import DeferredHero from '@/components/DeferredHero'
import HomeClient from './HomeClient'
import MarketContactLink from '@/components/MarketContactLink'

export default async function HomePage({ params }) {
  const { locale } = await Promise.resolve(params)
  const t = await getTranslations({ locale, namespace: 'hero' })
  const tHome = await getTranslations({ locale, namespace: 'home' })

  return (
    <div className="min-h-screen bg-white">
      <section
        id="hero"
        className="relative min-h-[22rem] h-[calc(100svh-var(--site-header-h,4.5rem))] max-h-[calc(100dvh-var(--site-header-h,4.5rem))] w-full overflow-hidden bg-black sm:min-h-[28rem]"
      >
        <div className="absolute inset-0">
          <picture>
            <source
              type="image/avif"
              srcSet="/images/hero/stone-interior-lcp-1280.avif 1280w, /images/hero/stone-interior-lcp-1920.avif 1920w"
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet="/images/hero/stone-interior-lcp-1280.webp 1280w, /images/hero/stone-interior-lcp-1920.webp 1920w"
              sizes="100vw"
            />
            <img
              src="/images/hero/stone-interior-lcp.jpg"
              alt={tHome('heroSlide1Alt')}
              width={1920}
              height={1280}
              fetchPriority="high"
              decoding="sync"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        </div>
        <div
          className="absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-black/20 to-black/25"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-14 pt-8 text-center text-white sm:px-8 sm:pb-16">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/80 sm:mb-3 sm:text-[11px]">
            {t('experience')}
          </p>
          <h1 className="max-w-[14ch] font-heading text-[2rem] font-normal leading-[1.1] tracking-tight sm:max-w-none sm:text-5xl md:text-6xl lg:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85 sm:mt-4 sm:max-w-xl sm:text-base md:text-lg">
            {tHome('heroSlide1Title')}
          </p>
          <div className="mt-6 flex w-full max-w-xs flex-col items-center gap-4 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center">
            <MarketContactLink className="w-full border border-white bg-white px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white sm:w-auto sm:px-8">
              {t('requestConsultation')}
            </MarketContactLink>
            <Link
              href="/materiales"
              className="border-b border-white pb-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-70"
            >
              {tHome('heroSlide1Cta')}
            </Link>
          </div>
        </div>

        <DeferredHero />
      </section>
      <HomeClient />
    </div>
  )
}
