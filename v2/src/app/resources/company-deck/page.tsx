"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { useLang, type Locale } from "@/components/lang-provider";
import {
    slides, acts, getActForSlide,
    companyInfo, visionDetails, strengths, stats, deckPersonas,
    pgStrengths, pgServices, pgPlans, pgIndustries,
    marketStats, aiApproaches, aiPlans, aiIndustryUC, securityItems,
    deckSubsidies, subsidyExample, caseStudyDetails, deckJourneySteps, deckCompetitors,
    type SlideData,
} from "@/lib/deck-data";
import {
    ChevronLeft, ChevronRight, Maximize, Minimize, Download, Lock,
    ArrowLeft, ArrowRight, CheckCircle, ChevronRight as ChevronR, Loader2,
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
const stagger = { visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] } },
};

/* ── Main Component ── */
export default function CompanyDeckPage() {
    return (
        <Suspense fallback={null}>
            <CompanyDeckInner />
        </Suspense>
    );
}

function CompanyDeckInner() {
    const { locale } = useLang();
    const ja = locale === "ja";
    const searchParams = useSearchParams();
    const router = useRouter();
    const isExportMode = searchParams.get("export") === "true";
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [uiVisible, setUiVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [dlOpen, setDlOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const slideRef = useRef<HTMLDivElement>(null);

    const slide = slides[current];
    const act = getActForSlide(current);
    const total = slides.length;

    const goTo = useCallback((index: number) => {
        if (index < 0 || index >= total || index === current) return;
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    }, [current, total]);
    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

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

    useEffect(() => {
        const hash = window.location.hash;
        const match = hash.match(/^#slide-(\d+)$/);
        if (match) { const n = parseInt(match[1], 10) - 1; if (n >= 0 && n < total) setCurrent(n); }
    }, [total]);
    useEffect(() => { if (!isExportMode) window.history.replaceState(null, "", `#slide-${current + 1}`); }, [current, isExportMode]);

    // ── PDF Export ──
    useEffect(() => {
        if (!isExportMode || isExporting) return;
        setIsExporting(true);

        (async () => {
            try {
                const { default: html2canvas } = await import("html2canvas-pro");
                const { jsPDF } = await import("jspdf");
                const { flushSync } = await import("react-dom");

                const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1280, 720] });

                for (let i = 0; i < total; i++) {
                    flushSync(() => { setDirection(i > 0 ? 1 : 0); setCurrent(i); });
                    await new Promise((r) => setTimeout(r, 1500));

                    const el = slideRef.current;
                    if (!el) continue;

                    const canvas = await html2canvas(el, {
                        scale: 2, useCORS: true, backgroundColor: null,
                        width: el.offsetWidth, height: el.offsetHeight,
                    });
                    if (i > 0) pdf.addPage();
                    pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 1280, 720);
                }

                pdf.save("ProductX_Company_Deck_2026.pdf");
            } catch (err) {
                console.error("PDF generation failed:", err);
            } finally {
                setIsExporting(false);
                router.replace("/resources/company-deck");
            }
        })();
    }, [isExportMode, isExporting, total, router]);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
        else document.exitFullscreen();
    }, []);
    const exitFullscreen = useCallback(() => { if (document.fullscreenElement) document.exitFullscreen(); }, []);
    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, []);
    useEffect(() => {
        if (!isFullscreen) { setUiVisible(true); return; }
        const handleMove = () => {
            setUiVisible(true);
            if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
            mouseTimerRef.current = setTimeout(() => setUiVisible(false), 3000);
        };
        handleMove();
        window.addEventListener("mousemove", handleMove);
        return () => { window.removeEventListener("mousemove", handleMove); if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current); };
    }, [isFullscreen]);
    useEffect(() => {
        if (isFullscreen && showHint) { const t = setTimeout(() => setShowHint(false), 5000); return () => clearTimeout(t); }
    }, [isFullscreen, showHint]);

    const touchRef = useRef<{ x: number; y: number } | null>(null);
    const handleTouchStart = (e: React.TouchEvent) => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchRef.current) return;
        const dx = e.changedTouches[0].clientX - touchRef.current.x;
        const dy = e.changedTouches[0].clientY - touchRef.current.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
        touchRef.current = null;
    };

    const isSectionBreak = slide.type === "section-break";
    const variants = isSectionBreak ? sectionBreakVariants : slideVariants;
    const transitionDuration = isSectionBreak ? 0.5 : 0.3;
    const fsOpacity = (visible: boolean) => isFullscreen ? { opacity: visible ? 1 : 0, transition: "opacity 0.3s" } as const : undefined;

    return (
        <>
            {!isFullscreen && <Header />}
            <div ref={containerRef}
                className={`${isFullscreen ? "bg-[oklch(0.05_0_0)] flex flex-col items-center justify-center h-screen" : "pt-24 md:pt-32 pb-12 min-h-screen bg-background"}`}
                style={isFullscreen && !uiVisible ? { cursor: "none" } : undefined}
                onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                {!isFullscreen && (
                    <div className="mx-auto max-w-[1280px] px-4 md:px-6 mb-4 md:mb-6">
                        <div className="flex items-center justify-between">
                            <Link href="/resources" className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft size={14} /><span>Resources</span>
                            </Link>
                            <div className="flex items-center gap-2 md:gap-4">
                                <span className="text-xs md:text-sm text-muted-foreground font-medium tabular-nums">{current + 1} / {total}</span>
                                <button onClick={toggleFullscreen} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-brand)]/5 transition-all">
                                    <Maximize size={14} />{ja ? "プレゼン" : "Present"}
                                </button>
                                <button onClick={toggleFullscreen} className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground"><Maximize size={14} /></button>
                            </div>
                        </div>
                    </div>
                )}
                {(!isFullscreen || uiVisible) && (
                    <div className={`flex flex-wrap items-center justify-center gap-1 mb-4 ${isFullscreen ? "absolute top-6 left-1/2 -translate-x-1/2 z-20" : "mx-auto max-w-[1280px] px-4 md:px-6"}`} style={fsOpacity(uiVisible)}>
                        {acts.map((a) => {
                            const isActive = a.id === act.id;
                            return (<button key={a.id} onClick={() => goTo(a.startSlide)}
                                className={`relative px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold tracking-wider rounded-lg transition-all duration-300 ${isActive ? `bg-gradient-to-r ${a.color} text-white shadow-md` : isFullscreen ? "text-white/40 hover:text-white/70" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                                {l(locale, a.label)}
                            </button>);
                        })}
                    </div>
                )}
                <div className={`relative ${isFullscreen ? "w-full max-w-[90vw] max-h-[80vh]" : "mx-auto max-w-[1280px] px-4 md:px-6"}`}>
                    {isFullscreen && (<div className="fixed inset-0 pointer-events-none z-10" style={{ background: "radial-gradient(ellipse at center, transparent 60%, oklch(0.05 0 0 / 0.6) 100%)" }} />)}
                    <div ref={slideRef} className={`relative w-full overflow-hidden rounded-2xl aspect-[3/4] md:aspect-[16/9] ${isFullscreen ? "rounded-none !aspect-[16/9]" : "border border-border shadow-xl"}`}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: transitionDuration, ease: [0.25, 1, 0.5, 1] }} className="absolute inset-0">
                                <SlideContent slide={slide} locale={locale} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    {(!isFullscreen || uiVisible) && (<>
                        <NavArrow dir="prev" onClick={prev} show={current > 0} isFullscreen={isFullscreen} style={fsOpacity(uiVisible)} />
                        <NavArrow dir="next" onClick={next} show={current < total - 1} isFullscreen={isFullscreen} style={fsOpacity(uiVisible)} />
                    </>)}
                </div>
                <div className={`mt-3 md:mt-4 flex items-center justify-between ${isFullscreen ? "absolute bottom-6 left-1/2 -translate-x-1/2 w-[80vw] z-20" : "mx-auto max-w-[1280px] px-4 md:px-6"}`} style={fsOpacity(uiVisible)}>
                    <div className="flex items-center gap-0.5 md:gap-1 overflow-x-auto scrollbar-none">
                        {slides.map((s, i) => {
                            const sAct = getActForSlide(i);
                            const isActStart = i === acts.find(a => a.id === sAct.id)?.startSlide;
                            return (<button key={i} onClick={() => goTo(i)}
                                className={`transition-all duration-300 rounded-full shrink-0 ${i === current ? "w-2.5 h-2.5 md:w-3 md:h-3 bg-[var(--color-brand)] scale-125" : isFullscreen ? "w-2 h-2 bg-white/30 hover:bg-white/60" : "w-2 h-2 bg-border hover:bg-muted-foreground/50"} ${isActStart && i > 0 ? "ml-1 md:ml-2" : ""}`} />);
                        })}
                    </div>
                    <div className="flex items-center gap-3">
                        {isFullscreen ? (
                            <button onClick={exitFullscreen} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white/80 transition-colors"><Minimize size={14} />ESC</button>
                        ) : (
                            <button onClick={() => setDlOpen(true)} className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium border border-[var(--color-brand-gold)]/30 text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)]/60 hover:shadow-[0_0_20px_rgba(254,198,101,0.15)] transition-all shrink-0">
                                <Download size={14} />PDF<Lock size={12} className="opacity-60" />
                            </button>
                        )}
                    </div>
                </div>
                {isFullscreen && showHint && (
                    <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs text-white/30 z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        ← → {ja ? "スライド移動" : "Navigate"}　ESC {ja ? "終了" : "Exit"}
                    </motion.div>
                )}
            </div>
            <DownloadModal isOpen={dlOpen} onClose={() => setDlOpen(false)} />

            {/* PDF Export overlay */}
            {isExporting && (() => {
                const pct = Math.round(((current + 1) / total) * 100);
                return (
                    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
                        <div className="text-center">
                            <Loader2 size={48} className="text-[var(--color-brand)] animate-spin mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {ja ? "PDF生成中..." : "Generating PDF..."}
                            </h2>
                            <p className="text-white/50 text-sm mb-8">
                                {ja
                                    ? `スライド ${current + 1} / ${total} をキャプチャ中`
                                    : `Capturing slide ${current + 1} of ${total}`}
                            </p>
                            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
                                <div
                                    className="h-full bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-gold)] rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <p className="text-white/30 text-xs mt-4 tracking-wider">{pct}%</p>
                        </div>
                    </div>
                );
            })()}

        </>
    );
}

/* ── NavArrow ── */
function NavArrow({ dir, onClick, show, isFullscreen, style }: { dir: "prev" | "next"; onClick: () => void; show: boolean; isFullscreen: boolean; style?: React.CSSProperties }) {
    if (!show) return null;
    const isPrev = dir === "prev";
    return (
        <button onClick={onClick}
            className={`absolute top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${isFullscreen
                ? `${isPrev ? "-left-16" : "-right-16"} bg-white/10 hover:bg-white/20 text-white/70 hover:text-white`
                : `${isPrev ? "left-2 md:-left-14" : "right-2 md:-right-14"} bg-card/80 md:bg-card border border-border hover:border-[var(--color-brand)]/40 text-muted-foreground hover:text-foreground shadow-lg hover:shadow-xl backdrop-blur-sm md:backdrop-blur-none`}`}
            style={style}>
            {isPrev ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
    );
}

/* ════════════════════════════════════════════════════════
   SLIDE CONTENT RENDERER (22 slides)
   ════════════════════════════════════════════════════════ */

function SlideContent({ slide, locale }: { slide: SlideData; locale: Locale }) {
    switch (slide.id) {
        case 1: return <SlideCover locale={locale} />;
        case 2: return <SlideCompanyOverview locale={locale} />;
        case 3: return <SlideVision locale={locale} />;
        case 4: return <SlideStrengths locale={locale} />;
        case 5: return <SlideStats locale={locale} />;
        case 6: return <SlidePersonas locale={locale} />;
        case 7: return <SlideSectionBreak slide={slide} locale={locale} gradient="from-[#6366f1] to-[#a855f7]" />;
        case 8: return <SlidePGStrengths locale={locale} />;
        case 9: return <SlidePGServices locale={locale} />;
        case 10: return <SlidePGPricing locale={locale} />;
        case 11: return <SlidePGPortfolio locale={locale} />;
        case 12: return <SlideSectionBreak slide={slide} locale={locale} gradient="from-[#10b981] to-[#06b6d4]" />;
        case 13: return <SlideMarketData locale={locale} />;
        case 14: return <SlideServiceMap locale={locale} />;
        case 15: return <SlideAIPricing locale={locale} />;
        case 16: return <SlideIndustryUC locale={locale} />;
        case 17: return <SlideSubsidies locale={locale} />;
        case 18: return <SlideCaseStudy locale={locale} />;
        case 19: return <SlideJourney locale={locale} />;
        case 20: return <SlideSecurity locale={locale} />;
        case 21: return <SlideCompetitors locale={locale} />;
        case 22: return <SlideCTA locale={locale} />;
        default: return <div className="w-full h-full bg-background flex items-center justify-center text-muted-foreground">Slide {slide.id}</div>;
    }
}

/* ── Shared slide wrappers ── */
function DarkSlide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`w-full h-full bg-[var(--color-brand-dark)] text-white p-4 md:p-12 flex flex-col justify-center relative overflow-hidden overflow-y-auto ${className}`}>
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
            }} />
            <div className="relative z-10 flex flex-col h-full justify-center">{children}</div>
        </div>
    );
}

/* ── Shared sub-components ── */
function SlideHeader({ tag, title, color = "var(--color-brand)" }: { tag: string; title: string; color?: string }) {
    return (
        <>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-3" style={{ color }}>{tag}</p>
            <h2 className="text-lg md:text-xl font-bold mb-4">{title}</h2>
        </>
    );
}

function StatGrid({ items, gradient }: { items: { value: string; label: { ja: string; en: string }; sub: { ja: string; en: string } }[]; gradient: string }) {
    const { locale } = useLang();
    return (
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-3" variants={stagger} initial="hidden" animate="visible">
            {items.map((s) => (
                <motion.div key={s.value} className="text-center p-3 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                    <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{s.value}</p>
                    <p className="text-[11px] text-white/70 mt-1 font-medium">{l(locale, s.label)}</p>
                    <p className="text-[9px] text-white/40 mt-0.5">{l(locale, s.sub)}</p>
                </motion.div>
            ))}
        </motion.div>
    );
}

type IconItem = { icon: React.ComponentType<{ size?: number; className?: string }>; title: { ja: string; en: string }; detail: { ja: string; en: string } };
function IconCardGrid({ items, cols = "grid-cols-2", iconBg = "bg-[var(--color-brand)]/20", iconColor = "text-[var(--color-brand)]" }: {
    items: IconItem[]; cols?: string; iconBg?: string; iconColor?: string;
}) {
    const { locale } = useLang();
    return (
        <motion.div className={`grid ${cols} gap-2 md:gap-3`} variants={stagger} initial="hidden" animate="visible">
            {items.map((s) => {
                const Icon = s.icon;
                return (
                    <motion.div key={l(locale, s.title)} className="p-2 md:p-3 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                        <div className="flex items-center gap-2 mb-1 md:mb-2">
                            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-lg ${iconBg} flex items-center justify-center`}>
                                <Icon size={14} className={iconColor} />
                            </div>
                            <h3 className="text-[11px] md:text-xs font-bold">{l(locale, s.title)}</h3>
                        </div>
                        <p className="text-[9px] md:text-[10px] text-white/50 leading-relaxed">{l(locale, s.detail)}</p>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}

type PlanItem = { name: { ja: string; en: string }; price: { ja: string; en: string }; includes: { ja: string; en: string }[]; recommended?: boolean; target?: { ja: string; en: string }; timeline?: { ja: string; en: string }; emoji?: string; examples?: { ja: string; en: string } };
function PlanGrid({ plans, accentColor = "var(--color-brand)" }: { plans: PlanItem[]; accentColor?: string }) {
    const { locale } = useLang();
    const ja = locale === "ja";
    return (
        <motion.div className="grid grid-cols-3 gap-2 md:gap-3" variants={stagger} initial="hidden" animate="visible">
            {plans.map((plan) => (
                <motion.div key={l(locale, plan.name)}
                    className={`p-2 md:p-3 rounded-xl border ${plan.recommended ? `border-[${accentColor}] bg-[${accentColor}]/5` : "border-white/10 bg-white/5"}`}
                    variants={fadeIn}>
                    {plan.recommended && <span className="text-[8px] font-bold text-[var(--color-brand-gold)] uppercase tracking-wider">Recommended</span>}
                    <div className="flex items-center gap-1.5 mt-0.5">
                        {plan.emoji && <span className="text-sm">{plan.emoji}</span>}
                        <h3 className="text-xs font-bold">{l(locale, plan.name)}</h3>
                    </div>
                    <p className="text-sm font-bold mt-1" style={{ color: accentColor }}>{l(locale, plan.price)}</p>
                    {plan.timeline && <p className="text-[9px] text-white/40 mt-1">{ja ? "期間目安:" : "Timeline:"} {l(locale, plan.timeline)}</p>}
                    <ul className="mt-1.5 space-y-0.5">
                        {plan.includes.map((inc, i) => (
                            <li key={i} className="flex items-start gap-1 text-[9px] text-white/60">
                                <CheckCircle size={9} className="shrink-0 mt-0.5" style={{ color: `${accentColor}80` }} />{l(locale, inc)}
                            </li>
                        ))}
                    </ul>
                    {plan.target && <p className="text-[8px] text-white/30 mt-1.5">{l(locale, plan.target)}</p>}
                    {plan.examples && <p className="text-[8px] text-white/30 mt-1.5">{ja ? "例" : "e.g."}: {l(locale, plan.examples)}</p>}
                </motion.div>
            ))}
        </motion.div>
    );
}

/* ── Slide 1: Cover ── */
function SlideCover({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden overflow-y-auto"
            style={{ background: "linear-gradient(135deg, var(--color-brand-dark) 0%, #2a1a4e 40%, var(--color-brand-dark) 100%)" }}>
            <motion.div className="absolute -top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full opacity-30"
                style={{ background: "radial-gradient(circle, var(--color-brand) 0%, transparent 70%)" }}
                animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute -bottom-[15%] -right-[5%] w-[300px] h-[300px] rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, var(--color-brand-gold) 0%, transparent 70%)" }}
                animate={{ x: [0, -20, 10, 0], y: [0, 15, -20, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
            <div className="relative z-10 text-center">
                <motion.div className="mb-8" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                    <span className="text-4xl md:text-6xl font-bold tracking-tight text-white">Product</span>
                    <span className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-brand)]">X</span>
                </motion.div>
                <p className="text-lg md:text-2xl font-light text-white/80 tracking-wider mb-2">Unleash Potential.</p>
                <p className="text-xs text-white/30 mt-8 tracking-wider">{ja ? "株式会社ProductX — 会社・事業紹介資料" : "ProductX Inc. — Company & Business Overview"}</p>
                <p className="text-[10px] text-white/20 mt-4 tracking-[0.2em] uppercase">Confidential — 2026.03</p>
            </div>
        </div>
    );
}

/* ── Slide 2: Company Overview (expanded) ── */
function SlideCompanyOverview({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    const info = Object.entries(companyInfo).map(([key, val]) => ({
        label: ja
            ? { name: "会社名", founded: "設立", ceo: "代表", location: "所在地", business: "事業", capital: "資本金", employees: "チーム", domains: "事業領域" }[key] || key
            : { name: "Company", founded: "Founded", ceo: "CEO", location: "Location", business: "Business", capital: "Capital", employees: "Team", domains: "Domains" }[key] || key,
        value: l(locale, val),
    }));
    return (
        <DarkSlide>
            <SlideHeader tag="COMPANY" title={ja ? "会社概要" : "Company Overview"} />
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 max-w-3xl" variants={stagger} initial="hidden" animate="visible">
                {info.map((item) => (
                    <motion.div key={item.label} className="p-2 md:p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" variants={fadeIn}>
                        <p className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-[10px] md:text-xs font-semibold leading-snug">{item.value}</p>
                    </motion.div>
                ))}
            </motion.div>
        </DarkSlide>
    );
}

/* ── Slide 3: Vision (expanded with Mission & Values) ── */
function SlideVision({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand)] mb-4">VISION</p>
            <motion.h2 className="text-xl md:text-3xl font-bold leading-[1.4] whitespace-pre-line max-w-3xl mb-4"
                style={{ background: "linear-gradient(135deg, var(--color-brand-active) 0%, var(--color-brand) 50%, var(--color-brand-gold) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", color: "transparent" }}>
                {ja ? "プロダクトの力で、\nまだ見ぬ未来を創る。" : "Creating new futures\nthrough the power of products."}
            </motion.h2>
            <div className="space-y-3 max-w-2xl">
                <div className="p-3 rounded-xl border border-white/10 bg-white/5">
                    <p className="text-[10px] text-[var(--color-brand-gold)] uppercase tracking-wider mb-1">MISSION</p>
                    <p className="text-xs font-semibold mb-1">{l(locale, visionDetails.mission)}</p>
                    <p className="text-[10px] text-white/50 leading-relaxed">{l(locale, visionDetails.missionDesc)}</p>
                </div>
                <div className="p-3 rounded-xl border border-white/10 bg-white/5">
                    <p className="text-[10px] text-[var(--color-brand-gold)] uppercase tracking-wider mb-1">VALUES</p>
                    <ul className="space-y-1">
                        {visionDetails.values.map((v, i) => (
                            <li key={i} className="flex items-start gap-2 text-[10px] md:text-[11px] text-white/70">
                                <CheckCircle size={12} className="text-[var(--color-brand)]/60 shrink-0 mt-0.5" />
                                {l(locale, v)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </DarkSlide>
    );
}

/* ── Slide 4: Strengths ── */
function SlideStrengths({ locale }: { locale: Locale }) {
    return (
        <DarkSlide>
            <SlideHeader tag="STRENGTHS" title={locale === "ja" ? "ProductXの4つの強み" : "Four Key Strengths"} />
            <IconCardGrid items={strengths} />
        </DarkSlide>
    );
}

/* ── Slide 5: Stats ── */
function SlideStats({ locale }: { locale: Locale }) {
    return (
        <DarkSlide>
            <SlideHeader tag="RESULTS" title={locale === "ja" ? "実績サマリー" : "Track Record"} />
            <StatGrid items={stats} gradient="from-[var(--color-brand)] to-[var(--color-brand-gold)]" />
        </DarkSlide>
    );
}

/* ── Slide 6: Personas (NEW) ── */
function SlidePersonas({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="PAIN POINTS" title={ja ? "こんな課題、ありませんか？" : "Sound Familiar?"} />
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3" variants={stagger} initial="hidden" animate="visible">
                {deckPersonas.map((p) => {
                    const Icon = p.icon;
                    return (
                        <motion.div key={l(locale, p.role)} className={`p-3 rounded-xl border-2 ${p.color} bg-white/5`} variants={fadeIn}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center">
                                    <Icon size={14} className="text-[var(--color-brand)]" />
                                </div>
                                <span className="text-[11px] font-bold">{l(locale, p.role)}</span>
                            </div>
                            <p className="text-[10px] text-white/60 leading-relaxed italic border-l-2 border-[var(--color-brand-gold)] pl-2 mb-2">{l(locale, p.pain)}</p>
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--color-brand)]">
                                <ArrowRight size={12} /><span>{l(locale, p.solution)}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

/* ── Slide 7: Section Break (PG) ── */
function SlideSectionBreak({ slide, gradient, locale }: { slide: SlideData; gradient: string; locale: Locale }) {
    return (
        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-4 md:p-8 text-center overflow-y-auto`}>
            <motion.h2 className="text-3xl md:text-6xl font-bold text-white mb-4"
                initial={{ filter: "blur(10px)", opacity: 0 }} animate={{ filter: "blur(0px)", opacity: 1 }} transition={{ duration: 0.6 }}>
                {l(locale, slide.title)}
            </motion.h2>
            {slide.subtitle && (
                <motion.p className="text-base md:text-xl text-white/70 max-w-xl"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                    {l(locale, slide.subtitle)}
                </motion.p>
            )}
        </div>
    );
}

/* ── Slide 8: PG Strengths ── */
function SlidePGStrengths({ locale }: { locale: Locale }) {
    return (
        <DarkSlide>
            <SlideHeader tag="WHY US" title={locale === "ja" ? "3つの強み" : "Three Core Strengths"} />
            <IconCardGrid items={pgStrengths} cols="grid-cols-3" iconBg="bg-[#6366f1]/20" iconColor="text-[#a78bfa]" />
        </DarkSlide>
    );
}

/* ── Slide 9: PG Services (expanded with catDesc) ── */
function SlidePGServices({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="SERVICES" title={ja ? "サービスカタログ" : "Service Catalog"} />
            <motion.div className="grid grid-cols-3 gap-2 md:gap-3" variants={stagger} initial="hidden" animate="visible">
                {pgServices.map((cat) => (
                    <motion.div key={l(locale, cat.cat)} className="p-2 md:p-3 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                        <h3 className="text-[11px] font-bold text-[#a78bfa] uppercase tracking-wider mb-1">{l(locale, cat.cat)}</h3>
                        <p className="text-[9px] text-white/40 mb-2 leading-relaxed">{l(locale, cat.catDesc)}</p>
                        <ul className="space-y-1">
                            {cat.items.map((item) => (
                                <li key={l(locale, item)} className="flex items-start gap-1.5 text-[10px] text-white/70">
                                    <CheckCircle size={10} className="text-[#a78bfa]/60 shrink-0 mt-0.5" />
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

/* ── Slide 10: PG Pricing ── */
function SlidePGPricing({ locale }: { locale: Locale }) {
    return (
        <DarkSlide>
            <SlideHeader tag="PRICING" title={locale === "ja" ? "料金体系" : "Pricing"} />
            <PlanGrid plans={pgPlans} />
        </DarkSlide>
    );
}

/* ── Slide 11: PG Portfolio (expanded with records) ── */
function SlidePGPortfolio({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="PORTFOLIO" title={ja ? "対応業界・開発実績" : "Industries & Track Record"} />
            <motion.div className="grid grid-cols-3 md:grid-cols-6 gap-2" variants={stagger} initial="hidden" animate="visible">
                {pgIndustries.map((ind) => {
                    const Icon = ind.icon;
                    return (
                        <motion.div key={l(locale, ind.label)} className="flex flex-col items-center p-2 md:p-3 rounded-xl border border-white/10 bg-white/5 text-center" variants={fadeIn}>
                            <Icon size={18} className="text-[#a78bfa] mb-1.5" />
                            <p className="text-[10px] font-medium text-white/80 mb-0.5">{l(locale, ind.label)}</p>
                            <p className="text-[8px] text-white/40">{l(locale, ind.record)}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

/* ── Slide 13: Market Data ── */
function SlideMarketData({ locale }: { locale: Locale }) {
    return (
        <DarkSlide>
            <SlideHeader tag="MARKET" title={locale === "ja" ? "なぜ今、AI DXなのか" : "Why AI DX Now?"} color="#10b981" />
            <StatGrid items={marketStats} gradient="from-[#10b981] to-[#06b6d4]" />
        </DarkSlide>
    );
}

/* ── Slide 14: Service Map (expanded) ── */
function SlideServiceMap({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="APPROACH" title={ja ? "3つのアプローチ" : "Three Approaches"} color="#10b981" />
            <motion.div className="grid grid-cols-3 gap-2 md:gap-3 mb-3" variants={stagger} initial="hidden" animate="visible">
                {aiApproaches.map((a, i) => (
                    <motion.div key={l(locale, a.label)} className="p-2 md:p-3 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white bg-gradient-to-r ${i === 0 ? "from-emerald-500 to-emerald-600" : i === 1 ? "from-sky-500 to-sky-600" : "from-violet-500 to-violet-600"}`}>
                                Lv.{i + 1}
                            </span>
                            <h3 className="text-[11px] font-bold text-[#10b981]">{l(locale, a.label)}</h3>
                        </div>
                        <p className="text-[9px] text-white/50 leading-relaxed">{l(locale, a.desc)}</p>
                    </motion.div>
                ))}
            </motion.div>
            <div className="p-2 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
                <p className="text-[10px] text-[#10b981]">
                    {ja ? "💡 まずは「代行」で成果を実感 → 「導入」で仕組み化 → 「開発」で業務変革へ。段階的に進められます。" : "💡 Start with outsourcing → build internal systems → transform operations. Step by step."}
                </p>
            </div>
        </DarkSlide>
    );
}

/* ── Slide 15: AI Pricing ── */
function SlideAIPricing({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="PRICING" title={ja ? "料金体系" : "Pricing"} color="#10b981" />
            <PlanGrid plans={aiPlans} accentColor="#10b981" />
            <div className="mt-2 p-2 rounded-lg bg-[var(--color-brand-gold)]/10 border border-[var(--color-brand-gold)]/20">
                <p className="text-[10px] text-[var(--color-brand-gold)] font-medium">
                    💰 {ja ? "補助金活用で実質負担を大幅軽減 → 詳しくは次のスライドへ" : "Subsidies can significantly reduce costs → See next slide for details"}
                </p>
            </div>
        </DarkSlide>
    );
}

/* ── Slide 16: Industry UC (expanded) ── */
function SlideIndustryUC({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="USE CASES" title={ja ? "業界別ユースケース" : "Industry Use Cases"} color="#10b981" />
            <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-2" variants={stagger} initial="hidden" animate="visible">
                {aiIndustryUC.map((uc) => {
                    const Icon = uc.icon;
                    return (
                        <motion.div key={l(locale, uc.industry)} className="p-2 md:p-3 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                            <div className="flex items-center gap-1.5 mb-1">
                                <Icon size={14} className="text-[#10b981]" />
                                <h3 className="text-[11px] font-bold">{l(locale, uc.industry)}</h3>
                            </div>
                            <p className="text-[10px] text-white/70 font-medium mb-0.5">{l(locale, uc.uc)}</p>
                            <p className="text-[9px] text-white/40 leading-relaxed mb-1">{l(locale, uc.detail)}</p>
                            <p className="text-[9px] text-emerald-400 font-medium">→ {l(locale, uc.impact)}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

/* ── Slide 17: Subsidies (NEW) ── */
function SlideSubsidies({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="SUBSIDIES" title={ja ? "補助金制度の詳細" : "Subsidy Programs"} color="#10b981" />
            <motion.div className="grid grid-cols-3 gap-2 md:gap-3 mb-3" variants={stagger} initial="hidden" animate="visible">
                {deckSubsidies.map((s) => (
                    <motion.div key={l(locale, s.name)} className="p-2 md:p-3 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                        <h3 className="text-[10px] font-bold mb-1">{l(locale, s.name)}</h3>
                        <p className="text-lg font-bold bg-gradient-to-r from-[#10b981] to-[#06b6d4] bg-clip-text text-transparent">{l(locale, s.max)}</p>
                        <div className="flex justify-between text-[9px] text-white/50 mt-1 mb-1.5">
                            <span>{ja ? "補助率:" : "Rate:"} {l(locale, s.rate)}</span>
                        </div>
                        <p className="text-[9px] text-white/40 leading-relaxed">{l(locale, s.detail)}</p>
                        <p className="text-[8px] text-white/30 mt-1">{l(locale, s.target)}</p>
                    </motion.div>
                ))}
            </motion.div>
            <div className="p-2 rounded-lg bg-[var(--color-brand-gold)]/10 border border-[var(--color-brand-gold)]/20">
                <p className="text-[10px] text-[var(--color-brand-gold)] font-medium">{l(locale, subsidyExample)}</p>
            </div>
        </DarkSlide>
    );
}

/* ── Slide 18: Case Study (expanded) ── */
function SlideCaseStudy({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="CASE STUDY" title={ja ? "導入事例" : "Case Studies"} color="var(--color-brand-gold)" />
            <motion.div className="grid grid-cols-2 gap-2 md:gap-3" variants={stagger} initial="hidden" animate="visible">
                {caseStudyDetails.map((cs) => (
                    <motion.div key={l(locale, cs.title)} className="p-2 md:p-4 rounded-xl border border-white/10 bg-white/5" variants={fadeIn}>
                        <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">{l(locale, cs.label)}</p>
                        <h3 className="text-xs font-bold mb-2">{l(locale, cs.title)}</h3>
                        <p className="text-[9px] text-white/50 leading-relaxed mb-2">{l(locale, cs.bg)}</p>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <p className="text-[9px] text-white/40 mb-0.5">Before</p>
                                <p className="text-[10px] text-white/60">{l(locale, cs.before)}</p>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div className="flex-1">
                                <p className="text-[9px] text-[var(--color-brand-gold)] mb-0.5">After</p>
                                <p className="text-[10px] text-white/80 font-medium">{l(locale, cs.after)}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </DarkSlide>
    );
}

/* ── Slide 19: Journey (NEW) ── */
function SlideJourney({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="JOURNEY" title={ja ? "導入の流れ" : "How It Works"} color="var(--color-brand-gold)" />
            <motion.div className="grid grid-cols-4 gap-2" variants={stagger} initial="hidden" animate="visible">
                {deckJourneySteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <motion.div key={i} className="relative p-2 md:p-3 rounded-xl border border-white/10 bg-white/5 text-center" variants={fadeIn}>
                            <span className="absolute -top-2 -left-1 w-5 h-5 rounded-full bg-[var(--color-brand)] text-white text-[9px] font-bold flex items-center justify-center">{i + 1}</span>
                            <div className="w-7 h-7 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center mx-auto mb-2">
                                <Icon size={14} className="text-[var(--color-brand)]" />
                            </div>
                            <h3 className="text-[10px] font-bold mb-1">{l(locale, step.title)}</h3>
                            <p className="text-[9px] text-white/50 leading-relaxed">{l(locale, step.desc)}</p>
                            {i < deckJourneySteps.length - 1 && <ChevronR size={14} className="absolute top-1/2 -right-2 text-white/20 hidden md:block" />}
                        </motion.div>
                    );
                })}
            </motion.div>
        </DarkSlide>
    );
}

/* ── Slide 20: Security ── */
function SlideSecurity({ locale }: { locale: Locale }) {
    return (
        <DarkSlide>
            <SlideHeader tag="SECURITY" title={locale === "ja" ? "セキュリティ・安心の取り組み" : "Security & Trust"} color="var(--color-brand-gold)" />
            <IconCardGrid items={securityItems} cols="grid-cols-3" iconBg="bg-[var(--color-brand-gold)]/10" iconColor="text-[var(--color-brand-gold)]" />
        </DarkSlide>
    );
}

/* ── Slide 21: Competitors (NEW) ── */
function SlideCompetitors({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <DarkSlide>
            <SlideHeader tag="COMPARISON" title={ja ? "ProductXが選ばれる理由" : "Why Choose ProductX"} color="var(--color-brand-gold)" />
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <table className="w-full text-[10px] md:text-[11px]">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left py-2 px-2 text-white/40 font-medium">{ja ? "比較軸" : "Aspect"}</th>
                            <th className="text-left py-2 px-2 text-white/40 font-medium">{ja ? "他社" : "Others"}</th>
                            <th className="text-left py-2 px-2 text-[var(--color-brand)] font-bold">ProductX</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deckCompetitors.map((c, i) => (
                            <tr key={i} className="border-b border-white/5">
                                <td className="py-2 px-2 text-white/60 font-medium">{l(locale, c.name)}<br /><span className="text-[8px] text-white/30">{l(locale, c.aspect)}</span></td>
                                <td className="py-2 px-2 text-white/40">{l(locale, c.them)}</td>
                                <td className="py-2 px-2 text-[var(--color-brand)] font-medium">{l(locale, c.us)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </DarkSlide>
    );
}

/* ── Slide 22: CTA ── */
function SlideCTA({ locale }: { locale: Locale }) {
    const ja = locale === "ja";
    return (
        <div className="w-full h-full bg-[var(--color-brand-dark)] text-white flex flex-col items-center justify-center p-4 md:p-8 text-center relative overflow-hidden overflow-y-auto">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(254,198,101,0.08) 0%, transparent 60%)" }} />
            <div className="relative z-10">
                <motion.p className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-brand-gold)] mb-6"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>NEXT STEP</motion.p>
                <motion.h2 className="text-2xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    {ja ? "まずは30分の無料相談から" : "Start with a free 30-min consultation"}
                </motion.h2>
                <motion.p className="text-sm text-white/50 mb-8 max-w-md"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    {ja ? "御社の課題に合わせた最適なソリューションをご提案します。サンプル成果物も無料でお渡しします。お気軽にお問い合わせください。"
                        : "We'll propose the best solution tailored to your challenges with free sample deliverables. Feel free to reach out."}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <Link href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] font-bold text-sm shadow-[0_0_30px_rgba(254,198,101,0.3)] hover:shadow-[0_0_50px_rgba(254,198,101,0.5)] hover:-translate-y-0.5 transition-all duration-300">
                        {ja ? "無料相談を予約する" : "Book a Free Consultation"}<ArrowRight size={16} />
                    </Link>
                </motion.div>
                <motion.p className="text-[10px] text-white/20 mt-8 tracking-[0.15em]"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>productx.jp/contact</motion.p>
            </div>
        </div>
    );
}
