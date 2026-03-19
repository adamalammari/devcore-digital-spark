import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "@/assets/devcore-logo.png";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "الخدمات", href: "#services" },
  { label: "الأسعار", href: "#pricing" },
  { label: "من نحن", href: "#about" },
  { label: "التعاون", href: "#collab" },
  { label: "الأسئلة", href: "#faq" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="DevCore" className="h-10 w-auto" />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            تواصل معنا
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors text-right py-2"
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-bg text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold text-center"
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
