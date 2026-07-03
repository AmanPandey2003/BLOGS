/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export const DecorativeElements: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Isometric 3D React Atom */}
      <motion.div
        className="absolute left-[8%] top-[18%] md:left-[12%] md:top-[22%] opacity-40 dark:opacity-30 hidden sm:block"
        animate={{
          y: [0, -20, 0],
          rotateX: [60, 55, 60],
          rotateY: [15, 25, 15],
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      >
        <svg className="w-16 h-16 filter drop-shadow-[0_8px_16px_rgba(56,189,248,0.3)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="50" rx="44" ry="16" stroke="url(#react-ring-1)" strokeWidth="3" transform="rotate(0 50 50)" />
          <ellipse cx="50" cy="50" rx="44" ry="16" stroke="url(#react-ring-2)" strokeWidth="3" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="44" ry="16" stroke="url(#react-ring-3)" strokeWidth="3" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="8" fill="url(#react-core)" className="animate-pulse" />
          <defs>
            <linearGradient id="react-ring-1" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="react-ring-2" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="react-ring-3" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <radialGradient id="react-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. 3D Isometric Bracket Blocks */}
      <motion.div
        className="absolute right-[10%] top-[28%] opacity-35 dark:opacity-25 hidden md:block"
        animate={{
          y: [0, 18, 0],
          x: [0, -8, 0],
          rotateX: [35, 30, 35],
          rotateY: [-45, -35, -45],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        <svg className="w-20 h-20 filter drop-shadow-[0_12px_24px_rgba(168,85,247,0.35)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left curly bracket 3D block representation */}
          <path d="M 25 25 L 35 20 L 35 40 L 25 45 Z" fill="url(#bracket-side-1)" />
          <path d="M 35 20 L 55 20 L 55 25 L 35 25 Z" fill="url(#bracket-top)" />
          <path d="M 35 25 L 55 25 L 55 45 L 35 45 Z" fill="url(#bracket-front)" />
          {/* Right curly bracket 3D block representation */}
          <path d="M 75 45 L 65 50 L 65 70 L 75 65 Z" fill="url(#bracket-side-2)" />
          <path d="M 65 50 L 45 50 L 45 55 L 65 55 Z" fill="url(#bracket-top)" />
          <path d="M 65 55 L 45 55 L 45 75 L 65 75 Z" fill="url(#bracket-front-2)" />
          
          <defs>
            <linearGradient id="bracket-side-1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="bracket-side-2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
            <linearGradient id="bracket-front" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c084fc" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="bracket-front-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f472b6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="bracket-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 3. 3D Floating Book of knowledge */}
      <motion.div
        className="absolute left-[6%] bottom-[25%] opacity-30 dark:opacity-20 hidden lg:block"
        animate={{
          y: [0, -15, 0],
          rotateX: [25, 35, 25],
          rotateY: [35, 25, 35],
          rotateZ: [-5, 5, -5],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        <svg className="w-24 h-24 filter drop-shadow-[0_15px_30px_rgba(20,184,166,0.3)]" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Book Spine & Cover 3D structure */}
          <path d="M 20 45 Q 60 30, 100 45 L 105 85 Q 65 70, 25 85 Z" fill="url(#book-cover)" stroke="#115e59" strokeWidth="1.5" />
          {/* Inside pages split */}
          <path d="M 25 43 Q 60 32, 60 78 L 25 85 Z" fill="url(#book-pages-left)" />
          <path d="M 60 78 Q 60 32, 95 43 L 100 85 Z" fill="url(#book-pages-right)" />
          
          <defs>
            <linearGradient id="book-cover" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
            <linearGradient id="book-pages-left" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f4f4f5" />
              <stop offset="100%" stopColor="#e4e4e7" />
            </linearGradient>
            <linearGradient id="book-pages-right" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e4e4e7" />
              <stop offset="100%" stopColor="#f4f4f5" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 4. 3D Floating Glassmorphic Code Terminal */}
      <motion.div
        className="absolute right-[8%] bottom-[15%] opacity-40 dark:opacity-20 hidden md:block"
        animate={{
          y: [0, -18, 0],
          x: [0, 6, 0],
          rotateX: [45, 40, 45],
          rotateY: [-25, -30, -25],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
      >
        <div className="w-48 h-32 rounded-2xl border border-white/20 dark:border-zinc-800/50 bg-gradient-to-br from-white/10 to-white/5 dark:from-zinc-950/20 dark:to-zinc-950/5 backdrop-blur-md p-4 flex flex-col justify-between shadow-[0_16px_32px_rgba(0,0,0,0.1)]">
          {/* Terminal Window Header */}
          <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 dark:border-zinc-800/30">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            <span className="text-[9px] font-mono text-slate-400 dark:text-zinc-500 ml-2 tracking-wider">main.rs</span>
          </div>
          
          {/* Terminal Body Code */}
          <div className="flex-1 font-mono text-[10px] space-y-1.5 pt-3 leading-relaxed">
            <div className="flex items-center gap-1">
              <span className="text-purple-400">fn</span>
              <span className="text-blue-400">explore</span>
              <span className="text-zinc-400">() {"{"}</span>
            </div>
            <div className="pl-4 flex items-center gap-1">
              <span className="text-emerald-400">let</span>
              <span className="text-zinc-300">curiosity =</span>
              <span className="text-cyan-400">true</span>
              <span className="text-zinc-400">;</span>
            </div>
            <div className="pl-4 text-slate-500 dark:text-zinc-600">// Keep learning...</div>
            <div className="text-zinc-400">{"}"}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
