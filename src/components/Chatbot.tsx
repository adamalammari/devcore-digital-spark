import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import logo from "@/assets/devcore-logo.png";

interface Message {
  role: "bot" | "user";
  text: string;
}

const QA_DATA: Record<string, string> = {
  "من أنتم؟": "نحن DevCore، فريق برمجي مستقل متخصص في تطوير المواقع الإلكترونية، المتاجر الإلكترونية، تطبيقات الموبايل، والأنظمة المخصصة. نركز على تقديم حلول تقنية عملية بجودة جيدة وأسعار مناسبة.",
  "هل أنتم شركة رسمية؟": "نحن فريق برمجي مستقل نعمل بشكل احترافي، ولسنا شركة رسمية مسجلة.",
  "أين أنتم متواجدون؟": "فريق DevCore متواجد في اليمن، ونعمل على تنفيذ المشاريع والتواصل مع العملاء عن بُعد.",
  "ما الخدمات التي تقدمونها؟": "نقدم أربع خدمات رئيسية:\n\n🌐 تطوير المواقع الإلكترونية\n🛒 إنشاء المتاجر الإلكترونية\n📱 تطوير تطبيقات الموبايل\n⚙️ بناء الأنظمة الخاصة والمخصصة",
  "كم سعر الموقع؟": "💻 الموقع التعريفي البسيط: 150 دولار\n🏢 موقع شركة متوسط: من 270 إلى 400 دولار\n\nجميع العروض تشمل دومين مجاني واستضافة مجانية لمدة سنة.",
  "كم سعر المتجر؟": "🛒 سعر المتجر الإلكتروني يبدأ من 320 دولار ويصل إلى 530 دولار حسب حجم المتجر والخصائص المطلوبة.\n\nيشمل دومين مجاني واستضافة مجانية لمدة سنة.",
  "هل تقدمون تطبيقات؟": "📱 نعم، نقدم تطوير تطبيقات موبايل حسب الطلب. السعر يعتمد على فكرة التطبيق والميزات المطلوبة.\n\nأرسل تفاصيل التطبيق عبر واتساب ليتم تحديد السعر والمدة.",
  "هل تقدمون أنظمة خاصة؟": "⚙️ نعم، نقوم ببناء أنظمة خاصة ومخصصة حسب احتياج العميل وطبيعة العمل.\n\nالسعر حسب حجم النظام وتعقيده.",
  "ماذا يشمل العرض؟": "📌 جميع العروض تشمل:\n\n✅ دومين مجاني لمدة سنة\n✅ استضافة مجانية لمدة سنة\n✅ تصميم احترافي ومتجاوب\n\nأي إضافات خاصة تُحدد حسب المشروع.",
  "كم مدة التنفيذ؟": "⚡ الموقع التعريفي البسيط: حتى 24 ساعة\n📋 باقي المشاريع: حسب تفاصيل المشروع ومتطلباته.",
  "هل يمكن التعاون معكم؟": "🤝 نعم! التعاون متاح لأي شخص يجلب عملاء مهتمين بخدماتنا.\n\nلا تحتاج خبرة تقنية — فقط القدرة على جلب عملاء.\n\nيتم الاتفاق على العمولة حسب المشروع.",
  "متى تُدفع العمولة؟": "💰 العمولة تُدفع بعد استلام المبلغ من العميل.\n\nيتم الاتفاق على النسبة حسب نوع المشروع وحجمه.",
  "كيف أتواصل معكم؟": "📞 يمكنك التواصل معنا مباشرة عبر واتساب:\n\n+967773793649",
  "أريد بدء مشروع": "🚀 يسعدنا ذلك! أرسل لنا نوع المشروع وتفاصيله عبر واتساب:\n\n📞 +967773793649\n\nوسنقوم بتوضيح السعر والمدة المناسبة.",
  "أريد موقع تعريفي": "ممتاز. الموقع التعريفي البسيط لدينا بسعر 150 دولار، ومدة التنفيذ تصل إلى 24 ساعة، ويشمل دومين مجاني واستضافة مجانية لمدة سنة.",
  "أريد متجرًا إلكترونيًا": "يسعدنا تنفيذ ذلك. سعر المتجر الإلكتروني يبدأ من 320 دولار ويصل إلى 530 دولار حسب حجم المتجر والخصائص المطلوبة، ويشمل دومين واستضافة لمدة سنة.",
  "أريد تطبيقًا": "نعم، يمكننا تنفيذ تطبيق موبايل حسب الطلب. أرسل فكرة التطبيق والميزات المطلوبة ليتم تقدير السعر والمدة بشكل مناسب.",
  "أريد عرض سعر": "يسعدنا ذلك. أرسل لنا نوع المشروع وتفاصيله، وسنوضح لك السعر المناسب والمدة المتوقعة.\n\n📞 للتواصل عبر واتساب: +967773793649",
  "هل لديكم سابقة أعمال؟": "يمكن الاطلاع على الأعمال والحضور الرقمي عبر الحسابات الشخصية المرتبطة بالفريق، وعند الحاجة يمكن طلب مزيد من التفاصيل أثناء التواصل المباشر.",
};

