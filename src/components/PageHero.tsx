import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * PageHero — premium inner-page hero.
 * Compact height, brand-locked palette, SVG + mesh + glass composition.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative isolate overflow-hidden pt-10 pb-12 sm:pt-12 sm:pb-14 md:pt-16 md:pb-20">
      {/* Base brand gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30"
        style={{
          background:
         "linear-gradient(135deg,var(--navy-dark) 0%,var(--navy) 22%,var(--blue) 48%,var(--teal) 72%,var(--green) 88%,var(--green-light) 100%)",
        }}
      />

      {/* Mesh gradient blobs */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{
          background: "radial-gradient(circle at 30% 30%, rgba(34,178,203,0.55), rgba(37,159,159,0.25) 45%, transparent 70%)"
        }}
          animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-20 right-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at 60% 40%, rgba(105,182,74,0.42), rgba(185,210,42,0.18) 45%, transparent 70%)" }}
          animate={reduce ? undefined : { x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(37,159,159,0.42), rgba(34,178,203,0.20) 45%, transparent 70%)" }}
          animate={reduce ? undefined : { x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid / dot texture */}
      <svg
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.12]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="ew-hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#ffffff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ew-hero-dots)" />
      </svg>

      {/* Floating water shapes */}
      <svg
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ew-hero-wave1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22B2CB" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#0E74A7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ew-hero-wave2" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8FD14F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3E9AD6" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,260 C200,320 400,180 600,240 C800,300 1000,200 1200,260 L1200,400 L0,400 Z"
          fill="url(#ew-hero-wave1)"
          animate={reduce ? undefined : { d: [
            "M0,260 C200,320 400,180 600,240 C800,300 1000,200 1200,260 L1200,400 L0,400 Z",
            "M0,240 C220,300 420,200 600,260 C820,320 980,220 1200,280 L1200,400 L0,400 Z",
            "M0,260 C200,320 400,180 600,240 C800,300 1000,200 1200,260 L1200,400 L0,400 Z",
          ] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,320 C300,360 500,280 700,320 C900,360 1050,300 1200,330 L1200,400 L0,400 Z"
          fill="url(#ew-hero-wave2)"
          animate={reduce ? undefined : { d: [
            "M0,320 C300,360 500,280 700,320 C900,360 1050,300 1200,330 L1200,400 L0,400 Z",
            "M0,310 C280,350 520,290 700,330 C880,370 1080,290 1200,340 L1200,400 L0,400 Z",
            "M0,320 C300,360 500,280 700,320 C900,360 1050,300 1200,330 L1200,400 L0,400 Z",
          ] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating premium particles */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 -z-10">
          {[
            { l: "12%", t: "30%", s: 6, d: 7 },
            { l: "82%", t: "22%", s: 4, d: 9 },
            { l: "68%", t: "70%", s: 5, d: 8 },
            { l: "28%", t: "72%", s: 3, d: 10 },
            { l: "48%", t: "18%", s: 3, d: 11 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/70"
              style={{ left: p.l, top: p.t, width: p.s, height: p.s, boxShadow: "0 0 12px rgba(255,255,255,0.6)" }}
              animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            />
          ))}
        </div>
      )}

      {/* Soft top-light */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <motion.div {...fade(0)} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.28em] text-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-light shadow-[0_0_10px_rgba(143,209,79,0.9)]" />
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          {...fade(0.08)}
          className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            {...fade(0.16)}
            className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div {...fade(0.24)} className="mt-6">
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom fade into page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 -z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />
    </section>
  );
}
