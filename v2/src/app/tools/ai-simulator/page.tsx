"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang } from "@/components/lang-provider";
import {
    Factory, Building2, Users, Truck, Landmark, ShoppingBag, Monitor, MoreHorizontal,
    Mail, FileText, HelpCircle, BarChart3, ListChecks, Megaphone,
    Clock, Coins, TrendingUp, Sparkles,
} from "lucide-react";
import {
    l, MV, cardCls, SelectedBadge, AnimatedCounter, slideVariants, SLIDE_TRANSITION,
    StepProgress, StepNav, BottomCTA, PrimaryCTA, SecondaryLink,
} from "@/components/ui/simulator-shared";

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
    { id: "email", icon: Mail, label: { ja: "メール・資料作成", en: "Email & Documents" }, hpm: 8 },
    { id: "invoice", icon: FileText, label: { ja: "請求書処理", en: "Invoice Processing" }, hpm: 6 },
    { id: "faq", icon: HelpCircle, label: { ja: "FAQ・問い合わせ対応", en: "FAQ & Support" }, hpm: 10 },
    { id: "analytics", icon: BarChart3, label: { ja: "データ分析", en: "Data Analysis" }, hpm: 5 },
    { id: "saleslist", icon: ListChecks, label: { ja: "営業リスト作成", en: "Sales Target Lists" }, hpm: 7 },
    { id: "ads", icon: Megaphone, label: { ja: "広告運用", en: "Ad Operations" }, hpm: 12 },
];

/* ── simulation logic ── */

function estimateImpact(industryId: string, sizeId: string, selected: string[]) {
    const ind = industries.find(i => i.id === industryId)!;
    const sz = employeeSizes.find(s => s.id === sizeId)!;
    const ratio = Math.min(0.3 + selected.length * 0.05, 0.6);

    const monthly = selected.reduce((sum, cId) => {
        const ch = challenges.find(c => c.id === cId)!;
        return sum + ch.hpm * sz.midpoint * ratio * ind.coeff;
    }, 0);

    const annual = Math.round(monthly * 12);
    const cost = Math.round((annual * 2500) / 10000); // 万円
    const invest = Math.max(30, Math.round(cost * 0.15));
    const roi = Math.max(50, Math.round(((cost - invest) / invest) * 100));
    const afterPct = Math.max(20, Math.round(100 - Math.min(annual / (sz.midpoint * selected.length * 4) * 10, 70)));

    return { annual, monthly: Math.round(monthly), cost, roi, afterPct };
}

/* ── page ── */

const STEPS = [
    { ja: "業種", en: "Industry" },
    { ja: "従業員数", en: "Team Size" },
    { ja: "課題", en: "Challenges" },
    { ja: "結果", en: "Results" },
];

