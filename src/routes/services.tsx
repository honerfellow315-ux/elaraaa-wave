import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Newsletter } from "@/components/sections/Newsletter";
import {
  Truck,
  House,
  Building2,
  PartyPopper,
  UtensilsCrossed,
  Store,
  Dumbbell,
  Check,
  ArrowRight,
  Users,
  Clock,
  Droplets,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — ELARAWAVE Delivery & Corporate Plans" },
      { name: "description", content: "Home & office water delivery, corporate plans, event supply and hospitality partnerships." },
      { property: "og:title", content: "ELARAWAVE Services" },
      { property: "og:description", content: "Delivery, subscription, corporate and hospitality water services." },
    ],
  }),
  component: Services,
});

const stats = [
  { icon: Users, value: "5000+", label: "Happy Customers" },
  { icon: Clock, value: "24/7", label: "Support" },
  { icon: Truck, value: "Same Day", label: "Delivery" },
  { icon: Droplets, value: "100%", label: "Purified Water" },
];

const services = [
  {
    icon: House,
    img: "/images/home-delivery.webp",
    t: "Home Delivery",
    d: "Fresh 19L & 5L bottles at your door — same-day across Lahore.",
    highlights: ["Same Day-Delivery", "Scheduled Supply", "Flexible Bottle Sizes"],
  },
  {
    icon: Building2,
    img: "/images/office-corporate.webp",
    t: "Office & Corporate",
    d: "Fixed monthly plans with dispenser support for teams of any size.",
    highlights: ["Monthly Billing", "Free Dispenser Service", "Priority Support"],
  },
  {
    icon: PartyPopper,
    img: "/images/events-weddings.webp",
    t: "Events & Weddings",
    d: "Custom-branded event water for weddings, launches and parties.",
    highlights: ["Custom Branding", "On-Site Delivery", "Bulk Order Pricing"],
  },
  {
    icon: UtensilsCrossed,
    img: "/images/hotels-restaurants.webp",
    t: "Hotels & Restaurants",
    d: "Premium glass bottles for hospitality — with your label if you like.",
    highlights: ["Premium Glass Bottles", "Private Labeling", "Consistent Restocking"],
  },
  {
    icon: Store,
    img: "/images/retail-partners.webp",
    t: "Retail Partners",
    d: "Stocking programme for high-street retailers and specialty grocers.",
    highlights: ["Wholesale Pricing", "Reliable Restocking", "Merchandising Support"],
  },
  {
    icon: Dumbbell,
    img: "/images/gyms-studios.webp",
    t: "Gyms & Studios",
    d: "Alkaline hydration for training floors, spas and wellness studios.",
    highlights: ["Alkaline Formula", "Bulk Dispensers", "Weekly Refills"],
  },
];

function Services() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="SERVICES"
        title={<>Hydration, <span className="shine-text">delivered</span></>}
        subtitle="From family homes to five-star kitchens, we build a plan that fits."
      />

      {/* Stats strip */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-2 mb-16 sm:mb-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full bg-gradient-to-br from-brand/10 via-sky-200/20 to-transparent blur-3xl" />
        <Stagger className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <StaggerItem key={label}>
              <Reveal>
                <div className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur-sm px-5 py-6 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:shadow-md hover:-translate-y-0.5">
                  <Icon className="mx-auto h-5 w-5 text-brand mb-2" strokeWidth={1.75} />
                  <div className="text-xl sm:text-2xl font-bold text-navy tracking-tight">{value}</div>
                  <div className="mt-1 text-xs sm:text-sm text-text-muted">{label}</div>
                </div>
              </Reveal>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Service cards */}
      <Stagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-3 pb-4">
        {services.map(({ icon: Icon, img, t, d, highlights }) => (
          <StaggerItem key={t}>
            <Reveal>
              <div className="group relative h-full rounded-2xl border border-black/5 bg-white shadow-[0_1px_3px_rgba(16,24,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(16,24,40,0.12)] hover:border-brand/25 overflow-hidden">
                {/* 4:3 Landscape image container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={img}
                    alt={t}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                </div>

                <div className="p-8">
                  {/* Icon — themed like the ELARA logo (lime → emerald → blue) */}
                  <div className="relative -mt-14 grid place-items-center h-16 w-16 rounded-full bg-gradient-to-br from-lime-400 via-emerald-500 to-blue-500 shadow-[0_8px_20px_-6px_rgba(16,163,127,0.45)] ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent" />
                    <Icon className="relative h-7 w-7 text-white" strokeWidth={1.75} />
                  </div>

                  {/* Title & description */}
                  <h3 className="mt-6 text-lg font-bold text-navy">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{d}</p>

                  {/* Highlights */}
                  <ul className="mt-5 space-y-2.5">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-sm text-navy/80">
                        <span className="grid place-items-center h-4 w-4 rounded-full bg-brand/10 shrink-0">
                          <Check className="h-2.5 w-2.5 text-brand" strokeWidth={3} />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Learn more -> Contact page */}
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-navy"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 mb-20 sm:mb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-navy to-navy/90 px-6 py-14 sm:px-14 sm:py-16 text-center">
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

            <div className="relative">
              <ShieldCheck className="mx-auto h-8 w-8 text-brand mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Need a Custom Water Supply Solution?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-white/70 max-w-xl mx-auto">
                For homes, corporate offices, hotels, restaurants and events — we'll tailor a plan around you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-white/60">
                {["Homes", "Corporate Offices", "Hotels", "Restaurants", "Events"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(16,163,127,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-8px_rgba(16,163,127,0.7)]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Newsletter */}
      <Newsletter />
    </SiteLayout>
  );
}