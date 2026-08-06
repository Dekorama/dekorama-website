import { Link } from '@/i18n/navigation'
import { baseUrl } from '@/lib/site'
import { buildProductJsonLd } from '@/lib/productSchema'
import { getTranslations } from 'next-intl/server'
import PageHeader from '@/components/PageHeader'
import RelatedLinks from '@/components/RelatedLinks'
import CTASection from '@/components/CTASection'
import { productImages, buildRelatedLinks } from '@/data/productPages'

const HERO = productImages.mamparas

export async function generateMetadata({ params }) {
  const { locale } = await params
  const isEs = locale === 'es'

  return {
    title: isEs
      ? 'Mamparas de Ducha | Profiltek Spazia Castel | Dekorama'
      : 'Shower Screens | Profiltek Spazia Castel | Dekorama',
    description: isEs
      ? 'Venta de mamparas de ducha y bañera. Profiltek, Spazia, Castel. Vidrio templado 8mm. Showroom físico. Instalación opcional.'
      : 'Sale of shower and bathtub screens. Profiltek, Spazia, Castel. 8mm tempered glass. Physical showroom. Optional installation.',
    openGraph: {
      title: isEs ? 'Mamparas de ducha' : 'Shower screens',
      description: isEs ? 'Venta e instalación de mamparas premium' : 'Sale and installation of premium shower screens',
      url: `/${locale}/mamparas`,
      images: [{ url: HERO }],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/mamparas`,
      languages: {
        es: `${baseUrl}/es/mamparas`,
        en: `${baseUrl}/en/mamparas`,
      },
    },
  }
}

export default async function MamparasDuchaPage({ params }) {
  const { locale } = await params
  const tCta = await getTranslations({ locale, namespace: 'cta' })
  const isEs = locale === 'es'

  const productJsonLd = buildProductJsonLd({
    type: ['Product', 'Service'],
    name: isEs ? 'Mamparas de Ducha y Bañera' : 'Shower and Bathtub Screens',
    description: isEs
      ? 'Venta de mamparas Profiltek, Spazia y Castel.'
      : 'Sale of Profiltek, Spazia and Castel screens.',
    brand: [
      { '@type': 'Brand', name: 'Profiltek' },
      { '@type': 'Brand', name: 'Spazia' },
      { '@type': 'Brand', name: 'Castel' },
    ],
    imagePath: HERO,
    offerKey: 'mamparas',
  })

  const features = [
    {
      title: isEs ? 'Medición gratuita' : 'Free measurement',
      description: isEs
        ? 'Técnico a domicilio sin costo. Ajuste perfecto garantizado.'
        : 'Technician at home at no cost. Perfect fit guaranteed.',
    },
    {
      title: isEs ? 'A medida' : 'Custom made',
      description: isEs
        ? 'Fabricamos según tus medidas. Platos estándar y especiales.'
        : 'Made to your measurements. Standard and special trays.',
    },
    {
      title: isEs ? 'Instalación experta' : 'Expert installation',
      description: isEs
        ? 'Montaje y sellado profesional con garantía.'
        : 'Professional assembly and sealing with warranty.',
    },
    {
      title: isEs ? 'Garantía total' : 'Full warranty',
      description: isEs
        ? 'Hasta 10 años de garantía del fabricante.'
        : 'Up to 10 years manufacturer warranty.',
    },
  ]

  const types = [
    {
      title: isEs ? 'Mamparas fijas' : 'Fixed screens',
      desc: isEs
        ? 'Panel único sin perfiles. Minimalista y fácil de limpiar.'
        : 'Single panel without profiles. Minimalist and easy to clean.',
    },
    {
      title: isEs ? 'Mamparas correderas' : 'Sliding screens',
      desc: isEs
        ? 'Hojas deslizantes. Ideales para espacios reducidos.'
        : 'Sliding panels. Ideal for tight spaces.',
    },
    {
      title: isEs ? 'Mamparas angulares' : 'Corner screens',
      desc: isEs
        ? 'Para platos en esquina. Cuadradas, rectangulares o semicirculares.'
        : 'For corner trays. Square, rectangular or semicircular.',
    },
    {
      title: isEs ? 'Mamparas plegables' : 'Folding screens',
      desc: isEs
        ? 'Hojas que se pliegan. Perfectas para baños pequeños o bañeras.'
        : 'Folding panels. Perfect for small bathrooms or bathtubs.',
    },
  ]

  const brands = [
    {
      brand: 'Profiltek',
      desc: isEs
        ? 'Líder español. Clean Glass antical permanente.'
        : 'Spanish leader. Permanent Clean Glass anti-lime.',
    },
    {
      brand: 'Spazia',
      desc: isEs
        ? 'Especialistas a medida. Excelente calidad-precio.'
        : 'Custom specialists. Excellent value.',
    },
    {
      brand: 'Castel',
      desc: isEs
        ? 'Innovación y diseños con tratamientos premium.'
        : 'Innovation and designs with premium treatments.',
    },
  ]

  const finishes = {
    glass: isEs
      ? ['Transparente', 'Mate (ácido)', 'Serigrafiado', 'Ahumado']
      : ['Clear', 'Matt (acid)', 'Screen-printed', 'Smoked'],
    profiles: isEs
      ? ['Cromo', 'Negro mate', 'Plata', 'Blanco']
      : ['Chrome', 'Matt black', 'Silver', 'White'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <div className="min-h-screen bg-white">
        <PageHeader
          title={isEs ? 'Mamparas de ducha' : 'Shower screens'}
          subtitle={
            isEs
              ? 'Profiltek, Spazia y Castel. Vidrio templado 8mm con tratamiento antical. Fijas, correderas, angulares y plegables.'
              : 'Profiltek, Spazia and Castel. 8mm tempered glass with anti-lime treatment. Fixed, sliding, corner and folding.'
          }
          heroImage={HERO}
          heroImageAlt={isEs ? 'Mamparas de ducha' : 'Shower screens'}
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
              {isEs ? '¿Por qué comprar mamparas en Dekorama?' : 'Why buy screens at Dekorama?'}
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
              {isEs ? 'Tipos de mamparas' : 'Screen types'}
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
              {isEs ? 'Marcas líderes' : 'Leading brands'}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-gray-600">
              {isEs
                ? 'Fabricantes españoles con garantía de hasta 10 años.'
                : 'Spanish manufacturers with up to 10 years warranty.'}
            </p>
            <div className="grid gap-10 md:grid-cols-3">
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
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 font-heading text-2xl font-normal tracking-tight text-black">
                {isEs ? 'Tipos de vidrio' : 'Glass types'}
              </h3>
              <ul className="space-y-3">
                {finishes.glass.map((item) => (
                  <li key={item} className="border-t border-gray-300 pt-3 text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 font-heading text-2xl font-normal tracking-tight text-black">
                {isEs ? 'Acabados de perfiles' : 'Profile finishes'}
              </h3>
              <ul className="space-y-3">
                {finishes.profiles.map((item) => (
                  <li key={item} className="border-t border-gray-300 pt-3 text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-editorial">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-normal tracking-tight text-black md:text-4xl">
              {isEs ? 'Visita nuestro showroom' : 'Visit our showroom'}
            </h2>
            <p className="mb-8 text-gray-600">
              {isEs
                ? 'Ven a ver mamparas reales en nuestro showroom. Medición a domicilio sin compromiso.'
                : 'See real screens in our showroom. Home measurement with no obligation.'}
            </p>
            <Link href={`/${locale}/contacto`} className="btn-primary">
              {tCta('requestFreeVisit')}
            </Link>
          </div>
        </section>

        <RelatedLinks
          title={isEs ? 'Servicios relacionados' : 'Related services'}
          links={buildRelatedLinks(/** @type {'es'|'en'} */ (locale), ['baneras', 'grifos', 'banos'])}
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
