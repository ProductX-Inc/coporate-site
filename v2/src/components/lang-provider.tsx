"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "ja" | "en";

interface LangContextType {
    locale: Locale;
    toggleLocale: () => void;
    t: (key: string) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<string, Record<Locale, string>> = {
    // ===== Header / Nav =====
    "nav.about": { ja: "About", en: "About" },
    "nav.services": { ja: "Services", en: "Services" },
    "nav.news": { ja: "News", en: "News" },
    "nav.contact": { ja: "Contact", en: "Contact" },

    // ===== Hero Section =====
    "hero.title": { ja: "Unleash Potential.", en: "Unleash Potential." },
    "hero.sub": { ja: "プロダクトで、可能性を解き放つ。", en: "Unlock possibilities through products." },
    "hero.cta": { ja: "Start a Project", en: "Start a Project" },
    "hero.scroll": { ja: "SCROLL", en: "SCROLL" },

    // ===== Proof Section =====
    "proof.label": { ja: "Why ProductX", en: "Why ProductX" },
    "proof.title": { ja: "プロダクトの力で、\nまだ見ぬ未来を創る。", en: "Building unseen futures\nthrough product craft." },
    "proof.tile1.label": { ja: "Elite Creators", en: "Elite Creators" },
    "proof.tile1.desc": { ja: "大手IT企業出身の精鋭が集結した少数精鋭チーム", en: "A handpicked team of top talent from leading IT companies" },
    "proof.tile2.label": { ja: "Product × AI", en: "Product × AI" },
    "proof.tile2.desc": { ja: "プロダクト開発力とAI技術の掛け合わせで価値を最大化", en: "Maximizing value by combining product craft with AI expertise" },
    "proof.tile3.label": { ja: "Design × Engineering", en: "Design × Engineering" },
    "proof.tile3.desc": { ja: "美しいデザインと堅牢な技術を高次元で融合", en: "Fusing beautiful design with robust engineering at the highest level" },
    "proof.tile4.label": { ja: "Build & Own", en: "Build & Own" },
    "proof.tile4.desc": { ja: "受託にとどまらず、自社プロダクトでも価値を証明", en: "Proving our value not only through client work, but our own products" },

    // ===== Craft Section (Top Page Bento) =====
    "craft.label": { ja: "What We Do", en: "What We Do" },
    "craft.title": { ja: "Services", en: "Services" },
    "craft.pg.label": { ja: "Client Work", en: "Client Work" },
    "craft.pg.title": { ja: "Partner Growth", en: "Partner Growth" },
    "craft.pg.desc": { ja: "大手IT企業出身のクリエイターによる、企画からグロースまでの一気通貫支援。プロダクト戦略・UI/UXデザイン・開発・テスト・リリース後の成長支援まで。", en: "End-to-end product development support by elite creators from leading IT companies, from strategy and design to development, testing, and post-launch growth." },
    "craft.pg.link": { ja: "View Details", en: "View Details" },
    "craft.ai.label": { ja: "Consulting", en: "Consulting" },
    "craft.ai.title": { ja: "AI DX", en: "AI DX" },
    "craft.ai.desc": { ja: "AI・生成AIを活用した業務変革・DX推進を支援。業務フロー分析からAIツール導入、オペレーション改善まで伴走します。", en: "Supporting business transformation and DX with AI and generative AI. We provide hands-on support from workflow analysis to AI tool implementation." },
    "craft.ai.link": { ja: "View Details", en: "View Details" },
    "craft.op.label": { ja: "In-House", en: "In-House" },
    "craft.op.title": { ja: "Original Product", en: "Original Product" },
    "craft.op.desc": { ja: "自社開発のコンシューマー向けサービス。独自のプロダクトで新しい価値を創出します。", en: "Consumer-facing services developed in-house. Creating new value through original products." },
    "craft.op.badge": { ja: "Coming Soon", en: "Coming Soon" },

    // ===== Pulse Section =====
    "pulse.label": { ja: "Latest Updates", en: "Latest Updates" },
    "pulse.title": { ja: "News", en: "News" },

    // ===== Invite Section =====
    "invite.title": { ja: "Build the future,\ntogether.", en: "Build the future,\ntogether." },
    "invite.sub": { ja: "プロジェクトのご相談、お気軽にどうぞ。", en: "Let's discuss your next project." },
    "invite.cta": { ja: "Start a Project", en: "Start a Project" },
    "invite.copyright": { ja: "© 2026 ProductX Inc.", en: "© 2026 ProductX Inc." },

    // ===== About Page =====
    "about.label": { ja: "ABOUT US", en: "ABOUT US" },
    "about.title": { ja: "Products that build futures.", en: "Products that build futures." },
    "about.desc": { ja: "プロダクトで未来を創造し、あらゆる可能性を解き放つ。", en: "Creating the future through products, unleashing every possibility." },
    "about.mission.label": { ja: "MISSION", en: "MISSION" },
    "about.mission.title": { ja: "プロダクトで未来を創造し、\nあらゆる可能性を解き放つ。", en: "Creating the future through products,\nunleashing every possibility." },
    "about.mission.body": { ja: "革新的なプロダクト開発を通じて、社会に新たな価値を提供することを目指します。プロダクトは、生活、ビジネス、そして社会全体を大きく変革する力を持っています。その可能性を信じ、常に最先端の技術を追求し、人々の想像を超えるサービスを創造します。", en: "We aim to deliver new value to society through innovative product development. Products have the power to transform lives, businesses, and society as a whole. Believing in this potential, we constantly pursue cutting-edge technology and create services beyond imagination." },
    "about.values.label": { ja: "VALUES", en: "VALUES" },
    "about.value1.title": { ja: "極限の品質", en: "Extreme Quality" },
    "about.value1.desc": { ja: "妥協のないクラフトマンシップで、プロダクトに命を吹き込む。", en: "Breathing life into products with uncompromising craftsmanship." },
    "about.value2.title": { ja: "共創の精神", en: "Co-Creation" },
    "about.value2.desc": { ja: "クライアントと一つのチームとして、共に未来を創る。", en: "Creating the future together with clients as one team." },
    "about.value3.title": { ja: "挑戦する勇気", en: "Courage to Challenge" },
    "about.value3.desc": { ja: "未知の領域に踏み出し、新しい価値を生み出し続ける。", en: "Stepping into uncharted territory to keep creating new value." },
    "about.value4.title": { ja: "誠実な透明性", en: "Honest Transparency" },
    "about.value4.desc": { ja: "クライアントとの信頼関係を、透明なコミュニケーションで築く。", en: "Building trust with clients through transparent communication." },
    "about.value5.title": { ja: "進化し続ける", en: "Continuous Evolution" },
    "about.value5.desc": { ja: "テクノロジーと創造性の最前線で、常に学び続ける。", en: "Constantly learning at the forefront of technology and creativity." },
    "about.company.label": { ja: "COMPANY", en: "COMPANY" },
    "about.company.name.label": { ja: "会社名", en: "Company Name" },
    "about.company.name.value": { ja: "株式会社ProductX", en: "ProductX Inc." },
    "about.company.ceo.label": { ja: "代表者", en: "CEO" },
    "about.company.ceo.value": { ja: "上野 健太", en: "Kenta Ueno" },
    "about.company.founded.label": { ja: "設立", en: "Founded" },
    "about.company.founded.value": { ja: "2025年3月", en: "March 2025" },
    "about.company.location.label": { ja: "所在地", en: "Location" },
    "about.company.location.value": { ja: "東京都渋谷区渋谷2-19-15 宮益坂ビルディング609", en: "2-19-15 Shibuya, Shibuya-ku, Tokyo, Miyamasaka Building 609" },
    "about.company.business.label": { ja: "事業内容", en: "Business" },
    "about.company.business.value": { ja: "プロダクト開発支援 / AI DX支援 / 自社プロダクト開発", en: "Product Development / AI DX / Original Product" },
    "about.ceo.label": { ja: "CEO MESSAGE", en: "CEO MESSAGE" },
    "about.ceo.name": { ja: "上野 健太", en: "Kenta Ueno" },
    "about.ceo.role": { ja: "代表取締役 CEO", en: "Founder & CEO" },
    "about.ceo.message": { ja: "「本当に価値あるプロダクトとは何か」——この問いと向き合い続けることが、ProductXの原点です。\n\n社会やビジネスの課題を深く理解し、その本質を見極めること。そこから生まれるプロダクト戦略こそが、人の行動を変え、新しい価値を創り出す力を持つと信じています。\n\n美しいデザインと堅牢な技術の融合。それは手段であり、目的ではありません。私たちが本当に届けたいのは、課題の発見から解決までを一気通貫で伴走し、プロダクトを通じてクライアントの事業を成長させること——そして、AIの力で企業の変革を加速させることです。\n\nさらに、クライアントワークで培った知見を自社プロダクトにも注ぎ込み、自ら市場に価値を問い続けます。作り手であり続けることが、最高のプロダクトパートナーであるための条件だと考えるからです。\n\nプロダクトの力で、まだ見ぬ未来を一緒に創りましょう。", en: "\"What does a truly valuable product look like?\" — Continuously confronting this question is the origin of ProductX.\n\nDeeply understanding the challenges of society and business, and discerning their essence. We believe that product strategy born from this understanding has the power to change human behavior and create new value.\n\nThe fusion of beautiful design and robust engineering is a means, not an end. What we truly want to deliver is end-to-end partnership — from discovering problems to solving them — growing our clients' businesses through products, and accelerating enterprise transformation with the power of AI.\n\nFurthermore, we pour the knowledge gained from client work into our own products, continuously challenging the market with our own creations. We believe that remaining a maker is a prerequisite for being the best product partner.\n\nLet's build the unseen future together, through the power of products." },
    "about.tech.label": { ja: "TECH STACK", en: "TECH STACK" },

    // ===== Services Page =====
    "services.label": { ja: "Services", en: "Services" },
    "services.title": { ja: "3つの事業で、可能性を解き放つ。", en: "Three pillars to unleash potential." },
    "services.desc": { ja: "プロダクト開発・AI DX・自社プロダクトの3本柱で、お客様と社会に価値を届けます。", en: "Delivering value through product development, AI DX, and original products." },
    "services.pg.desc": { ja: "大手IT企業出身のエリートクリエイター集団による、プロダクト開発・グロース支援。企画・要件定義からUI/UXデザイン、開発・テスト、リリース後の成長支援まで、ワンチームで一気通貫の支援を提供します。", en: "End-to-end product development and growth support by an elite team of creators from leading IT companies. From planning and requirements to UI/UX design, development, testing, and post-launch growth support." },
    "services.pg.f1.title": { ja: "高品質なプロダクト提供", en: "High-Quality Products" },
    "services.pg.f1.desc": { ja: "大手IT企業所属・出身のクリエイターによる、エンタープライズ品質のプロダクト開発を提供します。", en: "Enterprise-quality product development by creators from leading IT companies." },
    "services.pg.f2.title": { ja: "上流から下流まで一気通貫", en: "End-to-End Support" },
    "services.pg.f2.desc": { ja: "ただの開発ではなく、上流のプロダクト設計からリリース後のグロースまで、ワンチームで伴走します。", en: "Not just development — from upstream product design to post-launch growth, we work as one team." },
    "services.pg.f3.title": { ja: "実績に基づくナレッジ活用", en: "Experience-Driven Knowledge" },
    "services.pg.f3.desc": { ja: "これまでの豊富な開発経験から得られたナレッジを活用し、最適なソリューションを提案します。", en: "Leveraging knowledge from extensive development experience to propose optimal solutions." },
    "services.pg.offerings": { ja: "新規サービス開発,既存システムUI/UX刷新,システムコンサルティング", en: "New Service Development,UI/UX Modernization,System Consulting" },
    "services.ai.desc": { ja: "AI・生成AIの力で企業の業務変革を推進。代行・導入・開発の3つのアプローチで、業務効率の飛躍的改善とビジネスの付加価値向上を実現します。", en: "Driving business transformation with AI and generative AI. Three approaches — execution, integration, and engineering — to dramatically improve efficiency." },
    "services.ai.f1.title": { ja: "AI Execution — 業務代行", en: "AI Execution" },
    "services.ai.f1.desc": { ja: "ProductXがAIを使って業務を代わりに実行し納品する（例：リスト作成、レポート納品）", en: "We execute and deliver business tasks using AI (e.g., list generation, report delivery)" },
    "services.ai.f2.title": { ja: "AI Integration — 環境構築", en: "AI Integration" },
    "services.ai.f2.desc": { ja: "顧客社内にAI活用環境を構築・セットアップする（例：FAQボット、分類環境）", en: "Building and setting up AI environments within your organization (e.g., FAQ bots, classification systems)" },
    "services.ai.f3.title": { ja: "AI Engineering — 開発", en: "AI Engineering" },
    "services.ai.f3.desc": { ja: "顧客向けにシステムやワークフローを開発・納品する（例：自動化エンジン、チャットボット）", en: "Developing and delivering systems and workflows (e.g., automation engines, chatbots)" },
    "services.ai.offerings": { ja: "AI業務代行,AI活用環境構築,AIシステム開発,AI研修・ワークショップ", en: "AI Task Execution,AI Environment Setup,AI System Development,AI Training & Workshops" },
    "services.op.desc": { ja: "自社開発のコンシューマー向けサービス。ProductXが培った技術力とプロダクト思考を注ぎ込み、世の中に新しい価値を創出します。", en: "Consumer-facing services built in-house. Pouring our technical expertise and product thinking into creating new value for the world." },
    "services.cta": { ja: "プロジェクトのご相談はお気軽に", en: "Let's discuss your project" },
    "services.cta.btn": { ja: "お問い合わせ", en: "Contact Us" },
    "services.scope": { ja: "対応領域", en: "Scope" },

    // ===== News Page =====
    "news.label": { ja: "NEWS", en: "NEWS" },
    "news.title": { ja: "お知らせ", en: "News & Updates" },
    "news.desc": { ja: "ProductXの最新情報をお届けします。", en: "Stay up to date with the latest from ProductX." },
    "news.back": { ja: "← ニュース一覧に戻る", en: "← Back to News" },

    // ===== Contact Page =====
    "contact.label": { ja: "CONTACT", en: "CONTACT" },
    "contact.title": { ja: "お問い合わせ", en: "Get in Touch" },
    "contact.desc": { ja: "プロジェクトのご相談やお見積もりなど、お気軽にお問い合わせください。", en: "For project inquiries, estimates, or any questions — feel free to reach out." },
    "contact.name": { ja: "担当者名", en: "Your Name" },
    "contact.company": { ja: "会社名", en: "Company" },
    "contact.website": { ja: "ウェブサイト", en: "Website" },
    "contact.email": { ja: "メールアドレス", en: "Email" },
    "contact.emailConfirm": { ja: "メールアドレス（確認用）", en: "Confirm Email" },
    "contact.phone": { ja: "電話番号", en: "Phone" },
    "contact.message": { ja: "お問い合わせ内容", en: "Message" },
    "contact.required": { ja: "*", en: "*" },
    "contact.optional": { ja: "任意", en: "Optional" },
    "contact.submit": { ja: "送信する", en: "Send Message" },
    "contact.thanks.title": { ja: "送信完了", en: "Message Sent" },
    "contact.thanks.body": { ja: "お問い合わせありがとうございます。\n内容を確認の上、2営業日以内にご連絡いたします。", en: "Thank you for your inquiry.\nWe will review your message and respond within 2 business days." },
    "contact.thanks.back": { ja: "トップに戻る", en: "Back to Home" },

    // ===== Privacy Page =====
    "privacy.label": { ja: "LEGAL", en: "LEGAL" },
    "privacy.title": { ja: "プライバシーポリシー", en: "Privacy Policy" },

    // ===== Terms Page =====
    "terms.label": { ja: "LEGAL", en: "LEGAL" },
    "terms.title": { ja: "利用規約", en: "Terms of Service" },

    // ===== Footer =====
    "footer.copyright": { ja: "© 2026 ProductX Inc.", en: "© 2026 ProductX Inc." },
    "footer.privacy": { ja: "Privacy Policy", en: "Privacy Policy" },
    "footer.terms": { ja: "Terms", en: "Terms" },

    // ===== Common =====
    "common.lang.toggle": { ja: "EN", en: "JP" },
};

export function LangProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("ja");

    const toggleLocale = useCallback(() => {
        setLocale((prev) => (prev === "ja" ? "en" : "ja"));
    }, []);

    const t = useCallback(
        (key: string): string => {
            return translations[key]?.[locale] ?? key;
        },
        [locale]
    );

    return (
        <LangContext.Provider value={{ locale, toggleLocale, t }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    const context = useContext(LangContext);
    if (!context) throw new Error("useLang must be used within LangProvider");
    return context;
}
