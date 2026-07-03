import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sigma, Cpu, Layers, Server, BrainCircuit, LineChart, FolderGit2, GitBranch, Rocket,
  Calendar, ChevronDown, ChevronUp, Play, RefreshCw, Sliders, Database,
  Code2, Sparkles, Plus, Minus, Info, AlertCircle, ArrowRight, CheckCircle2,
  Lock, ArrowDown, Activity, Zap, Star, ShieldAlert, Send
} from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  domain: 'Theoretical' | 'Applied' | 'Engineering' | 'Entrepreneurship';
  description: string;
  skills: string[];
  achievements: string[];
  interactiveTitle: string;
}

export const LearningJourney: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>('math');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track page scroll to animate timeline progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const milestones: Milestone[] = [
    {
      id: 'math',
      title: 'Learning Mathematics',
      subtitle: 'The foundations of computational logic & proof',
      timeframe: 'Months 1 - 3',
      icon: Sigma,
      color: 'from-violet-500 to-indigo-600',
      gradient: 'rgba(139, 92, 246, 0.15)',
      domain: 'Theoretical',
      description: 'Understanding the formal grammar of computation. Explored set theory, linear algebra, multivariable calculus, and discrete mathematics. This formal framework enables reasoning about optimization, algorithm stability, and deep neural geometries.',
      skills: ['Linear Algebra', 'Discrete Math', 'Calculus', 'Probability & Stats', 'Formal Logic'],
      achievements: [
        'Solved 200+ mathematical proofs & logic puzzles',
        'Implemented custom vector and matrix multiplication library in pure JS',
        'Built discrete graph theory node clustering logic'
      ],
      interactiveTitle: 'Interactive Logic Gate Truth Table'
    },
    {
      id: 'dsa',
      title: 'Learning DSA',
      subtitle: 'Algorithmic efficiency & memory management',
      timeframe: 'Months 4 - 6',
      icon: Cpu,
      color: 'from-blue-500 to-indigo-600',
      gradient: 'rgba(59, 130, 246, 0.15)',
      domain: 'Theoretical',
      description: 'Mastery over memory architectures and algorithmic complexity. Deep dive into fundamental data structures (linked lists, BSTs, heaps, hashes, graphs) and core computational algorithms (dynamic programming, greedy, backtracking, traversal, sorting).',
      skills: ['Asymptotic Analysis', 'Tree Traversal', 'Dynamic Programming', 'Graph Search', 'Heaps & Tries'],
      achievements: [
        'Optimized custom heap allocation algorithm for real-time memory pooling',
        'Designed pathfinding simulation using Dijkstra and A* variations',
        'Completed 350+ data structure optimization tasks with minimal complexity'
      ],
      interactiveTitle: 'Array Sorting Step-by-Step Visualizer'
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      subtitle: 'Visual translation of architecture & interaction',
      timeframe: 'Months 7 - 9',
      icon: Layers,
      color: 'from-cyan-500 to-blue-600',
      gradient: 'rgba(6, 182, 212, 0.15)',
      domain: 'Engineering',
      description: 'Translating intricate backend structures into zero-latency, high-fidelity browser interfaces. Focused on reactive state loops, component isolation, CSS/Tailwind layouts, and fluid performance with Framer Motion and custom rendering pipelines.',
      skills: ['React & Next.js', 'Tailwind CSS', 'Vite & Bundling', 'State Orchestration', 'Micro-Animations'],
      achievements: [
        'Created custom highly performant 60fps canvas renderer for graph streams',
        'Architected fully accessible dynamic styling framework used in 5 separate projects',
        'Optimized Lighthouse score from 45 to 100 on multi-view web dashboard'
      ],
      interactiveTitle: 'CSS Variable Tuning & Style Studio'
    },
    {
      id: 'backend',
      title: 'Backend Development',
      subtitle: 'Scalability, API structures, & system durability',
      timeframe: 'Months 10 - 12',
      icon: Server,
      color: 'from-emerald-500 to-teal-600',
      gradient: 'rgba(16, 185, 129, 0.15)',
      domain: 'Engineering',
      description: 'Designing distributed servers capable of orchestrating thousands of simultaneous operations. Explored Express, Node.js, relational vs NoSQL schemas, database pooling, key-value caching (Redis style), load-balancing, and connection pooling.',
      skills: ['API Architectures', 'Relational Databases', 'Caching Layers', 'Security Hardening', 'Distributed Architecture'],
      achievements: [
        'Engineered microservice server with integrated in-memory cache proxy',
        'Implemented JWT session authorization with custom crypto verification tokens',
        'Created custom multi-worker cluster thread system supporting parallel task loads'
      ],
      interactiveTitle: 'Load Balancer & Server Request Simulator'
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      subtitle: 'Generative capabilities & LLM orchestrations',
      timeframe: 'Months 13 - 15',
      icon: BrainCircuit,
      color: 'from-pink-500 to-rose-600',
      gradient: 'rgba(236, 72, 153, 0.15)',
      domain: 'Applied',
      description: 'Harnessing next-generation artificial intelligence to automate decision matrices. Specialized in Large Language Model (LLM) prompts, multi-agent workflows, vector search embeddings, semantic analysis, and fine-tuning control APIs.',
      skills: ['Gemini API SDK', 'Prompt Engineering', 'Vector Database Search', 'Agentic Logic', 'Function Calling'],
      achievements: [
        'Built full-stack agentic workspace integrating server-side Gemini intelligence',
        'Designed vector embeddings indexing system to query complex PDFs semantic logic',
        'Constructed custom automated fallback routing system for redundant AI models'
      ],
      interactiveTitle: 'Live AI Intent & Prompt Categorizer'
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      subtitle: 'Mathematical modeling & automated training',
      timeframe: 'Months 16 - 18',
      icon: LineChart,
      color: 'from-amber-500 to-orange-600',
      gradient: 'rgba(245, 158, 11, 0.15)',
      domain: 'Theoretical',
      description: 'Deepening neural patterns through gradient updates and parametric cost reductions. Designed linear and logistic regression engines, simple multi-layer neural networks, backpropagation loops, and model evaluation metrics.',
      skills: ['Neural Networks', 'Cost Functions', 'Gradient Descent', 'Hyperparameter Tuning', 'Evaluation Metrics'],
      achievements: [
        'Implemented neural net from scratch in pure TS to classify XOR logic gates',
        'Constructed linear regression engine to predict resource runtime overhead',
        'Tuned stochastic gradient descent iterations to optimize training speeds by 3x'
      ],
      interactiveTitle: 'Hyperparameter Cost Training Simulation'
    },
    {
      id: 'projects',
      title: 'Launch Projects',
      subtitle: 'Shipping real products to real clients',
      timeframe: 'Months 19 - 21',
      icon: FolderGit2,
      color: 'from-fuchsia-500 to-purple-600',
      gradient: 'rgba(217, 70, 239, 0.15)',
      domain: 'Applied',
      description: 'Packaging separate technology disciplines into single, unified production products. Managed end-to-end SDLC from UX wireframes, system schematics, database migrations, security audits, to final multi-cluster deployments.',
      skills: ['Product Lifecycle', 'System Testing', 'Security Audits', 'CI/CD Pipelines', 'UX Design System'],
      achievements: [
        'Shipped full-stack system utilized by over 5,000 active monthly visitors',
        'Designed complete automated test pipeline covering 92% of logic structures',
        'Deployed containerized infrastructure with continuous zero-downtime updates'
      ],
      interactiveTitle: 'Interactive Bento Project Task Board'
    },
    {
      id: 'opensource',
      title: 'Open Source Integration',
      subtitle: 'Community contributions & global engineering standards',
      timeframe: 'Months 22 - 24',
      icon: GitBranch,
      color: 'from-sky-500 to-blue-600',
      gradient: 'rgba(14, 165, 233, 0.15)',
      domain: 'Engineering',
      description: 'Engaging with global engineers to build resilient open software. Mastered complex branch structures, descriptive pull requests, detailed code reviews, automated CI checks, and standard package distribution registries.',
      skills: ['Git Orchestration', 'Peer Code Reviews', 'Community Standards', 'Package Dist', 'Issue Triage'],
      achievements: [
        'Contributed 12 performance-critical patches to standard development tools',
        'Reviewed & approved 80+ structural PRs under strict community guidelines',
        'Authored and distributed custom utility package downloaded over 10k times'
      ],
      interactiveTitle: 'Pull Request Peer Review Game'
    },
    {
      id: 'startup',
      title: 'Startup Journey',
      subtitle: 'Building a sustainable tech enterprise',
      timeframe: 'Months 25+',
      icon: Rocket,
      color: 'from-rose-500 to-orange-600',
      gradient: 'rgba(244, 63, 94, 0.15)',
      domain: 'Entrepreneurship',
      description: 'Transitioning from clean code to profitable business architecture. Managed seed round pitching, developer salary runways, SaaS subscription models, client acquisition channels, and long-term tech roadmap prioritization.',
      skills: ['Enterprise Architecture', 'Runway Management', 'SaaS Subscriptions', 'Investor Pitching', 'Agile Team Scaling'],
      achievements: [
        'Co-founded software startup securing initial validation client rosters',
        'Maintained structured developer runway model with 100% break-even transparency',
        'Scaled engineering team from solo author to 5 talented engineers'
      ],
      interactiveTitle: 'SaaS Capital Runway HUD Simulator'
    }
  ];

  const domains = ['All', 'Theoretical', 'Applied', 'Engineering', 'Entrepreneurship'];

  const filteredMilestones = useMemo(() => {
    if (selectedDomain === 'All') return milestones;
    return milestones.filter(m => m.domain === selectedDomain);
  }, [selectedDomain]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      
      {/* Scroll indicator sidebar line */}
      <div className="fixed left-4 top-24 bottom-24 w-1 bg-zinc-200 dark:bg-zinc-800/40 rounded-full hidden lg:block z-20">
        <div 
          className="w-full bg-gradient-to-b from-violet-600 via-fuchsia-500 to-cyan-400 rounded-full transition-all duration-100" 
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Header and statistics */}
      <div className="text-center space-y-4 mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-600/10 dark:bg-violet-600/15 rounded-full blur-[80px] -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-mono border border-violet-500/20 uppercase tracking-widest">
          <Activity size={12} className="animate-pulse" /> Architect Ledger
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-custom">
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500">Learning Journey</span>
        </h1>
        
        <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          An interactive, chronological timeline documenting the evolution from basic logical axioms to complex distributed systems, product deployments, and entrepreneurial ventures.
        </p>

        {/* HUD Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 shadow-sm">
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-zinc-500">Milestones Passed</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white font-custom mt-1 block">9 / 9</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 shadow-sm">
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-zinc-500">Domains Explored</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white font-custom mt-1 block">4 Domains</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 shadow-sm">
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-zinc-500">Time Accumulated</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white font-custom mt-1 block">2.5+ Years</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 shadow-sm">
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-zinc-500">Journey Status</span>
            <span className="text-2xl font-black text-emerald-500 font-custom mt-1 block flex items-center justify-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" /> Active
            </span>
          </div>
        </div>
      </div>

      {/* Filter and controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => {
              setSelectedDomain(dom);
              // Auto collapse if the selected filter excludes the current expanded milestone
              const match = milestones.find(m => m.id === expandedMilestone);
              if (dom !== 'All' && match && match.domain !== dom) {
                const nextMatch = milestones.find(m => m.domain === dom);
                setExpandedMilestone(nextMatch ? nextMatch.id : null);
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedDomain === dom
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 text-slate-600 dark:text-zinc-400'
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Main Timeline Stream */}
      <div className="relative border-l border-zinc-200 dark:border-zinc-800/80 ml-4 md:ml-8 lg:ml-12 pl-6 md:pl-10 lg:pl-14 space-y-12 pb-16">
        
        {/* Glow pulsing base station */}
        <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(139,92,246,0.8)] z-10" />

        <AnimatePresence mode="popLayout">
          {filteredMilestones.map((m, index) => {
            const IconComponent = m.icon;
            const isExpanded = expandedMilestone === m.id;
            
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Visual Connector Dot */}
                <div className={`absolute -left-[31px] md:-left-[47px] lg:-left-[63px] top-4 w-[11px] h-[11px] rounded-full border-2 bg-white dark:bg-zinc-950 transition-all duration-300 z-10 ${
                  isExpanded 
                    ? 'border-violet-500 scale-125 shadow-[0_0_10px_rgba(139,92,246,0.6)]' 
                    : 'border-zinc-300 dark:border-zinc-700 group-hover:border-violet-400'
                }`} />

                {/* Main Card */}
                <div className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                  isExpanded 
                    ? 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800/90 shadow-[0_15px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]' 
                    : 'bg-white/50 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-900/50 hover:border-zinc-200 dark:hover:border-zinc-800/70 shadow-sm'
                }`}>
                  
                  {/* Card Header clickable area */}
                  <div 
                    onClick={() => setExpandedMilestone(isExpanded ? null : m.id)}
                    className="p-6 sm:p-8 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-start gap-4">
                      {/* Milestone Domain Icon Shield */}
                      <div className={`p-3 rounded-2xl bg-gradient-to-tr ${m.color} text-white shadow-md shrink-0`}>
                        <IconComponent size={20} />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 dark:text-zinc-500">
                            {m.timeframe}
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 border border-zinc-200/20 dark:border-zinc-700/20">
                            {m.domain}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white font-custom group-hover:text-primary transition-colors">
                          {m.title}
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
                          {m.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:self-center self-end">
                      <span className="text-xs text-slate-400 dark:text-zinc-500 hidden sm:inline">
                        {isExpanded ? 'Collapse Console' : 'Expand Interactive Playground'}
                      </span>
                      <div className={`p-2 rounded-xl bg-zinc-150/40 dark:bg-zinc-800/40 text-slate-500 dark:text-zinc-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded detail section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-zinc-100 dark:border-zinc-900/80 p-6 sm:p-8 space-y-8 bg-zinc-50/30 dark:bg-zinc-950/30">
                          
                          {/* Description and Skills Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* Detailed Description */}
                            <div className="lg:col-span-7 space-y-4">
                              <h4 className="text-[10px] uppercase tracking-wider font-mono text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
                                <Info size={11} className="text-primary" /> Architectural Log
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-light">
                                {m.description}
                              </p>

                              {/* Achievements bullet list */}
                              <div className="space-y-2 pt-2">
                                <h5 className="text-[9px] uppercase tracking-wider font-mono text-slate-400 dark:text-zinc-500">Core Ledger Achievements</h5>
                                <ul className="space-y-2">
                                  {m.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-500 dark:text-zinc-400">
                                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                                      <span className="font-light">{ach}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Skills acquired stack */}
                            <div className="lg:col-span-5 space-y-4">
                              <h4 className="text-[10px] uppercase tracking-wider font-mono text-slate-400 dark:text-zinc-500">Compiling Skill Library</h4>
                              <div className="flex flex-wrap gap-2">
                                {m.skills.map((sk) => (
                                  <span 
                                    key={sk} 
                                    className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900/60 text-slate-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800/40 font-mono shadow-sm"
                                  >
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            </div>

                          </div>

                          {/* Interactive Playground Feature Container */}
                          <div className="pt-6 border-t border-zinc-150 dark:border-zinc-900/60 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-[10px] uppercase tracking-wider font-mono text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
                                <Zap size={11} className="text-amber-500 animate-pulse" /> {m.interactiveTitle}
                              </h4>
                              <span className="text-[8px] font-mono uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                                Simulated Sandbox
                              </span>
                            </div>

                            {/* Dynamic render of matching interactive widget */}
                            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/50 shadow-inner">
                              {m.id === 'math' && <MathSandbox theme={m.color} />}
                              {m.id === 'dsa' && <DsaSandbox theme={m.color} />}
                              {m.id === 'frontend' && <FrontendSandbox theme={m.color} />}
                              {m.id === 'backend' && <BackendSandbox theme={m.color} />}
                              {m.id === 'ai' && <AiSandbox theme={m.color} />}
                              {m.id === 'ml' && <MlSandbox theme={m.color} />}
                              {m.id === 'projects' && <ProjectsSandbox theme={m.color} />}
                              {m.id === 'opensource' && <OpenSourceSandbox theme={m.color} />}
                              {m.id === 'startup' && <StartupSandbox theme={m.color} />}
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>

      {/* Finishing / Closing statement */}
      <div className="text-center py-12 max-w-2xl mx-auto space-y-4 border-t border-zinc-200/40 dark:border-zinc-900/40 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-600/5 dark:bg-cyan-600/10 rounded-full blur-[70px] -z-10 pointer-events-none" />
        <Star className="text-amber-500 animate-pulse mx-auto" size={24} />
        <h3 className="text-xl font-bold font-custom text-slate-800 dark:text-white">Continuous Compilation</h3>
        <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
          "The ledger of learning is never read-only. We push code, debug runtime complexity, adjust hyperparameter weight files, and continue building architectures of tomorrow."
        </p>
      </div>

    </div>
  );
};


// ==========================================
// INDIVIDUAL SANDBOX COMPONENT IMPLEMENTATIONS
// ==========================================

// 1. Math Sandbox: Discrete Logic Gates
const MathSandbox: React.FC<{ theme: string }> = () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        Discrete structures represent the backbone of logic. Toggle the input lines below to see how standard logical operators calculate their final state registers.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
        {/* Input Controls */}
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">Input A</span>
            <button 
              onClick={() => setA(!a)}
              className={`w-12 h-12 rounded-xl text-xs font-mono font-black transition-all cursor-pointer flex items-center justify-center border ${
                a 
                  ? 'bg-violet-600 border-violet-500 text-white shadow-md shadow-violet-500/20' 
                  : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-slate-400'
              }`}
            >
              {a ? '1' : '0'}
            </button>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">{a ? 'True' : 'False'}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">Input B</span>
            <button 
              onClick={() => setB(!b)}
              className={`w-12 h-12 rounded-xl text-xs font-mono font-black transition-all cursor-pointer flex items-center justify-center border ${
                b 
                  ? 'bg-violet-600 border-violet-500 text-white shadow-md shadow-violet-500/20' 
                  : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-slate-400'
              }`}
            >
              {b ? '1' : '0'}
            </button>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">{b ? 'True' : 'False'}</span>
          </div>
        </div>

        {/* Real-time Operator Registers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
          <div className="p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center space-y-1">
            <span className="block text-[9px] font-mono text-slate-400 uppercase">AND (A ∧ B)</span>
            <span className={`text-lg font-mono font-black ${(a && b) ? 'text-violet-500' : 'text-slate-400'}`}>
              {(a && b) ? '1' : '0'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center space-y-1">
            <span className="block text-[9px] font-mono text-slate-400 uppercase">OR (A ∨ B)</span>
            <span className={`text-lg font-mono font-black ${(a || b) ? 'text-violet-500' : 'text-slate-400'}`}>
              {(a || b) ? '1' : '0'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center space-y-1">
            <span className="block text-[9px] font-mono text-slate-400 uppercase">XOR (A ⊕ B)</span>
            <span className={`text-lg font-mono font-black ${(a !== b) ? 'text-violet-500' : 'text-slate-400'}`}>
              {(a !== b) ? '1' : '0'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center space-y-1">
            <span className="block text-[9px] font-mono text-slate-400 uppercase">NAND (¬(A∧B))</span>
            <span className={`text-lg font-mono font-black {!(a && b) ? 'text-violet-500' : 'text-slate-400'}`}>
              {!(a && b) ? '1' : '0'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


// 2. DSA Sandbox: Array Sorting Step-by-Step
const DsaSandbox: React.FC<{ theme: string }> = () => {
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 56, 18, 70]);
  const [sorting, setSorting] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);
  const [sortedCount, setSortedCount] = useState(0);

  const resetArray = () => {
    setArray(Array.from({ length: 7 }, () => Math.floor(Math.random() * 80) + 10));
    setCurrentIndexes([]);
    setSortedCount(0);
  };

  const bubbleSortStep = async () => {
    if (sorting) return;
    setSorting(true);
    let arr = [...array];
    const len = arr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        setCurrentIndexes([j, j + 1]);
        await new Promise((res) => setTimeout(res, 500));
        
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
      setSortedCount(i + 1);
    }
    setCurrentIndexes([]);
    setSorting(false);
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        Asymptotic sorting complexity becomes real. Watch bubble sort compare indices and swap values to bring array registers into optimal sorted sequence.
      </p>

      {/* Visual Bar graph array display */}
      <div className="h-28 flex items-end justify-center gap-3.5 border-b border-zinc-150 dark:border-zinc-800/60 pb-3">
        {array.map((val, idx) => {
          const isActive = currentIndexes.includes(idx);
          const isSorted = idx >= array.length - sortedCount;
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[40px]">
              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-zinc-500">{val}</span>
              <div 
                className={`w-full rounded-t-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' 
                    : isSorted 
                      ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                      : 'bg-primary/75'
                }`}
                style={{ height: `${val * 1.2}px` }}
              />
              <span className="text-[8px] font-mono text-zinc-500">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-2">
          <button 
            disabled={sorting}
            onClick={bubbleSortStep}
            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 disabled:opacity-50 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Play size={12} /> {sorting ? 'Sorting...' : 'Start Bubble Sort'}
          </button>
          <button 
            disabled={sorting}
            onClick={resetArray}
            className="p-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all text-slate-500 dark:text-zinc-400 disabled:opacity-50 cursor-pointer"
            title="Randomize Array"
          >
            <RefreshCw size={12} />
          </button>
        </div>

        <div className="flex gap-4 text-[9px] font-mono text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-500 block" /> Compare Registers</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500 block" /> Sorted Range</span>
        </div>
      </div>
    </div>
  );
};


// 3. Frontend Sandbox: CSS Variable Tuning Studio
const FrontendSandbox: React.FC<{ theme: string }> = () => {
  const [radius, setRadius] = useState<number>(12);
  const [blur, setBlur] = useState<number>(10);
  const [hue, setHue] = useState<number>(270); // Violet starting hue
  const [scale, setScale] = useState<number>(1.0);

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        Interaction relies on micro-tuning visual variables. Move sliders to alter the card object attributes dynamically and inspect the compiled CSS results below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Tuning controls */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Border Radius</span>
              <span>{radius}px</span>
            </div>
            <input 
              type="range" min="0" max="32" value={radius} 
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full accent-primary bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Shadow Blur Intensity</span>
              <span>{blur}px</span>
            </div>
            <input 
              type="range" min="0" max="30" value={blur} 
              onChange={(e) => setBlur(parseInt(e.target.value))}
              className="w-full accent-primary bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Glow Hue Spectrum</span>
              <span>{hue}° Degree</span>
            </div>
            <input 
              type="range" min="0" max="360" value={hue} 
              onChange={(e) => setHue(parseInt(e.target.value))}
              className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: `hsl(${hue}, 80%, 60%)` }}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Interactive Scale Factor</span>
              <span>x{scale.toFixed(2)}</span>
            </div>
            <input 
              type="range" min="0.8" max="1.2" step="0.05" value={scale} 
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full accent-primary bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Visual Result & Code block */}
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-32 h-32 flex items-center justify-center border text-center p-4 transition-all duration-300 select-none bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            style={{
              borderRadius: `${radius}px`,
              boxShadow: `0 0 ${blur}px hsl(${hue}, 70%, 55%, 0.5)`,
              transform: `scale(${scale})`,
              color: `hsl(${hue}, 70%, 55%)`
            }}
          >
            <div className="text-xs font-bold uppercase tracking-wider">Object Matrix</div>
          </div>

          {/* Compiled code snippet block */}
          <div className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 text-[9px] font-mono text-slate-500 dark:text-zinc-400 select-all leading-snug">
            <div>.tuned-object &#123;</div>
            <div className="pl-4">border-radius: <span className="text-violet-500">{radius}px</span>;</div>
            <div className="pl-4">box-shadow: 0 0 <span className="text-violet-500">{blur}px</span> hsl(<span className="text-violet-500">{hue}</span>, 70%, 55%, 0.5);</div>
            <div className="pl-4">transform: scale(<span className="text-violet-500">{scale}</span>);</div>
            <div>&#125;</div>
          </div>
        </div>

      </div>
    </div>
  );
};


