import { type ReactNode, type CSSProperties, type ElementType } from "react";

const gradientStyle: CSSProperties = {
    background: "linear-gradient(135deg, var(--color-brand-active) 0%, var(--color-brand) 50%, oklch(0.7 0.15 85) 100%)",
    backgroundSize: "200% 200%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    animation: "gradient-shift 6s ease-in-out infinite",
};

const subtleStyle: CSSProperties = {
    background: "linear-gradient(135deg, var(--color-brand-active), var(--color-brand))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
};

interface GradientTextProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
    subtle?: boolean;
}

export function GradientText({ children, as: Tag = "span", className = "", subtle = false }: GradientTextProps) {
    return (
        <Tag className={className} style={subtle ? subtleStyle : gradientStyle}>
            {children}
        </Tag>
    );
}
