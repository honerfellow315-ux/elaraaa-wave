import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Reveal } from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Upload,
  X,
  Wand2,
  Loader2,
  Check,
  RotateCw,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & static config                                              */
/* ------------------------------------------------------------------ */

/**
 * 6 real bottle photo assets (transparent PNG, background removed).
 * Update `image` paths to match where you place the real files, e.g.
 * public/images/bottles/bottle-1.png ... bottle-6.png
 *
 * `labelArea` positions the color/logo/brand overlay ON TOP of the real
 * photo so it looks printed onto the bottle. These percentages are
 * measured relative to the bottle's own bounding box (the <img>), so
 * tweak them per-asset until the overlay hugs the real label region in
 * your photo. (Left as-is for now — per-bottle placement tuning comes
 * in a follow-up pass.)
 *
 * Bottles #5 and #6 are the "Premium" bottles: isNoLabel = true — they
 * get no color/gradient wrap or banner at all, only a centered logo.
 */
interface BottleAsset {
  id: string;
  image: string;
  label: string;
  shortLabel: string;
  isNoLabel?: boolean;
  labelArea: { top: string; left: string; width: string; height: string };
  logoArea: { top: string; left: string; width: string; height: string };
}

const bottleAssets: BottleAsset[] = [
  {
    id: "bottle-1",
    image: "/images/bottles/bottle-1.png",
    label: "500 ML",
    shortLabel: "500ML",
    labelArea: { top: "53%", left: "26.5%", width: "46%", height: "30%" },
    logoArea: { top: "31%", left: "36%", width: "28%", height: "13%" },
  },
  {
    id: "bottle-2",
    image: "/images/bottles/bottle-2.png",
    label: "1.5 Liter",
    shortLabel: "1.5L",
    labelArea: { top: "56%", left: "28.5%", width: "45%", height: "28%" },
    logoArea: { top: "28%", left: "36%", width: "28%", height: "12%" },
  },
  {
    id: "bottle-3",
    image: "/images/bottles/bottle-3.png",
    label: "500 ML",
    shortLabel: "500ML",
    labelArea: { top: "31%", left: "26%", width: "47%", height: "20%" },
    logoArea: { top: "31%", left: "36%", width: "28%", height: "13%" },
  },
  {
    id: "bottle-4",
    image: "/images/bottles/bottle-4.png",
    label: "1.5 Liter",
    shortLabel: "1.5L",
    labelArea: { top: "25%", left: "25%", width: "47%", height: "22%" },
    logoArea: { top: "28%", left: "36%", width: "28%", height: "12%" },
  },
  {
    id: "bottle-5",
    image: "/images/bottles/bottle-5.png",
    label: "Premium 500 ML",
    shortLabel: "500ML",
    isNoLabel: true,
    labelArea: { top: "0%", left: "0%", width: "0%", height: "0%" },
    logoArea: { top: "40%", left: "35%", width: "30%", height: "20%" },
  },
  {
    id: "bottle-6",
    image: "/images/bottles/bottle-6.png",
    label: "Premium 1000 ML",
    shortLabel: "1000ML",
    isNoLabel: true,
    labelArea: { top: "0%", left: "0%", width: "0%", height: "0%" },
    logoArea: { top: "40%", left: "35%", width: "30%", height: "20%" },
  },
];

const colorPresets = [
  { name: "Navy", hex: "#123A5E" },
  { name: "Blue", hex: "#3E9AD6" },
  { name: "Sky", hex: "#6FC3E8" },
  { name: "Green", hex: "#6FB92C" },
  { name: "Sunrise", hex: "#F6B24A" },
  { name: "Coral", hex: "#E96A6A" },
];

const MAX_GRADIENT_COLORS = 3;

