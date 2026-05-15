'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          <div className="space-y-4 lg:col-span-1">
            <div>
              <div className="text-2xl font-bold">Dekorama</div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              {t('description')}
            </p>
            <p className="text-gray-400 text-sm">
              <span className="block font-medium text-gray-300 mt-2">{t('store')}</span>
              {t('address').split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/reformas-integrales" className="hover:text-white transition-colors">
                  {t('reformas')}
                </Link>
              </li>
              <li>
                <Link href="/cocinas-a-medida" className="hover:text-white transition-colors">
                  {t('cocinas')}
                </Link>
              </li>
              <li>
                <Link href="/banos-completos" className="hover:text-white transition-colors">
                  {t('banos')}
                </Link>
              </li>
              <li>
                <Link href="/materiales-premium" className="hover:text-white transition-colors">
                  {t('materiales')}
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition-colors">
                  {t('catalog')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('cities')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/reformas-marbella" className="hover:text-white transition-colors">
                  {t('marbella')}
                </Link>
              </li>
              <li>
                <Link href="/reformas-fuengirola" className="hover:text-white transition-colors">
                  {t('fuengirola')}
                </Link>
              </li>
              <li>
                <Link href="/reformas-estepona" className="hover:text-white transition-colors">
                  {t('estepona')}
                </Link>
              </li>
              <li>
                <Link href="/reformas-torremolinos" className="hover:text-white transition-colors">
                  {t('torremolinos')}
                </Link>
              </li>
              <li>
                <Link href="/porcelanicos-malaga" className="hover:text-white transition-colors">
                  {t('porcelanicosMalaga')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link href="/#proceso" className="hover:text-white transition-colors">
                  {t('ourProcess')}
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="hover:text-white transition-colors">
                  {t('projects')}
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-white transition-colors">
                  {t('services')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="leading-relaxed">
                {t('address').split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </li>
              <li>
                <a href="tel:+34628571537" className="hover:text-white transition-colors">
                  +34 628 571 537
                </a>
              </li>
              <li>
                <a href="mailto:info@dekorama.es" className="hover:text-white transition-colors">
                  info@dekorama.es
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/grupodekorama"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors"
                aria-label="Instagram @grupodekorama"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://pin.it/ff8KYuTWP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} Dekorama. {t('copyright')}</div>
          <div className="flex gap-6">
            <Link href="/politica-privacidad" className="hover:text-white transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/aviso-legal" className="hover:text-white transition-colors">
              {t('legal')}
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              {t('cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
