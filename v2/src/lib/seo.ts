/** SEO-related JSON-LD structured data helpers. Server-only (uses no client APIs). */

export const BASE = "https://productx.jp";

const PUBLISHER = {
    "@type": "Organization",
    name: "株式会社ProductX",
    url: BASE,
    logo: { "@type": "ImageObject", url: `${BASE}/images/logo.png` },
};

/* ── Article + BreadcrumbList ── */

interface ArticleJsonLdInput {
    title: string;
    description: string;
    date: string;
    tags: string[];
    url: string;
    areaLabel: string;
    area: string;
    isCeo: boolean;
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
    const { title, description, date, tags, url, areaLabel, area, isCeo } = input;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                headline: title,
                description,
                datePublished: date,
                dateModified: date,
                url,
                author: isCeo
                    ? { "@type": "Person", name: "上野健太", jobTitle: "CEO", worksFor: { "@type": "Organization", name: "株式会社ProductX" } }
                    : { "@type": "Organization", name: "株式会社ProductX", url: BASE },
                publisher: PUBLISHER,
                mainEntityOfPage: { "@type": "WebPage", "@id": url },
                keywords: tags.join(", "),
                inLanguage: "ja",
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
                    { "@type": "ListItem", position: 2, name: "Articles", item: `${BASE}/articles` },
                    { "@type": "ListItem", position: 3, name: areaLabel, item: `${BASE}/articles/${area}` },
                    { "@type": "ListItem", position: 4, name: title },
                ],
            },
        ],
    };
}

/* ── FAQPage ── */

export function buildFaqJsonLd(faqs: { q: string; a: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
        })),
    };
}
