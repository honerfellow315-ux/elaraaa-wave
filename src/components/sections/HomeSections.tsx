import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
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

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden shine">
      {/* Premium SVG + mesh gradient hero background — brand palette only */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#0C2C48_0%,#123A5E_45%,#1B5A8A_100%)]">
        {/* Mesh gradient blobs */}
        <div className="absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(111,195,232,0.55),transparent_60%)] blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(62,154,214,0.5),transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(111,185,44,0.28),transparent_65%)] blur-3xl" />
        {/* Abstract water waves SVG */}
        <svg className="absolute inset-x-0 bottom-0 w-full h-[55%] opacity-70" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="hw1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6FC3E8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#123A5E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hw2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3E9AD6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0C2C48" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,300 C240,220 480,380 720,320 C960,260 1200,380 1440,300 L1440,600 L0,600 Z" fill="url(#hw1)" />
          <path d="M0,420 C240,360 480,500 720,440 C960,380 1200,500 1440,420 L1440,600 L0,600 Z" fill="url(#hw2)" />
        </svg>
        {/* Fine grid overlay for premium feel */}
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_30%,rgba(111,195,232,0.25),transparent_60%)]" />
      </div>


      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/40 blur-sm particle"
            style={{
              width: `${6 + (i % 5) * 4}px`,
              height: `${6 + (i % 5) * 4}px`,
              top: `${(i * 37) % 90}%`,
              left: `${(i * 53) % 95}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" /> Drink Pure &amp; Live Better.
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight">
              Lahore Purest <span className="shine-text">Mineral Water</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-white/85 max-w-xl">
              Elara Wave delivers 100% natural mineral water — enriched with essential
              free from impurities, and fresh to your doorstep in Lahore.
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark text-xs font-medium"
                >
                  <I className="h-3.5 w-3.5 text-sky" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="shine group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-navy font-semibold shadow-[0_20px_60px_-20px_rgba(255,255,255,0.9)] hover:-translate-y-0.5 transition"
              >
                Order Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-dark text-white font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition"
              >
                Our Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right visual — glass crystal card */}
        <Reveal as="scale" delay={0.2}>
          <div className="relative mx-auto max-w-md">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass rounded-[36px] p-6 shine"
            >
              <div className="rounded-3xl bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-2xl p-6 border border-white/70">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold tracking-widest text-navy">CRYSTAL PURE</span>
                  <span className="inline-flex items-center gap-1 text-xs text-navy/70">
                    <Star className="h-3 w-3 fill-green text-green" /> 4.9
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { i: Leaf, l: "Alkaline", v: "pH 8.5+" },
                    { i: Award, l: "Halal", v: "Certified" },
                    { i: Truck, l: "Delivery", v: "Same-day" },
                  ].map(({ i: I, l, v }) => (
                    <div key={l} className="rounded-2xl bg-white/60 border border-white/70 p-3">
                      <I className="mx-auto h-5 w-5 text-blue" />
                      <div className="text-[11px] text-text-muted mt-2">{l}</div>
                      <div className="text-sm font-bold text-navy">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-brand text-white p-4 shine">
                    <div className="text-[10px] uppercase tracking-widest opacity-80">From</div>
                    <div className="text-2xl font-extrabold">Rs 250</div>
                    <div className="text-[11px] opacity-80">per 19L bottle</div>
                  </div>
                  <div className="rounded-2xl bg-white/70 border border-white/80 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-text-muted">Members</div>
                    <div className="text-2xl font-extrabold text-navy">-15%</div>
                    <div className="text-[11px] text-text-muted">on monthly plans</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="absolute -inset-6 -z-10 bg-sky/30 blur-3xl rounded-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const products = [
  { title: "Mineral Water", desc: "Naturally sourced with essential minerals for daily hydration.", img: "/images/all-products.png", to: "/products#mineral" },
  { title: "Alkaline Water", desc: "Balanced pH 8.5+ to complement an active, healthier lifestyle.", img: "/images/alkaline-water.png", to: "/products#alkaline" },
  { title: "Premium Water", desc: "Ultra-refined for a crisp, clean taste — our flagship pour.", img: "/images/primium-water.png", to: "/products#premium" },
  {
    title: "19L + 5L Bottles",
    desc: "Home & office packs: 19L Mineral, 19L Alkaline, and 5L family bottles.",
    img: "/images/bottle-real-1.jpeg",
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

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <StaggerItem key={p.title}>
              <Link
                to={p.to}
                className="group relative block glass-card overflow-hidden hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(18,58,94,0.25)] transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-5">
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
                gifts. Get fully customised bottles with your logo &amp; label.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="shine group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold shadow-[0_20px_60px_-20px_rgba(18,58,94,0.6)] hover:-translate-y-0.5 transition"
                >
                  Get A Quote
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
                    <div className="text-2xl font-extrabold">3–5 Days</div>
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
              Every Drop Goes Through <span className="shine-text">6 Levels Of Purification</span>
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
    { i: Truck, t: "Same Day Delivery" },
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