import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { Send, Phone, Mail, MapPin, Check } from "lucide-react";
import { endpoints, ApiError } from "@/lib/api";
import { toast } from "sonner";

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
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return toast.error("Please fill in name, email and message");
    }
    setBusy(true);
    try {
      await endpoints.contact({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        message: form.subject ? `[${form.subject}] ${form.message}` : form.message,
      });
      setSent(true);
      toast.success("Message sent — we'll be in touch soon.");
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to send message");
    } finally {
      setBusy(false);
    }
  }

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

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
          <form onSubmit={onSubmit} className="glass-card p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
              <Field label="Phone" placeholder="03__ _______" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} required />
            <Field label="Subject" placeholder="How can we help?" value={form.subject} onChange={(e) => set("subject", e.target.value)} />
            <div>
              <label className="text-xs font-bold text-navy tracking-widest">MESSAGE</label>
              <textarea
                required rows={5}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Tell us a little more…"
                className="mt-2 w-full p-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
              />
            </div>
            <button disabled={busy} className="shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-semibold disabled:opacity-60">
              {sent ? (<><Check className="h-4 w-4" /> Message sent</>) : busy ? "Sending…" : (<><Send className="h-4 w-4" /> Send message</>)}
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
        {...props}
        className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
      />
    </div>
  );
}
