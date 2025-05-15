import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: Array<{ name: string; id: string }>;
  onNavigate: (sectionId: string) => void;
};

const MobileMenu = ({ isOpen, onClose, navigationItems, onNavigate }: MobileMenuProps) => {
  // Handle scroll locking with improved technique
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      
      // Apply fixed position with the correct offset to prevent visual jump
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position when menu closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      // Clean up styles when component unmounts
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Use createPortal to render outside normal DOM flow
  return createPortal(
    <div className="mobile-menu-portal">
      {/* Backdrop - completely opaque with highest z-index */}
      <div className="fixed inset-0 bg-black z-[9990]" />
      
      {/* Blur layer */}
      <div 
        className="fixed inset-0 backdrop-blur-xl z-[9991]"
        onClick={onClose}
      />
      
      {/* Menu close button - separate from content for better positioning */}
      <div className="fixed top-4 right-4 z-[9993]">
        <button 
          className="text-white p-2"
          onClick={onClose}
          aria-label="Stäng meny"
        >
          <X size={24} />
        </button>
      </div>
      
      {/* Menu content */}
      <div className="fixed inset-0 z-[9992] flex items-center justify-center pointer-events-none">
        <div 
          className="pointer-events-auto flex flex-col items-center space-y-8 animate-fade-up"
          onClick={(e) => e.stopPropagation()}
        >
          {navigationItems.map((item) => (
            <button 
              key={item.id}
              className="text-2xl text-white hover:text-accent transition-colors duration-300"
              onClick={() => {
                onClose();
                // Add a small delay to ensure the body scroll is restored before scrolling
                setTimeout(() => {
                  onNavigate(item.id);
                }, 100);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenu;
