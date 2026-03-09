"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang, type Locale } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import {
    ArrowRight, ArrowLeft, ChevronRight,
    Monitor, Smartphone, MonitorSmartphone,
    Lock, CreditCard, MessageSquare, Bell, Video,
    ShoppingCart, BarChart3, Settings, Globe, Sparkles,
    Palette, PenTool, Crown,
    CheckCircle, Clock, Coins, FileText, TrendingUp,
} from "lucide-react";

/* ── helpers ── */

type I18n = { ja: string; en: string };
const l = (locale: Locale, v: I18n) => v[locale];

const MV = { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true }, variants: fadeUp };

/* ── data ── */

const platforms = [
    { id: "web", icon: Monitor, label: { ja: "Webアプリ", en: "Web App" }, desc: { ja: "ブラウザで動作するWebアプリケーション", en: "Browser-based web application" } },
    { id: "mobile", icon: Smartphone, label: { ja: "モバイルアプリ", en: "Mobile App" }, desc: { ja: "iOS / Androidネイティブアプリ", en: "iOS / Android native app" } },
    { id: "both", icon: MonitorSmartphone, label: { ja: "Web＋モバイル", en: "Web + Mobile" }, desc: { ja: "両プラットフォーム対応", en: "Both platforms" } },
];

const screenCounts = [
    { id: "small", label: { ja: "〜5画面", en: "Up to 5" }, desc: { ja: "LP・シンプルなツール", en: "LP / Simple tool" } },
    { id: "medium", label: { ja: "5〜15画面", en: "5-15" }, desc: { ja: "標準的なWebサービス", en: "Standard web service" } },
    { id: "large", label: { ja: "15〜30画面", en: "15-30" }, desc: { ja: "多機能なSaaS", en: "Feature-rich SaaS" } },
    { id: "xlarge", label: { ja: "30画面以上", en: "30+" }, desc: { ja: "大規模プラットフォーム", en: "Large-scale platform" } },
];

const features = [
    { id: "auth", icon: Lock, label: { ja: "認証・ログイン", en: "Authentication" }, cost: 30 },
    { id: "payment", icon: CreditCard, label: { ja: "決済機能", en: "Payment" }, cost: 80 },
    { id: "chat", icon: MessageSquare, label: { ja: "チャット機能", en: "Chat" }, cost: 100 },
    { id: "push", icon: Bell, label: { ja: "プッシュ通知", en: "Push Notifications" }, cost: 40 },
    { id: "video", icon: Video, label: { ja: "動画配信", en: "Video Streaming" }, cost: 120 },
    { id: "ec", icon: ShoppingCart, label: { ja: "EC連携", en: "E-Commerce" }, cost: 80 },
    { id: "crm", icon: BarChart3, label: { ja: "CRM・管理画面", en: "CRM / Admin" }, cost: 100 },
    { id: "admin", icon: Settings, label: { ja: "管理画面", en: "Admin Dashboard" }, cost: 60 },
    { id: "api", icon: Globe, label: { ja: "API連携", en: "API Integration" }, cost: 50 },
    { id: "ai", icon: Sparkles, label: { ja: "AI機能", en: "AI Features" }, cost: 150 },
];

const designLevels = [
    { id: "template", icon: Palette, label: { ja: "テンプレート", en: "Template" }, desc: { ja: "既存テンプレートをベースにカスタマイズ", en: "Customized from existing templates" }, multiplier: 0.8 },
    { id: "custom", icon: PenTool, label: { ja: "カスタム", en: "Custom" }, desc: { ja: "オリジナルデザインをフルスクラッチ", en: "Original design from scratch" }, multiplier: 1.0 },
    { id: "highend", icon: Crown, label: { ja: "ハイエンド", en: "High-End" }, desc: { ja: "マイクロインタラクション・モーション付き", en: "With micro-interactions & motion" }, multiplier: 1.3 },
];

/* ── estimation logic ── */

