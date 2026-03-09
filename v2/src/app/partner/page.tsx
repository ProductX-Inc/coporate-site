"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang, type Locale } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import {
    ArrowRight, Gift, Zap, Shield, Users,
    Handshake, BadgeDollarSign, TrendingUp, ChevronDown,
} from "lucide-react";

/* ── helpers ── */

type I18n = { ja: string; en: string };
const l = (locale: Locale, v: I18n) => v[locale];
const MV = { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true }, variants: fadeUp };
const BG_A = "bg-background bg-dot-pattern";
const BG_B = "bg-secondary/30 dark:bg-card/30 bg-dot-pattern";
const YEN = "万円";

function Section({ bg, id, children }: { bg: string; id?: string; children: React.ReactNode }) {
    return (
        <section className={`py-24 md:py-32 ${bg}`} id={id}>
            <div className="mx-auto max-w-[1280px] px-6">{children}</div>
        </section>
    );
}

function SectionHeader({ label, title, locale, custom0 = 0 }: { label: I18n; title: I18n; locale: Locale; custom0?: number }) {
    return (
        <>
            <motion.p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-4"
                {...MV} custom={custom0}>{l(locale, label)}</motion.p>
            <motion.h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-12"
                {...MV} custom={custom0 + 0.5}>{l(locale, title)}</motion.h2>
        </>
    );
}

/* ── data ── */

const benefits = [
    { icon: Gift, title: { ja: "高報酬率 10%〜", en: "High Reward Rate 10%+" }, desc: { ja: "紹介案件の受注確定後、売上の10%を紹介報酬としてお支払い。継続案件は月額の5%を最大12ヶ月間還元。", en: "Receive 10% of revenue upon confirmed orders. For ongoing projects, earn 5% of monthly revenue for up to 12 months." }, color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Zap, title: { ja: "3ステップで完結", en: "Simple 3-Step Process" }, desc: { ja: "紹介 → 受注 → 報酬。面倒な手続きは不要。紹介後のフォローはProductXが全て担当します。", en: "Refer → Close → Earn. No complicated procedures. ProductX handles all follow-up after your referral." }, color: "text-sky-400", bg: "bg-sky-500/10" },
    { icon: Shield, title: { ja: "継続報酬で長期収入", en: "Recurring Revenue" }, desc: { ja: "月額契約のクライアントを紹介した場合、毎月の売上から継続的に報酬が発生。紹介ネットワークが資産になります。", en: "For monthly contract clients, earn ongoing rewards from each month's revenue. Your referral network becomes an asset." }, color: "text-violet-400", bg: "bg-violet-500/10" },
];

const steps = [
    { num: "01", icon: Users, title: { ja: "紹介する", en: "Refer" }, desc: { ja: "開発やAI DXのニーズがあるクライアントをProductXにご紹介。フォームから簡単に申請できます。", en: "Introduce clients with development or AI DX needs to ProductX. Quick and easy form submission." } },
    { num: "02", icon: Handshake, title: { ja: "商談・受注", en: "Deal Closed" }, desc: { ja: "ProductXが商談を担当。ヒアリングから提案・契約まで全てお任せください。紹介者の負担はゼロ。", en: "ProductX handles the entire sales process — from consultation to contract. Zero burden on the referrer." } },
    { num: "03", icon: BadgeDollarSign, title: { ja: "報酬を受け取る", en: "Get Rewarded" }, desc: { ja: "受注確定・入金後、翌月末に紹介報酬をお支払い。継続案件は毎月の売上に応じて自動還元。", en: "Receive your referral reward by the end of the following month after payment confirmation." } },
];

const rewardTable = [
    { type: { ja: "初回紹介報酬", en: "Initial Referral Reward" }, condition: { ja: "受注確定・入金後", en: "After confirmed order & payment" }, rate: "10%", example: { ja: "300万円の案件 → 30万円", en: "¥3M project → ¥300K" } },
    { type: { ja: "継続報酬", en: "Recurring Reward" }, condition: { ja: "月額契約の継続中 (最大12ヶ月)", en: "During monthly contract (up to 12 months)" }, rate: "5%", example: { ja: "月額100万円 × 12ヶ月 → 60万円", en: "¥1M/mo × 12 months → ¥600K" } },
];

