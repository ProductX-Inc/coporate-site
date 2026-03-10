/**
 * Company Deck — Slide data definition
 * 22 slides in 4 ACTs for the ProductX sales presentation.
 * Expanded with detailed information for self-contained reading.
 */

import {
    Building2, Rocket, Star, TrendingUp,
    Layers, PenTool, Award,
    Code2, ShoppingCart, Video,
    Shield, Lock, FileCheck,
    Factory, Users, Briefcase, Megaphone, Scale, Monitor,
    Brain, Target, BarChart3, Lightbulb, HandshakeIcon, Coins,
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
    id: number;           // 1-22
    actId: ActId;
    type: "hero" | "section-break" | "data" | "card-grid" | "pricing" | "evidence" | "cta";
    title: { ja: string; en: string };
    subtitle?: { ja: string; en: string };
    talkScript?: { ja: string; en: string };
}

/* ── ACTs (updated startSlide for 22-slide layout) ── */
export const acts: Act[] = [
    { id: "open", label: { ja: "OPEN", en: "OPEN" }, color: "from-[var(--color-brand-active)] to-[var(--color-brand)]", startSlide: 0 },
    { id: "partner-growth", label: { ja: "Partner Growth", en: "Partner Growth" }, color: "from-[#6366f1] to-[#a855f7]", startSlide: 6 },
    { id: "ai-dx", label: { ja: "AI DX", en: "AI DX" }, color: "from-[#10b981] to-[#06b6d4]", startSlide: 11 },
    { id: "close", label: { ja: "CLOSE", en: "CLOSE" }, color: "from-[var(--color-brand-gold)] to-[#f97316]", startSlide: 17 },
];

