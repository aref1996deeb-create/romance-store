<<<<<<< HEAD
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const myPhoneNumber = "9665XXXXXXXX"; // ضعي رقم جوالك هنا مع مفتاح الدولة بدون أصفار

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(data);
  }, []);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  // --- الدالة المسؤولة عن إرسال الطلب للواتساب ---
  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "مرحباً رومانس ستور، أود طلب المنتجات التالية:\n\n";
    let total = 0;

    cartItems.forEach((item: any, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      message += `${index + 1}- ${item.name}\n   الكمية: ${item.quantity}\n   السعر: ${itemTotal} ر.س\n\n`;
    });

    message += `------------------\n`;
    message += `💰 الإجمالي النهائي: ${total} ر.س\n`;
    message += `------------------\n`;
    message += `أرجو تأكيد الطلب وتزويدي بطريقة الدفع.`;

    // ترميز الرسالة لتعمل في الرابط
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodedMessage}`;

    // فتح الواتساب في نافذة جديدة
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0f1111] text-white p-6" dir="rtl">
      <header className="flex justify-between items-center mb-10 bg-[#131921] p-6 rounded-2xl border border-white/5 shadow-lg">
        <h1 className="text-2xl font-black text-[#febd69]">سلة المشتريات 🛒</h1>
        <Link href="/" className="text-sm text-gray-400 bg-[#232f3e] px-4 py-2 rounded-lg hover:text-[#febd69]">العودة للمتجر</Link>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-6">السلة فارغة حالياً..</p>
          <Link href="/" className="bg-[#febd69] text-black px-10 py-4 rounded-2xl font-black shadow-xl inline-block transition-transform hover:scale-105">ابدأ التسوق</Link>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {cartItems.map((item: any, index) => (
            <div key={index} className="flex items-center justify-between bg-[#1a1c1c] p-4 rounded-2xl border border-white/5 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#232f3e] rounded-xl flex items-center justify-center text-3xl shadow-inner">👗</div>
                <div>
                  <h3 className="font-bold text-[#febd69] text-sm">{item.name}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">الكمية: {item.quantity}</p>
                </div>
              </div>
              <div className="text-left">
                <div className="font-black text-[#febd69]">{(item.price * item.quantity).toLocaleString('en-US')} ر.س</div>
              </div>
            </div>
          ))}

          <div className="pt-10 space-y-4">
            <div className="bg-[#131921] p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between text-xl font-black">
                <span>إجمالي الطلب:</span>
                <span className="text-[#febd69]">
                  {cartItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0).toLocaleString('en-US')} ر.س
                </span>
              </div>
            </div>

            {/* الآن الزر سيفتح الواتساب برسالة مرتبة */}
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(37,211,102,0.2)] hover:bg-[#1ebd5e] transition-all flex items-center justify-center gap-3"
            >
              <span>إتمام الطلب عبر واتساب</span>
              <span className="text-2xl">💬</span>
            </button>

            <button onClick={clearCart} className="w-full text-gray-600 text-xs py-2 hover:text-red-500 transition-colors">
              تفريغ السلة تماماً
            </button>
          </div>
        </div>
      )}
      
      <footer className="py-12 text-center text-gray-800 text-[10px] tracking-widest uppercase">
        Romance Store — WhatsApp Checkout System
      </footer>
    </main>
  );
=======
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  
  // حقول البيانات لملء الأعمدة في قاعدة البيانات
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setUserEmail(data.session.user.email || null)
        setUserName(data.session.user.user_metadata?.full_name || '')
      }
    }
    getSession()
  }, [])

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("السلة فارغة!")
    if (!userEmail) return alert("يرجى تسجيل الدخول أولاً لإتمام الطلب")
    if (!userName || !userPhone) return alert("يرجى إكمال بيانات الاسم ورقم الهاتف")

    setLoading(true)
    const orderNumber = "LV-" + Math.floor(1000 + Math.random() * 9000)

    try {
      // الإرسال لـ Supabase مع ضمان تعبئة جميع الأعمدة
      const { error } = await supabase
        .from('orders')
        .insert([
          { 
            order_number: orderNumber, 
            status: 'قيد التجهيز', 
            customer_name: userName,    
            customer_email: userEmail,
            customer_phone: userPhone,  
            total_price: totalPrice,
            items: cart                 
          }
        ])

      if (error) throw error

      // تجهيز رسالة الواتساب لمتجر LAVEV STORE
      const phoneNumber = "963946123673"
      const itemsList = cart.map(item => `- ${item.name} (${item.quantity || 1})`).join('%0A')
      const message = `🌸 *طلب جديد من LAVEV STORE* 🌸%0A%0A` +
                      `👤 *الاسم:* ${userName}%0A` +
                      `📞 *الهاتف:* ${userPhone}%0A` +
                      `📧 *الإيميل:* ${userEmail}%0A` +
                      `🔢 *رقم الطلب:* ${orderNumber}%0A%0A` +
                      `🛍️ *المنتجات:*%0A${itemsList}%0A%0A` +
                      `💰 *الإجمالي:* ${totalPrice} ريال`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      localStorage.removeItem('cart')
      window.location.href = whatsappUrl;

    } catch (error: any) {
      console.error("Supabase Error:", error.message)
      alert("حدث خطأ أثناء حفظ الطلب: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 p-8 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-600 mb-8 border-b-2 border-pink-200 pb-4">
          سلة المشتريات 🛍️
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-6">سلتك فارغة حالياً..</p>
            <Link href="/" className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition">
              العودة للمتجر
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              
              {/* قسم بيانات التوصيل مع إصلاح لون النص */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-pink-100">
                <h2 className="font-bold text-gray-800 mb-4">بيانات التوصيل</h2>
                <div className="grid grid-cols-1 gap-4">
                  <input 
                    type="text" 
                    placeholder="الاسم الكامل" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    // التعديل: text-gray-900 لضمان ظهور الكتابة بوضوح
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-gray-900 bg-white placeholder-gray-400"
                    required
                  />
                  <input 
                    type="tel" 
                    placeholder="رقم الهاتف (واتساب)" 
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    // التعديل: text-gray-900 لضمان ظهور الكتابة بوضوح
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none text-gray-900 bg-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* قائمة المنتجات */}
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-pink-100">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center text-2xl">✨</div>
                      <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-pink-500 font-semibold">{item.price} ريال</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newCart = cart.filter((_, i) => i !== index)
                        setCart(newCart); localStorage.setItem('cart', JSON.stringify(newCart))
                      }}
                      className="text-red-400 hover:text-red-600 p-2"
                    >حذف</button>
                  </div>
                ))}
              </div>
            </div>

            {/* ملخص الطلب */}
            <div className="bg-white p-6 rounded-3xl shadow-lg h-fit border-t-4 border-pink-500">
              <h2 className="text-xl font-bold mb-6 text-gray-800">ملخص الطلب</h2>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>إجمالي المنتجات:</span>
                <span>{totalPrice} ريال</span>
              </div>
              <div className="flex justify-between mb-8 text-xl font-bold text-pink-600 border-t pt-4">
                <span>المجموع النهائي:</span>
                <span>{totalPrice} ريال</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-md disabled:bg-gray-300"
              >
                {loading ? 'جاري الحفظ...' : 'إتمام الطلب عبر واتساب'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
>>>>>>> a0cbb82 (تجهيز ملفات المتجر ونظام الطلبات - بواسطة عارف ديب)
}