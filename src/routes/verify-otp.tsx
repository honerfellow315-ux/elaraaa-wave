import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { endpoints, ApiError, setToken } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({
    meta: [
      { title: "Verify your email — ELARAWAVE" },
      { name: "description", content: "Verify your ELARAWAVE account with the OTP sent to your email." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    email: typeof s.email === "string" ? s.email : "",
  }),
  component: VerifyOtp,
});

const RESEND_SECONDS = 60;

function VerifyOtp() {
  const { email } = Route.useSearch();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!email) {
      navigate({ to: "/register" });
      return;
    }
    inputRef.current?.focus();
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || otp.trim().length !== 6) return;
    setBusy(true);
    try {
      const res = await endpoints.verifyRegistrationOtp({ email, otp: otp.trim() });
      setToken(res.token);
      setUser(res.user);
      toast.success("Email verified. Welcome to ELARAWAVE!");
      navigate({ to: "/account" });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Invalid or expired code");
    } finally {
      setBusy(false);
    }
  }

  async function onResend() {
    if (resendBusy || cooldown > 0) return;
    setResendBusy(true);
    try {
      await endpoints.resendOtp({ email });
      toast.success("A new code has been sent to your email");
      setCooldown(RESEND_SECONDS);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Couldn't resend code");
    } finally {
      setResendBusy(false);
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
            <h1 className="mt-6 text-2xl font-extrabold text-navy">Verify your email</h1>
            <p className="text-sm text-text-muted mt-1">
              We've sent a 6-digit code to <span className="font-semibold text-navy">{email}</span>
            </p>
            <form className="mt-6 space-y-3" onSubmit={onSubmit}>
              <input
                ref={inputRef}
                required
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy text-center tracking-[0.5em] text-lg font-semibold"
              />
              <button
                disabled={busy || otp.length !== 6}
                className="shine w-full h-12 rounded-xl bg-brand text-white font-semibold disabled:opacity-60"
              >
                {busy ? "Verifying…" : "Verify"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-text-muted">
              Didn't get the code?{" "}
              {cooldown > 0 ? (
                <span className="text-navy font-semibold">Resend in {cooldown}s</span>
              ) : (
                <button onClick={onResend} disabled={resendBusy} className="text-blue font-semibold disabled:opacity-60">
                  {resendBusy ? "Sending…" : "Resend code"}
                </button>
              )}
            </p>
            <p className="mt-3 text-center text-sm text-text-muted">
              <Link to="/register" className="text-blue font-semibold">Use a different email</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </SiteLayout>
  );
}