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
];