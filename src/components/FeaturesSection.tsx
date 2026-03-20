import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, DollarSign, Globe, Cloud, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Zap, title: "تنفيذ سريع", desc: "حتى 24 ساعة", color: "hsl(45, 90%, 50%)" },
  { icon: DollarSign, title: "أسعار مناسبة", desc: "تنافسية وشفافة", color: "hsl(145, 60%, 45%)" },
  { icon: Globe, title: "دومين مجاني", desc: "لمدة سنة كاملة", color: "hsl(199, 89%, 48%)" },
  { icon: Cloud, title: "استضافة مجانية", desc: "لمدة سنة كاملة", color: "hsl(210, 70%, 55%)" },
  { icon: Handshake, title: "شراكة بالعمولة", desc: "نظام تعاون مرن", color: "hsl(280, 60%, 55%)" },
];

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll(".feat-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-glow)" }} />
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14 text-foreground">
          لماذا <span className="gradient-text">DevCore</span>؟
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <div key={i} className="feat-card card-elevated rounded-2xl p-6 text-center">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: `${f.color}15`, border: `1.5px solid ${f.color}30` }}
              >
                <f.icon style={{ color: f.color }} size={24} />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
