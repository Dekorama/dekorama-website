'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { markets } from '@/lib/markets'
import {
  useActiveMarket,
  marketHomeHref,
  marketContactHref,
} from '@/lib/useActiveMarket'

export default function Footer() {
  const t = useTranslations('footer')
  const marketId = useActiveMarket()
  const isVe = marketId === 'venezuela'
  const market = isVe ? markets.venezuela : markets.spain
  const homeHref = marketHomeHref(marketId)
  const contactHref = marketContactHref(marketId)

  return (
    <footer className="bg-charcoal text-white">
      <div className="border-b border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-heading text-2xl tracking-tight md:text-3xl">
              {isVe ? t('brandVe') : 'Dekorama'}
            </p>
            <p className="mt-2 max-w-md text-sm text-gray-400">{isVe ? t('descriptionVe') : t('description')}</p>
          </div>
          <Link href={contactHref} className="btn-discover border-white text-white hover:opacity-70">
            {t('scheduleVisit')}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 grid grid-cols-2 gap-8 sm:gap-10 md:mb-14 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href={homeHref} className="inline-block">
              <Image
                src="/dekorama-logo-cropped.svg"
                alt="Dekorama"
                width={160}
                height={42}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            {!isVe ? (
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                <span className="mb-1 block font-medium text-gray-300">{t('store')}</span>
                {t('address').split('\n').map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            ) : (
              <p className="mt-4 text-sm text-gray-400">
                <span className="mb-1 block font-medium text-gray-300">{t('marketVe')}</span>
                {t('areaVe')}
              </p>
            )}
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              {t('products')}
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/materiales" className="hover:text-white">
                  {t('materiales')}
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white">
                  {t('catalog')}
                </Link>
              </li>
              <li>
                <Link href="/porcelanicos-malaga" className="hover:text-white">
                  {t('porcelanicosMalaga')}
                </Link>
              </li>
              <li>
                <Link href="/venta-grifos-benalmadena" className="hover:text-white">
                  {t('griferia')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              {t('services')}
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/reformas-integrales" className="hover:text-white">
                  {t('reformas')}
                </Link>
              </li>
              <li>
                <Link href="/cocinas-a-medida" className="hover:text-white">
                  {t('cocinas')}
                </Link>
              </li>
              <li>
                <Link href="/banos-completos" className="hover:text-white">
                  {t('banos')}
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-white">
                  {t('services')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              {isVe ? t('locationsVe') : t('cities')}
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {isVe ? (
                <>
                  <li>
                    <Link href="/reformas-caracas" className="hover:text-white">
                      {t('caracas')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto-caracas" className="hover:text-white">
                      {t('contactCaracas')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white">
                      {t('spainSite')}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/contacto" className="hover:text-white">
                      {t('benalmadena')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/reformas-marbella" className="hover:text-white">
                      {t('marbella')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/reformas-fuengirola" className="hover:text-white">
                      {t('fuengirola')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/reformas-estepona" className="hover:text-white">
                      {t('estepona')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/reformas-caracas" className="hover:text-white">
                      {t('caracas')}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              {t('company')}
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/proyectos" className="hover:text-white">
                  {t('projects')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white">
                  {t('partners')}
                </Link>
              </li>
              <li>
                <Link href={contactHref} className="hover:text-white">
                  {t('contact')}
                </Link>
              </li>
              {market.phoneReady ? (
                <li>
                  <a href={`tel:${market.telephone}`} className="hover:text-white">
                    {market.phoneDisplay}
                  </a>
                </li>
              ) : null}
              <li>
                <a href={`mailto:${market.email}`} className="hover:text-white">
                  {market.email}
                </a>
              </li>
            </ul>

            <p className="mb-3 mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              {t('joinConversation')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/grupodekorama"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/25 transition-colors hover:border-white"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/grupodekorama"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/25 transition-colors hover:border-white"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://pin.it/ff8KYuTWP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border border-white/25 transition-colors hover:border-white"
                aria-label="Pinterest"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} Dekorama. {t('copyright')}
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/politica-privacidad" className="hover:text-white">
              {t('privacy')}
            </Link>
            <Link href="/aviso-legal" className="hover:text-white">
              {t('legal')}
            </Link>
            <Link href="/cookies" className="hover:text-white">
              {t('cookies')}
            </Link>
            <a href="/llms.txt" className="hover:text-white">
              {t('llmsGuide')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
