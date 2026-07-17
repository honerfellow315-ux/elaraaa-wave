import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/coverage-areas")({
  head: () => ({
    meta: [
      { title: "Coverage Areas — ELARAWAVE Delivery Zones" },
      { name: "description", content: "See ELARAWAVE water delivery coverage across Lahore." },
      { property: "og:title", content: "ELARAWAVE Coverage Areas" },
      { property: "og:description", content: "Same-day water delivery across Lahore neighbourhoods." },
    ],
  }),
  component: Coverage,
});

const areas = [
  "DHA Phase 1","DHA Phase 2","DHA Phase 3","DHA Phase 4","DHA Phase 5","DHA Phase 6","DHA Phase 7","DHA Phase 8",
  "Bahria Town","Model Town","Gulberg","Cantt","Johar Town","Wapda Town","Askari","Faisal Town",
  "Garden Town","Iqbal Town","Township","Valencia","EME Society","Lake City",
];

function Coverage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="COVERAGE" title={<>We deliver across <span className="shine-text">Lahore</span></>} subtitle="Same-day dispatch to these neighbourhoods, and growing." />
      <Stagger className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {areas.map((a) => (
          <StaggerItem key={a}>
            <Reveal>
              <div className="glass-card p-4 flex items-center gap-3 hover:-translate-y-0.5 transition">
                <MapPin className="h-4 w-4 text-blue shrink-0" />
                <span className="text-sm font-semibold text-navy truncate">{a}</span>
              </div>
            </Reveal>
          </StaggerItem>
        ))}
      </Stagger>
    </SiteLayout>
  );
}
