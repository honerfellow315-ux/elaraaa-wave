import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { useMemo, useState } from "react";
import { ChevronDown, Search, MessageCircle, ArrowUpRight, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — ELARA WAVE Questions Answered" },
      { name: "description", content: "Common questions about ELARA WAVE water, delivery, and subscriptions." },
      { property: "og:title", content: "ELARA WAVE FAQs" },
      { property: "og:description", content: "Answers about water, delivery, and services." },
    ],
  }),
  component: FAQs,
});

const categories = ["All", "Quality", "Delivery", "Plans", "Branding", "Bottles"];

const faqs = [
  {
    q: "Is ELARA WAVE water PFA registered?",
    a: "Yes — every batch is registered and tested to Punjab Food Authority standards, with lab reports available on request for corporate and bulk clients.",
    cat: "Quality",
  },
  {
    q: "How fast is delivery?",
    a: "Same-day dispatch for orders placed before 4 PM across our Lahore coverage areas. Orders placed after 4 PM are delivered the next morning.",
    cat: "Delivery",
  },
  {
    q: "What is the difference between mineral and alkaline?",
    a: "Mineral water focuses on natural mineral balance drawn straight from the source; alkaline water is tuned to pH 8.5+ for a smoother, wellness-forward pour.",
    cat: "Quality",
  },
  {
    q: "Can I subscribe to a weekly plan?",
    a: "Absolutely. Choose a household or office plan, set your preferred delivery days, and we handle refills, empties pickup and billing automatically.",
    cat: "Plans",
  },
  {
    q: "Do you offer custom branding?",
    a: "Yes — we produce private-label bottles for events, hotels, gyms, and corporate gifting, with full design support and low minimum order quantities.",
    cat: "Branding",
  },
  {
    q: "Which bottle sizes are available?",
    a: "Available sizes include 250 ml, 330 ml, 500 ml, 1 L, 1.5 L, 5 L and 19 L, depending on the selected water range.",
    cat: "Bottles",
  },
  {
    q: "Do you offer glass bottle options?",
    a: "Yes, our 500 ml and 1.5 L glass bottles are popular for hotels, weddings and premium gifting where presentation matters as much as the water.",
    cat: "Bottles",
  },
  {
    q: "What areas do you currently deliver to?",
    a: "We currently cover Lahore and surrounding cantonment areas, with corporate delivery extending further on request — reach out and we'll confirm your area.",
    cat: "Delivery",
  },
  {
    q: "How do I cancel or pause my subscription plan?",
    a: "Message our team on WhatsApp or call the UAN any time — pauses and cancellations are processed the same day with no lock-in period.",
    cat: "Plans",
  },
  {
    q: "What's the minimum order for custom-branded bottles?",
    a: "Event runs start from as low as a few hundred bottles; brand and hospitality clients typically order in the low thousands. We'll size a plan to your event.",
    cat: "Branding",
  },
];

function FAQs() {
  const [open, setOpen] = useState(0);
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCat = activeCat === "All" || f.cat === activeCat;
      const matchesQuery =
        !query.trim() ||
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [activeCat, query]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="FAQS"
        title={<>Questions, <span className="shine-text">answered</span></>}
        subtitle="Everything about our water, delivery and branding — in one place."
      />

      {/* Search + categories */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a question…"
              className="w-full h-12 pl-11 pr-4 rounded-full bg-white border border-white/80 shadow-sm focus:border-blue focus:outline-none text-navy"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition ${
                  activeCat === c
                    ? "bg-brand text-white shine"
                    : "bg-white border border-navy/15 text-navy hover:bg-bg-light"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQ list */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        {filtered.length > 0 ? (
          <Stagger className="space-y-3">
            {filtered.map((f, i) => (
              <StaggerItem key={f.q}>
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="flex items-start gap-3">
                      <span className="grid place-items-center h-7 w-7 shrink-0 rounded-lg bg-bg-tint text-blue mt-0.5">
                        <HelpCircle className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-semibold text-navy leading-snug">{f.q}</span>
                    </span>
                    <ChevronDown className={`h-4 w-4 text-blue shrink-0 transition ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pl-[3.75rem] pb-5 text-sm text-text-muted leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="text-center text-text-muted py-10">
            No questions match "{query}" — try another search or ask us directly below.
          </p>
        )}
      </section>

      {/* Still have questions CTA */}
      <section className="mt-24 py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-tint via-white to-bg-light" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-blue/15 blur-3xl -z-10" />
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="grid place-items-center h-14 w-14 mx-auto rounded-2xl bg-brand text-white shine">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl sm:text-3xl font-extrabold text-navy">
              Still have <span className="shine-text">a question?</span>
            </h2>
            <p className="mt-3 text-text-muted">
              Our team replies within one working day — whatever you need to know, just ask.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/923096419731"
                target="_blank"
                rel="noreferrer"
                className="shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-navy/15 text-navy font-semibold hover:bg-bg-light transition"
              >
                Contact us <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}