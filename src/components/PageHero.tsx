import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import elaraLogo from "@/assets/elara-logo.webp";

/**
 * PageHero — premium inner-page hero.
 * Cinematic HDR lighting, glassmorphism, oversized watermark, luxury
 * minimalism in the same visual language as the homepage Hero, without
 * copying its layout. Compact height and existing API are preserved.
 *
 * Continuous/looping animation lives in CSS keyframes (GPU-accelerated,
 * off the JS thread). Framer Motion is used only for entrance fades,
 * which genuinely need React/JS orchestration (staggered delays).
 * prefers-reduced-motion disables all continuous motion.
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
  const anim = !reduce;

  const fade = (delay = 0) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-12 sm:pt-40 sm:pb-14 md:pt-44 md:pb-20">
      {/* Local keyframes — continuous animation runs on the compositor
          thread via CSS instead of framer-motion's JS/rAF loop. */}
      <style>{`
        @keyframes pgHeroBlob1 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 33%{transform:translate3d(50px,-28px,0) scale(1.07)} 66%{transform:translate3d(-18px,18px,0) scale(0.97)} }
        @keyframes pgHeroBlob2 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 33%{transform:translate3d(-45px,36px,0) scale(1.05)} 66%{transform:translate3d(26px,-18px,0) scale(0.95)} }
        @keyframes pgHeroBlob3 { 0%,100%{transform:translate3d(0,0,0)} 33%{transform:translate3d(26px,-18px,0)} 66%{transform:translate3d(-26px,10px,0)} }
        @keyframes pgHeroLogo {
          0%,100%{ transform:scale(1) translate3d(0,0,0) rotate(-0.7deg); opacity:0.09 }
          50%{ transform:scale(1.035) translate3d(8px,-14px,0) rotate(0.7deg); opacity:0.15 }
        }
        @keyframes pgHeroHalo { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:0.85; transform:scale(1.05)} }
        @keyframes pgHeroRayPulse { 0%,100%{opacity:0.3; transform:rotate(16deg) translateY(0)} 50%{opacity:0.55; transform:rotate(16deg) translateY(-12px)} }
        @keyframes pgHeroMistDrift { 0%,100%{transform:translateX(0) scaleX(1); opacity:0.4} 50%{transform:translateX(3%) scaleX(1.04); opacity:0.65} }
        @keyframes pgHeroCaustics { 0%,100%{background-position:0% 0%} 50%{background-position:100% 40%} }
        @keyframes pgHeroTextShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes pgHeroUnderlineGlow { 0%,100%{opacity:0.55; filter:blur(8px)} 50%{opacity:0.9; filter:blur(11px)} }
        @keyframes pgHeroDropletDrift { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes pgHeroBadgeGlow { 0%,100%{box-shadow:0 8px 28px -12px rgba(14,116,167,0.35)} 50%{box-shadow:0 10px 34px -10px rgba(34,178,203,0.55)} }
      `}</style>

      {/* Cinematic HDR base — layered gradient tuned to the ELARA logo palette (lime → green → teal → blue) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-40"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 0%, #A8D048 0%, #3FAE55 20%, #12A98F 42%, #0E74A7 68%, #06415E 88%, #021D2A 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-39"
        style={{
          background:
            "radial-gradient(72% 55% at 88% 12%, rgba(94,211,255,0.30), transparent 65%), radial-gradient(55% 48% at 78% 30%, rgba(37,159,159,0.22), transparent 68%), radial-gradient(65% 55% at 10% 92%, rgba(185,210,42,0.20), transparent 70%), radial-gradient(50% 45% at 22% 78%, rgba(105,182,74,0.18), transparent 70%)",
        }}
      />

      {/* Premium light rays — soft, cinematic, from upper-right, almost invisible */}
      <div aria-hidden className="absolute inset-0 -z-32 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/3 right-[-12%] h-[150%] w-[55%]"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 40%, rgba(214,244,255,0.10) 54%, rgba(255,255,255,0) 72%)",
            filter: "blur(8px)",
            animation: anim ? "pgHeroRayPulse 11s ease-in-out infinite" : "none",
            transformOrigin: "top right",
            willChange: "opacity, transform",
          }}
        />
        <div
          className="absolute -top-1/4 right-[8%] h-[130%] w-[22%]"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 46%, rgba(255,255,255,0) 76%)",
            filter: "blur(4px)",
            animation: anim ? "pgHeroRayPulse 9s ease-in-out infinite 1s" : "none",
            transformOrigin: "top right",
            willChange: "opacity, transform",
          }}
        />
      </div>

      {/* Mesh gradient blobs — premium color transitions, subtle depth */}
      <div aria-hidden className="absolute inset-0 -z-30 overflow-hidden">
        <div
          className="absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(185,210,42,0.30), rgba(105,182,74,0.22) 45%, transparent 70%)",
            animation: anim ? "pgHeroBlob1 16s ease-in-out infinite" : "none",
            willChange: "transform",
          }}
        />
        <div
          className="absolute -top-20 right-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(34,178,203,0.42), rgba(94,211,255,0.20) 45%, transparent 70%)",
            animation: anim ? "pgHeroBlob2 18s ease-in-out infinite" : "none",
            willChange: "transform",
          }}
        />
        <div
          className="absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(37,159,159,0.40), rgba(105,182,74,0.20) 45%, transparent 70%)",
            animation: anim ? "pgHeroBlob3 20s ease-in-out infinite" : "none",
            willChange: "transform",
          }}
        />
      </div>

      {/* Oversized ELARA logo watermark — subtle, blurred, slow luxury drift */}
      <div
        aria-hidden
        className="absolute inset-0 -z-25 pointer-events-none overflow-hidden grid place-items-center"
      >
        <div
          className="absolute h-[85vmin] w-[85vmin] sm:h-[115vmin] sm:w-[115vmin] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(185,210,42,0.14), rgba(34,178,203,0.10) 42%, transparent 72%)",
            filter: "blur(34px)",
            animation: anim ? "pgHeroHalo 15s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
          }}
        />
        <div
          className="relative w-[88vmin] sm:w-[118vmin] max-w-none aspect-square"
          style={{
            filter: "blur(2px) drop-shadow(0 0 50px rgba(105,182,74,0.24))",
            animation: anim ? "pgHeroLogo 30s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
          }}
        >
          <img
            src={elaraLogo}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-contain opacity-[0.11] select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Water caustics — subtle rippled light pattern, pure CSS, no assets */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 pointer-events-none opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 22% 28%, rgba(255,255,255,0.9) 0px, transparent 3px, transparent 26px), repeating-radial-gradient(circle at 72% 62%, rgba(255,255,255,0.7) 0px, transparent 2px, transparent 34px)",
          backgroundSize: "220px 220px, 260px 260px",
          animation: anim ? "pgHeroCaustics 18s ease-in-out infinite" : "none",
        }}
      />

      {/* Grid / dot texture */}
      <svg
        aria-hidden
        className="absolute inset-0 -z-18 h-full w-full opacity-[0.08]"
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
        className="absolute inset-0 -z-18 h-full w-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ew-hero-wave1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22B2CB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0E74A7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ew-hero-wave2" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8FD14F" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3E9AD6" stopOpacity="0.10" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,260 C200,320 400,180 600,240 C800,300 1000,200 1200,260 L1200,400 L0,400 Z"
          fill="url(#ew-hero-wave1)"
          animate={
            reduce
              ? undefined
              : {
                  d: [
                    "M0,260 C200,320 400,180 600,240 C800,300 1000,200 1200,260 L1200,400 L0,400 Z",
                    "M0,240 C220,300 420,200 600,260 C820,320 980,220 1200,280 L1200,400 L0,400 Z",
                    "M0,260 C200,320 400,180 600,240 C800,300 1000,200 1200,260 L1200,400 L0,400 Z",
                  ],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,320 C300,360 500,280 700,320 C900,360 1050,300 1200,330 L1200,400 L0,400 Z"
          fill="url(#ew-hero-wave2)"
          animate={
            reduce
              ? undefined
              : {
                  d: [
                    "M0,320 C300,360 500,280 700,320 C900,360 1050,300 1200,330 L1200,400 L0,400 Z",
                    "M0,310 C280,350 520,290 700,330 C880,370 1080,290 1200,340 L1200,400 L0,400 Z",
                    "M0,320 C300,360 500,280 700,320 C900,360 1050,300 1200,330 L1200,400 L0,400 Z",
                  ],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating premium droplets — glass-like, gradient + blur + glow (not flat dots) */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 -z-15">
          {[
            { l: "12%", t: "30%", s: 7, d: 8, c: "rgba(185,210,42,0.5)" },
            { l: "82%", t: "22%", s: 5, d: 10, c: "rgba(94,211,255,0.5)" },
            { l: "68%", t: "70%", s: 6, d: 9, c: "rgba(37,159,159,0.5)" },
            { l: "28%", t: "72%", s: 4, d: 11, c: "rgba(105,182,74,0.5)" },
            { l: "48%", t: "18%", s: 4, d: 12, c: "rgba(34,178,203,0.5)" },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: p.l,
                top: p.t,
                width: p.s,
                height: p.s,
                background: `radial-gradient(circle at 35% 30%, #fff 0%, rgba(255,255,255,0.85) 12%, ${p.c} 42%, transparent 74%)`,
                boxShadow: "0 0 10px rgba(255,255,255,0.45)",
                filter: "blur(0.4px)",
                animation: `pgHeroDropletDrift ${p.d}s ease-in-out infinite`,
                animationDelay: `${i * 0.6}s`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      )}

      {/* Glass reflections — top highlight + diagonal acrylic streak */}
      <div className="pointer-events-none absolute inset-x-10 top-6 -z-10 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 -left-1/4 h-[60%] w-1/3 rotate-[18deg] -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 45%, rgba(255,255,255,0) 80%)",
        }}
      />

      {/* Mist — soft cold haze near the base, slow drift */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-12 h-[40%] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(180,224,240,0.12) 55%, rgba(214,244,255,0.20) 100%)",
            filter: "blur(20px)",
            animation: anim ? "pgHeroMistDrift 13s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Vignette — draws the eye inward, adds depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, transparent 45%, rgba(2,29,42,0.28) 100%)",
        }}
      />

      {/* Soft top-light */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.14), transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <motion.div {...fade(0)} className="flex justify-center">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.28em] text-white/90 backdrop-blur-md"
              style={{ animation: anim ? "pgHeroBadgeGlow 5s ease-in-out infinite" : "none" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-light shadow-[0_0_10px_rgba(143,209,79,0.9)]" />
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          {...fade(0.08)}
          className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent tracking-tight leading-[1.05]"
          style={{
            backgroundImage:
              "linear-gradient(100deg, #EAF7FB 0%, #C7ECF6 20%, #ffffff 40%, #A9E4F2 58%, #EAF7FB 78%, #ffffff 100%)",
            backgroundSize: "220% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            animation: anim ? "pgHeroTextShift 14s ease-in-out infinite" : "none",
            filter: "drop-shadow(0 2px 24px rgba(0,0,0,0.35))",
          }}
        >
          {title}
        </motion.h1>
        <div className="flex justify-center">
          <span
            aria-hidden
            className="relative -mt-1 h-[3px] w-24 rounded-full opacity-70"
            style={{
              background: "linear-gradient(90deg,#B9D22A,#69B64A,#259F9F,#5ED3FF,#0E74A7)",
              animation: anim ? "pgHeroUnderlineGlow 4s ease-in-out infinite" : "none",
            }}
          />
        </div>

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

      {/* Bottom fade into page — soft, no harsh edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--background) 60%, transparent) 55%, var(--background))",
        }}
      />
    </section>
  );
}