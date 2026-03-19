import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/devcore-logo.png";
import { MessageCircle } from "lucide-react";

interface HeroProps {
  onOpenBot: () => void;
}

const HeroSection = ({ onOpenBot }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(logoRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 })
      .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
      .fromTo(descRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
      .fromTo(btnsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    // Parallax
    const onScroll = () => {
      if (sectionRef.current) {
        const scroll = window.scrollY;
        gsap.set(sectionRef.current.querySelector(".hero-img"), { y: scroll * 0.3 });
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="hero-img absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <img ref={logoRef} src={logo} alt="DevCore" className="h-24 md:h-32 mx-auto mb-8 animate-float" />
        <h1
          ref={titleRef}
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
        >
          نحوّل أفكارك إلى مواقع وتطبيقات
          <br />
          <span className="gradient-text">وأنظمة احترافية</span>
        </h1>
        <p ref={descRef} className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
          فريق DevCore فريق برمجي متخصص في تقديم حلول تقنية متكاملة للأفراد والشركات، مع تنفيذ سريع وجودة عالية.
        </p>
        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onOpenBot}
            className="gradient-bg text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 animate-pulse-glow"
          >
            <MessageCircle size={20} />
            تحدث مع المساعد الذكي
          </button>
          <a
            href="https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-foreground/10 transition-colors flex items-center justify-center gap-2"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
