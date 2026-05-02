import { createClient } from '@supabase/supabase-js'

// جلب المفاتيح من ملف .env.local الذي أنشأته
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// تصدير العميل لاستخدامه في باقي صفحات الموقع
export const supabase = createClient(supabaseUrl, supabaseAnonKey)