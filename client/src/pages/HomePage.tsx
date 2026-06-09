import HeroSection from "@/components/homePage/HeroSection";
import WhyUsSection from "@/components/homePage/WhyUsSection";
import CTASection from "@/components/homePage/CTASection";

const HomePage = () => {
  return (
    <main className="space-y-6">
      <HeroSection />
      <WhyUsSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
