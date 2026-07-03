/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Blog, Comment } from '../types';
import { BlockRenderer } from '../components/BlockRenderer';
import { TableOfContents } from '../components/Article/TableOfContents';
import { ReadingProgressBar } from '../components/Article/ReadingProgressBar';
import { 
  Heart, Bookmark, Share2, ArrowLeft, ArrowRight, Sparkles, Calendar, BookOpen, User, 
  Send, CornerDownRight, MessageSquare, AlertCircle, Check, Copy, Facebook, Twitter, Linkedin, Link, ExternalLink, Clock 
} from 'lucide-react';
import { motion } from 'motion/react';

interface BlogDetailProps {
  slug: string;
  blogs: Blog[];
  comments: Comment[];
  onNavigate: (page: string, slug?: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onLikeBlog: (id: string) => void;
  likedBlogs: string[];
  onAddComment: (blogId: string, parentId: string | null, authorName: string, authorEmail: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({
  slug,
  blogs,
  comments,
  onNavigate,
  bookmarks,
  onToggleBookmark,
  onLikeBlog,
  likedBlogs,
  onAddComment,
  onLikeComment
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [reportedComments, setReportedComments] = useState<string[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);

  // Scroll to top on load and track scroll percentage for real-time telemetry
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.round(Math.min(100, Math.max(0, progress))));
      } else {
        setScrollPercent(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slug]);

  // Find active blog
  const blog = useMemo(() => {
    return blogs.find(b => b.slug === slug);
  }, [blogs, slug]);

  const isBookmarked = useMemo(() => {
    return blog ? bookmarks.includes(blog.id) : false;
  }, [blog, bookmarks]);

  const isLiked = useMemo(() => {
    return blog ? likedBlogs.includes(blog.id) : false;
  }, [blog, likedBlogs]);

  // Filter comments for this blog
  const blogComments = useMemo(() => {
    if (!blog) return [];
    return comments.filter(c => c.blogId === blog.id && c.isApproved);
  }, [comments, blog]);

  // Split comments into top-level and replies
  const topLevelComments = useMemo(() => {
    return blogComments.filter(c => c.parentId === null);
  }, [blogComments]);

  const getRepliesForComment = (commentId: string) => {
    return blogComments.filter(c => c.parentId === commentId);
  };

  // Find related blogs (same category, excluding current)
  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    return blogs
      .filter(b => b.category === blog.category && b.id !== blog.id && b.isPublished)
      .slice(0, 3);
  }, [blogs, blog]);

  // Previous and next blogs
  const navigationBlogs = useMemo(() => {
    if (!blog) return { prev: null, next: null };
    const published = blogs.filter(b => b.isPublished);
    const index = published.findIndex(b => b.id === blog.id);
    return {
      prev: index > 0 ? published[index - 1] : null,
      next: index < published.length - 1 ? published[index + 1] : null
    };
  }, [blogs, blog]);

  // Dynamic reading time estimate based on actual contents
  const dynamicReadingStats = useMemo(() => {
    if (!blog) return { minutes: 0, words: 0 };
    let totalWords = 0;
    
    // Title & subtitle
    if (blog.title) totalWords += blog.title.split(/\s+/).filter(Boolean).length;
    if (blog.subtitle) totalWords += blog.subtitle.split(/\s+/).filter(Boolean).length;
    
    // Core blocks
    if (blog.blocks) {
      blog.blocks.forEach(block => {
        if (block.content) {
          totalWords += block.content.split(/\s+/).filter(Boolean).length;
        }
        // Table cell contents if available
        if (block.properties?.rows) {
          block.properties.rows.forEach(row => {
            row.forEach(cell => {
              if (cell) totalWords += cell.split(/\s+/).filter(Boolean).length;
            });
          });
        }
      });
    }

    const wpm = 200; // 200 words per minute average for technical reading
    const minutes = Math.max(1, Math.round(totalWords / wpm));
    return { minutes, words: totalWords };
  }, [blog]);

