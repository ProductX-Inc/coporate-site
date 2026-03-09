import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "事業資料 | Resources",
    description: "ProductXの会社概要・事業紹介資料をご覧いただけます。Partner Growth（プロダクト開発支援）とAI DX（業務変革支援）の詳細をWebスライドで閲覧、またはPDFでダウンロード可能です。",
    alternates: { canonical: "https://productx.jp/resources" },
    openGraph: {
        title: "事業資料 | ProductX",
        description: "Partner GrowthとAI DXの事業紹介資料をWeb / PDFで閲覧・ダウンロード。",
        url: "https://productx.jp/resources",
        type: "website",
    },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
