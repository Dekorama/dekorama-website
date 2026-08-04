import { Link } from '@/i18n/navigation'
import PageHeader from '@/components/PageHeader'
import { baseUrl } from '@/lib/site'

/**
 * Editorial chrome for legal / policy pages.
 */
export default function LegalDocument({
  breadcrumbItems = [],
  title,
  lastUpdatedLabel,
  dateStr,
  relatedTitle,
  relatedLinks = [],
  children,
}) {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        title={title}
        baseUrl={baseUrl}
      />

      {(lastUpdatedLabel || dateStr) && (
        <div className="border-b border-gray-200 bg-white">
          <p className="px-4 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500 sm:px-6">
            {lastUpdatedLabel}
            {lastUpdatedLabel && dateStr ? ' · ' : null}
            {dateStr}
          </p>
        </div>
      )}

      <article className="section-editorial">
        <div className="mx-auto max-w-3xl divide-y divide-gray-200">{children}</div>
      </article>

      {relatedLinks.length > 0 ? (
        <nav
          className="section-editorial border-t border-gray-200 bg-gray-bg"
          aria-label={relatedTitle}
        >
          <div className="mx-auto max-w-7xl">
            {relatedTitle ? (
              <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                {relatedTitle}
              </p>
            ) : null}
            <div className="grid gap-px bg-gray-200 sm:grid-cols-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-white px-6 py-8 text-center transition-colors duration-300 hover:bg-gray-50 sm:px-8 sm:py-10"
                >
                  <span className="font-heading text-lg font-normal tracking-tight text-black transition-opacity hover:opacity-70 sm:text-xl">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      ) : null}
    </div>
  )
}

/**
 * Single legal section block.
 */
export function LegalSection({ title, children }) {
  return (
    <section className="py-10 first:pt-0 md:py-12">
      {title ? (
        <h2 className="mb-4 font-heading text-xl font-normal tracking-tight text-black sm:text-2xl md:mb-5 md:text-[1.65rem]">
          {title}
        </h2>
      ) : null}
      <div className="space-y-4 text-sm leading-relaxed text-gray-600 md:text-base">
        {children}
      </div>
    </section>
  )
}

/**
 * Editorial list for cookie / policy bullet points.
 */
export function LegalList({ items }) {
  return (
    <ul className="space-y-3 border-l border-gray-200 pl-5 md:pl-6">
      {items.map((item) => (
        <li key={item} className="leading-relaxed text-gray-600">
          {item}
        </li>
      ))}
    </ul>
  )
}
