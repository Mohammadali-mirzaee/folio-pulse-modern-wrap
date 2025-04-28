
import { useRef, useState } from 'react';

// Sample portfolio items - in a real project, these would be fetched from a database or CMS
const portfolioItems = [
  {
    id: 1,
    title: "Matte Black Wrap",
    imageUrl: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDYxMjR8MHwxfGFsbHx8fHx8fHx8fHwxNjkzMzAzNTk2fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    title: "Gloss White Transformation",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDYxMjR8MHwxfHNlYXJjaHwzfHxjYXIlMjB3cmFwfGVufDB8fHx8MTY5MzMwMzg3NXww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 3,
    title: "Chrome Delete Package",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDYxMjR8MHwxfHNlYXJjaHw0fHxjYXIlMjB3cmFwfGVufDB8fHx8MTY5MzMwMzg3NXww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 4,
    title: "Performance Window Tint",
    imageUrl: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDYxMjR8MHwxfHNlYXJjaHw2fHxjYXIlMjB3cmFwfGVufDB8fHx8MTY5MzMwMzg3NXww&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 5,
    title: "Satin PPF Installation",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDYxMjR8MHwxfGFsbHx8fHx8fHx8fHwxNjkzMzAzNTk2fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 6,
    title: "Custom Livery Design",
    imageUrl: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NDYxMjR8MHwxfGFsbHx8fHx8fHx8fHwxNjkzMzAzNTk2fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section id="portfolio" ref={sectionRef} className="section-padded bg-charcoal">
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
                className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hoveredItem === item.id ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-lg font-poppins font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
