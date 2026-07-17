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
    <footer className="relative mt-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-tint via-white to-bg-light" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-[80%] rounded-full bg-blue/20 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <Reveal>
          <div className="glass rounded-3xl p-8 sm:p-12 grid md:grid-cols-12 gap-10">
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
                      className="grid place-items-center h-10 w-10 rounded-full bg-white/70 border border-white/80 text-navy hover:text-white hover:bg-brand hover:-translate-y-1 transition-all duration-300 shine"
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
                      className="text-text-muted hover:text-blue relative inline-block after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-blue after:transition-all hover:after:w-full"
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
                      className="text-text-muted hover:text-blue"
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
                <li className="flex gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 text-blue shrink-0" />
                  Lahore, Pakistan
                </li>

                <li className="flex gap-3">
                  <Phone className="h-4 w-4 mt-0.5 text-blue shrink-0" />
                  <a
                    href="tel:03096419731"
                    className="hover:text-navy"
                  >
                    0309 6419731
                  </a>
                </li>

                <li className="flex gap-3">
                  <Mail className="h-4 w-4 mt-0.5 text-blue shrink-0" />
                  <a
                    href="mailto:hello@elarawave.com"
                    className="hover:text-navy"
                  >
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