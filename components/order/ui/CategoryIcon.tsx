"use client"
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from 'next/navigation'

type CategoryIconProps = {
  category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams()

  return (
    <div
      className={`flex items-center gap-4 w-full p-4 transition-all duration-300 border-b border-amber-100
        ${category.slug === params.category
          ? 'bg-amber-100 border-l-4 border-l-amber-500'
          : 'hover:bg-amber-50 border-l-4 border-l-transparent'}`}
    >
      <div className="relative size-12 drop-shadow-lg">
        <Image
          src={`/icon_${category.slug}.svg`}
          alt={`Imagen de la Categoria:${category.name}`}
          fill
          className="opacity-90"
        />
      </div>
      <Link
        className={`text-lg font-black tracking-wide uppercase transition-colors
            ${category.slug === params.category ? 'text-amber-600' : 'text-gray-700 hover:text-amber-500'}`}
        href={`/order/${category.slug}`}
      >
        {category.name}
      </Link>
    </div>
  )
}
