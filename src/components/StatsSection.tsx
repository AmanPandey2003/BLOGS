import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Cpu, Clock, Code2, GitCommit, Library, 
  Sparkles, TrendingUp, RefreshCw, Plus, Calendar, Activity, Zap 
} from 'lucide-react';

// Reusable Counter component that counts up when it enters the viewport
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 1200, 
  prefix = '', 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMs = duration;
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

// Interface for Stats Item
interface StatItem {
  id: string;
  title: string;
  value: number;
  quarterlyValue: number;
  icon: React.ComponentType<any>;
  metricText: string;
  subText: string;
  actionText: string;
  color: string;
  borderColor: string;
  accentBg: string;
  shadowColor: string;
  progress: number;
  target: number;
  // Custom micro-rendering path (sparkline coords)
  sparkline: number[];
}

export const StatsSection: React.FC = () => {
  const [viewType, setViewType] = useState<'lifetime' | 'quarterly'>('lifetime');
  const [animationTrigger, setAnimationTrigger] = useState(0);
  
  // High fidelity dynamic state so users can "log" new actions to trigger dynamic real-time increases
  const [statsData, setStatsData] = useState<Record<string, number>>({
    articles: 42,
    topics: 18,
    hours: 1450,
    projects: 24,
    commits: 1842,
    books: 35
  });

  const [quarterlyData, setQuarterlyData] = useState<Record<string, number>>({
    articles: 12,
    topics: 6,
    hours: 320,
    projects: 8,
    commits: 512,
    books: 9
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Trigger a subtle success log toast when metrics are incremented
  const triggerNotification = (message: string) => {
    setNotification(message);
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioContext) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      osc.start();
      osc.stop(audioContext.currentTime + 0.15);
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleIncrement = (id: string, name: string) => {
    let incValue = 1;
    if (id === 'hours') incValue = 5;
    if (id === 'commits') incValue = 15;

    setStatsData(prev => ({
      ...prev,
      [id]: prev[id] + incValue
    }));

    setQuarterlyData(prev => ({
      ...prev,
      [id]: prev[id] + incValue
    }));

    triggerNotification(`Logged: +${incValue} to ${name}!`);
  };

  const resetAnimation = () => {
    setAnimationTrigger(prev => prev + 1);
    triggerNotification('Recalculating core statistics and reloading arrays...');
  };

  const statsList: StatItem[] = [
    {
      id: 'articles',
      title: 'Articles Published',
      value: statsData.articles,
      quarterlyValue: quarterlyData.articles,
      icon: BookOpen,
      metricText: 'Published on ledger',
      subText: 'Target: 50 published logs',
      actionText: 'Publish Log Draft',
      color: 'from-violet-600 to-indigo-600',
      borderColor: 'hover:border-violet-500/50 dark:hover:border-violet-500/40',
      accentBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
      shadowColor: 'hover:shadow-violet-500/10',
      progress: Math.min((statsData.articles / 50) * 100, 100),
      target: 50,
      sparkline: [20, 25, 23, 28, 30, 32, 42]
    },
    {
      id: 'topics',
      title: 'Topics Covered',
      value: statsData.topics,
      quarterlyValue: quarterlyData.topics,
      icon: Cpu,
      metricText: 'Axioms & system frameworks',
      subText: 'Target: 24 active paths',
      actionText: 'Index New Topic',
      color: 'from-emerald-600 to-teal-600',
      borderColor: 'hover:border-emerald-500/50 dark:hover:border-emerald-500/40',
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      shadowColor: 'hover:shadow-emerald-500/10',
      progress: Math.min((statsData.topics / 24) * 100, 100),
      target: 24,
      sparkline: [8, 10, 11, 14, 15, 17, 18]
    },
    {
      id: 'hours',
      title: 'Hours Studied',
      value: statsData.hours,
      quarterlyValue: quarterlyData.hours,
      icon: Clock,
      metricText: 'Deep focused compilation',
      subText: 'Target: 2,000 yearly hours',
      actionText: 'Log Study Hour (+5h)',
      color: 'from-cyan-600 to-blue-600',
      borderColor: 'hover:border-cyan-500/50 dark:hover:border-cyan-500/40',
      accentBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      shadowColor: 'hover:shadow-cyan-500/10',
      progress: Math.min((statsData.hours / 2000) * 100, 100),
      target: 2000,
      sparkline: [1000, 1150, 1220, 1310, 1380, 1420, 1450]
    },
    {
      id: 'projects',
      title: 'Projects Built',
      value: statsData.projects,
      quarterlyValue: quarterlyData.projects,
      icon: Code2,
      metricText: 'Production server networks',
      subText: 'Target: 30 shipped targets',
      actionText: 'Deploy App Cluster',
      color: 'from-fuchsia-600 to-pink-600',
      borderColor: 'hover:border-fuchsia-500/50 dark:hover:border-fuchsia-500/40',
      accentBg: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
      shadowColor: 'hover:shadow-fuchsia-500/10',
      progress: Math.min((statsData.projects / 30) * 100, 100),
      target: 30,
      sparkline: [12, 14, 15, 18, 20, 21, 24]
    },
    {
      id: 'commits',
      title: 'GitHub Commits',
      value: statsData.commits,
      quarterlyValue: quarterlyData.commits,
      icon: GitCommit,
      metricText: 'Repository version logs',
      subText: 'Target: 2,500 system delta',
      actionText: 'Push Git Commit (+15)',
      color: 'from-amber-600 to-orange-600',
      borderColor: 'hover:border-amber-500/50 dark:hover:border-amber-500/40',
      accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      shadowColor: 'hover:shadow-amber-500/10',
      progress: Math.min((statsData.commits / 2500) * 100, 100),
      target: 2500,
      sparkline: [1200, 1350, 1440, 1560, 1680, 1750, 1842]
    },
    {
      id: 'books',
      title: 'Books Read',
      value: statsData.books,
      quarterlyValue: quarterlyData.books,
      icon: Library,
      metricText: 'Classic system design reference',
      subText: 'Target: 45 critical readings',
      actionText: 'Register Read Book',
      color: 'from-rose-600 to-red-600',
      borderColor: 'hover:border-rose-500/50 dark:hover:border-rose-500/40',
      accentBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      shadowColor: 'hover:shadow-rose-500/10',
      progress: Math.min((statsData.books / 45) * 100, 100),
      target: 45,
      sparkline: [18, 22, 25, 27, 30, 32, 35]
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10 relative overflow-hidden" id="analytics-statistics-section">
      {/* Dynamic Ambient Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Segment Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20 uppercase tracking-widest">
            <Activity size={12} className="animate-pulse" /> Telemetry Core
          </div>
          <h2 className="text-2xl sm:text-4.5xl font-black tracking-tight font-custom">
            Compiling <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Engine Metrics</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-light max-w-2xl leading-relaxed">
            Real-time visual tracking of code, publications, research milestones, and structural contributions. Toggle metrics or interact to simulate dynamic ledger changes.
          </p>
        </div>

        {/* Dashboard Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-200/50 dark:border-zinc-800/60 shadow-sm">
            <button
              onClick={() => setViewType('lifetime')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewType === 'lifetime'
                  ? 'bg-white dark:bg-zinc-850 text-slate-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-zinc-300'
              }`}
            >
              Lifetime
            </button>
            <button
              onClick={() => setViewType('quarterly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                viewType === 'quarterly'
                  ? 'bg-white dark:bg-zinc-850 text-slate-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-zinc-300'
              }`}
            >
              Quarterly
            </button>
          </div>

          <button
            onClick={resetAnimation}
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm cursor-pointer"
            title="Reset Array Simulation"
          >
            <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Stats Cards Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {statsList.map((item, index) => {
          const Icon = item.icon;
          const displayValue = viewType === 'lifetime' ? item.value : item.quarterlyValue;
          
          return (
            <motion.div
              key={`${item.id}-${animationTrigger}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group p-6 sm:p-7 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-950/70 backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${item.borderColor} ${item.shadowColor} shadow-sm`}
            >
              <div className="space-y-4">
                {/* Header Icon Shield */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${item.accentBg} border`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Calendar size={10} /> {viewType === 'lifetime' ? 'All-Time' : 'This Quarter'}
                  </span>
                </div>

                {/* Main Dynamic Counter */}
                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-400 dark:text-zinc-500 font-mono uppercase tracking-wider">
                    {item.title}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white font-custom select-all flex items-baseline gap-1.5">
                    <AnimatedCounter 
                      value={displayValue} 
                      suffix={item.id === 'hours' ? 'h' : ''} 
                    />
                    <motion.span 
                      key={displayValue}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-emerald-500 font-bold font-mono"
                    >
                      ▲
                    </motion.span>
                  </div>
                </div>

                {/* Micro Visualizer: Live Sparkline graph for a premium aesthetic */}
                <div className="h-9 py-1 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`grad-${item.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(262, 80%, 60%)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(262, 80%, 60%)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M ${item.sparkline.map((val, idx) => {
                        const x = (idx / (item.sparkline.length - 1)) * 100;
                        const min = Math.min(...item.sparkline);
                        const max = Math.max(...item.sparkline);
                        const y = 18 - ((val - min) / (max - min || 1)) * 14;
                        return `${x} ${y}`;
                      }).join(' L ')}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-primary/40 dark:text-primary/60 group-hover:text-primary transition-colors"
                    />
                  </svg>
                </div>

                {/* Subtext info */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span className="font-medium">{item.metricText}</span>
                    <span className="font-bold">{Math.round(item.progress)}%</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    />
                  </div>
                  <span className="block text-[9px] text-slate-400 dark:text-zinc-500 font-mono italic">
                    {item.subText}
                  </span>
                </div>
              </div>

              {/* Incremental Interactive Trigger - Dynamic Sandbox Logic */}
              <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-900/60">
                <button
                  onClick={() => handleIncrement(item.id, item.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850/80 text-slate-700 dark:text-zinc-300 text-xs font-semibold font-mono border border-zinc-200/40 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700/60 transition-all cursor-pointer flex items-center justify-center gap-1.5 group/btn"
                >
                  <Plus size={12} className="text-slate-400 group-hover/btn:text-primary group-hover/btn:scale-125 transition-all" />
                  {item.actionText}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Logs Notification Area */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 p-4.5 rounded-2xl bg-slate-900/95 dark:bg-zinc-950/95 text-white border border-zinc-800 shadow-xl backdrop-blur-md flex items-center gap-3.5 max-w-sm"
          >
            <div className="p-1.5 rounded-xl bg-primary/25 border border-primary/40 text-primary animate-pulse">
              <Zap size={14} />
            </div>
            <div className="space-y-0.5">
              <span className="block text-[9px] uppercase font-mono tracking-widest text-primary font-bold">Ledger Signal</span>
              <p className="text-xs text-zinc-300 font-light font-mono">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
