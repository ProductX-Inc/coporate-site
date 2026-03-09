"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/lang-provider";
import { categoryColors, categoryLabels } from "@/lib/articles-constants";
import type { ArticleMeta, ServiceAreaInfo } from "@/lib/articles-constants";

interface Props {
    area: ServiceAreaInfo;
    articles: ArticleMeta[];
}

export function AreaArticlesClient({ area, articles }: Props) {
    const { t, locale } = useLang();
    const [activeCategory, setActiveCategory] = useState("all");

    const relevantCategories = useMemo(
        () => Object.keys(categoryLabels).filter((cat) => articles.some((a) => a.category === cat)),
        [articles]
    );

    const categoryCounts = useMemo(
        () => {
            const counts: Record<string, number> = {};
            for (const a of articles) {
                counts[a.category] = (counts[a.category] || 0) + 1;
            }
            return counts;
        },
        [articles]
    );

    const filtered = useMemo(
        () => activeCategory === "all" ? articles : articles.filter((a) => a.category === activeCategory),
        [articles, activeCategory]
    );

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label={area.label.en.toUpperCase()}
                    title={`${area.label[locale]} ${t("articles.insights")}`}
                    description={area.description[locale]}
                />

                <section className="py-16 md:py-24 bg-background">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t("articles.back")}
                        </Link>

                        {/* Category Filter */}
                        {relevantCategories.length > 1 && (
                            <div className="flex flex-wrap gap-2 mb-12">
                                <FilterButton
                                    active={activeCategory === "all"}
                                    onClick={() => setActiveCategory("all")}
                                    label={`${t("articles.filter.all")} (${articles.length})`}
                                />
                                {relevantCategories.map((cat) => (
                                    <FilterButton
                                        key={cat}
                                        active={activeCategory === cat}
                                        onClick={() => setActiveCategory(cat)}
                                        label={`${categoryLabels[cat]?.[locale] || cat} (${categoryCounts[cat] || 0})`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Article Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/articles/${area.key}/${article.slug}`}
                                    className="group block h-full p-6 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 hover:shadow-[0_0_30px_rgba(105,108,255,0.06)] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <Badge
                                            variant="outline"
                                            className={`text-xs ${categoryColors[article.category] || ""}`}
                                        >
                                            {categoryLabels[article.category]?.[locale] || article.category}
                                        </Badge>
                                        <time className="text-xs text-[var(--color-brand-gold)]">
                                            {article.date}
                                        </time>
                                    </div>
                                    <h3 className="text-base font-semibold leading-snug group-hover:text-[var(--color-brand-active)] dark:group-hover:text-[var(--color-brand)] transition-colors mb-3">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                        {article.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {article.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="text-center py-20 text-muted-foreground">
                                {t("articles.noCategory")}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

/* ── Extracted sub-component ── */

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${active
                ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                : "bg-card text-muted-foreground border-border hover:border-[var(--color-brand)]/40"
                }`}
        >
            {label}
        </button>
    );
}
