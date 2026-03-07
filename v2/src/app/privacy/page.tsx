"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { useLang } from "@/components/lang-provider";

const sections = [
    { id: "collection", title: { ja: "個人情報の収集", en: "Collection of Personal Information" }, content: { ja: "当社は、サービスの提供にあたり、以下の個人情報を収集することがあります。\n\n・氏名、会社名\n・メールアドレス、電話番号\n・その他お問い合わせ内容に含まれる情報", en: "We may collect the following personal information in the course of providing our services.\n\n・Name, company name\n・Email address, phone number\n・Other information included in inquiries" } },
    { id: "use", title: { ja: "個人情報の利用目的", en: "Purpose of Use" }, content: { ja: "収集した個人情報は、以下の目的で利用いたします。\n\n・お問い合わせへの対応\n・サービスの提供・改善\n・新サービスや更新情報のご案内（同意いただいた場合のみ）", en: "We use the collected personal information for the following purposes.\n\n・Responding to inquiries\n・Providing and improving our services\n・Sending information about new services and updates (only with consent)" } },
    { id: "provision", title: { ja: "第三者への提供", en: "Disclosure to Third Parties" }, content: { ja: "当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。", en: "We will not disclose personal information to third parties without consent, except as required by law." } },
    { id: "management", title: { ja: "個人情報の管理", en: "Management of Personal Information" }, content: { ja: "当社は、個人情報の漏洩、滅失、き損の防止その他の安全管理のために必要かつ適切な措置を講じます。", en: "We take necessary and appropriate measures to prevent leakage, loss, and damage of personal information." } },
    { id: "disclosure", title: { ja: "個人情報の開示・訂正・削除", en: "Disclosure, Correction, and Deletion" }, content: { ja: "ご本人から個人情報の開示、訂正、削除等のご請求があった場合、所定の手続きにより速やかに対応いたします。", en: "When a request for disclosure, correction, or deletion of personal information is received, we will promptly respond through prescribed procedures." } },
    { id: "changes", title: { ja: "プライバシーポリシーの変更", en: "Changes to This Privacy Policy" }, content: { ja: "当社は、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは、当サイトに掲載した時点で効力を生じるものとします。", en: "We may update this policy as necessary. The revised policy shall take effect upon publication on this website." } },
];

export default function PrivacyPage() {
    const { t, locale } = useLang();
    return (
        <>
            <Header />
            <main>
                <PageHero label={t("privacy.label")} title={t("privacy.title")} />

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

