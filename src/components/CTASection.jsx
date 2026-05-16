import Link from 'next/link'

/**
 * CTASection Component
 * 
 * Bottom call-to-action section with black background, title, description,
 * and one or more action buttons. Different from CTAFinal (which has a form).
 * 
 * @param {string} title - Section title
 * @param {string} description - Optional description text
 * @param {Array} buttons - Array of button objects: [{ text, href, variant }]
 *                          variant can be 'primary' or 'secondary'
 * @param {string} className - Additional CSS classes
 * 
 * @example
 * <CTASection 
 *   title="¿Listo para transformar tu hogar?"
 *   description="Contacta con nosotros y recibe un presupuesto personalizado"
 *   buttons={[
 *     { text: 'Solicitar Presupuesto', href: '/contacto', variant: 'primary' },
 *     { text: 'Ver Proyectos', href: '/proyectos', variant: 'secondary' }
 *   ]}
 * />
 */
export default function CTASection({ 
  title, 
  description, 
  buttons = [], 
  className = '' 
}) {
  if (!title && buttons.length === 0) {
    return null
  }

  return (
    <section className={`cta-section ${className}`}>
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            {title}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
            {description}
          </p>
        )}

        {/* Buttons */}
        {buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {buttons.map((button, index) => {
              const buttonClass = button.variant === 'secondary' 
                ? 'px-8 py-4 border-2 border-white text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                : 'px-8 py-4 bg-white text-black text-sm font-semibold rounded-sm transition-colors duration-300 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'

              return (
                <Link
                  key={index}
                  href={button.href}
                  className={buttonClass}
                >
                  {button.text}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
