"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function GradientDivider() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <div ref={ref} className="relative py-1 overflow-hidden">
            <motion.div
                className="h-px mx-auto"
                style={{
                    background: "linear-gradient(90deg, transparent, var(--color-brand-active) 25%, var(--color-brand) 50%, var(--color-brand-gold) 75%, transparent)",
                    opacity: 0.35,
                }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            />
        </div>
    );
}
