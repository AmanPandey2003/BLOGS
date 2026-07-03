/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Blog } from '../types';
import { ArrowRight, Sparkles, BookOpen, Star, TrendingUp, Users, Calendar, ArrowUpRight, Search, Clock, ChevronRight, Bookmark, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useCustomization } from '../contexts/CustomizationContext';
import { TESTIMONIALS } from '../data/mockData';

interface HomeProps {
  blogs: Blog[];
  onNavigate: (page: string, slug?: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onSubscribe: (email: string) => boolean;
  subscribersCount?: number;
  readersCount?: number;
}

export const Home: React.FC<HomeProps> = ({ 
  blogs, 
  onNavigate, 
  bookmarks, 
  onToggleBookmark, 
  onSubscribe,
  subscribersCount = 0,
  readersCount = 2
}) => {
  const { config } = useCustomization();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Parse blogs lists
  const publishedBlogs = useMemo(() => blogs.filter(b => b.isPublished), [blogs]);

  const featuredBlog = useMemo(() => {
    const pinned = publishedBlogs.find(b => b.isPinned);
    if (pinned) return pinned;
    const feat = publishedBlogs.find(b => b.isFeatured);
    return feat || publishedBlogs[0];
  }, [publishedBlogs]);

  const trendingBlogs = useMemo(() => {
    return [...publishedBlogs]
      .sort((a, b) => b.metrics.views - a.metrics.views)
      .slice(0, 4);
  }, [publishedBlogs]);

  const editorsPicks = useMemo(() => {
    return publishedBlogs.filter(b => b.isFeatured).slice(0, 3);
  }, [publishedBlogs]);

  // Extract unique categories and tags from published blogs
  const categories = useMemo(() => {
    const cats = publishedBlogs.map(b => b.category);
    return ['All', ...Array.from(new Set(cats))].slice(0, 8);
  }, [publishedBlogs]);

  const popularTags = useMemo(() => {
    const tags = publishedBlogs.flatMap(b => b.tags);
    return Array.from(new Set(tags)).slice(0, 15);
  }, [publishedBlogs]);

  // Filter latest articles
  const filteredLatestBlogs = useMemo(() => {
    return publishedBlogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [publishedBlogs, searchQuery, selectedCategory]);

  const handleSubscribeForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const success = onSubscribe(email);
      if (success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden font-custom">
      {/* 1. Large Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-36 md:pb-40 flex flex-col items-center text-center px-4 max-w-5xl mx-auto space-y-10">
        {/* Apple & Vercel Spotlight Blur backdrop */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-40 pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-primary/20 blur-[130px] animate-pulse glow-spotlight" />
          <div className="w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[100px] -ml-32 glow-spotlight" />
          <div className="w-[300px] h-[300px] rounded-full bg-accent/10 blur-[90px] ml-40 glow-spotlight" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md text-xs font-semibold text-slate-800 dark:text-zinc-200 select-none cursor-pointer hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition-all shadow-sm active:scale-98"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="text-primary font-bold">2026 Engine</span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="font-medium">{config.tagline}</span>
        </motion.div>

        {(() => {
          const rawTitle = config.heroTitle;
          const parts = rawTitle.split('.').map(p => p.trim()).filter(Boolean);
          
          if (parts.length >= 2) {
            const part1 = parts[0];
            const part2 = parts[1];
            const part3 = parts[2] || '';
            
            const hasWith = part3.toLowerCase().startsWith('with');
            const brandText = hasWith ? part3.substring(4).trim() : part3;
            const prefix = hasWith ? 'with' : '';
            
            return (
              <div className="space-y-4 max-w-4xl mx-auto flex flex-col items-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]"
                >
                  {part1}
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-700 dark:text-zinc-300"
                >
                  {part2}
                </motion.div>

                {brandText && (
                  <motion.div 
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-slate-400 dark:text-zinc-500 uppercase flex items-center gap-1.5 mt-2"
                  >
                    {prefix && <span className="lowercase italic font-serif">{prefix}</span>}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent font-black relative inline-block hover:scale-102 transition-transform normal-case">
                      {brandText}
                    </span>
                  </motion.div>
                )}
              </div>
            );
          } else {
            return (
              <motion.h1 
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05] max-w-4xl"
              >
                {rawTitle.includes('StringToTech') ? (
                  <>
                    {rawTitle.split('StringToTech')[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent relative inline-block font-black hover:scale-101 transition-transform">
                      StringToTech
                    </span>
                    {rawTitle.split('StringToTech')[1]}
                  </>
                ) : (
                  rawTitle
                )}
              </motion.h1>
            );
          }
        })()}

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed"
        >
          {config.heroDescription}
        </motion.p>

        {/* Floating Search Hub */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto relative rounded-2xl bg-white/75 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 p-2 shadow-xl hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex items-center gap-2 group"
        >
          <Search className="text-slate-400 dark:text-zinc-500 ml-3 shrink-0 group-hover:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search deep-dives, compiler optimizations, algorithms..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 bg-transparent border-none text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 text-sm focus:outline-none"
          />
          <button 
            onClick={() => {
              const element = document.getElementById('latest-posts-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-opacity-95 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
          >
            Explore Feed
          </button>
        </motion.div>
      </section>

      {/* 2. Reading Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/40 dark:bg-zinc-900/25 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md shadow-sm relative overflow-hidden">
          {[
            { icon: <BookOpen className="text-primary" />, value: "30+", label: "Architectural Logs" },
            { icon: <Star className="text-accent" />, value: "15+", label: "Learning Segments" },
            { icon: <TrendingUp className="text-secondary animate-pulse" />, value: `${readersCount}`, label: "Readers Monthly", live: true },
            { icon: <Users className="text-emerald-500" />, value: `${subscribersCount}`, label: "Active Subscribers", live: true }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-2 py-4 hover:scale-102 transition-transform duration-300">
              <div className="p-3 rounded-2xl bg-zinc-100/65 dark:bg-zinc-900/40 text-slate-700 dark:text-zinc-300 mb-1 border border-zinc-200/20 dark:border-zinc-800/20">{stat.icon}</div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight flex items-center gap-1.5 justify-center">
                {stat.value}
                {stat.live && (
                  <span className="relative flex h-2 w-2" title="Live telemetry sync active">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-semibold text-slate-400 dark:text-zinc-500 tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Article Section */}
      {featuredBlog && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-4">
            <h2 className="text-lg font-bold flex items-center gap-2 uppercase tracking-wider text-slate-800 dark:text-zinc-100">
              <Star size={18} className="text-primary animate-pulse" /> Core Featured Digest
            </h2>
            <span className="text-xs text-slate-400">Hand-curated for software architects</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Image Cover */}
            <div 
              onClick={() => onNavigate('blog-detail', featuredBlog.slug)}
              className="lg:col-span-7 rounded-3xl overflow-hidden aspect-video relative group cursor-pointer shadow-lg border border-zinc-200/80 dark:border-zinc-800/80"
            >
              <img 
                src={featuredBlog.coverImage} 
                alt={featuredBlog.title} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-6 md:p-8 text-white space-y-3">
                <span className="inline-block px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-accent text-white rounded-lg self-start shadow-sm">
                  {featuredBlog.category}
                </span>
                <h3 className="text-xl md:text-3xl font-bold leading-tight line-clamp-2">
                  {featuredBlog.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-300 font-light line-clamp-2 leading-relaxed">
                  {featuredBlog.subtitle}
                </p>
              </div>
            </div>

            {/* Right Card Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md shadow-sm relative overflow-hidden group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-lg">
                    {featuredBlog.category}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded-md">
                    {featuredBlog.difficulty}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors duration-300">
                  {featuredBlog.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 font-light leading-relaxed line-clamp-4">
                  {featuredBlog.subtitle}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-150 dark:border-zinc-800/80 flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <img 
                    src={featuredBlog.author.avatar} 
                    alt={featuredBlog.author.name} 
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-zinc-200 leading-none">{featuredBlog.author.name}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">{featuredBlog.author.role}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => onNavigate('blog-detail', featuredBlog.slug)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-950 dark:bg-zinc-100 text-white dark:text-slate-950 text-xs font-bold hover:gap-2.5 hover:bg-opacity-90 cursor-pointer transition-all shadow hover:scale-102 active:scale-98"
                >
                  Read Post <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Trending & Editor's Picks Splitting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        {/* Left: Trending list */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="font-bold flex items-center gap-2 text-sm text-slate-800 dark:text-zinc-100 uppercase tracking-wider">
              <TrendingUp size={16} className="text-secondary" /> Hot Trending Topics
            </h3>
            <span className="text-xs text-slate-400">By overall click depth and reads</span>
          </div>

          <div className="space-y-6">
            {trendingBlogs.map((blog, idx) => (
              <div 
                key={blog.id}
                className="flex gap-6 items-start group cursor-pointer"
                onClick={() => onNavigate('blog-detail', blog.slug)}
              >
                <div className="text-4xl font-black text-zinc-200 dark:text-zinc-800 font-mono select-none w-10 text-center group-hover:text-primary transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-accent">{blog.category}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock size={10} /> {blog.metrics.readingTime} min read
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <div className="text-xs text-slate-400 font-light flex items-center gap-1.5">
                    <span>By {blog.author.name}</span>
                    <span>•</span>
                    <span>{formatDate(blog.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Editor's Picks */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="font-bold flex items-center gap-2 text-sm text-slate-800 dark:text-zinc-100 uppercase tracking-wider">
              <Star size={16} className="text-accent" /> Editor's Selected Picks
            </h3>
            <span className="text-xs text-slate-400">Essential deep architectural studies</span>
          </div>

          <div className="space-y-4">
            {editorsPicks.map((blog) => (
              <div 
                key={blog.id}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-start gap-4 hover:border-primary/30 transition-all cursor-pointer group"
                onClick={() => onNavigate('blog-detail', blog.slug)}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800">
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 flex-grow">
                  <span className="text-[9px] uppercase font-bold text-primary block">{blog.category}</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {blog.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block">{formatDate(blog.publishedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Filterable Latest Posts section */}
      <section id="latest-posts-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-custom">
              Recently Published Technical Logs
            </h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-light">Explore deep dives across computing topics. Use filters below to sort.</p>
          </div>

          {/* Categories Horizontal Slider */}
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white border-primary shadow-md hover:scale-102' 
                    : 'bg-white/50 dark:bg-zinc-900/30 text-slate-600 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid */}
        {filteredLatestBlogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLatestBlogs.map((blog) => {
              const isBookmarked = bookmarks.includes(blog.id);
              return (
                <motion.div 
                  key={blog.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full rounded-2xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 relative group"
                >
                  {/* Blog Image */}
                  <div 
                    onClick={() => onNavigate('blog-detail', blog.slug)}
                    className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative cursor-pointer"
                  >
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest bg-zinc-950/80 backdrop-blur-sm text-white rounded-lg shadow-sm">
                        {blog.category}
                      </span>
                    </div>

                    {/* Bookmark Toggle Icon overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(blog.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-zinc-950/75 backdrop-blur-sm text-white hover:bg-zinc-900 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      title={isBookmarked ? 'Remove Bookmark' : 'Save Article'}
                    >
                      <Bookmark size={14} className={isBookmarked ? 'fill-accent text-accent' : 'text-zinc-200'} />
                    </button>
                  </div>

                  {/* Blog Content Info */}
                  <div className="p-5 flex flex-col flex-grow justify-between space-y-4 bg-white/40 dark:bg-transparent backdrop-blur-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-widest font-bold">
                        <span className="text-secondary">{blog.difficulty}</span>
                        <span>•</span>
                        <span>{blog.metrics.readingTime} min read</span>
                      </div>
                      
                      <h4 
                        onClick={() => onNavigate('blog-detail', blog.slug)}
                        className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug hover:text-primary cursor-pointer transition-colors"
                      >
                        {blog.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 font-light line-clamp-2 leading-relaxed">
                        {blog.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                      <span className="font-bold text-slate-700 dark:text-zinc-300">By {blog.author.name}</span>
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-12 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <Search className="text-slate-300 mx-auto mb-3 animate-bounce" size={32} />
            <h5 className="font-bold text-slate-800 dark:text-zinc-200">No articles match your selection</h5>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto font-light">Try expanding your search parameters or select a different learning category.</p>
          </div>
        )}
      </section>

      {/* 6. Popular Categories & Tags section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-2">Popular Categories</h4>
          <div className="grid grid-cols-2 gap-3">
            {categories.filter(c => c !== 'All').map((cat) => {
              const count = publishedBlogs.filter(b => b.category === cat).length;
              return (
                <div 
                  key={cat} 
                  onClick={() => {
                    setSelectedCategory(cat);
                    const element = document.getElementById('latest-posts-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between hover:border-primary/20 cursor-pointer group transition-all"
                >
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 group-hover:text-primary transition-colors">{cat}</span>
                  <span className="text-[10px] font-black bg-zinc-100 dark:bg-zinc-800 text-slate-400 px-2 py-0.5 rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors">{count} logs</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-2">Popular Tags</h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <span 
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  setSelectedCategory('All');
                  const element = document.getElementById('latest-posts-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 hover:text-primary rounded-lg border border-transparent hover:border-primary/20 transition-all cursor-pointer select-none"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Author Introduction & Bio section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white font-custom">
            The Creator of StringToTech
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 font-light max-w-lg mx-auto">
            Meet the developer and writer building open-source systems and compiling complex Computer Science theories into simple knowledge.
          </p>
        </div>

        <div className="flex justify-center">
          {[
            {
              name: 'AMAN KUMAR PANDEY',
              role: 'LEARNING WRITING BUILDING',
              avatar: '/aman.svg',
              skills: ['Mathematics', 'Computer Science', 'Software Engineering', 'Artificial Intelligence'],
              bio: 'I believe great learning should be simple and accessible. Through this blog, I share my journey, break down complex Computer Science concepts, and create practical content that helps others learn, build, and grow.'
            }
          ].map((author, idx) => (
            <div 
              key={idx}
              className="w-full max-w-2xl p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate('author')}
            >
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <img src={author.avatar} alt={author.name} className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 p-1" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">{author.name}</h4>
                  <p className="text-xs text-primary font-bold tracking-wider uppercase">{author.role}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-zinc-400 font-light leading-relaxed">{author.bio}</p>
              
              {/* Skill Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 justify-center sm:justify-start">
                {author.skills.map(s => (
                  <span key={s} className="px-3 py-1 text-[10px] font-bold bg-primary/5 text-primary rounded-xl border border-primary/10">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 md:p-14 rounded-3xl bg-slate-950 dark:bg-zinc-900/40 border border-zinc-800/80 text-center relative overflow-hidden space-y-6 shadow-xl backdrop-blur-md">
          {/* Glowing background circles */}
          <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-primary/20 blur-[60px] -mr-12 -mt-12 opacity-80 glow-spotlight pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[240px] h-[240px] bg-secondary/15 blur-[60px] -ml-12 -mb-12 opacity-80 glow-spotlight pointer-events-none" />

          <h3 className="text-2xl md:text-3.5xl font-black text-white tracking-tight">Never Miss Architecture Deep-Dives</h3>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            Join 10,000+ engineers reading high-quality, practical tech articles on system designs, algorithms, and microservices every Wednesday.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribeForm} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2 relative z-10">
              <input 
                type="email" 
                placeholder="Enter your system engineer email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4.5 py-3.5 rounded-2xl border border-zinc-800 focus:border-primary bg-zinc-900/60 text-white placeholder-zinc-500 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none flex-grow transition-all duration-350"
              />
              <button 
                type="submit" 
                className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 text-sm font-bold hover:bg-zinc-100 hover:scale-102 active:scale-98 transition-all shadow-md shrink-0 cursor-pointer"
              >
                Join Newsletter
              </button>
            </form>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 font-bold text-sm">
              Awesome! Check your inbox to verify your secure subscription.
            </motion.p>
          )}
        </div>
      </section>

      {/* 10. Technology Stack Showcase - Animated Philosophy Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-150 dark:border-zinc-850 pt-16 text-center">
        <div className="py-12 px-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/60 relative overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
          {/* Subtle background glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center justify-center space-y-5 max-w-3xl relative z-10">
            {/* Animated Symbol */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="text-primary/75"
            >
              <Sparkles size={20} />
            </motion.div>

            {/* Main animated text */}
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-2.5 text-base sm:text-lg md:text-xl font-bold font-custom tracking-tight px-4 leading-relaxed">
              {["-", "SIMPLIFIED", "MATHEMATICS", "AND", "COMPUTER", "SCIENCE", "WITH", "LITTLE", "BIT", "OF", "PRODUCTIVITY", "TIPS", "-"].map((word, wordIdx) => {
                // Determine highlight color classes for core topics
                let colorClass = "text-slate-800 dark:text-zinc-200";
                if (word === "MATHEMATICS") {
                  colorClass = "bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 font-extrabold";
                } else if (word === "COMPUTER" || word === "SCIENCE") {
                  colorClass = "bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 font-extrabold";
                } else if (word === "PRODUCTIVITY" || word === "TIPS") {
                  colorClass = "bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500 dark:from-rose-400 dark:to-amber-400 font-extrabold";
                } else if (word === "-") {
                  colorClass = "text-primary/75 dark:text-primary/75 font-black";
                }

                return (
                  <motion.span
                    key={wordIdx}
                    className={`inline-block ${colorClass}`}
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: wordIdx * 0.15,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: wordIdx % 2 === 0 ? 1 : -1,
                      transition: { duration: 0.15 }
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>

            {/* Pulse Line */}
            <motion.div 
              animate={{ width: ["40px", "120px", "40px"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="h-0.5 bg-gradient-to-r from-primary/30 via-secondary/60 to-accent/30 rounded-full"
            />
          </div>
        </div>
      </section>

      {/* 11. Call To Action (Bottom Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden group">
          {/* Premium overlay filters */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

          <div className="space-y-3 relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">Ready to Level Up Your Architecture IQ?</h3>
            <p className="text-xs md:text-base text-zinc-100 font-light max-w-xl">
              Access the entire collection of 30+ highly-technical walkthroughs. Always open-source, always free, zero advertisement noise.
            </p>
          </div>
          <button 
            onClick={() => {
              const element = document.getElementById('latest-posts-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 text-xs font-bold hover:bg-zinc-100 hover:scale-102 active:scale-98 cursor-pointer shadow-lg transition-all relative z-10 shrink-0 flex items-center gap-2"
          >
            Start Learning Now <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
