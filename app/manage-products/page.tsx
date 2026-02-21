import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Logo from "@/components/ui/Logo";
import type { ProductsWithCategory } from "@/app/admin/products/page";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function getProducts(page: number, pageSize: number): Promise<ProductsWithCategory> {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
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

async function productCount() {
  return prisma.product.count();
}

export default async function ManageProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = +(searchParams.page ?? 1) || 1;
  const pageSize = 10;

  if (page < 1) redirect("/manage-products");
  const [products, totalProducts] = await Promise.all([
    getProducts(page, pageSize),
    productCount(),
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize) || 1;
  if (page > totalPages) redirect("/manage-products");

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
          Gestionar Productos
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Crear, editar y buscar productos
        </p>

        <div className="liquidglass-card p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <Link
              href="/admin/products/new"
              className="liquidglass-button inline-flex justify-center py-3 px-6 font-bold text-gray-800"
            >
              Crear Producto
            </Link>
            <ProductSearchForm searchPath="/manage-products/search" />
          </div>

          <ProductTable products={products} />
          <ProductsPagination
            page={page}
            totalPages={totalPages}
            basePath="/manage-products"
          />
        </div>
      </div>
    </div>
  );
}
