/**
 * بيانات المشاريع — المصدر الوحيد للقائمة والمعاينة والتفاصيل والعدادات.
 * لتعديل أو إضافة مشروع، عدّل هذا الملف فقط. الترقيم وعدد المشاريع تلقائيان.
 * group: fullstack | frontend | dashboard
 * image: مسار الصورة داخل الموقع، أو null لاستخدام coverTitle وcoverCaption.
 * name / title / headline / category / description / focus: نصوص en وar.
 * حافظ على id مميز لكل مشروع، وضع رابط العرض في url والتقنيات في stack.
 * يُحمّل index.html هذا الملف قبل js.js باستخدام defer، ولا يحتاج الموقع إلى build.
 */
const portfolioProjects = [
    {
    "id": "elegante",
    "group": "fullstack",
    "category": {
      "en": "Fashion · Front-end",
      "ar": "أزياء · واجهات"
    },
    "title": {
      "en": "Elegante — Everyday, elevated",
      "ar": "إليجانتي — تجربة أزياء راقية"
    },
    "description": {
      "en": "A menswear e-commerce interface with collection-led browsing, product presentation and a polished visual identity.",
      "ar": "واجهة متجر ملابس رجالية لتصفح المجموعات وعرض المنتجات ضمن هوية بصرية متناسقة."
    },
    "focus": {
      "en": "Fashion collections and storefront interface",
      "ar": "مجموعات الأزياء وواجهة المتجر"
    },
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vue.js"
    ],
    "url": "https://pree.infinityfree.me/store",
    "image": "img/إعلان تقني مع رمز QR (11).webp",
    "host": "e-commerce.vercel.app",
    "color": "#ddd5c4",
    "ink": "#514735",
    "name": {
      "en": "Elegante",
      "ar": "إليجانتي"
    },
    "headline": {
      "en": "A considered menswear storefront",
      "ar": "واجهة متجر أزياء رجالية"
    }
  },
  // {
  //   "id": "bistro",
  //   "group": "fullstack",
  //   "category": {
  //     "en": "Restaurant · Full-stack",
  //     "ar": "مطعم · تطوير متكامل"
  //   },
  //   "title": {
  //     "en": "Bistro — A better way to order",
  //     "ar": "بيسترو — تجربة طلب أوضح"
  //   },
  //   "description": {
  //     "en": "A restaurant menu with dish discovery, categories and an ordering experience connected to a PHP back end.",
  //     "ar": "قائمة مطعم لتصفح الأطباق والتصنيفات وتجهيز الطلبات، متصلة ببرمجة خلفية بـ PHP."
  //   },
  //   "focus": {
  //     "en": "Menu browsing, categories and ordering",
  //     "ar": "تصفح القائمة والتصنيفات والطلبات"
  //   },
  //   "stack": [
  //     "Vue.js",
  //     "JavaScript",
  //     "PHP",
  //     "AJAX",
  //     "CSS3"
  //   ],
  //   "url": "https://pree.infinityfree.me/bistro/index.php",
  //   "image": "assets/project-bistro.jpg",
  //   "host": "pree.infinityfree.me / bistro",
  //   "color": "#d1dbc1",
  //   "ink": "#32402c",
  //   "name": {
  //     "en": "Bistro",
  //     "ar": "بيسترو"
  //   },
  //   "headline": {
  //     "en": "Restaurant menu & ordering",
  //     "ar": "قائمة طعام وتجربة طلبات"
  //   }
  // },
  {
    "id": "abaq",
    "group": "fullstack",
    "category": {
      "en": "E-commerce · Full-stack",
      "ar": "متجر إلكتروني · تطوير متكامل"
    },
    "title": {
      "en": "ABAQ — An elegant storefront",
      "ar": "عبق — متجر يعكس الهوية"
    },
    "description": {
      "en": "An Arabic fashion storefront bringing product collections, discovery and brand identity into one shopping experience.",
      "ar": "متجر أزياء عربي يجمع المجموعات وتصفح المنتجات والهوية البصرية في تجربة تسوق واحدة."
    },
    "focus": {
      "en": "Product collections and Arabic shopping experience",
      "ar": "مجموعات المنتجات وتجربة تسوق عربية"
    },
    "stack": [
      "Vue.js",
      "PHP",
      "JavaScript",
      "AJAX",
      "CSS3"
    ],
    "url": "https://pree.infinityfree.me/abaya/",
    "image": "img/Luxury Arabic Abaya Boutique Showcase.webp",
    "host": "pree.infinityfree.me / abaya",
    "color": "#e0cdb5",
    "ink": "#514130",
    "name": {
      "en": "ABAQ",
      "ar": "عبق"
    },
    "headline": {
      "en": "An Arabic fashion storefront",
      "ar": "متجر أزياء بهوية عربية"
    }
  },
  {
    "id": "clinic",
    "group": "frontend",
    "category": {
      "en": "Healthcare · Front-end",
      "ar": "موقع طبي · واجهات"
    },
    "title": {
      "en": "Obesity Clinic — Designed for trust",
      "ar": "دنتال كير — واجهة تبني الثقة"
    },
    "description": {
      "en": "A dental clinic website featuring before-and-after photos of patients, along with direct contact methods..",
      "ar": "موقع عيادة اسنان مع صور لي العملاء قبل وبعد و ايضا طرق تواصل مباشره."
    },
    "focus": {
      "en": "Service discovery and appointment navigation",
      "ar": "استعراض الخدمات والوصول إلى الحجز"
    },
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vue.js"
    ],
    "url": "https://omar342004.kesug.com/clinic1/index.html",
    "image": "img/Arabic Surgical Website Device Mockup.webp",
    "host": "clinic2-alpha.vercel.app",
    "color": "#c6dde1",
    "ink": "#2d4c53",
    "name": {
      "en": "Obesity Clinic",
      "ar": "دنتال كير"
    },
    "headline": {
      "en": "A clear, approachable clinic website",
      "ar": "موقع عيادة واضح وسهل الاستخدام"
    }
  },
  {
    "id": "hotel",
    "group": "frontend",
    "category": {
      "en": "Hospitality · Front-end",
      "ar": "ضيافة · واجهات"
    },
    "title": {
      "en": "Serenity Palace — A digital welcome",
      "ar": "قصر السكينة — ترحيب رقمي"
    },
    "description": {
      "en": "An Arabic hospitality website presenting rooms, services and the atmosphere of a hotel through an immersive layout.",
      "ar": "موقع ضيافة عربي يستعرض الغرف والخدمات وأجواء الفندق من خلال تصميم بصري متكامل."
    },
    "focus": {
      "en": "Hospitality presentation and room exploration",
      "ar": "عرض تجربة الضيافة واستكشاف الغرف"
    },
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vue.js"
    ],
    "url": "https://hotel-plum-nine.vercel.app/",
    "image": "img/Luxury Arabic Resort Website Showcase.webp",
    "host": "hotel-plum-nine.vercel.app",
    "color": "#cfcde0",
    "ink": "#49465a",
    "name": {
      "en": "Serenity Palace",
      "ar": "قصر السكينة"
    },
    "headline": {
      "en": "Hospitality, brought to the web",
      "ar": "تجربة ضيافة على الويب"
    }
  },
  {
    "id": "bistro-admin",
    "group": "dashboard",
    "category": {
      "en": "Administration · Dashboard",
      "ar": "إدارة · لوحة تحكم"
    },
    "title": {
      "en": "Bistro — Behind the menu",
      "ar": "بيسترو — خلف القائمة"
    },
    "description": {
      "en": "A management panel for organising restaurant meals, item details and product imagery.",
      "ar": "لوحة إدارة لتنظيم وجبات المطعم وتفاصيل الأصناف وصورها."
    },
    "focus": {
      "en": "Meal and menu content management",
      "ar": "إدارة الوجبات ومحتوى القائمة"
    },
    "stack": [
      "Vue.js",
      "PHP",
      "AJAX",
      "JavaScript"
    ],
    "url": "https://pree.infinityfree.me/bistro/dashboard/dashboard.php",
    "image": null,
    "coverTitle": "BISTRO",
    "coverCaption": "MENU MANAGEMENT",
    "color": "#cdd4bd",
    "ink": "#39472e",
    "name": {
      "en": "Bistro Admin",
      "ar": "إدارة بيسترو"
    },
    "headline": {
      "en": "Behind the restaurant menu",
      "ar": "إدارة محتوى المطعم"
    }
  },
  {
    "id": "abaq-admin",
    "group": "dashboard",
    "category": {
      "en": "E-commerce · Dashboard",
      "ar": "متجر إلكتروني · لوحة تحكم"
    },
    "title": {
      "en": "ABAQ — Product management",
      "ar": "عبق — إدارة المنتجات"
    },
    "description": {
      "en": "An administration interface for managing the products behind the ABAQ fashion storefront.",
      "ar": "واجهة إدارية لإدارة المنتجات التي يعرضها متجر عبق للأزياء."
    },
    "focus": {
      "en": "Fashion catalogue and product administration",
      "ar": "إدارة كتالوج الأزياء والمنتجات"
    },
    "stack": [
      "Vue.js",
      "PHP",
      "MySQL",
      "AJAX"
    ],
    "url": "https://pree.infinityfree.me/abaya/dashboard/dashboard.php",
    "image": null,
    "coverTitle": "ABAQ",
    "coverCaption": "COMMERCE ADMINISTRATION",
    "color": "#d5c7b7",
    "ink": "#514235",
    "name": {
      "en": "ABAQ Admin",
      "ar": "إدارة عبق"
    },
    "headline": {
      "en": "An organised product catalogue",
      "ar": "كتالوج منتجات منظم"
    }
  },
  {
    "id": "marketing",
    "group": "frontend",
    "category": {
      "en": "Marketing · Front-end",
      "ar": "تسويق · واجهات"
    },
    "title": {
      "en": "Pixel Pro — A confident presence",
      "ar": "بيكسل برو — حضور رقمي واضح"
    },
    "description": {
      "en": "An Arabic digital marketing website with a structured presentation of services, process and contact options.",
      "ar": "موقع تسويق رقمي عربي يعرض الخدمات وطريقة العمل ووسائل التواصل بصورة منظمة."
    },
    "focus": {
      "en": "Agency services and business presentation",
      "ar": "عرض خدمات الوكالة والتعريف بالأعمال"
    },
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vue.js"
    ],
    "url": "https://marketing-ten-amber.vercel.app/",
    "image": "img/Pixel Pro Responsive Showcase.webp",
    "host": "marketing-ten-amber.vercel.app",
    "color": "#d2cde2",
    "ink": "#4b405f",
    "name": {
      "en": "Pixel Pro",
      "ar": "بيكسل برو"
    },
    "headline": {
      "en": "A confident digital presence",
      "ar": "حضور رقمي واضح"
    }
  },
  {
    "id": "cars",
    "group": "fullstack",
    "category": {
      "en": "Automotive · Full-stack",
      "ar": "سيارات · تطوير متكامل"
    },
    "title": {
      "en": "Urban Motors — Explore the drive",
      "ar": "أوربان موتورز — اكتشف السيارات"
    },
    "description": {
      "en": "A responsive automotive website with car listings, brand-based browsing and detailed vehicle presentation.",
      "ar": "موقع سيارات متجاوب لعرض السيارات وتصفح العلامات التجارية واستعراض التفاصيل."
    },
    "focus": {
      "en": "Vehicle listings and category filtering",
      "ar": "قوائم السيارات والتصفية حسب التصنيف"
    },
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP"
    ],
    "url": "https://car-website-omega-three.vercel.app/",
    "image": "assets/project-cars.jpg",
    "host": "car-website-omega-three.vercel.app",
    "color": "#c6d0d7",
    "ink": "#304251",
    "name": {
      "en": "Urban Motors",
      "ar": "أوربان موتورز"
    },
    "headline": {
      "en": "Vehicle discovery & browsing",
      "ar": "استكشاف السيارات وتصفحها"
    }
  },

];
