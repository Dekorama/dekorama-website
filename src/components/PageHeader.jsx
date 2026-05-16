import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb, { generateBreadcrumbSchema } from './Breadcrumb'

/**
 * PageHeader Component - Unified Header for All Pages
 * 
 * Provides consistent page headers with breadcrumbs, titles, descriptions,
 * optional hero images, and CTAs. Supports multiple layout variants.
 * 
 * @param {Array} breadcrumbItems - Breadcrumb navigation items
 * @param {string} title - Page title (h1)
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} heroImage - Optional hero image URL
 * @param {string} heroImageAlt - Alt text for hero image
 * @param {Object} ctaPrimary - Primary CTA: { text, href }
 * @param {Object} ctaSecondary - Secondary CTA: { text, href }
 * @param {boolean} centered - Center content (no image layout)
 * @param {string} baseUrl - Base URL for structured data
 * @param {string} className - additional CSS classes
 * 
 * @example
 * // Split layout with image
 * <PageHeader 
 *   breadcrumbItems={[
 *     { label: 'Home', href: '/es' },
 *     { label: 'Cocinas', href: null }
 *   ]}
 *   title="Cocinas a Medida"
 *   subtitle="Diseñamos la cocina de tus sueños"
 *   heroImage="/images/cocinas.jpg"
 *   heroImageAlt="Cocina moderna"
 *   ctaPrimary={{ text: 'Solicitar Presupuesto', href: '/contacto' }}
 *   ctaSecondary={{ text: 'Ver Proyectos', href: '/proyectos' }}
 *   baseUrl="https://www.dekoramagroup.com"
 * />
 * 
 * @example
 * // Centered layout without image
 * <PageHeader 
 *   breadcrumbItems={[{ label: 'Home', href: '/es' }, { label: 'Contacto', href: null }]}
 *   title="Contacto"
 *   subtitle="Estamos aquí para ayudarte"
 *   centered
 * />
 */
export default function PageHeader({
  breadcrumbItems = [],
  title,
  subtitle,
  heroImage,
  heroImageAlt = '',
  ctaPrimary,
  ctaSecondary,
  centered = false,
  baseUrl = 'https://www.dekoramagroup.com',
  className = ''
}) {
  // Generate structured data for breadcrumbs
  const structuredData = breadcrumbItems.length > 0 
    ? generateBreadcrumbSchema(breadcrumbItems, baseUrl)
    : null

  // Centered layout (no image)
  if (centered || !heroImage) {
    return (
      <section className={`section-header ${className}`}>
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          {breadcrumbItems.length > 0 && (
            <Breadcrumb 
              items={breadcrumbItems} 
              structuredData={structuredData}
            />
          )}

          {/* Centered Content */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                {subtitle}
              </p>
            )}

            {/* CTAs */}
            {(ctaPrimary || ctaSecondary) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {ctaPrimary && (
                  <Link href={ctaPrimary.href} className="btn-primary">
                    {ctaPrimary.text}
                  </Link>
                )}
                {ctaSecondary && (
                  <Link href={ctaSecondary.href} className="btn-secondary">
                    {ctaSecondary.text}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Split layout with image
  return (
    <section className={`section-header ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        {breadcrumbItems.length > 0 && (
          <Breadcrumb 
            items={breadcrumbItems} 
            structuredData={structuredData}
          />
        )}

        {/* Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl text-gray-600 leading-relaxed mb-10">
                {subtitle}
              </p>
            )}

            {/* CTAs */}
            {(ctaPrimary || ctaSecondary) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {ctaPrimary && (
                  <Link href={ctaPrimary.href} className="btn-primary">
                    {ctaPrimary.text}
                  </Link>
                )}
                {ctaSecondary && (
                  <Link href={ctaSecondary.href} className="btn-secondary">
                    {ctaSecondary.text}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative aspect-[4/3] lg:aspect-[3/2] rounded-xl overflow-hidden">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
