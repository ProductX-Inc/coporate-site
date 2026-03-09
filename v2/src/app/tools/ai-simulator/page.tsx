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
    ArrowRight, ArrowLeft, ChevronRight, Factory, Building2, Users,
    Truck, Landmark, ShoppingBag, Monitor, MoreHorizontal,
    Mail, FileText, HelpCircle, BarChart3, ListChecks, Megaphone,
    Clock, Coins, TrendingUp, Sparkles, CheckCircle,
} from "lucide-react";

/* ── helpers ── */

type I18n = { ja: string; en: string };
const l = (locale: Locale, v: I18n) => v[locale];

const MV = { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true }, variants: fadeUp };

/* ── data ── */

const industries = [
    { id: "manufacturing", icon: Factory, label: { ja: "製造・メーカー", en: "Manufacturing" }, coeff: 0.85 },
    { id: "realestate", icon: Building2, label: { ja: "不動産", en: "Real Estate" }, coeff: 0.80 },
    { id: "hr", icon: Users, label: { ja: "人材・HR", en: "HR & Recruiting" }, coeff: 0.90 },
    { id: "logistics", icon: Truck, label: { ja: "物流", en: "Logistics" }, coeff: 0.75 },
    { id: "finance", icon: Landmark, label: { ja: "金融・保険", en: "Finance" }, coeff: 0.70 },
    { id: "retail", icon: ShoppingBag, label: { ja: "小売・サービス", en: "Retail" }, coeff: 0.85 },
    { id: "it", icon: Monitor, label: { ja: "IT・Web", en: "IT & Web" }, coeff: 1.0 },
    { id: "other", icon: MoreHorizontal, label: { ja: "その他", en: "Other" }, coeff: 0.80 },
];

const employeeSizes = [
    { id: "1-10", label: { ja: "1〜10名", en: "1-10" }, midpoint: 5 },
    { id: "11-50", label: { ja: "11〜50名", en: "11-50" }, midpoint: 30 },
    { id: "51-100", label: { ja: "51〜100名", en: "51-100" }, midpoint: 75 },
    { id: "101-300", label: { ja: "101〜300名", en: "101-300" }, midpoint: 200 },
    { id: "300+", label: { ja: "300名以上", en: "300+" }, midpoint: 500 },
];

const challenges = [
    { id: "email", icon: Mail, label: { ja: "メール・資料作成", en: "Email & Documents" }, hoursPerMonth: 8 },
    { id: "invoice", icon: FileText, label: { ja: "請求書処理", en: "Invoice Processing" }, hoursPerMonth: 6 },
    { id: "faq", icon: HelpCircle, label: { ja: "FAQ・問い合わせ対応", en: "FAQ & Support" }, hoursPerMonth: 10 },
    { id: "analytics", icon: BarChart3, label: { ja: "データ分析", en: "Data Analysis" }, hoursPerMonth: 5 },
    { id: "saleslist", icon: ListChecks, label: { ja: "営業リスト作成", en: "Sales Target Lists" }, hoursPerMonth: 7 },
    { id: "ads", icon: Megaphone, label: { ja: "広告運用", en: "Ad Operations" }, hoursPerMonth: 12 },
];

/* ── simulation logic ── */

interface SimResult {
    annualHoursSaved: number;
    annualCostSaved: number;   // 万円
    estimatedROI: number;      // %
    monthlyHoursSaved: number;
}

function estimateImpact(
    industryId: string,
    sizeId: string,
    selectedChallenges: string[]
): SimResult {
    const industry = industries.find(i => i.id === industryId)!;
    const size = employeeSizes.find(s => s.id === sizeId)!;

    const monthlyHours = selectedChallenges.reduce((sum, cId) => {
        const ch = challenges.find(c => c.id === cId)!;
        // 全社員が該当するわけではないので、影響を受ける比率を適用
        const affectedRatio = Math.min(0.3 + selectedChallenges.length * 0.05, 0.6);
        return sum + ch.hoursPerMonth * size.midpoint * affectedRatio * industry.coeff;
    }, 0);

    const annualHours = Math.round(monthlyHours * 12);
    const hourlyRate = 2500; // 時給2,500円
    const annualCost = Math.round((annualHours * hourlyRate) / 10000); // 万円
    const initialInvestment = Math.max(30, Math.round(annualCost * 0.15)); // 初期投資目安
    const roi = initialInvestment > 0 ? Math.round(((annualCost - initialInvestment) / initialInvestment) * 100) : 0;

    return {
        annualHoursSaved: annualHours,
        annualCostSaved: annualCost,
        estimatedROI: Math.max(roi, 50),
        monthlyHoursSaved: Math.round(monthlyHours),
    };
}

