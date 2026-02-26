export const metadata = {
  title: 'Política de Cookies',
  description:
    'Política de cookies de Dekorama: tipos de cookies, gestión del consentimiento y cómo gestionar o eliminar cookies en dekorama.es.',
  robots: { index: true, follow: true },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Política de Cookies</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador, tablet o móvil) cuando los visita. Permiten que el sitio recuerde sus acciones y preferencias durante un tiempo, para que no tenga que volver a configurarlas en cada visita.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">2. Uso de cookies en este sitio</h2>
            <p>
              El sitio web de Dekorama puede utilizar cookies técnicas necesarias para el correcto funcionamiento de la página (por ejemplo, para recordar preferencias de visualización o para gestionar la sesión). Asimismo, podrían utilizarse cookies de análisis para conocer cómo los usuarios interactúan con el sitio y mejorar la experiencia, siempre que haya sido informado y, en su caso, haya dado su consentimiento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">3. Tipos de cookies que podemos utilizar</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio. No requieren consentimiento.</li>
              <li><strong>Cookies de preferencias:</strong> Permiten recordar opciones elegidas por el usuario (idioma, región, etc.).</li>
              <li><strong>Cookies de análisis:</strong> Permiten medir el uso del sitio (por ejemplo, con herramientas como Google Analytics) para mejorar nuestros contenidos y servicios. Pueden requerir su consentimiento según la normativa.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">4. Cómo gestionar o eliminar las cookies</h2>
            <p>
              Puede configurar su navegador para que rechace las cookies o le avise cuando un sitio intente instalarlas. También puede eliminar las cookies ya almacenadas desde las opciones de su navegador. Tenga en cuenta que bloquear o eliminar cookies puede afectar al correcto funcionamiento de algunas partes del sitio.
            </p>
            <p className="mt-4">
              Las instrucciones para gestionar cookies suelen encontrarse en el menú de Ayuda o Configuración de cada navegador (Chrome, Firefox, Safari, Edge, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">5. Consentimiento</h2>
            <p>
              Al continuar navegando por este sitio web tras haber sido informado de esta política de cookies, entendemos que acepta el uso de las cookies que hemos descrito, en los términos indicados. Si no está de acuerdo, puede configurar su navegador o abandonar el sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">6. Actualizaciones</h2>
            <p>
              Dekorama puede modificar esta política de cookies para adaptarla a cambios normativos o en las cookies utilizadas. Se recomienda revisar esta página periódicamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black mt-10 mb-4">7. Contacto</h2>
            <p>
              Para cualquier duda sobre el uso de cookies puede contactarnos en info@dekorama.es o en el teléfono +34 628 571 537.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
