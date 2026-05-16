import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import ServiceGrid from '@/components/ServiceGrid'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'

export async function generateMetadata({ params }) {
  const { locale } = await params
  
  return {
    title: locale === 'es' 
      ? 'Inodoros Suspendidos Roca Benalmádena | Venta e Instalación'
      : 'Wall-hung Roca Toilets Benalmádena | Sale and Installation',
    description: locale === 'es'
      ? 'Venta de inodoros suspendidos y de suelo en Benalmádena. Roca, Duravit, Villeroy & Boch. Descarga dual eco. Con o sin instalación. Showroom físico.'
      : 'Sale of wall-hung and floor-standing toilets in Benalmádena. Roca, Duravit, Villeroy & Boch. Eco dual flush. With or without installation. Physical showroom.',
    openGraph: {
      title: locale === 'es' ? 'Inodoros Suspendidos Benalmádena' : 'Wall-hung Toilets Benalmádena',
      description: locale === 'es' ? 'Venta e instalación de inodoros premium' : 'Sale and installation of premium toilets',
      url: `/${locale}/inodoros-suspendidos-benalmadena`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/inodoros-suspendidos-benalmadena`,
      languages: {
        'es': `${baseUrl}/es/inodoros-suspendidos-benalmadena`,
        'en': `${baseUrl}/en/inodoros-suspendidos-benalmadena`,
      }
    },
  }
}

export default async function InodorosSuspendidosPage({ params }) {
  const { locale } = await params
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Service'],
    name: locale === 'es' ? 'Inodoros Suspendidos y de Suelo' : 'Wall-hung and Floor-standing Toilets',
    description: locale === 'es' 
      ? 'Venta de inodoros Roca, Duravit y Villeroy & Boch en Benalmádena. Suspendidos, de suelo, con descarga dual eco.'
      : 'Sale of Roca, Duravit and Villeroy & Boch toilets in Benalmádena. Wall-hung, floor-standing, with eco dual flush.',
    category: locale === 'es' ? 'Sanitarios' : 'Sanitary ware',
    brand: [
      { '@type': 'Brand', 'name': 'Roca' },
      { '@type': 'Brand', 'name': 'Duravit' },
      { '@type': 'Brand', 'name': 'Villeroy & Boch' }
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Dekorama',
        '@id': `${baseUrl}/#business`,
      },
    },
    additionalType: 'Service',
    serviceType: locale === 'es' ? 'Instalación de sanitarios' : 'Sanitary ware installation',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    image: images.materials.sanitarios,
  }

  const caracteristicas = [
    {
      title: locale === 'es' ? 'Showroom físico en Benalmádena' : 'Physical showroom in Benalmádena',
      description: locale === 'es'
        ? 'Ven a nuestra tienda, ve los modelos en exposición y recibe asesoramiento de nuestros expertos.'
        : 'Come to our store, see the models on display and receive advice from our experts.',
    },
    {
      title: locale === 'es' ? 'Instalación profesional' : 'Professional installation',
      description: locale === 'es'
        ? 'Fontaneros certificados con años de experiencia. Instalación de inodoro suspendido con cisterna empotrada incluye obra necesaria.'
        : 'Certified plumbers with years of experience. Wall-hung toilet installation with concealed cistern includes necessary building work.',
    },
    {
      title: locale === 'es' ? 'Entrega rápida' : 'Fast delivery',
      description: locale === 'es'
        ? 'Modelos populares en stock inmediato. Para modelos especiales, entrega en 5-10 días.'
        : 'Popular models in immediate stock. For special models, delivery in 5-10 days.',
    },
    {
      title: locale === 'es' ? 'Reforma completa opcional' : 'Complete renovation optional',
      description: locale === 'es'
        ? 'Si necesitas reforma integral de baño, nos encargamos de todo: alicatado, fontanería, electricidad y acabados.'
        : 'If you need complete bathroom renovation, we take care of everything: tiling, plumbing, electrical and finishes.',
    },
  ]

  const relatedServices = [
    {
      title: locale === 'es' ? 'Baños Completos' : 'Complete Bathrooms',
      description: locale === 'es' ? 'Reforma integral de tu baño con acabados premium' : 'Complete bathroom renovation with premium finishes',
      href: `/${locale}/banos-completos`,
      image: images.services.banos,
    },
    {
      title: locale === 'es' ? 'Materiales Premium' : 'Premium Materials',
      description: locale === 'es' ? 'Grifería, sanitarios, iluminación y más' : 'Taps, sanitaryware, lighting and more',
      href: `/${locale}/materiales-premium`,
      image: images.services.materiales,
    },
    {
      title: locale === 'es' ? 'Grifos de Lavabo' : 'Basin Taps',
      description: locale === 'es' ? 'Grohe, Hansgrohe, Roca. Múltiples acabados' : 'Grohe, Hansgrohe, Roca. Multiple finishes',
      href: `/${locale}/venta-grifos-benalmadena`,
      image: images.materials.grifos,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      
      <div className="min-h-screen bg-white">
      
      {/* ── PAGE HEADER ── */}
      <PageHeader
        breadcrumbItems={[
          { label: tCommon('home'), href: `/${locale}` },
          { label: locale === 'es' ? 'Inodoros' : 'Toilets', href: null }
        ]}
        title={locale === 'es' ? 'Inodoros en Benalmádena - Roca, Duravit' : 'Toilets in Benalmádena - Roca, Duravit'}
        subtitle={locale === 'es'
          ? 'Inodoros suspendidos y de suelo en nuestra tienda de Benalmádena. Roca, Duravit, Villeroy & Boch. Descarga dual 3/6L para máximo ahorro de agua.'
          : 'Wall-hung and floor-standing toilets in our Benalmádena store. Roca, Duravit, Villeroy & Boch. Dual flush 3/6L for maximum water saving.'
        }
        heroImage={images.materials.sanitarios}
        heroImageAlt={locale === 'es' ? 'Inodoros Benalmádena' : 'Toilets Benalmádena'}
        ctaPrimary={{
          text: locale === 'es' ? 'Visitar tienda o pedir presupuesto' : 'Visit store or request quote',
          href: `/${locale}#contacto`
        }}
        ctaSecondary={{
          text: locale === 'es' ? 'Ver materiales premium' : 'View premium materials',
          href: `/${locale}/materiales-premium`
        }}
        baseUrl={baseUrl}
      />

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 md:mb-16">
            {locale === 'es' ? 'Compra con confianza en Dekorama' : 'Buy with confidence at Dekorama'}
          </h2>
          <ServiceGrid items={caracteristicas} columns={4} />
        </div>
      </section>

        {/* Tipos de inodoros */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'Tipos de inodoros disponibles' : 'Available toilet types'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: locale === 'es' ? 'Inodoros suspendidos' : 'Wall-hung toilets',
                  desc: locale === 'es' 
                    ? 'Fijados a la pared con cisterna empotrada. Diseño minimalista. Fácil limpieza del suelo. Ahorro de espacio. Regulables en altura.'
                    : 'Wall-mounted with concealed cistern. Minimalist design. Easy floor cleaning. Space saving. Height adjustable.',
                  features: locale === 'es' 
                    ? ['Cisterna empotrada Geberit', 'Altura regulable 40-43 cm', 'Soporta hasta 400 kg', 'Descarga dual 3/6L']
                    : ['Concealed Geberit cistern', 'Adjustable height 40-43 cm', 'Supports up to 400 kg', 'Dual flush 3/6L']
                },
                {
                  title: locale === 'es' ? 'Inodoros de suelo (tanque bajo)' : 'Floor-standing toilets (close-coupled)',
                  desc: locale === 'es'
                    ? 'Instalación más sencilla, no requiere obra. Con tanque acoplado. Gran variedad de diseños. Ideal para reformas rápidas o alquiler.'
                    : 'Simpler installation, no building work required. With coupled tank. Wide variety of designs. Ideal for quick renovations or rentals.',
                  features: locale === 'es'
                    ? ['Instalación sin obra', 'Tanque visible decorativo', 'Salida horizontal o vertical', 'Modelos compactos disponibles']
                    : ['Installation without building work', 'Decorative visible tank', 'Horizontal or vertical outlet', 'Compact models available']
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-600 font-bold mt-1">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marcas */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-6">
              {locale === 'es' ? 'Marcas premium de sanitarios' : 'Premium sanitary ware brands'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Trabajamos con las marcas líderes europeas. Garantía de fábrica y asistencia técnica oficial.'
                : 'We work with leading European brands. Factory warranty and official technical assistance.'
              }
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  brand: 'Roca',
                  desc: locale === 'es'
                    ? 'Marca española líder mundial. Series Gap, Debba, The Gap, Inspira. Excelente relación calidad-precio.'
                    : 'Leading Spanish brand worldwide. Gap, Debba, The Gap, Inspira series. Excellent value for money.'
                },
                {
                  brand: 'Duravit',
                  desc: locale === 'es'
                    ? 'Diseño alemán de lujo. Series D-Code, Starck, ME by Starck. Tecnología Rimless (sin brida) higiénico.'
                    : 'Luxury German design. D-Code, Starck, ME by Starck series. Hygienic Rimless technology.'
                },
                {
                  brand: 'Villeroy & Boch',
                  desc: locale === 'es'
                    ? 'Prestigio alemán desde 1748. CeramicPlus (tratamiento antibacterias). Diseños atemporales.'
                    : 'German prestige since 1748. CeramicPlus (antibacterial treatment). Timeless designs.'
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg text-center">
                  <h3 className="text-2xl font-bold text-black mb-3">{item.brand}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Características técnicas */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'Características técnicas' : 'Technical features'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: locale === 'es' ? 'Descarga Dual Eco' : 'Eco Dual Flush',
                  desc: locale === 'es' ? 'Ahorro 3L/6L de agua. Reducción del 50% en consumo.' : '3L/6L water saving. 50% consumption reduction.'
                },
                {
                  title: locale === 'es' ? 'Asiento con cierre amortiguado' : 'Soft-close seat',
                  desc: locale === 'es' ? 'Cierre suave sin golpes. Extraíble para fácil limpieza.' : 'Soft closing without slamming. Removable for easy cleaning.'
                },
                {
                  title: locale === 'es' ? 'Tecnología Rimless' : 'Rimless Technology',
                  desc: locale === 'es' ? 'Sin brida interior. Máxima higiene y fácil limpieza.' : 'No inner rim. Maximum hygiene and easy cleaning.'
                },
                {
                  title: locale === 'es' ? 'Salida universal' : 'Universal outlet',
                  desc: locale === 'es' ? 'Adaptable a salida horizontal (pared) o vertical (suelo).' : 'Adaptable to horizontal (wall) or vertical (floor) outlet.'
                },
                {
                  title: locale === 'es' ? 'Tratamiento antibacterias' : 'Antibacterial treatment',
                  desc: locale === 'es' ? 'Esmalte especial que inhibe crecimiento bacteriano.' : 'Special glaze that inhibits bacterial growth.'
                },
                {
                  title: locale === 'es' ? 'Diseño compacto' : 'Compact design',
                  desc: locale === 'es' ? 'Modelos de 48-52 cm de fondo para baños pequeños.' : '48-52 cm depth models for small bathrooms.'
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'Completa tu baño' : 'Complete your bathroom'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: locale === 'es' ? 'Venta de bañeras y platos' : 'Bathtubs and trays sales',
                  desc: locale === 'es'
                    ? 'Bañeras Roca, Fiora, Kaldewei y platos de ducha en resina, carga mineral y porcelánicos.'
                    : 'Roca, Fiora, Kaldewei bathtubs and resin, mineral cast and porcelain shower trays.'
                },
                {
                  title: locale === 'es' ? 'Grifos de lavabo' : 'Basin taps',
                  desc: locale === 'es'
                    ? 'Grifos Grohe, Hansgrohe y Roca. Múltiples acabados: cromado, negro mate, dorado.'
                    : 'Grohe, Hansgrohe and Roca taps. Multiple finishes: chrome, matt black, gold.'
                },
                {
                  title: locale === 'es' ? 'Mamparas de ducha' : 'Shower screens',
                  desc: locale === 'es'
                    ? 'Mamparas Profiltek, GME. Fijas, correderas, angulares. Vidrio templado 8mm.'
                    : 'Profiltek, GME screens. Fixed, sliding, corner. 8mm tempered glass.'
                },
                {
                  title: locale === 'es' ? 'Reforma completa' : 'Complete renovation',
                  desc: locale === 'es'
                    ? 'Reforma llave en mano de tu baño: alicatado, fontanería, electricidad, muebles.'
                    : 'Turnkey bathroom renovation: tiling, plumbing, electrical, furniture.'
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-black mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 md:mb-12 text-center">
              {locale === 'es' ? 'Servicios relacionados' : 'Related services'}
            </h2>
            <RelatedLinks links={relatedServices} />
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <CTASection
          title={tCta('readyToTransform')}
          description={tCta('freeVisitAndQuote')}
          buttons={[
            {
              text: tCta('requestFreeVisit'),
              href: `/${locale}#contacto`,
              variant: 'primary'
            }
          ]}
        />
      </div>
    </>
  )
}
