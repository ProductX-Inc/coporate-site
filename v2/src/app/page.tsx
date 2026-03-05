import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { ProofSection } from "@/components/sections/proof-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CraftSection } from "@/components/sections/craft-section";
import { CeoSection } from "@/components/sections/ceo-section";
import { PulseSection } from "@/components/sections/pulse-section";
import { FaqSection } from "@/components/sections/faq-section";
import { InviteSection } from "@/components/sections/invite-section";
import { GradientDivider } from "@/components/ui/gradient-divider";

export default function Home() {
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

        {/* Act 7: FAQ — Frequently Asked Questions */}
        <FaqSection />

        {/* Act 8: INVITE — CTA + Footer */}
        <InviteSection />
      </main>
    </>
  );
}
