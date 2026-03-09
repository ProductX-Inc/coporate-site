"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { useLang, type Locale } from "@/components/lang-provider";
import {
    slides, acts, getActForSlide,
    companyInfo, strengths, stats, pgStrengths, pgServices, pgPlans, pgIndustries,
    marketStats, aiApproaches, aiPlans, aiIndustryUC, securityItems,
    type SlideData,
} from "@/lib/deck-data";
import {
    ChevronLeft, ChevronRight, Maximize, Minimize, Download, Lock,
    ArrowLeft, ArrowRight, CheckCircle,
} from "lucide-react";
import { DownloadModal } from "@/components/ui/download-modal";

/* ── Helpers ── */
const l = (locale: Locale, v: { ja: string; en: string }) => v[locale];

/* ── Slide transition variants ── */
const slideVariants = {
    enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
};

const sectionBreakVariants = {
    enter: { opacity: 0, y: 40, scale: 0.95 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -40, scale: 0.95 },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] } },
};

/* ── Main Component ── */
export default function CompanyDeckPage() {
    const { locale } = useLang();
    const ja = locale === "ja";
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [uiVisible, setUiVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [dlOpen, setDlOpen] = useState(false);

    const slide = slides[current];
    const act = getActForSlide(current);
    const total = slides.length;

    // ── Navigation ──
    const goTo = useCallback((index: number) => {
        if (index < 0 || index >= total || index === current) return;
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    }, [current, total]);

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

    // ── Keyboard ──
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
            else if (e.key === "f" || e.key === "F") toggleFullscreen();
            else if (e.key === "Escape" && isFullscreen) exitFullscreen();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [next, prev, isFullscreen]);

    // ── Deep link + hash sync ──
    useEffect(() => {
        const hash = window.location.hash;
        const match = hash.match(/^#slide-(\d+)$/);
        if (match) {
            const n = parseInt(match[1], 10) - 1;
            if (n >= 0 && n < total) setCurrent(n);
        }
    }, [total]);

    useEffect(() => {
        window.history.replaceState(null, "", `#slide-${current + 1}`);
    }, [current]);

    // ── Fullscreen ──
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, []);

    const exitFullscreen = useCallback(() => {
        if (document.fullscreenElement) document.exitFullscreen();
    }, []);

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, []);

    // ── Mouse auto-hide in fullscreen ──
    useEffect(() => {
        if (!isFullscreen) { setUiVisible(true); return; }
        const handleMove = () => {
            setUiVisible(true);
            if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
            mouseTimerRef.current = setTimeout(() => setUiVisible(false), 3000);
        };
        handleMove();
        window.addEventListener("mousemove", handleMove);
        return () => {
            window.removeEventListener("mousemove", handleMove);
            if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
        };
    }, [isFullscreen]);

    // ── Hide hint after 5s ──
    useEffect(() => {
        if (isFullscreen && showHint) {
            const t = setTimeout(() => setShowHint(false), 5000);
            return () => clearTimeout(t);
        }
    }, [isFullscreen, showHint]);

    // ── Swipe ──
    const touchRef = useRef<{ x: number; y: number } | null>(null);
    const handleTouchStart = (e: React.TouchEvent) => {
        touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchRef.current) return;
        const dx = e.changedTouches[0].clientX - touchRef.current.x;
        const dy = e.changedTouches[0].clientY - touchRef.current.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            dx < 0 ? next() : prev();
        }
        touchRef.current = null;
    };

    // ── Derived ──
    const isSectionBreak = slide.type === "section-break";
    const variants = isSectionBreak ? sectionBreakVariants : slideVariants;
    const transitionDuration = isSectionBreak ? 0.5 : 0.3;
    const fsOpacity = (visible: boolean) => isFullscreen ? { opacity: visible ? 1 : 0, transition: "opacity 0.3s" } as const : undefined;

    return (
        <>
            {!isFullscreen && <Header />}
            <div
                ref={containerRef}
                className={`${isFullscreen
                    ? "bg-[oklch(0.05_0_0)] flex flex-col items-center justify-center h-screen"
                    : "pt-24 md:pt-32 pb-12 min-h-screen bg-background"
                    }`}
                style={isFullscreen && !uiVisible ? { cursor: "none" } : undefined}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* ── Top bar (non-fullscreen) ── */}
                {!isFullscreen && (
                    <div className="mx-auto max-w-[1280px] px-4 md:px-6 mb-4 md:mb-6">
                        <div className="flex items-center justify-between">
                            <Link href="/resources" className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft size={14} />
                                <span>Resources</span>
                            </Link>
                            <div className="flex items-center gap-2 md:gap-4">
                                <span className="text-xs md:text-sm text-muted-foreground font-medium tabular-nums">
                                    {current + 1} / {total}
                                </span>
                                <button
                                    onClick={toggleFullscreen}
                                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-brand)]/5 transition-all"
                                >
                                    <Maximize size={14} />
                                    {ja ? "プレゼン" : "Present"}
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground"
                                >
                                    <Maximize size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── ACT Indicator ── */}
                {(!isFullscreen || uiVisible) && (
                    <div className={`flex flex-wrap items-center justify-center gap-1 mb-4 ${isFullscreen ? "absolute top-6 left-1/2 -translate-x-1/2 z-20" : "mx-auto max-w-[1280px] px-4 md:px-6"}`}
                        style={fsOpacity(uiVisible)}
                    >
                        {acts.map((a, i) => {
                            const isActive = a.id === act.id;
                            return (
                                <button
                                    key={a.id}
                                    onClick={() => goTo(a.startSlide)}
                                    className={`relative px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold tracking-wider rounded-lg transition-all duration-300 ${isActive
                                        ? `bg-gradient-to-r ${a.color} text-white shadow-md`
                                        : isFullscreen
                                            ? "text-white/40 hover:text-white/70"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {l(locale, a.label)}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ── Slide Area ── */}
                <div className={`relative ${isFullscreen ? "w-full max-w-[90vw] max-h-[80vh]" : "mx-auto max-w-[1280px] px-4 md:px-6"}`}>
                    {/* Vignette in fullscreen */}
                    {isFullscreen && (
                        <div className="fixed inset-0 pointer-events-none z-10"
                            style={{ background: "radial-gradient(ellipse at center, transparent 60%, oklch(0.05 0 0 / 0.6) 100%)" }} />
                    )}

                    {/* Slide container — 3:4 on mobile, 16:9 on md+ */}
                    <div className={`relative w-full overflow-hidden rounded-2xl aspect-[3/4] md:aspect-[16/9] ${isFullscreen ? "rounded-none !aspect-[16/9]" : "border border-border shadow-xl"}`}
                    >
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: transitionDuration, ease: [0.25, 1, 0.5, 1] }}
                                className="absolute inset-0"
                            >
                                <SlideContent slide={slide} locale={locale} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Navigation arrows ── */}
                    {(!isFullscreen || uiVisible) && (
                        <>
                            <NavArrow dir="prev" onClick={prev} show={current > 0} isFullscreen={isFullscreen} style={fsOpacity(uiVisible)} />
                            <NavArrow dir="next" onClick={next} show={current < total - 1} isFullscreen={isFullscreen} style={fsOpacity(uiVisible)} />
                        </>
                    )}
                </div>

                {/* ── Bottom bar ── */}
                <div className={`mt-3 md:mt-4 flex items-center justify-between ${isFullscreen
                    ? "absolute bottom-6 left-1/2 -translate-x-1/2 w-[80vw] z-20"
                    : "mx-auto max-w-[1280px] px-4 md:px-6"
                    }`}
                    style={fsOpacity(uiVisible)}
                >
                    {/* Dot indicators */}
                    <div className="flex items-center gap-0.5 md:gap-1 overflow-x-auto scrollbar-none">
                        {slides.map((s, i) => {
                            const sAct = getActForSlide(i);
                            const isActStart = i === acts.find(a => a.id === sAct.id)?.startSlide;
                            return (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`transition-all duration-300 rounded-full shrink-0 ${i === current
                                        ? "w-2.5 h-2.5 md:w-3 md:h-3 bg-[var(--color-brand)] scale-125"
                                        : isFullscreen
                                            ? "w-2 h-2 bg-white/30 hover:bg-white/60"
                                            : "w-2 h-2 bg-border hover:bg-muted-foreground/50"
                                        } ${isActStart && i > 0 ? "ml-1 md:ml-2" : ""}`}
                                />
                            );
                        })}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        {isFullscreen ? (
                            <button
                                onClick={exitFullscreen}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white/80 transition-colors"
                            >
                                <Minimize size={14} />
                                ESC
                            </button>
                        ) : (
                            <button
                                onClick={() => setDlOpen(true)}
                                className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium border border-[var(--color-brand-gold)]/30 text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)]/60 hover:shadow-[0_0_20px_rgba(254,198,101,0.15)] transition-all shrink-0"
                            >
                                <Download size={14} />
                                PDF
                                <Lock size={12} className="opacity-60" />
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Fullscreen hint ── */}
                {isFullscreen && showHint && (
                    <motion.div
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs text-white/30 z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        ← → {ja ? "スライド移動" : "Navigate"}　ESC {ja ? "終了" : "Exit"}
                    </motion.div>
                )}
            </div>
            <DownloadModal isOpen={dlOpen} onClose={() => setDlOpen(false)} />
        </>
    );
}


/* ── NavArrow ── */
function NavArrow({ dir, onClick, show, isFullscreen, style }: {
    dir: "prev" | "next";
    onClick: () => void;
    show: boolean;
    isFullscreen: boolean;
    style?: React.CSSProperties;
}) {
    if (!show) return null;
    const isPrev = dir === "prev";
    return (
        <button
            onClick={onClick}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${isFullscreen
                ? `${isPrev ? "-left-16" : "-right-16"} bg-white/10 hover:bg-white/20 text-white/70 hover:text-white`
                : `${isPrev ? "left-2 md:-left-14" : "right-2 md:-right-14"} bg-card/80 md:bg-card border border-border hover:border-[var(--color-brand)]/40 text-muted-foreground hover:text-foreground shadow-lg hover:shadow-xl backdrop-blur-sm md:backdrop-blur-none`
                }`}
            style={style}
        >
            {isPrev ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
    );
}

/* ════════════════════════════════════════════════════════
   SLIDE CONTENT RENDERER
   ════════════════════════════════════════════════════════ */

function SlideContent({ slide, locale }: { slide: SlideData; locale: Locale }) {
    switch (slide.id) {
        case 1: return <SlideCover locale={locale} />;
        case 2: return <SlideCompanyOverview locale={locale} />;
        case 3: return <SlideVision locale={locale} />;
        case 4: return <SlideStrengths locale={locale} />;
        case 5: return <SlideStats locale={locale} />;
        case 6: return <SlideSectionBreak slide={slide} locale={locale} gradient="from-[#6366f1] to-[#a855f7]" />;
        case 7: return <SlidePGStrengths locale={locale} />;
        case 8: return <SlidePGServices locale={locale} />;
        case 9: return <SlidePGPricing locale={locale} />;
        case 10: return <SlidePGPortfolio locale={locale} />;
        case 11: return <SlideSectionBreak slide={slide} locale={locale} gradient="from-[#10b981] to-[#06b6d4]" />;
        case 12: return <SlideMarketData locale={locale} />;
        case 13: return <SlideServiceMap locale={locale} />;
        case 14: return <SlideAIPricing locale={locale} />;
        case 15: return <SlideIndustryUC locale={locale} />;
        case 16: return <SlideCaseStudy locale={locale} />;
        case 17: return <SlideSecurity locale={locale} />;
        case 18: return <SlideCTA locale={locale} />;
        default: return <div className="w-full h-full bg-background flex items-center justify-center text-muted-foreground">Slide {slide.id}</div>;
    }
}

/* ── Shared slide wrappers ── */
function DarkSlide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`w-full h-full bg-[var(--color-brand-dark)] text-white p-4 md:p-12 flex flex-col justify-start md:justify-center relative overflow-hidden overflow-y-auto ${className}`}>
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
            }} />
            <div className="relative z-10 flex flex-col h-full justify-center">{children}</div>
        </div>
    );
}

