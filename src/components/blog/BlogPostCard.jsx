import { Link } from '@/i18n/navigation'
import Image from 'next/image'

/**
 * @typedef {Object} BlogPostCardProps
 * @property {{ slug: string, title: string, excerpt: string, date: string, coverImage: string, category: string }} post
 * @property {string} locale
 * @property {string} readMoreLabel
 * @property {string} categoryLabel
 * @property {(dateStr: string) => string} formatDate
 * @property {'default' | 'featured'} [variant]
 */

/**
 * @param {BlogPostCardProps} props
 */
export default function BlogPostCard({
  post,
  locale,
  readMoreLabel,
  categoryLabel,
  formatDate,
  variant = 'default',
}) {
  const isFeatured = variant === 'featured'

  return (
    <Link
      href={`/blog/${post.slug}`}
      locale={locale}
      className={`group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300 ${
        isFeatured ? 'md:grid md:grid-cols-2 md:gap-0' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          isFeatured ? 'aspect-[16/10] md:aspect-auto md:min-h-[320px]' : 'aspect-[16/10]'
        }`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
            sizes={
              isFeatured
                ? '(max-width: 768px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, 50vw'
            }
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>
      <div className={isFeatured ? 'p-6 md:p-10 flex flex-col justify-center' : 'p-6 md:p-8'}>
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2 border border-gray-300 px-2 py-0.5 w-fit">
          {categoryLabel}
        </span>
        <time dateTime={post.date} className="text-sm text-gray-500 font-medium">
          {formatDate(post.date)}
        </time>
        <h2
          className={`mt-2 font-semibold text-black group-hover:text-gray-700 transition-colors line-clamp-2 ${
            isFeatured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
          }`}
        >
          {post.title}
        </h2>
        <p
          className={`mt-3 text-gray-600 leading-relaxed ${
            isFeatured ? 'line-clamp-4 text-base md:text-lg' : 'line-clamp-3'
          }`}
        >
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center text-sm font-medium text-black group-hover:underline">
          {readMoreLabel}
          <svg
            className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
