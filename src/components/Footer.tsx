import logo from "@/assets/devcore-logo.png";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="container mx-auto px-4 text-center">
      <img src={logo} alt="DevCore" className="h-12 mx-auto mb-4" />
      <p className="text-background/60 text-sm mb-6">
        نحوّل أفكارك إلى مواقع وتطبيقات وأنظمة احترافية
      </p>
      <a
        href="https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع"
        target="_blank"
        rel="noopener noreferrer"
        className="gradient-bg text-white px-6 py-2.5 rounded-lg text-sm font-semibold inline-block hover:opacity-90 transition-opacity"
      >
        📞 تواصل عبر واتساب
      </a>
      <p className="text-background/40 text-xs mt-8">
        © {new Date().getFullYear()} DevCore. جميع الحقوق محفوظة.
      </p>
    </div>
  </footer>
);

export default Footer;
