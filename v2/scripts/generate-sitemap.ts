/** Sitemap generation script — Run via `npx tsx scripts/generate-sitemap.ts` */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE = "https://productx.jp";
const today = new Date().toISOString().slice(0, 10);

type Freq = "weekly" | "monthly" | "yearly";
type Entry = { loc: string; lastmod: string; changefreq: Freq; priority: string };

const page = (loc: string, changefreq: Freq, priority: string): Entry => ({
    loc, lastmod: today, changefreq, priority,
});

/* ── Static pages ── */
const entries: Entry[] = [
    page("/", "weekly", "1.0"),
    page("/about", "monthly", "0.8"),
    page("/services", "monthly", "0.8"),
    page("/services/ai-dx", "monthly", "0.8"),
    page("/services/partner-growth", "monthly", "0.8"),
    page("/articles", "weekly", "0.8"),
    page("/case-studies", "monthly", "0.7"),
    page("/news", "weekly", "0.7"),
    page("/partner", "monthly", "0.7"),
    page("/contact", "monthly", "0.7"),
    page("/resources", "monthly", "0.6"),
    page("/tools", "monthly", "0.6"),
    page("/tools/estimate", "monthly", "0.6"),
    page("/tools/ai-simulator", "monthly", "0.6"),
    page("/privacy", "yearly", "0.3"),
    page("/terms", "yearly", "0.3"),
];

/* ── Article pages ── */
const areas = ["ai-dx", "partner-growth"];
const contentBase = path.join(process.cwd(), "src/content/articles");

for (const area of areas) {
    entries.push(page(`/articles/${area}`, "weekly", "0.7"));

    const dir = path.join(contentBase, area);
    if (!fs.existsSync(dir)) continue;

    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
        const slug = file.replace(/\.md$/, "");
        const { data } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
        entries.push({
            loc: `/articles/${area}/${slug}`,
            lastmod: (data.date as string) || today,
            changefreq: "monthly",
            priority: "0.6",
        });
    }
}

/* ── Build XML ── */
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>
    <loc>${BASE}${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

const outPath = path.join(process.cwd(), "public/sitemap.xml");
fs.writeFileSync(outPath, xml, "utf-8");
console.log(`✅ Sitemap generated with ${entries.length} URLs → ${outPath}`);
