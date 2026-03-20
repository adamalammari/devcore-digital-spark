import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, ShoppingCart, Smartphone, Settings } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { Icon: Globe, title: "تطوير المواقع", desc: "مواقع تعريفية وشركات باحتراف", color: "hsl(199, 89%, 48%)" },
  { Icon: ShoppingCart, title: "متاجر إلكترونية", desc: "أنظمة بيع متكاملة", color: "hsl(145, 60%, 45%)" },
  { Icon: Smartphone, title: "تطبيقات موبايل", desc: "Android و iOS حسب الطلب", color: "hsl(280, 60%, 55%)" },
  { Icon: Settings, title: "أنظمة مخصصة", desc: "أنظمة إدارية وحلول خاصة", color: "hsl(30, 80%, 50%)" },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll(".svc-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <section id="services" className="py-20 bg-secondary/40">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          <span className="gradient-text">خدماتنا</span>
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
          نقدم حلول تقنية شاملة تناسب احتياجاتك
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="svc-card card-elevated rounded-2xl p-8 text-center group">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${s.color}12`, border: `1.5px solid ${s.color}25` }}
              >
                <s.Icon style={{ color: s.color }} size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
