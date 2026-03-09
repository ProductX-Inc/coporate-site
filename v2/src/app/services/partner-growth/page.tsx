"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang, type Locale } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import {
    ArrowRight, Award, Layers, BookOpen, ChevronRight,
    Clock, TrendingUp, Lightbulb, FileSearch, PenTool,
    Rocket, CheckCircle,
    Monitor, Smartphone, ShoppingCart, CreditCard, Video,
    MessageSquare, Bell, Mic, BarChart3, Gift,
} from "lucide-react";

/* ── helpers ── */

type I18n = { ja: string; en: string };
const l = (locale: Locale, v: I18n) => v[locale];

const MV = { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true }, variants: fadeUp };

const BG_A = "bg-background bg-dot-pattern";
const BG_B = "bg-secondary/30 dark:bg-card/30 bg-dot-pattern";

function Section({ bg, children }: { bg: string; children: React.ReactNode }) {
    return (
        <section className={`py-24 md:py-32 ${bg}`}>
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

/* ── data types ── */

interface UseCase {
    no: string;
    cat: "開発" | "設計" | "戦略";
    title: I18n;
    detail: I18n;
    killer: I18n;
    time: I18n;
    impact: I18n;
}

/* ── service catalog data ── */

const levels: { key: string; title: I18n; sub: I18n; color: string; cases: UseCase[] }[] = [
    {
        key: "new-dev", color: "from-[var(--color-brand-active)] to-[var(--color-brand)]",
        title: { ja: "新規サービス開発", en: "New Service Development" },
        sub: { ja: "1〜6ヶ月", en: "1-6 months" },
        cases: [
            { no: "01", cat: "戦略", title: { ja: "プロダクト戦略・要件定義", en: "Product Strategy & Requirements" }, detail: { ja: "ビジネスの目的から逆算し、MVPの定義からロードマップまでを策定。競合・市場分析に基づく最適なプロダクト戦略を構築します。", en: "Define MVP and roadmap by working backward from business goals. Build optimal product strategy based on competitive & market analysis." }, killer: { ja: "「何を作るべきか」の段階からご相談いただけます", en: "Consult with us from the 'what to build' stage" }, time: { ja: "1〜2週間", en: "1-2 weeks" }, impact: { ja: "手戻りコストを大幅削減", en: "Significantly reduce rework costs" } },
            { no: "02", cat: "設計", title: { ja: "UI/UXデザイン", en: "UI/UX Design" }, detail: { ja: "ユーザーリサーチとペルソナ設計から、ワイヤーフレーム・プロトタイプ・UIデザインまで一気通貫で設計。操作性と視覚的魅力の両立を実現します。", en: "End-to-end design from user research and personas to wireframes, prototypes, and UI design. Achieve both usability and visual appeal." }, killer: { ja: "プロトタイプを触ってから開発に進むので、完成後の『思ってたのと違う』がゼロになります", en: "Try the prototype before development — zero 'that's not what I expected' moments" }, time: { ja: "2〜4週間", en: "2-4 weeks" }, impact: { ja: "ユーザー満足度・LTV向上", en: "Improved user satisfaction & LTV" } },
            { no: "03", cat: "開発", title: { ja: "Webアプリケーション開発", en: "Web Application Development" }, detail: { ja: "React/Next.jsやAPI設計などモダンな技術スタックで、スケーラブルかつ保守性の高いWebアプリを開発。CI/CDパイプラインの構築まで含みます。", en: "Build scalable, maintainable web apps with modern stacks like React/Next.js. Includes CI/CD pipeline setup." }, killer: { ja: "「速い・落ちない・拡張できる」プロダクトを最速でリリース", en: "Ship a 'fast, reliable, extensible' product at maximum speed" }, time: { ja: "1〜3ヶ月", en: "1-3 months" }, impact: { ja: "開発スピード2〜3倍", en: "2-3x development speed" } },
            { no: "04", cat: "開発", title: { ja: "モバイルアプリ開発", en: "Mobile App Development" }, detail: { ja: "iOS/Androidのネイティブ・クロスプラットフォーム開発に対応。プッシュ通知・決済・リアルタイム通信など複雑な機能実装も可能です。", en: "Native and cross-platform iOS/Android development. Complex features like push notifications, payments, and real-time communication." }, killer: { ja: "ストアに並ぶ『本気のアプリ』を、スタートアップの速度で作ります", en: "Build 'serious apps' at startup speed" }, time: { ja: "2〜6ヶ月", en: "2-6 months" }, impact: { ja: "ストアリリースまで最短2ヶ月", en: "App Store launch in as fast as 2 months" } },
        ],
    },
    {
        key: "renewal", color: "from-sky-500 to-sky-600",
        title: { ja: "既存システム UI/UX 刷新", en: "UI/UX Modernization" },
        sub: { ja: "2週間〜3ヶ月", en: "2 weeks - 3 months" },
        cases: [
            { no: "05", cat: "設計", title: { ja: "UXリサーチ & 分析", en: "UX Research & Analysis" }, detail: { ja: "既存プロダクトのユーザビリティテスト・ヒートマップ分析・ユーザーインタビューから課題を可視化。データドリブンな改善提案を策定します。", en: "Visualize issues through usability testing, heatmap analysis, and user interviews. Data-driven improvement proposals." }, killer: { ja: "なぜユーザーが離脱するのか、データで明確にお伝えします", en: "We'll show you exactly why users are leaving — with data" }, time: { ja: "1〜2週間", en: "1-2 weeks" }, impact: { ja: "離脱率の原因特定と改善", en: "Identify & fix churn causes" } },
            { no: "06", cat: "設計", title: { ja: "UIリデザイン", en: "UI Redesign" }, detail: { ja: "古くなったUIをモダンなデザインシステムに刷新。ブランドの一貫性を保ちながら操作性を劇的に向上させます。", en: "Modernize outdated UI with a cohesive design system. Dramatically improve usability while maintaining brand consistency." }, killer: { ja: "見た目を変えるだけで、ユーザーのKPIが変わる。それがUIの力です", en: "Changing the look changes the KPIs. That's the power of UI." }, time: { ja: "2〜4週間", en: "2-4 weeks" }, impact: { ja: "CVR・継続率の大幅改善", en: "Major CVR & retention improvement" } },
            { no: "07", cat: "開発", title: { ja: "フロントエンド刷新", en: "Frontend Modernization" }, detail: { ja: "レガシーなフロントエンドをReact/Next.jsなどモダンフレームワークに移行。パフォーマンス・SEO・保守性を同時に改善します。", en: "Migrate legacy frontends to modern frameworks like React/Next.js. Improve performance, SEO, and maintainability simultaneously." }, killer: { ja: "技術的負債を一掃しながら、ユーザー体験を劇的に向上させます", en: "Eliminate tech debt while dramatically improving UX" }, time: { ja: "1〜3ヶ月", en: "1-3 months" }, impact: { ja: "表示速度50%以上改善", en: "50%+ improvement in load speed" } },
        ],
    },
    {
        key: "consulting", color: "from-violet-500 to-violet-600",
        title: { ja: "システムコンサルティング", en: "System Consulting" },
        sub: { ja: "1週間〜", en: "1 week+" },
        cases: [
            { no: "08", cat: "戦略", title: { ja: "技術顧問・CTOアドバイザリー", en: "Technical Advisory / CTO Advisory" }, detail: { ja: "技術選定・アーキテクチャ設計・チーム体制構築を支援。スタートアップの成長フェーズに合わせた技術戦略を提供します。", en: "Support tech selection, architecture design, and team building. Technical strategy aligned with your growth phase." }, killer: { ja: "CTOを採用する前に、CTOレベルの意思決定ができるようになります", en: "Make CTO-level decisions before you hire a CTO" }, time: { ja: "月額制", en: "Monthly" }, impact: { ja: "技術的意思決定の速度と精度が向上", en: "Faster, more accurate technical decisions" } },
            { no: "09", cat: "戦略", title: { ja: "グロース戦略コンサルティング", en: "Growth Strategy Consulting" }, detail: { ja: "データ分析に基づくKPI設計、A/Bテスト戦略、ファネル最適化など、プロダクトのグロースに特化したコンサルティングを提供します。", en: "KPI design, A/B testing strategy, and funnel optimization consulting focused on product growth." }, killer: { ja: "リリースした後こそが本番。数字を伸ばすプロが伴走します", en: "Post-launch is where it counts. Growth experts by your side." }, time: { ja: "月額制", en: "Monthly" }, impact: { ja: "データドリブンなグロースの実現", en: "Achieve data-driven growth" } },
            { no: "10", cat: "戦略", title: { ja: "システムアーキテクチャ設計", en: "System Architecture Design" }, detail: { ja: "マイクロサービス・API設計・インフラ構成から運用設計まで、スケーラブルなシステムの全体設計を支援します。", en: "Support end-to-end system design from microservices and API design to infrastructure and operations." }, killer: { ja: "将来の100倍のアクセスに耐える設計を、今のうちに仕込みましょう", en: "Let's design for 100x traffic today — before you need it" }, time: { ja: "1〜2週間", en: "1-2 weeks" }, impact: { ja: "スケーラビリティの確保", en: "Ensured scalability" } },
        ],
    },
];

/* ── static data ── */

const CAT_COLORS: Record<string, string> = {
    "開発": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "設計": "bg-sky-500/15 text-sky-400 border-sky-500/30",
    "戦略": "bg-violet-500/15 text-violet-400 border-violet-500/30",
};
const CAT_EN: Record<string, string> = { "開発": "Development", "設計": "Design", "戦略": "Strategy" };

const categories = [
    { icon: Award, label: { ja: "高品質なプロダクト提供", en: "High-Quality Products" }, desc: { ja: "トップ企業で経験を積んだクリエイターによる、エンタープライズ品質のプロダクト開発を提供します。", en: "Enterprise-quality product development by creators from leading IT companies." }, color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Layers, label: { ja: "上流から下流まで一気通貫", en: "End-to-End Support" }, desc: { ja: "ただの開発ではなく、上流のプロダクト設計からリリース後のグロースまで、ワンチームで伴走します。", en: "Not just development — from upstream product design to post-launch growth, we work as one team." }, color: "text-sky-400", bg: "bg-sky-500/10" },
    { icon: BookOpen, label: { ja: "実績に基づくナレッジ活用", en: "Experience-Driven Knowledge" }, desc: { ja: "これまでの豊富な開発経験から得られたナレッジを活用し、最適なソリューションを提案します。", en: "Leveraging knowledge from extensive development experience to propose optimal solutions." }, color: "text-violet-400", bg: "bg-violet-500/10" },
];

const trackRecords: { icon: typeof Monitor; title: I18n }[] = [
    { icon: Video, title: { ja: "ライブストリーミング配信", en: "Live Streaming" } },
    { icon: MessageSquare, title: { ja: "タイムラインなどのコミュニケーション機能", en: "Timeline & Communication Features" } },
    { icon: Gift, title: { ja: "投げ銭機能", en: "Digital Tipping System" } },
    { icon: Monitor, title: { ja: "動画のアップロード・再生", en: "Video Upload & Playback" } },
    { icon: Bell, title: { ja: "プッシュ通知機能", en: "Push Notification System" } },
    { icon: Mic, title: { ja: "ビデオ通話・音声機能", en: "Video & Voice Call Features" } },
    { icon: ShoppingCart, title: { ja: "Shopifyを活用したECサービス", en: "E-commerce with Shopify" } },
    { icon: CreditCard, title: { ja: "クレジットカードを用いた決済システム", en: "Credit Card Payment System" } },
    { icon: Smartphone, title: { ja: "IAPを用いた決済システム", en: "In-App Purchase System" } },
    { icon: BarChart3, title: { ja: "toB向けのCRM", en: "B2B CRM Platform" } },
    { icon: Gift, title: { ja: "ポイントシステムの導入", en: "Points & Rewards System" } },
];

const PLAN_STYLES = {
    basic: { color: "border-[var(--color-brand)]/30", badge: "bg-[var(--color-brand)]/10 text-[var(--color-brand)]" },
    popular: { color: "border-[var(--color-brand)]/60", badge: "bg-[var(--color-brand)]/15 text-[var(--color-brand)]" },
    premium: { color: "border-[var(--color-brand-active)]/50", badge: "bg-[var(--color-brand-active)]/15 text-[var(--color-brand-active)]" },
};

const plans = [
    { name: { ja: "スポット — 単発支援", en: "Spot — One-Time Support" }, price: { ja: "50〜300万円 / 件", en: "¥500K-3M / project" }, desc: { ja: "特定の機能開発やUI/UXリデザインなど、スコープが明確な案件に最適。短期集中で成果を出します。", en: "Ideal for well-scoped projects like feature development or UI redesign. Focused, short-term delivery." }, popular: false, ...PLAN_STYLES.basic },
    { name: { ja: "月額 — 準委任契約", en: "Monthly — Retainer" }, price: { ja: "月額80〜200万円", en: "¥800K-2M/month" }, desc: { ja: "プロダクトの継続的な改善・グロースに最適。ワンチームとして伴走し、柔軟なリソース配分で対応します。", en: "Ideal for continuous product improvement. We work as your team with flexible resource allocation." }, popular: true, ...PLAN_STYLES.popular },
    { name: { ja: "固定 — 請負契約", en: "Fixed — Contract" }, price: { ja: "300〜2,000万円〜", en: "¥3M-20M+" }, desc: { ja: "新規プロダクトの企画〜リリースなど、大規模な案件に対応。マイルストーン管理で進行を可視化します。", en: "For large-scale projects from planning to launch. Milestone-based progress management for full visibility." }, popular: false, ...PLAN_STYLES.premium },
];

const journeySteps = [
    { icon: Lightbulb, title: { ja: "無料ヒアリング", en: "Free Consultation" }, desc: { ja: "課題・ゴール・予算をヒアリングし、最適な体制とアプローチを提案。概算見積もりも提示します。", en: "We listen to your challenges, goals, and budget. Propose the optimal team and approach with an estimate." } },
    { icon: FileSearch, title: { ja: "要件定義・設計", en: "Requirements & Design" }, desc: { ja: "プロダクト戦略を策定し、ワイヤーフレーム・プロトタイプで完成像を可視化。手戻りを最小化します。", en: "Define product strategy, visualize the final product with wireframes & prototypes." } },
    { icon: PenTool, title: { ja: "開発・実装", en: "Development" }, desc: { ja: "アジャイル開発で2週間ごとにデモを実施。透明性の高い進行で安心感を提供します。", en: "Agile development with bi-weekly demos. Transparent progress keeps you confident." } },
    { icon: CheckCircle, title: { ja: "テスト・リリース", en: "Testing & Launch" }, desc: { ja: "品質保証テストを実施し、本番環境へデプロイ。リリース後の初動もサポートします。", en: "QA testing and production deployment. Post-launch support included." } },
    { icon: Rocket, title: { ja: "グロース支援", en: "Growth Support" }, desc: { ja: "データ分析・A/Bテスト・機能改善を継続的に実施。プロダクトの成長を加速させます。", en: "Continuous data analysis, A/B testing, and feature improvements to accelerate growth." } },
];

const competitors = [
    { name: { ja: "大手SIer", en: "Large SIers" }, weakness: { ja: "高価格・長納期・柔軟性が低い", en: "High cost, slow delivery, inflexible" }, advantage: { ja: "スタートアップのスピード感で、エンタープライズ品質を提供", en: "Enterprise quality at startup speed" } },
    { name: { ja: "フリーランス", en: "Freelancers" }, weakness: { ja: "属人的・スケールしない・品質にばらつき", en: "Person-dependent, non-scalable, inconsistent quality" }, advantage: { ja: "ワンチームの組織力で面展開。品質は常にトップレベル", en: "Team-based scaling with consistently top-tier quality" } },
    { name: { ja: "オフショア開発", en: "Offshore Development" }, weakness: { ja: "コミュニケーションコスト・品質管理が困難", en: "Communication overhead, difficult quality management" }, advantage: { ja: "日本語でのシームレスなコミュニケーション＋圧倒的な品質", en: "Seamless Japanese communication + uncompromising quality" } },
    { name: { ja: "他の開発会社", en: "Other Dev Firms" }, weakness: { ja: "開発のみで上流・グロースまで対応できない", en: "Development-only, no upstream or growth support" }, advantage: { ja: "企画→設計→開発→グロースまで一気通貫で伴走", en: "End-to-end support from planning to growth" } },
];

const industries: I18n[] = [
    { ja: "🎬 エンタメ・メディア", en: "🎬 Entertainment & Media" },
    { ja: "🛒 EC・リテール", en: "🛒 E-Commerce & Retail" },
    { ja: "💼 SaaS・B2B", en: "💼 SaaS & B2B" },
    { ja: "🏥 ヘルスケア", en: "🏥 Healthcare" },
    { ja: "💳 FinTech", en: "💳 FinTech" },
    { ja: "🎓 教育・EdTech", en: "🎓 Education & EdTech" },
];

const faqs: { q: I18n; a: I18n }[] = [
    { q: { ja: "最低契約期間はありますか？", en: "Is there a minimum contract period?" }, a: { ja: "案件の規模や内容に応じて柔軟に対応しております。最短1ヶ月のスポット支援から、中長期のパートナーシップまで幅広く承ります。", en: "We offer flexible engagement terms. From 1-month spot support to long-term partnerships." } },
    { q: { ja: "開発だけでなく、企画・戦略から相談できますか？", en: "Can we consult on strategy, not just development?" }, a: { ja: "もちろんです。ProductXの強みは上流のプロダクト戦略から実装・グロースまで一気通貫で支援できることです。「何を作るべきか」の段階からご相談いただけます。", en: "Absolutely. Our strength is end-to-end support from product strategy to implementation and growth." } },
    { q: { ja: "リモートでの対応は可能ですか？", en: "Do you support remote work?" }, a: { ja: "はい、フルリモートでの対応が可能です。オンラインミーティングやチャットツールを活用し、スムーズなコミュニケーションを実現します。必要に応じて対面も対応します。", en: "Yes, we fully support remote collaboration with online meetings and chat tools. In-person meetings available when needed." } },
    { q: { ja: "NDAの締結は可能ですか？", en: "Can we sign an NDA?" }, a: { ja: "はい、プロジェクト開始前にNDA（秘密保持契約）の締結が可能です。情報管理には万全の体制を整えております。", en: "Yes, we can sign NDAs before project commencement. We maintain strict information security." } },
    { q: { ja: "料金体系を教えてください。", en: "What is your pricing structure?" }, a: { ja: "プロジェクトの規模・内容に応じたお見積もりを作成いたします。準委任契約（月額）と請負契約（固定）の両方に対応しております。詳細はお問い合わせください。", en: "We provide custom estimates based on project scope. Both time-and-materials and fixed-price contracts available." } },
];

/* ── sub-components ── */

function UseCaseCard({ uc, locale, index }: { uc: UseCase; locale: Locale; index: number }) {
    return (
        <motion.details className="group rounded-xl border border-border bg-card overflow-hidden hover:border-[var(--color-brand)]/40 transition-colors"
            {...MV} custom={index * 0.06 + 0.2}>
            <summary className="flex items-center gap-4 cursor-pointer px-5 py-4 select-none list-none [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-bold text-foreground/10 shrink-0 w-8">{uc.no}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${CAT_COLORS[uc.cat]}`}>
                    {l(locale, { ja: uc.cat, en: CAT_EN[uc.cat] })}
                </span>
                <span className="text-sm font-semibold flex-1">{l(locale, uc.title)}</span>
                <ChevronRight size={16} className="text-muted-foreground group-open:rotate-90 transition-transform duration-200 shrink-0" />
            </summary>
            <div className="px-5 pb-5 pt-1 border-t border-border/50 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{l(locale, uc.detail)}</p>
                <div className="flex flex-wrap gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-[var(--color-brand)]"><Clock size={13} /> {l(locale, uc.time)}</span>
                    <span className="flex items-center gap-1.5 text-emerald-500"><TrendingUp size={13} /> {l(locale, uc.impact)}</span>
                </div>
                <blockquote className="border-l-2 border-[var(--color-brand-gold)] pl-3 text-sm italic text-foreground/70">
                    &ldquo;{l(locale, uc.killer)}&rdquo;
                </blockquote>
            </div>
        </motion.details>
    );
}

/* ── page ── */

export default function PartnerGrowthPage() {
    const { locale } = useLang();

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <PageHero label="Partner Growth"
                    title={l(locale, { ja: "プロダクト開発 × グロース支援で、事業を加速する。", en: "Accelerate Business with Product Development × Growth Support." })}
                    description={l(locale, { ja: "業界トップクラスの実績を持つクリエイター集団による、企画・設計・開発・グロースまで一気通貫の伴走支援。", en: "End-to-end support from planning to growth by an elite team of creators with top-tier industry experience." })} />

                {/* 3 Strengths */}
                <Section bg={BG_A}>
                    <SectionHeader locale={locale}
                        label={{ ja: "3つの強み", en: "Three Strengths" }}
                        title={{ ja: "ProductXが選ばれる理由。", en: "Why clients choose ProductX." }} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={i} className="p-8 rounded-2xl border border-border bg-card hover:border-[var(--color-brand)]/40 transition-all"
                                    {...MV} custom={i + 1} whileHover={{ y: -4 }}>
                                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5`}>
                                        <Icon size={22} className={item.color} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{l(locale, item.label)}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{l(locale, item.desc)}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </Section>

                <GradientDivider />

                {/* Service Catalog */}
                <Section bg={BG_B}>
                    <SectionHeader locale={locale}
                        label={{ ja: "サービスカタログ", en: "Service Catalog" }}
                        title={{ ja: "10のサービスで、プロダクトの課題を解決。", en: "10 services to solve every product challenge." }} />
                    <motion.p className="text-muted-foreground mb-12 max-w-2xl -mt-8"
                        {...MV} custom={1}>
                        {l(locale, { ja: "カテゴリ別に整理されたサービスカタログ。クリックして詳細をご覧ください。", en: "Service catalog organized by category. Click to expand details." })}
                    </motion.p>
                    <div className="space-y-12">
                        {levels.map((lv) => (
                            <div key={lv.key}>
                                <motion.div className="flex items-center gap-3 mb-4" {...MV} custom={0}>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${lv.color}`}>
                                        {l(locale, lv.sub)}
                                    </span>
                                    <h3 className="text-lg md:text-xl font-bold">{l(locale, lv.title)}</h3>
                                </motion.div>
                                <div className="space-y-2">
                                    {lv.cases.map((uc, i) => <UseCaseCard key={uc.no} uc={uc} locale={locale} index={i} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <GradientDivider />

                {/* Track Record */}
                <Section bg={BG_A}>
                    <SectionHeader locale={locale}
                        label={{ ja: "開発実績", en: "Track Record" }}
                        title={{ ja: "多様なプロダクトの開発実績。", en: "Diverse product development experience." }} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {trackRecords.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div key={i}
                                    className="flex items-center gap-4 px-5 py-4 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/30 transition-all duration-300"
                                    {...MV} custom={i * 0.05 + 0.3}>
                                    <div className="w-9 h-9 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center shrink-0">
                                        <Icon size={18} className="text-[var(--color-brand)]" />
                                    </div>
                                    <span className="text-sm font-medium">{l(locale, item.title)}</span>
                                </motion.div>
                            );
                        })}
                        <motion.div
                            className="flex items-center justify-center px-5 py-4 rounded-xl border border-dashed border-border/60 text-muted-foreground"
                            {...MV} custom={3}>
                            <span className="text-sm italic tracking-wide">{l(locale, { ja: "その他多数", en: "and more..." })}</span>
                        </motion.div>
                    </div>
                </Section>

                <GradientDivider />

                {/* Pricing */}
                <Section bg={BG_B}>
                    <SectionHeader locale={locale}
                        label={{ ja: "料金体系", en: "Pricing" }}
                        title={{ ja: "プロジェクトに合わせた3つのプラン。", en: "Three plans for your project." }} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan, i) => (
                            <motion.div key={i}
                                className={`relative p-8 rounded-2xl border-2 bg-card ${plan.color} ${plan.popular ? "ring-2 ring-[var(--color-brand)]/30" : ""}`}
                                {...MV} custom={i + 1} whileHover={{ y: -4 }}>
                                {plan.popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-brand)] text-white text-xs font-bold tracking-wide">
                                        {l(locale, { ja: "おすすめ", en: "Recommended" })}
                                    </span>
                                )}
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${plan.badge}`}>{l(locale, plan.name)}</span>
                                <p className="text-2xl font-bold mb-3">{l(locale, plan.price)}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{l(locale, plan.desc)}</p>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                    {l(locale, { ja: "お問い合わせ", en: "Contact Us" })} <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <motion.p className="text-center text-sm text-muted-foreground mt-8" {...MV} custom={4}>
                        {l(locale, { ja: "スポットで課題を解決 → 月額パートナーとして継続 → 大規模開発へスケール", en: "Start with a spot project → Continue as a monthly partner → Scale to large-scale development" })}
                    </motion.p>
                </Section>

                <GradientDivider />

                {/* Journey */}
                <Section bg={BG_A}>
                    <SectionHeader locale={locale}
                        label={{ ja: "導入の流れ", en: "How It Works" }}
                        title={{ ja: "まずは無料ヒアリングから。", en: "Start with a free consultation." }} />
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {journeySteps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div key={i} className="relative p-6 rounded-xl border border-border bg-card text-center"
                                    {...MV} custom={i + 1}>
                                    <span className="absolute -top-3 -left-1 w-7 h-7 rounded-full bg-[var(--color-brand)] text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                                    <div className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center mx-auto mb-4">
                                        <Icon size={20} className="text-[var(--color-brand)]" />
                                    </div>
                                    <h3 className="text-sm font-bold mb-2">{l(locale, step.title)}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{l(locale, step.desc)}</p>
                                    {i < journeySteps.length - 1 && <ChevronRight size={16} className="absolute top-1/2 -right-3 text-muted-foreground/40 hidden md:block" />}
                                </motion.div>
                            );
                        })}
                    </div>
                </Section>

                <GradientDivider />

                {/* Differentiation */}
                <Section bg={BG_B}>
                    <SectionHeader locale={locale}
                        label={{ ja: "なぜProductXか", en: "Why ProductX" }}
                        title={{ ja: "他社との違い。", en: "What sets us apart." }} />
                    <div className="overflow-x-auto">
                        <motion.table className="w-full min-w-[600px] text-sm" {...MV} custom={1}>
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{l(locale, { ja: "競合", en: "Competitor" })}</th>
                                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{l(locale, { ja: "弱点", en: "Weakness" })}</th>
                                    <th className="text-left py-3 px-4 font-semibold text-[var(--color-brand)]">{l(locale, { ja: "ProductXの優位性", en: "ProductX Advantage" })}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {competitors.map((c, i) => (
                                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                                        <td className="py-3 px-4 font-medium">{l(locale, c.name)}</td>
                                        <td className="py-3 px-4 text-muted-foreground">{l(locale, c.weakness)}</td>
                                        <td className="py-3 px-4 font-medium text-[var(--color-brand)]">{l(locale, c.advantage)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </motion.table>
                    </div>
                </Section>

                <GradientDivider />

                {/* Industries */}
                <Section bg={BG_A}>
                    <SectionHeader locale={locale}
                        label={{ ja: "対応業界", en: "Industries" }}
                        title={{ ja: "幅広い業界に対応。", en: "Supporting diverse industries." }} />
                    <div className="flex flex-wrap gap-3 -mt-4">
                        {industries.map((item, i) => (
                            <motion.span key={i} className="px-5 py-3 rounded-full border border-border bg-card text-sm font-medium hover:border-[var(--color-brand)]/30 transition-colors"
                                {...MV} custom={i * 0.08 + 0.3}>{l(locale, item)}</motion.span>
                        ))}
                    </div>
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
                            {l(locale, { ja: "まずは無料ヒアリングから。", en: "Start with a free consultation." })}
                        </motion.h2>
                        <motion.p className="text-muted-foreground mb-8" {...MV} custom={0.5}>
                            {l(locale, { ja: "御社のプロダクトの課題をヒアリングし、最適なアプローチをご提案します。まずはお気軽にご相談ください。", en: "We'll listen to your product challenges and propose the optimal approach. Feel free to reach out." })}
                        </motion.p>
                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...MV} custom={1}>
                            <Link href="/contact" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold hover:bg-[var(--color-brand)] transition-all shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative z-10 flex items-center gap-2">{l(locale, { ja: "無料ヒアリングを申し込む", en: "Request Free Consultation" })} <ArrowRight size={18} /></span>
                            </Link>
                            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                {l(locale, { ja: "サービス一覧に戻る", en: "Back to Services" })} <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
