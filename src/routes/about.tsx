import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  Droplets,
  ShieldCheck,
  Leaf,
  Users,
  FlaskConical,
  Award,
  Sparkles,
  Truck,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ELARA WAVE — Our Story of Pure Water" },
      {
        name: "description",
        content:
          "Learn about ELARA WAVE — premium alkaline & mineral water crafted with obsessive care in Lahore.",
      },
      { property: "og:title", content: "About ELARA WAVE" },
      {
        property: "og:description",
        content:
          "Our story, our standards, and the promise inside every bottle.",
      },
    ],
  }),
  component: About,
});

function About() {
  const stats = [
    { v: "10K+", l: "Bottles Delivered" },
    { v: "5,000+", l: "Loyal Customers" },
    { v: "99%", l: "Purity Standard" },
    { v: "24/7", l: "Support" },
  ];
  const values = [
    {
      i: Droplets,
      t: "Pure Craft",
      d: "Multi-stage filtration meets natural mineral enrichment for a taste that feels effortlessly clean.",
    },
    {
      i: ShieldCheck,
      t: "PFA Registered",
      d: "Fully regulated, independently tested, and community-approved — safety is non-negotiable.",
    },
    {
      i: Leaf,
      t: "Sustainable",
      d: "Recyclable packaging, thoughtful sourcing, and a lighter footprint on our shared planet.",
    },
    {
      i: Users,
      t: "Family First",
      d: "Built for households, offices and communities that don't compromise on quality.",
    },
  ];

  const journey = [
    {
      y: "2022",
      t: "The Spark",
      d: "A small team in Lahore, one shared frustration — clean, honest water shouldn't be a luxury.",
    },
    {
      y: "2023",
      t: "The Plant",
      d: "Our multi-stage plant comes online — 6-stage RO, UV, ozone, and mineral rebalancing.",
    },
    {
      y: "2024",
      t: "PFA Registered",
      d: "Full PFA registration, halal certification, and independent lab partnerships.",
    },
    {
      y: "2025",
      t: "The Wave",
      d: "10,000+ bottles delivered, custom-branding launched, and a growing family of loyal customers.",
    },
  ];

  const process = [
    { i: FlaskConical, t: "Source", d: "Deep-source water is drawn, tested, and quality-locked before entering our line." },
    { i: Sparkles, t: "Purify", d: "Our six-stage reverse-osmosis process removes unwanted impurities before the water is carefully mineral-balanced." },
    { i: Leaf, t: "Mineralize", d: "Essential minerals are re-balanced to a smooth, hydrating pH — never harsh, never flat." },
    { i: Award, t: "Bottle", d: "Sealed in food-grade bottles under sterile conditions, ready for the ELARA moment." },
    { i: Truck, t: "Deliver", d: "Same-day delivery across Lahore, straight to your home, office, or event." },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="OUR STORY"
        title={
          <>
            Water, <span className="shine-text">reimagined</span>
          </>
        }
        subtitle="ELARA WAVE was born in Lahore with a simple ambition — to make premium, mineral-rich water an everyday ritual for every home, office and celebration."
      />

      {/* Intro + stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal as="left">
          <div className="glass-card p-3 overflow-hidden">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="/images/about-plant.webp"
                alt="ELARA WAVE plant"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal as="right">
          <p className="text-xs font-bold tracking-[0.3em] text-blue">
            WHY ELARA WAVE
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-[1.1]">
            Crafted with <span className="shine-text">obsessive</span> care
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-muted leading-relaxed">
            Every bottle is a promise. From the moment water enters our plant
            to the second it lands at your door, we protect its mineral balance
            and remove unwanted impurities. It's water at its most honest — and its
            most premium.
          </p>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            We believe that hydration should never be an afterthought. Our
            team blends the discipline of science with the warmth of a
            family-run business, so each pour feels a little more elegant,
            a little more thoughtful, and unmistakably ELARA.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="glass-card p-5 text-center h-full">
                <div className="text-3xl sm:text-4xl font-extrabold shine-text">
                  {s.v}
                </div>
                <div className="mt-2 text-[11px] tracking-[0.2em] text-text-muted uppercase font-semibold">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Mission / Vision */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <Reveal>
            <div className="glass-card p-8 sm:p-10 h-full">
              <p className="text-xs font-bold tracking-[0.3em] text-green">
                OUR MISSION
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-navy leading-tight">
                Elevating everyday hydration
              </h3>
              <p className="mt-4 text-text-muted leading-relaxed">
                To deliver mineral-rich, clean-tasting water that transforms
                a simple daily habit into a small act of self-care — for
                families, teams and communities across Pakistan.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-card p-8 sm:p-10 h-full">
              <p className="text-xs font-bold tracking-[0.3em] text-blue">
                OUR VISION
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-navy leading-tight">
                A wave of pure living
              </h3>
              <p className="mt-4 text-text-muted leading-relaxed">
                To become the most trusted premium water brand in the region —
                known for uncompromising quality, elegant design, and a
                genuine commitment to a healthier, more sustainable future.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">
              OUR JOURNEY
            </p>
            <h3 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy">
              A story of <span className="shine-text">quiet progress</span>
            </h3>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {journey.map((j) => (
            <StaggerItem key={j.y}>
              <div className="relative glass-card p-6 h-full hover:-translate-y-1 transition duration-500">
                <div
                  className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white shadow-md"
                  style={{
                    background:
                      "linear-gradient(90deg,#69B64A,#259F9F,#0E74A7)",
                  }}
                >
                  {j.y}
                </div>
                <h4 className="mt-3 font-bold text-navy text-lg">{j.t}</h4>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {j.d}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 sm:pb-28">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">
              THE PROCESS
            </p>
            <h3 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy">
              Five steps to a <span className="shine-text">perfect pour</span>
            </h3>
            <p className="mt-4 text-text-muted">
              Precision engineering, hand-checked at every stage.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {process.map(({ i: I, t, d }, idx) => (
            <StaggerItem key={t}>
              <div className="glass-card p-6 h-full flex flex-col hover:-translate-y-1 transition duration-500">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center h-11 w-11 rounded-2xl bg-brand text-white shine">
                    <I className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest text-text-muted">
                    STEP {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="mt-4 font-bold text-navy">{t}</h4>
                <p className="mt-1.5 text-sm text-text-muted leading-relaxed flex-1">
                  {d}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-28">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">
              WHAT WE STAND FOR
            </p>
            <h3 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy">
              Our values
            </h3>
          </div>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {values.map(({ i: I, t, d }) => (
            <StaggerItem key={t}>
              <div className="glass-card p-6 h-full flex flex-col hover:-translate-y-1 transition duration-500">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine">
                  <I className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-bold text-navy">{t}</h4>
                <p className="mt-1.5 text-sm text-text-muted leading-relaxed flex-1">
                  {d}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </SiteLayout>
  );
}
