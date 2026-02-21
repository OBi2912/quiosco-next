"use client";

import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { OrderWithProducts } from "@/src/types";

export default function ManageOrdersPage() {
  const url = "/admin/orders/api";
  const fetcher = () => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 2000,
    revalidateOnFocus: true,
  });

  if (isLoading) return <p className="text-center p-10">Cargando ordenes...</p>;
  if (error) return <p className="text-center p-10 text-red-600">Error al cargar las ordenes</p>;

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
          Gestionar Ordenes
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Ordenes pendientes por completar
        </p>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="liquidglass-card p-12 text-center">
            <p className="text-xl text-gray-600">No hay ordenes pendientes</p>
            <Link
              href="/order/cafe"
              className="liquidglass-button inline-block mt-4 py-2 px-6 font-semibold text-gray-800"
            >
              Ir a tomar pedidos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
