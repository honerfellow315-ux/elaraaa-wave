import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Newsletter } from "@/components/sections/Newsletter";
import { Package, Gift, BadgePercent, Sparkles, Copy, Check } from "lucide-react";

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

const offers = [
  {
    i: Package,
    badge: "POPULAR",
    t: "Family Pack -15%",
    d: "5× 19L bottles delivered weekly. Perfect for households.",
    code: "FAMILY15",
  },
  {
    i: Gift,
    badge: "EXCLUSIVE",
    t: "Free Dispenser",
    d: "Sign a 6-month office plan and get a premium dispenser on us.",
    code: "OFFICE6M",
  },
  {
    i: BadgePercent,
    badge: "LIMITED OFFER",
    t: "First-Order 10%",
    d: "Welcome to ELARAWAVE — 10% off your very first order.",
    code: "WELCOME10",
  },
  {
    i: Sparkles,
    badge: "SPECIAL DEAL",
    t: "Event Bundle",
    d: "500× custom-labeled bottles for weddings & events. Talk to us.",
    code: "EVENT500",
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
        {/* soft light-blue decorative backdrop */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-72 w-[42rem] rounded-full bg-gradient-to-br from-blue-100/40 via-emerald-100/30 to-transparent blur-3xl" />

        <Stagger className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 sm:gap-7 sm:grid-cols-2 pb-4">
          {offers.map((offer) => (
            <StaggerItem key={offer.code}>
              <Reveal>
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
  badge,
  t,
  d,
  code,
}: {
  i: typeof Package;
  badge: string;
  t: string;
  d: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div className="group relative h-full flex flex-col rounded-3xl border border-black/5 bg-white p-8 sm:p-10 shadow-[0_2px_8px_rgba(16,24,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(16,24,40,0.14)] hover:border-brand/30">
      {/* subtle corner glow accent */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-200/25 to-emerald-200/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="relative grid place-items-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400 shadow-[0_8px_24px_-8px_rgba(16,163,127,0.5)] transition-transform duration-300 group-hover:scale-105">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent" />
        <Icon className="relative h-7 w-7 text-white" strokeWidth={1.75} />
      </div>

      {/* Badge */}
      <span className="mt-6 inline-flex w-fit items-center rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-[11px] font-bold tracking-widest text-brand">
        {badge}
      </span>

      {/* Title & description */}
      <h3 className="mt-3 text-xl sm:text-2xl font-bold text-navy">{t}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{d}</p>

      {/* Promo code */}
      <div className="mt-6">
        <div className="text-[11px] font-bold tracking-widest text-text-muted">PROMO CODE</div>
        <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-dashed border-navy/20 bg-bg-light px-4 py-3 transition-colors group-hover:border-brand/40">
          <span className="font-mono font-bold text-navy tracking-widest text-sm sm:text-base truncate">
            {code}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-navy transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Spacer pushes CTAs to bottom for equal-height cards */}
      <div className="flex-1" />

      {/* CTAs */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(16,163,127,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(16,163,127,0.6)]"
        >
          Claim Offer
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand/40 hover:text-brand"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}