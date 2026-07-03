/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Terminal, Copy, Check, Quote, AlertCircle, FileText, Info, CheckCircle2, ShieldAlert, Youtube, Github, Twitter } from 'lucide-react';
import { motion } from 'motion/react';

interface Block {
  id: string;
  type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'code' | 'callout' | 'quote' | 'image' | 'list-item' | 'equation' | 'table';
  content: string;
  properties?: any;
}

interface BlockRendererProps {
  blocks: Block[];
}

// Custom high-fidelity regex-based syntax highlighter for premium technical blogs
const highlightCode = (code: string, language: string = 'javascript'): React.ReactNode => {
  const lang = language.toLowerCase();
  
  // Safely escape basic HTML chars to prevent script injections
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders: string[] = [];
  const addPlaceholder = (val: string, cls: string) => {
    const id = `___CODE_TOK_PH_${placeholders.length}___`;
    placeholders.push(`<span class="${cls}">${val}</span>`);
    return id;
  };

  try {
    if (lang === 'javascript' || lang === 'typescript' || lang === 'js' || lang === 'ts' || lang === 'jsx' || lang === 'tsx') {
      // 1. Double/Single/Template String Literals
      html = html.replace(/(["'`])(.*?)\1/g, (match) => {
        return addPlaceholder(match, 'text-emerald-400 font-medium');
      });

      // 2. Line & Block Comments
      html = html.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, (match) => {
        return addPlaceholder(match, 'text-zinc-500 italic font-light');
      });

      // 3. Keywords
      html = html.replace(/\b(const|let|var|function|return|import|export|from|default|class|extends|new|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|async|await|interface|type|public|private|protected|readonly|any|void|string|number|boolean|static|typeof|instanceof|in|of|as|implements|keyof|namespace|get|set|debugger|super|this)\b/g, (match) => {
        return `<span class="text-pink-400 font-bold">${match}</span>`;
      });

      // 4. Common functions
      html = html.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g, (match) => {
        return `<span class="text-sky-400 font-medium">${match}</span>`;
      });

      // 5. Builtins / Global Objects
      html = html.replace(/\b(console|window|document|process|React|useState|useEffect|useMemo|useCallback|useRef|useContext|AnimatePresence|motion|Array|Object|String|Number|Boolean|Date|RegExp|Error|Map|Set|Promise|JSON|Math)\b/g, (match) => {
        return `<span class="text-yellow-300 font-medium">${match}</span>`;
      });

      // 6. Numbers & Booleans
      html = html.replace(/\b(\d+|true|false|null|undefined)\b/g, (match) => {
        return `<span class="text-purple-400">${match}</span>`;
      });
    } else if (lang === 'html' || lang === 'xml' || lang === 'svg') {
      // Comments
      html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, (match) => {
        return addPlaceholder(match, 'text-zinc-500 italic font-light');
      });

      // Attribute strings
      html = html.replace(/(\s[a-zA-Z0-9_:-]+)(=)(["'].*?["'])/g, (match, p1, p2, p3) => {
        return ` ${addPlaceholder(p1, 'text-amber-300')}${p2}${addPlaceholder(p3, 'text-emerald-400')}`;
      });

      // Tag names
      html = html.replace(/(&lt;\/?[a-zA-Z0-9_:-]+)/g, (match) => {
        return `<span class="text-pink-400 font-bold">${match}</span>`;
      });
      html = html.replace(/(\/?&gt;)/g, (match) => {
        return `<span class="text-pink-400 font-bold">${match}</span>`;
      });
    } else {
      // Shell / Python / fallback highlights
      // Comments
      html = html.replace(/(#.*)/g, '<span class="text-zinc-500 italic font-light">$1</span>');
      // Strings
      html = html.replace(/(["'])(.*?)\1/g, '<span class="text-emerald-400 font-medium">$1$2$1</span>');
      // Keywords
      html = html.replace(/\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|with|print|in|is|not|and|or|lambda|pass|break|continue)\b/g, '<span class="text-pink-400 font-bold">$1</span>');
      // Numbers
      html = html.replace(/\b(\d+)\b/g, '<span class="text-purple-400">$1</span>');
    }

    // Restore the placeholders containing isolated/protected comments and strings
    for (let i = placeholders.length - 1; i >= 0; i--) {
      html = html.replace(`___CODE_TOK_PH_${i}___`, placeholders[i]);
    }
  } catch (err) {
    // If anything fails in syntax highlighting, return standard escaped text
    return <code>{code}</code>;
  }

  return <code dangerouslySetInnerHTML={{ __html: html }} />;
};

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [zoomedImageId, setZoomedImageId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const getCalloutIcon = (style?: string) => {
    switch (style) {
      case 'success':
        return <CheckCircle2 className="shrink-0 text-emerald-500" size={20} />;
      case 'danger':
        return <ShieldAlert className="shrink-0 text-rose-500" size={20} />;
      case 'warning':
        return <AlertCircle className="shrink-0 text-amber-500" size={20} />;
      default:
        return <Info className="shrink-0 text-blue-500" size={20} />;
    }
  };

  const getCalloutStyles = (style?: string) => {
    switch (style) {
      case 'success':
        return 'bg-emerald-500/5 border-emerald-500/20 text-slate-800 dark:text-zinc-200';
      case 'danger':
        return 'bg-rose-500/5 border-rose-500/20 text-slate-800 dark:text-zinc-200';
      case 'warning':
        return 'bg-amber-500/5 border-amber-500/20 text-slate-800 dark:text-zinc-200';
      default:
        return 'bg-blue-500/5 border-blue-500/20 text-slate-800 dark:text-zinc-200';
    }
  };

  // Standard simple parser for inline bold, italic, and inline code formatting
  const parseInlineElements = (text: string) => {
    if (!text) return '';
    
    // Quick regex replacement simulation for presentation safety
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index} className="italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-pink-500 dark:text-pink-400">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-8 select-text">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading1':
            return (
              <h1 
                key={block.id} 
                id={block.id}
                className="text-3xl md:text-4.5xl font-black tracking-tight mt-16 mb-6 text-slate-900 dark:text-white border-b border-zinc-150 dark:border-zinc-800/80 pb-3 font-custom scroll-mt-24 leading-tight"
              >
                {block.content}
              </h1>
            );
          case 'heading2':
            return (
              <h2 
                key={block.id} 
                id={block.id}
                className="text-2xl md:text-3.5xl font-extrabold tracking-tight mt-12 mb-5 text-slate-900 dark:text-white font-custom scroll-mt-24 leading-tight"
              >
                {block.content}
              </h2>
            );
          case 'heading3':
            return (
              <h3 
                key={block.id} 
                id={block.id}
                className="text-xl md:text-2.5xl font-bold tracking-tight mt-10 mb-4 text-slate-900 dark:text-white font-custom scroll-mt-24 leading-snug"
              >
                {block.content}
              </h3>
            );
          case 'code':
            return (
              <div 
                key={block.id} 
                className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-950 text-zinc-100 font-mono text-sm leading-relaxed my-8 shadow-lg transition-all"
              >
                <div className="flex items-center justify-between px-5 py-3 bg-zinc-900/90 border-b border-zinc-850 text-xs text-zinc-400">
                  <span className="flex items-center gap-2 font-medium">
                    <Terminal size={14} className="text-zinc-500 animate-pulse" />
                    {block.properties?.language || 'JavaScript'}
                  </span>
                  <button
                    id={`copy-btn-${block.id}`}
                    onClick={() => handleCopy(block.content, block.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/50 hover:border-zinc-650 transition-all cursor-pointer text-[11px] font-bold uppercase tracking-wider"
                    title="Copy Code"
                  >
                    {copiedId === block.id ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 overflow-x-auto select-text selection:bg-zinc-800 text-[13.5px] leading-6 font-mono">
                  {highlightCode(block.content, block.properties?.language)}
                </pre>
              </div>
            );
          case 'callout':
            return (
              <div 
                key={block.id} 
                className={`flex gap-4 p-5 rounded-2xl border ${getCalloutStyles(block.properties?.style)} my-8 shadow-sm`}
              >
                {getCalloutIcon(block.properties?.style)}
                <div className="text-[15.5px] leading-7 font-sans">{parseInlineElements(block.content)}</div>
              </div>
            );
          case 'quote':
            return (
              <div 
                key={block.id} 
                className="flex gap-4 my-10 pl-6 border-l-4 border-primary/80 italic text-xl text-slate-600 dark:text-zinc-300 relative bg-zinc-50/50 dark:bg-zinc-900/20 py-5 pr-5 rounded-r-2xl"
              >
                <Quote className="shrink-0 opacity-10 text-primary absolute -left-2 -top-4" size={44} />
                <div className="space-y-2">
                  <p className="font-light leading-relaxed">{block.content}</p>
                  {block.properties?.caption && (
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block not-italic">— {block.properties.caption}</span>
                  )}
                </div>
              </div>
            );
          case 'table':
            return (
              <div 
                key={block.id} 
                className="overflow-x-auto my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900"
              >
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-100/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                      {block.properties?.columns?.map((col: string, i: number) => (
                        <th key={i} className="px-5 py-4 font-bold text-slate-700 dark:text-zinc-200">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.properties?.rows?.map((row: string[], ri: number) => (
                      <tr 
                        key={ri} 
                        className="border-b border-zinc-100 dark:border-zinc-900/50 last:border-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                      >
                        {row.map((cell: string, ci: number) => (
                          <td key={ci} className="px-5 py-4 text-slate-600 dark:text-zinc-400 leading-relaxed">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'list-item':
            return (
              <div key={block.id} className="flex items-start gap-3 pl-2 my-3.5">
                {block.properties?.checked !== undefined ? (
                  <input
                    type="checkbox"
                    checked={block.properties.checked}
                    readOnly
                    className="mt-1 h-4.5 w-4.5 rounded border-zinc-300 dark:border-zinc-700 text-primary focus:ring-primary/20 cursor-not-allowed"
                  />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-primary/80 mt-2.5 shrink-0 animate-pulse" />
                )}
                <p className={`text-[17px] leading-relaxed text-slate-700 dark:text-zinc-300 ${block.properties?.checked ? 'line-through opacity-50' : ''}`}>
                  {parseInlineElements(block.content)}
                </p>
              </div>
            );
          case 'equation':
            return (
              <div 
                key={block.id} 
                className="p-6 my-8 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-lg font-serif italic text-slate-800 dark:text-zinc-200 overflow-x-auto shadow-sm"
              >
                <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono not-italic uppercase tracking-widest mb-2 font-bold">Mathematical Formulation</div>
                <div className="py-2 select-all selection:bg-primary/10">{block.content}</div>
              </div>
            );
          case 'image':
            return (
              <div key={block.id} className="my-10 text-center space-y-3">
                <div 
                  className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-100 dark:bg-zinc-900 inline-block max-w-full cursor-zoom-in"
                  onClick={() => setZoomedImageId(zoomedImageId === block.id ? null : block.id)}
                >
                  <img 
                    src={block.content} 
                    alt={block.properties?.caption || 'Blog Image'} 
                    className={`max-h-[500px] object-cover transition-all duration-300 ${
                      zoomedImageId === block.id ? 'scale-105 filter brightness-105' : 'hover:brightness-[0.98]'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                </div>
                {block.properties?.caption && (
                  <p className="text-xs italic text-slate-500 dark:text-zinc-400 font-light">{block.properties.caption}</p>
                )}
              </div>
            );
          default:
            return (
              <p 
                key={block.id} 
                className="text-[17.5px] md:text-[18.5px] text-slate-700 dark:text-zinc-300 leading-[1.85] md:leading-[1.95] font-normal font-sans select-text selection:bg-primary/20 mb-6 tracking-wide"
              >
                {parseInlineElements(block.content)}
              </p>
            );
        }
      })}
    </div>
  );
};
