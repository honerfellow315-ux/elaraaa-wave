import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Calendar } from "lucide-react";

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

const posts = [
  {
    t: "The truth about alkaline water",
    d: "Beyond the marketing, what pH 8.5+ really does inside the body — a science-first look at mineral balance, hydration efficiency, and who genuinely benefits from a higher-pH pour.",
    tag: "Wellness",
    date: "Jun 2026",
  },
  {
    t: "Inside the ELARA WAVE bottling line",
    d: "A step-by-step walkthrough of our seven-stage filtration, UV sterilisation and sealed-line bottling — the quiet craft behind every crisp, consistent bottle we deliver.",
    tag: "Craft",
    date: "May 2026",
  },
  {
    t: "Hydration for athletes and active lifestyles",
    d: "How mineral-rich, alkaline water supports recovery, endurance and electrolyte balance — with practical intake benchmarks for training days, match days and rest days.",
    tag: "Fitness",
    date: "May 2026",
  },
  {
    t: "Custom-labelled water for weddings and events",
    d: "From foil-embossed monograms to bespoke event colourways — how a thoughtfully branded bottle turns a small detail into a signature guest experience.",
    tag: "Branding",
    date: "Apr 2026",
  },
  {
    t: "Water, skin and everyday glow",
    d: "A dermatologist-informed guide to daily hydration habits, mineral intake and the small routines that quietly transform skin clarity over time.",
    tag: "Wellness",
    date: "Apr 2026",
  },
  {
    t: "Sizing a corporate water plan the right way",
    d: "A practical framework for offices, gyms and clinics — how to calculate weekly consumption, plan dispensers and choose between 5L and 19L to avoid waste.",
    tag: "Business",
    date: "Mar 2026",
  },
];


function Blog() {
  return (
    <SiteLayout>
      <PageHero eyebrow="JOURNAL" title={<>The <span className="shine-text">ELARA WAVE</span> journal</>} subtitle="Wellness, craft, and stories from the source." />
      <Stagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <StaggerItem key={p.t}>
            <Reveal>
              <article className="group glass-card p-6 h-full hover:-translate-y-1 transition">
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span className="px-2 py-0.5 rounded-full bg-bg-light text-navy font-semibold">{p.tag}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-navy">{p.t}</h3>
                <p className="mt-2 text-sm text-text-muted">{p.d}</p>

              </article>
            </Reveal>
          </StaggerItem>
        ))}
      </Stagger>
    </SiteLayout>
  );
}
