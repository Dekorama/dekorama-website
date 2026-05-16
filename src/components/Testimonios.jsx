'use client'

import { useTranslations } from 'next-intl'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?sca_esv=498f31acae8dba9f&rlz=1C5GCEM_enES1180ES1180&sxsrf=ANbL-n45ovXOU4K7gzn7sazY8HybySDHUw:1778875912827&q=dekorama+benalmadena&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXMZk2BXDn_wSp9zZHH_6O6pdFfhYccHfZ2-Dk4yl_92Zw9AXArCsqRs6aka1djDIOfuTJw%3D&uds=ALYpb_lLt3rF4OntvAcKw6YR8l5VVBsMcczqtsRAOjcYb7ygvr_nsXYI7zqQE_oAKC5GK9unwZbGRqvjEyp8xdxG2U-Ch107_lpvTexeVg-Rkrxu3Tw6rZI&sa=X&ved=2ahUKEwikzIiXjbyUAxWKNvsDHZ3hJ1gQ3PALegQIHBAE'

export default function Testimonios() {
  const t = useTranslations('testimonios')

  const testimonios = [
    {
      quote:
        'Carolina is an enthusiastic & helpful lady who is knowledgeable about interior design. She suggested some great ideas, organised, ordered & delivered the materials. She constantly visited our home with Carlos, the foreman of the hardworking team from Estepona, to make sure that things were running smoothly. We now have a new shower room/aseo installed.',
      nombre: 'Julliet Birch',
      detalleKey: 'detail1',
    },
    {
      quote:
        'Great experience working with Dekorama! Carolina was fantastic at interpreting the style and finish we were hoping for! Quality products! High end finish!',
      nombre: 'Charles Harman',
      detalleKey: 'detail2',
    },
    {
      quote:
        "Excellent! From service to materials, everything was awesome, more than expected. I live abroad so I renovated remote, communicating by phone with Carolina in english. The support she offered, advice and constant availability made everything go smoothly - she even sugested a few things based on my criteria that were exactly what I needed, saving me a lot of time and effort. Can't thank them enough, they are literally making the world a better place.",
      nombre: 'Velia Cumpata',
      detalleKey: 'detail3',
    },
  ]

  const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden>
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  )

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16 tracking-tight">
          {t('title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonios.map((testimonio, index) => (
            <div
              key={index}
              className="card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">&quot;{testimonio.quote}&quot;</p>
              <div>
                <div className="font-semibold text-black">{testimonio.nombre}</div>
                {testimonio.detalleKey && (
                  <div className="text-sm text-gray-600">{t(testimonio.detalleKey)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            aria-label={t('ariaReviews')}
          >
            <span className="text-2xl font-bold text-black">4.8</span>
            <span className="text-black" aria-hidden>★</span>
            <span className="text-gray-600">{t('onGoogle')}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{t('reviews')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
