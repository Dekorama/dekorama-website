import MaterialesHubView, {
  generateMaterialesHubMetadata,
} from '@/components/materiales/MaterialesHubView'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return generateMaterialesHubMetadata({ locale, marketId: 'venezuela' })
}

export default async function MaterialesCaracasPage({ params }) {
  const { locale } = await params
  return <MaterialesHubView locale={locale} marketId="venezuela" />
}