/* ── 22 Slides ── */
export const slides: SlideData[] = [
    // ─── ACT 1: OPEN (6 slides) ───
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
    {
        id: 6, actId: "open", type: "card-grid",
        title: { ja: "こんな課題、ありませんか？", en: "Sound Familiar?" },
        subtitle: { ja: "PAIN POINTS", en: "PAIN POINTS" },
        talkScript: { ja: "よくいただくお悩みをご紹介します", en: "Here are common challenges we hear" },
    },

    // ─── ACT 2: PARTNER GROWTH (5 slides) ───
    {
        id: 7, actId: "partner-growth", type: "section-break",
        title: { ja: "Partner Growth", en: "Partner Growth" },
        subtitle: { ja: "プロダクト開発 × グロース支援で、事業を加速する。", en: "Accelerate business with product development × growth support." },
        talkScript: { ja: "ここからは事業のご説明です", en: "Now let me explain our services" },
    },
    {
        id: 8, actId: "partner-growth", type: "card-grid",
        title: { ja: "3つの強み", en: "Three Core Strengths" },
        subtitle: { ja: "WHY US", en: "WHY US" },
        talkScript: { ja: "企画から伴走できるのが強みです", en: "Our strength is end-to-end partnership" },
    },
    {
        id: 9, actId: "partner-growth", type: "card-grid",
        title: { ja: "サービスカタログ", en: "Service Catalog" },
        subtitle: { ja: "SERVICES", en: "SERVICES" },
        talkScript: { ja: "これらのサービスを提供しています", en: "Here are the services we offer" },
    },
    {
        id: 10, actId: "partner-growth", type: "pricing",
        title: { ja: "料金体系 + 導入フロー", en: "Pricing & Onboarding" },
        subtitle: { ja: "PRICING", en: "PRICING" },
        talkScript: { ja: "料金は案件規模に合わせて柔軟に", en: "Pricing is flexible based on project scale" },
    },
    {
        id: 11, actId: "partner-growth", type: "card-grid",
        title: { ja: "開発実績・対応業界", en: "Portfolio & Industries" },
        subtitle: { ja: "PORTFOLIO", en: "PORTFOLIO" },
        talkScript: { ja: "エンタメ・EC・SaaS等幅広い実績", en: "Wide experience across entertainment, EC, SaaS" },
    },

    // ─── ACT 3: AI DX (6 slides) ───
    {
        id: 12, actId: "ai-dx", type: "section-break",
        title: { ja: "AI DX", en: "AI DX" },
        subtitle: { ja: "AI × DXで、日常業務を変革する。", en: "Transform daily operations with AI × DX." },
        talkScript: { ja: "続いてAI DX事業です", en: "Next, our AI DX business" },
    },
    {
        id: 13, actId: "ai-dx", type: "data",
        title: { ja: "なぜ今、AI DXなのか", en: "Why AI DX Now?" },
        subtitle: { ja: "MARKET", en: "MARKET" },
        talkScript: { ja: "AI導入はまだ4%。大きな機会です", en: "Only 4% of SMEs use AI. Huge opportunity" },
    },
    {
        id: 14, actId: "ai-dx", type: "card-grid",
        title: { ja: "サービスマップ", en: "Service Map" },
        subtitle: { ja: "APPROACH", en: "APPROACH" },
        talkScript: { ja: "代行から入って徐々に内製化する", en: "Start with outsourcing, gradually internalize" },
    },
    {
        id: 15, actId: "ai-dx", type: "pricing",
        title: { ja: "料金体系 + 補助金", en: "Pricing & Subsidies" },
        subtitle: { ja: "PRICING", en: "PRICING" },
        talkScript: { ja: "補助金で実質月3万で導入可能", en: "Subsidies can reduce cost to ¥30K/month" },
    },
    {
        id: 16, actId: "ai-dx", type: "card-grid",
        title: { ja: "業界別ユースケース", en: "Industry Use Cases" },
        subtitle: { ja: "USE CASES", en: "USE CASES" },
        talkScript: { ja: "御社ならこのユースケースが最適", en: "This use case fits your industry best" },
    },
    {
        id: 17, actId: "ai-dx", type: "data",
        title: { ja: "補助金制度の詳細", en: "Subsidy Programs" },
        subtitle: { ja: "SUBSIDIES", en: "SUBSIDIES" },
        talkScript: { ja: "補助金で実質コストを大幅削減できます", en: "Subsidies can significantly reduce your costs" },
    },

    // ─── ACT 4: CLOSE (5 slides) ───
    {
        id: 18, actId: "close", type: "evidence",
        title: { ja: "導入事例", en: "Case Studies" },
        subtitle: { ja: "CASE STUDY", en: "CASE STUDY" },
        talkScript: { ja: "実際の導入事例をご紹介します", en: "Here are actual implementation examples" },
    },
    {
        id: 19, actId: "close", type: "card-grid",
        title: { ja: "導入の流れ", en: "How It Works" },
        subtitle: { ja: "JOURNEY", en: "JOURNEY" },
        talkScript: { ja: "導入はこのようなステップで進みます", en: "Here's how the onboarding process works" },
    },
    {
        id: 20, actId: "close", type: "evidence",
        title: { ja: "セキュリティ・安心の取り組み", en: "Security & Trust" },
        subtitle: { ja: "SECURITY", en: "SECURITY" },
        talkScript: { ja: "安全性もご安心ください", en: "You can trust our security measures" },
    },
    {
        id: 21, actId: "close", type: "evidence",
        title: { ja: "ProductXが選ばれる理由", en: "Why Choose ProductX" },
        subtitle: { ja: "COMPARISON", en: "COMPARISON" },
        talkScript: { ja: "他社との違いをご説明します", en: "Here's what sets us apart" },
    },
    {
        id: 22, actId: "close", type: "cta",
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

/* ══════════════════════════════════════════════════
   SLIDE-SPECIFIC CONTENT DATA (expanded)
   ══════════════════════════════════════════════════ */

/* ── Company Overview ── */
export const companyInfo = {
    name: { ja: "株式会社ProductX", en: "ProductX Inc." },
    founded: { ja: "2025年3月", en: "March 2025" },
    ceo: { ja: "上野 健太", en: "Kenta Ueno" },
    location: { ja: "東京", en: "Tokyo, Japan" },
    business: { ja: "プロダクト開発支援 / AI DX支援", en: "Product Development / AI DX Consulting" },
    capital: { ja: "300万円", en: "¥3M JPY" },
    employees: { ja: "5名＋業務委託パートナー", en: "5 + contract partners" },
    domains: { ja: "Partner Growth（プロダクト開発伴走）と AI DX（AI活用業務改革）の2軸で事業展開", en: "Two pillars: Partner Growth (product development) and AI DX (AI-driven business transformation)" },
};

/* ── Vision / Mission / Values ── */
export const visionDetails = {
    mission: {
        ja: "テクノロジーの力を、すべてのビジネスに届ける。",
        en: "Bring the power of technology to every business.",
    },
    missionDesc: {
        ja: "大手企業しかアクセスできなかったハイレベルなテクノロジーとデザインの力を、中小企業にも手が届く価格とスピードで提供します。",
        en: "We make high-level technology and design—previously accessible only to large enterprises—available to SMBs at affordable prices and speeds.",
    },
    values: [
        { ja: "Build & Own — 作って終わりではなく、共に育てる", en: "Build & Own — Not just build, but grow together" },
        { ja: "Speed is God — 圧倒的なスピードが最大の差別化", en: "Speed is God — Speed is our greatest differentiator" },
        { ja: "Show, Don't Tell — 実物で語る。提案書ではなく動くもので証明", en: "Show, Don't Tell — Prove with working products, not proposals" },
    ],
};

/* ── Strengths (expanded with detail) ── */
export const strengths = [
    {
        icon: Star,
        title: { ja: "Elite Creators", en: "Elite Creators" },
        desc: { ja: "大手IT出身のエンジニア・デザイナーで構成", en: "Engineers & designers from top IT companies" },
        detail: { ja: "楽天・サイバーエージェント等の大手IT企業出身メンバーで構成。大手レベルの品質を、スタートアップのスピードとコストで提供します。", en: "Team members from Rakuten, CyberAgent and other top IT companies. Enterprise-quality output at startup speed and cost." },
    },
    {
        icon: Brain,
        title: { ja: "Product × AI", en: "Product × AI" },
        desc: { ja: "AI技術をプロダクトに統合する独自の強み", en: "Unique strength in integrating AI into products" },
        detail: { ja: "Gemini / GPT / Claude等の最新AIを即座に業務やプロダクトに組み込む実装力。従来SIerの1/10のコスト、10倍のスピードでソリューションを提供。", en: "Instantly integrate latest AI (Gemini/GPT/Claude) into products. 1/10th the cost and 10x the speed of traditional SIers." },
    },
    {
        icon: PenTool,
        title: { ja: "Design × Engineering", en: "Design × Engineering" },
        desc: { ja: "デザインとエンジニアリングの高次な融合", en: "High-level fusion of design and engineering" },
        detail: { ja: "UI/UXデザインとフロントエンド/バックエンド開発を一気通貫で対応。デザインシステム構築からAPIサーバー実装まで、一つのチームで完結します。", en: "End-to-end UI/UX design and full-stack development. From design system to API server, all within one team." },
    },
    {
        icon: Rocket,
        title: { ja: "Build & Own", en: "Build & Own" },
        desc: { ja: "作って終わりではなく、共に育てる", en: "Not just build — we grow together" },
        detail: { ja: "納品して終わりではなく、リリース後のグロース支援・運用保守・機能追加まで伴走。プロダクトの成長に責任を持ちます。", en: "Beyond delivery — we support growth, maintenance, and feature additions post-launch. We're responsible for product success." },
    },
];

/* ── Stats (expanded with sub) ── */
export const stats = [
    { value: "50+", label: { ja: "プロジェクト参画数", en: "Projects" }, sub: { ja: "新規開発・UI刷新・技術顧問を含む", en: "Including new dev, UI renewal, tech advisory" } },
    { value: "15+", label: { ja: "エンジニアリング経験年数", en: "Years Experience" }, sub: { ja: "大手IT企業での開発リード経験", en: "Development lead at major IT companies" } },
    { value: "98%", label: { ja: "クライアント満足度", en: "Client Satisfaction" }, sub: { ja: "プロジェクト完了後アンケートに基づく", en: "Based on post-project surveys" } },
    { value: "6+", label: { ja: "対応業界数", en: "Industries Served" }, sub: { ja: "エンタメ・EC・SaaS・不動産・人材・製造", en: "Entertainment, EC, SaaS, Real Estate, HR, Manufacturing" } },
];

/* ── Personas (NEW) ── */
export const deckPersonas = [
    {
        icon: Target,
        role: { ja: "営業組織の経営者", en: "Sales-Driven CEO" },
        pain: { ja: "「SIerに見積もりを依頼したら500万円から。AIで何かできるはずだけど、何から始めれば…」", en: "\"The SIer quoted ¥5M. There must be an AI way, but where do we start?\"" },
        solution: { ja: "アタックリスト自動生成 → 営業資料ドラフト → CRM自動化へ", en: "Auto target lists → Sales draft → CRM automation" },
        color: "border-emerald-500/40",
    },
    {
        icon: BarChart3,
        role: { ja: "バックオフィス部門長", en: "Back-Office Manager" },
        pain: { ja: "「月末の請求書処理に3日かかる。転記ミスで差戻し多発、経理2名が残業常態化…」", en: "\"Invoice processing takes 3 days. Transcription errors cause rework, 2 accountants constantly overtime...\"" },
        solution: { ja: "請求書デジタル化 → 仕訳自動化 → 月末処理を1日に短縮", en: "Invoice digitization → Auto journal entries → Month-end in 1 day" },
        color: "border-sky-500/40",
    },
    {
        icon: Lightbulb,
        role: { ja: "DX推進担当", en: "DX Lead" },
        pain: { ja: "「社長から『AI使え』と言われたけど、何をすればいいか分からない。予算は年100万…」", en: "\"The CEO said 'use AI' but I have no idea what to do. Budget: ¥1M/year...\"" },
        solution: { ja: "社内FAQボット構築 → AI活用研修 → 全社横展開", en: "Internal FAQ bot → AI training → Company-wide AI expansion" },
        color: "border-violet-500/40",
    },
];

/* ── PG Strengths (expanded) ── */
export const pgStrengths = [
    {
        icon: Award,
        title: { ja: "高品質なプロダクト", en: "High-Quality Products" },
        desc: { ja: "大手レベルの品質をスタートアップスピードで", en: "Enterprise quality at startup speed" },
        detail: { ja: "要件定義から設計・開発・テストまで、大手IT出身メンバーが一気通貫で担当。外注先の品質ばらつきを排除し、最初から高い品質を実現します。", en: "Our team from major IT companies handles everything from requirements to testing. No quality variance from subcontracting — high quality from day one." },
    },
    {
        icon: Layers,
        title: { ja: "上流〜下流一気通貫", en: "End-to-End Coverage" },
        desc: { ja: "企画・設計・開発・運用まで一気通貫で伴走", en: "From planning to operations, we walk with you" },
        detail: { ja: "企画フェーズからPM・デザイナー・エンジニアがワンチームで参画。仕様の認識齟齬を最小化し、手戻りの少ない開発を実現します。", en: "PM, designer, and engineer join as one team from the planning phase. Minimize specification gaps for smooth, rework-free development." },
    },
    {
        icon: TrendingUp,
        title: { ja: "実績ナレッジ活用", en: "Proven Knowledge" },
        desc: { ja: "多業界の開発ナレッジを新プロジェクトに還元", en: "Apply insights from many industries" },
        detail: { ja: "エンタメ・EC・SaaS・人材など多業界での開発経験で蓄積したアーキテクチャ設計パターンやUI/UXのベストプラクティスを、御社のプロジェクトに還元します。", en: "Architecture patterns and UI/UX best practices accumulated across entertainment, EC, SaaS, HR and more — applied to your project." },
    },
];

/* ── PG Services (expanded with desc per category) ── */
export const pgServices = [
    {
        cat: { ja: "新規開発", en: "New Development" },
        catDesc: { ja: "ゼロからプロダクトを構築。MVP〜本格サービスまで対応", en: "Build products from scratch. From MVP to full-scale services" },
        items: [
            { ja: "Webアプリ開発", en: "Web App Development" },
            { ja: "モバイルアプリ開発", en: "Mobile App Development" },
            { ja: "SaaS構築", en: "SaaS Development" },
            { ja: "MVP開発", en: "MVP Development" },
        ]
    },
    {
        cat: { ja: "UI/UX刷新", en: "UI/UX Refresh" },
        catDesc: { ja: "既存システムのUI/UXを最新トレンドに合わせてリニューアル", en: "Modernize existing system UI/UX to latest design trends" },
        items: [
            { ja: "UIリニューアル", en: "UI Renewal" },
            { ja: "UXリサーチ", en: "UX Research" },
            { ja: "デザインシステム構築", en: "Design System" },
        ]
    },
    {
        cat: { ja: "コンサルティング", en: "Consulting" },
        catDesc: { ja: "技術的な意思決定から組織のDX推進まで支援", en: "From technical decisions to organizational DX promotion" },
        items: [
            { ja: "技術顧問", en: "Tech Advisory" },
            { ja: "プロダクト戦略", en: "Product Strategy" },
            { ja: "DX推進支援", en: "DX Promotion" },
        ]
    },
];

/* ── PG Plans (expanded) ── */
export const pgPlans = [
    {
        name: { ja: "スポット", en: "Spot" },
        price: { ja: "50〜300万", en: "¥500K-3M" },
        desc: { ja: "単発の開発案件", en: "One-time project" },
        includes: [
            { ja: "要件定義・設計", en: "Requirements & Design" },
            { ja: "開発・テスト", en: "Development & Testing" },
            { ja: "納品・ドキュメント", en: "Delivery & Documentation" },
        ],
        timeline: { ja: "1〜3ヶ月", en: "1-3 months" },
        target: { ja: "小規模開発、MVP検証、UIプロトタイプ", en: "Small dev, MVP validation, UI prototyping" },
    },
    {
        name: { ja: "月額", en: "Monthly" },
        price: { ja: "80〜200万/月", en: "¥800K-2M/mo" },
        desc: { ja: "継続的な開発支援", en: "Ongoing development" },
        recommended: true,
        includes: [
            { ja: "専属チーム（PM+エンジニア+デザイナー）", en: "Dedicated team (PM + Engineer + Designer)" },
            { ja: "スプリント単位の開発", en: "Sprint-based development" },
            { ja: "月次レビュー・改善提案", en: "Monthly review & improvement proposals" },
            { ja: "運用保守・バグ修正", en: "Maintenance & bug fixes" },
        ],
        timeline: { ja: "3ヶ月〜", en: "3 months+" },
        target: { ja: "本格的なサービス開発、中長期的なプロダクト成長", en: "Full-scale service dev, mid/long-term product growth" },
    },
    {
        name: { ja: "固定", en: "Fixed" },
        price: { ja: "300〜2000万", en: "¥3M-20M" },
        desc: { ja: "大規模プロジェクト", en: "Large-scale project" },
        includes: [
            { ja: "プロジェクトマネジメント", en: "Project management" },
            { ja: "フルスタック開発", en: "Full-stack development" },
            { ja: "インフラ構築・CI/CD", en: "Infrastructure & CI/CD" },
            { ja: "リリース後3ヶ月サポート", en: "3-month post-launch support" },
        ],
        timeline: { ja: "3〜12ヶ月", en: "3-12 months" },
        target: { ja: "基幹システム刷新、大規模SaaS構築", en: "Core system renewal, large-scale SaaS" },
    },
];

/* ── PG Industries (with sample track records) ── */
export const pgIndustries = [
    { icon: Video, label: { ja: "エンターテインメント", en: "Entertainment" }, record: { ja: "ライブ配信アプリ開発", en: "Live streaming app" } },
    { icon: ShoppingCart, label: { ja: "EC・小売", en: "EC & Retail" }, record: { ja: "ECプラットフォーム構築", en: "EC platform development" } },
    { icon: Monitor, label: { ja: "SaaS", en: "SaaS" }, record: { ja: "マルチテナントSaaS構築", en: "Multi-tenant SaaS" } },
    { icon: Building2, label: { ja: "不動産", en: "Real Estate" }, record: { ja: "物件管理CRM開発", en: "Property management CRM" } },
    { icon: Briefcase, label: { ja: "人材", en: "HR" }, record: { ja: "人材マッチングシステム", en: "HR matching platform" } },
    { icon: Factory, label: { ja: "製造", en: "Manufacturing" }, record: { ja: "在庫管理ダッシュボード", en: "Inventory dashboard" } },
];

/* ── Market Stats (expanded with sub) ── */
export const marketStats = [
    { value: "96%", label: { ja: "中小企業のAI未導入率", en: "SME AI non-adoption rate" }, sub: { ja: "10人未満企業は導入率10%以下", en: "Under 10% for companies with <10 employees" } },
    { value: "68%", label: { ja: "人手不足を課題とする企業", en: "Companies facing labor shortage" }, sub: { ja: "AIによる省力化の需要が急増中", en: "Surging demand for AI-driven efficiency" } },
    { value: "3,900億", label: { ja: "国内AI市場規模", en: "Domestic AI market size" }, sub: { ja: "国内DX市場6.5兆円のうちAI領域", en: "AI segment of JPY 6.5T domestic DX market" } },
    { value: "最大450万", label: { ja: "補助金支援額", en: "Max subsidy amount" }, sub: { ja: "デジタル化・AI導入補助金を活用", en: "Via Digitalization & AI adoption subsidy" } },
];

/* ── AI Approaches (expanded with desc) ── */
export const aiApproaches = [
    { label: { ja: "AI代行", en: "AI Outsourcing" }, desc: { ja: "ProductXがAIを使って業務を代行し成果物を納品。まずは「AIの凄さ」を体感。", en: "We execute tasks with AI and deliver results. Experience power of AI first-hand." } },
    { label: { ja: "AI導入", en: "AI Integration" }, desc: { ja: "顧客社内にAI活用環境を構築・セットアップ。仕組み化して定着させる。", en: "Build AI environments in-house. Systematize for lasting impact." } },
    { label: { ja: "AI開発", en: "AI Development" }, desc: { ja: "業務の深部に入り込むカスタムAIシステムやワークフローを開発・納品。", en: "Develop custom AI systems and workflows for core operations." } },
];

/* ── AI Plans (expanded) ── */
export const aiPlans = [
    {
        name: { ja: "梅", en: "Basic" },
        price: { ja: "5〜30万", en: "¥50K-300K" },
        desc: { ja: "スポット代行", en: "Spot outsourcing" },
        emoji: "🌸",
        includes: [
            { ja: "AI業務代行＋成果物納品", en: "AI task execution + deliverables" },
            { ja: "ヒアリング＋要件整理", en: "Hearing + requirements" },
        ],
        examples: { ja: "アタックリスト自動生成、広告クリエイティブ量産、競合レポート作成", en: "Auto target lists, mass creatives, competitor reports" },
    },
    {
        name: { ja: "竹", en: "Standard" },
        price: { ja: "20〜80万 + 月5〜15万", en: "¥200K-800K + ¥50-150K/mo" },
        desc: { ja: "導入 + 運用支援", en: "Integration + support" },
        emoji: "🎋",
        recommended: true,
        includes: [
            { ja: "AI環境構築＋セットアップ", en: "AI environment setup" },
            { ja: "社員向け運用マニュアル", en: "Staff operation manual" },
            { ja: "月次レポート＋改善提案", en: "Monthly report + improvement proposal" },
            { ja: "チャットサポート", en: "Chat support" },
        ],
        examples: { ja: "社内FAQボット、議事録自動化、ナレッジ統合検索", en: "Internal FAQ bot, auto minutes, knowledge search" },
    },
    {
        name: { ja: "松", en: "Premium" },
        price: { ja: "100〜500万", en: "¥1M-5M" },
        desc: { ja: "フルカスタム開発", en: "Full custom development" },
        emoji: "🌲",
        includes: [
            { ja: "要件定義〜設計〜開発〜テスト", en: "Requirements → Design → Development → Testing" },
            { ja: "API連携＋データフロー構築", en: "API integration + data flow" },
            { ja: "運用保守＋機能追加", en: "Maintenance + feature additions" },
            { ja: "四半期レビュー", en: "Quarterly review" },
        ],
        examples: { ja: "AIチャットボット開発、広告自動最適化エンジン、CRM自動化", en: "AI chatbot, ad optimization engine, CRM automation" },
    },
];

/* ── AI Industry Use Cases (expanded) ── */
export const aiIndustryUC = [
    { icon: Building2, industry: { ja: "不動産", en: "Real Estate" }, uc: { ja: "物件紹介の自動化", en: "Property intro automation" }, detail: { ja: "条件指定でAIがターゲット企業リストを自動抽出。数百件を数時間で生成。", en: "AI auto-extracts target company lists. Hundreds of entries in hours." }, impact: { ja: "リスト作成: 数日→数時間", en: "List creation: days→hours" } },
    { icon: Users, industry: { ja: "人材", en: "HR" }, uc: { ja: "スカウトメール自動生成", en: "Auto scout email generation" }, detail: { ja: "大量の職務経歴書をAIが読み込み、スキル・経験年数で自動スコアリング。", en: "AI reads resumes in bulk, auto-scores by skills and experience." }, impact: { ja: "書類確認時間を60%削減", en: "60% reduction in screening time" } },
    { icon: Factory, industry: { ja: "製造", en: "Manufacturing" }, uc: { ja: "在庫最適化AI", en: "Inventory optimization AI" }, detail: { ja: "紙やPDFの請求書をAIの画像認識で読み取り、仕訳データに自動変換。", en: "AI reads paper/PDF invoices and auto-converts to journal entries." }, impact: { ja: "手入力時間を70%削減", en: "70% reduction in manual entry" } },
    { icon: Megaphone, industry: { ja: "広告", en: "Advertising" }, uc: { ja: "クリエイティブ生成", en: "Creative generation" }, detail: { ja: "条件指定でAIがバナー画像＋コピーを大量生成。A/Bテスト用50パターン一括作成。", en: "AI mass-generates banners + copy for A/B testing. 50 patterns at once." }, impact: { ja: "外注デザイン費を70%以上削減", en: "70%+ reduction in design costs" } },
    { icon: Scale, industry: { ja: "士業", en: "Professional" }, uc: { ja: "契約書レビュー自動化", en: "Contract review automation" }, detail: { ja: "メール一次仕分け・定型返信・会議日程調整まで代行。", en: "AI handles email triage, draft replies, and meeting scheduling." }, impact: { ja: "メール処理を1日1〜2時間削減", en: "1-2 hours/day saved on email" } },
    { icon: Code2, industry: { ja: "IT", en: "IT" }, uc: { ja: "コードレビュー自動化", en: "Code review automation" }, detail: { ja: "AIが売上・顧客データを読み取り、自然言語で質問するだけで分析結果を返す。", en: "AI reads sales/customer data, returns analysis from natural language questions." }, impact: { ja: "外部アナリストコストをゼロ化", en: "Zero external analyst costs" } },
];

/* ── Subsidies (NEW) ── */
export const deckSubsidies = [
    {
        icon: Coins,
        name: { ja: "デジタル化・AI導入補助金", en: "Digitalization & AI Subsidy" },
        max: { ja: "最大450万円", en: "Up to ¥4.5M" },
        rate: { ja: "1/2〜4/5", en: "50-80%" },
        target: { ja: "竹・松プランのITツール導入", en: "Standard & Premium plan IT tools" },
        detail: { ja: "AI環境構築やシステム導入に係る経費の最大4/5を補助。中小企業が対象。", en: "Up to 80% subsidy for AI environment setup and system implementation. For SMBs." },
    },
    {
        icon: Coins,
        name: { ja: "ものづくり補助金", en: "Manufacturing Subsidy" },
        max: { ja: "最大1,250万円", en: "Up to ¥12.5M" },
        rate: { ja: "1/2〜2/3", en: "50-67%" },
        target: { ja: "松プランのシステム開発", en: "Premium plan system development" },
        detail: { ja: "革新的なサービス開発や生産性向上のための設備投資・システム開発を支援。", en: "Supports innovative service development and productivity improvement investments." },
    },
    {
        icon: Coins,
        name: { ja: "中小企業省力化投資補助金", en: "SMB Labor-Saving Subsidy" },
        max: { ja: "最大1,500万円", en: "Up to ¥15M" },
        rate: { ja: "1/2", en: "50%" },
        target: { ja: "AI活用の省力化投資全般", en: "General AI labor-saving investments" },
        detail: { ja: "AIを活用した人手不足対策・業務効率化の投資に対して補助。", en: "Supports AI-driven labor shortage measures and efficiency improvements." },
    },
];

export const subsidyExample = {
    ja: "💡 例： 竹プラン（初期50万＋月額10万）に補助率2/3を適用 → 実質 初期17万＋月額3.3万で導入可能。",
    en: "💡 Example: Standard Plan (¥500K setup + ¥100K/mo) with 67% subsidy → effective ¥170K setup + ¥33K/mo.",
};

/* ── Case Studies (expanded) ── */
export const caseStudyDetails = [
    {
        label: { ja: "Partner Growth 事例", en: "Partner Growth Case" },
        title: { ja: "ライブ配信アプリ開発", en: "Live Streaming App" },
        bg: { ja: "エンタメ企業。ライブ配信機能を自社アプリに組み込みたいが、社内にモバイル開発の知見がなく外注先を探していた。", en: "Entertainment company wanted live streaming in their app but lacked in-house mobile development expertise." },
        challenge: { ja: "大手SIerに相談したところ見積もり2,000万＋8ヶ月の納期。予算・スケジュールともに合わなかった。", en: "Consulted a major SIer — quoted ¥20M with 8-month timeline. Neither budget nor schedule fit." },
        solution: { ja: "ProductXが企画〜設計〜開発を一気通貫で担当。React Native + WebRTCで3ヶ月でリリース。", en: "ProductX handled planning to development end-to-end. Released in 3 months with React Native + WebRTC." },
        before: { ja: "開発リソース不足、SIer見積もり2,000万", en: "Lack of dev resources, SIer quote ¥20M" },
        after: { ja: "3ヶ月でリリース完了、コスト1/4に削減", en: "Released in 3 months, costs reduced to 1/4" },
    },
    {
        label: { ja: "AI DX 事例", en: "AI DX Case" },
        title: { ja: "問い合わせ対応の自動化", en: "Customer Support Automation" },
        bg: { ja: "BtoB SaaS企業。月間100件超の問い合わせを3名のCSチームが手動対応。回答品質のばらつきと対応遅延が課題。", en: "B2B SaaS company. 3 CS staff manually handling 100+ monthly inquiries. Quality inconsistency and response delays were issues." },
        challenge: { ja: "月40時間の手動対応。よくある質問が全体の70%を占めるが、ナレッジが属人化しておりFAQが整備されていなかった。", en: "40 hours/month of manual work. FAQs made up 70% of inquiries but knowledge was siloed." },
        solution: { ja: "ProductXが社内ナレッジをAIに学習させたFAQボットを構築。LINE/Slack/Web対応の3チャネル配信。", en: "ProductX built an FAQ bot trained on internal knowledge. Deployed across LINE, Slack, and Web." },
        before: { ja: "月40時間の手動対応、回答品質のばらつき", en: "40hrs/month manual work, inconsistent quality" },
        after: { ja: "70%削減・月12時間、回答品質の均一化", en: "70% reduction to 12hrs, standardized quality" },
    },
];

/* ── Journey Steps (NEW) ── */
export const deckJourneySteps = [
    { icon: Lightbulb, title: { ja: "無料AI診断", en: "Free AI Diagnosis" }, desc: { ja: "30分のヒアリングで最適なAIソリューションを3つ提案。サンプル成果物も無料で納品。", en: "30-minute hearing to propose 3 optimal AI solutions with free sample deliverables." } },
    { icon: Target, title: { ja: "1ヶ月トライアル", en: "1-Month Trial" }, desc: { ja: "成果保証型のトライアル。KPIを書面で合意し、未達の場合は無料。Before/After数値レポートで費用対効果を可視化。", en: "Performance-guaranteed trial with written KPIs. Free if targets aren't met. Before/After report." } },
    { icon: TrendingUp, title: { ja: "本契約＆拡大", en: "Contract & Scale" }, desc: { ja: "テスト成功後に月額契約へ移行。他部門への横展開やアップセルで効果を最大化。", en: "Move to subscription after successful trial. Maximize impact with cross-department expansion." } },
    { icon: HandshakeIcon, title: { ja: "事例化＆紹介", en: "Case Study & Referral" }, desc: { ja: "導入企業のビフォーアフター事例をコンテンツ化。月次レポート・四半期レビューで継続サポート。", en: "Before/After case studies + monthly reports & quarterly reviews for ongoing support." } },
];

/* ── Security (expanded) ── */
export const securityItems = [
    { icon: Lock, title: { ja: "NDA対応", en: "NDA Compliant" }, desc: { ja: "全プロジェクトでNDAを締結", en: "NDA signed for every project" }, detail: { ja: "契約前にNDA（秘密保持契約）を締結。個人情報は匿名化処理を基本とし、データの取扱いを契約書に明記します。", en: "NDA signed before contract. Personal data anonymized by default. Data handling explicitly documented in agreements." } },
    { icon: Shield, title: { ja: "データ学習不使用", en: "No Data Training" }, desc: { ja: "顧客データをAIの学習に使用しません", en: "Your data is never used for AI training" }, detail: { ja: "エンタープライズ版API（GPT-4 / Gemini Pro等）を利用。送信データがAIモデルの学習に使用されない環境を保証します。", en: "Using enterprise API (GPT-4 / Gemini Pro). Guaranteed that your data is never used for model training." } },
    { icon: FileCheck, title: { ja: "30日削除ポリシー", en: "30-Day Deletion" }, desc: { ja: "プロジェクト終了後30日で全データ削除", en: "All data deleted 30 days after project end" }, detail: { ja: "納品後のデータは30日以内に完全削除。長期保管が必要な場合は別途契約で対応。削除証明書の発行も可能です。", en: "All data fully deleted within 30 days post-delivery. Extended retention available via separate agreement. Deletion certificates available." } },
];

/* ── Competitors (NEW — ProductX-advantage framing) ── */
export const deckCompetitors = [
    { name: { ja: "大手SIer", en: "Large SIers" }, aspect: { ja: "コスト・納期", en: "Cost & Timeline" }, them: { ja: "見積もり500万〜、納期6ヶ月〜", en: "Quotes from ¥5M, 6+ months" }, us: { ja: "即日〜数週間、1/10のコスト", en: "Same-day to weeks, 1/10th cost" } },
    { name: { ja: "フリーランスコンサル", en: "Freelance Consultants" }, aspect: { ja: "スケーラビリティ", en: "Scalability" }, them: { ja: "属人的で担当者離脱リスク", en: "Person-dependent, attrition risk" }, us: { ja: "チーム体制でスケール可能", en: "Team-based, scalable" } },
    { name: { ja: "SaaS（ChatGPT等）", en: "SaaS (ChatGPT etc.)" }, aspect: { ja: "活用定着", en: "Adoption" }, them: { ja: "セルフサービス型で活用が進まない", en: "Self-service model, low adoption" }, us: { ja: "代行→導入の伴走型で確実に成果", en: "Hands-on approach ensures results" } },
    { name: { ja: "他DX支援会社", en: "Other DX Firms" }, aspect: { ja: "AI専門性", en: "AI Expertise" }, them: { ja: "AI領域の実装経験が浅い", en: "Limited AI implementation experience" }, us: { ja: "Gemini/GPT/Claude即実装の技術力", en: "Instant Gemini/GPT/Claude implementation" } },
];
