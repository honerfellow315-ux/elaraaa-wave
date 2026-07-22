import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle2, MessageSquareQuote } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { endpoints, type Review, ApiError } from "@/lib/api";

/**
 * Google Reviews — premium glassmorphism section.
 * Consumes GET /api/reviews and POST /api/reviews via VITE_API_URL.
 * No hardcoded data — shows a graceful empty state until the backend is wired.
 */
export function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    endpoints
      .reviews()
      .then((r) => {
        if (!cancelled) setReviews(Array.isArray(r) ? r : []);
      })
      .catch((e) => {
        if (cancelled) return;
        setReviews([]);
        setLoadError(
          e instanceof ApiError ? e.message : "Reviews backend not reachable yet.",
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg,#F4FAFB 0%,#FFFFFF 55%,#EEF9F4 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-60 -z-10"
        style={{ background: "radial-gradient(circle,rgba(34,178,203,0.35),transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-60 -z-10"
        style={{ background: "radial-gradient(circle,rgba(105,182,74,0.35),transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] text-blue">GOOGLE REVIEWS</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-navy">
              Loved by <span className="shine-text">thousands</span> across Lahore
            </h2>
            <p className="mt-4 text-text-muted">
              Real reviews from real customers, streamed live from Google — plus your own words below.
            </p>
          </div>
        </Reveal>

        {reviews === null ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="glass-card p-6 h-56 animate-pulse bg-white/50"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="mt-14 glass-card p-10 text-center max-w-2xl mx-auto">
            <MessageSquareQuote className="mx-auto h-8 w-8 text-blue" />
            <p className="mt-3 font-bold text-navy">Reviews will appear here</p>
            <p className="mt-1 text-sm text-text-muted">
              Connect your backend to <code className="px-1 rounded bg-bg-light">GET /api/reviews</code> and
              your live Google reviews will populate this section automatically.
            </p>
            {loadError && (
              <p className="mt-2 text-xs text-text-muted/70">{loadError}</p>
            )}
          </div>
        ) : (
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {reviews.map((r) => (
              <StaggerItem key={r.id}>
                <ReviewCard review={r} />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <div className="mt-16">
          <SubmitReviewForm />
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.author
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="glass-card h-full p-6 flex flex-col border border-white/70 shadow-[0_20px_50px_-25px_rgba(6,65,94,0.35)]"
    >
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.author}
            loading="lazy"
            className="h-11 w-11 rounded-full object-cover border border-white/80"
            width={44}
            height={44}
          />
        ) : (
          <div className="h-11 w-11 rounded-full grid place-items-center bg-brand text-white font-bold text-sm">
            {initials || "EW"}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <div className="font-bold text-navy truncate">{review.author}</div>
            {review.source === "google" && (
              <span
                title="Posted on Google"
                className="shrink-0 inline-flex items-center rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold text-text-muted border border-navy/10"
              >
                G
              </span>
            )}
          </div>
          <div className="text-xs text-text-muted">{review.date}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(review.rating)
                ? "fill-green text-green"
                : "text-navy/20"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-sm text-text-muted line-clamp-6">{review.text}</p>
    </motion.article>
  );
}

function SubmitReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await endpoints.submitReview({ name, rating, text });
      setDone(true);
      setName("");
      setRating(5);
      setText("");
      setTimeout(() => setDone(false), 5000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Reveal>
      <form
        onSubmit={onSubmit}
        className="glass-card p-6 sm:p-8 border border-white/70 max-w-3xl mx-auto"
      >
        <div className="grid gap-2 text-center mb-6">
          <p className="text-xs font-bold tracking-[0.3em] text-blue">SHARE YOUR EXPERIENCE</p>
          <h3 className="text-2xl font-extrabold text-navy">Leave a review</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-12 px-4 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy"
          />
          <div className="flex items-center justify-between h-12 px-4 rounded-xl bg-white/80 border border-white/80">
            <span className="text-xs font-bold tracking-widest text-navy">RATING</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  aria-label={`Rate ${i + 1} stars`}
                >
                  <Star
                    className={`h-5 w-5 transition ${
                      i < rating ? "fill-green text-green" : "text-navy/25"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Tell us about your ELARA WAVE experience…"
          className="mt-4 w-full px-4 py-3 rounded-xl bg-white/80 border border-white/80 focus:border-blue focus:outline-none text-navy resize-none"
        />
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-semibold hover:-translate-y-0.5 transition disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {submitting ? "Sending…" : "Submit review"}
          </button>
          {done && (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-green">
              <CheckCircle2 className="h-4 w-4" /> Thanks — your review has been submitted.
            </span>
          )}
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
      </form>
    </Reveal>
  );
}