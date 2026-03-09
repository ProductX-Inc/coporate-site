/**
 * Company Deck — Slide data definition
 * 18 slides in 4 ACTs for the ProductX sales presentation.
 */

import {
    Building2, Rocket, Star, TrendingUp,
    Layers, PenTool, Award,
    Code2, ShoppingCart, Video,
    Shield, Lock, FileCheck,
    Factory, Users, Briefcase, Megaphone, Scale, Monitor,
    Brain,
} from "lucide-react";

/* ── Types ── */
export type ActId = "open" | "partner-growth" | "ai-dx" | "close";

export interface Act {
    id: ActId;
    label: { ja: string; en: string };
    color: string;        // tailwind gradient or color
    startSlide: number;   // 0-indexed
}

export interface SlideData {
    id: number;           // 1-18
    actId: ActId;
    type: "hero" | "section-break" | "data" | "card-grid" | "pricing" | "evidence" | "cta";
    title: { ja: string; en: string };
    subtitle?: { ja: string; en: string };
    talkScript?: { ja: string; en: string };
}

/* ── ACTs ── */
export const acts: Act[] = [
    { id: "open", label: { ja: "OPEN", en: "OPEN" }, color: "from-[var(--color-brand-active)] to-[var(--color-brand)]", startSlide: 0 },
    { id: "partner-growth", label: { ja: "Partner Growth", en: "Partner Growth" }, color: "from-[#6366f1] to-[#a855f7]", startSlide: 5 },
    { id: "ai-dx", label: { ja: "AI DX", en: "AI DX" }, color: "from-[#10b981] to-[#06b6d4]", startSlide: 10 },
    { id: "close", label: { ja: "CLOSE", en: "CLOSE" }, color: "from-[var(--color-brand-gold)] to-[#f97316]", startSlide: 15 },
];

