'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TrackOrder() {
  // الحالة تبدأ بنص فارغ لضمان ظهور الـ Placeholder فقط
  const [orderNumber, setOrderNumber] = useState('')
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleTrack = async () => {
    if (!orderNumber) return
    
    setLoading(true)
    setErrorMsg('')
    setOrderData(null)

    try {
      // تنظيف النص وتحويله لحروف كبيرة للبحث
      const formattedInput = orderNumber.trim().toUpperCase()

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', formattedInput)
        .maybeSingle()

      if (error) throw error

      if (!data) {
        setErrorMsg("عذراً، لم نجد طلباً بهذا الرقم. تأكد من كتابة الرقم كاملاً (مثال: LV-1159)")
      } else {
        setOrderData(data)
      }
    } catch (err: any) {
      console.error(err)
      setErrorMsg("حدث خطأ أثناء جلب البيانات")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8 text-right font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-10 text-center">
          تتبع طلبك - LAVEV STORE
        </h1>
        
        {/* شريط البحث النظيف */}
        <div className="flex flex-row-reverse gap-0 mb-12 shadow-lg rounded-2xl overflow-hidden border-2 border-pink-200 bg-white">
          <button 
            onClick={handleTrack}
            disabled={loading}
            className="bg-pink-600 text-white px-6 md:px-10 py-4 md:py-5 font-bold text-lg md:text-xl hover:bg-pink-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? '...' : 'تتبع الآن'}
          </button>
          <input 
            type="text" 
            // النص الإرشادي كما ظهر في صورتك تماماً
            placeholder="أدخل رقم الطلب (مثلاً: LV-1159)"
            value={orderNumber} 
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            className="flex-1 p-4 md:p-5 outline-none text-right text-base md:text-lg text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* التنبيهات والنتائج */}
        {errorMsg && (
          <div className="text-center text-red-500 bg-red-50 p-4 rounded-xl mb-6 border border-red-100">
            {errorMsg}
          </div>
        )}

        {orderData && (
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border-t-8 border-pink-500 animate-in fade-in">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
              مرحباً عميلنا العزيز ✨
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-gray-500">رقم الطلب</span>
                <span className="font-bold text-gray-800 text-lg md:text-xl">{orderData.order_number}</span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-4 rounded-2xl border border-green-100">
                <span className="text-gray-500">حالة الطلب</span>
                <span className="font-bold text-green-600 text-lg md:text-xl">{orderData.status || 'قيد التجهيز'}</span>
              </div>
              <div className="flex justify-between items-center bg-pink-50 p-4 rounded-2xl border border-pink-100">
                <span className="text-gray-500">إجمالي المبلغ</span>
                <span className="font-bold text-pink-600 text-lg md:text-xl">{orderData.total_price} ريال</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}