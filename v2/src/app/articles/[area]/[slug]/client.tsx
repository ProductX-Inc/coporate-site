"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight, Clock, User, Share2, ChevronDown, List } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import { categoryColors, categoryLabels } from "@/lib/articles-constants";
import type { Article, ArticleMeta, ServiceAreaInfo } from "@/lib/articles-constants";
import { useEffect, useState, useCallback } from "react";

interface Props {
    article: Article;
    relatedArticles: ArticleMeta[];
    area: ServiceAreaInfo;
}

/* ── Heading helpers ── */

type Heading = { id: string; text: string; level: number };

function textToId(text: string) {
    return text.replace(/[^\w\u3000-\u9fff\uff00-\uffef]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function extractHeadings(html: string): Heading[] {
    const out: Heading[] = [];
    let m: RegExpExecArray | null;
    const re = /<h([23])[^>]*>(.*?)<\/h[23]>/g;
    while ((m = re.exec(html))) {
        const text = m[2].replace(/<[^>]*>/g, "").trim();
        out.push({ id: textToId(text), text, level: +m[1] });
    }
    return out;
}

function injectHeadingIds(html: string) {
    return html.replace(/<h([23])>(.*?)<\/h[23]>/g, (_, l, t) => {
        const text = t.replace(/<[^>]*>/g, "").trim();
        return `<h${l} id="${textToId(text)}">${t}</h${l}>`;
    });
}

/* ── Small sub-components ── */

const GOLD = "var(--color-brand-gold)";
const CEO_BADGES = ["東北大学", "CyberAgent", "MIXI", "CPO経験"];

function ReadingProgressBar() {
    const [pct, setPct] = useState(0);
    useEffect(() => {
        const fn = () => {
            const max = document.documentElement.scrollHeight - innerHeight;
            setPct(max > 0 ? Math.min(100, (scrollY / max) * 100) : 0);
        };
        addEventListener("scroll", fn, { passive: true });
        return () => removeEventListener("scroll", fn);
    }, []);
    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
            <div className="h-full bg-gradient-to-r from-[var(--color-brand-gold)] to-[var(--color-brand-active)] transition-[width] duration-150" style={{ width: `${pct}%` }} />
        </div>
    );
}

function CeoProfileCard() {
    return (
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-brand-gold)] to-[var(--color-brand-active)] flex items-center justify-center shadow-lg shadow-[var(--color-brand-gold)]/20 shrink-0">
                <User size={28} className="text-white/90" strokeWidth={1.5} />
            </div>
            <div>
                <p className="font-bold text-base text-white tracking-tight">上野 健太</p>
                <p className="text-xs text-white/50 mt-0.5">代表取締役 CEO</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {CEO_BADGES.map((b) => (
                        <span key={b} className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full border border-[var(--color-brand-gold)]/30 bg-[var(--color-brand-gold)]/10 text-[var(--color-brand-gold)] whitespace-nowrap">
                            {b}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ShareBar({ title }: { title: string }) {
    const actions = [
        { label: "𝕏", fn: () => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(location.href)}`, "_blank") },
        { label: "in", fn: () => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}`, "_blank") },
    ];
    return (
        <div className="flex items-center gap-3 mt-10 pt-8 border-t border-border">
            <span className="text-xs text-muted-foreground mr-2">Share</span>
            {actions.map((a) => (
                <button key={a.label} onClick={a.fn} className="w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                    <span className="text-xs font-bold">{a.label}</span>
                </button>
            ))}
            <button onClick={() => navigator.clipboard.writeText(location.href)} className="w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors" title="リンクをコピー">
                <Share2 size={14} />
            </button>
        </div>
    );
}

/* ── Sticky TOC ── */

function StickyToc({ headings }: { headings: Heading[] }) {
    const [activeId, setActiveId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (es) => es.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
            { rootMargin: "-80px 0px -80% 0px" },
        );
        headings.forEach((h) => { const el = document.getElementById(h.id); el && obs.observe(el); });
        return () => obs.disconnect();
    }, [headings]);

    const go = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsOpen(false);
    }, []);

    if (!headings.length) return null;

    return (
        <>
            {/* Desktop sidebar */}
            <nav className="hidden lg:block sticky top-28 self-start w-[220px] shrink-0">
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: GOLD }}>目次</p>
                <ul className="space-y-1.5 border-l border-border">
                    {headings.map((h) => (
                        <li key={h.id}>
                            <button
                                onClick={() => go(h.id)}
                                className={`block w-full text-left text-xs leading-relaxed py-1 border-l-2 -ml-[1px] transition-all duration-200 ${h.level === 3 ? "pl-6" : "pl-3"} ${activeId === h.id
                                    ? "text-[var(--color-brand-gold)] font-semibold border-[var(--color-brand-gold)]"
                                    : "text-muted-foreground hover:text-foreground border-transparent"
                                    }`}
                            >
                                {h.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile FAB + drawer */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                {!isOpen && (
                    <button onClick={() => setIsOpen(true)} className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl bg-gradient-to-br from-[var(--color-brand-gold)] to-[var(--color-brand-active)]">
                        <List size={20} className="text-white" />
                    </button>
                )}
                {isOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
                        <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl p-6 max-h-[60vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-bold" style={{ color: GOLD }}>目次</p>
                                <button onClick={() => setIsOpen(false)} className="text-muted-foreground"><ChevronDown size={20} /></button>
                            </div>
                            <ul className="space-y-2">
                                {headings.map((h) => (
                                    <li key={h.id}>
                                        <button
                                            onClick={() => go(h.id)}
                                            className={`block w-full text-left text-sm py-1.5 transition-colors ${h.level === 3 ? "pl-4 text-muted-foreground" : "font-medium"} ${activeId === h.id ? "text-[var(--color-brand-gold)]" : ""}`}
                                        >
                                            {h.text}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

/* ── Main component ── */

export function ArticleDetailClient({ article, relatedArticles, area }: Props) {
    const { t, locale } = useLang();
    const isCeo = article.category === "ceo-column";
    const headings = isCeo ? extractHeadings(article.content) : [];
    const html = isCeo ? injectHeadingIds(article.content) : article.content;
    const readMin = Math.max(1, Math.round(article.content.replace(/<[^>]*>/g, "").length / 500));

    return (
        <>
            {isCeo && <ReadingProgressBar />}
            <Header />
            <main>
                {/* Hero */}
                <section className={`pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden ${isCeo ? "bg-gradient-to-b from-[var(--color-brand-dark)] to-[#0a0a1a]" : "bg-[var(--color-brand-dark)]"}`}>
                    <div className="absolute inset-0 opacity-[0.04]" aria-hidden style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,.8) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
                    {isCeo && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-[0.07]" style={{ background: GOLD }} />}

                    <div className={`relative z-10 mx-auto px-6 ${isCeo ? "max-w-[1100px]" : "max-w-[860px]"}`}>
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
                            <Link href="/articles" className="hover:text-white/80 transition-colors">Articles</Link>
                            <span>/</span>
                            <Link href={`/articles/${area.key}`} className="hover:text-white/80 transition-colors">{area.label[locale]}</Link>
                        </div>

                        {isCeo && (
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>
                                CEO COLUMN<span className="inline-block w-1.5 h-1.5 rounded-full ml-2 align-middle" style={{ background: GOLD }} />
                            </p>
                        )}

                        {/* Meta row */}
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className={`text-xs ${categoryColors[article.category] || ""}`}>
                                {categoryLabels[article.category]?.[locale] || article.category}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-white/50"><Calendar className="w-3 h-3" />{article.date}</span>
                            {isCeo && <span className="flex items-center gap-1 text-xs text-white/50"><Clock className="w-3 h-3" />{locale === "ja" ? `約${readMin}分` : `${readMin} min read`}</span>}
                        </div>

                        <h1 className="font-bold tracking-tight leading-[1.2] text-white" style={{ fontSize: isCeo ? "clamp(1.75rem,3.5vw,3rem)" : "clamp(1.5rem,3vw,2.5rem)" }}>
                            {article.title}
                        </h1>

                        {isCeo && article.description && (
                            <p className="mt-4 text-sm md:text-base text-white/50 leading-relaxed max-w-[700px]">{article.description}</p>
                        )}

                        <div className="flex flex-wrap gap-2 mt-4">
                            {article.tags.map((tag) => (
                                <span key={tag} className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${isCeo ? "bg-[var(--color-brand-gold)]/10 text-[var(--color-brand-gold)]/80" : "bg-white/10 text-white/70"}`}>
                                    <Tag className="w-3 h-3" />{tag}
                                </span>
                            ))}
                        </div>

                        {isCeo && <div className="mt-8 pt-6 border-t border-white/10"><CeoProfileCard /></div>}
                    </div>
                </section>

                {/* Article body */}
                <section className="py-16 md:py-20 bg-background">
                    <div className={`mx-auto px-6 ${isCeo ? "max-w-[1100px] flex gap-10" : "max-w-[860px]"}`}>
                        {isCeo && <StickyToc headings={headings} />}

                        <div className={isCeo ? "flex-1 min-w-0" : ""}>
                            <article className="article-content prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />

                            {isCeo && <ShareBar title={article.title} />}

                            {/* CTA */}
                            <motion.div
                                className={`mt-16 p-8 rounded-2xl border ${isCeo
                                    ? "bg-gradient-to-br from-[var(--color-brand-gold)]/10 to-[var(--color-brand-active)]/5 border-[var(--color-brand-gold)]/20"
                                    : "bg-gradient-to-br from-[var(--color-brand)]/10 to-[var(--color-brand-active)]/5 border-[var(--color-brand)]/20"}`}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                            >
                                <h3 className="text-lg font-bold mb-2">
                                    {isCeo ? (locale === "ja" ? "AIの未来を一緒に創りませんか？" : "Let's shape the future of AI together.") : t("articles.cta.title")}
                                </h3>
                                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                                    {isCeo
                                        ? (locale === "ja"
                                            ? "この記事で語った内容について、もっと深く議論したい方、自社のAI戦略を相談したい方は、お気軽にお問い合わせください。ProductXが、あなたのAI変革を伴走します。"
                                            : "Want to discuss these ideas further or explore AI strategy for your business? We'd love to chat.")
                                        : t("articles.cta.body")}
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Link
                                        href="/contact"
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium text-sm transition-colors ${isCeo
                                            ? "bg-gradient-to-r from-[var(--color-brand-gold)] to-[var(--color-brand-active)] hover:opacity-90"
                                            : "bg-[var(--color-brand)] hover:bg-[var(--color-brand-active)]"}`}
                                    >
                                        {isCeo ? (locale === "ja" ? "無料で相談する" : "Book a free consultation") : t("articles.cta.btn")}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href={`/services/${area.key === "ai-dx" ? "ai-dx" : "partner-growth"}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all"
                                    >
                                        {locale === "ja" ? `${area.label.ja}サービスを詳しく見る` : `Learn more about ${area.label.en}`}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Related articles */}
                {relatedArticles.length > 0 && (
                    <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
                        <div className="mx-auto max-w-[1280px] px-6">
                            <h2 className="text-xl font-bold mb-8">{t("articles.related")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedArticles.map((r) => (
                                    <Link key={r.slug} href={`/articles/${area.key}/${r.slug}`} className="group block p-5 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 transition-all duration-300">
                                        <time className="text-xs text-muted-foreground">{r.date}</time>
                                        <h3 className="mt-2 text-sm font-semibold leading-snug group-hover:text-[var(--color-brand)] transition-colors">{r.title}</h3>
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