const basePrices: Record<string, Record<string, number>> = {
    web: { small: 100, medium: 200, large: 400, xlarge: 700 },
    mobile: { small: 150, medium: 300, large: 600, xlarge: 1000 },
    both: { small: 175, medium: 350, large: 700, xlarge: 1190 }, // Web + Mobile * 0.7
};

interface EstResult {
    minCost: number;    // 万円
    maxCost: number;    // 万円
    baseCost: number;
    featureCost: number;
    months: number;
    includedServices: string[];
}

function calculateEstimate(
    platformId: string,
    screenId: string,
    selectedFeatures: string[],
    designId: string,
): EstResult {
    const base = basePrices[platformId]?.[screenId] ?? 200;
    const featureCost = selectedFeatures.reduce((sum, fId) => {
        const f = features.find(fe => fe.id === fId);
        return sum + (f?.cost ?? 0);
    }, 0);
    const designMultiplier = designLevels.find(d => d.id === designId)?.multiplier ?? 1.0;
    const totalRaw = (base + featureCost) * designMultiplier;

    const minCost = Math.round(totalRaw * 0.8);
    const maxCost = Math.round(totalRaw * 1.2);

    // 期間算出: 月額150万想定
    const months = Math.max(1, Math.round(totalRaw / 150));

    const includedServices = [
        "要件定義・設計",
        "UI/UXデザイン",
        ...(platformId === "web" || platformId === "both" ? ["Webフロントエンド開発"] : []),
        ...(platformId === "mobile" || platformId === "both" ? ["モバイルアプリ開発"] : []),
        "バックエンド・API開発",
        "テスト・品質保証",
        "デプロイ・リリース支援",
    ];

    return { minCost, maxCost, baseCost: Math.round(base * designMultiplier), featureCost: Math.round(featureCost * designMultiplier), months, includedServices };
}

/* ── animated counter ── */

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 1.5 }: {
    value: number; suffix?: string; prefix?: string; duration?: number;
}) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<{ raf: number | null }>({ raf: null });

    useEffect(() => {
        const startTime = performance.now();
        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) ref.current.raf = requestAnimationFrame(animate);
        };
        ref.current.raf = requestAnimationFrame(animate);
        return () => { if (ref.current.raf) cancelAnimationFrame(ref.current.raf); };
    }, [value, duration]);

    return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

/* ── step transition ── */

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

/* ── page ── */

