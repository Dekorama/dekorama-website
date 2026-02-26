import Link from 'next/link'
import Image from 'next/image'
import { images } from '@/data/images'

export const metadata = {
  title: 'Baños Completos',
  description:
    'Reforma de baños completos en la Costa del Sol: fontanería, mamparas y muebles a medida. Presupuesto gratuito en Málaga.',
  openGraph: {
    title: 'Baños Completos | Dekorama Costa del Sol',
    description: 'Baños de diseño con las últimas tendencias. Relax y bienestar.',
    url: '/banos-completos',
  },
}

export default function BanosCompletosPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Baños completos
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Espacios de relax y bienestar con las últimas tendencias en diseño. Reformamos tu baño de principio a fin.
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
              <Image src={images.services.banos} alt="Baño completo" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-8">
            Baños que inspiran tranquilidad
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Desde la planificación hasta la entrega final: fontanería, revestimientos, mamparas, muebles a medida y acabados premium. No damos la obra por terminada hasta que quede perfecta.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold">¿Listo para renovar tu baño?</h2>
          <Link href="/#contacto" className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Solicitar visita gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
