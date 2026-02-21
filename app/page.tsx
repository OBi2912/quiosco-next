import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="liquidglass-card p-12 max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <Image
              src="/logo.svg"
              alt="Quiosco FoodObi"
              fill
              priority
            />
          </div>
        </div>
        <h1 className="text-2xl font-black text-gray-800">Quiosco FoodObi</h1>
        <p className="text-gray-600">¿Qué deseas hacer?</p>
        <div className="space-y-4">
          <Link
            href="/order/cafe"
            className="liquidglass-button block w-full py-4 px-6 text-lg font-bold text-gray-800 hover:text-amber-700 transition-colors"
          >
            Hacer Pedido
          </Link>
          <Link
            href="/manage-orders"
            className="liquidglass-button block w-full py-4 px-6 text-lg font-bold text-gray-800 hover:text-amber-700 transition-colors"
          >
            Gestionar Ordenes
          </Link>
          <Link
            href="/manage-products"
            className="liquidglass-button block w-full py-4 px-6 text-lg font-bold text-gray-800 hover:text-amber-700 transition-colors"
          >
            Gestionar Productos
          </Link>
        </div>
      </div>
    </div>
  );
}
