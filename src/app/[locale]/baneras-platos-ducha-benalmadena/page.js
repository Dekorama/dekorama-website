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
      ? 'Bañeras Acrílicas y Platos Ducha Benalmádena | Roca Fiora Dekorama'
      : 'Acrylic Bathtubs and Shower Trays Benalmádena | Roca Fiora Dekorama',
    description: locale === 'es'
      ? 'Venta de bañeras y platos de ducha en Benalmádena. Roca, Fiora, Kaldewei. Bañeras acrílicas, fundición. Platos resina, carga mineral, porcelánicos. Instalación opcional.'
      : 'Sale of bathtubs and shower trays in Benalmádena. Roca, Fiora, Kaldewei. Acrylic, cast iron bathtubs. Resin, mineral cast, porcelain shower trays. Optional installation.',
    openGraph: {
      title: locale === 'es' ? 'Bañeras y Platos Ducha Benalmádena' : 'Bathtubs and Shower Trays Benalmádena',
      description: locale === 'es' ? 'Venta e instalación de bañeras y platos premium' : 'Sale and installation of premium bathtubs and trays',
      url: `/${locale}/baneras-platos-ducha-benalmadena`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/baneras-platos-ducha-benalmadena`,
      languages: {
        'es': `${baseUrl}/es/baneras-platos-ducha-benalmadena`,
        'en': `${baseUrl}/en/baneras-platos-ducha-benalmadena`,
      }
    },
  }
}

export default async function BanerasPlatosDuchaPage({ params }) {
  const { locale } = await params
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Service'],
    name: locale === 'es' ? 'Bañeras y Platos de Ducha' : 'Bathtubs and Shower Trays',
    description: locale === 'es' 
      ? 'Venta de bañeras Roca, Fiora, Kaldewei y platos de ducha en Benalmádena. Todas las medidas y acabados.'
      : 'Sale of Roca, Fiora, Kaldewei bathtubs and shower trays in Benalmádena. All sizes and finishes.',
    category: locale === 'es' ? 'Bañeras y Platos de Ducha' : 'Bathtubs and Shower Trays',
    brand: [
      { '@type': 'Brand', 'name': 'Roca' },
      { '@type': 'Brand', 'name': 'Fiora' },
      { '@type': 'Brand', 'name': 'Kaldewei' }
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
    serviceType: locale === 'es' ? 'Instalación de bañeras y platos de ducha' : 'Bathtubs and shower trays installation',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    image: images.materials.baneras,
  }

  const caracteristicas = [
    {
      title: locale === 'es' ? 'Todas las medidas' : 'All sizes',
      description: locale === 'es'
        ? 'Platos de 70x70 hasta 200x80 cm. Bañeras desde 100 hasta 180 cm. Medidas especiales por encargo.'
        : 'Trays from 70x70 to 200x80 cm. Bathtubs from 100 to 180 cm. Special sizes on request.',
    },
    {
      title: locale === 'es' ? 'Instalación experta' : 'Expert installation',
      description: locale === 'es'
        ? 'Instaladores con formación de fábrica. Garantía de montaje correcto. Impermeabilización certificada.'
        : 'Installers with factory training. Guaranteed correct assembly. Certified waterproofing.',
    },
    {
      title: locale === 'es' ? 'Mejor precio garantizado' : 'Best price guaranteed',
      description: locale === 'es'
        ? 'Trabajamos directamente con fabricantes. Si encuentras más barato, igualamos precio.'
        : 'We work directly with manufacturers. If you find cheaper, we match the price.',
    },
    {
      title: locale === 'es' ? 'Reforma integral opcional' : 'Full renovation optional',
      description: locale === 'es'
        ? 'Si lo necesitas, hacemos reforma completa de baño: alicatado, fontanería, electricidad, muebles.'
        : 'If needed, we do complete bathroom renovation: tiling, plumbing, electrical, furniture.',
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
      title: locale === 'es' ? 'Mamparas de Ducha' : 'Shower Screens',
      description: locale === 'es' ? 'Profiltek, GME. Fijas, correderas, angulares' : 'Profiltek, GME. Fixed, sliding, corner',
      href: `/${locale}/mamparas-ducha-benalmadena`,
      image: images.materials.mamparas,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-black transition-colors">
                {locale === 'es' ? 'Inicio' : 'Home'}
              </Link>
              {' / '}
              <Link href="/materiales-premium" className="hover:text-black transition-colors">
                {locale === 'es' ? 'Tienda' : 'Store'}
              </Link>
              {' / '}
              <span className="text-black font-medium">
                {locale === 'es' ? 'Bañeras y Platos' : 'Bathtubs and Trays'}
              </span>
            </nav>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                  {locale === 'es' 
                    ? 'Bañeras y Platos de Ducha en Benalmádena'
                    : 'Bathtubs and Shower Trays in Benalmádena'
                  }
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  {locale === 'es'
                    ? 'Bañeras Roca, Fiora, Kaldewei y platos de ducha en resina, carga mineral y porcelánicos. Todas las medidas disponibles en nuestro showroom de Benalmádena.'
                    : 'Roca, Fiora, Kaldewei bathtubs and resin, mineral cast and porcelain shower trays. All sizes available in our Benalmádena showroom.'
                  }
                </p>
                <div className="bg-white p-6 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {locale === 'es' ? 'Servicios completos:' : 'Complete services:'}
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      {locale === 'es' ? 'Venta de bañeras y platos' : 'Bathtubs and trays sales'}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      {locale === 'es' ? 'Instalación profesional' : 'Professional installation'}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      {locale === 'es' ? 'Cambio bañera por ducha' : 'Bathtub to shower conversion'}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      {locale === 'es' ? 'Reforma completa de baño' : 'Complete bathroom renovation'}
                    </li>
                  </ul>
                </div>
                <Link
                  href="/#contacto"
                  className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300"
                >
                  {locale === 'es' ? 'Visitar tienda o pedir presupuesto' : 'Visit store or request quote'}
                </Link>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={images.materials.baneras}
                  alt={locale === 'es' ? 'Bañeras platos ducha Benalmádena' : 'Bathtubs shower trays Benalmádena'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tipos de bañeras */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
              {locale === 'es' ? 'Bañeras disponibles' : 'Available bathtubs'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Todas las medidas estándar: 140x70, 150x70, 160x70, 170x70, 180x80 cm'
                : 'All standard sizes: 140x70, 150x70, 160x70, 170x70, 180x80 cm'
              }
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: locale === 'es' ? 'Bañeras acrílicas' : 'Acrylic bathtubs',
                  desc: locale === 'es' 
                    ? 'Ligeras y cálidas al tacto. Fácil instalación. Resistentes a golpes. Mantienen el calor del agua. Precio ajustado.'
                    : 'Lightweight and warm to touch. Easy installation. Impact resistant. Maintain water heat. Affordable price.'
                },
                {
                  title: locale === 'es' ? 'Bañeras de fundición' : 'Cast iron bathtubs',
                  desc: locale === 'es'
                    ? 'Máxima durabilidad. Esmaltado porcelánico. Mantienen temperatura largos baños. Diseño clásico.'
                    : 'Maximum durability. Porcelain enamel. Maintain temperature for long baths. Classic design.'
                },
                {
                  title: locale === 'es' ? 'Bañeras exentas' : 'Freestanding bathtubs',
                  desc: locale === 'es'
                    ? 'Centro del baño. Diseño espectacular. Ovales, rectangulares. Grifería de suelo o pared.'
                    : 'Bathroom centerpiece. Spectacular design. Oval, rectangular. Floor or wall taps.'
                },
                {
                  title: locale === 'es' ? 'Bañeras con hidromasaje' : 'Whirlpool bathtubs',
                  desc: locale === 'es'
                    ? 'Jets de agua y aire. Efecto relajante. Sistemas Jacuzzi. Instalación eléctrica necesaria.'
                    : 'Water and air jets. Relaxing effect. Jacuzzi systems. Electrical installation required.'
                },
                {
                  title: locale === 'es' ? 'Bañeras angulares' : 'Corner bathtubs',
                  desc: locale === 'es'
                    ? 'Aprovechan esquinas. Mayor capacidad. Ideales para baños grandes. Asimétricas disponibles.'
                    : 'Use corners. Greater capacity. Ideal for large bathrooms. Asymmetric available.'
                },
                {
                  title: locale === 'es' ? 'Bañeras compactas' : 'Compact bathtubs',
                  desc: locale === 'es'
                    ? 'Tamaños reducidos desde 100x70 cm. Para baños pequeños o aseos. Con o sin asiento.'
                    : 'Reduced sizes from 100x70 cm. For small bathrooms. With or without seat.'
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tipos de platos de ducha */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
              {locale === 'es' ? 'Platos de ducha disponibles' : 'Available shower trays'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Todas las medidas: cuadrados, rectangulares, angulares. Altura extraplana 2-3 cm'
                : 'All sizes: square, rectangular, corner. Ultra-flat height 2-3 cm'
              }
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: locale === 'es' ? 'Platos de resina' : 'Resin shower trays',
                  desc: locale === 'es' 
                    ? 'Material Stonex o similar. Textura piedra natural. Antideslizantes Clase 3. Tacto cálido. Muy resistentes. Recortables in situ.'
                    : 'Stonex or similar material. Natural stone texture. Class 3 anti-slip. Warm touch. Very resistant. Cut-to-size on site.',
                  popular: true
                },
                {
                  title: locale === 'es' ? 'Platos de carga mineral' : 'Mineral cast trays',
                  desc: locale === 'es'
                    ? 'Compuesto de minerales y resina. Superficie lisa. Múltiples acabados mate. Alta resistencia térmica y mecánica. Reparables.'
                    : 'Compound of minerals and resin. Smooth surface. Multiple matt finishes. High thermal and mechanical resistance. Repairable.',
                  popular: true
                },
                {
                  title: locale === 'es' ? 'Platos porcelánicos' : 'Porcelain trays',
                  desc: locale === 'es'
                    ? 'Gres porcelánico. Acabado antideslizante. Económicos. Buena durabilidad. Requieren base de mortero. Medidas estándar.'
                    : 'Porcelain stoneware. Anti-slip finish. Economical. Good durability. Require mortar base. Standard sizes.'
                },
              ].map((item, index) => (
                <div key={index} className={`p-8 rounded-lg ${item.popular ? 'bg-black text-white' : 'bg-white'}`}>
                  {item.popular && (
                    <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold rounded mb-3">
                      {locale === 'es' ? 'MÁS VENDIDO' : 'BEST SELLER'}
                    </span>
                  )}
                  <h3 className={`text-2xl font-semibold mb-3 ${item.popular ? 'text-white' : 'text-black'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${item.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marcas */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'Marcas de confianza' : 'Trusted brands'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  brand: 'Roca',
                  desc: locale === 'es'
                    ? 'Líder español. Bañeras y platos de todas las gamas. Garantía oficial. Servicio postventa excelente.'
                    : 'Spanish leader. Bathtubs and trays of all ranges. Official warranty. Excellent after-sales service.'
                },
                {
                  brand: 'Fiora',
                  desc: locale === 'es'
                    ? 'Especialistas en platos de ducha Stonex. Made in Spain. Textura piedra natural. Garantía 10 años.'
                    : 'Specialists in Stonex shower trays. Made in Spain. Natural stone texture. 10-year warranty.'
                },
                {
                  brand: 'Kaldewei',
                  desc: locale === 'es'
                    ? 'Premium alemán. Bañeras de acero esmaltado. Durabilidad excepcional. Diseños award-winning.'
                    : 'German premium. Enamelled steel bathtubs. Exceptional durability. Award-winning designs.'
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

        {/* Servicio cambio bañera por ducha */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {locale === 'es' ? 'Cambio de bañera por plato de ducha' : 'Bathtub to shower tray conversion'}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {locale === 'es'
                ? 'Servicio completo en 1-2 días. Retiramos tu bañera antigua, preparamos base, instalamos plato nuevo, alicatamos, instalamos mampara y grifería. Dejamos todo funcionando y limpio.'
                : 'Complete service in 1-2 days. We remove your old bathtub, prepare base, install new tray, tile, install screen and taps. We leave everything working and clean.'
              }
            </p>
            <div className="grid md:grid-cols-4 gap-4 text-center mb-8">
              {[
                locale === 'es' ? 'Retirada bañera' : 'Bathtub removal',
                locale === 'es' ? 'Instalación plato' : 'Tray installation',
                locale === 'es' ? 'Alicatado zona' : 'Area tiling',
                locale === 'es' ? 'Mampara + grifería' : 'Screen + taps',
              ].map((step, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold mx-auto mb-2">
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-black">{step}</p>
                </div>
              ))}
            </div>
            <Link
              href="/#contacto"
              className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300"
            >
              {locale === 'es' ? 'Pedir presupuesto cambio bañera por ducha' : 'Request bathtub conversion quote'}
            </Link>
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
