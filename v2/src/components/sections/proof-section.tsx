"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles, Palette, Rocket } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";



export function ProofSection() {
    const { t, locale } = useLang();
    const tiles = [
        { label: t("proof.tile1.label"), desc: t("proof.tile1.desc"), icon: Users },
        { label: t("proof.tile2.label"), desc: t("proof.tile2.desc"), icon: Sparkles },
        { label: t("proof.tile3.label"), desc: t("proof.tile3.desc"), icon: Palette },
        { label: t("proof.tile4.label"), desc: t("proof.tile4.desc"), icon: Rocket },
    ];

    return (
        <section className="py-28 md:py-40 bg-background bg-dot-pattern transition-colors duration-300">
            <div className="mx-auto max-w-[1280px] px-6">
                <motion.p
                    className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    custom={0} variants={fadeUp}
                >
                    {t("proof.label")}
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)] ml-2 align-middle" />
                </motion.p>

                <motion.h2
                    className="text-2xl md:text-4xl font-bold tracking-tight leading-[1.2] mb-16 max-w-2xl whitespace-pre-line"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    custom={0.5} variants={fadeUp}
                    style={{
                        background: "linear-gradient(135deg, var(--color-brand-active) 0%, var(--color-brand) 50%, oklch(0.7 0.15 85) 100%)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        animation: "gradient-shift 6s ease-in-out infinite",
                    }}
                >
                    {t("proof.title")}
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiles.map((tile, i) => {
                        const Icon = tile.icon;
                        return (
                            <motion.div
                                key={tile.label}
                                className="group relative p-6 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 hover:shadow-[0_0_30px_rgba(105,108,255,0.08)] transition-all duration-400 overflow-hidden"
                                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                                custom={i + 1} variants={fadeUp}
                                whileHover={{ y: -4 }}
                            >
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-brand-gold)]/60 via-[var(--color-brand)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                <span className="text-[56px] font-bold text-foreground/[0.08] absolute top-4 right-4 leading-none select-none">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center mb-4">
                                    <Icon size={20} className="text-[var(--color-brand-active)] dark:text-[var(--color-brand)]" />
                                </div>
                                <h3 className="text-sm font-semibold tracking-tight text-foreground mb-2">
                                    {tile.label}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {tile.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    className="mt-10"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    custom={5} variants={fadeUp}
                >
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand-active)] dark:text-[var(--color-brand)] hover:underline underline-offset-4"
                    >
                        {locale === "ja" ? "私たちについて" : "About Us"} <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
