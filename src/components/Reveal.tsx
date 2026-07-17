import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
  },
  left: {
    hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
  },
  right: {
    hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7 } },
  },
};

export function Reveal({
  children,
  as = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: keyof typeof variants;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[as]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={variants.up}>
      {children}
    </motion.div>
  );
}
