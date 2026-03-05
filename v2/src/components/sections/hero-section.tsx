"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { AuroraMesh } from "@/components/sections/aurora-mesh";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/lang-provider";

const springPop = { type: "spring" as const, damping: 18, stiffness: 90 };

/* ── Particle generation (deterministic) ── */
function generateParticles(count: number) {
    const particles = [];
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const distance = 300 + (i * 137.5) % 500; // golden ratio scatter
        particles.push({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            size: 2 + (i % 4),
            delay: (i % 8) * 0.06,
            color: i % 3 === 0 ? "rgba(254,198,101,0.8)" : i % 3 === 1 ? "rgba(105,108,255,0.8)" : "rgba(139,92,246,0.7)",
        });
    }
    return particles;
}

export function HeroSection() {
    const { t } = useLang();
    const sectionRef = useRef<HTMLElement>(null);
    const [phase, setPhase] = useState(0);
    const particles = useMemo(() => generateParticles(32), []);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 200),
            setTimeout(() => setPhase(2), 1000),
            setTimeout(() => setPhase(3), 3500),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const titleText = t("hero.title");

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-brand-dark)]">







            {/* ══ Central light burst (2 layers) ══ */}
            <AnimatePresence>
                {phase >= 1 && phase < 3 && (
                    <motion.div
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(105,108,255,0.6) 0%, rgba(139,92,246,0.3) 30%, rgba(254,198,101,0.15) 60%, transparent 80%)",
                            }}
                            initial={{ width: 0, height: 0, opacity: 1 }}
                            animate={{ width: "250vmax", height: "250vmax", opacity: 0 }}
                            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(105,108,255,0.5) 30%, transparent 60%)",
                            }}
                            initial={{ width: 0, height: 0, opacity: 1 }}
                            animate={{ width: "100vmax", height: "100vmax", opacity: 0 }}
                            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══ Expanding golden ring ══ */}
            <AnimatePresence>
                {phase >= 1 && phase < 3 && (
                    <motion.div
                        className="absolute inset-0 z-[19] flex items-center justify-center pointer-events-none"
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute rounded-full border-2 border-[var(--color-brand-gold)]/60"
                            initial={{ width: 0, height: 0, opacity: 1, rotate: 0 }}
                            animate={{ width: "120vmax", height: "120vmax", opacity: 0, rotate: 90 }}
                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <motion.div
                            className="absolute rounded-full border border-[var(--color-brand)]/40"
                            initial={{ width: 0, height: 0, opacity: 1, rotate: 0 }}
                            animate={{ width: "80vmax", height: "80vmax", opacity: 0, rotate: -60 }}
                            transition={{ duration: 2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══ Particle explosion ══ */}
            <AnimatePresence>
                {phase >= 1 && phase < 3 && (
                    <motion.div
                        className="absolute inset-0 z-[17] flex items-center justify-center pointer-events-none"
                        exit={{ opacity: 0, transition: { duration: 0.6 } }}
                    >
                        {particles.map((p, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: p.size,
                                    height: p.size,
                                    background: p.color,
                                    boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                                }}
                                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                animate={{
                                    x: p.x,
                                    y: p.y,
                                    opacity: [0, 1, 0.8, 0],
                                    scale: [0, 1.5, 1, 0],
                                }}
                                transition={{
                                    duration: 1.8,
                                    delay: p.delay,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══ Light rays ══ */}
            <AnimatePresence>
                {phase >= 1 && phase < 3 && (
                    <motion.div
                        className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1 } }}
                    >
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{
                                    width: i % 3 === 0 ? "3px" : "1.5px",
                                    height: "50vh",
                                    background: `linear-gradient(to top, transparent, ${i % 3 === 0 ? "rgba(254,198,101,0.6)" : i % 3 === 1 ? "rgba(105,108,255,0.5)" : "rgba(139,92,246,0.4)"}, transparent)`,
                                    transformOrigin: "bottom center",
                                    rotate: `${i * 30}deg`,
                                }}
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: [0, 1, 0.6], opacity: [0, 0.9, 0] }}
                                transition={{
                                    duration: 1.5,
                                    delay: 0.08 + i * 0.03,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══ Double lens flare sweep ══ */}
            <AnimatePresence>
                {phase >= 1 && phase < 3 && (
                    <motion.div
                        className="absolute inset-0 z-[18] pointer-events-none overflow-hidden"
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    >
                        <motion.div
                            className="absolute top-[48%] h-[3px] w-[70%]"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), rgba(254,198,101,0.7), rgba(105,108,255,0.5), transparent)",
                            }}
                            initial={{ left: "-70%", opacity: 0 }}
                            animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <motion.div
                            className="absolute top-[52%] h-[1px] w-[50%]"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(255,255,255,0.6), transparent)",
                            }}
                            initial={{ left: "120%", opacity: 0 }}
                            animate={{ left: "-50%", opacity: [0, 0.8, 0.8, 0] }}
                            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══ Aurora orbs — burst from center ══ */}
            <motion.div
                className="absolute inset-0"
                style={{ y: bgY }}
                initial={{ scale: 4, opacity: 0, filter: "blur(40px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                <AuroraMesh />
            </motion.div>

            {/* ══ Content ══ */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-4xl mx-auto"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                {/* Title — per-character 3D reveal */}
                <motion.h1
                    className="font-[var(--font-en)] text-white font-bold leading-[1.05] tracking-[-0.02em]"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", perspective: "800px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.01 }}
                >
                    {titleText.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            className="inline-block"
                            style={{ whiteSpace: char === " " ? "pre" : undefined }}
                            initial={{ opacity: 0, y: 80, rotateX: -90, scale: 0.3, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
                            transition={{
                                duration: 0.7,
                                delay: 1.0 + i * 0.035,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Decorative line under title */}
                <motion.div
                    className="mx-auto mt-4 h-[2px] rounded-full"
                    style={{
                        background: "linear-gradient(90deg, transparent, var(--color-brand-active), var(--color-brand-gold), var(--color-brand), transparent)",
                    }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Subtitle */}
                <motion.p
                    className="mt-6 text-white/70 text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
                >
                    {t("hero.sub")}
                </motion.p>

                {/* CTA Button — spring bounce */}
                <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 40, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 2.2, ...springPop }}
                >
                    <Link href="/contact">
                        <MagneticButton className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold text-base hover:bg-[var(--color-brand)] transition-colors duration-300 shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative z-10 flex items-center gap-2">
                                {t("hero.cta")} <ArrowRight size={18} />
                            </span>
                        </MagneticButton>
                    </Link>
                </motion.div>
            </motion.div>

            {/* ══ Scroll indicator ══ */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.8 }}
            >
                <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-medium">
                    {t("hero.scroll")}
                </span>
                <div className="w-px h-10 bg-white/15 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-[var(--color-brand)]"
                        animate={phase >= 3 ? { y: ["-100%", "100%"] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: [0.77, 0, 0.175, 1] as const }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
