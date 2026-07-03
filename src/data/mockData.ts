/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Blog, Comment, Subscriber, DifficultyLevel } from '../types';

export const CATEGORIES = [
  'Technology', 'Programming', 'AI', 'ML', 'Web Development', 
  'Databases', 'Operating Systems', 'Computer Networks', 
  'Cybersecurity', 'Cloud Computing', 'Mathematics', 
  'Interview Preparation', 'Career Guidance', 'Projects', 'Open Source'
];

export const TAGS = [
  'react', 'nextjs', 'typescript', 'nodejs', 'express', 'mongodb', 
  'tailwindcss', 'framermotion', 'javascript', 'python', 'java', 'cpp',
  'algorithms', 'datastructures', 'systemdesign', 'performance', 'security',
  'api', 'rest', 'graphql', 'database', 'sql', 'nosql', 'docker', 'kubernetes',
  'aws', 'serverless', 'cicd', 'github', 'git', 'career', 'resume', 'internship',
  'interview', 'machinelearning', 'deeplearning', 'nlp', 'transformers', 'gpt',
  'vision', 'neuralnetworks', 'math', 'linearalgebra', 'calculus', 'statistics',
  'cryptography', 'auth', 'jwt', 'oauth', 'vulnerability', 'penetration', 'linux',
  'process', 'thread', 'memory', 'concurrency', 'tcpip', 'http', 'dns', 'websocket',
  'microservices', 'monolith', 'testing', 'jest', 'playwright', 'opensource', 'contributing'
];