const faqs: { q: I18n; a: I18n }[] = [
    { q: { ja: "誰でもパートナーになれますか？", en: "Can anyone become a partner?" }, a: { ja: "はい、法人・個人を問わず申請可能です。審査などは特にございません。お気軽にお問い合わせください。", en: "Yes, both companies and individuals can apply. No screening process required. Feel free to reach out." } },
    { q: { ja: "報酬はいつ支払われますか？", en: "When are rewards paid?" }, a: { ja: "紹介案件の入金確認後、翌月末にお支払いいたします。継続報酬は毎月自動的に計算・お支払いされます。", en: "Rewards are paid by the end of the month following payment confirmation. Recurring rewards are automatically calculated and paid monthly." } },
    { q: { ja: "紹介方法を教えてください。", en: "How do I make a referral?" }, a: { ja: "お問い合わせフォームから紹介先の企業名・担当者名・ニーズの概要をお送りいただくだけでOKです。その後のフォローはProductXが全て担当します。", en: "Simply submit the referred company name, contact person, and a brief overview of their needs through our contact form. ProductX handles everything from there." } },
    { q: { ja: "複数のクライアントを紹介できますか？", en: "Can I refer multiple clients?" }, a: { ja: "はい、紹介数に上限はありません。紹介いただいた全ての案件が報酬対象となります。", en: "Yes, there is no limit on referrals. All referred projects are eligible for rewards." } },
    { q: { ja: "すでにProductXと商談中のクライアントは対象ですか？", en: "What about clients already in talks with ProductX?" }, a: { ja: "初回コンタクトがパートナー経由であることが確認できれば報酬対象となります。既にProductXが接触済みのクライアントは対象外です。", en: "If the initial contact was through the partner, it qualifies for rewards. Clients already contacted by ProductX are not eligible." } },
    { q: { ja: "継続報酬の「最大12ヶ月」を超えた場合は？", en: "What happens after the 12-month recurring period?" }, a: { ja: "12ヶ月を超えた分の継続報酬は対象外となります。ただし、同一クライアントからの新規案件を紹介いただいた場合は、別途初回報酬の対象となります。", en: "Recurring rewards beyond 12 months are not applicable. However, new projects from the same client qualify as separate initial referral rewards." } },
];

/* ── page ── */

