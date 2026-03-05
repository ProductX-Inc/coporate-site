"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "cookie-consent";

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(STORAGE_KEY);
        if (!consent) {
            // Show after a short delay for better UX
            const timer = setTimeout(() => setVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem(STORAGE_KEY, "accepted");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[400px] z-50 rounded-2xl border border-border/50 dark:border-white/10 bg-background/95 dark:bg-card/95 backdrop-blur-2xl shadow-2xl p-5"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[var(--color-brand-active)]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Cookie size={18} className="text-[var(--color-brand-active)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground mb-1">Cookieの使用について</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                当サイトでは、より快適なブラウジング体験のためにCookieを使用しています。
                                サイトの利用を続けることで、Cookieの使用に同意したものとみなされます。
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                                <button
                                    onClick={accept}
                                    className="px-4 py-1.5 rounded-full bg-[var(--color-brand-active)] text-white text-xs font-semibold hover:bg-[var(--color-brand)] transition-colors"
                                >
                                    同意する
                                </button>
                                <a
                                    href="/privacy"
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    詳細
                                </a>
                            </div>
                        </div>
                        <button
                            onClick={accept}
                            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            aria-label="閉じる"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
