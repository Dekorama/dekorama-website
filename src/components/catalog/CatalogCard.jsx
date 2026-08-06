import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getCatalogDownloadName } from '@/data/catalogs'

/**
 * @typedef {import('@/data/catalogs').CatalogItem} CatalogItem
 *
 * @typedef {object} CatalogCardProps
 * @property {CatalogItem} catalog
 * @property {string} countryLabel
 * @property {string} viewLabel
 * @property {string} downloadLabel
 */

/**
 * @param {CatalogCardProps} props
 */
export default function CatalogCard({ catalog, countryLabel, viewLabel, downloadLabel }) {
  const downloadName = getCatalogDownloadName(catalog)
  const showTitle = catalog.title.toLowerCase() !== catalog.brand.toLowerCase()

  return (
    <article className="group flex flex-col">
      <Link
        href={`/catalogo/${catalog.slug}`}
        className="relative aspect-[3/4] overflow-hidden bg-gray-100 ring-1 ring-black/5"
      >
        <Image
          src={catalog.cover}
          alt={catalog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
          <span className="self-start border border-white/40 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {countryLabel}
          </span>
          {showTitle ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-sm">
              {catalog.title}
            </p>
          ) : (
            <span className="sr-only">{catalog.brand}</span>
          )}
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`/catalogo/${catalog.slug}`}
          className="btn-primary inline-flex min-h-11 flex-1 items-center justify-center px-4 text-center text-[11px] tracking-[0.14em] sm:flex-none"
        >
          {viewLabel}
        </Link>
        <a
          href={catalog.file}
          download={downloadName}
          className="btn-secondary inline-flex min-h-11 flex-1 items-center justify-center px-4 text-center text-[11px] tracking-[0.14em] sm:flex-none"
        >
          {downloadLabel}
        </a>
      </div>
    </article>
  )
}
