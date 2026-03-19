import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import serviceWeb from "@/assets/service-web.png";
import serviceStore from "@/assets/service-store.png";
import serviceApp from "@/assets/service-app.png";
import serviceSystem from "@/assets/service-system.png";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { img: serviceWeb, title: "تطوير المواقع", desc: "مواقع تعريفية وشركات باحتراف", icon: "🌐" },
  { img: serviceStore, title: "متاجر إلكترونية", desc: "أنظمة بيع متكاملة", icon: "🛒" },
  { img: serviceApp, title: "تطبيقات موبايل", desc: "Android و iOS حسب الطلب", icon: "📱" },
  { img: serviceSystem, title: "أنظمة مخصصة", desc: "أنظمة إدارية وحلول خاصة", icon: "⚙️" },
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
    <section id="services" className="py-20 bg-secondary/50">
      <div ref={ref} className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          🛠️ <span className="gradient-text">خدماتنا</span>
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
          نقدم حلول تقنية شاملة تناسب احتياجاتك
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="svc-card card-elevated rounded-2xl p-6 text-center group">
              <div className="w-full h-40 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                />
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
