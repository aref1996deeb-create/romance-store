'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert('تم إنشاء الحساب! افحص بريدك لتأكيده')
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else router.push('/') // تحويله للرئيسية بعد الدخول
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50" dir="rtl">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-96 border-t-8 border-pink-500">
        <h1 className="text-2xl font-bold text-pink-600 mb-6 text-center">مرحباً بك في LAVEV STORE</h1>
        <input 
          type="email" placeholder="البريد الإلكتروني" 
          className="w-full p-3 mb-4 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="كلمة المرور" 
          className="w-full p-3 mb-6 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-pink-600 text-white p-3 rounded-xl mb-3 hover:bg-pink-700 transition">تسجيل الدخول</button>
        <button onClick={handleSignUp} className="w-full border-2 border-pink-600 text-pink-600 p-3 rounded-xl hover:bg-pink-50 transition">إنشاء حساب جديد</button>
      </div>
    </div>
  )
}