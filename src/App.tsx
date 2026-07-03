/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Home } from './pages/Home';
import { BlogDetail } from './pages/BlogDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminCustomize } from './pages/AdminCustomize';
import { AdminEditor } from './pages/AdminEditor';
import { Contact } from './pages/Contact';
import { AuthorProfile } from './pages/AuthorProfile';
import { BookmarksHistory } from './pages/BookmarksHistory';
import { LearningJourney } from './pages/LearningJourney';
import { TopicExplorer } from './pages/TopicExplorer';
import { AdminAuthGate } from './components/AdminAuthGate';
import { PostCreationSuccess } from './pages/PostCreationSuccess';
import { CustomizationProvider, useCustomization } from './contexts/CustomizationContext';
import { INITIAL_BLOGS, INITIAL_COMMENTS, INITIAL_SUBSCRIBERS } from './data/mockData';
import { Blog, Comment, Subscriber, ReadingHistoryItem } from './types';
import { 
  Sun, Moon, ShieldAlert, Cpu, Award, Globe, MessageSquare, BookOpen, Clock, 
  ArrowUp, Menu, X, ArrowRight, Github, Twitter, Linkedin, Sparkles, Settings, UserCheck,
  Heart, Send, Quote, Terminal, ExternalLink, Mail, Check, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractiveCursor, Magnetic } from './components/InteractiveCursor';

