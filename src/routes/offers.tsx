import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Newsletter } from "@/components/sections/Newsletter";
import { Droplets, Building2, PackageCheck, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers — ELARAWAVE Deals & Bundles" },
      { name: "description", content: "Discover current ELARAWAVE offers on premium water bundles and subscriptions." },
      { property: "og:title", content: "ELARAWAVE Offers" },
      { property: "og:description", content: "Curated deals on premium water and subscription plans." },
    ],
  }),
  component: Offers,
});

const WHATSAPP_LINK =
  "https://api.whatsapp.com/send/?phone=923096416732&text&type=phone_number&app_absent=0";

// using a variable-as-component avoids the raw anchor tag getting stripped by some editors/pasters
const AnchorTag = "a";

const offers = [
  {
    i: Droplets,
    img: "/images/offer-1.png",
    label: "Offer 1",
    t: (
      <>
        Buy 4 PET Bottles,
        <br />
        Get 1 FREE!
      </>
    ),
    tag: "6-Pack & 12-Pack",
    d: "Stock up on your favorite Elara Wave water bottles in bulk and get one bottle free. Available on both 6-bottle and 12-bottle packs.",
    cta: "Order Now",
  },
  {
    i: Building2,
    img: "/images/offer-2.png",
    label: "Offer 2",
    t: (
      <>
        Buy 3 (19L) Bottles,
        <br />
        Get a Dispenser Free!
      </>
    ),
    tag: "Home & Office",
    d: "Purchase 3 large 19-liter Elara Wave bottles and receive a premium tabletop dispenser for free. Perfect for your home, office, or workspace.",
    cta: "Claim Offer",
    featured: true,
  },
  {
    i: PackageCheck,
    img: "/images/offer-3.png",
    label: "Offer 3",
    t: (
      <>
        Order 100 Custom Bottles,
        <br />
        Get 10 FREE!
      </>
    ),
    tag: "10 Bottles Free",
    d: "Order 100 personalized Elara Wave bottles with your own branding and get 10 extra bottles free. Ideal for events, weddings, and businesses.",
    cta: "Customize Now",
    href: "/custom-branding",
  },
];

function Offers() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="OFFERS"
        title={<>Fresh <span className="shine-text">deals</span></>}
        subtitle="Save more on the water you love."
      />

      <div className="relative">
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-72 w-[42rem] rounded-full bg-gradient-to-br from-blue-100/40 via-emerald-100/30 to-transparent blur-3xl" />

        <Stagger className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-4 items-stretch">
          {offers.map((offer) => (
            <StaggerItem key={offer.label}>
              <Reveal className="h-full">
                <OfferCard {...offer} />
              </Reveal>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Newsletter />
    </SiteLayout>
  );
}

function OfferCard({
  i: Icon,
  img,
  label,
  t,
  tag,
  d,
  cta,
  featured,
  href,
}: {
  i: typeof Droplets;
  img: string;
  label: string;
  t: React.ReactNode;
  tag: string;
  d: string;
  cta: string;
  featured?: boolean;
  href?: string;
}) {
  const ctaClassName = `mt-7 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_8px_20px_-8px_rgba(16,163,127,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(16,163,127,0.6)] ${
    featured ? "bg-white text-navy hover:bg-white/90" : "bg-brand text-white"
  }`;

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "border-2 border-brand/40 bg-navy text-white shadow-[0_24px_56px_-16px_rgba(16,163,127,0.35)]"
          : "border border-black/5 bg-white text-navy shadow-[0_2px_8px_rgba(16,24,40,0.06)] hover:shadow-[0_24px_48px_-16px_rgba(16,24,40,0.14)] hover:border-brand/30"
      }`}
    >
      {featured && (
        <span className="absolute top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-emerald-400 px-4 py-1 text-[11px] font-bold tracking-widest text-white shadow-[0_8px_20px_-6px_rgba(16,163,127,0.6)]">
          MOST POPULAR
        </span>
      )}

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-light">
        <img
          src={img}
          alt={typeof t === "string" ? t : label}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
      </div>

      <div className="relative flex flex-1 flex-col p-8 sm:p-9">
        <div
          className={`pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
            featured ? "bg-emerald-400/20" : "bg-gradient-to-br from-blue-200/25 to-emerald-200/20"
          }`}
        />

        <div
          className={`relative -mt-14 grid h-16 w-16 place-items-center rounded-full shadow-[0_8px_24px_-8px_rgba(16,163,127,0.5)] transition-transform duration-300 group-hover:scale-105 ${
            featured ? "bg-white/10 border border-white/20 backdrop-blur" : "bg-gradient-to-br from-blue-500 to-emerald-400"
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent" />
          <Icon className={`relative h-7 w-7 ${featured ? "text-emerald-300" : "text-white"}`} strokeWidth={1.75} />
        </div>

        <span
          className={`mt-6 inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-bold tracking-widest ${
            featured ? "border border-white/20 bg-white/10 text-emerald-300" : "border border-brand/20 bg-brand/5 text-brand"
          }`}
        >
          {label}
        </span>

        <h3 className={`mt-4 text-xl sm:text-2xl font-bold leading-snug ${featured ? "text-white" : "text-navy"}`}>
          {t}
        </h3>

        <span
          className={`mt-3 inline-flex w-fit items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${
            featured ? "border-white/15 text-white/80" : "border-navy/15 text-navy/70"
          }`}
        >
          {tag}
        </span>

        <p className={`mt-4 text-sm leading-relaxed ${featured ? "text-white/70" : "text-text-muted"}`}>{d}</p>

        <div className="flex-1" />

        {href ? (
          <Link to={href} className={ctaClassName}>
            {cta}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : (
          <AnchorTag href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={ctaClassName}>
            {cta}
            <ArrowUpRight className="h-4 w-4" />
          </AnchorTag>
        )}
      </div>
    </div>
  );
}