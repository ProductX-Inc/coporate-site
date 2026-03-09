import { getAllArticles, serviceAreas, isValidArea } from "@/lib/articles";
import { AreaArticlesClient } from "./client";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return serviceAreas.map((a) => ({ area: a.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }) {
    const { area } = await params;
    const info = serviceAreas.find((a) => a.key === area);
    if (!info) return { title: "Articles" };
    return {
        title: `${info.label.ja} Articles`,
        description: info.description.ja,
        alternates: { canonical: `https://productx.jp/articles/${area}` },
    };
}

export default async function AreaArticlesPage({ params }: { params: Promise<{ area: string }> }) {
    const { area } = await params;
    if (!isValidArea(area)) notFound();

    return (
        <AreaArticlesClient
            area={serviceAreas.find((a) => a.key === area)!}
            articles={getAllArticles(area)}
        />
    );
}
