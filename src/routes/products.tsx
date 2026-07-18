import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Newsletter } from "@/components/sections/Newsletter";
import { Droplets, Sparkles, Award, ImageIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — ELARAWAVE Premium Water Range" },
      { name: "description", content: "Explore ELARAWAVE mineral, alkaline and premium bottled water — from 250ml to 19L." },
      { property: "og:title", content: "ELARAWAVE Products" },
      { property: "og:description", content: "Mineral, Alkaline and Premium water — crafted to premium quality." },
    ],
  }),
  component: ProductsPage,
});

type Size = { label: string; img?: string };
type Category = {
  id: string;
  icon: typeof Droplets;
  tag: string;
  title: string;
  text: string;
  sizes: Size[];
};

const categories: Category[] = [
  {
    id: "mineral",
    icon: Droplets,
    tag: "MINERAL WATER",
    title: "Naturally Balanced Mineral Water",
    text: "Sourced and multi-stage filtered to preserve calcium, magnesium and potassium — the essentials your body craves.",
    sizes: [
      { label: "250 ML", img: "/images/mineral-250ml.webp" },
      { label: "330 ML", img: "/images/mineral-330ml.webp" },
      { label: "500 ML", img: "/images/mineral-500ml.webp" },
      { label: "1.5 L", img: "/images/mineral-1.5l.webp" },
      { label: "5 L", img: "/images/mineral-5l.webp" },
      { label: "19 L", img: "/images/mineral-19l.webp" },
    ],
  },
  {
    id: "alkaline",
    icon: Award,
    tag: "ALKALINE WATER",
    title: "pH 8.5+ Alkaline Wellness",
    text: "Balanced alkaline profile designed to complement an active, wellness-forward lifestyle.",
    sizes: [
      { label: "250 ML", img: "/images/alkaline-250ml.webp" },
      { label: "330 ML", img: "/images/alkaline-330ml.webp" },
      { label: "500 ML", img: "/images/alkaline-500ml.webp" },
      { label: "1.5 L", img: "/images/alkaline-1.5l.webp" },
      { label: "19 L", img: "/images/alkaline-19l.webp" },
    ],
  },
  {
    id: "premium",
    icon: Sparkles,
    tag: "PREMIUM WATER",
    title: "Signature Premium Pour",
    text: "Ultra-refined, crisp and smooth — our flagship pour for restaurants, hotels and connoisseurs.",
    sizes: [
      { label: "330 ML", img: "/images/premium-330ml.webp" },
      { label: "500 ML", img: "/images/premium-500ml.webp" },
      { label: "1 L", img: "/images/premium-1l.webp" },
    ],
  },
];

function SizeCard({ category, size }: { category: Category; size: Size }) {
  return (
    <article className="group glass-card overflow-hidden hover:-translate-y-2 transition duration-500 h-full">
      <div className="relative aspect-[3/2] bg-gradient-to-b from-bg-tint to-white flex items-center justify-center overflow-hidden">
        {size.img ? (
          <img src={size.img} alt={`${category.title} ${size.label}`} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-text-muted">
            <div className="grid place-items-center h-16 w-16 rounded-2xl bg-white/70 border border-white shadow-sm">
              <ImageIcon className="h-6 w-6 text-blue" />
            </div>
            <span className="text-[11px] font-semibold tracking-widest uppercase">Image coming soon</span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass text-[10px] font-bold tracking-widest text-navy">
          {category.tag}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-navy">{size.label}</h3>
          <category.icon className="h-4 w-4 text-blue" />
        </div>
        <p className="mt-1.5 text-xs text-text-muted line-clamp-2">{category.title}</p>
        <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:gap-3 transition-all">
          Order
        </Link>
      </div>
    </article>
  );
}

function ProductsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="THE COMPLETE RANGE"
        title={<>Every pour, <span className="shine-text">perfected</span></>}
        subtitle="Three signature ranges — one uncompromising standard of purity."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24 pb-16">
        {categories.map((cat) => (
          <section id={cat.id} key={cat.id} className="scroll-mt-24">
            <Reveal>
              <div className="flex items-start gap-4 mb-8">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine shrink-0">
                  <cat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.3em] text-blue">{cat.tag}</p>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy">{cat.title}</h2>
                  <p className="mt-2 text-text-muted max-w-2xl">{cat.text}</p>
                </div>
              </div>
            </Reveal>
            <Stagger className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
              {cat.sizes.map((s) => (
                <StaggerItem key={s.label}>
                  <SizeCard category={cat} size={s} />
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ))}
      </div>
      <Newsletter />
    </SiteLayout>
  );
}