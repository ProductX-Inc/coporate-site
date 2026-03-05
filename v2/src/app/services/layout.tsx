import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "サービス",
    description: "株式会社ProductXのサービス一覧。プロダクト開発、DX支援、グロースコンサルティング、技術顧問、AIインテグレーションなど。",
    alternates: { canonical: "https://productx.jp/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
