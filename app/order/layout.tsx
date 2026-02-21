import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/order/ui/ToastNotification";
import { ToastContainer } from "react-toastify";

export default function RootLayout ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.ReactNode {
    return (
        <>
        <div className="md:flex min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <OrderSidebar/>
            <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                {children}
            </main>
            <OrderSummary/>
        </div>
        <ToastNotification/>
        </>
    )
}