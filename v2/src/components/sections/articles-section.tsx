"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import type { ArticleMeta } from "@/lib/articles-constants";

interface Props {
    articles: (ArticleMeta & { area: string })[];
}

export function ArticlesSection({ articles }: Props) {
    const { t } = useLang();

    return (
        <section className="py-20 md:py-28 bg-background transition-colors duration-300">
            <div className="mx-auto max-w-[1280px] px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    custom={0}
                >
                    <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6">
                        {t("articles.insights")}
                    </p>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-12">
                        {t("articles.title")}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={article.slug}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={idx + 1}
                            variants={fadeUp}
                        >
                            <Link
                                href={`/articles/${article.area}/${article.slug}`}
                                className="group block h-full p-6 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 hover:shadow-[0_0_30px_rgba(105,108,255,0.06)] transition-all duration-300"
                            >
                                <time className="text-xs text-[var(--color-brand-gold)]">
                                    {article.date}
                                </time>
                                <h3 className="mt-2 text-base font-semibold leading-snug group-hover:text-[var(--color-brand-active)] dark:group-hover:text-[var(--color-brand)] transition-colors mb-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {article.description}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={4}
                    variants={fadeUp}
                >
                    <Link
                        href="/articles"
                        className="text-sm font-medium text-[var(--color-brand-active)] dark:text-[var(--color-brand)] hover:underline underline-offset-4 inline-flex items-center gap-1 group transition-colors"
                    >
                        {t("articles.viewAll")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
