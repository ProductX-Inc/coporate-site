"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ArrowRight, Bot, User } from "lucide-react";
import { useLang, type Locale } from "@/components/lang-provider";

/* ── i18n ── */

type I18n = { ja: string; en: string };
const l = (locale: Locale, v: I18n) => v[locale];

/* ── knowledge base ── */

const KB: { kw: string[]; a: I18n; link?: { href: string; label: I18n } }[] = [
    { kw: ["料金", "費用", "価格", "いくら", "cost", "price", "pricing", "how much"], a: { ja: "料金体系はプロジェクトに合わせて3タイプご用意しています。\n\n・スポット: 50〜300万円/件\n・月額: 80〜200万円/月\n・固定: 300〜2,000万円〜\n\n具体的な費用感は、開発費用シミュレーターで即座に概算できます！", en: "We offer 3 pricing types:\n\n• Spot: ¥500K-3M/project\n• Monthly: ¥800K-2M/month\n• Fixed: ¥3M-20M+\n\nGet a quick estimate with our Cost Estimator!" }, link: { href: "/tools/estimate", label: { ja: "費用シミュレーターを使う →", en: "Try Cost Estimator →" } } },
    { kw: ["ai", "dx", "自動化", "効率化", "人工知能", "automation", "chatbot", "チャット"], a: { ja: "AI DXサービスでは、生成AI・業務自動化・データ分析など、お客様の業務に最適なAIソリューションを提供しています。\n\n導入効果は業種や規模によって大きく異なりますので、まずはシミュレーターで効果を可視化してみませんか？", en: "Our AI DX service provides optimal AI solutions including generative AI, workflow automation, and data analysis.\n\nImpact varies by industry and scale - try our simulator to visualize the potential!" }, link: { href: "/tools/ai-simulator", label: { ja: "AI効果シミュレーターを使う →", en: "Try AI Impact Simulator →" } } },
    { kw: ["開発", "アプリ", "web", "モバイル", "サイト", "development", "app", "mobile", "website", "system"], a: { ja: "Partner Growthサービスでは、新規サービス開発からUI/UX刷新、システムコンサルティングまで一気通貫で支援しています。\n\nトップ企業で経験を積んだクリエイター集団が、企画→設計→開発→グロースまで伴走します。", en: "Our Partner Growth service provides end-to-end support from new service development to UI/UX modernization and system consulting.\n\nOur team of elite creators supports you from planning to growth." }, link: { href: "/services/partner-growth", label: { ja: "Partner Growth詳細を見る →", en: "View Partner Growth Details →" } } },
    { kw: ["実績", "事例", "ケース", "case", "portfolio", "example", "results"], a: { ja: "AI DX・Partner Growth共に多数の導入実績があります！\n\n・製造業の請求書処理 → 83%削減\n・不動産営業リスト作成 → 94%削減\n・ECサイトCVR → 133%向上\n\n詳しくは導入事例ページをご覧ください。", en: "We have numerous success stories:\n\n• Manufacturing invoices → 83% reduction\n• Real estate sales lists → 94% reduction\n• E-commerce CVR → 133% increase\n\nSee our Case Studies page for details!" }, link: { href: "/case-studies", label: { ja: "導入事例を見る →", en: "View Case Studies →" } } },
    { kw: ["会社", "概要", "company", "about", "どんな", "who"], a: { ja: "ProductXは、AI DXとプロダクト開発の両軸でビジネスの変革を支援するテック企業です。\n\nトップ企業出身のクリエイター集団が、お客様のビジネスの成長を加速させます。", en: "ProductX is a tech company supporting business transformation through AI DX and product development.\n\nOur team of creators from top companies accelerates your business growth." }, link: { href: "/about", label: { ja: "会社概要を見る →", en: "View About Us →" } } },
    { kw: ["nda", "セキュリティ", "security", "契約", "contract", "秘密"], a: { ja: "はい、プロジェクト開始前にNDA（秘密保持契約）の締結が可能です。情報管理には万全の体制を整えております。\n\nまた、リモート・対面いずれでも対応可能です。", en: "Yes, we can sign NDAs before project commencement. We maintain strict information security.\n\nWe support both remote and in-person collaboration." } },
    { kw: ["期間", "納期", "どれくらい", "timeline", "how long", "duration", "いつ"], a: { ja: "案件の規模に応じて柔軟に対応しています。\n\n・スポット支援: 1〜4週間\n・新規開発: 1〜6ヶ月\n・UI/UX刷新: 2週間〜3ヶ月\n\nまずは無料ヒアリングでスケジュール感をご提案させてください。", en: "We offer flexible timelines:\n\n• Spot support: 1-4 weeks\n• New development: 1-6 months\n• UI/UX modernization: 2 weeks - 3 months\n\nLet us propose a schedule during a free consultation." }, link: { href: "/contact", label: { ja: "無料ヒアリングを申し込む →", en: "Request Free Consultation →" } } },
];

const FALLBACK: I18n = { ja: "ご質問ありがとうございます。申し訳ありませんが、そのご質問に的確にお答えする情報がありません。\n\nより詳しいご相談については、直接お問い合わせいただけますと幸いです。", en: "Thank you for your question. I'm sorry, I don't have specific information to answer that.\n\nFor more detailed inquiries, please don't hesitate to contact us directly." };

