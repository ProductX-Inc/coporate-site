/** Article-related constants shared between server and client components. */

export type ServiceArea = "ai-dx" | "partner-growth";

export interface ServiceAreaInfo {
    key: ServiceArea;
    label: { ja: string; en: string };
    description: { ja: string; en: string };
    color: string;
}

export const serviceAreas: ServiceAreaInfo[] = [
    {
        key: "ai-dx",
        label: { ja: "AI DX", en: "AI DX" },
        description: {
            ja: "AI・生成AIを活用した業務効率化やDX推進に関するナレッジをお届けします。",
            en: "Insights on leveraging AI and generative AI for business efficiency and DX.",
        },
        color: "from-[#696CFF] to-[#4A48DE]",
    },
    {
        key: "partner-growth",
        label: { ja: "Partner Growth", en: "Partner Growth" },
        description: {
            ja: "プロダクト開発・グロース支援に関するナレッジをお届けします。",
            en: "Insights on product development and growth support.",
        },
        color: "from-[#FEC665] to-[#E5A844]",
    },
];

export const validAreaKeys: ServiceArea[] = serviceAreas.map((a) => a.key);

export function isValidArea(area: string): area is ServiceArea {
    return validAreaKeys.includes(area as ServiceArea);
}

export interface ArticleMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    author: string;
}

export interface Article extends ArticleMeta {
    content: string;
}

export const categoryLabels: Record<string, { ja: string; en: string }> = {
    sales: { ja: "営業・セールス", en: "Sales" },
    marketing: { ja: "マーケティング・広報", en: "Marketing" },
    backoffice: { ja: "バックオフィス・管理", en: "Back Office" },
    "dx-strategy": { ja: "全社DX戦略", en: "DX Strategy" },
    trend: { ja: "AI DXトレンド", en: "AI DX Trends" },
    "product-dev": { ja: "プロダクト開発", en: "Product Development" },
    "ui-ux": { ja: "UI/UXデザイン", en: "UI/UX Design" },
    growth: { ja: "グロース", en: "Growth" },
    strategy: { ja: "戦略・コンサル", en: "Strategy & Consulting" },
};

export const categoryColors: Record<string, string> = {
    sales: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    marketing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    backoffice: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "dx-strategy": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    trend: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "product-dev": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    "ui-ux": "bg-pink-500/10 text-pink-400 border-pink-500/20",
    growth: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    strategy: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};
