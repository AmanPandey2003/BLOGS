/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Blog } from '../types';
import { Clock, Bookmark, Calendar, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onNavigate: (page: string, slug?: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  isBookmarked,
  onToggleBookmark,
  onNavigate,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Parse publish date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Setup difficulty colors
  const getDifficultyStyles = (level: string) => {
    switch (level) {
      case 'Beginner':
        return {
          text: 'text-emerald-600 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          border: 'border-emerald-200/50 dark:border-emerald-800/30',
          dot: 'bg-emerald-500',
        };
      case 'Intermediate':
        return {
          text: 'text-amber-600 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-950/40',
          border: 'border-amber-200/50 dark:border-amber-800/30',
          dot: 'bg-amber-500',
        };
      case 'Advanced':
      default:
        return {
          text: 'text-rose-600 dark:text-rose-400',
          bg: 'bg-rose-50 dark:bg-rose-950/40',
          border: 'border-rose-200/50 dark:border-rose-800/30',
          dot: 'bg-rose-500',
        };
    }
  };

  const diffStyles = getDifficultyStyles(blog.difficulty);

  return (
    <motion.div
      id={`blog-card-${blog.id}`}
      className="relative flex flex-col h-full rounded-3xl p-[1.5px] transition-all duration-500"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)'
          : 'linear-gradient(135deg, rgba(228,228,231,0.6) 0%, rgba(228,228,231,0.3) 100%)',
      }}
      animate={{
        y: isHovered ? -8 : 0,
        boxShadow: isHovered
          ? '0 20px 40px -15px rgba(139, 92, 246, 0.25), 0 0 30px -5px rgba(236, 72, 153, 0.15)'
          : '0 4px 20px -8px rgba(0, 0, 0, 0.05)',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic ambient soft glow behind card on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.45, scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute -inset-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 rounded-[32px] blur-2xl -z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main card inner body */}
      <div className="flex flex-col h-full rounded-[22.5px] bg-white dark:bg-zinc-900/90 backdrop-blur-xl overflow-hidden transition-all duration-300">
        
        {/* Large featured cover image */}
        <div 
          onClick={() => onNavigate('blog-detail', blog.slug)}
          className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative cursor-pointer"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent z-10" />

          <motion.img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            animate={{
              scale: isHovered ? 1.05 : 1.0,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Top category label & difficulty badge overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
            <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-zinc-950/85 backdrop-blur-md text-white rounded-xl shadow-md border border-white/10">
              {blog.category}
            </span>
            <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 backdrop-blur-sm border ${diffStyles.bg} ${diffStyles.text} ${diffStyles.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${diffStyles.dot} animate-pulse`} />
              {blog.difficulty}
            </span>
          </div>

          {/* Bookmark Toggle Icon overlay */}
          <motion.button
            id={`bookmark-btn-${blog.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(blog.id);
            }}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-zinc-950/85 backdrop-blur-md text-white hover:bg-zinc-900 hover:scale-110 active:scale-95 transition-all cursor-pointer z-20 border border-white/10 shadow-lg"
            title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark 
              size={15} 
              className={isBookmarked ? 'fill-fuchsia-400 text-fuchsia-400 filter drop-shadow-[0_0_6px_#ec4899]' : 'text-zinc-200'} 
            />
          </motion.button>
        </div>

        {/* Card Content Info */}
        <div className="p-6 flex flex-col flex-grow justify-between space-y-5 bg-gradient-to-b from-white to-zinc-50/50 dark:from-transparent dark:to-transparent">
          <div className="space-y-3">
            
            {/* Metadata (Reading time and publish date) */}
            <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-widest font-bold font-mono">
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-slate-400 dark:text-zinc-500" />
                {blog.metrics.readingTime} min read
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={11} className="text-slate-400 dark:text-zinc-500" />
                {formatDate(blog.publishedAt)}
              </span>
            </div>
            
            {/* Title */}
            <h4 
              onClick={() => onNavigate('blog-detail', blog.slug)}
              className="text-lg font-black text-slate-900 dark:text-white leading-snug hover:text-primary cursor-pointer transition-colors line-clamp-2"
            >
              {blog.title}
            </h4>

            {/* Subtitle / Excerpt */}
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-light line-clamp-2 leading-relaxed">
              {blog.subtitle}
            </p>
          </div>

          {/* Footer Area: Author & CTA */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-4">
            
            {/* Author info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={blog.author.avatar} 
                alt={blog.author.name} 
                className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <span className="block text-[11px] font-black text-slate-700 dark:text-zinc-300 truncate leading-none">
                  {blog.author.name}
                </span>
                <span className="block text-[9px] text-slate-400 truncate mt-0.5">
                  {blog.author.role}
                </span>
              </div>
            </div>

            {/* Premium Continue Reading Action */}
            <button
              onClick={() => onNavigate('blog-detail', blog.slug)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest text-primary hover:text-fuchsia-500 transition-all duration-300 cursor-pointer shrink-0"
            >
              <span className="relative">
                Continue Reading
                <motion.span 
                  className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-gradient-to-r from-violet-600 to-fuchsia-500"
                  animate={{ width: isHovered ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight size={11} className="ml-0.5" />
              </motion.span>
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
