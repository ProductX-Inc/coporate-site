"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";



const faqItems = [
    {
        q: { ja: "開発だけでなく、企画・戦略から相談できますか？", en: "Can we consult on strategy and planning, not just development?" },
        a: { ja: "もちろんです。ProductXの強みは上流のプロダクト戦略から実装・グロースまで一気通貫で支援できることです。「何を作るべきか」の段階からご相談いただけます。", en: "Absolutely. ProductX's strength lies in end-to-end support from upstream product strategy to implementation and growth. You can consult with us from the 'what to build' stage." },
    },
    {
        q: { ja: "AI DXは技術的な知識がなくても依頼できますか？", en: "Can we request AI DX services without technical knowledge?" },
        a: { ja: "はい、技術的な知識は不要です。課題のヒアリングから最適なAIソリューションのご提案まで、わかりやすくご説明しながら進めます。「AIで何ができるか分からない」という段階でもお気軽にご相談ください。", en: "Yes, no technical knowledge is required. We guide you through the entire process, from understanding your challenges to proposing optimal AI solutions. Feel free to reach out even if you're unsure what AI can do for you." },
    },
    {
        q: { ja: "リモートでの対応は可能ですか？", en: "Do you support remote work?" },
        a: { ja: "はい、フルリモートでの対応が可能です。オンラインミーティングやチャットツールを活用し、場所を問わずスムーズなコミュニケーションを実現します。必要に応じて対面でのミーティングも対応いたします。", en: "Yes, we fully support remote collaboration. We leverage online meetings and chat tools for seamless communication regardless of location. In-person meetings are also available when needed." },
    },
];

export function FaqSection() {
    const { locale } = useLang();

    return (
        <section className="py-24 md:py-32 bg-background bg-dot-pattern">
            <div className="mx-auto max-w-[1280px] px-6">
                <motion.p
                    className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    custom={0} variants={fadeUp}
                >
                    FAQ
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)] ml-2 align-middle" />
                </motion.p>
                <motion.h2
                    className="text-2xl md:text-4xl font-bold tracking-tight mb-12"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    custom={0.5} variants={fadeUp}
                >
                    {locale === "ja" ? "よくあるご質問" : "Frequently Asked Questions"}
                </motion.h2>

                <div className="space-y-4 max-w-[900px]">
                    {faqItems.map((item, i) => (
                        <motion.details
                            key={i}
                            className="group rounded-xl border border-border bg-card overflow-hidden"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={i * 0.08 + 0.3} variants={fadeUp}
                        >
                            <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-sm font-semibold select-none list-none [&::-webkit-details-marker]:hidden">
                                <span>{locale === "ja" ? item.q.ja : item.q.en}</span>
                                <span className="ml-4 shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground group-open:text-[var(--color-brand-gold)] group-open:border-[var(--color-brand-gold)]/50 group-open:rotate-45 transition-all duration-300">
                                    +
                                </span>
                            </summary>
                            <div className="px-6 pb-5 text-sm text-muted-foreground leading-[1.9]">
                                {locale === "ja" ? item.a.ja : item.a.en}
                            </div>
                        </motion.details>
                    ))}
                </div>

                <motion.div
                    className="mt-8"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    custom={1} variants={fadeUp}
                >
                    <Link
                        href="/services#faq"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand-active)] dark:text-[var(--color-brand)] hover:underline underline-offset-4"
                    >
                        {locale === "ja" ? "すべてのFAQを見る" : "View All FAQs"} <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
