
import { useEffect, useRef } from "react";

const BrandsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-brand");
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
    <section
      id="brands"
      ref={sectionRef}
      className="section-padded bg-black"
    >
      <div className="container-wide">
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 opacity-0 reveal-brand">
          Varumärken Vi Litar På
        </h2>

        <div className="flex justify-center opacity-0 reveal-brand">
          <div className="bg-white/5 hover:bg-white/10 p-6 rounded-lg w-full max-w-4xl flex items-center justify-center transition-all duration-300 transform hover:scale-105">
            <img
              src="/brands/brands.jpg"
              alt="Varumärken vi litar på - kombinerade logotyper"
              className="w-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
