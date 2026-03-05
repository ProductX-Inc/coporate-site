"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[70] origin-left"
            style={{
                scaleX: scrollYProgress,
                background: "linear-gradient(90deg, var(--color-brand-active), var(--color-brand), var(--color-brand-gold))",
            }}
        />
    );
}
