import Image from 'next/image'
import Link from 'next/link'

/**
 * RelatedLinks Component
 * 
 * Displays a 3-column grid of related service/page cards with images,
 * titles, descriptions, and links. Used for cross-linking related content.
 * 
 * @param {Array} links - Array of link objects: [{ title, description, href, image, imageAlt }]
 * @param {string} className - Additional CSS classes
 * 
 * @example
 * <RelatedLinks 
 *   links={[
 *     {
 *       title: 'Baños Completos',
 *       description: 'Reforma integral de baños',
 *       href: '/banos-completos',
 *       image: '/images/banos.jpg',
 *       imageAlt: 'Baño moderno'
 *     },
 *     // ... more links
 *   ]}
 * />
 */
export default function RelatedLinks({ links = [], className = '' }) {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 ${className}`}>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="card-interactive group"
        >
          {/* Image */}
          {link.image && (
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
              <Image
                src={link.image}
                alt={link.imageAlt || link.title}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">
            {link.title}
          </h3>

          {/* Description */}
          {link.description && (
            <p className="text-gray-600 leading-relaxed">
              {link.description}
            </p>
          )}

          {/* Arrow indicator */}
          <div className="mt-4 flex items-center text-sm font-medium text-black group-hover:translate-x-1 transition-transform duration-300">
            <span className="mr-2">Ver más</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  )
}
