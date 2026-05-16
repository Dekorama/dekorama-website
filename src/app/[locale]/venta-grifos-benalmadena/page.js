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
  const t = await getTranslations({ locale })
  
  return {
    title: locale === 'es' 
      ? 'Venta Grifos Grohe y Roca Benalmádena | Tienda Dekorama Málaga'
      : 'Grohe and Roca Taps Sale Benalmádena | Dekorama Store Málaga',
    description: locale === 'es'
      ? 'Tienda de grifos en Benalmádena. Venta de grifos Grohe, Hansgrohe y Roca para baño y cocina. Grifos de lavabo, ducha, bañera. Showroom físico. Instalación opcional.'
      : 'Taps store in Benalmádena. Sale of Grohe, Hansgrohe and Roca taps for bathroom and kitchen. Basin, shower, bathtub taps. Physical showroom. Optional installation.',
    openGraph: {
      title: locale === 'es' ? 'Venta Grifos Benalmádena - Grohe, Roca, Hansgrohe' : 'Taps Sale Benalmádena - Grohe, Roca, Hansgrohe',
      description: locale === 'es' ? 'Tienda de grifería premium en Benalmádena' : 'Premium taps store in Benalmádena',
      url: `/${locale}/venta-grifos-benalmadena`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/venta-grifos-benalmadena`,
      languages: {
        'es': `${baseUrl}/es/venta-grifos-benalmadena`,
        'en': `${baseUrl}/en/venta-grifos-benalmadena`,
      }
    },
  }
}

export default async function VentaGrifosPage({ params }) {
  const { locale } = await params
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Service'],
    name: locale === 'es' ? 'Grifos Grohe y Roca' : 'Grohe and Roca Taps',
    description: locale === 'es' 
      ? 'Venta de grifos Grohe, Hansgrohe y Roca en Benalmádena. Grifos de lavabo, ducha, bañera y cocina.'
      : 'Sale of Grohe, Hansgrohe and Roca taps in Benalmádena. Basin, shower, bathtub and kitchen taps.',
    category: locale === 'es' ? 'Grifería' : 'Taps',
    brand: [
      { '@type': 'Brand', 'name': 'Grohe' },
      { '@type': 'Brand', 'name': 'Hansgrohe' },
      { '@type': 'Brand', 'name': 'Roca' }
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
    serviceType: locale === 'es' ? 'Instalación de grifería' : 'Taps installation',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    image: images.materials.grifos,
  }

  const caracteristicas = [
    {
      title: locale === 'es' ? 'Showroom físico' : 'Physical showroom',
      description: locale === 'es'
        ? 'Ven a nuestra tienda en Benalmádena, prueba los grifos, compara acabados y recibe asesoramiento experto.'
        : 'Come to our Benalmádena store, test the taps, compare finishes and receive expert advice.',
    },
    {
      title: locale === 'es' ? 'Mejor precio garantizado' : 'Best price guaranteed',
      description: locale === 'es'
        ? 'Trabajamos directamente con fabricantes. Si encuentras un precio mejor, te lo igualamos.'
        : "We work directly with manufacturers. If you find a better price, we'll match it.",
    },
    {
      title: locale === 'es' ? 'Directo de fábrica' : 'Direct from factory',
      description: locale === 'es'
        ? 'Trabajamos bajo pedido directo de fábrica para asegurar acabados y referencias exactas. Plazo habitual de entrega: 7-14 días.'
        : 'We work with direct factory orders to secure the exact finish and reference. Typical delivery time: 7-14 days.',
    },
    {
      title: locale === 'es' ? 'Instalación profesional opcional' : 'Optional professional installation',
      description: locale === 'es'
        ? 'Si lo prefieres, instalamos los grifos con garantía total. También ofrecemos reforma completa de baño o cocina.'
        : 'If you prefer, we install the taps with full warranty. We also offer complete bathroom or kitchen renovation.',
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
      description: locale === 'es' ? 'Profiltek, GME, Kassandra. Vidrio templado 8mm' : 'Profiltek, GME, Kassandra. 8mm tempered glass',
      href: `/${locale}/mamparas-ducha-benalmadena`,
      image: images.materials.mamparas,
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
          { label: locale === 'es' ? 'Grifos' : 'Taps', href: null }
        ]}
        title={locale === 'es' ? 'Venta de Grifos en Benalmádena' : 'Taps Sale in Benalmádena'}
        subtitle={locale === 'es'
          ? 'Grifos Grohe, Hansgrohe y Roca en nuestro showroom de Benalmádena. Amplia selección de grifos de lavabo, ducha termostáticos, bañera y cocina extraíbles.'
          : 'Grohe, Hansgrohe and Roca taps in our Benalmádena showroom. Wide selection of basin, thermostatic shower, bathtub and pull-out kitchen taps.'
        }
        heroImage={images.materials.grifos}
        heroImageAlt={locale === 'es' ? 'Grifos Grohe y Roca Benalmádena' : 'Grohe and Roca taps Benalmádena'}
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
            {locale === 'es' ? '¿Por qué comprar en Dekorama?' : 'Why buy at Dekorama?'}
          </h2>
          <ServiceGrid items={caracteristicas} columns={4} />
        </div>
      </section>

        {/* Tipos de grifos */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'Tipos de grifos disponibles' : 'Available tap types'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: locale === 'es' ? 'Grifos de lavabo' : 'Basin taps',
                  desc: locale === 'es' 
                    ? 'Monomando, bimando, altos, de caño bajo. Acabados cromados, negro mate, dorados.'
                    : 'Single-lever, dual-handle, high, low-spout. Chrome, matt black, gold finishes.'
                },
                {
                  title: locale === 'es' ? 'Grifos de ducha' : 'Shower taps',
                  desc: locale === 'es'
                    ? 'Termostáticos con regulación de temperatura. Empotrados o de superficie. Con o sin ducha de mano.'
                    : 'Thermostatic with temperature control. Concealed or surface-mounted. With or without hand shower.'
                },
                {
                  title: locale === 'es' ? 'Grifos de bañera' : 'Bathtub taps',
                  desc: locale === 'es'
                    ? 'Cascada, empotrados, de repisa. Con inversor para ducha de mano. Diseños modernos y clásicos.'
                    : 'Waterfall, concealed, deck-mounted. With diverter for hand shower. Modern and classic designs.'
                },
                {
                  title: locale === 'es' ? 'Grifos de cocina' : 'Kitchen taps',
                  desc: locale === 'es'
                    ? 'Extraíbles con manguera, caño alto, con ducha. Sistemas de filtrado integrado disponibles.'
                    : 'Pull-out with hose, high spout, with spray. Integrated filtering systems available.'
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

        {/* Marcas */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-6">
              {locale === 'es' ? 'Trabajamos con las mejores marcas' : 'We work with the best brands'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Calidad alemana y española garantizada. Grifos con garantía del fabricante de hasta 5 años.'
                : 'Guaranteed German and Spanish quality. Taps with manufacturer\'s warranty of up to 5 years.'
              }
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  brand: 'Grohe',
                  desc: locale === 'es'
                    ? 'Marca alemana líder mundial. Tecnología CoolTouch y EcoJoy para ahorro de agua.'
                    : 'Leading German brand worldwide. CoolTouch and EcoJoy technology for water savings.'
                },
                {
                  brand: 'Hansgrohe',
                  desc: locale === 'es'
                    ? 'Diseño y tecnología alemana. Sistemas termostáticos de máxima precisión.'
                    : 'German design and technology. High-precision thermostatic systems.'
                },
                {
                  brand: 'Roca',
                  desc: locale === 'es'
                    ? 'Marca española de referencia. Excelente relación calidad-precio. Amplio catálogo.'
                    : 'Leading Spanish brand. Excellent value for money. Extensive catalogue.'
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

        {/* Ventajas */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'También te puede interesar' : 'You might also be interested in'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: locale === 'es' ? 'Mamparas de ducha' : 'Shower screens',
                  desc: locale === 'es'
                    ? 'Profiltek, GME, Kassandra. Vidrio templado 8mm. Fijas, correderas, angulares.'
                    : 'Profiltek, GME, Kassandra. 8mm tempered glass. Fixed, sliding, corner.'
                },
                {
                  title: locale === 'es' ? 'Inodoros suspendidos' : 'Wall-hung toilets',
                  desc: locale === 'es'
                    ? 'Roca, Duravit. Descarga dual eco. Instalación profesional disponible.'
                    : 'Roca, Duravit. Eco dual flush. Professional installation available.'
                },
                {
                  title: locale === 'es' ? 'Bañeras y platos de ducha' : 'Bathtubs and shower trays',
                  desc: locale === 'es'
                    ? 'Roca, Fiora, Kaldewei. Todas las medidas. Instalación incluida.'
                    : 'Roca, Fiora, Kaldewei. All sizes. Installation included.'
                },
                {
                  title: locale === 'es' ? 'Reforma completa de baño' : 'Complete bathroom renovation',
                  desc: locale === 'es'
                    ? 'Reforma llave en mano con instalación de todos los materiales.'
                    : 'Turnkey renovation with installation of all materials.'
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
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
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
