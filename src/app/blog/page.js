import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog',
  description:
    'Tendencias en porcelánico, reformas y diseño de interiores. Consejos y novedades de Dekorama en la Costa del Sol.',
  openGraph: {
    title: 'Blog | Dekorama Costa del Sol',
    description: 'Tendencias en porcelánico, tarima y reformas. Consejos de nuestros expertos.',
    url: '/blog',
  },
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Tendencias en porcelánico, reformas y diseño de interiores. Consejos y novedades de nuestro equipo.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <time
                    dateTime={post.date}
                    className="text-sm text-gray-500 font-medium"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-2 text-xl md:text-2xl font-semibold text-black group-hover:text-gray-700 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-black group-hover:underline">
                    Leer más
                    <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">¿Tienes un proyecto en mente?</h2>
          <p className="text-gray-300">Solicita una visita gratuita y te asesoramos sin compromiso</p>
          <Link
            href="/#contacto"
            className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 rounded-sm"
          >
            Solicitar visita gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