/* ── animated counter ── */

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 1.5 }: {
    value: number; suffix?: string; prefix?: string; duration?: number;
}) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<{ start: number; end: number; raf: number | null }>({ start: 0, end: 0, raf: null });

    useEffect(() => {
        const startTime = performance.now();
        ref.current.end = value;

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setDisplay(Math.round(eased * ref.current.end));
            if (progress < 1) {
                ref.current.raf = requestAnimationFrame(animate);
            }
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

export default function AiSimulatorPage() {
    const { locale } = useLang();
    const [step, setStep] = useState(0); // 0=industry, 1=size, 2=challenges, 3=result
    const [direction, setDirection] = useState(1);
    const [industry, setIndustry] = useState("");
    const [size, setSize] = useState("");
    const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
    const [result, setResult] = useState<SimResult | null>(null);

    const canProceed = step === 0 ? !!industry : step === 1 ? !!size : step === 2 ? selectedChallenges.length > 0 : false;

    const goNext = () => {
        if (!canProceed) return;
        if (step === 2) {
            setResult(estimateImpact(industry, size, selectedChallenges));
        }
        setDirection(1);
        setStep(s => s + 1);
    };

    const goBack = () => {
        setDirection(-1);
        setStep(s => Math.max(0, s - 1));
    };

    const toggleChallenge = (id: string) => {
        setSelectedChallenges(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const reset = () => {
        setStep(0);
        setIndustry("");
        setSize("");
        setSelectedChallenges([]);
        setResult(null);
    };

    const steps = [
        { label: { ja: "業種", en: "Industry" } },
        { label: { ja: "従業員数", en: "Team Size" } },
        { label: { ja: "課題", en: "Challenges" } },
        { label: { ja: "結果", en: "Results" } },
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label="AI DX TOOLS"
                    title={l(locale, { ja: "AI導入効果シミュレーター", en: "AI Impact Simulator" })}
                    description={l(locale, {
                        ja: "3つの質問に答えるだけで、AI導入による業務効率化の効果を即座に試算します。",
                        en: "Answer 3 simple questions to instantly estimate the impact of AI adoption on your business."
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
                                        <span className={`hidden sm:block text-xs font-medium transition-colors ${i <= step ? "text-foreground" : "text-muted-foreground"
                                            }`}>
                                            {l(locale, s.label)}
                                        </span>
                                        {i < steps.length - 1 && (
                                            <ChevronRight size={14} className="text-muted-foreground/40 mx-1 hidden sm:block" />
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
                        <div className="relative min-h-[400px]">
                            <AnimatePresence mode="wait" custom={direction}>
                                {/* Step 0: Industry */}
                                {step === 0 && (
                                    <motion.div
                                        key="step0"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                                            {l(locale, { ja: "御社の業種を教えてください", en: "What industry is your company in?" })}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-8">
                                            {l(locale, { ja: "業種に応じたAI活用の効果を算出します。", en: "We'll calculate AI impact specific to your industry." })}
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {industries.map((ind) => {
                                                const Icon = ind.icon;
                                                const selected = industry === ind.id;
                                                return (
                                                    <button
                                                        key={ind.id}
                                                        onClick={() => setIndustry(ind.id)}
                                                        className={`relative p-5 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${selected
                                                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-[0_0_20px_rgba(105,108,255,0.15)]"
                                                            : "border-border bg-card hover:border-[var(--color-brand)]/30 hover:bg-card/80"
                                                            }`}
                                                    >
                                                        {selected && (
                                                            <motion.div
                                                                className="absolute top-2 right-2"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ type: "spring", damping: 15 }}
                                                            >
                                                                <CheckCircle size={16} className="text-[var(--color-brand)]" />
                                                            </motion.div>
                                                        )}
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors ${selected ? "bg-[var(--color-brand)]/15" : "bg-secondary"
                                                            }`}>
                                                            <Icon size={20} className={selected ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <span className={`text-sm font-medium ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                                                            {l(locale, ind.label)}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 1: Size */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                                            {l(locale, { ja: "従業員数を教えてください", en: "How many employees do you have?" })}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-8">
                                            {l(locale, { ja: "組織の規模に応じた効果を試算します。", en: "We'll estimate impact based on your organization size." })}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                            {employeeSizes.map((s) => {
                                                const selected = size === s.id;
                                                return (
                                                    <button
                                                        key={s.id}
                                                        onClick={() => setSize(s.id)}
                                                        className={`relative p-5 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${selected
                                                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-[0_0_20px_rgba(105,108,255,0.15)]"
                                                            : "border-border bg-card hover:border-[var(--color-brand)]/30"
                                                            }`}
                                                    >
                                                        {selected && (
                                                            <motion.div
                                                                className="absolute top-2 right-2"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ type: "spring", damping: 15 }}
                                                            >
                                                                <CheckCircle size={16} className="text-[var(--color-brand)]" />
                                                            </motion.div>
                                                        )}
                                                        <Users size={20} className={`mx-auto mb-2 ${selected ? "text-[var(--color-brand)]" : "text-muted-foreground"}`} />
                                                        <span className={`text-sm font-bold ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                                                            {l(locale, s.label)}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Challenges */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                                            {l(locale, { ja: "解決したい課題を選択してください", en: "Select the challenges you want to solve" })}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-8">
                                            {l(locale, { ja: "複数選択可能です。AI導入の効果が大きい課題を算出します。", en: "Select multiple. We'll calculate the areas where AI has the most impact." })}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {challenges.map((ch) => {
                                                const Icon = ch.icon;
                                                const selected = selectedChallenges.includes(ch.id);
                                                return (
                                                    <button
                                                        key={ch.id}
                                                        onClick={() => toggleChallenge(ch.id)}
                                                        className={`relative flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer ${selected
                                                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-[0_0_20px_rgba(105,108,255,0.15)]"
                                                            : "border-border bg-card hover:border-[var(--color-brand)]/30"
                                                            }`}
                                                    >
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-[var(--color-brand)]/15" : "bg-secondary"
                                                            }`}>
                                                            <Icon size={20} className={selected ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className={`text-sm font-semibold ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                                                                {l(locale, ch.label)}
                                                            </span>
                                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                                {l(locale, { ja: `月 ${ch.hoursPerMonth}h / 人の削減見込み`, en: `Est. ${ch.hoursPerMonth}h/person/month saved` })}
                                                            </p>
                                                        </div>
                                                        {selected && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ type: "spring", damping: 15 }}
                                                            >
                                                                <CheckCircle size={18} className="text-[var(--color-brand)]" />
                                                            </motion.div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Results */}
                                {step === 3 && result && (
                                    <motion.div
                                        key="step3"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        <div className="text-center mb-10">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                            >
                                                <Sparkles size={40} className="mx-auto mb-4 text-[var(--color-brand-gold)]" />
                                            </motion.div>
                                            <h2 className="text-xl md:text-2xl font-bold mb-2">
                                                {l(locale, { ja: "シミュレーション結果", en: "Simulation Results" })}
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                {l(locale, {
                                                    ja: `${industries.find(i => i.id === industry)?.label.ja} × ${employeeSizes.find(s => s.id === size)?.label.ja} × ${selectedChallenges.length}つの課題`,
                                                    en: `${industries.find(i => i.id === industry)?.label.en} × ${employeeSizes.find(s => s.id === size)?.label.en} × ${selectedChallenges.length} challenges`
                                                })}
                                            </p>
                                        </div>

                                        {/* Result Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                                            {[
                                                {
                                                    icon: Clock, color: "text-sky-400", bg: "bg-sky-500/10",
                                                    label: { ja: "年間削減時間", en: "Annual Hours Saved" },
                                                    value: result.annualHoursSaved, suffix: "h",
                                                    sub: { ja: `月 ${result.monthlyHoursSaved}h`, en: `${result.monthlyHoursSaved}h/month` },
                                                },
                                                {
                                                    icon: Coins, color: "text-emerald-400", bg: "bg-emerald-500/10",
                                                    label: { ja: "年間コスト削減", en: "Annual Cost Savings" },
                                                    value: result.annualCostSaved, prefix: "¥", suffix: l(locale, { ja: "万", en: "0K" }),
                                                    sub: { ja: "人件費換算", en: "Labor cost equivalent" },
                                                },
                                                {
                                                    icon: TrendingUp, color: "text-violet-400", bg: "bg-violet-500/10",
                                                    label: { ja: "推定ROI", en: "Estimated ROI" },
                                                    value: result.estimatedROI, suffix: "%",
                                                    sub: { ja: "初年度ベース", en: "First year basis" },
                                                },
                                            ].map((card, i) => {
                                                const Icon = card.icon;
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        className="p-6 rounded-2xl border border-border bg-card text-center"
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                                                    >
                                                        <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mx-auto mb-4`}>
                                                            <Icon size={22} className={card.color} />
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mb-2">{l(locale, card.label)}</p>
                                                        <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-gold)] bg-clip-text text-transparent">
                                                            <AnimatedCounter value={card.value} prefix={card.prefix} suffix={card.suffix} />
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-2">{l(locale, card.sub)}</p>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Before/After Bar */}
                                        <motion.div
                                            className="p-6 rounded-2xl border border-border bg-card mb-10"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                        >
                                            <h3 className="text-sm font-bold mb-4">
                                                {l(locale, { ja: "業務時間の変化イメージ（月間）", en: "Monthly Work Hours Change" })}
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                                                        <span>Before</span>
                                                        <span>{l(locale, { ja: "現在の業務時間", en: "Current work hours" })}</span>
                                                    </div>
                                                    <div className="h-8 rounded-lg bg-destructive/20 w-full relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-destructive/30 rounded-lg" />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-destructive">100%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                                                        <span>After</span>
                                                        <span>{l(locale, { ja: "AI導入後", en: "After AI adoption" })}</span>
                                                    </div>
                                                    <div className="h-8 rounded-lg bg-secondary relative overflow-hidden">
                                                        <motion.div
                                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-brand-active)] to-[var(--color-brand)] rounded-lg"
                                                            initial={{ width: "100%" }}
                                                            animate={{ width: `${Math.max(20, 100 - Math.min(result.annualHoursSaved / (employeeSizes.find(s => s.id === size)!.midpoint * selectedChallenges.length * 4) * 10, 70))}%` }}
                                                            transition={{ delay: 1, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                                                        />
                                                        <motion.span
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-brand)]"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 2 }}
                                                        >
                                                            {Math.max(20, Math.round(100 - Math.min(result.annualHoursSaved / (employeeSizes.find(s => s.id === size)!.midpoint * selectedChallenges.length * 4) * 10, 70)))}%
                                                        </motion.span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* CTAs */}
                                        <motion.div
                                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2, duration: 0.5 }}
                                        >
                                            <Link
                                                href="/contact"
                                                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold hover:bg-[var(--color-brand)] transition-all shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden"
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                <span className="relative z-10 flex items-center gap-2">
                                                    {l(locale, { ja: "無料AI診断を申し込む", en: "Request Free AI Diagnosis" })} <ArrowRight size={18} />
                                                </span>
                                            </Link>
                                            <Link
                                                href="/case-studies"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all"
                                            >
                                                {l(locale, { ja: "導入事例を見る", en: "View Case Studies" })} <ArrowRight size={16} />
                                            </Link>
                                        </motion.div>

                                        {/* Reset */}
                                        <motion.div
                                            className="text-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.5 }}
                                        >
                                            <button
                                                onClick={reset}
                                                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                                            >
                                                {l(locale, { ja: "もう一度シミュレーションする", en: "Run simulation again" })}
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        {step < 3 && (
                            <motion.div
                                className="flex items-center justify-between mt-10"
                                {...MV} custom={5}
                            >
                                <button
                                    onClick={goBack}
                                    disabled={step === 0}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ArrowLeft size={16} /> {l(locale, { ja: "戻る", en: "Back" })}
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={!canProceed}
                                    className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${canProceed
                                        ? "bg-[var(--color-brand-active)] text-white hover:bg-[var(--color-brand)] shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35)] hover:-translate-y-0.5"
                                        : "bg-secondary text-muted-foreground cursor-not-allowed"
                                        }`}
                                >
                                    {step === 2
                                        ? l(locale, { ja: "結果を見る", en: "See Results" })
                                        : l(locale, { ja: "次へ", en: "Next" })
                                    }
                                    <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        )}
                    </div>
                </section>

                <GradientDivider />

                {/* Bottom CTA Section */}
                <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
                    <div className="mx-auto max-w-[800px] px-6 text-center">
                        <motion.p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-4"
                            {...MV} custom={0}>
                            {l(locale, { ja: "AI DXサービス", en: "AI DX SERVICE" })}
                        </motion.p>
                        <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
                            {...MV} custom={0.5}>
                            {l(locale, { ja: "シミュレーションの先へ。", en: "Beyond simulation." })}
                        </motion.h2>
                        <motion.p className="text-muted-foreground mb-8"
                            {...MV} custom={1}>
                            {l(locale, {
                                ja: "ProductXのAI DXサービスなら、即日〜で業務改革を実現。まずは無料AI診断で、御社に最適なソリューションをご提案します。",
                                en: "With ProductX's AI DX services, transform your operations starting today. Get a free AI diagnosis to find the optimal solution for your business."
                            })}
                        </motion.p>
                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            {...MV} custom={1.5}>
                            <Link href="/services/ai-dx" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                {l(locale, { ja: "AI DXサービス詳細を見る", en: "View AI DX Service Details" })} <ArrowRight size={16} />
                            </Link>
                            <Link href="/tools/estimate" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground hover:gap-3 transition-all">
                                {l(locale, { ja: "開発費用を試算する", en: "Estimate Development Costs" })} <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
