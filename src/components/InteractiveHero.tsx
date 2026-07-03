/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { Book, Code, Percent, Binary, HelpCircle, GraduationCap, Laptop, Compass } from 'lucide-react';

// Typing animation component
export const Typewriter: React.FC = () => {
  const words = [
    'Mathematics',
    'Data Structures',
    'Algorithms',
    'JavaScript',
    'Web Development',
    'AI',
    'System Design'
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    let timer: any;

    const handleType = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.slice(0, currentText.length + 1));
        setSpeed(80); // Speed up typing

        if (currentText === fullWord) {
          // Pause at the end of the typed word
          timer = setTimeout(() => setIsDeleting(true), 1800);
          return;
        }
      } else {
        setCurrentText(fullWord.slice(0, currentText.length - 1));
        setSpeed(40); // Faster deleting

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setSpeed(400); // Pause before next word
          return;
        }
      }

      timer = setTimeout(handleType, speed);
    };

    timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, speed]);

  return (
    <span className="relative inline-block min-w-[200px] text-left">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-300 dark:to-cyan-400 font-black">
        {currentText}
      </span>
      <motion.span 
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="ml-1.5 inline-block w-[3px] h-[1.1em] bg-primary dark:bg-fuchsia-400 align-middle shadow-[0_0_8px_#a855f7]"
      />
    </span>
  );
};

// Types for floating items
interface FloatingItem {
  id: number;
  type: 'book' | 'math' | 'code' | 'shape';
  content: React.ReactNode;
  x: string; // horizontal percentage
  y: string; // vertical percentage
  factorX: number; // multiplier for parallax
  factorY: number; // multiplier for parallax
  baseRotate: number;
  driftingSpeed: number;
  scale: number;
}

