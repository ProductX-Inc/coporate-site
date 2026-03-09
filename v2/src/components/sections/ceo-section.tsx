"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";

const careerBadges = [
    { ja: "東北大学", en: "Tohoku Univ." },
    { ja: "CyberAgent", en: "CyberAgent" },
    { ja: "MIXI", en: "MIXI" },
    { ja: "CPO経験", en: "Ex-CPO" },
];

export function CeoSection() {
    const { t, locale } = useLang();

    const quote = locale === "ja"
        ? "「本当に価値あるプロダクトとは何か」——この問いと向き合い続けることが、ProductXの原点です。課題の発見から解決まで、上流から下流までワンチームで伴走し、プロダクトを通じてクライアントの事業を成長させること。そして、AIの力で企業の変革を加速させること。それが私たちの使命です。"
        : "\"What does a truly valuable product look like?\" — Continuously confronting this question is the origin of ProductX. Our mission is to partner end-to-end from problem discovery to solution, growing our clients' businesses through products and accelerating transformation with the power of AI.";

    return (
        <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
            <div className="mx-auto max-w-[1280px] px-6">
                <motion.p
                    className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-10"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    custom={0} variants={fadeUp}
                >
                    CEO MESSAGE
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)] ml-2 align-middle" />
                </motion.p>

                <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start">
                    <motion.div
                        className="flex flex-row md:flex-col items-center md:items-start gap-5 shrink-0"
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        custom={0.5} variants={fadeUp}
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[var(--color-brand-active)] to-[var(--color-brand)] flex items-center justify-center shadow-lg shadow-[var(--color-brand)]/20 shrink-0">
                            <User size={36} className="text-white/90" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="font-bold text-base tracking-tight">{t("about.ceo.name")}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{t("about.ceo.role")}</p>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {careerBadges.map((badge) => (
                                    <span
                                        key={badge.en}
                                        className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full border border-border bg-secondary/50 text-muted-foreground whitespace-nowrap"
                                    >
                                        {locale === "ja" ? badge.ja : badge.en}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1"
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        custom={1} variants={fadeUp}
                    >
                        <div className="relative">
                            <span className="absolute -top-6 -left-2 text-[64px] font-serif leading-none text-[var(--color-brand-gold)]/25 select-none pointer-events-none">&ldquo;</span>
                            <p className="text-sm md:text-base text-foreground/80 leading-[2] relative z-10">
                                {quote}
                            </p>
                        </div>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-[var(--color-brand-active)] dark:text-[var(--color-brand)] hover:underline underline-offset-4"
                        >
                            {locale === "ja" ? "詳しく見る" : "Read More"} <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