export default function EstimatePage() {
    const { locale } = useLang();
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [platform, setPlatform] = useState("");
    const [screenCount, setScreenCount] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [design, setDesign] = useState("");
    const [result, setResult] = useState<EstResult | null>(null);

    const canProceed = step === 0 ? !!platform : step === 1 ? !!screenCount : step === 2 ? true : step === 3 ? !!design : false;

    const goNext = () => {
        if (!canProceed) return;
        if (step === 3) {
            setResult(calculateEstimate(platform, screenCount, selectedFeatures, design));
        }
        setDirection(1);
        setStep(s => s + 1);
    };

    const goBack = () => {
        setDirection(-1);
        setStep(s => Math.max(0, s - 1));
    };

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const reset = () => {
        setStep(0);
        setPlatform("");
        setScreenCount("");
        setSelectedFeatures([]);
        setDesign("");
        setResult(null);
    };

    const steps = [
        { label: { ja: "プラットフォーム", en: "Platform" } },
        { label: { ja: "画面数", en: "Screens" } },
        { label: { ja: "機能", en: "Features" } },
        { label: { ja: "デザイン", en: "Design" } },
        { label: { ja: "見積もり", en: "Estimate" } },
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label="PARTNER GROWTH TOOLS"
                    title={l(locale, { ja: "開発費用シミュレーター", en: "Development Cost Estimator" })}
                    description={l(locale, {
                        ja: "4つの質問に答えるだけで、アプリ・Webサービスの開発費用を即座に概算します。",
                        en: "Answer 4 simple questions to get an instant estimate for your app or web service development."
                    })}
                />

                <section className="py-16 md:py-24 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[900px] px-6">

                        {/* Progress Bar */}
                        <motion.div className="mb-12" {...MV} custom={0}>
                            <div className="flex items-center justify-between mb-3">
                                {steps.map((s, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${i <= step
                                            ? "bg-[var(--color-brand-active)] text-white"
                                            : "bg-secondary text-muted-foreground"
                                            }`}>
                                            {i < step ? <CheckCircle size={14} /> : i + 1}
                                        </span>
                                        <span className={`hidden sm:block text-xs font-medium transition-colors ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                                            {l(locale, s.label)}
                                        </span>
                                        {i < steps.length - 1 && (
                                            <ChevronRight size={14} className="text-muted-foreground/40 mx-0.5 hidden sm:block" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-active)] to-[var(--color-brand)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                />
                            </div>
                        </motion.div>

                        {/* Step Content */}
                        <div className="relative min-h-[450px]">
                            <AnimatePresence mode="wait" custom={direction}>

                                {/* Step 0: Platform */}
                                {step === 0 && (
                                    <motion.div key="step0" custom={direction} variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                                            {l(locale, { ja: "プラットフォームを選択してください", en: "Select your platform" })}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-8">
                                            {l(locale, { ja: "開発対象のプラットフォームを選択します。", en: "Choose which platform you're building for." })}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {platforms.map((p) => {
                                                const Icon = p.icon;
                                                const selected = platform === p.id;
                                                return (
                                                    <button key={p.id} onClick={() => setPlatform(p.id)}
                                                        className={`relative p-6 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${selected
                                                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-[0_0_20px_rgba(105,108,255,0.15)]"
                                                            : "border-border bg-card hover:border-[var(--color-brand)]/30"}`}>
                                                        {selected && <motion.div className="absolute top-2 right-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}><CheckCircle size={16} className="text-[var(--color-brand)]" /></motion.div>}
                                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${selected ? "bg-[var(--color-brand)]/15" : "bg-secondary"}`}>
                                                            <Icon size={28} className={selected ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <span className={`text-sm font-bold block mb-1 ${selected ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, p.label)}</span>
                                                        <span className="text-xs text-muted-foreground">{l(locale, p.desc)}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 1: Screen Count */}
                                {step === 1 && (
                                    <motion.div key="step1" custom={direction} variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                                            {l(locale, { ja: "画面数の目安を教えてください", en: "How many screens do you need?" })}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-8">
                                            {l(locale, { ja: "ログイン画面、一覧画面、詳細画面などを含めたおおよその画面数です。", en: "Including login, list, detail screens, etc." })}
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {screenCounts.map((sc) => {
                                                const selected = screenCount === sc.id;
                                                return (
                                                    <button key={sc.id} onClick={() => setScreenCount(sc.id)}
                                                        className={`relative p-5 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${selected
                                                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-[0_0_20px_rgba(105,108,255,0.15)]"
                                                            : "border-border bg-card hover:border-[var(--color-brand)]/30"}`}>
                                                        {selected && <motion.div className="absolute top-2 right-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}><CheckCircle size={16} className="text-[var(--color-brand)]" /></motion.div>}
                                                        <span className={`text-lg font-bold block mb-1 ${selected ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, sc.label)}</span>
                                                        <span className="text-xs text-muted-foreground">{l(locale, sc.desc)}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Features */}
                                {step === 2 && (
                                    <motion.div key="step2" custom={direction} variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                                            {l(locale, { ja: "必要な機能を選択してください", en: "Select required features" })}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-8">
                                            {l(locale, { ja: "選択なしでもOKです。後から追加も可能です。", en: "Optional — you can skip or add more later." })}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {features.map((f) => {
                                                const Icon = f.icon;
                                                const selected = selectedFeatures.includes(f.id);
                                                return (
                                                    <button key={f.id} onClick={() => toggleFeature(f.id)}
                                                        className={`relative flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer ${selected
                                                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-[0_0_20px_rgba(105,108,255,0.15)]"
                                                            : "border-border bg-card hover:border-[var(--color-brand)]/30"}`}>
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-[var(--color-brand)]/15" : "bg-secondary"}`}>
                                                            <Icon size={20} className={selected ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className={`text-sm font-semibold ${selected ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, f.label)}</span>
                                                            <p className="text-xs text-muted-foreground mt-0.5">+{f.cost}{l(locale, { ja: "万円〜", en: "0K yen~" })}</p>
                                                        </div>
                                                        {selected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}><CheckCircle size={18} className="text-[var(--color-brand)]" /></motion.div>}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Design */}
                                {step === 3 && (
                                    <motion.div key="step3" custom={direction} variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                                            {l(locale, { ja: "デザインのレベルを選択してください", en: "Select design level" })}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-8">
                                            {l(locale, { ja: "デザインの品質レベルを選択します。", en: "Choose the quality level of design." })}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {designLevels.map((d) => {
                                                const Icon = d.icon;
                                                const selected = design === d.id;
                                                return (
                                                    <button key={d.id} onClick={() => setDesign(d.id)}
                                                        className={`relative p-6 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${selected
                                                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-[0_0_20px_rgba(105,108,255,0.15)]"
                                                            : "border-border bg-card hover:border-[var(--color-brand)]/30"}`}>
                                                        {selected && <motion.div className="absolute top-2 right-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}><CheckCircle size={16} className="text-[var(--color-brand)]" /></motion.div>}
                                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${selected ? "bg-[var(--color-brand)]/15" : "bg-secondary"}`}>
                                                            <Icon size={28} className={selected ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <span className={`text-sm font-bold block mb-1 ${selected ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, d.label)}</span>
                                                        <span className="text-xs text-muted-foreground block mb-2">{l(locale, d.desc)}</span>
                                                        <span className="text-xs font-medium text-[var(--color-brand)]">×{d.multiplier}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Results */}
                                {step === 4 && result && (
                                    <motion.div key="step4" custom={direction} variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}>
                                        <div className="text-center mb-10">
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.2 }}>
                                                <FileText size={40} className="mx-auto mb-4 text-[var(--color-brand-gold)]" />
                                            </motion.div>
                                            <h2 className="text-xl md:text-2xl font-bold mb-2">
                                                {l(locale, { ja: "概算見積もり結果", en: "Estimate Results" })}
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                {l(locale, {
                                                    ja: `${platforms.find(p => p.id === platform)?.label.ja} × ${screenCounts.find(s => s.id === screenCount)?.label.ja} × ${designLevels.find(d => d.id === design)?.label.ja}デザイン`,
                                                    en: `${platforms.find(p => p.id === platform)?.label.en} × ${screenCounts.find(s => s.id === screenCount)?.label.en} screens × ${designLevels.find(d => d.id === design)?.label.en} design`
                                                })}
                                            </p>
                                        </div>

                                        {/* Main Cost Display */}
                                        <motion.div
                                            className="p-8 rounded-2xl border-2 border-[var(--color-brand)]/30 bg-card text-center mb-6"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <p className="text-sm text-muted-foreground mb-2">{l(locale, { ja: "概算開発費用", en: "Estimated Cost" })}</p>
                                            <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-gold)] bg-clip-text text-transparent">
                                                <AnimatedCounter value={result.minCost} prefix="" suffix="" />
                                                <span className="text-2xl mx-2">〜</span>
                                                <AnimatedCounter value={result.maxCost} prefix="" suffix="" />
                                                <span className="text-xl">{l(locale, { ja: "万円", en: "万円" })}</span>
                                            </p>
                                        </motion.div>

                                        {/* Detail Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                            {[
                                                { icon: Coins, color: "text-emerald-400", bg: "bg-emerald-500/10", label: { ja: "基本開発費", en: "Base Cost" }, value: `¥${result.baseCost}${l(locale, { ja: "万", en: "0K" })}` },
                                                { icon: Settings, color: "text-sky-400", bg: "bg-sky-500/10", label: { ja: "機能追加費", en: "Feature Cost" }, value: `¥${result.featureCost}${l(locale, { ja: "万", en: "0K" })}` },
                                                { icon: Clock, color: "text-violet-400", bg: "bg-violet-500/10", label: { ja: "想定期間", en: "Timeline" }, value: `${result.months}${l(locale, { ja: "ヶ月", en: " months" })}` },
                                            ].map((card, i) => {
                                                const Icon = card.icon;
                                                return (
                                                    <motion.div key={i} className="p-5 rounded-xl border border-border bg-card text-center"
                                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.5 + i * 0.1 }}>
                                                        <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mx-auto mb-3`}>
                                                            <Icon size={20} className={card.color} />
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mb-1">{l(locale, card.label)}</p>
                                                        <p className="text-lg font-bold">{card.value}</p>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Included Services */}
                                        <motion.div className="p-6 rounded-xl border border-border bg-card mb-8"
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}>
                                            <h3 className="text-sm font-bold mb-4">{l(locale, { ja: "含まれるサービス", en: "Included Services" })}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {result.includedServices.map((svc, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                                                        <span className="text-sm text-muted-foreground">{svc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Disclaimer */}
                                        <motion.p className="text-xs text-muted-foreground text-center mb-8"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                            {l(locale, { ja: "※ 上記はあくまで概算です。実際の費用はヒアリング後に正式なお見積もりをご提示します。", en: "* This is a rough estimate. Formal quotes are provided after a consultation." })}
                                        </motion.p>

                                        {/* CTAs */}
                                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2 }}>
                                            <Link href="/contact"
                                                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold hover:bg-[var(--color-brand)] transition-all shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden">
                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                <span className="relative z-10 flex items-center gap-2">
                                                    {l(locale, { ja: "この条件で正式見積もりを依頼", en: "Request Formal Quote" })} <ArrowRight size={18} />
                                                </span>
                                            </Link>
                                            <Link href="/case-studies"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                                {l(locale, { ja: "導入事例を見る", en: "View Case Studies" })} <ArrowRight size={16} />
                                            </Link>
                                        </motion.div>

                                        {/* Reset */}
                                        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                                            <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                                                {l(locale, { ja: "もう一度見積もりする", en: "Run estimate again" })}
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        {step < 4 && (
                            <motion.div className="flex items-center justify-between mt-10" {...MV} custom={5}>
                                <button onClick={goBack} disabled={step === 0}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                                    <ArrowLeft size={16} /> {l(locale, { ja: "戻る", en: "Back" })}
                                </button>
                                <button onClick={goNext} disabled={!canProceed}
                                    className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${canProceed
                                        ? "bg-[var(--color-brand-active)] text-white hover:bg-[var(--color-brand)] shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35)] hover:-translate-y-0.5"
                                        : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
                                    {step === 3 ? l(locale, { ja: "見積もりを見る", en: "See Estimate" }) : l(locale, { ja: "次へ", en: "Next" })}
                                    <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        )}
                    </div>
                </section>

                <GradientDivider />

                {/* Bottom CTA */}
                <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
                    <div className="mx-auto max-w-[800px] px-6 text-center">
                        <motion.p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-4" {...MV} custom={0}>
                            {l(locale, { ja: "Partner Growth", en: "PARTNER GROWTH" })}
                        </motion.p>
                        <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" {...MV} custom={0.5}>
                            {l(locale, { ja: "見積もりの先へ。", en: "Beyond the estimate." })}
                        </motion.h2>
                        <motion.p className="text-muted-foreground mb-8" {...MV} custom={1}>
                            {l(locale, {
                                ja: "ProductXなら、企画・設計から開発・グロースまで一気通貫でサポート。まずは無料ヒアリングで、御社のプロジェクトに最適なプランをご提案します。",
                                en: "ProductX provides end-to-end support from planning to growth. Start with a free consultation to get the optimal plan for your project."
                            })}
                        </motion.p>
                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...MV} custom={1.5}>
                            <Link href="/services/partner-growth" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                {l(locale, { ja: "Partner Growthサービス詳細", en: "Partner Growth Details" })} <ArrowRight size={16} />
                            </Link>
                            <Link href="/tools/ai-simulator" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:gap-3 transition-all">
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
