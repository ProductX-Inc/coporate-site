"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/components/lang-provider";

interface NewsArticle {
    date: string;
    tag: { ja: string; en: string };
    title: { ja: string; en: string };
    body: { ja: string; en: string };
}

export function NewsDetailClient({
    params,
    newsData,
}: {
    params: Promise<{ slug: string }>;
    newsData: Record<string, NewsArticle>;
}) {
    const { slug } = use(params);
    const article = newsData[slug];
    const { locale } = useLang();

    if (!article) {
        return (
            <>
                <Header />
                <main className="pt-32 pb-20 min-h-screen">
                    <div className="mx-auto max-w-[800px] px-6 text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            {locale === "ja" ? "記事が見つかりません" : "Article Not Found"}
                        </h1>
                        <Link href="/news" className="text-[var(--color-brand-active)] dark:text-[var(--color-brand)] hover:underline">
                            {locale === "ja" ? "ニュース一覧に戻る" : "Back to News"}
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const tag = locale === "ja" ? article.tag.ja : article.tag.en;
    const title = locale === "ja" ? article.title.ja : article.title.en;
    const body = locale === "ja" ? article.body.ja : article.body.en;

    return (
        <>
            <Header />
            <main className="pt-32 pb-20 md:pt-40 md:pb-28">
                <article className="mx-auto max-w-[800px] px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link href="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                            <ArrowLeft size={14} /> {locale === "ja" ? "ニュース一覧に戻る" : "Back to News"}
                        </Link>

                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="secondary" className="text-xs">{tag}</Badge>
                            <time className="text-xs text-[var(--color-brand-gold)] dark:text-[var(--color-brand-gold)]/80">{article.date}</time>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-[1.3] mb-10">
                            {title}
                        </h1>

                        <div className="prose dark:prose-invert max-w-none">
                            {body.split("\n\n").map((p, i) => (
                                <p key={i} className="text-base text-foreground/80 leading-[1.9] mb-6">{p}</p>
                            ))}
                        </div>
                    </motion.div>
                </article>
            </main>
            <Footer />
        </>
    );
}
