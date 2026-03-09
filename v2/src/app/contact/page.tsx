"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";

// ── GAS WebApp URL（デプロイ後に差し替え） ──────────────────
const GAS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz-syMRu_TztsT1jwBTMM_dZNi9gJF8CH0j-2n1OuICxormuJqgXzO2Zrgt6-k7heOu7g/exec";

export default function ContactPage() {
    const { t } = useLang();
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fields = [
        { id: "name", label: t("contact.name"), type: "text", required: true },
        { id: "company", label: t("contact.company"), type: "text", required: true },
        { id: "website", label: t("contact.website"), type: "url", required: false },
        { id: "email", label: t("contact.email"), type: "email", required: true },
        { id: "emailConfirm", label: t("contact.emailConfirm"), type: "email", required: true },
        { id: "phone", label: t("contact.phone"), type: "tel", required: false },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data: Record<string, string> = {};
        formData.forEach((v, k) => { data[k] = v.toString(); });

        // メール確認バリデーション
        if (data.email !== data.emailConfirm) {
            setError(t("contact.error.emailMismatch"));
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch(GAS_WEBAPP_URL, {
                method: "POST",
                body: JSON.stringify({
                    name: data.name,
                    company: data.company,
                    website: data.website || "",
                    email: data.email,
                    phone: data.phone || "",
                    message: data.message,
                }),
            });

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            setSubmitted(true);
        } catch (err) {
            console.error("Form submission error:", err);
            setError(t("contact.error.network"));
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <>
                <Header />
                <main className="pt-32 pb-20 min-h-screen flex items-center justify-center">
                    <motion.div
                        className="text-center px-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CheckCircle size={48} className="mx-auto mb-6 text-[var(--color-brand)]" />
                        <h1 className="text-2xl font-bold mb-4">{t("contact.thanks.title")}</h1>
                        <p className="text-muted-foreground mb-8 whitespace-pre-line">{t("contact.thanks.body")}</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-brand-active)] text-white font-semibold hover:bg-[var(--color-brand)] transition-colors"
                        >
                            {t("contact.thanks.back")}
                        </Link>
                    </motion.div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main>
                <PageHero
                    label={t("contact.label")}
                    title={t("contact.title")}
                    description={t("contact.desc")}
                />

                <section className="py-16 md:py-24 bg-background">
                    <div className="mx-auto max-w-[1280px] px-6">
                        <div className="max-w-[800px]">
                            <motion.form
                                className="space-y-6"
                                initial="hidden" animate="visible"
                                onSubmit={handleSubmit}
                            >
                                {error && (
                                    <motion.div
                                        className="flex items-start gap-3 p-4 rounded-lg border border-destructive/50 bg-destructive/5 text-destructive text-sm"
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                        <p>{error}</p>
                                    </motion.div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fields.map((f, i) => (
                                        <motion.div key={f.id} custom={i} variants={fadeUp}>
                                            <label htmlFor={f.id} className="block text-sm font-medium mb-2">
                                                {f.label}
                                                {f.required && <span className="text-destructive ml-1">{t("contact.required")}</span>}
                                                {!f.required && <span className="text-muted-foreground text-xs ml-2">{t("contact.optional")}</span>}
                                            </label>
                                            <input
                                                id={f.id}
                                                name={f.id}
                                                type={f.type}
                                                required={f.required}
                                                disabled={submitting}
                                                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div custom={fields.length} variants={fadeUp}>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        {t("contact.message")}<span className="text-destructive ml-1">{t("contact.required")}</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        disabled={submitting}
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </motion.div>

                                <motion.div custom={fields.length + 1} variants={fadeUp}>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={submitting}
                                        className="w-full md:w-auto rounded-full bg-[var(--color-brand-active)] hover:bg-[var(--color-brand)] text-white font-semibold shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] h-12 text-base px-12 transition-all disabled:opacity-60"
                                    >
                                        {submitting ? (
                                            <><Loader2 size={16} className="mr-2 animate-spin" /> {t("contact.submitting")}</>
                                        ) : (
                                            <><Send size={16} className="mr-2" /> {t("contact.submit")}</>
                                        )}
                                    </Button>
                                </motion.div>
                            </motion.form>
                        </div>

                        {/* Company Info */}
                        <div className="max-w-[800px]">
                            <motion.div
                                className="mt-12 pt-8 border-t border-border/50"
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                custom={0} variants={fadeUp}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                    <div>
                                        <p className="font-semibold mb-1">{t("contact.info.email.label")}</p>
                                        <p className="text-muted-foreground">{t("contact.info.email.value")}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-1">{t("contact.info.address.label")}</p>
                                        <p className="text-muted-foreground whitespace-pre-line">{t("contact.info.address.value")}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-1">{t("contact.info.hours.label")}</p>
                                        <p className="text-muted-foreground">{t("contact.info.hours.value")}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
