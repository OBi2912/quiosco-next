import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {

  const imagePath = getImagePath(product.image)

  return (
    <div className="liquidglass-card group overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <Image
          fill
          src={imagePath}
          alt={`Imagen platillo ${product.name}`}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black text-white">{product.name}</h3>
        <p className="mt-3 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <div className="mt-6">
          <AddProductButton
            product={product}
          />
        </div>
      </div>
    </div>
  )
}
