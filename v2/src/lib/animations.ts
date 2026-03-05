import type { Variants } from "framer-motion";

/**
 * Shared fade-up scroll animation variant.
 * Use with `custom={delayMultiplier}` to stagger children.
 */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 },
    }),
};
