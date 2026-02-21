"use server"
import { revalidatePath } from 'next/cache'
import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"

export async function completeOrder(formData: FormData) {
    const rawOrderId = formData.get('order_id')
    const result = OrderIdSchema.safeParse({ orderId: rawOrderId ?? '' })

    if (!result.success) return { error: 'ID de orden inválido' }

    try {
        await prisma.order.update({
            where: { id: result.data.orderId },
            data: {
                status: true,
                orderReadyAt: new Date()
            }
        })
        revalidatePath('/admin/orders')
        revalidatePath('/manage-orders')
        return { success: true }
    } catch (error) {
        console.error('completeOrder error:', error)
        return { error: 'No se pudo completar la orden' }
    }
}