type Angle = "front" | "back" | "top" | "bottom";
const angles: { id: Angle; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "top", label: "Top" },
  { id: "bottom", label: "Bottom" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getContrastColor(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "#FFFFFF";
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? "#123A5E" : "#FFFFFF";
}

function buildGradient(colors: string[]): string {
  if (colors.length === 0) return colorPresets[0].hex;
  if (colors.length === 1) return colors[0];
  return `linear-gradient(135deg, ${colors.join(", ")})`;
}

/**
 * Backend stub — wire this to your Hugging Face endpoint later.
 * It should return 4 image URLs (or base64 strings), one per angle,
 * generated from the chosen bottle + label + logo + brand combination.
 */
async function generateWithAI(_payload: {
  bottleId: string;
  gradient: string;
  brand: string;
  logo: string | null;
}): Promise<Record<Angle, string>> {
  // TODO: replace with real call, e.g.
  // const res = await fetch("/api/generate-bottle", { method: "POST", body: JSON.stringify(_payload) });
  // const data = await res.json();
  // return data.images;
  await new Promise((resolve) => setTimeout(resolve, 2200));
  const asset = bottleAssets.find((b) => b.id === _payload.bottleId) ?? bottleAssets[0];
  return {
    front: asset.image,
    back: asset.image,
    top: asset.image,
    bottom: asset.image,
  };
}

/* Subtle grain texture, inlined so no extra asset is needed */
const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ------------------------------------------------------------------ */
/*  Bottle preview                                                     */
/* ------------------------------------------------------------------ */

function BottlePreview({
  asset,
  gradient,
  brand,
  logo,
  imageOverride,
}: {
  asset: BottleAsset;
  gradient: string;
  brand: string;
  logo: string | null;
  imageOverride?: string;
}) {
  const textColor = useMemo(() => {
    const first = gradient.startsWith("#") ? gradient : colorPresets[0].hex;
    return getContrastColor(first);
  }, [gradient]);

  return (
    <div className="relative h-full w-full">
      {/* Studio backdrop */}
      <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(255,255,255,0.9),rgba(230,240,246,0.4)_55%,rgba(200,220,232,0.15)_100%)]" />

      {/* Ground shadow */}
      <div className="absolute bottom-8 left-1/2 h-8 w-[46%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(18,58,94,0.4),transparent_75%)] blur-[6px]" />

      {/* Bottle + reflection stack */}
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-2 py-4">
        {/* Display frame — a fixed "stage" box. object-contain guarantees the
            bottle photo (including any invisible padding baked into the PNG)
            always scales DOWN to fit inside, so it can never overflow the
            glass card, while still rendering as large as the frame allows. */}
        <div className="relative h-[95%] w-[92%] max-w-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${asset.id}-${gradient}-${brand}-${logo ?? "no-logo"}-${imageOverride ?? "live"}`}
              initial={{ opacity: 0, y: 14, rotateY: 18 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              exit={{ opacity: 0, y: -10, rotateY: -18 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
              style={{ perspective: 900 }}
            >
              <img
                src={imageOverride ?? asset.image}
                alt={asset.label}
                className="absolute inset-0 z-10 h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(18,58,94,0.28)]"
                draggable={false}
              />

              {/* Color / gradient wrap label */}
              {!asset.isNoLabel && (
                <div
                  className="absolute z-20"
                  style={{
                    top: asset.labelArea.top,
                    left: asset.labelArea.left,
                    width: asset.labelArea.width,
                    height: asset.labelArea.height,
                    background: gradient,
                    // A genuine barrel silhouette — bulges outward at the
                    // vertical middle and tapers at the four corners, the
                    // way a label wrapped on a round bottle actually reads,
                    // instead of faking curvature with a flat rectangle.
                    clipPath:
  "polygon(0% 0%, 100% 0%, 103% 15%, 104% 50%, 103% 85%, 100% 100%, 0% 100%, -3% 85%, -4% 50%, -3% 15%)",
                  }}
                >
                  {/* Base falloff — soft darkening toward both edges so the
                      barrel silhouette reads as receding, not flat */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.05) 22%, transparent 50%, rgba(0,0,0,0.05) 78%, rgba(0,0,0,0.42) 100%)",
                    }}
                  />
                  {/* Specular streak — a real photographed highlight sits
                      off-center, not symmetric, which is what actually
                      reads as "round" to the eye */}
                  <div
                    className="pointer-events-none absolute inset-y-0"
                    style={{
                      left: "22%",
                      width: "20%",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                      filter: "blur(3px)",
                      mixBlendMode: "screen",
                    }}
                  />
                  {/* Gentle rim shadow where the label meets the cap/base curve */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[14%]"
                    style={{
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.28), transparent)",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%]"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.28), transparent)",
                    }}
                  />
                  {/* Fine grain for a premium printed-label feel */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: NOISE_BG }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-3 text-center">
                    {logo && (
                      <img
                        src={logo}
                        alt="Brand logo"
                        className="mb-1 h-6 w-6 rounded-full bg-white/90 object-contain p-1 shadow sm:h-8 sm:w-8"
                      />
                    )}
                    <div
                      className="font-serif text-[10px] font-semibold tracking-[0.35em] sm:text-xs"
                      style={{ color: textColor }}
                    >
                      {(brand || "YOUR BRAND").toUpperCase()}
                    </div>
                    <div
                      className="mt-1 h-px w-8 opacity-60"
                      style={{ background: textColor }}
                    />
                    <div
                      className="mt-1 text-[8px] tracking-[0.25em] opacity-80 sm:text-[9px]"
                      style={{ color: textColor }}
                    >
                      {asset.label} • ALKALINE
                    </div>
                  </div>
                </div>
              )}

              {/* No-label / no-banner bottles (Premium — #5 & #6): centered logo only */}
              {asset.isNoLabel && (
                <div
                  className="absolute z-20 flex items-center justify-center"
                  style={{
                    top: asset.logoArea.top,
                    left: asset.logoArea.left,
                    width: asset.logoArea.width,
                    height: asset.logoArea.height,
                  }}
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt="Brand logo"
                      className="h-full w-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
                    />
                  ) : (
                    <div className="rounded-full border border-navy/15 bg-white/40 px-3 py-2 text-center text-[8px] font-bold tracking-[0.3em] text-navy/40 backdrop-blur-sm">
                      UPLOAD LOGO
                    </div>
                  )}
                </div>
              )}

              {/* Global specular highlight over the whole bottle (glass/plastic sheen) */}
              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 28%, rgba(255,255,255,0.55) 44%, transparent 60%)",
                  mixBlendMode: "soft-light",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Reflection — sits just under the frame, sized to match it exactly */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-full h-[20%] overflow-hidden opacity-30"
            style={{
              transform: "scaleY(-1)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 80%)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 80%)",
            }}
          >
            <img
              src={imageOverride ?? asset.image}
              alt=""
              aria-hidden
              className="h-full w-full object-contain object-top"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function BottleConfigurator() {
  const [bottleId, setBottleId] = useState<string>(bottleAssets[0].id);
  const [brand, setBrand] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([colorPresets[0].hex]);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [generationStatus, setGenerationStatus] = useState<"idle" | "generating" | "done">(
    "idle"
  );
  const [generatedImages, setGeneratedImages] = useState<Record<Angle, string> | null>(null);
  const [activeAngle, setActiveAngle] = useState<Angle>("front");

  const asset = useMemo(
    () => bottleAssets.find((b) => b.id === bottleId) ?? bottleAssets[0],
    [bottleId]
  );
  const gradient = useMemo(() => buildGradient(selectedColors), [selectedColors]);

  // Reset a finished generation whenever the design changes, so the
  // preview always reflects the live config until the user re-generates.
  useEffect(() => {
    if (generationStatus === "done") {
      setGenerationStatus("idle");
      setGeneratedImages(null);
      setActiveAngle("front");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottleId, gradient, brand, logo]);

  function toggleColor(hex: string) {
    setSelectedColors((prev) => {
      if (prev.includes(hex)) return prev.filter((c) => c !== hex);
      if (prev.length >= MAX_GRADIENT_COLORS) return prev;
      return [...prev, hex];
    });
  }

  function handleLogoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleCustomColor(e: ChangeEvent<HTMLInputElement>) {
    const hex = e.target.value;
    setSelectedColors((prev) => {
      const withoutCustomSlot = prev.slice(0, MAX_GRADIENT_COLORS - 1);
      return [...withoutCustomSlot, hex];
    });
  }

  const canEnhance = asset.isNoLabel
    ? Boolean(logo)
    : Boolean(logo) && brand.trim().length > 0 && selectedColors.length > 0;

  async function handleGenerate() {
    if (!canEnhance || generationStatus === "generating") return;
    setGenerationStatus("generating");
    const images = await generateWithAI({ bottleId, gradient, brand, logo });
    setGeneratedImages(images);
    setGenerationStatus("done");
    setActiveAngle("front");
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
              Choose a real ELARAWAVE bottle, blend your brand colors, drop in your logo, and
              preview it studio-lit from every angle.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          {/* Preview */}
          <Reveal as="scale">
            <div className="sticky top-24">
              <div className="relative mx-auto w-full max-w-md aspect-[3/5] rounded-[40px] glass p-6 shine">
                <div className="relative h-full w-full rounded-[28px] overflow-hidden">
                  <BottlePreview
                    asset={asset}
                    gradient={gradient}
                    brand={brand}
                    logo={logo}
                    imageOverride={
                      generationStatus === "done" && generatedImages
                        ? generatedImages[activeAngle]
                        : undefined
                    }
                  />

                  {/* Generating overlay */}
                  <AnimatePresence>
                    {generationStatus === "generating" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-navy/70 backdrop-blur-sm"
                      >
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                        <p className="text-xs font-bold tracking-[0.3em] text-white">
                          GENERATING WITH AI…
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Multi-angle viewer */}
              <AnimatePresence>
                {generationStatus === "done" && generatedImages && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="mt-5 flex items-center justify-center gap-2"
                  >
                    {angles.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setActiveAngle(a.id)}
                        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold tracking-widest transition ${
                          activeAngle === a.id
                            ? "bg-navy text-white"
                            : "bg-white/70 text-navy border border-navy/10 hover:bg-white"
                        }`}
                      >
                        <RotateCw className="h-3 w-3" />
                        {a.label.toUpperCase()}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Controls */}
          <Reveal as="right">
            <div className="glass-card p-8">
              {/* Bottle selector — real asset thumbnails, portrait cards */}
              <div className="flex items-center gap-2 text-blue text-xs font-bold tracking-widest">
                <Sparkles className="h-4 w-4" /> BOTTLE TYPE
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-navy">Choose your bottle</h3>

              <div className="mt-5 grid grid-cols-4 gap-2">
                {bottleAssets.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBottleId(b.id)}
                    className={`group relative flex flex-col items-center gap-1 rounded-xl border p-1.5 transition ${
                      bottleId === b.id
                        ? "border-blue ring-4 ring-blue/20 bg-white"
                        : "border-white/70 bg-white/60 hover:border-blue/50"
                    }`}
                  >
                    {/* Portrait thumbnail frame — narrow & tall, still small overall */}
                    <div className="relative aspect-[3/5] w-full overflow-hidden rounded-lg bg-gradient-to-b from-white/60 to-white/20">
                      <img
                        src={b.image}
                        alt={b.label}
                        className="absolute inset-0 h-full w-full object-contain p-0.5"
                        draggable={false}
                      />
                    </div>
                    <span
                      className={`text-[9px] font-bold tracking-wide ${
                        bottleId === b.id ? "text-navy" : "text-text-muted"
                      }`}
                    >
                      {b.shortLabel}
                    </span>
                  </button>
                ))}
              </div>

              {/* Brand name — hidden for the no-label Premium bottles (#5, #6) */}
              {!asset.isNoLabel && (
                <div className="mt-6">
                  <label className="text-xs font-bold text-navy tracking-widest">YOUR BRAND</label>
                  <input
                    value={brand}
                    maxLength={22}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Type brand name…"
                    className="mt-2 w-full h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy font-serif tracking-wide"
                  />
                </div>
              )}

              {/* Logo upload — used on every bottle type */}
              <div className="mt-6">
                <label className="text-xs font-bold text-navy tracking-widest">
                  {asset.isNoLabel ? "LOGO (ENGRAVED, CENTERED)" : "LOGO (ON LABEL)"}
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

              {/* Multi-select gradient color circles — hidden for Premium bottles (#5, #6) */}
              {!asset.isNoLabel ? (
                <div className="mt-6">
                  <label className="text-xs font-bold text-navy tracking-widest">
                    LABEL COLORS <span className="text-navy/40">(pick up to 3 to blend)</span>
                  </label>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {colorPresets.map((c) => {
                      const active = selectedColors.includes(c.hex);
                      return (
                        <button
                          key={c.hex}
                          type="button"
                          onClick={() => toggleColor(c.hex)}
                          title={c.name}
                          aria-label={c.name}
                          className={`relative h-9 w-9 rounded-full border-2 transition ${
                            active
                              ? "border-navy ring-4 ring-navy/15 scale-110"
                              : "border-white/80 hover:scale-105"
                          }`}
                          style={{ background: c.hex }}
                        >
                          {active && (
                            <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                          )}
                        </button>
                      );
                    })}
                    {/* custom color — circular native picker, fills last gradient slot */}
                    <label
                      title="Custom color"
                      className="relative h-9 w-9 rounded-full border-2 border-dashed border-navy/30 overflow-hidden cursor-pointer grid place-items-center bg-white/60 hover:border-blue/60 transition"
                    >
                      <span
                        className="absolute inset-1 rounded-full"
                        style={{
                          background:
                            selectedColors[selectedColors.length - 1] ?? colorPresets[0].hex,
                        }}
                      />
                      <input
                        type="color"
                        onChange={handleCustomColor}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        aria-label="Pick a custom label color"
                      />
                    </label>
                  </div>

                  {/* Live gradient strip preview */}
                  <div
                    className="mt-3 h-3 w-full rounded-full border border-white/70 shadow-inner"
                    style={{ background: gradient }}
                  />
                </div>
              ) : (
                <p className="mt-6 text-xs text-text-muted leading-relaxed bg-white/60 border border-white/70 rounded-xl px-4 py-3">
                  This Premium bottle ships in a fixed frosted-glass finish with an engraved,
                  centered logo — no printed label, banner, or color wrap.
                </p>
              )}

              {/* Enhance with AI — only appears once the design is complete */}
              <AnimatePresence>
                {canEnhance && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={generationStatus === "generating"}
                      className="shine mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy via-blue to-teal px-5 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {generationStatus === "generating" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4" /> Enhance with AI
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 flex flex-wrap gap-3">
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