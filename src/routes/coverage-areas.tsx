import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { MapPin, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/coverage-areas")({
  head: () => ({
    meta: [
      { title: "Coverage Areas — ELARA WAVE Delivery Zones" },
      { name: "description", content: "See ELARA WAVE water delivery coverage across Lahore." },
      { property: "og:title", content: "ELARA WAVE Coverage Areas" },
      { property: "og:description", content: "Same-Day water delivery across Lahore neighbourhoods." },
    ],
  }),
  component: Coverage,
});

// Update to exact delivery areas
const activeDeliveryAreas = [
  "DHA Phase 9 Town",
  "DHA Phase 8",
  "DHA Phase 7",
  "DHA Phase 6",
  "DHA Phase 5",
  "DHA Phase 2",
  "DHA Phase 1",
  "Askari 10",
  "Gulberg",
  "Paragon City",
];

function Coverage() {
  return (
    <SiteLayout>
      <PageHero 
        eyebrow="COVERAGE" 
        title={<>We deliver across <span className="shine-text">Lahore</span></>} 
        subtitle="Active same-day delivery zones for our premium mineral water." 
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal>
          {/* Main Single Block Container */}
          <div className="glass-card p-6 sm:p-10 border border-white/80 shadow-lg rounded-3xl">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-navy/10">
              <div className="h-10 w-10 rounded-2xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">Active Delivery Sectors</h3>
                <p className="text-xs text-text-muted">Serving daily orders & corporate plans in these primary locations</p>
              </div>
            </div>

            {/* Structured Area List inside the block */}
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activeDeliveryAreas.map((area) => (
                <StaggerItem key={area}>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 border border-white/80 hover:bg-white hover:shadow-sm transition">
                    <CheckCircle2 className="h-4 w-4 text-blue shrink-0" />
                    <span className="text-sm font-semibold text-navy">{area}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </SiteLayout>
  );
}