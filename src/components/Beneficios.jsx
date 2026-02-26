export default function Beneficios() {
  const beneficios = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visita gratuita',
      description: 'Te visitamos sin compromiso para valorar tu proyecto y asesorarte en persona',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Obra perfecta o no salimos',
      description: 'No damos la obra por terminada hasta que quede perfecta. Tu satisfacción es nuestro compromiso',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Presupuesto',
      description: 'Presupuesto detallado y sin compromiso para que sepas exactamente en qué inviertes',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Aceptación de presupuesto 3D',
      description: 'Aprobación clara del presupuesto en 3D antes de comenzar, para que todo quede conforme',
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          La reforma que siempre quisiste, sin sorpresas
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
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
