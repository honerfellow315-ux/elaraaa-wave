import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { Send, Phone, Mail, MapPin, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ELARAWAVE — Order & Enquiries" },
      { name: "description", content: "Order water, request a corporate plan, or reach ELARAWAVE support." },
      { property: "og:title", content: "Contact ELARAWAVE" },
      { property: "og:description", content: "We're here — call, email, or send a message." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero eyebrow="CONTACT" title={<>Let's <span className="shine-text">talk water</span></>} subtitle="Orders, corporate plans, custom labels — we'd love to help." />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8">
        <Reveal as="left" className="lg:col-span-2">
          <div className="glass-card p-8 h-full">
            <h3 className="text-xl font-bold text-navy">Get in touch</h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-blue" /><a href="tel:03096419731" className="text-navy font-semibold">0309 6419731</a></li>
              <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-blue" /><a href="mailto:hello@elarawave.com" className="text-navy font-semibold">hello@elarawave.com</a></li>
              <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-blue" /><span className="text-text-muted">Lahore, Pakistan</span></li>
            </ul>
            <div className="mt-8 rounded-2xl overflow-hidden aspect-video border border-white/70">
              <iframe
                title="ELARAWAVE location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=74.2,31.4,74.5,31.6&layer=mapnik"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
        <Reveal as="right" className="lg:col-span-3">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-card p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" placeholder="Your name" />
              <Field label="Phone" placeholder="03__ _______" />
            </div>
            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="Subject" placeholder="How can we help?" />
            <div>
              <label className="text-xs font-bold text-navy tracking-widest">MESSAGE</label>
              <textarea
                required rows={5}
                placeholder="Tell us a little more…"
                className="mt-2 w-full p-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
              />
            </div>
            <button className="shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-semibold">
              {sent ? (<><Check className="h-4 w-4" /> Message sent</>) : (<><Send className="h-4 w-4" /> Send message</>)}
            </button>
          </form>
        </Reveal>
      </div>
    </SiteLayout>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-bold text-navy tracking-widest">{label.toUpperCase()}</label>
      <input
        required
        {...props}
        className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
      />
    </div>
  );
}
