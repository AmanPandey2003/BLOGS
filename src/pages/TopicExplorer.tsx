import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sigma, Cpu, Code2, Layers, Zap, Activity, Sliders, Database,
  Globe, GitBranch, BrainCircuit, ChevronDown, CheckCircle2, Play,
  RefreshCw, Info, Sparkles, Send, HelpCircle, Trophy, BookOpen, Clock
} from 'lucide-react';

interface Subtopic {
  name: string;
  description: string;
  checked: boolean;
}

interface CategoryData {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  tagline: string;
  summary: string;
  subtopics: Subtopic[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

export const TopicExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('math');
  const [explorerMode, setExplorerMode] = useState<'curriculum' | 'playground' | 'quiz'>('curriculum');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<{ [key: string]: boolean }>({});
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});

  // Categories definition
  const categories: CategoryData[] = useMemo(() => [
    {
      id: 'math',
      name: 'Mathematics',
      icon: Sigma,
      color: 'from-violet-500 to-indigo-600',
      gradient: 'rgba(139, 92, 246, 0.15)',
      tagline: 'Foundational logical structures & mathematical logic',
      summary: 'The bedrock of computational systems. Linear algebra, calculus, and discrete theory shape algorithms, optimization pipelines, and machine learning neural models.',
      subtopics: [
        { name: 'Linear Algebra', description: 'Vectors, matrices, eigenvectors, and singular value decomposition.', checked: false },
        { name: 'Discrete Math', description: 'Logic gates, truth tables, set theory, and combinatorics.', checked: false },
        { name: 'Calculus', description: 'Limits, partial derivatives, and multi-variable optimization gradients.', checked: false },
        { name: 'Probability & Stats', description: 'Bayes theorem, random variables, regression, and Markov processes.', checked: false }
      ],
      quiz: [
        {
          question: 'What mathematical construct is crucial for computing gradient descent direction in multi-layer networks?',
          options: ['Matrix Inversion', 'Partial Derivatives / Jacobian', 'Set Intersection', 'Euclidean Norm'],
          answerIndex: 1,
          explanation: 'Partial derivatives (gradients) describe the rate of change of the loss function with respect to each model parameter, showing the steepest descent vector.'
        }
      ]
    },
    {
      id: 'dsa',
      name: 'DSA',
      icon: Cpu,
      color: 'from-blue-500 to-indigo-600',
      gradient: 'rgba(59, 130, 246, 0.15)',
      tagline: 'Asymptotic complexity & structural efficiency',
      summary: 'Orchestrating hardware memory. Choosing correct data structures and optimal traversal strategies guarantees low runtime complexity and predictable footprint under scale.',
      subtopics: [
        { name: 'Linear Structures', description: 'Arrays, linked lists, doubly linked lists, stacks, and queues.', checked: false },
        { name: 'Graph Theory & Trees', description: 'Heaps, Binary Search Trees, DFS/BFS traversals, Dijkstra, and A*.', checked: false },
        { name: 'Searching & Sorting', description: 'Quick Sort, Merge Sort, Binary Search, and hash structures.', checked: false },
        { name: 'Dynamic Programming', description: 'Memoization, tabulating subproblems, and greedy choices.', checked: false }
      ],
      quiz: [
        {
          question: 'What is the average time complexity of searching a hash map with a highly efficient hashing algorithm?',
          options: ['O(log N)', 'O(N)', 'O(1)', 'O(N log N)'],
          answerIndex: 2,
          explanation: 'A balanced hash map resolves keys in constant time O(1) on average, though worst-case collision resolution can fall back to O(N).'
        }
      ]
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: Code2,
      color: 'from-amber-500 to-yellow-500',
      gradient: 'rgba(245, 158, 11, 0.15)',
      tagline: 'Asynchronous event engines & core runtime semantics',
      summary: 'The runtime language of the web. Explore prototype-based chains, event loop queues, microtasks, execution frames, closures, and modern ES modules.',
      subtopics: [
        { name: 'Execution Stack & Context', description: 'Call Stack, memory heap allocations, and garbage collection scope.', checked: false },
        { name: 'Prototypes & Closures', description: 'Lexical scopes, prototypical inheritances, and memory retention.', checked: false },
        { name: 'Asynchronous Event Loop', description: 'Promises, microtask queues, macrotasks, and web workers.', checked: false },
        { name: 'Modern ES6+ Engines', description: 'Proxy objects, Reflect API, generator functions, and symbols.', checked: false }
      ],
      quiz: [
        {
          question: 'Where do resolved Promise callbacks (e.g., .then()) execute in the JavaScript event loop?',
          options: ['Macrotask Queue', 'Microtask Queue', 'Directly in the Call Stack synchronous frame', 'Web API thread'],
          answerIndex: 1,
          explanation: 'Resolved promise callbacks are queued as microtasks, which take strict priority and exhaust fully before any macrotasks (like setTimeout) are handled.'
        }
      ]
    },
    {
      id: 'react',
      name: 'React',
      icon: Layers,
      color: 'from-cyan-500 to-blue-600',
      gradient: 'rgba(6, 182, 212, 0.15)',
      tagline: 'Declarative component logic & Fiber render systems',
      summary: 'Building state-driven visual architectures. Virtual DOM reconciliation, Fiber diff schedules, concurrent states, custom hooks, and server component rendering engines.',
      subtopics: [
        { name: 'Fiber Reconciliation', description: 'The fiber tree, incremental schedules, and DOM updates diff.', checked: false },
        { name: 'Hooks Lifecycle', description: 'useState, useEffect dependency trees, useMemo, and custom states.', checked: false },
        { name: 'State Management Flow', description: 'Context API, dispatchers, atomic states (Zustand), and actions.', checked: false },
        { name: 'React Server Components', description: 'Server-side data pipelines, partial hydrations, and server actions.', checked: false }
      ],
      quiz: [
        {
          question: 'What is the primary feature of React 18 Concurrent Rendering?',
          options: ['Direct rendering bypasses the Virtual DOM', 'Interruptible rendering to keep main thread responsive', 'Multi-threaded background Web Worker rendering', 'Immediate compilation to native machine code'],
          answerIndex: 1,
          explanation: 'Concurrent mode allows React to pause, resume, or abort an ongoing render cycle to process high-priority user actions instantly.'
        }
      ]
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: Zap,
      color: 'from-slate-800 to-slate-900',
      gradient: 'rgba(30, 41, 59, 0.15)',
      tagline: 'Server-optimized page frameworks & hybrid routes',
      summary: 'Production React architectures. Unifying layouts with routing, server side queries (SSR, static rendering), incremental revalidations, and static generation builds.',
      subtopics: [
        { name: 'Routing Paradigm', description: 'App Router layout schedules, slots, parallel routes, and templates.', checked: false },
        { name: 'Rendering Pipelines', description: 'Static Site Generation (SSG), SSR, and Incremental Site Revalidation (ISR).', checked: false },
        { name: 'Server Actions & Hydration', description: 'Direct server queries from React client interfaces.', checked: false },
        { name: 'Caching Infrastructure', description: 'Fetch request cache, path revalidations, and edge middleware.', checked: false }
      ],
      quiz: [
        {
          question: 'Which rendering strategy updates a static page in the background after it has been built and deployed?',
          options: ['Server-Side Rendering (SSR)', 'Incremental Static Regeneration (ISR)', 'Client-Side Hydration', 'Dynamic Route Matching'],
          answerIndex: 1,
          explanation: 'ISR allows developers to rebuild individual static pages in the background as requests come in, without rebuilding the whole application.'
        }
      ]
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: Activity,
      color: 'from-emerald-500 to-green-600',
      gradient: 'rgba(16, 185, 129, 0.15)',
      tagline: 'Non-blocking I/O event loops & backend architectures',
      summary: 'Running JavaScript on system OS. Scalable backend development powered by libuv event queues, data buffer streams, worker thread pools, and file streams.',
      subtopics: [
        { name: 'Event Loop & libuv', description: 'Network I/O polls, timers, pending callbacks, and OS threading.', checked: false },
        { name: 'Streams & Buffers', description: 'Readable, Writable, Duplex streams, backpressure, and binary buffers.', checked: false },
        { name: 'Multi-threading Modules', description: 'Worker Threads, cluster structures, and child process models.', checked: false },
        { name: 'Framework Interfaces', description: 'Middlewares, request routing, security, and socket APIs.', checked: false }
      ],
      quiz: [
        {
          question: 'What Node.js core library abstracts non-blocking I/O operations and provides the file/network thread pool?',
          options: ['V8 Engine', 'libuv', 'npm', 'Express'],
          answerIndex: 1,
          explanation: 'libuv is a multi-platform support library with a focus on asynchronous I/O. It provides Node.js with its event loop, thread pool, and asynchronous file operations.'
        }
      ]
    },
    {
      id: 'os',
      name: 'Operating Systems',
      icon: Sliders,
      color: 'from-orange-500 to-red-600',
      gradient: 'rgba(249, 115, 22, 0.15)',
      tagline: 'Kernel schedules, memory models, & hardware access',
      summary: 'The translator between logic and hardware. Dive into thread execution schedulers, page faults, virtual memory tables, semaphores, and process states.',
      subtopics: [
        { name: 'Process & Thread Schedules', description: 'Context switching, FIFO/Round-Robin, and inter-process communication.', checked: false },
        { name: 'Virtual Memory & Paging', description: 'Page translation tables, page faults, and swap space allocations.', checked: false },
        { name: 'Concurrency Lockouts', description: 'Deadlocks, banker algorithm, mutex registers, and semaphores.', checked: false },
        { name: 'System Core I/O', description: 'Interrupt schedules, disk tracks, system calls, and inodes.', checked: false }
      ],
      quiz: [
        {
          question: 'What occurs during a process context switch in a kernel-scheduled operating system?',
          options: ['The CPU resets its internal register registers completely', 'Saving the active CPU state/registers and restoring a waiting process state', 'Immediate translation of files into memory pages', 'Total clearance of physical RAM tables'],
          answerIndex: 1,
          explanation: 'A context switch is the process of storing the state (context) of a CPU register structure so that it can be restored and execution resumed later.'
        }
      ]
    },
    {
      id: 'dbms',
      name: 'DBMS',
      icon: Database,
      color: 'from-teal-500 to-cyan-600',
      gradient: 'rgba(20, 184, 166, 0.15)',
      tagline: 'Structured indexing databases & transactional safety',
      summary: 'The persistent ledger. Structuring schemas with SQL joins, enforcing ACID transactions, querying B-Trees, exploring NoSQL structures, and sharding clusters.',
      subtopics: [
        { name: 'Relational ACID Engine', description: 'Isolation anomalies, write-ahead logs, normal forms, and joins.', checked: false },
        { name: 'Indexing Layouts', description: 'B-Trees, LSM-Trees, hash indices, and compound search lookups.', checked: false },
        { name: 'NoSQL Schemas', description: 'Document stores, Wide-Column families, key-value stores, and graphs.', checked: false },
        { name: 'Distributed Persistence', description: 'Replications, sharding configurations, consensus, and CAP balances.', checked: false }
      ],
      quiz: [
        {
          question: 'Which index structure is optimized for high-write workloads by appending sequential logs instead of in-place tree updates?',
          options: ['B+ Tree Index', 'LSM-Tree (Log-Structured Merge-Tree)', 'Hash Map Index', 'Binary Search Tree'],
          answerIndex: 1,
          explanation: 'LSM-Trees buffer writes in memory and append them sequentially to disk logs, making them extremely fast for write-heavy databases, whereas B+ Trees require random in-place updates.'
        }
      ]
    },
    {
      id: 'networks',
      name: 'Computer Networks',
      icon: Globe,
      color: 'from-sky-500 to-blue-600',
      gradient: 'rgba(14, 165, 233, 0.15)',
      tagline: 'Routing packet streams & low latency interfaces',
      summary: 'The conduits of digital information. Understanding how packets encapsulate, route via DNS tables, complete TCP handshakes, secure via TLS, and stream via WebSockets.',
      subtopics: [
        { name: 'OSI Protocol Layering', description: 'Physical through Application layers, frame headers, and pipelines.', checked: false },
        { name: 'Transmission Protocols', description: 'TCP sliding windows, UDP packet pipelines, and congestion checks.', checked: false },
        { name: 'Addressing & Subnets', description: 'IPv4/v6 subnet math, DNS propagation, and border routing.', checked: false },
        { name: 'Modern APIs Protocols', description: 'HTTP/3 over QUIC, gRPC protocols, and client WebSockets.', checked: false }
      ],
      quiz: [
        {
          question: 'What protocol does HTTP/3 utilize as its underlying transport engine to resolve the Head-of-Line blocking issues of TCP?',
          options: ['TLS 1.3', 'QUIC (over UDP)', 'gRPC Stream', 'SCTP Router'],
          answerIndex: 1,
          explanation: 'HTTP/3 uses QUIC, built on top of UDP, which implements multiplexing streams natively so a packet loss in one stream does not block other streams.'
        }
      ]
    },
    {
      id: 'sysdesign',
      name: 'System Design',
      icon: GitBranch,
      color: 'from-fuchsia-500 to-pink-600',
      gradient: 'rgba(217, 70, 239, 0.15)',
      tagline: 'Distributed architectures & high availability networks',
      summary: 'Scaling code to serve millions. Handling stateless services, reverse proxies, content delivery networks (CDNs), Redis key-value caches, and distributed messaging pipelines.',
      subtopics: [
        { name: 'Scaling & Load Balancers', description: 'Nginx proxies, round robin routing, health checks, and active gateways.', checked: false },
        { name: 'Caching Systems', description: 'Redis memory grids, CDN layouts, and eviction schedules.', checked: false },
        { name: 'Database Scalability', description: 'Master-slave replications, consistent hash rings, and partitions.', checked: false },
        { name: 'Messaging Pipelines', description: 'Kafka topic streams, RabbitMQ pub/sub, and fanout schemas.', checked: false }
      ],
      quiz: [
        {
          question: 'In system design, what does the CAP Theorem state a distributed data store can prioritize if a network partition (P) occurs?',
          options: ['Both Consistency and Availability', 'Either Consistency (C) OR Availability (A)', 'Only Caching Speed', 'Only Relational Schema Joins'],
          answerIndex: 1,
          explanation: 'According to the CAP Theorem, in the event of a network partition (P), a distributed system must choose between Consistency (C) or Availability (A).'
        }
      ]
    },
    {
      id: 'ai',
      name: 'AI',
      icon: BrainCircuit,
      color: 'from-pink-500 to-rose-600',
      gradient: 'rgba(236, 72, 153, 0.15)',
      tagline: 'Generative transformer systems & agent orchestration',
      summary: 'Automating intelligent decisions. Dive into supervised math modeling, Transformer multi-headed attention grids, vector databases, and LLM agent chains.',
      subtopics: [
        { name: 'Machine Learning Models', description: 'Cost evaluations, stochastic gradient descents, and neural nodes.', checked: false },
        { name: 'Transformer Mechanisms', description: 'Self-attention matrices, positional encodings, and tokenizers.', checked: false },
        { name: 'Generative LLM Pipelines', description: 'RAG retrieval engines, prompt schedules, and context limits.', checked: false },
        { name: 'Agentic Workflows', description: 'Function bindings, multi-agent frameworks, and reasoning loops.', checked: false }
      ],
      quiz: [
        {
          question: 'What neural mechanism allows Transformers to process relationships between words in a sentence regardless of their distance?',
          options: ['Stochastic Pooling', 'Self-Attention', 'Convolution Filter', 'Recurrent Backpropagation'],
          answerIndex: 1,
          explanation: 'The Self-Attention mechanism allows a transformer to weigh the relevance of other words in a sequence to any given word, processing context globally.'
        }
      ]
    }
  ], []);

  // Sync checklist progress with localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('stringtotech_explorer_progress');
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggleCheck = (subtopicId: string) => {
    const updated = {
      ...progress,
      [subtopicId]: !progress[subtopicId]
    };
    setProgress(updated);
    localStorage.setItem('stringtotech_explorer_progress', JSON.stringify(updated));
  };

  // Live metrics calculations
  const totalSubtopicsCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.subtopics.length, 0);
  }, [categories]);

  const checkedSubtopicsCount = useMemo(() => {
    let count = 0;
    categories.forEach((cat) => {
      cat.subtopics.forEach((sub) => {
        if (progress[`${cat.id}-${sub.name}`]) count++;
      });
    });
    return count;
  }, [categories, progress]);

  const overallMasteryPercentage = useMemo(() => {
    if (totalSubtopicsCount === 0) return 0;
    return Math.round((checkedSubtopicsCount / totalSubtopicsCount) * 100);
  }, [totalSubtopicsCount, checkedSubtopicsCount]);

  const activeCategoryData = useMemo(() => {
    return categories.find(c => c.id === activeCategory) || categories[0];
  }, [categories, activeCategory]);

  const handleSelectAnswer = (catId: string, qIdx: number, oIdx: number) => {
    if (quizSubmitted[`${catId}-${qIdx}`]) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [`${catId}-${qIdx}`]: oIdx
    });
  };

  const handleSubmitQuiz = (catId: string, qIdx: number) => {
    setQuizSubmitted({
      ...quizSubmitted,
      [`${catId}-${qIdx}`]: true
    });
  };

  const handleResetQuiz = (catId: string, qIdx: number) => {
    const key = `${catId}-${qIdx}`;
    const newAnswers = { ...selectedAnswers };
    delete newAnswers[key];
    const newSubmitted = { ...quizSubmitted };
    delete newSubmitted[key];
    setSelectedAnswers(newAnswers);
    setQuizSubmitted(newSubmitted);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative select-text">
      
      {/* Background glow design */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/10 dark:bg-violet-600/15 rounded-full blur-[90px] -z-10 pointer-events-none" />

      {/* Header and Telemetry Dashboard */}
      <div className="space-y-6 mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-mono border border-violet-500/20 uppercase tracking-widest">
          <Sparkles size={12} className="animate-pulse" /> Core Architect Curriculum
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-custom">
              Interactive <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500">Topic Explorer</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-2xl font-light leading-relaxed">
              Accelerate through computer science paradigms and full-stack runtime systems. Explore, complete syllabi, customize styles, and evaluate metrics in real-time.
            </p>
          </div>

          {/* Core Mastery HUD panel */}
          <div className="p-5 rounded-2xl bg-white/40 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/40 shadow-sm backdrop-blur-md shrink-0 w-full md:w-80 space-y-3 text-left">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              <span className="flex items-center gap-1"><Trophy size={12} className="text-amber-500" /> Platform Mastery</span>
              <span>{overallMasteryPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden border border-zinc-200/20">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${overallMasteryPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>{checkedSubtopicsCount} of {totalSubtopicsCount} completed</span>
              <span>Active Indexing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Left column Sidebar selector & Right Details */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar categories index */}
        <div className="lg:col-span-4 space-y-3 max-h-[600px] overflow-y-auto pr-1">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-zinc-500 pl-2">
            Domains Index
          </div>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            
            // Calculate progress for this domain specifically
            const catCheckedCount = cat.subtopics.filter(sub => progress[`${cat.id}-${sub.name}`]).length;
            const catPercentage = Math.round((catCheckedCount / cat.subtopics.length) * 100);

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  // Preserve mode but clear temporary state if necessary
                }}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 group cursor-pointer ${
                  isActive 
                    ? 'bg-white dark:bg-zinc-950 border-zinc-250 dark:border-zinc-800 shadow-md scale-[1.02]' 
                    : 'bg-white/40 hover:bg-white dark:bg-zinc-900/35 dark:hover:bg-zinc-900/60 border-zinc-200/50 dark:border-zinc-900/50 hover:border-zinc-200 dark:hover:border-zinc-800/70'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${cat.color} text-white shadow-sm shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-sm font-bold text-slate-800 dark:text-zinc-100 group-hover:text-primary transition-colors">
                      {cat.name}
                    </span>
                    <span className="block text-[10px] text-slate-400 dark:text-zinc-500 font-light truncate">
                      {cat.tagline}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span className="font-mono text-xs font-bold text-slate-600 dark:text-zinc-300">
                    {catPercentage}%
                  </span>
                  <div className="h-1.5 w-10 bg-zinc-100 dark:bg-zinc-900 rounded-full mt-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                      style={{ width: `${catPercentage}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail workspace area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Workspace category hero header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800/90 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: activeCategoryData.gradient }} />
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-tr ${activeCategoryData.color} text-white`}>
                    {React.createElement(activeCategoryData.icon, { size: 16 })}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500">Domain Console</span>
                </div>
                <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 dark:text-white font-custom leading-tight">
                  {activeCategoryData.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
                  {activeCategoryData.summary}
                </p>
              </div>

              {/* Mode Controller Tabs */}
              <div className="flex sm:flex-col gap-2 shrink-0 sm:self-center self-start">
                {(['curriculum', 'playground', 'quiz'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setExplorerMode(m)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer border transition-all ${
                      explorerMode === m
                        ? `bg-gradient-to-tr ${activeCategoryData.color} text-white border-transparent shadow-sm`
                        : 'bg-zinc-100/50 hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 text-slate-600 dark:text-zinc-400 border-zinc-200/50 dark:border-zinc-800/40'
                    }`}
                  >
                    {m === 'curriculum' && 'Syllabus'}
                    {m === 'playground' && 'Sandbox'}
                    {m === 'quiz' && 'Assessment'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable panels content wrapper */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800/90 shadow-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${explorerMode}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                
                {/* 1. CURRICULUM SYLLABUS INTERACTIVE CHECKLIST */}
                {explorerMode === 'curriculum' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <BookOpen size={14} className="text-primary" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-zinc-300">
                        Interactive Syllabus Index
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 dark:text-zinc-500 font-light">
                      Audit your conceptual grasp across key architectural modules. Toggle checklist values to catalog your engineering progress.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeCategoryData.subtopics.map((sub) => {
                        const subtopicKey = `${activeCategoryData.id}-${sub.name}`;
                        const isChecked = !!progress[subtopicKey];

                        return (
                          <div 
                            key={sub.name}
                            onClick={() => handleToggleCheck(subtopicKey)}
                            className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer select-none ${
                              isChecked
                                ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/25 dark:border-emerald-500/15'
                                : 'bg-zinc-50/50 hover:bg-zinc-100 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50 border-zinc-100 dark:border-zinc-900'
                            }`}
                          >
                            <div className="pt-0.5 shrink-0">
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                isChecked 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'border-zinc-300 dark:border-zinc-700'
                              }`}>
                                {isChecked && <CheckCircle2 size={12} className="stroke-[3]" />}
                              </div>
                            </div>
                            <div className="space-y-0.5">
                              <span className={`block text-xs font-extrabold ${isChecked ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-zinc-200'}`}>
                                {sub.name}
                              </span>
                              <span className="block text-[10.5px] text-slate-400 dark:text-zinc-500 leading-relaxed font-light">
                                {sub.description}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. CORE SANDBOX CONCEPT PLAYGROUND */}
                {explorerMode === 'playground' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <Clock size={14} className="text-amber-500" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-zinc-300">
                        Interactive Concept Playground
                      </h4>
                    </div>

                    {/* Math Sandbox */}
                    {activeCategory === 'math' && <MathPlayground />}

                    {/* DSA Sandbox */}
                    {activeCategory === 'dsa' && <DsaPlayground />}

                    {/* JavaScript Sandbox */}
                    {activeCategory === 'javascript' && <JsPlayground />}

                    {/* React Sandbox */}
                    {activeCategory === 'react' && <ReactPlayground />}

                    {/* Next.js Sandbox */}
                    {activeCategory === 'nextjs' && <NextJsPlayground />}

                    {/* Node.js Sandbox */}
                    {activeCategory === 'nodejs' && <NodePlayground />}

                    {/* OS Sandbox */}
                    {activeCategory === 'os' && <OsPlayground />}

                    {/* DBMS Sandbox */}
                    {activeCategory === 'dbms' && <DbmsPlayground />}

                    {/* Networks Sandbox */}
                    {activeCategory === 'networks' && <NetworksPlayground />}

                    {/* System Design Sandbox */}
                    {activeCategory === 'sysdesign' && <SysDesignPlayground />}

                    {/* AI Sandbox */}
                    {activeCategory === 'ai' && <AiPlayground />}

                  </div>
                )}

                {/* 3. KNOWLEDGE CHECK ASSESSMENTS */}
                {explorerMode === 'quiz' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <HelpCircle size={14} className="text-primary" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-zinc-300">
                        Conceptual Assessment Check
                      </h4>
                    </div>

                    {activeCategoryData.quiz.map((q, qIdx) => {
                      const quizKey = `${activeCategoryData.id}-${qIdx}`;
                      const selectedOpt = selectedAnswers[quizKey];
                      const isSubmitted = !!quizSubmitted[quizKey];
                      const isCorrect = selectedOpt === q.answerIndex;

                      return (
                        <div key={qIdx} className="space-y-5 p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900">
                          <h5 className="text-sm font-bold text-slate-800 dark:text-zinc-200 leading-snug">
                            {q.question}
                          </h5>

                          <div className="space-y-3.5">
                            {q.options.map((opt, oIdx) => {
                              const isSelected = selectedOpt === oIdx;
                              let btnClass = 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-slate-700 dark:text-zinc-300';
                              
                              if (isSelected) {
                                btnClass = 'bg-primary/5 dark:bg-primary/10 border-primary text-primary font-bold';
                              }
                              
                              if (isSubmitted) {
                                if (oIdx === q.answerIndex) {
                                  btnClass = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                                } else if (isSelected) {
                                  btnClass = 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
                                } else {
                                  btnClass = 'opacity-50 bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900 text-slate-400';
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={isSubmitted}
                                  onClick={() => handleSelectAnswer(activeCategoryData.id, qIdx, oIdx)}
                                  className={`w-full p-4 rounded-xl border text-left text-xs leading-relaxed transition-all cursor-pointer flex justify-between items-center ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {isSubmitted && oIdx === q.answerIndex && <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between gap-4 pt-3 border-t border-zinc-100/60 dark:border-zinc-900/50">
                            {isSubmitted ? (
                              <button
                                onClick={() => handleResetQuiz(activeCategoryData.id, qIdx)}
                                className="px-3 py-2 border border-zinc-250 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                              >
                                Try Again
                              </button>
                            ) : (
                              <button
                                disabled={selectedOpt === undefined}
                                onClick={() => handleSubmitQuiz(activeCategoryData.id, qIdx)}
                                className="px-5 py-2.5 bg-primary disabled:opacity-50 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl hover:bg-primary/95 shadow-sm cursor-pointer"
                              >
                                Submit Answer
                              </button>
                            )}

                            {isSubmitted && (
                              <span className={`text-[11px] font-bold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                {isCorrect ? 'Correct Assessment' : 'Incorrect Assessment'}
                              </span>
                            )}
                          </div>

                          {isSubmitted && (
                            <div className="p-4 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/15 text-[11.5px] leading-relaxed text-slate-600 dark:text-zinc-400">
                              <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide block mb-1 text-[9px] font-mono flex items-center gap-1">
                                <Info size={11} /> Concept Explanation
                              </span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
};


// ==========================================
// COMPACT INTERACTIVE SANDBOX PLAYGROUNDS
// ==========================================

// 1. Math Playground: 2D Matrix Vector Transformer
const MathPlayground: React.FC = () => {
  const [scaleX, setScaleX] = useState<number>(1);
  const [scaleY, setScaleY] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);

  const points = [[10, 10], [50, 10], [50, 50], [10, 50]];

  const transformedPoints = useMemo(() => {
    const rad = (rotate * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    return points.map(([x, y]) => {
      // Center coordinates around (30, 30)
      const cx = x - 30;
      const cy = y - 30;

      // Scale
      const sx = cx * scaleX;
      const sy = cy * scaleY;

      // Rotate
      const rx = sx * cos - sy * sin;
      const ry = sx * sin + sy * cos;

      // Translate back
      return [rx + 75, ry + 75];
    });
  }, [scaleX, scaleY, rotate]);

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        Matrix transforms form the backbone of vector manipulation in computer graphics and machine learning weight tensors. Adjust variables to multiply coordinates dynamically.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 font-mono">
              <span>X-Axis Scale (Vector S_x)</span>
              <span>{scaleX.toFixed(1)}x</span>
            </div>
            <input 
              type="range" min="0.5" max="2" step="0.1" value={scaleX} 
              onChange={(e) => setScaleX(parseFloat(e.target.value))}
              className="w-full accent-violet-600 bg-zinc-100 dark:bg-zinc-900 h-1 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 font-mono">
              <span>Y-Axis Scale (Vector S_y)</span>
              <span>{scaleY.toFixed(1)}x</span>
            </div>
            <input 
              type="range" min="0.5" max="2" step="0.1" value={scaleY} 
              onChange={(e) => setScaleY(parseFloat(e.target.value))}
              className="w-full accent-violet-600 bg-zinc-100 dark:bg-zinc-900 h-1 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 font-mono">
              <span>Rotation Index (Angle θ)</span>
              <span>{rotate}°</span>
            </div>
            <input 
              type="range" min="0" max="360" value={rotate} 
              onChange={(e) => setRotate(parseInt(e.target.value))}
              className="w-full accent-violet-600 bg-zinc-100 dark:bg-zinc-900 h-1 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-40 h-40 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-2xl relative overflow-hidden flex items-center justify-center">
            {/* Draw Axes */}
            <div className="absolute inset-x-0 h-px bg-zinc-200 dark:bg-zinc-900 top-[80px]" />
            <div className="absolute inset-y-0 w-px bg-zinc-200 dark:bg-zinc-900 left-[80px]" />
            
            {/* Draw polygon */}
            <svg className="w-full h-full absolute top-0 left-0">
              <polygon
                points={transformedPoints.map(([x, y]) => `${x},${y}`).join(' ')}
                className="fill-violet-500/20 stroke-violet-500 stroke-[2] transition-all duration-100"
              />
            </svg>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Transform Coordinate Plotter</span>
        </div>
      </div>
    </div>
  );
};

// 2. DSA Playground: Visual Stack/Queue Buffer
const DsaPlayground: React.FC = () => {
  const [buffer, setBuffer] = useState<string[]>(['Stack_0', 'Stack_1']);
  const [structure, setStructure] = useState<'stack' | 'queue'>('stack');

  const handlePush = () => {
    if (buffer.length >= 6) return;
    setBuffer([...buffer, `Data_${Math.floor(Math.random() * 90) + 10}`]);
  };

  const handlePop = () => {
    if (buffer.length === 0) return;
    if (structure === 'stack') {
      setBuffer(buffer.slice(0, -1)); // LIFO
    } else {
      setBuffer(buffer.slice(1)); // FIFO
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        Simulate LIFO (Last-In-First-Out) stack operations versus FIFO (First-In-First-Out) queue schedulers. Observe memory registers insert and release.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-4 w-full sm:w-auto shrink-0">
          <div className="flex gap-2">
            <button 
              onClick={() => { setStructure('stack'); setBuffer(['Stack_0', 'Stack_1']); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer border ${
                structure === 'stack' ? 'bg-blue-600 text-white border-transparent' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-slate-500'
              }`}
            >
              LIFO Stack
            </button>
            <button 
              onClick={() => { setStructure('queue'); setBuffer(['Queue_0', 'Queue_1']); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer border ${
                structure === 'queue' ? 'bg-blue-600 text-white border-transparent' : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-slate-500'
              }`}
            >
              FIFO Queue
            </button>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handlePush}
              disabled={buffer.length >= 6}
              className="px-3.5 py-2 bg-blue-600 disabled:opacity-50 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Add Node
            </button>
            <button 
              onClick={handlePop}
              disabled={buffer.length === 0}
              className="px-3.5 py-2 border border-zinc-250 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer text-slate-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              Pop/Dequeue
            </button>
          </div>
        </div>

        {/* Visual Buffer Stream */}
        <div className="flex-grow w-full max-w-sm flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-2xl min-h-[140px]">
          <div className={`flex gap-2 transition-all duration-300 ${structure === 'stack' ? 'flex-col-reverse' : 'flex-row'}`}>
            <AnimatePresence>
              {buffer.map((val, i) => (
                <motion.div
                  key={val}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold font-mono border text-center shadow-sm w-20 ${
                    structure === 'stack'
                      ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                      : 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                  }`}
                >
                  {val}
                  <div className="text-[8px] opacity-60 font-light mt-0.5">[{i}]</div>
                </motion.div>
              ))}
            </AnimatePresence>
            {buffer.length === 0 && <span className="text-xs text-slate-400 font-light italic">Registers Empty</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. JavaScript Playground: Synchronous Callstack Event Loop Simulator
const JsPlayground: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(['Click "Run Code" to start thread scheduler simulation.']);
  const [activeQueue, setActiveQueue] = useState<'stack' | 'micro' | 'macro' | 'idle'>('idle');

  const handleRun = async () => {
    setLogs([]);
    setActiveQueue('stack');
    setLogs(p => [...p, '>> CALL STACK: [main()] initialized.']);
    await new Promise(r => setTimeout(r, 800));
    
    setLogs(p => [...p, '>> CALL STACK: scheduling setTimeout callback (macrotask)...']);
    await new Promise(r => setTimeout(r, 800));

    setLogs(p => [...p, '>> CALL STACK: scheduling Promise.resolve callback (microtask)...']);
    await new Promise(r => setTimeout(r, 800));

    setLogs(p => [...p, '>> CALL STACK: synchronous execution finished. main() popped off.']);
    setActiveQueue('micro');
    await new Promise(r => setTimeout(r, 1000));

    setLogs(p => [...p, '>> MICROTASK: executing Promise callback (Highest priority queue!).']);
    await new Promise(r => setTimeout(r, 1000));

    setActiveQueue('macro');
    setLogs(p => [...p, '>> MACROTASK: executing setTimeout callback (Queue parsed!).']);
    await new Promise(r => setTimeout(r, 1000));

    setActiveQueue('idle');
    setLogs(p => [...p, 'Consensus reached. Event loop returns to idle cycle.']);
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        Track promise microtask buffers and timeout macro queues as they execute asynchronously against the single-threaded V8 execution block.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <button 
            onClick={handleRun}
            disabled={activeQueue !== 'idle'}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl cursor-pointer"
          >
            {activeQueue !== 'idle' ? 'Running loop...' : 'Run Code'}
          </button>

          {/* Queues Status visual Indicators */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono p-2 border rounded-lg border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/30">
              <span className="font-bold">Execution Stack</span>
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${activeQueue === 'stack' ? 'bg-amber-500 text-white animate-pulse' : 'bg-zinc-200 dark:bg-zinc-800 text-slate-500'}`}>
                {activeQueue === 'stack' ? 'PROCESSING' : 'EMPTY'}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono p-2 border rounded-lg border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/30">
              <span className="font-bold">Microtask (Promise)</span>
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${activeQueue === 'micro' ? 'bg-violet-600 text-white animate-pulse' : 'bg-zinc-200 dark:bg-zinc-800 text-slate-500'}`}>
                {activeQueue === 'micro' ? 'FLUSHING' : 'IDLE'}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono p-2 border rounded-lg border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/30">
              <span className="font-bold">Macrotask (setTimeout)</span>
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${activeQueue === 'macro' ? 'bg-emerald-500 text-white animate-pulse' : 'bg-zinc-200 dark:bg-zinc-800 text-slate-500'}`}>
                {activeQueue === 'macro' ? 'FLUSHING' : 'IDLE'}
              </span>
            </div>
          </div>
        </div>

        {/* Console Log Outputs */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-[10px] font-mono text-emerald-400 space-y-1 h-36 overflow-y-auto">
          <div className="text-[9px] text-zinc-500 border-b border-zinc-900 pb-1 uppercase tracking-wider mb-2">Event Queue Terminal Output</div>
          {logs.map((l, i) => <div key={i} className="leading-relaxed">{l}</div>)}
        </div>
      </div>
    </div>
  );
};

// 4. React Playground: Fiber virtual Node reconciliation highlighter
const ReactReconciliationTree: React.FC = () => {
  const [nodes, setNodes] = useState<{ [key: string]: boolean }>({
    A: false, B: false, C: false, D: false
  });

  const handleToggleState = (n: string) => {
    setNodes(prev => ({
      ...prev,
      [n]: !prev[n]
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4 py-2">
        {['A', 'B', 'C', 'D'].map(n => (
          <button
            key={n}
            onClick={() => handleToggleState(n)}
            className={`w-12 h-12 rounded-full font-mono font-bold text-xs border cursor-pointer flex flex-col items-center justify-center transition-all ${
              nodes[n]
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-md shadow-cyan-500/10 scale-105'
                : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-slate-500'
            }`}
          >
            <span>{n}</span>
            <span className="text-[8px] font-light uppercase opacity-75">{nodes[n] ? 'Dirty' : 'Clean'}</span>
          </button>
        ))}
      </div>
      <div className="text-center">
        <span className="text-[10px] font-mono text-slate-400">
          Click nodes to mark state modified. High-performance Fiber reconcilers only diff changed branches during paint intervals.
        </span>
      </div>
    </div>
  );
};

const ReactPlayground: React.FC = () => (
  <div className="space-y-5">
    <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
      Reconciliation algorithms perform recursive tree analysis. Mark component instances "Dirty" to visualize how React schedules partial updates down target Fiber components.
    </p>
    <ReactReconciliationTree />
  </div>
);

// 5. Next.js Playground: SSR / ISR Render flowchart pipeline
const NextJsPlayground: React.FC = () => {
  const [pipeline, setPipeline] = useState<'static' | 'ssr' | 'isr'>('static');

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        Toggle rendering paradigms to understand how cache hits or server tasks execute when page queries hits the Next.js edge container middleware.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col gap-2 shrink-0">
          {(['static', 'ssr', 'isr'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPipeline(p)}
              className={`p-3 rounded-xl text-left border text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                pipeline === p
                  ? 'bg-slate-800 text-white border-transparent'
                  : 'bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 text-slate-500 border-zinc-200/50 dark:border-zinc-800/40'
              }`}
            >
              {p === 'static' && 'SSG / Static Site'}
              {p === 'ssr' && 'SSR / On-Demand'}
              {p === 'isr' && 'ISR / Hybrid Background'}
            </button>
          ))}
        </div>

        {/* Pipeline output flowchart display */}
        <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 text-xs text-slate-500 dark:text-zinc-400 min-h-[140px] flex flex-col justify-center gap-2">
          {pipeline === 'static' && (
            <div className="space-y-2">
              <span className="block font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-widest text-[9px] font-mono text-primary">BUILD TIME</span>
              <p className="font-light text-[11px] leading-relaxed">HTML and JSON compiled once during server deploy. Served via CDN edge network with zero database lookups.</p>
              <div className="text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 rounded inline-block">100% CDN CACHE HIT</div>
            </div>
          )}
          {pipeline === 'ssr' && (
            <div className="space-y-2">
              <span className="block font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-widest text-[9px] font-mono text-amber-500">REQUEST TIME</span>
              <p className="font-light text-[11px] leading-relaxed">Database queried and HTML composed dynamically on each query. Guarantees fresh state content with increased server overhead.</p>
              <div className="text-[10px] font-mono text-amber-500 font-bold bg-amber-500/10 px-2 py-1 rounded inline-block">ON-DEMAND COMPUTED</div>
            </div>
          )}
          {pipeline === 'isr' && (
            <div className="space-y-2">
              <span className="block font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-widest text-[9px] font-mono text-cyan-500">STALE WHILE REVALIDATE</span>
              <p className="font-light text-[11px] leading-relaxed">Stale cache is served instantly to readers. A background worker triggers on revalidation timers to rebuild page without blocking client traffic.</p>
              <div className="text-[10px] font-mono text-cyan-500 font-bold bg-cyan-500/10 px-2 py-1 rounded inline-block">HYBRID PIPELINE ACTIVE</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 6. Node.js Playground: Backpressure visual stream simulator
const NodePlayground: React.FC = () => {
  const [speed, setSpeed] = useState<number>(50); // Writable drain speed
  const pressure = useMemo(() => {
    return Math.max(0, Math.min(100, Math.round((100 - speed) * 1.2)));
  }, [speed]);

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        Streams buffer data in memory chunks. Adjust Writable consume rate to observe how high backpressure pauses readable streams to prevent RAM overflow.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 font-mono">
              <span>Writable Consume / Drain Speed</span>
              <span>{speed}% capacity</span>
            </div>
            <input 
              type="range" min="10" max="100" value={speed} 
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full accent-emerald-500 bg-zinc-100 dark:bg-zinc-900 h-1 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Visual Indicator of pressure */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 text-center space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Buffer Pressure Status</span>
          <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden relative">
            <div 
              className={`h-full transition-all duration-300 ${pressure > 75 ? 'bg-rose-500 animate-pulse' : pressure > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${pressure}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs select-none">
              {pressure}% Load
            </span>
          </div>

          <span className={`text-[10.5px] font-bold ${pressure > 75 ? 'text-rose-500' : 'text-slate-500'}`}>
            {pressure > 75 ? '⚠️ STREAM PAUSED: BACKPRESSURE TRIGGERED' : '✅ STREAM COOPERATIVE: BUFFERS DRAINED'}
          </span>
        </div>
      </div>
    </div>
  );
};

// 7. Operating Systems Playground: CPU Thread process scheduler
const OsPlayground: React.FC = () => {
  const [activeProcess, setActiveProcess] = useState<number>(0);
  const [cycles, setCycles] = useState<number>(0);

  const processes = [
    { name: 'Kernel Sync Node', time: '40ms' },
    { name: 'File Buffer flush', time: '60ms' },
    { name: 'Network Socket Poll', time: '10ms' }
  ];

  const handleStep = () => {
    setActiveProcess((activeProcess + 1) % processes.length);
    setCycles(cycles + 1);
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        OS kernels schedule processes into CPU intervals. Click "Context Step" to trigger a process swap, saving internal registers and restoring next target threads.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-3 w-full sm:w-auto shrink-0">
          <button 
            onClick={handleStep}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <RefreshCw size={12} /> Context Step
          </button>
          <div className="text-[10px] font-mono text-slate-500">
            Total Swaps / Context cycles: <span className="font-bold text-orange-500">{cycles}</span>
          </div>
        </div>

        {/* Visual Scheduler Slots */}
        <div className="flex-grow w-full max-w-sm space-y-2">
          {processes.map((proc, i) => {
            const isActive = activeProcess === i;
            return (
              <div 
                key={i} 
                className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
                  isActive 
                    ? 'bg-orange-500/10 border-orange-500/45 text-orange-600 dark:text-orange-400 scale-[1.02] shadow-sm' 
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-150 dark:border-zinc-900 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-orange-500 animate-ping' : 'bg-zinc-400'}`} />
                  <span className="text-xs font-bold">{proc.name}</span>
                </div>
                <span className="font-mono text-[10px]">{proc.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 8. DBMS Playground: Tree Index lookup visual pathfinder
const DbmsPlayground: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        Relational SQL backends search compound data rapidly using balanced B+ Trees. Select a key query value to inspect the tree traversal route down the data cluster.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Key selectors */}
        <div className="space-y-4">
          <span className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">Search Target Key register</span>
          <div className="flex gap-2">
            {[12, 45, 89].map(k => (
              <button
                key={k}
                onClick={() => setSelectedKey(k)}
                className={`w-12 h-12 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center justify-center ${
                  selectedKey === k 
                    ? 'bg-teal-500 border-teal-500 text-white shadow-md' 
                    : 'bg-white dark:bg-zinc-950 border-zinc-250 dark:border-zinc-800 text-slate-500 hover:border-zinc-300'
                }`}
              >
                #{k}
              </button>
            ))}
          </div>
        </div>

        {/* Traversal display */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 min-h-[120px] flex flex-col justify-center gap-2">
          {selectedKey ? (
            <div className="space-y-2 text-xs">
              <span className="block font-mono text-[10px] text-teal-500 font-bold uppercase">B+ Tree Path Highlight</span>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-800 dark:text-zinc-200">
                <span>[Root (Node_A)]</span>
                <span>➔</span>
                <span className={selectedKey === 12 ? 'text-teal-500 font-bold' : ''}>[Node_B (key &lt; 50)]</span>
                <span className={selectedKey !== 12 ? 'text-teal-500 font-bold' : ''}>{selectedKey !== 12 && '➔'}</span>
                {selectedKey !== 12 && <span className="text-teal-500 font-bold">[Node_C (key &gt; 50)]</span>}
              </div>
              <p className="font-light text-[10.5px] text-slate-400 leading-relaxed">Path completed in log(N) complexity checks. Sequential data page fetched from disk registry.</p>
            </div>
          ) : (
            <span className="text-xs text-slate-400 italic font-light text-center">Select target key to compute index path</span>
          )}
        </div>
      </div>
    </div>
  );
};

// 9. Computer Networks Playground: OSI Header packet encapsulation wrapper
const NetworksPlayground: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const headers = [
    { layer: 'Application', header: 'HTTP/3 Payload' },
    { layer: 'Transport', header: 'QUIC / UDP Header' },
    { layer: 'Network', header: 'IP Routing Header' },
    { layer: 'Data Link', header: 'Ethernet MAC Header' }
  ];

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        Encapsulation wraps packet telemetry headers around payloads as they descend the TCP/IP stack. Increase compilation level to see frames pack before network broadcast.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-3 w-full sm:w-auto shrink-0">
          <div className="flex gap-2">
            <button 
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className="px-3 py-1.5 border border-zinc-250 dark:border-zinc-800 text-[10px] font-bold uppercase rounded-lg disabled:opacity-50 cursor-pointer"
            >
              Unwrap
            </button>
            <button 
              disabled={step >= headers.length}
              onClick={() => setStep(step + 1)}
              className="px-3.5 py-1.5 bg-sky-500 text-white text-[10px] font-bold uppercase rounded-lg disabled:opacity-50 cursor-pointer"
            >
              Encapsulate
            </button>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Encapsulation Layer: <span className="font-bold text-sky-500">{step} / {headers.length}</span>
          </div>
        </div>

        {/* Visual Frame wrapper */}
        <div className="flex-grow w-full max-w-sm p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 rounded-2xl min-h-[140px] flex items-center justify-center">
          <div className="space-y-1.5 w-full">
            {headers.slice(0, step).map((h, i) => (
              <div 
                key={i}
                className="p-2 border border-sky-500/25 bg-sky-500/5 text-sky-600 dark:text-sky-400 rounded-xl font-mono text-[9px] text-center"
              >
                [{h.layer}] {h.header}
              </div>
            ))}
            {step === 0 && <span className="text-xs text-slate-400 italic font-light block text-center">Plaintext String Payload</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// 10. System Design Playground: Auto scaling container loadbalancer
const SysDesignPlayground: React.FC = () => {
  const [load, setLoad] = useState<number>(10); // RPS
  const nodesCount = useMemo(() => {
    if (load > 80) return 4;
    if (load > 45) return 2;
    return 1;
  }, [load]);

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        High traffic bottlenecks system resources. Dial up requests rate (RPS) to trigger elastic auto-scalers to spin up active container nodes dynamically.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Slider Controls */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 font-mono">
              <span>RPS Incoming Request Rate</span>
              <span>{load * 10} RPS load</span>
            </div>
            <input 
              type="range" min="10" max="100" value={load} 
              onChange={(e) => setLoad(parseInt(e.target.value))}
              className="w-full accent-fuchsia-500 bg-zinc-100 dark:bg-zinc-900 h-1 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Nodes Grid Display */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 text-center space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Cluster Gateway Nodes</span>
          
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => {
              const isActive = i < nodesCount;
              return (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-xl border text-[10px] font-mono font-bold transition-all ${
                    isActive 
                      ? 'bg-fuchsia-500/10 border-fuchsia-500/35 text-fuchsia-600 dark:text-fuchsia-400 animate-pulse' 
                      : 'bg-zinc-100 dark:bg-zinc-900/40 border-transparent text-slate-400 opacity-40'
                  }`}
                >
                  Container #{i} {isActive ? '[ONLINE]' : '[OFFLINE]'}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// 11. AI Playground: LLM temperature token sampler visualizer
const AiPlayground: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(0.2);

  // Sample token choices based on temp
  const choices = useMemo(() => {
    if (temperature > 0.7) {
      return [
        { word: 'stellar', prob: '30%' },
        { word: 'nebula', prob: '28%' },
        { word: 'syntax', prob: '22%' },
        { word: 'entropy', prob: '20%' }
      ];
    }
    if (temperature > 0.4) {
      return [
        { word: 'compiler', prob: '45%' },
        { word: 'server', prob: '30%' },
        { word: 'logic', prob: '15%' },
        { word: 'matrix', prob: '10%' }
      ];
    }
    return [
      { word: 'logic', prob: '85%' },
      { word: 'server', prob: '10%' },
      { word: 'compiler', prob: '4%' },
      { word: 'matrix', prob: '1%' }
    ];
  }, [temperature]);

  return (
    <div className="space-y-5">
      <p className="text-xs text-slate-400 dark:text-zinc-500 font-light leading-relaxed">
        Model Temperature determines token output variety. Lower temperature yields highly predictable outputs, while dialing it up allows creative entropy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Temp Slider */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 font-mono">
              <span>LLM Temperature (Entropy)</span>
              <span>t = {temperature.toFixed(1)}</span>
            </div>
            <input 
              type="range" min="0.1" max="1.0" step="0.1" value={temperature} 
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-pink-500 bg-zinc-100 dark:bg-zinc-900 h-1 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Probabilities Output */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 space-y-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Computed Token Probabilities</span>
          <div className="space-y-2">
            {choices.map(c => (
              <div key={c.word} className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-700 dark:text-zinc-300">"{c.word}"</span>
                <span className="font-mono text-pink-500 font-bold">{c.prob}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
