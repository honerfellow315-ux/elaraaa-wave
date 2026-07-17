import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Tag, Percent, Gift, Sparkles } from "lucide-react";

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
  { i: Percent, t: "Family Pack -15%", d: "5× 19L bottles delivered weekly. Perfect for households.", code: "FAMILY15" },
  { i: Gift, t: "Free Dispenser", d: "Sign a 6-month office plan and get a premium dispenser on us.", code: "OFFICE6M" },
  { i: Tag, t: "First-Order 10%", d: "Welcome to ELARAWAVE — 10% off your very first order.", code: "WELCOME10" },
  { i: Sparkles, t: "Event Bundle", d: "500× custom-labeled bottles for weddings & events. Talk to us.", code: "EVENT500" },
];

function Offers() {
  return (
    <SiteLayout>
      <PageHero eyebrow="OFFERS" title={<>Fresh <span className="shine-text">deals</span></>} subtitle="Save more on the water you love." />
      <Stagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-2">
        {offers.map(({ i: I, t, d, code }) => (
          <StaggerItem key={code}>
            <Reveal>
              <div className="glass-card p-7 h-full hover:-translate-y-1 transition">
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine">
                    <I className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-navy">{t}</h3>
                    <p className="mt-1 text-sm text-text-muted">{d}</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-light">
                      <span className="text-xs text-text-muted">Code</span>
                      <span className="font-mono font-bold text-navy tracking-widest">{code}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </StaggerItem>
        ))}
      </Stagger>
    </SiteLayout>
  );
}
