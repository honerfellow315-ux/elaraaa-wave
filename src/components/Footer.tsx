import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { FaTiktok } from "react-icons/fa6";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1BJiUdHSMd/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/elarawavewaterofficial?igsh=MWV4Z2VsMzA2emVtdA==",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://x.com/elarawave",
      label: "X (Twitter)",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/watch?v=KWErOSVgKdc",
      label: "YouTube",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@elarawavewaterofficial",
      label: "TikTok",
    },
  ];

  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <Reveal>
          <div
            className="relative rounded-3xl border border-white/50 backdrop-blur-2xl shadow-[0_25px_70px_-20px_rgba(6,65,94,0.3)] p-8 sm:p-12 grid md:grid-cols-12 gap-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,178,203,0.55) 0%, rgba(14,116,167,0.45) 50%, rgba(6,65,94,0.4) 100%)",
            }}
          >
            {/* Logo */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <Logo className="h-12 w-auto" />

                <div className="leading-tight">
                  <div className="font-extrabold tracking-widest text-navy">
                    ELARA WAVE
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-text-muted">
                    FLOW WITH FRESHNESS
                  </div>
                </div>
              </div>

              <p className="text-sm text-text-muted">
                Premium alkaline & natural mineral water. PFA Registered, lab
                tested, halal certified — delivered fresh across Lahore.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="grid place-items-center h-10 w-10 rounded-full bg-white/25 backdrop-blur-md border border-white/50 text-navy shadow-[0_8px_20px_-8px_rgba(6,65,94,0.4)] hover:text-white hover:bg-brand hover:-translate-y-1 transition-all duration-300 shine"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Explore */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-navy mb-4">Explore</h4>

              <ul className="space-y-2 text-sm">
                {[
                  ["Home", "/"],
                  ["Products", "/products"],
                  ["Custom Branding", "/custom-branding"],
                  ["About", "/about"],
                  ["Services", "/services"],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="inline-block px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-text-muted hover:text-navy hover:bg-white/40 transition-all duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-navy mb-4">Support</h4>

              <ul className="space-y-2 text-sm">
                {[
                  ["FAQs", "/faqs"],
                  ["Coverage", "/coverage-areas"],
                  ["Offers", "/offers"],
                  ["Contact", "/contact"],
                  ["Privacy", "/privacy-policy"],
                  ["Terms", "/terms"],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="inline-block px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-text-muted hover:text-navy hover:bg-white/40 transition-all duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="text-sm font-bold text-navy mb-4">
                Get in touch
              </h4>

              <ul className="space-y-3 text-sm text-text-muted">
                <li className="flex items-center gap-3">
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-[0_6px_16px_-8px_rgba(6,65,94,0.35)] shrink-0">
                    <MapPin className="h-4 w-4 text-blue" />
                  </span>
                  Lahore, Pakistan
                </li>

                <li className="flex items-center gap-3">
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-[0_6px_16px_-8px_rgba(6,65,94,0.35)] shrink-0">
                    <Phone className="h-4 w-4 text-blue" />
                  </span>
                  <a href="tel:03096419731" className="hover:text-navy">
                    0309 6419731
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-[0_6px_16px_-8px_rgba(6,65,94,0.35)] shrink-0">
                    <Mail className="h-4 w-4 text-blue" />
                  </span>
                  <a href="mailto:hello@elarawave.com" className="hover:text-navy">
                    hello@elarawave.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} ELARAWAVE. All rights reserved.</p>
          <p className="shine-text font-semibold">Flow With Freshness</p>
        </div>
      </div>
    </footer>
  );
}