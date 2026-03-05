import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ニュース",
    description: "株式会社ProductXの最新ニュース・プレスリリース・お知らせ一覧。",
    alternates: { canonical: "https://productx.jp/news" },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
