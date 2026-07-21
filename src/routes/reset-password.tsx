import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { endpoints, ApiError } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — ELARA WAVE" },
      { name: "description", content: "Set a new password for your ELARA WAVE account." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : "",
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const { token: initialToken } = Route.useSearch();
  const [token, setToken] = useState(initialToken || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords don't match");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    setBusy(true);
    try {
      await endpoints.resetPassword({ token, password });
      toast.success("Password updated. Please sign in.");
      navigate({ to: "/login", search: { redirect: undefined } });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Reset failed");
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
            <h1 className="mt-6 text-2xl font-extrabold text-navy">Reset password</h1>
            <p className="text-sm text-text-muted mt-1">Enter the token from your email and choose a new password.</p>
            <form className="mt-6 space-y-3" onSubmit={onSubmit}>
              <input required placeholder="Reset token" value={token} onChange={(e) => setToken(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <input required type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <input required type="password" placeholder="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <button disabled={busy} className="shine w-full h-12 rounded-xl bg-brand text-white font-semibold disabled:opacity-60">{busy ? "Updating…" : "Update password"}</button>
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