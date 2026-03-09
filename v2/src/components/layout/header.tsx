"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/lang-provider";

const navItems = [
    { href: "/about", key: "nav.about" },
    {
        href: "/services", key: "nav.services",
        children: [
            { href: "/services", labelJa: "サービス概要", labelEn: "Overview" },
            { href: "/services/partner-growth", labelJa: "Partner Growth", labelEn: "Partner Growth" },
            { href: "/services/ai-dx", labelJa: "AI DX", labelEn: "AI DX" },
        ],
    },
    { href: "/articles", key: "nav.articles" },
    { href: "/news", key: "nav.news" },
];

export function Header() {
    const pathname = usePathname();
    const { setTheme, resolvedTheme } = useTheme();
    const { t, toggleLocale, locale } = useLang();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);


    const isHeroPage = pathname === "/";
    const useWhiteText = !scrolled;

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[60] px-4 pt-4 pointer-events-none">
                <div
                    className={`mx-auto max-w-[1280px] px-6 h-[60px] flex items-center justify-between rounded-2xl pointer-events-auto transition-all duration-500 ${scrolled
                        ? "bg-background/60 dark:bg-card/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10"
                        : isHeroPage
                            ? "bg-white/5 backdrop-blur-md border border-white/10"
                            : "bg-background/40 backdrop-blur-xl border border-border/50"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="relative z-[60] transition-transform duration-300"
                        style={{ transform: scrolled ? "scale(0.85)" : "scale(1)" }}>
                        <Image
                            src="/images/logo.png"
                            alt="ProductX"
                            width={130}
                            height={32}
                            priority
                            className={
                                useWhiteText && !mobileOpen
                                    ? "brightness-0 invert"
                                    : "dark:brightness-0 dark:invert"
                            }
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-7" aria-label="メインナビゲーション">
                        {navItems.map((item) => {
                            const navLinkCls = `text-sm font-medium transition-colors relative ${useWhiteText ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"}`;
                            const underline = <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-active)] transition-all duration-300 group-hover:w-full group-hover/dropdown:w-full rounded-full" />;

                            if ("children" in item && item.children) {
                                return (
                                    <div key={item.href} className="relative group/dropdown">
                                        <Link href={item.href} className={navLinkCls}>{t(item.key)}{underline}</Link>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto transition-all duration-200">
                                            <div className="min-w-[180px] rounded-xl border border-border bg-background/90 dark:bg-card/90 backdrop-blur-2xl shadow-xl p-1.5">
                                                {item.children.map((child) => (
                                                    <Link key={child.href} href={child.href}
                                                        className="block px-4 py-2.5 text-sm font-medium rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors">
                                                        {locale === "ja" ? child.labelJa : child.labelEn}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <Link key={item.href} href={item.href} className={`${navLinkCls} group`}>{t(item.key)}{underline}</Link>
                            );
                        })}
                        <Link href="/contact">
                            <Button size="sm" className="rounded-full bg-[var(--color-brand-active)] hover:bg-[var(--color-brand)] text-white shadow-md hover:shadow-[0_8px_30px_rgba(105,108,255,0.35),0_0_40px_rgba(254,198,101,0.12)] hover:-translate-y-0.5 transition-all duration-300">
                                {t("nav.contact")}
                            </Button>
                        </Link>
                    </nav>

                    <div className="flex items-center gap-1">
                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${useWhiteText && !mobileOpen
                                    ? "text-white/70 hover:text-white hover:bg-white/10"
                                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                                    }`}
                                aria-label="テーマ切り替え"
                            >
                                {resolvedTheme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                            </button>
                        )}

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLocale}
                            className={`h-8 px-2.5 rounded-xl text-xs font-bold tracking-wider transition-all border ${useWhiteText && !mobileOpen
                                ? "text-white/80 hover:text-white border-white/15 hover:border-white/30 hover:bg-white/10"
                                : "text-foreground/70 hover:text-foreground border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5"
                                }`}
                            aria-label="言語切り替え"
                        >
                            {t("common.lang.toggle")}
                        </button>

                        {/* Mobile Hamburger / Close */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all relative z-[60] ${useWhiteText && !mobileOpen
                                ? "text-white/70 hover:text-white hover:bg-white/10"
                                : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                                }`}
                            aria-label="メニュー"
                        >
                            <AnimatePresence mode="wait">
                                {mobileOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={20} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-[5px]"
                                    >
                                        <span className="block w-[18px] h-[2px] bg-current rounded-full" />
                                        <span className="block w-[14px] h-[2px] bg-current rounded-full" />
                                        <span className="block w-[18px] h-[2px] bg-current rounded-full" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </header>

            {/* ══ Full-screen Mobile Menu Overlay ══ */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-[55] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-background/95 dark:bg-[var(--color-brand-dark)]/98 backdrop-blur-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Menu Content */}
                        <div className="relative h-full flex flex-col items-center justify-center px-8">
                            <nav className="flex flex-col items-center gap-2 w-full max-w-[320px]">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.href}
                                        className="w-full"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`block text-center py-4 text-2xl font-semibold tracking-tight transition-colors ${pathname === item.href
                                                ? "text-[var(--color-brand-active)] dark:text-[var(--color-brand)]"
                                                : "text-foreground/70 hover:text-foreground"
                                                }`}
                                        >
                                            {t(item.key)}
                                            {pathname === item.href && (
                                                <motion.div
                                                    className="mx-auto mt-1.5 h-[2px] w-8 rounded-full bg-gradient-to-r from-[var(--color-brand-active)] to-[var(--color-brand-gold)]"
                                                    layoutId="mobile-nav-indicator"
                                                />
                                            )}
                                        </Link>
                                        {"children" in item && item.children && (
                                            <div className="flex flex-col items-center gap-1 mt-1 mb-2">
                                                {item.children.filter(c => c.href !== item.href).map((child) => (
                                                    <Link key={child.href} href={child.href}
                                                        onClick={() => setMobileOpen(false)}
                                                        className={`text-sm font-medium transition-colors ${pathname === child.href
                                                            ? "text-[var(--color-brand)]"
                                                            : "text-foreground/40 hover:text-foreground/70"
                                                            }`}>
                                                        {locale === "ja" ? child.labelJa : child.labelEn}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Contact CTA */}
                                <motion.div
                                    className="w-full mt-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: navItems.length * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                                        <Button className="w-full h-14 rounded-2xl bg-[var(--color-brand-active)] hover:bg-[var(--color-brand)] text-white text-base font-semibold shadow-lg shadow-[var(--color-brand-active)]/20">
                                            {t("nav.contact")}
                                        </Button>
                                    </Link>
                                </motion.div>
                            </nav>

                            {/* Bottom info */}
                            <motion.div
                                className="absolute bottom-10 left-0 right-0 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <p className="text-xs text-muted-foreground/50">© ProductX Inc.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
