import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Droplets,
  Sparkles,
  ShieldCheck,
  FlaskConical,
  Truck,
  BadgeCheck,
  ArrowRight,
  Star,
  Leaf,
  Award,
  Palette,
  MapPin,
  Home as HomeIcon,
  Building2,
  Hotel,
  PartyPopper,
  Phone,
  ChevronDown,
  Beaker,
  TestTube2,
  Sun,
  PackageCheck,
} from "lucide-react";
import elaraLogo from "@/assets/elara-logo.webp";

// Served directly from /public/images — not bundled/hashed by Vite
const heroBottlesUrl = "/images/hero-bottles.webp";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax — kept in framer-motion because it depends on live mouse position
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const bottleX = useTransform(sx, (v) => v * -18);
  const bottleY = useTransform(sy, (v) => v * -18);
  const glowX = useTransform(sx, (v) => v * -30);
  const glowY = useTransform(sy, (v) => v * -30);
  const rotX = useTransform(sy, (v) => v * 4);
  const rotY = useTransform(sx, (v) => v * -4);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my, prefersReducedMotion]);

  const anim = !prefersReducedMotion; // toggles CSS-driven animations

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden [perspective:1600px]"
    >
      {/* Local keyframes — all time-based (non-mouse) animation still runs on the
          compositor thread via CSS instead of framer-motion's JS/rAF loop.
          Same set as before, plus a few purely-decorative additions for the
          premium water-ad composition (mist drift, light-ray pulse, caustics). */}
      <style>{`
        @keyframes heroBlob1 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 33%{transform:translate3d(60px,-30px,0) scale(1.08)} 66%{transform:translate3d(-20px,20px,0) scale(0.98)} }
        @keyframes heroBlob2 { 0%,100%{transform:translate3d(0,0,0) scale(1)} 33%{transform:translate3d(-50px,40px,0) scale(1.05)} 66%{transform:translate3d(30px,-20px,0) scale(0.95)} }
        @keyframes heroBlob3 { 0%,100%{transform:translate3d(0,0,0)} 33%{transform:translate3d(30px,-20px,0)} 66%{transform:translate3d(-30px,10px,0)} }
        @keyframes heroHalo { 0%,100%{opacity:0.55; transform:scale(1)} 50%{opacity:0.9; transform:scale(1.06)} }
        @keyframes heroGlow7 { 0%,100%{opacity:0.55; transform:scale(1)} 50%{opacity:0.85; transform:scale(1.06)} }
        @keyframes heroLogo {
          0%,100%{ transform:scale(1) translate3d(0,0,0) rotate(-0.8deg); opacity:0.10 }
          50%{ transform:scale(1.04) translate3d(10px,-18px,0) rotate(0.8deg); opacity:0.16 }
        }
        @keyframes heroFloatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes heroFloatSlowRev { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes heroBottleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes heroSweep { 0%{transform:translateX(-20%) rotate(12deg)} 60%,100%{transform:translateX(260%) rotate(12deg)} }
        @keyframes heroTextShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes heroRayPulse { 0%,100%{opacity:0.35; transform:rotate(18deg) translateY(0)} 50%{opacity:0.6; transform:rotate(18deg) translateY(-14px)} }
        @keyframes heroMistDrift { 0%,100%{transform:translateX(0) scaleX(1); opacity:0.5} 50%{transform:translateX(3%) scaleX(1.04); opacity:0.75} }
        @keyframes heroCaustics { 0%,100%{background-position:0% 0%} 50%{background-position:100% 40%} }
        @keyframes heroSplashPulse { 0%,100%{opacity:0.6; transform:scale(1)} 50%{opacity:0.9; transform:scale(1.05)} }
        @keyframes heroDropletFall { 0%{transform:translateY(-6px); opacity:0} 15%{opacity:1} 100%{transform:translateY(10px); opacity:0} }
      `}</style>

      {/* Deep cinematic base — premium HDR blue-white water gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-40"
        style={{
          background:
            "radial-gradient(130% 95% at 22% 8%, #F3FCFF 0%, #DCF3FA 24%, #BEE7F2 42%, #E9F8FB 62%, #FFFFFF 100%)",
        }}
      />

      {/* Light rays from top-right — HDR key light */}
      <div aria-hidden className="absolute inset-0 -z-35 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/3 right-[-10%] h-[140%] w-[60%]"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 38%, rgba(214,244,255,0.35) 52%, rgba(255,255,255,0) 70%)",
            filter: "blur(6px)",
            animation: anim ? "heroRayPulse 10s ease-in-out infinite" : "none",
            transformOrigin: "top right",
            willChange: "opacity, transform",
          }}
        />
        <div
          className="absolute -top-1/4 right-[6%] h-[120%] w-[26%]"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0) 75%)",
            filter: "blur(3px)",
            animation: anim ? "heroRayPulse 8s ease-in-out infinite 1.2s" : "none",
            transformOrigin: "top right",
            willChange: "opacity, transform",
          }}
        />
      </div>

      {/* Ambient moving lights — recoloured to a premium blue/cyan/white palette */}
      <div aria-hidden className="absolute inset-0 -z-30 overflow-hidden">
        <div
          className="absolute -top-40 -left-32 h-[34rem] w-[34rem] sm:h-[50rem] sm:w-[50rem] rounded-full blur-[80px] sm:blur-[130px] opacity-90"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(94,211,255,0.55), rgba(105,182,74,0.16) 45%, transparent 72%)",
            animation: anim ? "heroBlob1 22s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
        <div
          className="absolute top-1/4 -right-40 h-[30rem] w-[30rem] sm:h-[46rem] sm:w-[46rem] rounded-full blur-[80px] sm:blur-[140px] opacity-90"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(34,178,203,0.65), rgba(14,116,167,0.35) 45%, transparent 72%)",
            animation: anim ? "heroBlob2 26s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
        <div
          className="absolute -bottom-52 left-1/4 h-[28rem] w-[28rem] sm:h-[44rem] sm:w-[44rem] rounded-full blur-[75px] sm:blur-[130px] opacity-80"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(180,240,255,0.6), rgba(37,159,159,0.25) 45%, transparent 72%)",
            animation: anim ? "heroBlob3 30s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(6,65,94,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(6,65,94,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(255,255,255,0.7),transparent_70%)]" />
      </div>

      {/* Water caustics — subtle rippled light pattern, premium acrylic feel */}
      <div
        aria-hidden
        className="absolute inset-0 -z-25 pointer-events-none opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0px, transparent 3px, transparent 26px), repeating-radial-gradient(circle at 70% 65%, rgba(255,255,255,0.7) 0px, transparent 2px, transparent 34px)",
          backgroundSize: "220px 220px, 260px 260px",
          animation: anim ? "heroCaustics 16s ease-in-out infinite" : "none",
        }}
      />

      {/* Mist band — soft horizontal haze near the base */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-20 h-[45%] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0.65) 100%)",
            filter: "blur(18px)",
            animation: anim ? "heroMistDrift 12s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Cinematic ELARA logo watermark — single drop-shadow, dialed back so it reads as a subtle HDR backdrop element */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 pointer-events-none overflow-hidden grid place-items-center"
      >
        {/* Radial glow halo behind the mark */}
        <div
          className="absolute h-[95vmin] w-[95vmin] sm:h-[130vmin] sm:w-[130vmin] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(94,211,255,0.20), rgba(105,182,74,0.10) 40%, transparent 72%)",
            filter: "blur(30px) sm:blur(40px)",
            animation: anim ? "heroHalo 14s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
        {/* The oversized logo itself */}
        <div
          className="relative w-[100vmin] sm:w-[135vmin] max-w-none aspect-square"
          style={{
            filter: "blur(2px) drop-shadow(0 0 60px rgba(34,178,203,0.3))",
            animation: anim ? "heroLogo 28s ease-in-out infinite" : "none",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          <img
            src={elaraLogo}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-contain opacity-[0.14] mix-blend-multiply select-none"
            draggable={false}
            width={512}
            height={397}
          />
        </div>
        {/* Soft center light so headline text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 50%, rgba(255,255,255,0.6), rgba(255,255,255,0) 70%)",
          }}
        />
      </div>

      {/* Floating particles — restyled as fine water droplets with a bright highlight */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={`absolute rounded-full particle ${i >= 8 ? "hidden sm:block" : ""}`}
            style={{
              width: `${4 + (i % 5) * 3}px`,
              height: `${4 + (i % 5) * 3}px`,
              top: `${(i * 37) % 90}%`,
              left: `${(i * 53) % 95}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
              background:
                i % 3 === 0
                  ? "radial-gradient(circle at 35% 30%, #fff 0%, rgba(255,255,255,0.9) 12%, rgba(94,211,255,0.55) 40%, transparent 72%)"
                  : i % 3 === 1
                  ? "radial-gradient(circle at 35% 30%, #fff 0%, rgba(255,255,255,0.85) 10%, rgba(34,178,203,0.55) 42%, transparent 72%)"
                  : "radial-gradient(circle at 35% 30%, #fff 0%, rgba(255,255,255,0.8) 10%, rgba(105,182,74,0.45) 42%, transparent 72%)",
              boxShadow: "0 0 6px rgba(255,255,255,0.5)",
              filter: "blur(0.4px)",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        {/* Copy column */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-[11px] font-bold tracking-[0.3em] uppercase text-navy shadow-[0_10px_30px_-12px_rgba(6,65,94,0.35)]">
              <Sparkles className="h-3.5 w-3.5 text-blue" />
              Premium Mineral & Alkaline Water.
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="mt-7 text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold leading-[1.03] tracking-tight text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #06415E 0%, #0E74A7 22%, #22B2CB 42%, #5ED3FF 58%, #259F9F 75%, #06415E 100%)",
                backgroundSize: "220% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                animation: anim ? "heroTextShift 14s ease-in-out infinite" : "none",
              }}
            >
              Luxury In
              <br />
              <span className="relative">
                Every Drop
                <span
                  className="absolute -bottom-2 left-0 right-0 h-[10px] rounded-full opacity-70 blur-md"
                  style={{
                    background:
                      "linear-gradient(90deg,#B9D22A,#69B64A,#259F9F,#5ED3FF,#0E74A7)",
                  }}
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 text-base sm:text-lg leading-relaxed text-text-muted max-w-xl">
              ELARA WAVE delivers 100% natural, mineral-rich water — enriched
              with essential minerals, free from impurities, and fresh to
              your doorstep across Lahore.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { i: Droplets, t: "10,000+ Delivered" },
                { i: ShieldCheck, t: "PFA Registered" },
                { i: FlaskConical, t: "Lab Tested" },
              ].map(({ i: I, t }) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/55 backdrop-blur-xl border border-white/80 text-xs font-semibold text-navy shadow-[0_8px_24px_-10px_rgba(14,116,167,0.4)]"
                >
                  <span className="grid place-items-center h-4 w-4 rounded-full bg-gradient-to-br from-blue to-green text-white">
                    <I className="h-2.5 w-2.5" />
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="shine group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0E74A7] to-[#259F9F] text-white font-semibold shadow-[0_20px_50px_-14px_rgba(14,116,167,0.65)] hover:-translate-y-0.5 hover:shadow-[0_25px_60px_-14px_rgba(37,159,159,0.75)] transition"
              >
                Order Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/55 backdrop-blur-xl text-navy font-semibold border border-white/80 hover:bg-white/90 hover:-translate-y-0.5 transition"
              >
                Our Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Visual column — the two-bottle hero, now staged like a premium advertising shot */}
        <Reveal as="scale" delay={0.2}>
          <motion.div
            style={{ x: bottleX, y: bottleY, rotateX: rotX, rotateY: rotY }}
            className="relative mx-auto w-full max-w-[560px] aspect-[4/5] [transform-style:preserve-3d] will-change-transform"
          >
            {/* Big soft splash silhouette behind the bottle frame — pure CSS, no new image assets */}
            <div aria-hidden className="absolute inset-[-12%] -z-20 pointer-events-none">
              <div
                className="absolute inset-0 rounded-[50%]"
                style={{
                  background:
                    "radial-gradient(55% 50% at 50% 42%, rgba(255,255,255,0.9), rgba(214,244,255,0.55) 40%, transparent 74%)",
                  filter: "blur(30px)",
                  animation: anim ? "heroSplashPulse 8s ease-in-out infinite" : "none",
                  willChange: "transform, opacity",
                }}
              />
              <div
                className="absolute inset-0 rounded-[50%]"
                style={{
                  background:
                    "conic-gradient(from 200deg at 55% 45%, rgba(94,211,255,0.35), rgba(255,255,255,0) 30%, rgba(105,182,74,0.18) 55%, rgba(255,255,255,0) 80%)",
                  filter: "blur(24px)",
                  animation: anim ? "heroSplashPulse 10s ease-in-out infinite 1s" : "none",
                  willChange: "transform, opacity",
                }}
              />
            </div>

            {/* Ambient glow that follows mouse — position stays framer-motion, pulse is CSS */}
            <motion.div
              style={{ x: glowX, y: glowY }}
              aria-hidden
              className="absolute inset-0 -z-10 rounded-[42px] blur-2xl opacity-90"
            >
              <div
                className="absolute inset-0 rounded-[42px]"
                style={{
                  background:
                    "radial-gradient(60% 55% at 55% 45%, rgba(94,211,255,0.6), rgba(105,182,74,0.3) 45%, transparent 75%)",
                  animation: anim ? "heroGlow7 7s ease-in-out infinite" : "none",
                  willChange: "transform, opacity",
                }}
              />
            </motion.div>

            {/* Glass frame — crystal-clear acrylic look */}
            <div
              className="absolute inset-0 rounded-[42px] border border-white/80 shine overflow-hidden shadow-[0_50px_130px_-28px_rgba(6,65,94,0.45)]"
              style={{
                background:
                  "linear-gradient(160deg,rgba(255,255,255,0.65),rgba(255,255,255,0.08))",
                backdropFilter: "blur(14px) saturate(150%)",
              }}
            >
              {/* Top highlight line — glass reflection edge */}
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              {/* Diagonal glass reflection streak */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-1/4 -left-1/4 h-[70%] w-1/3 rotate-[18deg]"
                style={{
                  background:
                    "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0) 80%)",
                }}
              />

              {/* Bottle photograph — untouched, label/logo/colors/proportions identical */}
              <img
                src={heroBottlesUrl}
                alt="Two ELARA WAVE mineral water bottles"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={525}
                height={700}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  filter:
                    "saturate(1.1) contrast(1.06) drop-shadow(0 24px 32px rgba(6,65,94,0.32))",
                  animation: anim ? "heroBottleFloat 7s ease-in-out infinite" : "none",
                  willChange: "transform",
                }}
              />

              {/* Cinematic gradient wash over the photo — HDR key light from top-right */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 30%, transparent 65%, rgba(6,65,94,0.22) 100%), radial-gradient(55% 40% at 78% 8%, rgba(255,255,255,0.55), transparent 70%), radial-gradient(60% 45% at 50% 10%, rgba(255,255,255,0.3), transparent 70%)",
                }}
              />

              {/* Soft light sweep */}
              {anim && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/2 rotate-12"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)",
                    animation: "heroSweep 9s ease-in-out infinite",
                    willChange: "transform",
                  }}
                />
              )}

              {/* Floating glass chips — glassmorphism, matches reference */}
              <div
                className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] text-navy border border-white/80"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(14px) saturate(160%)",
                  boxShadow: "0 8px 24px -12px rgba(6,65,94,0.35)",
                  animation: anim ? "heroFloatSlow 5s ease-in-out infinite" : "none",
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_8px_rgba(105,182,74,0.9)]" />
                  100% NATURAL
                </span>
              </div>
              <div
                className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] text-navy border border-white/80"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(14px) saturate(160%)",
                  boxShadow: "0 8px 24px -12px rgba(6,65,94,0.35)",
                  animation: anim ? "heroFloatSlowRev 6s ease-in-out infinite 0.6s" : "none",
                }}
              >
                pH&nbsp;8.5+
              </div>

              {/* Bottom info bar */}
              <div
                className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/80 px-4 py-3 flex items-center justify-between"
                style={{
                  background: "rgba(255,255,255,0.68)",
                  backdropFilter: "blur(16px) saturate(160%)",
                  boxShadow: "0 12px 30px -14px rgba(6,65,94,0.4)",
                  animation: anim ? "heroFloatSlow 6s ease-in-out infinite 0.3s" : "none",
                }}
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[0.28em] text-blue">FLOW WITH FRESHNESS</div>
                  <div className="text-sm font-extrabold text-navy truncate">500ml · 1.5L Premium</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-green text-green" />
                  ))}
                </div>
              </div>
            </div>

            {/* Acrylic platform reflection — mirrors the bottle photo beneath the frame */}
            <div
              aria-hidden
              className="absolute left-[8%] right-[8%] top-full mt-2 h-[18%] -z-10 overflow-hidden rounded-b-[42px] pointer-events-none"
              style={{
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
              }}
            >
              <img
                src={heroBottlesUrl}
                alt=""
                aria-hidden
                width={525}
                height={700}
                className="absolute inset-x-0 -top-full h-[120%] w-full object-cover opacity-40"
                style={{ transform: "scaleY(-1)", filter: "blur(1px) saturate(1.1)" }}
                draggable={false}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.75) 70%)",
                }}
              />
            </div>

            {/* Floating side chip — quick facts */}
            <div
              className="hidden sm:flex absolute -left-6 top-1/2 -translate-y-1/2 flex-col gap-1 rounded-2xl border border-white/80 px-3 py-3 shadow-[0_20px_45px_-18px_rgba(6,65,94,0.45)]"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(16px) saturate(160%)",
                animation: anim ? "heroFloatSlowRev 7s ease-in-out infinite" : "none",
              }}
            >
              <span className="text-[9px] font-bold tracking-[0.3em] text-blue">MINERALS</span>
              <span className="text-lg font-extrabold text-navy">Ca · Mg · K</span>
            </div>

            <div
              className="hidden sm:flex absolute -right-6 bottom-16 flex-col gap-1 rounded-2xl border border-white/80 px-3 py-3 shadow-[0_20px_45px_-18px_rgba(6,65,94,0.45)]"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(16px) saturate(160%)",
                animation: anim ? "heroFloatSlow 7s ease-in-out infinite 0.5s" : "none",
              }}
            >
              <span className="text-[9px] font-bold tracking-[0.3em] text-green">DELIVERY</span>
              <span className="text-lg font-extrabold text-navy">Same-day</span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

const products = [
  { title: "Mineral Water", desc: "Naturally sourced with essential minerals for daily hydration.", img: "/images/home-mineral-water.webp", to: "/products#mineral" },
  { title: "Alkaline Water", desc: "Balanced pH 8.5+ to complement an active, healthier lifestyle.", img: "/images/alkaline-water.webp", to: "/products#alkaline" },
  { title: "Premium Water", desc: "Ultra-refined for a crisp, clean taste — our flagship pour.", img: "/images/primium-water.webp", to: "/products#premium" },
  {
    title: "19L + 5L Bottles",
    desc: "Home & office packs: 19L Mineral, 19L Alkaline, and 5L family bottles.",
    img: "/images/bottle-real-1.webp",
    to: "/products#bulk",
    badges: ["19L Mineral", "19L Alkaline", "5L Bottles"],
  },
];

export function ProductCards() {
  return (
    <section id="products" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">OUR RANGE</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-navy">
              A <span className="shine-text">premium pour</span> for every moment
            </h2>
            <p className="mt-4 text-text-muted">
              Four signature categories — each crafted, filtered, and mineral-balanced to
              deliver ELARAWAVE quality.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {products.map((p) => (
            <StaggerItem key={p.title}>
              <Link
                to={p.to}
                className="group relative flex flex-col h-full glass-card overflow-hidden hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(18,58,94,0.25)] transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={900}
                    height={675}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-text-muted line-clamp-2">{p.desc}</p>
                  {p.badges && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.badges.map((b) => (
                        <span key={b} className="text-[10px] font-semibold px-2 py-1 rounded-full bg-bg-light text-navy">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function Highlights() {
  const items = [
    { i: BadgeCheck, t: "PFA Registered", d: "Certified by the Punjab Food Authority." },
    { i: FlaskConical, t: "Lab Tested", d: "Every batch tested for purity & minerals." },
    { i: Leaf, t: "Halal Certified", d: "Trusted, ethical, community-first." },
    { i: Truck, t: "Same-day Delivery", d: "Fresh at your doorstep across Lahore." },
  ];
  return (
    <section className="py-16 bg-gradient-to-b from-white to-bg-tint">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ i: I, t, d }) => (
            <StaggerItem key={t}>
              <div className="glass-card p-6 h-full hover:-translate-y-1 transition">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine">
                  <I className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-bold text-navy">{t}</h4>
                <p className="mt-1 text-sm text-text-muted">{d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Custom Branding teaser                                                    */
/* -------------------------------------------------------------------------- */

export function CustomBrandingTeaser() {
  return (
    <section className="py-24 bg-gradient-to-b from-bg-tint via-white to-bg-tint">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-blue text-xs font-bold tracking-[0.25em] uppercase">
                <Palette className="h-3.5 w-3.5" /> Custom Branding
              </span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold text-navy leading-[1.05]">
                Your Brand. <span className="shine-text">Our Premium Bottles.</span>
              </h2>
              <p className="mt-5 text-text-muted max-w-xl">
                Perfect for businesses, restaurants, hotels, cafés, events and corporate
                gifting. Get fully customised bottles with your logo &amp; label.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="shine group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold shadow-[0_20px_60px_-20px_rgba(18,58,94,0.6)] hover:-translate-y-0.5 transition"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/custom-branding"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card text-navy font-semibold hover:-translate-y-0.5 transition"
                >
                  Custom Branding Bottles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal as="scale" delay={0.15}>
            <div className="relative mx-auto max-w-md">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass rounded-[36px] p-6 shine"
              >
                <div className="rounded-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-2xl p-6 border border-white/70">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-widest text-navy">YOUR LOGO</span>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-brand text-white">MIN 100</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { l: "Hotels", v: "Premium" },
                      { l: "Events", v: "Branded" },
                      { l: "Offices", v: "Corporate" },
                      { l: "Cafés", v: "Retail" },
                    ].map((c) => (
                      <div key={c.l} className="rounded-2xl bg-white/70 border border-white/80 p-4">
                        <div className="text-[10px] uppercase tracking-widest text-text-muted">{c.l}</div>
                        <div className="text-sm font-extrabold text-navy mt-1">{c.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl bg-brand text-white p-4 shine">
                    <div className="text-[10px] uppercase tracking-widest opacity-80">Turnaround</div>
                    <div className="text-2xl font-extrabold">5–10 Days</div>
                    <div className="text-[11px] opacity-80">Free design mockup included</div>
                  </div>
                </div>
              </motion.div>
              <div className="absolute -inset-6 -z-10 bg-sky/30 blur-3xl rounded-full" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quality Process — 6-step timeline                                         */
/* -------------------------------------------------------------------------- */

const qualitySteps = [
  { i: Droplets, t: "Source Selection", d: "Premium water source." },
  { i: FlaskConical, t: "Advanced Filtration", d: "Removes impurities." },
  { i: Beaker, t: "Mineral Enhancement", d: "Balanced minerals." },
  { i: Sun, t: "UV Sterilization", d: "Eliminates bacteria." },
  { i: TestTube2, t: "Quality Testing", d: "Lab verified." },
  { i: PackageCheck, t: "Safe Delivery", d: "Securely bottled." },
];

export function QualityProcess() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">OUR QUALITY PROCESS</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-navy">
              Every Drop Goes Through <span className="shine-text">6 Stages Of Purification</span>
            </h2>
            <p className="mt-4 text-text-muted">
              At Elara Wave, every bottle passes through a carefully controlled purification
              system using advanced filtration, UV sterilization and strict laboratory testing
              to ensure exceptional purity, balanced minerals and a refreshing taste.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {qualitySteps.map(({ i: I, t, d }, idx) => (
            <StaggerItem key={t}>
              <div className="relative glass-card p-6 h-full hover:-translate-y-1 transition">
                <div className="absolute top-4 right-4 text-[11px] font-bold tracking-widest text-blue/70">
                  0{idx + 1}
                </div>
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine">
                  <I className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-bold text-navy">{t}</h4>
                <p className="mt-1 text-sm text-text-muted">{d}</p>
                {idx < qualitySteps.length - 1 && (
                  <div className="hidden lg:flex absolute -bottom-3 left-1/2 -translate-x-1/2 text-blue/50">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Delivering Across Lahore                                                  */
/* -------------------------------------------------------------------------- */

export function DeliveringLahore() {
  const features = [
    { i: Truck, t: "Same-Day Delivery" },
    { i: HomeIcon, t: "Homes & Apartments" },
    { i: Building2, t: "Offices & Businesses" },
    { i: Hotel, t: "Hotels & Restaurants" },
  ];
  return (
    <section className="py-24 bg-gradient-to-b from-bg-tint via-white to-bg-tint">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-blue text-xs font-bold tracking-[0.25em] uppercase">
              <MapPin className="h-3.5 w-3.5" /> Coverage
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold text-navy leading-[1.05]">
              Delivering Across <span className="shine-text">Lahore</span>
            </h2>
            <p className="mt-5 text-text-muted max-w-xl">
              We deliver to all major areas in Lahore.
            </p>
            <div className="mt-8">
              <Link
                to="/coverage-areas"
                className="shine group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold shadow-[0_20px_60px_-20px_rgba(18,58,94,0.6)] hover:-translate-y-0.5 transition"
              >
                View Areas
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2">
          {features.map(({ i: I, t }) => (
            <StaggerItem key={t}>
              <div className="glass-card p-5 h-full hover:-translate-y-1 transition flex items-center gap-4">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine shrink-0">
                  <I className="h-5 w-5" />
                </div>
                <div className="font-semibold text-navy">{t}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Who We Serve                                                              */
/* -------------------------------------------------------------------------- */

const audiences = [
  {
    i: HomeIcon,
    t: "Homes",
    d: "Pure drinking water delivered directly to your doorstep for the whole family.",
  },
  {
    i: Building2,
    t: "Corporate Offices",
    d: "Reliable daily water supply for offices and workplaces across Lahore.",
  },
  {
    i: Hotel,
    t: "Hotels & Restaurants",
    d: "Premium bottled water to impress your guests and customers every time.",
  },
  {
    i: PartyPopper,
    t: "Events",
    d: "Customized bottles for weddings, seminars, conferences and special events.",
  },
];

export function WhoWeServe() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">WHO WE SERVE</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-navy">
              Trusted By <span className="shine-text">Homes &amp; Businesses</span>
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ i: I, t, d }) => (
            <StaggerItem key={t}>
              <div className="glass-card p-6 h-full hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(18,58,94,0.25)] transition-all duration-500">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine">
                  <I className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-bold text-navy">{t}</h4>
                <p className="mt-2 text-sm text-text-muted">{d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Home CTA                                                                  */
/* -------------------------------------------------------------------------- */

export function HomeCTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal as="scale">
          <div className="relative overflow-hidden rounded-[36px] bg-brand text-white p-10 sm:p-14 shine shadow-[0_40px_100px_-30px_rgba(18,58,94,0.6)]">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_20%_20%,rgba(111,195,232,0.35),transparent_60%)]" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_90%_80%,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="max-w-3xl">
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.05]">
                Experience Pure Hydration With <span className="shine-text">Elara Wave</span>
              </h2>
              <p className="mt-5 text-white/85 max-w-2xl">
                Whether you need bottled water for your home, office, restaurant or a special
                event, we're ready to deliver premium quality water with reliable service
                across Lahore.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="shine group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-navy font-semibold hover:-translate-y-0.5 transition"
                >
                  Order Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </Link>
                <a
                  href="tel:+920000000000"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-dark text-white font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition"
                >
                  <Phone className="h-4 w-4" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}