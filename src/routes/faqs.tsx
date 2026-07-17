import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — ELARAWAVE Questions Answered" },
      { name: "description", content: "Common questions about ELARAWAVE water, delivery, and subscriptions." },
      { property: "og:title", content: "ELARAWAVE FAQs" },
      { property: "og:description", content: "Answers about water, delivery, and services." },
    ],
  }),
  component: FAQs,
});

const faqs = [
  { q: "Is ELARAWAVE water PFA certified?", a: "Yes — every batch is registered and tested to Punjab Food Authority standards." },
  { q: "How fast is delivery?", a: "Same-day dispatch for orders placed before 4 PM across our Lahore coverage areas." },
  { q: "What is the difference between mineral and alkaline?", a: "Mineral water focuses on natural mineral balance; alkaline water is tuned to pH 8.5+ for a smoother, wellness-forward pour." },
  { q: "Can I subscribe to a weekly plan?", a: "Absolutely. Choose a household or office plan and we handle the rest." },
  { q: "Do you offer custom branding?", a: "Yes — we produce private-label bottles for events, hotels, gyms, and corporate gifting." },
  { q: "Which bottle sizes are available?", a: "330 ml, 500 ml, 1.5 L glass and PET, 5 L family, and 19 L bulk (mineral and alkaline)." },
];

function FAQs() {
  const [open, setOpen] = useState(0);
  return (
    <SiteLayout>
      <PageHero eyebrow="FAQS" title={<>Questions, <span className="shine-text">answered</span></>} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q}>
            <div className="glass-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-navy">{f.q}</span>
                <ChevronDown className={`h-4 w-4 text-blue shrink-0 transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-text-muted">{f.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SiteLayout>
  );
}
