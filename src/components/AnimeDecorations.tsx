/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

// 1. Steam particles animation for coffee mug
const SteamParticle: React.FC<{ delay: number; xOffset: number }> = ({ delay, xOffset }) => (
  <motion.path
    d={`M ${xOffset} 30 C ${xOffset - 4} 20, ${xOffset + 4} 10, ${xOffset} 0`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    className="text-slate-400/50 dark:text-zinc-500/40"
    initial={{ opacity: 0, y: 5, scaleY: 0.8 }}
    animate={{ 
      opacity: [0, 0.7, 0], 
      y: -25,
      scaleY: [0.8, 1.2, 0.9],
      x: [xOffset, xOffset + (Math.sin(delay) * 4)]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

// 2. Study Corner SVG - Stack of manga, coffee, keyboard, headphones, notebook & fountain pen
export const StudyCorner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-72 h-80 select-none pointer-events-none drop-shadow-xl"
    >
      {/* Bobbing floating animation for the whole desk arrangement */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <svg viewBox="0 0 300 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Base Desk Line */}
          <line x1="10" y1="280" x2="290" y2="280" stroke="currentColor" strokeWidth="2" className="text-zinc-200 dark:text-zinc-800" strokeDasharray="4 4" />
          
          {/* A stack of manga/light novels */}
          <g id="book-stack">
            {/* Book 1 (Bottom - Blue) */}
            <path d="M 40 260 L 160 260 L 160 276 L 40 276 Z" fill="url(#blue-gradient)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-800" />
            <path d="M 160 260 L 170 265 L 170 273 L 160 276 Z" fill="url(#white-gradient)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-800" />
            <line x1="50" y1="268" x2="140" y2="268" stroke="currentColor" strokeWidth="1" className="text-white/40" />
            <text x="55" y="271" fill="currentColor" className="text-white/70 text-[6px] font-mono font-black tracking-widest">DSA CORE</text>

            {/* Book 2 (Middle - Purple) */}
            <path d="M 45 242 L 155 242 L 155 258 L 45 258 Z" fill="url(#purple-gradient)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-800" />
            <path d="M 155 242 L 165 247 L 165 255 L 155 258 Z" fill="url(#white-gradient)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-800" />
            <line x1="55" y1="250" x2="135" y2="250" stroke="currentColor" strokeWidth="1" className="text-white/40" />
            <text x="60" y="253" fill="currentColor" className="text-white/70 text-[6px] font-mono font-black tracking-widest">ALGORITHMS</text>

            {/* Book 3 (Top - Turquoise) */}
            <path d="M 50 224 L 150 224 L 150 240 L 50 240 Z" fill="url(#turquoise-gradient)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-800" />
            <path d="M 150 224 L 160 229 L 160 237 L 150 240 Z" fill="url(#white-gradient)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-800" />
            <line x1="60" y1="232" x2="130" y2="232" stroke="currentColor" strokeWidth="1" className="text-white/40" />
            <text x="65" y="235" fill="currentColor" className="text-slate-900 dark:text-white text-[6px] font-mono font-black tracking-widest">MATH</text>
            
            {/* Japanese "Study/Learn" Bookmark tab coming out of the book */}
            <path d="M 110 240 L 115 248 L 120 240 Z" fill="#ef4444" opacity="0.9" />
          </g>

          {/* Steaming Coffee Mug on top of books */}
          <g id="coffee-mug" transform="translate(75, 175)">
            <rect x="15" y="15" width="26" height="30" rx="4" fill="url(#mug-gradient)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-300" />
            {/* Mug Handle */}
            <path d="M 41 22 C 46 22, 46 38, 41 38" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-300" />
            {/* Mug rim line */}
            <ellipse cx="28" cy="15" rx="13" ry="2" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-slate-700 dark:text-zinc-300" />
            {/* Liquid inside */}
            <ellipse cx="28" cy="16" rx="11" ry="1.5" fill="#5c4033" />
          </g>
          {/* Animated Steam lines */}
          <g transform="translate(93, 150)">
            <SteamParticle delay={0} xOffset={5} />
            <SteamParticle delay={1.2} xOffset={11} />
            <SteamParticle delay={2.4} xOffset={17} />
          </g>

          {/* Headphones draped on the book stack */}
          <g id="headphones">
            {/* Arch headband */}
            <path d="M 35 250 C 35 180, 165 180, 165 250" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-800 dark:text-zinc-400" />
            <path d="M 33 250 C 33 175, 167 175, 167 250" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-400/50" strokeDasharray="3 3" />
            
            {/* Left Ear Cushion */}
            <rect x="25" y="235" width="12" height="30" rx="3" fill="url(#headphones-cushion)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-400" />
            <rect x="21" y="240" width="4" height="20" rx="1" fill="currentColor" className="text-slate-500 dark:text-zinc-600" />
            
            {/* Right Ear Cushion */}
            <rect x="163" y="235" width="12" height="30" rx="3" fill="url(#headphones-cushion)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-400" />
            <rect x="175" y="240" width="4" height="20" rx="1" fill="currentColor" className="text-slate-500 dark:text-zinc-600" />
          </g>

          {/* Mechanical Keyboard resting in front of the books */}
          <g id="keyboard" transform="translate(145, 235)">
            {/* Keyboard Frame */}
            <polygon points="10,40 120,40 110,65 0,65" fill="url(#keyboard-base)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-400" />
            
            {/* Simulated Key rows (lines & subtle gradient keycaps) */}
            <line x1="12" y1="46" x2="114" y2="46" stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-zinc-600" />
            <line x1="8" y1="52" x2="110" y2="52" stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-zinc-600" />
            <line x1="4" y1="58" x2="106" y2="58" stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-zinc-600" />
            
            {/* Accent Escape Key cap */}
            <rect x="12" y="42" width="6" height="4" rx="1" fill="currentColor" className="text-rose-500" />
            {/* Spacebar */}
            <rect x="36" y="55" width="45" height="4" rx="1" fill="currentColor" className="text-primary" />
          </g>

          {/* Open notebook showing mathematics and algorithms */}
          <g id="notebook" transform="translate(180, 260) rotate(-5)">
            <path d="M 0 0 L 80 -10 L 100 25 L 20 35 Z" fill="url(#white-gradient)" stroke="currentColor" strokeWidth="1.2" className="text-slate-700 dark:text-zinc-400" />
            {/* Inner lines */}
            <line x1="12" y1="3" x2="78" y2="-5" stroke="currentColor" strokeWidth="0.8" className="text-zinc-300 dark:text-zinc-700" />
            <line x1="15" y1="10" x2="81" y2="2" stroke="currentColor" strokeWidth="0.8" className="text-zinc-300 dark:text-zinc-700" />
            <line x1="18" y1="17" x2="84" y2="9" stroke="currentColor" strokeWidth="0.8" className="text-zinc-300 dark:text-zinc-700" />
            <line x1="21" y1="24" x2="87" y2="16" stroke="currentColor" strokeWidth="0.8" className="text-zinc-300 dark:text-zinc-700" />
            
            {/* Handwritten formula or code */}
            <path d="M 25 15 Q 35 12, 40 16 T 55 12" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-500 dark:text-zinc-400" />
            <path d="M 28 22 Q 40 20, 50 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-500 dark:text-zinc-400" />
          </g>

          {/* Fountain pen resting on the notebook */}
          <g id="fountain-pen" transform="translate(230, 258) rotate(20)">
            <rect x="0" y="0" width="4" height="42" rx="1.5" fill="url(#pen-barrel)" stroke="currentColor" strokeWidth="1" className="text-slate-800 dark:text-zinc-300" />
            {/* Brass Cap and Nib */}
            <path d="M -1 32 L 5 32 L 4 38 L 2 45 L 0 38 Z" fill="#d97706" />
            <line x1="2" y1="32" x2="2" y2="44" stroke="#1e293b" strokeWidth="0.8" />
          </g>

          {/* Sticky Notes on desk */}
          <g id="sticky-notes" transform="translate(20, 275) rotate(15)">
            <rect x="0" y="0" width="22" height="22" fill="#fef08a" stroke="currentColor" strokeWidth="1" className="text-amber-500" />
            {/* Euler symbol draft */}
            <text x="3" y="11" fill="#b45309" className="text-[5px] font-mono">e^iπ+1=0</text>
            <path d="M 4 15 Q 11 18, 18 15" fill="none" stroke="#b45309" strokeWidth="0.5" />
          </g>

          {/* Vector Gradients Defs */}
          <defs>
            <linearGradient id="blue-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
            <linearGradient id="purple-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient id="turquoise-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
            <linearGradient id="white-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f4f4f5" />
            </linearGradient>
            <linearGradient id="mug-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary-color, #a855f7)" stopOpacity={0.85} />
              <stop offset="100%" stopColor="var(--secondary-color, #ec4899)" stopOpacity={0.85} />
            </linearGradient>
            <linearGradient id="headphones-cushion" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>
            <linearGradient id="keyboard-base" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <linearGradient id="pen-barrel" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
};

// 3. Curiosity Spot SVG - Window, Telescope, Laptop displaying code & Binary Tree
export const CuriositySpot: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-72 h-80 select-none pointer-events-none drop-shadow-xl"
    >
      {/* Floating animation (offset slightly for asynchronous rhythm) */}
      <motion.div
        animate={{ y: [-4, 2, -4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="w-full h-full"
      >
        <svg viewBox="0 0 300 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Base Desk Line */}
          <line x1="10" y1="280" x2="290" y2="280" stroke="currentColor" strokeWidth="2" className="text-zinc-200 dark:text-zinc-800" strokeDasharray="4 4" />

          {/* Circular Anime-style window looking out to the sky */}
          <g id="anime-window">
            <circle cx="150" cy="115" r="70" fill="url(#sky-gradient)" stroke="currentColor" strokeWidth="2" className="text-slate-700 dark:text-zinc-800" />
            {/* Window Pane Lines */}
            <line x1="150" y1="45" x2="150" y2="185" stroke="currentColor" strokeWidth="1.5" className="text-slate-700/30 dark:text-zinc-850" />
            <line x1="80" y1="115" x2="220" y2="115" stroke="currentColor" strokeWidth="1.5" className="text-slate-700/30 dark:text-zinc-850" />
            
            {/* Constellation Stars */}
            <circle cx="120" cy="80" r="1.5" fill="#ffffff" className="animate-pulse" />
            <circle cx="130" cy="95" r="1" fill="#ffffff" opacity="0.7" />
            <circle cx="165" cy="75" r="1.5" fill="#ffffff" />
            <circle cx="185" cy="100" r="2" fill="#ffffff" className="animate-pulse" />
            
            {/* Constellation lines */}
            <line x1="120" y1="80" x2="130" y2="95" stroke="#ffffff" strokeWidth="0.3" opacity="0.4" />
            <line x1="130" y1="95" x2="165" y2="75" stroke="#ffffff" strokeWidth="0.3" opacity="0.4" />
            <line x1="165" y1="75" x2="185" y2="100" stroke="#ffffff" strokeWidth="0.3" opacity="0.4" />

            {/* Anime Mountain outlines inside window */}
            <path d="M 80 160 Q 110 135, 130 150 T 180 140 T 220 165" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-600/40 dark:text-zinc-800/60" />
            
            {/* Glowing moon/sun crescent */}
            <path d="M 175 75 C 175 60, 195 60, 195 75 C 190 73, 180 73, 175 75" fill="#fef08a" opacity="0.9" />
          </g>

          {/* Student/Reader Silhouette studying beside the window */}
          <g id="reader-silhouette" transform="translate(75, 125)" opacity="0.25" className="text-slate-500 dark:text-zinc-500">
            {/* Silhouette head and book */}
            <circle cx="15" cy="20" r="10" fill="currentColor" />
            <path d="M 5 35 C 5 25, 25 25, 25 35" fill="currentColor" />
            <path d="M 18 22 L 32 15 L 34 26 L 20 30 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* Laptop Open on Desk displaying code */}
          <g id="laptop" transform="translate(145, 195)">
            {/* Laptop Base */}
            <path d="M 10 70 L 130 70 L 122 84 L 18 84 Z" fill="url(#laptop-base-gradient)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-500" />
            
            {/* Laptop Lid/Screen (Angled) */}
            <path d="M 22 15 L 118 15 L 130 70 L 10 70 Z" fill="url(#laptop-screen-bg)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-500" />
            {/* Inner Screen Display (Glassmorphism Glow) */}
            <path d="M 25 18 L 115 18 L 126 67 L 14 67 Z" fill="url(#screen-code-glow)" />
            
            {/* Code lines on screen */}
            <g transform="translate(30, 24)">
              {/* Line 1 (Tabbed) */}
              <rect x="0" y="0" width="22" height="2.5" rx="1" fill="#60a5fa" />
              <rect x="25" y="0" width="14" height="2.5" rx="1" fill="#f472b6" />
              
              {/* Line 2 (Indented) */}
              <rect x="6" y="6" width="30" height="2.5" rx="1" fill="#34d399" />
              <rect x="39" y="6" width="16" height="2.5" rx="1" fill="#f59e0b" />
              
              {/* Line 3 (Indented further) */}
              <rect x="12" y="12" width="25" height="2.5" rx="1" fill="#a78bfa" />
              <rect x="40" y="12" width="8" height="2.5" rx="1" fill="#60a5fa" />
              
              {/* Line 4 */}
              <rect x="6" y="18" width="18" height="2.5" rx="1" fill="#34d399" />
              <rect x="27" y="18" width="32" height="2.5" rx="1" fill="#fb7185" />
              
              {/* Line 5 */}
              <rect x="0" y="24" width="14" height="2.5" rx="1" fill="#f472b6" />
            </g>

            {/* Glowing Logo on Lid (subtle back of the screen indicator) */}
            <circle cx="70" cy="42" r="3" fill="#a855f7" opacity="0.3" className="animate-pulse" />
          </g>

          {/* Small Telescope representing curiosity, pointing up */}
          <g id="telescope" transform="translate(60, 185) rotate(-35)">
            {/* Tripod Stand */}
            <line x1="20" y1="40" x2="5" y2="72" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-500" />
            <line x1="20" y1="40" x2="35" y2="72" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-500" />
            <line x1="20" y1="40" x2="20" y2="75" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-500" />

            {/* Telescope Body Main tube */}
            <rect x="0" y="25" width="48" height="12" rx="2" fill="url(#telescope-body)" stroke="currentColor" strokeWidth="1.5" className="text-slate-700 dark:text-zinc-300" />
            {/* Telescope Dial focus wheel */}
            <circle cx="16" cy="22" r="2.5" fill="#d97706" />
            {/* End Cap Lens */}
            <rect x="44" y="23" width="5" height="16" rx="1" fill="#38bdf8" stroke="currentColor" strokeWidth="1" className="text-slate-700 dark:text-zinc-300" />
            {/* Viewfinder eyepiece */}
            <rect x="-4" y="20" width="8" height="4" rx="0.5" fill="#1e293b" />
          </g>

          {/* Binary Tree drawing on paper */}
          <g id="tree-dsa" transform="translate(35, 255) rotate(-10)">
            <rect x="0" y="0" width="44" height="30" rx="3" fill="url(#white-gradient)" stroke="currentColor" strokeWidth="1" className="text-slate-600 dark:text-zinc-500" />
            {/* Tree Nodes & Edges (Drawn by hand aesthetic) */}
            <circle cx="22" cy="6" r="2.2" fill="none" stroke="#6366f1" strokeWidth="0.8" />
            <circle cx="12" cy="14" r="2.2" fill="none" stroke="#6366f1" strokeWidth="0.8" />
            <circle cx="32" cy="14" r="2.2" fill="none" stroke="#6366f1" strokeWidth="0.8" />
            <circle cx="7" cy="22" r="2.2" fill="none" stroke="#6366f1" strokeWidth="0.8" />
            <circle cx="17" cy="22" r="2.2" fill="none" stroke="#6366f1" strokeWidth="0.8" />
            
            {/* Edges */}
            <line x1="20" y1="8" x2="14" y2="12" stroke="#6366f1" strokeWidth="0.6" />
            <line x1="24" y1="8" x2="30" y2="12" stroke="#6366f1" strokeWidth="0.6" />
            <line x1="11" y1="16" x2="8" y2="20" stroke="#6366f1" strokeWidth="0.6" />
            <line x1="13" y1="16" x2="16" y2="20" stroke="#6366f1" strokeWidth="0.6" />
          </g>

          {/* Sparkly Star of Curiosity floating */}
          <motion.g
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            transform="translate(230, 160)"
          >
            <path d="M 10 0 L 13 7 L 20 10 L 13 13 L 10 20 L 7 13 L 0 10 L 7 7 Z" fill="url(#purple-gradient)" />
          </motion.g>

          <defs>
            <linearGradient id="sky-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="60%" stopColor="#311042" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="laptop-base-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="laptop-screen-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="screen-code-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#020617" stopOpacity={0.95} />
            </linearGradient>
            <linearGradient id="telescope-body" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
};

// 4. scattered floating objects with slow motion rotation for page columns
export const DeveloperScatteredObjects: React.FC = () => {
  const elements = [
    { text: 'code_tag', x: '4%', y: '8%', delay: 0, r: 45, scale: 0.9 },
    { text: 'curly_brackets', x: '94%', y: '12%', delay: 2, r: -30, scale: 0.95 },
    { text: 'parentheses', x: '6%', y: '22%', delay: 4, r: 25, scale: 1 },
    { text: 'react_atom', x: '92%', y: '26%', delay: 1.5, r: 360, scale: 1.05 },
    { text: 'javascript', x: '3%', y: '38%', delay: 3, r: 15, scale: 0.85 },
    { text: 'ai_spark', x: '95%', y: '42%', delay: 5, r: -40, scale: 1 },
    { text: 'database', x: '5%', y: '50%', delay: 1, r: -15, scale: 0.9 },
    { text: 'git_branch', x: '93%', y: '56%', delay: 3.5, r: 20, scale: 0.95 },
    { text: 'cloud', x: '7%', y: '68%', delay: 0.5, r: -25, scale: 1 },
    { text: 'api_badge', x: '94%', y: '72%', delay: 2.5, r: 10, scale: 0.85 },
    { text: 'graph', x: '4%', y: '82%', delay: 4.5, r: -35, scale: 0.9 },
    { text: 'terminal', x: '92%', y: '86%', delay: 1.2, r: 15, scale: 0.95 },
    { text: 'matrix', x: '5%', y: '93%', delay: 3.2, r: -10, scale: 0.8 },
    { text: 'binary_tree', x: '93%', y: '96%', delay: 5.2, r: 30, scale: 0.9 }
  ];

  const renderContent = (type: string) => {
    switch (type) {
      case 'code_tag':
        return (
          <svg className="w-10 h-10 stroke-primary/80 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        );
      case 'curly_brackets':
        return <span className="font-mono text-2xl text-indigo-500/80 font-extrabold select-none">{"{ }"}</span>;
      case 'parentheses':
        return <span className="font-mono text-2xl text-fuchsia-500/80 font-extrabold select-none">{"( )"}</span>;
      case 'react_atom':
        return (
          <svg className="w-11 h-11 stroke-cyan-500/80 animate-spin-slow" viewBox="0 0 24 24" strokeWidth="1.2" fill="none">
            <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(150 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-cyan-500/60" />
          </svg>
        );
      case 'javascript':
        return (
          <div className="w-9 h-9 rounded bg-yellow-500/10 border border-yellow-500/20 flex items-end justify-end p-1 select-none">
            <span className="font-mono text-xs font-black text-yellow-500/80 leading-none">JS</span>
          </div>
        );
      case 'ai_spark':
        return (
          <svg className="w-10 h-10 stroke-purple-500/80 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096a.402.402 0 00-.332-.332L2.76 14.76c-.512-.081-.512-.82 0-.9l5.096-.813a.402.402 0 00.332-.332L9 7.61c.081-.512.82-.512.9 0l.813 5.096c.081.203.242.364.444.444l5.096.813c.512.081.512.82 0 .9l-5.096.813a.403.403 0 00-.444.444z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.007 6.057L18.5 9l-.507-2.943a.225.225 0 00-.186-.186L14.87 5.37c-.287-.045-.287-.46 0-.507l2.943-.507a.225.225 0 00.186-.186L18.5 1.23c.045-.287.46-.287.507 0l.507 2.943c.045.114.135.204.25.25l2.943.507c.287.045.287.46 0 .507l-2.943.507a.225.225 0 00-.25.25z" />
          </svg>
        );
      case 'database':
        return (
          <svg className="w-10 h-10 stroke-teal-500/80 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          </svg>
        );
      case 'git_branch':
        return (
          <svg className="w-10 h-10 stroke-rose-500/80 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 15V9a4 4 0 0 0-4-4h-5M6 9v6" />
          </svg>
        );
      case 'cloud':
        return (
          <svg className="w-10 h-10 stroke-sky-500/80 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
        );
      case 'api_badge':
        return (
          <div className="font-mono text-xs text-emerald-500/80 font-black tracking-widest border border-emerald-500/20 rounded px-1.5 py-0.5 select-none bg-emerald-500/5">
            API
          </div>
        );
      case 'graph':
        return (
          <svg className="w-10 h-10 stroke-violet-500/80 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        );
      case 'terminal':
        return (
          <svg className="w-10 h-10 stroke-indigo-500/80 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'matrix':
        return (
          <div className="font-mono text-[8px] text-emerald-500/60 dark:text-emerald-400/60 flex flex-col font-black leading-none select-none tracking-widest">
            <span>1 0 1 0</span>
            <span>0 1 0 1</span>
            <span>1 1 0 0</span>
            <span>0 0 1 1</span>
          </div>
        );
      case 'binary_tree':
        return (
          <svg className="w-10 h-10 stroke-indigo-500/80 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
            <circle cx="12" cy="4" r="2" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="18" cy="12" r="2" />
            <circle cx="3" cy="20" r="2" />
            <circle cx="9" cy="20" r="2" />
            <path d="M11 6l-3 4M13 6l3 4M5 14l-1 4M7 14l1 4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {elements.map((item, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ 
            left: item.x, 
            top: item.y,
            opacity: 0.06 // Strictly under 8% opacity
          }}
          animate={{
            y: [0, -25, 25, 0],
            x: [0, 15, -15, 0],
            rotate: [0, item.r * 0.25, -item.r * 0.25, 0],
            scale: [item.scale, item.scale * 1.05, item.scale * 0.95, item.scale]
          }}
          transition={{
            duration: 35 + idx * 5, // Move very slowly
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay
          }}
        >
          {renderContent(item.text)}
        </motion.div>
      ))}
    </div>
  );
};

// 5. Modern Premium Mesh Background with Grid Lines and Circuit/Math Elements
export const ModernMeshBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden select-none bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* 1. Ultra Fine Grid Lines Layer */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          color: 'var(--color-slate-400, #94a3b8)',
        }}
      />

      {/* 2. Soft Gradient Mesh Spots (Vercel/Linear Style) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-[130px] opacity-70 dark:opacity-40" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-cyan-500/10 via-emerald-500/5 to-transparent blur-[140px] opacity-70 dark:opacity-30" />
      <div className="absolute bottom-1/4 left-10 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-fuchsia-500/5 via-violet-500/10 to-transparent blur-[160px] opacity-60 dark:opacity-30" />

      {/* 3. Star particles drift layer */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.12]">
        {[
          { x: '15%', y: '10%', s: 2 },
          { x: '85%', y: '25%', s: 1.5 },
          { x: '45%', y: '60%', s: 2.5 },
          { x: '10%', y: '45%', s: 1.8 },
          { x: '90%', y: '70%', s: 2.2 },
          { x: '30%', y: '85%', s: 1.6 },
          { x: '75%', y: '90%', s: 2 }
        ].map((star, sIdx) => (
          <motion.div
            key={sIdx}
            className="absolute rounded-full bg-primary/40 dark:bg-white"
            style={{ 
              left: star.x, 
              top: star.y, 
              width: star.s, 
              height: star.s,
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
            }}
            animate={{ 
              opacity: [0.2, 1, 0.2], 
              scale: [0.8, 1.2, 0.8] 
            }}
            transition={{ 
              duration: 4 + sIdx * 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
    </div>
  );
};