// Let's create some deep, realistic detailed blog posts first, then generate the remaining 30 dynamically
export const DETAILED_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'Building High-Throughput Architectures: Node.js Clusters vs Web Worker Pools',
    subtitle: 'An in-depth evaluation of memory profiles, concurrency performance overhead, and context switching operations when running calculations under the V8 engine.',
    slug: 'building-high-throughput-node-clusters-worker-pools',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    category: 'Web Development',
    tags: ['nodejs', 'concurrency', 'performance', 'systemdesign'],
    difficulty: 'Advanced',
    isPublished: true,
    isPinned: true,
    isFeatured: true,
    publishedAt: '2026-06-30T10:00:00Z',
    updatedAt: '2026-07-01T15:30:00Z',
    metrics: { views: 18450, likes: 1242, readingTime: 8 },
    author: {
      name: 'Anish Kumar',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      role: 'Principal Platform Engineer',
      bio: 'Anish designs high-throughput microservices and leads developer platform engineering at StringToTech.'
    },
    seo: {
      metaTitle: 'Node.js Clusters vs Worker Pools | StringToTech Platform Deep-Dive',
      metaDescription: 'An in-depth structural performance analysis comparing process clustering against multi-threaded web worker allocation inside Node.js architectures.',
      keywords: 'Node.js, Clusters, Worker Threads, Concurrency, V8, Performance, System Design',
      focusKeyword: 'Clusters',
      canonicalUrl: 'https://stringtotech.com/blog/building-high-throughput-node-clusters-worker-pools'
    },
    blocks: [
      { id: 'b1-h1', type: 'heading1', content: 'Understanding Concurrency Options in V8 JavaScript Engines' },
      { id: 'b1-p1', type: 'paragraph', content: 'Node.js is traditionally celebrated for its single-threaded, asynchronous event-driven paradigm. This works brilliantly for I/O-bound operations where the process simply waits for network packets, database queries, or file reads. However, when we introduce high-intensity computation—such as image manipulation, cryptographic operations, or parsing massive JSON payloads—this single thread blocks, halting the entire event loop and degrading response latency for all other incoming requests.' },
      { id: 'b1-call1', type: 'callout', content: 'Critical Performance Rule: Never block the Node.js Event Loop. Doing so introduces cascading delays where connection queues back up, eventually causing server exhaustion or Gateway Timeouts (504).', properties: { style: 'danger' } },
      { id: 'b1-h2', type: 'heading2', content: 'Clustering: Multiple Processes Sharing Ports' },
      { id: 'b1-p2', type: 'paragraph', content: 'The Node.js Cluster module allows you to create child processes (workers) that run simultaneously and share the same server port. This works by utilizing a master process that forks child processes and distributes incoming connections using a Round-Robin load-balancing algorithm.' },
      {
        id: 'b1-c1',
        type: 'code',
        content: `const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();

if (cluster.isPrimary) {
  console.log(\`Primary process \${process.pid} is running\`);

  // Fork workers matching CPU logical cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died. Forking a replacement...\`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection (HTTP server in this case)
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello from cluster worker!\\n');
  }).listen(3000);

  console.log(\`Worker process \${process.pid} started\`);
}`,
        properties: { language: 'typescript' }
      },
      { id: 'b1-h3', type: 'heading2', content: 'Worker Threads: Lightweight Thread Execution' },
      { id: 'b1-p3', type: 'paragraph', content: 'Unlike Clustering which spawns entire operating system processes with separate memory spaces, the Worker Threads module (`worker_threads`) enables the execution of multiple JavaScript environments (V8 isolates) on distinct threads within the same process. This allows threads to share memory space via ArrayBuffers or SharedArrayBuffers, enabling extremely efficient message-passing without heavy serialization overhead.' },
      { id: 'b1-quote1', type: 'quote', content: '"Worker Threads are designed for CPU-bound computations inside a single server instance, while Clustering is ideal for scaling the entire network serving capabilities across multi-core systems."' },
      { id: 'b1-h4', type: 'heading2', content: 'Detailed Performance Comparison' },
      { id: 'b1-p4', type: 'paragraph', content: 'Below is a quantitative comparison matrix highlighting the core mechanical differences between Clusters and Worker Pools:' },
      {
        id: 'b1-t1',
        type: 'table',
        content: '',
        properties: {
          columns: ['Metric', 'Node.js Process Cluster', 'Worker Threads Pool'],
          rows: [
            ['Memory Footprint', 'High (~30MB per process baseline)', 'Low (~5MB per thread baseline)'],
            ['State Sharing', 'IPC serialization (Slow for large objects)', 'SharedArrayBuffer / Direct pointer refs (Fast)'],
            ['Fault Tolerance', 'Excellent (One worker crash does not affect others)', 'Vulnerable (Uncaught error can take down entire process)'],
            ['Scaling Vector', 'Horizontal OS-level (Easy multi-core CPU mapping)', 'Vertical within-process CPU threads'],
            ['Boot Latency', 'Slow (~150ms OS fork overhead)', 'Fast (~15ms isolate creation)']
          ]
        }
      },
      { id: 'b1-p5', type: 'paragraph', content: 'In conclusion, when designing a robust system, you should default to **Clustering** to distribute general network request handling across all available CPU cores. For localized, intensive CPU pipelines embedded within those requests (like image rendering, PDF exports, or algorithms), delegate those specific tasks to a pre-warmed **Worker Thread Pool** to prevent event loop bottlenecks.' }
    ]
  },
  {
    id: '2',
    title: 'Understanding React 19 Compiler (React Forget): How It Rewrites Performance',
    subtitle: 'A structural exploration of how React 19 automates memoization, rendering schedules, and eliminates the manual overhead of useMemo and useCallback hooks.',
    slug: 'understanding-react-19-compiler-performance',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
    category: 'Web Development',
    tags: ['react', 'performance', 'javascript', 'tailwindcss'],
    difficulty: 'Intermediate',
    isPublished: true,
    isPinned: false,
    isFeatured: true,
    publishedAt: '2026-06-25T14:15:00Z',
    updatedAt: '2026-06-25T14:15:00Z',
    metrics: { views: 15120, likes: 984, readingTime: 6 },
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      role: 'Lead Frontend Architect',
      bio: 'Sarah is an active open-source contributor, specialized in modern React performance architectures.'
    },
    seo: {
      metaTitle: 'React 19 Compiler Explained | StringToTech Tech Blog',
      metaDescription: 'Discover how the new React 19 compiler automatically optimizes re-renders and compiles away useMemo and useCallback.',
      keywords: 'React 19, Compiler, React Forget, useMemo, useCallback, Memoization, Performance',
      focusKeyword: 'React 19',
      canonicalUrl: 'https://stringtotech.com/blog/understanding-react-19-compiler-performance'
    },
    blocks: [
      { id: 'b2-h1', type: 'heading1', content: 'The End of Manual useMemo and useCallback' },
      { id: 'b2-p1', type: 'paragraph', content: 'For years, React developers have spent countless hours debugging unnecessary re-renders, introducing complex dependencies arrays, and wrapping custom components inside `React.memo`, `useMemo`, and `useCallback`. This manual optimization was not only tedious but also prone to silent reference breakages that defeated memoization altogether. In React 19, the new React Compiler (formerly known as React Forget) changes everything by analyzing the AST (Abstract Syntax Tree) of your code and automatically generating memoized structures.' },
      { id: 'b2-call1', type: 'callout', content: 'The React Compiler is a build-time tool. It takes your standard, unoptimized React code and rewrites it under the hood into low-level memoization caches, preserving semantic equivalence.', properties: { style: 'info' } },
      { id: 'b2-h2', type: 'heading2', content: 'How standard React Code is compiled' },
      { id: 'b2-p2', type: 'paragraph', content: 'Let\'s look at a traditional component where a list is filtered based on search queries. Previously, you would write:' },
      {
        id: 'b2-c1',
        type: 'code',
        content: `// React 18: Manual useMemo
import React, { useState, useMemo } from 'react';

function ProductList({ items }) {
  const [filter, setFilter] = useState('');
  
  // Manual memoization to avoid filtering on unrelated state changes (like scrolling/theming)
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {filteredItems.map(item => <ItemRow key={item.id} item={item} />)}
    </div>
  );
}`,
        properties: { language: 'typescript' }
      },
      { id: 'b2-p3', type: 'paragraph', content: 'With React 19, the compiler handles this automatically. You write standard JavaScript, and the compiler injects a cache matrix behind the scenes. This ensures that `filteredItems` only updates if `items` or `filter` references actually mutate, leaving other component elements completely unaffected.' },
      { id: 'b2-h3', type: 'heading2', content: 'Rules of React of the Future' },
      { id: 'b2-p4', type: 'paragraph', content: 'To fully leverage the React Compiler, your codebase must strictly adhere to React\'s core rules:' },
      { id: 'b2-l1', type: 'list-item', content: 'Component functions must be pure. They cannot mutate props or context values directly.' },
      { id: 'b2-l2', type: 'list-item', content: 'Hooks must always be called at the top level and follow standardized hooks naming patterns.' },
      { id: 'b2-l3', type: 'list-item', content: 'Side effects must remain isolated within `useEffect` hooks and must not occur during render execution.' }
    ]
  },
  {
    id: '3',
    title: 'A Deep Dive into Database Sharding: Horizontal Scaling for Web Scale',
    subtitle: 'How to design, route, and balance multi-node database systems using consistent hashing, modular partitioning, and database federation.',
    slug: 'deep-dive-database-sharding-horizontal-scaling',
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2000&auto=format&fit=crop',
    category: 'Databases',
    tags: ['database', 'sql', 'systemdesign', 'nosql'],
    difficulty: 'Advanced',
    isPublished: true,
    isPinned: false,
    isFeatured: true,
    publishedAt: '2026-06-20T08:30:00Z',
    updatedAt: '2026-06-20T08:30:00Z',
    metrics: { views: 12400, likes: 742, readingTime: 10 },
    author: {
      name: 'Anish Kumar',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      role: 'Principal Platform Engineer',
      bio: 'Anish designs high-throughput microservices and leads developer platform engineering at StringToTech.'
    },
    seo: {
      metaTitle: 'Database Sharding & Partitioning | StringToTech Tech Blog',
      metaDescription: 'A detailed engineering guide on designing multi-node database architectures,consistent hashing, and sharding routing tables.',
      keywords: 'Database Sharding, Partitioning, System Design, Horizontal Scaling, SQL, NoSQL',
      focusKeyword: 'Sharding',
      canonicalUrl: 'https://stringtotech.com/blog/deep-dive-database-sharding-horizontal-scaling'
    },
    blocks: [
      { id: 'b3-h1', type: 'heading1', content: 'Why Monolithic Databases Eventually Fail' },
      { id: 'b3-p1', type: 'paragraph', content: 'When building a tech platform, your initial database starts on a single, high-capacity server node. As user activity scales, you upgrade that server (Vertical Scaling / Scaling Up) by adding more RAM, faster NVMe SSDs, and higher-core CPUs. However, you eventually hit hard physical boundaries and astronomical cost multipliers. To scale past these monolith boundaries, you must distribute data across multiple physical machines. This is called Horizontal Scaling or **Database Sharding**.' },
      { id: 'b3-h2', type: 'heading2', content: 'Sharding vs Replication' },
      { id: 'b3-p2', type: 'paragraph', content: 'It is vital to distinguish between sharding and replication. Database replication copies the *exact same* dataset to multiple read-replicas, scaling read performance. Sharding, on the other hand, breaks the database into distinct, non-overlapping subsets of data (shards), scaling both reads and writes.' },
      { id: 'b3-h3', type: 'heading2', content: 'Key Sharding Strategies' },
      { id: 'b3-p3', type: 'paragraph', content: 'Choosing the correct "Shard Key" determines how evenly your data is balanced across nodes:' },
      { id: 'b3-l1', type: 'list-item', content: '**Range-Based Sharding**: Splitting data based on specific attributes ranges (e.g., separating user IDs 1-100k, 100k-200k into distinct shards).' },
      { id: 'b3-l2', type: 'list-item', content: '**Hash-Based (Modular) Sharding**: Taking the hash value of the Shard Key, computing `hash(Key) % N` (where N is the number of database shards) to locate target nodes.' },
      { id: 'b3-l3', type: 'list-item', content: '**Consistent Hashing**: A advanced ring routing system where adding or removing shards only requires moving a tiny fraction of existing keys, drastically simplifying re-sharding operations.' },
      { id: 'b3-call1', type: 'callout', content: 'Implementation warning: Avoid Range-Based Sharding on auto-incrementing primary keys. This generates "Hot Spots" where all new incoming writes hit only the latest active shard node, wasting the capacity of older nodes.', properties: { style: 'warning' } }
    ]
  },
  {
    id: '4',
    title: 'Mastering System Design: Designing a Globally Distributed URL Shortener',
    subtitle: 'From API design and database choice to consistent hashing, rate limiting, and analytics tracking with low-latency CDN setups.',
    slug: 'mastering-system-design-globally-distributed-url-shortener',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop',
    category: 'Interview Preparation',
    tags: ['systemdesign', 'performance', 'database', 'interview'],
    difficulty: 'Intermediate',
    isPublished: true,
    isPinned: false,
    isFeatured: false,
    publishedAt: '2026-06-15T09:00:00Z',
    updatedAt: '2026-06-15T09:00:00Z',
    metrics: { views: 9840, likes: 521, readingTime: 7 },
    author: {
      name: 'Anish Kumar',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      role: 'Principal Platform Engineer',
      bio: 'Anish designs high-throughput microservices and leads developer platform engineering at StringToTech.'
    },
    seo: {
      metaTitle: 'URL Shortener System Design Guide | StringToTech',
      metaDescription: 'Step-by-step architectural breakdown of building a high-capacity distributed URL shortener system for software engineering interviews.',
      keywords: 'System Design, URL Shortener, Interview Prep, Distributed Systems, Redis, Load Balancing',
      focusKeyword: 'System Design',
      canonicalUrl: 'https://stringtotech.com/blog/mastering-system-design-globally-distributed-url-shortener'
    },
    blocks: [
      { id: 'b4-h1', type: 'heading1', content: 'Step-by-Step Architecture for a Distributed URL Shortener' },
      { id: 'b4-p1', type: 'paragraph', content: 'A URL shortener (like Bitly or TinyURL) is a classic system design interview question. The system needs to accept a long URL, compress it into a short string, and then route requests hitting the short URL back to the original destination with sub-millisecond latencies.' },
      { id: 'b4-h2', type: 'heading2', content: 'Step 1: Functional Requirements & Back-of-the-Envelope Estimation' },
      { id: 'b4-p2', type: 'paragraph', content: 'First, define the scale. Suppose the system handles 100 million URL shortening requests per month with a 10:1 read-to-write ratio (1 billion redirections per month).' },
      { id: 'b4-l1', type: 'list-item', content: 'Write requests per second: `100,000,000 / (30 days * 86400 seconds) ≈ 40 writes/sec`' },
      { id: 'b4-l2', type: 'list-item', content: 'Read requests (redirections) per second: `40 * 10 ≈ 400 reads/sec`' },
      { id: 'b4-l3', type: 'list-item', content: 'Storage requirements (over 5 years): Assuming each entry is 500 bytes: `100M * 12 months * 5 years * 500 bytes = 3 Terabytes`' },
      { id: 'b4-h3', type: 'heading2', content: 'Step 2: Database Schema & Choice' },
      { id: 'b4-p3', type: 'paragraph', content: 'Since our transactions are structurally simple, and we do not require complex relational queries, a high-throughput NoSQL database like **DynamoDB** or a distributed **Cassandra** ring is ideal. These database systems scale horizontally with ease and support extremely high read/write queries.' }
    ]
  },
  {
    id: '5',
    title: 'Exploring the Mathematics of Cryptography: RSA Algorithm Explained From Scratch',
    subtitle: 'From prime factorization and modular arithmetic to Euler totient theorem and key generation processes.',
    slug: 'mathematics-cryptography-rsa-algorithm-scratch',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop',
    category: 'Mathematics',
    tags: ['math', 'security', 'cryptography', 'programming'],
    difficulty: 'Advanced',
    isPublished: true,
    isPinned: false,
    isFeatured: false,
    publishedAt: '2026-06-10T11:00:00Z',
    updatedAt: '2026-06-10T11:00:00Z',
    metrics: { views: 8430, likes: 611, readingTime: 9 },
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      role: 'Lead Frontend Architect',
      bio: 'Sarah is an active open-source contributor, specialized in modern React performance architectures.'
    },
    seo: {
      metaTitle: 'RSA Cryptography Mathematics | StringToTech Science',
      metaDescription: 'Step-by-step walk-through of the mathematics underlying asymmetric key encryption and the RSA algorithm.',
      keywords: 'Cryptography, RSA, Mathematics, Modular Arithmetic, Euler Totient, Cybersecurity',
      focusKeyword: 'RSA',
      canonicalUrl: 'https://stringtotech.com/blog/mathematics-cryptography-rsa-algorithm-scratch'
    },
    blocks: [
      { id: 'b5-h1', type: 'heading1', content: 'Asymmetric Cryptography: The RSA Principle' },
      { id: 'b5-p1', type: 'paragraph', content: 'Asymmetric cryptography (or Public Key Cryptography) relies on key pairs: a public key known to the world, and a private key kept absolutely secret. The mathematical genius of the RSA algorithm (named after Rivest, Shamir, and Adleman) is that it is easy to multiply two massive prime numbers together, but computationally practically impossible to factor their product back into primes.' },
      { id: 'b5-h2', type: 'heading2', content: 'Step-by-Step RSA Key Generation' },
      { id: 'b5-p2', type: 'paragraph', content: 'Let\'s walk through the mathematical operations required to create RSA keys:' },
      { id: 'b5-l1', type: 'list-item', content: 'Select two distinct, enormous prime numbers, `p` and `q`. For demonstration, let\'s pick `p = 61` and `q = 53`.' },
      { id: 'b5-l2', type: 'list-item', content: 'Compute the modulus `n = p * q`. Here, `n = 61 * 53 = 3233`.' },
      { id: 'b5-l3', type: 'list-item', content: 'Compute Euler Totient Function: `φ(n) = (p - 1) * (q - 1)`. Here, `φ(n) = 60 * 52 = 3120`.' },
      { id: 'b5-l4', type: 'list-item', content: 'Choose an integer `e` such that `1 < e < φ(n)` and `gcd(e, φ(n)) = 1` (meaning `e` and `φ(n)` are coprime). A standard choice is `e = 17`.' },
      { id: 'b5-l5', type: 'list-item', content: 'Compute the private key exponent `d` such that `(d * e) % φ(n) = 1` (modular multiplicative inverse of `e` modulo `φ(n)`). For our numbers, `d = 2753`.' }
    ]
  }
];

