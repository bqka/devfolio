import { Variants } from "framer-motion";

/* -----------------------------
   Page-level
-------------------------------- */

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: -24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 24,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

/* -----------------------------
   Simple fade up
-------------------------------- */

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/* -----------------------------
   Stagger container
-------------------------------- */

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/* -----------------------------
   Text reveal (right → left)
   with clipping / masking
-------------------------------- */

export const textRevealRight: Variants = {
  hidden: {
    x: 40,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -----------------------------
   Subtle hover scale
-------------------------------- */

export const hoverScale = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.96 },
};
