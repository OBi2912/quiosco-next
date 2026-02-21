import ProductCard from "@/components/order/products/ProductCard"
import Logo from "@/components/ui/Logo"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

function deduplicateProducts<T extends { name: string; image: string; categoryId: number }>(products: T[]) {
  const seen = new Set<string>()
  return products.filter((p) => {
    const key = `${p.name}|${p.image}|${p.categoryId}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export default async function OrderPage({ params }: { params: { category: string } }) {
  const rawProducts = await getProducts(params.category)
  const products = deduplicateProducts(rawProducts)

  return (
    <>
      <Logo />
      <h1 className="text-3xl font-black text-gray-800 my-10 uppercase tracking-tighter">
        Elige y Personaliza tu Pedido <span className="text-amber-600">a Continuacion</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-amber-100 shadow-lg">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
