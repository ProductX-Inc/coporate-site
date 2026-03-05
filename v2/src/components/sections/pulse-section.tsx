"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";

const newsItems = [
    { date: "2026.03.01", title: { ja: "AI DX事業を本格始動しました", en: "Launched AI DX Business" }, slug: "ai-dx" },
    { date: "2025.05.05", title: { ja: "コーポレートサイトを公開しました", en: "Corporate Website Launched" }, slug: "website-launch" },
    { date: "2025.04.01", title: { ja: "パートナーグロース事業を開始しました", en: "Launched Partner Growth Business" }, slug: "partner-growth" },
    { date: "2025.03.14", title: { ja: "株式会社ProductXを設立しました", en: "ProductX Inc. Established" }, slug: "company-founded" },
];



// Double the items for seamless loop
const marqueeItems = [...newsItems, ...newsItems, ...newsItems];

export function PulseSection() {
    const prefersReduced = useReducedMotion();
    const { t, locale } = useLang();

    return (
        <section className="py-20 md:py-28 bg-background transition-colors duration-300 overflow-hidden">
            <div className="mx-auto max-w-[1280px] px-6 mb-8">
                <motion.p
                    className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    custom={0} variants={fadeUp}
                >
                    {t("pulse.label")}
                </motion.p>
                <motion.h2
                    className="text-2xl md:text-4xl font-bold tracking-tight"
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    custom={0.5} variants={fadeUp}
                >
                    {t("pulse.title")}
                </motion.h2>
            </div>

            {/* Marquee or Static */}
            {prefersReduced ? (
                /* Static fallback */
                <div className="mx-auto max-w-[1280px] px-6">
                    <div className="space-y-4">
                        {newsItems.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/news/${item.slug}`}
                                className="flex items-center gap-4 py-4 border-b border-border hover:text-[var(--color-brand-active)] dark:hover:text-[var(--color-brand)] transition-colors"
                            >
                                <time className="text-sm text-muted-foreground shrink-0">{item.date}</time>
                                <span className="text-sm font-medium">{locale === "ja" ? item.title.ja : item.title.en}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                /* Marquee band */
                <div className="border-y border-border py-6 group">
                    <motion.div
                        className="flex gap-16 whitespace-nowrap"
                        animate={{ x: [0, "-33.333%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        style={{ willChange: "transform" }}
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {marqueeItems.map((item, i) => (
                            <Link
                                key={`${item.slug}-${i}`}
                                href={`/news/${item.slug}`}
                                className="flex items-center gap-4 shrink-0 text-foreground/70 hover:text-foreground transition-colors"
                            >
                                <time className="text-xs text-muted-foreground">{item.date}</time>
                                <span className="text-sm font-medium">{locale === "ja" ? item.title.ja : item.title.en}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] opacity-40" />
                            </Link>
                        ))}
                    </motion.div>
                </div>
            )}

            <div className="mx-auto max-w-[1280px] px-6 mt-8">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    custom={1} variants={fadeUp}
                >
                    <Link
                        href="/news"
                        className="text-sm font-medium text-[var(--color-brand-active)] dark:text-[var(--color-brand)] hover:underline underline-offset-4 inline-flex items-center gap-1 group transition-colors"
                    >
                        {locale === "ja" ? "ニュース一覧" : "View All News"}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
