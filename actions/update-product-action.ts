"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

type ActionResponse = {
    errors?: Array<{ message: string }>
}

export async function updateProduct(data: unknown, id: number): Promise<ActionResponse> {
    const result = ProductSchema.safeParse(data)
    
    if(!result.success) {
        return {
            errors: result.error.issues.map(issue => ({ message: issue.message }))
        }
    }

    await prisma.product.update({
        where: {
            id
        },
        data: result.data
    })
    revalidatePath('/admin/products')
    revalidatePath('/manage-products')

    return {}
}