/* ── Individual slide components ── */

function SlideCover({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <div className="w-full h-full relative flex flex-col items-center justify-start md:justify-center overflow-hidden overflow-y-auto pt-8 md:pt-0"
            style={{ background: "linear-gradient(135deg, var(--color-brand-dark) 0%, #2a1a4e 40%, var(--color-brand-dark) 100%)" }}>
            {/* Aurora orbs */}
            <motion.div className="absolute -top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)" }}
                animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute -bottom-[15%] -right-[5%] w-[300px] h-[300px] rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, var(--color-brand-gold) 0%, transparent 70%)" }}
                animate={{ x: [0, -20, 10, 0], y: [0, 15, -20, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
            {/* Content */}
            <div className="relative z-10 text-center">
                <motion.div className="mb-8"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                    <span className="text-4xl md:text-6xl font-bold tracking-tight text-white">Product</span>
                    <span className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-brand)]">X</span>
                </motion.div>
                <p className="text-lg md:text-2xl font-light text-white/80 tracking-wider mb-2">Unleash Potential.</p>
                <p className="text-xs text-white/30 mt-8 tracking-wider">
                    {ja ? "株式会社ProductX — 会社・事業紹介資料" : "ProductX Inc. — Company & Business Overview"}
                </p>
                <p className="text-[10px] text-white/20 mt-4 tracking-[0.2em] uppercase">Confidential — 2026.03</p>
            </div>
        </div>
    );
}

