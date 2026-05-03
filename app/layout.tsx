// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "متجر رومانس | Romance Store",
  description: "أرقى العبايات والبشوت بتصاميم سعودية فاخرة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        {/* تغليف كامل التطبيق بمزود السلة لتعمل في كل الصفحات */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "متجر رومانس | Romance Store",
  description: "أرقى العبايات والبشوت بتصاميم سعودية فاخرة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        {/* تغليف كامل التطبيق بمزود السلة لتعمل في كل الصفحات */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}