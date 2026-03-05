"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { useLang } from "@/components/lang-provider";

const sections = [
    { id: "application", title: "適用範囲", content: "本利用規約（以下「本規約」）は、株式会社ProductX（以下「当社」）が提供するすべてのサービス（以下「本サービス」）の利用に関する条件を定めるものです。" },
    { id: "agreement", title: "規約への同意", content: "利用者は、本サービスを利用することにより、本規約に同意したものとみなされます。本規約に同意いただけない場合は、本サービスの利用をお控えください。" },
    { id: "prohibited", title: "禁止事項", content: "利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。\n\n・法令または公序良俗に違反する行為\n・犯罪行為に関連する行為\n・当社のサーバーやネットワークの機能を破壊・妨害する行為\n・当社のサービスの運営を妨害するおそれのある行為\n・他の利用者に関する個人情報等を収集・蓄積する行為\n・不正アクセスをし、またはこれを試みる行為\n・他の利用者に成りすます行為\n・反社会的勢力に対する利益供与その他の協力行為\n・その他、当社が不適切と判断する行為" },
    { id: "suspension", title: "サービスの停止", content: "当社は、以下のいずれかに該当する場合には、利用者に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができます。\n\n・本サービスに係るコンピュータシステムの保守点検を行う場合\n・地震、落雷、火災等の不可抗力により本サービスの提供が困難となった場合\n・その他、当社が本サービスの提供が困難と判断した場合" },
    { id: "disclaimer", title: "免責事項", content: "当社は、本サービスに事実上または法律上の瑕疵がないことを明示的にも黙示的にも保証しておりません。当社は、本サービスによって利用者に生じたあらゆる損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。" },
    { id: "changes", title: "利用規約の変更", content: "当社は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、当社ウェブサイトに掲載した時点で効力を生じるものとします。" },
    { id: "law", title: "準拠法・裁判管轄", content: "本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。" },
];

export default function TermsPage() {
    const { t } = useLang();
    return (
        <>
            <Header />
            <main>
                <PageHero label={t("terms.label")} title={t("terms.title")} />

                <section className="py-16 md:py-24 bg-background">
                    <div className="mx-auto max-w-[1280px] px-6 flex gap-12">
                        {/* TOC — Desktop */}
                        <nav className="hidden lg:block w-[200px] shrink-0 sticky top-28 self-start" aria-label="目次">
                            <p className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-4">目次</p>
                            <ul className="space-y-2">
                                {sections.map((s) => (
                                    <li key={s.id}>
                                        <a href={`#${s.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                            {s.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Content */}
                        <div className="flex-1 max-w-[768px]">
                            {sections.map((s, i) => (
                                <motion.div
                                    key={s.id}
                                    id={s.id}
                                    className="mb-12 scroll-mt-28"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                >
                                    <h2 className="text-lg font-bold mb-4">{s.title}</h2>
                                    {s.content.split("\n\n").map((p, j) => (
                                        <p key={j} className="text-sm text-foreground/80 leading-[1.9] mb-4">{p}</p>
                                    ))}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
