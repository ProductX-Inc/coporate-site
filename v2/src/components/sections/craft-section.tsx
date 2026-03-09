"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";



export function CraftSection() {
    const { t } = useLang();
    return (
        <section className="py-28 md:py-40 bg-secondary/50 dark:bg-card/50 transition-colors duration-300">
            <div className="mx-auto max-w-[1280px] px-6">
                <motion.p
                    className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    custom={0} variants={fadeUp}
                >
                    {t("craft.label")}
                </motion.p>

                <motion.h2
                    className="text-2xl md:text-4xl font-bold tracking-tight leading-[1.2] mb-12"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    custom={0.5} variants={fadeUp}
                    style={{
                        background: "linear-gradient(135deg, var(--color-brand-active), var(--color-brand))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    {t("craft.title")}
                </motion.h2>

                {/* Bento Grid — 3 pillars */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Partner Growth */}
                    <motion.div
                        className="md:col-span-4 group relative p-8 md:p-10 rounded-2xl border border-border bg-gradient-to-br from-[var(--color-brand-active)] to-[var(--color-brand)] text-white overflow-hidden min-h-[300px] flex flex-col justify-between"
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        custom={1} variants={fadeUp}
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="absolute top-0 left-[-80%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[130%] transition-all duration-700" />
                        <div className="relative z-10">
                            <p className="text-sm text-white/60 tracking-[0.1em] uppercase mb-2">{t("craft.pg.label")}</p>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("craft.pg.title")}</h3>
                            <p className="text-white/80 leading-relaxed max-w-lg text-sm">{t("craft.pg.desc")}</p>
                        </div>
                        <Link href="/services" className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all mt-6 self-start">
                            {t("craft.pg.link")} <ArrowRight size={16} />
                        </Link>
                    </motion.div>

                    {/* AI DX */}
                    <motion.div
                        className="md:col-span-4 group relative p-8 md:p-10 rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.25_0.03_270)] to-[oklch(0.18_0.04_280)] text-white overflow-hidden min-h-[300px] flex flex-col justify-between dark:from-[oklch(0.22_0.04_270)] dark:to-[oklch(0.15_0.03_280)]"
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        custom={2} variants={fadeUp}
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="absolute top-0 left-[-80%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[130%] transition-all duration-700" />
                        <div className="relative z-10">
                            <p className="text-sm text-white/60 tracking-[0.1em] uppercase mb-2">{t("craft.ai.label")}</p>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("craft.ai.title")}</h3>
                            <p className="text-white/80 leading-relaxed max-w-lg text-sm">{t("craft.ai.desc")}</p>
                        </div>
                        <Link href="/services/ai-dx" className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all mt-6 self-start">
                            {t("craft.ai.link")} <ArrowRight size={16} />
                        </Link>
                    </motion.div>

                    {/* Original Product */}
                    <motion.div
                        className="md:col-span-4 group relative p-8 rounded-2xl border border-border bg-card overflow-hidden min-h-[300px] flex flex-col justify-between"
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                        custom={3} variants={fadeUp}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div>
                            <p className="text-sm text-muted-foreground tracking-[0.1em] uppercase mb-2">{t("craft.op.label")}</p>
                            <h3 className="text-xl font-bold mb-4">{t("craft.op.title")}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">{t("craft.op.desc")}</p>
                        </div>
                        <Badge className="self-start mt-6 bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-gold)]/90 font-bold text-xs tracking-wide">
                            {t("craft.op.badge")}
                        </Badge>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
