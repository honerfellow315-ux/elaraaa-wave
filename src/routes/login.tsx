import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — ELARAWAVE" },
      { name: "description", content: "Sign in to your ELARAWAVE account." },
    ],
  }),
  component: Login,
});

function Login() {
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
            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input required type="email" placeholder="Email address" className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <input required type="password" placeholder="Password" className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <div className="flex items-center justify-between text-xs text-text-muted">
                <label className="inline-flex items-center gap-2"><input type="checkbox" className="accent-blue" /> Remember me</label>
                <a href="#" className="text-blue font-semibold">Forgot?</a>
              </div>
              <button className="shine w-full h-12 rounded-xl bg-brand text-white font-semibold">Sign in</button>
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