function SlideCompanyOverview({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    const info = Object.entries(companyInfo).map(([key, val]) => ({
        label: ja
            ? { name: "会社名", founded: "設立", ceo: "代表", location: "所在地", business: "事業" }[key] || key
            : { name: "Company", founded: "Founded", ceo: "CEO", location: "Location", business: "Business" }[key] || key,
        value: l(locale, val),
    }));
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-3">COMPANY</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{ja ? "会社概要" : "Company Overview"}</h2>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl" variants={stagger} initial="hidden" animate="visible">
                {info.map((item) => (
                    <motion.div key={item.label} className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" variants={fadeIn}>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="text-sm font-semibold">{item.value}</p>
                    </motion.div>
                ))}
            </motion.div>
        </DarkSlide>
    );
}

function SlideVision({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-6">VISION</p>
            <motion.h2
                className="text-2xl md:text-4xl font-bold leading-[1.4] whitespace-pre-line max-w-3xl"
                style={{
                    background: "linear-gradient(135deg, var(--color-brand-active) 0%, var(--color-brand) 50%, var(--color-brand-gold) 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", color: "transparent",
                }}
            >
                {ja ? "プロダクトの力で、\nまだ見ぬ未来を創る。" : "Creating new futures\nthrough the power of products."}
            </motion.h2>
            <p className="mt-6 text-sm text-white/50 max-w-xl leading-relaxed">
                {ja
                    ? "私たちは、テクノロジーとデザインの力でビジネスの可能性を最大化し、まだ誰も見たことのない未来を創造します。"
                    : "We maximize business potential through technology and design, creating futures no one has seen before."}
            </p>
        </DarkSlide>
    );
}

