"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useLang } from "@/components/lang-provider";
import { fadeUp } from "@/lib/animations";



function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });
    const hasAnimated = useRef(false);

    const animate = useCallback(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo for snappy feel
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * end);
            setCount(current);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [end, duration]);

    useEffect(() => {
        if (inView) animate();
    }, [inView, animate]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
    { key: "projects", value: 50, suffix: "+", ja: "プロジェクト参画数", en: "Projects Delivered" },
    { key: "enterprise", value: 100, suffix: "%", ja: "大手IT出身率", en: "From Top IT Companies" },
    { key: "satisfaction", value: 98, suffix: "%", ja: "クライアント満足度", en: "Client Satisfaction" },
    { key: "speed", value: 5, suffix: "x", ja: "開発スピード", en: "Development Speed" },
];

export function StatsSection() {
    const { locale } = useLang();

    return (
        <section className="py-20 md:py-28 bg-background">
            <div className="mx-auto max-w-[1280px] px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.key}
                            className="text-center md:text-left"
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={i * 0.15} variants={fadeUp}
                        >
                            <p className="text-3xl md:text-5xl font-bold mb-2" style={{
                                background: "linear-gradient(135deg, var(--color-brand-active) 0%, var(--color-brand) 50%, oklch(0.7 0.15 85) 100%)",
                                backgroundSize: "200% 200%",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent",
                                animation: "gradient-shift 6s ease-in-out infinite",
                            }}>
                                <CountUp end={stat.value} suffix={stat.suffix} />
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {locale === "ja" ? stat.ja : stat.en}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
