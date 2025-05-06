
import { useEffect, useRef } from "react";

const BrandsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Brands data with their logos and names
  const brands = [
    { name: "Avery Dennison", logo: "/brands/AVERY_DENNISON.png" },
    { name: "Easy Composites", logo: "/brands/EASY_COMPOSITES.png" },
    { name: "Global Window Films", logo: "/brands/GLOBAL.png" },
    { name: "KPMF", logo: "/brands/KPMF.png" },
    { name: "NKODA", logo: "/brands/NKODA.png" },
  ];

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
      className="section-padded bg-charcoal"
    >
      <div className="container-wide">
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 opacity-0 reveal-brand">
          Brands We Trust
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-0 reveal-brand"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/5 hover:bg-white/10 p-6 rounded-lg w-full h-36 flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-20 max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
