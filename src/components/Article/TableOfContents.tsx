/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useEffect } from 'react';
import { Block } from '../../types';
import { BookOpen, Hash } from 'lucide-react';

interface TableOfContentsProps {
  blocks: Block[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ blocks }) => {
  const [activeId, setActiveId] = useState<string>('');

  // Extract all headings (H1, H2, H3)
  const headings = useMemo(() => {
    return blocks
      .filter(b => b.type === 'heading1' || b.type === 'heading2' || b.type === 'heading3')
      .map(b => {
        return {
          id: b.id,
          type: b.type,
          text: b.content
        };
      });
  }, [blocks]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      // Find which heading is currently active in the viewport
      const headingElements = headings
        .map(h => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      if (headingElements.length === 0) return;

      // We define active heading as the one that has scrolled past a specific offset (e.g. 150px from top)
      const offset = 150;
      let currentActiveId = '';

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        const rect = el.getBoundingClientRect();
        
        // If the element's top is above our threshold, it is a candidate
        if (rect.top <= offset) {
          currentActiveId = el.id;
        }
      }

      // If we are at the very top of the page, default to the first heading
      if (window.scrollY < 100 && headingElements.length > 0) {
        currentActiveId = headingElements[0].id;
      }

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to establish initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings, activeId]);

  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Add a slight scroll offset for the sticky header
      setTimeout(() => {
        window.scrollBy({ top: -100, behavior: 'smooth' });
      }, 300);
      setActiveId(id);
    }
  };

  return (
    <div className="space-y-4 font-custom text-left select-none">
      <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-850 pb-2">
        <BookOpen size={14} className="text-primary animate-pulse" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-zinc-200">
          Document Outline
        </h4>
      </div>

      {headings.length > 0 ? (
        <ul className="space-y-1 max-h-[350px] overflow-y-auto pr-2 relative border-l border-zinc-100 dark:border-zinc-800">
          {headings.map((heading, idx) => {
            const isH1 = heading.type === 'heading1';
            const isH2 = heading.type === 'heading2';
            const isActive = heading.id === activeId;

            const indentClass = isH1 
              ? 'pl-3 text-[12px] font-bold' 
              : isH2 
                ? 'pl-6 text-[11.5px] font-semibold' 
                : 'pl-9 text-[11px]';

            const activeColorClass = isActive
              ? 'text-primary dark:text-violet-400 font-extrabold translate-x-1'
              : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200';

            return (
              <li 
                key={idx}
                onClick={() => handleHeadingClick(heading.id)}
                className={`group flex gap-2 items-center py-1.5 cursor-pointer transition-all duration-200 relative ${indentClass} ${activeColorClass}`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-primary rounded-full transition-all duration-300" />
                )}
                
                <Hash 
                  size={10} 
                  className={`shrink-0 transition-colors ${
                    isActive 
                      ? 'text-primary dark:text-violet-400 scale-110' 
                      : 'opacity-40 text-slate-400 group-hover:opacity-80'
                  }`} 
                />
                <span className="truncate">{heading.text}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-[10px] text-slate-400 font-light italic">
          No headings defined in this active document pass.
        </p>
      )}
    </div>
  );
};
