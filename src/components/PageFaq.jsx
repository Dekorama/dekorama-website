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
        className={`section-editorial border-t border-gray-200 bg-gray-bg ${className}`.trim()}
        aria-labelledby="page-faq-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="page-faq-heading"
            className="mb-8 font-heading text-2xl font-normal tracking-tight text-black sm:text-3xl md:mb-10 md:text-4xl"
          >
            {title}
          </h2>
          <dl className="space-y-8">
            {faqs.map(({ question, answer }) => (
              <div key={question} className="border-t border-gray-300 pt-6">
                <dt className="mb-2 text-base font-semibold tracking-tight text-black sm:text-lg">
                  {question}
                </dt>
                <dd className="text-sm leading-relaxed text-gray-600 md:text-base">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
