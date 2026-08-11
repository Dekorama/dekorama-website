import { Link } from '@/i18n/navigation'
import { baseUrl } from '@/lib/site'
import { pageAlternates } from '@/lib/seo'
import { buildProductJsonLd } from '@/lib/productSchema'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import { productImages, buildRelatedLinks } from '@/data/productPages'

const HERO = productImages.sanitarios

export async function generateMetadata({ params }) {
  const { locale } = await params
  const isEs = locale === 'es'

  return {
    title: isEs
      ? 'Sanitarios e Inodoros | Geberit Tece Duravit | Dekorama'
      : 'Sanitaryware & Toilets | Geberit Tece Duravit | Dekorama',
    description: isEs
      ? 'Venta de inodoros suspendidos y de suelo. Geberit, Tece, Duravit, Villeroy & Boch. Showroom físico. Instalación opcional.'
      : 'Sale of wall-hung and floor-standing toilets. Geberit, Tece, Duravit, Villeroy & Boch. Physical showroom. Optional installation.',
    openGraph: {
      title: isEs ? 'Sanitarios' : 'Sanitaryware',
      description: isEs ? 'Venta e instalación de inodoros premium' : 'Sale and installation of premium toilets',
      url: `/${locale}/sanitarios`,
      images: [{ url: HERO }],
    },
    alternates: pageAlternates(locale, '/sanitarios'),
  }
}

export default async function InodorosSuspendidosPage({ params }) {
  const { locale } = await params
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const isEs = locale === 'es'

  const productJsonLd = buildProductJsonLd({
    type: ['Product', 'Service'],
    name: isEs ? 'Inodoros Suspendidos y de Suelo' : 'Wall-hung and Floor-standing Toilets',
    description: isEs
      ? 'Venta de inodoros Geberit, Tece, Duravit y Villeroy & Boch.'
      : 'Sale of Geberit, Tece, Duravit and Villeroy & Boch toilets.',
    brand: [
      { '@type': 'Brand', name: 'Geberit' },
      { '@type': 'Brand', name: 'Tece' },
      { '@type': 'Brand', name: 'Duravit' },
      { '@type': 'Brand', name: 'Villeroy & Boch' },
    ],
    imagePath: HERO,
    offerKey: 'inodoros',
  })

  const features = [
    {
      title: isEs ? 'Showroom físico' : 'Physical showroom',
      description: isEs
        ? 'Modelos en exposición y asesoramiento experto en nuestro showroom.'
        : 'Models on display and expert advice in our showroom.',
    },
    {
      title: isEs ? 'Instalación profesional' : 'Professional installation',
      description: isEs
        ? 'Fontaneros certificados. Suspendidos con cisterna empotrada incluidos.'
        : 'Certified plumbers. Wall-hung with concealed cistern included.',
    },
    {
      title: isEs ? 'Entrega rápida' : 'Fast delivery',
      description: isEs
        ? 'Populares en stock. Especiales en 5–10 días.'
        : 'Popular models in stock. Specials in 5–10 days.',
    },
    {
      title: isEs ? 'Reforma opcional' : 'Renovation optional',
      description: isEs
        ? 'Podemos hacer la reforma completa del baño.'
        : 'We can complete the full bathroom renovation.',
    },
  ]

  const types = [
    {
      title: isEs ? 'Inodoros suspendidos' : 'Wall-hung toilets',
      desc: isEs
        ? 'Cisterna empotrada, diseño minimalista, fácil limpieza y altura regulable.'
        : 'Concealed cistern, minimalist design, easy cleaning and adjustable height.',
      features: isEs
        ? ['Cisterna Geberit', 'Altura 40–43 cm', 'Hasta 400 kg', 'Descarga dual 3/6L']
        : ['Geberit cistern', 'Height 40–43 cm', 'Up to 400 kg', 'Dual flush 3/6L'],
    },
    {
      title: isEs ? 'Inodoros de suelo' : 'Floor-standing toilets',
      desc: isEs
        ? 'Tanque bajo, instalación sencilla, amplia variedad de estilos.'
        : 'Close-coupled, simple installation, wide variety of styles.',
      features: isEs
        ? ['Instalación rápida', 'Descarga dual eco', 'Rimless disponibles', 'Asientos soft-close']
        : ['Fast installation', 'Eco dual flush', 'Rimless available', 'Soft-close seats'],
    },
  ]

  const brands = ['Geberit', 'Tece', 'Duravit', 'Villeroy & Boch']

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <div className="min-h-screen bg-white">
        <PageHeader
          title={isEs ? 'Sanitarios' : 'Sanitaryware'}
          subtitle={
            isEs
              ? 'Suspendidos y de suelo. Geberit, Tece, Duravit, Villeroy & Boch. Descarga dual 3/6L para máximo ahorro.'
              : 'Wall-hung and floor-standing. Geberit, Tece, Duravit, Villeroy & Boch. Dual flush 3/6L for maximum savings.'
          }
          heroImage={HERO}
          heroImageAlt={isEs ? 'Sanitarios' : 'Sanitaryware'}
          ctaPrimary={{
            text: isEs ? 'Haz tu visita' : 'Book your visit',
            href: `/${locale}/contacto`,
          }}
          ctaSecondary={{
            text: isEs ? 'Ver materiales' : 'View materials',
            href: '/materiales-premium',
          }}
          baseUrl={baseUrl}
        />

        <section className="section-editorial border-b border-gray-200">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Compra con confianza' : 'Buy with confidence'}
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {features.map((item) => (
                <div key={item.title} className="border-t border-gray-300 pt-8">
                  <h3 className="mb-3 text-lg font-semibold tracking-tight text-black">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-editorial bg-gray-bg">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              {isEs ? 'Colección' : 'Collection'}
            </p>
            <h2 className="mb-12 text-center font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Tipos de inodoros' : 'Toilet types'}
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {types.map((item) => (
                <article key={item.title} className="border border-gray-200 bg-white p-8 md:p-10">
                  <h3 className="mb-3 font-heading text-2xl font-normal tracking-tight text-black">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="text-sm text-gray-700">
                        <span className="mr-2 text-black">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-editorial">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Marcas que trabajamos' : 'Brands we work with'}
            </h2>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {brands.map((brand) => (
                <li key={brand} className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-800">
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-editorial border-y border-gray-200 bg-gray-bg">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Visita nuestro showroom' : 'Visit our showroom'}
            </h2>
            <p className="mb-8 text-gray-600">
              {isEs
                ? 'Compara modelos en nuestro showroom y te asesoramos sobre instalación y reforma.'
                : 'Compare models in our showroom and get advice on installation and renovation.'}
            </p>
            <Link href={`/${locale}/contacto`} className="btn-primary">
              {tCta('requestFreeVisit')}
            </Link>
          </div>
        </section>

        <RelatedLinks
          title={isEs ? 'Servicios relacionados' : 'Related services'}
          links={buildRelatedLinks(/** @type {'es'|'en'} */ (locale), ['grifos', 'banos', 'materiales'])}
        />

        <CTASection
          title={tCta('readyToTransform')}
          description={tCta('freeVisitAndQuote')}
          buttons={[{ text: tCta('requestFreeVisit'), href: `/${locale}/contacto`, variant: 'primary' }]}
        />
      </div>
    </>
  )
}
