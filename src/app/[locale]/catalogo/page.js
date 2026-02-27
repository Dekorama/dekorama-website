const CATALOG_LINK = 'https://tr.ee/19OHI9P1VN'
import { baseUrl } from '@/lib/site'

export const metadata = {
  title: 'Catálogo',
  description:
    'Accede al catálogo de Dekorama: porcelánicos, grifería, iluminación, mamparas y más. Enlaces a catálogo online, contacto y redes. Costa del Sol.',
  openGraph: {
    title: 'Catálogo | Dekorama Costa del Sol',
    description: 'Catálogo de productos y enlaces a nuestro catálogo online.',
    url: '/catalogo',
  },
  alternates: { canonical: `${baseUrl}/catalogo` },
}

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-gray-bg pt-20">
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
            Bienvenido al catálogo
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            Aquí puedes acceder a nuestro catálogo online con todos los productos, enlaces y contacto.
          </p>
          <a
            href={CATALOG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            Ver catálogo online
          </a>
        </div>
      </section>
    </div>
  )
}
