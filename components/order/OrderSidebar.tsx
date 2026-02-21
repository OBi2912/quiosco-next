import { prisma } from '@/src/lib/prisma'
import CategoryIcon from './ui/CategoryIcon';
import Link from 'next/link';
async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {

  const categories = await getCategories()

  return (
    <aside className="md:w-72 md:h-screen bg-white/80 backdrop-blur-xl border-r border-amber-200 shadow-lg sticky top-0">
      <nav className='mt-10'>
        <div className="space-y-3 mx-4 mb-8">
          <Link
            href="/manage-orders"
            className="block px-5 py-4 text-sm font-black uppercase tracking-wider text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl transition-all text-center"
          >
            Gestionar Ordenes
          </Link>
          <Link
            href="/manage-products"
            className="block px-5 py-4 text-sm font-black uppercase tracking-wider text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl transition-all text-center"
          >
            Gestionar Productos
          </Link>
        </div>
        <div className="space-y-1">
          {categories.map(category => (
            <CategoryIcon
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </nav>
    </aside>
  )
}

