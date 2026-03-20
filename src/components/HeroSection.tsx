import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import { MessageCircle, ArrowLeft } from "lucide-react";

interface HeroProps {
  onOpenBot: () => void;
}

const HeroSection = ({ onOpenBot }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(badgeRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 })
      .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.2")
      .fromTo(descRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
      .fromTo(btnsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

    // Parallax
    const onScroll = () => {
      if (sectionRef.current) {
        const scroll = window.scrollY;
        gsap.set(sectionRef.current.querySelector(".hero-img"), { y: scroll * 0.35 });
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image - object-center for mobile compatibility */}
      <img
        src={heroBg}
        alt=""
        className="hero-img absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210,40%,6%,0.82)] via-[hsl(210,40%,8%,0.7)] to-[hsl(199,50%,12%,0.85)]" />

      <div className="relative z-10 container mx-auto px-4 text-center py-24 md:py-32">
        <div ref={badgeRef} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6 md:mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-body">متاحون للعمل الآن</span>
        </div>

        <h1
          ref={titleRef}
          className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 md:mb-6 px-2"
        >
          نحوّل أفكارك إلى مواقع وتطبيقات
          <br />
          <span className="gradient-text">وأنظمة احترافية</span>
        </h1>
        <p ref={descRef} className="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 font-body px-2">
          فريق DevCore فريق برمجي متخصص في تقديم حلول تقنية متكاملة للأفراد والشركات، مع تنفيذ سريع وجودة عالية.
        </p>
        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
          <button
            onClick={onOpenBot}
            className="gradient-bg text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 animate-pulse-glow"
          >
            <MessageCircle size={20} />
            تحدث مع المساعد الذكي
          </button>
          <a
            href="https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white/30 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            تواصل عبر واتساب
            <ArrowLeft size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
