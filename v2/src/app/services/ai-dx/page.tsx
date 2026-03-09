"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang, type Locale } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import {
    ArrowRight, Zap, Settings, Code, Clock, TrendingUp,
    ChevronRight, Rocket, Target, Lightbulb, HandshakeIcon,
} from "lucide-react";

/* ── helpers ── */

type I18n = { ja: string; en: string };
const l = (locale: Locale, v: I18n) => v[locale];

const MOTION_VIEW = { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true }, variants: fadeUp };

function SectionHeader({ label, title, locale, custom0 = 0 }: { label: I18n; title: I18n; locale: Locale; custom0?: number }) {
    return (
        <>
            <motion.p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-4"
                {...MOTION_VIEW} custom={custom0}>{l(locale, label)}</motion.p>
            <motion.h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-12"
                {...MOTION_VIEW} custom={custom0 + 0.5}>{l(locale, title)}</motion.h2>
        </>
    );
}

/* ── data types ── */

interface UseCase {
    no: string;
    cat: "代行" | "導入" | "開発";
    catEn: "Execution" | "Integration" | "Engineering";
    dept: I18n;
    title: I18n;
    detail: I18n;
    killer: I18n;
    time: I18n;
    impact: I18n;
}

/* ── use case data ── */

const levels: { key: string; title: I18n; sub: I18n; color: string; cases: UseCase[] }[] = [
    {
        key: "lv1", color: "from-emerald-500 to-emerald-600",
        title: { ja: "Lv.1 — すぐに成果が出る代行サービス", en: "Lv.1 — Quick-Win Execution Services" },
        sub: { ja: "即日〜", en: "Same day start" },
        cases: [
            { no: "01", cat: "代行", catEn: "Execution", dept: { ja: "営業", en: "Sales" }, title: { ja: "営業アタックリストの自動生成", en: "Auto-Generated Sales Target Lists" }, detail: { ja: "条件を指示し、AIが公開情報からターゲット企業リストを数百件単位で自動抽出。", en: "Specify conditions and AI auto-extracts hundreds of target companies from public data." }, killer: { ja: "アタックリスト、まだ手作業で作っていますか？ AIなら1時間で500件出せます", en: "Still building target lists manually? AI can deliver 500 in an hour." }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "リスト作成工数 数日→数時間", en: "List creation: days → hours" } },
            { no: "02", cat: "代行", catEn: "Execution", dept: { ja: "営業", en: "Sales" }, title: { ja: "営業・報告資料の自動ドラフト作成", en: "Auto-Draft Sales Reports & Proposals" }, detail: { ja: "商談メモや実績データを渡すだけで、提案書・レポートのドラフトをAIが自動生成。", en: "Just provide meeting notes and data — AI auto-generates proposal and report drafts." }, killer: { ja: "毎週の報告資料づくりに何時間使っていますか？ その時間、ゼロにできます", en: "How many hours do you spend on weekly reports? We can make it zero." }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "資料作成時間を80%削減", en: "80% reduction in document creation time" } },
            { no: "03", cat: "代行", catEn: "Execution", dept: { ja: "マーケ・広報", en: "Marketing" }, title: { ja: "広告クリエイティブの量産", en: "Mass Creative Production" }, detail: { ja: "条件指定でAIがバナー画像＋キャッチコピーを大量生成。A/Bテスト用バリエーションも一括作成。", en: "AI mass-generates banner images and copy for A/B testing." }, killer: { ja: "クリエイティブの出しすぎで困ること、ありますか？ AIなら50パターン一気に作れます", en: "AI can generate 50 creative variations at once." }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "外注デザイン費用を70%以上削減", en: "70%+ reduction in outsourced design costs" } },
            { no: "04", cat: "代行", catEn: "Execution", dept: { ja: "マーケ・企画", en: "Planning" }, title: { ja: "競合分析・市場リサーチの自動レポート", en: "Automated Competitive Analysis" }, detail: { ja: "競合他社のWebサイト・SNS・プレスリリースをAIが定期巡回し、変更点を自動レポート。", en: "AI periodically crawls competitor websites and auto-reports changes." }, killer: { ja: "競合の値上げ情報、御社では誰が一番早く気づきますか？", en: "Who in your company is the first to notice a competitor's price change?" }, time: { ja: "1〜2週間〜", en: "1-2 weeks" }, impact: { ja: "競合リサーチの人件費を月10時間以上削減", en: "10+ hours/month saved on competitor research" } },
            { no: "05", cat: "代行", catEn: "Execution", dept: { ja: "営業・CS", en: "Sales/CS" }, title: { ja: "オンライン秘書業務", en: "AI Online Secretary" }, detail: { ja: "メールの一次仕分け・定型返信の下書き作成・会議日程の候補抽出と調整メール送信まで代行。", en: "AI handles email triage, draft replies, and meeting scheduling." }, killer: { ja: "社長の\"メール返信待ち渋滞\"、解消しませんか？", en: "Ready to clear the CEO's email bottleneck?" }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "メール処理時間を1日1〜2時間削減", en: "1-2 hours/day saved on email processing" } },
        ],
    },
    {
        key: "lv2", color: "from-sky-500 to-sky-600",
        title: { ja: "Lv.2 — 部門のペインを直撃する代行＆導入", en: "Lv.2 — Department Pain-Point Solutions" },
        sub: { ja: "即日〜数週間", en: "Days to weeks" },
        cases: [
            { no: "06", cat: "代行", catEn: "Execution", dept: { ja: "マーケ・広報", en: "Marketing" }, title: { ja: "広告運用の自動最適化レポート", en: "Automated Ad Optimization Reports" }, detail: { ja: "Google広告やMeta広告のデータをAIが毎日分析し、改善提案を自動生成。", en: "AI analyzes ad data daily and auto-generates optimization suggestions." }, killer: { ja: "広告レポート、毎週手で作っていませんか？", en: "Still creating ad reports manually every week?" }, time: { ja: "1〜2週間〜", en: "1-2 weeks" }, impact: { ja: "レポート作成工数を90%削減", en: "90% reduction in report creation effort" } },
            { no: "07", cat: "代行", catEn: "Execution", dept: { ja: "経理・総務", en: "Accounting" }, title: { ja: "請求書・領収書の自動デジタル化", en: "Auto Invoice Digitization" }, detail: { ja: "紙やPDFの請求書をAIの画像認識で読み取り、仕訳データに変換して自動入力。", en: "AI reads paper/PDF invoices via image recognition and converts to journal entries." }, killer: { ja: "月末の請求書打ち込み地獄、今月で最後にしませんか？", en: "Time to end the month-end invoice entry nightmare." }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "手入力時間を70%削減", en: "70% reduction in manual entry time" } },
            { no: "08", cat: "代行", catEn: "Execution", dept: { ja: "人事・採用", en: "HR" }, title: { ja: "候補者レジュメの一括スクリーニング", en: "Bulk Resume Screening" }, detail: { ja: "大量の職務経歴書をAIが読み込み、必須スキル・経験年数で自動スコアリング。", en: "AI reads resumes in bulk and auto-scores by skills and experience." }, killer: { ja: "書類選考、人事担当者の\"感覚\"に頼っていませんか？", en: "Is your screening process still based on gut feeling?" }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "書類確認時間を60%削減", en: "60% reduction in screening time" } },
            { no: "09", cat: "導入", catEn: "Integration", dept: { ja: "全社員", en: "All Staff" }, title: { ja: "会議の自動議事録・ToDo抽出", en: "Auto Meeting Minutes & Todo Extraction" }, detail: { ja: "録音データから「決定事項」「次やること」を構造化して自動抽出。", en: "Auto-extracts decisions and action items from recordings." }, killer: { ja: "会議後の議事録づくりで1時間残業するの、今日で終わりにしませんか？", en: "End the 1-hour overtime for meeting minutes — starting today." }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "議事録作成時間 60分→ほぼ0分", en: "Minutes creation: 60min → near zero" } },
            { no: "10", cat: "導入", catEn: "Integration", dept: { ja: "全社・情シス", en: "IT/All" }, title: { ja: "社内ナレッジFAQボットの構築", en: "Internal Knowledge FAQ Bot" }, detail: { ja: "就業規則・マニュアルをAIに学習させ、社員が質問するだけで即答するボットを構築。", en: "Build a bot trained on company rules & manuals for instant employee Q&A." }, killer: { ja: "総務への『あのルールどうだっけ？』の問い合わせ、ゼロにしませんか？", en: "Eliminate 'What's the rule again?' inquiries to admin — entirely." }, time: { ja: "1〜数日〜", en: "1-3 days" }, impact: { ja: "問い合わせ対応工数を9割削減", en: "90% reduction in support inquiries" } },
            { no: "11", cat: "導入", catEn: "Integration", dept: { ja: "営業・企画", en: "Sales" }, title: { ja: "過去提案書のナレッジ統合検索", en: "Knowledge-Powered Proposal Search" }, detail: { ja: "過去の提案書・受注案件データをAIに読み込ませ、最適なナレッジを即座に引き出す。", en: "AI queries past proposals and projects for instant relevant knowledge retrieval." }, killer: { ja: "過去の最強の提案書、サーバーの肥やしになっていませんか？", en: "Are your best proposals gathering dust on a server?" }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "検索〜照合作業が数時間→数分", en: "Search & match: hours → minutes" } },
            { no: "12", cat: "代行", catEn: "Execution", dept: { ja: "営業・経営", en: "Executives" }, title: { ja: "業界レポートの音声コンテンツ化", en: "Audio Content from Industry Reports" }, detail: { ja: "100ページのレポートをAIが要約しポッドキャスト風音声コンテンツに変換して納品。", en: "AI summarizes 100-page reports and converts to podcast-style audio content." }, killer: { ja: "営業先への移動時間だけで、100ページの資料をインプットできます", en: "Absorb 100-page reports during your commute." }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "資料を「読む」時間をゼロ化", en: "Zero time spent reading documents" } },
        ],
    },
    {
        key: "lv3", color: "from-violet-500 to-violet-600",
        title: { ja: "Lv.3 — 高付加価値の導入＆開発サービス", en: "Lv.3 — High-Value Integration & Engineering" },
        sub: { ja: "数日〜数週間", en: "Days to weeks" },
        cases: [
            { no: "13", cat: "導入", catEn: "Integration", dept: { ja: "営業・教育", en: "Training" }, title: { ja: "AIロープレ・商談シミュレーション", en: "AI Sales Roleplay & Simulation" }, detail: { ja: "AIとリアルタイム音声会話でクレーム対応・値引き交渉等のロープレ環境を構築。", en: "Build roleplay environments for complaint handling, negotiations via real-time AI voice." }, killer: { ja: "トップセールスが新人のロープレに付き合う時間、ゼロにしませんか？", en: "Free your top salespeople from training new hires." }, time: { ja: "1週間〜", en: "1 week" }, impact: { ja: "トップセールスの教育拘束時間を大幅削減", en: "Major reduction in top performer training time" } },
            { no: "14", cat: "導入", catEn: "Integration", dept: { ja: "全社・分析", en: "Analytics" }, title: { ja: "AIデータ分析環境の構築", en: "AI Data Analysis Environment" }, detail: { ja: "売上・顧客データをAIが直接読み取り、自然言語で質問するだけで分析結果を返す環境を構築。", en: "Build environments where AI reads your data and answers questions in natural language." }, killer: { ja: "Excelが苦手な社員でも、明日から凄腕データアナリストになれます", en: "Even Excel-challenged staff become expert analysts overnight." }, time: { ja: "即日〜", en: "Same day" }, impact: { ja: "外部アナリストへの依頼コストをゼロ化", en: "Zero external analyst costs" } },
            { no: "15", cat: "開発", catEn: "Engineering", dept: { ja: "CS・サポート", en: "Support" }, title: { ja: "顧客向けAIチャットボット開発", en: "Customer-Facing AI Chatbot" }, detail: { ja: "自社FAQ・製品情報を学習した高精度チャットボットをWebサイトやアプリに設置。", en: "Deploy high-accuracy chatbots trained on your FAQ & product data." }, killer: { ja: "『よくある質問』への電話対応で、コア業務が止まっていませんか？", en: "Are FAQ calls blocking your core operations?" }, time: { ja: "2〜4週間〜", en: "2-4 weeks" }, impact: { ja: "問い合わせ対応を30〜50%削減", en: "30-50% reduction in support inquiries" } },
            { no: "16", cat: "開発", catEn: "Engineering", dept: { ja: "マーケ・広報", en: "Marketing" }, title: { ja: "コンテンツ記事の自動生成パイプライン", en: "Automated Content Pipeline" }, detail: { ja: "キーワードを入れるだけでSEO記事の構成案→下書き→校正まで自動化するパイプラインを開発。", en: "Build a pipeline that auto-generates SEO articles from keyword to draft to review." }, killer: { ja: "コンテンツ発信したいけれど、書く時間もライター代もないとお悩みですか？", en: "Want to publish content but have no time or budget for writers?" }, time: { ja: "2〜4週間〜", en: "2-4 weeks" }, impact: { ja: "記事作成コストを約80%削減", en: "~80% reduction in content creation costs" } },
            { no: "17", cat: "開発", catEn: "Engineering", dept: { ja: "経理・事務", en: "Accounting" }, title: { ja: "請求書→仕訳の完全自動化", en: "Fully Automated Invoice-to-Journal" }, detail: { ja: "メールで届くPDF請求書をAIが自動読み取り→仕訳変換→会計ソフト入力まで完全自動化。", en: "AI reads PDF invoices from email, converts to journal entries, and inputs to accounting software." }, killer: { ja: "毎日の単純なコピペ作業、裏側で勝手に終わっていたら最高じゃないですか？", en: "What if your daily copy-paste work just finished itself in the background?" }, time: { ja: "2〜4週間〜", en: "2-4 weeks" }, impact: { ja: "定期業務の完全自動化", en: "Full automation of routine operations" } },
        ],
    },
    {
        key: "lv4", color: "from-rose-500 to-rose-600",
        title: { ja: "Lv.4 — 自律型AI＆本格開発", en: "Lv.4 — Autonomous AI & Full Development" },
        sub: { ja: "数週間〜", en: "Weeks+" },
        cases: [
            { no: "18", cat: "開発", catEn: "Engineering", dept: { ja: "営業・CS", en: "Sales/CS" }, title: { ja: "問い合わせ→CRM→通知の完全自動化", en: "Inquiry → CRM → Notification Automation" }, detail: { ja: "フォーム送信→AIが内容・感情・緊急度を分析→CRM登録→チャット通知まで全自動。", en: "Form submission → AI analyzes content/urgency → CRM entry → chat notification, fully automated." }, killer: { ja: "お客様からの問い合わせ、初動が数分以内にできていますか？", en: "Can you respond to customer inquiries within minutes?" }, time: { ja: "2〜4週間〜", en: "2-4 weeks" }, impact: { ja: "初動リードタイムを数分に短縮", en: "Response lead time reduced to minutes" } },
            { no: "19", cat: "開発", catEn: "Engineering", dept: { ja: "マーケ・企画", en: "Marketing" }, title: { ja: "広告運用の自動最適化エンジン", en: "Automated Ad Optimization Engine" }, detail: { ja: "Google広告・Meta広告のAPIと接続し、AIが入札額・ターゲティングを日次で自動最適化。", en: "Connect to ad APIs and let AI auto-optimize bidding & targeting daily." }, killer: { ja: "広告運用、\"職人の勘\"に頼っていませんか？ AIなら24時間データを見続けます", en: "Relying on intuition for ad ops? AI monitors data 24/7." }, time: { ja: "1〜2ヶ月〜", en: "1-2 months" }, impact: { ja: "人件費50%削減＆ROAS改善", en: "50% labor cost cut & improved ROAS" } },
            { no: "20", cat: "開発", catEn: "Engineering", dept: { ja: "全社・DX推進", en: "DX/All" }, title: { ja: "ノーコード×AIの社内アプリ内製化支援", en: "No-Code × AI Internal App Development" }, detail: { ja: "AIの高度なプログラミング能力を使い、非エンジニアでも社内アプリを開発できるよう伴走支援。", en: "AI-powered support enabling non-engineers to build internal apps." }, killer: { ja: "システム会社に数百万円払う前に、AIを使えば来週には社内アプリが完成しますよ", en: "Before paying millions to an SI vendor, AI can build your app by next week." }, time: { ja: "1ヶ月〜", en: "1 month" }, impact: { ja: "SIer外注費をゼロ化", en: "Zero outsourcing costs to SI vendors" } },
        ],
    },
];

