
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-black py-8 px-6">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Elias Foliering. Alla rättigheter förbehållna.
          </div>
          
          <button
            onClick={scrollToTop}
            className="bg-charcoal/50 hover:bg-accent/80 text-white p-3 rounded-full transition-all duration-300"
            aria-label="Scrolla till toppen"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
