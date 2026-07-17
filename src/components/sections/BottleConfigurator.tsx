import { useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sparkles, Upload, Gem, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & static config                                              */
/* ------------------------------------------------------------------ */

type BottleId = "250ml" | "500ml" | "1000ml" | "1.5l" | "premium";

interface StandardBottleOption {
  id: Exclude<BottleId, "premium">;
  label: string;
  shortLabel: string;
  heightPct: number; // relative height of the bottle inside the preview frame
  widthPct: number; // relative width of the bottle body
}

const standardBottles: StandardBottleOption[] = [
  { id: "250ml", label: "250 ML", shortLabel: "250ML", heightPct: 52, widthPct: 34 },
  { id: "500ml", label: "500 ML", shortLabel: "500ML", heightPct: 66, widthPct: 38 },
  { id: "1000ml", label: "1 Liter", shortLabel: "1L", heightPct: 80, widthPct: 42 },
  { id: "1.5l", label: "1.5 Liter", shortLabel: "1.5L", heightPct: 92, widthPct: 47 },
];

const premiumBottle = {
  id: "premium" as const,
  label: "Premium Bottle",
  shortLabel: "PREMIUM",
};

const colorPresets = [
  { name: "Navy", hex: "#123A5E" },
  { name: "Blue", hex: "#3E9AD6" },
  { name: "Sky", hex: "#6FC3E8" },
  { name: "Green", hex: "#6FB92C" },
  { name: "Sunrise", hex: "#F6B24A" },
  { name: "Coral", hex: "#E96A6A" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Picks a readable text color (navy or white) against a given label background */
function getContrastColor(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "#FFFFFF";
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? "#123A5E" : "#FFFFFF";
}

/* ------------------------------------------------------------------ */
/*  Bottle previews                                                     */
/* ------------------------------------------------------------------ */

function StandardBottlePreview({
  size,
  labelColor,
  brand,
  logo,
}: {
  size: StandardBottleOption;
  labelColor: string;
  brand: string;
  logo: string | null;
}) {
  const textColor = useMemo(() => getContrastColor(labelColor), [labelColor]);

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-6"
      style={{ height: `${size.heightPct}%`, width: `${size.widthPct}%` }}
    >
      {/* cap */}
      <div className="mx-auto h-6 w-1/2 rounded-t-xl bg-gradient-to-b from-navy to-navy-dark shadow-lg" />
      <div className="mx-auto h-3 w-[55%] bg-navy-dark/80 rounded-b-md" />
      {/* body */}
      <div className="relative mt-2 h-[calc(100%-2.25rem)] rounded-[36px] bg-gradient-to-b from-white/90 via-white/70 to-white/90 border border-white shadow-[inset_0_0_40px_rgba(255,255,255,0.9),0_20px_60px_-20px_rgba(18,58,94,0.35)] overflow-hidden">
        {/* highlights */}
        <div className="absolute left-2 top-4 bottom-4 w-1.5 rounded-full bg-white/80 blur-[2px]" />
        <div className="absolute right-3 top-6 bottom-6 w-1 rounded-full bg-white/50 blur-[2px]" />
        {/* full-wrap label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${labelColor}-${brand}-${logo ?? "no-logo"}-${size.id}`}
            initial={{ opacity: 0, rotateY: 40 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -40 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0 top-[32%] h-[46%] flex flex-col items-center justify-center text-center px-3 shine"
            style={{
              background: labelColor,
              borderTop: "1px solid rgba(255,255,255,0.4)",
              borderBottom: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.15)",
              transform: "rotateY(-6deg)",
            }}
          >
            {logo && (
              <img
                src={logo}
                alt="Brand logo"
                className="h-8 w-8 object-contain rounded-full bg-white/85 p-1 mb-1 shadow"
              />
            )}
            <div
              className="text-[9px] tracking-[0.3em] font-bold"
              style={{ color: textColor, opacity: 0.85 }}
            >
              ELARAWAVE
            </div>
            <div
              className="font-extrabold text-lg leading-tight mt-1 line-clamp-2 px-1"
              style={{ color: textColor }}
            >
              {brand || "Your Brand"}
            </div>
            <div className="mt-2 h-0.5 w-10 rounded-full" style={{ background: textColor, opacity: 0.7 }} />
            <div
              className="mt-2 text-[9px] tracking-[0.25em]"
              style={{ color: textColor, opacity: 0.8 }}
            >
              {size.label} • ALKALINE
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PremiumBottlePreview({ logo }: { logo: string | null }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-6 w-[34%]">
      {/* cap — diameter matches body diameter */}
      <div className="h-8 w-full rounded-t-lg bg-gradient-to-b from-[#2A2A2A] to-black shadow-lg" />
      <div className="h-1.5 w-full bg-black/80" />
      {/* luxury straight-sided cylindrical body, no taper */}
      <motion.div
        key={logo ?? "premium-empty"}
        initial={{ opacity: 0, rotateY: 40 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mt-1 h-[calc(100%-3rem)] w-full rounded-[16px] bg-gradient-to-b from-[#16324A] via-[#0C2C48] to-black border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.06),0_25px_60px_-15px_rgba(0,0,0,0.55)] overflow-hidden flex items-center justify-center"
      >
        {/* subtle glass highlight */}
        <div className="absolute left-1.5 top-6 bottom-6 w-1 rounded-full bg-white/20 blur-[1px]" />
        <div className="absolute right-2 top-10 bottom-10 w-0.5 rounded-full bg-white/10 blur-[1px]" />

        {/* centered logo only — no wrap label, no printed banner */}
        {logo ? (
          <img
            src={logo}
            alt="Brand logo"
            className="h-14 w-14 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          />
        ) : (
          <div className="text-white/35 text-[9px] tracking-[0.3em] font-bold text-center px-3 leading-relaxed">
            UPLOAD
            <br />
            LOGO
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function BottleConfigurator() {
  const [bottleId, setBottleId] = useState<BottleId>("500ml");
  const [brand, setBrand] = useState("Your Brand");
  const [labelColor, setLabelColor] = useState(colorPresets[0].hex);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPremium = bottleId === "premium";
  const activeStandardSize = useMemo(
    () => standardBottles.find((b) => b.id === bottleId) ?? standardBottles[1],
    [bottleId]
  );

  function handleLogoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleColorInput(e: ChangeEvent<HTMLInputElement>) {
    setLabelColor(e.target.value);
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-bg-tint via-white to-bg-light" />
      <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-blue/20 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-green/20 blur-3xl -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">CUSTOMIZE</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-navy">
              Design your <span className="shine-text">own bottle</span>
            </h2>
            <p className="mt-4 text-text-muted">
              Choose a bottle, upload your logo, set your colors, and preview a real ELARAWAVE bottle wrapped in your identity.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Preview */}
          <Reveal as="scale">
            <div className="relative mx-auto w-full max-w-md aspect-[3/4] rounded-[40px] glass p-6 shine">
              <div className="relative h-full w-full rounded-[28px] bg-gradient-to-b from-sky/30 to-white/70 overflow-hidden">
                {isPremium ? (
                  <PremiumBottlePreview logo={logo} />
                ) : (
                  <StandardBottlePreview
                    size={activeStandardSize}
                    labelColor={labelColor}
                    brand={brand}
                    logo={logo}
                  />
                )}
              </div>
            </div>
          </Reveal>

          {/* Controls */}
          <Reveal as="right">
            <div className="glass-card p-8">
              {/* Bottle selector */}
              <div className="flex items-center gap-2 text-blue text-xs font-bold tracking-widest">
                <Palette className="h-4 w-4" /> BOTTLE TYPE
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-navy">Choose your bottle</h3>

              <div className="mt-5 grid grid-cols-4 gap-2.5">
                {standardBottles.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBottleId(b.id)}
                    className={`rounded-2xl py-3 px-2 border text-xs font-bold tracking-wide transition ${
                      bottleId === b.id
                        ? "border-blue ring-4 ring-blue/20 bg-white text-navy"
                        : "border-white/70 bg-white/60 text-text-muted hover:border-blue/50"
                    }`}
                  >
                    {b.shortLabel}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setBottleId("premium")}
                className={`mt-3 w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 px-4 border transition font-bold text-sm tracking-wide ${
                  isPremium
                    ? "border-navy ring-4 ring-navy/15 bg-navy text-white"
                    : "border-navy/15 bg-white/60 text-navy hover:bg-bg-light"
                }`}
              >
                <Gem className="h-4 w-4" /> {premiumBottle.label}
              </button>

              {/* Brand name — standard bottles only */}
              {!isPremium && (
                <div className="mt-6">
                  <label className="text-xs font-bold text-navy tracking-widest">YOUR BRAND</label>
                  <input
                    value={brand}
                    maxLength={22}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Type brand name…"
                    className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
                  />
                </div>
              )}

              {/* Logo upload — used on both bottle types */}
              <div className="mt-6">
                <label className="text-xs font-bold text-navy tracking-widest">
                  {isPremium ? "LOGO (CENTERED)" : "LOGO (ON LABEL)"}
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="bottle-logo-upload"
                  />
                  <label
                    htmlFor="bottle-logo-upload"
                    className="inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-white/80 border border-white/80 hover:border-blue/50 text-navy text-sm font-semibold cursor-pointer transition"
                  >
                    <Upload className="h-4 w-4" /> Upload logo
                  </label>
                  {logo && (
                    <div className="flex items-center gap-2">
                      <img
                        src={logo}
                        alt="Logo preview"
                        className="h-10 w-10 rounded-full object-contain bg-white border border-white/80 p-1"
                      />
                      <button
                        type="button"
                        onClick={() => setLogo(null)}
                        aria-label="Remove logo"
                        className="h-7 w-7 grid place-items-center rounded-full bg-white/80 border border-white/80 text-text-muted hover:text-navy transition"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Circular label color picker — standard bottles only */}
              {!isPremium ? (
                <div className="mt-6">
                  <label className="text-xs font-bold text-navy tracking-widest">LABEL COLOR</label>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {colorPresets.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setLabelColor(c.hex)}
                        title={c.name}
                        aria-label={c.name}
                        className={`h-9 w-9 rounded-full border-2 transition ${
                          labelColor.toLowerCase() === c.hex.toLowerCase()
                            ? "border-navy ring-4 ring-navy/15 scale-110"
                            : "border-white/80 hover:scale-105"
                        }`}
                        style={{ background: c.hex }}
                      />
                    ))}
                    {/* custom color — circular native picker */}
                    <label
                      title="Custom color"
                      className="relative h-9 w-9 rounded-full border-2 border-dashed border-navy/30 overflow-hidden cursor-pointer grid place-items-center bg-white/60 hover:border-blue/60 transition"
                    >
                      <span
                        className="absolute inset-1 rounded-full"
                        style={{ background: labelColor }}
                      />
                      <input
                        type="color"
                        value={labelColor}
                        onChange={handleColorInput}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        aria-label="Pick a custom label color"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <p className="mt-6 text-xs text-text-muted leading-relaxed bg-white/60 border border-white/70 rounded-xl px-4 py-3">
                  Premium bottles feature a clean, centered logo with a luxury cylindrical body —
                  no printed label or wrap color.
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="shine inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition">
                  <Sparkles className="h-4 w-4" /> Request a Sample
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-navy/15 text-navy font-semibold hover:bg-bg-light transition">
                  Save Design
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}