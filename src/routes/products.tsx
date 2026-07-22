import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Newsletter } from "@/components/sections/Newsletter";
import { Droplets, Sparkles, Award, ImageIcon, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — ELARA WAVE Premium Water Range" },
      { name: "description", content: "Explore ELARA WAVE mineral, alkaline and premium bottled water — from 250 ml to 19 L." },
      { property: "og:title", content: "ELARA WAVE Products" },
      { property: "og:description", content: "Mineral, Alkaline and Premium water — crafted to premium quality." },
    ],
  }),
  component: ProductsPage,
});

type Size = { label: string; img?: string; price?: number; refill?: boolean };
type Category = {
  id: string;
  icon: typeof Droplets;
  tag: string;
  title: string;
  text: string;
  /** Used to build each card's product name, e.g. "250 ML Mineral Water Bottle" */
  productLabel: string;
  sizes: Size[];
};

const categories: Category[] = [
  {
    id: "mineral",
    icon: Droplets,
    tag: "MINERAL WATER",
    title: "Naturally Balanced Mineral Water",
    text: "Purified through multi-stage filtration and carefully balanced with essential minerals for a clean, refreshing taste.",
    productLabel: "Mineral Water Bottle",
    sizes: [
      { label: "250 ml", img: "/images/mineral-250ml.webp", price: 35 },
      { label: "330 ml", img: "/images/mineral-330ml.webp", price: 40 },
      { label: "500 ml", img: "/images/mineral-500ml.webp", price: 50 },
      { label: "1.5 L", img: "/images/mineral-1.5l.webp", price: 90 },
      { label: "5 L", img: "/images/mineral-5l.webp", price: 250 },
      { label: "19 L", img: "/images/mineral-19l.webp", price: 250, refill: true },
    ],
  },
  {
    id: "alkaline",
    icon: Award,
    tag: "ALKALINE WATER",
    title: "pH 8.5+ Alkaline Wellness",
    text: "Balanced alkaline profile designed to complement an active, wellness-forward lifestyle.",
    productLabel: "Alkaline Water Bottle",
    sizes: [
      { label: "250 ml", img: "/images/alkaline-250ml.webp", price: 45},
      { label: "330 ml", img: "/images/alkaline-330ml.webp", price: 48 },
      { label: "500 ml", img: "/images/alkaline-500ml.webp", price: 60 },
      { label: "1.5 L", img: "/images/alkaline-1.5l.webp", price: 110 },
      { label: "19 L", img: "/images/alkaline-19l.webp", price: 350 },
    ],
  },
  {
    id: "premium",
    icon: Sparkles,
    tag: "PREMIUM WATER",
    title: "Signature Premium Pour",
    text: "Ultra-refined, crisp and smooth — our flagship pour for restaurants, hotels and connoisseurs.",
    productLabel: "Premium Water Bottle",
    sizes: [
      { label: "330 ml", img: "/images/premium-330ml.webp", price: 55 },
      { label: "500 ml", img: "/images/premium-500ml.webp", price: 80 },
      { label: "1 L", img: "/images/premium-1l.webp", price: 120 },
    ],
  },
];

function SizeCard({ category, size }: { category: Category; size: Size }) {
  const itemId = `${category.id}-${size.label}`;
  const { addItem } = useCart();

  const productName = `${size.label} ${category.productLabel}`;
  const priceLabel = size.price != null ? `Rs. ${size.price}` : "Rs. ___";

  function onAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (size.price == null) {
      toast.error("Price not available for this item yet");
      return;
    }
    addItem({ id: itemId, name: productName, price: size.price, img: size.img });
    toast.success("Added to cart");
  }

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-12px_rgba(6,65,94,0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-15px_rgba(6,65,94,0.28)] h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        {size.img ? (
          <img
            src={size.img}
            alt={productName}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-bg-tint to-white text-text-muted">
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white bg-white/80 shadow-sm">
              <ImageIcon className="h-6 w-6 text-blue" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest">Image coming soon</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[15px] sm:text-base font-bold text-navy leading-snug">{productName}</h3>

        {/* Glass price badge — sits right above the action buttons */}
        <div className="mt-4 mb-5 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-blue/20 bg-blue/10 backdrop-blur-md px-4 py-1.5 text-base font-extrabold text-blue">
            {priceLabel}
          </span>
          {size.refill && (
            <span className="inline-flex items-center rounded-full bg-black/85 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white">
              Refill
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="shine inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold tracking-wide text-white shadow-[0_10px_25px_-8px_rgba(18,58,94,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-10px_rgba(62,154,214,0.75)]"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-navy/15 px-5 py-2.5 text-sm font-bold tracking-wide text-navy hover:bg-bg-tint transition"
          >
            Order Now
          </Link>
        </div>
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
            <Stagger className="grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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