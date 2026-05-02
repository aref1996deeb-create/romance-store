"use client";
import { products } from "./data";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdate", updateCartCount);
    return () => window.removeEventListener("cartUpdate", updateCartCount);
  }, []);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white rtl" dir="rtl">
      
      {/* 1. شريط الإعلانات المتحرك (جديد) */}
      <div className="bg-[#facc15] text-[#0f172a] py-2 overflow-hidden whitespace-nowrap border-b border-white/20">
        <div className="inline-block animate-marquee font-bold text-sm">
          ✨ توصيل مجاني للطلبات فوق 500 ريال • خامات ملكية فاخرة • خصم 10% بمناسبة الافتتاح • عبايات LAVEN تعكس أناقتك ✨
        </div>
      </div>

      <header className="flex justify-between items-center py-10 px-6 max-w-7xl mx-auto">
        <Link href="/cart" className="relative bg-[#1e293b] p-4 rounded-2xl border border-gray-700 hover:border-[#facc15] transition-all group">
          <span className="text-2xl group-hover:scale-110 block transition-transform">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse">
              {cartCount}
            </span>
          )}
        </Link>
        
        <div className="text-center">
          <h1 className="text-7xl font-black text-[#facc15] tracking-tighter mb-2">LAVEN</h1>
          <p className="text-gray-400 tracking-[0.3em] text-xs uppercase font-light">Royal Abaya Collection</p>
        </div>
        
        <div className="w-16"></div> 
      </header>

      {/* 2. قسم الـ Hero (جديد) */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="relative h-[400px] rounded-[40px] overflow-hidden border border-gray-800 shadow-2xl">
          <Image src="/hero-bg.jpg" alt="Laven Collection" fill className="object-cover opacity-50" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-gradient-to-t from-[#0f172a] to-transparent">
            <h2 className="text-4xl md:text-6xl font-black mb-4">تشكيلة الربيع الملكية</h2>
            <p className="text-xl text-gray-300 max-w-2xl">اكتشفي الفخامة في كل تفصيلة، عبايات صُممت لتناسب ذوقك الرفيع</p>
          </div>
        </div>
      </section>

      {/* 3. قسم المنتجات */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black border-r-4 border-[#facc15] pr-4">أحدث التصاميم</h2>
          <div className="h-[1px] flex-1 bg-gray-800 mr-8"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group">
              <div className="bg-[#1e293b] rounded-[32px] overflow-hidden border border-gray-800 transition-all duration-500 hover:-translate-y-2 group-hover:border-[#facc15]/50 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                <div className="relative h-96 w-full">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-[#facc15] text-[#0f172a] text-[10px] font-black px-3 py-1 rounded-full uppercase">جديد</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-gray-200">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-[#facc15] text-xl font-black">{product.price} ر.س</p>
                    <span className="text-gray-500 text-xs">عرض التفاصيل ←</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. تذييل الصفحة (Footer) المطور */}
      <footer className="bg-[#0a0f1d] border-t border-gray-800 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          <div>
            <h3 className="text-[#facc15] text-2xl font-black mb-6">LAVEN</h3>
            <p className="text-gray-400 leading-relaxed">
              متجر لافين للعبايات، وجهتك الأولى للأناقة الخليجية واللمسات العصرية. نحن نهتم بأدق التفاصيل لنمنحك إطلالة ملكية.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">روابط سريعة</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link href="/" className="hover:text-[#facc15]">الرئيسية</Link></li>
              <li><Link href="/cart" className="hover:text-[#facc15]">سلة المشتريات</Link></li>
              <li><a href="#" className="hover:text-[#facc15]">سياسة الاستبدال</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white">تواصل معنا</h4>
            <div className="flex justify-center md:justify-start gap-6">
              <a href="https://wa.me/963946123673" className="w-12 h-12 bg-[#1e293b] rounded-full flex items-center justify-center hover:bg-[#25d366] transition-colors border border-gray-700">💬</a>
              <a href="#" className="w-12 h-12 bg-[#1e293b] rounded-full flex items-center justify-center hover:bg-gradient-to-tr from-yellow-400 to-purple-600 transition-colors border border-gray-700">📸</a>
              <a href="#" className="w-12 h-12 bg-[#1e293b] rounded-full flex items-center justify-center hover:bg-black transition-colors border border-gray-700">𝕏</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-900 mt-16 pt-8 text-center text-gray-600 text-sm">
          جميع الحقوق محفوظة لمتجر لافين © 2026 | تطوير عارف 
        </div>
      </footer>

      {/* تنسيق الأنيميشن للشريط المتحرك */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </main>
  );
}