// Helper to dynamically generate the remaining 25 posts so we have a full database of 30 blog posts!
const CATEGORY_MAP: Record<string, string[]> = {
  'Technology': ['trends', 'gadgets', 'future', 'hardware'],
  'Programming': ['javascript', 'python', 'java', 'cpp', 'algorithms'],
  'AI': ['machinelearning', 'deeplearning', 'transformers', 'gpt'],
  'ML': ['deeplearning', 'statistics', 'math', 'python'],
  'Web Development': ['react', 'nextjs', 'nodejs', 'tailwindcss', 'performance'],
  'Databases': ['database', 'sql', 'nosql', 'performance'],
  'Operating Systems': ['linux', 'memory', 'concurrency'],
  'Computer Networks': ['http', 'tcpip', 'dns', 'websocket'],
  'Cybersecurity': ['auth', 'jwt', 'security', 'cryptography'],
  'Cloud Computing': ['aws', 'docker', 'kubernetes', 'serverless'],
  'Mathematics': ['math', 'linearalgebra', 'calculus'],
  'Interview Preparation': ['interview', 'datastructures', 'algorithms', 'resume'],
  'Career Guidance': ['career', 'internship', 'portfolio'],
  'Projects': ['opensource', 'github', 'git', 'react'],
  'Open Source': ['opensource', 'github', 'git', 'contributing']
};

