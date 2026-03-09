"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang } from "@/components/lang-provider";
import {
    Monitor, Smartphone, MonitorSmartphone,
    Lock, CreditCard, MessageSquare, Bell, Video,
    ShoppingCart, BarChart3, Settings, Globe, Sparkles,
    Palette, PenTool, Crown,
    CheckCircle, Clock, Coins, FileText,
} from "lucide-react";
import {
    l, cardCls, SelectedBadge, AnimatedCounter, slideVariants, SLIDE_TRANSITION,
    StepProgress, StepNav, BottomCTA, PrimaryCTA, SecondaryLink,
} from "@/components/ui/simulator-shared";

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
    { id: "template", icon: Palette, label: { ja: "テンプレート", en: "Template" }, desc: { ja: "既存テンプレートをベースにカスタマイズ", en: "Customized from existing templates" }, mult: 0.8 },
    { id: "custom", icon: PenTool, label: { ja: "カスタム", en: "Custom" }, desc: { ja: "オリジナルデザインをフルスクラッチ", en: "Original design from scratch" }, mult: 1.0 },
    { id: "highend", icon: Crown, label: { ja: "ハイエンド", en: "High-End" }, desc: { ja: "マイクロインタラクション・モーション付き", en: "With micro-interactions & motion" }, mult: 1.3 },
];

/* ── estimation ── */

const BASE: Record<string, Record<string, number>> = {
    web: { small: 100, medium: 200, large: 400, xlarge: 700 },
    mobile: { small: 150, medium: 300, large: 600, xlarge: 1000 },
    both: { small: 175, medium: 350, large: 700, xlarge: 1190 },
};

function calc(plat: string, screen: string, feats: string[], design: string) {
    const base = BASE[plat]?.[screen] ?? 200;
    const fCost = feats.reduce((s, id) => s + (features.find(f => f.id === id)?.cost ?? 0), 0);
    const mult = designLevels.find(d => d.id === design)?.mult ?? 1.0;
    const raw = (base + fCost) * mult;

    const services = [
        "要件定義・設計", "UI/UXデザイン",
        ...(plat === "web" || plat === "both" ? ["Webフロントエンド開発"] : []),
        ...(plat === "mobile" || plat === "both" ? ["モバイルアプリ開発"] : []),
        "バックエンド・API開発", "テスト・品質保証", "デプロイ・リリース支援",
    ];

    return {
        min: Math.round(raw * 0.8), max: Math.round(raw * 1.2),
        baseCost: Math.round(base * mult), featCost: Math.round(fCost * mult),
        months: Math.max(1, Math.round(raw / 150)), services,
    };
}

/* ── page ── */

const STEPS = [
    { ja: "プラットフォーム", en: "Platform" },
    { ja: "画面数", en: "Screens" },
    { ja: "機能", en: "Features" },
    { ja: "デザイン", en: "Design" },
    { ja: "見積もり", en: "Estimate" },
];

