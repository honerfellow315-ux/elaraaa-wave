import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — ELARA WAVE" }, { name: "description", content: "ELARA WAVE terms of service." }] }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <PageHero eyebrow="LEGAL" title={<>Terms of <span className="shine-text">Service</span></>} />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-text-muted space-y-4">
        <p>By ordering from ELARA WAVE you agree to these terms. Water is delivered fresh; empties are collected on the next visit. Prices, coverage, and offers may change without prior notice.</p>
        <h2 className="text-navy font-bold text-xl mt-8">Orders & payments</h2>
        <p>Orders are confirmed via WhatsApp or phone. Payment on delivery unless otherwise agreed.</p>
        <h2 className="text-navy font-bold text-xl mt-8">Cancellations</h2>
        <p>Cancel free of charge up to 2 hours before your delivery slot.</p>
      </article>
    </SiteLayout>
  );
}
