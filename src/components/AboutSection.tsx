
import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section bg-charcoal">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center opacity-0 reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-extrabold mb-6">
            <span className="text-accent">Driven</span> by Craftsmanship
          </h2>
          <p className="text-lg md:text-xl font-light text-white/80 mb-8">
            Focused on vehicle wrapping, detailing, and custom styling in Gothenburg.
          </p>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
