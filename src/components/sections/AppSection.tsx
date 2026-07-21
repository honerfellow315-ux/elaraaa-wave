import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { Smartphone, Bell, MapPin, CreditCard } from "lucide-react";

export function AppSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal as="left">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-8 bg-blue/25 blur-3xl rounded-full -z-10" />
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-[280px] h-[560px] rounded-[48px] glass p-3 shine"
            >
              <div className="h-full w-full rounded-[38px] bg-gradient-to-b from-navy to-navy-dark p-5 overflow-hidden">
                <div className="flex items-center justify-between text-white text-[10px] opacity-70">
                  <span>9:41</span><span>ELARA WAVE</span>
                </div>
                <div className="mt-6 text-white">
                  <div className="text-xs opacity-70">Good morning</div>
                  <div className="text-2xl font-extrabold">Stay hydrated ✨</div>
                </div>
                <div className="mt-5 rounded-2xl glass-dark p-4 text-white">
                  <div className="flex items-center justify-between text-xs opacity-80">
                    <span>Next delivery</span><span>Tomorrow</span>
                  </div>
                  <div className="mt-2 text-lg font-bold">2× 19L Alkaline</div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full w-2/3 bg-fresh shine" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { i: Bell, l: "Reminders" },
                    { i: MapPin, l: "Track" },
                    { i: CreditCard, l: "Wallet" },
                    { i: Smartphone, l: "Reorder" },
                  ].map(({ i: I, l }) => (
                    <div key={l} className="rounded-2xl glass-dark p-3 text-white">
                      <I className="h-4 w-4 text-sky" />
                      <div className="mt-2 text-xs opacity-80">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal as="right">
          <p className="text-xs font-bold tracking-[0.3em] text-blue">ELARA WAVE APP</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-navy">
            Reorder in a <span className="shine-text">single tap</span>
          </h2>
          <p className="mt-4 text-text-muted max-w-lg">
            Track deliveries in real time, subscribe to weekly hydration, and unlock member-only offers — all from a beautifully simple app.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3 max-w-lg">
            {[
              "Live delivery tracking",
              "Smart hydration reminders",
              "Loyalty & rewards wallet",
              "One-tap subscriptions",
            ].map((f) => (
              <div key={f} className="glass-card p-4 text-sm text-navy font-medium">
                {f}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#" className="shine px-5 py-3 rounded-full bg-brand text-white font-semibold">Coming to iOS</a>
            <a href="#" className="px-5 py-3 rounded-full bg-white border border-navy/15 text-navy font-semibold">Coming to Android</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
