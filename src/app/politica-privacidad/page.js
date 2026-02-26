export const metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad y protección de datos de Dekorama. Información sobre el tratamiento de datos personales en reformas y contacto.',
  robots: { index: true, follow: true },
}

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Política de Privacidad</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">1. Responsable del tratamiento</h2>
            <p>
              Dekorama, con domicilio en Costa del Sol, Málaga, es el responsable del tratamiento de los datos personales que nos facilite a través de este sitio web (dekorama.es), del formulario de contacto, correo electrónico o teléfono.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">2. Finalidad del tratamiento</h2>
            <p>
              Los datos personales que nos proporcione se utilizarán para gestionar las solicitudes de información y consultas sobre nuestros servicios de reformas integrales, cocinas, baños y diseño de interiores; para enviar presupuestos y comunicaciones comerciales si nos ha dado su consentimiento; y para cumplir con las obligaciones legales que nos apliquen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">3. Legitimación</h2>
            <p>
              La base legal para el tratamiento de sus datos es su consentimiento al enviar el formulario o contactarnos, la ejecución de un contrato o precontrato cuando solicite un presupuesto o servicio, y el legítimo interés de Dekorama para responder a sus consultas y mejorar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">4. Conservación de los datos</h2>
            <p>
              Conservaremos sus datos mientras mantenga una relación comercial con nosotros o mientras no solicite su supresión. En todo caso, los plazos legales de conservación que apliquen serán respetados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">5. Destinatarios y transferencias</h2>
            <p>
              No cederemos sus datos a terceros salvo obligación legal. Los datos podrán ser tratados por proveedores de servicios que actúen como encargados del tratamiento (por ejemplo, hosting o herramientas de correo), con las garantías adecuadas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">6. Derechos</h2>
            <p>
              Puede ejercer sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición dirigiéndose a info@dekorama.es, indicando el derecho que desea ejercer. Tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">7. Seguridad</h2>
            <p>
              Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad e integridad de sus datos personales y evitar su alteración, pérdida o acceso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">8. Contacto</h2>
            <p>
              Para cualquier duda sobre esta política de privacidad puede contactarnos en info@dekorama.es o en el teléfono +34 628 571 537.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
