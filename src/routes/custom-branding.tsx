import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { BottleConfigurator } from "@/components/sections/BottleConfigurator";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  ArrowUpRight,
  ImageIcon,
  Palette,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Users,
  Send,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/custom-branding")({
  head: () => ({
    meta: [
      { title: "Custom Branding — ELARAWAVE Private Label Water" },
      {
        name: "description",
        content:
          "Premium private-label water bottles for brands, events, hotels and gifting. See our portfolio, real bottles and request custom branding.",
      },
      { property: "og:title", content: "ELARAWAVE Custom Branding" },
      {
        property: "og:description",
        content: "Private-label premium water bottles for brands, hotels and events.",
      },
    ],
  }),
  component: CustomBranding,
});

const projects = [
  { name: "Timmy's", desc: "Corporate hydration line for a leading ceramics brand — cohesive with their showroom identity.", img: "/images/project-timmy-tiles.webp" },
  { name: "Al Ghani", desc: "Elevated 500ml glass bottles for premium dev showrooms and client lounges.", img: "/images/project-timmy-sanitary.webp" },
  { name: "Tiles and Sanitary", desc: "Sport-fresh alkaline packs tailored for training sessions, tournaments and gym floors.", img: "/images/project-sapphire-sports.webp" },
  { name: "Reportage", desc: "Signature hotel welcome water — foil-embossed label with a soft mineral pour.", img: "/images/project-four.webp" },
  { name: "Sapphire", desc: "Wedding-season private label — bespoke event branding with elegant typography.", img: "/images/project-five.webp" },
];

// Real bottle showcase — admin-uploadable placeholders
const realBottles = [
  {
    image: "/images/250ml.png",
    label: "250 ML",
    desc: "Compact premium bottle for events, meetings and giveaways.",
  },
  {
    image: "/images/330ml.png",
    label: "330 ML",
    desc: "Premium everyday bottle with elegant label presentation.",
  },
  {
    image: "/images/500ml.png",
    label: "500 ML",
    desc: "Most popular format for retail, offices and hospitality.",
  },
  {
    image: "/images/1-5l.png",
    label: "1.5 L",
    desc: "Family-size bottle perfect for homes and restaurants.",
  },
];

const whyBrand = [
  { icon: Palette, t: "Full design support", d: "In-house design team turns your brief into print-ready label artwork — no agency fees." },
  { icon: ShieldCheck, t: "PFA registered water", d: "Every branded bottle carries the same lab-tested, halal-certified ELARAWAVE quality." },
  { icon: Award, t: "Premium finish options", d: "Foil, matte, spot-UV and embossed labels — finishes that feel as premium as they look." },
  { icon: Truck, t: "Low MOQs, fast turnaround", d: "Small runs for events, scalable production for brands — delivered on your timeline." },
  { icon: Users, t: "Dedicated brand manager", d: "One point of contact from first sketch to final delivery — briefing, samples and reorders." },
  { icon: Sparkles, t: "Sample before you commit", d: "Approve a physical printed sample before we run your full order — zero guesswork." },
];

const clients = [
  "Timmy Tiles",
  "Timmy Sanitary",
  "Sapphire Sports",
  "Lahore Grand Hotel",
  "Royal Events Co.",
  "Nexus Corporate",
  "Aster Weddings",
  "Meridian Club",
];

const stats = [
  { v: "120+", l: "Brands served" },
  { v: "500K+", l: "Custom bottles delivered" },
  { v: "48 hr", l: "Sample turnaround" },
  { v: "99.8%", l: "On-time delivery" },
];

