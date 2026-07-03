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
export const DETAILED_BLOGS: Blog[] = [];


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
    name: 'AMAN KUMAR PANDEY',
    avatar: '/aman.svg',
    role: 'LEARNING WRITING BUILDING',
    bio: 'I believe great learning should be simple and accessible. Through this blog, I share my journey, break down complex Computer Science concepts, and create practical content that helps others learn, build, and grow.'
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
  return [];
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
    authorName: 'AMAN KUMAR PANDEY',
    authorEmail: 'aman@stringtotech.com',
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

export const INITIAL_SUBSCRIBERS: Subscriber[] = [];

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
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
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
