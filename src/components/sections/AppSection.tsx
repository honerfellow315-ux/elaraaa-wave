import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  Smartphone,
  Bell,
  MapPin,
  CreditCard,
  ImageIcon,
} from "lucide-react";

export function AppSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* ================= PHONE ================= */}

        <Reveal as="left">
          <div className="relative mx-auto w-fit">

            {/* Background Glow */}
            <div className="absolute inset-0 scale-150 rounded-full bg-blue/20 blur-[100px] -z-20" />

            {/* Phone Body */}
            <div
              className="
                relative
                mx-auto
                h-[620px]
                w-[310px]
                rounded-[58px]
                bg-gradient-to-b
                from-[#FCFEFF]
                via-[#EEF4FA]
                to-[#DDE8F3]
                border-[8px]
                border-[#D4DEE8]
                shadow-[0_40px_90px_rgba(15,23,42,.22)]
                ring-1
                ring-white/80
                overflow-hidden
              "
            >
              {/* Metallic Reflection */}
              <div className="pointer-events-none absolute inset-0 rounded-[58px] bg-gradient-to-br from-white/70 via-transparent to-transparent" />

              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-3 z-30 h-7 w-32 -translate-x-1/2 rounded-full bg-black shadow-lg" />

              {/* Speaker */}
              <div className="absolute left-1/2 top-[17px] z-40 h-[5px] w-12 -translate-x-1/2 rounded-full bg-neutral-800" />

              {/* Camera */}
              <div className="absolute right-[112px] top-[15px] z-40 h-3 w-3 rounded-full bg-neutral-900">
                <div className="absolute inset-[2px] rounded-full bg-neutral-700" />
              </div>

              {/* Screen */}
              <div className="absolute inset-[8px] overflow-hidden rounded-[48px] bg-black">
                                {!imgError ? (
                  <img
                    src="/images/app-preview.webp"
                    alt="ELARA WAVE App Preview"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#0B4D7A] via-[#0D6EAE] to-[#0A3554] text-white">

                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/15">
                      <ImageIcon className="h-10 w-10 text-white/70" />
                    </div>

                    <h3 className="text-xl font-bold tracking-wide">
                      ELARA WAVE
                    </h3>

                    <p className="mt-2 text-sm text-white/70 tracking-[0.25em] uppercase">
                      Mobile App
                    </p>

                    <div className="mt-10 h-2 w-40 overflow-hidden rounded-full bg-white/15">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 animate-pulse" />
                    </div>

                    <p className="mt-5 text-sm text-white/60">
                      Coming Soon
                    </p>
                  </div>
                )}

                {/* Screen Reflection */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />

              </div>

              {/* Left Buttons */}
              <div className="absolute -left-[3px] top-28 h-16 w-[4px] rounded-r-full bg-[#BFCAD4]" />
              <div className="absolute -left-[3px] top-52 h-24 w-[4px] rounded-r-full bg-[#BFCAD4]" />

              {/* Right Button */}
              <div className="absolute -right-[3px] top-44 h-20 w-[4px] rounded-l-full bg-[#BFCAD4]" />

            </div>
          </div>
        </Reveal>

        {/* ================= CONTENT ================= */}

        <Reveal as="right">

          <p className="text-xs font-bold tracking-[0.3em] text-blue">
            ELARA WAVE APP
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight text-navy">
            Reorder in a{" "}
            <span className="shine-text">
              single tap
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-text-muted">
            Track deliveries in real time, manage subscriptions,
            earn loyalty rewards and reorder premium mineral water
            from a beautifully designed mobile experience.
          </p>
                    {/* Features */}
          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
            {[
              {
                icon: Bell,
                label: "Live delivery tracking",
              },
              {
                icon: MapPin,
                label: "Smart hydration reminders",
              },
              {
                icon: CreditCard,
                label: "Loyalty & rewards wallet",
              },
              {
                icon: Smartphone,
                label: "One-tap subscriptions",
              },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-4
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue/20
                  hover:shadow-xl
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-blue
                    to-brand
                    text-white
                    shadow-lg
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span className="font-semibold text-navy">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* App Store Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <button
              type="button"
              className="
                group
                relative
                flex
                h-14
                items-center
                rounded-full
                bg-gradient-to-r
                from-blue
                to-brand
                px-8
                font-semibold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              <Smartphone className="mr-2 h-5 w-5" />

              iOS

              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  rounded-full
                  bg-navy
                  px-2
                  py-1
                  text-[9px]
                  font-bold
                  tracking-widest
                "
              >
                SOON
              </span>
            </button>

            <button
              type="button"
              className="
                group
                relative
                flex
                h-14
                items-center
                rounded-full
                border
                border-slate-200
                bg-white
                px-8
                font-semibold
                text-navy
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <Smartphone className="mr-2 h-5 w-5" />

              Android

              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  rounded-full
                  bg-navy
                  px-2
                  py-1
                  text-[9px]
                  font-bold
                  tracking-widest
                  text-white
                "
              >
                SOON
              </span>
            </button>
          </div>
                    {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">

            <div>
              <h3 className="text-3xl font-extrabold text-navy">
                24/7
              </h3>

              <p className="mt-1 text-sm text-text-muted">
                Ordering
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-extrabold text-navy">
                100%
              </h3>

              <p className="mt-1 text-sm text-text-muted">
                Secure Payments
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-extrabold text-navy">
                5★
              </h3>

              <p className="mt-1 text-sm text-text-muted">
                Experience
              </p>
            </div>

          </div>

          {/* Bottom Note */}
          <div
            className="
              mt-10
              rounded-3xl
              border
              border-blue/10
              bg-gradient-to-r
              from-blue/5
              to-brand/5
              p-6
            "
          >
            <h3 className="text-lg font-bold text-navy">
              Coming Soon on iOS & Android
            </h3>

            <p className="mt-2 text-text-muted leading-7">
              We're building a premium mobile experience that lets you
              order bottled water, track deliveries in real time,
              manage subscriptions and earn loyalty rewards with just
              a single tap.
            </p>
          </div>

        </Reveal>

      </div>
    </section>
        );
}