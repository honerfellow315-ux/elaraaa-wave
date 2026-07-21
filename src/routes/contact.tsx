import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { useState } from "react";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Check,
  Clock,
  MessageCircle,
  Building2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { endpoints, ApiError } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ELARA WAVE — Order & Enquiries" },
      { name: "description", content: "Order water, request a corporate plan, or reach ELARA WAVE support." },
      { property: "og:title", content: "Contact ELARA WAVE" },
      { property: "og:description", content: "We're here — call, email, or send a message." },
    ],
  }),
  component: Contact,
});

const quickContacts = [
  {
    icon: Phone,
    label: "UAN — All enquiries",
    value: "111-999-444",
    href: "tel:111999444",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp orders",
    value: "0309 6419731",
    href: "https://wa.me/923096419731",
  },
  {
    icon: Mail,
    label: "Email support",
    value: "info@elarawave.com",
    href: "mailto:info@elarawave.com",
  },
];

const reasons = [
  { icon: Clock, t: "Same-day response", d: "Enquiries received before 6 PM are answered the same working day." },
  { icon: Building2, t: "Corporate accounts", d: "Dedicated account manager for offices, hotels and recurring orders." },
  { icon: ShieldCheck, t: "Direct to our team", d: "No call centres — every message reaches our Lahore office directly." },
];

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
      setTimeout(() => setSent(false), 5000);
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
      <PageHero
        eyebrow="CONTACT"
        title={<>Let's <span className="shine-text">talk water</span></>}
        subtitle="Orders, corporate plans, custom labels — we'd love to help."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/923096419731"
            target="_blank"
            rel="noreferrer"
            className="shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
          <a
            href="tel:111999444"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-navy/15 text-navy font-semibold hover:bg-bg-light transition"
          >
            <Phone className="h-4 w-4" /> 111-999-444
          </a>
        </div>
      </PageHero>

      {/* Quick contact strip */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Stagger className="grid gap-4 sm:grid-cols-3">
          {quickContacts.map((c) => (
            <StaggerItem key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="group glass-card p-5 flex items-center gap-4 h-full hover:-translate-y-1 transition"
              >
                <div className="grid place-items-center h-11 w-11 shrink-0 rounded-2xl bg-brand text-white shine">
                  <c.icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-widest text-text-muted uppercase">{c.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-navy truncate">{c.value}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-navy/30 ml-auto shrink-0 group-hover:text-blue transition" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Main grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8 grid lg:grid-cols-5 gap-8">
        <Reveal as="left" className="lg:col-span-2">
          <div className="glass-card p-8 h-full relative overflow-hidden">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue/10 blur-3xl -z-10" />

            <p className="text-xs font-bold tracking-[0.3em] text-blue">HEAD OFFICE</p>
            <h3 className="mt-2 text-xl font-extrabold text-navy">Get in touch</h3>

            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3">
                <div className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-bg-tint text-blue">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-text-muted uppercase">UAN</p>
                  <a href="tel:111999444" className="block font-semibold text-navy hover:underline">
                    111-999-444
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-bg-tint text-blue">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-text-muted uppercase">Direct lines</p>
                  <div className="flex flex-col text-navy font-semibold">
                    <a href="tel:03096419731" className="hover:underline">0309 6419731</a>
                    <a href="tel:03096416732" className="hover:underline">0309 6416732</a>
                  </div>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-bg-tint text-blue">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-text-muted uppercase">Email</p>
                  <a href="mailto:info@elarawave.com" className="block font-semibold text-navy hover:underline">
                    info@elarawave.com
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-bg-tint text-blue">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-text-muted uppercase">Address</p>
                  <span className="text-text-muted">
                    Gondal Heights, Plaza 60, Broadway Commercial, Paragon City, Barki Road, Lahore Cantt.
                  </span>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="grid place-items-center h-9 w-9 shrink-0 rounded-xl bg-bg-tint text-blue">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-text-muted uppercase">Hours</p>
                  <span className="text-text-muted">Mon – Sun, 9:00 AM – 7:00 PM</span>
                </div>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl overflow-hidden aspect-video border border-white/70 shadow-sm">
              <iframe
                title="ELARA WAVE location"
                src="https://maps.google.com/maps?q=Gondal%20Heights%20Plaza%2060%20Broadway%20Commercial%20Paragon%20City%20Barki%20Road%20Lahore%20Cantt&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>

        <Reveal as="right" className="lg:col-span-3">
          <form onSubmit={onSubmit} className="glass-card p-8 space-y-4 h-full relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-brand/10 blur-3xl -z-10" />

            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-blue">SEND A MESSAGE</p>
              <h3 className="mt-2 text-xl font-extrabold text-navy">We'll reply within one working day</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
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
                className="mt-2 w-full p-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy resize-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                disabled={busy}
                className="shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition disabled:opacity-60"
              >
                {busy ? "Sending…" : (<><Send className="h-4 w-4" /> Send message</>)}
              </button>
              {sent && (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-green">
                  <Check className="h-4 w-4" /> Message sent — we'll be in touch soon.
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </section>

      {/* Why reach out */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <Stagger className="grid gap-6 sm:grid-cols-3">
          {reasons.map(({ icon: I, t, d }) => (
            <StaggerItem key={t}>
              <div className="glass-card p-6 h-full hover:-translate-y-1 transition">
                <div className="grid place-items-center h-11 w-11 rounded-2xl bg-brand text-white shine">
                  <I className="h-4.5 w-4.5" />
                </div>
                <h4 className="mt-4 text-base font-bold text-navy">{t}</h4>
                <p className="mt-1.5 text-sm text-text-muted">{d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
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