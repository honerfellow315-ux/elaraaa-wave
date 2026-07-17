import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Custom Branding", to: "/custom-branding" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
];

const more = [
  { label: "Offers", to: "/offers" },
  { label: "Coverage Areas", to: "/coverage-areas" },
  { label: "Blog", to: "/blog" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(18,58,94,0.08)] border-b border-white/60"
            : "bg-white/40 backdrop-blur-md border-b border-white/30"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3">
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <Logo className="h-11 w-auto shrink-0" />
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="text-[15px] font-extrabold tracking-widest text-navy">
                  ELARA WAVE
                </span>
                <span className="text-[10px] font-medium tracking-[0.25em] text-text-muted">
                  FLOW WITH FRESHNESS
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex justify-center">
              <ul className="flex items-center gap-1">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      activeProps={{ className: "text-blue" }}
                      className="px-3 py-2 text-sm font-medium text-navy hover:text-blue transition rounded-full"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li className="relative group">
                  <button className="px-3 py-2 text-sm font-medium text-navy hover:text-blue transition inline-flex items-center gap-1">
                    Others <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <div className="glass rounded-2xl p-2 min-w-[180px]">
                      {more.map((m) => (
                        <Link
                          key={m.to}
                          to={m.to}
                          className="block px-3 py-2 text-sm text-navy hover:bg-white/70 rounded-lg transition"
                        >
                          {m.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-2 justify-end">
              <a
                href="tel:03096419731"
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/70 border border-white/70 text-navy text-sm font-semibold hover:bg-white transition"
              >
                <Phone className="h-4 w-4 text-blue" />
                <span>0309 6419731</span>
              </a>
              <Link
                to="/contact"
                className="shine relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold shadow-[0_10px_25px_-8px_rgba(18,58,94,0.6)] hover:shadow-[0_15px_35px_-10px_rgba(62,154,214,0.7)] hover:-translate-y-0.5 transition"
              >
                Order Now
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-2 rounded-full bg-white/70 border border-white/70 text-navy"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] transition ${open ? "visible" : "invisible"}`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute inset-0 bg-navy/40 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm glass p-6 overflow-y-auto transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-extrabold tracking-widest text-navy">ELARA WAVE</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full bg-white/70"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="space-y-1">
            {[...nav, ...more].map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-navy font-medium hover:bg-white/70 transition"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-2">
            <a
              href="tel:03096419731"
              className="text-center px-4 py-3 rounded-full border border-navy/20 text-navy font-semibold"
            >
              0309 6419731
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="shine text-center px-4 py-3 rounded-full bg-brand text-white font-semibold"
            >
              Order Now
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
