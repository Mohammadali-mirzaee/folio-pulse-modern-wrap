import { useRef, useEffect, useState } from "react";
import { PaintRoller, Droplet, Film, Wrench, Palette, Sun } from "lucide-react";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services: Service[] = [
    {
      icon: Wrench,
      title: "Bilfoliering",
      description: "Premium vinylfoliering för att förnya din bils utseende.",
    },
    {
      icon: PaintRoller,
      title: "Chrome Delete",
      description:
        "Omvandla blanka kromdetaljer till elegant matt eller svart finish.",
    },
    {
      icon: Droplet,
      title: "Solfilm",
      description:
        "UV-skydd och värmereducering med högkvalitativ fönsterfilm.",
    },
    {
      icon: Film,
      title: "PPF (Skyddsfilm)",
      description: "Osynligt skydd mot stenslag, repor och vägsmuts.",
    },
    {
      icon: Sun,
      title: "Ljustoning",
      description: "Anpassad toning av strålkastare för ett unikt utseende.",
    },
    {
      icon: Palette,
      title: "Styling",
      description:
        "Skräddarsydda designlösningar för att framhäva din bils karaktär.",
    },
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

    const elements = document.querySelectorAll(".reveal-service");
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
    <section id="services" ref={sectionRef} className="section-padded bg-black">
      <div className="container-wide">
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 opacity-0 reveal-service">
          Tjänster
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center opacity-0 reveal-service bg-black/20 p-6 rounded-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10 cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div
                className={`bg-accent/10 p-6 rounded-full mb-6 transition-all duration-300 ${
                  hoveredService === index ? "bg-accent/30 scale-110" : ""
                }`}
              >
                <service.icon size={36} />
              </div>
              <h3 className="text-xl md:text-2xl font-poppins font-semibold text-center mb-2">
                {service.title}
              </h3>
              <p
                className={`text-center text-white/60 transition-all duration-300 ${
                  hoveredService === index ? "text-white/90" : "text-white/60"
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