/* ── 18 Slides ── */
export const slides: SlideData[] = [
    // ─── ACT 1: OPEN ───
    {
        id: 1, actId: "open", type: "hero",
        title: { ja: "Unleash Potential.", en: "Unleash Potential." },
        subtitle: { ja: "株式会社ProductX — 会社・事業紹介資料", en: "ProductX Inc. — Company & Business Overview" },
    },
    {
        id: 2, actId: "open", type: "card-grid",
        title: { ja: "会社概要", en: "Company Overview" },
        subtitle: { ja: "COMPANY", en: "COMPANY" },
        talkScript: { ja: "まず簡単に弊社をご紹介します", en: "Let me briefly introduce our company" },
    },
    {
        id: 3, actId: "open", type: "data",
        title: { ja: "プロダクトの力で、\nまだ見ぬ未来を創る。", en: "Creating new futures\nthrough the power of products." },
        subtitle: { ja: "VISION", en: "VISION" },
        talkScript: { ja: "ProductXが大切にしている考え方です", en: "This is what ProductX values most" },
    },
    {
        id: 4, actId: "open", type: "card-grid",
        title: { ja: "ProductXの4つの強み", en: "Four Key Strengths" },
        subtitle: { ja: "STRENGTHS", en: "STRENGTHS" },
        talkScript: { ja: "大手IT出身のチームで構成されています", en: "Our team comes from top IT companies" },
    },
    {
        id: 5, actId: "open", type: "data",
        title: { ja: "実績サマリー", en: "Track Record" },
        subtitle: { ja: "RESULTS", en: "RESULTS" },
        talkScript: { ja: "このような実績がございます", en: "Here are our key achievements" },
    },

    // ─── ACT 2: PARTNER GROWTH ───
    {
        id: 6, actId: "partner-growth", type: "section-break",
        title: { ja: "Partner Growth", en: "Partner Growth" },
        subtitle: { ja: "プロダクト開発 × グロース支援で、事業を加速する。", en: "Accelerate business with product development × growth support." },
        talkScript: { ja: "ここからは事業のご説明です", en: "Now let me explain our services" },
    },
    {
        id: 7, actId: "partner-growth", type: "card-grid",
        title: { ja: "3つの強み", en: "Three Core Strengths" },
        subtitle: { ja: "WHY US", en: "WHY US" },
        talkScript: { ja: "企画から伴走できるのが強みです", en: "Our strength is end-to-end partnership" },
    },
    {
        id: 8, actId: "partner-growth", type: "card-grid",
        title: { ja: "サービスカタログ", en: "Service Catalog" },
        subtitle: { ja: "SERVICES", en: "SERVICES" },
        talkScript: { ja: "これらのサービスを提供しています", en: "Here are the services we offer" },
    },
    {
        id: 9, actId: "partner-growth", type: "pricing",
        title: { ja: "料金体系 + 導入フロー", en: "Pricing & Onboarding" },
        subtitle: { ja: "PRICING", en: "PRICING" },
        talkScript: { ja: "料金は案件規模に合わせて柔軟に", en: "Pricing is flexible based on project scale" },
    },
    {
        id: 10, actId: "partner-growth", type: "card-grid",
        title: { ja: "開発実績・対応業界", en: "Portfolio & Industries" },
        subtitle: { ja: "PORTFOLIO", en: "PORTFOLIO" },
        talkScript: { ja: "エンタメ・EC・SaaS等幅広い実績", en: "Wide experience across entertainment, EC, SaaS" },
    },

    // ─── ACT 3: AI DX ───
    {
        id: 11, actId: "ai-dx", type: "section-break",
        title: { ja: "AI DX", en: "AI DX" },
        subtitle: { ja: "AI × DXで、日常業務を変革する。", en: "Transform daily operations with AI × DX." },
        talkScript: { ja: "続いてAI DX事業です", en: "Next, our AI DX business" },
    },
    {
        id: 12, actId: "ai-dx", type: "data",
        title: { ja: "なぜ今、AI DXなのか", en: "Why AI DX Now?" },
        subtitle: { ja: "MARKET", en: "MARKET" },
        talkScript: { ja: "AI導入はまだ4%。大きな機会です", en: "Only 4% of SMEs use AI. Huge opportunity" },
    },
    {
        id: 13, actId: "ai-dx", type: "card-grid",
        title: { ja: "サービスマップ", en: "Service Map" },
        subtitle: { ja: "APPROACH", en: "APPROACH" },
        talkScript: { ja: "代行から入って徐々に内製化する", en: "Start with outsourcing, gradually internalize" },
    },
    {
        id: 14, actId: "ai-dx", type: "pricing",
        title: { ja: "料金体系 + 補助金", en: "Pricing & Subsidies" },
        subtitle: { ja: "PRICING", en: "PRICING" },
        talkScript: { ja: "補助金で実質月3万で導入可能", en: "Subsidies can reduce cost to ¥30K/month" },
    },
    {
        id: 15, actId: "ai-dx", type: "card-grid",
        title: { ja: "業界別ユースケース", en: "Industry Use Cases" },
        subtitle: { ja: "USE CASES", en: "USE CASES" },
        talkScript: { ja: "御社ならこのユースケースが最適", en: "This use case fits your industry best" },
    },

    // ─── ACT 4: CLOSE ───
    {
        id: 16, actId: "close", type: "evidence",
        title: { ja: "導入事例", en: "Case Studies" },
        subtitle: { ja: "CASE STUDY", en: "CASE STUDY" },
        talkScript: { ja: "実際の導入事例をご紹介します", en: "Here are actual implementation examples" },
    },
    {
        id: 17, actId: "close", type: "evidence",
        title: { ja: "セキュリティ・安心の取り組み", en: "Security & Trust" },
        subtitle: { ja: "SECURITY", en: "SECURITY" },
        talkScript: { ja: "安全性もご安心ください", en: "You can trust our security measures" },
    },
    {
        id: 18, actId: "close", type: "cta",
        title: { ja: "まずは30分の無料相談から", en: "Start with a free 30-min consultation" },
        subtitle: { ja: "NEXT STEP", en: "NEXT STEP" },
        talkScript: { ja: "ぜひ次のステップに進みましょう", en: "Let's take the next step together" },
    },
];

