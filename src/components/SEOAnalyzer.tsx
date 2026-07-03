/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { AlertCircle, CheckCircle2, Award, FileSearch, Sparkles, AlertTriangle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface SEOAnalyzerProps {
  title: string;
  metaDescription: string;
  focusKeyword: string;
  content: string; // The concatenated block content or markdown text
}

export const SEOAnalyzer: React.FC<SEOAnalyzerProps> = ({ title, metaDescription, focusKeyword, content }) => {
  const analysis = useMemo(() => {
    const checks: Array<{ name: string; status: 'pass' | 'warning' | 'fail'; message: string; scoreContribution: number }> = [];
    
    if (!focusKeyword) {
      return {
        score: 0,
        readabilityScore: 0,
        checks: [
          { name: 'Focus Keyword Specified', status: 'fail' as const, message: 'Please set a focus keyword in your SEO settings.', scoreContribution: 0 }
        ]
      };
    }

    const keywordLower = focusKeyword.toLowerCase();
    const titleLower = title.toLowerCase();
    const descLower = metaDescription.toLowerCase();
    const contentLower = content.toLowerCase();

    // 1. Keyword in Title
    if (titleLower.includes(keywordLower)) {
      checks.push({
        name: 'Keyword in H1 Title',
        status: 'pass',
        message: `Excellent! Your focus keyword "${focusKeyword}" is present in the main heading.`,
        scoreContribution: 20
      });
    } else {
      checks.push({
        name: 'Keyword in H1 Title',
        status: 'fail',
        message: 'The focus keyword was not found in your Title.',
        scoreContribution: 0
      });
    }

    // 2. Keyword in Meta Description
    if (descLower.includes(keywordLower)) {
      checks.push({
        name: 'Keyword in Meta Excerpt',
        status: 'pass',
        message: 'The focus keyword is present in your SEO meta description.',
        scoreContribution: 15
      });
    } else {
      checks.push({
        name: 'Keyword in Meta Excerpt',
        status: 'fail',
        message: 'Consider placing your focus keyword inside the meta description.',
        scoreContribution: 0
      });
    }

    // 3. Word Count Check
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    if (wordCount >= 600) {
      checks.push({
        name: 'Article Length',
        status: 'pass',
        message: `Great length! ${wordCount} words provides plenty of space for technical depth.`,
        scoreContribution: 25
      });
    } else if (wordCount >= 300) {
      checks.push({
        name: 'Article Length',
        status: 'warning',
        message: `Word count is ${wordCount}. Articles over 600 words generally rank better.`,
        scoreContribution: 15
      });
    } else {
      checks.push({
        name: 'Article Length',
        status: 'fail',
        message: `Extremely short! Only ${wordCount} words found. Aim for at least 300 words.`,
        scoreContribution: 5
      });
    }

    // 4. Keyword Density Check
    if (wordCount > 0) {
      // Escape special regex chars in focus keyword
      const escapedKw = keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const matches = contentLower.match(new RegExp(escapedKw, 'g'));
      const occurrences = matches ? matches.length : 0;
      const density = (occurrences / wordCount) * 100;

      if (density >= 0.6 && density <= 2.2) {
        checks.push({
          name: 'Keyword Density',
          status: 'pass',
          message: `Optimal density! Your keyword appears ${occurrences} times (${density.toFixed(2)}%).`,
          scoreContribution: 20
        });
      } else if (density > 2.2) {
        checks.push({
          name: 'Keyword Density',
          status: 'warning',
          message: `Too high (${density.toFixed(2)}%). Keyword stuffing will harm your Google ranking.`,
          scoreContribution: 10
        });
      } else {
        checks.push({
          name: 'Keyword Density',
          status: 'warning',
          message: `Low density (${density.toFixed(2)}%). Your keyword only occurs ${occurrences} times. Try referencing it naturally a bit more.`,
          scoreContribution: 8
        });
      }
    } else {
      checks.push({
        name: 'Keyword Density',
        status: 'fail',
        message: 'No words found in your editor body.',
        scoreContribution: 0
      });
    }

    // 5. Internal Links / Canonical checks
    const hasInternalLink = contentLower.includes('http://') || contentLower.includes('https://') || contentLower.includes('/blog/');
    if (hasInternalLink) {
      checks.push({
        name: 'Outbound & Internal Linking',
        status: 'pass',
        message: 'We detected hyperlinked URLs within your block paragraphs.',
        scoreContribution: 20
      });
    } else {
      checks.push({
        name: 'Outbound & Internal Linking',
        status: 'warning',
        message: 'Add outbound resource links and internal blog links to establish topic authority.',
        scoreContribution: 10
      });
    }

    const score = checks.reduce((acc, curr) => acc + curr.scoreContribution, 0);

    // Calculate simulated Readability Score (Flesch Reading Ease approximation)
    // Formula approximation based on average sentence lengths
    let readabilityScore = 82; // Start with high grade
    if (wordCount > 100) {
      const sentenceCount = content.split(/[.!?]+/).filter(Boolean).length || 1;
      const avgSentenceLength = wordCount / sentenceCount;
      if (avgSentenceLength > 20) readabilityScore -= 15;
      if (avgSentenceLength > 28) readabilityScore -= 12;
      
      // Simulate syllables adjustment
      const complexityIndex = contentLower.split('ing').length + contentLower.split('tion').length;
      if (complexityIndex / wordCount > 0.15) readabilityScore -= 18;
    }
    readabilityScore = Math.max(12, Math.min(100, readabilityScore));

    return { score, readabilityScore, checks };
  }, [title, metaDescription, focusKeyword, content]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500 border-emerald-500/25 text-emerald-500';
    if (score >= 60) return 'bg-amber-500 border-amber-500/25 text-amber-500';
    return 'bg-rose-500 border-rose-500/25 text-rose-500';
  };

  const getReadabilityGrade = (ease: number) => {
    if (ease >= 80) return { label: 'Easy to Read', desc: 'Shorter sentences, clear formatting. Perfect for developers.', color: 'text-emerald-500' };
    if (ease >= 55) return { label: 'Standard Technical', desc: 'Appropriate mix of definitions and explanations.', color: 'text-amber-500' };
    return { label: 'Academic & Dense', desc: 'Long paragraphs, complex syntax. Consider simplifying sentences.', color: 'text-rose-500' };
  };

  return (
    <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300">
      {/* Header Panel */}
      <div className="p-5 border-b border-zinc-150 dark:border-zinc-800/80 bg-white/30 dark:bg-zinc-900/30 flex items-center justify-between">
        <h4 className="font-bold flex items-center gap-2 text-sm text-slate-850 dark:text-zinc-100 uppercase tracking-wider font-custom">
          <FileSearch size={16} className="text-primary" /> Core SEO Scorecard
        </h4>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-primary/10 text-primary uppercase">
          <Sparkles size={12} /> Live Audit
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Visual score display */}
        <div className="grid grid-cols-2 gap-4 border-b border-zinc-150 dark:border-zinc-800/80 pb-5">
          <div className="text-center p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/30 border border-zinc-150/60 dark:border-zinc-900/60 flex flex-col items-center justify-center space-y-1">
            <Award className="text-primary mb-1" size={24} />
            <span className="text-2xl font-black text-slate-900 dark:text-white">{analysis.score}%</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">SEO Quality Score</span>
          </div>

          <div className="text-center p-4 rounded-2xl bg-white/40 dark:bg-zinc-950/30 border border-zinc-150/60 dark:border-zinc-900/60 flex flex-col items-center justify-center space-y-1">
            <BookOpen className="text-secondary mb-1" size={24} />
            <span className="text-2xl font-black text-slate-900 dark:text-white">{analysis.readabilityScore}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Readability Ease</span>
          </div>
        </div>

        {/* Readability Evaluation */}
        <div className="p-4 rounded-2xl bg-white/20 dark:bg-zinc-900/20 border border-zinc-150/40 dark:border-zinc-850/40 text-xs space-y-1">
          <span className="font-bold text-slate-700 dark:text-zinc-300">Readability Grade: <span className={getReadabilityGrade(analysis.readabilityScore).color}>{getReadabilityGrade(analysis.readabilityScore).label}</span></span>
          <p className="text-slate-500 dark:text-zinc-400 font-light">{getReadabilityGrade(analysis.readabilityScore).desc}</p>
        </div>

        {/* Diagnostic list */}
        <div className="space-y-4">
          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-zinc-150 dark:border-zinc-850/50 pb-1">Checklist Analysis</h5>
          <div className="space-y-4 pt-1">
            {analysis.checks.map((check, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed">
                {check.status === 'pass' ? (
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : check.status === 'warning' ? (
                  <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <span className="font-extrabold text-slate-850 dark:text-zinc-200 block leading-tight">{check.name}</span>
                  <span className="text-slate-500 dark:text-zinc-400 font-light block mt-0.5">{check.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
