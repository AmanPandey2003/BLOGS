/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldAlert, Sparkles, HelpCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Partnership');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://formspree.io/f/xrewowdw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setError(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setError('An error occurred while dispatching the transmission.');
        }
      }
    } catch (err) {
      setError('Network transmission failure. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-custom select-text">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary">
          <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} /> Establish Connection
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Establish Secure Connection
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 font-light leading-relaxed">
          Inquire about licensing documentation, corporate partnerships, guest authorship protocols, or security vulnerability disclosures.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Form Panel */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md shadow-sm space-y-6 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">Transmission Portal</h3>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ken Thompson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200/85 dark:border-zinc-800/80 focus:border-primary/60 bg-white/50 dark:bg-zinc-950/50 text-xs focus:ring-4 focus:ring-primary/10 focus:outline-none text-slate-850 dark:text-zinc-100 transition-all duration-300 disabled:opacity-60"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Secure Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="ken@bell-labs.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200/85 dark:border-zinc-800/80 focus:border-primary/60 bg-white/50 dark:bg-zinc-950/50 text-xs focus:ring-4 focus:ring-primary/10 focus:outline-none text-slate-850 dark:text-zinc-100 transition-all duration-300 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Subject Context</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/85 dark:border-zinc-800/80 focus:border-primary/60 bg-white/50 dark:bg-zinc-950/50 text-xs focus:ring-4 focus:ring-primary/10 focus:outline-none text-slate-850 dark:text-zinc-100 transition-all duration-300 disabled:opacity-60"
                >
                  <option value="General Partnership">General Partnership & Sponsorships</option>
                  <option value="Authorship">Guest Authorship Proposal</option>
                  <option value="Security">Security Audit / Vulnerability Report</option>
                  <option value="Licensing">Commercial Licensing Queries</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Encrypted Message Payload</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Describe your inquiry with concrete system specifications..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/85 dark:border-zinc-800/80 focus:border-primary/60 bg-white/50 dark:bg-zinc-950/50 text-xs focus:ring-4 focus:ring-primary/10 focus:outline-none text-slate-850 dark:text-zinc-100 transition-all duration-300 disabled:opacity-60"
                />
              </div>

              {error && (
                <div className="p-3 text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 animate-fade-in">
                  <ShieldAlert size={14} className="shrink-0 animate-pulse" />
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-opacity-95 shadow-md hover:scale-102 cursor-pointer flex items-center justify-center gap-2 active:scale-98 transition-all shrink-0 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={12} className="animate-spin" /> Dispatching Payload...
                  </>
                ) : (
                  <>
                    <Send size={12} /> Dispatch Transmission
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center space-y-4">
              <span className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full inline-block animate-bounce">&check;</span>
              <h4 className="font-extrabold text-slate-900 dark:text-white">Transmission Received</h4>
              <p className="text-xs text-slate-400 font-light max-w-sm mx-auto">
                Thank you. Your message has been routed to our principal developer team. We will establish a secure connection reply within 24 standard working hours.
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Info Sidebar (Coordinates, FAQ, Mock Map!) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Coordinates info cards */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1">Primary Node Coordinates</h4>
            
            <div className="space-y-4">
              {[
                { label: 'Secure Support Mail', val: 'support@stringtotech.com', icon: <Mail className="text-primary shrink-0" size={16} /> },
                { label: 'Global Headquarters', val: '300 Sand Hill Road, Menlo Park, CA', icon: <MapPin className="text-secondary shrink-0" size={16} /> },
                { label: 'Platform Hotline', val: '+1 (555) 300-TECHS', icon: <Phone className="text-accent shrink-0" size={16} /> }
              ].map((coor, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border">{coor.icon}</div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{coor.label}</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-zinc-200 block">{coor.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Abstract Map Placeholder */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative aspect-video bg-zinc-950 flex items-center justify-center text-center p-6 select-none group shadow-sm">
            <div className="absolute inset-0 opacity-15 grid grid-cols-12 gap-1.5 p-3 font-mono text-[9px] text-white">
              {Array.from({ length: 48 }).map((_, i) => (
                <span key={i} className="truncate">0xFA{i}</span>
              ))}
            </div>
            
            <div className="relative z-10 space-y-2">
              <MapPin className="text-rose-500 mx-auto animate-bounce" size={24} />
              <h5 className="font-bold text-white text-sm">Menlo Park Node Established</h5>
              <p className="text-[10px] text-zinc-400 max-w-xs mx-auto font-light leading-relaxed">Latency: 12ms | Security Level: Multi-Zone DNS Routed Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="space-y-8 pt-6 border-t border-zinc-150 dark:border-zinc-800/60">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-1.5 justify-center">
            <HelpCircle size={18} className="text-primary" /> Core Security & Connection FAQ
          </h3>
          <p className="text-xs text-slate-500">Quick answers to standard licensing and vulnerability policies.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { q: 'Is the StringToTech documentation open-source?', a: 'Yes! All written architectural guides, system drawings, and benchmark script files are licensed under Apache 2.0. Feel free to cite or fork them.' },
            { q: 'How do I submit security vulnerability audits?', a: 'Please select "Security Audit / Vulnerability Report" in our Transmission form. This routes message payloads straight to Marcus Vance (CSO) via private PGP keys.' },
            { q: 'Do you support commercial sponsorships?', a: 'We accept sponsorships from technology brands providing dev-focused compilers, cloud architectures, or database engines that match our core values.' },
            { q: 'Can I write a guest log for StringToTech?', a: 'Yes! Guest authors must present strong credentials, verified GitHub repository commits, or professional engineering backgrounds.' }
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/40 dark:bg-zinc-900/15 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md space-y-2 text-left hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-101 transition-all duration-300 shadow-sm">
              <h5 className="font-extrabold text-slate-900 dark:text-zinc-200 text-xs sm:text-sm">{faq.q}</h5>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
