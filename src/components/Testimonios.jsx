const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?sa=X&q=Dekorama+Reviews&tbm=lcl&hl=es#lkt=LocalPoiReviews'

export default function Testimonios() {
  const testimonios = [
    {
      quote:
        'Carolina is an enthusiastic & helpful lady who is knowledgeable about interior design. She suggested some great ideas, organised, ordered & delivered the materials. She constantly visited our home with Carlos, the foreman of the hardworking team from Estepona, to make sure that things were running smoothly. We now have a new shower room/aseo installed.',
      nombre: 'Julliet Birch',
      detalle: 'Google · hace 4 meses',
    },
    {
      quote:
        'Great experience working with Dekorama! Carolina was fantastic at interpreting the style and finish we were hoping for! Quality products! High end finish!',
      nombre: 'Charles Harman',
      detalle: 'Google · hace 1 año',
    },
    {
      quote:
        "Excellent! From service to materials, everything was awesome, more than expected. I live abroad so I renovated remote, communicating by phone with Carolina in english. The support she offered, advice and constant availability made everything go smoothly - she even sugested a few things based on my criteria that were exactly what I needed, saving me a lot of time and effort. Can't thank them enough, they are literally making the world a better place.",
      nombre: 'Velia Cumpata',
      detalle: 'Google · hace 1 año',
    },
  ]

  const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden>
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  )

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonios.map((testimonio, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">&quot;{testimonio.quote}&quot;</p>
              <div>
                <div className="font-semibold text-black">{testimonio.nombre}</div>
                {testimonio.detalle && (
                  <div className="text-sm text-gray-600">{testimonio.detalle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            aria-label="Ver 4.8 estrellas y reseñas en Google"
          >
            <span className="text-2xl font-bold text-black">4.8</span>
            <span className="text-black" aria-hidden>★</span>
            <span className="text-gray-600">en Google</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">46 reseñas</span>
          </a>
        </div>
      </div>
    </section>
  )
}
