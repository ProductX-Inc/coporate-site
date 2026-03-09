"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import { categoryColors } from "@/lib/articles-constants";
import type { Article, ArticleMeta, ServiceAreaInfo } from "@/lib/articles-constants";

interface Props {
    article: Article;
    relatedArticles: ArticleMeta[];
    categoryLabels: Record<string, { ja: string; en: string }>;
    area: ServiceAreaInfo;
}

export function ArticleDetailClient({ article, relatedArticles, categoryLabels, area }: Props) {
    const { t, locale } = useLang();

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden bg-[var(--color-brand-dark)]">
                    <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                        }}
                    />

                    <div className="relative z-10 mx-auto max-w-[860px] px-6">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
                            <Link href="/articles" className="hover:text-white/80 transition-colors">Articles</Link>
                            <span>/</span>
                            <Link href={`/articles/${area.key}`} className="hover:text-white/80 transition-colors">
                                {area.label[locale]}
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className={`text-xs ${categoryColors[article.category] || ""}`}>
                                {categoryLabels[article.category]?.[locale] || article.category}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-white/50">
                                <Calendar className="w-3 h-3" />
                                {article.date}
                            </span>
                        </div>

                        <h1
                            className="font-bold tracking-tight leading-[1.2] text-white"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                        >
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Article Body */}
                <section className="py-16 md:py-20 bg-background">
                    <div className="mx-auto max-w-[860px] px-6">
                        <article
                            className="article-content prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* CTA */}
                        <motion.div
                            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[var(--color-brand)]/10 to-[var(--color-brand-active)]/5 border border-[var(--color-brand)]/20"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <h3 className="text-lg font-bold mb-2">{t("articles.cta.title")}</h3>
                            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                                {t("articles.cta.body")}
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-brand)] text-white font-medium text-sm hover:bg-[var(--color-brand-active)] transition-colors"
                            >
                                {t("articles.cta.btn")}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
                        <div className="mx-auto max-w-[1280px] px-6">
                            <h2 className="text-xl font-bold mb-8">{t("articles.related")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedArticles.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/articles/${area.key}/${related.slug}`}
                                        className="group block p-5 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 transition-all duration-300"
                                    >
                                        <time className="text-xs text-muted-foreground">{related.date}</time>
                                        <h3 className="mt-2 text-sm font-semibold leading-snug group-hover:text-[var(--color-brand)] transition-colors">
                                            {related.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
