/**
 * perf-mode.ts
 * ------------------------------------------------------------------
 * Detects whether the visitor's device is "low-end" and toggles a
 * CSS class on <html> so styles.css can automatically dial down the
 * most expensive visual effects (backdrop-blur, filter:blur, and
 * infinite looping particle/orb animations) for those users only.
 *
 * Nothing about the animations themselves changes for capable
 * devices — this only affects devices detected as low-end.
 *
 * How it works:
 *   1. Fast synchronous checks (CPU cores, RAM, network speed,
 *      prefers-reduced-motion) run immediately -> class applied
 *      before first paint, no flash of heavy effects.
 *   2. A short real FPS sample (requestAnimationFrame for ~600ms)
 *      runs right after, in case the quick checks were wrong
 *      (e.g. a device reports many cores but is still choking) ->
 *      class gets corrected if needed.
 *   3. Result is cached in sessionStorage so we don't re-run the
 *      FPS test on every page navigation in the same visit.
 */

const CACHE_KEY = "ew_perf_tier";
const LOW = "perf-low";
const HIGH = "perf-high";

type Tier = "low" | "high";

function quickHeuristic(): Tier {
  if (typeof window === "undefined") return "high";

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  let lowSignals = 0;
  let totalSignals = 0;

  // CPU cores
  if (typeof nav.hardwareConcurrency === "number") {
    totalSignals++;
    if (nav.hardwareConcurrency <= 4) lowSignals++;
  }

  // RAM (Chrome/Android only, undefined elsewhere)
  if (typeof nav.deviceMemory === "number") {
    totalSignals++;
    if (nav.deviceMemory <= 4) lowSignals++;
  }

  // Network conditions (slow network often correlates with low-end/budget devices)
  if (nav.connection) {
    totalSignals++;
    if (nav.connection.saveData || /^(slow-2g|2g|3g)$/.test(nav.connection.effectiveType ?? "")) {
      lowSignals++;
    }
  }

  // User explicitly asked OS/browser to reduce motion
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return "low"; // hard override, always respect this one
  }

  if (totalSignals === 0) return "high"; // can't tell, assume capable
  return lowSignals / totalSignals >= 0.5 ? "low" : "high";
}

function applyTier(tier: Tier) {
  const root = document.documentElement;
  root.classList.remove(LOW, HIGH);
  root.classList.add(tier === "low" ? LOW : HIGH);
}

function measureFps(sampleMs = 600): Promise<number> {
  return new Promise((resolve) => {
    let frames = 0;
    let start = 0;

    function tick(t: number) {
      if (!start) start = t;
      frames++;
      if (t - start < sampleMs) {
        requestAnimationFrame(tick);
      } else {
        resolve((frames / (t - start)) * 1000);
      }
    }
    requestAnimationFrame(tick);
  });
}

export function initPerfMode() {
  if (typeof window === "undefined") return;

  // 1. Instant decision from cache or quick heuristic (no flash)
  const cached = sessionStorage.getItem(CACHE_KEY) as Tier | null;
  const initialTier = cached ?? quickHeuristic();
  applyTier(initialTier);

  // 2. Refine with a real FPS sample shortly after load, unless the
  //    user already forced reduced motion (respect that unconditionally)
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    sessionStorage.setItem(CACHE_KEY, "low");
    return;
  }

  if (cached) return; // already measured this session

  window.requestIdleCallback?.(() => {
    measureFps().then((fps) => {
      const finalTier: Tier = fps < 45 ? "low" : "high";
      applyTier(finalTier);
      sessionStorage.setItem(CACHE_KEY, finalTier);
    });
  }) ?? measureFps().then((fps) => {
    const finalTier: Tier = fps < 45 ? "low" : "high";
    applyTier(finalTier);
    sessionStorage.setItem(CACHE_KEY, finalTier);
  });
}
