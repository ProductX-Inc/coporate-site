"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";
import { User, Diamond, Handshake, Compass, Eye, TrendingUp } from "lucide-react";



const techStack = [
    { name: "TypeScript", color: "#3178C6" },
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#888888" },
    { name: "Node.js", color: "#339933" },
    { name: "Python", color: "#3776AB" },
    { name: "Go", color: "#00ADD8" },
    { name: "Swift", color: "#F05138" },
    { name: "Kotlin", color: "#7F52FF" },
];

export default function AboutPage() {
    const { t, locale } = useLang();

    const values = [
        { en: "Extreme Quality", title: t("about.value1.title"), desc: t("about.value1.desc"), icon: Diamond },
        { en: "Co-Creation", title: t("about.value2.title"), desc: t("about.value2.desc"), icon: Handshake },
        { en: "Courage to Challenge", title: t("about.value3.title"), desc: t("about.value3.desc"), icon: Compass },
        { en: "Honest Transparency", title: t("about.value4.title"), desc: t("about.value4.desc"), icon: Eye },
        { en: "Continuous Evolution", title: t("about.value5.title"), desc: t("about.value5.desc"), icon: TrendingUp },
    ];

    const companyInfo = [
        [t("about.company.name.label"), t("about.company.name.value")],
        [t("about.company.ceo.label"), t("about.company.ceo.value")],
        [t("about.company.founded.label"), t("about.company.founded.value")],
        [t("about.company.location.label"), t("about.company.location.value")],
        [t("about.company.business.label"), t("about.company.business.value")],
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label={t("about.label")}
                    title={t("about.title")}
                    description={t("about.desc")}
                />

                {/* 1. CEO Message — 冒頭で代表の想いを伝え読者を引き込む */}
                <section className="py-24 md:py-32 bg-background">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <motion.p
                            className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-10"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0} variants={fadeUp}
                        >
                            {t("about.ceo.label")}
                        </motion.p>

                        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
                            {/* Avatar + Info */}
                            <motion.div
                                className="flex flex-col items-center md:items-start shrink-0"
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                custom={0.5} variants={fadeUp}
                            >
                                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[var(--color-brand-active)] to-[var(--color-brand)] flex items-center justify-center shadow-lg shadow-[var(--color-brand)]/20 mb-5">
                                    <User size={48} className="text-white/90" strokeWidth={1.5} />
                                </div>
                                <p className="font-bold text-lg tracking-tight">{t("about.ceo.name")}</p>
                                <p className="text-sm text-muted-foreground mt-1">{t("about.ceo.role")}</p>
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                className="flex-1"
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                custom={1} variants={fadeUp}
                            >
                                <div className="relative">
                                    <span className="absolute -top-8 -left-2 text-[80px] font-serif leading-none text-[var(--color-brand)]/15 select-none pointer-events-none">&ldquo;</span>
                                    <div className="space-y-5 relative z-10">
                                        {t("about.ceo.message").split("\n\n").map((paragraph, i) => (
                                            <p key={i} className="text-sm text-foreground/80 leading-[2] first:text-base first:font-medium first:text-foreground">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <GradientDivider />

                {/* 2. Mission — 個人の想い → 会社のビジョンへ自然に接続 */}
                <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <motion.p
                            className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0} variants={fadeUp}
                        >
                            {t("about.mission.label")}
                        </motion.p>
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold tracking-tight leading-[1.3] mb-8 whitespace-pre-line"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0.5} variants={fadeUp}
                            style={{
                                background: "linear-gradient(135deg, var(--color-brand-active) 0%, var(--color-brand) 50%, oklch(0.7 0.15 85) 100%)",
                                backgroundSize: "200% 200%",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent",
                                animation: "gradient-shift 6s ease-in-out infinite",
                            }}
                        >
                            {t("about.mission.title")}
                        </motion.h2>
                        <motion.p
                            className="text-muted-foreground leading-[1.9] text-base max-w-[800px]"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={1} variants={fadeUp}
                        >
                            {t("about.mission.body")}
                        </motion.p>
                    </div>
                </section>

                <GradientDivider />

                {/* 3. Values — ビジョンを実現する行動指針 */}
                <section className="py-24 md:py-32 bg-background bg-dot-pattern">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <motion.p
                            className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0} variants={fadeUp}
                        >
                            {t("about.values.label")}
                        </motion.p>
                        <motion.h2
                            className="text-2xl md:text-4xl font-bold tracking-tight mb-12"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0.5} variants={fadeUp}
                        >
                            {locale === "ja" ? "私たちが大切にする5つの価値" : "Five Core Values We Live By"}
                        </motion.h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((v, i) => {
                                const Icon = v.icon;
                                return (
                                    <motion.div
                                        key={v.en}
                                        className="group relative p-7 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 hover:shadow-[0_0_30px_rgba(105,108,255,0.08)] transition-all duration-400"
                                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                                        custom={i + 1} variants={fadeUp}
                                        whileHover={{ y: -4 }}
                                    >
                                        <span className="text-[48px] font-bold text-foreground/5 absolute top-3 right-4 leading-none select-none">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center mb-4">
                                            <Icon size={20} className="text-[var(--color-brand-active)] dark:text-[var(--color-brand)]" />
                                        </div>
                                        <p className="text-xs text-[var(--color-brand-active)] dark:text-[var(--color-brand)] tracking-[0.1em] uppercase mb-1">{v.en}</p>
                                        <h3 className="text-base font-bold mb-3">{v.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <GradientDivider />

                {/* 4. Tech Stack — 具体的な技術力の裏付け */}
                <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <motion.p
                            className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0} variants={fadeUp}
                        >
                            {t("about.tech.label")}
                        </motion.p>
                        <motion.h2
                            className="text-2xl md:text-4xl font-bold tracking-tight mb-12"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0.5} variants={fadeUp}
                        >
                            {locale === "ja" ? "最先端の技術で、最高のプロダクトを" : "Cutting-edge tech for world-class products"}
                        </motion.h2>

                        <div className="flex flex-wrap gap-4 items-center">
                            {techStack.map((tech, i) => (
                                <motion.div
                                    key={tech.name}
                                    className="group flex items-center gap-3 px-5 py-4 rounded-xl border border-border bg-card hover:border-[var(--color-brand)]/40 hover:shadow-[0_0_20px_rgba(105,108,255,0.06)] transition-all duration-300"
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    custom={i * 0.08 + 0.3} variants={fadeUp}
                                    whileHover={{ y: -3, scale: 1.03 }}
                                >
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0"
                                        style={{ backgroundColor: tech.color }}
                                    >
                                        {tech.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                        {tech.name}
                                    </span>
                                </motion.div>
                            ))}
                            {/* etc. */}
                            <motion.div
                                className="flex items-center px-5 py-4 rounded-xl border border-dashed border-border text-muted-foreground"
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                custom={1.2} variants={fadeUp}
                            >
                                <span className="text-sm font-medium">and more...</span>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <GradientDivider />

                {/* 5. Company — 基本情報で締め */}
                <section className="py-24 md:py-32 bg-background">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <motion.p
                            className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-6"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0} variants={fadeUp}
                        >
                            {t("about.company.label")}
                        </motion.p>
                        <motion.h2
                            className="text-2xl md:text-4xl font-bold tracking-tight mb-12"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={0.5} variants={fadeUp}
                        >
                            {locale === "ja" ? "会社概要" : "Company Overview"}
                        </motion.h2>

                        <motion.div
                            className="border border-border rounded-xl overflow-hidden max-w-[800px]"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={1} variants={fadeUp}
                        >
                            <table className="w-full">
                                <tbody>
                                    {companyInfo.map(([label, value], i) => (
                                        <tr key={label} className={i < companyInfo.length - 1 ? "border-b border-border" : ""}>
                                            <th className="text-left text-sm font-medium text-muted-foreground py-4 px-6 bg-secondary/50 dark:bg-muted/30 w-[160px] whitespace-nowrap">{label}</th>
                                            <td className="text-sm py-4 px-6">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
