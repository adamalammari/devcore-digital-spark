import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import CollabSection from "@/components/CollabSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Chatbot, { ChatbotButton } from "@/components/Chatbot";

const Index = () => {
  const [botOpen, setBotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onOpenBot={() => setBotOpen(true)} />
      <FeaturesSection />
      <ServicesSection />
      <PricingSection />
      <AboutSection />
      <CollabSection />
      <FAQSection />
      <Footer />
      
      {!botOpen && <ChatbotButton onClick={() => setBotOpen(true)} />}
      <Chatbot isOpen={botOpen} onClose={() => setBotOpen(false)} />
    </div>
  );
};

export default Index;
