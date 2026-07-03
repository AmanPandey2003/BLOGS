/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Blog, Block, DifficultyLevel } from '../types';
import { BlockRenderer } from '../components/BlockRenderer';
import { SEOAnalyzer } from '../components/SEOAnalyzer';
import { 
  Save, Check, Calendar, ArrowLeft, Eye, Edit2, Plus, Trash, Sparkles, AlertCircle, 
  Heading1, Heading2, Heading3, Code, Quote, AlertTriangle, Table, Variable, ListTodo, Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/mockData';

interface AdminEditorProps {
  existingSlug: string | null;
  blogs: Blog[];
  onSaveBlog: (blog: Blog) => void;
  onNavigate: (page: string) => void;
}

export const AdminEditor: React.FC<AdminEditorProps> = ({
  existingSlug,
  blogs,
  onSaveBlog,
  onNavigate
}) => {
  // Check if we are editing an existing article
  const originalBlog = useMemo(() => {
    if (!existingSlug) return null;
    return blogs.find(b => b.slug === existingSlug) || null;
  }, [blogs, existingSlug]);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagsText, setTagsText] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop');
  const [isPublished, setIsPublished] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  // SEO metadata states
  const [focusKeyword, setFocusKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');

  // Structured blocks state (Notion-style array of items)
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 'start-p1', type: 'paragraph', content: 'Begin drafting your technical walkthrough here. Highlight key operations with code blocks, equations, or tables.' }
  ]);

  // Track draft preview toggle
  const [showPreview, setShowPreview] = useState(false);

  // Load existing blog details if editing
  useEffect(() => {
    if (originalBlog) {
      setTitle(originalBlog.title);
      setSubtitle(originalBlog.subtitle);
      setCategory(originalBlog.category);
      setTagsText(originalBlog.tags.join(', '));
      setDifficulty(originalBlog.difficulty);
      setCoverImage(originalBlog.coverImage);
      setIsPublished(originalBlog.isPublished);
      setIsPinned(originalBlog.isPinned);
      setIsFeatured(originalBlog.isFeatured);
      setFocusKeyword(originalBlog.seo.focusKeyword || '');
      setMetaDescription(originalBlog.seo.metaDescription || '');
      setCanonicalUrl(originalBlog.seo.canonicalUrl || '');
      setBlocks(originalBlog.blocks);
    }
  }, [originalBlog]);

  // Compute stats: words count, char count, reading time
  const editorStats = useMemo(() => {
    const concatenatedContent = blocks.map(b => b.content).join(' ');
    const chars = concatenatedContent.length;
    const words = concatenatedContent.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(words / 200)); // Average 200 WPM
    return { chars, words, readingTime, text: concatenatedContent };
  }, [blocks]);

  // Auto-generate slug and defaults
  const generatedSlug = useMemo(() => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, [title]);

  // Blocks management
  const handleAddBlock = (type: Block['type']) => {
    const id = `block-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    let content = '';
    let properties: any = {};

    switch (type) {
      case 'heading1':
        content = 'New Section Title';
        break;
      case 'heading2':
        content = 'New Subheading';
        break;
      case 'heading3':
        content = 'Sub-topic detail';
        break;
      case 'code':
        content = `// Enter sample snippet here\nfunction executeTask() {\n  return "V8 optimization active";\n}`;
        properties = { language: 'typescript' };
        break;
      case 'callout':
        content = 'Important advice regarding node scaling or memory footprint operations.';
        properties = { style: 'info' };
        break;
      case 'quote':
        content = 'Software architecture is the art of drawing lines between components.';
        properties = { caption: 'Ralph Johnson' };
        break;
      case 'table':
        content = '';
        properties = {
          columns: ['Metric', 'Primary Node', 'Secondary Node'],
          rows: [
            ['Processor', 'Core-i9 vCPU', 'Core-i7 vCPU'],
            ['Latency', '1.2ms', '4.5ms']
          ]
        };
        break;
      case 'equation':
        content = 'E = mc^2 \\quad \\text{and} \\quad \\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}';
        break;
      case 'list-item':
        content = 'Checkbox or list milestone detail';
        properties = { checked: false };
        break;
      default:
        content = 'New paragraph block content.';
    }

    setBlocks(prev => [...prev, { id, type, content, properties }]);
  };

  const handleUpdateBlockContent = (id: string, text: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content: text } : b));
  };

  const handleUpdateBlockProperty = (id: string, propKey: string, propValue: any) => {
    setBlocks(prev => prev.map(b => b.id === id ? {
      ...b,
      properties: {
        ...b.properties,
        [propKey]: propValue
      }
    } : b));
  };

  const handleDeleteBlock = (id: string) => {
    if (blocks.length <= 1) return; // Prevent empty block schemas
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const tagsArray = tagsText
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const savedBlog: Blog = {
      id: originalBlog ? originalBlog.id : String(Date.now()),
      title,
      subtitle,
      slug: originalBlog ? originalBlog.slug : generatedSlug,
      category,
      tags: tagsArray,
      difficulty,
      coverImage,
      isPublished,
      isPinned,
      isFeatured,
      blocks,
      publishedAt: originalBlog ? originalBlog.publishedAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: originalBlog ? originalBlog.metrics : { views: 0, likes: 0, readingTime: editorStats.readingTime },
      author: originalBlog ? originalBlog.author : {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
        role: 'Lead Frontend Architect',
        bio: 'Sarah is an active open-source contributor, specialized in modern React performance architectures.'
      },
      seo: {
        metaTitle: title + ' | StringToTech',
        metaDescription: metaDescription || subtitle,
        keywords: tagsText,
        focusKeyword: focusKeyword || category,
        canonicalUrl: canonicalUrl || `https://stringtotech.com/blog/${generatedSlug}`
      }
    };

    onSaveBlog(savedBlog);
    if (originalBlog) {
      onNavigate('admin');
    } else {
      onNavigate('post-creation-success', savedBlog.slug);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-custom select-text pb-20">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-150 dark:border-zinc-800 pb-6">
        <button 
          onClick={() => onNavigate('admin')} 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to console
        </button>

        <div className="flex flex-wrap gap-2.5 items-center">
          <button 
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-3.5 py-2 rounded-xl border border-zinc-250 dark:border-zinc-800 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-950 flex items-center gap-1.5 cursor-pointer"
          >
            <Eye size={13} /> {showPreview ? 'Draft Editor' : 'Live Document Preview'}
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-opacity-95 shadow cursor-pointer flex items-center gap-1.5"
          >
            <Save size={13} /> {originalBlog ? 'Save Changes' : 'Publish Article'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Composer Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Metadata Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1 flex items-center gap-1.5">
              <Sparkles size={14} className="text-primary animate-pulse" /> Document Core Configuration
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">H1 Document Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Building High-Throughput Web Sockets Servers"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs font-bold text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Document Subtitle / Brief Excerpt</label>
                <textarea 
                  rows={2}
                  placeholder="Enter a brief architectural overview describing the memory profiles or scaling models discussed."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:ring-1 focus:ring-primary focus:outline-none w-full"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-1 focus:ring-primary focus:outline-none w-full"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Complexity Grade</label>
                  <select 
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="px-3 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs focus:ring-1 focus:ring-primary focus:outline-none w-full"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tags (separated by comma)</label>
                  <input 
                    type="text" 
                    placeholder="react, performance, css"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:ring-1 focus:ring-primary focus:outline-none w-full font-mono"
                  />
                </div>
              </div>

              {/* Cover Image Input */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cover Banner Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:ring-1 focus:ring-primary focus:outline-none w-full font-mono"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded text-primary focus:ring-primary/20 h-4 w-4"
                  />
                  <span>Publish immediately</span>
                </label>
                
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-primary focus:ring-primary/20 h-4 w-4"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded text-primary focus:ring-primary/20 h-4 w-4"
                  />
                  <span>Pin to top of feed</span>
                </label>
              </div>
            </div>
          </div>

          {/* Block Editor or Live Preview */}
          {showPreview ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-6">
              <span className="inline-block px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold tracking-widest rounded">LIVE PREVIEW INTEGRATION</span>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <BlockRenderer blocks={blocks} />
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Document Editor Blocks</h3>
                
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span>Words: <strong className="text-slate-700 dark:text-zinc-200">{editorStats.words}</strong></span>
                  <span>•</span>
                  <span>Est: <strong className="text-slate-700 dark:text-zinc-200">{editorStats.readingTime} min</strong></span>
                </div>
              </div>

              {/* Toolbar for block injection */}
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 flex flex-wrap gap-1.5 items-center select-none">
                <span className="text-[9px] uppercase font-bold text-slate-400 px-1">Inject:</span>
                <button type="button" onClick={() => handleAddBlock('paragraph')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><Plus size={10} /> Para</button>
                <button type="button" onClick={() => handleAddBlock('heading1')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><Heading1 size={11} /> H1</button>
                <button type="button" onClick={() => handleAddBlock('heading2')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><Heading2 size={11} /> H2</button>
                <button type="button" onClick={() => handleAddBlock('code')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><Code size={11} /> Code</button>
                <button type="button" onClick={() => handleAddBlock('callout')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><AlertTriangle size={11} /> Callout</button>
                <button type="button" onClick={() => handleAddBlock('quote')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><Quote size={11} /> Quote</button>
                <button type="button" onClick={() => handleAddBlock('table')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><Table size={11} /> Table</button>
                <button type="button" onClick={() => handleAddBlock('equation')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><Variable size={11} /> Math</button>
                <button type="button" onClick={() => handleAddBlock('list-item')} className="p-1.5 rounded hover:bg-white dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"><ListTodo size={11} /> Todo</button>
              </div>

              {/* Dynamic editing fields list */}
              <div className="space-y-4">
                {blocks.map((block, index) => (
                  <div key={block.id} className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/40 relative group space-y-2">
                    {/* Block Info bar */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono select-none">
                      <span className="font-bold uppercase tracking-wider text-primary">{block.type} Block</span>
                      <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                        <button 
                          type="button" 
                          onClick={() => handleDeleteBlock(block.id)}
                          className="p-1 hover:text-rose-500 cursor-pointer"
                          title="Delete Block"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Block Content Inputs */}
                    {block.type === 'table' ? (
                      <div className="p-3 bg-white dark:bg-zinc-950 border rounded-lg text-xs space-y-3">
                        <span className="font-semibold block">Interactive Table Grid:</span>
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-400 block uppercase">Headers (Comma Separated)</label>
                          <input 
                            type="text" 
                            value={block.properties?.columns?.join(', ')} 
                            onChange={(e) => handleUpdateBlockProperty(block.id, 'columns', e.target.value.split(',').map(c => c.trim()))}
                            className="w-full p-2 border rounded font-mono text-[11px]"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400">Values are bound dynamically. Switch to Preview to view rendered grids.</p>
                      </div>
                    ) : (
                      <textarea
                        rows={block.type === 'code' ? 6 : block.type === 'paragraph' ? 3 : 1}
                        value={block.content}
                        onChange={(e) => handleUpdateBlockContent(block.id, e.target.value)}
                        placeholder={`Enter ${block.type} text here...`}
                        className="w-full p-3 border border-zinc-200/80 rounded-lg bg-white dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 font-sans focus:outline-none focus:ring-1 focus:ring-primary/50"
                        style={{ fontFamily: block.type === 'code' || block.type === 'equation' ? 'monospace' : 'inherit' }}
                      />
                    )}

                    {/* Code block settings */}
                    {block.type === 'code' && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">Language:</span>
                        <input 
                          type="text" 
                          value={block.properties?.language || 'typescript'}
                          onChange={(e) => handleUpdateBlockProperty(block.id, 'language', e.target.value)}
                          className="px-2 py-1 rounded bg-white dark:bg-zinc-950 border border-zinc-200 text-[10px] font-mono w-24"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: SEO Sidebar Scorecard */}
        <div className="lg:col-span-4 space-y-6">
          <SEOAnalyzer 
            title={title}
            metaDescription={metaDescription || subtitle}
            focusKeyword={focusKeyword}
            content={editorStats.text}
          />

          {/* Detailed SEO Parameters fields */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-1">SEO Query Metadata</h4>
            
            <div className="space-y-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Focus Keyword Target</label>
                <input 
                  type="text" 
                  placeholder="e.g. Node.js Clusters"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta Description Excerpt</label>
                <input 
                  type="text" 
                  placeholder="Enter customized search meta description summary..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Canonical URL Address</label>
                <input 
                  type="url" 
                  placeholder="https://stringtotech.com/blog/..."
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none w-full font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