export default function AiSimulatorPage() {
    const { locale } = useLang();
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [industry, setIndustry] = useState("");
    const [size, setSize] = useState("");
    const [selChallenges, setSelChallenges] = useState<string[]>([]);
    const [result, setResult] = useState<ReturnType<typeof estimateImpact> | null>(null);

    const canProceed = step === 0 ? !!industry : step === 1 ? !!size : step === 2 ? selChallenges.length > 0 : false;

    const goNext = () => {
        if (!canProceed) return;
        if (step === 2) setResult(estimateImpact(industry, size, selChallenges));
        setDir(1);
        setStep(s => s + 1);
    };
    const goBack = () => { setDir(-1); setStep(s => Math.max(0, s - 1)); };

    const toggle = (id: string) => setSelChallenges(p => p.includes(id) ? p.filter(c => c !== id) : [...p, id]);
    const reset = () => { setStep(0); setIndustry(""); setSize(""); setSelChallenges([]); setResult(null); };

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label="AI DX TOOLS"
                    title={l(locale, { ja: "AI導入効果シミュレーター", en: "AI Impact Simulator" })}
                    description={l(locale, { ja: "3つの質問に答えるだけで、AI導入による業務効率化の効果を即座に試算します。", en: "Answer 3 simple questions to instantly estimate the impact of AI adoption on your business." })}
                />

                <section className="py-16 md:py-24 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[900px] px-6">
                        <StepProgress steps={STEPS} current={step} />

                        <div className="relative min-h-[400px]">
                            <AnimatePresence mode="wait" custom={dir}>
                                {/* Step 0: Industry */}
                                {step === 0 && (
                                    <motion.div key="s0" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "御社の業種を教えてください", en: "What industry is your company in?" })}</h2>
                                        <p className="text-sm text-muted-foreground mb-8">{l(locale, { ja: "業種に応じたAI活用の効果を算出します。", en: "We'll calculate AI impact specific to your industry." })}</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {industries.map(ind => {
                                                const Icon = ind.icon; const sel = industry === ind.id;
                                                return (
                                                    <button key={ind.id} onClick={() => setIndustry(ind.id)} className={`${cardCls(sel)} p-5`}>
                                                        {sel && <SelectedBadge />}
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors ${sel ? "bg-[var(--color-brand)]/15" : "bg-secondary"}`}>
                                                            <Icon size={20} className={sel ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <span className={`text-sm font-medium ${sel ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, ind.label)}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 1: Size */}
                                {step === 1 && (
                                    <motion.div key="s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "従業員数を教えてください", en: "How many employees do you have?" })}</h2>
                                        <p className="text-sm text-muted-foreground mb-8">{l(locale, { ja: "組織の規模に応じた効果を試算します。", en: "We'll estimate impact based on your organization size." })}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                            {employeeSizes.map(s => {
                                                const sel = size === s.id;
                                                return (
                                                    <button key={s.id} onClick={() => setSize(s.id)} className={`${cardCls(sel)} p-5`}>
                                                        {sel && <SelectedBadge />}
                                                        <Users size={20} className={`mx-auto mb-2 ${sel ? "text-[var(--color-brand)]" : "text-muted-foreground"}`} />
                                                        <span className={`text-sm font-bold ${sel ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, s.label)}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Challenges */}
                                {step === 2 && (
                                    <motion.div key="s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "解決したい課題を選択してください", en: "Select the challenges you want to solve" })}</h2>
                                        <p className="text-sm text-muted-foreground mb-8">{l(locale, { ja: "複数選択可能です。AI導入の効果が大きい課題を算出します。", en: "Select multiple. We'll calculate the areas where AI has the most impact." })}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {challenges.map(ch => {
                                                const Icon = ch.icon; const sel = selChallenges.includes(ch.id);
                                                return (
                                                    <button key={ch.id} onClick={() => toggle(ch.id)} className={`${cardCls(sel)} flex items-center gap-4 p-5 text-left`}>
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${sel ? "bg-[var(--color-brand)]/15" : "bg-secondary"}`}>
                                                            <Icon size={20} className={sel ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className={`text-sm font-semibold ${sel ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, ch.label)}</span>
                                                            <p className="text-xs text-muted-foreground mt-0.5">{l(locale, { ja: `月 ${ch.hpm}h / 人の削減見込み`, en: `Est. ${ch.hpm}h/person/month saved` })}</p>
                                                        </div>
                                                        {sel && <SelectedBadge />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Results */}
                                {step === 3 && result && (
                                    <motion.div key="s3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <div className="text-center mb-10">
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.2 }}>
                                                <Sparkles size={40} className="mx-auto mb-4 text-[var(--color-brand-gold)]" />
                                            </motion.div>
                                            <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "シミュレーション結果", en: "Simulation Results" })}</h2>
                                            <p className="text-sm text-muted-foreground">
                                                {industries.find(i => i.id === industry)?.label[locale]} × {employeeSizes.find(s => s.id === size)?.label[locale]} × {selChallenges.length}{l(locale, { ja: "つの課題", en: " challenges" })}
                                            </p>
                                        </div>

                                        {/* Result Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                                            {([
                                                { icon: Clock, color: "text-sky-400", bg: "bg-sky-500/10", label: { ja: "年間削減時間", en: "Annual Hours Saved" }, val: result.annual, prefix: "", suffix: "h", sub: { ja: `月 ${result.monthly}h`, en: `${result.monthly}h/month` } },
                                                { icon: Coins, color: "text-emerald-400", bg: "bg-emerald-500/10", label: { ja: "年間コスト削減", en: "Annual Cost Savings" }, val: result.cost, prefix: "¥", suffix: l(locale, { ja: "万", en: "0K" }), sub: { ja: "人件費換算", en: "Labor cost equivalent" } },
                                                { icon: TrendingUp, color: "text-violet-400", bg: "bg-violet-500/10", label: { ja: "推定ROI", en: "Estimated ROI" }, val: result.roi, prefix: "", suffix: "%", sub: { ja: "初年度ベース", en: "First year basis" } },
                                            ] as const).map((c, i) => {
                                                const Icon = c.icon;
                                                return (
                                                    <motion.div key={i} className="p-6 rounded-2xl border border-border bg-card text-center"
                                                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                                                        <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mx-auto mb-4`}><Icon size={22} className={c.color} /></div>
                                                        <p className="text-xs text-muted-foreground mb-2">{l(locale, c.label)}</p>
                                                        <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-gold)] bg-clip-text text-transparent">
                                                            <AnimatedCounter value={c.val} prefix={c.prefix} suffix={c.suffix} />
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-2">{l(locale, c.sub)}</p>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Before/After Bar */}
                                        <motion.div className="p-6 rounded-2xl border border-border bg-card mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                                            <h3 className="text-sm font-bold mb-4">{l(locale, { ja: "業務時間の変化イメージ（月間）", en: "Monthly Work Hours Change" })}</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Before</span><span>{l(locale, { ja: "現在の業務時間", en: "Current work hours" })}</span></div>
                                                    <div className="h-8 rounded-lg bg-destructive/20 w-full relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-destructive/30 rounded-lg" />
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-destructive">100%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>After</span><span>{l(locale, { ja: "AI導入後", en: "After AI adoption" })}</span></div>
                                                    <div className="h-8 rounded-lg bg-secondary relative overflow-hidden">
                                                        <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-brand-active)] to-[var(--color-brand)] rounded-lg"
                                                            initial={{ width: "100%" }} animate={{ width: `${result.afterPct}%` }} transition={{ delay: 1, duration: 1.2, ease: [0.25, 1, 0.5, 1] }} />
                                                        <motion.span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-brand)]"
                                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                                                            {result.afterPct}%
                                                        </motion.span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* CTAs */}
                                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                                            <PrimaryCTA href="/contact">{l(locale, { ja: "無料AI診断を申し込む", en: "Request Free AI Diagnosis" })}</PrimaryCTA>
                                            <SecondaryLink href="/case-studies">{l(locale, { ja: "導入事例を見る", en: "View Case Studies" })}</SecondaryLink>
                                        </motion.div>

                                        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                                            <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                                                {l(locale, { ja: "もう一度シミュレーションする", en: "Run simulation again" })}
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {step < 3 && <StepNav step={step} lastStep={2} canProceed={canProceed} goBack={goBack} goNext={goNext} lastLabel={{ ja: "結果を見る", en: "See Results" }} />}
                    </div>
                </section>

                <GradientDivider />
                <BottomCTA
                    label={l(locale, { ja: "AI DXサービス", en: "AI DX SERVICE" })}
                    heading={{ ja: "シミュレーションの先へ。", en: "Beyond simulation." }}
                    description={{ ja: "ProductXのAI DXサービスなら、即日〜で業務改革を実現。まずは無料AI診断で、御社に最適なソリューションをご提案します。", en: "With ProductX's AI DX services, transform your operations starting today. Get a free AI diagnosis to find the optimal solution for your business." }}
                    links={[
                        { href: "/services/ai-dx", label: { ja: "AI DXサービス詳細を見る", en: "View AI DX Service Details" } },
                        { href: "/tools/estimate", label: { ja: "開発費用を試算する", en: "Estimate Development Costs" } },
                    ]}
                />
            </main>
            <Footer />
        </>
    );
}
