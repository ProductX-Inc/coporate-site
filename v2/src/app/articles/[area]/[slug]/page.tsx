import { getAllArticles, getArticleBySlug, markdownToHtml, categoryLabels, serviceAreas, isValidArea } from "@/lib/articles";
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
    return {
        title: article.title,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
            publishedTime: article.date,
            tags: article.tags,
        },
    };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ area: string; slug: string }> }) {
    const { area, slug } = await params;
    if (!isValidArea(area)) notFound();

    const article = getArticleBySlug(area, slug);
    if (!article) notFound();

    const related = getAllArticles(area)
        .filter((a) => a.category === article.category && a.slug !== slug)
        .slice(0, 3);

    return (
        <ArticleDetailClient
            article={{ ...article, content: markdownToHtml(article.content) }}
            relatedArticles={related}
            categoryLabels={categoryLabels}
            area={serviceAreas.find((a) => a.key === area)!}
        />
    );
}
