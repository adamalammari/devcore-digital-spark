import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "كم سعر الموقع؟", a: "يبدأ من 150$ للموقع التعريفي البسيط، ومن 270$ لموقع الشركة المتوسط." },
  { q: "كم مدة التنفيذ؟", a: "الموقع التعريفي البسيط يصل تنفيذه إلى 24 ساعة. باقي المشاريع حسب التفاصيل." },
  { q: "هل يمكن التعاون بالعمولة؟", a: "نعم، يمكن لأي شخص التعاون معنا. العمولة تُدفع بعد استلام المبلغ من العميل." },
  { q: "هل يشمل دومين واستضافة؟", a: "نعم، جميع العروض تشمل دومين مجاني واستضافة مجانية لمدة سنة." },
  { q: "هل تقدمون تطبيقات موبايل؟", a: "نعم، نقدم تطوير تطبيقات موبايل حسب الطلب. السعر يعتمد على نوع التطبيق وميزاته." },
  { q: "كيف أبدأ مشروع معكم؟", a: "أرسل فكرة مشروعك عبر واتساب على الرقم +967773793649 وسنقوم بتوضيح السعر والمدة." },
];

const FAQSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }
  }, []);

  return (
    <section id="faq" className="py-20 bg-secondary/50">
      <div ref={ref} className="container mx-auto px-4 max-w-2xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          ❓ <span className="gradient-text">الأسئلة الشائعة</span>
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="card-elevated rounded-xl border-none px-4">
              <AccordionTrigger className="font-heading font-semibold text-foreground text-right hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-right">
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
