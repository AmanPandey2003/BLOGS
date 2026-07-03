/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Blog } from '../types';
import { Mail, Github, Twitter, Cpu, Award, BookOpen, Star, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthorProfileProps {
  blogs: Blog[];
  onNavigate: (page: string, blogSlug?: string) => void;
}

interface AuthorDetails {
  name: string;
  role: string;
  avatar: string;
  joined: string;
  github: string;
  twitter: string;
  skills: string[];
  stats: { totalPosts: number; views: string; rating: string };
  bio: string;
  recentBooks: { title: string; publisher: string; year: string }[];
}

const AUTHORS: AuthorDetails[] = [
  {
    name: 'AMAN KUMAR PANDEY',
    role: 'LEARNING WRITING BUILDING',
    avatar: '/aman.svg',
    joined: 'Jan 2025',
    github: 'https://github.com/aman-pandeysuri',
    twitter: 'https://twitter.com/amanpandeysuri',
    skills: ['Mathematics', 'Computer Science', 'Software Engineering', 'Artificial Intelligence'],
    stats: { totalPosts: 30, views: '2', rating: '4.9/5' },
    bio: 'I believe great learning should be simple and accessible. Through this blog, I share my journey, break down complex Computer Science concepts, and create practical content that helps others learn, build, and grow.',
    recentBooks: [
      { title: 'Deconstructing React Internals', publisher: 'StringToTech Pubs', year: '2025' },
      { title: 'The Assembly Handbook for JS Devs', publisher: 'O Reilly Media', year: '2024' },
      { title: 'Distributed Mutexes and Consensus', publisher: 'StringToTech Pubs', year: '2025' },
      { title: 'Zero-Trust Architectures in Go', publisher: 'StringToTech Pubs', year: '2025' }
    ]
  }
];

export const AuthorProfile: React.FC<AuthorProfileProps> = ({ blogs, onNavigate }) => {
  const [activeAuthorName, setActiveAuthorName] = useState(AUTHORS[0].name);

  const activeAuthor = useMemo(() => {
    return AUTHORS.find(a => a.name === activeAuthorName) || AUTHORS[0];
  }, [activeAuthorName]);

  // Filter published blogs written by active author
  const authorBlogs = useMemo(() => {
    return blogs.filter(b => b.author.name === activeAuthor.name && b.isPublished);
  }, [blogs, activeAuthor]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-custom select-text pb-20">
      
      {/* Authors Selector tabs */}
      {AUTHORS.length > 1 && (
        <div className="flex flex-wrap gap-2.5 justify-center border-b pb-5">
          {AUTHORS.map((auth) => (
            <button
              key={auth.name}
              onClick={() => setActiveAuthorName(auth.name)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeAuthorName === auth.name 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-zinc-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              <img src={auth.avatar} alt={auth.name} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
              <span>{auth.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Author Bio and publications */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Main profile card */}
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-250/60 dark:border-zinc-800/60 backdrop-blur-md shadow-sm text-center space-y-5 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
            <img src={activeAuthor.avatar} alt={activeAuthor.name} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-primary/20 p-1 hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
            
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-none">{activeAuthor.name}</h2>
              <span className="text-xs text-slate-400 font-medium">{activeAuthor.role}</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-400 font-light leading-relaxed">
              {activeAuthor.bio}
            </p>

            {/* Social handles */}
            <div className="flex justify-center gap-3 border-t border-zinc-150 dark:border-zinc-800 pt-4">
              <a href={activeAuthor.github} target="_blank" rel="noreferrer" className="p-2 bg-white/50 dark:bg-zinc-950/50 rounded-xl hover:text-primary transition-colors text-slate-400 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-primary/20"><Github size={14} /></a>
              <a href={activeAuthor.twitter} target="_blank" rel="noreferrer" className="p-2 bg-white/50 dark:bg-zinc-950/50 rounded-xl hover:text-primary transition-colors text-slate-400 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-primary/20"><Twitter size={14} /></a>
            </div>
          </div>

          {/* Author Stats card */}
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-250/60 dark:border-zinc-800/60 backdrop-blur-md shadow-sm space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 border-b border-zinc-150 dark:border-zinc-800 pb-1">Performance Indexes</h4>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Published Logs', count: activeAuthor.stats.totalPosts, icon: <BookOpen className="text-primary mx-auto mb-1" size={16} /> },
                { label: 'Monthly Readers', count: activeAuthor.stats.views, icon: <Cpu className="text-secondary mx-auto mb-1" size={16} /> },
                { label: 'User Index Grade', count: activeAuthor.stats.rating, icon: <Award className="text-accent mx-auto mb-1" size={16} /> }
              ].map((st, i) => (
                <div key={i} className="space-y-1">
                  {st.icon}
                  <span className="text-xs font-black block">{st.count}</span>
                  <span className="text-[8px] uppercase text-slate-400 block font-light leading-none">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills stack */}
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-250/60 dark:border-zinc-800/60 backdrop-blur-md shadow-sm space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 border-b border-zinc-150 dark:border-zinc-800 pb-1">Core Tech Competencies</h4>
            <div className="flex flex-wrap gap-1.5">
              {activeAuthor.skills.map(sk => (
                <span key={sk} className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/5 text-primary border border-primary/10">{sk}</span>
              ))}
            </div>
          </div>

          {/* Books / Publications */}
          {activeAuthor.recentBooks.length > 0 && (
            <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-250/60 dark:border-zinc-800/60 backdrop-blur-md shadow-sm space-y-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 border-b border-zinc-150 dark:border-zinc-800 pb-1">Technical Book Releases</h4>
              <div className="space-y-3">
                {activeAuthor.recentBooks.map((bk, i) => (
                  <div key={i} className="p-3 bg-white/40 dark:bg-zinc-950/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl space-y-0.5 text-xs hover:border-primary/20 transition-colors">
                    <span className="font-bold text-slate-800 dark:text-zinc-200 block">{bk.title}</span>
                    <p className="text-[10px] text-slate-400 font-light block">{bk.publisher} | Released {bk.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Authored blogs grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border-b border-zinc-150 dark:border-zinc-800 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-850 dark:text-zinc-100 uppercase tracking-wider">
              Published Logs Registry ({authorBlogs.length})
            </h3>
            <span className="text-xs text-slate-400 font-light">Showing all active digital signatures</span>
          </div>

          {authorBlogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {authorBlogs.map((blog) => (
                <div 
                  key={blog.id}
                  onClick={() => onNavigate('blog-detail', blog.slug)}
                  className="p-6 rounded-3xl bg-white/50 dark:bg-zinc-900/15 border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm space-y-4 cursor-pointer hover:border-primary/20 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                      <span className="text-primary font-bold">{blog.category}</span>
                      <span>•</span>
                      <span>{blog.metrics.readingTime} min read</span>
                    </div>
                    
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {blog.title}
                    </h4>
                    
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-light">
                      {blog.subtitle}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-zinc-150 dark:border-zinc-850/80 flex items-center justify-between text-[11px] text-slate-450">
                    <span>Published: {formatDate(blog.publishedAt)}</span>
                    <span className="text-primary font-bold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">Read Log <ArrowRight size={10} /></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center border rounded-2xl text-slate-400 font-light text-xs">
              This author hasn't published any logs in the active index yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
