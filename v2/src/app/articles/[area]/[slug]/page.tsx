import { getAllArticles, getArticleBySlug, markdownToHtml, serviceAreas, isValidArea } from "@/lib/articles";
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
    const isCeoColumn = article.category === "ceo-column";
    const url = `https://productx.jp/articles/${area}/${slug}`;
    return {
        title: isCeoColumn ? `${article.title} | ProductX CEO` : article.title,
        description: article.description,
        alternates: { canonical: url },
        openGraph: {
            title: isCeoColumn ? `${article.title} | ProductX CEO` : article.title,
            description: article.description,
            url,
            type: "article",
            publishedTime: article.date,
            tags: article.tags,
            ...(isCeoColumn && { authors: ["上野健太 / ProductX CEO"] }),
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

    const areaInfo = serviceAreas.find((a) => a.key === area)!;
    const url = `https://productx.jp/articles/${area}/${slug}`;
    const isCeo = article.category === "ceo-column";

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                headline: article.title,
                description: article.description,
                datePublished: article.date,
                dateModified: article.date,
                url,
                author: isCeo
                    ? { "@type": "Person", name: "上野健太", jobTitle: "CEO", worksFor: { "@type": "Organization", name: "株式会社ProductX" } }
                    : { "@type": "Organization", name: "株式会社ProductX", url: "https://productx.jp" },
                publisher: {
                    "@type": "Organization",
                    name: "株式会社ProductX",
                    url: "https://productx.jp",
                    logo: { "@type": "ImageObject", url: "https://productx.jp/images/logo.png" },
                },
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                keywords: article.tags.join(", "),
                inLanguage: "ja",
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://productx.jp" },
                    { "@type": "ListItem", position: 2, name: "Articles", item: "https://productx.jp/articles" },
                    { "@type": "ListItem", position: 3, name: areaInfo.label.ja, item: `https://productx.jp/articles/${area}` },
                    { "@type": "ListItem", position: 4, name: article.title },
                ],
            },
        ],
    };

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
