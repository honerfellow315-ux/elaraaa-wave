import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Truck, Building2, PartyPopper, Store, Hotel, Dumbbell } from "lucide-react";

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

const services = [
  { i: Truck, t: "Home Delivery", d: "Fresh 19L & 5L bottles at your door — same-day across Lahore." },
  { i: Building2, t: "Office & Corporate", d: "Fixed monthly plans with dispenser support for teams of any size." },
  { i: PartyPopper, t: "Events & Weddings", d: "Custom-branded event water for weddings, launches and parties." },
  { i: Hotel, t: "Hotels & Restaurants", d: "Premium glass bottles for hospitality — with your label if you like." },
  { i: Store, t: "Retail Partners", d: "Stocking programme for high-street retailers and specialty grocers." },
  { i: Dumbbell, t: "Gyms & Studios", d: "Alkaline hydration for training floors, spas and wellness studios." },
];

function Services() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="SERVICES"
        title={<>Hydration, <span className="shine-text">delivered</span></>}
        subtitle="From family homes to five-star kitchens, we build a plan that fits."
      />
      <Stagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ i: I, t, d }) => (
          <StaggerItem key={t}>
            <Reveal>
              <div className="glass-card p-7 h-full hover:-translate-y-1 transition">
                <div className="grid place-items-center h-14 w-14 rounded-2xl bg-brand text-white shine">
                  <I className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{t}</h3>
                <p className="mt-2 text-sm text-text-muted">{d}</p>
              </div>
            </Reveal>
          </StaggerItem>
        ))}
      </Stagger>
    </SiteLayout>
  );
}
