"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang, type Locale } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import {
    ArrowRight, Factory, Building2, Monitor, ShoppingCart,
    Gamepad2, TrendingUp, Quote, Sparkles,
} from "lucide-react";

/* ── helpers ── */

type I18n = { ja: string; en: string };
const l = (locale: Locale, v: I18n) => v[locale];

const MV = { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true }, variants: fadeUp };

/* ── case study data ── */

interface CaseStudy {
    id: string;
    category: "ai-dx" | "partner-growth";
    industry: { icon: typeof Factory; label: I18n };
    challenge: I18n;
    solution: I18n;
    beforeLabel: I18n;
    afterLabel: I18n;
    beforeValue: number;
    afterValue: number;
    unit: I18n;
    improvement: I18n;
    testimonial: I18n;
    color: string;
}

const caseStudies: CaseStudy[] = [
    {
        id: "manufacturing-invoice",
        category: "ai-dx",
        industry: { icon: Factory, label: { ja: "製造業", en: "Manufacturing" } },
        challenge: { ja: "月末の請求書処理に3日かかり、経理部門が疲弊していた", en: "Month-end invoice processing took 3 days, exhausting the accounting team" },
        solution: { ja: "AI OCRと自動仕訳システムを導入。請求書のスキャンから仕訳入力まで自動化", en: "Implemented AI OCR and auto-journaling. Automated from invoice scanning to journal entry" },
        beforeLabel: { ja: "処理時間", en: "Processing Time" },
        afterLabel: { ja: "処理時間", en: "Processing Time" },
        beforeValue: 72,
        afterValue: 4,
        unit: { ja: "時間", en: "hours" },
        improvement: { ja: "83%削減", en: "83% Reduction" },
        testimonial: { ja: "月末の残業がほぼゼロになりました。経理チームが戦略的な業務に集中できるようになり、会社全体のスピードが上がっています。", en: "Month-end overtime has nearly disappeared. Our accounting team can now focus on strategic work, speeding up the entire company." },
        color: "from-emerald-500 to-emerald-600",
    },
    {
        id: "realestate-saleslist",
        category: "ai-dx",
        industry: { icon: Building2, label: { ja: "不動産", en: "Real Estate" } },
        challenge: { ja: "営業リスト作成に営業担当が週8時間を費やしていた", en: "Sales reps spent 8 hours per week creating prospect lists" },
        solution: { ja: "AI自動リスト生成を導入。市場データ・物件情報から最適なターゲットを自動抽出", en: "Deployed AI auto-list generation. Automatically extracts optimal targets from market data" },
        beforeLabel: { ja: "リスト作成", en: "List Creation" },
        afterLabel: { ja: "リスト作成", en: "List Creation" },
        beforeValue: 480,
        afterValue: 30,
        unit: { ja: "分/週", en: "min/week" },
        improvement: { ja: "94%削減", en: "94% Reduction" },
        testimonial: { ja: "毎週月曜の朝にはAIが最新のリストを用意してくれる。営業活動に集中できるようになり、商談数が1.5倍に増えました。", en: "Every Monday morning, AI has the latest list ready. We can focus on selling, and our meetings increased 1.5x." },
        color: "from-sky-500 to-sky-600",
    },
    {
        id: "it-faqbot",
        category: "ai-dx",
        industry: { icon: Monitor, label: { ja: "IT企業", en: "IT Company" } },
        challenge: { ja: "社内問い合わせが月200件以上。総務・情シスが対応に追われていた", en: "200+ internal inquiries per month overwhelmed admin and IT departments" },
        solution: { ja: "社内FAQボットを導入。ナレッジベースを学習し、即座に回答を提供", en: "Deployed internal FAQ bot. Learned knowledge base and provides instant answers" },
        beforeLabel: { ja: "問い合わせ", en: "Inquiries" },
        afterLabel: { ja: "問い合わせ", en: "Inquiries" },
        beforeValue: 200,
        afterValue: 20,
        unit: { ja: "件/月", en: "/month" },
        improvement: { ja: "90%削減", en: "90% Reduction" },
        testimonial: { ja: "『まずボットに聞く』が社内の当たり前になりました。情シスが本来やるべきセキュリティ強化に時間を使えるように。", en: "'Ask the bot first' became the company norm. IT can now focus on security improvements." },
        color: "from-violet-500 to-violet-600",
    },
    {
        id: "ec-redesign",
        category: "partner-growth",
        industry: { icon: ShoppingCart, label: { ja: "ECサイト", en: "E-Commerce" } },
        challenge: { ja: "老朽化したEC管理画面のUXが悪く、CVRが業界平均以下だった", en: "Outdated admin UI with poor UX resulted in below-average CVR" },
        solution: { ja: "UIリデザインとフロントエンド刷新。ユーザーリサーチに基づくUX改善", en: "UI redesign and frontend modernization based on user research" },
        beforeLabel: { ja: "CVR", en: "CVR" },
        afterLabel: { ja: "CVR", en: "CVR" },
        beforeValue: 1.2,
        afterValue: 2.8,
        unit: { ja: "%", en: "%" },
        improvement: { ja: "133%向上", en: "133% Increase" },
        testimonial: { ja: "デザインを変えただけでこんなに数字が変わるとは。ProductXのUXリサーチ力に驚きました。", en: "Just changing the design changed the numbers so much. ProductX's UX research capability surprised us." },
        color: "from-amber-500 to-amber-600",
    },
    {
        id: "saas-mvp",
        category: "partner-growth",
        industry: { icon: Monitor, label: { ja: "SaaS", en: "SaaS" } },
        challenge: { ja: "スタートアップのMVP開発が予定の8ヶ月に遅延確定していた", en: "Startup's MVP development was confirmed to be delayed to 8 months" },
        solution: { ja: "ProductXチームがジョインし、アジャイル開発で高速リリースを実現", en: "ProductX team joined and achieved rapid release through agile development" },
        beforeLabel: { ja: "想定リリース", en: "Expected Release" },
        afterLabel: { ja: "実際のリリース", en: "Actual Release" },
        beforeValue: 8,
        afterValue: 3,
        unit: { ja: "ヶ月", en: "months" },
        improvement: { ja: "63%短縮", en: "63% Faster" },
        testimonial: { ja: "自社だけでは8ヶ月かかる見込みが、ProductXと一緒にやったら3ヶ月でリリースできた。スタートアップにとって速度は命です。", en: "What would have taken 8 months alone, we released in 3 months with ProductX. Speed is everything for startups." },
        color: "from-rose-500 to-rose-600",
    },
    {
        id: "entertainment-streaming",
        category: "partner-growth",
        industry: { icon: Gamepad2, label: { ja: "エンタメ", en: "Entertainment" } },
        challenge: { ja: "ライブ配信機能の追加が急務だが、社内にリソースがなかった", en: "Adding live streaming was urgent but no internal resources were available" },
        solution: { ja: "モバイルアプリにライブ配信・投げ銭機能を開発。既存APIとシームレスに統合", en: "Developed live streaming and tipping features for mobile app with seamless API integration" },
        beforeLabel: { ja: "DAU", en: "DAU" },
        afterLabel: { ja: "DAU", en: "DAU" },
        beforeValue: 5000,
        afterValue: 12000,
        unit: { ja: "", en: "" },
        improvement: { ja: "140%増", en: "140% Growth" },
        testimonial: { ja: "ライブ配信機能のリリース後、DAUが2.4倍に。技術力だけでなく、エンタメ業界特有のUXへの理解が深かったです。", en: "After the live feature launch, DAU grew 2.4x. They understood entertainment UX deeply, not just the tech." },
        color: "from-pink-500 to-pink-600",
    },
];