const AppContent: React.FC = () => {
  const { config } = useCustomization();
  
  // Local state managers
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);
  
  // Database mock states stored locally so they persist between views
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    try {
      const saved = localStorage.getItem('stringtotech_blogs_v2');
      return saved ? JSON.parse(saved) : INITIAL_BLOGS;
    } catch (e) {
      console.error("Failed to parse blogs from localStorage", e);
      return INITIAL_BLOGS;
    }
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem('stringtotech_comments');
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch (e) {
      console.error("Failed to parse comments from localStorage", e);
      return INITIAL_COMMENTS;
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('stringtotech_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse bookmarks from localStorage", e);
      return [];
    }
  });

  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('stringtotech_reading_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse reading history from localStorage", e);
      return [];
    }
  });

  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    try {
      const saved = localStorage.getItem('stringtotech_subscribers_v2');
      return saved ? JSON.parse(saved) : INITIAL_SUBSCRIBERS;
    } catch (e) {
      console.error("Failed to parse subscribers from localStorage", e);
      return INITIAL_SUBSCRIBERS;
    }
  });

  const [likedBlogs, setLikedBlogs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('stringtotech_liked_blogs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse liked blogs from localStorage", e);
      return [];
    }
  });

  // Cookie consent states
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    return !localStorage.getItem('stringtotech_cookies_accepted');
  });

  const [pageViews, setPageViews] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('stringtotech_pageviews_v3');
      return saved ? parseInt(saved, 10) : 2;
    } catch (e) {
      return 2;
    }
  });

  // Dynamic live-calculated traffic history
  const [trafficHistory, setTrafficHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('stringtotech_traffic_history_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse traffic history", e);
    }
    return [
      { name: 'Mon', views: 0, subscribers: 0, comments: 0 },
      { name: 'Tue', views: 0, subscribers: 0, comments: 0 },
      { name: 'Wed', views: 0, subscribers: 0, comments: 0 },
      { name: 'Thu', views: 0, subscribers: 0, comments: 0 },
      { name: 'Fri', views: 0, subscribers: 0, comments: 0 },
      { name: 'Sat', views: 0, subscribers: 0, comments: 0 },
      { name: 'Sun', views: 0, subscribers: 0, comments: 0 }
    ];
  });

  const recordTelemetry = (type: 'views' | 'subscribers' | 'comments', amount = 1) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayName = daysOfWeek[new Date().getDay()];
    
    setTrafficHistory((prev: any[]) => {
      const updated = prev.map(item => {
        if (item.name === currentDayName) {
          return {
            ...item,
            [type]: (item[type] || 0) + amount
          };
        }
        return item;
      });
      localStorage.setItem('stringtotech_traffic_history_v2', JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetTraffic = () => {
    const cleared = [
      { name: 'Mon', views: 0, subscribers: 0, comments: 0 },
      { name: 'Tue', views: 0, subscribers: 0, comments: 0 },
      { name: 'Wed', views: 0, subscribers: 0, comments: 0 },
      { name: 'Thu', views: 0, subscribers: 0, comments: 0 },
      { name: 'Fri', views: 0, subscribers: 0, comments: 0 },
      { name: 'Sat', views: 0, subscribers: 0, comments: 0 },
      { name: 'Sun', views: 0, subscribers: 0, comments: 0 }
    ];
    setTrafficHistory(cleared);
    localStorage.setItem('stringtotech_traffic_history_v2', JSON.stringify(cleared));
  };

  // Track initial page load and increment views
  useEffect(() => {
    setPageViews(prev => {
      const next = prev + 1;
      localStorage.setItem('stringtotech_pageviews_v3', next.toString());
      return next;
    });
    recordTelemetry('views', 1);
  }, []);

  // Back to Top button trigger
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Synchronize dynamic updates back to local Storage
  useEffect(() => {
    localStorage.setItem('stringtotech_blogs_v2', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('stringtotech_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('stringtotech_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('stringtotech_reading_history', JSON.stringify(readingHistory));
  }, [readingHistory]);

  useEffect(() => {
    localStorage.setItem('stringtotech_subscribers_v2', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('stringtotech_liked_blogs', JSON.stringify(likedBlogs));
  }, [likedBlogs]);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Toggler
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('stringtotech_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Premium dark mode by default
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = config.backgroundColorDark;
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#fafafa';
    }
    localStorage.setItem('stringtotech_theme', theme);
  }, [theme, config]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Navigations routing controller
  const navigateTo = (page: string, slug?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    setMobileMenuOpen(false);

    // Track active navigation pageviews
    setPageViews(prev => {
      const next = prev + 1;
      localStorage.setItem('stringtotech_pageviews_v3', next.toString());
      return next;
    });
    recordTelemetry('views', 1);

    if (slug) {
      setCurrentSlug(slug);
      
      // Auto-record reading history item when entering detail view
      if (page === 'blog-detail') {
        const matchingBlog = blogs.find(b => b.slug === slug);
        if (matchingBlog) {
          // Increment views metric inside our global state
          setBlogs(prev => prev.map(b => b.id === matchingBlog.id ? {
            ...b,
            metrics: { ...b.metrics, views: b.metrics.views + 1 }
          } : b));

          // Prepend history log
          const newHistoryItem: ReadingHistoryItem = {
            blogId: matchingBlog.id,
            viewedAt: new Date().toISOString()
          };
          setReadingHistory(prev => [newHistoryItem, ...prev.filter(item => item.blogId !== matchingBlog.id)].slice(0, 50));
        }
      }
    } else {
      setCurrentSlug(null);
    }
  };

  // Article Actions / mutations
  const handleDeleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    setBookmarks(prev => prev.filter(bId => bId !== id));
  };

  const handleTogglePublish = (id: string) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, isPublished: !b.isPublished } : b));
  };

  const handleDuplicateBlog = (id: string) => {
    const original = blogs.find(b => b.id === id);
    if (!original) return;
    const copy: Blog = {
      ...original,
      id: String(Date.now()),
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      publishedAt: new Date().toISOString(),
      isPublished: false
    };
    setBlogs(prev => [copy, ...prev]);
  };

  const handleSaveBlog = (blog: Blog) => {
    setBlogs(prev => {
      const exists = prev.some(b => b.id === blog.id);
      if (exists) {
        return prev.map(b => b.id === blog.id ? blog : b);
      } else {
        return [blog, ...prev];
      }
    });
  };

  const handleBulkDelete = (ids: string[]) => {
    setBlogs(prev => prev.filter(b => !ids.includes(b.id)));
    setBookmarks(prev => prev.filter(bId => !ids.includes(bId)));
  };

  const handleBulkPublish = (ids: string[], publish: boolean) => {
    setBlogs(prev => prev.map(b => ids.includes(b.id) ? { ...b, isPublished: publish } : b));
  };

  const handleBulkCategoryChange = (ids: string[], category: string) => {
    setBlogs(prev => prev.map(b => ids.includes(b.id) ? { ...b, category } : b));
  };

  // Comment Actions
  const handleAddComment = (
    blogId: string, 
    parentId: string | null, 
    authorName: string, 
    authorEmail: string, 
    content: string
  ) => {
    const newComment: Comment = {
      id: String(Date.now()),
      blogId,
      parentId,
      authorName,
      authorEmail,
      content,
      likes: 0,
      isApproved: true, // Auto-approve for sandbox env
      createdAt: new Date().toISOString()
    };
    setComments(prev => [newComment, ...prev]);
    recordTelemetry('comments', 1);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
  };

  const handleApproveComment = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, isApproved: true } : c));
  };

  const handleDeleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  // Bookmark and general actions
  const handleToggleBookmark = (id: string) => {
    setBookmarks(prev => {
      if (prev.includes(id)) {
        return prev.filter(bId => bId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleLikeBlog = (id: string) => {
    if (likedBlogs.includes(id)) return; // Prevent multiple likes in the session
    setLikedBlogs(prev => [...prev, id]);
    setBlogs(prev => prev.map(b => b.id === id ? {
      ...b,
      metrics: { ...b.metrics, likes: b.metrics.likes + 1 }
    } : b));
  };

  const handleSubscribe = (email: string) => {
    if (subscribers.some(s => s.email === email)) return true;
    const newSub: Subscriber = {
      id: String(Date.now()),
      email,
      status: 'Active',
      joinedAt: new Date().toISOString()
    };
    setSubscribers(prev => [newSub, ...prev]);
    recordTelemetry('subscribers', 1);
    return true;
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail || !footerEmail.includes('@')) return;
    handleSubscribe(footerEmail);
    setFooterSubscribed(true);
    setFooterEmail('');
    setTimeout(() => setFooterSubscribed(false), 5000);
  };

  const footerBlogs = useMemo(() => {
    return [...blogs]
      .filter(b => b.isPublished)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 2);
  }, [blogs]);

  const handleImportSubscribers = (emails: string[]) => {
    const newSubs = emails
      .filter(e => !subscribers.some(s => s.email === e))
      .map(email => ({
        id: String(Math.random()),
        email,
        status: 'Active' as const,
        joinedAt: new Date().toISOString()
      }));
    setSubscribers(prev => [...newSubs, ...prev]);
    recordTelemetry('subscribers', newSubs.length);
  };

  const handleCookieAccept = () => {
    localStorage.setItem('stringtotech_cookies_accepted', 'true');
    setShowCookieConsent(false);
  };

  return (
    <div 
      className={`min-h-screen flex flex-col justify-between overflow-x-hidden relative ${
        theme === 'dark' ? 'bg-[var(--bg-dark)] text-zinc-100' : 'bg-slate-50 text-slate-900 grid-bg-light'
      }`}
      style={{ fontFamily: config.fontSans, borderRadius: config.borderRadius }}
    >
      {/* Subtle cursor interactions (glowing cursor + particle trails) */}
      <InteractiveCursor theme={theme} />

      {/* Premium Dark Mode Wallpaper Background Components */}
      {theme === 'dark' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          {/* Ambient Glowing Spotlights with floating keyframe animations */}
          <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-[120px] animate-float-slow opacity-80" />
          <div className="absolute top-[25%] right-[-10%] w-[700px] h-[700px] rounded-full bg-secondary/6 blur-[140px] animate-float-reverse opacity-70" />
          <div className="absolute bottom-[15%] left-[-5%] w-[600px] h-[600px] rounded-full bg-accent/6 blur-[130px] animate-pulse-slow opacity-60" />
          
          {/* Grid lines & Dot meshes overlaying each other */}
          <div className="absolute inset-0 dark-dot-mesh opacity-90" />
          <div className="absolute inset-0 dark-grid-lines opacity-100" />

          {/* Mathematical / Cyber Science Wave & Grid Vector Art */}
          <svg className="absolute top-[5%] right-0 w-[90%] max-w-[1200px] h-[900px] text-zinc-800/15 opacity-75 select-none" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 950 C250 820, 350 980, 580 780 C780 580, 680 320, 1000 180" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 6" />
            <path d="M50 900 C270 800, 370 940, 600 750 C800 550, 700 290, 1000 130" stroke="currentColor" strokeWidth="0.8" />
            <path d="M100 1000 C300 880, 400 1040, 620 820 C820 620, 720 350, 1000 230" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Soft shining particle coordinates */}
            <circle cx="580" cy="780" r="4.5" fill="var(--color-primary)" className="opacity-60 animate-pulse" />
            <circle cx="600" cy="750" r="3" fill="var(--color-secondary)" className="opacity-50" />
            <circle cx="620" cy="820" r="5" fill="var(--color-accent)" className="opacity-65 animate-pulse-slow" />
            
            {/* Tech concentric planetary orbits / tracking circles */}
            <circle cx="850" cy="300" r="140" stroke="currentColor" strokeWidth="0.5" className="animate-spin-very-slow origin-[850px_300px]" strokeDasharray="4 8" />
            <circle cx="850" cy="300" r="90" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="850" cy="300" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" />
            
            {/* Compass ticks design */}
            <line x1="850" y1="140" x2="850" y2="155" stroke="currentColor" strokeWidth="1.5" />
            <line x1="850" y1="445" x2="850" y2="460" stroke="currentColor" strokeWidth="1.5" />
            <line x1="695" y1="300" x2="710" y2="300" stroke="currentColor" strokeWidth="1.5" />
            <line x1="990" y1="300" x2="1005" y2="300" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Top light glow bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      )}
      
      {/* 1. Navbar */}
      <nav className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-[var(--bg-dark)]/80 border-zinc-900/40' 
          : 'bg-white/85 border-zinc-150'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo brand */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-2 cursor-pointer font-custom group select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm shadow-md transition-transform group-hover:scale-105">
              S
            </div>
            <span className="font-extrabold tracking-tight text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              {config.logoText}
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            <button 
              onClick={() => navigateTo('home')} 
              className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                currentPage === 'home' 
                  ? 'bg-primary/10 text-primary dark:bg-primary/15' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              Feed
            </button>
            <button 
              onClick={() => navigateTo('author')} 
              className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                currentPage === 'author' 
                  ? 'bg-primary/10 text-primary dark:bg-primary/15' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              Authors
            </button>
            <button 
              onClick={() => navigateTo('bookmarks-history')} 
              className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                currentPage === 'bookmarks-history' 
                  ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              Saved Logs
            </button>
            <button 
              onClick={() => navigateTo('learning-journey')} 
              className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                currentPage === 'learning-journey' 
                  ? 'bg-violet-600/10 text-violet-600 dark:bg-violet-600/15' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              My Journey
            </button>
            <button 
              onClick={() => navigateTo('topic-explorer')} 
              className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                currentPage === 'topic-explorer' 
                  ? 'bg-primary/10 text-primary dark:bg-primary/15' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              Topic Explorer
            </button>
            <button 
              onClick={() => navigateTo('contact')} 
              className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                currentPage === 'contact' 
                  ? 'bg-primary/10 text-primary dark:bg-primary/15' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              Contact
            </button>
            
            <div className="h-4 w-px bg-zinc-200/60 dark:bg-zinc-800/60 mx-2" />
 
            <button 
              onClick={() => navigateTo('admin')} 
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ${
                currentPage === 'admin' 
                  ? 'bg-primary/10 text-primary dark:bg-primary/15' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <Cpu size={12} /> Console
            </button>
            <button 
              onClick={() => navigateTo('admin-customize')} 
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all ${
                currentPage === 'admin-customize' 
                  ? 'bg-primary/10 text-primary dark:bg-primary/15' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <Settings size={12} /> Customizer
            </button>
          </div>
 
          {/* Actions: Theme Toggle & Mobile trigger */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.35}>
              <button 
                onClick={toggleTheme} 
                className="p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer transition-all text-slate-500 dark:text-zinc-400 hover:scale-105 active:scale-95"
                title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
              >
                {theme === 'dark' ? <Sun size={14} className="animate-pulse" /> : <Moon size={14} />}
              </button>
            </Magnetic>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-[var(--bg-dark)] px-4 py-6 space-y-4 text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-300"
            >
              <button onClick={() => navigateTo('home')} className="block hover:text-primary w-full text-left py-1.5 border-b border-zinc-50 dark:border-zinc-900/40">Feed</button>
              <button onClick={() => navigateTo('author')} className="block hover:text-primary w-full text-left py-1.5 border-b border-zinc-50 dark:border-zinc-900/40">Authors</button>
              <button onClick={() => navigateTo('bookmarks-history')} className="block hover:text-primary w-full text-left py-1.5 border-b border-zinc-50 dark:border-zinc-900/40">Saved Logs</button>
              <button onClick={() => navigateTo('learning-journey')} className="block hover:text-primary w-full text-left py-1.5 border-b border-zinc-50 dark:border-zinc-900/40">My Journey</button>
              <button onClick={() => navigateTo('topic-explorer')} className="block hover:text-primary w-full text-left py-1.5 border-b border-zinc-50 dark:border-zinc-900/40">Topic Explorer</button>
              <button onClick={() => navigateTo('contact')} className="block hover:text-primary w-full text-left py-1.5 border-b border-zinc-50 dark:border-zinc-900/40">Contact</button>
              <button onClick={() => navigateTo('admin')} className="block hover:text-primary w-full text-left py-1.5 border-b border-zinc-50 dark:border-zinc-900/40 text-emerald-500">Platform Console</button>
              <button onClick={() => navigateTo('admin-customize')} className="block hover:text-primary w-full text-left py-1.5 text-accent">Branding Customizer</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Main Page Render Route switches */}
      <main className="flex-grow">
        {['admin', 'admin-customize', 'admin-editor', 'post-creation-success'].includes(currentPage) ? (
          <AdminAuthGate onNavigateHome={() => navigateTo('home')}>
            {currentPage === 'admin' && (
              <AdminDashboard 
                blogs={blogs}
                comments={comments}
                subscribers={subscribers}
                onNavigate={navigateTo}
                onDeleteBlog={handleDeleteBlog}
                onTogglePublish={handleTogglePublish}
                onDuplicateBlog={handleDuplicateBlog}
                onBulkDelete={handleBulkDelete}
                onBulkPublish={handleBulkPublish}
                onBulkCategoryChange={handleBulkCategoryChange}
                onApproveComment={handleApproveComment}
                onDeleteComment={handleDeleteComment}
                onImportSubscribers={handleImportSubscribers}
                trafficHistory={trafficHistory}
                onResetTraffic={handleResetTraffic}
              />
            )}

            {currentPage === 'admin-customize' && (
              <AdminCustomize />
            )}

            {currentPage === 'admin-editor' && (
              <AdminEditor 
                existingSlug={currentSlug}
                blogs={blogs}
                onSaveBlog={handleSaveBlog}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'post-creation-success' && (() => {
              const successBlog = blogs.find(b => b.slug === currentSlug);
              return successBlog ? (
                <PostCreationSuccess 
                  blog={successBlog}
                  onNavigate={navigateTo}
                  subscribersCount={subscribers.length}
                />
              ) : (
                <div className="p-12 text-center text-slate-500">Document registry index processing...</div>
              );
            })()}
          </AdminAuthGate>
        ) : null}

        {currentPage === 'home' && (
          <Home 
            blogs={blogs} 
            onNavigate={navigateTo} 
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSubscribe={handleSubscribe}
            subscribersCount={subscribers.length}
            readersCount={pageViews}
          />
        )}

        {currentPage === 'blog-detail' && currentSlug && (
          <BlogDetail 
            slug={currentSlug}
            blogs={blogs}
            comments={comments}
            onNavigate={navigateTo}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onLikeBlog={handleLikeBlog}
            likedBlogs={likedBlogs}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
          />
        )}

        {currentPage === 'contact' && (
          <Contact />
        )}

        {currentPage === 'author' && (
          <AuthorProfile 
            blogs={blogs} 
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'bookmarks-history' && (
          <BookmarksHistory 
            blogs={blogs}
            bookmarks={bookmarks}
            readingHistory={readingHistory}
            onToggleBookmark={handleToggleBookmark}
            onClearHistory={() => setReadingHistory([])}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'learning-journey' && (
          <LearningJourney />
        )}

        {currentPage === 'topic-explorer' && (
          <TopicExplorer />
        )}
      </main>

      {/* 3. Footer */}
      <footer className={`transition-all duration-500 relative border-t-0 overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-[var(--bg-dark)] via-[#0f1424] to-[#070a14] border-zinc-900/40 text-zinc-100' 
          : 'bg-gradient-to-b from-slate-50 via-zinc-100 to-zinc-200 border-zinc-200 text-slate-900'
      }`}>
        {/* Animated premium glow divider at the very top of footer */}
        <div className="w-full h-[2.5px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 animate-pulse opacity-85" />

        {/* Dynamic spot glows behind contents */}
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/5 dark:bg-violet-600/10 blur-[110px] -z-10 pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[350px] h-[350px] rounded-full bg-cyan-600/5 dark:bg-cyan-600/10 blur-[110px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-100/30 dark:border-zinc-900/40 relative z-10">
          
          {/* Brand Col & Personal Quote */}
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-2.5 cursor-pointer font-custom" onClick={() => navigateTo('home')}>
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-black text-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                S
              </div>
              <span className="font-extrabold tracking-tight text-base bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 dark:from-white dark:via-zinc-100 dark:to-zinc-200">
                StringToTech
              </span>
            </div>
            
            {/* Elegant personal quote card */}
            <div className="relative p-5 rounded-2xl bg-white/45 dark:bg-zinc-950/45 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 shadow-sm space-y-3">
              <Quote size={24} className="text-violet-500/20 dark:text-violet-400/20 absolute -top-3 -left-1" />
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed font-light italic select-none">
                "Code is the architecture of thought made executable. Let's design with intent, optimize with passion, and build with empathy."
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-zinc-100/50 dark:border-zinc-800/30">
                <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-200 shrink-0">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Lead Architect" className="w-full h-full object-cover" />
                </div>
                <div className="leading-none">
                  <span className="block text-[9px] font-bold text-slate-700 dark:text-zinc-300">Aman Pandey</span>
                  <span className="text-[8px] text-slate-400">Lead Architect & Developer</span>
                </div>
              </div>
            </div>

            {/* Social Links with soft glow on hover */}
            <div className="flex gap-2.5 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-violet-600 dark:hover:bg-violet-600 border border-zinc-200/50 dark:border-zinc-800/40 text-slate-500 dark:text-zinc-400 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_12px_rgba(139,92,246,0.25)]"
                title="GitHub Repository"
              >
                <Github size={15} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-sky-500 dark:hover:bg-sky-500 border border-zinc-200/50 dark:border-zinc-800/40 text-slate-500 dark:text-zinc-400 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_12px_rgba(14,165,233,0.25)]"
                title="Twitter Dispatch"
              >
                <Twitter size={15} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-blue-600 dark:hover:bg-blue-600 border border-zinc-200/50 dark:border-zinc-800/40 text-slate-500 dark:text-zinc-400 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)]"
                title="LinkedIn Network"
              >
                <Linkedin size={15} />
              </a>
              <button 
                onClick={() => navigateTo('contact')}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-100/80 dark:bg-zinc-900/80 hover:bg-emerald-600 dark:hover:bg-emerald-600 border border-zinc-200/50 dark:border-zinc-800/40 text-slate-500 dark:text-zinc-400 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_12px_rgba(16,185,129,0.25)] cursor-pointer"
                title="Email Support Desk"
              >
                <Mail size={15} />
              </button>
            </div>
          </div>

          {/* Sitemap Col: Explore & Platform combined */}
          <div className="space-y-4">
            <h5 className="text-[10px] uppercase font-bold tracking-widest text-slate-400/80 dark:text-zinc-500 flex items-center gap-1">
              <Terminal size={10} className="text-violet-500" /> Sitemap
            </h5>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-slate-600 dark:text-zinc-400">
              <button onClick={() => navigateTo('home')} className="hover:text-primary hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                Latest Feed
              </button>
              <button onClick={() => navigateTo('author')} className="hover:text-primary hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                Our Authors
              </button>
              <button onClick={() => navigateTo('bookmarks-history')} className="hover:text-primary hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                Bookmark Vault
              </button>
              <button onClick={() => navigateTo('learning-journey')} className="hover:text-primary hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                Learning Journey
              </button>
              <button onClick={() => navigateTo('contact')} className="hover:text-primary hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                Security Desk
              </button>
              <button onClick={() => navigateTo('admin')} className="hover:text-primary hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group">
                <span className="w-1 h-1 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                Manage Console
              </button>
            </div>
          </div>

          {/* Latest Blogs Column */}
          <div className="space-y-4 col-span-1">
            <h5 className="text-[10px] uppercase font-bold tracking-widest text-slate-400/80 dark:text-zinc-500 flex items-center gap-1">
              <BookOpen size={10} className="text-fuchsia-500" /> Architectural Logs
            </h5>
            <div className="space-y-3">
              {footerBlogs.map((b) => (
                <div 
                  key={b.id} 
                  onClick={() => navigateTo('blog-detail', b.slug)}
                  className="flex items-center gap-3 cursor-pointer group hover:bg-zinc-100/40 dark:hover:bg-zinc-950/40 p-1.5 rounded-xl border border-transparent hover:border-zinc-200/30 dark:hover:border-zinc-800/30 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg overflow-hidden bg-zinc-200 shrink-0 border border-zinc-100 dark:border-zinc-800 relative">
                    <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <h6 className="text-[11px] font-extrabold text-slate-800 dark:text-zinc-200 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {b.title}
                    </h6>
                    <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-mono mt-0.5 block flex items-center gap-1 uppercase">
                      {b.metrics.readingTime} min • {b.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h5 className="text-[10px] uppercase font-bold tracking-widest text-slate-400/80 dark:text-zinc-500 flex items-center gap-1">
              <Sparkles size={10} className="text-cyan-500" /> Newsletter
            </h5>
            <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 shadow-sm space-y-4">
              <div className="space-y-1">
                <span className="block text-[11px] font-bold text-slate-800 dark:text-zinc-200 leading-tight">Architectural Dispatch</span>
                <span className="block text-[9px] text-slate-400 dark:text-zinc-500 leading-relaxed font-light">Get raw distributed systems and compiler wisdom sent weekly. No spam.</span>
              </div>

              <form onSubmit={handleFooterSubscribe} className="space-y-2 relative">
                <div className="relative">
                  <input 
                    type="email" 
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Enter email address" 
                    required
                    className="w-full pl-3 pr-8 py-2.5 text-xs rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/40 focus:border-violet-500 dark:focus:border-violet-500 outline-none transition-all text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-600 shadow-inner"
                  />
                  <button 
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white rounded-lg hover:shadow-md cursor-pointer transition-all duration-300"
                    title="Subscribe"
                  >
                    <Send size={11} />
                  </button>
                </div>
                
                <AnimatePresence>
                  {footerSubscribed && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -bottom-8 left-0 right-0 text-center flex items-center justify-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 py-1 rounded-lg border border-emerald-500/15"
                    >
                      <Check size={10} /> Consensus accepted! Weekly logs sent.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

        </div>

        {/* Lower Credits bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400/80 dark:text-zinc-500/80 select-none relative z-10 font-mono">
          <span className="flex items-center gap-1 flex-wrap justify-center text-center">
            &copy; {new Date().getFullYear()} StringToTech Platform. Licensed Apache 2.0. Crafted with <Heart size={10} className="text-rose-500 fill-rose-500 animate-pulse inline-block" /> for engineers worldwide.
          </span>
          
          <div className="flex gap-4 items-center">
            <span className="text-[9px] text-slate-400 dark:text-zinc-600 uppercase tracking-widest bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/20 dark:border-zinc-800/20 px-2 py-0.5 rounded-md">
              Telemetry Active: {pageViews} logs
            </span>
          </div>
        </div>
      </footer>

      {/* Floating: Back to Top Button */}
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 z-40">
          <Magnetic strength={0.45}>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 bg-primary text-white rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer"
              title="Back To Top"
            >
              <ArrowUp size={16} />
            </button>
          </Magnetic>
        </div>
      )}

      {/* Floating: Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-6 left-6 max-w-sm p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 text-left space-y-3 font-custom">
          <div className="flex gap-2 items-center text-xs font-bold uppercase tracking-wider text-primary">
            <UserCheck size={16} /> Cookies & Privacy Consensus
          </div>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-light leading-relaxed">
            StringToTech stores bookmarks, likes, and session reading logs in raw client storage (localStorage) to optimize page loading latency.
          </p>
          <div className="flex justify-end gap-2 pt-1">
            <button 
              onClick={handleCookieAccept}
              className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg cursor-pointer hover:bg-opacity-95"
            >
              Accept Consensus
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CustomizationProvider>
      <AppContent />
    </CustomizationProvider>
  );
}
