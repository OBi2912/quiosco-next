
"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButttonProps = {
    product: Product
}
export default function AddProductButtton({product}: AddProductButttonProps) {
    const addToOrder = useStore((state) => state.addToOrder)
  return (
     <button 
        type="button"
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        
           onClick={() => addToOrder(product)} 
          >Agregar a la orden
        </button>
  )
}
