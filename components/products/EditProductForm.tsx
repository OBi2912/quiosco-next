"use client"
import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useParams } from "next/navigation"

export default function EditProductForm({children, returnUrl = "/manage-products"}: {children : React.ReactNode, returnUrl?: string}) {
    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get('name')?.toString(),
            price: parseFloat(formData.get('price')?.toString() || '0'),
            categoryId: parseInt(formData.get('categoryId')?.toString() || '0'),
            image: formData.get('image')?.toString()
        }
        
        const result = ProductSchema.safeParse(data)
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        const response = await updateProduct(result.data, id)
        if(response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return 
        }

        toast.success('Producto Actualizado correctamente')
        router.push(returnUrl)
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                className="space-y-5"
                onSubmit={handleSubmit}
            >
                {children}
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Guardar Cambios'
                />
            </form>
        </div>
    )
}
