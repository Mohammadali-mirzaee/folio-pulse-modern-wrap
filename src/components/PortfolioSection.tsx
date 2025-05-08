import { useRef, useState } from "react";

const portfolioItems = [
  {
    id: 1,
    title: "Matte Black Wrap",
    imageUrl:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Gloss White Transformation",
    imageUrl:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Chrome Delete Package",
    imageUrl:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Performance Window Tint",
    imageUrl:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Satin PPF Installation",
    imageUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Custom Livery Design",
    imageUrl:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-padded bg-charcoal"
    >
      <div className="container-wide">
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16">
          Our Work
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer h-64 sm:h-80"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 z-10"></div>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                  hoveredItem === item.id ? "scale-110" : "scale-100"
                }`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-lg font-poppins font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
