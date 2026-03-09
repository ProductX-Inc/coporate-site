/** Sitemap generation script — Run via `npx tsx scripts/generate-sitemap.ts` */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE = "https://productx.jp";
const today = new Date().toISOString().slice(0, 10);

interface SitemapEntry {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
}

const entries: SitemapEntry[] = [];

/* ── Static pages ── */
const staticPages: SitemapEntry[] = [
    { loc: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
    { loc: "/about", lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: "/services", lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: "/services/ai-dx", lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: "/services/partner-growth", lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: "/articles", lastmod: today, changefreq: "weekly", priority: "0.8" },
    { loc: "/case-studies", lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: "/news", lastmod: today, changefreq: "weekly", priority: "0.7" },
    { loc: "/partner", lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: "/contact", lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: "/resources", lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: "/tools", lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: "/tools/estimate", lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: "/tools/ai-simulator", lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: "/privacy", lastmod: today, changefreq: "yearly", priority: "0.3" },
    { loc: "/terms", lastmod: today, changefreq: "yearly", priority: "0.3" },
];
entries.push(...staticPages);

/* ── News pages ── */
const newsDir = path.join(process.cwd(), "src/app/news");
if (fs.existsSync(newsDir)) {
    const newsDirs = fs.readdirSync(newsDir).filter((f) => {
        const full = path.join(newsDir, f);
        return fs.statSync(full).isDirectory() && f !== "[slug]";
    });
    // Add news detail pages from content if they exist
}

/* ── Article area pages ── */
const areas = ["ai-dx", "partner-growth"];
for (const area of areas) {
    entries.push({
        loc: `/articles/${area}`,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.7",
    });
}

/* ── Article detail pages ── */
const contentBase = path.join(process.cwd(), "src/content/articles");
for (const area of areas) {
    const dir = path.join(contentBase, area);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
        const slug = file.replace(/\.md$/, "");
        const raw = fs.readFileSync(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        const date = (data.date as string) || today;

        entries.push({
            loc: `/articles/${area}/${slug}`,
            lastmod: date,
            changefreq: "monthly",
            priority: "0.6",
        });
    }
}

/* ── News detail pages ── */
const newsContentDir = path.join(process.cwd(), "src/content/news");
if (fs.existsSync(newsContentDir)) {
    const newsFiles = fs.readdirSync(newsContentDir).filter((f) => f.endsWith(".md") || f.endsWith(".tsx"));
    for (const file of newsFiles) {
        const slug = file.replace(/\.(md|tsx)$/, "");
        entries.push({
            loc: `/news/${slug}`,
            lastmod: today,
            changefreq: "yearly",
            priority: "0.5",
        });
    }
}

/* ── Build XML ── */
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
        .map(
            (e) => `  <url>
    <loc>${BASE}${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
        )
        .join("\n")}
</urlset>
`;

const outPath = path.join(process.cwd(), "public/sitemap.xml");
fs.writeFileSync(outPath, xml, "utf-8");
console.log(`✅ Sitemap generated with ${entries.length} URLs → ${outPath}`);
