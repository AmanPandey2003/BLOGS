/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useCustomization } from '../contexts/CustomizationContext';
import { Settings, RefreshCw, Palette, Type, Sliders, Globe, Share2, Check, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminCustomize: React.FC = () => {
  const { config, updateConfig, resetConfig, saveConfig } = useCustomization();

  const handleSocialChange = (key: string, value: string) => {
    updateConfig({
      socialLinks: {
        ...config.socialLinks,
        [key]: value
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 font-custom select-text pb-20">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-150 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">Code-Free Layout Customizer</h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 font-light">
            Alter brand presets, colors, card padding configurations, and copy setups instantly without redeploying code.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={resetConfig}
            className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold hover:bg-zinc-150 dark:hover:bg-zinc-950 cursor-pointer transition-all flex items-center gap-1.5"
            title="Reset to original defaults"
          >
            <RefreshCw size={13} /> Reset Defaults
          </button>
          <button 
            onClick={saveConfig}
            className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-opacity-95 shadow cursor-pointer flex items-center gap-1.5"
          >
            <Check size={14} /> Publish Design
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Customizers */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section: Colors */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider border-b border-zinc-50 dark:border-zinc-850/50 pb-2 text-slate-800 dark:text-zinc-200 font-custom">
              <Palette size={16} className="text-primary" /> Core Brand Color Spectrum
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Primary Theme Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={config.primaryColor} 
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-xl border-0 cursor-pointer shrink-0"
                  />
                  <input 
                    type="text" 
                    value={config.primaryColor} 
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-primary w-full text-slate-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Secondary Accent</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={config.secondaryColor} 
                    onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                    className="w-10 h-10 rounded-xl border-0 cursor-pointer shrink-0"
                  />
                  <input 
                    type="text" 
                    value={config.secondaryColor} 
                    onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-primary w-full text-slate-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Attention Highlight</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={config.accentColor} 
                    onChange={(e) => updateConfig({ accentColor: e.target.value })}
                    className="w-10 h-10 rounded-xl border-0 cursor-pointer shrink-0"
                  />
                  <input 
                    type="text" 
                    value={config.accentColor} 
                    onChange={(e) => updateConfig({ accentColor: e.target.value })}
                    className="px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-primary w-full text-slate-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-950"
                  />
                </div>
              </div>
            </div>

            {/* Background and card colors */}
            <div className="grid sm:grid-cols-2 gap-5 pt-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Background Dark Canvas</label>
                <input 
                  type="color" 
                  value={config.backgroundColorDark} 
                  onChange={(e) => updateConfig({ backgroundColorDark: e.target.value })}
                  className="w-full h-8 rounded-lg border-0 cursor-pointer"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Card Dark Canvas</label>
                <input 
                  type="color" 
                  value={config.cardColorDark} 
                  onChange={(e) => updateConfig({ cardColorDark: e.target.value })}
                  className="w-full h-8 rounded-lg border-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section: Typography and Layout curves */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider border-b border-zinc-50 dark:border-zinc-850/50 pb-2 text-slate-800 dark:text-zinc-200 font-custom">
              <Sliders size={16} className="text-primary" /> Layout Curves & Typography
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Border Radius Curves</label>
                <select 
                  value={config.borderRadius}
                  onChange={(e) => updateConfig({ borderRadius: e.target.value })}
                  className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-700 dark:text-zinc-300 w-full focus:outline-none"
                >
                  <option value="0px">Sharp Edged (0px)</option>
                  <option value="4px">Slight Curve (4px)</option>
                  <option value="12px">Rounded Medium (12px)</option>
                  <option value="20px">High Soft Curved (20px)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Font Family Profile</label>
                <select 
                  value={config.fontSans}
                  onChange={(e) => updateConfig({ fontSans: e.target.value })}
                  className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-700 dark:text-zinc-300 w-full focus:outline-none"
                >
                  <option value="Inter">Inter (Swiss Sans Standard)</option>
                  <option value="Space Grotesk">Space Grotesk (Tech Modernist)</option>
                  <option value="Playfair Display">Playfair Display (Editorial Serif)</option>
                  <option value="JetBrains Mono">JetBrains Mono (Developer Mono)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Landing Copy Content */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider border-b border-zinc-50 dark:border-zinc-850/50 pb-2 text-slate-800 dark:text-zinc-200 font-custom">
              <Globe size={16} className="text-primary" /> Landing Page Copy Override
            </h3>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Logo Text</label>
                  <input 
                    type="text" 
                    value={config.logoText} 
                    onChange={(e) => updateConfig({ logoText: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary w-full"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Tagline Phrase</label>
                  <input 
                    type="text" 
                    value={config.tagline} 
                    onChange={(e) => updateConfig({ tagline: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary w-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Hero Heading</label>
                <input 
                  type="text" 
                  value={config.heroTitle} 
                  onChange={(e) => updateConfig({ heroTitle: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary w-full"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Hero Description</label>
                <textarea 
                  rows={3}
                  value={config.heroDescription} 
                  onChange={(e) => updateConfig({ heroDescription: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary w-full"
                />
              </div>
            </div>
          </div>

          {/* Section: Social Links */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider border-b border-zinc-50 dark:border-zinc-850/50 pb-2 text-slate-800 dark:text-zinc-200 font-custom">
              <Share2 size={16} className="text-primary" /> Social Links Directory
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {Object.keys(config.socialLinks).map((key) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-semibold capitalize">{key} Address</label>
                  <input 
                    type="url" 
                    value={(config.socialLinks as any)[key]} 
                    onChange={(e) => handleSocialChange(key, e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 text-xs text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary w-full font-mono"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Mockup Preview Panel (Highly interactive, visual feedback!) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="p-5 border border-zinc-150 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 rounded-3xl space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Award size={14} className="text-primary" /> Live Mockup Sandbox
            </h4>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed">Adjust controls on the left to see instant color/font bindings change on this simulated post card below.</p>

            {/* Interactive Mockup Post Card */}
            <div 
              className="p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 shadow-md space-y-5 overflow-hidden text-left"
              style={{ borderRadius: config.borderRadius }}
            >
              <div className="flex gap-2 items-center">
                <span 
                  className="px-2 py-0.5 rounded text-[8px] font-black uppercase text-white shadow-sm"
                  style={{ background: config.primaryColor }}
                >
                  Technology
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400">Intermediate • 5 min read</span>
              </div>

              <h4 className="text-base font-black leading-tight text-slate-900 dark:text-white">
                Designing Zero-Overhead Compiler Passes with V8 isolates
              </h4>

              <p className="text-xs text-slate-500 dark:text-zinc-400 font-light leading-relaxed">
                Walkthrough detailing inline execution pipelines, AST configurations, and context binding parameters for standard JS logic blocks.
              </p>

              {/* Mock button */}
              <button 
                className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`, borderRadius: config.borderRadius }}
              >
                Access Deep-Dive Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
