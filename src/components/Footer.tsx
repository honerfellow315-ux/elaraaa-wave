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
  ShieldCheck,
  FlaskConical,
  BadgeCheck,
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

  const exploreLinks: [string, string][] = [
    ["Home", "/"],
    ["Products", "/products"],
    ["Custom Branding", "/custom-branding"],
    ["Gallery", "/gallery"],
    ["About", "/about"],
    ["Services", "/services"],
  ];

  const supportLinks: [string, string][] = [
    ["FAQs", "/faqs"],
    ["Coverage", "/coverage-areas"],
    ["Offers", "/offers"],
    ["Contact", "/contact"],
    ["Privacy", "/privacy-policy"],
    ["Terms", "/terms"],
  ];

  const contactRows = [
    {
      icon: MapPin,
      title: "Location",
      value: "Lahore, Pakistan",
      caption: "Delivering Freshness",
      href: undefined as string | undefined,
    },
    {
      icon: Phone,
      title: "Phone",
      value: "0309 6419731",
      caption: "Available 24/7",
      href: "tel:03096419731",
    },
    {
      icon: Mail,
      title: "Email",
      value: "hello@elarawave.com",
      caption: "Fast Response",
      href: "mailto:hello@elarawave.com",
    },
  ];

  return (
    <footer className="relative isolate mt-32 overflow-hidden">
      {/* Animated premium gradient top border */}
      <div className="absolute left-0 right-0 top-0 z-10 pointer-events-none">
        <div
          className="mx-auto h-[5px] w-full rounded-[4px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(185,210,42,0) 0%, #B9D22A 12%, #69B64A 35%, #259F9F 60%, #22B2CB 82%, rgba(34,178,203,0) 100%)",
            backgroundSize: "300% 100%",
            animation: "gradientBands 10s ease-in-out infinite",
            boxShadow: `
              0 0 10px rgba(185,210,42,.35),
              0 0 18px rgba(105,182,74,.30),
              0 0 30px rgba(37,159,159,.25),
              0 0 45px rgba(34,178,203,.18)
            `,
            filter: "blur(0.2px)",
          }}
        />
      </div>

      {/* Elegant animated dark background — pure CSS, no images */}
      <div aria-hidden className="absolute inset-0 -z-30 bg-[#03283A]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-30 opacity-90"
        style={{
          background:
            "radial-gradient(80% 60% at 15% 10%, rgba(14,116,167,0.35), transparent 60%), radial-gradient(70% 55% at 85% 20%, rgba(37,159,159,0.32), transparent 65%), radial-gradient(60% 50% at 50% 90%, rgba(105,182,74,0.25), transparent 70%), linear-gradient(180deg, #03283A 0%, #05334A 55%, #03283A 100%)",
        }}
      />
      {/* Soft noise texture for depth */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Animated ambient glow layers */}
      <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
        <div className="footer-orb absolute -top-32 left-[6%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,178,203,0.55),rgba(34,178,203,0)_70%)] blur-[110px]" />
        <div className="footer-orb footer-orb--slow absolute top-[8%] right-[4%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(105,182,74,0.45),rgba(105,182,74,0)_70%)] blur-[120px]" />
        <div className="footer-orb footer-orb--x absolute bottom-[-6rem] left-1/3 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,116,167,0.5),rgba(14,116,167,0)_70%)] blur-[110px]" />
        <div className="footer-orb footer-orb--slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,159,159,0.28),rgba(37,159,159,0)_70%)] blur-[140px]" />

        {/* Moving light sweep */}
        <div className="footer-sweep absolute -inset-x-40 top-1/3 h-40 rotate-[-8deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-2xl" />

        {/* Floating particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="footer-particle absolute rounded-full bg-white/50"
            style={{
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              top: `${(i * 41) % 92}%`,
              left: `${(i * 53) % 96}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${8 + (i % 5) * 2}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <Reveal>
          <div className="relative">
            {/* Glow behind card */}
            <div
              className="absolute -inset-6 -z-10 rounded-[48px] opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 15% 20%, rgba(34,178,203,0.25) 0%, rgba(34,178,203,0) 70%), radial-gradient(50% 50% at 85% 80%, rgba(185,210,42,0.2) 0%, rgba(185,210,42,0) 70%)",
              }}
            />

            <div className="relative rounded-[40px] border border-white/10 bg-white/[0.07] backdrop-blur-3xl shadow-[0_35px_90px_-25px_rgba(3,40,58,0.65)] p-8 sm:p-12 lg:p-14 shine overflow-hidden">
              {/* Inner top highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              {/* Inner soft reflection */}
              <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
              {/* Inner scrim for text legibility against the photo */}
              <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[#03283A]/25" />

              <div className="relative grid md:grid-cols-12 gap-y-12 md:gap-x-8">
                {/* Logo */}
                <div className="md:col-span-4 md:pr-8 space-y-5 md:border-r md:border-white/10">
                  <div className="flex items-center gap-3">
                    <Logo className="h-12 w-auto" />

                    <div className="leading-tight">
                      <div className="text-[16px] font-black tracking-[0.18em] bg-gradient-to-r from-white via-teal to-green bg-clip-text text-transparent">
                        ELARA WAVE
                      </div>

                      <div className="mt-1 text-[9px] font-bold tracking-[0.4em] text-green">
                        FLOW WITH FRESHNESS
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-white/75 max-w-xs">
                    Premium alkaline &amp; natural mineral water. PFA
                    Registered, lab tested, halal certified — delivered
                    fresh across Lahore.
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-2">
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

                  {/* Certification capsule */}
                  <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-white/60 px-4 py-2 mt-2 shadow-[0_8px_20px_-8px_rgba(6,65,94,0.35)]">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] text-navy">
                      <ShieldCheck className="h-3.5 w-3.5 text-blue" />
                      PFA REGISTERED
                    </span>
                    <span className="text-navy/40">•</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] text-navy">
                      <FlaskConical className="h-3.5 w-3.5 text-blue" />
                      LAB TESTED
                    </span>
                    <span className="text-navy/40">•</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] text-navy">
                      <BadgeCheck className="h-3.5 w-3.5 text-blue" />
                      HALAL CERTIFIED
                    </span>
                  </div>
                </div>

                {/* Explore */}
                <div className="md:col-span-2 md:px-6 md:border-r md:border-white/10">
                  <h4 className="text-sm font-bold text-blue mb-5">
                    Explore
                  </h4>

                  <ul className="space-y-1">
                    {exploreLinks.map(([label, to]) => (
                      <li key={to} className="group relative">
                        <Link
                          to={to}
                          className="relative inline-flex items-center py-1.5 pl-4 text-sm text-white/70 hover:text-white transition-all duration-300"
                        >
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-[2px] bg-teal scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />
                          <span className="relative">
                            {label}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white group-hover:w-full transition-all duration-300" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div className="md:col-span-2 md:px-6 md:border-r md:border-white/10">
                  <h4 className="text-sm font-bold text-blue mb-5">
                    Support
                  </h4>

                  <ul className="space-y-1">
                    {supportLinks.map(([label, to]) => (
                      <li key={to} className="group relative">
                        <Link
                          to={to}
                          className="relative inline-flex items-center py-1.5 pl-4 text-sm text-white/70 hover:text-white transition-all duration-300"
                        >
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-[2px] bg-teal scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />
                          <span className="relative">
                            {label}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white group-hover:w-full transition-all duration-300" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="md:col-span-4 md:pl-6">
                  <h4 className="text-sm font-bold text-blue mb-5">
                    Get in touch
                  </h4>

                  <ul className="space-y-3">
                    {contactRows.map((row) => {
                      const Icon = row.icon;
                      const content = (
                        <div className="flex items-start gap-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 px-4 py-3 shadow-[0_10px_24px_-12px_rgba(3,40,58,0.5)] transition-all duration-300 hover:bg-white hover:-translate-y-0.5">
                          <span className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_6px_16px_-8px_rgba(6,65,94,0.35)]">
                            <Icon className="h-4 w-4 text-blue" />
                          </span>
                          <span className="leading-tight">
                            <span className="block text-[11px] font-bold tracking-[0.1em] text-navy/70 uppercase">
                              {row.title}
                            </span>
                            <span className="block text-sm font-semibold text-black">
                              {row.value}
                            </span>
                            <span className="block text-xs text-text-muted">
                              {row.caption}
                            </span>
                          </span>
                        </div>
                      );

                      return (
                        <li key={row.title}>
                          {row.href ? (
                            <a href={row.href} className="block">
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom footer */}
        <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-medium text-white/70 order-2 sm:order-1">
            © {new Date().getFullYear()} ELARAWAVE. All rights reserved.
          </p>

          <div className="flex items-center gap-4 order-1 sm:order-2 text-white/60">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">
              Privacy
            </Link>
            <span className="h-3 w-px bg-white/20" />
            <Link to="/terms" className="hover:text-white transition-colors duration-300">
              Terms
            </Link>
            <span className="h-3 w-px bg-white/20" />
            <Link to="/" className="hover:text-white transition-colors duration-300">
              Sitemap
            </Link>
          </div>

          <p className="mt-1 sm:mt-0 order-3 text-[9px] font-bold tracking-[0.4em] text-green animate-pulse">
            Flow With Freshness
          </p>
        </div>
      </div>
    </footer>
  );
}