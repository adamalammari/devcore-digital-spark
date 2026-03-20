import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import logo from "@/assets/devcore-logo.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_CONTEXT = `أنت مساعد DevCore الذكي.
مهمتك هي شرح خدمات فريق DevCore فقط، والإجابة عن الأسئلة المتعلقة بالمواقع، المتاجر، التطبيقات، الأنظمة، الأسعار، مدة التنفيذ، وما يشمله العرض، وطريقة التعاون بالعمولة.

اعتمد فقط على المعلومات التالية:
- DevCore فريق برمجي مستقل وليس شركة رسمية.
- الفريق متواجد في اليمن.
- الخدمات: مواقع إلكترونية، متاجر إلكترونية، تطبيقات موبايل، أنظمة خاصة ومخصصة.
- الأسعار:
  - الموقع التعريفي البسيط: 150 دولار
  - موقع شركة متوسط: من 270 إلى 400 دولار
  - المتجر الإلكتروني: من 320 إلى 530 دولار
  - تطبيقات الموبايل: حسب الطلب
  - الأنظمة المخصصة: حسب حجم المشروع
- مدة التنفيذ: الموقع التعريفي البسيط: 24 ساعة، غير ذلك: حسب تفاصيل المشروع
- جميع العروض تشمل: دومين مجاني لمدة سنة، استضافة مجانية لمدة سنة
- التعاون بالعمولة متاح لأي شخص يجلب عملاء.
- العمولة تُدفع بعد استلام المبلغ من العميل.
- التواصل عبر واتساب: +967773793649

قواعد الرد:
- أجب بالعربية فقط.
- كن احترافيًا وواضحًا ومختصرًا.
- لا تخترع معلومات غير موجودة.
- إذا كان السؤال يحتاج تسعيرًا دقيقًا أو تفاصيل خاصة، قل إن السعر أو المدة حسب الطلب ووجّه المستخدم للتواصل عبر واتساب.
- إذا سُئلت عن شيء خارج نطاق خدمات DevCore، أخبر المستخدم بلطف أن هذا خارج نطاق المعلومات المتاحة لديك.
- شجّع المستخدم على التواصل عند الرغبة في البدء أو طلب عرض سعر.`;

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("devcore_ai_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(() => !localStorage.getItem("devcore_ai_key"));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("devcore_ai_key", apiKey.trim());
      setShowKeyInput(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_CONTEXT },
            ...newMessages,
          ],
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "عذرًا، حدث خطأ. حاول مرة أخرى.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "عذرًا، حدث خطأ في الاتصال. تأكد من مفتاح API وحاول مرة أخرى." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="gradient-bg p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <img src={logo} alt="DevCore" className="h-10 w-auto" />
          <div>
            <h1 className="text-white font-heading font-bold text-lg">مساعد DevCore الذكي</h1>
            <p className="text-white/70 text-xs">مدعوم بالذكاء الاصطناعي</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-white/70 hover:text-white text-xs underline"
          >
            {showKeyInput ? "إخفاء" : "تغيير API Key"}
          </button>
          <a href="/" className="text-white/80 hover:text-white text-sm font-medium">
            الموقع الرئيسي
          </a>
        </div>
      </header>

      {/* API Key Input */}
      {showKeyInput && (
        <div className="bg-secondary border-b border-border p-4">
          <div className="container mx-auto max-w-2xl flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="أدخل مفتاح OpenRouter API..."
              className="flex-1 bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button onClick={saveKey} className="gradient-bg text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
              حفظ
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-2xl space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <Bot className="mx-auto text-primary mb-4" size={48} />
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">مرحبًا بك في مساعد DevCore</h2>
              <p className="text-muted-foreground">اسألني عن خدماتنا، الأسعار، أو أي شيء متعلق بعملنا</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row" : "flex-row-reverse"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.role === "user" ? "bg-primary/10" : "gradient-bg"
              }`}>
                {m.role === "user" ? <User size={16} className="text-primary" /> : <Bot size={16} className="text-white" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-primary text-white rounded-tr-sm"
                  : "bg-card border border-border text-foreground rounded-tl-sm"
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-card border border-border rounded-2xl px-4 py-3 rounded-tl-sm">
                <Loader2 size={18} className="animate-spin text-primary" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="container mx-auto max-w-2xl flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="اكتب سؤالك هنا..."
            disabled={isLoading || !apiKey}
            className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-shadow disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !apiKey || !input.trim()}
            className="gradient-bg text-white p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
