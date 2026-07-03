/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Blog } from '../types';
import { 
  CheckCircle2, ArrowRight, Share2, Twitter, Linkedin, Copy, 
  Send, Compass, Sparkles, AlertCircle, Eye, FileText, Check, ExternalLink, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PostCreationSuccessProps {
  blog: Blog;
  onNavigate: (page: string, blogSlug?: string) => void;
  subscribersCount: number;
}

export const PostCreationSuccess: React.FC<PostCreationSuccessProps> = ({
  blog,
  onNavigate,
  subscribersCount
}) => {
  const [activePlatform, setActivePlatform] = useState<'twitter' | 'linkedin'>('twitter');
  const [copied, setCopied] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [indexed, setIndexed] = useState(false);
  const [indexing, setIndexing] = useState(false);

  // Generate URL for display and copying
  const blogUrl = `${window.location.origin}/blog/${blog.slug}`;

  // Confetti particles generator effect
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number }[]>([]);

  useEffect(() => {
    const colors = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6'];
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * -20 - 10, // above the screen
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(blogUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendNewsletter = () => {
    if (sendingNewsletter || newsletterSent) return;
    setSendingNewsletter(true);
    // Simulate real database background task
    setTimeout(() => {
      setSendingNewsletter(false);
      setNewsletterSent(true);
    }, 2000);
  };

  const handleIndexInstant = () => {
    if (indexing || indexed) return;
    setIndexing(true);
    setTimeout(() => {
      setIndexing(false);
      setIndexed(true);
    }, 1500);
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-custom select-text pb-24 overflow-hidden">
      
      {/* Dynamic Confetti falling in background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: `${p.y}vh`, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
            animate={{ 
              y: '100vh', 
              x: `${p.x + (Math.random() * 20 - 10)}vw`,
              rotate: 360,
              opacity: 0 
            }}
            transition={{ 
              duration: Math.random() * 3 + 3, 
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full"
            style={{
              backgroundColor: p.color,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      {/* Celebration Header block */}
      <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 size={36} className="animate-bounce" />
        </motion.div>
        
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            <Sparkles size={11} /> Publication Successful
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            Your Technical Spec is Live!
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 font-light max-w-md mx-auto">
            "{blog.title}" has been built, indexed, and made discoverable on the StringToTech system feed.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Post details & Social preview */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Post Identity Details */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-primary">{blog.category}</span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-light">
                  {blog.subtitle}
                </p>
              </div>
              <div className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider shrink-0 text-slate-600 dark:text-zinc-300">
                {blog.difficulty}
              </div>
            </div>

            {/* URL Clipboard bar */}
            <div className="p-1 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 flex items-center justify-between gap-2 pl-3">
              <span className="text-[11px] font-mono text-slate-500 truncate select-all">{blogUrl}</span>
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Card Simulator */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Share2 size={13} className="text-primary" /> Social Preview Card
              </h4>
              <div className="flex gap-1.5 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-950 border text-[10px] font-bold">
                <button 
                  onClick={() => setActivePlatform('twitter')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${activePlatform === 'twitter' ? 'bg-white dark:bg-zinc-800 shadow-sm text-primary' : 'text-slate-400'}`}
                >
                  <Twitter size={10} /> Twitter / X
                </button>
                <button 
                  onClick={() => setActivePlatform('linkedin')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${activePlatform === 'linkedin' ? 'bg-white dark:bg-zinc-800 shadow-sm text-primary' : 'text-slate-400'}`}
                >
                  <Linkedin size={10} /> LinkedIn
                </button>
              </div>
            </div>

            {/* Social Card Previews */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                {activePlatform === 'twitter' ? (
                  <motion.div
                    key="twitter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 space-y-3"
                  >
                    <div className="flex gap-2.5 items-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 shrink-0" />
                      <div className="space-y-0.5 text-left">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">StringToTech</span>
                          <span className="text-[10px] text-slate-400">@stringtotech · Just now</span>
                        </div>
                        <p className="text-[11px] text-slate-800 dark:text-zinc-200">
                          Just published our latest system architecture breakdown! Learn how we optimize raw rendering paths and database consistency:
                        </p>
                      </div>
                    </div>

                    {/* Meta Box Card */}
                    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors">
                      <div className="h-40 overflow-hidden relative">
                        <img 
                          src={blog.coverImage} 
                          alt="Twitter card" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[8px] font-bold text-white uppercase tracking-wider">
                          {blog.category}
                        </div>
                      </div>
                      <div className="p-3 text-left space-y-1 border-t border-zinc-200/65 dark:border-zinc-800">
                        <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase">stringtotech.com</span>
                        <h5 className="text-[11.5px] font-bold text-slate-900 dark:text-white line-clamp-1">
                          {blog.title}
                        </h5>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 line-clamp-1 font-light">
                          {blog.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="linkedin"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 space-y-3"
                  >
                    <div className="flex gap-2.5 items-start">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">STT</div>
                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">StringToTech</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-slate-500">Admin</span>
                        </div>
                        <span className="text-[10px] text-slate-400">10,420 followers · Just now</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-800 dark:text-zinc-200 text-left">
                      Excited to announce our newest publication is now live on the platform! Check out our detailed walkthrough of distributed systems bottlenecks and optimization solutions.
                    </p>

                    {/* LinkedIn Media Preview */}
                    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors">
                      <div className="h-44 overflow-hidden">
                        <img 
                          src={blog.coverImage} 
                          alt="LinkedIn Cover" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200/65 dark:border-zinc-800 text-left flex justify-between items-center">
                        <div className="space-y-0.5 max-w-[80%]">
                          <h5 className="text-[12px] font-extrabold text-slate-900 dark:text-white truncate">
                            {blog.title}
                          </h5>
                          <p className="text-[10px] text-slate-400 truncate font-mono">
                            stringtotech.com · {blog.category}
                          </p>
                        </div>
                        <button className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] font-bold rounded flex items-center gap-1">
                          View <ExternalLink size={10} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Subscriber broadcast & indexing controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Subscriber Newsletter Blast panel */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5 text-left">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1">Subscriber Broadcast Channel</h4>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-light leading-relaxed">
              Your platform has <strong className="font-bold text-slate-800 dark:text-white">{subscribersCount} active subscribers</strong>. Send an automated rich-text email blast notifying them of this publication.
            </p>

            <button
              onClick={handleSendNewsletter}
              disabled={sendingNewsletter || newsletterSent}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                newsletterSent 
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 cursor-default' 
                  : 'bg-primary text-white hover:bg-opacity-95'
              }`}
            >
              {sendingNewsletter ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Broadcasting to Feed...</span>
                </>
              ) : newsletterSent ? (
                <>
                  <Check size={14} />
                  <span>Newsletter Dispatched Successfully!</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Email Blast to {subscribersCount} Users</span>
                </>
              )}
            </button>
          </div>

          {/* Search Index Instant Submission */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5 text-left">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1">Instant Indexing</h4>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-light leading-relaxed">
              Push this live document's structured semantic markup directly to index bots to maximize search engine discovery and optimization ranking.
            </p>

            <button
              onClick={handleIndexInstant}
              disabled={indexing || indexed}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                indexed 
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                  : 'bg-white dark:bg-zinc-950 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900'
              }`}
            >
              {indexing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Sitemap...</span>
                </>
              ) : indexed ? (
                <>
                  <Check size={14} />
                  <span>Successfully Indexed in 1.2ms</span>
                </>
              ) : (
                <>
                  <Compass size={14} />
                  <span>Submit to Index Bots</span>
                </>
              )}
            </button>
          </div>

          {/* Navigation Route Actions */}
          <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-150 dark:border-zinc-900/60 flex flex-col gap-2.5">
            <button
              onClick={() => onNavigate('blog-detail', blog.slug)}
              className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-opacity-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Eye size={13} /> View Live Article on Feed
            </button>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigate('admin')}
                className="py-2 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-xs font-bold rounded-xl border hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-1 cursor-pointer"
              >
                <FileText size={12} /> Dashboard
              </button>
              <button
                onClick={() => onNavigate('admin-editor')}
                className="py-2 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-xs font-bold rounded-xl border hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={12} /> Create New
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
