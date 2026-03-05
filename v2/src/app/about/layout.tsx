import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "会社概要",
    description: "株式会社ProductXの会社概要。ミッション・バリュー、メンバー情報、技術スタック、沿革をご紹介します。",
    alternates: { canonical: "https://productx.jp/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
