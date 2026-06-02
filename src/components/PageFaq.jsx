import { buildFaqPageJsonLd } from '@/lib/faqSchema'

/**
 * @param {{
 *   title: string,
 *   faqs: { question: string, answer: string }[],
 *   className?: string,
 * }} props
 */
export default function PageFaq({ title, faqs, className = '' }) {
  if (!faqs?.length) return null

  const faqJsonLd = buildFaqPageJsonLd(faqs)

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <section
        className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`.trim()}
        aria-labelledby="page-faq-heading"
      >
        <div className="max-w-3xl mx-auto">
          <h2
            id="page-faq-heading"
            className="text-2xl md:text-3xl font-bold text-black mb-8 md:mb-10"
          >
            {title}
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <dt className="text-lg font-semibold text-black mb-2">{question}</dt>
                <dd className="text-gray-600 leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
