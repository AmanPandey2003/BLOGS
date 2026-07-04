import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

export const InteractiveCursor: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Real mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);

    // Only enable custom cursor if pointing device supports fine pointers (e.g. mouse, trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !isPointer) return;

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Detect click state
    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null ||
        target.classList.contains('cursor-pointer');

      if (isInteractive) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mounted, isPointer, mouseX, mouseY]);

  if (!mounted || !isPointer) return null;

  return (
    <>
      {/* Precision Dot */}
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50 bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Soft Glowing Outer Ring */}
      <motion.div 
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 border"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 44 : 22,
          height: isHovered ? 44 : 22,
          backgroundColor: isHovered 
            ? (theme === 'dark' ? 'rgba(139, 92, 246, 0.08)' : 'rgba(99, 102, 241, 0.06)')
            : 'transparent',
          borderColor: isClicked 
            ? (theme === 'dark' ? 'rgba(236, 72, 153, 0.7)' : 'rgba(139, 92, 246, 0.7)') 
            : isHovered 
              ? (theme === 'dark' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(79, 70, 229, 0.5)')
              : (theme === 'dark' ? 'rgba(161, 161, 170, 0.25)' : 'rgba(115, 115, 115, 0.25)'),
          boxShadow: isHovered 
            ? (theme === 'dark' ? '0 0 15px rgba(139,92,246,0.15)' : '0 0 15px rgba(99,102,241,0.1)')
            : 'none'
        }}
      />
    </>
  );
};

// Beautiful Magnetic Wrapper for Buttons & Links
export const Magnetic: React.FC<{ children: React.ReactElement; strength?: number }> = ({ 
  children, 
  strength = 0.35 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({ x: distanceX * strength, y: distanceY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 16, mass: 0.8 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};
