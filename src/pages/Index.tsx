import HeroSection from "@/components/landing/HeroSection";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import CatalogSection from "@/components/landing/CatalogSection";
import AboutSection from "@/components/landing/AboutSection";
import TestimoniSection from "@/components/landing/TestimoniSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AdvantagesSection />
      <CatalogSection />
      <AboutSection />
      <TestimoniSection />
      <FAQSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
