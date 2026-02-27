import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { images } from '@/data/images'
import { baseUrl } from '@/lib/site'

export const metadata = {
  title: 'Reformas Integrales',
  description:
    'Reformas integrales en la Costa del Sol: diseño personalizado, gestión de permisos y acabados premium. Transformación completa de tu hogar. Visita gratuita.',
  openGraph: {
    title: 'Reformas Integrales | Dekorama Costa del Sol',
    description:
      'Reformas integrales con diseño personalizado y acabados premium. Málaga, Marbella y Costa del Sol.',
    url: '/reformas-integrales',
  },
  alternates: { canonical: `${baseUrl}/reformas-integrales` },
}

export default function ReformasIntegralesPage() {
  const caracteristicas = [
    {
      title: 'Diseño personalizado',
      description: 'Cada proyecto es único. Creamos espacios adaptados a tu estilo de vida y necesidades.',
    },
    {
      title: 'Transformación completa',
      description: 'Reformamos desde la estructura hasta los acabados finales, incluyendo instalaciones.',
    },
    {
      title: 'Gestión integral',
      description: 'Nos encargamos de todo: permisos, coordinación de gremios y seguimiento del proyecto.',
    },
    {
      title: 'Acabados premium',
      description: 'Trabajamos con los mejores materiales y marcas del mercado para garantizar calidad.',
    },
  ]

  const fases = [
    { numero: '01', titulo: 'Estudio y diseño', descripcion: 'Análisis del espacio y planificación detallada del proyecto.' },
    { numero: '02', titulo: 'Desmontaje y preparación', descripcion: 'Retirada de elementos existentes y preparación de la estructura para la reforma.' },
    { numero: '03', titulo: 'Instalaciones', descripcion: 'Renovación de fontanería, electricidad, climatización y sistemas de seguridad.' },
    { numero: '04', titulo: 'Albañilería y acabados', descripcion: 'Construcción, revestimientos, pintura y colocación de pavimentos.' },
    { numero: '05', titulo: 'Carpintería y mobiliario', descripcion: 'Instalación de armarios, puertas, ventanas y elementos de carpintería a medida.' },
    { numero: '06', titulo: 'Limpieza y entrega', descripcion: 'Limpieza profesional y entrega del proyecto. No damos la obra por terminada hasta que quede perfecta.' },
  ]

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                Reformas Integrales
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transformamos tu hogar de principio a fin con diseño personalizado y acabados de lujo
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
              <Image src={images.services.reformas} alt="Reforma integral" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
            ¿Por qué elegir nuestras reformas integrales?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caracteristicas.map((item, index) => (
              <div key={index} className="text-center space-y-4 p-6 hover:bg-gray-bg transition-all duration-300 rounded-lg">
                <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
            Nuestro proceso paso a paso
          </h2>
          <div className="space-y-12 md:space-y-16">
            {fases.map((fase, index) => (
              <div key={index} className="relative flex items-start gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 md:w-24 h-16 md:h-24 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold">
                  {fase.numero}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">{fase.titulo}</h3>
                  <p className="text-gray-600 leading-relaxed">{fase.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold">¿Listo para transformar tu hogar?</h2>
          <p className="text-xl text-gray-300">Solicita una visita gratuita y recibe un presupuesto detallado sin compromiso</p>
          <Link href="/#contacto" className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Solicitar visita gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