export const InteractiveHeroBackdrop: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position in terms of client normalized coords (-1 to 1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring animations for ultra-smooth buttery parallax physics (60 FPS)
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Relative coords inside the hero section
      const relativeX = (e.clientX - rect.left) / rect.width;
      const relativeY = (e.clientY - rect.top) / rect.height;
      
      // Normalize to -0.5 to 0.5 range
      const normX = relativeX - 0.5;
      const normY = relativeY - 0.5;

      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update spring targets when mouse coordinates shift
  useEffect(() => {
    springX.set(mousePos.x);
    springY.set(mousePos.y);
  }, [mousePos, springX, springY]);

  // Floating elements collection
  const floatingItems: FloatingItem[] = [
    // Books
    {
      id: 1,
      type: 'book',
      content: (
        <div className="p-3 bg-white/45 dark:bg-zinc-900/35 border border-zinc-200/40 dark:border-zinc-800/30 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex items-center justify-center">
          <Book className="w-6 h-6 text-indigo-500/50 dark:text-indigo-400/40" />
        </div>
      ),
      x: '12%',
      y: '22%',
      factorX: 45,
      factorY: 45,
      baseRotate: -12,
      driftingSpeed: 10,
      scale: 1,
    },
    {
      id: 2,
      type: 'book',
      content: (
        <div className="p-2.5 bg-white/45 dark:bg-zinc-900/35 border border-zinc-200/40 dark:border-zinc-800/30 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex items-center justify-center">
          <GraduationCap className="w-5.5 h-5.5 text-cyan-500/50 dark:text-cyan-400/40" />
        </div>
      ),
      x: '86%',
      y: '28%',
      factorX: -40,
      factorY: -40,
      baseRotate: 15,
      driftingSpeed: 12,
      scale: 0.9,
    },
    // Math Formulas
    {
      id: 3,
      type: 'math',
      content: <span className="font-serif font-black italic text-xl md:text-2xl text-fuchsia-500/30 dark:text-fuchsia-400/20 select-none">{"e^{i\\pi} + 1 = 0"}</span>,
      x: '75%',
      y: '18%',
      factorX: 30,
      factorY: 20,
      baseRotate: 5,
      driftingSpeed: 15,
      scale: 1,
    },
    {
      id: 4,
      type: 'math',
      content: <span className="font-mono font-bold text-lg md:text-xl text-teal-500/30 dark:text-teal-400/20 select-none">{"\\sum_{i=0}^n x_i"}</span>,
      x: '15%',
      y: '78%',
      factorX: -25,
      factorY: -35,
      baseRotate: -8,
      driftingSpeed: 14,
      scale: 0.95,
    },
    // Code symbols
    {
      id: 5,
      type: 'code',
      content: <span className="font-mono font-extrabold text-2xl text-violet-500/30 dark:text-violet-400/20 select-none">{"</>"}</span>,
      x: '84%',
      y: '75%',
      factorX: 35,
      factorY: 35,
      baseRotate: 18,
      driftingSpeed: 9,
      scale: 1.1,
    },
    {
      id: 6,
      type: 'code',
      content: <span className="font-mono font-bold text-xl text-emerald-500/30 dark:text-emerald-400/25 select-none">{"{...args}"}</span>,
      x: '25%',
      y: '14%',
      factorX: -30,
      factorY: -20,
      baseRotate: -15,
      driftingSpeed: 11,
      scale: 0.85,
    },
    // Geometric shapes
    {
      id: 7,
      type: 'shape',
      content: (
        <svg className="w-10 h-10 text-pink-500/20 dark:text-pink-400/15" fill="currentColor" viewBox="0 0 100 100">
          <polygon points="50,15 90,85 10,85" />
        </svg>
      ),
      x: '5%',
      y: '48%',
      factorX: 50,
      factorY: -50,
      baseRotate: 45,
      driftingSpeed: 18,
      scale: 1,
    },
    {
      id: 8,
      type: 'shape',
      content: (
        <svg className="w-8 h-8 text-indigo-500/25 dark:text-indigo-400/20" fill="none" stroke="currentColor" strokeWidth="6" viewBox="0 0 100 100">
          <rect x="15" y="15" width="70" height="70" rx="10" />
        </svg>
      ),
      x: '92%',
      y: '55%',
      factorX: -55,
      factorY: 55,
      baseRotate: -30,
      driftingSpeed: 16,
      scale: 0.9,
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Dynamic drifting background particles */}
      <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.15]">
        {Array.from({ length: 15 }).map((_, pIdx) => {
          const size = Math.random() * 4 + 2;
          const delay = Math.random() * 8;
          const left = `${Math.random() * 100}%`;
          const top = `${Math.random() * 100}%`;
          return (
            <motion.div
              key={pIdx}
              className="absolute rounded-full bg-indigo-400 dark:bg-white"
              style={{
                left,
                top,
                width: size,
                height: size,
                boxShadow: '0 0 8px rgba(139, 92, 246, 0.4)',
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.sin(pIdx) * 20, 0],
                opacity: [0.2, 0.9, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Interactive floating parallax components */}
      {floatingItems.map((item) => {
        // Use transform multipliers to convert spring state to custom translation paths
        const translateX = useTransform(springX, (v) => v * item.factorX);
        const translateY = useTransform(springY, (v) => v * item.factorY);

        return (
          <motion.div
            key={item.id}
            className="absolute z-10"
            style={{
              left: item.x,
              top: item.y,
              x: translateX,
              y: translateY,
              scale: item.scale,
            }}
          >
            {/* Soft slow drifting overlay to keep life when mouse stops */}
            <motion.div
              animate={{
                y: [0, -8, 8, 0],
                rotate: [item.baseRotate, item.baseRotate + 8, item.baseRotate - 8, item.baseRotate],
              }}
              transition={{
                duration: item.driftingSpeed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="will-change-transform"
            >
              {item.content}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating high-contrast gradient mesh blobs */}
      <div className="absolute inset-x-0 top-0 bottom-0 flex justify-between pointer-events-none -z-10 opacity-30 dark:opacity-20 blur-[130px]">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="w-[350px] h-[350px] rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/15"
        />
      </div>
    </div>
  );
};
