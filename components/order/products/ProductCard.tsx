import Image from "next/image"
import { ProductModel } from "@/src/generated/prisma/models/Product"
import { formatCurrency } from "@/src/utils"
import AddProductButtton from "./AddProductButtton"

type ProductCardProps = {
    product: ProductModel
}

export default function ProductCard({product} : ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
     
        <div className="relative h-[500px] w-full">
          <Image
            src={`/products/${product.image}.jpg`}
            alt={`Imagen Platillo ${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-xl font-bold text-amber-600 mb-4">{formatCurrency (product.price)}</p>
       <AddProductButtton
       product={product}
       /> 
      </div>
    </div>
  )
}
