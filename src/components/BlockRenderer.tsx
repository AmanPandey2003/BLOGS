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
    <div className="space-y-6">
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading1':
            return (
              <h1 
                key={block.id} 
                id={block.id}
                className="text-3xl md:text-4xl font-extrabold tracking-tight mt-12 text-slate-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800/50 pb-2 font-custom scroll-mt-24"
              >
                {block.content}
              </h1>
            );
          case 'heading2':
            return (
              <h2 
                key={block.id} 
                id={block.id}
                className="text-2xl md:text-3xl font-bold tracking-tight mt-10 text-slate-900 dark:text-white font-custom scroll-mt-24"
              >
                {block.content}
              </h2>
            );
          case 'heading3':
            return (
              <h3 
                key={block.id} 
                id={block.id}
                className="text-xl md:text-2xl font-semibold tracking-tight mt-8 text-slate-900 dark:text-white font-custom scroll-mt-24"
              >
                {block.content}
              </h3>
            );
          case 'code':
            return (
              <div 
                key={block.id} 
                className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-950 text-zinc-100 font-mono text-sm leading-relaxed my-6 shadow-md"
              >
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 text-xs text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Terminal size={14} className="text-zinc-500" />
                    {block.properties?.language || 'JavaScript'}
                  </span>
                  <button
                    onClick={() => handleCopy(block.content, block.id)}
                    className="p-1 rounded hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedId === block.id ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto select-text selection:bg-zinc-800">
                  <code>{block.content}</code>
                </pre>
              </div>
            );
          case 'callout':
            return (
              <div 
                key={block.id} 
                className={`flex gap-4 p-4 rounded-xl border ${getCalloutStyles(block.properties?.style)} my-6 shadow-sm`}
              >
                {getCalloutIcon(block.properties?.style)}
                <div className="text-sm leading-relaxed">{parseInlineElements(block.content)}</div>
              </div>
            );
          case 'quote':
            return (
              <div 
                key={block.id} 
                className="flex gap-4 my-8 pl-6 border-l-4 border-primary/80 italic text-lg text-slate-600 dark:text-zinc-300 relative"
              >
                <Quote className="shrink-0 opacity-10 text-primary absolute -left-2 -top-4" size={40} />
                <div className="space-y-2">
                  <p className="font-light">{block.content}</p>
                  {block.properties?.caption && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block not-italic">— {block.properties.caption}</span>
                  )}
                </div>
              </div>
            );
          case 'table':
            return (
              <div 
                key={block.id} 
                className="overflow-x-auto my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900"
              >
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-100/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                      {block.properties?.columns?.map((col: string, i: number) => (
                        <th key={i} className="px-5 py-3.5 font-bold text-slate-700 dark:text-zinc-200">{col}</th>
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
                          <td key={ci} className="px-5 py-3.5 text-slate-600 dark:text-zinc-400">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'list-item':
            return (
              <div key={block.id} className="flex items-start gap-2.5 pl-2 my-2.5">
                {block.properties?.checked !== undefined ? (
                  <input
                    type="checkbox"
                    checked={block.properties.checked}
                    readOnly
                    className="mt-1 h-4.5 w-4.5 rounded border-zinc-300 dark:border-zinc-700 text-primary focus:ring-primary/20 cursor-not-allowed"
                  />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-primary/80 mt-2 shrink-0" />
                )}
                <p className={`text-base text-slate-700 dark:text-zinc-300 ${block.properties?.checked ? 'line-through opacity-50' : ''}`}>
                  {parseInlineElements(block.content)}
                </p>
              </div>
            );
          case 'equation':
            return (
              <div 
                key={block.id} 
                className="p-6 my-6 text-center rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-lg font-serif italic text-slate-800 dark:text-zinc-200 overflow-x-auto shadow-sm"
              >
                <div className="text-xs text-slate-400 dark:text-zinc-500 font-mono not-italic uppercase tracking-wider mb-2">Mathematical Formulation</div>
                <div className="py-2 select-all selection:bg-primary/10">{block.content}</div>
              </div>
            );
          case 'image':
            return (
              <div key={block.id} className="my-8 text-center space-y-3">
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
                className="text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-light font-sans select-text selection:bg-primary/20"
              >
                {parseInlineElements(block.content)}
              </p>
            );
        }
      })}
    </div>
  );
};
