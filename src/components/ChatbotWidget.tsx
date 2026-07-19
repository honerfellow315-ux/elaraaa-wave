import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);

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
              <div className="p-4 space-y-3 max-h-[320px] overflow-y-auto">
                <div className="flex gap-2">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white/80 border border-white/70 px-4 py-2.5 text-sm text-navy shadow-sm">
                    Hi there! 👋 Welcome to ELARA WAVE. How can I help you
                    today?
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white/80 border border-white/70 px-4 py-2.5 text-sm text-navy shadow-sm">
                    You can ask about our bottles, pricing, delivery areas, or
                    custom branding.
                  </div>
                </div>
              </div>

              {/* Composer */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="p-3 border-t border-white/50 flex items-center gap-2"
              >
                <input
                  type="text"
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
