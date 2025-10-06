import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SubheadlineSection from "@/components/SubheadlineSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import heroImage from "@assets/generated_images/Healthcare_consultation_hero_image_a7da6c6e.png";

export default function Home() {
  return (
    <div className="relative">
      <Navigation />
      <main>
        <div id="home">
          <HeroSection heroImage={heroImage} />
        </div>
        <SubheadlineSection />
        <div id="objectives">
          <ObjectivesSection />
        </div>
        <div id="contact">
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
