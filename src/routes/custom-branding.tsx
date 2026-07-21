import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { BottleConfigurator } from "@/components/sections/BottleConfigurator";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { endpoints, ApiError } from "@/lib/api";
import { toast } from "sonner";
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
  { name: "Al Ghani", desc: "Elevated 500 ml glass bottles for premium dev showrooms and client lounges.", img: "/images/project-timmy-sanitary.webp" },
  { name: "Tiles and Sanitary", desc: "Sport-fresh alkaline packs tailored for training sessions, tournaments and gym floors.", img: "/images/project-sapphire-sports.webp" },
  { name: "Reportage", desc: "Signature hotel welcome water — foil-embossed label with a soft mineral pour.", img: "/images/project-four.webp" },
  { name: "Sapphire", desc: "Wedding-season private label — bespoke event branding with elegant typography.", img: "/images/project-five.webp" },
  { name: "Quetta Pharaata", desc: "Signature hotel water for guest rooms and dining — a clean label that mirrors the hotel's understated, traditional hospitality.", img: "/images/project-six.webp" },
];

// Real bottle showcase — admin-uploadable placeholders
const realBottles = [
  {
    image: "/images/250ml.webp",
    label: "250 ML",
    desc: "Compact premium bottle for events, meetings and giveaways.",
  },
  {
    image: "/images/330ml.webp",
    label: "330 ML",
    desc: "Premium everyday bottle with elegant label presentation.",
  },
  {
    image: "/images/500ml.webp",
    label: "500 ML",
    desc: "Most popular format for retail, offices and hospitality.",
  },
  {
    image: "/images/1-5l.webp",
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

// Client logos — drop each brand's logo file into /public/images/clients/
// using the filenames below (transparent or white-bg PNG/WEBP works best).
const clients = [
  { name: "WE Nest", logo: "/images/clients/we-nest.webp" },
  { name: "R Pakistan", logo: "/images/clients/r-pakistan.webp" },
  { name: "Pasha's Kitchen", logo: "/images/clients/pashas-kitchen.webp" },
  { name: "Barki Tobacco & Pan Shop", logo: "/images/clients/barki.webp" },
  { name: "Saanch", logo: "/images/clients/saanch.webp" },
  { name: "Fly Ace Travels", logo: "/images/clients/fly-ace-travels.webp" },
  { name: "Timmy's", logo: "/images/clients/timmys.webp" },
  { name: "Quetta Rehman Paratha", logo: "/images/clients/qrp.webp" },
  { name: "Haji Restaurant", logo: "/images/clients/haji-restaurant.webp" },
  { name: "Jahaan Properties", logo: "/images/clients/jahaan-properties.webp" },
  { name: "Velvety Bite", logo: "/images/clients/velvety-bite.webp" },
  { name: "V", logo: "/images/clients/vj-check.webp" },
  { name: "Zaheer Marriage Palace", logo: "/images/clients/zaheer-marriage-palace.webp" },
  { name: "Quetta Kaifi - A", logo: "/images/clients/quetta-kaifi.webp" },
  { name: "Kent Motor Industry", logo: "/images/clients/kent-motor.webp" },
  { name: "Morve", logo: "/images/clients/morve.webp" },
  { name: "Al Hafiz Tasty Yakhni Pulao", logo: "/images/clients/al-hafiz.webp" },
  { name: "Generation Hair Salon", logo: "/images/clients/generation-salon.webp" },
  { name: "Creamy Dreamy", logo: "/images/clients/creamy-dreamy.webp" },
  { name: "Coffee Lounge", logo: "/images/clients/coffee-lounge.webp" },
  { name: "Tiles & Sanitary", logo: "/images/clients/tiles-sanitary.webp" },
  { name: "Living Space", logo: "/images/clients/living-space.webp" },
  { name: "Harry Baba Fast Foods", logo: "/images/clients/harry-baba.webp" },
  { name: "Specialist Dental & Aesthetic Clinic", logo: "/images/clients/specialist-dental.webp" },
  { name: "Dildar Silver & Gold Jewelery", logo: "/images/clients/dildar.webp" },
  { name: "Lahore Dum Biryani", logo: "/images/clients/lahore-dum-biryani.webp" },
  { name: "Al-Amal Umrah & Travel Services", logo: "/images/clients/al-amal.webp" },
  { name: "Ice Land", logo: "/images/clients/ice-land.webp" },
];

const stats = [
  { v: "120+", l: "Brands served" },
  { v: "500K+", l: "Custom bottles delivered" },
  { v: "48-Hour", l: "Sample turnaround" },
  { v: "99.8%", l: "On-time delivery" },
];

const emptyForm = {
  name: "",
  brand: "",
  email: "",
  phone: "",
  size: "",
  quantity: "",
  brief: "",
};

function CustomBranding() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await endpoints.brandingRequest({
        name: form.name,
        brand: form.brand,
        email: form.email,
        phone: form.phone || undefined,
        size: form.size,
        quantity: form.quantity,
        brief: form.brief,
      });
      setSubmitted(true);
      toast.success("Request sent — we'll be in touch within 24 hours.");
      setForm(emptyForm);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to send request");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="CUSTOM BRANDING"
        title={<>Your brand, <span className="shine-text">bottled beautifully</span></>}
        subtitle="From weddings to hotel chains — we craft premium private-label water that carries your identity into every hand."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#customizer" className="shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition">
            Design your bottle <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#portfolio" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-navy/15 text-navy font-semibold hover:bg-bg-light transition">
            See portfolio
          </a>
        </div>
      </PageHero>

      {/* Bottle customizer — moved to the TOP for premium first impression */}
      <section id="customizer" className="scroll-mt-24 pt-4">
        <BottleConfigurator />
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 scroll-mt-24">
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

      {/* Our Valued Clients — animated logo marquee */}
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

        <Reveal>
          <div className="clients-marquee mt-12 glass-card p-6 sm:p-8">
            <div className="clients-marquee__fade clients-marquee__fade--left" />
            <div className="clients-marquee__fade clients-marquee__fade--right" />
            <div className="clients-marquee__track">
              {[...clients, ...clients].map((c, i) => (
                <div
                  key={`${c.name}-${i}`}
                  className="clients-marquee__item"
                  title={c.name}
                >
                  <img
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    className="h-12 sm:h-14 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <style>{`
          .clients-marquee {
            position: relative;
            overflow: hidden;
          }
          .clients-marquee__track {
            display: flex;
            align-items: center;
            gap: 3rem;
            width: max-content;
            animation: clients-marquee-scroll 32s linear infinite;
          }
          .clients-marquee:hover .clients-marquee__track {
            animation-play-state: paused;
          }
          .clients-marquee__item {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 4rem;
          }
          .clients-marquee__fade {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 4rem;
            z-index: 10;
            pointer-events: none;
          }
          .clients-marquee__fade--left {
            left: 0;
            background: linear-gradient(to right, var(--tw-gradient-from, #fff), transparent);
          }
          .clients-marquee__fade--right {
            right: 0;
            background: linear-gradient(to left, var(--tw-gradient-from, #fff), transparent);
          }
          @keyframes clients-marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>


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
                  <input required type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">BRAND / COMPANY</label>
                  <input required type="text" placeholder="Brand name" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">EMAIL</label>
                  <input required type="email" placeholder="you@brand.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">PHONE / WHATSAPP</label>
                  <input required type="tel" placeholder="+92 300 0000000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-widest text-navy">BOTTLE SIZE</label>
                  <select required value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy">
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
                  <input required type="text" placeholder="e.g. 5,000 bottles" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-navy">BRIEF</label>
                <textarea required rows={4} placeholder="Tell us about the event, brand identity or delivery timeline…" value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })} className="mt-2 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy resize-none" />
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button disabled={busy} type="submit" className="shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition disabled:opacity-60">
                  <Send className="h-4 w-4" /> {busy ? "Sending…" : "Send request"}
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