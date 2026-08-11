import { Link } from '@/i18n/navigation'

/**
 * Bottom CTA band — charcoal editorial style.
 */
export default function CTASection({ title, description, buttons = [], className = '' }) {
  if (!title && buttons.length === 0) {
    return null
  }

  return (
    <section className={`cta-section ${className}`}>
      <div className="mx-auto max-w-7xl text-center">
        {title ? (
          <h2 className="mb-6 font-heading text-3xl font-normal tracking-tight text-white md:text-4xl">
            {title}
          </h2>
        ) : null}

        {description ? (
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            {description}
          </p>
        ) : null}

        {buttons.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {buttons.map((button, index) => {
              const buttonClass =
                button.variant === 'secondary'
                  ? 'px-8 py-3.5 border border-white text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                  : 'px-8 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'

              return (
                <Link key={index} href={button.href} className={buttonClass}>
                  {button.text}
                </Link>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
