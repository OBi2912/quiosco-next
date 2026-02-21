"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

type ProductSearchFormProps = {
    searchPath?: string
}

export default function ProductSearchForm({ searchPath = "/admin/products/search" }: ProductSearchFormProps) {
    const router = useRouter()
 
    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        router.push(`${searchPath}?search=${result.data.search}`)
    }

    return (
        <form
            action={handleSearchForm}
            className="flex items-center"
        >
            <input
                type="text"
                placeholder="Buscar Producto"
                className="p-2 placeholder-gray-400 w-full"
                name="search"
            />

            <input
                type="submit"
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
                value={'Buscar'}
            />

        </form>
    )
}
