/**
 * Description optimizer — expands short meta descriptions to 80-120 chars
 * Run: npx tsx scripts/optimize-descriptions.ts
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const MIN_LEN = 60;
const contentBase = path.join(process.cwd(), "src/content/articles");
const areas = ["ai-dx", "partner-growth"];

let updated = 0;

for (const area of areas) {
    const dir = path.join(contentBase, area);
    if (!fs.existsSync(dir)) continue;

    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
        const filePath = path.join(dir, file);
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        const desc = (data.description as string) || "";

        if (desc.length >= MIN_LEN) continue;

        // Extract first meaningful sentence from body (skip headings, images, blank lines)
        const lines = content.split("\n").filter(
            (l) => l.trim() && !l.startsWith("#") && !l.startsWith("!") && !l.startsWith("---")
        );
        const firstBody = lines[0]?.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim() || "";

        // Build expanded description: original + first body sentence fragment
        let expanded = desc;
        if (expanded.endsWith("。")) {
            expanded = expanded.slice(0, -1);  // Remove trailing period for concat
        }

        // Add context from body if still short
        if (expanded.length < MIN_LEN && firstBody) {
            const bodySentence = firstBody.split("。")[0];
            if (bodySentence && !expanded.includes(bodySentence.slice(0, 10))) {
                expanded = `${expanded}。${bodySentence}`;
            }
        }

        // Trim to max ~130 chars
        if (expanded.length > 130) {
            expanded = expanded.slice(0, 127) + "...";
        }

        // Ensure ends with period
        if (!expanded.endsWith("。") && !expanded.endsWith("...")) {
            expanded += "。";
        }

        // Only update if meaningfully longer
        if (expanded.length <= desc.length + 5) continue;

        data.description = expanded;
        const newRaw = matter.stringify(content, data);
        fs.writeFileSync(filePath, newRaw, "utf-8");
        updated++;
        console.log(`✅ [${desc.length}→${expanded.length}] ${file}`);
    }
}

console.log(`\n🎉 Updated ${updated} descriptions`);
