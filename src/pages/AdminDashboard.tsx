/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Blog, Comment, Subscriber, DifficultyLevel } from '../types';
import { 
  Eye, Users, FileText, MessageSquare, Plus, Search, Filter, ArrowUpDown, ChevronDown, 
  Trash, Edit2, Copy, BookOpen, Check, Archive, Send, Sparkles, Inbox, RefreshCw, AlertCircle,
  ShieldAlert, Lock, ShieldCheck, Terminal
} from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ANALYTICS_VIEWS_HISTORY, CATEGORIES } from '../data/mockData';

interface AdminDashboardProps {
  blogs: Blog[];
  comments: Comment[];
  subscribers: Subscriber[];
  onNavigate: (page: string, blogSlug?: string) => void;
  onDeleteBlog: (id: string) => void;
  onTogglePublish: (id: string) => void;
  onDuplicateBlog: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onBulkPublish: (ids: string[], publish: boolean) => void;
  onBulkCategoryChange: (ids: string[], category: string) => void;
  onApproveComment: (id: string) => void;
  onDeleteComment: (id: string) => void;
  onImportSubscribers: (emails: string[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  blogs,
  comments,
  subscribers,
  onNavigate,
  onDeleteBlog,
  onTogglePublish,
  onDuplicateBlog,
  onBulkDelete,
  onBulkPublish,
  onBulkCategoryChange,
  onApproveComment,
  onDeleteComment,
  onImportSubscribers
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'blogs' | 'subscribers' | 'comments' | 'security'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Security log list
  const [securityLogs, setSecurityLogs] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('stringtotech_security_logs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse security logs in admin dashboard", e);
      return [];
    }
  });

