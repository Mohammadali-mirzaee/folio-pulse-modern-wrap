
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const ticking = useRef(false);

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!ticking.current && !isMobile) {
      requestAnimationFrame(() => {
        if (heroRef.current) {
          const scrollPosition = window.scrollY;
          setScrollY(scrollPosition * 0.5); // Parallax effect multiplier
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [isMobile]);

  useEffect(() => {
    setIsLoaded(true);

    // Only add scroll listener if not on mobile
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, isMobile]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax (disabled on mobile) */}
      <div
        className="absolute inset-0"
        style={{ transform: isMobile ? 'none' : `translateY(${scrollY}px)` }}
      >
        <img
          src="/lovable-uploads/hero.jpg"
          alt="Stilfull bilsilhuett"
          className="w-full h-full object-cover object-center animate-fade-in"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-charcoal z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full justify-center items-center px-4 text-center">
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-poppins font-extrabold tracking-tight mb-4 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          Elias Foliering
        </h1>
        <p
          className={`text-xl md:text-2xl font-light mb-8 text-white/90 ${
            isLoaded
              ? "opacity-100 translate-y-0 delay-300"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          Bilstyling. Precision. Passion.
        </p>

        <Button 
          onClick={scrollToContact}
          className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-md transition-colors"
        >
          Kontakta Oss
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <ArrowDown size={24} className="text-white/70" />
      </div>
    </section>
  );
};

export default HeroSection;
