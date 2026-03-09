"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuroraMesh } from "@/components/sections/aurora-mesh";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";



export function InviteSection() {
    const { t } = useLang();
    return (
        <section className="relative overflow-hidden bg-[var(--color-brand-dark)]">
            <AuroraMesh />

            {/* CTA Content */}
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-32 md:py-44">
                <motion.h2
                    className="text-white font-bold leading-[1.1] tracking-tight whitespace-pre-line"
                    style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={0}
                    variants={fadeUp}
                >
                    {t("invite.title")}
                </motion.h2>

                <motion.p
                    className="mt-6 text-white/60 text-lg"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={0.5}
                    variants={fadeUp}
                >
                    {t("invite.sub")}
                </motion.p>

                <motion.div
                    className="mt-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={1}
                    variants={fadeUp}
                >
                    <Link href="/contact">
                        <MagneticButton className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold text-base hover:bg-[var(--color-brand)] transition-colors duration-300 shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)]">
                            {t("invite.cta")} <ArrowRight size={18} />
                        </MagneticButton>
                    </Link>
                </motion.div>
            </div>

            {/* Footer — same dark bg continues */}
            <footer className="relative z-10 px-4 pb-10" role="contentinfo">
                <div className="mx-auto max-w-[1280px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <Link href="/" className="text-white font-bold text-lg tracking-tight">
                            ProductX
                        </Link>

                        <nav className="flex items-center gap-6" aria-label="フッターナビゲーション">
                            {[
                                { href: "/about", key: "nav.about" },
                                { href: "/services", key: "nav.services" },
                                { href: "/resources", label: "Resources" },
                                { href: "/news", key: "nav.news" },
                                { href: "/partner", key: "nav.partner" },
                                { href: "/contact", key: "nav.contact" },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-white/50 hover:text-white/80 text-sm transition-colors"
                                >
                                    {"key" in item && item.key ? t(item.key) : item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4 text-white/40 text-xs">
                            <Link href="/privacy" className="hover:text-white/60 transition-colors">
                                {t("footer.privacy")}
                            </Link>
                            <Link href="/terms" className="hover:text-white/60 transition-colors">
                                {t("footer.terms")}
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/5">
                        <p className="text-white/30 text-xs text-center">
                            {t("invite.copyright")}
                        </p>
                    </div>
                </div>
            </footer>
        </section>
    );
}
