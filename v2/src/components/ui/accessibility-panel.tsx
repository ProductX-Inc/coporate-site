"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, Plus, Minus, RotateCcw, Contrast } from "lucide-react";

const FONT_SIZES = [14, 16, 18, 20] as const;
const STORAGE_KEY = "a11y-settings";

interface A11ySettings {
    fontSize: number;
    highContrast: boolean;
}

const defaults: A11ySettings = { fontSize: 16, highContrast: false };

export function AccessibilityPanel() {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState<A11ySettings>(defaults);

    // Load saved settings
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as A11ySettings;
                setSettings(parsed);
                applySettings(parsed);
            }
        } catch { /* ignore */ }
    }, []);

    const applySettings = useCallback((s: A11ySettings) => {
        document.documentElement.style.fontSize = `${s.fontSize}px`;
        document.documentElement.classList.toggle("high-contrast", s.highContrast);
    }, []);

    const update = useCallback((partial: Partial<A11ySettings>) => {
        setSettings((prev) => {
            const next = { ...prev, ...partial };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            applySettings(next);
            return next;
        });
    }, [applySettings]);

    const increaseFontSize = () => {
        const idx = FONT_SIZES.indexOf(settings.fontSize as typeof FONT_SIZES[number]);
        if (idx < FONT_SIZES.length - 1) update({ fontSize: FONT_SIZES[idx + 1] });
    };

    const decreaseFontSize = () => {
        const idx = FONT_SIZES.indexOf(settings.fontSize as typeof FONT_SIZES[number]);
        if (idx > 0) update({ fontSize: FONT_SIZES[idx - 1] });
    };

    const reset = () => {
        update(defaults);
    };

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setOpen((p) => !p)}
                className="fixed bottom-24 left-4 z-50 w-10 h-10 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-xl border border-border/50 dark:border-white/10 shadow-lg flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                aria-label="アクセシビリティ設定"
            >
                <Accessibility size={18} />
            </button>

            {/* Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-36 left-4 z-50 w-56 rounded-2xl border border-border/50 dark:border-white/10 bg-background/95 dark:bg-card/95 backdrop-blur-2xl shadow-2xl p-4"
                    >
                        <p className="text-xs font-semibold text-foreground mb-3">アクセシビリティ</p>

                        {/* Font size */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-muted-foreground">文字サイズ</span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={decreaseFontSize}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground/60 hover:bg-muted/50 transition-colors"
                                    aria-label="文字を小さく"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="text-xs font-mono w-8 text-center text-foreground">{settings.fontSize}</span>
                                <button
                                    onClick={increaseFontSize}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground/60 hover:bg-muted/50 transition-colors"
                                    aria-label="文字を大きく"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        {/* High contrast */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-muted-foreground">高コントラスト</span>
                            <button
                                onClick={() => update({ highContrast: !settings.highContrast })}
                                className={`w-9 h-5 rounded-full transition-colors relative ${settings.highContrast ? "bg-[var(--color-brand-active)]" : "bg-muted"}`}
                                aria-label="高コントラスト切替"
                            >
                                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.highContrast ? "left-[18px]" : "left-0.5"}`} />
                            </button>
                        </div>

                        {/* Reset */}
                        <button
                            onClick={reset}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                            <RotateCcw size={12} /> リセット
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
