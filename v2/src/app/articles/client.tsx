"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { fadeUp } from "@/lib/animations";
import type { ArticleMeta, ServiceAreaInfo } from "@/lib/articles-constants";

interface Props {
    areas: (ServiceAreaInfo & { articles: ArticleMeta[] })[];
}

export function ArticlesLandingClient({ areas }: Props) {
    return (
        <>
            <Header />
            <main>
                <PageHero
                    label="ARTICLES"
                    title="Insights & Knowledge"
                    description="プロダクト開発・AI DXに関する最新のナレッジをお届けします。"
                />

                <section className="py-16 md:py-24 bg-background">
                    <div className="mx-auto max-w-[1280px] px-6 space-y-20">
                        {areas.map((area, idx) => (
                            <motion.div
                                key={area.key}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={idx}
                                variants={fadeUp}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold flex items-center gap-3">
                                            <span className={`inline-block w-1 h-7 rounded-full bg-gradient-to-b ${area.color}`} />
                                            {area.label.ja}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1.5">
                                            {area.description.ja}
                                        </p>
                                    </div>
                                    {area.articles.length > 0 && (
                                        <Link
                                            href={`/articles/${area.key}`}
                                            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-active)] transition-colors"
                                        >
                                            すべての記事を見る
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>

                                {area.articles.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {area.articles.map((article) => (
                                                <Link
                                                    key={article.slug}
                                                    href={`/articles/${area.key}/${article.slug}`}
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
                                            ))}
                                        </div>
                                        <div className="mt-6 md:hidden">
                                            <Link
                                                href={`/articles/${area.key}`}
                                                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand)]"
                                            >
                                                すべての記事を見る
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-12 rounded-xl border border-dashed border-border text-center">
                                        <p className="text-muted-foreground">記事を準備中です。お楽しみに！</p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
