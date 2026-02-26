export default function Beneficios() {
  const beneficios = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: 'Diseño 3D incluido',
      description: 'Visualiza tu proyecto antes de empezar con renders fotorrealistas en 3D',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Precio cerrado',
      description: 'Sin sorpresas. Presupuesto detallado y precio final garantizado desde el inicio',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Garantía 5 años',
      description: 'Tranquilidad total con nuestra garantía de 5 años en todos los trabajos',
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          La reforma que siempre quisiste, sin sorpresas
        </h2>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {beneficios.map((beneficio, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-8 hover:bg-white transition-all duration-300 rounded-lg group cursor-default"
            >
              <div className="flex justify-center text-black group-hover:scale-110 transition-transform duration-300">
                {beneficio.icon}
              </div>
              <h3 className="text-xl font-semibold text-black">{beneficio.title}</h3>
              <p className="text-gray-600 leading-relaxed">{beneficio.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
