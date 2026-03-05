"use client";

import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { PageTransition } from "@/components/ui/page-transition";
import { CommandPalette } from "@/components/ui/command-palette";
import { AccessibilityPanel } from "@/components/ui/accessibility-panel";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { type ReactNode } from "react";

export function GlobalEffects({ children }: { children: ReactNode }) {
    return (
        <>
            <ScrollProgress />
            <CursorGlow />
            <CommandPalette />
            <AccessibilityPanel />
            <PageTransition>
                {children}
            </PageTransition>
            <ScrollToTop />
            <CookieConsent />
        </>
    );
}
