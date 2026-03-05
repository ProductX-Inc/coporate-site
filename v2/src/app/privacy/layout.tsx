import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "プライバシーポリシー",
    description: "株式会社ProductXのプライバシーポリシー。個人情報の取り扱いについてご説明します。",
    alternates: { canonical: "https://productx.jp/privacy" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