const AUTHORS = [
  {
    name: 'Anish Kumar',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    role: 'Principal Platform Engineer',
    bio: 'Anish designs high-throughput microservices and leads developer platform engineering at StringToTech.'
  },
  {
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    role: 'Lead Frontend Architect',
    bio: 'Sarah is an active open-source contributor, specialized in modern React performance architectures.'
  },
  {
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    role: 'Chief Security Officer',
    bio: 'Marcus focuses on infrastructure compliance, cryptography, and server penetration auditing.'
  }
];

const DIFFICULTY_LEVELS: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

const TITLE_TEMPLATES = [
  'Deep Dive: Exploring {topic} Internals',
  'Mastering {topic} for Enterprise Systems',
  'A Beginner\'s Guide to {topic}',
  'How We Scaled Our {topic} Pipeline',
  'Top 10 {topic} Patterns to Know',
  'Advanced {topic} Optimization Strategies',
  'Building a Real-time {topic} Platform from Scratch',
  'The Mathematics behind {topic}',
  'Understanding {topic} Security Vulnerabilities',
  'The Future of {topic}: Trends for 2026'
];

function generateRemainingBlogs(): Blog[] {
  const blogs = [...DETAILED_BLOGS];
  const countNeeded = 30 - blogs.length;

  for (let i = 0; i < countNeeded; i++) {
    const id = String(blogs.length + 1);
    const category = CATEGORIES[i % CATEGORIES.length];
    const tags = CATEGORY_MAP[category] || ['programming'];
    const difficulty = DIFFICULTY_LEVELS[i % DIFFICULTY_LEVELS.length];
    const author = AUTHORS[i % AUTHORS.length];
    
    // Pick topic and compile title
    const topic = tags[0].toUpperCase();
    const titleTemplate = TITLE_TEMPLATES[i % TITLE_TEMPLATES.length];
    const title = titleTemplate.replace('{topic}', topic);
    const subtitle = `Comprehensive structural walkthrough explaining ${topic} details, practical integrations, and performance metrics.`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Dates
    const pubDate = new Date();
    pubDate.setDate(pubDate.getDate() - (i + 2)); // publish sequentially in the past

    // Metrics
    const views = Math.floor(Math.random() * 5000) + 200;
    const likes = Math.floor(views * (Math.random() * 0.1 + 0.02));
    const readingTime = Math.floor(Math.random() * 8) + 3;

    blogs.push({
      id,
      title,
      subtitle,
      slug,
      coverImage: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?q=80&w=800&auto=format&fit=crop&sig=${i}`,
      category,
      tags,
      difficulty,
      isPublished: true,
      isPinned: false,
      isFeatured: i < 5, // Mark several as featured
      publishedAt: pubDate.toISOString(),
      updatedAt: pubDate.toISOString(),
      metrics: { views, likes, readingTime },
      author,
      seo: {
        metaTitle: `${title} | StringToTech`,
        metaDescription: subtitle,
        keywords: `${topic}, ${category}, Tutorials, StringToTech`,
        focusKeyword: topic,
        canonicalUrl: `https://stringtotech.com/blog/${slug}`
      },
      blocks: [
        { id: `b${id}-h1`, type: 'heading1', content: `Core Architecture of ${topic}` },
        { id: `b${id}-p1`, type: 'paragraph', content: `In modern technical systems, ${topic} forms a foundational pillar for executing core logic. In this guide, we break down the operational characteristics of ${topic} and how to correctly size, configure, and secure the system in production environments.` },
        { id: `b${id}-call1`, type: 'callout', content: `Pro Tip: Always monitor system overhead closely when initializing multiple pipelines of ${topic}. Memory fragmentation is the leading cause of microservice cold-starts.`, properties: { style: 'info' } },
        { id: `b${id}-h2`, type: 'heading2', content: `Step-by-Step Implementation` },
        { id: `b${id}-p2`, type: 'paragraph', content: `Integrating ${topic} requires a structured sequence of initialization, data buffering, and connection pooling. The code block below demonstrates a simple modular bootstrap routine for setting up the pipeline:` },
        {
          id: `b${id}-c1`,
          type: 'code',
          content: `// Automated Bootstrap Config for ${topic}
export async function initializePipeline(config) {
  const connection = await connectToService(config.url);
  const buffer = new BufferManager({ size: config.bufferSize || 1024 });
  
  connection.on('data', (chunk) => {
    buffer.write(chunk);
  });
  
  return { connection, buffer };
}`,
          properties: { language: 'typescript' }
        },
        { id: `b${id}-p3`, type: 'paragraph', content: `By establishing clear buffer targets and separating processing streams, you can avoid blockages and scale this architecture horizontally.` }
      ]
    });
  }
  return blogs;
}

