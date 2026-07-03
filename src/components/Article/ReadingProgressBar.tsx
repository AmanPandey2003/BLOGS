/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ReadingProgressBar: React.FC = () => {
  // Grab the native viewport scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();
  
  // Pass it through a spring to guarantee smooth, buttery animation transitions
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <div 
      id="reading-progress-container"
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-zinc-100/20 dark:bg-zinc-950/10 z-[9999] pointer-events-none"
    >
      <motion.div
        id="reading-progress-bar"
        className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-500 dark:via-fuchsia-400 dark:to-cyan-400 rounded-r-full shadow-[0_2px_10px_rgba(168,85,247,0.45)]"
        style={{ 
          scaleX,
          transformOrigin: "left"
        }}
      />
    </div>
  );
};
