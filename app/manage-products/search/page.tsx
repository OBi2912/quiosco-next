import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import ProductTable from "@/components/products/ProductsTable";
import Logo from "@/components/ui/Logo";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import type { ProductsWithCategory } from "@/app/admin/products/page";

async function searchProducts(searchTerm: string): Promise<ProductsWithCategory> {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: { category: true },
  });
  
  // Deduplicate products based on name, image, and categoryId
  const seen = new Set<string>();
  return products.filter((p) => {
    const key = `${p.name}|${p.image}|${p.categoryId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default async function ManageProductsSearchPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchTerm = searchParams.search ?? "";
  const products = searchTerm ? await searchProducts(searchTerm) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <Logo />
          <Link
            href="/"
            className="liquidglass-button inline-flex items-center justify-center py-2 px-4 text-gray-800 font-semibold"
          >
            Volver al inicio
          </Link>
        </div>

        <h1 className="text-3xl font-black text-gray-800 text-center mb-2">
          Buscar Productos
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {searchTerm ? `Resultados para: ${searchTerm}` : "Ingresa un término de búsqueda"}
        </p>

        <div className="liquidglass-card p-6 space-y-6">
          <ProductSearchForm searchPath="/manage-products/search" />
          {searchTerm && (
            products.length > 0 ? (
              <ProductTable products={products} />
            ) : (
              <p className="text-center text-lg py-8">No hay resultados</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
