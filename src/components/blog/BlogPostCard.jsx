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
      className={`group block overflow-hidden border border-gray-200 bg-white transition-colors duration-300 hover:border-gray-400 ${
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
        <span className="mb-2 inline-block w-fit text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          {categoryLabel}
        </span>
        <time dateTime={post.date} className="text-sm text-gray-500 font-medium">
          {formatDate(post.date)}
        </time>
        <h2
          className={`mt-2 font-heading font-normal text-black transition-opacity group-hover:opacity-70 line-clamp-2 ${
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
        <span className="btn-discover mt-5 text-[10px]">
          {readMoreLabel}
        </span>
      </div>
    </Link>
  )
}