function CustomBranding() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="CUSTOM BRANDING"
        title={<>Your brand, <span className="shine-text">bottled beautifully</span></>}
        subtitle="From weddings to hotel chains — we craft premium private-label water that carries your identity into every hand."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#branding-request" className="shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition">
            Start your project <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#portfolio" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-navy/15 text-navy font-semibold hover:bg-bg-light transition">
            See portfolio
          </a>
        </div>
      </PageHero>

      {/* Portfolio (existing) */}
      <section id="portfolio" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-blue">SELECTED WORK</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy">Portfolio showcase</h2>
            </div>
          </div>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <StaggerItem key={p.name}>
              <article className="group glass-card overflow-hidden hover:-translate-y-2 transition duration-500 h-full">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full glass text-navy opacity-0 group-hover:opacity-100 transition">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-navy">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-text-muted line-clamp-3">{p.desc}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Our Real Bottles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">OUR REAL BOTTLES</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy">
              Real formats, <span className="shine-text">real production</span>
            </h2>
            <p className="mt-4 text-text-muted">
              Every branded run is produced on the same premium ELARAWAVE line. Here are the formats you can brand — image slots ready for admin uploads.
            </p>
          </div>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-4">
          {realBottles.map((b) => (
            <StaggerItem key={b.label}>
              <div className="group glass-card overflow-hidden hover:-translate-y-2 transition duration-500 h-full">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-bg-tint to-white flex items-center justify-center">
  <img
    src={b.image}
    alt={b.label}
    loading="lazy"
    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
  />
</div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-navy">{b.label}</h3>
                  <p className="mt-1 text-xs text-text-muted">{b.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Why brand with Elara Wave */}
      <section className="mt-24 py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-tint via-white to-bg-light" />
        <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-blue/20 blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold tracking-[0.3em] text-blue">WHY ELARAWAVE</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy">
                Why brand with <span className="shine-text">Elara Wave</span>
              </h2>
              <p className="mt-4 text-text-muted">
                A premium bottling partner — not a print shop. We handle water, design, production and delivery in one place.
              </p>
            </div>
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyBrand.map(({ icon: I, t, d }) => (
              <StaggerItem key={t}>
                <div className="glass-card p-6 h-full hover:-translate-y-1 transition">
                  <div className="grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine">
                    <I className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy">{t}</h3>
                  <p className="mt-2 text-sm text-text-muted">{d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Statistics */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-card p-8 sm:p-12 grid gap-8 grid-cols-2 lg:grid-cols-4 text-center">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="shine-text text-4xl sm:text-5xl font-extrabold">{s.v}</div>
                <div className="mt-2 text-xs font-semibold tracking-widest uppercase text-text-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Our Valued Clients */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">TRUSTED BY</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy">
              Our <span className="shine-text">valued clients</span>
            </h2>
            <p className="mt-4 text-text-muted">
              From boutique weddings to national hotel groups — brands that trust ELARAWAVE with their identity.
            </p>
          </div>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-4">
          {clients.map((c) => (
            <StaggerItem key={c}>
              <div className="glass-card h-24 flex items-center justify-center text-navy font-bold tracking-wide text-center px-3 hover:-translate-y-1 transition">
                {c}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Bottle configurator (existing) */}
      <BottleConfigurator />

      {/* Branding request form */}
      <section id="branding-request" className="py-24 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-light via-white to-bg-tint" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold tracking-[0.3em] text-blue">START YOUR PROJECT</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy">
                Request <span className="shine-text">custom branding</span>
              </h2>
              <p className="mt-4 text-text-muted">
                Share a few details and our brand team will follow up within one working day with pricing and a sample plan.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <form onSubmit={onSubmit} className="mt-10 glass-card p-6 sm:p-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">FULL NAME</label>
                  <input required type="text" placeholder="Your name" className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">BRAND / COMPANY</label>
                  <input required type="text" placeholder="Brand name" className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">EMAIL</label>
                  <input required type="email" placeholder="you@brand.com" className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">PHONE / WHATSAPP</label>
                  <input required type="tel" placeholder="+92 300 0000000" className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">BOTTLE SIZE</label>
                  <select required className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy">
                    <option value="">Select size</option>
                    <option>250 ML</option>
                    <option>500 ML</option>
                    <option>1 L</option>
                    <option>1.5 L</option>
                    <option>5 L</option>
                    <option>19 L</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">QUANTITY</label>
                  <input required type="text" placeholder="e.g. 5,000 bottles" className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-navy">BRIEF</label>
                <textarea required rows={4} placeholder="Tell us about the event, brand identity or delivery timeline…" className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy resize-none" />
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button type="submit" className="shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition">
                  <Send className="h-4 w-4" /> Send request
                </button>
                {submitted && (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-green">
                    <CheckCircle2 className="h-4 w-4" /> Thanks — we'll be in touch within 24 hours.
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
