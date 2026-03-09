import { getAllArticles, serviceAreas } from "@/lib/articles";
import { ArticlesLandingClient } from "./client";

export const metadata = {
    title: "Articles",
    description:
        "ProductXが発信するAI DX・プロダクト開発に関する記事。業務効率化から導入戦略まで、実践的なナレッジをお届けします。",
};

export default function ArticlesLandingPage() {
    const areasWithArticles = serviceAreas.map((area) => ({
        ...area,
        articles: getAllArticles(area.key).slice(0, 3),
    }));

    return <ArticlesLandingClient areas={areasWithArticles} />;
}