export const INITIAL_BLOGS = generateRemainingBlogs();

// Generate some sample nested comments
export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    blogId: '1',
    authorName: 'Alex Mercer',
    authorEmail: 'alex@mercer.dev',
    content: 'This comparison is amazing! I have been struggling with a high CPU calculation block on our main Express server, and switching that routine to a thread-isolated Worker Pool solved it in 10 minutes. Thanks!',
    createdAt: '2026-06-30T14:20:00Z',
    likes: 34,
    isApproved: true,
    parentId: null
  },
  {
    id: 'c-2',
    blogId: '1',
    authorName: 'Anish Kumar',
    authorEmail: 'anish@stringtotech.com',
    content: 'Thrilled to hear it helped, Alex! Just ensure your Worker Pool size matches the logical cores limit so you don\'t thrash the OS CPU schedules.',
    createdAt: '2026-06-30T15:00:00Z',
    likes: 12,
    isApproved: true,
    parentId: 'c-1'
  },
  {
    id: 'c-3',
    blogId: '1',
    authorName: 'Debra Stone',
    authorEmail: 'debra@stone.tech',
    content: 'Do you have benchmark results for memory limits when allocating SharedArrayBuffers between workers versus processes?',
    createdAt: '2026-07-01T09:12:00Z',
    likes: 5,
    isApproved: true,
    parentId: 'c-1'
  },
  {
    id: 'c-4',
    blogId: '1',
    authorName: 'Gavin Ross',
    authorEmail: 'gavin@ross.com',
    content: 'Quick note on Clusters - we faced issues with session persistence since requests land on random workers. We had to implement Redis Session Storage.',
    createdAt: '2026-06-30T18:45:00Z',
    likes: 19,
    isApproved: true,
    parentId: null
  }
];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: 's-1', email: 'sam@microsoft.com', joinedAt: '2026-06-01T08:00:00Z', status: 'Active' },
  { id: 's-2', email: 'engineer@google.com', joinedAt: '2026-06-03T12:30:00Z', status: 'Active' },
  { id: 's-3', email: 'dev@netflix.com', joinedAt: '2026-06-12T17:15:00Z', status: 'Active' },
  { id: 's-4', email: 'architect@amazon.com', joinedAt: '2026-06-20T09:45:00Z', status: 'Active' },
  { id: 's-5', email: 'staff@meta.com', joinedAt: '2026-06-25T11:00:00Z', status: 'Active' }
];

