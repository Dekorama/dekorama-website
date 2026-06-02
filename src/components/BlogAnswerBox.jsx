/**
 * @param {{ label: string, answer: string }} props
 */
export default function BlogAnswerBox({ label, answer }) {
  if (!answer?.trim()) return null

  return (
    <aside
      className="mb-10 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 md:px-6 md:py-5"
      aria-label={label}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
        {label}
      </p>
      <p className="text-lg text-gray-800 leading-relaxed">{answer}</p>
    </aside>
  )
}
