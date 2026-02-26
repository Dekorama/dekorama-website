import Link from 'next/link'
import Image from 'next/image'
import { images } from '@/data/images'

export const metadata = {
  title: 'Cocinas a Medida',
  description:
    'Cocinas a medida en la Costa del Sol: diseño 3D, electrodomésticos integrados y materiales premium. Presupuesto sin compromiso en Málaga y Marbella.',
  openGraph: {
    title: 'Cocinas a Medida | Dekorama Costa del Sol',
    description: 'Cocinas de diseño exclusivo adaptadas a tu espacio. Calidad y funcionalidad.',
    url: '/cocinas-a-medida',
  },
}

export default function CocinasMedidaPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Cocinas a medida
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Diseño exclusivo adaptado a tu espacio y estilo de vida. Calidad y funcionalidad en cada detalle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/#contacto" className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 text-center">
                  Solicitar presupuesto
                </Link>
                <Link href="/proyectos" className="px-8 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 text-center">
                  Ver proyectos
                </Link>
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
              <Image src={images.services.cocinas} alt="Cocina a medida" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-8">
            Cocinas que son el corazón de tu hogar
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Diseñamos cocinas a medida con los mejores materiales, electrodomésticos integrados y soluciones de almacenaje inteligente. Incluimos diseño 3D para que veas el resultado antes de empezar.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold">¿Listo para tu nueva cocina?</h2>
          <Link href="/#contacto" className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Solicitar consulta gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
