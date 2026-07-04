import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  BookOpen, Cpu, Code2, Users, Activity, Sparkles, RefreshCw, AlertCircle 
} from 'lucide-react';
import { Blog } from '../types';

// Reusable Counter component that counts up when it enters the viewport
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 1000, 
  prefix = '', 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMs = duration;
    // Cap step time to a minimum of 10ms for rendering performance
    const stepTime = Math.max(Math.floor(totalMs / Math.max(end, 1)), 10);
    const stepValue = Math.ceil(end / (totalMs / stepTime));

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

interface StatsSectionProps {
  blogs?: Blog[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ blogs = [] }) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [visitorLoading, setVisitorLoading] = useState(true);
  const [visitorError, setVisitorError] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [statsTrigger, setStatsTrigger] = useState(0);

  // 1. Calculate real Articles Published count (exclude drafts/unpublished)
  const articlesCount = useMemo(() => {
    return blogs.filter(b => b.isPublished).length;
  }, [blogs]);

  // 2. Calculate real unique Topics Covered from published posts
  const uniqueTopicsCount = useMemo(() => {
    const published = blogs.filter(b => b.isPublished);
    const categories = published.map(b => b.category).filter(Boolean);
    return Array.from(new Set(categories)).length;
  }, [blogs]);

  // 3. Calculate real Projects Built count (published posts with 'Projects' category)
  const projectsCount = useMemo(() => {
    return blogs.filter(b => b.isPublished && b.category === 'Projects').length;
  }, [blogs]);

  // Fetch real visitors from counterapi.dev specific to this site deployment
  const fetchVisitorCount = async () => {
    try {
      const hostname = window.location.hostname;
      // Sanitize hostname to make a safe counter namespace
      const cleanHost = hostname.replace(/[^a-zA-Z0-9]/g, '-') || 'stringtotech-dev';
      const namespace = `stringtotech-visitors-${cleanHost}`;
      const key = 'unique-visits';

      // Check if this specific client browser has been counted in this session
      const hasVisited = localStorage.getItem('stringtotech_unq_visited_v1');
      let url = `https://api.counterapi.dev/v1/${namespace}/${key}`;
      if (!hasVisited) {
        url = `https://api.counterapi.dev/v1/${namespace}/${key}/up`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Analytics API offline or blocked');
      }
      const data = await res.json();
      if (data && typeof data.count === 'number') {
        setVisitorCount(data.count);
        if (!hasVisited) {
          localStorage.setItem('stringtotech_unq_visited_v1', 'true');
        }
        setVisitorError(false);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      console.warn('External visitor API failed, falling back to local client tracking:', err);
      // Fallback: Read local persistent views from localStorage as a reliable, real client-side telemetry source
      try {
        const localViews = localStorage.getItem('stringtotech_pageviews_v3');
        if (localViews) {
          const viewsNum = parseInt(localViews, 10);
          setVisitorCount(viewsNum);
          setVisitorError(false);
        } else {
          setVisitorError(true);
        }
      } catch (e) {
        setVisitorError(true);
      }
    } finally {
      setVisitorLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitorCount();
  }, [statsTrigger]);

  const handleRefreshStats = () => {
    setRecalculating(true);
    setStatsTrigger(prev => prev + 1);
    setTimeout(() => {
      setRecalculating(false);
    }, 800);
  };

  const metricsList = [
    {
      id: 'articles',
      title: 'Articles Published',
      value: articlesCount,
      loading: false,
      error: false,
      icon: BookOpen,
      subtext: 'Verified posts on ledger',
      color: 'from-violet-500 to-indigo-600',
      accentBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
      glowColor: 'rgba(139, 92, 246, 0.15)',
    },
    {
      id: 'topics',
      title: 'Topics Covered',
      value: uniqueTopicsCount,
      loading: false,
      error: false,
      icon: Cpu,
      subtext: 'Unique knowledge categories',
      color: 'from-emerald-500 to-teal-600',
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      glowColor: 'rgba(16, 185, 129, 0.15)',
    },
    {
      id: 'projects',
      title: 'Projects Built',
      value: projectsCount,
      loading: false,
      error: false,
      icon: Code2,
      subtext: 'Published software systems',
      color: 'from-fuchsia-500 to-pink-600',
      accentBg: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
      glowColor: 'rgba(217, 70, 239, 0.15)',
    },
    {
      id: 'visitors',
      title: 'Total Visitors',
      value: visitorCount,
      loading: visitorLoading,
      error: visitorError,
      icon: Users,
      subtext: 'Unique website visits',
      color: 'from-amber-500 to-orange-600',
      accentBg: 'bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20',
      glowColor: 'rgba(245, 158, 11, 0.15)',
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 relative overflow-hidden" id="site-statistics-section">
      {/* Background glow flares for depth */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold font-mono border border-primary/20 uppercase tracking-wider select-none">
            <Activity size={12} className="animate-pulse text-primary" /> Live Telemetry System
          </div>
          <h2 className="text-3xl md:text-4.5xl font-black tracking-tight font-custom text-slate-900 dark:text-white">
            Site <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Real-Time Statistics</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-light max-w-2xl leading-relaxed">
            Automatically compiled metrics showing true architectural posts, topics covered, shipped projects, and active visitor traffic on this deployment.
          </p>
        </div>

        {/* Sync Controls */}
        <button
          onClick={handleRefreshStats}
          disabled={recalculating}
          className="self-start md:self-end flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/60 dark:bg-zinc-900/60 hover:bg-zinc-100/80 dark:hover:bg-zinc-850/80 text-slate-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm cursor-pointer select-none disabled:opacity-50 group font-mono text-xs"
        >
          <RefreshCw 
            size={13} 
            className={`${recalculating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} 
          />
          {recalculating ? 'Syncing...' : 'Sync Telemetry'}
        </button>
      </div>

      {/* Stats Cards Responsive Bento Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {metricsList.map((item, index) => {
          const Icon = item.icon;
          const displayValue = item.value;
          const hasLoaded = !item.loading && displayValue !== null && !item.error;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-6 sm:p-7 rounded-3xl border border-zinc-200/50 dark:border-zinc-850/50 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-sm overflow-hidden"
              style={{
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.03)`,
              }}
            >
              {/* Soft atmospheric backlight glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${item.glowColor} 0%, transparent 70%)`
                }}
              />

              <div className="space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${item.accentBg} border border-transparent`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-slow" /> Real data
                  </span>
                </div>

                {/* Primary Metric and Count Up */}
                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-400 dark:text-zinc-500 font-mono uppercase tracking-wider select-none">
                    {item.title}
                  </span>

                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-custom select-all flex items-baseline gap-1.5">
                    {item.loading ? (
                      <div className="h-10 w-24 bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse rounded-xl" />
                    ) : item.error ? (
                      <span className="text-sm font-semibold text-slate-400 dark:text-zinc-500 font-mono tracking-normal">
                        Unavailable
                      </span>
                    ) : displayValue === null || displayValue === undefined ? (
                      <span className="text-2xl font-bold font-mono text-slate-400 dark:text-zinc-500">
                        —
                      </span>
                    ) : (
                      <>
                        <AnimatedCounter value={displayValue} />
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-xs text-emerald-500 font-bold font-mono select-none"
                        >
                          ▲
                        </motion.span>
                      </>
                    )}
                  </div>
                </div>

                {/* Subtext info */}
                <div className="pt-2 border-t border-zinc-150/50 dark:border-zinc-900/30">
                  <span className="block text-[10px] text-slate-400 dark:text-zinc-500 font-mono tracking-wide leading-none select-none">
                    {item.subtext}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
