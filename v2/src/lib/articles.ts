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

/** Convert Markdown table block → HTML table */
function tableToHtml(block: string): string {
    const lines = block.trim().split("\n");
    if (lines.length < 3) return block;           // need header + separator + ≥1 row
    if (!/^\|.*\|$/.test(lines[0])) return block;  // not a table
    if (!/^\|[\s:|-]+\|$/.test(lines[1])) return block; // no separator row

    const parseRow = (line: string) =>
        line.split("|").slice(1, -1).map((c) => c.trim());

    const headers = parseRow(lines[0]);
    const rows = lines.slice(2).map(parseRow);

    const ths = headers.map((h) => `<th>${h}</th>`).join("");
    const trs = rows
        .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
        .join("\n");

    return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
}

/** Lightweight Markdown → HTML converter */
export function markdownToHtml(md: string): string {
    let html = md;

    // Pre-process: ensure table blocks are separated by blank lines
    // This handles cases where a table follows a heading without a blank line
    html = html.replace(/^(#{2,3} .+)\n(\|.+)/gm, '$1\n\n$2');
    // Also ensure blank line after a table before next content
    html = html.replace(/(\|[^\n]+)\n([^|\n])/gm, '$1\n\n$2');

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr/>');

    // Images — must run before other inline transforms
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
    // Headings
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    // Inline
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // Checkbox-style lists (✅ ❌ ⚠️)
    html = html.replace(/^- (✅|❌|⚠️) (.+)$/gm, "<li>$1 $2</li>");
    // Lists
    html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);
    html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
    // Blockquote
    html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
    return html
        .split("\n\n")
        .map((block) => {
            const t = block.trim();
            if (!t) return "";
            // Pass through known block elements
            if (/^<(h|ul|ol|blockquote|li|img|table|hr)/.test(t)) return t;
            // Detect Markdown tables (lines starting with |)
            if (/^\|/.test(t)) return tableToHtml(t);
            // Handle blocks that contain mixed content (e.g., heading followed by table lines)
            if (t.includes('\n') && t.split('\n').some(line => /^\|/.test(line))) {
                const lines = t.split('\n');
                const parts: string[] = [];
                let tableLines: string[] = [];
                for (const line of lines) {
                    if (/^\|/.test(line)) {
                        tableLines.push(line);
                    } else {
                        if (tableLines.length > 0) {
                            parts.push(tableToHtml(tableLines.join('\n')));
                            tableLines = [];
                        }
                        parts.push(line);
                    }
                }
                if (tableLines.length > 0) {
                    parts.push(tableToHtml(tableLines.join('\n')));
                }
                return parts.join('\n');
            }
            return `<p>${t.replace(/\n/g, "<br/>")}</p>`;
        })
        .join("\n");
}
