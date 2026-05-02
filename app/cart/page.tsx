"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // تحميل السلة
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);

    // جلب بيانات الجلسة إذا كان مسجلاً للدخول
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserEmail(data.session.user.email || null);
        setUserName(data.session.user.user_metadata?.full_name || '');
      }
    };
    getSession();
  }, []);

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("السلة فارغة!");
    if (!userName || !userPhone) return alert("يرجى إكمال بيانات الاسم ورقم الهاتف");

    setLoading(true);
    const orderNumber = "LV-" + Math.floor(1000 + Math.random() * 9000);

    try {
      // 1. الحفظ في Supabase للأرشفة
      const { error } = await supabase
        .from('orders')
        .insert([{ 
            order_number: orderNumber, 
            customer_name: userName, 
            customer_phone: userPhone, 
            customer_email: userEmail,
            total_price: totalPrice, 
            items: cart,
            status: 'قيد التجهيز'
        }]);

      if (error) throw error;

      // 2. تجهيز وإرسال الواتساب
      const myNumber = "963946123673"; // رقم متجرك
      const itemsList = cart.map(item => `- ${item.name} (${item.quantity || 1})`).join('%0A');
      const message = `🌸 *طلب جديد من LAVEV STORE* 🌸%0A%0A` +
                      `👤 *الاسم:* ${userName}%0A` +
                      `📞 *الهاتف:* ${userPhone}%0A` +
                      `🔢 *رقم الطلب:* ${orderNumber}%0A%0A` +
                      `🛍️ *المنتجات:*%0A${itemsList}%0A%0A` +
                      `💰 *الإجمالي:* ${totalPrice} ريال`;

      localStorage.removeItem('cart');
      window.location.href = `https://wa.me/${myNumber}?text=${message}`;

    } catch (error: any) {
      alert("حدث خطأ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f1111] text-white p-6" dir="rtl">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-10 bg-[#1a1c1c] p-6 rounded-2xl border border-white/5">
        <h1 className="text-2xl font-black text-orange-500">سلة المشتريات 🛍️</h1>
        <Link href="/" className="text-sm bg-white/5 px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors">العودة للمتجر</Link>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-6 text-xl">سلتك فارغة حالياً..</p>
          <Link href="/" className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black">ابدأ التسوق</Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* بيانات العميل */}
            <div className="bg-[#1a1c1c] p-6 rounded-2xl border border-white/5 space-y-4">
              <h2 className="font-bold text-orange-500 mb-2">بيانات التوصيل</h2>
              <input 
                type="text" placeholder="الاسم الكامل" value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-4 bg-[#0f1111] border border-white/10 rounded-xl focus:border-orange-500 outline-none text-white"
              />
              <input 
                type="tel" placeholder="رقم الهاتف (واتساب)" value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full p-4 bg-[#0f1111] border border-white/10 rounded-xl focus:border-orange-500 outline-none text-white"
              />
            </div>

            {/* المنتجات */}
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-[#1a1c1c] p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 text-xl font-bold">LV</div>
                    <div>
                      <h3 className="font-bold text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">الكمية: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <div className="font-bold text-orange-500">{item.price} ريال</div>
                </div>
              ))}
            </div>
          </div>

          {/* ملخص الحساب */}
          <div className="bg-[#1a1c1c] p-6 rounded-2xl border-t-4 border-orange-500 h-fit space-y-6 shadow-xl">
            <h2 className="text-xl font-bold">ملخص الحساب</h2>
            <div className="flex justify-between text-gray-400">
              <span>المجموع:</span>
              <span>{totalPrice} ريال</span>
            </div>
            <div className="flex justify-between text-2xl font-black border-t border-white/5 pt-4">
              <span>الإجمالي:</span>
              <span className="text-orange-500">{totalPrice} ريال</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#25D366] hover:bg-[#1ebd5e] text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'جاري المعالجة...' : 'تأكيد الطلب عبر واتساب 💬'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}