/* ── Helpers ── */
export function getActForSlide(slideIndex: number): Act {
    for (let i = acts.length - 1; i >= 0; i--) {
        if (slideIndex >= acts[i].startSlide) return acts[i];
    }
    return acts[0];
}

/* ── Slide-specific content data ── */

export const companyInfo = {
    name: { ja: "株式会社ProductX", en: "ProductX Inc." },
    founded: { ja: "2025年3月", en: "March 2025" },
    ceo: { ja: "上野 健太", en: "Kenta Ueno" },
    location: { ja: "東京", en: "Tokyo, Japan" },
    business: { ja: "プロダクト開発支援 / AI DX支援", en: "Product Development / AI DX Consulting" },
};

export const strengths = [
    { icon: Star, title: { ja: "Elite Creators", en: "Elite Creators" }, desc: { ja: "大手IT出身のエンジニア・デザイナーで構成", en: "Engineers & designers from top IT companies" } },
    { icon: Brain, title: { ja: "Product × AI", en: "Product × AI" }, desc: { ja: "AI技術をプロダクトに統合する独自の強み", en: "Unique strength in integrating AI into products" } },
    { icon: PenTool, title: { ja: "Design × Engineering", en: "Design × Engineering" }, desc: { ja: "デザインとエンジニアリングの高次な融合", en: "High-level fusion of design and engineering" } },
    { icon: Rocket, title: { ja: "Build & Own", en: "Build & Own" }, desc: { ja: "作って終わりではなく、共に育てる", en: "Not just build — we grow together" } },
];

export const stats = [
    { value: "50+", label: { ja: "プロジェクト参画数", en: "Projects" } },
    { value: "15+", label: { ja: "エンジニアリング経験年数", en: "Years Experience" } },
    { value: "98%", label: { ja: "クライアント満足度", en: "Client Satisfaction" } },
    { value: "6+", label: { ja: "対応業界数", en: "Industries Served" } },
];

export const pgStrengths = [
    { icon: Award, title: { ja: "高品質なプロダクト", en: "High-Quality Products" }, desc: { ja: "大手レベルの品質をスタートアップスピードで", en: "Enterprise quality at startup speed" } },
    { icon: Layers, title: { ja: "上流〜下流一気通貫", en: "End-to-End Coverage" }, desc: { ja: "企画・設計・開発・運用まで一気通貫で伴走", en: "From planning to operations, we walk with you" } },
    { icon: TrendingUp, title: { ja: "実績ナレッジ活用", en: "Proven Knowledge" }, desc: { ja: "多業界の開発ナレッジを新プロジェクトに還元", en: "Apply insights from many industries" } },
];

export const pgServices = [
    {
        cat: { ja: "新規開発", en: "New Development" }, items: [
            { ja: "Webアプリ開発", en: "Web App Development" },
            { ja: "モバイルアプリ開発", en: "Mobile App Development" },
            { ja: "SaaS構築", en: "SaaS Development" },
            { ja: "MVP開発", en: "MVP Development" },
        ]
    },
    {
        cat: { ja: "UI/UX刷新", en: "UI/UX Refresh" }, items: [
            { ja: "UIリニューアル", en: "UI Renewal" },
            { ja: "UXリサーチ", en: "UX Research" },
            { ja: "デザインシステム構築", en: "Design System" },
        ]
    },
    {
        cat: { ja: "コンサルティング", en: "Consulting" }, items: [
            { ja: "技術顧問", en: "Tech Advisory" },
            { ja: "プロダクト戦略", en: "Product Strategy" },
            { ja: "DX推進支援", en: "DX Promotion" },
        ]
    },
];

export const pgPlans = [
    { name: { ja: "スポット", en: "Spot" }, price: { ja: "50〜300万", en: "¥500K-3M" }, desc: { ja: "単発の開発案件", en: "One-time project" } },
    { name: { ja: "月額", en: "Monthly" }, price: { ja: "80〜200万/月", en: "¥800K-2M/mo" }, desc: { ja: "継続的な開発支援", en: "Ongoing development" }, recommended: true },
    { name: { ja: "固定", en: "Fixed" }, price: { ja: "300〜2000万", en: "¥3M-20M" }, desc: { ja: "大規模プロジェクト", en: "Large-scale project" } },
];

