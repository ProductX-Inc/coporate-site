"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, FileText, Users, Settings, Mail, Newspaper, Shield, Scale } from "lucide-react";
import { useLang } from "@/components/lang-provider";

interface CommandItem {
    id: string;
    label: string;
    labelEn: string;
    href: string;
    icon: React.ReactNode;
    keywords: string[];
}

const commandItems: CommandItem[] = [
    { id: "home", label: "ホーム", labelEn: "Home", href: "/", icon: <Search size={16} />, keywords: ["home", "top", "トップ", "ホーム"] },
    { id: "about", label: "会社概要", labelEn: "About", href: "/about", icon: <Users size={16} />, keywords: ["about", "会社", "概要", "company"] },
    { id: "services", label: "サービス", labelEn: "Services", href: "/services", icon: <Settings size={16} />, keywords: ["services", "サービス", "事業"] },
    { id: "news", label: "ニュース", labelEn: "News", href: "/news", icon: <Newspaper size={16} />, keywords: ["news", "ニュース", "お知らせ"] },
    { id: "contact", label: "お問い合わせ", labelEn: "Contact", href: "/contact", icon: <Mail size={16} />, keywords: ["contact", "お問い合わせ", "連絡"] },
    { id: "privacy", label: "プライバシーポリシー", labelEn: "Privacy Policy", href: "/privacy", icon: <Shield size={16} />, keywords: ["privacy", "プライバシー"] },
    { id: "terms", label: "利用規約", labelEn: "Terms", href: "/terms", icon: <Scale size={16} />, keywords: ["terms", "利用規約", "規約"] },
];

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { locale } = useLang();

    const filtered = commandItems.filter((item) => {
        if (!query) return true;
        const q = query.toLowerCase();
        const label = locale === "ja" ? item.label : item.labelEn;
        return (
            label.toLowerCase().includes(q) ||
            item.keywords.some((k) => k.toLowerCase().includes(q))
        );
    });

    const toggle = useCallback(() => {
        setOpen((prev) => {
            if (!prev) {
                setQuery("");
                setSelectedIndex(0);
            }
            return !prev;
        });
    }, []);

    // Keyboard shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                toggle();
            }
            if (e.key === "Escape" && open) {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, toggle]);

    // Focus input when opened
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    // Reset selected index on filter change
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const navigate = (href: string) => {
        setOpen(false);
        router.push(href);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((i) => (i + 1) % filtered.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
        } else if (e.key === "Enter" && filtered[selectedIndex]) {
            navigate(filtered[selectedIndex].href);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />

                    {/* Dialog */}
                    <motion.div
                        className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh]"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <div className="w-full max-w-[520px] mx-4 rounded-2xl border border-border/50 dark:border-white/10 bg-background/95 dark:bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
                            {/* Search input */}
                            <div className="flex items-center gap-3 px-4 border-b border-border/30 dark:border-white/5">
                                <Search size={18} className="text-muted-foreground shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={locale === "ja" ? "ページを検索..." : "Search pages..."}
                                    className="flex-1 h-12 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                />
                                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border border-border/50 dark:border-white/10 bg-muted/50 text-[10px] font-mono text-muted-foreground">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-[300px] overflow-y-auto p-2">
                                {filtered.length === 0 ? (
                                    <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                                        {locale === "ja" ? "結果が見つかりません" : "No results found"}
                                    </p>
                                ) : (
                                    filtered.map((item, i) => (
                                        <button
                                            key={item.id}
                                            onClick={() => navigate(item.href)}
                                            onMouseEnter={() => setSelectedIndex(i)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${i === selectedIndex
                                                    ? "bg-[var(--color-brand-active)]/10 text-[var(--color-brand-active)] dark:text-[var(--color-brand)]"
                                                    : "text-foreground/80 hover:bg-muted/50"
                                                }`}
                                        >
                                            <span className="shrink-0 opacity-60">{item.icon}</span>
                                            <span className="flex-1 text-left font-medium">
                                                {locale === "ja" ? item.label : item.labelEn}
                                            </span>
                                            <ArrowRight size={14} className="opacity-30" />
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Footer hint */}
                            <div className="px-4 py-2 border-t border-border/30 dark:border-white/5 flex items-center gap-4 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1 py-0.5 rounded border border-border/50 dark:border-white/10 bg-muted/50 font-mono">↑↓</kbd>
                                    {locale === "ja" ? "移動" : "Navigate"}
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1 py-0.5 rounded border border-border/50 dark:border-white/10 bg-muted/50 font-mono">↵</kbd>
                                    {locale === "ja" ? "選択" : "Select"}
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1 py-0.5 rounded border border-border/50 dark:border-white/10 bg-muted/50 font-mono">esc</kbd>
                                    {locale === "ja" ? "閉じる" : "Close"}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
