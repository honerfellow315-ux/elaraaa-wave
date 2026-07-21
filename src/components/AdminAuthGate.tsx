import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { signInAdmin, isAdminAuthenticated } from "@/lib/admin-auth";

export function AdminAuthGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
    setChecked(true);
  }, []);

  if (!checked) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="glass rounded-2xl px-6 py-4 text-sm text-text-muted">Loading…</div>
      </div>
    );
  }

  if (authed) return <>{children}</>;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    const res = await signInAdmin(username.trim(), password);
    setBusy(false);
    if (!res.ok) {
      setError(res.message);
      return;
    }
    setAuthed(true);
  }

  return (
    <div className="relative min-h-screen grid place-items-center py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-tint via-white to-bg-light" />
      <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-blue/20 blur-3xl -z-10" />
      <div className="absolute bottom-10 -right-20 h-72 w-72 rounded-full bg-green/20 blur-3xl -z-10" />
      <div className="glass rounded-3xl p-8 sm:p-10 w-full max-w-md">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-auto" />
          <div>
            <div className="text-sm font-extrabold tracking-widest text-navy">ELARA WAVE</div>
            <div className="text-[10px] tracking-[0.25em] text-text-muted">ADMIN PANEL</div>
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-navy">Admin Sign In</h1>
        <p className="text-sm text-text-muted mt-1">Enter your credentials to access the admin panel.</p>
        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <input
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
          />
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
          />
          {error && (
            <div className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <button disabled={busy} className="shine w-full h-12 rounded-xl bg-brand text-white font-semibold disabled:opacity-60">
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}