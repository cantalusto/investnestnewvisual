import React from 'react';
import TypingText from '../ui/TypingText';
import GlitchButton from '../ui/GlitchButton';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    const start = window.scrollY;
    // Calculate target position, accounting for fixed header if necessary (here we just go to top)
    const target = element.getBoundingClientRect().top + window.scrollY;
    const distance = target - start;
    const duration = 1000; // 1 second duration for smooth effect
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function: easeInOutCubic for a very smooth feel
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Status Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 text-[10px] sm:text-xs font-mono text-neo-green/60 tracking-widest uppercase"
        >
            <div className="flex items-center bg-neo-green/5 px-3 py-1 rounded border border-neo-green/20">
              <div className="w-2 h-2 bg-neo-green rounded-full mr-2 animate-pulse"></div> 
              Sistema DeFi Online
            </div>
            <div className="flex items-center bg-neo-green/5 px-3 py-1 rounded border border-neo-green/20">
              <div className="w-2 h-2 bg-neo-green rounded-full mr-2 animate-pulse" style={{animationDelay: '0.5s'}}></div> 
              LGPD Compliance
            </div>
            <div className="flex items-center bg-neo-green/5 px-3 py-1 rounded border border-neo-green/20">
              <div className="w-2 h-2 bg-neo-green rounded-full mr-2 animate-pulse" style={{animationDelay: '1s'}}></div> 
              Smart Contracts
            </div>
        </motion.div>

        {/* Main Heading */}
        <div className="mb-6">
          <img 
            src="/INVESTNEST - LOGO-cropped.svg" 
            alt="InvestNest Logo" 
            className="w-full max-w-3xl mx-auto mb-4"
          />
          <h1 className="text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 font-mono tracking-normal opacity-90">
            <TypingText text="O seu ninho de cripto rendimento" speed={50} loop={true} deleteSpeed={30} pauseTime={3000} />
          </h1>
        </div>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-gray-400 font-mono mb-12 leading-relaxed"
        >
          Acesse investimentos digitais seguros e automatizados. Transparência total através da blockchain.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <GlitchButton 
            text="Conheça os Planos" 
            onClick={() => smoothScrollTo('plans')}
          />
          <GlitchButton 
            text="Sobre a Plataforma" 
            variant="secondary" 
            onClick={() => smoothScrollTo('about')}
          />
        </motion.div>
      </div>
      
      {/* Decorative Matrix Floor */}
      <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(0,255,65,0.05))] transform perspective-[1000px] rotate-x-60 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
    </section>
  );
};

export default Hero;