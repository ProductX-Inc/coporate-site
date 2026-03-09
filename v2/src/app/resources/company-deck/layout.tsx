import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "会社・事業紹介 | Company Deck",
    description: "ProductXの会社概要、Partner Growth（プロダクト開発支援）、AI DX（業務変革支援）事業を紹介するプレゼンテーション資料です。全18スライドでProductXの強みと実績をご覧いただけます。",
    alternates: { canonical: "https://productx.jp/resources/company-deck" },
    openGraph: {
        title: "会社・事業紹介 | ProductX Company Deck",
        description: "ProductXの全18スライドの事業紹介プレゼンテーション。Partner GrowthとAI DXの詳細をご覧ください。",
        url: "https://productx.jp/resources/company-deck",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function CompanyDeckLayout({ children }: { children: React.ReactNode }) {
    return children;
}
