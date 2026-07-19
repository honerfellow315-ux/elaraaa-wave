import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — ELARAWAVE" },
      { name: "description", content: "Sign in to your ELARAWAVE account." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name || user.email}`);
      const target = redirect || (user.role === "admin" ? "/admin" : "/account");
      navigate({ to: target as never });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <div className="relative min-h-[80vh] grid place-items-center py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-tint via-white to-bg-light" />
        <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-blue/20 blur-3xl -z-10" />
        <div className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-green/20 blur-3xl -z-10" />
        <Reveal as="scale">
          <div className="glass rounded-3xl p-8 sm:p-10 w-[92vw] max-w-md">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <div>
                <div className="text-sm font-extrabold tracking-widest text-navy">ELARA WAVE</div>
                <div className="text-[10px] tracking-[0.25em] text-text-muted">FLOW WITH FRESHNESS</div>
              </div>
            </div>
            <h1 className="mt-6 text-2xl font-extrabold text-navy">Welcome back</h1>
            <p className="text-sm text-text-muted mt-1">Sign in to manage your orders and subscriptions.</p>
            <form className="mt-6 space-y-3" onSubmit={onSubmit}>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <div className="flex items-center justify-between text-xs text-text-muted">
                <label className="inline-flex items-center gap-2"><input type="checkbox" className="accent-blue" /> Remember me</label>
                <Link to="/forgot-password" className="text-blue font-semibold">Forgot?</Link>
              </div>
              <button disabled={busy} className="shine w-full h-12 rounded-xl bg-brand text-white font-semibold disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
            </form>
            <p className="mt-6 text-center text-sm text-text-muted">
              New here? <Link to="/register" className="text-blue font-semibold">Create account</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </SiteLayout>
  );
}
