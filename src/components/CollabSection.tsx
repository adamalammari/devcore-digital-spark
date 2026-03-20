import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, DollarSign, Rocket, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Users, text: "رشّح عملاء مهتمين بخدماتنا", color: "hsl(199, 89%, 48%)" },
  { icon: Rocket, text: "نحن نتولى التنفيذ بالكامل", color: "hsl(280, 60%, 55%)" },
  { icon: DollarSign, text: "احصل على عمولتك بعد استلام المبلغ", color: "hsl(145, 60%, 45%)" },
];

const CollabSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".collab-step");
    if (els) {
      gsap.fromTo(els, { x: 80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }
  }, []);

  return (
    <section id="collab" className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          <span className="gradient-text">التعاون بالعمولة</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          لا تحتاج خبرة — فقط القدرة على جلب عملاء
        </p>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="collab-step card-elevated rounded-2xl p-6 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${s.color}12`, border: `1.5px solid ${s.color}25` }}
              >
                <s.icon style={{ color: s.color }} size={22} />
              </div>
              <p className="font-heading font-semibold text-foreground flex-1">{s.text}</p>
              {i < steps.length - 1 && <ArrowLeft className="text-muted-foreground hidden md:block" size={20} />}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="https://wa.me/967773793649?text=مرحبًا، أريد التعاون معكم بالعمولة"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-white px-8 py-3 rounded-xl font-semibold inline-block hover:opacity-90 transition-opacity"
          >
            ابدأ التعاون الآن
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollabSection;
