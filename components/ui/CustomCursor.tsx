import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    // Check for hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 flex items-center justify-center hidden md:flex"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            rotate: isHovered ? 45 : 0,
            backgroundColor: isHovered ? 'rgba(0, 255, 65, 0.1)' : 'transparent',
            borderColor: '#00FF41'
          }}
          className="w-4 h-4 border-2 border-neo-green relative"
        >
            {/* Crosshair details */}
            <div className="absolute top-1/2 left-[-4px] w-[2px] h-[2px] bg-neo-green"></div>
            <div className="absolute top-1/2 right-[-4px] w-[2px] h-[2px] bg-neo-green"></div>
            <div className="absolute top-[-4px] left-1/2 w-[2px] h-[2px] bg-neo-green"></div>
            <div className="absolute bottom-[-4px] left-1/2 w-[2px] h-[2px] bg-neo-green"></div>
        </motion.div>
      </motion.div>
      
      {/* Trailing Dot */}
      <motion.div
         className="fixed top-0 left-0 w-1 h-1 bg-neo-green rounded-full pointer-events-none z-50 hidden md:block"
         style={{
            x: cursorX,
            y: cursorY,
            translateX: 14,
            translateY: 14
         }}
      />
    </>
  );
};

export default CustomCursor;
