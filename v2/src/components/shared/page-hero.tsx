"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
    label: string;
    title: string;
    description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
    return (
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden bg-[var(--color-brand-dark)]">
            {/* Background gradient mesh */}
            <div className="absolute inset-0" aria-hidden="true">
                {/* Large soft orb — top left */}
                <motion.div
                    className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full opacity-30"
                    style={{
                        background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)",
                    }}
                    animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Medium orb — bottom right */}
                <motion.div
                    className="absolute -bottom-[20%] -right-[5%] w-[350px] h-[350px] rounded-full opacity-25"
                    style={{
                        background: "radial-gradient(circle, var(--color-brand-active) 0%, transparent 70%)",
                    }}
                    animate={{ x: [0, -25, 15, 0], y: [0, 20, -15, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Small gold accent orb */}
                <motion.div
                    className="absolute top-[30%] right-[20%] w-[120px] h-[120px] rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, var(--color-brand-gold) 0%, transparent 70%)",
                    }}
                    animate={{ x: [0, 20, -15, 0], y: [0, -25, 10, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Subtle dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-[1280px] px-6">
                <motion.p
                    className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {label}
                </motion.p>
                <motion.h1
                    className="font-bold tracking-tight leading-[1.1] text-white"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {title}
                </motion.h1>
                {description && (
                    <motion.p
                        className="mt-6 text-white/60 text-lg leading-relaxed max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
