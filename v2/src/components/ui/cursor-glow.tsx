"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only on desktop
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const onMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!visible) setVisible(true);
        };
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
        };
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
        >
            <div
                className="absolute w-[300px] h-[300px] rounded-full"
                style={{
                    left: pos.x - 150,
                    top: pos.y - 150,
                    background: "radial-gradient(circle, oklch(0.55 0.25 270 / 6%) 0%, transparent 70%)",
                    transition: "left 0.15s ease-out, top 0.15s ease-out",
                }}
            />
        </div>
    );
}
