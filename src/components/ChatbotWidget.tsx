import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type ChatMessage = { id: number; from: "bot" | "user"; text: string };

const CONTACT_FALLBACK =
  "I'm not sure about that one — but our team can help directly. 📞 0309 6419731 or ✉️ info@elarawave.com (Lahore, Pakistan).";

// Simple keyword → reply rules. No API, no AI model — just canned responses.
const RULES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["price", "pricing", "cost", "rate", "kitne", "kitna"],
    reply:
      "Our pricing depends on bottle size and order quantity. For an exact quote, please contact us at 0309 6419731 or info@elarawave.com.",
  },
  {
    keywords: ["bottle", "size", "250", "330", "500", "1.5", "19l", "product"],
    reply:
      "We offer 250 ML, 330 ML, 500 ML, 1.5 L and 19 L bottles — perfect for homes, offices and events. Check out our Products page for details.",
  },
  {
    keywords: ["deliver", "delivery", "coverage", "area", "shipping"],
    reply:
      "We deliver across Lahore, usually same-day. Check our Coverage Areas page to see if we cover your location.",
  },
  {
    keywords: ["brand", "branding", "custom", "label", "logo"],
    reply:
      "We craft premium private-label water for brands, hotels and events! Visit our Custom Branding page to design your bottle and request a quote.",
  },
  {
    keywords: ["contact", "phone", "number", "email", "address", "location"],
    reply: "You can reach ELARA WAVE at 0309 6419731, info@elarawave.com — based in Lahore, Pakistan.",
  },
  {
    keywords: ["order", "buy", "purchase"],
    reply:
      "To place an order, head to our Products page or contact us directly at 0309 6419731 — we'll get it sorted quickly.",
  },
  {
    keywords: ["hi", "hello", "hey", "salam", "assalam"],
    reply: "Hey! 👋 Ask me about our bottles, pricing, delivery areas, or custom branding.",
  },
];

function getBotReply(input: string): string {
  const text = input.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => text.includes(k))) return rule.reply;
  }
  return CONTACT_FALLBACK;
}

let idCounter = 2;

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "bot", text: "Hi there! 👋 Welcome to ELARA WAVE. How can I help you today?" },
    { id: 1, from: "bot", text: "You can ask about our bottles, pricing, delivery areas, or custom branding." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: idCounter++, from: "user", text };
    const botMsg: ChatMessage = { id: idCounter++, from: "bot", text: getBotReply(text) };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  }

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-24 right-5 sm:bottom-28 z-40 grid place-items-center h-14 w-14 sm:h-16 sm:w-16 rounded-full text-white overflow-hidden shine border border-white/40 shadow-[0_18px_45px_-12px_rgba(14,116,167,0.65),0_0_0_1px_rgba(255,255,255,0.15)_inset]"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,116,167,0.95) 0%, rgba(37,159,159,0.95) 55%, rgba(105,182,74,0.95) 100%)",
          backdropFilter: "blur(14px) saturate(160%)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.4} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.4} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-44 right-4 sm:right-5 z-40 w-[92vw] max-w-sm origin-bottom-right"
          >
            <div
              className="relative rounded-3xl overflow-hidden border border-white/40 shadow-[0_35px_80px_-25px_rgba(3,40,58,0.5)]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.85), rgba(231,246,248,0.75))",
                backdropFilter: "blur(24px) saturate(180%)",
              }}
            >
              {/* top gradient bar */}
              <div
                className="h-1 w-full"
                style={{
                  background:
                    "linear-gradient(90deg,#B9D22A,#69B64A,#259F9F,#22B2CB,#0E74A7)",
                }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/50">
                <span
                  className="grid place-items-center h-10 w-10 rounded-full text-white shrink-0 shadow-[0_8px_18px_-6px_rgba(14,116,167,0.6)]"
                  style={{
                    background:
                      "linear-gradient(135deg,#69B64A 0%,#259F9F 55%,#0E74A7 100%)",
                  }}
                >
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-navy truncate">
                    ELARA Assistant
                  </div>
                  <div className="text-[11px] text-text-muted flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                    Online — usually replies fast
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="ml-auto grid place-items-center h-8 w-8 rounded-full bg-white/70 border border-white/70 text-navy hover:bg-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="p-4 space-y-3 max-h-[320px] overflow-y-auto">
                {messages.map((m) => (
                  <div key={m.id} className={`flex gap-2 ${m.from === "user" ? "justify-end" : ""}`}>
                    <div
                      className={
                        m.from === "user"
                          ? "max-w-[85%] rounded-2xl rounded-tr-md text-white px-4 py-2.5 text-sm shadow-sm"
                          : "max-w-[85%] rounded-2xl rounded-tl-md bg-white/80 border border-white/70 px-4 py-2.5 text-sm text-navy shadow-sm"
                      }
                      style={
                        m.from === "user"
                          ? { background: "linear-gradient(135deg,#69B64A 0%,#259F9F 55%,#0E74A7 100%)" }
                          : undefined
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Composer */}
              <form onSubmit={onSubmit} className="p-3 border-t border-white/50 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message…"
                  className="flex-1 rounded-full bg-white/80 border border-white/70 px-4 py-2.5 text-sm text-navy placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-sky/60 transition"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid place-items-center h-10 w-10 rounded-full text-white shadow-[0_10px_20px_-8px_rgba(14,116,167,0.55)] hover:scale-105 active:scale-95 transition"
                  style={{
                    background:
                      "linear-gradient(135deg,#69B64A 0%,#259F9F 55%,#0E74A7 100%)",
                  }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}