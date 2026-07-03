import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Interfaces for canvas rendering
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const InteractiveCursor: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'dark' }) => {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Real mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for the glowing outer cursor ring
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

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

      // Create particle on fast movement
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 4) {
        const particleColor = theme === 'dark' 
          ? (Math.random() > 0.5 ? '#8b5cf6' : '#ec4899') // Violet or Pink
          : (Math.random() > 0.5 ? '#6366f1' : '#06b6d4'); // Indigo or Cyan

        // Add 1-2 tiny particles
        const count = distance > 15 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 1.5 - (dx * 0.05),
            vy: (Math.random() - 0.5) * 1.5 - (dy * 0.05),
            alpha: 0.8,
            size: Math.random() * 2 + 1,
            color: particleColor
          });
        }
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Detect click to spawn ripples and bursts
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);

      const rippleColor = theme === 'dark' ? '#d946ef' : '#8b5cf6'; // Fuchsia / Violet
      // Add ripple
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: Math.random() * 20 + 35,
        alpha: 1.0,
        color: rippleColor
      });

      // Add click burst particles
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: Math.random() * 3 + 1.5,
          color: rippleColor
        });
      }
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

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
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
  }, [mounted, isPointer, theme, mouseX, mouseY]);

  // Handle canvas sizing and draw loop
  useEffect(() => {
    if (!mounted || !isPointer) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and Draw Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02; // Fade out slowly

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Update and Draw Ripples
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += (r.maxRadius - r.radius) * 0.12;
        r.alpha -= 0.04;

        if (r.alpha <= 0 || r.radius >= r.maxRadius - 1) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = r.alpha;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mounted, isPointer]);

  if (!mounted || !isPointer) return null;

  return (
    <>
      {/* 1. Viewport Canvas for Particle Trail & Click Ripples */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
        style={{ backfaceVisibility: 'hidden' }}
      />

      {/* 2. Precision Dot */}
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50 bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 3. Soft Glowing Outer Ring */}
      <motion.div 
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 border transition-all duration-150"
        style={{
          x: cursorX,
          y: cursorY,
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

// 4. Beautiful Magnetic Wrapper for Buttons & Links
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
