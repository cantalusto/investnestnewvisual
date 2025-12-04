import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Detectar seção ativa
      const sections = ['hero', 'about', 'plans', 'faq'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    const element = document.getElementById(targetId);
    if (!element) return;

    const navbarHeight = 80;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;

    smoothScrollTo(targetPosition, 800);
    setIsOpen(false);
  };

  const navItems = [
    { href: '#hero', label: 'Início', id: 'hero' },
    { href: '#about', label: 'Sobre nós', id: 'about' },
    { href: '#plans', label: 'Planos', id: 'plans' },
    { href: '#faq', label: 'FAQ & Contato', id: 'faq' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg shadow-neo-green/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - só aparece após scroll */}
          <div className={`flex items-center gap-3 group cursor-pointer transition-all duration-500 ${
            isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'
          }`}>
            <img 
              src="/INVESTNEST - icon.svg" 
              alt="InvestNest Icon" 
              className="h-10 w-10"
            />
            <span className="text-xl font-baumans">
              <span className="text-white">Invest</span><span className="text-neo-green">Nest</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8 transition-all duration-500 ${
            isScrolled ? '' : 'ml-auto'
          }`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href.substring(1))}
                className={`font-mono transition-colors duration-200 relative group ${
                  activeSection === item.id 
                    ? 'text-neo-green' 
                    : 'text-white hover:text-neo-green'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-neo-green transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
            <button className="bg-neo-green text-black px-6 py-2 rounded-full font-semibold hover:bg-neo-green/90 transition-all duration-200 hover:scale-105 shadow-lg shadow-neo-green/20">
              Começar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-neo-green transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-4 animate-fade-in bg-black/95 backdrop-blur-md -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-b-lg">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href.substring(1))}
                  className={`transition-colors duration-200 py-2 border-b border-white/10 ${
                    activeSection === item.id 
                      ? 'text-neo-green font-bold' 
                      : 'text-white/80 hover:text-neo-green'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button className="bg-neo-green text-black px-6 py-2 rounded-full font-semibold hover:bg-neo-green/90 transition-all duration-200 mt-2 shadow-lg shadow-neo-green/20">
                Começar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
