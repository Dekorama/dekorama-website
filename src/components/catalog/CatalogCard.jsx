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

  return (
    <article className="group flex flex-col">
      <Link
        href={`/catalogo/${catalog.slug}`}
        className="relative aspect-[3/4] overflow-hidden bg-gray-100"
      >
        <Image
          src={catalog.cover}
          alt={catalog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 transition-colors duration-300 group-hover:from-black/80" />
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
          <span className="self-start border border-white/35 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
            {countryLabel}
          </span>
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {catalog.brand}
            </p>
            <h3 className="font-heading text-2xl font-normal tracking-tight text-white">
              {catalog.title}
            </h3>
          </div>
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
