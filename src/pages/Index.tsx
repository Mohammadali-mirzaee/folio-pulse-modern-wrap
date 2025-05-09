
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import BrandsSection from '@/components/BrandsSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Set the document title
    document.title = "Elias Foliering | Bilstyling";
  }, []);

  return (
    <div className="min-h-screen w-full bg-charcoal">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BrandsSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
