import CTA from "@/components/shared/landing/CTA";
import FeaturesSection from "@/components/shared/landing/FeaturesSection";
import { HeroSection } from "@/components/shared/landing/HeroSection";
import HowItWorksSection from "@/components/shared/landing/HowItWorksSection";
import PricingSection from "@/components/shared/landing/PricingSection";
import { auth } from "@clerk/nextjs/server";

const Home = async () => {
  const { userId } = auth();
  return (
    <>
      <section className="max-w-full max-h-fit overflow-hidden">
        {/* hero section  */}
        <HeroSection userId={userId!} />
        {/* features section  */}
        <FeaturesSection />
        {/* How it works section  */}
        <HowItWorksSection />
        {/* pricing section  */}
        <PricingSection pricingPage={false} />
        {/* subscription section  */}
        <CTA />
      </section>
    </>
  );
};

export default Home;
