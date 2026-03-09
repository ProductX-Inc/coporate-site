"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-provider";

export function Footer() {
    const { t } = useLang();
    return (
        <footer className="py-10 px-4" role="contentinfo">
            <div className="mx-auto max-w-[1280px] rounded-2xl border border-border/50 dark:border-white/10 bg-muted/50 dark:bg-white/5 backdrop-blur-xl px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <Link href="/" className="text-foreground dark:text-white font-bold text-lg tracking-tight">
                        ProductX
                    </Link>
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="フッターナビゲーション">
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
                                className="text-muted-foreground hover:text-foreground dark:text-white/50 dark:hover:text-white/80 text-sm transition-colors"
                            >
                                {"key" in item && item.key ? t(item.key) : item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4 text-muted-foreground/70 dark:text-white/40 text-xs">
                        <Link href="/privacy" className="hover:text-foreground dark:hover:text-white/60 transition-colors">{t("footer.privacy")}</Link>
                        <Link href="/terms" className="hover:text-foreground dark:hover:text-white/60 transition-colors">{t("footer.terms")}</Link>
                    </div>
                </div>
                <div className="mt-6 pt-5 border-t border-border/30 dark:border-white/5">
                    <p className="text-muted-foreground/50 dark:text-white/30 text-xs text-center">
                        {t("footer.copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
