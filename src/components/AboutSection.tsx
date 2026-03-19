import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }
  }, []);

  return (
    <section id="about" className="py-20 bg-secondary/50">
      <div ref={ref} className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
          👥 <span className="gradient-text">من نحن</span>
        </h2>
        <p className="text-foreground/80 text-lg leading-relaxed mb-6">
          نحن فريق DevCore، فريق برمجي متخصص في تطوير المواقع والتطبيقات والأنظمة الرقمية.
          نعمل على تحويل الأفكار إلى حلول تقنية احترافية بجودة عالية وتنفيذ سريع.
          نستهدف الأفراد والشركات، ونوفر أيضًا فرصة التعاون مع المسوقين عبر نظام عمولة بسيط.
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <MapPin size={18} className="text-primary" />
          <span>اليمن</span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
