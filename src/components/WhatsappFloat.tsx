import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsappFloat() {
  return (
    <motion.a
      href="https://wa.me/923096419731"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-40 group"
    >
      {/* Pulsing ring */}
      <span className="pointer-events-none absolute inset-0 rounded-full">
        <span className="absolute inset-0 rounded-full bg-green/40 blur-xl animate-pulse" />
        <span className="pulse-ring absolute inset-0 rounded-full" />
      </span>

      {/* Glass button */}
      <motion.span
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative grid place-items-center h-14 w-14 sm:h-16 sm:w-16 rounded-full text-white overflow-hidden shine border border-white/40 shadow-[0_18px_45px_-12px_rgba(37,159,159,0.65),0_0_0_1px_rgba(255,255,255,0.15)_inset]"
        style={{
          background:
            "linear-gradient(135deg, rgba(105,182,74,0.95) 0%, rgba(37,159,159,0.95) 55%, rgba(14,116,167,0.95) 100%)",
          backdropFilter: "blur(14px) saturate(160%)",
        }}
      >
        <MessageCircle
          className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          strokeWidth={2.4}
        />
        {/* Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy shadow-lg opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 backdrop-blur-md border border-white/70">
          Chat on WhatsApp
        </span>
      </motion.span>
    </motion.a>
  );
}
