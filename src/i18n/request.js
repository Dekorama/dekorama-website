import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !['es', 'en'].includes(locale)) locale = 'es'
  const messages = (await import(`../messages/${locale}.json`)).default
  return { locale, messages }
})
