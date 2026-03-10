import type { Metadata } from "next";
import { buildFaqJsonLd } from "@/lib/seo";

const faqJsonLd = buildFaqJsonLd([
    { q: "AI DXは技術的な知識がなくても依頼できますか？", a: "はい、技術的な知識は不要です。課題のヒアリングから最適なAIソリューションのご提案まで、わかりやすくご説明しながら進めます。" },
    { q: "無料のAI診断とは何ですか？", a: "5分程度のヒアリングで御社の業務課題を把握し、最適なAIソリューションを3つご提案します。さらに、サンプル成果物も無料でお渡しします。" },
    { q: "トライアル期間中に効果が出なかった場合は？", a: "トライアル開始前にKPIを書面で合意します。基準未達の場合は無料ですので、リスクゼロでお試しいただけます。" },
    { q: "機密データを渡しても大丈夫ですか？", a: "はい、NDA（秘密保持契約）の締結が可能です。また、エンタープライズ環境ではデータがAI学習に使われないため安心です。" },
    { q: "導入後のサポートはありますか？", a: "はい、月次数値レポートの自動送付・四半期ごとのレビュー会・新ユースケースの提案など、継続的なサポートを提供します。" },
    { q: "補助金は使えますか？", a: "はい、デジタル化・AI導入補助金（最大450万円）やものづくり補助金（最大1,250万円）が利用可能です。申請サポートも行っております。" },
]);

export const metadata: Metadata = {
    title: "AI DX サービス",
    description: "中小企業のための実践型AIソリューション。代行・導入・開発の3つのアプローチで、業務効率の飛躍的改善を実現します。株式会社ProductXのAI DX支援サービス。",
    alternates: { canonical: "https://productx.jp/services/ai-dx" },
    openGraph: {
        title: "AI DX サービス | ProductX",
        description: "中小企業のための実践型AIソリューション。代行・導入・開発の3つのアプローチで、業務効率の飛躍的改善を実現します。",
        url: "https://productx.jp/services/ai-dx",
        type: "website",
    },
};

export default function AiDxLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            {children}
        </>
    );
}
