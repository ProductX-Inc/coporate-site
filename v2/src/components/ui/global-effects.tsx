"use client";

import dynamic from "next/dynamic";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { type ReactNode } from "react";

/* Lazy-loaded UI components (not needed for initial paint) */
const lazy = (path: string, name: string) =>
    dynamic(() => import(`@/components/ui/${path}`).then((m) => m[name]), { ssr: false });

const CursorGlow = lazy("cursor-glow", "CursorGlow");
const CommandPalette = lazy("command-palette", "CommandPalette");
const AccessibilityPanel = lazy("accessibility-panel", "AccessibilityPanel");
const CookieConsent = lazy("cookie-consent", "CookieConsent");
const AiChatbot = lazy("ai-chatbot", "AiChatbot");

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
