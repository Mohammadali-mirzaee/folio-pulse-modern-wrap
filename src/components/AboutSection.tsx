
import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' 
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      observer.observe(el);
    });

    // Scroll animation for text elements
    const handleScroll = () => {
      if (textRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetTop = rect.top + scrollTop;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > offsetTop - window.innerHeight / 1.5) {
          const opacity = Math.min(1, (scrollPosition - (offsetTop - window.innerHeight / 1.5)) / 400);
          textRef.current.style.opacity = opacity.toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section bg-black">
      <div className="container-wide">
        <div ref={textRef} className="max-w-3xl mx-auto text-center opacity-0 reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-extrabold mb-6">
            <span className="relative inline-block text-accent after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-accent/50 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-500 cursor-default">Drivna</span> av Hantverk
          </h2>
          <p className="text-lg md:text-xl font-light text-white/80 mb-8 transition-all duration-500 hover:text-white">
            Specialiserade på bilfoliering, detaljering och anpassad styling i Göteborg.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto transition-all duration-300 hover:w-40"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
