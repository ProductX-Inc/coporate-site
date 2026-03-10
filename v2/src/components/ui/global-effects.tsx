"use client";

import dynamic from "next/dynamic";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { type ReactNode } from "react";

/* Heavy components — lazy-loaded after initial paint */
const CursorGlow = dynamic(
    () => import("@/components/ui/cursor-glow").then((m) => m.CursorGlow),
    { ssr: false }
);
const CommandPalette = dynamic(
    () => import("@/components/ui/command-palette").then((m) => m.CommandPalette),
    { ssr: false }
);
const AccessibilityPanel = dynamic(
    () => import("@/components/ui/accessibility-panel").then((m) => m.AccessibilityPanel),
    { ssr: false }
);
const CookieConsent = dynamic(
    () => import("@/components/ui/cookie-consent").then((m) => m.CookieConsent),
    { ssr: false }
);
const AiChatbot = dynamic(
    () => import("@/components/ui/ai-chatbot").then((m) => m.AiChatbot),
    { ssr: false }
);

export function GlobalEffects({ children }: { children: ReactNode }) {
    return (
        <>
            <ScrollProgress />
            <CursorGlow />
            <CommandPalette />
            <AccessibilityPanel />
            {children}
            <ScrollToTop />
            <CookieConsent />
            <AiChatbot />
        </>
    );
}
