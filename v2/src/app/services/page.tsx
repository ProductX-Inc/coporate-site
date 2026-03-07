"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { ArrowRight, Award, Layers, BookOpen, Zap, Settings, Code } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";



export default function ServicesPage() {
    const { t, locale } = useLang();

    const services = [
        {
            id: "partner-growth",
            label: "Client Work",
            title: "Partner Growth",
            desc: t("services.pg.desc"),
            features: [
                { num: "01", title: t("services.pg.f1.title"), desc: t("services.pg.f1.desc"), icon: Award },
                { num: "02", title: t("services.pg.f2.title"), desc: t("services.pg.f2.desc"), icon: Layers },
                { num: "03", title: t("services.pg.f3.title"), desc: t("services.pg.f3.desc"), icon: BookOpen },
            ],
            offerings: t("services.pg.offerings").split(","),
            gradient: "from-[var(--color-brand-active)] to-[var(--color-brand)]",
            textColor: "text-white",
        },
        {
            id: "ai-dx",
            label: "Consulting",
            title: "AI DX",
            desc: t("services.ai.desc"),
            features: [
                { num: "01", title: t("services.ai.f1.title"), desc: t("services.ai.f1.desc"), icon: Zap },
                { num: "02", title: t("services.ai.f2.title"), desc: t("services.ai.f2.desc"), icon: Settings },
                { num: "03", title: t("services.ai.f3.title"), desc: t("services.ai.f3.desc"), icon: Code },
            ],
            offerings: t("services.ai.offerings").split(","),
            gradient: "from-[oklch(0.25_0.03_270)] to-[oklch(0.18_0.04_280)]",
            textColor: "text-white",
        },
        {
            id: "original-product",
            label: "In-House",
            title: "Original Product",
            desc: t("services.op.desc"),
            features: [],
            offerings: [],
            gradient: "",
            textColor: "",
        },
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label={t("services.label")}
                    title={t("services.title")}
                    description={t("services.desc")}
                />

                {/* Service Pillars */}
                {services.map((service, si) => (
                    <div key={service.id}>
                        <section className="py-24 md:py-32 bg-background bg-dot-pattern" id={service.id}>
                            <div className="mx-auto max-w-[1280px] px-6">
                                {/* Service Header Card */}
                                <motion.div
                                    className={`relative p-8 md:p-12 rounded-2xl overflow-hidden mb-12 ${service.gradient
                                        ? `bg-gradient-to-br ${service.gradient} ${service.textColor}`
                                        : "border border-border bg-card"
                                        }`}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    custom={0} variants={fadeUp}
                                >
                                    {service.gradient && (
                                        <div className="absolute top-0 left-[-80%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg]" />
                                    )}
                                    <div className="relative z-10">
                                        <p className={`text-xs tracking-[0.12em] uppercase mb-3 ${service.gradient ? "text-white/60" : "text-muted-foreground"
                                            }`}>
                                            {service.label}
                                        </p>
                                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                            {service.title}
                                        </h2>
                                        <p className={`leading-relaxed max-w-2xl ${service.gradient ? "text-white/80" : "text-muted-foreground"
                                            }`}>
                                            {service.desc}
                                        </p>
                                        {service.id === "original-product" && (
                                            <Badge className="mt-6 bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] hover:bg-[var(--color-brand-gold)]/90 font-bold text-sm px-4 py-1.5 tracking-wide">
                                                Coming Soon
                                            </Badge>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Features */}
                                {service.features.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                        {service.features.map((f, i) => {
                                            const Icon = f.icon;
                                            return (
                                                <motion.div
                                                    key={f.num}
                                                    className="relative p-8 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 transition-all duration-400 overflow-hidden"
                                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                                    custom={i + 1} variants={fadeUp}
                                                    whileHover={{ y: -4 }}
                                                >
                                                    <span className="text-[56px] font-bold text-foreground/5 absolute top-4 right-4 leading-none select-none">{f.num}</span>
                                                    {Icon && (
                                                        <div className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center mb-4">
                                                            <Icon size={20} className="text-[var(--color-brand-active)] dark:text-[var(--color-brand)]" />
                                                        </div>
                                                    )}
                                                    <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Offerings Badges */}
                                {service.offerings.length > 0 && (
                                    <motion.div
                                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                                        custom={4} variants={fadeUp}
                                    >
                                        <h3 className="text-sm font-medium text-muted-foreground mb-4 tracking-[0.08em] uppercase">{t("services.scope")}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {service.offerings.map((o) => (
                                                <Badge key={o} variant="secondary" className="text-sm py-1.5 px-4">{o}</Badge>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Partner Growth — 開発実績 */}
                                {service.id === "partner-growth" && (
                                    <motion.div
                                        className="mt-16"
                                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                                        custom={5} variants={fadeUp}
                                    >
                                        <h3 className="text-sm font-medium text-muted-foreground mb-6 tracking-[0.08em] uppercase">
                                            {locale === "ja" ? "開発実績" : "Development Track Record"}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {[
                                                { ja: "ライブストリーミング配信", en: "Live Streaming" },
                                                { ja: "タイムラインなどのコミュニケーション機能", en: "Timeline & Communication Features" },
                                                { ja: "投げ銭機能", en: "Digital Tipping System" },
                                                { ja: "動画のアップロード・再生", en: "Video Upload & Playback" },
                                                { ja: "プッシュ通知機能", en: "Push Notification System" },
                                                { ja: "ビデオ通話・音声機能", en: "Video & Voice Call Features" },
                                                { ja: "Shopifyを活用したECサービス", en: "E-commerce with Shopify" },
                                                { ja: "クレジットカードを用いた決済システム", en: "Credit Card Payment System" },
                                                { ja: "IAPを用いた決済システム", en: "In-App Purchase System" },
                                                { ja: "toB向けのCRM", en: "B2B CRM Platform" },
                                                { ja: "ポイントシステムの導入", en: "Points & Rewards System" },
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={item.ja}
                                                    className="flex items-center gap-3 px-5 py-4 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/30 transition-all duration-300"
                                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                                    custom={i * 0.05 + 0.3} variants={fadeUp}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] shrink-0" />
                                                    <span className="text-sm font-medium">{locale === "ja" ? item.ja : item.en}</span>
                                                </motion.div>
                                            ))}
                                            <motion.div
                                                className="flex items-center justify-center px-5 py-4 rounded-xl border border-dashed border-border/60 text-muted-foreground"
                                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                                custom={3} variants={fadeUp}
                                            >
                                                <span className="text-sm italic tracking-wide">{locale === "ja" ? "その他多数" : "and more..."}</span>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Partner Growth — 対応業界 */}
                                {service.id === "partner-growth" && (
                                    <motion.div
                                        className="mt-12"
                                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                                        custom={6} variants={fadeUp}
                                    >
                                        <h3 className="text-sm font-medium text-muted-foreground mb-6 tracking-[0.08em] uppercase">
                                            {locale === "ja" ? "対応業界" : "Industries"}
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                { ja: "🎬 エンタメ・メディア", en: "🎬 Entertainment & Media" },
                                                { ja: "🛒 EC・リテール", en: "🛒 E-Commerce & Retail" },
                                                { ja: "💼 SaaS・B2B", en: "💼 SaaS & B2B" },
                                                { ja: "🏥 ヘルスケア", en: "🏥 Healthcare" },
                                                { ja: "💳 FinTech", en: "💳 FinTech" },
                                                { ja: "🎓 教育・EdTech", en: "🎓 Education & EdTech" },
                                            ].map((item) => (
                                                <span
                                                    key={item.ja}
                                                    className="px-4 py-2.5 rounded-full border border-border bg-card text-sm font-medium hover:border-[var(--color-brand)]/30 transition-colors"
                                                >
                                                    {locale === "ja" ? item.ja : item.en}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* AI DX — 対応業界 */}
                                {service.id === "ai-dx" && (
                                    <motion.div
                                        className="mt-12"
                                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                                        custom={5} variants={fadeUp}
                                    >
                                        <h3 className="text-sm font-medium text-muted-foreground mb-6 tracking-[0.08em] uppercase">
                                            {locale === "ja" ? "対応業界" : "Industries"}
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                { ja: "🏭 製造・メーカー", en: "🏭 Manufacturing" },
                                                { ja: "🏢 不動産", en: "🏢 Real Estate" },
                                                { ja: "👥 人材・HR", en: "👥 HR & Recruiting" },
                                                { ja: "🚚 物流・サプライチェーン", en: "🚚 Logistics & Supply Chain" },
                                                { ja: "🏦 金融・保険", en: "🏦 Finance & Insurance" },
                                                { ja: "🛍️ 小売・サービス", en: "🛍️ Retail & Services" },
                                            ].map((item) => (
                                                <span
                                                    key={item.ja}
                                                    className="px-4 py-2.5 rounded-full border border-border bg-card text-sm font-medium hover:border-[var(--color-brand)]/30 transition-colors"
                                                >
                                                    {locale === "ja" ? item.ja : item.en}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </section>
                        {si < services.length - 1 && <GradientDivider />}
                    </div>
                ))}

                <GradientDivider />

                {/* FAQ */}
                <section id="faq" className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <motion.p
                            className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0} variants={fadeUp}
                        >
                            FAQ
                        </motion.p>
                        <motion.h2
                            className="text-2xl md:text-4xl font-bold tracking-tight mb-12"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0.5} variants={fadeUp}
                        >
                            {locale === "ja" ? "よくあるご質問" : "Frequently Asked Questions"}
                        </motion.h2>

                        <div className="space-y-4">
                            {[
                                {
                                    q: { ja: "最低契約期間はありますか？", en: "Is there a minimum contract period?" },
                                    a: { ja: "案件の規模や内容に応じて柔軟に対応しております。最短1ヶ月のスポット支援から、中長期のパートナーシップまで幅広く承ります。まずはお気軽にご相談ください。", en: "We offer flexible engagement terms based on project scope. From short-term 1-month engagements to long-term partnerships, we accommodate various needs. Please feel free to consult with us." },
                                },
                                {
                                    q: { ja: "リモートでの対応は可能ですか？", en: "Do you support remote work?" },
                                    a: { ja: "はい、フルリモートでの対応が可能です。オンラインミーティングやチャットツールを活用し、場所を問わずスムーズなコミュニケーションを実現します。必要に応じて対面でのミーティングも対応いたします。", en: "Yes, we fully support remote collaboration. We leverage online meetings and chat tools for seamless communication regardless of location. In-person meetings are also available when needed." },
                                },
                                {
                                    q: { ja: "開発だけでなく、企画・戦略から相談できますか？", en: "Can we consult on strategy and planning, not just development?" },
                                    a: { ja: "もちろんです。ProductXの強みは上流のプロダクト戦略から実装・グロースまで一気通貫で支援できることです。「何を作るべきか」の段階からご相談いただけます。", en: "Absolutely. ProductX's strength lies in end-to-end support from upstream product strategy to implementation and growth. You can consult with us from the 'what to build' stage." },
                                },
                                {
                                    q: { ja: "AI DXは技術的な知識がなくても依頼できますか？", en: "Can we request AI DX services without technical knowledge?" },
                                    a: { ja: "はい、技術的な知識は不要です。課題のヒアリングから最適なAIソリューションのご提案まで、わかりやすくご説明しながら進めます。「AIで何ができるか分からない」という段階でもお気軽にご相談ください。", en: "Yes, no technical knowledge is required. We guide you through the entire process, from understanding your challenges to proposing optimal AI solutions. Feel free to reach out even if you're unsure what AI can do for you." },
                                },
                                {
                                    q: { ja: "料金体系を教えてください。", en: "What is your pricing structure?" },
                                    a: { ja: "プロジェクトの規模・内容に応じたお見積もりを作成いたします。準委任契約（月額）と請負契約（固定）の両方に対応しております。詳細はお問い合わせください。", en: "We provide custom estimates based on project scope and requirements. We support both time-and-materials (monthly) and fixed-price contracts. Please contact us for details." },
                                },
                                {
                                    q: { ja: "NDAの締結は可能ですか？", en: "Can we sign an NDA?" },
                                    a: { ja: "はい、プロジェクト開始前にNDA（秘密保持契約）の締結が可能です。情報管理には万全の体制を整えております。", en: "Yes, we can sign an NDA (Non-Disclosure Agreement) before project commencement. We maintain strict information security measures." },
                                },
                            ].map((item, i) => (
                                <motion.details
                                    key={i}
                                    className="group rounded-xl border border-border bg-card overflow-hidden"
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    custom={i * 0.08 + 0.3} variants={fadeUp}
                                >
                                    <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-sm font-semibold select-none list-none [&::-webkit-details-marker]:hidden">
                                        <span>{locale === "ja" ? item.q.ja : item.q.en}</span>
                                        <span className="ml-4 shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground group-open:rotate-45 transition-transform duration-300">
                                            +
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-[1.9]">
                                        {locale === "ja" ? item.a.ja : item.a.en}
                                    </div>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </section>

                <GradientDivider />

                {/* CTA */}
                <section className="py-24 md:py-32 bg-background">
                    <div className="mx-auto max-w-[800px] px-6 text-center">
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0} variants={fadeUp}
                        >
                            {t("services.cta")}
                        </motion.h2>
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={1} variants={fadeUp}
                        >
                            <Link href="/contact" className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold hover:bg-[var(--color-brand)] transition-all shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <span className="relative z-10 flex items-center gap-2">{t("services.cta.btn")} <ArrowRight size={18} /></span>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
