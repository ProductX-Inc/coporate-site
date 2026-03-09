import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "導入事例",
    description:
        "ProductXのAI DX・パートナーグロース事業による導入事例をご紹介。業種別・サービス別の成果をBefore/Afterと数字で確認できます。",
    alternates: { canonical: "https://productx.jp/case-studies" },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
