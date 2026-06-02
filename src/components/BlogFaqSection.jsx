/**
 * @param {{ title: string, faqs: { question: string, answer: string }[] }} props
 */
export default function BlogFaqSection({ title, faqs }) {
  if (!faqs?.length) return null

  return (
    <section className="mt-12 pt-10 border-t border-gray-200" aria-labelledby="blog-faq-heading">
      <h2 id="blog-faq-heading" className="text-2xl font-bold text-black mb-8">
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
    </section>
  )
}
