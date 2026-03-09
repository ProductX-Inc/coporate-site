/** Server-only article data helpers. Uses Node.js fs/path — do NOT import from client components. */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Re-export all constants/types so server pages can import from a single module
export {
    type ServiceArea,
    type ServiceAreaInfo,
    type ArticleMeta,
    type Article,
    serviceAreas,
    validAreaKeys,
    isValidArea,
    categoryLabels,
    categoryColors,
} from "./articles-constants";

import type { ServiceArea, ArticleMeta, Article } from "./articles-constants";

const contentBase = path.join(process.cwd(), "src/content/articles");

/** Parse frontmatter into ArticleMeta */
function parseMeta(slug: string, data: Record<string, unknown>): ArticleMeta {
    return {
        slug,
        title: (data.title as string) || "",
        description: (data.description as string) || "",
        date: (data.date as string) || "",
        category: (data.category as string) || "",
        tags: (data.tags as string[]) || [],
        author: (data.author as string) || "ProductX",
    };
}

/** Get all article metadata for a service area, sorted by date desc. */
export function getAllArticles(area: ServiceArea): ArticleMeta[] {
    const dir = path.join(contentBase, area);
    if (!fs.existsSync(dir)) return [];

    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => {
            const slug = f.replace(/\.md$/, "");
            const { data } = matter(fs.readFileSync(path.join(dir, f), "utf-8"));
            return parseMeta(slug, data);
        })
        .sort((a, b) => (a.date > b.date ? -1 : 1));
}

/** Get a single article by slug, including body content. */
export function getArticleBySlug(area: ServiceArea, slug: string): Article | null {
    const fp = path.join(contentBase, area, `${slug}.md`);
    if (!fs.existsSync(fp)) return null;

    const { data, content } = matter(fs.readFileSync(fp, "utf-8"));
    return { ...parseMeta(slug, data), content };
}

/** Lightweight Markdown → HTML converter */
export function markdownToHtml(md: string): string {
    let html = md;
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);
    html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
    html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
    return html
        .split("\n\n")
        .map((block) => {
            const t = block.trim();
            if (!t) return "";
            if (/^<(h|ul|ol|blockquote|li)/.test(t)) return t;
            return `<p>${t.replace(/\n/g, "<br/>")}</p>`;
        })
        .join("\n");
}
