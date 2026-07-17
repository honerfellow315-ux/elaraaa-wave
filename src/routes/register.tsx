import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — ELARAWAVE" },
      { name: "description", content: "Create your ELARAWAVE account." },
    ],
  }),
  component: Register,
});

function Register() {
  return (
    <SiteLayout>
      <div className="relative min-h-[80vh] grid place-items-center py-16 overflow-hidden">
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
            <h1 className="mt-6 text-2xl font-extrabold text-navy">Create your account</h1>
            <p className="text-sm text-text-muted mt-1">Reorder in one tap, unlock member offers, and track deliveries.</p>
            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input required placeholder="Full name" className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <input required type="email" placeholder="Email" className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <input required placeholder="Phone" className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <input required type="password" placeholder="Password" className="w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy" />
              <button className="shine w-full h-12 rounded-xl bg-brand text-white font-semibold">Create account</button>
            </form>
            <p className="mt-6 text-center text-sm text-text-muted">
              Already have an account? <Link to="/login" className="text-blue font-semibold">Sign in</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </SiteLayout>
  );
}
