"use client"
import { useMemo } from "react"
import { toast } from 'react-toastify'
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-actions"
import { OrderSchema } from "@/src/schema"

export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])


  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach((issue: { message: string }) => {
        toast.error(issue.message)
      })
    }

    toast.success('Pedido Realizado Correctamente')
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-white/80 backdrop-blur-xl border-l border-amber-200 shadow-lg">
      <h1 className="text-4xl text-center font-black text-gray-800">Mi Pedido</h1>

      {order.length === 0 ? <p className="text-center my-10 text-gray-500">El pedido esta vacio</p> : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}

          <p className="text-2xl mt-10 text-center text-gray-700">
            Total a pagar: {''}
            <span className="font-bold text-amber-600">{formatCurrency(total)}</span>
          </p>

          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >
            <input
              type="text"
              placeholder="Tu Nombre"
              className="bg-white/80 backdrop-blur-md border border-amber-200 rounded-2xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all placeholder-gray-400 w-full"
              name="name"
            />

            <input
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white backdrop-blur-md border border-amber-400 shadow-lg rounded-2xl transition-all duration-300 active:scale-95 px-6 py-3 font-bold cursor-pointer uppercase tracking-widest w-full"
              value='Confirmar Pedido'
            />
          </form>
        </div>
      )}
    </aside>
  )
}