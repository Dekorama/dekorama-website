import Link from 'next/link'
import Image from 'next/image'
import { images } from '@/data/images'

const servicios = [
  {
    title: 'Reformas Integrales',
    description: 'Transformación completa de tu hogar con diseño personalizado y acabados premium',
    image: images.services.reformas,
    link: '/reformas-integrales',
  },
  {
    title: 'Cocinas a medida',
    description: 'Diseño exclusivo adaptado a tu espacio y estilo de vida',
    image: images.services.cocinas,
    link: '/cocinas-a-medida',
  },
  {
    title: 'Baños completos',
    description: 'Espacios de relax y bienestar con las últimas tendencias en diseño',
    image: images.services.banos,
    link: '/banos-completos',
  },
  {
    title: 'Materiales premium',
    description: 'Trabajamos solo con los mejores materiales y acabados del mercado',
    image: images.services.materiales,
    link: '/materiales-premium',
  },
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          Todo lo que necesitas bajo un mismo techo
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {servicios.map((servicio, index) => (
            <Link
              key={index}
              href={servicio.link}
              className="group cursor-pointer overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300 block"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={servicio.image}
                  alt={servicio.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 bg-white">
                <h3 className="text-2xl font-semibold text-black mb-3">{servicio.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{servicio.description}</p>
                <span className="text-black font-medium inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  Ver más
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