  const estimatedCompletionTime = useMemo(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + dynamicReadingStats.minutes);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [dynamicReadingStats.minutes]);

  const handleShareClick = (platform: string) => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    // Real implementation would open popup links, simulation is sufficient and safer for iframe
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blog && commentName && commentEmail && commentContent) {
      onAddComment(blog.id, null, commentName, commentEmail, commentContent);
      setCommentContent('');
      setCommentName('');
      setCommentEmail('');
    }
  };

  const handleReplySubmit = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (blog && commentName && commentEmail && replyContent) {
      onAddComment(blog.id, parentId, commentName, commentEmail, replyContent);
      setReplyContent('');
      setReplyingToId(null);
      setCommentName('');
      setCommentEmail('');
    }
  };

  const handleReportComment = (commentId: string) => {
    setReportedComments(prev => [...prev, commentId]);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!blog) {
    return (
      <div className="text-center py-24 space-y-4">
        <AlertCircle className="mx-auto text-rose-500 animate-bounce" size={48} />
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <p className="text-slate-400">The requested article could not be retrieved from the database.</p>
        <button onClick={() => onNavigate('home')} className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold cursor-pointer shadow">
          Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 font-custom relative">
      {/* Immersive ambient glows specifically optimized for comfortable long reading sessions */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden opacity-30 dark:opacity-40 -z-10" aria-hidden="true">
        <div className="absolute top-[10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute top-[30%] right-[-20%] w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />
      </div>

      {/* Dynamic Reading Progress Bar */}
      <ReadingProgressBar />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 select-none">
          <span className="hover:text-primary cursor-pointer" onClick={() => onNavigate('home')}>Home</span>
          <span>&rarr;</span>
          <span className="hover:text-primary cursor-pointer" onClick={() => onNavigate('home')}>{blog.category}</span>
          <span>&rarr;</span>
          <span className="text-primary truncate max-w-xs">{blog.title}</span>
        </div>

        {/* Back Link */}
        <button 
          onClick={() => onNavigate('home')} 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to tech feed
        </button>

        {/* Hero Meta Header */}
        <header className="space-y-6 max-w-4xl border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider bg-accent/5 px-2.5 py-1 rounded-md">
              <Sparkles size={12} /> {blog.category}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 text-slate-500 dark:text-zinc-300 rounded-md">
              {blog.difficulty}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {blog.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 font-light leading-relaxed">
            {blog.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-150 dark:border-zinc-800/80 mt-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5"><User size={16} className="text-primary" /> {blog.author.name}</span>
              <span className="flex items-center gap-1.5"><Calendar size={16} className="text-secondary" /> {formatDate(blog.publishedAt)}</span>
              <span className="flex items-center gap-1.5" title={`${dynamicReadingStats.words} words in this article`}>
                <BookOpen size={16} className="text-accent" /> 
                <span className="font-semibold text-slate-800 dark:text-zinc-100">{dynamicReadingStats.minutes} min read</span>
                <span className="text-xs text-slate-400 dark:text-zinc-500 font-mono">({dynamicReadingStats.words} words)</span>
              </span>
              <span className="flex items-center gap-1.5" title={`Estimated time you will finish reading this article if you start now`}>
                <Clock size={16} className="text-emerald-500 animate-pulse" /> 
                <span className="font-semibold text-slate-800 dark:text-zinc-100">Finish by {estimatedCompletionTime}</span>
              </span>
            </div>

            <button
              id="header-copy-link-button"
              onClick={() => handleShareClick('copy')}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-primary/5 hover:text-primary hover:border-primary/20 rounded-xl cursor-pointer transition-all active:scale-95"
              title="Copy link to clipboard"
            >
              {linkCopied ? (
                <>
                  <Check size={14} className="text-emerald-500 animate-pulse" />
                  <span className="text-emerald-500">Link Copied!</span>
                </>
              ) : (
                <>
                  <Link size={14} />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Double Layout Splitting */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Main Article Content */}
          <section className="lg:col-span-8 space-y-12 max-w-4xl">
            
            {/* Banner Cover Image */}
            <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md aspect-video bg-zinc-100 dark:bg-zinc-900 relative">
              <img 
                src={blog.coverImage} 
                alt={blog.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Document Blocks rendering */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <BlockRenderer blocks={blog.blocks} />
            </div>

            {/* Article Action Bar (Likes, Bookmarks, Copy Link) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/60 shadow-sm">
              <div className="flex items-center gap-6">
                {/* Like Button */}
                <button 
                  onClick={() => onLikeBlog(blog.id)}
                  className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border cursor-pointer transition-all ${
                    isLiked 
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                      : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100'
                  }`}
                >
                  <Heart size={14} className={isLiked ? 'fill-rose-500' : ''} />
                  <span>{blog.metrics.likes + (isLiked ? 1 : 0)} Likes</span>
                </button>

                {/* Bookmark Button */}
                <button 
                  onClick={() => onToggleBookmark(blog.id)}
                  className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border cursor-pointer transition-all ${
                    isBookmarked 
                      ? 'bg-primary/10 border-primary/30 text-primary' 
                      : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100'
                  }`}
                >
                  <Bookmark size={14} className={isBookmarked ? 'fill-primary' : ''} />
                  <span>{isBookmarked ? 'Bookmarked' : 'Save Article'}</span>
                </button>
              </div>

              {/* Social Sharing hub */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Share:</span>
                <button onClick={() => handleShareClick('facebook')} className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 cursor-pointer transition-colors" title="Facebook">
                  <Facebook size={14} />
                </button>
                <button onClick={() => handleShareClick('twitter')} className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 cursor-pointer transition-colors" title="Twitter/X">
                  <Twitter size={14} />
                </button>
                <button onClick={() => handleShareClick('linkedin')} className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 cursor-pointer transition-colors" title="LinkedIn">
                  <Linkedin size={14} />
                </button>
                <button onClick={() => handleShareClick('copy')} className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 cursor-pointer relative transition-colors" title="Copy Link">
                  {linkCopied ? <Check size={14} className="text-emerald-500" /> : <Link size={14} />}
                  {linkCopied && (
                    <span className="absolute bottom-8 right-0 bg-slate-950 text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap z-10">Link Copied!</span>
                  )}
                </button>
              </div>
            </div>

            {/* Previous/Next Article Footer Links */}
            <div className="grid grid-cols-2 gap-4 border-t border-zinc-150 dark:border-zinc-850 pt-8">
              {navigationBlogs.prev ? (
                <div 
                  onClick={() => onNavigate('blog-detail', navigationBlogs.prev!.slug)}
                  className="p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800/80 hover:border-primary/20 cursor-pointer group space-y-1 text-left transition-all"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <ArrowLeft size={10} /> Previous Article
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors line-clamp-1">
                    {navigationBlogs.prev.title}
                  </h5>
                </div>
              ) : <div />}

              {navigationBlogs.next ? (
                <div 
                  onClick={() => onNavigate('blog-detail', navigationBlogs.next!.slug)}
                  className="p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800/80 hover:border-primary/20 cursor-pointer group space-y-1 text-right transition-all"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 justify-end">
                    Next Article <ArrowRight size={10} />
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 group-hover:text-primary transition-colors line-clamp-1">
                    {navigationBlogs.next.title}
                  </h5>
                </div>
              ) : <div />}
            </div>

            {/* 2. Nested Comments System */}
            <div className="space-y-8 pt-6 border-t border-zinc-250 dark:border-zinc-800/60">
              <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <MessageSquare className="text-primary" size={20} />
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white font-custom">
                  Discussion Thread ({blogComments.length})
                </h3>
              </div>

              {/* Form: Post Comments */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 p-6 rounded-2xl bg-white/70 dark:bg-[var(--card-dark)]/50 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Share Your Technical Thoughts</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Full name (e.g. Linus D.)" 
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-1 focus:ring-primary focus:outline-none w-full text-slate-850 dark:text-zinc-100"
                  />
                  <input 
                    type="email" 
                    placeholder="Email (private for avatars)" 
                    required
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-1 focus:ring-primary focus:outline-none w-full text-slate-850 dark:text-zinc-100"
                  />
                </div>
                <textarea 
                  placeholder="Ask an architecture question or propose optimizing operations..." 
                  required
                  rows={4}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-1 focus:ring-primary focus:outline-none w-full text-slate-850 dark:text-zinc-100"
                />
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-opacity-95 cursor-pointer shadow flex items-center gap-2 shrink-0 active:scale-95 transition-all"
                >
                  <Send size={12} /> Post Comment
                </button>
              </form>

              {/* Recursive comments list */}
              <div className="space-y-6">
                {topLevelComments.length > 0 ? (
                  topLevelComments.map((comment) => {
                    const replies = getRepliesForComment(comment.id);
                    const isReported = reportedComments.includes(comment.id);
                    return (
                      <div key={comment.id} className="space-y-5 p-5 rounded-2xl bg-white/30 dark:bg-[var(--card-dark)]/25 backdrop-blur-md border border-zinc-150/50 dark:border-zinc-800/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                        
                        {/* Parent Comment */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">{comment.authorName}</span>
                              <span className="text-[10px] text-slate-400">{formatDate(comment.createdAt)}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {/* Like comment button */}
                              <button 
                                onClick={() => onLikeComment(comment.id)}
                                className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-rose-500 cursor-pointer transition-colors"
                              >
                                <Heart size={12} /> <span>{comment.likes}</span>
                              </button>

                              {/* Report comment button */}
                              <button 
                                onClick={() => handleReportComment(comment.id)}
                                className="text-[11px] text-slate-400 hover:text-amber-500 cursor-pointer transition-colors"
                                disabled={isReported}
                              >
                                {isReported ? 'Reported' : 'Report'}
                              </button>
                            </div>
                          </div>

                          <p className="text-xs md:text-sm text-slate-600 dark:text-zinc-400 font-light leading-relaxed">
                            {comment.content}
                          </p>

                          {/* Reply trigger button */}
                          <button 
                            onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline cursor-pointer pt-1"
                          >
                            <CornerDownRight size={10} /> Reply to this
                          </button>
                        </div>

                        {/* Reply Form (Conditional) */}
                        {replyingToId === comment.id && (
                          <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="space-y-3 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40 bg-white/50 dark:bg-[var(--card-dark)]/40 backdrop-blur-md ml-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Write reply to {comment.authorName}</span>
                            <div className="grid grid-cols-2 gap-3">
                              <input 
                                type="text" 
                                placeholder="Your Name" 
                                required
                                value={commentName}
                                onChange={(e) => setCommentName(e.target.value)}
                                className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-slate-800 dark:text-zinc-100"
                              />
                              <input 
                                type="email" 
                                placeholder="Your Email" 
                                required
                                value={commentEmail}
                                onChange={(e) => setCommentEmail(e.target.value)}
                                className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-slate-800 dark:text-zinc-100"
                              />
                            </div>
                            <textarea 
                              placeholder="Write a clear response..." 
                              required
                              rows={2.5}
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs focus:ring-1 focus:ring-primary focus:outline-none w-full text-slate-800 dark:text-zinc-100"
                            />
                            <div className="flex justify-end gap-2">
                              <button type="button" onClick={() => setReplyingToId(null)} className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[10px] cursor-pointer">Cancel</button>
                              <button type="submit" className="px-3 py-1.5 rounded-lg bg-primary text-white text-[10px] font-bold cursor-pointer">Post Reply</button>
                            </div>
                          </form>
                        )}

                        {/* Nested Replies Rendering */}
                        {replies.length > 0 && (
                          <div className="space-y-4 ml-6 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
                            {replies.map((reply) => (
                              <div key={reply.id} className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-slate-850 dark:text-zinc-300">{reply.authorName}</span>
                                    <span className="text-[9px] text-slate-400">{formatDate(reply.createdAt)}</span>
                                  </div>
                                  <button 
                                    onClick={() => onLikeComment(reply.id)}
                                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-500 cursor-pointer"
                                  >
                                    <Heart size={10} /> <span>{reply.likes}</span>
                                  </button>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-zinc-400 font-light leading-relaxed">
                                  {reply.content}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center p-8 border border-zinc-100 dark:border-zinc-850/60 rounded-2xl bg-zinc-50/20">
                    <p className="text-xs text-slate-400 font-light">No comments published yet. Be the first to share your system thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Sticky Sidebar (Table of Contents & Meta Cards) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 space-y-8">
              
              {/* Reader Telemetry & Stats Card */}
              <div className="p-6 rounded-2xl bg-white/70 dark:bg-[var(--card-dark)]/50 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)] transition-all duration-300 text-left">
                <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-850 pb-2">
                  <Clock size={14} className="text-primary" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-zinc-200">
                    Reader Telemetry
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                     <span className="text-slate-500 dark:text-zinc-400">Reading Progress</span>
                     <span className="font-mono font-bold text-primary">{scrollPercent}%</span>
                  </div>

                  {/* Progress Tracker bar */}
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200/20">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${scrollPercent}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-850/60">
                      <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Time Left</span>
                      <span className="font-mono text-sm font-bold text-slate-800 dark:text-zinc-200">
                        {Math.max(1, Math.round(dynamicReadingStats.minutes * (1 - scrollPercent / 100)))} min
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-850/60">
                      <span className="block text-[9px] uppercase font-bold text-slate-400 mb-1">Finish At</span>
                      <span className="font-mono text-sm font-bold text-slate-800 dark:text-zinc-200">
                        {estimatedCompletionTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                    <span>{dynamicReadingStats.words} words</span>
                    <span>200 WPM pacing</span>
                  </div>
                </div>
              </div>

              {/* Table of Contents card */}
              <div className="p-6 rounded-2xl bg-white/70 dark:bg-[var(--card-dark)]/50 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-6 hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)] transition-all duration-300">
                <TableOfContents blocks={blog.blocks} />
              </div>

              {/* Author bio overview */}
              <div className="p-6 rounded-2xl bg-white/70 dark:bg-[var(--card-dark)]/50 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-4 hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)] transition-all duration-300">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-zinc-50 dark:border-zinc-850/60 pb-1">Author Identity</h4>
                <div className="flex items-center gap-3">
                  <img src={blog.author.avatar} alt={blog.author.name} className="w-12 h-12 rounded-full object-cover border" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-880 dark:text-zinc-100 leading-none">{blog.author.name}</h5>
                    <span className="text-[10px] text-slate-400">{blog.author.role}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-light leading-relaxed">{blog.author.bio}</p>
                <button 
                  onClick={() => onNavigate('author')} 
                  className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all cursor-pointer pt-1"
                >
                  View full profile <ArrowRight size={12} />
                </button>
              </div>

              {/* Related posts */}
              {relatedBlogs.length > 0 && (
                <div className="p-6 rounded-2xl bg-white/70 dark:bg-[var(--card-dark)]/50 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/40 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-4 hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)] transition-all duration-300">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-zinc-50 dark:border-zinc-850/60 pb-1">Related Architectural Logs</h4>
                  <div className="space-y-4.5">
                    {relatedBlogs.map((rel) => (
                      <div 
                        key={rel.id} 
                        className="group cursor-pointer space-y-1"
                        onClick={() => onNavigate('blog-detail', rel.slug)}
                      >
                        <span className="text-[9px] uppercase font-bold text-accent">{rel.category}</span>
                        <h5 className="text-xs font-bold text-slate-850 dark:text-zinc-200 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};