function answer(input: string, locale: Locale) {
    const q = input.toLowerCase();
    const hit = KB.find(e => e.kw.some(k => q.includes(k)));
    return hit
        ? { text: l(locale, hit.a), link: hit.link ? { href: hit.link.href, label: l(locale, hit.link.label) } : undefined }
        : { text: l(locale, FALLBACK), link: { href: "/contact", label: l(locale, { ja: "お問い合わせはこちら →", en: "Contact Us →" }) } };
}

const QUICK = [
    { emoji: "💰", label: { ja: "費用を知りたい", en: "Know the costs" }, q: "費用" },
    { emoji: "🤖", label: { ja: "AI導入について", en: "About AI adoption" }, q: "AI DX" },
    { emoji: "📋", label: { ja: "導入事例を見たい", en: "View case studies" }, q: "実績" },
];

/* ── types ── */

interface Msg { id: string; role: "bot" | "user"; text: string; link?: { href: string; label: string } }

/* ── component ── */

export function AiChatbot() {
    const { locale } = useLang();
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Init greeting
    useEffect(() => {
        setMsgs([{ id: "g", role: "bot", text: l(locale, { ja: "こんにちは！ProductXへようこそ 👋\n\nAI DX・プロダクト開発について、何でもお気軽にご質問ください。", en: "Hello! Welcome to ProductX 👋\n\nFeel free to ask anything about AI DX or product development." }) }]);
    }, [locale]);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
    useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, []);

    const send = useCallback((text: string) => {
        if (!text.trim()) return;
        setMsgs(p => [...p, { id: `u${Date.now()}`, role: "user", text: text.trim() }]);
        setInput("");
        setTyping(true);
        setTimeout(() => {
            const r = answer(text, locale);
            setMsgs(p => [...p, { id: `b${Date.now()}`, role: "bot", text: r.text, link: r.link }]);
            setTyping(false);
        }, 600 + Math.random() * 400);
    }, [locale]);

    const avatarCls = "w-7 h-7 rounded-full flex items-center justify-center shrink-0";
    const botAvatarCls = `${avatarCls} bg-gradient-to-br from-[var(--color-brand-active)] to-[var(--color-brand)]`;

    return (
        <>
            {/* Toggle Button */}
            <AnimatePresence>
                {!open && (
                    <motion.button onClick={() => setOpen(true)}
                        className="fixed bottom-6 right-6 z-[50] w-14 h-14 rounded-full bg-[var(--color-brand-active)] text-white shadow-lg shadow-[var(--color-brand-active)]/30 flex items-center justify-center hover:bg-[var(--color-brand)] transition-colors"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", damping: 15 }} whileHover={{ scale: 1.1 }} aria-label="AI Assistant">
                        <MessageSquare size={22} />
                        <span className="absolute inset-0 rounded-full bg-[var(--color-brand-active)] animate-ping opacity-20" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div className="fixed bottom-6 right-6 z-[50] w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-6rem)] rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }} role="dialog" aria-label="AI Assistant Chat">

                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50">
                            <div className={botAvatarCls}><Bot size={16} className="text-white" /></div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">ProductX AI</p>
                                <p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />Online</p>
                            </div>
                            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Close chat">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                            {msgs.map(m => (
                                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                                        <div className={m.role === "bot" ? botAvatarCls : `${avatarCls} bg-secondary`}>
                                            {m.role === "bot" ? <Bot size={13} className="text-white" /> : <User size={13} className="text-muted-foreground" />}
                                        </div>
                                        <div className={`p-3 rounded-xl text-[13px] leading-relaxed ${m.role === "bot" ? "bg-card border border-border text-foreground" : "bg-[var(--color-brand-active)] text-white"}`}>
                                            <p className="whitespace-pre-wrap">{m.text}</p>
                                            {m.link && (
                                                <Link href={m.link.href} onClick={() => setOpen(false)} className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[var(--color-brand)] hover:underline">
                                                    {m.link.label} <ArrowRight size={12} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {msgs.length === 1 && (
                                <div className="flex flex-wrap gap-2">
                                    {QUICK.map(qa => (
                                        <button key={qa.q} onClick={() => send(qa.q)}
                                            className="px-3 py-2 rounded-full border border-border bg-card text-xs font-medium hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-brand)]/5 transition-all">
                                            {qa.emoji} {l(locale, qa.label)}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {typing && (
                                <div className="flex gap-2">
                                    <div className={botAvatarCls}><Bot size={13} className="text-white" /></div>
                                    <div className="p-3 rounded-xl bg-card border border-border">
                                        <div className="flex gap-1">
                                            {[0, 150, 300].map(d => <span key={d} className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 py-3 border-t border-border bg-card/50">
                            <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
                                <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                                    placeholder={l(locale, { ja: "質問を入力...", en: "Type your question..." })}
                                    className="flex-1 h-10 px-4 rounded-full bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-[var(--color-brand)]/50 transition-colors"
                                    disabled={typing} />
                                <button type="submit" disabled={!input.trim() || typing}
                                    className="w-10 h-10 rounded-full bg-[var(--color-brand-active)] text-white flex items-center justify-center hover:bg-[var(--color-brand)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Send">
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
