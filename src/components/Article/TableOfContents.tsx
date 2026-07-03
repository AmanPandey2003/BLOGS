/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Block } from '../../types';
import { BookOpen, Hash } from 'lucide-react';

interface TableOfContentsProps {
  blocks: Block[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ blocks }) => {
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

  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-4 font-custom text-left select-none">
      <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-850 pb-2">
        <BookOpen size={14} className="text-primary" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-zinc-200">
          Document Outline
        </h4>
      </div>

      {headings.length > 0 ? (
        <ul className="space-y-2.5 max-h-[350px] overflow-y-auto pr-2">
          {headings.map((heading, idx) => {
            const isH1 = heading.type === 'heading1';
            const isH2 = heading.type === 'heading2';
            const indentClass = isH1 
              ? 'pl-0 text-[11.5px] font-bold text-slate-700 dark:text-zinc-350' 
              : isH2 
                ? 'pl-3 text-[11px] font-semibold text-slate-500 dark:text-zinc-400' 
                : 'pl-6 text-[10px] text-slate-400 dark:text-zinc-500';

            return (
              <li 
                key={idx}
                onClick={() => handleHeadingClick(heading.id)}
                className={`flex gap-1.5 items-start cursor-pointer hover:text-primary transition-colors leading-tight ${indentClass}`}
              >
                <Hash size={10} className="mt-[2.5px] shrink-0 opacity-40 text-slate-400" />
                <span>{heading.text}</span>
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
