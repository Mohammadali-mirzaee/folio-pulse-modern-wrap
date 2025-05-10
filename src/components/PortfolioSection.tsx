
import { useRef, useState, useEffect } from "react";

const portfolioItems = [
  {
    id: 1,
    title: "Matt Svart Foliering",
    description: "Elegant matt svart vinyl som ger bilen ett sofistikerat utseende.",
    imageUrl:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Blank Vit Transformation",
    description: "Skimrande vit premium vinyl med högglansig finish.",
    imageUrl:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Chrome Delete Paket",
    description: "Komplett omvandling av kromlister till elegant matt svart.",
    imageUrl:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Högpresterande Fönsterfilm",
    description: "Värme- och UV-avvisande solfilm med modern estetik.",
    imageUrl:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Satin PPF Installation",
    description: "Transparent skyddsfilm med självläkande egenskaper.",
    imageUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Anpassad Design",
    description: "Skräddarsydda designlösningar för att framhäva din bils personlighet.",
    imageUrl:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-padded bg-charcoal"
    >
      <div className="container-wide">
        <h2 className={`text-4xl md:text-5xl font-poppins font-bold text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Våra Projekt
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer h-64 sm:h-80 transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80 group-hover:from-black/30 group-hover:via-black/40 group-hover:to-black/90 transition-colors duration-500 z-10"></div>
              
              {/* Portfolio Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                  hoveredItem === item.id ? 'scale-110 filter brightness-90' : 'scale-100'
                }`}
              />
              
              {/* Content */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-500 ${
                hoveredItem === item.id ? 'translate-y-0' : 'translate-y-2'
              }`}>
                <h3 className="text-lg font-poppins font-semibold mb-1">
                  {item.title}
                </h3>
                <p className={`text-sm text-white/70 transition-all duration-500 ${
                  hoveredItem === item.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  {item.description}
                </p>
              </div>
              
              {/* Hover Effect Accent Line */}
              <div className={`absolute bottom-0 left-0 w-0 h-1 bg-accent z-20 transition-all duration-300 ${
                hoveredItem === item.id ? 'w-full' : 'w-0'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
