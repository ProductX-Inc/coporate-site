"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Lock, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/components/lang-provider";

type ModalState = "idle" | "success" | "error" | "locked";

const DECK_PASSWORD = "productx2026";
const MAX_ATTEMPTS = 5;

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
    const { locale } = useLang();
    const ja = locale === "ja";
    const [state, setState] = useState<ModalState>("idle");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [attempts, setAttempts] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setState("idle");
            setPassword("");
            setErrorMessage("");
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || state === "locked") return;

        if (password !== DECK_PASSWORD) {
            const next = attempts + 1;
            setAttempts(next);
            if (next >= MAX_ATTEMPTS) {
                setState("locked");
                setErrorMessage(ja ? "しばらく時間をおいてお試しください" : "Please try again later");
            } else {
                setState("error");
                setErrorMessage(ja ? "パスワードが正しくありません" : "Incorrect password");
                setTimeout(() => setState("idle"), 600);
            }
            return;
        }

        // Success — redirect to export mode
        setState("success");
        window.location.href = "/resources/company-deck?export=true";
    };

    const remaining = MAX_ATTEMPTS - attempts;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <X size={16} />
                        </button>

                        {state === "success" ? (
                            <motion.div
                                className="flex flex-col items-center py-6"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                                    <CheckCircle size={32} className="text-green-500" />
                                </div>
                                <p className="text-lg font-bold">
                                    {ja ? "ダウンロードを開始しました" : "Download started"}
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center">
                                        {state === "locked" ? (
                                            <Lock size={18} className="text-destructive" />
                                        ) : (
                                            <Download size={18} className="text-[var(--color-brand)]" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold">
                                            {ja ? "資料ダウンロード" : "Download Resources"}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            {ja ? "パスワードを入力してください" : "Enter your password"}
                                        </p>
                                    </div>
                                </div>

                                {/* Input with shake animation on error */}
                                <motion.div
                                    animate={state === "error" ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                >
                                    <input
                                        ref={inputRef}
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (state === "error") setState("idle");
                                        }}
                                        disabled={state === "locked"}
                                        placeholder={ja ? "パスワード" : "Password"}
                                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-300 bg-background outline-none ${state === "error"
                                            ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                                            : state === "locked"
                                                ? "border-border bg-muted cursor-not-allowed"
                                                : "border-border focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20"
                                            }`}
                                    />
                                </motion.div>

                                {/* Error message */}
                                {(state === "error" || state === "locked") && errorMessage && (
                                    <motion.div
                                        className="flex items-center gap-2 mt-3"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <AlertTriangle size={14} className="text-destructive shrink-0" />
                                        <p className="text-xs text-destructive">{errorMessage}</p>
                                        {state === "error" && remaining > 0 && (
                                            <span className="text-xs text-muted-foreground ml-auto">
                                                {ja ? `残り${remaining}回` : `${remaining} left`}
                                            </span>
                                        )}
                                    </motion.div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={!password || state === "locked"}
                                    className={`w-full mt-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${!password || state === "locked"
                                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                                        : "bg-[var(--color-brand-active)] hover:bg-[var(--color-brand)] text-white shadow-md hover:shadow-[0_8px_30px_rgba(105,108,255,0.35)]"
                                        }`}
                                >
                                    <Download size={16} />
                                    {ja ? "ダウンロード" : "Download"}
                                </button>

                                {/* Help text */}
                                <div className="mt-6 pt-4 border-t border-border">
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {ja
                                            ? "パスワードは担当者よりお伝えしております。"
                                            : "Your password was provided by your representative."}
                                    </p>
                                    <p className="text-xs mt-2">
                                        <Link
                                            href="/contact?ref=resource-dl"
                                            className="text-[var(--color-brand)] hover:underline"
                                            onClick={onClose}
                                        >
                                            {ja ? "パスワードをお持ちでない方はお問い合わせください →" : "Don't have a password? Contact us →"}
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
