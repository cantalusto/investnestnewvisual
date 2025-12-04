import React, { useState } from 'react';
import MatrixRain from './components/ui/MatrixRain';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Ticker from './components/sections/Ticker';
import Features from './components/sections/Features'; // This is now "About"
import Plans from './components/sections/Plans';
import Contact from './components/sections/Contact';
import TermsOfUse from './components/pages/TermsOfUse';

function App() {
  const [showTerms, setShowTerms] = useState(false);

  if (showTerms) {
    return <TermsOfUse onClose={() => setShowTerms(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-neo-black text-white selection:bg-neo-green selection:text-neo-black">
      {/* Background Effects */}
      <MatrixRain />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-neo-black/50 to-neo-black pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neo-green/5 via-transparent to-transparent opacity-40 pointer-events-none z-0" />
      
      {/* Interactive Elements */}
      <CustomCursor />
      
      {/* Layout */}
      <Navbar />
      
      <main className="relative z-10 flex flex-col">
        <Hero />
        <Ticker />
        <Features /> 
        <Plans />
        <Contact onTermsClick={() => setShowTerms(true)} />
        
        {/* Footer */}
        <footer className="border-t border-neo-green/20 py-12 bg-neo-dark relative z-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-mono text-sm text-gray-500">
              &copy; 2025 <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span>. Todos os direitos reservados.
            </p>
            <div className="flex justify-center space-x-6 mt-4 text-xs font-mono text-neo-green/60">
                <button onClick={() => setShowTerms(true)} className="hover:text-neo-green transition-colors">Termos de uso</button>
                <span>|</span>
                <a href="#" className="hover:text-neo-green transition-colors">Política de privacidade</a>
            </div>
            <p className="text-[10px] text-gray-700 mt-8 font-mono">
                SYSTEM_VER: 2.0.4 // SECURE_CONNECTION_ESTABLISHED
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;