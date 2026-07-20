import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Newsletter } from "@/components/sections/Newsletter";
import { Droplets, Sparkles, Award, ImageIcon, Heart } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useWishlist } from "@/hooks/use-wishlist";
import { toast } from "sonner";

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

type Size = { label: string; img?: string; price?: number };
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
    text: "Sourced and multi-stage filtered to preserve calcium, magnesium and potassium — the essentials your body craves.",
    productLabel: "Mineral Water Bottle",
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
    productLabel: "Alkaline Water Bottle",
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
    productLabel: "Premium Water Bottle",
    sizes: [
      { label: "330 ML", img: "/images/premium-330ml.webp" },
      { label: "500 ML", img: "/images/premium-500ml.webp" },
      { label: "1 L", img: "/images/premium-1l.webp" },
    ],
  },
];

function SizeCard({ category, size }: { category: Category; size: Size }) {
  const wishlistId = `${category.id}-${size.label}`;
  const { isAuthenticated, isSaved, toggle } = useWishlist();
  const navigate = useNavigate();
  const saved = isAuthenticated && isSaved(wishlistId);

  const productName = `${size.label} ${category.productLabel}`;
  const priceLabel = size.price != null ? `Rs. ${size.price}` : "Rs. ____";

  function onWishlistClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info("Sign in to save items to your wishlist");
      void navigate({ to: "/login", search: { redirect: "/products" } as never });
      return;
    }
    toggle(wishlistId);
    toast.success(saved ? "Removed from wishlist" : "Added to wishlist");
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
        <button
          type="button"
          onClick={onWishlistClick}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full glass border border-white/70 shadow-sm hover:scale-110 transition"
        >
          <Heart className={`h-4 w-4 ${saved ? "text-red-500 fill-red-500" : "text-navy"}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[15px] sm:text-base font-bold text-navy leading-snug">{productName}</h3>

        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">Price</p>
          <p className="mt-1 text-xl font-extrabold text-navy">{priceLabel}</p>
        </div>

        <Link
          to="/contact"
          className="shine mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-bold tracking-wide text-white shadow-[0_10px_25px_-8px_rgba(18,58,94,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-10px_rgba(62,154,214,0.75)] sm:w-auto sm:self-start"
        >
          Order Now
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