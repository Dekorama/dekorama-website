import { Link } from '@/i18n/navigation'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import { productImages, buildRelatedLinks } from '@/data/productPages'

const HERO = productImages.grifos

export async function generateMetadata({ params }) {
  const { locale } = await params
  const isEs = locale === 'es'

  return {
    title: isEs
      ? 'Venta Grifos Cristina Neve Tres Gessi Benalmádena | Tienda Dekorama Málaga'
      : 'Cristina Neve Tres Gessi Taps Sale Benalmádena | Dekorama Store Málaga',
    description: isEs
      ? 'Tienda de grifos en Benalmádena. Venta de grifos Cristina, Neve, Tres, Gessi y Roca para baño y cocina. Showroom físico. Instalación opcional.'
      : 'Taps store in Benalmádena. Sale of Cristina, Neve, Tres, Gessi and Roca taps for bathroom and kitchen. Physical showroom. Optional installation.',
    openGraph: {
      title: isEs ? 'Venta Grifos Benalmádena' : 'Taps Sale Benalmádena',
      description: isEs ? 'Tienda de grifería premium en Benalmádena' : 'Premium taps store in Benalmádena',
      url: `/${locale}/venta-grifos-benalmadena`,
      images: [{ url: HERO }],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/venta-grifos-benalmadena`,
      languages: {
        es: `${baseUrl}/es/venta-grifos-benalmadena`,
        en: `${baseUrl}/en/venta-grifos-benalmadena`,
      },
    },
  }
}

export default async function VentaGrifosPage({ params }) {
  const { locale } = await params
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const isEs = locale === 'es'

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Service'],
    name: isEs ? 'Grifos Cristina, Neve, Tres y Gessi' : 'Cristina, Neve, Tres and Gessi Taps',
    description: isEs
      ? 'Venta de grifos Cristina Grifería, Neve, Tres, Gessi y Roca en Benalmádena.'
      : 'Sale of Cristina Grifería, Neve, Tres, Gessi and Roca taps in Benalmádena.',
    brand: [
      { '@type': 'Brand', name: 'Cristina Grifería' },
      { '@type': 'Brand', name: 'Neve' },
      { '@type': 'Brand', name: 'Tres' },
      { '@type': 'Brand', name: 'Gessi' },
      { '@type': 'Brand', name: 'Roca' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'LocalBusiness', name: 'Dekorama', '@id': `${baseUrl}/#business` },
    },
    image: `${baseUrl}${HERO}`,
  }

  const features = [
    {
      title: isEs ? 'Showroom físico' : 'Physical showroom',
      description: isEs
        ? 'Prueba los grifos, compara acabados y recibe asesoramiento en Benalmádena.'
        : 'Test taps, compare finishes and get advice in Benalmádena.',
    },
    {
      title: isEs ? 'Mejor precio' : 'Best price',
      description: isEs
        ? 'Trabajamos con fabricantes. Si encuentras mejor precio, te lo igualamos.'
        : 'We work with manufacturers. If you find a better price, we match it.',
    },
    {
      title: isEs ? 'Directo de fábrica' : 'Direct from factory',
      description: isEs
        ? 'Pedido directo para acabados exactos. Entrega habitual 7–14 días.'
        : 'Direct orders for exact finishes. Typical delivery 7–14 days.',
    },
    {
      title: isEs ? 'Instalación opcional' : 'Optional installation',
      description: isEs
        ? 'Instalamos con garantía. También reforma completa de baño o cocina.'
        : 'We install with warranty. Full bathroom or kitchen renovation available.',
    },
  ]

  const types = [
    {
      title: isEs ? 'Grifos de lavabo' : 'Basin taps',
      desc: isEs
        ? 'Monomando, bimando, altos o de caño bajo. Cromo, negro mate, dorado.'
        : 'Single-lever, dual-handle, high or low spout. Chrome, matt black, gold.',
    },
    {
      title: isEs ? 'Grifos de ducha' : 'Shower taps',
      desc: isEs
        ? 'Termostáticos empotrados o de superficie. Con o sin ducha de mano.'
        : 'Thermostatic concealed or surface-mounted. With or without hand shower.',
    },
    {
      title: isEs ? 'Grifos de bañera' : 'Bathtub taps',
      desc: isEs
        ? 'Cascada, empotrados o de repisa. Diseños modernos y clásicos.'
        : 'Waterfall, concealed or deck-mounted. Modern and classic designs.',
    },
    {
      title: isEs ? 'Grifos de cocina' : 'Kitchen taps',
      desc: isEs
        ? 'Extraíbles, caño alto, con ducha. Filtrado integrado disponible.'
        : 'Pull-out, high spout, with spray. Integrated filtering available.',
    },
  ]

  const brands = [
    {
      brand: 'Cristina Grifería',
      desc: isEs
        ? 'Diseño italiano. Acabados premium y colecciones contemporáneas.'
        : 'Italian design. Premium finishes and contemporary collections.',
    },
    {
      brand: 'Neve',
      desc: isEs
        ? 'Grifería de diseño. Estética cuidada y alta durabilidad.'
        : 'Design taps. Refined aesthetics and high durability.',
    },
    {
      brand: 'Tres',
      desc: isEs
        ? 'Grifería española. Diseño, calidad y acabados exclusivos.'
        : 'Spanish taps. Design, quality and exclusive finishes.',
    },
    {
      brand: 'Gessi',
      desc: isEs
        ? 'Lujo italiano. Piezas icónicas para baños de alto standing.'
        : 'Italian luxury. Iconic pieces for high-end bathrooms.',
    },
    {
      brand: 'Roca',
      desc: isEs
        ? 'Referencia española. Excelente relación calidad-precio.'
        : 'Leading Spanish brand. Excellent value for money.',
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <div className="min-h-screen bg-white">
        <PageHeader
          breadcrumbItems={[
            { label: tCommon('home'), href: `/${locale}` },
            { label: isEs ? 'Grifos' : 'Taps', href: null },
          ]}
          title={isEs ? 'Venta de Grifos en Benalmádena' : 'Taps Sale in Benalmádena'}
          subtitle={
            isEs
              ? 'Cristina Grifería, Neve, Tres, Gessi y Roca en nuestro showroom. Lavabo, ducha termostática, bañera y cocina.'
              : 'Cristina Grifería, Neve, Tres, Gessi and Roca in our showroom. Basin, thermostatic shower, bathtub and kitchen.'
          }
          heroImage={HERO}
          heroImageAlt={isEs ? 'Grifería premium Benalmádena' : 'Premium taps Benalmádena'}
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
              {isEs ? '¿Por qué comprar en Dekorama?' : 'Why buy at Dekorama?'}
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
              {isEs ? 'Tipos de grifos disponibles' : 'Available tap types'}
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {types.map((item) => (
                <article key={item.title}>
                  <h3 className="mb-3 font-heading text-xl font-normal tracking-tight text-black">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-editorial">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Trabajamos con las mejores marcas' : 'We work with the best brands'}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-gray-600">
              {isEs
                ? 'Diseño italiano y español. Garantía del fabricante de hasta 5 años.'
                : 'Italian and Spanish design. Manufacturer warranty up to 5 years.'}
            </p>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((item) => (
                <div key={item.brand} className="border-t border-gray-200 pt-8">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-black">
                    {item.brand}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-editorial border-y border-gray-200 bg-gray-bg">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Visita nuestro showroom' : 'Visit our showroom'}
            </h2>
            <p className="mb-8 text-gray-600">
              {isEs
                ? 'Compara acabados en persona en Benalmádena y te ayudamos a elegir la grifería ideal.'
                : 'Compare finishes in person in Benalmádena and we help you choose the right taps.'}
            </p>
            <Link href={`/${locale}/contacto`} className="btn-primary">
              {tCta('requestFreeVisit')}
            </Link>
          </div>
        </section>

        <RelatedLinks
          title={isEs ? 'Servicios relacionados' : 'Related services'}
          links={buildRelatedLinks(/** @type {'es'|'en'} */ (locale), ['banos', 'mamparas', 'baneras'])}
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
