import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ツール",
    description:
        "ProductXの無料ツール。開発費用の概算見積もりシミュレーターやAI導入効果シミュレーターをご利用いただけます。",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
