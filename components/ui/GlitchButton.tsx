import React from 'react';
import { GlitchButtonProps } from '../../types';

const GlitchButton: React.FC<GlitchButtonProps> = ({ text, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = "relative px-8 py-3 font-mono font-bold uppercase tracking-widest transition-all duration-300 group overflow-hidden focus:outline-none";
  const primaryStyles = "bg-neo-green text-neo-black hover:bg-white hover:text-black";
  const secondaryStyles = "bg-transparent text-neo-green border border-neo-green hover:bg-neo-green/10";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles} ${className}`}
    >
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      <span className="absolute top-0 left-0 w-full h-full bg-neo-toxic opacity-0 group-hover:opacity-20 group-hover:animate-glitch-1 z-0"></span>
      <span className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-0 group-hover:opacity-20 group-hover:animate-glitch-2 z-0" style={{ animationDelay: '0.1s' }}></span>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.3)_50%,transparent_75%)] bg-[length:4px_4px] opacity-0 group-hover:opacity-100 pointer-events-none"></div>
    </button>
  );
};

export default GlitchButton;
