"use client";
import { products } from "@/app/data";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // المسار الآن صحيح بعد نقل المجلد خارج app

export default function ProductPage() {
  const params = useParams(); 
  const router = useRouter(); 
  const id = params.id as string;
  
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false); 

  if (!product) return <div className="text-center py-20 text-white bg-[#0f172a] min-h-screen">المنتج غير موجود</div>;

  const handleAddToCart = async () => {
    // 1. التأكد من اختيار المقاس
    if (!selectedSize) {
      alert("لطفاً، اختر المقاس أولاً (54، 56، أو 58)");
      return;
    }

    setLoading(true);

    try {
      // 2. التحقق من وجود مستخدم مسجل دخول
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (!user || authError) {
        // 3. التوجيه لصفحة اللوجن إذا لم يكن مسجلاً
        alert('لطفاً، قم بإنشاء حساب أو تسجيل الدخول لإتمام عملية الشراء');
        router.push('/login');
        return;
      }

      // 4. إضافة المنتج للسلة في ذاكرة المتصفح
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newProduct = { 
        cartId: Date.now(),
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image,
        size: selectedSize,
        user_id: user.id 
      };
      cart.push(newProduct);
      localStorage.setItem("cart", JSON.stringify(cart));

      // إظهار إشعار النجاح
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
      // تحديث عداد السلة في الموقع
      window.dispatchEvent(new Event("cartUpdate"));

    } catch (err) {
      console.error("خطأ أثناء التحقق:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 rtl relative" dir="rtl">
      
      {showNotification && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-[#facc15] text-[#0f172a] px-8 py-4 rounded-2xl font-black shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-bounce border-2 border-white">
          ✅ تمت إضافة {product.name} إلى السلة!
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-[#facc15] mb-8 hover:bg-[#1e293b] px-4 py-2 rounded-lg gap-2 font-bold transition-all border border-transparent hover:border-[#facc15]"
        >
          <span className="text-2xl">→</span> العودة للمتجر
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative h-[600px] rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          </div>

          <div className="flex flex-col justify-start">
            <h1 className="text-5xl font-black text-[#facc15] mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6 bg-[#1e293b] w-fit px-4 py-2 rounded-full border border-gray-700">
              <span className="text-yellow-400 text-xl ml-2">★</span>
              <span className="text-gray-300">{product.rating} | تقييمات LAVEV</span>
            </div>

            <p className="text-4xl text-white font-black mb-8">{product.price} ر.س</p>
            
            <div className="bg-[#1e293b] p-6 rounded-2xl border-r-4 border-[#facc15] mb-8">
               <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 text-[#facc15]">اختر المقاس:</h3>
              <div className="flex gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 flex items-center justify-center rounded-xl border-2 font-bold transition-all ${
                      selectedSize === size 
                      ? "border-[#facc15] bg-[#facc15] text-[#0f172a] scale-110 shadow-[0_0_15px_rgba(250,204,21,0.4)]" 
                      : "border-gray-700 hover:border-[#facc15] text-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleAddToCart} 
              disabled={loading}
              className="bg-[#facc15] text-[#0f172a] py-5 rounded-2xl text-2xl font-black hover:bg-yellow-500 transition-all active:scale-95 shadow-xl transform hover:-translate-y-1 disabled:bg-gray-500"
            >
              {loading ? "جاري التحقق..." : "إضافة إلى سلة المشتريات"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}