export default function EstimatePage() {
    const { locale } = useLang();
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [platform, setPlatform] = useState("");
    const [screenCount, setScreenCount] = useState("");
    const [selFeats, setSelFeats] = useState<string[]>([]);
    const [design, setDesign] = useState("");
    const [result, setResult] = useState<ReturnType<typeof calc> | null>(null);

    const canProceed = step === 0 ? !!platform : step === 1 ? !!screenCount : step === 2 ? true : step === 3 ? !!design : false;

    const goNext = () => {
        if (!canProceed) return;
        if (step === 3) setResult(calc(platform, screenCount, selFeats, design));
        setDir(1);
        setStep(s => s + 1);
    };
    const goBack = () => { setDir(-1); setStep(s => Math.max(0, s - 1)); };
    const toggle = (id: string) => setSelFeats(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);
    const reset = () => { setStep(0); setPlatform(""); setScreenCount(""); setSelFeats([]); setDesign(""); setResult(null); };

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label="PARTNER GROWTH TOOLS"
                    title={l(locale, { ja: "開発費用シミュレーター", en: "Development Cost Estimator" })}
                    description={l(locale, { ja: "4つの質問に答えるだけで、アプリ・Webサービスの開発費用を即座に概算します。", en: "Answer 4 simple questions to get an instant estimate for your app or web service development." })}
                />

                <section className="py-16 md:py-24 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[900px] px-6">
                        <StepProgress steps={STEPS} current={step} />

                        <div className="relative min-h-[450px]">
                            <AnimatePresence mode="wait" custom={dir}>
                                {/* Step 0: Platform */}
                                {step === 0 && (
                                    <motion.div key="s0" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "プラットフォームを選択してください", en: "Select your platform" })}</h2>
                                        <p className="text-sm text-muted-foreground mb-8">{l(locale, { ja: "開発対象のプラットフォームを選択します。", en: "Choose which platform you're building for." })}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {platforms.map(p => {
                                                const Icon = p.icon; const sel = platform === p.id;
                                                return (
                                                    <button key={p.id} onClick={() => setPlatform(p.id)} className={`${cardCls(sel)} p-6`}>
                                                        {sel && <SelectedBadge />}
                                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${sel ? "bg-[var(--color-brand)]/15" : "bg-secondary"}`}>
                                                            <Icon size={28} className={sel ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <span className={`text-sm font-bold block mb-1 ${sel ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, p.label)}</span>
                                                        <span className="text-xs text-muted-foreground">{l(locale, p.desc)}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 1: Screen Count */}
                                {step === 1 && (
                                    <motion.div key="s1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "画面数の目安を教えてください", en: "How many screens do you need?" })}</h2>
                                        <p className="text-sm text-muted-foreground mb-8">{l(locale, { ja: "ログイン画面、一覧画面、詳細画面などを含めたおおよその画面数です。", en: "Including login, list, detail screens, etc." })}</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {screenCounts.map(sc => {
                                                const sel = screenCount === sc.id;
                                                return (
                                                    <button key={sc.id} onClick={() => setScreenCount(sc.id)} className={`${cardCls(sel)} p-5`}>
                                                        {sel && <SelectedBadge />}
                                                        <span className={`text-lg font-bold block mb-1 ${sel ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, sc.label)}</span>
                                                        <span className="text-xs text-muted-foreground">{l(locale, sc.desc)}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Features */}
                                {step === 2 && (
                                    <motion.div key="s2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "必要な機能を選択してください", en: "Select required features" })}</h2>
                                        <p className="text-sm text-muted-foreground mb-8">{l(locale, { ja: "選択なしでもOKです。後から追加も可能です。", en: "Optional — you can skip or add more later." })}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {features.map(f => {
                                                const Icon = f.icon; const sel = selFeats.includes(f.id);
                                                return (
                                                    <button key={f.id} onClick={() => toggle(f.id)} className={`${cardCls(sel)} flex items-center gap-4 p-4 text-left`}>
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${sel ? "bg-[var(--color-brand)]/15" : "bg-secondary"}`}>
                                                            <Icon size={20} className={sel ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className={`text-sm font-semibold ${sel ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, f.label)}</span>
                                                            <p className="text-xs text-muted-foreground mt-0.5">+{f.cost}{l(locale, { ja: "万円〜", en: "0K yen~" })}</p>
                                                        </div>
                                                        {sel && <SelectedBadge />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Design */}
                                {step === 3 && (
                                    <motion.div key="s3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "デザインのレベルを選択してください", en: "Select design level" })}</h2>
                                        <p className="text-sm text-muted-foreground mb-8">{l(locale, { ja: "デザインの品質レベルを選択します。", en: "Choose the quality level of design." })}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {designLevels.map(d => {
                                                const Icon = d.icon; const sel = design === d.id;
                                                return (
                                                    <button key={d.id} onClick={() => setDesign(d.id)} className={`${cardCls(sel)} p-6`}>
                                                        {sel && <SelectedBadge />}
                                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${sel ? "bg-[var(--color-brand)]/15" : "bg-secondary"}`}>
                                                            <Icon size={28} className={sel ? "text-[var(--color-brand)]" : "text-muted-foreground"} />
                                                        </div>
                                                        <span className={`text-sm font-bold block mb-1 ${sel ? "text-foreground" : "text-muted-foreground"}`}>{l(locale, d.label)}</span>
                                                        <span className="text-xs text-muted-foreground block mb-2">{l(locale, d.desc)}</span>
                                                        <span className="text-xs font-medium text-[var(--color-brand)]">×{d.mult}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Results */}
                                {step === 4 && result && (
                                    <motion.div key="s4" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={SLIDE_TRANSITION}>
                                        <div className="text-center mb-10">
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.2 }}>
                                                <FileText size={40} className="mx-auto mb-4 text-[var(--color-brand-gold)]" />
                                            </motion.div>
                                            <h2 className="text-xl md:text-2xl font-bold mb-2">{l(locale, { ja: "概算見積もり結果", en: "Estimate Results" })}</h2>
                                            <p className="text-sm text-muted-foreground">
                                                {platforms.find(p => p.id === platform)?.label[locale]} × {screenCounts.find(s => s.id === screenCount)?.label[locale]} × {designLevels.find(d => d.id === design)?.label[locale]}{l(locale, { ja: "デザイン", en: " design" })}
                                            </p>
                                        </div>

                                        {/* Main Cost */}
                                        <motion.div className="p-8 rounded-2xl border-2 border-[var(--color-brand)]/30 bg-card text-center mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                            <p className="text-sm text-muted-foreground mb-2">{l(locale, { ja: "概算開発費用", en: "Estimated Cost" })}</p>
                                            <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-gold)] bg-clip-text text-transparent">
                                                <AnimatedCounter value={result.min} /><span className="text-2xl mx-2">〜</span><AnimatedCounter value={result.max} />
                                                <span className="text-xl">{l(locale, { ja: "万円", en: "万円" })}</span>
                                            </p>
                                        </motion.div>

                                        {/* Detail Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                            {([
                                                { icon: Coins, c: "text-emerald-400", bg: "bg-emerald-500/10", label: { ja: "基本開発費", en: "Base Cost" }, val: `¥${result.baseCost}${l(locale, { ja: "万", en: "0K" })}` },
                                                { icon: Settings, c: "text-sky-400", bg: "bg-sky-500/10", label: { ja: "機能追加費", en: "Feature Cost" }, val: `¥${result.featCost}${l(locale, { ja: "万", en: "0K" })}` },
                                                { icon: Clock, c: "text-violet-400", bg: "bg-violet-500/10", label: { ja: "想定期間", en: "Timeline" }, val: `${result.months}${l(locale, { ja: "ヶ月", en: " months" })}` },
                                            ] as const).map((card, i) => {
                                                const Icon = card.icon;
                                                return (
                                                    <motion.div key={i} className="p-5 rounded-xl border border-border bg-card text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                                                        <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mx-auto mb-3`}><Icon size={20} className={card.c} /></div>
                                                        <p className="text-xs text-muted-foreground mb-1">{l(locale, card.label)}</p>
                                                        <p className="text-lg font-bold">{card.val}</p>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        {/* Included Services */}
                                        <motion.div className="p-6 rounded-xl border border-border bg-card mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                                            <h3 className="text-sm font-bold mb-4">{l(locale, { ja: "含まれるサービス", en: "Included Services" })}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {result.services.map((svc, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                                                        <span className="text-sm text-muted-foreground">{svc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        <motion.p className="text-xs text-muted-foreground text-center mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                            {l(locale, { ja: "※ 上記はあくまで概算です。実際の費用はヒアリング後に正式なお見積もりをご提示します。", en: "* This is a rough estimate. Formal quotes are provided after a consultation." })}
                                        </motion.p>

                                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                                            <PrimaryCTA href="/contact">{l(locale, { ja: "この条件で正式見積もりを依頼", en: "Request Formal Quote" })}</PrimaryCTA>
                                            <SecondaryLink href="/case-studies">{l(locale, { ja: "導入事例を見る", en: "View Case Studies" })}</SecondaryLink>
                                        </motion.div>

                                        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                                            <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                                                {l(locale, { ja: "もう一度見積もりする", en: "Run estimate again" })}
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {step < 4 && <StepNav step={step} lastStep={3} canProceed={canProceed} goBack={goBack} goNext={goNext} lastLabel={{ ja: "見積もりを見る", en: "See Estimate" }} />}
                    </div>
                </section>

                <GradientDivider />
                <BottomCTA
                    label={l(locale, { ja: "Partner Growth", en: "PARTNER GROWTH" })}
                    heading={{ ja: "見積もりの先へ。", en: "Beyond the estimate." }}
                    description={{ ja: "ProductXなら、企画・設計から開発・グロースまで一気通貫でサポート。まずは無料ヒアリングで、御社のプロジェクトに最適なプランをご提案します。", en: "ProductX provides end-to-end support from planning to growth. Start with a free consultation to get the optimal plan for your project." }}
                    links={[
                        { href: "/services/partner-growth", label: { ja: "Partner Growthサービス詳細", en: "Partner Growth Details" } },
                        { href: "/tools/ai-simulator", label: { ja: "AI導入効果を試算する", en: "Simulate AI Impact" } },
                    ]}
                />
            </main>
            <Footer />
        </>
    );
}
