<<<<<<< HEAD
"use client";
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Trash2, MapPin } from 'lucide-react';

const products = [
  { id: 1, name: "عباية شيفون ناعمة", price: 390, image: "/abaya1.jpg.jfif", description: "عباية شيفون فاخرة بتصميم ناعم وعصري", color: "أسود", sizes: ["S", "M", "L", "XL", "Free Size"] },
  { id: 2, name: "عباية حرير كلاسيك", price: 850, image: "/abaya2.jpg.jfif", description: "عباية من الحرير الطبيعي بلمسة كلاسيكية راقية", color: "أسود", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 3, name: "عباية مطرزة فاخرة", price: 680, image: "/abaya3.jpg.jfif", description: "عباية مطرزة يدوياً للمناسبات الخاصة", color: "أسود", sizes: ["S", "M", "L", "XL"] },
  { id: 4, name: "عباية ملكية سوداء", price: 450, image: "/abaya4.jpg.jfif", description: "عباية بقصة ملكية تمنحك حضوراً مميزاً", color: "أسود", sizes: ["S", "M", "L", "XL", "XXL"] }
];

export default function Home() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({ 1: 1, 2: 1, 3: 1, 4: 1 });
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [locationUrl, setLocationUrl] = useState("");

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  };

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const addToCart = (product: any) => {
    const size = selectedSizes[product.id];
    if (!size) { alert("يا غالي، لازم تختار المقاس أولاً!"); return; }
    const qty = quantities[product.id];
    setCart(prev => [...prev, { ...product, selectedSize: size, quantity: qty }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => { setCart(prev => prev.filter((_, i) => i !== index)); };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ميزة تحديد الموقع الجغرافي
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const url = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        setLocationUrl(url);
        alert("تم تحديد موقعك بنجاح! سيتم إرساله مع الطلب ✅");
      }, () => {
        alert("عذراً، لم نتمكن من تحديد موقعك. يرجى كتابة العنوان يدوياً.");
      });
    }
  };

  const checkoutWhatsApp = () => {
    if (!address && !locationUrl) { alert("يرجى إدخال العنوان أو تحديد الموقع لإتمام التوصيل"); return; }
    
    const phoneNumber = "963946123673"; 
    let message = `*طلب جديد من رومانس ستور*\n\n`;
    cart.forEach((item, index) => {
      message += `*${index + 1}- ${item.name}*\n- المقاس: ${item.selectedSize}\n- الكمية: ${item.quantity}\n- السعر: ${item.price * item.quantity} ر.س\n\n`;
    });
    message += `*الإجمالي: ${totalPrice} ر.س*\n\n`;
    message += `📍 *عنوان التوصيل:* ${address || "موضح في رابط الخريطة"}\n`;
    if (locationUrl) message += `🌍 *موقع العميل:* ${locationUrl}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white" dir="rtl">
      <header className="flex justify-between items-center p-6 bg-[#1e293b] shadow-xl sticky top-0 z-50">
        <button onClick={() => setIsCartOpen(true)} className="relative bg-slate-700 p-2 rounded-full hover:bg-slate-600 transition">
          <ShoppingCart className="w-6 h-6 text-orange-400" />
          {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] px-2 py-0.5 rounded-full">{cart.length}</span>}
        </button>
        <h1 className="text-2xl font-bold text-orange-400">رومانس ستور</h1>
        <div className="w-10"></div>
      </header>

      {/* السلة الجانبية مع خدمة التوصيل */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-[#1e293b] h-full shadow-2xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
              <h2 className="text-xl font-bold text-orange-400">سلة التسوق</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white"><X /></button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20 text-slate-500 font-bold">السلة فارغة..</div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="bg-[#0f172a] p-3 rounded-xl flex gap-4 border border-slate-700">
                    <img src={item.image} className="w-14 h-18 object-cover rounded-lg" alt={item.name} />
                    <div className="flex-grow">
                      <h3 className="text-xs font-bold">{item.name}</h3>
                      <p className="text-[10px] text-slate-400">مقاس: {item.selectedSize} | عدد: {item.quantity}</p>
                      <p className="text-orange-400 font-bold text-sm">{item.price * item.quantity} ر.س</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}

                {/* قسم التوصيل الجديد */}
                <div className="mt-8 p-4 bg-[#0f172a] rounded-2xl border border-orange-400/20">
                  <h3 className="text-sm font-bold mb-4 text-orange-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> معلومات التوصيل
                  </h3>
                  <textarea 
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-orange-400 mb-3"
                    placeholder="اكتب عنوانك بالتفصيل (المدينة، الحي، الشارع)..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                  />
                  <button 
                    onClick={getCurrentLocation}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl text-[10px] flex items-center justify-center gap-2 transition"
                  >
                    <MapPin className="w-3 h-3" /> {locationUrl ? "تم تحديد موقعك ✅" : "تحديد موقعي الحالي (GPS)"}
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                  <div className="flex justify-between text-xl font-bold mb-6 text-orange-400">
                    <span>الإجمالي:</span>
                    <span>{totalPrice} ر.س</span>
                  </div>
                  <button onClick={checkoutWhatsApp} className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition shadow-lg">
                    إرسال الطلب والموقع عبر الواتساب
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* عرض المنتجات */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-[#1e293b] rounded-3xl p-5 border border-slate-700 flex flex-col h-full hover:border-orange-400/50 transition-all shadow-xl">
            <div className="relative h-72 mb-4 overflow-hidden rounded-2xl bg-slate-800">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
            </div>
            <h2 className="text-lg font-bold text-center mb-2">{product.name}</h2>
            <div className="mb-4">
              <div className="flex flex-wrap justify-center gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => handleSizeSelect(product.id, size)} className={`px-2 py-1 text-[10px] rounded border transition-all ${selectedSizes[product.id] === size ? 'bg-orange-400 border-orange-400 text-slate-900' : 'border-slate-600'}`}>{size}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 bg-[#0f172a] rounded-xl py-2 mb-4 border border-slate-700">
              <button onClick={() => updateQuantity(product.id, 1)} className="text-orange-400"><Plus className="w-4 h-4" /></button>
              <span className="font-bold">{quantities[product.id]}</span>
              <button onClick={() => updateQuantity(product.id, -1)} className="text-orange-400"><Minus className="w-4 h-4" /></button>
            </div>
            <div className="mt-auto">
              <div className="text-xl font-bold text-center text-orange-400 mb-3">{product.price} ر.س</div>
              <button onClick={() => addToCart(product)} className="w-full bg-orange-400 hover:bg-orange-500 text-slate-900 py-3 rounded-xl font-bold">إضافة للسلة</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
=======
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
>>>>>>> a0cbb82 (تجهيز ملفات المتجر ونظام الطلبات - بواسطة عارف ديب)
}