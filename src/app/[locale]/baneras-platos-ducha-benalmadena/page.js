import { Link } from '@/i18n/navigation'
import { baseUrl } from '@/lib/site'
import { buildProductJsonLd } from '@/lib/productSchema'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import { productImages, buildRelatedLinks } from '@/data/productPages'

const HERO = productImages.baneras

export async function generateMetadata({ params }) {
  const { locale } = await params
  const isEs = locale === 'es'

  return {
    title: isEs
      ? 'Bañeras Acrílicas y Platos Ducha Benalmádena | Roca Hidrobox Dekorama'
      : 'Acrylic Bathtubs and Shower Trays Benalmádena | Roca Hidrobox Dekorama',
    description: isEs
      ? 'Venta de bañeras y platos de ducha en Benalmádena. Roca, Hidrobox, Hidronatur, Fiora, Kaldewei. Instalación opcional. Showroom físico.'
      : 'Sale of bathtubs and shower trays in Benalmádena. Roca, Hidrobox, Hidronatur, Fiora, Kaldewei. Optional installation. Physical showroom.',
    openGraph: {
      title: isEs ? 'Bañeras y Platos Ducha Benalmádena' : 'Bathtubs and Shower Trays Benalmádena',
      description: isEs
        ? 'Venta e instalación de bañeras y platos premium'
        : 'Sale and installation of premium bathtubs and trays',
      url: `/${locale}/baneras-platos-ducha-benalmadena`,
      images: [{ url: HERO }],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/baneras-platos-ducha-benalmadena`,
      languages: {
        es: `${baseUrl}/es/baneras-platos-ducha-benalmadena`,
        en: `${baseUrl}/en/baneras-platos-ducha-benalmadena`,
      },
    },
  }
}

export default async function BanerasPlatosDuchaPage({ params }) {
  const { locale } = await params
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  const isEs = locale === 'es'

  const productJsonLd = buildProductJsonLd({
    type: ['Product', 'Service'],
    name: isEs ? 'Bañeras y Platos de Ducha' : 'Bathtubs and Shower Trays',
    description: isEs
      ? 'Venta de bañeras y platos Roca, Hidrobox, Hidronatur, Fiora y Kaldewei en Benalmádena.'
      : 'Sale of Roca, Hidrobox, Hidronatur, Fiora and Kaldewei bathtubs and shower trays in Benalmádena.',
    brand: [
      { '@type': 'Brand', name: 'Roca' },
      { '@type': 'Brand', name: 'Hidrobox' },
      { '@type': 'Brand', name: 'Hidronatur' },
      { '@type': 'Brand', name: 'Fiora' },
      { '@type': 'Brand', name: 'Kaldewei' },
    ],
    imagePath: HERO,
    offerKey: 'baneras',
  })

  const features = [
    {
      title: isEs ? 'Todas las medidas' : 'All sizes',
      description: isEs
        ? 'Platos de 70×70 a 200×80 cm. Bañeras de 100 a 180 cm.'
        : 'Trays from 70×70 to 200×80 cm. Baths from 100 to 180 cm.',
    },
    {
      title: isEs ? 'Instalación experta' : 'Expert installation',
      description: isEs
        ? 'Montaje correcto e impermeabilización certificada.'
        : 'Correct assembly and certified waterproofing.',
    },
    {
      title: isEs ? 'Mejor precio' : 'Best price',
      description: isEs
        ? 'Directo de fabricante. Si encuentras más barato, igualamos.'
        : 'Direct from manufacturer. If you find cheaper, we match.',
    },
    {
      title: isEs ? 'Reforma opcional' : 'Full renovation',
      description: isEs
        ? 'Cambio bañera por ducha o reforma completa del baño.'
        : 'Bathtub-to-shower conversion or full bathroom renovation.',
    },
  ]

  const bathtubs = [
    {
      title: isEs ? 'Bañeras acrílicas' : 'Acrylic bathtubs',
      desc: isEs
        ? 'Ligeras, cálidas al tacto, mantienen el calor. Precio ajustado.'
        : 'Lightweight, warm to touch, retain heat. Affordable.',
    },
    {
      title: isEs ? 'Bañeras de fundición' : 'Cast iron bathtubs',
      desc: isEs
        ? 'Máxima durabilidad. Esmalte porcelánico. Diseño clásico.'
        : 'Maximum durability. Porcelain enamel. Classic design.',
    },
    {
      title: isEs ? 'Bañeras exentas' : 'Freestanding bathtubs',
      desc: isEs
        ? 'Pieza central del baño. Ovales o rectangulares.'
        : 'Bathroom centerpiece. Oval or rectangular.',
    },
    {
      title: isEs ? 'Con hidromasaje' : 'Whirlpool baths',
      desc: isEs
        ? 'Jets de agua y aire. Sistemas Jacuzzi.'
        : 'Water and air jets. Jacuzzi systems.',
    },
    {
      title: isEs ? 'Bañeras angulares' : 'Corner bathtubs',
      desc: isEs
        ? 'Aprovechan esquinas. Mayor capacidad.'
        : 'Use corners. Greater capacity.',
    },
    {
      title: isEs ? 'Bañeras compactas' : 'Compact bathtubs',
      desc: isEs
        ? 'Desde 100×70 cm. Ideales para baños pequeños.'
        : 'From 100×70 cm. Ideal for small bathrooms.',
    },
  ]

  const trays = [
    {
      title: isEs ? 'Platos de resina' : 'Resin trays',
      desc: isEs
        ? 'Textura piedra, antideslizantes Clase 3, recortables in situ.'
        : 'Stone texture, Class 3 anti-slip, cut-to-size on site.',
      featured: true,
    },
    {
      title: isEs ? 'Carga mineral' : 'Mineral cast',
      desc: isEs
        ? 'Superficie lisa, acabados mate, alta resistencia, reparables.'
        : 'Smooth surface, matt finishes, high resistance, repairable.',
      featured: true,
    },
    {
      title: isEs ? 'Platos porcelánicos' : 'Porcelain trays',
      desc: isEs
        ? 'Gres porcelánico antideslizante. Económicos y durables.'
        : 'Anti-slip porcelain stoneware. Economical and durable.',
      featured: false,
    },
  ]

  const brands = ['Roca', 'Hidrobox', 'Hidronatur', 'Fiora', 'Kaldewei']

  const services = isEs
    ? ['Venta de bañeras y platos', 'Instalación profesional', 'Cambio bañera por ducha', 'Reforma completa de baño']
    : ['Bathtub and tray sales', 'Professional installation', 'Bathtub to shower conversion', 'Complete bathroom renovation']

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <div className="min-h-screen bg-white">
        <PageHeader
          breadcrumbItems={[
            { label: tCommon('home'), href: `/${locale}` },
            { label: isEs ? 'Bañeras y Platos' : 'Baths & Trays', href: null },
          ]}
          title={
            isEs
              ? 'Bañeras y Platos de Ducha en Benalmádena'
              : 'Bathtubs and Shower Trays in Benalmádena'
          }
          subtitle={
            isEs
              ? 'Roca, Hidrobox, Hidronatur, Fiora, Kaldewei. Bañeras acrílicas y fundición. Platos de resina, carga mineral y porcelánico.'
              : 'Roca, Hidrobox, Hidronatur, Fiora, Kaldewei. Acrylic and cast iron baths. Resin, mineral cast and porcelain trays.'
          }
          heroImage={HERO}
          heroImageAlt={isEs ? 'Bañeras y platos de ducha' : 'Bathtubs and shower trays'}
          ctaPrimary={{
            text: isEs ? 'Haz tu visita' : 'Book your visit',
            href: `/${locale}/contacto`,
          }}
          ctaSecondary={{
            text: isEs ? 'Ver mamparas' : 'View screens',
            href: '/mamparas-ducha-benalmadena',
          }}
          baseUrl={baseUrl}
        />

        <section className="section-editorial border-b border-gray-200">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((item) => (
                <p
                  key={item}
                  className="border border-gray-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-gray-800"
                >
                  {item}
                </p>
              ))}
            </div>
            <h2 className="mb-12 text-center font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? '¿Por qué Dekorama?' : 'Why Dekorama?'}
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
              {isEs ? 'Bañeras' : 'Bathtubs'}
            </p>
            <h2 className="mb-4 text-center font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Bañeras disponibles' : 'Available bathtubs'}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-600">
              {isEs
                ? 'Medidas estándar: 140×70, 150×70, 160×70, 170×70, 180×80 cm'
                : 'Standard sizes: 140×70, 150×70, 160×70, 170×70, 180×80 cm'}
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {bathtubs.map((item) => (
                <article key={item.title} className="border-t border-gray-300 pt-6">
                  <h3 className="mb-2 font-heading text-xl font-normal tracking-tight text-black">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-editorial">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              {isEs ? 'Platos de ducha' : 'Shower trays'}
            </p>
            <h2 className="mb-4 text-center font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Platos de ducha disponibles' : 'Available shower trays'}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-600">
              {isEs
                ? 'Cuadrados, rectangulares, angulares. Altura extraplana 2–3 cm'
                : 'Square, rectangular, corner. Ultra-flat height 2–3 cm'}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {trays.map((item) => (
                <article
                  key={item.title}
                  className={
                    item.featured
                      ? 'bg-charcoal p-8 text-white md:p-10'
                      : 'border border-gray-200 p-8 md:p-10'
                  }
                >
                  {item.featured ? (
                    <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      {isEs ? 'Más vendido' : 'Best seller'}
                    </span>
                  ) : null}
                  <h3
                    className={`mb-3 font-heading text-2xl font-normal tracking-tight ${
                      item.featured ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${item.featured ? 'text-white/75' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-editorial border-y border-gray-200 bg-gray-bg">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Marcas de confianza' : 'Trusted brands'}
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

        <section className="section-editorial">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Visita nuestro showroom' : 'Visit our showroom'}
            </h2>
            <p className="mb-8 text-gray-600">
              {isEs
                ? 'Compara bañeras y platos en Benalmádena. Te ayudamos con medidas e instalación.'
                : 'Compare baths and trays in Benalmádena. We help with sizing and installation.'}
            </p>
            <Link href={`/${locale}/contacto`} className="btn-primary">
              {tCta('requestFreeVisit')}
            </Link>
          </div>
        </section>

        <RelatedLinks
          title={isEs ? 'Servicios relacionados' : 'Related services'}
          links={buildRelatedLinks(/** @type {'es'|'en'} */ (locale), ['mamparas', 'banos', 'grifos'])}
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
