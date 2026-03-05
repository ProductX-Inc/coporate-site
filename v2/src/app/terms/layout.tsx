import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "利用規約",
    description: "株式会社ProductXの利用規約。当サイトのご利用条件をご確認ください。",
    alternates: { canonical: "https://productx.jp/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
