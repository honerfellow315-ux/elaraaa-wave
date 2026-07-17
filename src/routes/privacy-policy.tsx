import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — ELARAWAVE" }, { name: "description", content: "How ELARAWAVE handles your data." }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteLayout>
      <PageHero eyebrow="LEGAL" title={<>Privacy <span className="shine-text">Policy</span></>} />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-slate text-text-muted space-y-4">
        <p>We respect your privacy. This policy describes what we collect, why, and how we protect it. ELARAWAVE only stores information required to fulfil your orders and improve your experience.</p>
        <h2 className="text-navy font-bold text-xl mt-8">Information we collect</h2>
        <p>Contact details, delivery address, and order history.</p>
        <h2 className="text-navy font-bold text-xl mt-8">How we use it</h2>
        <p>Order fulfilment, customer support, service updates, and — with your consent — offers.</p>
        <h2 className="text-navy font-bold text-xl mt-8">Your rights</h2>
        <p>You can request access, correction, or deletion of your data at any time by emailing hello@elarawave.com.</p>
      </article>
    </SiteLayout>
  );
}
