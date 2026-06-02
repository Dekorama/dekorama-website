/**
 * @param {{ question: string, answer: string }[]} faqs
 * @returns {Record<string, unknown> | null}
 */
export function buildFaqPageJsonLd(faqs) {
  if (!faqs?.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}
