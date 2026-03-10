"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/magnetic-button";

const BASE_CLS =
    "group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-brand-active)] text-white font-semibold text-base hover:bg-[var(--color-brand)] transition-all duration-300 shadow-lg hover:shadow-[0_10px_40px_rgba(105,108,255,0.35),0_0_60px_rgba(254,198,101,0.15)] overflow-hidden";

const SHIMMER = (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
);

interface PrimaryCTAProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    magnetic?: boolean;
}

export function PrimaryCTA({ href, children, className = "", magnetic = false }: PrimaryCTAProps) {
    const mergedCls = `${BASE_CLS} ${className}`.trim();

    const inner = (
        <>
            {SHIMMER}
            <span className="relative z-10 flex items-center gap-2">
                {children} <ArrowRight size={18} />
            </span>
        </>
    );

    if (magnetic) {
        return (
            <Link href={href}>
                <MagneticButton className={mergedCls}>{inner}</MagneticButton>
            </Link>
        );
    }

    return (
        <Link href={href} className={mergedCls}>
            {inner}
        </Link>
    );
}
