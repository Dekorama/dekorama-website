import { baseUrl } from '@/lib/site'

export const metadata = {
  title: 'Aviso Legal',
  description:
    'Aviso legal y condiciones de uso del sitio web de Dekorama. Datos identificativos, propiedad intelectual y legislación aplicable.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/aviso-legal` },
}

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Aviso Legal</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">1. Datos identificativos</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa que el titular de este sitio web es Dekorama, dedicada a la realización de reformas integrales, diseño de interiores, cocinas y baños en la Costa del Sol (Málaga). Para contactar puede utilizar el correo electrónico info@dekorama.es o el teléfono +34 628 571 537.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">2. Objeto y aceptación</h2>
            <p>
              El presente aviso legal regula el uso del sitio web de Dekorama. La navegación por el sitio web atribuye la condición de usuario e implica la aceptación plena de todas y cada una de las disposiciones incluidas en este Aviso Legal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">3. Condiciones de uso</h2>
            <p>
              El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que Dekorama ofrece a través de este sitio web y a no emplearlos para actividades ilícitas o contrarias a la buena fe. Queda prohibida la reproducción, distribución o comunicación pública de los contenidos del sitio sin autorización expresa del titular.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">4. Propiedad intelectual e industrial</h2>
            <p>
              Dekorama es titular o tiene las licencias necesarias sobre los derechos de propiedad intelectual e industrial de los contenidos del sitio web (textos, imágenes, diseños, logotipos, etc.). Su uso no autorizado constituye una vulneración de la normativa aplicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">5. Exclusión de responsabilidad</h2>
            <p>
              Dekorama no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de la disponibilidad o accesibilidad del sitio, de la interrupción en el funcionamiento o de los fallos en los sistemas o en las informaciones contenidas, ni de la introducción de virus o elementos lesivos por parte de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">6. Enlaces</h2>
            <p>
              En el caso de que el sitio web contenga enlaces a otros sitios, Dekorama no ejerce ningún control sobre los mismos y no asume responsabilidad por su contenido. La inclusión de enlaces no implica la existencia de relación alguna con los titulares de los sitios enlazados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">7. Legislación aplicable y jurisdicción</h2>
            <p>
              La relación entre Dekorama y el usuario se regirá por la normativa española vigente. Para la resolución de cualquier controversia, las partes se someterán a los Juzgados y Tribunales del domicilio del usuario o de Málaga, a elección de Dekorama.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">8. Contacto</h2>
            <p>
              Para cualquier consulta sobre este Aviso Legal puede dirigirse a info@dekorama.es.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
