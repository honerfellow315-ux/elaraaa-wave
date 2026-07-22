import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { MapPin, CheckCircle2, Sparkles, Droplets, Truck, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/coverage-areas")({
  head: () => ({
    meta: [
      { title: "Coverage Areas — ELARA WAVE Premium Delivery Zones" },
      { name: "description", content: "ELARA WAVE — Premium mineral water supply & customized bottles, delivered across Lahore." },
      { property: "og:title", content: "ELARA WAVE Coverage Areas" },
      { property: "og:description", content: "Premium same-day mineral water & customized bottle delivery across Lahore." },
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

const refillHighlights = [
  { icon: Droplets, label: "19 Litre Bottles", desc: "Pure, mineral-rich refills" },
  { icon: Truck, label: "Same-Day Delivery", desc: "Fast, reliable dispatch" },
  { icon: ShieldCheck, label: "Sealed & Sanitized", desc: "Quality you can trust" },
];

function Coverage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="COVERAGE"
        title={<>Premium delivery across <span className="shine-text">Lahore</span></>}
        subtitle="Premium mineral water supply and customized bottles — delivered same-day across Lahore's finest neighbourhoods."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal>
          {/* Main Single Block Container — logo gradient theme (lime green -> teal -> blue) */}
          <div className="bg-gradient-to-br from-[#9AD24A] via-[#12A98F] to-[#1568B5] p-6 sm:p-10 border border-white/20 shadow-xl rounded-3xl">
            <div className="flex items-center justify-between gap-3 pb-6 mb-6 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">Active Delivery Sectors</h3>
                  <p className="text-xs text-white/80">Premium mineral water supply & customized bottles across Lahore, with daily orders and corporate plans.</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/30 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shrink-0 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                VIP Zones
              </span>
            </div>

            {/* Full Lahore coverage map */}
            <div className="rounded-2xl overflow-hidden aspect-video border border-white/25 shadow-md">
              <iframe
                title="ELARA WAVE Lahore coverage map"
                src="https://maps.google.com/maps?q=Lahore,%20Pakistan&t=&z=11&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Structured Area List — glass boxes over gradient */}
            <Stagger className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activeDeliveryAreas.map((area) => (
                <StaggerItem key={area}>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/15 border border-white/25 backdrop-blur-sm hover:bg-white/25 transition">
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                    <span className="text-sm font-semibold text-white">{area}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Premium 19L Refill Section */}
            <div className="mt-10 pt-8 border-t border-white/20">
              <div className="rounded-2xl bg-white/10 border border-white/25 backdrop-blur-sm p-6 sm:p-8 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      <Sparkles className="h-3.5 w-3.5" />
                      Premium Refill
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">19 Litre Bottle Refill — VIP Service</h4>
                </div>
                <p className="text-sm text-white/85 mb-6 max-w-2xl">
                  Our signature 19 L refill service brings premium, mineral-rich water straight to your door — same-day, in the areas below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {refillHighlights.map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-start gap-3 rounded-xl bg-white/15 border border-white/20 p-4">
                      <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{label}</p>
                        <p className="text-xs text-white/75 mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SiteLayout>
  );
}