export default function PartnerPage() {
    const { locale } = useLang();
    const [amount, setAmount] = useState(300);
    const [isMonthly, setIsMonthly] = useState(false);

    const initialReward = Math.round(amount * 0.10);
    const recurringReward = isMonthly ? Math.round(amount * 0.05 * 12) : 0;
    const totalReward = initialReward + recurringReward;

    const toggleCls = (active: boolean) =>
        `px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${active
            ? "bg-[var(--color-brand-active)] text-white shadow-lg"
            : "bg-secondary text-muted-foreground hover:text-foreground"}`;

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <PageHero
                    label="Partner Program"
                    title={l(locale, { ja: "紹介が、あなたの収益になる。", en: "Your network, your revenue." })}
                    description={l(locale, { ja: "クライアントをProductXに紹介するだけ。受注確定後に売上の10%を紹介報酬としてお支払いします。", en: "Simply refer clients to ProductX. Earn 10% of revenue as a referral reward upon confirmed orders." })}
                />

                {/* Scroll to simulator hint */}
                <div className="flex justify-center -mt-8 mb-0 relative z-10">
                    <motion.a
                        href="#simulator"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-brand-active)]/10 text-[var(--color-brand)] text-sm font-semibold hover:bg-[var(--color-brand-active)]/20 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        {l(locale, { ja: "報酬をシミュレーションする", en: "Simulate Your Rewards" })}
                        <ChevronDown size={16} className="animate-bounce" />
                    </motion.a>
                </div>

                <GradientDivider />

                {/* Benefits */}
                <Section bg={BG_B}>
                    <SectionHeader locale={locale}
                        label={{ ja: "パートナーの3つのメリット", en: "Three Partner Benefits" }}
                        title={{ ja: "紹介するだけで、報酬を得る。", en: "Refer and earn — it's that simple." }} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {benefits.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={i} className="p-8 rounded-2xl border border-border bg-card hover:border-[var(--color-brand)]/40 transition-all"
                                    {...MV} custom={i + 1} whileHover={{ y: -4 }}>
                                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5`}>
                                        <Icon size={22} className={item.color} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{l(locale, item.title)}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{l(locale, item.desc)}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </Section>

                <GradientDivider />

                {/* How It Works */}
                <Section bg={BG_A}>
                    <SectionHeader locale={locale}
                        label={{ ja: "ご紹介の流れ", en: "How It Works" }}
                        title={{ ja: "3ステップで、報酬を獲得。", en: "Three steps to earning." }} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div key={step.num} className="relative p-8 rounded-2xl border border-border bg-card text-center"
                                    {...MV} custom={i + 1}>
                                    <span className="absolute -top-3 -left-1 w-8 h-8 rounded-full bg-[var(--color-brand)] text-white text-xs font-bold flex items-center justify-center shadow-lg">{step.num}</span>
                                    <div className="w-14 h-14 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center mx-auto mb-5">
                                        <Icon size={26} className="text-[var(--color-brand)]" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-3">{l(locale, step.title)}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{l(locale, step.desc)}</p>
                                    {i < steps.length - 1 && (
                                        <ArrowRight size={20} className="absolute top-1/2 -right-4 text-muted-foreground/30 hidden md:block" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </Section>

                <GradientDivider />

                {/* Reward Table */}
                <Section bg={BG_B}>
                    <SectionHeader locale={locale}
                        label={{ ja: "報酬体系", en: "Reward Structure" }}
                        title={{ ja: "透明な報酬設計。", en: "Transparent reward structure." }} />
                    <div className="overflow-x-auto">
                        <motion.table className="w-full min-w-[600px] text-sm" {...MV} custom={1}>
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{l(locale, { ja: "報酬タイプ", en: "Reward Type" })}</th>
                                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{l(locale, { ja: "条件", en: "Condition" })}</th>
                                    <th className="text-center py-3 px-4 font-semibold text-[var(--color-brand)]">{l(locale, { ja: "報酬率", en: "Rate" })}</th>
                                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{l(locale, { ja: "具体例", en: "Example" })}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rewardTable.map((row, i) => (
                                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                                        <td className="py-4 px-4 font-medium">{l(locale, row.type)}</td>
                                        <td className="py-4 px-4 text-muted-foreground">{l(locale, row.condition)}</td>
                                        <td className="py-4 px-4 text-center">
                                            <span className="inline-flex px-3 py-1 rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand)] text-sm font-bold">{row.rate}</span>
                                        </td>
                                        <td className="py-4 px-4 font-medium text-emerald-500">{l(locale, row.example)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </motion.table>
                    </div>

                    {/* Max scenario card */}
                    <motion.div className="mt-8 p-6 rounded-xl border border-[var(--color-brand-gold)]/30 bg-[var(--color-brand-gold)]/5" {...MV} custom={2}>
                        <p className="text-sm font-semibold mb-2">
                            💰 {l(locale, { ja: "最大シナリオ例", en: "Maximum Scenario Example" })}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {l(locale, {
                                ja: "月額100万円のクライアントを紹介した場合：初回報酬 10万円 + 継続報酬 60万円（5% × 12ヶ月）＝ 合計 70万円の報酬",
                                en: "For referring a ¥1M/month client: Initial reward ¥100K + Recurring reward ¥600K (5% × 12 months) = Total ¥700K reward"
                            })}
                        </p>
                    </motion.div>
                </Section>

                <GradientDivider />

                {/* Simulator */}
                <Section bg={BG_A} id="simulator">
                    <SectionHeader locale={locale}
                        label={{ ja: "報酬シミュレーター", en: "Reward Simulator" }}
                        title={{ ja: "あなたの報酬を試算する。", en: "Calculate your rewards." }} />

                    <motion.div className="max-w-2xl mx-auto" {...MV} custom={1}>
                        <div className="p-8 md:p-12 rounded-2xl border border-border bg-card">
                            {/* Contract type toggle */}
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <button onClick={() => setIsMonthly(false)} className={toggleCls(!isMonthly)}>
                                    {l(locale, { ja: "スポット（単発）", en: "One-Time Project" })}
                                </button>
                                <button onClick={() => setIsMonthly(true)} className={toggleCls(isMonthly)}>
                                    {l(locale, { ja: "月額契約", en: "Monthly Contract" })}
                                </button>
                            </div>

                            {/* Slider */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-muted-foreground">
                                        {l(locale, isMonthly ? { ja: "月額契約金額", en: "Monthly Contract Value" } : { ja: "案件規模", en: "Project Value" })}
                                    </span>
                                    <span className="text-2xl font-bold text-[var(--color-brand)]">
                                        {amount.toLocaleString()}{YEN}
                                    </span>
                                </div>
                                <input
                                    type="range" min={50} max={2000} step={50}
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="simulator-slider w-full h-2 rounded-full appearance-none cursor-pointer bg-secondary"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>50{YEN}</span>
                                    <span>2,000{YEN}</span>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                                    <span className="text-sm font-medium">{l(locale, { ja: "初回紹介報酬 (10%)", en: "Initial Reward (10%)" })}</span>
                                    <span className="text-xl font-bold text-emerald-500">{initialReward.toLocaleString()}{YEN}</span>
                                </div>

                                <AnimatePresence>
                                    {isMonthly && (
                                        <motion.div
                                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <span className="text-sm font-medium">{l(locale, { ja: "継続報酬 (5% × 12ヶ月)", en: "Recurring Reward (5% × 12 months)" })}</span>
                                            <span className="text-xl font-bold text-sky-500">{recurringReward.toLocaleString()}{YEN}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-[var(--color-brand-active)] to-[var(--color-brand)] text-white">
                                    <span className="text-sm font-semibold">{l(locale, { ja: "合計報酬", en: "Total Reward" })}</span>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={20} />
                                        <span className="text-2xl font-bold">{totalReward.toLocaleString()}{YEN}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-xs text-muted-foreground mt-4">
                            {l(locale, { ja: "※ シミュレーション結果は目安です。実際の報酬は契約内容により異なる場合があります。", en: "* Simulation results are estimates. Actual rewards may vary based on contract terms." })}
                        </p>
                    </motion.div>
                </Section>

                <GradientDivider />

                {/* FAQ */}
                <Section bg={BG_B}>
                    <SectionHeader locale={locale}
                        label={{ ja: "FAQ", en: "FAQ" }}
                        title={{ ja: "よくあるご質問", en: "Frequently Asked Questions" }} />
                    <div className="space-y-4 max-w-3xl">
                        {faqs.map((item, i) => (
                            <motion.details key={i} className="group rounded-xl border border-border bg-card overflow-hidden"
                                {...MV} custom={i * 0.08 + 0.3}>
                                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-sm font-semibold select-none list-none [&::-webkit-details-marker]:hidden">
                                    <span>{l(locale, item.q)}</span>
                                    <span className="ml-4 shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground group-open:rotate-45 transition-transform duration-300">+</span>
                                </summary>
                                <div className="px-6 pb-5 text-sm text-muted-foreground leading-[1.9]">{l(locale, item.a)}</div>
                            </motion.details>
                        ))}
                    </div>
                </Section>

                <GradientDivider />

                {/* CTA */}
                <section className="py-24 md:py-32 bg-background">
                    <div className="mx-auto max-w-[800px] px-6 text-center">
                        <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" {...MV} custom={0}>
                            {l(locale, { ja: "パートナーとして、一緒に成長しましょう。", en: "Let's grow together as partners." })}
                        </motion.h2>
                        <motion.p className="text-muted-foreground mb-8" {...MV} custom={0.5}>
                            {l(locale, { ja: "まずはお気軽にお問い合わせください。パートナープログラムの詳細をご説明いたします。", en: "Feel free to reach out. We'll explain the details of our Partner Program." })}
                        </motion.p>
                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...MV} custom={1}>
                            <Link href="/contact?ref=partner" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold hover:bg-[var(--color-brand)] transition-all shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative z-10 flex items-center gap-2">{l(locale, { ja: "パートナーとして申し込む", en: "Apply as a Partner" })} <ArrowRight size={18} /></span>
                            </Link>
                            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                {l(locale, { ja: "サービス一覧を見る", en: "View Our Services" })} <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
