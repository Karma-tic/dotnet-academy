import React, { useState } from 'react';
import { BookOpen, CheckCircle, Keyboard, AlertTriangle, Bug, Compass, HelpCircle, Zap, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { howToLearnData } from '../content/learningSupport/howToLearnData';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

const iconMap: Record<string, React.ReactNode> = {
  Keyboard: <Keyboard className="w-5 h-5 text-indigo-500" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  Bug: <Bug className="w-5 h-5 text-rose-500" />,
  Compass: <Compass className="w-5 h-5 text-blue-500" />,
  HelpCircle: <HelpCircle className="w-5 h-5 text-emerald-500" />,
  Zap: <Zap className="w-5 h-5 text-purple-500" />,
};

export interface HowToLearnViewProps {
  onNavigateToCurriculum: () => void;
}

export const HowToLearnView: React.FC<HowToLearnViewProps> = ({ onNavigateToCurriculum }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(howToLearnData[0].id);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const activeSection = howToLearnData.find((s) => s.id === activeSectionId) || howToLearnData[0];

  const handleCopySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(code);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The 10-Minute Beginner Field Manual</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How to Learn .NET the Clear Way
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Mastering modern software engineering is not about memorizing thousands of APIs. It is about building strong cognitive habits: typing code, deciphering compiler diagnostics, debugging systematically, and escaping tutorial hell.
        </p>
      </div>

      {/* Main Grid: Sidebar Navigator + Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Rail */}
        <aside className="lg:col-span-4 space-y-2 sticky top-24">
          <div className="p-3 bg-slate-100/60 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              6 Core Engineering Habits
            </div>
            {howToLearnData.map((section, idx) => {
              const isSelected = activeSection.id === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-400 shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm truncate">
                      {section.title.split(':')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                    {section.readTimeMinutes}m
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick CTA box */}
          <div className="p-4 bg-linear-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>Ready to write code?</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Put these principles into action starting with Module 0 fundamentals.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={onNavigateToCurriculum}
              className="w-full text-xs"
            >
              Go to Curriculum
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </aside>

        {/* Active Section Article Content */}
        <article className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          {/* Section Header */}
          <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {iconMap[activeSection.iconName]}
                <Badge variant="purple">{activeSection.subtitle}</Badge>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {activeSection.readTimeMinutes} min read
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {activeSection.title}
            </h2>

            {/* Core Rule Callout Banner */}
            <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border-l-4 border-indigo-600 dark:border-indigo-500">
              <p className="text-xs sm:text-sm font-semibold text-indigo-950 dark:text-indigo-200 italic">
                "{activeSection.coreRule}"
              </p>
            </div>
          </div>

          {/* Summary */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {activeSection.content.summary}
          </p>

          {/* Key Points */}
          <div className="space-y-6">
            {activeSection.content.points.map((point, pIdx) => (
              <div
                key={pIdx}
                className="p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-950/30 border border-slate-200/80 dark:border-slate-800/80 space-y-3"
              >
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{point.headline}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {point.body}
                </p>

                {point.codeSnippet && (
                  <div className="relative mt-2 rounded-xl bg-slate-900 p-3.5 text-xs font-mono text-emerald-300 border border-slate-800">
                    <pre className="overflow-x-auto">{point.codeSnippet}</pre>
                    <button
                      onClick={() => handleCopySnippet(point.codeSnippet!)}
                      className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Copy snippet"
                    >
                      {copiedSnippet === point.codeSnippet ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actionable Habit Box */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              ⚡ Actionable Daily Habit
            </h4>
            <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
              {activeSection.content.actionableHabit}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};