const ALL_QUESTIONS = Object.keys(QA_DATA);

const WELCOME_MESSAGE = "أهلاً بك 👋\n\nأنا مساعد DevCore الذكي.\n\nأستطيع مساعدتك في معرفة خدماتنا، الأسعار، مدة التنفيذ، وما يشمله كل عرض.\n\nاختر من الأسئلة أدناه أو اكتب سؤالك:";

function findAnswer(input: string): string {
  const lower = input.trim();

  for (const [q, a] of Object.entries(QA_DATA)) {
    if (lower === q || lower.includes(q.replace("؟", "")) || q.includes(lower)) {
      return a;
    }
  }

  const keywords: Record<string, string[]> = {
    "من أنتم؟": ["من", "أنتم", "فريق", "شركة", "تعريف"],
    "هل أنتم شركة رسمية؟": ["رسمية", "مسجلة"],
    "أين أنتم متواجدون؟": ["أين", "متواجد", "مكان", "بلد"],
    "ما الخدمات التي تقدمونها؟": ["خدم", "تقدم"],
    "كم سعر الموقع؟": ["سعر", "موقع", "تعريفي", "كم"],
    "كم سعر المتجر؟": ["متجر", "سعر المتجر", "إلكتروني"],
    "هل تقدمون تطبيقات؟": ["تطبيق", "موبايل", "جوال"],
    "هل تقدمون أنظمة خاصة؟": ["نظام", "أنظمة", "مخصص"],
    "ماذا يشمل العرض؟": ["يشمل", "عرض", "دومين", "استضافة"],
    "كم مدة التنفيذ؟": ["مدة", "تنفيذ", "وقت", "كم يوم", "24"],
    "هل يمكن التعاون معكم؟": ["تعاون", "شراكة", "مسوق"],
    "متى تُدفع العمولة؟": ["دفع", "عمولة", "متى"],
    "كيف أتواصل معكم؟": ["تواصل", "واتساب", "رقم", "هاتف"],
    "أريد بدء مشروع": ["بدء", "مشروع", "أبدأ", "طلب"],
    "أريد موقع تعريفي": ["أريد موقع"],
    "أريد متجرًا إلكترونيًا": ["أريد متجر"],
    "أريد تطبيقًا": ["أريد تطبيق"],
    "أريد عرض سعر": ["عرض سعر"],
    "هل لديكم سابقة أعمال؟": ["أعمال", "سابقة", "بورتفوليو"],
  };

  for (const [q, kws] of Object.entries(keywords)) {
    if (kws.some((kw) => lower.includes(kw))) {
      return QA_DATA[q];
    }
  }

  return "لا أملك هذه التفاصيل بشكل دقيق حاليًا، لكن يمكنك التواصل مباشرة عبر واتساب للحصول على توضيح كامل:\n\n📞 +967773793649";
}

const WHATSAPP_URL = "https://wa.me/967773793649?text=مرحبًا، أريد الاستفسار عن تصميم موقع";

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: WELCOME_MESSAGE }]);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questionsPerPage = 3;
  const totalPages = Math.ceil(ALL_QUESTIONS.length / questionsPerPage);
  const currentQuestions = ALL_QUESTIONS.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    const answer = findAnswer(text.trim());
    const botMsg: Message = { role: "bot", text: answer };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50 md:w-[400px]">
      <div className="bg-card rounded-2xl overflow-hidden shadow-2xl border border-border flex flex-col" style={{ maxHeight: "85vh" }}>
        {/* Header */}
        <div className="gradient-bg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="DevCore" className="h-8 w-auto" />
            <div>
              <h3 className="text-white font-heading font-bold text-sm">مساعد DevCore</h3>
              <p className="text-white/70 text-xs">متصل الآن</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background" style={{ minHeight: "250px", maxHeight: "400px" }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "gradient-bg text-white rounded-tl-sm"
                    : "bg-secondary text-secondary-foreground rounded-tr-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-4 py-2 bg-background border-t border-border">
          <div className="flex flex-wrap gap-2 mb-2">
            {currentQuestions.map((q, i) => (
              <button
                key={`${currentPage}-${i}`}
                onClick={() => handleSend(q)}
                className="text-xs bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground px-3 py-1.5 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          {totalPages > 1 && (
            <button
              onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
              className="text-xs text-primary hover:underline"
            >
              المزيد من الأسئلة ←
            </button>
          )}
        </div>

        {/* WhatsApp redirect */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mb-2 flex items-center justify-center gap-2 bg-[hsl(145,60%,42%)] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[hsl(145,60%,38%)] transition-colors"
        >
          <ExternalLink size={14} />
          تواصل عبر واتساب
        </a>

        {/* Input */}
        <div className="p-3 border-t border-border bg-background flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
          <button
            onClick={() => handleSend(input)}
            className="gradient-bg text-white p-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Floating button
export const ChatbotButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 left-6 z-40 gradient-bg text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl animate-pulse-glow hover:opacity-90 transition-opacity"
  >
    <MessageCircle size={24} />
  </button>
);

export default Chatbot;
