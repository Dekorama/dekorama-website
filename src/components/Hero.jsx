import Link from 'next/link'
import Image from 'next/image'
import { images } from '@/data/images'

export default function Hero() {
  return (
    <section id="hero" className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Transformamos espacios en hogares que enamoran
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Reformas integrales, cocinas y baños de diseño en la Costa del Sol
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/#contacto"
                className="px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 text-center"
              >
                Solicitar consulta
              </Link>
              <Link
                href="/proyectos"
                className="px-8 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 text-center"
              >
                Ver proyectos
              </Link>
            </div>
          </div>

          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={images.hero}
              alt="Interior reformado - diseño de interiores Costa del Sol"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