const filters = [
    { id: "all", label: { ja: "すべて", en: "All" } },
    { id: "ai-dx", label: { ja: "AI DX", en: "AI DX" } },
    { id: "partner-growth", label: { ja: "Partner Growth", en: "Partner Growth" } },
];

/* ── animated bar ── */

function AnimatedBar({ value, maxValue, color, delay }: { value: number; maxValue: number; color: string; delay: number }) {
    const pct = Math.min((value / maxValue) * 100, 100);
    return (
        <div className="h-7 rounded-lg bg-secondary relative overflow-hidden">
            <motion.div
                className={`absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r ${color}`}
                initial={{ width: "0%" }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ delay, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-foreground/70">
                {typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value.toLocaleString()}
            </span>
        </div>
    );
}

/* ── page ── */

export default function CaseStudiesPage() {
    const { locale } = useLang();
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = activeFilter === "all" ? caseStudies : caseStudies.filter(cs => cs.category === activeFilter);

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label="CASE STUDIES"
                    title={l(locale, { ja: "導入事例", en: "Case Studies" })}
                    description={l(locale, {
                        ja: "AI DX・Partner Growthサービスの導入事例をご紹介。数字で語る、確かな成果。",
                        en: "Real results from our AI DX and Partner Growth services. Success measured in numbers."
                    })}
                />

                <section className="py-16 md:py-24 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">

                        {/* Filter Bar */}
                        <motion.div className="flex items-center gap-2 mb-12" {...MV} custom={0}>
                            {filters.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setActiveFilter(f.id)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === f.id
                                        ? "bg-[var(--color-brand-active)] text-white shadow-lg shadow-[var(--color-brand-active)]/20"
                                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                                        }`}
                                >
                                    {l(locale, f.label)}
                                </button>
                            ))}
                        </motion.div>

                        {/* Case Study Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filtered.map((cs, index) => {
                                const IndustryIcon = cs.industry.icon;
                                const maxVal = Math.max(cs.beforeValue, cs.afterValue);
                                return (
                                    <motion.div
                                        key={cs.id}
                                        className="rounded-2xl border border-border bg-card overflow-hidden hover:border-[var(--color-brand)]/30 transition-all duration-500"
                                        {...MV}
                                        custom={index * 0.1 + 0.2}
                                    >
                                        {/* Header */}
                                        <div className="flex items-center gap-3 px-6 pt-6 pb-3">
                                            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cs.color} flex items-center justify-center`}>
                                                <IndustryIcon size={18} className="text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs text-muted-foreground">{l(locale, cs.industry.label)}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${cs.category === "ai-dx"
                                                ? "bg-violet-500/15 text-violet-500 border border-violet-500/30"
                                                : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                                                }`}>
                                                {cs.category === "ai-dx" ? "AI DX" : "Partner Growth"}
                                            </span>
                                        </div>

                                        {/* Challenge & Solution */}
                                        <div className="px-6 pb-4">
                                            <h3 className="text-base font-bold mb-2">{l(locale, cs.challenge)}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                <span className="text-[var(--color-brand)] font-semibold">Solution: </span>
                                                {l(locale, cs.solution)}
                                            </p>
                                        </div>

                                        {/* Before / After Bars */}
                                        <div className="px-6 pb-4 space-y-3">
                                            <div>
                                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                                    <span>Before — {l(locale, cs.beforeLabel)}</span>
                                                    <span>{typeof cs.beforeValue === "number" && cs.beforeValue % 1 !== 0 ? cs.beforeValue.toFixed(1) : cs.beforeValue.toLocaleString()}{l(locale, cs.unit)}</span>
                                                </div>
                                                <AnimatedBar value={cs.beforeValue} maxValue={maxVal} color="from-destructive/60 to-destructive/40" delay={index * 0.1 + 0.4} />
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                                    <span>After — {l(locale, cs.afterLabel)}</span>
                                                    <span>{typeof cs.afterValue === "number" && cs.afterValue % 1 !== 0 ? cs.afterValue.toFixed(1) : cs.afterValue.toLocaleString()}{l(locale, cs.unit)}</span>
                                                </div>
                                                <AnimatedBar value={cs.afterValue} maxValue={maxVal} color={cs.color} delay={index * 0.1 + 0.6} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp size={14} className="text-emerald-500" />
                                                <span className="text-sm font-bold text-emerald-500">{l(locale, cs.improvement)}</span>
                                            </div>
                                        </div>

                                        {/* Testimonial */}
                                        <div className="px-6 pb-6">
                                            <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                                                <Quote size={16} className="text-[var(--color-brand-gold)] mb-2" />
                                                <p className="text-sm text-foreground/70 leading-relaxed italic">
                                                    {l(locale, cs.testimonial)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <GradientDivider />

                {/* CTA Section */}
                <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
                    <div className="mx-auto max-w-[800px] px-6 text-center">
                        <motion.div {...MV} custom={0}>
                            <Sparkles size={32} className="mx-auto mb-4 text-[var(--color-brand-gold)]" />
                        </motion.div>
                        <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" {...MV} custom={0.5}>
                            {l(locale, { ja: "次の成功事例は、御社かもしれません。", en: "Your company could be the next success story." })}
                        </motion.h2>
                        <motion.p className="text-muted-foreground mb-8" {...MV} custom={1}>
                            {l(locale, {
                                ja: "同じ業界・同じ課題を持つ企業がProductXで成果を出しています。まずはお気軽にご相談ください。",
                                en: "Companies in your industry with similar challenges are achieving results with ProductX. Feel free to reach out."
                            })}
                        </motion.p>
                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...MV} custom={1.5}>
                            <Link href="/contact"
                                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold hover:bg-[var(--color-brand)] transition-all shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative z-10 flex items-center gap-2">
                                    {l(locale, { ja: "無料ヒアリングを申し込む", en: "Request Free Consultation" })} <ArrowRight size={18} />
                                </span>
                            </Link>
                            <Link href="/tools/ai-simulator" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                {l(locale, { ja: "AI導入効果を試算する", en: "Simulate AI Impact" })} <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
