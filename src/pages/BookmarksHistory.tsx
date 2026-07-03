/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Blog, ReadingHistoryItem } from '../types';
import { Bookmark, Clock, Trash, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface BookmarksHistoryProps {
  blogs: Blog[];
  bookmarks: string[];
  readingHistory: ReadingHistoryItem[];
  onToggleBookmark: (id: string) => void;
  onClearHistory: () => void;
  onNavigate: (page: string, blogSlug?: string) => void;
}

export const BookmarksHistory: React.FC<BookmarksHistoryProps> = ({
  blogs,
  bookmarks,
  readingHistory,
  onToggleBookmark,
  onClearHistory,
  onNavigate
}) => {
  // Find saved blogs
  const bookmarkedBlogs = useMemo(() => {
    return blogs.filter(b => bookmarks.includes(b.id) && b.isPublished);
  }, [blogs, bookmarks]);

  // Find history blogs mapped with their reading timestamps
  const historyBlogsMapped = useMemo(() => {
    return readingHistory
      .map(item => {
        const blog = blogs.find(b => b.id === item.blogId);
        return blog ? { ...blog, viewedAt: item.viewedAt } : null;
      })
      .filter((b): b is Blog & { viewedAt: string } => b !== null && b.isPublished);
  }, [blogs, readingHistory]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-custom select-text pb-20">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
          <Sparkles size={14} /> Personal Learning Sandbox
        </span>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
          Bookmarks & Historical Records
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 font-light max-w-lg mx-auto leading-relaxed">
          Revisit saved architectural specifications or view chronological reading paths recorded across your session.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Bookmarks List */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md shadow-sm space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-850 dark:text-zinc-200 border-b border-zinc-150 dark:border-zinc-800 pb-2 flex items-center justify-between">
            <span className="flex items-center gap-2"><Bookmark size={16} className="text-primary" /> Bookmarked Logs ({bookmarkedBlogs.length})</span>
            <span className="text-[10px] text-slate-400 font-normal">Offline cached</span>
          </h3>

          <div className="space-y-4">
            {bookmarkedBlogs.length > 0 ? (
              bookmarkedBlogs.map((blog) => (
                <div 
                  key={blog.id}
                  className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/30 border border-zinc-200/50 dark:border-zinc-900/50 flex justify-between gap-4 items-start hover:border-primary/20 group cursor-pointer transition-all duration-300"
                  onClick={() => onNavigate('blog-detail', blog.slug)}
                >
                  <div className="space-y-1 flex-grow">
                    <span className="text-[9px] uppercase font-bold text-primary">{blog.category}</span>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 font-light">
                      {blog.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(blog.id);
                      }}
                      className="p-2 bg-white/60 dark:bg-zinc-900/50 rounded-lg hover:text-rose-500 hover:bg-rose-500/10 text-slate-400 border border-zinc-200/60 dark:border-zinc-800/60 cursor-pointer transition-all hover:scale-105"
                      title="Remove Bookmark"
                    >
                      <Trash size={12} />
                    </button>
                    <button className="p-2 bg-white/60 dark:bg-zinc-900/50 rounded-lg text-slate-500 border border-zinc-200/60 dark:border-zinc-800/60 group-hover:text-primary transition-colors">
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-3 border border-dashed rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white/20 dark:bg-zinc-900/10">
                <Bookmark className="text-slate-350 mx-auto" size={28} />
                <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">No logs saved yet. Click the bookmark icon overlay on home feed posts.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Reading History */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md shadow-sm space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-850 dark:text-zinc-200 border-b border-zinc-150 dark:border-zinc-800 pb-2 flex items-center justify-between">
            <span className="flex items-center gap-2"><Clock size={16} className="text-secondary" /> Chronological Reads ({historyBlogsMapped.length})</span>
            {historyBlogsMapped.length > 0 && (
              <button 
                onClick={onClearHistory}
                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 hover:underline cursor-pointer flex items-center gap-1 transition-colors"
              >
                <Trash size={10} /> Clear Session Log
              </button>
            )}
          </h3>

          <div className="space-y-4">
            {historyBlogsMapped.length > 0 ? (
              historyBlogsMapped.map((blog, idx) => (
                <div 
                  key={idx}
                  onClick={() => onNavigate('blog-detail', blog.slug)}
                  className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/30 border border-zinc-200/50 dark:border-zinc-900/50 flex justify-between gap-4 items-center hover:border-primary/20 group cursor-pointer transition-all duration-300"
                >
                  <div className="space-y-1 flex-grow">
                    <span className="text-[9px] uppercase font-bold text-secondary">{blog.category}</span>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-light flex items-center gap-1 mt-0.5">
                      Read at {formatTime(blog.viewedAt)} on {formatDate(blog.viewedAt)}
                    </span>
                  </div>

                  <button className="p-2 bg-white/60 dark:bg-zinc-900/50 rounded-lg text-slate-500 border border-zinc-200/60 dark:border-zinc-800/60 shrink-0 group-hover:text-primary transition-colors">
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-3 border border-dashed rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white/20 dark:bg-zinc-900/10">
                <Clock className="text-slate-350 mx-auto" size={28} />
                <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">Session log empty. Click on articles to record reading progressions automatically.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
