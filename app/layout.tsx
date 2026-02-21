import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const font = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '900']
})
export const metadata: Metadata = {
  title: "Quiosco FoodObi",
  description: "Quiosco Next.js",
  icons: {
    icon: "/food quiosco.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${font.className} bg-slate-900 min-h-screen relative overflow-x-hidden antialiased`}
      >
        {/* Animated Background Blobs */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/30 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-amber-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        {children}
      </body>
    </html>
  );
}
