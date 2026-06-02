/**
 * Builds FAQ items from next-intl page namespace keys faq.q1–qN / faq.a1–aN.
 * @param {(key: string) => string} t - getTranslations callback for the page namespace
 * @param {{ has?: (key: string) => boolean }} [options]
 * @returns {{ question: string, answer: string }[]}
 */
export function getPageFaqsFromTranslations(t, options = {}) {
  const { has } = options
  const faqs = []

  for (let i = 1; i <= 6; i += 1) {
    const qKey = `faq.q${i}`
    const aKey = `faq.a${i}`
    if (has && !has(qKey)) break
    const question = t(qKey)
    const answer = t(aKey)
    if (!question || !answer || question === qKey || answer === aKey) break
    faqs.push({ question, answer })
  }

  return faqs
}
