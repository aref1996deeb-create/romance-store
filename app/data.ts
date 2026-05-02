<<<<<<< HEAD
export const products = [
  { id: "1", name: "عباية 'بلاك دايموند' ملكية", price: 650, image: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=800" },
  { id: "2", name: "عباية الحرير الليلي", price: 890, image: "https://images.unsplash.com/photo-1563170351-be39c88e1c8c?auto=format&fit=crop&q=80&w=800" },
  { id: "3", name: "عباية 'برنسيس' الكلاسيكية", price: 520, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" },
  { id: "4", name: "عباية الشيفون المطرزة", price: 740, image: "https://images.unsplash.com/photo-1585438159101-700994998992?auto=format&fit=crop&q=80&w=800" }
=======
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  rating: number;
  reviews: { user: string; comment: string; rating: number }[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "عباية لافين الكلاسيكية",
    price: 250,
    image: "/abaya1.jpg.jfif",
    description: "عباية فاخرة من تشكيلة LAVEN الجديدة، تتميز بخامة عالية الجودة وتصميم عصري.",
    sizes: ["54", "56", "58"],
    rating: 4.8,
    reviews: [
      { user: "سارة الماجد", comment: "الخامة جداً رائعة والتوصيل سريع", rating: 5 },
      { user: "نورة علي", comment: "أعجبني التفصيل والمقاس مضبوط", rating: 4 }
    ]
  },
  {
    id: "2",
    name: "عباية لافين المناسبات",
    price: 320,
    image: "/abaya2.jpg.jfif",
    description: "تصميم أنيق جداً مخصص للمناسبات الرسمية، يجمع بين الفخامة والراحة.",
    sizes: ["54", "56", "58"],
    rating: 4.9,
    reviews: [
      { user: "أمل العتيبي", comment: "تجنن في الحقيقة أحلى من الصور", rating: 5 }
    ]
  },
  {
    id: "3",
    name: "عباية لافين اليومية",
    price: 190,
    image: "/abaya3.jpg.jfif",
    description: "عباية عملية ومريحة للاستخدام اليومي، قماش بارد ومناسب لجميع الأوقات.",
    sizes: ["54", "56", "58"],
    rating: 4.7,
    reviews: []
  },
  {
    id: "4",
    name: "عباية لافين الملكية",
    price: 450,
    image: "/abaya4.jpg.jfif",
    description: "إصدار خاص من LAVEN بتطريز يدوي فاخر لأصحاب الذوق الرفيع.",
    sizes: ["54", "56", "58"],
    rating: 5.0,
    reviews: [
      { user: "ريم خالد", comment: "فخامة تستحق كل ريال", rating: 5 }
    ]
  }
>>>>>>> a0cbb82 (تجهيز ملفات المتجر ونظام الطلبات - بواسطة عارف ديب)
];