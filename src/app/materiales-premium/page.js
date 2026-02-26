import Link from 'next/link'
import Image from 'next/image'
import { images } from '@/data/images'

export const metadata = {
  title: 'Materiales Premium',
  description:
    'Materiales premium para tu reforma: cerámicas, porcelánicos, sanitarios y carpintería de primeras marcas. Asesoramiento Dekorama en Costa del Sol.',
  openGraph: {
    title: 'Materiales Premium | Dekorama Costa del Sol',
    description: 'Los mejores materiales y acabados para reformas de calidad.',
    url: '/materiales-premium',
  },
}

export default function MaterialesPremiumPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Materiales premium
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Trabajamos solo con los mejores materiales y acabados del mercado para garantizar durabilidad y diseño.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/#contacto" className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 text-center">
                  Solicitar presupuesto
                </Link>
              </div>
            </div>
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
              <Image src={images.services.materiales} alt="Materiales premium" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-8">
            Calidad que se nota
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Cerámicas, porcelánicos, sanitarios, grifería y carpintería de primeras marcas. Te asesoramos en la elección para que el resultado supere tus expectativas.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold">¿Hablamos de tu proyecto?</h2>
          <Link href="/#contacto" className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Solicitar consulta gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
