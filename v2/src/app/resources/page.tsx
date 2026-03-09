"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import { FileText, ExternalLink, Lock, Clock, Layers, Sparkles } from "lucide-react";
import { DownloadModal } from "@/components/ui/download-modal";

const inView = (delay: number) => ({
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true },
    custom: delay,
    variants: fadeUp,
});

export default function ResourcesPage() {
    const { locale } = useLang();
    const ja = locale === "ja";
    const [dlOpen, setDlOpen] = useState(false);

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label={ja ? "RESOURCES" : "RESOURCES"}
                    title={ja ? "事業資料" : "Business Resources"}
                    description={ja
                        ? "営業・パートナー向けの資料を閲覧・ダウンロードできます。"
                        : "View and download materials for sales and partners."}
                />

                <section className="py-24 md:py-32 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Company Deck Card */}
                            <motion.div
                                className="group relative p-8 rounded-2xl border border-border bg-card hover:border-[var(--color-brand)]/40 hover:shadow-[0_0_40px_rgba(105,108,255,0.1)] transition-all duration-500"
                                {...inView(0)}
                                whileHover={{ y: -4 }}
                            >
                                {/* NEW Badge */}
                                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-gold)]/15 text-[var(--color-brand-gold)]">
                                    <Sparkles size={12} />
                                    <span className="text-[10px] font-bold tracking-wider uppercase">NEW</span>
                                </div>

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-brand-active)] to-[var(--color-brand)] flex items-center justify-center mb-6 shadow-lg shadow-[var(--color-brand)]/20">
                                    <FileText size={24} className="text-white" />
                                </div>

                                {/* Content */}
                                <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-2">
                                    Company Deck
                                </p>
                                <h2 className="text-xl font-bold tracking-tight mb-3">
                                    {ja ? "会社・事業紹介" : "Company & Business Overview"}
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                    {ja
                                        ? "ProductXの会社概要と Partner Growth / AI DX の事業紹介資料です。"
                                        : "Overview of ProductX including Partner Growth and AI DX services."}
                                </p>

                                {/* Meta info */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Layers size={13} />
                                        <span>{ja ? "全18スライド" : "18 Slides"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Clock size={13} />
                                        <span>{ja ? "約10分" : "~10 min"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <span>🔄 2026.03 {ja ? "更新" : "Updated"}</span>
                                    </div>
                                </div>

                                {/* CTAs */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/resources/company-deck"
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-active)] hover:bg-[var(--color-brand)] text-white text-sm font-semibold shadow-md hover:shadow-[0_8px_30px_rgba(105,108,255,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <ExternalLink size={16} />
                                        {ja ? "Webで見る" : "View Online"}
                                    </Link>
                                    <button
                                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-[var(--color-brand-gold)]/50 hover:shadow-[0_0_20px_rgba(254,198,101,0.15)] transition-all duration-300"
                                        onClick={() => setDlOpen(true)}
                                    >
                                        <Lock size={14} />
                                        {ja ? "PDFダウンロード" : "PDF Download"} 🔒
                                    </button>
                                </div>
                            </motion.div>

                            {/* Coming Soon Card */}
                            <motion.div
                                className="relative p-8 rounded-2xl border border-border bg-card/50 opacity-50 pointer-events-none"
                                {...inView(1)}
                            >
                                <div className="absolute inset-0 rounded-2xl bg-background/60 dark:bg-background/40 flex items-center justify-center z-10">
                                    <span className="px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground bg-card/80 backdrop-blur-sm">
                                        {ja ? "準備中" : "Coming Soon"}
                                    </span>
                                </div>
                                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-6">
                                    <FileText size={24} className="text-muted-foreground/30" />
                                </div>
                                <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/50 mb-2">
                                    WHITEPAPER
                                </p>
                                <h2 className="text-xl font-bold tracking-tight mb-3 text-muted-foreground/50">
                                    {ja ? "技術ホワイトペーパー" : "Technical Whitepaper"}
                                </h2>
                                <p className="text-sm text-muted-foreground/30 leading-relaxed">
                                    {ja
                                        ? "AI DXに関するベストプラクティスをまとめた資料です。"
                                        : "Best practices and insights on AI DX implementation."}
                                </p>
                            </motion.div>
                        </div>

                        {/* Notes */}
                        <motion.div className="mt-12 space-y-2" {...inView(2)}>
                            <p className="text-xs text-muted-foreground/60">
                                {ja
                                    ? "※ PDFダウンロードにはパスワードが必要です。パスワードは担当者よりお伝えしております。"
                                    : "※ PDF download requires a password. Please contact your representative for access."}
                            </p>
                            <p className="text-xs text-muted-foreground/60">
                                {ja
                                    ? "※ パスワードをお持ちでない方は"
                                    : "※ Don't have a password? "}
                                <Link href="/contact?ref=resource-dl" className="text-[var(--color-brand)] hover:underline">
                                    {ja ? "お問い合わせください →" : "Contact us →"}
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </section>

                <GradientDivider />
            </main>
            <Footer />
            <DownloadModal isOpen={dlOpen} onClose={() => setDlOpen(false)} />
        </>
    );
}
