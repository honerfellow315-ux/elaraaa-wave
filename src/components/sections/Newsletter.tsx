import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Mail, Check } from "lucide-react";
import { endpoints, ApiError } from "@/lib/api";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !email) return;
    setBusy(true);
    try {
      await endpoints.subscribe({ email });
      setSent(true);
      toast.success("You're on the wave!");
      setEmail("");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Subscription failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="newsletter" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative glass rounded-[36px] p-10 sm:p-14 overflow-hidden shine">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-green/30 blur-3xl" />
            <div className="relative text-center max-w-2xl mx-auto">
              <div className="mx-auto grid place-items-center h-12 w-12 rounded-2xl bg-brand text-white shine">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold text-navy">
                Join the <span className="shine-text">wave</span>
              </h3>
              <p className="mt-3 text-text-muted">
                Fresh offers, hydration tips, and early access to new drops — straight to your inbox.
              </p>
              <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@elarawave.com"
                  className="flex-1 h-14 px-5 rounded-full bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
                />
                <button disabled={busy} className="shine inline-flex items-center justify-center gap-2 px-6 h-14 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition disabled:opacity-60">
                  {sent ? (<><Check className="h-4 w-4" /> Subscribed</>) : busy ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