// Seed stats for Recharts
export const ANALYTICS_VIEWS_HISTORY = [
  { name: 'Mon', views: 4200, subscribers: 120, comments: 14 },
  { name: 'Tue', views: 5800, subscribers: 142, comments: 22 },
  { name: 'Wed', views: 9800, subscribers: 210, comments: 45 }, // Newsletter Wednesday peak
  { name: 'Thu', views: 7600, subscribers: 180, comments: 31 },
  { name: 'Fri', views: 6400, subscribers: 165, comments: 28 },
  { name: 'Sat', views: 3200, subscribers: 95, comments: 12 },
  { name: 'Sun', views: 2900, subscribers: 88, comments: 8 }
];

export const TESTIMONIALS = [
  {
    name: 'Linus Torvaldsen',
    role: 'Staff Kernel Developer at OSF',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    content: 'StringToTech is the first platform that explains computer science abstractions with literal execution block steps rather than hand-wavy graphics. An absolute masterclass.'
  },
  {
    name: 'Jessica Ramos',
    role: 'Engineering Lead at Stripe',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
    content: 'The content detailing database sharding patterns and browser render-blockages became a mandatory onboarding reading list for my engineering team. Pure gold.'
  },
  {
    name: 'Aiden Vance',
    role: 'Software Architect at Vercel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    content: 'Their post on Node Clusters and Worker isolate bottlenecks is the best technical documentation available on the web. It is both mathematically precise and directly applicable.'
  }
];
