import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";

const KEY = "elarawave_visitor_last";
const DAY = 24 * 60 * 60 * 1000;

export function VisitorPopup() {
  const [open, setOpen] = useState(false);
  const { user, status } = useAuth();

  useEffect(() => {
    if (status === "loading") return;
    if (user) return;

    const last = Number(localStorage.getItem(KEY) || 0);
    if (Date.now() - last < DAY) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, status]);

  function close() {
    localStorage.setItem(KEY, Date.now().toString());
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-4 bg-navy/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 22,
            }}
            className="relative w-full max-w-md glass rounded-3xl p-8 overflow-hidden"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-full bg-white/70 text-navy hover:bg-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto grid place-items-center h-20 w-20 rounded-2xl bg-white/80 shadow-[0_10px_30px_rgba(18,58,94,0.15)] mb-4 p-2">
              <Logo className="h-full w-full object-contain" />
            </div>

            <h3 className="text-2xl font-extrabold text-navy text-center">
              Join the ELARA WAVE family
            </h3>

            <p className="mt-2 text-sm text-text-muted text-center">
              Create your account for exclusive prices, faster reorders, and
              premium member offers.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                to="/register"
                onClick={close}
                className="shine w-full h-12 rounded-xl bg-brand text-white font-semibold grid place-items-center"
              >
                Create free account
              </Link>

              <button
                type="button"
                onClick={close}
                className="w-full h-11 rounded-xl text-sm text-text-muted hover:text-navy transition"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}