import ProductDetail from './ProductDetail'
import products from '@/app/data/products.json'

// ✅ Fungsi static params
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function Page({ params }) {
  const product = products.find((p) => p.id.toString() === params.id)

  return <ProductDetail product={product} />
}