export const pgIndustries = [
    { icon: Video, label: { ja: "エンターテインメント", en: "Entertainment" } },
    { icon: ShoppingCart, label: { ja: "EC・小売", en: "EC & Retail" } },
    { icon: Monitor, label: { ja: "SaaS", en: "SaaS" } },
    { icon: Building2, label: { ja: "不動産", en: "Real Estate" } },
    { icon: Briefcase, label: { ja: "人材", en: "HR" } },
    { icon: Factory, label: { ja: "製造", en: "Manufacturing" } },
];

export const marketStats = [
    { value: "96%", label: { ja: "中小企業のAI未導入率", en: "SME AI non-adoption rate" } },
    { value: "68%", label: { ja: "人手不足を課題とする企業", en: "Companies facing labor shortage" } },
    { value: "3,900億", label: { ja: "国内AI市場規模", en: "Domestic AI market size" } },
    { value: "最大450万", label: { ja: "補助金支援額", en: "Max subsidy amount" } },
];

export const aiApproaches = [
    { label: { ja: "AI代行", en: "AI Outsourcing" }, desc: { ja: "業務をAIで代行", en: "Automate tasks with AI" } },
    { label: { ja: "AI導入", en: "AI Integration" }, desc: { ja: "既存業務にAIを組み込む", en: "Integrate AI into workflows" } },
    { label: { ja: "AI開発", en: "AI Development" }, desc: { ja: "独自AIシステムを構築", en: "Build custom AI systems" } },
];

export const aiPlans = [
    { name: { ja: "梅", en: "Basic" }, price: { ja: "5〜30万", en: "¥50K-300K" }, desc: { ja: "スポット代行", en: "Spot outsourcing" }, emoji: "🌸" },
    { name: { ja: "竹", en: "Standard" }, price: { ja: "20〜80万 + 月5〜15万", en: "¥200K-800K + ¥50-150K/mo" }, desc: { ja: "導入 + 運用支援", en: "Integration + support" }, emoji: "🎋", recommended: true },
    { name: { ja: "松", en: "Premium" }, price: { ja: "100〜500万", en: "¥1M-5M" }, desc: { ja: "フルカスタム開発", en: "Full custom development" }, emoji: "🌲" },
];

export const aiIndustryUC = [
    { icon: Building2, industry: { ja: "不動産", en: "Real Estate" }, uc: { ja: "物件紹介の自動化", en: "Property intro automation" } },
    { icon: Users, industry: { ja: "人材", en: "HR" }, uc: { ja: "スカウトメール自動生成", en: "Auto scout email generation" } },
    { icon: Factory, industry: { ja: "製造", en: "Manufacturing" }, uc: { ja: "在庫最適化AI", en: "Inventory optimization AI" } },
    { icon: Megaphone, industry: { ja: "広告", en: "Advertising" }, uc: { ja: "クリエイティブ生成", en: "Creative generation" } },
    { icon: Scale, industry: { ja: "士業", en: "Professional" }, uc: { ja: "契約書レビュー自動化", en: "Contract review automation" } },
    { icon: Code2, industry: { ja: "IT", en: "IT" }, uc: { ja: "コードレビュー自動化", en: "Code review automation" } },
];

export const securityItems = [
    { icon: Lock, title: { ja: "NDA対応", en: "NDA Compliant" }, desc: { ja: "全プロジェクトでNDAを締結", en: "NDA signed for every project" } },
    { icon: Shield, title: { ja: "データ学習不使用", en: "No Data Training" }, desc: { ja: "顧客データをAIの学習に使用しません", en: "Your data is never used for AI training" } },
    { icon: FileCheck, title: { ja: "30日削除ポリシー", en: "30-Day Deletion" }, desc: { ja: "プロジェクト終了後30日で全データ削除", en: "All data deleted 30 days after project end" } },
];
