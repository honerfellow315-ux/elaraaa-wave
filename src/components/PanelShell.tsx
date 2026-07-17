import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { useState, type ReactNode } from "react";
import { Menu, X, Bell, Search } from "lucide-react";

export type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

export function PanelShell({
  brand,
  items,
  title,
  children,
}: {
  brand: string;
  items: NavItem[];
  title?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-tint via-white to-bg-light">
      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-72 glass transition-transform duration-500 lg:translate-x-0 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Fixed brand header */}
        <div className="flex items-center gap-3 p-5 shrink-0 border-b border-white/40">
          <Logo className="h-10 w-auto rounded-lg" />
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-widest text-navy">ELARA WAVE</div>
            <div className="text-[10px] tracking-[0.25em] text-blue">{brand}</div>
          </div>
          <button className="ml-auto lg:hidden p-2 rounded-full bg-white/70" onClick={() => setOpen(false)} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable nav list */}
        <nav
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-4 space-y-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {items.map(({ to, label, icon: I }) => {
            const active = pathname === to || (to !== items[0].to && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-brand text-white shine shadow-[0_10px_25px_-10px_rgba(18,58,94,0.5)]"
                    : "text-navy hover:bg-white/70"
                }`}
              >
                <I className={`h-4 w-4 ${active ? "text-white" : "text-blue"}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Fixed footer link */}
        <div className="p-5 shrink-0 border-t border-white/40">
          <Link to="/" className="block glass-card p-4 text-xs text-navy hover:-translate-y-0.5 transition">
            ← Back to site
          </Link>
        </div>
      </aside>


      {/* Main */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-b border-white/70">
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3">
            <button className="lg:hidden p-2 rounded-full bg-white/70" onClick={() => setOpen(true)} aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-extrabold text-navy truncate">{title}</h1>
            <div className="ml-auto flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 border border-white/70">
                <Search className="h-4 w-4 text-text-muted" />
                <input placeholder="Search…" className="bg-transparent outline-none text-sm text-navy w-40" />
              </div>
              <button className="relative h-9 w-9 grid place-items-center rounded-full bg-white/70 border border-white/70 text-navy">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green" />
              </button>
              <div className="h-9 w-9 rounded-full overflow-hidden border border-white/70 bg-white grid place-items-center">
                <Logo className="h-8 w-auto" />
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  );
}
