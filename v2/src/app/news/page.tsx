"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";

const news = [
    {
        date: "2026.03.01",
        tag: { ja: "プレスリリース", en: "Press Release" },
        title: { ja: "AI DX事業を本格始動しました", en: "Launched AI DX Business" },
        slug: "ai-dx",
    },
    {
        date: "2025.05.05",
        tag: { ja: "お知らせ", en: "Announcement" },
        title: { ja: "コーポレートサイトを公開しました", en: "Corporate Website Launched" },
        slug: "website-launch",
    },
    {
        date: "2025.04.01",
        tag: { ja: "プレスリリース", en: "Press Release" },
        title: { ja: "パートナーグロース事業を開始しました", en: "Launched Partner Growth Business" },
        slug: "partner-growth",
    },
    {
        date: "2025.03.14",
        tag: { ja: "お知らせ", en: "Announcement" },
        title: { ja: "株式会社ProductXを設立しました", en: "ProductX Inc. Established" },
        slug: "company-founded",
    },
];

export default function NewsPage() {
    const { t, locale } = useLang();
    return (
        <>
            <Header />
            <main>
                <PageHero label={t("news.label")} title={t("news.title")} description={t("news.desc")} />

                <section className="py-16 md:py-24 bg-background">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {news.map((item, i) => (
                                <motion.div
                                    key={item.slug}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    custom={i} variants={fadeUp}
                                >
                                    <Link
                                        href={`/news/${item.slug}`}
                                        className="group block p-6 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 hover:shadow-[0_0_30px_rgba(105,108,255,0.06)] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <Badge variant="secondary" className="text-xs">
                                                {locale === "ja" ? item.tag.ja : item.tag.en}
                                            </Badge>
                                            <time className="text-xs text-[var(--color-brand-gold)] dark:text-[var(--color-brand-gold)]/80">{item.date}</time>
                                        </div>
                                        <h3 className="text-base font-semibold group-hover:text-[var(--color-brand-active)] dark:group-hover:text-[var(--color-brand)] transition-colors">
                                            {locale === "ja" ? item.title.ja : item.title.en}
                                        </h3>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
