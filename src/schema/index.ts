import {z} from 'zod'

export const ProductSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    price: z.coerce.number().min(1, 'El precio es obligatorio'),
    categoryId: z.coerce.number().min(1, 'La categoría es obligatoria'),
    image: z.string().min(1, 'La imagen es obligatoria')
})

export const OrderIdSchema = z.object({
    orderId: z.string().min(1).transform((val) => parseInt(val, 10))
})

export const SearchSchema = z.object({
    search: z.string().min(1, 'Ingresa un término de búsqueda')
})

export const OrderSchema = z.object({
    name: z.string().min(1,'Tu nombre es obligatorio'),
    total: z.number()
             .min(0, 'Hay errores en la orden'),
    order: z.array(z.object({
               id: z.number(),
               name: z.string(),
               price: z.number(),
               quantity: z.number(),
               subtotal: z.number()
            }))
    
})
