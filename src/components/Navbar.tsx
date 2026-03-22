import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "@/assets/devcore-logo.png";
import { Menu, X, MessageSquare } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "الخدمات", href: "#services" },
  { label: "الباقات", href: "#pricing" },
  { label: "من نحن", href: "#about" },
  { label: "التعاون", href: "#collab" },
  { label: "الأسئلة", href: "#faq" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Track active section
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(link.href);
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-lg shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="DevCore" className="h-9 w-auto" />
          <span className={`font-heading font-bold text-lg hidden sm:block ${scrolled ? "text-foreground" : "text-white"}`}>
            DevCore
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                activeSection === l.href
                  ? scrolled
                    ? "text-primary bg-primary/5"
                    : "text-white bg-white/10"
                  : scrolled
                    ? "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity mr-2 flex items-center gap-1.5"
          >
            <MessageSquare size={14} />
            تواصل معنا
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"
          }`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border/50 animate-in slide-in-from-top-2">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={`text-sm font-medium text-right py-2.5 px-3 rounded-lg transition-colors ${
                  activeSection === l.href
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-bg text-white px-5 py-2.5 rounded-lg text-sm font-semibold text-center mt-2"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
