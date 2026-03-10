"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useLang, type Locale } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";

/* ── i18n helpers ── */

export type I18n = { ja: string; en: string };
export const l = (locale: Locale, v: I18n) => v[locale];
export const MV = { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true }, variants: fadeUp };

/* ── selection card styles ── */

const SELECTED = "border-[var(--color-brand)] bg-[var(--color-brand)]/5 shadow-[0_0_20px_rgba(105,108,255,0.15)]";
const UNSELECTED = "border-border bg-card hover:border-[var(--color-brand)]/30";
export const cardCls = (selected: boolean) => `relative rounded-xl border-2 text-center transition-all duration-300 cursor-pointer ${selected ? SELECTED : UNSELECTED}`;

export function SelectedBadge() {
    return (
        <motion.div className="absolute top-2 right-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
            <CheckCircle size={16} className="text-[var(--color-brand)]" />
        </motion.div>
    );
}

/* ── animated counter ── */

export function AnimatedCounter({ value, suffix = "", prefix = "", duration = 1.5 }: {
    value: number; suffix?: string; prefix?: string; duration?: number;
}) {
    const [display, setDisplay] = useState(0);
    const raf = useRef<number | null>(null);

    useEffect(() => {
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - t0) / (duration * 1000), 1);
            setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
            if (p < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
        return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    }, [value, duration]);

    return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

/* ── slide transition ── */

export const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

export const SLIDE_TRANSITION = { duration: 0.35, ease: [0.25, 1, 0.5, 1] as const };

/* ── progress bar ── */

export function StepProgress({ steps, current }: { steps: I18n[]; current: number }) {
    const { locale } = useLang();
    return (
        <motion.div className="mb-12" {...MV} custom={0}>
            <div className="flex items-center justify-between mb-3">
                {steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${i <= current
                            ? "bg-[var(--color-brand-active)] text-white" : "bg-secondary text-muted-foreground"}`}>
                            {i < current ? <CheckCircle size={14} /> : i + 1}
                        </span>
                        <span className={`hidden sm:block text-xs font-medium transition-colors ${i <= current ? "text-foreground" : "text-muted-foreground"}`}>
                            {l(locale, s)}
                        </span>
                        {i < steps.length - 1 && <ChevronRight size={14} className="text-muted-foreground/40 mx-0.5 hidden sm:block" />}
                    </div>
                ))}
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-active)] to-[var(--color-brand)]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((current + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
            </div>
        </motion.div>
    );
}

/* ── navigation buttons ── */

export function StepNav({ step, lastStep, canProceed, goBack, goNext, lastLabel }: {
    step: number; lastStep: number; canProceed: boolean; goBack: () => void; goNext: () => void; lastLabel: I18n;
}) {
    const { locale } = useLang();
    return (
        <motion.div className="flex items-center justify-between mt-10" {...MV} custom={5}>
            <button onClick={goBack} disabled={step === 0}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft size={16} /> {l(locale, { ja: "戻る", en: "Back" })}
            </button>
            <button onClick={goNext} disabled={!canProceed}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${canProceed
                    ? "bg-[var(--color-brand-active)] text-white hover:bg-[var(--color-brand)] shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35)] hover:-translate-y-0.5"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
                {step === lastStep ? l(locale, lastLabel) : l(locale, { ja: "次へ", en: "Next" })} <ArrowRight size={16} />
            </button>
        </motion.div>
    );
}

/* ── primary CTA button (import from shared, re-export for consumers) ── */

import { PrimaryCTA } from "@/components/shared/primary-cta";
export { PrimaryCTA };

/* ── secondary link ── */

export function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand)] hover:gap-3 transition-all">
            {children} <ArrowRight size={16} />
        </Link>
    );
}

/* ── bottom CTA section ── */

export function BottomCTA({ label, heading, description, links }: {
    label: string; heading: I18n; description: I18n;
    links: { href: string; label: I18n; primary?: boolean }[];
}) {
    const { locale } = useLang();
    return (
        <section className="py-24 md:py-32 bg-secondary/30 dark:bg-card/30 bg-dot-pattern">
            <div className="mx-auto max-w-[800px] px-6 text-center">
                <motion.p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-active)] dark:text-[var(--color-brand)] mb-4" {...MV} custom={0}>
                    {label}
                </motion.p>
                <motion.h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" {...MV} custom={0.5}>
                    {l(locale, heading)}
                </motion.h2>
                <motion.p className="text-muted-foreground mb-8" {...MV} custom={1}>
                    {l(locale, description)}
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" {...MV} custom={1.5}>
                    {links.map((lk, i) => lk.primary
                        ? <PrimaryCTA key={i} href={lk.href}>{l(locale, lk.label)}</PrimaryCTA>
                        : <SecondaryLink key={i} href={lk.href}>{l(locale, lk.label)}</SecondaryLink>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

/* ── value format ── */

export const fmtVal = (v: number) => v % 1 !== 0 ? v.toFixed(1) : v.toLocaleString();
