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
      ? 'Mamparas Ducha Benalmádena | Profiltek GME Kassandra | Dekorama'
      : 'Shower Screens Benalmádena | Profiltek GME Kassandra | Dekorama',
    description: locale === 'es'
      ? 'Venta de mamparas de ducha y bañera en Benalmádena. Profiltek, GME, Kassandra. Fijas, correderas, angulares. Vidrio templado 8mm. Showroom físico. Instalación opcional.'
      : 'Sale of shower and bathtub screens in Benalmádena. Profiltek, GME, Kassandra. Fixed, sliding, corner. 8mm tempered glass. Physical showroom. Optional installation.',
    openGraph: {
      title: locale === 'es' ? 'Mamparas Ducha Benalmádena' : 'Shower Screens Benalmádena',
      description: locale === 'es' ? 'Venta e instalación de mamparas premium' : 'Sale and installation of premium shower screens',
      url: `/${locale}/mamparas-ducha-benalmadena`,
    },
    alternates: { 
      canonical: `${baseUrl}/${locale}/mamparas-ducha-benalmadena`,
      languages: {
        'es': `${baseUrl}/es/mamparas-ducha-benalmadena`,
        'en': `${baseUrl}/en/mamparas-ducha-benalmadena`,
      }
    },
  }
}

export default async function MamparasDuchaPage({ params }) {
  const { locale } = await params
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const tCommon = await getTranslations({ locale, namespace: 'breadcrumb' })
  
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Service'],
    name: locale === 'es' ? 'Mamparas de Ducha y Bañera' : 'Shower and Bathtub Screens',
    description: locale === 'es' 
      ? 'Venta de mamparas Profiltek, GME y Kassandra en Benalmádena. Mamparas fijas, correderas, angulares y plegables.'
      : 'Sale of Profiltek, GME and Kassandra screens in Benalmádena. Fixed, sliding, corner and folding screens.',
    category: locale === 'es' ? 'Mamparas' : 'Shower Screens',
    brand: [
      { '@type': 'Brand', 'name': 'Profiltek' },
      { '@type': 'Brand', 'name': 'GME' },
      { '@type': 'Brand', 'name': 'Kassandra' }
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
    serviceType: locale === 'es' ? 'Instalación de mamparas' : 'Shower screens installation',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dekorama',
      '@id': `${baseUrl}/#business`,
    },
    image: images.materials.mamparas,
  }

  const caracteristicas = [
    {
      title: locale === 'es' ? 'Medición a domicilio gratuita' : 'Free home measurement',
      description: locale === 'es'
        ? 'Nuestro técnico toma medidas en tu baño sin costo. Garantizamos ajuste perfecto.'
        : 'Our technician takes measurements in your bathroom at no cost. We guarantee perfect fit.',
    },
    {
      title: locale === 'es' ? 'Mamparas a medida' : 'Custom screens',
      description: locale === 'es'
        ? 'Fabricamos según tus medidas exactas. Para platos estándar y especiales.'
        : 'We manufacture to your exact measurements. For standard and special trays.',
    },
    {
      title: locale === 'es' ? 'Instalación profesional incluible' : 'Professional installation available',
      description: locale === 'es'
        ? 'Instaladores especializados con años de experiencia. Montaje perfecto y sellado garantizado.'
        : 'Specialized installers with years of experience. Perfect assembly and guaranteed sealing.',
    },
    {
      title: locale === 'es' ? 'Garantía total' : 'Full warranty',
      description: locale === 'es'
        ? 'Garantía del fabricante de hasta 10 años. Si hay problema, lo solucionamos.'
        : "Manufacturer's warranty of up to 10 years. If there's a problem, we solve it.",
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
      title: locale === 'es' ? 'Platos de Ducha' : 'Shower Trays',
      description: locale === 'es' ? 'Resina, carga mineral, todas las medidas' : 'Resin, mineral cast, all sizes',
      href: `/${locale}/baneras-platos-ducha-benalmadena`,
      image: images.materials.baneras,
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
          { label: locale === 'es' ? 'Mamparas de Ducha' : 'Shower Screens', href: null }
        ]}
        title={locale === 'es' ? 'Mamparas de Ducha en Benalmádena' : 'Shower Screens in Benalmádena'}
        subtitle={locale === 'es'
          ? 'Mamparas Profiltek, GME y Kassandra en nuestro showroom. Vidrio templado 8mm con tratamiento antical. Fijas, correderas, angulares y plegables.'
          : 'Profiltek, GME and Kassandra screens in our showroom. 8mm tempered glass with anti-lime treatment. Fixed, sliding, corner and folding.'
        }
        heroImage={images.materials.mamparas}
        heroImageAlt={locale === 'es' ? 'Mamparas ducha Benalmádena' : 'Shower screens Benalmádena'}
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
            {locale === 'es' ? '¿Por qué comprar mamparas en Dekorama?' : 'Why buy screens at Dekorama?'}
          </h2>
          <ServiceGrid items={caracteristicas} columns={4} />
        </div>
      </section>

        {/* Tipos de mamparas */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'Tipos de mamparas disponibles' : 'Available screen types'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: locale === 'es' ? 'Mamparas fijas' : 'Fixed screens',
                  desc: locale === 'es' 
                    ? 'Panel único de vidrio sin perfiles. Diseño minimalista y fácil limpieza. Ideal para duchas amplias.'
                    : 'Single glass panel without profiles. Minimalist design and easy cleaning. Ideal for spacious showers.'
                },
                {
                  title: locale === 'es' ? 'Mamparas correderas' : 'Sliding screens',
                  desc: locale === 'es'
                    ? '2 o más hojas deslizantes. Perfectas para espacios reducidos. Sistema de rodamientos de alta calidad.'
                    : '2 or more sliding panels. Perfect for tight spaces. High-quality bearing system.'
                },
                {
                  title: locale === 'es' ? 'Mamparas angulares' : 'Corner screens',
                  desc: locale === 'es'
                    ? 'Para platos de ducha en esquina. Cuadradas, rectangulares o semicirculares. Máximo aprovechamiento.'
                    : 'For corner shower trays. Square, rectangular or semicircular. Maximum use of space.'
                },
                {
                  title: locale === 'es' ? 'Mamparas plegables' : 'Folding screens',
                  desc: locale === 'es'
                    ? 'Hojas que se pliegan. Ideal para baños muy pequeños o bañeras. Acceso completo cuando está abierta.'
                    : 'Folding panels. Ideal for very small bathrooms or bathtubs. Full access when open.'
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
              {locale === 'es' ? 'Marcas líderes en mamparas' : 'Leading screen brands'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {locale === 'es'
                ? 'Fabricantes españoles de reconocido prestigio con garantía de hasta 10 años.'
                : 'Renowned Spanish manufacturers with up to 10 years warranty.'
              }
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  brand: 'Profiltek',
                  desc: locale === 'es'
                    ? 'Líder español. Tecnología Clean Glass antical permanente. Diseños exclusivos y personalizables.'
                    : 'Spanish leader. Permanent Clean Glass anti-lime technology. Exclusive and customizable designs.'
                },
                {
                  brand: 'GME',
                  desc: locale === 'es'
                    ? 'Especialistas en mamparas a medida. Amplia gama de acabados. Excelente relación calidad-precio.'
                    : 'Custom screen specialists. Wide range of finishes. Excellent value for money.'
                },
                {
                  brand: 'Kassandra',
                  desc: locale === 'es'
                    ? 'Innovación y diseño. Sistemas de apertura patentados. Vidrios con tratamientos premium.'
                    : 'Innovation and design. Patented opening systems. Glass with premium treatments.'
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

        {/* Opciones y acabados */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'Opciones y acabados' : 'Options and finishes'}
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">
                  {locale === 'es' ? 'Tipos de vidrio' : 'Glass types'}
                </h3>
                <ul className="space-y-3">
                  {[
                    locale === 'es' ? 'Transparente: Cristal claro para máxima luminosidad' : 'Clear: Transparent glass for maximum brightness',
                    locale === 'es' ? 'Mate (ácido): Translúcido, da privacidad' : 'Matt (acid): Translucent, provides privacy',
                    locale === 'es' ? 'Serigrafiado: Diseños decorativos' : 'Screen-printed: Decorative designs',
                    locale === 'es' ? 'Ahumado: Tono gris elegante' : 'Smoked: Elegant grey tone',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-black font-bold mt-1">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6">
                  {locale === 'es' ? 'Acabados de perfiles' : 'Profile finishes'}
                </h3>
                <ul className="space-y-3">
                  {[
                    locale === 'es' ? 'Cromo: Brillo espejo, clásico' : 'Chrome: Mirror shine, classic',
                    locale === 'es' ? 'Negro mate: Moderno y elegante' : 'Matt black: Modern and elegant',
                    locale === 'es' ? 'Plata: Aluminio natural' : 'Silver: Natural aluminium',
                    locale === 'es' ? 'Blanco: Para baños minimalistas' : 'White: For minimalist bathrooms',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-black font-bold mt-1">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
              {locale === 'es' ? 'Completa tu baño' : 'Complete your bathroom'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: locale === 'es' ? 'Grifos de ducha' : 'Shower taps',
                  desc: locale === 'es'
                    ? 'Grifos termostáticos Grohe y Hansgrohe con regulación de temperatura.'
                    : 'Grohe and Hansgrohe thermostatic taps with temperature control.'
                },
                {
                  title: locale === 'es' ? 'Platos de ducha' : 'Shower trays',
                  desc: locale === 'es'
                    ? 'Resina, carga mineral, todas las medidas. Platos extraplanos 2-3 cm.'
                    : 'Resin, mineral cast, all sizes. Ultra-flat trays 2-3 cm.'
                },
                {
                  title: locale === 'es' ? 'Mamparas a medida' : 'Custom screens',
                  desc: locale === 'es'
                    ? 'Fabricamos según tus medidas exactas. Para platos estándar y especiales.'
                    : 'We manufacture to your exact measurements. For standard and special trays.'
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