/* ── static data ── */

const CAT_COLORS: Record<string, string> = {
    "代行": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "導入": "bg-sky-500/15 text-sky-400 border-sky-500/30",
    "開発": "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

const categories = [
    { icon: Zap, label: { ja: "AI Execution — 業務代行", en: "AI Execution" }, count: "9", desc: { ja: "ProductXがAIを使って業務を代行し成果物を納品", en: "We execute tasks with AI and deliver results" }, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Settings, label: { ja: "AI Integration — 環境構築", en: "AI Integration" }, count: "5", desc: { ja: "顧客社内にAI活用環境を構築・セットアップ", en: "Build AI environments within your organization" }, color: "text-sky-400", bg: "bg-sky-500/10" },
    { icon: Code, label: { ja: "AI Engineering — 開発", en: "AI Engineering" }, count: "6", desc: { ja: "カスタムシステムやワークフローを開発・納品", en: "Develop and deliver custom systems" }, color: "text-violet-400", bg: "bg-violet-500/10" },
];

const plans = [
    { name: { ja: "梅 — スポット代行", en: "Basic — Spot Execution" }, price: { ja: "5〜30万円 / 件", en: "¥50K-300K / project" }, desc: { ja: "ProductXがAIを使って業務を代行し成果物を納品。まずは「AIの凄さ」を実感。", en: "We execute tasks with AI and deliver results. Experience the power of AI first-hand." }, color: "border-emerald-500/40", badge: "bg-emerald-500/15 text-emerald-500" },
    { name: { ja: "竹 — 導入パッケージ", en: "Standard — Integration Package" }, price: { ja: "初期20〜80万 + 月額5〜15万", en: "¥200K-800K + ¥50K-150K/mo" }, desc: { ja: "顧客社内にAI活用環境を構築。仕組み化して定着させるストック型の本命プラン。", en: "Build AI environments in-house. A subscription-based plan for lasting transformation." }, popular: true, color: "border-[var(--color-brand)]/60", badge: "bg-[var(--color-brand)]/15 text-[var(--color-brand)]" },
    { name: { ja: "松 — カスタム開発", en: "Premium — Custom Development" }, price: { ja: "100〜500万円〜", en: "¥1M-5M+" }, desc: { ja: "業務の深部に入り込むカスタムシステムやワークフローを開発。", en: "Custom systems and workflows that transform core business operations." }, color: "border-violet-500/40", badge: "bg-violet-500/15 text-violet-500" },
];

const journeySteps = [
    { icon: Lightbulb, title: { ja: "無料AI診断", en: "Free AI Diagnosis" }, desc: { ja: "5分のヒアリングで最適なAIソリューションを3つ提案。サンプル成果物も無料で納品。", en: "5-minute hearing to propose 3 optimal AI solutions with free sample deliverables." } },
    { icon: Rocket, title: { ja: "ライブデモ", en: "Live Demo" }, desc: { ja: "御社の実業務データでAIの成果物をリアルタイム生成。目の前で「衝撃」をお見せします。", en: "We generate AI outputs using your real business data in real-time." } },
    { icon: Target, title: { ja: "1ヶ月トライアル", en: "1-Month Trial" }, desc: { ja: "成果保証型のトライアル。Before/After数値レポートで費用対効果を可視化。", en: "Performance-guaranteed trial with Before/After metrics report." } },
    { icon: TrendingUp, title: { ja: "本契約＆拡大", en: "Contract & Scale" }, desc: { ja: "成功体験から月額契約へ。他部門への横展開やアップセルで効果を最大化。", en: "From success to subscription. Maximize impact with cross-department expansion." } },
    { icon: HandshakeIcon, title: { ja: "事例化＆紹介", en: "Case Study & Referral" }, desc: { ja: "導入企業のビフォーアフター事例をコンテンツ化。次の商談の最強の証拠に。", en: "Your Before/After story becomes the strongest proof for future deals." } },
];

const competitors = [
    { name: { ja: "大手SIer", en: "Large SIers" }, weakness: { ja: "高価格・長納期・オーバースペック", en: "High cost, long delivery, over-spec" }, advantage: { ja: "即日〜数週間の圧倒的スピードと中小企業向け価格帯", en: "Lightning speed (same-day to weeks) at SMB-friendly prices" } },
    { name: { ja: "フリーランスAIコンサル", en: "Freelance AI Consultants" }, weakness: { ja: "属人的・スケールしない", en: "Person-dependent, non-scalable" }, advantage: { ja: "組織力で面展開できるスケーラビリティ", en: "Scalable expansion through organizational power" } },
    { name: { ja: "SaaS (ChatGPT Team等)", en: "SaaS (ChatGPT Team etc.)" }, weakness: { ja: "セルフサービス型で活用が進まない", en: "Self-service model with low adoption" }, advantage: { ja: "代行から入る伴走型で確実に成果が出る", en: "Hands-on approach starting with execution ensures results" } },
    { name: { ja: "他のDX支援業者", en: "Other DX Firms" }, weakness: { ja: "AI専門性が低い", en: "Low AI expertise" }, advantage: { ja: "ProductXのAI技術の深さ＋実物を見せる体験設計", en: "Deep AI expertise + experience-driven demo approach" } },
];

const industries: I18n[] = [
    { ja: "🏭 製造・メーカー", en: "🏭 Manufacturing" }, { ja: "🏢 不動産", en: "🏢 Real Estate" },
    { ja: "👥 人材・HR", en: "👥 HR & Recruiting" }, { ja: "🚚 物流・サプライチェーン", en: "🚚 Logistics" },
    { ja: "🏦 金融・保険", en: "🏦 Finance & Insurance" }, { ja: "🛍️ 小売・サービス", en: "🛍️ Retail & Services" },
    { ja: "🎬 エンタメ・メディア", en: "🎬 Entertainment" }, { ja: "💼 SaaS・B2B", en: "💼 SaaS & B2B" },
];

const faqs: { q: I18n; a: I18n }[] = [
    { q: { ja: "AI DXは技術的な知識がなくても依頼できますか？", en: "Can we request AI DX services without technical knowledge?" }, a: { ja: "はい、技術的な知識は不要です。課題のヒアリングから最適なAIソリューションのご提案まで、わかりやすくご説明しながら進めます。", en: "Yes, no technical knowledge is required. We guide you through the entire process." } },
    { q: { ja: "無料のAI診断とは何ですか？", en: "What is the free AI diagnosis?" }, a: { ja: "5分程度のヒアリングで御社の業務課題を把握し、最適なAIソリューションを3つご提案します。さらに、サンプル成果物（例：アタックリスト100件）も無料でお渡しします。", en: "A 5-minute hearing to understand your challenges, propose 3 optimal solutions, and deliver a free sample (e.g., 100-item target list)." } },
    { q: { ja: "トライアル期間中に効果が出なかった場合は？", en: "What if we don't see results during the trial?" }, a: { ja: "トライアル開始前にKPIを書面で合意します。基準未達の場合は無料ですので、リスクゼロでお試しいただけます。", en: "We agree on KPIs in writing before the trial. If targets aren't met, it's free — zero risk." } },
    { q: { ja: "機密データを渡しても大丈夫ですか？", en: "Is it safe to share confidential data?" }, a: { ja: "はい、NDA（秘密保持契約）の締結が可能です。また、エンタープライズ環境ではデータがAI学習に使われないため安心です。", en: "Yes, we can sign NDAs. Enterprise environments ensure your data is never used for AI training." } },
    { q: { ja: "導入後のサポートはありますか？", en: "Is post-deployment support available?" }, a: { ja: "はい、月次数値レポートの自動送付・四半期ごとのレビュー会・新ユースケースの提案など、継続的なサポートを提供します。", en: "Yes — monthly metrics reports, quarterly reviews, and new use case proposals." } },
];

/* ── sub-components ── */

function UseCaseCard({ uc, locale, index }: { uc: UseCase; locale: Locale; index: number }) {
    return (
        <motion.details className="group rounded-xl border border-border bg-card overflow-hidden hover:border-[var(--color-brand)]/40 transition-colors"
            {...MOTION_VIEW} custom={index * 0.06 + 0.2}>
            <summary className="flex items-center gap-4 cursor-pointer px-5 py-4 select-none list-none [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-bold text-foreground/10 shrink-0 w-8">{uc.no}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${CAT_COLORS[uc.cat]}`}>
                    {locale === "ja" ? uc.cat : uc.catEn}
                </span>
                <span className="text-sm font-semibold flex-1">{l(locale, uc.title)}</span>
                <Badge variant="outline" className="text-xs shrink-0 hidden sm:inline-flex">{l(locale, uc.dept)}</Badge>
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

export default function AiDxPage() {
    const { locale } = useLang();

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <PageHero label="AI DX"
                    title={l(locale, { ja: "AI × DXで、日常業務を変革する。", en: "Transform Daily Operations with AI × DX." })}
                    description={l(locale, { ja: "中小企業のための実践型AIソリューション。代行・導入・開発の3つのアプローチで、業務効率の飛躍的改善を実現します。", en: "Practical AI solutions for SMBs. Three approaches — Execution, Integration, and Engineering — to dramatically improve efficiency." })} />

                {/* 3 Categories */}
                <section className="py-24 md:py-32 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <SectionHeader locale={locale}
                            label={{ ja: "3つのアプローチ", en: "Three Approaches" }}
                            title={{ ja: "課題に合わせた最適な支援を。", en: "The right support for your challenge." }} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {categories.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={i} className="p-8 rounded-2xl border border-border bg-card hover:border-[var(--color-brand)]/40 transition-all"
                                        {...MOTION_VIEW} custom={i + 1} whileHover={{ y: -4 }}>
                                        <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5`}>
                                            <Icon size={22} className={item.color} />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{l(locale, item.label)}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{l(locale, item.desc)}</p>
                                        <Badge variant="secondary" className="text-xs">{item.count} {locale === "ja" ? "件のユースケース" : "use cases"}</Badge>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <GradientDivider />

                {/* Service Catalog */}
                <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <SectionHeader locale={locale}
                            label={{ ja: "サービスカタログ", en: "Service Catalog" }}
                            title={{ ja: "20のユースケースで、あらゆる業務課題を解決。", en: "20 use cases to solve every business challenge." }} />
                        <motion.p className="text-muted-foreground mb-12 max-w-2xl -mt-8"
                            {...MOTION_VIEW} custom={1}>
                            {l(locale, { ja: "レベル別に整理されたサービスカタログ。クリックして詳細をご覧ください。", en: "Our service catalog organized by level. Click to expand details." })}
                        </motion.p>

                        <div className="space-y-12">
                            {levels.map((lv) => (
                                <div key={lv.key}>
                                    <motion.div className="flex items-center gap-3 mb-4" {...MOTION_VIEW} custom={0}>
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
                    </div>
                </section>

                <GradientDivider />

                {/* Pricing */}
                <section className="py-24 md:py-32 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <SectionHeader locale={locale}
                            label={{ ja: "料金体系", en: "Pricing" }}
                            title={{ ja: "課題と予算に合わせた3つのプラン。", en: "Three plans for every budget and challenge." }} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {plans.map((plan, i) => (
                                <motion.div key={i}
                                    className={`relative p-8 rounded-2xl border-2 bg-card ${plan.color} ${plan.popular ? "ring-2 ring-[var(--color-brand)]/30" : ""}`}
                                    {...MOTION_VIEW} custom={i + 1} whileHover={{ y: -4 }}>
                                    {plan.popular && (
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-brand)] text-white text-xs font-bold tracking-wide">
                                            {locale === "ja" ? "おすすめ" : "Recommended"}
                                        </span>
                                    )}
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${plan.badge}`}>{l(locale, plan.name)}</span>
                                    <p className="text-2xl font-bold mb-3">{l(locale, plan.price)}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{l(locale, plan.desc)}</p>
                                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                        {locale === "ja" ? "お問い合わせ" : "Contact Us"} <ArrowRight size={16} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <motion.p className="text-center text-sm text-muted-foreground mt-8" {...MOTION_VIEW} custom={4}>
                            {l(locale, { ja: "梅で「AIの凄さ」を実感 → 竹で仕組み化・定着 → 松で業務の深部に入り込む", en: "Start with Basic to experience AI → Standard to systematize → Premium to transform core operations" })}
                        </motion.p>
                    </div>
                </section>

                <GradientDivider />

                {/* Journey */}
                <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <SectionHeader locale={locale}
                            label={{ ja: "導入の流れ", en: "How It Works" }}
                            title={{ ja: "まずは無料体験から。", en: "Start with a free experience." }} />
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {journeySteps.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <motion.div key={i} className="relative p-6 rounded-xl border border-border bg-card text-center"
                                        {...MOTION_VIEW} custom={i + 1}>
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
                    </div>
                </section>

                <GradientDivider />

                {/* Differentiation */}
                <section className="py-24 md:py-32 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <SectionHeader locale={locale}
                            label={{ ja: "なぜProductXか", en: "Why ProductX" }}
                            title={{ ja: "他社との違い。", en: "What sets us apart." }} />
                        <div className="overflow-x-auto">
                            <motion.table className="w-full min-w-[600px] text-sm" {...MOTION_VIEW} custom={1}>
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{locale === "ja" ? "競合" : "Competitor"}</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{locale === "ja" ? "弱点" : "Weakness"}</th>
                                        <th className="text-left py-3 px-4 font-semibold text-[var(--color-brand)]">{locale === "ja" ? "ProductXの優位性" : "ProductX Advantage"}</th>
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
                    </div>
                </section>

                <GradientDivider />

                {/* Industries */}
                <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <SectionHeader locale={locale}
                            label={{ ja: "対応業界", en: "Industries" }}
                            title={{ ja: "幅広い業界に対応。", en: "Supporting diverse industries." }} />
                        <div className="flex flex-wrap gap-3 -mt-4">
                            {industries.map((item, i) => (
                                <motion.span key={i} className="px-5 py-3 rounded-full border border-border bg-card text-sm font-medium hover:border-[var(--color-brand)]/30 transition-colors"
                                    {...MOTION_VIEW} custom={i * 0.08 + 0.3}>{l(locale, item)}</motion.span>
                            ))}
                        </div>
                    </div>
                </section>

                <GradientDivider />

                {/* FAQ */}
                <section className="py-24 md:py-32 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <SectionHeader locale={locale}
                            label={{ ja: "FAQ", en: "FAQ" }}
                            title={{ ja: "よくあるご質問", en: "Frequently Asked Questions" }} />
                        <div className="space-y-4 max-w-3xl">
                            {faqs.map((item, i) => (
                                <motion.details key={i} className="group rounded-xl border border-border bg-card overflow-hidden"
                                    {...MOTION_VIEW} custom={i * 0.08 + 0.3}>
                                    <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-sm font-semibold select-none list-none [&::-webkit-details-marker]:hidden">
                                        <span>{l(locale, item.q)}</span>
                                        <span className="ml-4 shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground group-open:rotate-45 transition-transform duration-300">+</span>
                                    </summary>
                                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-[1.9]">{l(locale, item.a)}</div>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </section>

                <GradientDivider />

                {/* CTA */}
                <section className="py-24 md:py-32 bg-background">
                    <div className="mx-auto max-w-[800px] px-6 text-center">
                        <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" {...MOTION_VIEW} custom={0}>
                            {l(locale, { ja: "まずは無料AI診断から。", en: "Start with a free AI diagnosis." })}
                        </motion.h2>
                        <motion.p className="text-muted-foreground mb-8" {...MOTION_VIEW} custom={0.5}>
                            {l(locale, { ja: "5分のヒアリングで最適なAIソリューションをご提案。サンプル成果物も無料でお渡しします。", en: "A 5-minute hearing to propose optimal AI solutions. Free sample deliverables included." })}
                        </motion.p>
                        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...MOTION_VIEW} custom={1}>
                            <Link href="/contact" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold hover:bg-[var(--color-brand)] transition-all shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative z-10 flex items-center gap-2">{locale === "ja" ? "無料AI診断を申し込む" : "Request Free AI Diagnosis"} <ArrowRight size={18} /></span>
                            </Link>
                            <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
                                {locale === "ja" ? "AI DXの記事を読む" : "Read AI DX Articles"} <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
