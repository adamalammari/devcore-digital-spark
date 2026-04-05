import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "أحمد العمري",
    role: "صاحب متجر إلكتروني",
    text: "تجربة ممتازة مع فريق DevCore! تم تنفيذ المتجر الإلكتروني بجودة عالية وسرعة مذهلة. أنصح الجميع بالتعامل معهم.",
    rating: 5,
    initials: "أع",
  },
  {
    name: "سارة محمد",
    role: "مديرة شركة تسويق",
    text: "صمموا لنا موقع الشركة بشكل احترافي جداً وبسعر مناسب. التواصل كان سريع والتسليم قبل الموعد المحدد.",
    rating: 5,
    initials: "سم",
  },
  {
    name: "خالد الحسني",
    role: "رائد أعمال",
    text: "نظام إدارة المخزون الذي طوروه لنا وفّر علينا ساعات عمل يومياً. فريق محترف ويفهم احتياجات العميل.",
    rating: 5,
    initials: "خح",
  },
  {
    name: "فاطمة علي",
    role: "مصممة مستقلة",
    text: "تعاملت معهم لتطوير بورتفوليو شخصي والنتيجة فاقت توقعاتي. تصميم عصري وأداء سريع.",
    rating: 4,
    initials: "فع",
  },
  {
    name: "محمد ناصر",
    role: "صاحب مطعم",
    text: "موقع المطعم صار يجذب عملاء جدد كل يوم. الفريق نفذ كل التعديلات اللي طلبتها بدون تأخير.",
    rating: 5,
    initials: "من",
  },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current.querySelectorAll(".testi-card"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }
  }, []);

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  // Show 3 on desktop, 1 on mobile
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(active + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4 max-w-6xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          <span className="gradient-text">آراء عملائنا</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          نفتخر بثقة عملائنا وتقييماتهم الإيجابية
        </p>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {getVisible().map((t, i) => (
            <div
              key={t.name}
              className="testi-card card-elevated rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="absolute top-4 left-4 text-primary/10 w-10 h-10" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    className={s < t.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}
                  />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-6 text-right">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 border-t border-border/50 pt-4">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.initials}
                </div>
                <div className="text-right">
                  <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile single card */}
        <div className="md:hidden mb-6">
          <div className="testi-card card-elevated rounded-2xl p-6 relative overflow-hidden">
            <Quote className="absolute top-4 left-4 text-primary/10 w-10 h-10" />
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={16}
                  className={s < testimonials[active].rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}
                />
              ))}
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-6 text-right">
              "{testimonials[active].text}"
            </p>
            <div className="flex items-center gap-3 border-t border-border/50 pt-4">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm shrink-0">
                {testimonials[active].initials}
              </div>
              <div className="text-right">
                <p className="font-heading font-semibold text-foreground text-sm">{testimonials[active].name}</p>
                <p className="text-muted-foreground text-xs">{testimonials[active].role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border hover:bg-primary/5 hover:border-primary/30 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={18} className="text-foreground" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "gradient-bg w-7" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border hover:bg-primary/5 hover:border-primary/30 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
