import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { motion } from "framer-motion";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ELARA WAVE | Premium Water Brand Moments" },
      {
        name: "description",
        content:
          "Explore the ELARA WAVE gallery — premium bottled water photography, brand moments, and behind-the-scenes visuals from our Lahore plant.",
      },
      { property: "og:title", content: "Gallery — ELARA WAVE" },
      {
        property: "og:description",
        content: "Premium bottled water moments captured with clarity.",
      },
    ],
  }),
  component: GalleryPage,
});

// Served directly from /public/images — not bundled/hashed by Vite
const portraitImages = Array.from({ length: 4 }, (_, i) => ({
  src: `/images/portrait-${i + 1}.webp`,
  alt: `ELARA WAVE gallery — portrait moment ${i + 1}`,
}));

const landscapeImages = Array.from({ length: 4 }, (_, i) => ({
  src: `/images/landscape-${i + 1}.webp`,
  alt: `ELARA WAVE gallery — landscape moment ${i + 1}`,
}));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-5 mb-10 sm:mb-12">
      <div className="h-px flex-1 max-w-[64px] bg-gradient-to-r from-transparent to-navy/25" />
      <div className="text-center">
        <p className="text-[11px] font-bold tracking-[0.35em] uppercase text-blue">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          {title}
        </h2>
      </div>
      <div className="h-px flex-1 max-w-[64px] bg-gradient-to-l from-transparent to-navy/25" />
    </div>
  );
}

function GalleryPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="OUR GALLERY"
        title={
          <>
            Moments of <span className="shine-text">pure freshness</span>
          </>
        }
        subtitle="A curated collection of ELARA WAVE — from crystal-clear bottles to the moments they bring alive."
      />

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-28 sm:pb-36">
        {/* soft ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(50% 60% at 20% 20%, rgba(105,182,74,0.16), transparent 70%), radial-gradient(50% 60% at 85% 40%, rgba(34,178,203,0.18), transparent 70%)",
          }}
        />

        {/* ---------------------------------------------------------- */}
        {/* Portrait section                                            */}
        {/* ---------------------------------------------------------- */}
        <SectionHeading
          eyebrow="Brand Portraits"
          title={
            <>
              Crafted in <span className="shine-text">every detail</span>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-5 sm:gap-7 grid-cols-2 lg:grid-cols-4"
        >
          {portraitImages.map((img, i) => (
            <motion.figure
              key={img.src}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-[28px] border border-white/70 bg-white/40 backdrop-blur-md shadow-[0_25px_55px_-25px_rgba(6,65,94,0.4)] hover:shadow-[0_40px_80px_-28px_rgba(14,116,167,0.55)] cursor-pointer transition-shadow duration-500"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
              />
              {/* classic vignette + inner hairline frame */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="pointer-events-none absolute inset-[6px] rounded-[22px] ring-1 ring-white/50" />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-navy/10" />
            </motion.figure>
          ))}
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/* Landscape section                                           */}
        {/* ---------------------------------------------------------- */}
        <div className="mt-20 sm:mt-28">
          <SectionHeading
            eyebrow="Behind the Scenes"
            title={
              <>
                Wide views, <span className="shine-text">clear water</span>
              </>
            }
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2"
          >
            {landscapeImages.map((img) => (
              <motion.figure
                key={img.src}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group relative aspect-[3/2] overflow-hidden rounded-[28px] border border-white/70 bg-white/40 backdrop-blur-md shadow-[0_25px_55px_-25px_rgba(6,65,94,0.4)] hover:shadow-[0_40px_80px_-28px_rgba(14,116,167,0.55)] cursor-pointer transition-shadow duration-500"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="pointer-events-none absolute inset-[6px] rounded-[22px] ring-1 ring-white/50" />
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-navy/10" />
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}