// 4. Backend Sandbox: Load Balancer & Servers
interface ServerInstance {
  id: number;
  name: string;
  load: number;
  requests: number;
}

const BackendSandbox: React.FC<{ theme: string }> = () => {
  const [servers, setServers] = useState<ServerInstance[]>([
    { id: 1, name: 'Core Server Alpha', load: 12, requests: 0 },
    { id: 2, name: 'Core Server Beta', load: 8, requests: 0 },
    { id: 3, name: 'Core Server Gamma', load: 5, requests: 0 }
  ]);
  const [logs, setLogs] = useState<string[]>(['Systems active. Load balancer routing online.']);
  const [robinIndex, setRobinIndex] = useState(0);

  const simulateRequest = () => {
    // Select server via round robin
    const idx = robinIndex;
    setRobinIndex((robinIndex + 1) % servers.length);

    // Increment request and CPU loads
    setServers((prev) => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        requests: updated[idx].requests + 1,
        load: Math.min(updated[idx].load + Math.floor(Math.random() * 20) + 10, 100)
      };
      return updated;
    });

    const routeName = servers[idx].name;
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [
      `[${timestamp}] ROUTED request to [${routeName}] • Status: 200 OK • Node load optimized.`,
      ...prev.slice(0, 4)
    ]);

    // CPU Decay simulated over time
    setTimeout(() => {
      setServers((prev) => {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          load: Math.max(updated[idx].load - Math.floor(Math.random() * 15) - 5, 5)
        };
        return updated;
      });
    }, 1500);
  };

  const resetServers = () => {
    setServers([
      { id: 1, name: 'Core Server Alpha', load: 12, requests: 0 },
      { id: 2, name: 'Core Server Beta', load: 8, requests: 0 },
      { id: 3, name: 'Core Server Gamma', load: 5, requests: 0 }
    ]);
    setLogs(['State cleared. Re-initializing clusters.']);
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        Load balancers distribute traffic dynamically to prevent bottleneck nodes. Click "Send Request" to pipe workload queries through the routing algorithm.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Servers status columns */}
        <div className="md:col-span-8 space-y-3">
          {servers.map((srv) => (
            <div key={srv.id} className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Database size={14} className="text-emerald-500" />
                <div>
                  <span className="block text-xs font-bold text-slate-700 dark:text-zinc-300">{srv.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Requests Processed: {srv.requests}</span>
                </div>
              </div>

              {/* Progress CPU Bar */}
              <div className="flex items-center gap-2 flex-grow sm:max-w-[180px]">
                <span className="text-[10px] font-mono text-slate-400 w-12 text-right">CPU: {srv.load}%</span>
                <div className="flex-grow bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      srv.load > 75 
                        ? 'bg-rose-500' 
                        : srv.load > 45 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${srv.load}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load balancer controls and terminal log output */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex gap-2">
            <button 
              onClick={simulateRequest}
              className="flex-grow px-4 py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Send size={12} /> Send Request
            </button>
            <button 
              onClick={resetServers}
              className="p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 text-slate-500 cursor-pointer"
              title="Reset Server Nodes"
            >
              <RefreshCw size={12} />
            </button>
          </div>

          {/* Logs Terminal view */}
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 font-mono text-[9px] text-zinc-400 space-y-1 h-28 overflow-hidden">
            <div className="text-[8px] text-zinc-500 border-b border-zinc-900 pb-1 uppercase tracking-wider">Gateway Telemetry Logs</div>
            <div className="space-y-1 pt-1 h-full overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed line-clamp-1">{log}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


// 5. AI Sandbox: Intent Prompt Categorizer
const AiSandbox: React.FC<{ theme: string }> = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [intent, setIntent] = useState<string>('N/A');
  const [tokens, setTokens] = useState<number>(0);
  const [agentResponse, setAgentResponse] = useState<string>('');
  const [isClassifying, setIsClassifying] = useState(false);

  const samplePrompts = [
    { text: "Draft an elegant technical email explaining system outages.", category: "Generative", reply: "Hello Team, we observed a brief replica mismatch due to connection locks. Consensus recovered inside 420ms." },
    { text: "Find all instances of asynchronous race conditions in this tree.", category: "Analysis", reply: "Review complete: Identified nested event loop trigger in /src/pages/Home at line 14. Fix standard mutex locks." },
    { text: "Explain backpropagation in simple terms without math symbols.", category: "Educational", reply: "Backpropagation is a backward error checklist: adjusting weights backwards so outputs better match real targets." }
  ];

  const handleClassify = (prompt: { text: string; category: string; reply: string }) => {
    setIsClassifying(true);
    setSelectedPrompt(prompt.text);
    
    setTimeout(() => {
      setIntent(prompt.category);
      setTokens(Math.floor(Math.random() * 80) + 40);
      setAgentResponse(prompt.reply);
      setIsClassifying(false);
    }, 750);
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        AI functions require categorizing semantic intent before computing responses. Click one of the input triggers below to simulate semantic inference execution.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input selectors */}
        <div className="space-y-3">
          <span className="block text-[10px] font-mono text-slate-400 uppercase">Select Prompt Template</span>
          <div className="space-y-2">
            {samplePrompts.map((p, i) => (
              <button 
                key={i}
                onClick={() => handleClassify(p)}
                className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                  selectedPrompt === p.text 
                    ? 'bg-primary/5 dark:bg-primary/10 border-primary text-primary font-medium' 
                    : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/50 dark:border-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-slate-600 dark:text-zinc-400'
                }`}
              >
                "{p.text}"
              </button>
            ))}
          </div>
        </div>

        {/* AI response details */}
        <div className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <span className="block text-[10px] font-mono text-slate-400 uppercase">Model Output Logs</span>
            
            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/20">
                <span className="block text-[8px] text-slate-400 uppercase">Inferred Intent</span>
                <span className={`text-xs font-bold ${isClassifying ? 'animate-pulse text-slate-400' : 'text-primary'}`}>{intent}</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/20">
                <span className="block text-[8px] text-slate-400 uppercase">Tokens Synthesized</span>
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">{tokens} tokens</span>
              </div>
            </div>

            {/* Agent stream mockup */}
            <div className="p-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/30 min-h-[70px] text-xs">
              {isClassifying ? (
                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] pt-4 justify-center">
                  <RefreshCw size={11} className="animate-spin" /> Classifying semantic logic...
                </div>
              ) : selectedPrompt ? (
                <p className="text-slate-600 dark:text-zinc-400 leading-relaxed italic">
                  "{agentResponse}"
                </p>
              ) : (
                <p className="text-slate-400 dark:text-zinc-500 text-center pt-4 italic">
                  Waiting for prompt execution...
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


// 6. ML Sandbox: Hyperparameter Loss Curve Graph Training
const MlSandbox: React.FC<{ theme: string }> = () => {
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [training, setTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState<number>(0.92);
  const [accuracy, setAccuracy] = useState<number>(0.15);

  const startTrainingSimulation = () => {
    if (training) return;
    setTraining(true);
    setEpoch(0);
    setLoss(0.92);
    setAccuracy(15);

    let currentLoss = 0.92;
    let currentAcc = 15;
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      setEpoch(step);
      
      // Decay loss based on learning rate
      const decay = learningRate * (0.15 + Math.random() * 0.1);
      currentLoss = Math.max(currentLoss - decay, 0.08 + (Math.random() * 0.03));
      currentAcc = Math.min(currentAcc + (learningRate * (10 + Math.random() * 5)), 98);

      setLoss(parseFloat(currentLoss.toFixed(3)));
      setAccuracy(Math.floor(currentAcc));

      if (step >= 10) {
        clearInterval(interval);
        setTraining(false);
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        Machine Learning models optimize metrics through backpropagation updates. Adjust the Learning Rate parameter below to see how model convergence is affected during active training.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Controls and sliders */}
        <div className="md:col-span-4 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Learning Rate (α)</span>
              <span>{learningRate}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setLearningRate(prev => Math.max(parseFloat((prev - 0.05).toFixed(2)), 0.05))}
                disabled={training}
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 disabled:opacity-50 cursor-pointer text-slate-500"
              >
                <Minus size={12} />
              </button>
              <button 
                onClick={() => setLearningRate(prev => Math.min(parseFloat((prev + 0.05).toFixed(2)), 0.3))}
                disabled={training}
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 disabled:opacity-50 cursor-pointer text-slate-500"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          <button 
            onClick={startTrainingSimulation}
            disabled={training}
            className="w-full px-4 py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 shadow-md flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Play size={12} /> {training ? 'Training Network...' : 'Execute Backpropagation'}
          </button>
        </div>

        {/* Real-time Loss/Accuracy results displays */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          <div className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-center space-y-1">
            <span className="block text-[9px] text-slate-400 uppercase">Training Epoch</span>
            <span className="text-xl font-bold text-slate-700 dark:text-zinc-200">{epoch} / 10</span>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-center space-y-1">
            <span className="block text-[9px] text-slate-400 uppercase">Cost Loss Error</span>
            <span className={`text-xl font-bold ${training ? 'text-amber-500 animate-pulse' : 'text-rose-500'}`}>{loss}</span>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-center space-y-1">
            <span className="block text-[9px] text-slate-400 uppercase">Validation Accuracy</span>
            <span className="text-xl font-bold text-emerald-500">{accuracy}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};


// 7. Projects Sandbox: Bento Kanban task board organizer
interface TaskItem {
  id: number;
  text: string;
  status: 'backlog' | 'progress' | 'shipped';
}

const ProjectsSandbox: React.FC<{ theme: string }> = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 1, text: 'Design distributed database mapping layouts', status: 'shipped' },
    { id: 2, text: 'Optimize vector search embedding cache times', status: 'progress' },
    { id: 3, text: 'Review performance lock race in auth gates', status: 'backlog' }
  ]);

  const moveTask = (id: number, nextStatus: 'backlog' | 'progress' | 'shipped') => {
    setTasks((prev) => 
      prev.map(t => t.id === id ? { ...t, status: nextStatus } : t)
    );
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        Product shipping requires strict modular organization. Click on task objects below to transition them through standard backlog pipelines.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Backlog column */}
        <div className="p-3.5 rounded-xl bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200/30 dark:border-zinc-800/40 space-y-2.5">
          <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Backlog Logs</span>
          <div className="space-y-2">
            {tasks.filter(t => t.status === 'backlog').map(t => (
              <div key={t.id} className="p-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 text-xs shadow-sm flex flex-col gap-2">
                <span className="text-slate-600 dark:text-zinc-400">{t.text}</span>
                <button 
                  onClick={() => moveTask(t.id, 'progress')}
                  className="self-end text-[9px] font-bold text-primary flex items-center gap-0.5 cursor-pointer"
                >
                  Push to Active <ArrowRight size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress column */}
        <div className="p-3.5 rounded-xl bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200/30 dark:border-zinc-800/40 space-y-2.5">
          <span className="block text-[10px] font-mono text-amber-500 uppercase font-bold tracking-wider">In Progress</span>
          <div className="space-y-2">
            {tasks.filter(t => t.status === 'progress').map(t => (
              <div key={t.id} className="p-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-violet-800/30 text-xs shadow-sm flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1 h-full bg-amber-500 animate-pulse" />
                <span className="text-slate-600 dark:text-zinc-400">{t.text}</span>
                <div className="flex justify-between items-center pt-1 mt-1 border-t border-zinc-100/30">
                  <button 
                    onClick={() => moveTask(t.id, 'backlog')}
                    className="text-[8px] text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Demote
                  </button>
                  <button 
                    onClick={() => moveTask(t.id, 'shipped')}
                    className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5 cursor-pointer"
                  >
                    Ship Feature <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipped column */}
        <div className="p-3.5 rounded-xl bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200/30 dark:border-zinc-800/40 space-y-2.5">
          <span className="block text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-wider">Shipped logs</span>
          <div className="space-y-2">
            {tasks.filter(t => t.status === 'shipped').map(t => (
              <div key={t.id} className="p-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 text-xs shadow-sm flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500" />
                <span className="text-slate-500 dark:text-zinc-500 line-through italic">{t.text}</span>
                <button 
                  onClick={() => moveTask(t.id, 'progress')}
                  className="self-start text-[8px] text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Recall to progress
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};


// 8. Open Source Sandbox: Peer Code Review pull request simulator
const OpenSourceSandbox: React.FC<{ theme: string }> = () => {
  const [prApproved, setPrApproved] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [feedback, setFeedback] = useState('Inspect code instructions below to audit for race errors.');

  const approvePr = () => {
    setPrApproved(true);
    setHasError(false);
    setFeedback('Review accepted: Merged index master branches! PR compilation finalized.');
  };

  const rejectPr = () => {
    setHasError(true);
    setPrApproved(false);
    setFeedback('Review rejected: Mutex lock mismatch detected. Please add static thread security.');
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        Peer reviews require searching for code bugs and off-by-one index calculations. Read the mock pull request below and perform the review audit.
      </p>

      {/* Mock PR Diff view */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden text-xs">
        <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-mono text-[10px] flex justify-between text-slate-400">
          <span>PR #421: Feature/Thread-Safety-Lock</span>
          <span className="text-emerald-500 font-bold">Open</span>
        </div>
        
        <div className="p-3 bg-zinc-950 font-mono text-[10px] text-zinc-400 space-y-1">
          <div className="text-zinc-500">// Thread logic verification function</div>
          <div className="text-zinc-300">export function acquireLock(mutexId: string) &#125;</div>
          <div className="text-rose-500/80 bg-rose-500/5 px-1">-  let active = isThreadOccupied(mutexId); // No lock mechanism</div>
          <div className="text-emerald-500/80 bg-emerald-500/5 px-1">+  let active = lockMutexMutexSemaphoreAtomic(mutexId); // Atomic Lock</div>
          <div className="text-zinc-300">   return active;</div>
          <div className="text-zinc-300">&#125;</div>
        </div>
      </div>

      {/* Review outcomes triggers */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2">
          <button 
            onClick={approvePr}
            className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 size={12} /> Approve & Merge
          </button>
          <button 
            onClick={rejectPr}
            className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-xl hover:bg-rose-600 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldAlert size={12} /> Request Changes
          </button>
        </div>

        <div className="flex-grow max-w-[280px]">
          <span className={`block text-[10px] font-mono leading-relaxed p-2.5 rounded-lg border text-center ${
            prApproved 
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-500 font-bold' 
              : hasError 
                ? 'bg-rose-500/10 border-rose-500/25 text-rose-500 font-bold' 
                : 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/50 text-slate-500 dark:text-zinc-400'
          }`}>
            {feedback}
          </span>
        </div>
      </div>
    </div>
  );
};


// 9. Startup Sandbox: SaaS Runway capital HUD calculator
const StartupSandbox: React.FC<{ theme: string }> = () => {
  const [revenue, setRevenue] = useState<number>(12000); // $12k MRR
  const [spend, setSpend] = useState<number>(8000); // $8k expenses
  const [treasury, setTreasury] = useState<number>(150000); // $150k starting cash

  const profit = revenue - spend;
  const runwayMonths = profit >= 0 ? 'Infinite' : (treasury / Math.abs(profit)).toFixed(1);

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
        Startups rely on preserving Runway. Slide monthly expenditures to optimize business sustainability models.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Runway sliders */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Monthly SaaS MRR Revenue</span>
              <span className="text-emerald-500">${revenue.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="2000" max="30000" step="1000" value={revenue} 
              onChange={(e) => setRevenue(parseInt(e.target.value))}
              className="w-full accent-primary bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Monthly Spend & Salaries</span>
              <span className="text-rose-500">${spend.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="3000" max="25000" step="1000" value={spend} 
              onChange={(e) => setSpend(parseInt(e.target.value))}
              className="w-full accent-primary bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Treasury Cash Reserves</span>
              <span className="text-violet-500">${treasury.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="50000" max="500000" step="10000" value={treasury} 
              onChange={(e) => setTreasury(parseInt(e.target.value))}
              className="w-full accent-primary bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Dashboard Runway HUD stats output */}
        <div className="p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 grid grid-cols-2 gap-4 text-center font-mono">
          <div className="p-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/20 col-span-2">
            <span className="block text-[8px] text-slate-400 uppercase">Runway Lifetime</span>
            <span className={`text-2xl font-black ${profit >= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {runwayMonths} {profit >= 0 ? '' : 'Months'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/20">
            <span className="block text-[8px] text-slate-400 uppercase">Monthly Cash Flow</span>
            <span className={`text-sm font-black ${profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {profit >= 0 ? '+' : ''}${profit.toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/20">
            <span className="block text-[8px] text-slate-400 uppercase">Burn Status</span>
            <span className={`text-sm font-black ${profit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {profit >= 0 ? 'Profitable' : 'Active Burn'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
