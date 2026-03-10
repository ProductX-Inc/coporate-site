import { getAllArticles, getArticleBySlug, markdownToHtml, serviceAreas, isValidArea } from "@/lib/articles";
import { buildArticleJsonLd, BASE } from "@/lib/seo";
import { ArticleDetailClient } from "./client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return serviceAreas.flatMap((a) =>
        getAllArticles(a.key).map((article) => ({ area: a.key, slug: article.slug }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ area: string; slug: string }> }): Promise<Metadata> {
    const { area, slug } = await params;
    if (!isValidArea(area)) return { title: "記事が見つかりません" };
    const article = getArticleBySlug(area, slug);
    if (!article) return { title: "記事が見つかりません" };
    const isCeo = article.category === "ceo-column";
    const title = isCeo ? `${article.title} | ProductX CEO` : article.title;
    const url = `${BASE}/articles/${area}/${slug}`;
    return {
        title,
        description: article.description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description: article.description,
            url,
            type: "article",
            publishedTime: article.date,
            tags: article.tags,
            ...(isCeo && { authors: ["上野健太 / ProductX CEO"] }),
        },
    };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ area: string; slug: string }> }) {
    const { area, slug } = await params;
    if (!isValidArea(area)) notFound();

    const article = getArticleBySlug(area, slug);
    if (!article) notFound();

    const areaInfo = serviceAreas.find((a) => a.key === area)!;
    const isCeo = article.category === "ceo-column";

    const jsonLd = buildArticleJsonLd({
        title: article.title,
        description: article.description,
        date: article.date,
        tags: article.tags,
        url: `${BASE}/articles/${area}/${slug}`,
        areaLabel: areaInfo.label.ja,
        area,
        isCeo,
    });

    const related = getAllArticles(area)
        .filter((a) => a.category === article.category && a.slug !== slug)
        .slice(0, 3);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <ArticleDetailClient
                article={{ ...article, content: markdownToHtml(article.content) }}
                relatedArticles={related}
                area={areaInfo}
            />
        </>
    );
}
