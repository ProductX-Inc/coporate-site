import type { Metadata } from "next";

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "最低契約期間はありますか？",
            acceptedAnswer: {
                "@type": "Answer",
                text: "案件の規模や内容に応じて柔軟に対応しております。最短1ヶ月のスポット支援から、中長期のパートナーシップまで幅広く承ります。",
            },
        },
        {
            "@type": "Question",
            name: "開発だけでなく、企画・戦略から相談できますか？",
            acceptedAnswer: {
                "@type": "Answer",
                text: "もちろんです。ProductXの強みは上流のプロダクト戦略から実装・グロースまで一気通貫で支援できることです。「何を作るべきか」の段階からご相談いただけます。",
            },
        },
        {
            "@type": "Question",
            name: "リモートでの対応は可能ですか？",
            acceptedAnswer: {
                "@type": "Answer",
                text: "はい、フルリモートでの対応が可能です。オンラインミーティングやチャットツールを活用し、スムーズなコミュニケーションを実現します。",
            },
        },
        {
            "@type": "Question",
            name: "NDAの締結は可能ですか？",
            acceptedAnswer: {
                "@type": "Answer",
                text: "はい、プロジェクト開始前にNDA（秘密保持契約）の締結が可能です。情報管理には万全の体制を整えております。",
            },
        },
        {
            "@type": "Question",
            name: "料金体系を教えてください。",
            acceptedAnswer: {
                "@type": "Answer",
                text: "プロジェクトの規模・内容に応じたお見積もりを作成いたします。準委任契約（月額）と請負契約（固定）の両方に対応しております。",
            },
        },
    ],
};

export const metadata: Metadata = {
    title: "Partner Growth サービス",
    description: "業界トップクラスの実績を持つクリエイター集団による、企画・設計・開発・グロースまで一気通貫の伴走支援。株式会社ProductXのプロダクト開発支援サービス。",
    alternates: { canonical: "https://productx.jp/services/partner-growth" },
    openGraph: {
        title: "Partner Growth サービス | ProductX",
        description: "業界トップクラスの実績を持つクリエイター集団による、企画・設計・開発・グロースまで一気通貫の伴走支援。",
        url: "https://productx.jp/services/partner-growth",
        type: "website",
    },
};

export default function PartnerGrowthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            {children}
        </>
    );
}
