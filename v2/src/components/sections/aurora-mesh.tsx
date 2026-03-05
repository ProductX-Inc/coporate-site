"use client";

import { motion } from "framer-motion";

const orbs = [
    {
        className: "w-[500px] h-[500px] bg-[var(--color-brand)] top-[-10%] left-[-5%]",
        x: [0, 80, -40, 60, -20, 0],
        y: [0, -60, 40, -30, 50, 0],
        scale: [1, 1.15, 0.9, 1.1, 0.95, 1],
        duration: 22,
    },
    {
        className: "w-[400px] h-[400px] bg-[var(--color-brand-active)] bottom-[-10%] right-[-5%]",
        x: [0, -60, 30, -80, 20, 0],
        y: [0, 50, -40, 20, -60, 0],
        scale: [1, 0.9, 1.12, 0.95, 1.08, 1],
        duration: 26,
    },
    {
        className: "w-[300px] h-[300px] bg-[#8B5CF6] top-[40%] left-[50%]",
        x: [0, -70, 50, -30, 70, 0],
        y: [0, 40, -60, 70, -20, 0],
        scale: [1, 1.1, 0.88, 1.15, 0.92, 1],
        duration: 20,
    },
    {
        className: "w-[180px] h-[180px] bg-[var(--color-brand-gold)] top-[20%] right-[25%]",
        x: [0, 60, -90, 40, -50, 0],
        y: [0, -70, 30, -50, 60, 0],
        scale: [1, 1.2, 0.85, 1.1, 0.9, 1],
        duration: 18,
    },
];

export function AuroraMesh({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-[80px] opacity-40 ${orb.className}`}
                    animate={{
                        x: orb.x,
                        y: orb.y,
                        scale: orb.scale,
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    }}
                />
            ))}
        </div>
    );
}
