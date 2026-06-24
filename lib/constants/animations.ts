/**
 * Framer Motion animation variants
 */

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
} as const;

export const fadeInUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  },
});

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 },
} as const;

export const viewportConfig = {
  once: true,
  amount: 0.5,
} as const;

export const viewportConfigLow = {
  once: true,
  amount: 0,
} as const;