  const handleClearSecurityLogs = () => {
    localStorage.removeItem('stringtotech_security_logs');
    setSecurityLogs([]);
  };
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'publishedAt' | 'views' | 'likes'>('publishedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Bulk selection state
  const [selectedBlogIds, setSelectedBlogIds] = useState<string[]>([]);
  const [bulkCategory, setBulkCategory] = useState(CATEGORIES[0]);

  // Newsletter import state
  const [importText, setImportText] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  // Compute stats metrics
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter(b => b.isPublished).length;
    const drafts = total - published;
    const views = blogs.reduce((acc, curr) => acc + curr.metrics.views, 0);
    const likes = blogs.reduce((acc, curr) => acc + curr.metrics.likes, 0);
    const subCount = subscribers.filter(s => s.status === 'Active').length;
    const commCount = comments.length;
    const pendingComments = comments.filter(c => !c.isApproved).length;

    return { total, published, drafts, views, likes, subCount, commCount, pendingComments };
  }, [blogs, subscribers, comments]);

  // Filter & Sort Blogs List
  const processedBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || blog.category === categoryFilter;
        const matchesStatus = statusFilter === 'All' || 
                              (statusFilter === 'Published' && blog.isPublished) || 
                              (statusFilter === 'Drafts' && !blog.isPublished);
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        let fieldA: any = a[sortBy];
        let fieldB: any = b[sortBy];
        
        if (sortBy === 'views' || sortBy === 'likes') {
          fieldA = a.metrics[sortBy];
          fieldB = b.metrics[sortBy];
        } else {
          fieldA = new Date(a.publishedAt).getTime();
          fieldB = new Date(b.publishedAt).getTime();
        }

        if (sortOrder === 'asc') {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      });
  }, [blogs, searchQuery, categoryFilter, statusFilter, sortBy, sortOrder]);

  const handleSelectAllBlogs = (checked: boolean) => {
    if (checked) {
      setSelectedBlogIds(processedBlogs.map(b => b.id));
    } else {
      setSelectedBlogIds([]);
    }
  };

  const handleSelectBlog = (blogId: string, checked: boolean) => {
    if (checked) {
      setSelectedBlogIds(prev => [...prev, blogId]);
    } else {
      setSelectedBlogIds(prev => prev.filter(id => id !== blogId));
    }
  };

  // Bulk executions
  const executeBulkDelete = () => {
    if (selectedBlogIds.length === 0) return;
    onBulkDelete(selectedBlogIds);
    setSelectedBlogIds([]);
  };

  const executeBulkPublish = (publish: boolean) => {
    if (selectedBlogIds.length === 0) return;
    onBulkPublish(selectedBlogIds, publish);
    setSelectedBlogIds([]);
  };

  const executeBulkCategoryChange = () => {
    if (selectedBlogIds.length === 0) return;
    onBulkCategoryChange(selectedBlogIds, bulkCategory);
    setSelectedBlogIds([]);
  };

  const handleImportSubscribers = (e: React.FormEvent) => {
    e.preventDefault();
    const emails = importText
      .split(/[\n,]+/)
      .map(e => e.trim())
      .filter(e => e.includes('@'));
    
    if (emails.length > 0) {
      onImportSubscribers(emails);
      setImportText('');
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 4000);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-custom select-text">
      
      {/* Header Info Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-150 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">StringToTech Console</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 font-light">Authoritative system dashboard to monitor search analytics, edit logs, and moderate reader comments.</p>
        </div>
        <button 
          onClick={() => onNavigate('admin-editor')} 
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-opacity-95 shadow cursor-pointer active:scale-95 transition-all"
        >
          <Plus size={14} /> New Article
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-1.5 border-b border-zinc-100 dark:border-zinc-850 overflow-x-auto">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: <Eye size={14} /> },
          { id: 'blogs', label: 'Logs Directory', icon: <FileText size={14} /> },
          { id: 'subscribers', label: 'Subscriber Guild', icon: <Users size={14} /> },
          { id: 'comments', label: 'Comments Moderate', icon: <MessageSquare size={14} /> },
          { id: 'security', label: 'Security Portal Logs', icon: <ShieldAlert size={14} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap -mb-[2px] ${
              activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-850 dark:hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Cumulative Views', count: stats.views.toLocaleString(), sub: `${stats.likes.toLocaleString()} likes total`, icon: <Eye className="text-primary" /> },
              { label: 'Active Subscribers', count: stats.subCount.toLocaleString(), sub: '100% Delivery Rate', icon: <Users className="text-emerald-500" /> },
              { label: 'Active Documents', count: `${stats.published} / ${stats.total}`, sub: `${stats.drafts} drafting logs`, icon: <FileText className="text-secondary" /> },
              { label: 'Comments Moderated', count: stats.commCount.toString(), sub: `${stats.pendingComments} pending moderation`, icon: <MessageSquare className="text-accent" /> }
            ].map((metric, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between relative overflow-hidden"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">{metric.label}</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">{metric.count}</div>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 block font-light">{metric.sub}</span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-900 shrink-0">{metric.icon}</div>
              </div>
            ))}
          </div>

          {/* Recharts Traffic Visualization */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Area Chart */}
            <div className="lg:col-span-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Traffic Progression</h3>
                  <p className="text-xs text-slate-400 font-light">Measures pageviews against subscriber sign-ups over the weekly interval.</p>
                </div>
                <span className="px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 rounded-md">
                  Server Live
                </span>
              </div>

              <div className="h-72 w-full text-xs font-sans">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ANALYTICS_VIEWS_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                    <XAxis dataKey="name" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip contentStyle={{ background: '#18181b', borderRadius: '12px', border: '1px solid #27272a', color: '#fff' }} />
                    <Area type="monotone" dataKey="views" stroke="var(--primary-color)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sidebar recent logs */}
            <div className="lg:col-span-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-zinc-50 dark:border-zinc-850/50 pb-1">Activity Log</h4>
                <div className="space-y-4">
                  {[
                    { action: 'AMAN KUMAR PANDEY published RSA guide', time: '2 hours ago', icon: <Sparkles className="text-primary shrink-0" size={14} /> },
                    { action: 'New comment approved on Node Clusters', time: '4 hours ago', icon: <MessageSquare className="text-secondary shrink-0" size={14} /> },
                    { action: 'Subscribers database backup completed', time: '1 day ago', icon: <RefreshCw className="text-emerald-500 shrink-0" size={14} /> },
                    { action: 'Newsletter weekly bundle scheduled', time: '2 days ago', icon: <Send className="text-accent shrink-0" size={14} /> }
                  ].map((act, i) => (
                    <div key={i} className="flex gap-3 text-xs items-start leading-relaxed">
                      {act.icon}
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-700 dark:text-zinc-200 block">{act.action}</span>
                        <span className="text-[10px] text-slate-400 block">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-primary/5 rounded-2xl border border-primary/10 text-xs leading-relaxed space-y-1">
                <span className="font-bold text-primary block flex items-center gap-1"><Sparkles size={12} /> Optimization Note</span>
                <p className="text-slate-500 dark:text-zinc-400 font-light">Your SEO scorecard averages 88%. Try adding more internal links inside draft articles to strengthen domain authority index weights.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Logs Directory (Manage articles list) */}
      {activeTab === 'blogs' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="grid md:grid-cols-4 gap-4 items-center">
            
            {/* Search */}
            <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all md:col-span-2">
              <Search size={14} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search log titles or subtitles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-xs focus:outline-none w-full text-slate-800 dark:text-zinc-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-2">
              <Filter size={14} className="text-slate-400" />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent text-xs border-none focus:outline-none text-slate-600 dark:text-zinc-300 w-full"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3.5 py-2">
              <Filter size={14} className="text-slate-400" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs border-none focus:outline-none text-slate-600 dark:text-zinc-300 w-full"
              >
                <option value="All">All States</option>
                <option value="Published">Published</option>
                <option value="Drafts">Drafts</option>
              </select>
            </div>
          </div>

          {/* Bulk Operations Bar */}
          {selectedBlogIds.length > 0 && (
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-300">
                  Selected <span className="text-primary">{selectedBlogIds.length}</span> articles
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => executeBulkPublish(true)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold cursor-pointer hover:bg-white transition-all flex items-center gap-1"
                >
                  <Check size={12} /> Bulk Publish
                </button>
                <button 
                  onClick={() => executeBulkPublish(false)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold cursor-pointer hover:bg-white transition-all flex items-center gap-1"
                >
                  <Archive size={12} /> Bulk Unpublish
                </button>
                <button 
                  onClick={executeBulkDelete}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold cursor-pointer hover:bg-rose-500/20 transition-all flex items-center gap-1"
                >
                  <Trash size={12} /> Bulk Delete
                </button>

                {/* Bulk category */}
                <div className="flex items-center gap-2 border-l border-zinc-200 pl-3">
                  <select 
                    value={bulkCategory}
                    onChange={(e) => setBulkCategory(e.target.value)}
                    className="px-2 py-1 bg-white dark:bg-zinc-900 rounded border border-zinc-200 text-[10px] focus:outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button 
                    onClick={executeBulkCategoryChange}
                    className="px-2.5 py-1 bg-primary text-white rounded text-[10px] font-bold cursor-pointer"
                  >
                    Change Cat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Directory list of posts */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-850 text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                    <th className="px-5 py-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedBlogIds.length === processedBlogs.length && processedBlogs.length > 0}
                        onChange={(e) => handleSelectAllBlogs(e.target.checked)}
                        className="rounded border-zinc-300 dark:border-zinc-700 text-primary"
                      />
                    </th>
                    <th className="px-5 py-4">Title / Category</th>
                    <th className="px-5 py-4">State</th>
                    <th className="px-5 py-4 text-right">Views</th>
                    <th className="px-5 py-4 text-right">Likes</th>
                    <th className="px-5 py-4">Published At</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {processedBlogs.length > 0 ? (
                    processedBlogs.map((blog) => {
                      const isChecked = selectedBlogIds.includes(blog.id);
                      return (
                        <tr 
                          key={blog.id} 
                          className={`border-b border-zinc-100 dark:border-zinc-900 last:border-none hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-all ${
                            isChecked ? 'bg-primary/5 dark:bg-primary/5' : ''
                          }`}
                        >
                          <td className="px-5 py-4">
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={(e) => handleSelectBlog(blog.id, e.target.checked)}
                              className="rounded border-zinc-300 dark:border-zinc-700 text-primary"
                            />
                          </td>
                          <td className="px-5 py-4 space-y-1 max-w-sm">
                            <h4 
                              onClick={() => onNavigate('blog-detail', blog.slug)}
                              className="font-bold text-slate-850 dark:text-zinc-100 hover:text-primary cursor-pointer line-clamp-1 text-[13px]"
                            >
                              {blog.title}
                            </h4>
                            <div className="flex gap-2 items-center text-[10px] text-slate-400 font-light">
                              <span className="font-semibold uppercase text-primary bg-primary/5 px-1.5 py-0.5 rounded">{blog.category}</span>
                              <span>•</span>
                              <span>{blog.difficulty}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => onTogglePublish(blog.id)}
                              className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-md tracking-wider cursor-pointer ${
                                blog.isPublished 
                                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                  : 'bg-zinc-100 dark:bg-zinc-800 text-slate-500'
                              }`}
                            >
                              {blog.isPublished ? 'Published' : 'Draft'}
                            </button>
                          </td>
                          <td className="px-5 py-4 text-right font-semibold text-slate-700 dark:text-zinc-300">{blog.metrics.views.toLocaleString()}</td>
                          <td className="px-5 py-4 text-right font-semibold text-slate-700 dark:text-zinc-300">{blog.metrics.likes.toLocaleString()}</td>
                          <td className="px-5 py-4 text-slate-400 font-light">{formatDate(blog.publishedAt)}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-center gap-1">
                              {/* Edit */}
                              <button 
                                onClick={() => onNavigate('admin-editor', blog.slug)}
                                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 cursor-pointer"
                                title="Edit Article"
                              >
                                <Edit2 size={13} />
                              </button>
                              
                              {/* Duplicate */}
                              <button 
                                onClick={() => onDuplicateBlog(blog.id)}
                                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 cursor-pointer"
                                title="Duplicate Article"
                              >
                                <Copy size={13} />
                              </button>

                              {/* Delete */}
                              <button 
                                onClick={() => onDeleteBlog(blog.id)}
                                className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 cursor-pointer"
                                title="Delete Article"
                              >
                                <Trash size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center p-12 text-slate-400 font-light">
                        No articles match the active search and filter constraints.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Subscribers Database */}
      {activeTab === 'subscribers' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* List display */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm space-y-4 p-5">
            <h3 className="text-sm font-bold border-b border-zinc-50 dark:border-zinc-850/50 pb-2 flex items-center justify-between">
              <span>Verified System Subscribers ({subscribers.length})</span>
              <span className="text-[10px] text-emerald-500 font-semibold">• 100% active</span>
            </h3>

            <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
              {subscribers.map((sub, i) => (
                <div key={sub.id || i} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">{sub.email}</span>
                    <span className="text-[9px] text-slate-400 block font-light">Joined: {formatDate(sub.joinedAt)}</span>
                  </div>
                  <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-500 rounded-md">
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Import Panel */}
          <div className="lg:col-span-5 space-y-6">
            <form onSubmit={handleImportSubscribers} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-1 flex items-center gap-1.5">
                <Inbox size={14} className="text-primary" /> CSV/Bulk Email Import
              </h4>
              <p className="text-xs text-slate-400 font-light">Paste raw emails separated by commas or new lines. They will be registered with Active status instantly.</p>
              
              <textarea 
                rows={6}
                required
                placeholder="dev@stripe.com, architect@github.com, founder@openai.com"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-slate-800 dark:text-zinc-100 font-mono"
              />

              {importSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-xs text-emerald-500">
                  <Check size={14} /> Bulk import complete!
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-opacity-95 shadow cursor-pointer"
              >
                Sync Imported Emails
              </button>
            </form>

            <div className="p-6 rounded-2xl bg-slate-950 text-white shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-primary/10 blur-xl" />
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Mailchimp Sync Ready</h4>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">Your subscriber webhook triggers are pre-configured to synchronize. Enter Mailchimp keys in .env configs to establish real-time external pipeline replication.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Comments Moderation */}
      {activeTab === 'comments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="font-bold flex items-center gap-2 text-sm text-slate-800 dark:text-zinc-100 uppercase tracking-wider">
              <MessageSquare size={16} className="text-primary" /> Moderation Panel
            </h3>
            <span className="text-xs text-slate-400">Approve or delete user discussions</span>
          </div>

          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => {
                const targetBlog = blogs.find(b => b.id === comment.blogId);
                return (
                  <div key={comment.id} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex flex-wrap gap-2 items-center text-xs text-slate-500 dark:text-zinc-400">
                        <span className="font-bold text-slate-800 dark:text-zinc-200">{comment.authorName}</span>
                        <span>({comment.authorEmail})</span>
                        <span>•</span>
                        <span>{formatDate(comment.createdAt)}</span>
                        {targetBlog && (
                          <>
                            <span>•</span>
                            <span>On Article: <span onClick={() => onNavigate('blog-detail', targetBlog.slug)} className="text-primary hover:underline cursor-pointer">{targetBlog.title}</span></span>
                          </>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-zinc-400 font-light leading-relaxed">
                        {comment.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 md:self-center shrink-0">
                      {!comment.isApproved ? (
                        <button 
                          onClick={() => onApproveComment(comment.id)}
                          className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-lg text-xs font-bold cursor-pointer hover:bg-emerald-500/20 transition-all flex items-center gap-1"
                        >
                          <Check size={12} /> Approve
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-950 text-slate-400 text-[10px] uppercase font-bold">Approved</span>
                      )}
                      
                      <button 
                        onClick={() => onDeleteComment(comment.id)}
                        className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg text-xs font-bold cursor-pointer hover:bg-rose-500/20 transition-all flex items-center gap-1"
                      >
                        <Trash size={12} /> Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center p-12 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <AlertCircle className="text-slate-300 mx-auto mb-3" size={32} />
                <h5 className="font-bold text-slate-800 dark:text-zinc-200">No comments found</h5>
                <p className="text-xs text-slate-400 mt-1">There are no discussion comments inside the registry.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Security logs */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Lock size={18} className="text-primary animate-pulse" /> Security Access Log Monitor
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-light">
                  Real-time tamper indicators and identity checks across admin interfaces. All console access attempts are cryptographically checked and registered here.
                </p>
              </div>
              <button
                onClick={handleClearSecurityLogs}
                disabled={securityLogs.length === 0}
                className="px-3.5 py-2 rounded-xl text-rose-500 border border-rose-500/20 hover:bg-rose-500/10 disabled:opacity-50 text-xs font-bold transition-all cursor-pointer whitespace-nowrap animate-fade-in"
              >
                Clear Audit History
              </button>
            </div>

            {securityLogs.length > 0 ? (
              <div className="overflow-x-auto border border-zinc-150 dark:border-zinc-850 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/20 animate-fade-in">
                <table className="w-full text-xs text-left border-collapse font-sans">
                  <thead>
                    <tr className="bg-zinc-100/60 dark:bg-zinc-900/60 border-b border-zinc-150 dark:border-zinc-850 text-slate-400 uppercase font-black text-[9px] tracking-widest">
                      <th className="px-5 py-3">Event Time</th>
                      <th className="px-5 py-3">Event ID</th>
                      <th className="px-5 py-3">Host Origin</th>
                      <th className="px-5 py-3 text-center">Status</th>
                      <th className="px-5 py-3">Client UA Context / Engine</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
                    {securityLogs.map((log) => (
                      <tr 
                        key={log.id} 
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors font-mono text-[11px]"
                      >
                        <td className="px-5 py-3.5 text-slate-500">
                          {new Date(log.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false
                          })}
                        </td>
                        <td className="px-5 py-3.5 text-slate-400 font-semibold">{log.id}</td>
                        <td className="px-5 py-3.5 text-slate-700 dark:text-zinc-300 font-bold">{log.ip}</td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            log.status === 'SUCCESS' 
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                              : log.status === 'FAILED' 
                              ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse' 
                              : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                          }`}>
                            {log.status === 'SUCCESS' && <ShieldCheck size={10} />}
                            {log.status === 'FAILED' && <ShieldAlert size={10} />}
                            {log.status === 'SETUP' && <Terminal size={10} />}
                            {log.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 max-w-xs truncate" title={log.device}>
                          {log.device}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 px-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
                <ShieldCheck className="text-slate-300 mx-auto mb-3" size={36} />
                <h5 className="font-bold text-slate-800 dark:text-zinc-200">System Logs Clear</h5>
                <p className="text-xs text-slate-400 mt-1">No login records are saved. Log into your principal keys to register audit timelines.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
