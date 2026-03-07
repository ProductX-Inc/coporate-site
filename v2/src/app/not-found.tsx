"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLang } from "@/components/lang-provider";

export default function NotFound() {
    const { t } = useLang();

    return (
        <>
            <Header />
            <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Aurora Mesh Background */}
                <div className="absolute inset-0 bg-[var(--color-brand-dark)]">
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.45 0.25 270 / 60%), transparent), radial-gradient(ellipse 60% 50% at 30% 60%, oklch(0.4 0.2 300 / 40%), transparent), radial-gradient(ellipse 50% 40% at 70% 30%, oklch(0.6 0.15 85 / 30%), transparent)",
                        }}
                    />
                </div>

                <div className="relative z-10 text-center px-6">
                    {/* 404 Large Number */}
                    <h1
                        className="text-[120px] md:text-[200px] font-black leading-none mb-4 select-none"
                        style={{
                            background: "linear-gradient(135deg, var(--color-brand-active) 0%, var(--color-brand) 50%, oklch(0.7 0.15 85) 100%)",
                            backgroundSize: "200% 200%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent",
                            animation: "gradient-shift 6s ease-in-out infinite",
                        }}
                    >
                        404
                    </h1>

                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {t("notfound.title")}
                    </h2>
                    <p className="text-white/50 text-sm md:text-base mb-10 max-w-md mx-auto whitespace-pre-line">
                        {t("notfound.desc")}
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-brand-active)] text-white font-semibold text-sm hover:bg-[var(--color-brand)] transition-colors duration-300 shadow-lg"
                        >
                            {t("notfound.home")}
                        </Link>
                        <button
                            onClick={() => typeof window !== "undefined" && window.history.back()}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/10 transition-colors duration-300"
                        >
                            {t("notfound.back")}
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