function SlideStrengths({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-3">STRENGTHS</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "ProductXの4つの強み" : "Four Key Strengths"}</h2>
            <motion.div className="grid grid-cols-2 gap-2 md:gap-3 max-w-2xl" variants={stagger} initial="hidden" animate="visible">
                {strengths.map((s) => {
                    const Icon = s.icon;
                    return (
                        <motion.div key={l(locale, s.title)} className="p-2 md:p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" variants={fadeIn}>
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-[var(--color-brand)]/20 flex items-center justify-center mb-1 md:mb-3">
                                <Icon size={14} className="text-[var(--color-brand)]" />
                            </div>
                            <h3 className="text-[11px] md:text-sm font-bold mb-0.5 md:mb-1">{l(locale, s.title)}</h3>
                            <p className="text-[9px] md:text-[11px] text-white/50 leading-relaxed">{l(locale, s.desc)}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

function SlideStats({ locale }: { locale: Locale }) {
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-3">RESULTS</p>
            <h2 className="text-xl md:text-2xl font-bold mb-8">{locale === "ja" ? "実績サマリー" : "Track Record"}</h2>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={stagger} initial="hidden" animate="visible">
                {stats.map((s) => (
                    <motion.div key={s.value} className="text-center p-4" variants={fadeIn}>
                        <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-gold)] bg-clip-text text-transparent">
                            {s.value}
                        </p>
                        <p className="text-xs text-white/50 mt-2">{l(locale, s.label)}</p>
                    </motion.div>
                ))}
            </motion.div>
        </DarkSlide>
    );
}

function SlideSectionBreak({ slide, gradient, locale }: { slide: SlideData; gradient: string; locale: Locale }) {
    return (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-start md:justify-center p-4 md:p-8 text-center overflow-y-auto pt-8 md:pt-8`}>
            <motion.h2
                className="text-3xl md:text-6xl font-bold text-white mb-4"
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {l(locale, slide.title)}
            </motion.h2>
            {slide.subtitle && (
                <motion.p
                    className="text-base md:text-xl text-white/70 max-w-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {l(locale, slide.subtitle)}
                </motion.p>
            )}
        </div>
    );
}

function SlidePGStrengths({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-3">WHY US</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "3つの強み" : "Three Core Strengths"}</h2>
            <motion.div className="grid grid-cols-3 gap-2 md:gap-4" variants={stagger} initial="hidden" animate="visible">
                {pgStrengths.map((s) => {
                    const Icon = s.icon;
                    return (
                        <motion.div key={l(locale, s.title)} className="p-2 md:p-4 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-[#6366f1]/20 flex items-center justify-center mb-1 md:mb-3">
                                <Icon size={14} className="text-[#a78bfa]" />
                            </div>
                            <h3 className="text-[11px] md:text-sm font-bold mb-0.5 md:mb-1">{l(locale, s.title)}</h3>
                            <p className="text-[9px] md:text-[11px] text-white/50 leading-relaxed">{l(locale, s.desc)}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

function SlidePGServices({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-3">SERVICES</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "サービスカタログ" : "Service Catalog"}</h2>
            <motion.div className="grid grid-cols-3 gap-2 md:gap-4" variants={stagger} initial="hidden" animate="visible">
                {pgServices.map((cat) => (
                    <motion.div key={l(locale, cat.cat)} className="p-2 md:p-4 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                        <h3 className="text-xs font-bold text-[#a78bfa] uppercase tracking-wider mb-3">{l(locale, cat.cat)}</h3>
                        <ul className="space-y-1.5">
                            {cat.items.map((item) => (
                                <li key={l(locale, item)} className="flex items-start gap-2 text-[11px] text-white/70">
                                    <CheckCircle size={12} className="text-[#a78bfa]/60 shrink-0 mt-0.5" />
                                    {l(locale, item)}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </DarkSlide>
    );
}

function SlidePGPricing({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-3">PRICING</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "料金体系" : "Pricing"}</h2>
            <motion.div className="grid grid-cols-3 gap-2 md:gap-4" variants={stagger} initial="hidden" animate="visible">
                {pgPlans.map((plan) => (
                    <motion.div key={l(locale, plan.name)}
                        className={`p-3 md:p-5 rounded-xl border ${plan.recommended ? "border-[var(--color-brand)] bg-[var(--color-brand)]/5 scale-[1.02]" : "border-white/10 bg-white/5"}`}
                        variants={fadeIn}>
                        {plan.recommended && <span className="text-[9px] font-bold text-[var(--color-brand-gold)] uppercase tracking-wider">Recommended</span>}
                        <h3 className="text-sm font-bold mt-1">{l(locale, plan.name)}</h3>
                        <p className="text-lg font-bold text-[var(--color-brand)] mt-2">{l(locale, plan.price)}</p>
                        <p className="text-[11px] text-white/50 mt-2">{l(locale, plan.desc)}</p>
                    </motion.div>
                ))}
            </motion.div>
        </DarkSlide>
    );
}

function SlidePGPortfolio({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-3">PORTFOLIO</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "対応業界" : "Industries Served"}</h2>
            <motion.div className="grid grid-cols-3 md:grid-cols-6 gap-3" variants={stagger} initial="hidden" animate="visible">
                {pgIndustries.map((ind) => {
                    const Icon = ind.icon;
                    return (
                        <motion.div key={l(locale, ind.label)} className="flex flex-col items-center p-4 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                            <Icon size={20} className="text-[#a78bfa] mb-2" />
                            <p className="text-[11px] font-medium text-white/70">{l(locale, ind.label)}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

function SlideMarketData({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#10b981] mb-3">MARKET</p>
            <h2 className="text-xl md:text-2xl font-bold mb-8">{ja ? "なぜ今、AI DXなのか" : "Why AI DX Now?"}</h2>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={stagger} initial="hidden" animate="visible">
                {marketStats.map((s) => (
                    <motion.div key={s.value} className="text-center p-4 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#10b981] to-[#06b6d4] bg-clip-text text-transparent">
                            {s.value}
                        </p>
                        <p className="text-[11px] text-white/50 mt-2">{l(locale, s.label)}</p>
                    </motion.div>
                ))}
            </motion.div>
        </DarkSlide>
    );
}

function SlideServiceMap({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    const levels = [
        { name: ja ? "Lv.1 スポット" : "Lv.1 Spot", desc: ja ? "試しに1件" : "Try one task" },
        { name: ja ? "Lv.2 パッケージ" : "Lv.2 Package", desc: ja ? "まとめて導入" : "Bundle adoption" },
        { name: ja ? "Lv.3 伴走" : "Lv.3 Partnership", desc: ja ? "継続支援" : "Ongoing support" },
        { name: ja ? "Lv.4 内製化" : "Lv.4 Internalize", desc: ja ? "自走体制へ" : "Self-running" },
    ];
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#10b981] mb-3">APPROACH</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "サービスマップ" : "Service Map"}</h2>
            <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div />
                    {aiApproaches.map((a) => (
                        <div key={l(locale, a.label)} className="text-center text-xs font-bold text-[#10b981]">{l(locale, a.label)}</div>
                    ))}
                </div>
                {levels.map((lv, i) => (
                    <motion.div key={lv.name} className="grid grid-cols-2 sm:grid-cols-4 gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.3 }}>
                        <div className="text-xs font-semibold text-white/80 flex items-center">{lv.name}</div>
                        {aiApproaches.map((a, j) => (
                            <div key={j} className="h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                                <div className={`w-2 h-2 rounded-full ${i <= j + 1 ? "bg-[#10b981]" : "bg-white/10"}`} />
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </DarkSlide>
    );
}

function SlideAIPricing({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#10b981] mb-3">PRICING</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "料金体系 + 補助金" : "Pricing & Subsidies"}</h2>
            <motion.div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-6" variants={stagger} initial="hidden" animate="visible">
                {aiPlans.map((plan) => (
                    <motion.div key={l(locale, plan.name)}
                        className={`p-3 md:p-5 rounded-xl border ${plan.recommended ? "border-[#10b981] bg-[#10b981]/5 scale-[1.02]" : "border-white/10 bg-white/5"}`}
                        variants={fadeIn}>
                        {plan.recommended && <span className="text-[9px] font-bold text-[var(--color-brand-gold)] uppercase tracking-wider">Recommended</span>}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-lg">{plan.emoji}</span>
                            <h3 className="text-sm font-bold">{l(locale, plan.name)}</h3>
                        </div>
                        <p className="text-base font-bold text-[#10b981] mt-2">{l(locale, plan.price)}</p>
                        <p className="text-[11px] text-white/50 mt-2">{l(locale, plan.desc)}</p>
                    </motion.div>
                ))}
            </motion.div>
            <div className="p-3 rounded-lg bg-[var(--color-brand-gold)]/10 border border-[var(--color-brand-gold)]/20">
                <p className="text-[11px] text-[var(--color-brand-gold)] font-medium">
                    💰 {ja ? "補助金活用で実質負担を大幅軽減（IT導入補助金 / ものづくり補助金 / 事業再構築補助金）" : "Subsidies can significantly reduce costs (IT, Manufacturing, Business Restructuring)"}
                </p>
            </div>
        </DarkSlide>
    );
}

function SlideIndustryUC({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#10b981] mb-3">USE CASES</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "業界別ユースケース" : "Industry Use Cases"}</h2>
            <motion.div className="grid grid-cols-3 gap-2 md:gap-3" variants={stagger} initial="hidden" animate="visible">
                {aiIndustryUC.map((uc) => {
                    const Icon = uc.icon;
                    return (
                        <motion.div key={l(locale, uc.industry)} className="p-2 md:p-4 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                            <Icon size={16} className="text-[#10b981] mb-2" />
                            <h3 className="text-xs font-bold mb-1">{l(locale, uc.industry)}</h3>
                            <p className="text-[10px] text-white/50">{l(locale, uc.uc)}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

function SlideCaseStudy({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-gold)] mb-3">CASE STUDY</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "導入事例" : "Case Studies"}</h2>
            <motion.div className="grid grid-cols-2 gap-2 md:gap-4" variants={stagger} initial="hidden" animate="visible">
                <motion.div className="p-3 md:p-5 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">{ja ? "Partner Growth 事例" : "Partner Growth Case"}</p>
                    <h3 className="text-sm font-bold mb-3">{ja ? "ライブ配信アプリ開発" : "Live Streaming App"}</h3>
                    <div className="flex gap-4">
                        <div>
                            <p className="text-[10px] text-white/40">Before</p>
                            <p className="text-xs text-white/60">{ja ? "開発リソース不足" : "Lack of dev resources"}</p>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                            <p className="text-[10px] text-[var(--color-brand-gold)]">After</p>
                            <p className="text-xs text-white/80">{ja ? "3ヶ月でリリース完了" : "Released in 3 months"}</p>
                        </div>
                    </div>
                </motion.div>
                <motion.div className="p-3 md:p-5 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">{ja ? "AI DX 事例" : "AI DX Case"}</p>
                    <h3 className="text-sm font-bold mb-3">{ja ? "問い合わせ対応の自動化" : "Customer Support Automation"}</h3>
                    <div className="flex gap-4">
                        <div>
                            <p className="text-[10px] text-white/40">Before</p>
                            <p className="text-xs text-white/60">{ja ? "月40時間の手動対応" : "40hrs/month manual work"}</p>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                            <p className="text-[10px] text-[var(--color-brand-gold)]">After</p>
                            <p className="text-xs text-white/80">{ja ? "70%削減・月12時間" : "70% reduction to 12hrs"}</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </DarkSlide>
    );
}

function SlideSecurity({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-gold)] mb-3">SECURITY</p>
            <h2 className="text-xl md:text-2xl font-bold mb-6">{ja ? "セキュリティ・安心の取り組み" : "Security & Trust"}</h2>
            <motion.div className="grid grid-cols-3 gap-2 md:gap-4" variants={stagger} initial="hidden" animate="visible">
                {securityItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <motion.div key={l(locale, item.title)} className="p-2 md:p-5 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                            <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg bg-[var(--color-brand-gold)]/10 flex items-center justify-center mb-1 md:mb-3">
                                <Icon size={14} className="text-[var(--color-brand-gold)]" />
                            </div>
                            <h3 className="text-[11px] md:text-sm font-bold mb-0.5 md:mb-1">{l(locale, item.title)}</h3>
                            <p className="text-[9px] md:text-[11px] text-white/50 leading-relaxed">{l(locale, item.desc)}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

function SlideCTA({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <div className="w-full h-full bg-[var(--color-brand-dark)] text-white flex flex-col items-center justify-start md:justify-center p-4 md:p-8 text-center relative overflow-hidden overflow-y-auto pt-8 md:pt-8">
            {/* Gold glow background */}
            <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse at center, rgba(254,198,101,0.08) 0%, transparent 60%)",
            }} />
            <div className="relative z-10">
                <motion.p
                    className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-gold)] mb-6"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                >
                    NEXT STEP
                </motion.p>
                <motion.h2
                    className="text-2xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                >
                    {ja ? "まずは30分の無料相談から" : "Start with a free 30-min consultation"}
                </motion.h2>
                <motion.p
                    className="text-sm text-white/50 mb-8 max-w-md"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                >
                    {ja
                        ? "御社の課題に合わせた最適なソリューションをご提案します。お気軽にお問い合わせください。"
                        : "We'll propose the best solution tailored to your challenges. Feel free to reach out."}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] font-bold text-sm shadow-[0_0_30px_rgba(254,198,101,0.3)] hover:shadow-[0_0_50px_rgba(254,198,101,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                        {ja ? "無料相談を予約する" : "Book a Free Consultation"}
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
                <motion.p
                    className="text-[10px] text-white/20 mt-8 tracking-[0.15em]"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                >
                    productx.jp/contact
                </motion.p>
            </div>
        </div>
    );
}
