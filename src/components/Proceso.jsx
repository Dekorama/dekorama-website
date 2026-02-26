export default function Proceso() {
  const pasos = [
    { numero: '01', titulo: 'Consulta inicial', descripcion: 'Visita gratuita para conocer tus necesidades y el espacio a reformar' },
    { numero: '02', titulo: 'Presupuesto', descripcion: 'Te presentamos un presupuesto detallado y sin compromiso' },
    { numero: '03', titulo: 'Aceptación de presupuesto 3D', descripcion: 'Aprobación del presupuesto en 3D para que todo quede conforme antes de empezar' },
    { numero: '04', titulo: 'Planificación', descripcion: 'Organizamos todos los detalles: materiales, plazos y fases de ejecución' },
    { numero: '05', titulo: 'Ejecución', descripcion: 'Nuestro equipo trabaja con precisión y limpieza, respetando los plazos acordados' },
    { numero: '06', titulo: 'Entrega', descripcion: 'Revisión final contigo. No damos la obra por terminada hasta que quede perfecta' },
  ]

  return (
    <section id="proceso" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-16">
          Cómo trabajamos: Simple, claro, sin complicaciones
        </h2>
        <div className="relative">
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block" aria-hidden />
          <div className="space-y-12 md:space-y-16">
            {pasos.map((paso, index) => (
              <div key={index} className="relative flex items-start gap-6 md:gap-8">
                <div className="flex-shrink-0 w-16 md:w-24 h-16 md:h-24 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold z-10 border-4 border-white shadow-lg">
                  {paso.numero}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">{paso.titulo}</h3>
                  <p className="text-gray-600 leading-relaxed">{paso.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
