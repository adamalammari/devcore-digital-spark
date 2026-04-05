import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "كم سعر الموقع؟", a: "يبدأ من 150$ للموقع التعريفي البسيط، ومن 270$ لموقع الشركة المتوسط." },
  { q: "كم مدة التنفيذ؟", a: "الموقع التعريفي البسيط يصل تنفيذه إلى 24 ساعة. باقي المشاريع حسب التفاصيل." },
  { q: "هل يشمل دومين واستضافة؟", a: "نعم، جميع العروض تشمل دومين مجاني واستضافة مجانية لمدة سنة." },
  { q: "هل تقدمون تطبيقات موبايل؟", a: "نعم، نقدم تطوير تطبيقات موبايل حسب الطلب. السعر يعتمد على نوع التطبيق وميزاته." },
  { q: "كيف أبدأ مشروع معكم؟", a: "أرسل فكرة مشروعك عبر واتساب على الرقم +967773793649 وسنقوم بتوضيح السعر والمدة." },
  { q: "هل يمكن التعديل بعد التسليم؟", a: "نعم، نوفر فترة دعم مجاني بعد التسليم لإجراء التعديلات البسيطة." },
];

const FAQSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current.querySelectorAll(".faq-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }
  }, []);

  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div ref={ref} className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HelpCircle className="text-primary w-8 h-8" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            <span className="gradient-text">الأسئلة الشائعة</span>
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-10">
          إجابات سريعة على أكثر الأسئلة شيوعاً
        </p>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="faq-item card-elevated rounded-xl border-none px-5 transition-shadow hover:shadow-md"
            >
              <AccordionTrigger className="font-heading font-semibold text-foreground text-right hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-right pb-5 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
