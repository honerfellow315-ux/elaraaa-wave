import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { endpoints, ApiError } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot password — ELARAWAVE" },
      { name: "description", content: "Reset your ELARAWAVE account password." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await endpoints.forgotPassword({ email });
      setSent(true);
      toast.success("If that account exists, a reset link has been sent.");
      setTimeout(() => navigate({ to: "/reset-password", search: { token: "" } }), 800);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <div className="relative min-h-[80vh] grid place-items-center pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-tint via-white to-bg-light" />
        <Reveal as="scale">
          <div className="glass rounded-3xl p-8 sm:p-10 w-[92vw] max-w-md">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <div>
                <div className="text-sm font-extrabold tracking-widest text-navy">ELARA WAVE</div>
                <div className="text-[10px] tracking-[0.25em] text-text-muted">FLOW WITH FRESHNESS</div>
              </div>
            </div>
            <h1 className="mt-6 text-2xl font-extrabold text-navy">Forgot password</h1>
            <p className="text-sm text-text-muted mt-1">Enter your email and we'll send you a reset link.</p>
            <form className="mt-6 space-y-3" onSubmit={onSubmit}>
              <input required type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <button disabled={busy} className="shine w-full h-12 rounded-xl bg-brand text-white font-semibold disabled:opacity-60">
                {busy ? "Sending…" : sent ? "Sent" : "Send reset link"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-text-muted">
              <Link to="/login" search={{ redirect: undefined }} className="text-blue font-semibold">Back to sign in</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </SiteLayout>
  );
}