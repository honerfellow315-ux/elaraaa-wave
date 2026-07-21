import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { useMemo, useState } from "react";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { Newsletter } from "@/components/sections/Newsletter";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — ELARA WAVE Hydration Journal" },
      { name: "description", content: "Hydration science, wellness tips and behind the scenes at ELARA WAVE." },
      { property: "og:title", content: "ELARA WAVE Blog" },
      { property: "og:description", content: "Hydration, wellness and craft — from the ELARA WAVE team." },
    ],
  }),
  component: Blog,
});

const categories = ["All", "Wellness", "Craft", "Fitness", "Branding", "Business"];

const posts = [
  {
    t: "The truth about alkaline water",
    d: "Beyond the marketing, what pH 8.5+ really does inside the body — a science-first look at mineral balance, hydration efficiency, and who genuinely benefits from a higher-pH pour.",
    tag: "Wellness",
    date: "Jun 2026",
    read: "6 min read",
    featured: true,
  },
  {
    t: "Inside the ELARA WAVE bottling line",
    d: "A step-by-step walkthrough of our seven-stage filtration, UV sterilisation and sealed-line bottling — the quiet craft behind every crisp, consistent bottle we deliver.",
    tag: "Craft",
    date: "May 2026",
    read: "5 min read",
  },
  {
    t: "Hydration for athletes and active lifestyles",
    d: "How mineral-rich, alkaline water supports recovery, endurance and electrolyte balance — with practical intake benchmarks for training days, match days and rest days.",
    tag: "Fitness",
    date: "May 2026",
    read: "4 min read",
  },
  {
    t: "Custom-labelled water for weddings and events",
    d: "From foil-embossed monograms to bespoke event colourways — how a thoughtfully branded bottle turns a small detail into a signature guest experience.",
    tag: "Branding",
    date: "Apr 2026",
    read: "5 min read",
  },
  {
    t: "Water, skin and everyday glow",
    d: "A dermatologist-informed guide to daily hydration habits, mineral intake and the small routines that quietly transform skin clarity over time.",
    tag: "Wellness",
    date: "Apr 2026",
    read: "4 min read",
  },
  {
    t: "Sizing a corporate water plan the right way",
    d: "A practical framework for offices, gyms and clinics — how to calculate weekly consumption, plan dispensers and choose between 5L and 19L to avoid waste.",
    tag: "Business",
    date: "Mar 2026",
    read: "7 min read",
  },
  {
    t: "Why the source matters more than the label",
    d: "A look inside Pakistan's groundwater sources and why third-party lab testing, not packaging, is the real signal of a trustworthy bottled water brand.",
    tag: "Craft",
    date: "Mar 2026",
    read: "6 min read",
  },
  {
    t: "Building a hotel welcome-water program",
    d: "How boutique hotels and guesthouses use signature bottled water — from guest-room amenities to dining service — to quietly reinforce brand identity.",
    tag: "Branding",
    date: "Feb 2026",
    read: "5 min read",
  },
  {
    t: "How much water should you actually drink daily",
    d: "Retiring the one-size-fits-all '8 glasses a day' rule with a practical guide based on body weight, climate and activity level for Pakistani summers.",
    tag: "Wellness",
    date: "Feb 2026",
    read: "4 min read",
  },
];

function Blog() {
  const [active, setActive] = useState("All");

  const featured = posts.find((p) => p.featured);
  const rest = useMemo(
    () => posts.filter((p) => !p.featured && (active === "All" || p.tag === active)),
    [active]
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="JOURNAL"
        title={<>The <span className="shine-text">ELARA WAVE</span> journal</>}
        subtitle="Wellness, craft, and stories from the source."
      />

      {/* Featured post */}
      {featured && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <article className="group glass-card relative overflow-hidden p-8 sm:p-12">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue/15 blur-3xl -z-10" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl -z-10" />
              <div className="flex items-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-brand text-white font-bold tracking-wide">FEATURED</span>
                <span className="px-2.5 py-1 rounded-full bg-bg-light text-navy font-semibold">{featured.tag}</span>
                <span className="inline-flex items-center gap-1 text-text-muted"><Calendar className="h-3 w-3" />{featured.date}</span>
                <span className="inline-flex items-center gap-1 text-text-muted"><Clock className="h-3 w-3" />{featured.read}</span>
              </div>
              <h2 className="mt-5 text-2xl sm:text-4xl font-extrabold text-navy max-w-3xl leading-tight">
                {featured.t}
              </h2>
              <p className="mt-4 text-text-muted max-w-2xl">{featured.d}</p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy group-hover:text-blue transition"
              >
                Read the full story <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
            </article>
          </Reveal>
        </section>
      )}

      {/* Category filter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition ${
                active === c
                  ? "bg-brand text-white shine"
                  : "bg-white border border-navy/15 text-navy hover:bg-bg-light"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Post grid */}
      <Stagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <StaggerItem key={p.t}>
            <article className="group glass-card p-6 h-full hover:-translate-y-1.5 transition duration-300 flex flex-col">
              <div className="flex items-center gap-3 text-xs text-text-muted flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-bg-light text-navy font-semibold">{p.tag}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.read}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-navy leading-snug">{p.t}</h3>
              <p className="mt-2 text-sm text-text-muted flex-1">{p.d}</p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-navy group-hover:text-blue transition"
              >
                Read more <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      {rest.length === 0 && (
        <p className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 text-center text-text-muted">
          No articles in this category yet — check back soon.
        </p>
      )}

      {/* Newsletter CTA */}
      <Newsletter />
    </SiteLayout>
  );
}