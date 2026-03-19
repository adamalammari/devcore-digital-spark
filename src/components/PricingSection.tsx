import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    title: "موقع تعريفي",
    icon: "💻",
    price: "150$",
    note: "خلال 24 ساعة",
    features: ["تصميم احترافي", "دومين مجاني سنة", "استضافة مجانية سنة", "متجاوب مع الأجهزة"],
    popular: false,
  },
  {
    title: "موقع شركة",
    icon: "🏢",
    price: "270$ – 400$",
    note: "حسب التفاصيل",
    features: ["صفحات متعددة", "محتوى موسع", "مقالات ومدونة", "دومين + استضافة سنة"],
    popular: true,
  },
  {
    title: "متجر إلكتروني",
    icon: "🛒",
    price: "320$ – 530$",
    note: "حسب الحجم",
    features: ["نظام بيع متكامل", "إدارة منتجات", "دفع إلكتروني", "دومين + استضافة سنة"],
    popular: false,
  },
  {
    title: "تطبيق موبايل",
    icon: "📱",
    price: "حسب الطلب",
    note: "iOS & Android",
    features: ["تصميم حسب الفكرة", "متعدد المنصات", "دعم مستمر", "تحديد السعر بعد المناقشة"],
    popular: false,
  },
];

const PricingSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll(".price-card");
    if (cards) {
      gsap.fromTo(cards, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }
  }, []);

  return (
    <section id="pricing" className="py-20">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          💰 <span className="gradient-text">الأسعار</span>
        </h2>
        <p className="text-center text-muted-foreground mb-14">أسعار واضحة وشفافة</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`price-card rounded-2xl p-6 relative ${
                p.popular
                  ? "gradient-bg text-primary-foreground glow-effect"
                  : "card-elevated"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card text-primary px-4 py-1 rounded-full text-xs font-bold">
                  الأكثر طلبًا
                </div>
              )}
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-heading text-xl font-bold mb-1">{p.title}</h3>
              <div className="text-3xl font-bold font-heading mb-1">{p.price}</div>
              <p className={`text-sm mb-6 ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {p.note}
              </p>
              <ul className="space-y-2 mb-6">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 ${
                  p.popular
                    ? "bg-card text-primary"
                    : "gradient-bg text-primary-foreground"
                }`}
              >
                اطلب الآن
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          📌 جميع الباقات تشمل دومين مجاني واستضافة مجانية لمدة سنة
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
