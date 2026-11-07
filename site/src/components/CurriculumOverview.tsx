import React from 'react';
import { CheckCircle2, ArrowRight, Award, Sparkles } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';
import { ModuleMeta } from './Sidebar';
import { siteConfig } from '../config/site';

export interface CurriculumOverviewProps {
  modules: ModuleMeta[];
  completedLessons: string[];
  onSelectLesson: (slug: string) => void;
  onNavigate: (view: string) => void;
}

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  modules,
  completedLessons,
  onSelectLesson,
  onNavigate,
}) => {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="space-y-12 py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-5 pt-4 pb-4">
        <div className="inline-flex max-w-full items-center justify-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
          <span className="hidden sm:inline">{siteConfig.versions.headerBadgeText}</span>
          <span className="sm:hidden text-[11px]">Verified on .NET 10 LTS • C# 14</span>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto px-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Learn .NET <span className="block sm:inline text-indigo-600 dark:text-indigo-400">the clear way.</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A commercial-grade educational curriculum by <strong className="text-slate-900 dark:text-white">Karmatix</strong>. From absolute beginner to job-ready software engineer: C# 14, ASP.NET Core, EF Core, Docker, and production capstones.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onSelectLesson(modules[0]?.lessons[0]?.slug || '')}
            className="w-full sm:w-auto shadow-md hover:shadow-indigo-500/20"
          >
            Start Module 0 (Start Here)
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button variant="outline" size="lg" onClick={() => onNavigate('dashboard')} className="w-full sm:w-auto">
            <Award className="w-4 h-4 mr-2 text-indigo-500" />
            Learning Dashboard ({progressPercent}%)
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          {[
            { label: 'Compilable Projects', val: '100% Tested', desc: 'Every code sample builds with -warnaserror' },
            { label: 'Interview Q&A', val: '200+ Questions', desc: 'Curated model answers & 6 timed mock exams' },
            { label: 'Zero-Trackers', val: 'DPDP Act', desc: '100% private, local browser storage only' },
            { label: 'Cloud Ready', val: '7 Capstones', desc: 'Real SQLite, Docker, and Azure architectures' },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block">{item.label}</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{item.val}</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules Catalog */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Curriculum Modules (0 – 11)
            </h2>
            <p className="text-xs text-slate-500">
              Structured sequentially from zero programming knowledge to job-ready architecture.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {completedCount} of {totalLessons} Lessons Finished
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const modDone = mod.lessons.filter((l) => completedLessons.includes(l.slug)).length;
            const isCompleted = modDone === mod.lessons.length && mod.lessons.length > 0;
            const pct = mod.lessons.length > 0 ? Math.round((modDone / mod.lessons.length) * 100) : 0;

            return (
              <Card key={mod.id} hover className="flex flex-col justify-between space-y-4 p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      Module {mod.id}
                    </span>
                    {isCompleted ? (
                      <Badge variant="success">Completed ✓</Badge>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">
                        {mod.lessons.length} Lessons
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>

                  {/* Lessons pill list */}
                  <div className="space-y-1.5 pt-1">
                    {mod.lessons.slice(0, 3).map((l) => (
                      <button
                        key={l.slug}
                        onClick={() => onSelectLesson(l.slug)}
                        className="w-full text-left p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between transition-colors"
                      >
                        <span className="truncate pr-2">{l.title}</span>
                        {completedLessons.includes(l.slug) && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        )}
                      </button>
                    ))}
                    {mod.lessons.length > 3 && (
                      <p className="text-[10px] text-slate-400 pl-1.5">
                        +{mod.lessons.length - 3} more lessons...
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <ProgressBar value={pct} showPercent={false} size="sm" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{pct}% complete</span>
                    {mod.lessons[0] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSelectLesson(mod.lessons[0].slug)}
                        className="text-indigo-600 dark:text-indigo-400 p-0 hover:bg-transparent"
                      >
                        Open Module &rarr;
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Ko-fi Chai Support Callout */}
      <section className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true">
            ☕
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Enjoying this course? Buy us a chai
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The Karmatix .NET Academy is 100% free with no paywalls or user tracking. Donations help cover cloud servers, test runners, and ongoing maintenance.
            </p>
          </div>
        </div>
        <a
          href="https://ko-fi.com/karmatix"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors"
          aria-label="Enjoyed this course? Buy me a chai on Ko-fi (opens in new tab)"
        >
          <span>Enjoyed this course? Buy me a chai ☕</span>
        </a>
      </section>
    </div>
  );
};
