import MaterialesPremiumView, {
  generateMaterialesPremiumMetadata,
} from '@/components/materiales/MaterialesPremiumView'

export async function generateMetadata({ params }) {
  const { locale } = await params
  return generateMaterialesPremiumMetadata({ locale, marketId: 'venezuela' })
}

export default async function MaterialesPremiumCaracasPage({ params }) {
  const { locale } = await params
  return <MaterialesPremiumView locale={locale} marketId="venezuela" />
}
