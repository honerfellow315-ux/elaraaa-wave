import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Droplets, ShieldCheck, Leaf, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ELARAWAVE — Our Story of Pure Water" },
      { name: "description", content: "Learn about ELARAWAVE — premium alkaline & mineral water crafted with care in Lahore." },
      { property: "og:title", content: "About ELARAWAVE" },
      { property: "og:description", content: "Our story, our standards, our promise." },
    ],
  }),
  component: About,
});

function About() {
  const stats = [
    { v: "10K+", l: "Bottles Delivered" },
    { v: "500+", l: "Loyal Customers" },
    { v: "99%", l: "Purity Standard" },
    { v: "24/7", l: "Support" },
  ];
  const values = [
    { i: Droplets, t: "Pure Craft", d: "Multi-stage filtration meets natural mineral enrichment." },
    { i: ShieldCheck, t: "PFA Certified", d: "Regulated, tested, and community-approved." },
    { i: Leaf, t: "Sustainable", d: "Recyclable packaging and thoughtful sourcing." },
    { i: Users, t: "Family First", d: "Built for households, offices and communities." },
  ];
  return (
    <SiteLayout>
      <PageHero
        eyebrow="OUR STORY"
        title={<>Water, <span className="shine-text">reimagined</span></>}
        subtitle="ELARAWAVE was born in Lahore with a simple ambition: to make premium, mineral-rich water an everyday ritual."
      />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal as="left">
          <div className="glass-card p-3 overflow-hidden">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="/images/about-plant.webp" alt="ELARAWAVE plant" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </Reveal>
        <Reveal as="right">
          <p className="text-xs font-bold tracking-[0.3em] text-blue">WHY ELARAWAVE</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy">Crafted with obsessive care</h2>
          <p className="mt-4 text-text-muted">
            Every bottle is a promise. From source to sip, our multi-stage process protects mineral balance while removing every impurity. It's water at its most honest — and its most premium.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="glass-card p-5 text-center">
                <div className="text-3xl font-extrabold shine-text">{s.v}</div>
                <div className="mt-1 text-xs tracking-widest text-text-muted uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <Reveal>
          <h3 className="text-3xl font-extrabold text-navy text-center">Our values</h3>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ i: I, t, d }) => (
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
      </section>
    </SiteLayout>
  );
}
