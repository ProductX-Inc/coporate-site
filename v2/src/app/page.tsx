import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { ProofSection } from "@/components/sections/proof-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CraftSection } from "@/components/sections/craft-section";
import { CeoSection } from "@/components/sections/ceo-section";
import { PulseSection } from "@/components/sections/pulse-section";
import { ArticlesSection } from "@/components/sections/articles-section";
import { FaqSection } from "@/components/sections/faq-section";
import { InviteSection } from "@/components/sections/invite-section";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { getAllArticles, serviceAreas } from "@/lib/articles";
import { buildFaqJsonLd } from "@/lib/seo";

const faqJsonLd = buildFaqJsonLd([
  { q: "開発だけでなく、企画・戦略から相談できますか？", a: "もちろんです。ProductXの強みは上流のプロダクト戦略から実装・グロースまで一気通貫で支援できることです。「何を作るべきか」の段階からご相談いただけます。" },
  { q: "AI DXは技術的な知識がなくても依頼できますか？", a: "はい、技術的な知識は不要です。課題のヒアリングから最適なAIソリューションのご提案まで、わかりやすくご説明しながら進めます。「AIで何ができるか分からない」という段階でもお気軽にご相談ください。" },
  { q: "リモートでの対応は可能ですか？", a: "はい、フルリモートでの対応が可能です。オンラインミーティングやチャットツールを活用し、場所を問わずスムーズなコミュニケーションを実現します。必要に応じて対面でのミーティングも対応いたします。" },
]);

export default function Home() {
  const latestArticles = serviceAreas
    .flatMap((area) =>
      getAllArticles(area.key).map((a) => ({ ...a, area: area.key }))
    )
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        <HeroSection />
        <ProofSection />
        <GradientDivider />
        <StatsSection />
        <GradientDivider />
        <CraftSection />
        <GradientDivider />
        <CeoSection />
        <GradientDivider />
        <PulseSection />
        <GradientDivider />
        <ArticlesSection articles={latestArticles} />
        <GradientDivider />
        <FaqSection />
        <InviteSection />
      </main>
    </>
  );
}
