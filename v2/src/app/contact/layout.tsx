import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "お問い合わせ",
    description: "株式会社ProductXへのお問い合わせ。プロダクト開発・DX支援のご相談はこちらから。",
    alternates: { canonical: "https://productx.jp/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
