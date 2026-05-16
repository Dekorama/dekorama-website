import Link from 'next/link'

/**
 * Breadcrumb Navigation Component
 * 
 * Provides consistent breadcrumb navigation across all pages with SEO-friendly
 * structured data (JSON-LD schema.org markup).
 * 
 * @param {Array} items - Array of breadcrumb items: [{ label, href }]
 * @param {Object} structuredData - Optional JSON-LD structured data for SEO
 * 
 * @example
 * <Breadcrumb 
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Blog', href: '/blog' },
 *     { label: 'Article Title', href: null } // null href = current page
 *   ]}
 * />
 */
export default function Breadcrumb({ items = [], structuredData = null }) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <>
      {/* Structured Data for SEO */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <nav 
        className="breadcrumb-nav" 
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const isHome = index === 0

            return (
              <li key={index} className="flex items-center">
                {/* Link or current page text */}
                {!isLast && item.href ? (
                  <Link 
                    href={item.href}
                    className="breadcrumb-link"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="breadcrumb-current" aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}

                {/* Separator (not after last item) */}
                {!isLast && (
                  <span className="mx-2 text-gray-400" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

/**
 * Helper function to generate schema.org BreadcrumbList structured data
 * 
 * @param {Array} items - Same items array as Breadcrumb component
 * @param {string} baseUrl - Base URL of the website (e.g., 'https://www.dekoramagroup.com')
 * @returns {Object} JSON-LD structured data object
 * 
 * @example
 * const structuredData = generateBreadcrumbSchema(
 *   [
 *     { label: 'Home', href: '/es' },
 *     { label: 'Blog', href: '/es/blog' },
 *     { label: 'Article', href: null }
 *   ],
 *   'https://www.dekoramagroup.com'
 * )
 */
export function generateBreadcrumbSchema(items, baseUrl) {
  if (!items || items.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => {
      const listItem = {
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.label
      }
      
      // Only add 'item' property if href exists
      if (item.href) {
        listItem.item = `${baseUrl}${item.href}`
      }
      
      return listItem
    })
  }
}
