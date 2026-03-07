"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { useLang } from "@/components/lang-provider";

const sections = [
    { id: "application", title: { ja: "適用範囲", en: "Scope of Application" }, content: { ja: "本利用規約（以下「本規約」）は、株式会社ProductX（以下「当社」）が提供するすべてのサービス（以下「本サービス」）の利用に関する条件を定めるものです。", en: "These Terms of Service (hereinafter \"Terms\") set forth the conditions for use of all services (hereinafter \"Services\") provided by ProductX Inc. (hereinafter \"Company\")." } },
    { id: "agreement", title: { ja: "規約への同意", en: "Agreement to Terms" }, content: { ja: "利用者は、本サービスを利用することにより、本規約に同意したものとみなされます。本規約に同意いただけない場合は、本サービスの利用をお控えください。", en: "By using the Services, users are deemed to have agreed to these Terms. If you do not agree to these Terms, please refrain from using the Services." } },
    { id: "prohibited", title: { ja: "禁止事項", en: "Prohibited Activities" }, content: { ja: "利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。\n\n・法令または公序良俗に違反する行為\n・犯罪行為に関連する行為\n・当社のサーバーやネットワークの機能を破壊・妨害する行為\n・当社のサービスの運営を妨害するおそれのある行為\n・他の利用者に関する個人情報等を収集・蓄積する行為\n・不正アクセスをし、またはこれを試みる行為\n・他の利用者に成りすます行為\n・反社会的勢力に対する利益供与その他の協力行為\n・その他、当社が不適切と判断する行為", en: "Users shall not engage in the following activities when using the Services.\n\n・Acts that violate laws or public order and morals\n・Acts related to criminal activity\n・Acts that destroy or interfere with the Company's servers or network functions\n・Acts that may interfere with the operation of the Services\n・Acts of collecting or storing personal information of other users\n・Unauthorized access or attempts thereof\n・Impersonating other users\n・Providing benefits or cooperation to antisocial forces\n・Any other acts deemed inappropriate by the Company" } },
    { id: "suspension", title: { ja: "サービスの停止", en: "Service Suspension" }, content: { ja: "当社は、以下のいずれかに該当する場合には、利用者に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができます。\n\n・本サービスに係るコンピュータシステムの保守点検を行う場合\n・地震、落雷、火災等の不可抗力により本サービスの提供が困難となった場合\n・その他、当社が本サービスの提供が困難と判断した場合", en: "The Company may suspend or interrupt all or part of the Services without prior notice to users in the following cases.\n\n・Maintenance or inspection of computer systems related to the Services\n・When provision of the Services becomes difficult due to force majeure such as earthquakes, lightning, or fire\n・When the Company determines that provision of the Services is otherwise difficult" } },
    { id: "disclaimer", title: { ja: "免責事項", en: "Disclaimer" }, content: { ja: "当社は、本サービスに事実上または法律上の瑕疵がないことを明示的にも黙示的にも保証しておりません。当社は、本サービスによって利用者に生じたあらゆる損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。", en: "The Company does not warrant, expressly or implicitly, that the Services are free from factual or legal defects. The Company shall not be liable for any damages incurred by users through the Services, except in cases of intentional misconduct or gross negligence." } },
    { id: "changes", title: { ja: "利用規約の変更", en: "Changes to Terms" }, content: { ja: "当社は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、当社ウェブサイトに掲載した時点で効力を生じるものとします。", en: "The Company may change these Terms at any time without notice to users when deemed necessary. The revised Terms shall take effect upon publication on the Company's website." } },
    { id: "law", title: { ja: "準拠法・裁判管轄", en: "Governing Law & Jurisdiction" }, content: { ja: "本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。", en: "These Terms shall be governed by and construed in accordance with the laws of Japan. The Tokyo District Court shall have exclusive jurisdiction as the court of first instance for any disputes arising in connection with the Services." } },
];

export default function TermsPage() {
    const { t, locale } = useLang();
    return (
        <>
            <Header />
            <main>
                <PageHero label={t("terms.label")} title={t("terms.title")} />

                <section className="py-16 md:py-24 bg-background">
                    <div className="mx-auto max-w-[1280px] px-6 flex gap-12">
                        {/* TOC — Desktop */}
                        <nav className="hidden lg:block w-[200px] shrink-0 sticky top-28 self-start" aria-label={locale === "ja" ? "目次" : "Table of Contents"}>
                            <p className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-4">{t("legal.toc")}</p>
                            <ul className="space-y-2">
                                {sections.map((s) => (
                                    <li key={s.id}>
                                        <a href={`#${s.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                            {locale === "ja" ? s.title.ja : s.title.en}
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
                                    <h2 className="text-lg font-bold mb-4">{locale === "ja" ? s.title.ja : s.title.en}</h2>
                                    {(locale === "ja" ? s.content.ja : s.content.en).split("\n\n").map((p, j) => (
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

