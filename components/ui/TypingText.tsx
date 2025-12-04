import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  deleteSpeed?: number;
  pauseTime?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 100, 
  className = '', 
  onComplete,
  loop = false,
  deleteSpeed = 50,
  pauseTime = 2000
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentIndex === text.length) {
      if (onComplete) onComplete();
      if (loop) {
        setIsPaused(true);
      }
    } else if (isDeleting && displayedText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deleteSpeed);

      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentIndex(0);
    }
  }, [currentIndex, text, speed, onComplete, isDeleting, displayedText, loop, deleteSpeed, pauseTime, isPaused]);

  return (
    <span className={`${className} inline-block`}>
      {displayedText}
      <span className="animate-pulse bg-neo-green text-neo-black ml-1 inline-block w-[10px] h-[1em] align-middle">
        &nbsp;
      </span>
    </span>
  );
};

export default TypingText;
