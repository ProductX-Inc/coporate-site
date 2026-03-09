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

export default function Home() {
  // Gather latest 3 articles across all service areas
  const latestArticles = serviceAreas
    .flatMap((area) =>
      getAllArticles(area.key).map((a) => ({ ...a, area: area.key }))
    )
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Act 1: OPEN — Full-screen Aurora Mesh Hero */}
        <HeroSection />

        {/* Act 2: PROOF — Why ProductX */}
        <ProofSection />

        <GradientDivider />

        {/* Act 3: STATS — Numbers at a Glance */}
        <StatsSection />

        <GradientDivider />

        {/* Act 4: CRAFT — Bento Grid Services */}
        <CraftSection />

        <GradientDivider />

        {/* Act 5: MESSAGE — CEO Quote */}
        <CeoSection />

        <GradientDivider />

        {/* Act 6: PULSE — News Marquee Band */}
        <PulseSection />

        <GradientDivider />

        {/* Act 7: ARTICLES — Latest Insights */}
        <ArticlesSection articles={latestArticles} />

        <GradientDivider />

        {/* Act 8: FAQ — Frequently Asked Questions */}
        <FaqSection />

        {/* Act 9: INVITE — CTA + Footer */}
        <InviteSection />
      </main>
    </>
  );
}
